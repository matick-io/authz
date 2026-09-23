package dsl

import (
	"strings"
	"testing"

	"github.com/matick-io/authz/schema"
)

const valid = `
// Users and teams.
definition user {}

definition team {
    relation member: user | team#member
}

/* A project is the tenant root. */
definition project {
    relation owner: user
    relation member: user | team#member
    relation public_viewer: user:*
    permission view = member + owner + public_viewer
    permission edit = owner
    permission edit_not_member = owner - member
    permission both = (owner & member) + public_viewer
}

definition review {
    relation project: project
    relation viewer: user | team#member
    permission view = viewer + project->view
    permission edit = project->edit
}
`

func TestParseValid(t *testing.T) {
	s, err := Parse(valid)
	if err != nil {
		t.Fatal(err)
	}
	if got := strings.Join(s.Order, ","); got != "user,team,project,review" {
		t.Fatalf("order %q", got)
	}
	project := s.Definitions["project"]
	if got := strings.Join(project.Order, ","); got != "owner,member,public_viewer,view,edit,edit_not_member,both" {
		t.Fatalf("project order %q", got)
	}
	member := project.Relations["member"]
	if !member.Allows("user", "", false) || !member.Allows("team", "member", false) || member.Allows("team", "", false) || member.Allows("user", "", true) {
		t.Fatalf("member allowed subjects wrong: %+v", member.AllowedSubjects)
	}
	if pv := project.Relations["public_viewer"]; !pv.Allows("user", "", true) || pv.Allows("user", "", false) {
		t.Fatalf("wildcard relation wrong: %+v", pv.AllowedSubjects)
	}
	view := project.Permissions["view"].Expr.(*schema.SetOp)
	if view.Op != schema.Union || len(view.Children) != 3 {
		t.Fatalf("view expr %+v", view)
	}
	excl := project.Permissions["edit_not_member"].Expr.(*schema.SetOp)
	if excl.Op != schema.Exclusion || len(excl.Children) != 2 {
		t.Fatalf("exclusion expr %+v", excl)
	}
	both := project.Permissions["both"].Expr.(*schema.SetOp)
	if both.Op != schema.Union || both.Children[0].(*schema.SetOp).Op != schema.Intersection {
		t.Fatalf("both expr %+v", both)
	}
	arrow := s.Definitions["review"].Permissions["view"].Expr.(*schema.SetOp).Children[1].(*schema.Arrow)
	if arrow.Relation != "project" || arrow.Target != "view" {
		t.Fatalf("arrow %+v", arrow)
	}
}

func TestExclusionIsLeftAssociative(t *testing.T) {
	s, err := Parse(`definition user {}
definition doc { relation a: user
relation b: user
relation c: user
permission p = a - b - c }`)
	if err != nil {
		t.Fatal(err)
	}
	outer := s.Definitions["doc"].Permissions["p"].Expr.(*schema.SetOp)
	inner, ok := outer.Children[0].(*schema.SetOp)
	if !ok || inner.Op != schema.Exclusion || inner.Children[0].(*schema.ComputedUserset).Relation != "a" || outer.Children[1].(*schema.ComputedUserset).Relation != "c" {
		t.Fatalf("got %+v", outer)
	}
}

func TestParseErrors(t *testing.T) {
	cases := map[string]string{
		"requires parentheses":      `definition user {} definition d { relation a: user relation b: user relation c: user permission p = a + b & c }`,
		"references undefined type": `definition d { relation a: ghost }`,
		"references user#ghost":     `definition user {} definition d { relation a: user#ghost }`,
		"is not defined on d":       `definition user {} definition d { relation a: user permission p = ghost }`,
		"references itself":         `definition user {} definition d { relation a: user permission p = p }`,
		"in terms of itself":        `definition user {} definition d { relation a: user permission p = q permission q = p }`,
		"start from a relation":     `definition user {} definition d { relation a: user permission p = a permission q = p->a }`,
		"allows a wildcard":         `definition user {} definition d { relation a: user:* permission q = a->x }`,
		"no subject type of":        `definition user {} definition d { relation a: user permission q = a->ghost }`,
		"declared twice":            `definition user {} definition user {}`,
		"is declared twice on":      `definition user {} definition d { relation a: user permission a = a }`,
		"must be lowercase":         `definition User {}`,
		"unterminated":              `definition user {} /* open`,
		"unexpected character":      `definition user { $ }`,
		"expected 'definition'":     `relation a: user`,
		"expected ':'":              `definition user {} definition d { relation a user }`,
	}
	for want, src := range cases {
		t.Run(want, func(t *testing.T) {
			_, err := Parse(src)
			if err == nil {
				t.Fatalf("parsed without error")
			}
			if !strings.Contains(err.Error(), want) {
				t.Fatalf("error %q does not mention %q", err, want)
			}
		})
	}
}

func TestErrorCarriesPosition(t *testing.T) {
	_, err := Parse("definition user {}\ndefinition d {\n  relation a user\n}")
	if err == nil {
		t.Fatal("no error")
	}
	e, ok := err.(*schema.Error)
	if !ok || e.Line != 3 || e.Col != 14 {
		t.Fatalf("got %#v", err)
	}
}

func TestEmptySchemaIsValid(t *testing.T) {
	s, err := Parse("")
	if err != nil || len(s.Definitions) != 0 {
		t.Fatalf("got %v %v", s, err)
	}
}

// The DSL and the builders produce the same schema.
func TestParseMatchesBuild(t *testing.T) {
	parsed, err := Parse(`
definition user {}
definition team { relation member: user | team#member }
definition project {
    relation member: user | team#member
    relation viewer: user:*
    relation banned: user
    permission view = (member + viewer) - banned
}`)
	if err != nil {
		t.Fatal(err)
	}
	built, err := schema.Build(
		schema.Def("user"),
		schema.Def("team", schema.Rel("member", schema.Subject("user"), schema.Userset("team", "member"))),
		schema.Def("project",
			schema.Rel("member", schema.Subject("user"), schema.Userset("team", "member")),
			schema.Rel("viewer", schema.Wildcard("user")),
			schema.Rel("banned", schema.Subject("user")),
			schema.Perm("view", schema.ExclusionOf(schema.UnionOf(schema.Ref("member"), schema.Ref("viewer")), schema.Ref("banned"))),
		),
	)
	if err != nil {
		t.Fatal(err)
	}
	if strings.Join(parsed.Order, ",") != strings.Join(built.Order, ",") {
		t.Fatalf("order differs: %v vs %v", parsed.Order, built.Order)
	}
	for _, name := range parsed.Order {
		p, b := parsed.Definitions[name], built.Definitions[name]
		if strings.Join(p.Order, ",") != strings.Join(b.Order, ",") {
			t.Fatalf("%s members differ: %v vs %v", name, p.Order, b.Order)
		}
		for rel := range p.Relations {
			if len(p.Relations[rel].AllowedSubjects) != len(b.Relations[rel].AllowedSubjects) {
				t.Fatalf("%s#%s subjects differ", name, rel)
			}
		}
	}
	view := built.Definitions["project"].Permissions["view"].Expr.(*schema.SetOp)
	if view.Op != schema.Exclusion || view.Children[0].(*schema.SetOp).Op != schema.Union {
		t.Fatalf("built view expr %+v", view)
	}
}
