package postgres

import (
	"context"
	"errors"
	"os"
	"testing"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/internal/datastoretest"
	"github.com/matick-io/authz/internal/pgtest"
)

// AI: the suite needs a real Postgres and names it through
// AUTHZ_TEST_DATABASE_URL; without one it skips rather than fakes a pass. It
// drops and recreates the authz schema, so point it at a scratch database.
func openPool(t *testing.T) *pgxpool.Pool {
	t.Helper()
	url := os.Getenv("AUTHZ_TEST_DATABASE_URL")
	if url == "" {
		t.Skip("AUTHZ_TEST_DATABASE_URL not set")
	}
	ctx := context.Background()
	pool, err := pgxpool.New(ctx, url)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(pool.Close)
	if _, err := pool.Exec(ctx, "drop schema if exists authz cascade; drop table if exists "+MigrationTable); err != nil {
		t.Fatal(err)
	}
	if err := Migrate(ctx, pool); err != nil {
		t.Fatal(err)
	}
	return pool
}

func truncate(t *testing.T, pool *pgxpool.Pool) {
	t.Helper()
	if _, err := pool.Exec(context.Background(), "truncate authz.relationship, authz.relationship_change"); err != nil {
		t.Fatal(err)
	}
}

// open is a datastore on pool with opts, or a failed test.
func open(t *testing.T, pool *pgxpool.Pool, opts ...Option) *Datastore {
	t.Helper()
	ds, err := New(pool, opts...)
	if err != nil {
		t.Fatal(err)
	}
	return ds
}

func TestConformance(t *testing.T) {
	pool := openPool(t)
	datastoretest.Run(t, func(t *testing.T) authz.Datastore {
		truncate(t, pool)
		return open(t, pool)
	})
}

func TestMigrateIsIdempotent(t *testing.T) {
	pool := openPool(t)
	if err := Migrate(context.Background(), pool); err != nil {
		t.Fatalf("second migrate: %v", err)
	}
}

// Down undoes Up: after DownTo(0) nothing of authz is left and Check says so;
// Up brings it all back to SchemaVersion.
func TestMigrationsRoundTrip(t *testing.T) {
	pool := openPool(t)
	ctx := context.Background()
	if err := Check(ctx, pool); err != nil {
		t.Fatalf("check after migrate: %v", err)
	}
	m, err := NewMigrator(pool)
	if err != nil {
		t.Fatal(err)
	}
	defer m.Close()
	if err := m.DownTo(ctx, 0); err != nil {
		t.Fatalf("down to 0: %v", err)
	}
	var n int
	if err := pool.QueryRow(ctx, "select count(*) from pg_namespace where nspname = 'authz'").Scan(&n); err != nil || n != 0 {
		t.Fatalf("authz schema after down: n=%d err=%v", n, err)
	}
	if err := Check(ctx, pool); !errors.Is(err, ErrSchemaVersion) {
		t.Fatalf("check on an empty database: %v", err)
	}
	if err := m.Up(ctx); err != nil {
		t.Fatalf("up again: %v", err)
	}
	if v, err := m.Version(ctx); err != nil || v != SchemaVersion {
		t.Fatalf("version after up: %d %v, want %d", v, err, SchemaVersion)
	}
}

func TestWildcardConstraint(t *testing.T) {
	pool := openPool(t)
	_, err := pool.Exec(context.Background(), `
		insert into authz.relationship (resource_type, resource_id, relation, subject_type, subject_id, subject_relation)
		values ('project', 'p1', 'viewer', 'team', '*', 'member')`)
	if err == nil {
		t.Fatal("a wildcard subject with a relation was accepted")
	}
}

// A hook sees the change with its revision, runs inside the transaction, and
// can veto the write.
func TestHook(t *testing.T) {
	pool := openPool(t)
	truncate(t, pool)
	ctx := context.Background()
	var seen []authz.Change
	veto := errors.New("veto")
	var fail bool
	ds := open(t, pool, WithHook(func(ctx context.Context, tx pgx.Tx, c authz.Change) error {
		seen = append(seen, c)
		var n int
		if err := tx.QueryRow(ctx, "select count(*) from authz.relationship").Scan(&n); err != nil {
			return err
		}
		if n == 0 {
			t.Error("hook ran before the relationships were visible in its transaction")
		}
		if fail {
			return veto
		}
		return nil
	}))
	if err := ds.Transact(ctx, func(w authz.Writer) error { return w.Create(ctx, rel(t, "project:p#member@user:a")) }); err != nil {
		t.Fatal(err)
	}
	if len(seen) != 1 || seen[0].Revision == 0 || len(seen[0].Updates) != 1 {
		t.Fatalf("hook saw %+v", seen)
	}
	// A transaction that changes nothing runs no hook.
	if err := ds.Transact(ctx, func(w authz.Writer) error { return w.Touch(ctx, rel(t, "project:p#member@user:a")) }); err != nil {
		t.Fatal(err)
	}
	if len(seen) != 1 {
		t.Fatalf("hook ran for a no-op write: %+v", seen)
	}
	fail = true
	err := ds.Transact(ctx, func(w authz.Writer) error { return w.Create(ctx, rel(t, "project:p#member@user:b")) })
	if !errors.Is(err, veto) {
		t.Fatalf("veto: %v", err)
	}
	var n int
	if err := pool.QueryRow(ctx, "select count(*) from authz.relationship").Scan(&n); err != nil || n != 1 {
		t.Fatalf("vetoed write landed: n=%d err=%v", n, err)
	}
	if err := pool.QueryRow(ctx, "select count(*) from authz.relationship_change").Scan(&n); err != nil || n != 1 {
		t.Fatalf("vetoed write left change rows: n=%d err=%v", n, err)
	}
}

func TestTxExposesTheTransaction(t *testing.T) {
	pool := openPool(t)
	ds := open(t, pool)
	if err := ds.View(context.Background(), func(r authz.Reader) error {
		if _, ok := Tx(r); !ok {
			t.Error("Tx did not recognise its own reader")
		}
		return nil
	}); err != nil {
		t.Fatal(err)
	}
}

// TransactIn writes inside a transaction the host owns: the grant, its change
// log rows and the hooks' work are all part of the host's transaction, so
// nothing is visible until the host commits and nothing survives its
// rollback.
func TestTransactInCommitsWithTheHost(t *testing.T) {
	pool := openPool(t)
	truncate(t, pool)
	ctx := context.Background()
	ds := open(t, pool, WithHook(func(ctx context.Context, tx pgx.Tx, c authz.Change) error {
		// The hook's own writes ride the same transaction as the grant.
		_, err := tx.Exec(ctx, "create table if not exists authz.hook_saw (revision bigint primary key)")
		if err != nil {
			return err
		}
		_, err = tx.Exec(ctx, "insert into authz.hook_saw (revision) values ($1)", int64(c.Revision))
		return err
	}))
	count := func(sql string) int {
		t.Helper()
		var n int
		if err := pool.QueryRow(ctx, sql).Scan(&n); err != nil {
			t.Fatal(err)
		}
		return n
	}
	grant := func(w authz.Writer) error { return w.Create(ctx, rel(t, "project:p#member@user:a")) }

	// The host rolls back: the grant, the change and the hook's row all go.
	tx, err := pool.Begin(ctx)
	if err != nil {
		t.Fatal(err)
	}
	if err := ds.TransactIn(ctx, tx, grant); err != nil {
		t.Fatal(err)
	}
	if n := count("select count(*) from authz.relationship"); n != 0 {
		t.Fatalf("grant visible before the host committed: %d rows", n)
	}
	if err := tx.Rollback(ctx); err != nil {
		t.Fatal(err)
	}
	if n := count("select count(*) from authz.relationship"); n != 0 {
		t.Fatalf("grant survived the host's rollback: %d rows", n)
	}
	if n := count("select count(*) from authz.relationship_change"); n != 0 {
		t.Fatalf("change log survived the host's rollback: %d rows", n)
	}
	if n := count("select count(*) from pg_tables where schemaname = 'authz' and tablename = 'hook_saw'"); n != 0 {
		t.Fatal("the hook's work survived the host's rollback")
	}

	// fn fails: the host learns, and nothing was logged for it to keep.
	tx, err = pool.Begin(ctx)
	if err != nil {
		t.Fatal(err)
	}
	boom := errors.New("application refused")
	if err := ds.TransactIn(ctx, tx, func(w authz.Writer) error {
		if err := grant(w); err != nil {
			return err
		}
		return boom
	}); !errors.Is(err, boom) {
		t.Fatalf("fn's error was not returned: %v", err)
	}
	if err := tx.Rollback(ctx); err != nil {
		t.Fatal(err)
	}

	// The host commits: the grant lands with a revision, and the hook ran in
	// the same transaction.
	tx, err = pool.Begin(ctx)
	if err != nil {
		t.Fatal(err)
	}
	if err := ds.TransactIn(ctx, tx, grant); err != nil {
		t.Fatal(err)
	}
	if err := tx.Commit(ctx); err != nil {
		t.Fatal(err)
	}
	if n := count("select count(*) from authz.relationship"); n != 1 {
		t.Fatalf("grant did not land with the host's commit: %d rows", n)
	}
	var changes []authz.Change
	if err := ds.View(ctx, func(r authz.Reader) error {
		var err error
		changes, err = r.Changes(ctx, 0, 0)
		return err
	}); err != nil {
		t.Fatal(err)
	}
	if len(changes) != 1 || changes[0].Revision == 0 || len(changes[0].Updates) != 1 {
		t.Fatalf("change log after the host's commit: %+v", changes)
	}
	if n := count("select count(*) from authz.hook_saw"); n != 1 {
		t.Fatalf("hook rows after the host's commit: %d", n)
	}

	// A write that changed nothing logs nothing and runs no hook.
	tx, err = pool.Begin(ctx)
	if err != nil {
		t.Fatal(err)
	}
	if err := ds.TransactIn(ctx, tx, func(w authz.Writer) error { return w.Touch(ctx, rel(t, "project:p#member@user:a")) }); err != nil {
		t.Fatal(err)
	}
	if err := tx.Commit(ctx); err != nil {
		t.Fatal(err)
	}
	if n := count("select count(*) from authz.relationship_change"); n != 1 {
		t.Fatalf("a no-op write logged a change: %d rows", n)
	}
}

func TestMain(m *testing.M) { os.Exit(pgtest.Main(m)) }
