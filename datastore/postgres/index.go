package postgres

import (
	"context"
	"errors"
	"time"

	"github.com/jackc/pgx/v5"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/internal/materialize"
	"github.com/matick-io/authz/schema"
)

// DefaultNestingBudget bounds how many closure rows one change may add.
const DefaultNestingBudget = 100_000

var (
	// ErrNestingTooLarge is returned when one change would add more closure
	// rows than the budget; a synchronous write is rolled back.
	ErrNestingTooLarge = errors.New("postgres: userset nesting exceeds the index budget")
	// ErrNotPostgres is returned when the index is asked to answer for a
	// Reader that did not come from this datastore.
	ErrNotPostgres = errors.New("postgres: the index needs this datastore's reader")
	// ErrNotMaterializable is returned by New for a permission whose rewrite
	// the permission sets cannot represent.
	ErrNotMaterializable = materialize.ErrNotMaterializable
)

// Drift is what Verify found; see materialize.Drift.
type Drift = materialize.Drift

// indexLockKey serialises every change that touches an index table; plain
// grants on a schema without permission sets never take it.
const indexLockKey = 0x617574687a // "authz"

// Index is the datastore's index (authz.Index): the userset closure, after
// Zanzibar's Leopard, and the permission sets, after AuthZed's Materialize,
// in two tables beside the relationships. It is maintained in SQL inside
// every write transaction (WithIndex) or afterwards from the changelog
// (WithAsyncIndex), and answers each question with one query. Datastore.Index
// returns it.
type Index struct {
	ds     *Datastore
	budget int64
	sets   *materialize.Sets // nil when none are configured
}

// indexConfig is what the options collect; New builds the Index from it.
type indexConfig struct {
	wanted bool
	sets   bool
	sch    *schema.Schema
	perms  []string
	budget int64
	async  bool
}

func newIndex(ds *Datastore, c indexConfig) (*Index, error) {
	x := &Index{ds: ds, budget: c.budget}
	if x.budget <= 0 {
		x.budget = DefaultNestingBudget
	}
	if c.sch != nil {
		perms := c.perms
		if len(perms) == 0 {
			perms = materialize.Materializable(c.sch)
		}
		sets, err := materialize.NewSets(c.sch, perms...)
		if err != nil {
			return nil, err
		}
		if !sets.Empty() {
			x.sets = sets
		}
	}
	return x, nil
}

// apply brings the index up to date with one change, in the given
// transaction: the closure first, then the permission sets that depend on it.
// It is the datastore's hook when the index is synchronous.
func (x *Index) apply(ctx context.Context, tx pgx.Tx, change authz.Change) error {
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
func (x *Index) Verify(ctx context.Context) (Drift, error) {
	tx, err := x.ds.pool.Begin(ctx)
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
	x *Index
}

func (f follower) Cursor(ctx context.Context) (authz.Revision, error) {
	var cursor int64
	err := f.x.ds.pool.QueryRow(ctx, "select coalesce((select revision from authz.userset_closure_cursor where id = 1), 0)").Scan(&cursor)
	return authz.Revision(cursor), err
}

func (f follower) Apply(ctx context.Context, change authz.Change) error {
	tx, err := f.x.ds.pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx) //nolint:errcheck
	if err := f.x.apply(ctx, tx, change); err != nil {
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
// An asynchronous index (WithAsyncIndex) is kept in step by one of them.
func (x *Index) Catchup(ctx context.Context) (int, error) {
	return materialize.Catchup(ctx, x.ds, follower{x}, 100)
}

// Follow runs Catchup every interval until ctx ends. Errors are sent on errs
// when there is room and never stop the loop.
func (x *Index) Follow(ctx context.Context, interval time.Duration, errs chan<- error) {
	materialize.Follow(ctx, x.ds, follower{x}, interval, errs)
}

// Reindex rebuilds every index table from the relationships and sets the
// follower's cursor to the latest revision. It is the repair tool; Verify
// says whether it is needed.
func (x *Index) Reindex(ctx context.Context) error {
	tx, err := x.ds.pool.Begin(ctx)
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
	return x.sets != nil && x.sets.Materialized(resourceType, permission)
}
