package postgres_test

import (
	"context"
	"errors"
	"os"
	"testing"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/internal/datastoretest"
	"github.com/matick-io/authz/postgres"
	"github.com/matick-io/authz/postgres/pgtest"
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
	if _, err := pool.Exec(ctx, "drop schema if exists authz cascade"); err != nil {
		t.Fatal(err)
	}
	if err := postgres.Migrate(ctx, pool); err != nil {
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

func mustRel(t *testing.T, s string) authz.Relationship {
	t.Helper()
	r, err := authz.ParseRelationship(s)
	if err != nil {
		t.Fatal(err)
	}
	return r
}

func TestConformance(t *testing.T) {
	pool := openPool(t)
	datastoretest.Run(t, func(t *testing.T) authz.Datastore {
		truncate(t, pool)
		return postgres.New(pool)
	})
}

func TestMigrateIsIdempotent(t *testing.T) {
	pool := openPool(t)
	if err := postgres.Migrate(context.Background(), pool); err != nil {
		t.Fatalf("second migrate: %v", err)
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
	ds := postgres.New(pool, postgres.WithHook(func(ctx context.Context, tx pgx.Tx, c authz.Change) error {
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
	if err := ds.Transact(ctx, func(w authz.Writer) error { return w.Create(ctx, mustRel(t, "project:p#member@user:a")) }); err != nil {
		t.Fatal(err)
	}
	if len(seen) != 1 || seen[0].Revision == 0 || len(seen[0].Updates) != 1 {
		t.Fatalf("hook saw %+v", seen)
	}
	// A transaction that changes nothing runs no hook.
	if err := ds.Transact(ctx, func(w authz.Writer) error { return w.Touch(ctx, mustRel(t, "project:p#member@user:a")) }); err != nil {
		t.Fatal(err)
	}
	if len(seen) != 1 {
		t.Fatalf("hook ran for a no-op write: %+v", seen)
	}
	fail = true
	err := ds.Transact(ctx, func(w authz.Writer) error { return w.Create(ctx, mustRel(t, "project:p#member@user:b")) })
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
	ds := postgres.New(pool)
	if err := ds.View(context.Background(), func(r authz.Reader) error {
		if _, ok := postgres.Tx(r); !ok {
			t.Error("Tx did not recognise its own reader")
		}
		return nil
	}); err != nil {
		t.Fatal(err)
	}
}

func TestMain(m *testing.M) { os.Exit(pgtest.Main(m)) }
