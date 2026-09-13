package tests

import (
	"context"
	"fmt"
	"os"
	"strconv"
	"testing"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/dsl"
	"github.com/matick-io/authz/engine"
)

// AI: the benchmark scenarios are the data shapes that are known to hurt
// relationship-based access control, each isolating one mechanism:
//
//	wide_team        one userset with many members: fan-out on a single relation
//	deep_nesting     a long chain of nested teams: what the closure index exists for
//	hub_user         one subject in many resources: the by-subject index
//	needle           many resources, one grant: a lookup must not scan the type
//	fan_in           many usersets nested in one resource: closure breadth
//	dag              a layered DAG with many paths: closure size and edge writes
//	arrow_chain      a deep folder hierarchy: the walk the index does not cover
//	wildcard_ban     a public resource with a long ban list: set algebra at size
//
// Every op asserts its expected answer, so a benchmark is also a test, and
// TestScenarios runs each op once under go test. AUTHZ_BENCH_SCALE multiplies
// the sizes; 1 keeps the whole suite under a few seconds on the memory store.

type op struct {
	name string
	run  func(ctx context.Context, svc *engine.Service) error
}

type scenario struct {
	name   string
	schema string
	tuples []authz.Relationship
	ops    []op
}

func scale() int {
	if s, err := strconv.Atoi(os.Getenv("AUTHZ_BENCH_SCALE")); err == nil && s > 0 {
		return s
	}
	return 1
}

func tuple(resourceType, resourceID, relation, subjectType, subjectID, subjectRelation string) authz.Relationship {
	return authz.Relationship{
		Resource: authz.ObjectRef{Type: resourceType, ID: resourceID},
		Relation: relation,
		Subject:  authz.SubjectRef{Object: authz.ObjectRef{Type: subjectType, ID: subjectID}, Relation: subjectRelation},
	}
}

func checkOp(name, resource, permission, subject string, want bool) op {
	return op{name, func(ctx context.Context, svc *engine.Service) error {
		got, err := svc.CheckPermission(ctx, obj(resource), permission, subj(subject))
		if err != nil {
			return err
		}
		if got != want {
			return fmt.Errorf("check %s#%s@%s: got %v want %v", resource, permission, subject, got, want)
		}
		return nil
	}}
}

func lookupOp(name, resourceType, permission, subject string, want int) op {
	return op{name, func(ctx context.Context, svc *engine.Service) error {
		ids, err := svc.LookupResources(ctx, resourceType, permission, subj(subject), 0)
		if err != nil {
			return err
		}
		if len(ids) != want {
			return fmt.Errorf("lookup %s#%s@%s: got %d want %d", resourceType, permission, subject, len(ids), want)
		}
		return nil
	}}
}

func subjectsOp(name, resource, permission, subjectType, subjectRelation string, want int, wantWildcard bool) op {
	return op{name, func(ctx context.Context, svc *engine.Service) error {
		got, err := svc.LookupSubjects(ctx, obj(resource), permission, subjectType, subjectRelation)
		if err != nil {
			return err
		}
		n := len(got.SubjectIDs)
		if got.Wildcard {
			n = len(got.ExcludedSubjectIDs)
		}
		if n != want || got.Wildcard != wantWildcard {
			return fmt.Errorf("subjects %s#%s: got %d (wildcard %v) want %d (wildcard %v)", resource, permission, n, got.Wildcard, want, wantWildcard)
		}
		return nil
	}}
}

func bulkOp(name string, reqs []authz.CheckPermissionRequest, wantTrue int) op {
	return op{name, func(ctx context.Context, svc *engine.Service) error {
		results, err := svc.CheckBulkPermissions(ctx, reqs)
		if err != nil {
			return err
		}
		n := 0
		for _, r := range results {
			if r.Err != nil {
				return r.Err
			}
			if r.HasPermission {
				n++
			}
		}
		if n != wantTrue {
			return fmt.Errorf("bulk: %d true, want %d", n, wantTrue)
		}
		return nil
	}}
}

// toggleOp deletes and re-creates one relationship per iteration, so the
// datastore ends each iteration as it began.
func toggleOp(name string, r authz.Relationship) op {
	return op{name, func(ctx context.Context, svc *engine.Service) error {
		if err := svc.WriteRelationships(ctx, []authz.RelationshipUpdate{{Operation: authz.OperationDelete, Relationship: r}}); err != nil {
			return err
		}
		return svc.WriteRelationships(ctx, []authz.RelationshipUpdate{{Operation: authz.OperationCreate, Relationship: r}})
	}}
}

const teamProjectSchema = `
definition user {}
definition team {
    relation member: user | team#member
}
definition project {
    relation member: user | team#member
    relation owner: user
    permission view = member + owner
}`

func scenarios(scale int) []scenario {
	var out []scenario

	// wide_team: one team of N users nested in one project.
	{
		n := 2000 * scale
		var ts []authz.Relationship
		for i := 0; i < n; i++ {
			ts = append(ts, tuple("team", "big", "member", "user", fmt.Sprintf("u%d", i), ""))
		}
		ts = append(ts, tuple("project", "p", "member", "team", "big", "member"))
		var bulk []authz.CheckPermissionRequest
		for i := 0; i < 200; i++ {
			id := fmt.Sprintf("u%d", i)
			if i%2 == 1 {
				id = fmt.Sprintf("nobody%d", i)
			}
			bulk = append(bulk, authz.CheckPermissionRequest{Resource: obj("project:p"), Permission: "view", Subject: subj("user:" + id)})
		}
		out = append(out, scenario{"wide_team", teamProjectSchema, ts, []op{
			checkOp("check_hit", "project:p", "view", "user:u0", true),
			checkOp("check_miss", "project:p", "view", "user:nobody", false),
			lookupOp("lookup_one_member", "project", "view", "user:u0", 1),
			subjectsOp("subjects_all", "project:p", "view", "user", "", n, false),
			bulkOp("bulk_200", bulk, 100),
			toggleOp("toggle_grant", tuple("team", "big", "member", "user", "u0", "")),
		}})
	}

	// deep_nesting: a chain of K teams; the user sits at the bottom.
	{
		k := 100 * scale
		var ts []authz.Relationship
		for i := 0; i < k-1; i++ {
			ts = append(ts, tuple("team", fmt.Sprintf("t%d", i), "member", "team", fmt.Sprintf("t%d", i+1), "member"))
		}
		ts = append(ts, tuple("team", fmt.Sprintf("t%d", k-1), "member", "user", "deep", ""))
		ts = append(ts, tuple("project", "p", "member", "team", "t0", "member"))
		out = append(out, scenario{"deep_nesting", teamProjectSchema, ts, []op{
			checkOp("check_hit", "project:p", "view", "user:deep", true),
			checkOp("check_miss", "project:p", "view", "user:nobody", false),
			lookupOp("lookup_all_teams", "team", "member", "user:deep", k),
			subjectsOp("subjects_at_top", "project:p", "view", "user", "", 1, false),
			toggleOp("toggle_top_edge", tuple("project", "p", "member", "team", "t0", "member")),
			toggleOp("toggle_bottom_edge", tuple("team", fmt.Sprintf("t%d", k-2), "member", "team", fmt.Sprintf("t%d", k-1), "member")),
		}})
	}

	// hub_user: P projects each with its own owner; one user is a member of every 100th.
	{
		p := 5000 * scale
		var ts []authz.Relationship
		for i := 0; i < p; i++ {
			ts = append(ts, tuple("project", fmt.Sprintf("p%d", i), "owner", "user", fmt.Sprintf("o%d", i), ""))
			if i%100 == 0 {
				ts = append(ts, tuple("project", fmt.Sprintf("p%d", i), "member", "user", "hub", ""))
			}
		}
		out = append(out, scenario{"hub_user", teamProjectSchema, ts, []op{
			lookupOp("lookup_hub", "project", "view", "user:hub", p/100),
			lookupOp("lookup_single_owner", "project", "view", "user:o7", 1),
			checkOp("check_miss", "project:p1", "view", "user:hub", false),
		}})
	}

	// needle: many projects, one grant for the subject asked about.
	{
		p := 20000 * scale
		var ts []authz.Relationship
		for i := 0; i < p; i++ {
			ts = append(ts, tuple("project", fmt.Sprintf("p%d", i), "owner", "user", fmt.Sprintf("o%d", i), ""))
		}
		out = append(out, scenario{"needle", teamProjectSchema, ts, []op{
			lookupOp("lookup_needle", "project", "view", "user:o12345", 1),
			checkOp("check_needle", "project:p12345", "view", "user:o12345", true),
			lookupOp("lookup_nobody", "project", "view", "user:nobody", 0),
		}})
	}

	// fan_in: T teams nested directly in one project; the user is in the last.
	{
		t := 500 * scale
		var ts []authz.Relationship
		for i := 0; i < t; i++ {
			id := fmt.Sprintf("t%d", i)
			ts = append(ts, tuple("project", "p", "member", "team", id, "member"))
			ts = append(ts, tuple("team", id, "member", "user", fmt.Sprintf("m%d", i), ""))
		}
		out = append(out, scenario{"fan_in", teamProjectSchema, ts, []op{
			checkOp("check_last", "project:p", "view", fmt.Sprintf("user:m%d", t-1), true),
			checkOp("check_miss", "project:p", "view", "user:nobody", false),
			subjectsOp("subjects_teams", "project:p", "member", "team", "member", t, false),
			subjectsOp("subjects_users", "project:p", "view", "user", "", t, false),
			lookupOp("lookup_one", "project", "view", fmt.Sprintf("user:m%d", t-1), 1),
		}})
	}

	// dag: L layers of W teams, each nested in every team of the layer above.
	{
		layers, width := 4, 20*scale
		id := func(l, i int) string { return fmt.Sprintf("l%d_%d", l, i) }
		var ts []authz.Relationship
		for l := 0; l < layers-1; l++ {
			for i := 0; i < width; i++ {
				for j := 0; j < width; j++ {
					ts = append(ts, tuple("team", id(l+1, j), "member", "team", id(l, i), "member"))
				}
			}
		}
		ts = append(ts, tuple("team", id(0, 0), "member", "user", "base", ""))
		ts = append(ts, tuple("project", "p", "member", "team", id(layers-1, 0), "member"))
		out = append(out, scenario{"dag", teamProjectSchema, ts, []op{
			checkOp("check_top", "project:p", "view", "user:base", true),
			lookupOp("lookup_all_layers", "team", "member", "user:base", width*(layers-1)+1),
			toggleOp("toggle_bottom_edge", tuple("team", id(1, 0), "member", "team", id(0, 0), "member")),
		}})
	}

	// arrow_chain: folders nested by parent arrows, viewer at the root.
	{
		d := 30 * scale
		var ts []authz.Relationship
		for i := 0; i < d-1; i++ {
			ts = append(ts, tuple("folder", fmt.Sprintf("f%d", i+1), "parent", "folder", fmt.Sprintf("f%d", i), ""))
		}
		ts = append(ts, tuple("folder", "f0", "viewer", "user", "root", ""))
		out = append(out, scenario{"arrow_chain", folderSchema, ts, []op{
			checkOp("check_leaf", fmt.Sprintf("folder:f%d", d-1), "view", "user:root", true),
			checkOp("check_miss", fmt.Sprintf("folder:f%d", d-1), "view", "user:nobody", false),
			lookupOp("lookup_all_folders", "folder", "view", "user:root", d),
			subjectsOp("subjects_leaf", fmt.Sprintf("folder:f%d", d-1), "view", "user", "", 1, false),
		}})
	}

	// wildcard_ban: everyone may view except a long ban list.
	{
		b := 5000 * scale
		var ts []authz.Relationship
		ts = append(ts, tuple("doc", "d", "everyone", "user", "*", ""))
		for i := 0; i < b; i++ {
			ts = append(ts, tuple("doc", "d", "banned", "user", fmt.Sprintf("b%d", i), ""))
		}
		out = append(out, scenario{"wildcard_ban", `
definition user {}
definition doc {
    relation everyone: user:*
    relation banned: user
    permission view = everyone - banned
}`, ts, []op{
			checkOp("check_unbanned", "doc:d", "view", "user:anyone", true),
			checkOp("check_banned", "doc:d", "view", "user:b17", false),
			subjectsOp("subjects_wildcard_minus", "doc:d", "view", "user", "", b, true),
			lookupOp("lookup_banned", "doc", "view", "user:b17", 0),
			lookupOp("lookup_unbanned", "doc", "view", "user:anyone", 1),
		}})
	}

	return out
}

func loadScenario(tb testing.TB, kind datastoreKind, sc scenario) *engine.Service {
	tb.Helper()
	sch, err := dsl.Parse(sc.schema)
	if err != nil {
		tb.Fatal(err)
	}
	ds, opts := kind.open(tb, sch)
	svc, err := engine.New(ds, sch, append([]engine.Option{engine.WithMaxDepth(10000)}, opts...)...)
	if err != nil {
		tb.Fatal(err)
	}
	if err := svc.ImportRelationships(context.Background(), sc.tuples); err != nil {
		tb.Fatalf("seed %s: %v", sc.name, err)
	}
	return svc
}

// TestScenarios runs every benchmark op once, so a wrong expected answer is a
// test failure and not a benchmark that quietly measures the wrong thing.
func TestScenarios(t *testing.T) {
	ctx := context.Background()
	for _, kind := range datastores(t) {
		for _, sc := range scenarios(1) {
			t.Run(sc.name+"/"+kind.name, func(t *testing.T) {
				svc := loadScenario(t, kind, sc)
				for _, o := range sc.ops {
					if err := o.run(ctx, svc); err != nil {
						t.Errorf("%s: %v", o.name, err)
					}
				}
			})
		}
	}
}

func BenchmarkScenarios(b *testing.B) {
	ctx := context.Background()
	for _, sc := range scenarios(scale()) {
		for _, kind := range datastores(b) {
			b.Run(sc.name+"/"+kind.name, func(b *testing.B) {
				svc := loadScenario(b, kind, sc)
				for _, o := range sc.ops {
					b.Run(o.name, func(b *testing.B) {
						b.ReportAllocs()
						for i := 0; i < b.N; i++ {
							if err := o.run(ctx, svc); err != nil {
								b.Fatal(err)
							}
						}
					})
				}
			})
		}
	}
}
