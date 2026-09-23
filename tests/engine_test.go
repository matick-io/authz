package tests

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"testing"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/datastore/memory"
	"github.com/matick-io/authz/engine"
	"github.com/matick-io/authz/schema/dsl"
)

// AI: these tests run on the memory datastore, which has no index, so they
// exercise the walking resolvers; the samples and scenarios run the same
// questions against every datastore kind, index included.
//
// The fixture schema is shaped like a product's collaboration graph:
// nested teams, organisations that reach projects through an arrow, a public
// wildcard, an exclusion, and reviews that inherit from their project.
const productSchema = `
definition user {}

definition team {
    relation member: user | team#member
}

definition organization {
    relation admin: user
    relation member: user | team#member
    permission view = member + admin
    permission manage = admin
}

definition project {
    relation organization: organization
    relation owner: user
    relation member: user | team#member
    relation viewer: user | user:*
    relation banned: user
    permission view = (member + owner + viewer + organization->view) - banned
    permission edit = owner + organization->manage
    permission manage_members = owner & member
}

definition review {
    relation project: project
    relation recipient: user | team#member
    permission view = recipient + project->view
    permission comment = recipient
}
`

var productTuples = []string{
	"team:core#member@user:carol",
	"team:core#member@team:leads#member",
	"team:leads#member@user:dave",
	"organization:acme#admin@user:erin",
	"organization:acme#member@team:core#member",
	"project:p1#organization@organization:acme",
	"project:p1#owner@user:alice",
	"project:p1#member@user:bob",
	"project:p1#member@team:core#member",
	"project:p1#banned@user:carol",
	"project:p2#viewer@user:*",
	"project:p2#owner@user:alice",
	"project:p2#banned@user:hank",
	"project:p3#owner@user:frank",
	"project:p3#member@user:frank",
	"project:p3#member@user:bob",
	"review:r1#project@project:p1",
	"review:r1#recipient@user:gina",
	"review:r2#project@project:p3",
	"review:r2#recipient@team:leads#member",
}

func obj(s string) authz.ObjectRef {
	typ, id, _ := strings.Cut(s, ":")
	return authz.ObjectRef{Type: typ, ID: id}
}

func subj(s string) authz.SubjectRef {
	o, rel, _ := strings.Cut(s, "#")
	return authz.SubjectRef{Object: obj(o), Relation: rel}
}

func rel(t testing.TB, s string) authz.Relationship {
	t.Helper()
	r, err := authz.ParseRelationship(s)
	if err != nil {
		t.Fatal(err)
	}
	return r
}

func updates(t testing.TB, op authz.UpdateOperation, tuples ...string) []authz.RelationshipUpdate {
	t.Helper()
	out := make([]authz.RelationshipUpdate, 0, len(tuples))
	for _, s := range tuples {
		out = append(out, authz.RelationshipUpdate{Operation: op, Relationship: rel(t, s)})
	}
	return out
}

func newService(t *testing.T, schemaText string, tuples []string, opts ...engine.Option) (*engine.Service, *memory.Datastore) {
	t.Helper()
	sch, err := dsl.Parse(schemaText)
	if err != nil {
		t.Fatal(err)
	}
	ds := mustMemory(t)
	svc, err := engine.New(ds, sch, opts...)
	if err != nil {
		t.Fatal(err)
	}
	ctx := context.Background()
	if len(tuples) > 0 {
		if err := svc.WriteRelationships(ctx, updates(t, authz.OperationCreate, tuples...)); err != nil {
			t.Fatal(err)
		}
	}
	return svc, ds
}

func join(ids []string) string { return strings.Join(ids, ",") }

func TestCheckPermission(t *testing.T) {
	svc, _ := newService(t, productSchema, productTuples)
	ctx := context.Background()
	cases := []struct {
		resource, permission, subject string
		want                          bool
	}{
		{"project:p1", "view", "user:alice", true},  // owner
		{"project:p1", "view", "user:bob", true},    // member
		{"project:p1", "view", "user:carol", false}, // member via team, but banned
		{"project:p1", "view", "user:dave", true},   // member via nested team
		{"project:p1", "view", "user:erin", true},   // organization admin, through the arrow
		{"project:p1", "view", "user:zed", false},   // nobody
		{"project:p1", "edit", "user:erin", true},   // organization->manage
		{"project:p1", "edit", "user:bob", false},   // members do not edit
		{"project:p2", "view", "user:zed", true},    // wildcard
		{"project:p2", "view", "user:hank", false},  // wildcard minus banned
		{"project:p3", "manage_members", "user:frank", true},
		{"project:p3", "manage_members", "user:bob", false}, // member but not owner
		{"project:p1", "manage_members", "user:alice", false},
		{"review:r1", "view", "user:gina", true},   // recipient
		{"review:r1", "view", "user:bob", true},    // project->view
		{"review:r1", "view", "user:carol", false}, // banned upstream, not a recipient
		{"review:r1", "comment", "user:bob", false},
		{"review:r2", "view", "user:dave", true},            // recipient via team
		{"review:r2", "view", "user:frank", true},           // owner of the project
		{"project:p1", "member", "team:core#member", true},  // userset subject, direct
		{"project:p1", "member", "team:leads#member", true}, // userset subject, nested
		{"team:core", "member", "team:core#member", true},   // a userset is a member of itself
		{"team:core", "member", "team:other#member", false},
	}
	for _, tc := range cases {
		got, err := svc.CheckPermission(ctx, obj(tc.resource), tc.permission, subj(tc.subject))
		if err != nil {
			t.Errorf("%s#%s@%s: %v", tc.resource, tc.permission, tc.subject, err)
			continue
		}
		if got != tc.want {
			t.Errorf("%s#%s@%s: got %v want %v", tc.resource, tc.permission, tc.subject, got, tc.want)
		}
	}
}

func TestCheckPermissionRejectsUnknownNames(t *testing.T) {
	svc, _ := newService(t, productSchema, productTuples)
	ctx := context.Background()
	bad := []struct{ resource, permission, subject string }{
		{"ghost:1", "view", "user:alice"},
		{"project:p1", "ghost", "user:alice"},
		{"project:p1", "view", "ghost:alice"},
		{"project:p1", "view", "team:core#ghost"},
		{"project:p1", "view", "user:*"},
		{"project:p1", "View", "user:alice"},
		{"project:", "view", "user:alice"},
	}
	for _, tc := range bad {
		_, err := svc.CheckPermission(ctx, obj(tc.resource), tc.permission, subj(tc.subject))
		if !errors.Is(err, authz.ErrInvalidArgument) {
			t.Errorf("%s#%s@%s: want ErrInvalidArgument, got %v", tc.resource, tc.permission, tc.subject, err)
		}
	}
}

func TestNewRejectsMissingParts(t *testing.T) {
	sch, err := dsl.Parse(productSchema)
	if err != nil {
		t.Fatal(err)
	}
	if _, err := engine.New(nil, sch); !errors.Is(err, authz.ErrInvalidArgument) {
		t.Errorf("nil datastore: %v", err)
	}
	if _, err := engine.New(mustMemory(t), nil); !errors.Is(err, authz.ErrInvalidArgument) {
		t.Errorf("nil schema: %v", err)
	}
}

func TestCheckBulkPermissions(t *testing.T) {
	svc, _ := newService(t, productSchema, productTuples)
	results, err := svc.CheckBulkPermissions(context.Background(), []authz.CheckPermissionRequest{
		{Resource: obj("project:p1"), Permission: "view", Subject: subj("user:alice")},
		{Resource: obj("project:p1"), Permission: "view", Subject: subj("user:zed")},
		{Resource: obj("project:p1"), Permission: "ghost", Subject: subj("user:alice")},
		{Resource: obj("review:r2"), Permission: "view", Subject: subj("user:dave")},
	})
	if err != nil {
		t.Fatal(err)
	}
	if !results[0].HasPermission || results[0].Err != nil {
		t.Errorf("item 0: %+v", results[0])
	}
	if results[1].HasPermission || results[1].Err != nil {
		t.Errorf("item 1: %+v", results[1])
	}
	if !errors.Is(results[2].Err, authz.ErrInvalidArgument) {
		t.Errorf("item 2: %+v", results[2])
	}
	if !results[3].HasPermission || results[3].Err != nil {
		t.Errorf("item 3: %+v", results[3])
	}
}

func TestCyclesResolveWithoutError(t *testing.T) {
	svc, _ := newService(t, productSchema, []string{
		"team:a#member@team:b#member",
		"team:b#member@team:a#member",
		"team:b#member@user:x",
		"project:p#member@team:a#member",
	})
	ctx := context.Background()
	if ok, err := svc.CheckPermission(ctx, obj("project:p"), "view", subj("user:nobody")); err != nil || ok {
		t.Fatalf("nobody: %v %v", ok, err)
	}
	if ok, err := svc.CheckPermission(ctx, obj("project:p"), "view", subj("user:x")); err != nil || !ok {
		t.Fatalf("x: %v %v", ok, err)
	}
	ids, err := svc.LookupResources(ctx, "project", "view", subj("user:x"), 0)
	if err != nil || join(ids) != "p" {
		t.Fatalf("lookup: %v %v", ids, err)
	}
	subjects, err := svc.LookupSubjects(ctx, obj("project:p"), "view", "user", "")
	if err != nil || join(subjects.SubjectIDs) != "x" {
		t.Fatalf("subjects: %+v %v", subjects, err)
	}
}

const folderSchema = `
definition user {}
definition folder {
    relation parent: folder
    relation viewer: user
    permission view = viewer + parent->view
}`

// Arrows are walked hop by hop, so a hierarchy deeper than the limit is an
// error in every direction rather than a silently truncated answer.
func TestMaxDepthOnArrows(t *testing.T) {
	var chain []string
	for i := 0; i < 8; i++ {
		chain = append(chain, fmt.Sprintf("folder:f%d#parent@folder:f%d", i, i+1))
	}
	chain = append(chain, "folder:f8#viewer@user:zoe")
	svc, _ := newService(t, folderSchema, chain, engine.WithMaxDepth(5))
	ctx := context.Background()
	if _, err := svc.CheckPermission(ctx, obj("folder:f0"), "view", subj("user:zoe")); !errors.Is(err, authz.ErrMaxDepthExceeded) {
		t.Fatalf("check: %v", err)
	}
	if _, err := svc.LookupResources(ctx, "folder", "view", subj("user:zoe"), 0); !errors.Is(err, authz.ErrMaxDepthExceeded) {
		t.Fatalf("lookup: %v", err)
	}
	if _, err := svc.LookupSubjects(ctx, obj("folder:f0"), "view", "user", ""); !errors.Is(err, authz.ErrMaxDepthExceeded) {
		t.Fatalf("subjects: %v", err)
	}
	if ok, err := svc.CheckPermission(ctx, obj("folder:f5"), "view", subj("user:zoe")); err != nil || !ok {
		t.Fatalf("within depth: %v %v", ok, err)
	}
}

// Without an index nesting is walked, so its depth counts against the limit
// exactly like arrows do.
func TestMaxDepthOnNestingWhenWalking(t *testing.T) {
	var chain []string
	for i := 0; i < 8; i++ {
		chain = append(chain, fmt.Sprintf("team:t%d#member@team:t%d#member", i, i+1))
	}
	chain = append(chain, "team:t8#member@user:zoe")
	svc, _ := newService(t, productSchema, chain, engine.WithMaxDepth(5))
	ctx := context.Background()
	if _, err := svc.CheckPermission(ctx, obj("team:t0"), "member", subj("user:zoe")); !errors.Is(err, authz.ErrMaxDepthExceeded) {
		t.Fatalf("check: %v", err)
	}
	if _, err := svc.LookupResources(ctx, "team", "member", subj("user:zoe"), 0); !errors.Is(err, authz.ErrMaxDepthExceeded) {
		t.Fatalf("lookup: %v", err)
	}
	if _, err := svc.LookupSubjects(ctx, obj("team:t0"), "member", "user", ""); !errors.Is(err, authz.ErrMaxDepthExceeded) {
		t.Fatalf("subjects: %v", err)
	}
	if ok, err := svc.CheckPermission(ctx, obj("team:t5"), "member", subj("user:zoe")); err != nil || !ok {
		t.Fatalf("within depth: %v %v", ok, err)
	}
}

// With an index nesting is one lookup, so its depth never counts against the
// limit: a chain of thirty teams resolves with the limit set to five.
func TestDeepNestingIsOneLookup(t *testing.T) {
	var indexed []datastoreKind
	for _, kind := range datastores(t) {
		if kind.indexed {
			indexed = append(indexed, kind)
		}
	}
	if len(indexed) == 0 {
		t.Skip("no indexed datastore available (set AUTHZ_TEST_DATABASE_URL)")
	}
	const teams = 30
	var chain []string
	for i := 0; i < teams-1; i++ {
		chain = append(chain, fmt.Sprintf("team:t%02d#member@team:t%02d#member", i, i+1))
	}
	chain = append(chain, fmt.Sprintf("team:t%02d#member@user:zoe", teams-1))
	chain = append(chain, "project:p#member@team:t00#member")
	for _, kind := range indexed {
		t.Run(kind.name, func(t *testing.T) {
			sch, err := dsl.Parse(productSchema)
			if err != nil {
				t.Fatal(err)
			}
			ds, opts := kind.open(t, sch)
			svc, err := engine.New(ds, sch, append(opts, engine.WithMaxDepth(5))...)
			if err != nil {
				t.Fatal(err)
			}
			ctx := context.Background()
			if err := svc.WriteRelationships(ctx, updates(t, authz.OperationCreate, chain...)); err != nil {
				t.Fatal(err)
			}
			if ok, err := svc.CheckPermission(ctx, obj("project:p"), "view", subj("user:zoe")); err != nil || !ok {
				t.Fatalf("check: %v %v", ok, err)
			}
			ids, err := svc.LookupResources(ctx, "team", "member", subj("user:zoe"), 0)
			if err != nil || len(ids) != teams {
				t.Fatalf("lookup: %d ids, %v", len(ids), err)
			}
			if ids, err := svc.LookupResources(ctx, "project", "view", subj("user:zoe"), 0); err != nil || join(ids) != "p" {
				t.Fatalf("lookup project: %v %v", ids, err)
			}
			subjects, err := svc.LookupSubjects(ctx, obj("project:p"), "view", "user", "")
			if err != nil || join(subjects.SubjectIDs) != "zoe" {
				t.Fatalf("subjects: %+v %v", subjects, err)
			}
			teamsIn, err := svc.LookupSubjects(ctx, obj("project:p"), "member", "team", "member")
			if err != nil || len(teamsIn.SubjectIDs) != teams {
				t.Fatalf("nested teams: %d, %v", len(teamsIn.SubjectIDs), err)
			}
		})
	}
}

// The change log is what indexes and mirrors consume; the engine's writes
// must show up in it exactly once each.
func TestChangesFollowWrites(t *testing.T) {
	svc, ds := newService(t, productSchema, nil)
	ctx := context.Background()
	if err := svc.WriteRelationships(ctx, updates(t, authz.OperationCreate, "project:p#owner@user:a", "project:p#member@team:t#member")); err != nil {
		t.Fatal(err)
	}
	if _, err := svc.DeleteRelationships(ctx, authz.RelationshipFilter{ResourceType: "project", ResourceID: "p", Relation: "owner"}); err != nil {
		t.Fatal(err)
	}
	var changes []authz.Change
	if err := ds.View(ctx, func(r authz.Reader) error {
		var err error
		changes, err = r.Changes(ctx, 0, 0)
		return err
	}); err != nil {
		t.Fatal(err)
	}
	if len(changes) != 2 || len(changes[0].Updates) != 2 || len(changes[1].Updates) != 1 || changes[1].Updates[0].Operation != authz.OperationDelete {
		t.Fatalf("changes: %+v", changes)
	}
}

// A userset whose relation is a permission has no stored members, so the
// index cannot follow it; the engine must, in all three directions.
func TestPermissionUsersets(t *testing.T) {
	svc, _ := newService(t, `
definition user {}
definition group {
    relation direct: user
    relation admin: user
    permission member = direct + admin
}
definition doc {
    relation viewer: user | group#member
    permission view = viewer
}`, []string{
		"group:g#direct@user:d",
		"group:g#admin@user:a",
		"doc:x#viewer@group:g#member",
		"doc:y#viewer@user:d",
	})
	ctx := context.Background()
	for subject, want := range map[string]string{"user:d": "x,y", "user:a": "x", "user:n": ""} {
		ids, err := svc.LookupResources(ctx, "doc", "view", subj(subject), 0)
		if err != nil || join(ids) != want {
			t.Errorf("lookup %s: %v %v", subject, ids, err)
		}
		ok, err := svc.CheckPermission(ctx, obj("doc:x"), "view", subj(subject))
		if err != nil || ok != (want != "") {
			t.Errorf("check %s: %v %v", subject, ok, err)
		}
	}
	subjects, err := svc.LookupSubjects(ctx, obj("doc:x"), "view", "user", "")
	if err != nil || join(subjects.SubjectIDs) != "a,d" {
		t.Fatalf("subjects: %+v %v", subjects, err)
	}
}

func TestLookupResources(t *testing.T) {
	svc, _ := newService(t, productSchema, productTuples)
	ctx := context.Background()
	cases := []struct {
		resourceType, permission, subject string
		limit                             int
		want                              string
	}{
		{"project", "view", "user:alice", 0, "p1,p2"},
		{"project", "view", "user:bob", 0, "p1,p2,p3"},
		{"project", "view", "user:carol", 0, "p2"}, // banned from p1, wildcard on p2
		{"project", "view", "user:dave", 0, "p1,p2"},
		{"project", "view", "user:erin", 0, "p1,p2"},
		{"project", "view", "user:zed", 0, "p2"},
		{"project", "view", "user:hank", 0, ""},
		{"project", "edit", "user:erin", 0, "p1"},
		{"project", "manage_members", "user:frank", 0, "p3"},
		{"project", "view", "user:bob", 2, "p1,p2"},
		{"project", "view", "team:leads#member", 0, "p1"}, // wildcard is for plain users only
		{"project", "member", "team:core#member", 0, "p1"},
		{"review", "view", "user:bob", 0, "r1,r2"},
		{"review", "view", "user:gina", 0, "r1"},
		{"review", "view", "user:dave", 0, "r1,r2"},
		{"review", "comment", "user:dave", 0, "r2"},
		{"organization", "view", "user:dave", 0, "acme"},
		{"team", "member", "user:dave", 0, "core,leads"},
		{"team", "member", "team:leads#member", 0, "core,leads"},
	}
	for _, tc := range cases {
		got, err := svc.LookupResources(ctx, tc.resourceType, tc.permission, subj(tc.subject), tc.limit)
		if err != nil {
			t.Errorf("%s#%s@%s: %v", tc.resourceType, tc.permission, tc.subject, err)
			continue
		}
		if join(got) != tc.want {
			t.Errorf("%s#%s@%s: got %q want %q", tc.resourceType, tc.permission, tc.subject, join(got), tc.want)
		}
	}
	if _, err := svc.LookupResources(ctx, "project", "ghost", subj("user:alice"), 0); !errors.Is(err, authz.ErrInvalidArgument) {
		t.Errorf("unknown permission: %v", err)
	}
	if _, err := svc.LookupResources(ctx, "project", "view", subj("user:*"), 0); !errors.Is(err, authz.ErrInvalidArgument) {
		t.Errorf("wildcard subject: %v", err)
	}
}

func TestLookupSubjects(t *testing.T) {
	svc, _ := newService(t, productSchema, productTuples)
	ctx := context.Background()
	cases := []struct {
		resource, permission, subjectType, subjectRelation string
		wantIDs                                            string
		wantWildcard                                       bool
		wantExcluded                                       string
	}{
		{"project:p1", "view", "user", "", "alice,bob,dave,erin", false, ""},
		{"project:p1", "view", "team", "member", "core,leads", false, ""},
		{"project:p1", "edit", "user", "", "alice,erin", false, ""},
		{"project:p2", "view", "user", "", "", true, "hank"},
		{"project:p2", "edit", "user", "", "alice", false, ""},
		{"project:p3", "manage_members", "user", "", "frank", false, ""},
		{"review:r1", "view", "user", "", "alice,bob,dave,erin,gina", false, ""},
		{"review:r1", "comment", "user", "", "gina", false, ""},
		{"review:r2", "view", "user", "", "bob,dave,frank", false, ""},
		{"review:r2", "comment", "team", "member", "leads", false, ""},
		{"organization:acme", "view", "user", "", "carol,dave,erin", false, ""},
		{"team:core", "member", "team", "member", "core,leads", false, ""},
	}
	for _, tc := range cases {
		got, err := svc.LookupSubjects(ctx, obj(tc.resource), tc.permission, tc.subjectType, tc.subjectRelation)
		if err != nil {
			t.Errorf("%s#%s -> %s#%s: %v", tc.resource, tc.permission, tc.subjectType, tc.subjectRelation, err)
			continue
		}
		if join(got.SubjectIDs) != tc.wantIDs || got.Wildcard != tc.wantWildcard || join(got.ExcludedSubjectIDs) != tc.wantExcluded {
			t.Errorf("%s#%s -> %s#%s: got %+v", tc.resource, tc.permission, tc.subjectType, tc.subjectRelation, got)
		}
	}
}

func TestWildcardSetAlgebra(t *testing.T) {
	svc, _ := newService(t, `
definition user {}
definition doc {
    relation everyone: user:* | user
    relation staff: user
    relation banned: user
    permission everyone_but_banned = everyone - banned
    permission staff_only = everyone & staff
    permission not_everyone = staff - everyone
    permission union = everyone + staff
    permission double = everyone_but_banned & everyone_but_banned
}`, []string{
		"doc:d#everyone@user:*",
		"doc:d#staff@user:s1",
		"doc:d#staff@user:s2",
		"doc:d#banned@user:s2",
		"doc:d#banned@user:b1",
	})
	ctx := context.Background()
	cases := []struct {
		permission   string
		wantIDs      string
		wantWildcard bool
		wantExcluded string
	}{
		{"everyone_but_banned", "", true, "b1,s2"},
		{"staff_only", "s1,s2", false, ""},
		{"not_everyone", "", false, ""},
		{"union", "", true, ""},
		{"double", "", true, "b1,s2"},
	}
	for _, tc := range cases {
		got, err := svc.LookupSubjects(ctx, obj("doc:d"), tc.permission, "user", "")
		if err != nil {
			t.Fatal(err)
		}
		if join(got.SubjectIDs) != tc.wantIDs || got.Wildcard != tc.wantWildcard || join(got.ExcludedSubjectIDs) != tc.wantExcluded {
			t.Errorf("%s: got %+v", tc.permission, got)
		}
	}
	for subject, want := range map[string]bool{"user:anyone": true, "user:s2": false, "user:b1": false} {
		if ok, err := svc.CheckPermission(ctx, obj("doc:d"), "everyone_but_banned", subj(subject)); err != nil || ok != want {
			t.Errorf("check %s: %v %v", subject, ok, err)
		}
	}
	if ok, err := svc.CheckPermission(ctx, obj("doc:d"), "not_everyone", subj("user:s1")); err != nil || ok {
		t.Errorf("not_everyone s1: %v %v", ok, err)
	}
}

func TestExpandPermissionTree(t *testing.T) {
	svc, _ := newService(t, productSchema, productTuples)
	tree, err := svc.ExpandPermissionTree(context.Background(), obj("review:r1"), "view")
	if err != nil {
		t.Fatal(err)
	}
	if tree.Operation != authz.TreeUnion || len(tree.Children) != 2 {
		t.Fatalf("root %+v", tree)
	}
	leaf := tree.Children[0]
	if leaf.Operation != authz.TreeLeaf || leaf.Relation != "recipient" || len(leaf.Subjects) != 1 || leaf.Subjects[0].String() != "user:gina" {
		t.Fatalf("recipient leaf %+v", leaf)
	}
	arrow := tree.Children[1]
	if arrow.Operation != authz.TreeUnion || len(arrow.Children) != 1 {
		t.Fatalf("arrow node %+v", arrow)
	}
	project := arrow.Children[0]
	if project.Resource.String() != "project:p1" || project.Relation != "view" || project.Operation != authz.TreeExclusion || len(project.Children) != 2 {
		t.Fatalf("project node %+v", project)
	}
	members := project.Children[0].Children[0]
	if members.Relation != "member" || len(members.Subjects) != 2 {
		t.Fatalf("member leaf %+v", members)
	}
	if _, err := svc.ExpandPermissionTree(context.Background(), obj("review:r1"), "ghost"); !errors.Is(err, authz.ErrInvalidArgument) {
		t.Fatalf("unknown permission: %v", err)
	}
}

func TestExpandSurvivesArrowCycle(t *testing.T) {
	svc, _ := newService(t, folderSchema, []string{
		"folder:a#parent@folder:b",
		"folder:b#parent@folder:a",
		"folder:b#viewer@user:u",
	})
	ctx := context.Background()
	tree, err := svc.ExpandPermissionTree(ctx, obj("folder:a"), "view")
	if err != nil || tree == nil {
		t.Fatalf("%v %v", tree, err)
	}
	if ok, err := svc.CheckPermission(ctx, obj("folder:a"), "view", subj("user:u")); err != nil || !ok {
		t.Fatalf("check: %v %v", ok, err)
	}
}

func TestWriteRelationships(t *testing.T) {
	svc, _ := newService(t, productSchema, nil)
	ctx := context.Background()

	if err := svc.WriteRelationships(ctx, updates(t, authz.OperationCreate, "project:p#owner@user:a")); err != nil {
		t.Fatal(err)
	}
	// A duplicate create fails and takes the rest of the batch with it.
	err := svc.WriteRelationships(ctx, updates(t, authz.OperationCreate, "project:p#member@user:b", "project:p#owner@user:a"))
	if !errors.Is(err, authz.ErrRelationshipExists) {
		t.Fatalf("duplicate create: %v", err)
	}
	got, _ := svc.ReadRelationships(ctx, authz.RelationshipFilter{ResourceType: "project"}, 0)
	if len(got) != 1 {
		t.Fatalf("batch was not atomic: %v", got)
	}
	// Touch is idempotent; delete of an absent relationship succeeds.
	if err := svc.WriteRelationships(ctx, updates(t, authz.OperationTouch, "project:p#owner@user:a", "project:p#member@user:b")); err != nil {
		t.Fatal(err)
	}
	if err := svc.WriteRelationships(ctx, updates(t, authz.OperationDelete, "project:p#member@user:b", "project:p#member@user:nobody")); err != nil {
		t.Fatal(err)
	}
	got, _ = svc.ReadRelationships(ctx, authz.RelationshipFilter{ResourceType: "project"}, 0)
	if len(got) != 1 || got[0].String() != "project:p#owner@user:a" {
		t.Fatalf("after touch/delete: %v", got)
	}

	// Preconditions.
	err = svc.WriteRelationships(ctx, updates(t, authz.OperationTouch, "project:p#member@user:b"),
		authz.Precondition{Operation: authz.PreconditionMustNotMatch, Filter: authz.RelationshipFilter{ResourceType: "project", ResourceID: "p", Relation: "owner"}})
	if !errors.Is(err, authz.ErrPreconditionFailed) {
		t.Fatalf("must-not-match: %v", err)
	}
	err = svc.WriteRelationships(ctx, updates(t, authz.OperationTouch, "project:p#member@user:b"),
		authz.Precondition{Operation: authz.PreconditionMustMatch, Filter: authz.RelationshipFilter{ResourceType: "project", Relation: "owner", Subject: &authz.SubjectFilter{Type: "user", ID: "a"}}})
	if err != nil {
		t.Fatalf("must-match: %v", err)
	}

	// Schema conformance.
	bad := []string{
		"project:p#member@organization:acme", // subject type not allowed
		"project:p#view@user:a",              // permission, not a relation
		"project:p#ghost@user:a",             // unknown relation
		"ghost:p#member@user:a",              // unknown type
		"project:p#member@user:*",            // wildcard not allowed on member
		"project:p#member@team:core",         // team only as team#member
		"project:p#member@team:core#ghost",   // unknown subject relation
	}
	for _, s := range bad {
		if err := svc.WriteRelationships(ctx, updates(t, authz.OperationTouch, s)); !errors.Is(err, authz.ErrInvalidArgument) {
			t.Errorf("%s: want ErrInvalidArgument, got %v", s, err)
		}
	}
	if err := svc.WriteRelationships(ctx, nil); !errors.Is(err, authz.ErrInvalidArgument) {
		t.Errorf("empty write: %v", err)
	}
	if err := svc.WriteRelationships(ctx, []authz.RelationshipUpdate{{Relationship: rel(t, "project:p#member@user:b")}}); !errors.Is(err, authz.ErrInvalidArgument) {
		t.Errorf("missing operation: %v", err)
	}
}

// WriteRelationshipsIn writes through a Writer the caller obtained, so the
// caller's transaction decides whether the grant lands.
func TestWriteRelationshipsIn(t *testing.T) {
	svc, ds := newService(t, productSchema, nil)
	ctx := context.Background()
	boom := errors.New("application rolled back")
	err := ds.Transact(ctx, func(w authz.Writer) error {
		if err := svc.WriteRelationshipsIn(ctx, w, updates(t, authz.OperationCreate, "project:p#owner@user:a")); err != nil {
			return err
		}
		return boom
	})
	if !errors.Is(err, boom) {
		t.Fatal(err)
	}
	if ok, _ := svc.CheckPermission(ctx, obj("project:p"), "edit", subj("user:a")); ok {
		t.Fatal("grant survived the host's rollback")
	}
	err = ds.Transact(ctx, func(w authz.Writer) error {
		return svc.WriteRelationshipsIn(ctx, w, updates(t, authz.OperationCreate, "project:p#owner@user:a"))
	})
	if err != nil {
		t.Fatal(err)
	}
	if ok, _ := svc.CheckPermission(ctx, obj("project:p"), "edit", subj("user:a")); !ok {
		t.Fatal("grant did not land with the host's commit")
	}
	err = ds.Transact(ctx, func(w authz.Writer) error {
		return svc.WriteRelationshipsIn(ctx, w, updates(t, authz.OperationCreate, "project:p#view@user:a"))
	})
	if !errors.Is(err, authz.ErrInvalidArgument) {
		t.Fatalf("schema still enforced in host transactions: %v", err)
	}
}

func TestReadAndDeleteRelationships(t *testing.T) {
	svc, _ := newService(t, productSchema, productTuples)
	ctx := context.Background()
	none := ""
	member := "member"

	got, err := svc.ReadRelationships(ctx, authz.RelationshipFilter{ResourceType: "project", ResourceID: "p1", Relation: "member"}, 0)
	if err != nil || len(got) != 2 {
		t.Fatalf("read: %v %v", got, err)
	}
	got, err = svc.ReadRelationships(ctx, authz.RelationshipFilter{ResourceType: "project", Relation: "member", Subject: &authz.SubjectFilter{Type: "team", Relation: &member}}, 0)
	if err != nil || len(got) != 1 || got[0].String() != "project:p1#member@team:core#member" {
		t.Fatalf("read usersets: %v %v", got, err)
	}
	got, err = svc.ReadRelationships(ctx, authz.RelationshipFilter{ResourceType: "project", Subject: &authz.SubjectFilter{Type: "user", ID: "alice", Relation: &none}}, 1)
	if err != nil || len(got) != 1 {
		t.Fatalf("read with limit: %v %v", got, err)
	}
	if _, err := svc.ReadRelationships(ctx, authz.RelationshipFilter{}, 0); !errors.Is(err, authz.ErrInvalidArgument) {
		t.Fatalf("filter without type: %v", err)
	}

	n, err := svc.DeleteRelationships(ctx, authz.RelationshipFilter{ResourceType: "project", ResourceID: "p1"},
		authz.Precondition{Operation: authz.PreconditionMustMatch, Filter: authz.RelationshipFilter{ResourceType: "project", ResourceID: "p1", Relation: "owner"}})
	if err != nil || n != 5 {
		t.Fatalf("delete: n=%d err=%v", n, err)
	}
	if ok, _ := svc.CheckPermission(ctx, obj("project:p1"), "view", subj("user:alice")); ok {
		t.Fatal("alice still views p1 after its relationships were deleted")
	}
	_, err = svc.DeleteRelationships(ctx, authz.RelationshipFilter{ResourceType: "project", ResourceID: "p1"},
		authz.Precondition{Operation: authz.PreconditionMustMatch, Filter: authz.RelationshipFilter{ResourceType: "project", ResourceID: "p1"}})
	if !errors.Is(err, authz.ErrPreconditionFailed) {
		t.Fatalf("delete precondition: %v", err)
	}
}

// The schema is code; ValidateStored is what stops a schema edit from
// silently orphaning the grants already stored.
func TestValidateStored(t *testing.T) {
	_, ds := newService(t, productSchema, productTuples)
	ctx := context.Background()
	over := func(schemaText string) error {
		t.Helper()
		sch, err := dsl.Parse(schemaText)
		if err != nil {
			t.Fatal(err)
		}
		svc, err := engine.New(ds, sch)
		if err != nil {
			t.Fatal(err)
		}
		return svc.ValidateStored(ctx)
	}
	if err := over(productSchema); err != nil {
		t.Fatalf("same schema: %v", err)
	}
	// Dropping a relation that has relationships.
	withoutBanned := strings.NewReplacer("    relation banned: user\n", "", " - banned", "").Replace(productSchema)
	if err := over(withoutBanned); !errors.Is(err, authz.ErrSchemaMismatch) {
		t.Fatalf("dropped relation: %v", err)
	}
	// Narrowing a relation's subject types below what is stored.
	narrowed := strings.Replace(productSchema, "relation member: user | team#member\n    relation viewer", "relation member: user\n    relation viewer", 1)
	if err := over(narrowed); !errors.Is(err, authz.ErrSchemaMismatch) {
		t.Fatalf("narrowed subjects: %v", err)
	}
	// Dropping a type that has relationships.
	withoutReview := productSchema[:strings.Index(productSchema, "definition review")]
	if err := over(withoutReview); !errors.Is(err, authz.ErrSchemaMismatch) {
		t.Fatalf("dropped type: %v", err)
	}
	// Adding is fine.
	extended := productSchema + "\ndefinition note {\n    relation author: user\n    permission edit = author\n}\n"
	if err := over(extended); err != nil {
		t.Fatalf("extended: %v", err)
	}
}
