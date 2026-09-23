package tests

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"testing"

	"github.com/matick-io/authz"
)

// AI: the conformance table pins down behaviour at the edges of the API,
// where implementations drift apart: what a write refuses, which identifiers
// are legal, which questions are malformed. Every case runs on every kind,
// SpiceDB included. Where the engine deliberately differs from SpiceDB the
// case says so, so the difference is a recorded decision, not a surprise.

const conformanceSchema = `
definition user {}
definition team {
    relation member: user | team#member
}
definition doc {
    relation viewer: user | team#member
    relation public: user:*
    relation owner: user
    permission view = viewer + public + owner
}`

type conformanceCase struct {
	name    string
	run     func(ctx context.Context, a authorizer) error
	wantErr bool
	// spicedbErr, when set, is SpiceDB's answer where it differs from the
	// engine's, with the reason in the case's comment.
	spicedbErr *bool
}

func yes() *bool { b := true; return &b }
func no() *bool  { b := false; return &b }

func mustRel(s string) authz.Relationship {
	r, err := authz.ParseRelationship(s)
	if err != nil {
		panic(err)
	}
	return r
}

func write(a authorizer, ctx context.Context, op authz.UpdateOperation, rels ...authz.Relationship) error {
	ups := make([]authz.RelationshipUpdate, len(rels))
	for i, r := range rels {
		ups[i] = authz.RelationshipUpdate{Operation: op, Relationship: r}
	}
	return a.WriteRelationships(ctx, ups)
}

func create(rels ...string) func(ctx context.Context, a authorizer) error {
	return func(ctx context.Context, a authorizer) error {
		for _, s := range rels {
			if err := write(a, ctx, authz.OperationCreate, mustRel(s)); err != nil {
				return err
			}
		}
		return nil
	}
}

// createRel writes one relationship built by hand, for shapes the parser
// itself refuses.
func createRel(r authz.Relationship) func(ctx context.Context, a authorizer) error {
	return func(ctx context.Context, a authorizer) error { return write(a, ctx, authz.OperationCreate, r) }
}

func writeCases() []conformanceCase {
	return []conformanceCase{
		{name: "create twice in two writes", wantErr: true, run: create("doc:d#viewer@user:a", "doc:d#viewer@user:a")},
		{name: "create then touch", run: func(ctx context.Context, a authorizer) error {
			if err := write(a, ctx, authz.OperationCreate, mustRel("doc:d#viewer@user:a")); err != nil {
				return err
			}
			return write(a, ctx, authz.OperationTouch, mustRel("doc:d#viewer@user:a"))
		}},
		{name: "touch twice", run: func(ctx context.Context, a authorizer) error {
			if err := write(a, ctx, authz.OperationTouch, mustRel("doc:d#viewer@user:a")); err != nil {
				return err
			}
			return write(a, ctx, authz.OperationTouch, mustRel("doc:d#viewer@user:a"))
		}},
		{name: "delete what is not there", run: func(ctx context.Context, a authorizer) error {
			return write(a, ctx, authz.OperationDelete, mustRel("doc:d#viewer@user:a"))
		}},
		{name: "touch, delete, check", run: func(ctx context.Context, a authorizer) error {
			if err := write(a, ctx, authz.OperationTouch, mustRel("doc:d#viewer@user:a")); err != nil {
				return err
			}
			if err := write(a, ctx, authz.OperationDelete, mustRel("doc:d#viewer@user:a")); err != nil {
				return err
			}
			ok, err := a.CheckPermission(ctx, obj("doc:d"), "view", subj("user:a"))
			if err != nil {
				return err
			}
			if ok {
				return errors.New("still granted after the delete")
			}
			return nil
		}},
		{name: "write to a permission", wantErr: true, run: create("doc:d#view@user:a")},
		{name: "subject type the relation does not allow", wantErr: true, run: create("doc:d#owner@team:t#member")},
		{name: "wildcard the relation does not allow", wantErr: true, run: create("doc:d#owner@user:*")},
		{name: "concrete subject where only a wildcard is allowed", wantErr: true, run: create("doc:d#public@user:a")},
		{name: "userset relation that does not exist", wantErr: true, run: create("doc:d#viewer@team:t#lead")},
		{name: "userset on a type without relations", wantErr: true, run: create("doc:d#viewer@user:a#member")},
		{name: "wildcard carrying a relation", wantErr: true, run: createRel(authz.Relationship{
			Resource: authz.ObjectRef{Type: "doc", ID: "d"}, Relation: "viewer",
			Subject: authz.SubjectRef{Object: authz.ObjectRef{Type: "user", ID: "*"}, Relation: "member"},
		})},
		{name: "unknown relation", wantErr: true, run: create("doc:d#reader@user:a")},
		{name: "unknown resource type", wantErr: true, run: create("file:d#viewer@user:a")},
		{name: "unknown subject type", wantErr: true, run: create("doc:d#viewer@robot:a")},
		// AI: SpiceDB accepts a write with no updates; the engine refuses it,
		// since a caller that writes nothing almost always meant to write
		// something.
		{name: "no updates at all", wantErr: true, spicedbErr: no(), run: func(ctx context.Context, a authorizer) error {
			return a.WriteRelationships(ctx, nil)
		}},
		// AI: SpiceDB refuses a request that names one relationship twice; the
		// engine applies updates in order, so the second is a no-op.
		{name: "same relationship touched twice in one write", spicedbErr: yes(), run: func(ctx context.Context, a authorizer) error {
			return write(a, ctx, authz.OperationTouch, mustRel("doc:d#viewer@user:a"), mustRel("doc:d#viewer@user:a"))
		}},
		{name: "touch then delete in one write", spicedbErr: yes(), run: func(ctx context.Context, a authorizer) error {
			r := mustRel("doc:d#viewer@user:a")
			if err := a.WriteRelationships(ctx, []authz.RelationshipUpdate{{Operation: authz.OperationTouch, Relationship: r}, {Operation: authz.OperationDelete, Relationship: r}}); err != nil {
				return err
			}
			ok, err := a.CheckPermission(ctx, obj("doc:d"), "view", subj("user:a"))
			if err != nil {
				return err
			}
			if ok {
				return errors.New("granted after touch then delete")
			}
			return nil
		}},
	}
}

// identifierCases writes doc:<id>#viewer@user:x for ids at the edge of the
// grammar: [a-zA-Z0-9/_|-=+], at most 1024 long, and * only alone.
func identifierCases() []conformanceCase {
	ok := []string{"a", "A", "0", "a/b", "a|b", "a=b", "a+b", "a-b", "a_b", "-", "_", "aZ09/_|-=+", strings.Repeat("a", 1024)}
	bad := []string{strings.Repeat("a", 1025), "a b", "a#b", "a:b", "a@b", "*", "", "ä", "a.b", "a,b", "a*", "a~b", "a%b", "a$", "a\tb", "a\nb", " a", "a "}
	var cases []conformanceCase
	for _, id := range ok {
		cases = append(cases, conformanceCase{name: "id " + short(id), run: createRel(authz.Relationship{
			Resource: authz.ObjectRef{Type: "doc", ID: id}, Relation: "viewer", Subject: subj("user:x"),
		})})
		cases = append(cases, conformanceCase{name: "subject id " + short(id), run: createRel(authz.Relationship{
			Resource: obj("doc:d"), Relation: "viewer", Subject: authz.SubjectRef{Object: authz.ObjectRef{Type: "user", ID: id}},
		})})
	}
	for _, id := range bad {
		cases = append(cases, conformanceCase{name: "bad id " + short(id), wantErr: true, run: createRel(authz.Relationship{
			Resource: authz.ObjectRef{Type: "doc", ID: id}, Relation: "viewer", Subject: subj("user:x"),
		})})
	}
	return cases
}

func short(id string) string {
	if len(id) > 12 {
		return fmt.Sprintf("%.8s..(%d)", id, len(id))
	}
	return fmt.Sprintf("%q", id)
}

func questionCases() []conformanceCase {
	seed := func(ctx context.Context, a authorizer) error {
		return write(a, ctx, authz.OperationTouch, mustRel("doc:d#viewer@user:a"), mustRel("doc:d#viewer@team:t#member"), mustRel("team:t#member@user:b"))
	}
	check := func(resource, permission, subject string, want bool) func(ctx context.Context, a authorizer) error {
		return func(ctx context.Context, a authorizer) error {
			if err := seed(ctx, a); err != nil {
				return err
			}
			got, err := a.CheckPermission(ctx, obj(resource), permission, subj(subject))
			if err != nil {
				return err
			}
			if got != want {
				return fmt.Errorf("got %v want %v", got, want)
			}
			return nil
		}
	}
	return []conformanceCase{
		{name: "check a relation, not only a permission", run: check("doc:d", "viewer", "user:a", true)},
		{name: "check a userset subject", run: check("doc:d", "view", "team:t#member", true)},
		{name: "check a subject whose relation is a permission", run: check("doc:d", "view", "doc:d#view", true)},
		{name: "check with a subject of a type that has no such relation", wantErr: true, run: check("doc:d", "view", "user:a#member", false)},
		{name: "check an unknown permission", wantErr: true, run: check("doc:d", "read", "user:a", false)},
		{name: "check an unknown resource type", wantErr: true, run: check("file:d", "view", "user:a", false)},
		{name: "check an unknown subject type", wantErr: true, run: check("doc:d", "view", "robot:a", false)},
		{name: "check with an upper-case permission", wantErr: true, run: check("doc:d", "View", "user:a", false)},
		{name: "check with an empty permission", wantErr: true, run: check("doc:d", "", "user:a", false)},
		{name: "check with a wildcard subject", wantErr: true, run: check("doc:d", "view", "user:*", false)},
		{name: "resources for an unknown permission", wantErr: true, run: func(ctx context.Context, a authorizer) error {
			_, err := a.LookupResources(ctx, "doc", "read", subj("user:a"), 0)
			return err
		}},
		{name: "resources for a wildcard subject", wantErr: true, run: func(ctx context.Context, a authorizer) error {
			_, err := a.LookupResources(ctx, "doc", "view", subj("user:*"), 0)
			return err
		}},
		{name: "resources for an unknown resource type", wantErr: true, run: func(ctx context.Context, a authorizer) error {
			_, err := a.LookupResources(ctx, "file", "view", subj("user:a"), 0)
			return err
		}},
		{name: "subjects of an unknown subject type", wantErr: true, run: func(ctx context.Context, a authorizer) error {
			_, err := a.LookupSubjects(ctx, obj("doc:d"), "view", "robot", "")
			return err
		}},
		{name: "subjects with a subject relation that does not exist", wantErr: true, run: func(ctx context.Context, a authorizer) error {
			_, err := a.LookupSubjects(ctx, obj("doc:d"), "view", "team", "lead")
			return err
		}},
		{name: "subjects with a subject relation that is a permission", run: func(ctx context.Context, a authorizer) error {
			if err := seed(ctx, a); err != nil {
				return err
			}
			got, err := a.LookupSubjects(ctx, obj("doc:d"), "view", "doc", "view")
			if err != nil {
				return err
			}
			if strings.Join(got.SubjectIDs, ",") != "d" {
				return fmt.Errorf("got %v, want the resource itself", got.SubjectIDs)
			}
			return nil
		}},
		{name: "subjects of an unknown permission", wantErr: true, run: func(ctx context.Context, a authorizer) error {
			_, err := a.LookupSubjects(ctx, obj("doc:d"), "read", "user", "")
			return err
		}},
		{name: "bulk with a malformed item fails only that item", run: func(ctx context.Context, a authorizer) error {
			if err := seed(ctx, a); err != nil {
				return err
			}
			results, err := a.CheckBulkPermissions(ctx, []authz.CheckPermissionRequest{
				{Resource: obj("doc:d"), Permission: "view", Subject: subj("user:a")},
				{Resource: obj("doc:d"), Permission: "read", Subject: subj("user:a")},
				{Resource: obj("doc:d"), Permission: "view", Subject: subj("user:zed")},
			})
			if err != nil {
				return err
			}
			if len(results) != 3 {
				return fmt.Errorf("%d results", len(results))
			}
			if results[0].Err != nil || !results[0].HasPermission {
				return fmt.Errorf("item 0: %v %v", results[0].HasPermission, results[0].Err)
			}
			if results[1].Err == nil {
				return errors.New("item 1: the unknown permission was not reported")
			}
			if results[2].Err != nil || results[2].HasPermission {
				return fmt.Errorf("item 2: %v %v", results[2].HasPermission, results[2].Err)
			}
			return nil
		}},
	}
}

func TestConformance(t *testing.T) {
	ctx := context.Background()
	groups := []struct {
		name  string
		cases []conformanceCase
	}{{"write", writeCases()}, {"identifier", identifierCases()}, {"question", questionCases()}}
	for _, kind := range benchKinds(t) {
		for _, g := range groups {
			for _, c := range g.cases {
				t.Run(g.name+"/"+c.name+"/kind="+kind.name, func(t *testing.T) {
					a := kind.open(t, conformanceSchema)
					err := c.run(ctx, a)
					wantErr := c.wantErr
					if kind.spicedb && c.spicedbErr != nil {
						wantErr = *c.spicedbErr
					}
					switch {
					case err != nil && !wantErr:
						t.Errorf("unexpected error: %v", err)
					case err == nil && wantErr:
						t.Errorf("accepted, want an error")
					case err != nil:
						t.Logf("refused as expected: %v", err)
					}
				})
			}
		}
	}
}
