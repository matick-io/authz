package tests

import (
	"context"
	"os"
	"sync"
	"testing"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/datastore/memory"
	"github.com/matick-io/authz/datastore/postgres"
	"github.com/matick-io/authz/engine"
	"github.com/matick-io/authz/schema"
)

// datastoreKind names one configuration the suites run against: a datastore
// and the engine options that go with it, built for the schema in play.
type datastoreKind struct {
	name    string
	indexed bool
	open    func(tb testing.TB, sch *schema.Schema) (authz.Datastore, []engine.Option)
}

var (
	poolOnce sync.Once
	pool     *pgxpool.Pool
	poolErr  error
)

// postgresPool connects once per test binary to AUTHZ_TEST_DATABASE_URL and
// migrates the datastore and the index. It returns nil when the variable is
// unset.
func postgresPool(tb testing.TB) *pgxpool.Pool {
	tb.Helper()
	url := os.Getenv("AUTHZ_TEST_DATABASE_URL")
	if url == "" {
		return nil
	}
	poolOnce.Do(func() {
		ctx := context.Background()
		pool, poolErr = pgxpool.New(ctx, url)
		if poolErr != nil {
			return
		}
		if _, poolErr = pool.Exec(ctx, "drop schema if exists authz cascade; drop table if exists "+postgres.MigrationTable); poolErr != nil {
			return
		}
		poolErr = postgres.Migrate(ctx, pool)
	})
	if poolErr != nil {
		tb.Fatal(poolErr)
	}
	return pool
}

func truncatePostgres(tb testing.TB, p *pgxpool.Pool) {
	tb.Helper()
	if _, err := p.Exec(context.Background(), "truncate authz.relationship, authz.relationship_change, authz.userset_closure, authz.userset_closure_cursor, authz.permission_set"); err != nil {
		tb.Fatal(err)
	}
}

// datastores lists memory always; with a database also postgres walking,
// postgres with the nesting closure, and postgres with the closure and every
// permission set the schema allows. Every suite runs against each, so the
// indexes are checked against the walk and their speed is measured, not
// assumed.
func datastores(tb testing.TB) []datastoreKind {
	tb.Helper()
	kinds := []datastoreKind{{name: "memory", open: func(tb testing.TB, _ *schema.Schema) (authz.Datastore, []engine.Option) { return mustMemory(tb), nil }}}
	// AI: the memory datastore with its index, materialize.Snapshot rebuilt on
	// change: the reference implementation of every index query, run through
	// every suite and compared with the walk without a database.
	kinds = append(kinds, datastoreKind{name: "memory+index", indexed: true, open: func(tb testing.TB, sch *schema.Schema) (authz.Datastore, []engine.Option) {
		return mustMemory(tb, memory.WithIndex(sch)), nil
	}})
	p := postgresPool(tb)
	if p == nil {
		return kinds
	}
	kinds = append(kinds,
		datastoreKind{name: "postgres", open: func(tb testing.TB, _ *schema.Schema) (authz.Datastore, []engine.Option) {
			truncatePostgres(tb, p)
			return mustPostgres(tb, p), nil
		}},
		datastoreKind{name: "postgres+closure", indexed: true, open: func(tb testing.TB, sch *schema.Schema) (authz.Datastore, []engine.Option) {
			truncatePostgres(tb, p)
			return mustPostgres(tb, p, postgres.WithNestingIndex()), nil
		}},
		datastoreKind{name: "postgres+sets", indexed: true, open: func(tb testing.TB, sch *schema.Schema) (authz.Datastore, []engine.Option) {
			truncatePostgres(tb, p)
			return mustPostgres(tb, p, postgres.WithIndex(sch)), nil
		}},
	)
	return kinds
}

// mustMemory is a memory datastore with opts, or a failed test.
func mustMemory(tb testing.TB, opts ...memory.Option) *memory.Datastore {
	tb.Helper()
	ds, err := memory.New(opts...)
	if err != nil {
		tb.Fatal(err)
	}
	return ds
}

// mustPostgres is a Postgres datastore on p with opts, or a failed test.
func mustPostgres(tb testing.TB, p *pgxpool.Pool, opts ...postgres.Option) *postgres.Datastore {
	tb.Helper()
	ds, err := postgres.New(p, opts...)
	if err != nil {
		tb.Fatal(err)
	}
	return ds
}
