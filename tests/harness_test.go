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
	index "github.com/matick-io/authz/materialize/postgres"
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
		if _, poolErr = pool.Exec(ctx, "drop schema if exists authz cascade"); poolErr != nil {
			return
		}
		if poolErr = postgres.Migrate(ctx, pool); poolErr != nil {
			return
		}
		poolErr = index.Migrate(ctx, pool)
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
	kinds := []datastoreKind{{name: "memory", open: func(testing.TB, *schema.Schema) (authz.Datastore, []engine.Option) { return memory.New(), nil }}}
	p := postgresPool(tb)
	if p == nil {
		return kinds
	}
	kinds = append(kinds,
		datastoreKind{name: "postgres", open: func(tb testing.TB, _ *schema.Schema) (authz.Datastore, []engine.Option) {
			truncatePostgres(tb, p)
			return postgres.New(p), nil
		}},
		datastoreKind{name: "postgres+closure", indexed: true, open: func(tb testing.TB, _ *schema.Schema) (authz.Datastore, []engine.Option) {
			truncatePostgres(tb, p)
			idx, err := index.New()
			if err != nil {
				tb.Fatal(err)
			}
			return postgres.New(p, postgres.WithHook(idx.Hook())), []engine.Option{engine.WithNestingIndex(idx)}
		}},
		datastoreKind{name: "postgres+sets", indexed: true, open: func(tb testing.TB, sch *schema.Schema) (authz.Datastore, []engine.Option) {
			truncatePostgres(tb, p)
			idx, err := index.New(index.WithPermissionSets(sch, index.Materializable(sch)...))
			if err != nil {
				tb.Fatal(err)
			}
			return postgres.New(p, postgres.WithHook(idx.Hook())), []engine.Option{engine.WithNestingIndex(idx), engine.WithPermissionIndex(idx)}
		}},
	)
	return kinds
}

func TestSamples(t *testing.T) {
	for _, kind := range datastores(t) {
		t.Run(kind.name, func(t *testing.T) {
			RunAllSamples(t, "samples", func(t *testing.T, sch *schema.Schema) (authz.Datastore, []engine.Option) { return kind.open(t, sch) })
		})
	}
}
