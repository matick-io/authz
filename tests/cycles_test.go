package tests

import (
	"context"
	"strings"
	"testing"

	"github.com/matick-io/authz/engine"
)

// AI: found by the differential test on 2026-09-14. Two groups nested in
// each other, one of them holding a wildcard, and a permission that excludes
// one group from the other. Walking the exclusion's left side first opened
// group0, reached group2 through it, and group2 re-entered group0 while it
// was still open, so group2 was answered provisionally. That partial answer
// was cached as final, and the right side of the exclusion then read group2
// as holding nobody, letting everyone through. The memo must not keep an
// answer that rested on an open question.
const cyclicGroupsSchema = `
definition user {}
definition group {
    relation member: user | user:* | group#member
}
definition doc {
    relation viewer: user | group#member
    relation blocked: user | group#member
    permission view = viewer - blocked
    permission inverse = blocked - viewer
    permission both = viewer & blocked
}`

var cyclicGroupsTuples = []string{
	"group:group0#member@group:group2#member",
	"group:group2#member@group:group0#member",
	"group:group0#member@user:*",
	"group:group3#member@group:group4#member",
	"group:group4#member@group:group3#member",
	"group:group4#member@user:alice",
	"doc:d#viewer@group:group0#member",
	"doc:d#blocked@group:group2#member",
	"doc:e#viewer@group:group3#member",
	"doc:e#blocked@group:group4#member",
}

func TestExclusionAcrossANestingCycle(t *testing.T) {
	svc, _ := newService(t, cyclicGroupsSchema, cyclicGroupsTuples)
	ctx := context.Background()
	for _, c := range []struct {
		resource, permission, subject string
		want                          bool
	}{
		{"doc:d", "viewer", "user:zed", true},
		{"doc:d", "blocked", "user:zed", true},
		{"doc:d", "view", "user:zed", false},
		{"doc:d", "inverse", "user:zed", false},
		{"doc:d", "both", "user:zed", true},
		{"doc:e", "viewer", "user:alice", true},
		{"doc:e", "blocked", "user:alice", true},
		{"doc:e", "view", "user:alice", false},
		{"doc:e", "inverse", "user:alice", false},
		{"doc:e", "both", "user:alice", true},
		{"doc:e", "view", "user:bob", false},
	} {
		got, err := svc.CheckPermission(ctx, obj(c.resource), c.permission, subj(c.subject))
		if err != nil {
			t.Fatalf("check %s#%s@%s: %v", c.resource, c.permission, c.subject, err)
		}
		if got != c.want {
			t.Errorf("check %s#%s@%s: got %v want %v", c.resource, c.permission, c.subject, got, c.want)
		}
	}
	for _, c := range []struct {
		resource, permission, want string
	}{
		{"doc:d", "viewer", "*"},
		{"doc:d", "blocked", "*"},
		{"doc:d", "view", "none"},
		{"doc:d", "inverse", "none"},
		{"doc:d", "both", "*"},
		{"doc:e", "viewer", "alice"},
		{"doc:e", "blocked", "alice"},
		{"doc:e", "view", "none"},
		{"doc:e", "inverse", "none"},
		{"doc:e", "both", "alice"},
	} {
		got, err := svc.LookupSubjects(ctx, obj(c.resource), c.permission, "user", "")
		if err != nil {
			t.Fatalf("subjects %s#%s: %v", c.resource, c.permission, err)
		}
		if render(got) != c.want {
			t.Errorf("subjects %s#%s: got %s want %s", c.resource, c.permission, render(got), c.want)
		}
	}
	for _, c := range []struct {
		permission, subject, want string
	}{
		{"view", "user:zed", ""},
		{"view", "user:alice", ""},
		{"both", "user:zed", "d"},
		{"both", "user:alice", "d,e"},
		{"blocked", "user:alice", "d,e"},
	} {
		ids, err := svc.LookupResources(ctx, "doc", c.permission, subj(c.subject), 0)
		if err != nil {
			t.Fatalf("resources doc#%s@%s: %v", c.permission, c.subject, err)
		}
		if got := strings.Join(ids, ","); got != c.want {
			t.Errorf("resources doc#%s@%s: got %q want %q", c.permission, c.subject, got, c.want)
		}
	}
}

// AI: found by the SpiceDB corpus (recursivearrowref) on the closure kind.
// A subject whose relation is a permission asks, in reverse, about the
// relation that permission is made of, which asks back about the permission.
// The provisional set the memo handed out was then extended in place by the
// reflexive rule, so the owning question saw its set change on every pass
// and never converged. A small depth limit makes the old behaviour fail fast.
func TestReverseLookupWithPermissionUsersetSubject(t *testing.T) {
	svc, _ := newService(t, `
definition user {}
definition group {
    relation user: user
    permission member = user
    permission both = member & user
}
definition folder {
    relation reader: user | group#member
    permission read = reader
}`, []string{
		"group:1#user@user:alice",
		"folder:f#reader@group:1#member",
	}, engine.WithMaxDepth(8))
	ctx := context.Background()
	for _, c := range []struct {
		typ, permission, subject, want string
	}{
		{"group", "user", "group:1#member", ""},
		{"group", "member", "group:1#member", "1"},
		{"group", "both", "group:1#member", ""},
		{"folder", "reader", "group:1#member", "f"},
		{"folder", "read", "group:1#member", "f"},
		{"folder", "read", "user:alice", "f"},
	} {
		ids, err := svc.LookupResources(ctx, c.typ, c.permission, subj(c.subject), 0)
		if err != nil {
			t.Fatalf("resources %s#%s@%s: %v", c.typ, c.permission, c.subject, err)
		}
		if got := strings.Join(ids, ","); got != c.want {
			t.Errorf("resources %s#%s@%s: got %q want %q", c.typ, c.permission, c.subject, got, c.want)
		}
	}
}
