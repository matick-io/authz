package index_test

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"os"
	"strings"
	"testing"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/postgres"
	"github.com/matick-io/authz/postgres/index"
	"github.com/matick-io/authz/postgres/pgtest"
)

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
	if _, err := pool.Exec(ctx, "drop schema if exists authz cascade; drop table if exists "+postgres.MigrationTable); err != nil {
		t.Fatal(err)
	}
	if err := postgres.Migrate(ctx, pool); err != nil {
		t.Fatal(err)
	}
	return pool
}

func rel(t *testing.T, s string) authz.Relationship {
	t.Helper()
	r, err := authz.ParseRelationship(s)
	if err != nil {
		t.Fatal(err)
	}
	return r
}

func strs(rs []authz.Relationship) []string {
	out := make([]string, len(rs))
	for i, r := range rs {
		out[i] = r.String()
	}
	return out
}

func ptr(s string) *string { return &s }

func readClosure(t *testing.T, pool *pgxpool.Pool) []string {
	t.Helper()
	rows, err := pool.Query(context.Background(), `
		select ancestor_type || ':' || ancestor_id || '#' || ancestor_relation || ' > ' ||
		       descendant_type || ':' || descendant_id || '#' || descendant_relation
		from authz.userset_closure order by 1`)
	if err != nil {
		t.Fatal(err)
	}
	defer rows.Close()
	var out []string
	for rows.Next() {
		var s string
		if err := rows.Scan(&s); err != nil {
			t.Fatal(err)
		}
		out = append(out, s)
	}
	return out
}

// TestNestedQueries exercises the index through every mutation path with the
// hook installed: create, touch, delete, delete-matching, and a cycle.
func TestNestedQueries(t *testing.T) {
	pool := openPool(t)
	idx := mustNew(t)
	ds := postgres.New(pool, postgres.WithHook(idx.Hook()))
	ctx := context.Background()
	write := func(op string, tuples ...string) {
		t.Helper()
		if err := ds.Transact(ctx, func(w authz.Writer) error {
			for _, s := range tuples {
				var err error
				switch op {
				case "create":
					err = w.Create(ctx, rel(t, s))
				case "touch":
					err = w.Touch(ctx, rel(t, s))
				case "delete":
					err = w.Delete(ctx, rel(t, s))
				}
				if err != nil {
					return err
				}
			}
			return nil
		}); err != nil {
			t.Fatalf("%s %v: %v", op, tuples, err)
		}
	}
	nestedRels := func(q authz.RelationshipQuery) []string {
		t.Helper()
		var got []authz.Relationship
		if err := ds.View(ctx, func(r authz.Reader) error {
			var err error
			got, err = idx.NestedRelationships(ctx, r, q)
			return err
		}); err != nil {
			t.Fatalf("NestedRelationships %+v: %v", q, err)
		}
		return strs(got)
	}
	resourceIDs := func(subjectType string, subjectIDs []string, subjectRelation, resourceType, relation string) []string {
		t.Helper()
		var got []string
		if err := ds.View(ctx, func(r authz.Reader) error {
			var err error
			got, err = idx.NestedResourceIDs(ctx, r, subjectType, subjectIDs, subjectRelation, resourceType, relation)
			return err
		}); err != nil {
			t.Fatalf("NestedResourceIDs: %v", err)
		}
		return got
	}
	expect := func(what string, got, want []string) {
		t.Helper()
		if strings.Join(got, ",") != strings.Join(want, ",") {
			t.Errorf("%s: got %v want %v", what, got, want)
		}
	}

	write("create",
		"team:core#member@user:carol",
		"team:core#member@team:leads#member",
		"team:leads#member@user:dave",
		"project:p1#member@user:bob",
		"project:p1#member@team:core#member",
		"project:p1#viewer@user:*",
		"project:p2#member@team:leads#member",
		"org:o#member@team:core#member",
	)

	expect("all nested under p1#member",
		nestedRels(authz.RelationshipQuery{ResourceType: "project", ResourceIDs: []string{"p1"}, Relation: "member"}),
		[]string{"project:p1#member@team:core#member", "project:p1#member@user:bob", "team:core#member@team:leads#member", "team:core#member@user:carol", "team:leads#member@user:dave"})
	expect("users under p1#member",
		nestedRels(authz.RelationshipQuery{ResourceType: "project", ResourceIDs: []string{"p1"}, Relation: "member", SubjectType: "user", SubjectRelation: ptr("")}),
		[]string{"project:p1#member@user:bob", "team:core#member@user:carol", "team:leads#member@user:dave"})
	expect("one user under p1#member",
		nestedRels(authz.RelationshipQuery{ResourceType: "project", ResourceIDs: []string{"p1"}, Relation: "member", SubjectType: "user", SubjectIDs: []string{"dave", "*"}, SubjectRelation: ptr("")}),
		[]string{"team:leads#member@user:dave"})
	expect("limit",
		nestedRels(authz.RelationshipQuery{ResourceType: "project", ResourceIDs: []string{"p1"}, Relation: "member", Limit: 2}),
		[]string{"project:p1#member@team:core#member", "project:p1#member@user:bob"})
	expect("two selectors",
		nestedRels(authz.RelationshipQuery{ResourceType: "project", ResourceIDs: []string{"p1", "p2"}, Relation: "member", SubjectType: "team", SubjectRelation: ptr("member")}),
		[]string{"project:p1#member@team:core#member", "project:p2#member@team:leads#member", "team:core#member@team:leads#member"})
	if err := ds.View(ctx, func(r authz.Reader) error {
		_, err := idx.NestedRelationships(ctx, r, authz.RelationshipQuery{ResourceType: "project"})
		return err
	}); !errors.Is(err, authz.ErrInvalidArgument) {
		t.Errorf("incomplete selector: %v", err)
	}

	expect("dave's projects", resourceIDs("user", []string{"dave"}, "", "project", "member"), []string{"p1", "p2"})
	expect("carol's projects", resourceIDs("user", []string{"carol"}, "", "project", "member"), []string{"p1"})
	expect("bob plus wildcard", resourceIDs("user", []string{"bob", "*"}, "", "project", "member"), []string{"p1"})
	expect("wildcard viewer", resourceIDs("user", []string{"*"}, "", "project", "viewer"), []string{"p1"})
	expect("leads as a userset", resourceIDs("team", []string{"leads"}, "member", "project", "member"), []string{"p1", "p2"})
	expect("leads in orgs", resourceIDs("team", []string{"leads"}, "member", "org", "member"), []string{"o"})
	expect("core in teams", resourceIDs("team", []string{"core"}, "member", "team", "member"), nil)
	expect("empty ids", resourceIDs("user", nil, "", "project", "member"), nil)

	write("delete", "team:core#member@team:leads#member")
	expect("dave after unlink", resourceIDs("user", []string{"dave"}, "", "project", "member"), []string{"p2"})
	write("touch", "team:core#member@team:leads#member")
	expect("dave after relink", resourceIDs("user", []string{"dave"}, "", "project", "member"), []string{"p1", "p2"})

	write("create", "team:a#member@team:b#member", "team:b#member@team:a#member", "team:b#member@user:x", "project:p3#member@team:a#member")
	expect("cycle member", resourceIDs("user", []string{"x"}, "", "team", "member"), []string{"a", "b"})
	expect("cycle reaches project", resourceIDs("user", []string{"x"}, "", "project", "member"), []string{"p3"})
	write("delete", "team:a#member@team:b#member")
	expect("cycle broken", resourceIDs("user", []string{"x"}, "", "team", "member"), []string{"b"})

	var n int64
	if err := ds.Transact(ctx, func(w authz.Writer) error {
		var err error
		n, err = w.DeleteMatching(ctx, authz.RelationshipQuery{ResourceType: "team", ResourceIDs: []string{"core"}})
		return err
	}); err != nil || n != 2 {
		t.Fatalf("sweep: n=%d err=%v", n, err)
	}
	expect("dave after sweep", resourceIDs("user", []string{"dave"}, "", "project", "member"), []string{"p2"})
	expect("carol after sweep", resourceIDs("user", []string{"carol"}, "", "project", "member"), nil)

	if err := ds.View(ctx, func(r authz.Reader) error { return nil }); err != nil {
		t.Fatal(err)
	}
}

// TestClosureMatchesReindex is the invariant the index rests on: after any
// sequence of edge writes and deletes applied through the hook, the
// maintained closure equals the one recomputed from scratch.
func TestClosureMatchesReindex(t *testing.T) {
	pool := openPool(t)
	ds := postgres.New(pool, postgres.WithHook(mustNew(t).Hook()))
	ctx := context.Background()
	rnd := rand.New(rand.NewSource(7))
	const nodes = 7
	present := map[string]bool{}
	for step := 0; step < 300; step++ {
		a, b := rnd.Intn(nodes), rnd.Intn(nodes)
		if a == b {
			continue
		}
		edge := fmt.Sprintf("team:t%d#member@team:t%d#member", b, a)
		user := fmt.Sprintf("team:t%d#member@user:u%d", b, rnd.Intn(4))
		var err error
		var did string
		switch {
		case present[edge] && rnd.Intn(3) == 0:
			did = "delete " + edge
			err = ds.Transact(ctx, func(w authz.Writer) error { return w.Delete(ctx, rel(t, edge)) })
			delete(present, edge)
		case rnd.Intn(10) == 0:
			did = fmt.Sprintf("sweep team:t%d", b)
			err = ds.Transact(ctx, func(w authz.Writer) error {
				_, err := w.DeleteMatching(ctx, authz.RelationshipQuery{ResourceType: "team", ResourceIDs: []string{fmt.Sprintf("t%d", b)}})
				return err
			})
			for k := range present {
				if strings.HasPrefix(k, fmt.Sprintf("team:t%d#", b)) {
					delete(present, k)
				}
			}
		default:
			did = "touch " + edge
			err = ds.Transact(ctx, func(w authz.Writer) error {
				if err := w.Touch(ctx, rel(t, edge)); err != nil {
					return err
				}
				return w.Touch(ctx, rel(t, user))
			})
			present[edge] = true
		}
		if err != nil {
			t.Fatalf("step %d %s: %v", step, did, err)
		}
		maintained := readClosure(t, pool)
		if err := mustNew(t).Reindex(ctx, pool); err != nil {
			t.Fatalf("step %d reindex: %v", step, err)
		}
		recomputed := readClosure(t, pool)
		if strings.Join(maintained, "\n") != strings.Join(recomputed, "\n") {
			t.Fatalf("step %d after %s:\nmaintained:\n%s\nrecomputed:\n%s", step, did,
				strings.Join(maintained, "\n"), strings.Join(recomputed, "\n"))
		}
	}
}

// TestCatchup runs the index asynchronously: writes go in with no hook, the
// follower applies the change log afterwards, and the result equals a
// recomputation.
func TestCatchup(t *testing.T) {
	pool := openPool(t)
	idx := mustNew(t)
	ds := postgres.New(pool)
	ctx := context.Background()
	write := func(fn func(w authz.Writer) error) {
		t.Helper()
		if err := ds.Transact(ctx, fn); err != nil {
			t.Fatal(err)
		}
	}
	write(func(w authz.Writer) error {
		for _, s := range []string{"team:core#member@team:leads#member", "team:leads#member@user:dave", "project:p#member@team:core#member"} {
			if err := w.Create(ctx, rel(t, s)); err != nil {
				return err
			}
		}
		return nil
	})
	if got := readClosure(t, pool); len(got) != 0 {
		t.Fatalf("closure changed without a follower: %v", got)
	}
	applied, err := idx.Catchup(ctx, pool, ds)
	if err != nil || applied != 1 {
		t.Fatalf("catchup: applied=%d err=%v", applied, err)
	}
	maintained := readClosure(t, pool)
	if err := mustNew(t).Reindex(ctx, pool); err != nil {
		t.Fatal(err)
	}
	if strings.Join(maintained, "\n") != strings.Join(readClosure(t, pool), "\n") {
		t.Fatalf("follower diverged from recomputation: %v", maintained)
	}
	write(func(w authz.Writer) error { return w.Delete(ctx, rel(t, "team:core#member@team:leads#member")) })
	write(func(w authz.Writer) error { return w.Create(ctx, rel(t, "project:p#member@team:leads#member")) })
	applied, err = idx.Catchup(ctx, pool, ds)
	if err != nil || applied != 2 {
		t.Fatalf("second catchup: applied=%d err=%v", applied, err)
	}
	maintained = readClosure(t, pool)
	if err := mustNew(t).Reindex(ctx, pool); err != nil {
		t.Fatal(err)
	}
	if strings.Join(maintained, "\n") != strings.Join(readClosure(t, pool), "\n") {
		t.Fatalf("follower diverged after deletes: %v", maintained)
	}
	if applied, err := idx.Catchup(ctx, pool, ds); err != nil || applied != 0 {
		t.Fatalf("caught-up follower applied %d, err %v", applied, err)
	}
}

func TestNestingBudget(t *testing.T) {
	pool := openPool(t)
	ds := postgres.New(pool, postgres.WithHook(mustNew(t, index.WithNestingBudget(2)).Hook()))
	ctx := context.Background()
	touch := func(s string) error {
		return ds.Transact(ctx, func(w authz.Writer) error { return w.Touch(ctx, rel(t, s)) })
	}
	if err := touch("team:t0#member@team:t1#member"); err != nil {
		t.Fatal(err)
	}
	if err := touch("team:t1#member@team:t2#member"); err != nil {
		t.Fatal(err)
	}
	err := touch("team:t2#member@team:t3#member")
	if !errors.Is(err, index.ErrNestingTooLarge) {
		t.Fatalf("want ErrNestingTooLarge, got %v", err)
	}
	var n int
	if err := pool.QueryRow(ctx, "select count(*) from authz.relationship").Scan(&n); err != nil || n != 2 {
		t.Fatalf("the refused write left rows behind: n=%d err=%v", n, err)
	}
	if got := readClosure(t, pool); len(got) != 3 {
		t.Fatalf("closure after refusal: %v", got)
	}
}

func TestIndexRefusesForeignReaders(t *testing.T) {
	idx := mustNew(t)
	_, err := idx.NestedResourceIDs(context.Background(), fakeReader{}, "user", []string{"a"}, "", "project", "member")
	if !errors.Is(err, index.ErrNotPostgres) {
		t.Fatalf("got %v", err)
	}
}

type fakeReader struct{}

func (fakeReader) Relationships(context.Context, authz.RelationshipQuery) ([]authz.Relationship, error) {
	return nil, nil
}
func (fakeReader) RelationshipKinds(context.Context) ([]authz.RelationshipKind, error) {
	return nil, nil
}
func (fakeReader) Changes(context.Context, authz.Revision, int) ([]authz.Change, error) {
	return nil, nil
}

func mustNew(t *testing.T, opts ...index.Option) *index.Index {
	t.Helper()
	idx, err := index.New(opts...)
	if err != nil {
		t.Fatal(err)
	}
	return idx
}

func TestMain(m *testing.M) { os.Exit(pgtest.Main(m)) }
