// Package index is the Postgres datastore's index: the closure of userset
// nesting (authz.NestingIndex) and the permission sets
// (authz.PermissionIndex) of the materialize package, kept in two tables in
// the same database as the relationships, maintained incrementally in SQL
// inside the write's own transaction, and answered with one query each.
//
// Attach wires an index into a deployment in one call. Underneath, the index
// runs synchronously when Hook is registered with the datastore, so every
// write updates it in its own transaction and reads are never behind, or
// asynchronously with Follow, which applies the change log with some lag;
// the engine then reads an index that may trail the tuples, which is the
// trade AuthZed Materialize makes.
package index

import (
	"context"
	"errors"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/materialize"
	pgstore "github.com/matick-io/authz/postgres"
	"github.com/matick-io/authz/schema"
)

// DefaultNestingBudget bounds how many closure rows one change may add.
const DefaultNestingBudget = 100_000

var (
	// ErrNestingTooLarge is returned when one change would add more closure
	// rows than the budget; a synchronous write is rolled back.
	ErrNestingTooLarge = errors.New("materialize: userset nesting exceeds the index budget")
	// ErrNotPostgres is returned when the index is asked to answer for a
	// Reader that did not come from the Postgres datastore.
	ErrNotPostgres = errors.New("materialize: the index needs the postgres datastore's reader")
	// ErrNotMaterializable is returned by New for a permission whose rewrite
	// the permission sets cannot represent.
	ErrNotMaterializable = materialize.ErrNotMaterializable
)

// Drift is what Verify found; see materialize.Drift.
type Drift = materialize.Drift

// Materializable lists the permissions of the schema the sets can
// represent; see materialize.Materializable.
func Materializable(sch *schema.Schema) []string { return materialize.Materializable(sch) }

// indexLockKey serialises every change that touches an index table; plain
// grants on a schema without permission sets never take it.
const indexLockKey = 0x617574687a // "authz"

// Index is the nesting closure, and the permission sets when configured. It
// implements authz.NestingIndex and authz.PermissionIndex.
type Index struct {
	budget int64
	sets   *materialize.Sets // nil when none are configured
}

// Option configures New.
type Option func(*Index) error

// WithNestingBudget overrides DefaultNestingBudget.
func WithNestingBudget(n int64) Option {
	return func(x *Index) error {
		x.budget = n
		return nil
	}
}

// WithPermissionSets materialises the named permissions, written as
// type#permission, of the schema. Each must be materialisable
// (Materializable lists those that are); otherwise New fails with
// ErrNotMaterializable. With no names the index keeps the closure only.
func WithPermissionSets(sch *schema.Schema, permissions ...string) Option {
	return func(x *Index) error {
		if len(permissions) == 0 {
			x.sets = nil
			return nil
		}
		sets, err := materialize.NewSets(sch, permissions...)
		if err != nil {
			return err
		}
		x.sets = sets
		return nil
	}
}

// New returns an index over the index tables, which must exist (postgres.Migrate).
func New(opts ...Option) (*Index, error) {
	x := &Index{budget: DefaultNestingBudget}
	for _, o := range opts {
		if err := o(x); err != nil {
			return nil, err
		}
	}
	return x, nil
}

// Hook returns the datastore hook that keeps the index in step with every
// write, inside the write's own transaction.
func (x *Index) Hook() pgstore.Hook {
	return x.Apply
}

// Apply brings the index up to date with one change, in the given
// transaction: the closure first, then the permission sets that depend on it.
func (x *Index) Apply(ctx context.Context, tx pgx.Tx, change authz.Change) error {
	needsLock := x.sets != nil
	for _, u := range change.Updates {
		if u.Relationship.IsNesting() {
			needsLock = true
		}
	}
	if !needsLock {
		return nil
	}
	if _, err := tx.Exec(ctx, "select pg_advisory_xact_lock($1)", int64(indexLockKey)); err != nil {
		return err
	}
	// AI: consecutive added edges are re-derived in one walk; a delete flushes
	// the batch first so order within the change is preserved.
	var added []userset
	flush := func() error {
		if len(added) == 0 {
			return nil
		}
		err := x.edgesAdded(ctx, tx, added)
		added = nil
		return err
	}
	for _, u := range change.Updates {
		if !u.Relationship.IsNesting() {
			continue
		}
		switch u.Operation {
		case authz.OperationTouch, authz.OperationCreate:
			added = append(added, userset{u.Relationship.Subject.Object.Type, u.Relationship.Subject.Object.ID, u.Relationship.Subject.Relation})
		case authz.OperationDelete:
			if err := flush(); err != nil {
				return err
			}
			if err := x.edgeRemoved(ctx, tx, u.Relationship); err != nil {
				return err
			}
		}
	}
	if err := flush(); err != nil {
		return err
	}
	if x.sets != nil {
		if err := x.applySets(ctx, tx, change); err != nil {
			return err
		}
	}
	// A bulk change refreshes the planner's view of the index tables.
	if len(change.Updates) >= 1000 {
		if _, err := tx.Exec(ctx, "analyze authz.userset_closure, authz.permission_set"); err != nil {
			return err
		}
	}
	return nil
}

const (
	closureRowsSQL = `select ancestor_type || ':' || ancestor_id || '#' || ancestor_relation || ' > ' ||
		descendant_type || ':' || descendant_id || '#' || descendant_relation
		from authz.userset_closure order by 1`
	setRowsSQL = `select resource_type || ':' || resource_id || '#' || permission || ' <- ' ||
		set_type || ':' || set_id || '#' || set_relation
		from authz.permission_set order by 1`
)

// Verify reads every relationship and every index row at one snapshot,
// derives what the index should hold with the materialize package, and
// reports how the maintained rows differ. Nothing is changed. AI: the
// derivation is a second implementation of the index, in Go, so a fault in
// the SQL maintenance cannot hide from it. It is the consistency check to
// run after a suspected fault, an index reconfiguration, or in a test after
// concurrent writes.
func (x *Index) Verify(ctx context.Context, pool *pgxpool.Pool) (Drift, error) {
	tx, err := pool.Begin(ctx)
	if err != nil {
		return Drift{}, err
	}
	defer tx.Rollback(ctx) //nolint:errcheck // AI: read only, always rolled back
	if _, err := tx.Exec(ctx, "select pg_advisory_xact_lock($1)", int64(indexLockKey)); err != nil {
		return Drift{}, err
	}
	var have materialize.Rows
	if have.Closure, err = scanIDs(tx.Query(ctx, closureRowsSQL)); err != nil {
		return Drift{}, err
	}
	if have.Sets, err = scanIDs(tx.Query(ctx, setRowsSQL)); err != nil {
		return Drift{}, err
	}
	rels, err := allRelationships(ctx, tx)
	if err != nil {
		return Drift{}, err
	}
	want, err := materialize.Derive(ctx, x.sets, rels)
	if err != nil {
		return Drift{}, err
	}
	return materialize.Compare(have, want), nil
}

func allRelationships(ctx context.Context, tx pgx.Tx) ([]authz.Relationship, error) {
	rows, err := tx.Query(ctx, "select resource_type, resource_id, relation, subject_type, subject_id, subject_relation from authz.relationship")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []authz.Relationship
	for rows.Next() {
		var r authz.Relationship
		if err := rows.Scan(&r.Resource.Type, &r.Resource.ID, &r.Relation, &r.Subject.Object.Type, &r.Subject.Object.ID, &r.Subject.Relation); err != nil {
			return nil, err
		}
		out = append(out, r)
	}
	return out, rows.Err()
}

// follower is the index as a materialize.Applier: its cursor is a row in the
// database, advanced in the transaction that applies each change.
type follower struct {
	x    *Index
	pool *pgxpool.Pool
}

func (f follower) Cursor(ctx context.Context) (authz.Revision, error) {
	var cursor int64
	err := f.pool.QueryRow(ctx, "select coalesce((select revision from authz.userset_closure_cursor where id = 1), 0)").Scan(&cursor)
	return authz.Revision(cursor), err
}

func (f follower) Apply(ctx context.Context, change authz.Change) error {
	tx, err := f.pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx) //nolint:errcheck
	if err := f.x.Apply(ctx, tx, change); err != nil {
		return err
	}
	if _, err := tx.Exec(ctx, `
		insert into authz.userset_closure_cursor (id, revision) values (1, $1)
		on conflict (id) do update set revision = excluded.revision`, int64(change.Revision)); err != nil {
		return err
	}
	return tx.Commit(ctx)
}

// Catchup applies every change after the follower's cursor, each in its own
// transaction, and reports how many it applied. It is one pass; Follow loops.
func (x *Index) Catchup(ctx context.Context, pool *pgxpool.Pool, ds *pgstore.Datastore) (int, error) {
	return materialize.Catchup(ctx, ds, follower{x, pool}, 100)
}

// Follow runs Catchup every interval until ctx ends. Errors are sent on errs
// when there is room and never stop the loop.
func (x *Index) Follow(ctx context.Context, pool *pgxpool.Pool, ds *pgstore.Datastore, interval time.Duration, errs chan<- error) {
	materialize.Follow(ctx, ds, follower{x, pool}, interval, errs)
}

// Reindex rebuilds every index table from the relationships and sets the
// follower's cursor to the latest revision. It is the repair tool; Verify
// says whether it is needed.
func (x *Index) Reindex(ctx context.Context, pool *pgxpool.Pool) error {
	tx, err := pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx) //nolint:errcheck
	if _, err := tx.Exec(ctx, "select pg_advisory_xact_lock($1)", int64(indexLockKey)); err != nil {
		return err
	}
	if err := reindexClosure(ctx, tx); err != nil {
		return err
	}
	if x.sets != nil {
		if err := x.reindexSets(ctx, tx); err != nil {
			return err
		}
	}
	if _, err := tx.Exec(ctx, `
		insert into authz.userset_closure_cursor (id, revision)
		values (1, coalesce((select max(revision) from authz.relationship_change), 0))
		on conflict (id) do update set revision = excluded.revision`); err != nil {
		return err
	}
	return tx.Commit(ctx)
}

// Materialized implements authz.PermissionIndex.
func (x *Index) Materialized(resourceType, permission string) bool {
	return x.sets.Materialized(resourceType, permission)
}
