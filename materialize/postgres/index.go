// Package postgres holds the indexes for the Postgres datastore: a
// Leopard-style closure of userset nesting (authz.NestingIndex) and
// Materialize-style permission sets (authz.PermissionIndex), both kept in the
// same database as the relationships.
//
// Run the index synchronously by registering Hook with the datastore, so
// every write updates it in its own transaction and reads are never behind.
// Or run it asynchronously with Follow, which applies the change log with
// some lag; the engine then reads an index that may trail the tuples, which
// is the trade AuthZed Materialize makes.
package postgres

import (
	"context"
	"embed"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/matick-io/authz"
	pgstore "github.com/matick-io/authz/datastore/postgres"
	"github.com/matick-io/authz/schema"
)

// Migrations creates the index tables.
//
//go:embed migrations/*.sql
var Migrations embed.FS

// Migrate applies the index migrations. Idempotent.
func Migrate(ctx context.Context, pool *pgxpool.Pool) error {
	return pgstore.ApplyMigrations(ctx, pool, Migrations, "migrations")
}

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
	ErrNotMaterializable = errors.New("materialize: permission cannot be materialised")
)

// indexLockKey serialises every change that touches an index table; plain
// grants on a schema without permission sets never take it.
const indexLockKey = 0x617574687a // "authz"

// Index is the nesting closure, and the permission sets when configured. It
// implements authz.NestingIndex and authz.PermissionIndex.
type Index struct {
	budget int64
	sets   *permissionSets // nil when none are configured
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
// ErrNotMaterializable.
func WithPermissionSets(sch *schema.Schema, permissions ...string) Option {
	return func(x *Index) error {
		sets, err := newPermissionSets(sch, permissions)
		if err != nil {
			return err
		}
		x.sets = sets
		return nil
	}
}

// New returns an index over the index tables, which must exist (Migrate).
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
		return x.sets.apply(ctx, tx, change)
	}
	return nil
}

// Drift is what Verify found: rows the maintained index holds that a
// recomputation does not (Extra), and rows it lacks (Missing).
type Drift struct {
	ClosureMissing, ClosureExtra []string
	SetsMissing, SetsExtra       []string
}

// Empty reports whether the maintained index matches a recomputation.
func (d Drift) Empty() bool {
	return len(d.ClosureMissing) == 0 && len(d.ClosureExtra) == 0 && len(d.SetsMissing) == 0 && len(d.SetsExtra) == 0
}

func (d Drift) String() string {
	if d.Empty() {
		return "index matches a recomputation"
	}
	var b strings.Builder
	section := func(name string, rows []string) {
		if len(rows) == 0 {
			return
		}
		fmt.Fprintf(&b, "%s (%d):\n", name, len(rows))
		for _, r := range rows {
			fmt.Fprintf(&b, "  %s\n", r)
		}
	}
	section("closure rows missing", d.ClosureMissing)
	section("closure rows extra", d.ClosureExtra)
	section("permission set rows missing", d.SetsMissing)
	section("permission set rows extra", d.SetsExtra)
	return b.String()
}

const (
	closureRowsSQL = `select ancestor_type || ':' || ancestor_id || '#' || ancestor_relation || ' > ' ||
		descendant_type || ':' || descendant_id || '#' || descendant_relation
		from authz.userset_closure order by 1`
	setRowsSQL = `select resource_type || ':' || resource_id || '#' || permission || ' <- ' ||
		set_type || ':' || set_id || '#' || set_relation
		from authz.permission_set order by 1`
)

// Verify recomputes every index table inside a transaction it then rolls
// back, and reports how the maintained rows differ. Nothing is changed. It is
// the consistency check to run after a suspected fault, an index
// reconfiguration, or in a test after concurrent writes.
func (x *Index) Verify(ctx context.Context, pool *pgxpool.Pool) (Drift, error) {
	tx, err := pool.Begin(ctx)
	if err != nil {
		return Drift{}, err
	}
	defer tx.Rollback(ctx) //nolint:errcheck // AI: always rolled back on purpose
	if _, err := tx.Exec(ctx, "select pg_advisory_xact_lock($1)", int64(indexLockKey)); err != nil {
		return Drift{}, err
	}
	beforeClosure, err := scanIDs(tx.Query(ctx, closureRowsSQL))
	if err != nil {
		return Drift{}, err
	}
	beforeSets, err := scanIDs(tx.Query(ctx, setRowsSQL))
	if err != nil {
		return Drift{}, err
	}
	if err := reindexClosure(ctx, tx); err != nil {
		return Drift{}, err
	}
	afterClosure, err := scanIDs(tx.Query(ctx, closureRowsSQL))
	if err != nil {
		return Drift{}, err
	}
	var d Drift
	d.ClosureMissing, d.ClosureExtra = diffSorted(beforeClosure, afterClosure)
	if x.sets != nil {
		if err := x.sets.reindex(ctx, tx); err != nil {
			return Drift{}, err
		}
		afterSets, err := scanIDs(tx.Query(ctx, setRowsSQL))
		if err != nil {
			return Drift{}, err
		}
		d.SetsMissing, d.SetsExtra = diffSorted(beforeSets, afterSets)
	}
	return d, nil
}

// diffSorted returns the rows only in want (missing) and only in have (extra).
func diffSorted(have, want []string) (missing, extra []string) {
	i, j := 0, 0
	for i < len(have) || j < len(want) {
		switch {
		case j == len(want) || (i < len(have) && have[i] < want[j]):
			extra = append(extra, have[i])
			i++
		case i == len(have) || want[j] < have[i]:
			missing = append(missing, want[j])
			j++
		default:
			i++
			j++
		}
	}
	return missing, extra
}

// Catchup applies every change after the follower's cursor, each in its own
// transaction, and reports how many it applied. It is one pass; Follow loops.
func (x *Index) Catchup(ctx context.Context, pool *pgxpool.Pool, ds *pgstore.Datastore) (int, error) {
	applied := 0
	for {
		var cursor int64
		if err := pool.QueryRow(ctx, "select coalesce((select revision from authz.userset_closure_cursor where id = 1), 0)").Scan(&cursor); err != nil {
			return applied, err
		}
		var changes []authz.Change
		if err := ds.View(ctx, func(r authz.Reader) error {
			var err error
			changes, err = r.Changes(ctx, authz.Revision(cursor), 100)
			return err
		}); err != nil {
			return applied, err
		}
		if len(changes) == 0 {
			return applied, nil
		}
		for _, change := range changes {
			if err := x.applyAndAdvance(ctx, pool, change); err != nil {
				return applied, err
			}
			applied++
		}
	}
}

func (x *Index) applyAndAdvance(ctx context.Context, pool *pgxpool.Pool, change authz.Change) error {
	tx, err := pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx) //nolint:errcheck
	if err := x.Apply(ctx, tx, change); err != nil {
		return err
	}
	if _, err := tx.Exec(ctx, `
		insert into authz.userset_closure_cursor (id, revision) values (1, $1)
		on conflict (id) do update set revision = excluded.revision`, int64(change.Revision)); err != nil {
		return err
	}
	return tx.Commit(ctx)
}

// Follow runs Catchup every interval until ctx ends. Errors are sent on errs
// when there is room and never stop the loop.
func (x *Index) Follow(ctx context.Context, pool *pgxpool.Pool, ds *pgstore.Datastore, interval time.Duration, errs chan<- error) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()
	for {
		if _, err := x.Catchup(ctx, pool, ds); err != nil && errs != nil {
			select {
			case errs <- err:
			default:
			}
		}
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
		}
	}
}

// Reindex rebuilds every index table from the relationships and sets the
// follower's cursor to the latest revision. It is the oracle the maintained
// index is tested against, and the repair tool.
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
		if err := x.sets.reindex(ctx, tx); err != nil {
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
	return x.sets != nil && x.sets.configured[resourceType+"#"+permission]
}
