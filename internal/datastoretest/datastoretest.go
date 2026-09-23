// Package datastoretest is the conformance suite every authz.Datastore must
// pass. The memory and postgres packages both run it, so the engine's
// expectations of a store, the change log included, are written once.
package datastoretest

import (
	"context"
	"errors"
	"testing"

	"github.com/matick-io/authz"
)

func rel(t *testing.T, s string) authz.Relationship {
	t.Helper()
	r, err := authz.ParseRelationship(s)
	if err != nil {
		t.Fatalf("parse %q: %v", s, err)
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

func equal(a, b []string) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func ptr(s string) *string { return &s }

// Run exercises a fresh, empty datastore produced by open.
func Run(t *testing.T, open func(t *testing.T) authz.Datastore) {
	t.Run("create touch delete", func(t *testing.T) {
		ds := open(t)
		ctx := context.Background()
		r := rel(t, "project:p1#member@user:alice")
		if err := ds.Transact(ctx, func(w authz.Writer) error { return w.Create(ctx, r) }); err != nil {
			t.Fatal(err)
		}
		err := ds.Transact(ctx, func(w authz.Writer) error { return w.Create(ctx, r) })
		if !errors.Is(err, authz.ErrRelationshipExists) {
			t.Fatalf("second create: %v", err)
		}
		if err := ds.Transact(ctx, func(w authz.Writer) error { return w.Touch(ctx, r) }); err != nil {
			t.Fatalf("touch existing: %v", err)
		}
		if err := ds.Transact(ctx, func(w authz.Writer) error { return w.Delete(ctx, r) }); err != nil {
			t.Fatal(err)
		}
		if err := ds.Transact(ctx, func(w authz.Writer) error { return w.Delete(ctx, r) }); err != nil {
			t.Fatalf("delete absent: %v", err)
		}
		var got []authz.Relationship
		if err := ds.View(ctx, func(rd authz.Reader) error {
			var err error
			got, err = rd.Relationships(ctx, authz.RelationshipQuery{})
			return err
		}); err != nil || len(got) != 0 {
			t.Fatalf("after delete: %v err %v", got, err)
		}
	})

	t.Run("query", func(t *testing.T) {
		ds := open(t)
		ctx := context.Background()
		seed := []string{
			"project:p1#member@user:alice",
			"project:p1#member@user:bob",
			"project:p1#member@team:core#member",
			"project:p2#member@user:alice",
			"project:p2#viewer@user:*",
			"team:core#member@user:carol",
		}
		if err := ds.Transact(ctx, func(w authz.Writer) error {
			for _, s := range seed {
				if err := w.Create(ctx, rel(t, s)); err != nil {
					return err
				}
			}
			return nil
		}); err != nil {
			t.Fatal(err)
		}
		cases := []struct {
			name string
			q    authz.RelationshipQuery
			want []string
		}{
			{"all", authz.RelationshipQuery{}, []string{
				"project:p1#member@team:core#member", "project:p1#member@user:alice", "project:p1#member@user:bob",
				"project:p2#member@user:alice", "project:p2#viewer@user:*", "team:core#member@user:carol"}},
			{"by type", authz.RelationshipQuery{ResourceType: "team"}, []string{"team:core#member@user:carol"}},
			{"by resource ids", authz.RelationshipQuery{ResourceType: "project", ResourceIDs: []string{"p2", "none"}}, []string{"project:p2#member@user:alice", "project:p2#viewer@user:*"}},
			{"by relation", authz.RelationshipQuery{ResourceType: "project", Relation: "viewer"}, []string{"project:p2#viewer@user:*"}},
			{"by subject", authz.RelationshipQuery{SubjectType: "user", SubjectIDs: []string{"alice"}}, []string{"project:p1#member@user:alice", "project:p2#member@user:alice"}},
			{"plain subjects only", authz.RelationshipQuery{ResourceType: "project", Relation: "member", SubjectRelation: ptr("")}, []string{"project:p1#member@user:alice", "project:p1#member@user:bob", "project:p2#member@user:alice"}},
			{"usersets only", authz.RelationshipQuery{SubjectType: "team", SubjectIDs: []string{"core"}, SubjectRelation: ptr("member")}, []string{"project:p1#member@team:core#member"}},
			{"limit", authz.RelationshipQuery{ResourceType: "project", Limit: 2}, []string{"project:p1#member@team:core#member", "project:p1#member@user:alice"}},
			{"nothing", authz.RelationshipQuery{ResourceType: "nope"}, nil},
		}
		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				var got []authz.Relationship
				if err := ds.View(ctx, func(r authz.Reader) error {
					var err error
					got, err = r.Relationships(ctx, tc.q)
					return err
				}); err != nil {
					t.Fatal(err)
				}
				if !equal(strs(got), tc.want) {
					t.Fatalf("got %v want %v", strs(got), tc.want)
				}
			})
		}

		var kinds []authz.RelationshipKind
		if err := ds.View(ctx, func(r authz.Reader) error {
			var err error
			kinds, err = r.RelationshipKinds(ctx)
			return err
		}); err != nil {
			t.Fatal(err)
		}
		wantKinds := []authz.RelationshipKind{
			{ResourceType: "project", Relation: "member", SubjectType: "team", SubjectRelation: "member"},
			{ResourceType: "project", Relation: "member", SubjectType: "user"},
			{ResourceType: "project", Relation: "viewer", SubjectType: "user"},
			{ResourceType: "team", Relation: "member", SubjectType: "user"},
		}
		if len(kinds) != len(wantKinds) {
			t.Fatalf("kinds %v want %v", kinds, wantKinds)
		}
		for i := range kinds {
			if kinds[i] != wantKinds[i] {
				t.Fatalf("kinds %v want %v", kinds, wantKinds)
			}
		}

		var n int64
		if err := ds.Transact(ctx, func(w authz.Writer) error {
			var err error
			n, err = w.DeleteMatching(ctx, authz.RelationshipQuery{ResourceType: "project", ResourceIDs: []string{"p1"}})
			return err
		}); err != nil || n != 3 {
			t.Fatalf("delete matching: n=%d err=%v", n, err)
		}
	})

	t.Run("transact rolls back on error", func(t *testing.T) {
		ds := open(t)
		ctx := context.Background()
		boom := errors.New("boom")
		err := ds.Transact(ctx, func(w authz.Writer) error {
			if err := w.Create(ctx, rel(t, "project:p1#member@user:alice")); err != nil {
				return err
			}
			return boom
		})
		if !errors.Is(err, boom) {
			t.Fatalf("want boom, got %v", err)
		}
		if err := ds.View(ctx, func(r authz.Reader) error {
			rs, err := r.Relationships(ctx, authz.RelationshipQuery{})
			if err != nil {
				return err
			}
			if len(rs) != 0 {
				t.Fatalf("relationship survived rollback: %v", rs)
			}
			changes, err := r.Changes(ctx, 0, 0)
			if err != nil {
				return err
			}
			if len(changes) != 0 {
				t.Fatalf("change log recorded a rolled-back write: %+v", changes)
			}
			return nil
		}); err != nil {
			t.Fatal(err)
		}
	})

	t.Run("changes", func(t *testing.T) { runChanges(t, open(t)) })
}

// runChanges pins down the change log: one Change per transaction that
// changed something, revisions strictly increasing, only effective writes
// recorded, in write order, with touch and delete as the two operations.
func runChanges(t *testing.T, ds authz.Datastore) {
	ctx := context.Background()
	changes := func(after authz.Revision, limit int) []authz.Change {
		t.Helper()
		var out []authz.Change
		if err := ds.View(ctx, func(r authz.Reader) error {
			var err error
			out, err = r.Changes(ctx, after, limit)
			return err
		}); err != nil {
			t.Fatalf("Changes(%d, %d): %v", after, limit, err)
		}
		return out
	}
	render := func(c authz.Change) []string {
		var out []string
		for _, u := range c.Updates {
			op := "touch"
			if u.Operation == authz.OperationDelete {
				op = "delete"
			}
			out = append(out, op+" "+u.Relationship.String())
		}
		return out
	}

	if got := changes(0, 0); len(got) != 0 {
		t.Fatalf("empty store has changes: %+v", got)
	}
	// An empty transaction records nothing.
	if err := ds.Transact(ctx, func(authz.Writer) error { return nil }); err != nil {
		t.Fatal(err)
	}
	if got := changes(0, 0); len(got) != 0 {
		t.Fatalf("empty transaction recorded a change: %+v", got)
	}

	if err := ds.Transact(ctx, func(w authz.Writer) error {
		if err := w.Create(ctx, rel(t, "project:p1#member@user:alice")); err != nil {
			return err
		}
		return w.Create(ctx, rel(t, "project:p1#member@team:core#member"))
	}); err != nil {
		t.Fatal(err)
	}
	if err := ds.Transact(ctx, func(w authz.Writer) error {
		if err := w.Touch(ctx, rel(t, "project:p1#member@user:alice")); err != nil { // present: not recorded
			return err
		}
		if err := w.Touch(ctx, rel(t, "project:p1#member@user:bob")); err != nil {
			return err
		}
		return w.Delete(ctx, rel(t, "project:p1#member@user:nobody")) // absent: not recorded
	}); err != nil {
		t.Fatal(err)
	}
	if err := ds.Transact(ctx, func(w authz.Writer) error {
		if err := w.Delete(ctx, rel(t, "project:p1#member@user:alice")); err != nil {
			return err
		}
		_, err := w.DeleteMatching(ctx, authz.RelationshipQuery{ResourceType: "project", ResourceIDs: []string{"p1"}})
		return err
	}); err != nil {
		t.Fatal(err)
	}

	got := changes(0, 0)
	if len(got) != 3 {
		t.Fatalf("want 3 changes, got %d: %+v", len(got), got)
	}
	for i := 1; i < len(got); i++ {
		if got[i].Revision <= got[i-1].Revision {
			t.Fatalf("revisions not increasing: %d then %d", got[i-1].Revision, got[i].Revision)
		}
	}
	want := [][]string{
		{"touch project:p1#member@user:alice", "touch project:p1#member@team:core#member"},
		{"touch project:p1#member@user:bob"},
		{"delete project:p1#member@user:alice", "delete project:p1#member@team:core#member", "delete project:p1#member@user:bob"},
	}
	for i, c := range got {
		if !equal(render(c), want[i]) {
			t.Errorf("change %d: got %v want %v", i, render(c), want[i])
		}
	}
	if after := changes(got[0].Revision, 0); len(after) != 2 || after[0].Revision != got[1].Revision {
		t.Fatalf("Changes(after first): %+v", after)
	}
	if limited := changes(0, 2); len(limited) != 2 || limited[1].Revision != got[1].Revision {
		t.Fatalf("Changes(limit 2): %+v", limited)
	}
	if none := changes(got[2].Revision, 0); len(none) != 0 {
		t.Fatalf("Changes(after last): %+v", none)
	}
}
