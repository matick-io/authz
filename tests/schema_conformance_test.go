package tests

import (
	"context"
	"testing"

	"github.com/matick-io/authz/schema/dsl"
)

// AI: which schemas each side accepts. The DSL is a subset of SpiceDB's and
// stricter in places, so a SpiceDB schema may not load here and, more
// rarely, one of ours may not load there. Every case records both answers;
// a row where they differ is a known, deliberate gap, and a change in
// either column is something to notice. SpiceDB's column runs only when an
// instance is reachable.

type schemaCase struct {
	name    string
	text    string
	ours    bool
	spicedb bool
}

func schemaCases() []schemaCase {
	const base = `
definition user {}

definition folder {
    relation parent: folder
    relation owner: user
    relation viewer: user | user:*
    permission view = viewer + owner + parent->view
}
`
	return []schemaCase{
		{name: "baseline", ours: true, spicedb: true, text: base},
		{name: "empty definition only", ours: true, spicedb: true, text: `definition user {}`},
		// AI: SpiceDB ends a statement at a newline, so a definition written on
		// one line does not parse there; the DSL reads it.
		{name: "definition on one line", ours: true, spicedb: false, text: `
definition user {}
definition doc { relation viewer: user }`},
		{name: "arrow to a relation", ours: true, spicedb: true, text: `
definition user {}
definition folder {
    relation owner: user
}
definition doc {
    relation parent: folder
    permission owner = parent->owner
}`},
		{name: "arrow from a permission", ours: false, spicedb: false, text: `
definition user {}
definition folder {
    relation owner: user
    permission own = owner
}
definition doc {
    relation parent: folder
    permission parents = parent
    permission own = parents->own
}`},
		{name: "arrow chained twice", ours: false, spicedb: false, text: `
definition user {}
definition org {
    relation admin: user
}
definition folder {
    relation org: org
}
definition doc {
    relation parent: folder
    permission admin = parent->org->admin
}`},
		// AI: the engine refuses to walk an arrow over a relation that admits a
		// wildcard, since a wildcard has no object to walk into.
		{name: "arrow over a relation that allows a wildcard", ours: false, spicedb: false, text: `
definition user {}
definition folder {
    relation viewer: user
    permission view = viewer
}
definition doc {
    relation parent: folder | folder:*
    permission view = parent->view
}`},
		{name: "arrow target defined on one of two subject types", ours: true, spicedb: true, text: `
definition user {}
definition folder {
    relation viewer: user
    permission view = viewer
}
definition org {
    relation admin: user
}
definition doc {
    relation parent: folder | org
    permission view = parent->view
}`},
		// AI: SpiceDB does not check that an arrow's target exists on any
		// subject type; such an arrow reaches nothing at runtime. The engine
		// refuses it, since it is almost always a typo.
		{name: "arrow target defined on no subject type", ours: false, spicedb: true, text: `
definition user {}
definition org {
    relation admin: user
}
definition doc {
    relation parent: org
    permission view = parent->view
}`},
		{name: "arrow over a relation whose only subject type is a leaf", ours: false, spicedb: true, text: `
definition user {}
definition doc {
    relation owner: user
    permission view = owner->view
}`},
		{name: "permission references an undefined relation", ours: false, spicedb: false, text: `
definition user {}
definition doc {
    permission view = viewer
}`},
		{name: "relation references an undefined type", ours: false, spicedb: false, text: `
definition doc {
    relation viewer: user
}`},
		{name: "relation references an undefined subject relation", ours: false, spicedb: false, text: `
definition user {}
definition team {
    relation member: user
}
definition doc {
    relation viewer: team#lead
}`},
		{name: "relation declared twice", ours: false, spicedb: false, text: `
definition user {}
definition doc {
    relation viewer: user
    relation viewer: user
}`},
		{name: "relation and permission with one name", ours: false, spicedb: false, text: `
definition user {}
definition doc {
    relation view: user
    permission view = view
}`},
		{name: "subject type listed twice", ours: false, spicedb: false, text: `
definition user {}
definition doc {
    relation viewer: user | user
}`},
		{name: "permission defined as itself", ours: false, spicedb: false, text: `
definition user {}
definition doc {
    relation viewer: user
    permission view = view
}`},
		// AI: SpiceDB accepts a cycle between permissions and hits its depth
		// limit when asked; the engine refuses it at schema time.
		{name: "two permissions defined in terms of each other", ours: false, spicedb: true, text: `
definition user {}
definition doc {
    relation viewer: user
    permission first = second + viewer
    permission second = first
}`},
		{name: "permission recursing through an arrow to its own type", ours: true, spicedb: true, text: base},
		{name: "relation whose subjects are a permission", ours: true, spicedb: true, text: `
definition user {}
definition team {
    relation member: user
    permission all = member
}
definition doc {
    relation viewer: team#all
}`},
		{name: "relation admitting only usersets", ours: true, spicedb: true, text: `
definition user {}
definition team {
    relation member: user
}
definition doc {
    relation viewer: team#member
}`},
		{name: "relation admitting only a wildcard", ours: true, spicedb: true, text: `
definition user {}
definition doc {
    relation viewer: user:*
}`},
		// AI: SpiceDB refuses a wildcard that is reachable through a userset
		// ("wildcard relations cannot be transitively included"); the engine
		// admits it and lets the wildcard flow through the userset, see the
		// wildcard-nesting sample.
		{name: "wildcard reachable through a userset", ours: true, spicedb: false, text: `
definition user {}
definition team {
    relation member: user | user:*
}
definition doc {
    relation viewer: team#member
}`},
		// AI: SpiceDB requires three characters in a relation name; the
		// engine allows any name matching [a-z][a-z0-9_]*.
		{name: "one-letter relation name", ours: true, spicedb: false, text: `
definition user {}
definition doc {
    relation v: user
}`},
		{name: "two-letter relation name", ours: true, spicedb: false, text: `
definition user {}
definition doc {
    relation vw: user
}`},
		{name: "upper case in a relation name", ours: false, spicedb: false, text: `
definition user {}
definition doc {
    relation Viewer: user
}`},
		{name: "upper case in a type name", ours: false, spicedb: false, text: `
definition User {}`},
		{name: "namespaced type name", ours: true, spicedb: true, text: `
definition acme/user {}
definition acme/doc {
    relation viewer: acme/user
}`},
		// AI: SpiceDB parses a mix of operators without parentheses, and union
		// binds tightest there: probed 2026-09-14, `viewer - banned + extra`
		// is `viewer - (banned + extra)` and `banned & extra + viewer` is
		// `banned & (extra + viewer)`. The DSL requires parentheses so the
		// reader never has to know.
		{name: "union and exclusion mixed without parentheses", ours: false, spicedb: true, text: `
definition user {}
definition doc {
    relation viewer: user
    relation owner: user
    relation banned: user
    permission view = viewer + owner - banned
}`},
		{name: "exclusion chained", ours: true, spicedb: true, text: `
definition user {}
definition doc {
    relation viewer: user
    relation banned: user
    relation flagged: user
    permission view = viewer - banned - flagged
}`},
		{name: "exclusion nested with parentheses", ours: true, spicedb: true, text: `
definition user {}
definition doc {
    relation viewer: user
    relation banned: user
    relation flagged: user
    permission view = (viewer - banned) - flagged
}`},
		{name: "wildcard with a relation", ours: false, spicedb: false, text: `
definition user {}
definition team {
    relation member: user
}
definition doc {
    relation viewer: team:*#member
}`},
		{name: "relation with no subject types", ours: false, spicedb: false, text: `
definition user {}
definition doc {
    relation viewer:
}`},
		// AI: caveats are a SpiceDB feature the engine does not have.
		{name: "caveat", ours: false, spicedb: true, text: `
definition user {}

caveat is_weekday(day string) {
    day != "saturday" && day != "sunday"
}

definition doc {
    relation viewer: user with is_weekday
}`},
		{name: "nil permission", ours: true, spicedb: true, text: `
definition user {}
definition doc {
    permission view = nil
}`},
	}
}

func TestSchemaConformance(t *testing.T) {
	for _, c := range schemaCases() {
		t.Run(c.name+"/kind=dsl", func(t *testing.T) {
			_, err := dsl.Parse(c.text)
			switch {
			case err != nil && c.ours:
				t.Errorf("refused: %v", err)
			case err == nil && !c.ours:
				t.Errorf("accepted, want a refusal")
			case err != nil:
				t.Logf("refused as expected: %v", err)
			}
		})
	}
	for _, in := range spicedbInstances(t) {
		s := in.connect(t)
		ctx := context.Background()
		for _, c := range schemaCases() {
			t.Run(c.name+"/kind="+in.label, func(t *testing.T) {
				// AI: reset clears every relationship first, so the only
				// reason left for SpiceDB to refuse is the schema itself.
				err := s.reset(ctx, c.text)
				switch {
				case err != nil && c.spicedb:
					t.Errorf("refused: %v", err)
				case err == nil && !c.spicedb:
					t.Errorf("accepted, want a refusal")
				case err != nil:
					t.Logf("refused as expected: %v", err)
				}
			})
		}
	}
}
