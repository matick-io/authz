package index_test

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"strings"
	"testing"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/dsl"
	"github.com/matick-io/authz/engine"
	"github.com/matick-io/authz/postgres"
	"github.com/matick-io/authz/postgres/index"
	"github.com/matick-io/authz/schema"
)

const hierarchySchema = `
definition user {}
definition team {
    relation member: user | team#member
}
definition organization {
    relation admin: user
    permission manage = admin
}
definition folder {
    relation organization: organization
    relation parent: folder
    relation owner: user | team#member
    relation viewer: user | team#member
    relation public: user:*
    permission view = viewer + owner + parent->view
    permission edit = owner + parent->edit + organization->manage
    permission view_or_public = view + public
    permission owner_only = owner - viewer
}
definition document {
    relation parent: folder
    relation viewer: user
    permission view = viewer + parent->view
}
`

func parse(t *testing.T, text string) *schema.Schema {
	t.Helper()
	sch, err := dsl.Parse(text)
	if err != nil {
		t.Fatal(err)
	}
	return sch
}

func TestMaterializable(t *testing.T) {
	sch := parse(t, hierarchySchema)
	got := strings.Join(index.Materializable(sch), ",")
	want := "document#view,folder#edit,folder#view,organization#manage"
	if got != want {
		t.Fatalf("materializable: got %s want %s", got, want)
	}
	for _, bad := range []string{"folder#view_or_public", "folder#owner_only", "folder#owner", "ghost#view", "folder#ghost", "noseparator"} {
		_, err := index.New(index.WithPermissionSets(sch, bad))
		if err == nil {
			t.Errorf("%s: accepted", bad)
		}
	}
	if _, err := index.New(index.WithPermissionSets(sch, "folder#view_or_public")); !errors.Is(err, index.ErrNotMaterializable) {
		t.Errorf("wildcard path: %v", err)
	}
	// A wildcard behind a userset, however deep, is a wildcard on the path.
	nested := parse(t, `
definition user {}
definition team {
    relation member: user | user:* | team#member
}
definition group {
    relation member: user | team#member
}
definition doc {
    relation viewer: user | group#member
    relation owner: user
    permission view = viewer + owner
    permission own = owner
}`)
	if got := strings.Join(index.Materializable(nested), ","); got != "doc#own" {
		t.Errorf("materializable with a nested wildcard: got %s want doc#own", got)
	}
	if _, err := index.New(index.WithPermissionSets(nested, "doc#view")); !errors.Is(err, index.ErrNotMaterializable) {
		t.Errorf("nested wildcard: %v", err)
	}
	if _, err := index.New(index.WithPermissionSets(sch, "folder#owner_only")); !errors.Is(err, index.ErrNotMaterializable) {
		t.Errorf("exclusion: %v", err)
	}
	if _, err := index.New(index.WithPermissionSets(sch, "folder#owner")); !errors.Is(err, index.ErrNotMaterializable) {
		t.Errorf("relation: %v", err)
	}
	if _, err := index.New(index.WithPermissionSets(sch, "ghost#view")); !errors.Is(err, authz.ErrInvalidArgument) {
		t.Errorf("unknown type: %v", err)
	}
	idx, err := index.New(index.WithPermissionSets(sch, index.Materializable(sch)...))
	if err != nil {
		t.Fatal(err)
	}
	if !idx.Materialized("folder", "view") || idx.Materialized("folder", "owner_only") || idx.Materialized("folder", "owner") {
		t.Fatal("Materialized reports the wrong set")
	}
}

type fixture struct {
	pool *pgxpool.Pool
	idx  *index.Index
	ds   *postgres.Datastore
	svc  *engine.Service
}

func newFixture(t *testing.T, sch *schema.Schema) *fixture {
	t.Helper()
	pool := openPool(t)
	a, err := index.Attach(pool, sch)
	if err != nil {
		t.Fatal(err)
	}
	svc, err := engine.New(a.Datastore, sch, a.Options...)
	if err != nil {
		t.Fatal(err)
	}
	return &fixture{pool: pool, idx: a.Index, ds: a.Datastore, svc: svc}
}

func (f *fixture) write(t *testing.T, op authz.UpdateOperation, tuples ...string) {
	t.Helper()
	var ups []authz.RelationshipUpdate
	for _, s := range tuples {
		ups = append(ups, authz.RelationshipUpdate{Operation: op, Relationship: rel(t, s)})
	}
	if err := f.svc.WriteRelationships(context.Background(), ups); err != nil {
		t.Fatalf("%v: %v", tuples, err)
	}
}

func readSets(t *testing.T, pool *pgxpool.Pool) []string {
	t.Helper()
	rows, err := pool.Query(context.Background(), `
		select resource_type || ':' || resource_id || '#' || permission || ' <- ' || set_type || ':' || set_id || '#' || set_relation
		from authz.permission_set order by 1`)
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

func obj(s string) authz.ObjectRef {
	typ, id, _ := strings.Cut(s, ":")
	return authz.ObjectRef{Type: typ, ID: id}
}

func subj(s string) authz.SubjectRef {
	o, r, _ := strings.Cut(s, "#")
	return authz.SubjectRef{Object: obj(o), Relation: r}
}

// TestPermissionSetsAnswer drives the engine through the permission index on
// a folder hierarchy with nested teams and an organisation reached by arrow.
func TestPermissionSetsAnswer(t *testing.T) {
	f := newFixture(t, parse(t, hierarchySchema))
	ctx := context.Background()
	f.write(t, authz.OperationCreate,
		"team:core#member@team:leads#member",
		"team:leads#member@user:dave",
		"organization:acme#admin@user:erin",
		"folder:root#organization@organization:acme",
		"folder:root#owner@user:alice",
		"folder:a#parent@folder:root",
		"folder:a#viewer@team:core#member",
		"folder:b#parent@folder:a",
		"document:d#parent@folder:b",
		"document:d#viewer@user:vic",
	)
	sets := readSets(t, f.pool)
	for _, want := range []string{
		"document:d#view <- folder:b#viewer",
		"document:d#view <- folder:a#viewer",
		"document:d#view <- folder:root#owner",
		"folder:b#edit <- folder:root#owner",
		"folder:b#edit <- organization:acme#admin",
	} {
		found := false
		for _, s := range sets {
			if s == want {
				found = true
			}
		}
		if !found {
			t.Errorf("missing set row %q in %v", want, sets)
		}
	}
	checks := []struct {
		resource, permission, subject string
		want                          bool
	}{
		{"document:d", "view", "user:vic", true},
		{"document:d", "view", "user:dave", true},  // nested team on an ancestor folder
		{"document:d", "view", "user:alice", true}, // root owner
		{"document:d", "view", "user:erin", false}, // organization admin edits but does not view
		{"folder:b", "edit", "user:erin", true},
		{"folder:b", "edit", "user:alice", true},
		{"folder:b", "edit", "user:dave", false},
		{"folder:a", "view", "team:leads#member", true}, // userset subject through nesting
		{"folder:a", "view", "team:core#member", true},  // the set itself
		{"document:d", "view", "user:nobody", false},
	}
	for _, c := range checks {
		got, err := f.svc.CheckPermission(ctx, obj(c.resource), c.permission, subj(c.subject))
		if err != nil || got != c.want {
			t.Errorf("check %s#%s@%s: got %v want %v (err %v)", c.resource, c.permission, c.subject, got, c.want, err)
		}
	}
	lookups := []struct {
		typ, permission, subject, want string
	}{
		{"folder", "view", "user:dave", "a,b"},
		{"folder", "view", "user:alice", "a,b,root"},
		{"folder", "edit", "user:erin", "a,b,root"},
		{"document", "view", "user:dave", "d"},
		{"document", "view", "user:erin", ""},
		{"folder", "view", "team:leads#member", "a,b"},
	}
	for _, l := range lookups {
		ids, err := f.svc.LookupResources(ctx, l.typ, l.permission, subj(l.subject), 0)
		if err != nil || strings.Join(ids, ",") != l.want {
			t.Errorf("lookup %s#%s@%s: got %v want %q (err %v)", l.typ, l.permission, l.subject, ids, l.want, err)
		}
	}
	subjects, err := f.svc.LookupSubjects(ctx, obj("document:d"), "view", "user", "")
	if err != nil || strings.Join(subjects.SubjectIDs, ",") != "alice,dave,vic" {
		t.Errorf("subjects: %+v %v", subjects, err)
	}
	teams, err := f.svc.LookupSubjects(ctx, obj("document:d"), "view", "team", "member")
	if err != nil || strings.Join(teams.SubjectIDs, ",") != "core,leads" {
		t.Errorf("team subjects: %+v %v", teams, err)
	}

	// Re-parenting b under root drops a's viewers from d.
	f.write(t, authz.OperationDelete, "folder:b#parent@folder:a")
	f.write(t, authz.OperationCreate, "folder:b#parent@folder:root")
	if ok, _ := f.svc.CheckPermission(ctx, obj("document:d"), "view", subj("user:dave")); ok {
		t.Error("dave still views d after b was re-parented")
	}
	if ok, _ := f.svc.CheckPermission(ctx, obj("document:d"), "view", subj("user:alice")); !ok {
		t.Error("alice lost d after b was re-parented under root")
	}
	// Removing the organisation removes erin's edit everywhere below.
	f.write(t, authz.OperationDelete, "folder:root#organization@organization:acme")
	if ids, _ := f.svc.LookupResources(ctx, "folder", "edit", subj("user:erin"), 0); len(ids) != 0 {
		t.Errorf("erin still edits %v", ids)
	}
	// The unmaterialised permissions still answer through the rewrite.
	f.write(t, authz.OperationCreate, "folder:a#public@user:*")
	if ok, err := f.svc.CheckPermission(ctx, obj("folder:a"), "view_or_public", subj("user:anyone")); err != nil || !ok {
		t.Errorf("unmaterialised wildcard permission: %v %v", ok, err)
	}
}

// TestPermissionSetsMatchReindex is the invariant: after any sequence of
// writes and deletes applied through the hook, the maintained sets equal a
// recomputation from scratch.
func TestPermissionSetsMatchReindex(t *testing.T) {
	f := newFixture(t, parse(t, hierarchySchema))
	ctx := context.Background()
	rnd := rand.New(rand.NewSource(11))
	folders := []string{"f0", "f1", "f2", "f3", "f4", "f5"}
	teams := []string{"t0", "t1", "t2"}
	present := map[string]bool{}
	candidates := func() []string {
		var out []string
		for _, a := range folders {
			for _, b := range folders {
				if a != b {
					out = append(out, fmt.Sprintf("folder:%s#parent@folder:%s", a, b))
				}
			}
			for _, tm := range teams {
				out = append(out, fmt.Sprintf("folder:%s#owner@team:%s#member", a, tm))
				out = append(out, fmt.Sprintf("folder:%s#viewer@team:%s#member", a, tm))
			}
			out = append(out, fmt.Sprintf("folder:%s#owner@user:u%s", a, a))
			out = append(out, fmt.Sprintf("folder:%s#organization@organization:acme", a))
			out = append(out, fmt.Sprintf("document:d%s#parent@folder:%s", a, a))
		}
		for _, a := range teams {
			for _, b := range teams {
				if a != b {
					out = append(out, fmt.Sprintf("team:%s#member@team:%s#member", a, b))
				}
			}
		}
		return out
	}()
	for step := 0; step < 200; step++ {
		tuple := candidates[rnd.Intn(len(candidates))]
		var err error
		if present[tuple] && rnd.Intn(2) == 0 {
			err = f.svc.WriteRelationships(ctx, []authz.RelationshipUpdate{{Operation: authz.OperationDelete, Relationship: rel(t, tuple)}})
			delete(present, tuple)
		} else {
			err = f.svc.WriteRelationships(ctx, []authz.RelationshipUpdate{{Operation: authz.OperationTouch, Relationship: rel(t, tuple)}})
			present[tuple] = true
		}
		if err != nil {
			t.Fatalf("step %d %s: %v", step, tuple, err)
		}
		maintained := readSets(t, f.pool)
		maintainedClosure := readClosure(t, f.pool)
		if err := f.idx.Reindex(ctx, f.pool); err != nil {
			t.Fatalf("step %d reindex: %v", step, err)
		}
		if got := readSets(t, f.pool); strings.Join(maintained, "\n") != strings.Join(got, "\n") {
			t.Fatalf("step %d after %s: permission sets diverged\nmaintained:\n%s\nrecomputed:\n%s", step, tuple,
				strings.Join(maintained, "\n"), strings.Join(got, "\n"))
		}
		if got := readClosure(t, f.pool); strings.Join(maintainedClosure, "\n") != strings.Join(got, "\n") {
			t.Fatalf("step %d after %s: closure diverged", step, tuple)
		}
	}
}

// TestPermissionSetsCatchup runs the sets asynchronously.
func TestPermissionSetsCatchup(t *testing.T) {
	sch := parse(t, hierarchySchema)
	pool := openPool(t)
	idx, err := index.New(index.WithPermissionSets(sch, index.Materializable(sch)...))
	if err != nil {
		t.Fatal(err)
	}
	ds := postgres.New(pool)
	svc, err := engine.New(ds, sch)
	if err != nil {
		t.Fatal(err)
	}
	ctx := context.Background()
	var ups []authz.RelationshipUpdate
	for _, s := range []string{"folder:root#owner@user:alice", "folder:a#parent@folder:root", "document:d#parent@folder:a"} {
		ups = append(ups, authz.RelationshipUpdate{Operation: authz.OperationCreate, Relationship: rel(t, s)})
	}
	if err := svc.WriteRelationships(ctx, ups); err != nil {
		t.Fatal(err)
	}
	if got := readSets(t, pool); len(got) != 0 {
		t.Fatalf("sets changed without a follower: %v", got)
	}
	if applied, err := idx.Catchup(ctx, pool, ds); err != nil || applied != 1 {
		t.Fatalf("catchup: applied=%d err=%v", applied, err)
	}
	maintained := readSets(t, pool)
	if err := idx.Reindex(ctx, pool); err != nil {
		t.Fatal(err)
	}
	if got := readSets(t, pool); strings.Join(maintained, "\n") != strings.Join(got, "\n") {
		t.Fatalf("follower diverged:\n%v\n%v", maintained, got)
	}
	indexed, err := engine.New(ds, sch, idx.Options()...)
	if err != nil {
		t.Fatal(err)
	}
	if ok, err := indexed.CheckPermission(ctx, obj("document:d"), "view", subj("user:alice")); err != nil || !ok {
		t.Fatalf("check through the followed index: %v %v", ok, err)
	}
}
