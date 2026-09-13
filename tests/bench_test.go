package tests

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"testing"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/dsl"
	"github.com/matick-io/authz/engine"
)

// AI: two scenario families, both run against every engine kind, including
// SpiceDB when one is reachable, and named with key=value segments so
// benchstat can pivot on any axis (benchstat -col /kind).
//
// pattern/name=<shape> isolates one mechanism each:
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
// scale/resources=R/density=D/path=P varies the population and the access
// pattern: R resources, each with a few grants to other users (the rules a
// query must look past), and one subject granted D percent of them, either
// directly or through a team. The list operation returns D percent of R, so
// the same op is measured for a sparse and a dense grant.
//
// Every op asserts its expected answer, so a benchmark is also a test, and
// TestScenarios runs each op once under go test. AUTHZ_BENCH_SCALE multiplies
// the sizes.

// authorizer is what a scenario drives: the engine, or another system that
// answers the same questions.
type authorizer interface {
	CheckPermission(ctx context.Context, resource authz.ObjectRef, permission string, subject authz.SubjectRef) (bool, error)
	CheckBulkPermissions(ctx context.Context, requests []authz.CheckPermissionRequest) ([]authz.CheckPermissionResult, error)
	LookupResources(ctx context.Context, resourceType, permission string, subject authz.SubjectRef, limit int) ([]string, error)
	LookupSubjects(ctx context.Context, resource authz.ObjectRef, permission, subjectType, subjectRelation string) (*authz.LookupSubjectsResult, error)
	WriteRelationships(ctx context.Context, updates []authz.RelationshipUpdate, preconditions ...authz.Precondition) error
	ImportRelationships(ctx context.Context, rels []authz.Relationship) error
}

// benchKind is one engine configuration: open builds it for a schema, empty.
type benchKind struct {
	name string
	open func(tb testing.TB, schemaText string) authorizer
}

// benchKinds wraps every datastore kind as an engine, and adds SpiceDB when
// AUTHZ_BENCH_SPICEDB_ENDPOINT is set.
func benchKinds(tb testing.TB) []benchKind {
	tb.Helper()
	var kinds []benchKind
	for _, dk := range datastores(tb) {
		dk := dk
		kinds = append(kinds, benchKind{name: dk.name, open: func(tb testing.TB, schemaText string) authorizer {
			tb.Helper()
			sch, err := dsl.Parse(schemaText)
			if err != nil {
				tb.Fatal(err)
			}
			ds, opts := dk.open(tb, sch)
			svc, err := engine.New(ds, sch, append([]engine.Option{engine.WithMaxDepth(10000)}, opts...)...)
			if err != nil {
				tb.Fatal(err)
			}
			return svc
		}})
	}
	if sk, ok := spicedbKind(tb); ok {
		kinds = append(kinds, sk)
	}
	return kinds
}

type op struct {
	name string
	run  func(ctx context.Context, a authorizer) error
}

// errUnsupported marks an answer a kind cannot give at all, such as SpiceDB
// refusing a nesting deeper than its dispatch limit. It is reported, not
// counted as a failure, and leaves the kind's cell empty in the comparison.
var errUnsupported = errors.New("unsupported by this kind")

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
	return op{name, func(ctx context.Context, a authorizer) error {
		got, err := a.CheckPermission(ctx, obj(resource), permission, subj(subject))
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
	return op{name, func(ctx context.Context, a authorizer) error {
		ids, err := a.LookupResources(ctx, resourceType, permission, subj(subject), 0)
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
	return op{name, func(ctx context.Context, a authorizer) error {
		got, err := a.LookupSubjects(ctx, obj(resource), permission, subjectType, subjectRelation)
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
	return op{name, func(ctx context.Context, a authorizer) error {
		results, err := a.CheckBulkPermissions(ctx, reqs)
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
	return op{name, func(ctx context.Context, a authorizer) error {
		if err := a.WriteRelationships(ctx, []authz.RelationshipUpdate{{Operation: authz.OperationDelete, Relationship: r}}); err != nil {
			return err
		}
		return a.WriteRelationships(ctx, []authz.RelationshipUpdate{{Operation: authz.OperationTouch, Relationship: r}})
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

func patternScenarios(scale int) []scenario {
	var out []scenario
	named := func(n string) string { return "pattern/name=" + n }

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
		out = append(out, scenario{named("wide_team"), teamProjectSchema, ts, []op{
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
		out = append(out, scenario{named("deep_nesting"), teamProjectSchema, ts, []op{
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
		out = append(out, scenario{named("hub_user"), teamProjectSchema, ts, []op{
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
		out = append(out, scenario{named("needle"), teamProjectSchema, ts, []op{
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
		out = append(out, scenario{named("fan_in"), teamProjectSchema, ts, []op{
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
		out = append(out, scenario{named("dag"), teamProjectSchema, ts, []op{
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
		out = append(out, scenario{named("arrow_chain"), folderSchema, ts, []op{
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
		out = append(out, scenario{named("wildcard_ban"), `
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

// scaleScenarios builds the resources × density × path grid. Each resource
// carries `noise` grants to other users, so every question has rules to look
// past; the subject "hub" holds density percent of the resources. base is
// the smallest population; the grid is base, ten times and a hundred times.
func scaleScenarios(base int) []scenario {
	const noise = 3
	type axis struct {
		resources int
		density   int // percent
		nested    bool
	}
	var grid []axis
	for _, r := range []int{base, base * 10, base * 100} {
		grid = append(grid, axis{r, 10, false}, axis{r, 90, false}, axis{r, 10, true})
	}
	var out []scenario
	for _, ax := range grid {
		rnd := rand.New(rand.NewSource(int64(ax.resources*100 + ax.density)))
		path := "direct"
		if ax.nested {
			path = "team"
		}
		name := fmt.Sprintf("scale/resources=%d/density=%d/path=%s", ax.resources, ax.density, path)
		var ts []authz.Relationship
		if ax.nested {
			ts = append(ts, tuple("team", "hubs", "member", "user", "hub", ""))
		}
		granted := 0
		var firstGranted, firstDenied string
		for i := 0; i < ax.resources; i++ {
			id := fmt.Sprintf("r%d", i)
			picked := map[int]bool{}
			for len(picked) < noise {
				u := rnd.Intn(ax.resources)
				if picked[u] {
					continue
				}
				picked[u] = true
				ts = append(ts, tuple("project", id, "member", "user", fmt.Sprintf("u%d", u), ""))
			}
			// Resource 0 is always granted and resource 1 always denied, so
			// the point questions have a target at any size; the rest follow
			// the density.
			grant := i == 0 || (i > 1 && rnd.Intn(100) < ax.density)
			if grant {
				granted++
				if firstGranted == "" {
					firstGranted = id
				}
				if ax.nested {
					ts = append(ts, tuple("project", id, "member", "team", "hubs", "member"))
				} else {
					ts = append(ts, tuple("project", id, "member", "user", "hub", ""))
				}
			} else if firstDenied == "" {
				firstDenied = id
			}
		}
		var bulk []authz.CheckPermissionRequest
		for i := 0; i < 100; i++ {
			bulk = append(bulk, authz.CheckPermissionRequest{Resource: obj("project:r" + strconv.Itoa(i)), Permission: "view", Subject: subj("user:hub")})
		}
		bulkTrue := 0
		for _, r := range ts {
			if r.Relation == "member" && (r.Subject.Object.ID == "hub" || r.Subject.Object.ID == "hubs") && r.Resource.Type == "project" {
				if n, err := strconv.Atoi(r.Resource.ID[1:]); err == nil && n < 100 {
					bulkTrue++
				}
			}
		}
		ops := []op{
			lookupOp("lookup", "project", "view", "user:hub", granted),
			checkOp("check_hit", "project:"+firstGranted, "view", "user:hub", true),
			checkOp("check_miss", "project:"+firstDenied, "view", "user:hub", false),
			bulkOp("bulk_100", bulk, bulkTrue),
			subjectsOp("subjects_one", "project:"+firstDenied, "view", "user", "", countUsers(ts, firstDenied), false),
		}
		if ax.nested {
			ops = append(ops, toggleOp("toggle_team_edge", tuple("project", firstGranted, "member", "team", "hubs", "member")))
		} else {
			ops = append(ops, toggleOp("toggle_grant", tuple("project", firstGranted, "member", "user", "hub", "")))
		}
		out = append(out, scenario{name, teamProjectSchema, ts, ops})
	}
	return out
}

// countUsers counts the distinct users directly granted on a project.
func countUsers(ts []authz.Relationship, projectID string) int {
	seen := map[string]bool{}
	for _, r := range ts {
		if r.Resource.Type == "project" && r.Resource.ID == projectID && r.Subject.Object.Type == "user" {
			seen[r.Subject.Object.ID] = true
		}
	}
	return len(seen)
}

// scenarios is the full grid at benchmark size; testScenarios the same grid
// with the population two orders of magnitude smaller, so a correctness run
// on every kind stays short.
func scenarios(scale int) []scenario {
	return append(patternScenarios(scale), scaleScenarios(1_000*scale)...)
}

func testScenarios() []scenario {
	return append(patternScenarios(1), scaleScenarios(10)...)
}

func loadScenario(tb testing.TB, kind benchKind, sc scenario) authorizer {
	tb.Helper()
	a := kind.open(tb, sc.schema)
	if err := a.ImportRelationships(context.Background(), sc.tuples); err != nil {
		tb.Fatalf("seed %s on %s: %v", sc.name, kind.name, err)
	}
	return a
}

// TestScenarios runs every op once on every kind, so a wrong expected answer
// is a test failure and not a benchmark that quietly measures the wrong
// thing, and every kind, SpiceDB included, is held to the same answers.
func TestScenarios(t *testing.T) {
	ctx := context.Background()
	for _, kind := range benchKinds(t) {
		for _, sc := range testScenarios() {
			t.Run(sc.name+"/kind="+kind.name, func(t *testing.T) {
				a := loadScenario(t, kind, sc)
				for _, o := range sc.ops {
					err := o.run(ctx, a)
					switch {
					case errors.Is(err, errUnsupported):
						t.Logf("%s: %v", o.name, err)
					case err != nil:
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
		for _, kind := range benchKinds(b) {
			b.Run(sc.name+"/kind="+kind.name, func(b *testing.B) {
				a := loadScenario(b, kind, sc)
				for _, o := range sc.ops {
					b.Run(o.name, func(b *testing.B) {
						b.ReportAllocs()
						for i := 0; i < b.N; i++ {
							err := o.run(ctx, a)
							if errors.Is(err, errUnsupported) {
								b.Skip(err)
							}
							if err != nil {
								b.Fatal(err)
							}
						}
					})
				}
			})
		}
	}
}
