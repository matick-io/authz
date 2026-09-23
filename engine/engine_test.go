package engine_test

import (
	"context"
	"errors"
	"testing"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/datastore/memory"
	"github.com/matick-io/authz/engine"
	"github.com/matick-io/authz/schema"
)

func TestParseRelationship(t *testing.T) {
	for _, s := range []string{"project:p1#member@user:alice", "project:p1#member@team:core#member", "project:p1#viewer@user:*"} {
		r, err := authz.ParseRelationship(s)
		if err != nil || r.String() != s {
			t.Errorf("%s: %v %v", s, r, err)
		}
	}
	for _, s := range []string{"", "project:p1#member", "project#member@user:a", "project:p1@user:a", "project:p1#member@user:*#x", "Project:p1#member@user:a", "project:p1#member@user:a b"} {
		if _, err := authz.ParseRelationship(s); !errors.Is(err, authz.ErrInvalidArgument) {
			t.Errorf("%q: want ErrInvalidArgument, got %v", s, err)
		}
	}
}

// The core needs no parser: a schema built in code drives the engine.
func TestProgrammaticSchema(t *testing.T) {
	sch, err := schema.Build(
		schema.Def("user"),
		schema.Def("team", schema.Rel("member", schema.Subject("user"), schema.Userset("team", "member"))),
		schema.Def("project",
			schema.Rel("owner", schema.Subject("user")),
			schema.Rel("member", schema.Subject("user"), schema.Userset("team", "member")),
			schema.Rel("banned", schema.Subject("user")),
			schema.Perm("view", schema.ExclusionOf(schema.UnionOf(schema.Ref("member"), schema.Ref("owner")), schema.Ref("banned"))),
		),
	)
	if err != nil {
		t.Fatal(err)
	}
	ds, err := memory.New()
	if err != nil {
		t.Fatal(err)
	}
	svc, err := engine.New(ds, sch)
	if err != nil {
		t.Fatal(err)
	}
	ctx := context.Background()
	var updates []authz.RelationshipUpdate
	for _, s := range []string{
		"team:core#member@team:leads#member",
		"team:leads#member@user:dave",
		"project:p#member@team:core#member",
		"project:p#owner@user:alice",
		"project:p#banned@user:alice",
	} {
		r, err := authz.ParseRelationship(s)
		if err != nil {
			t.Fatal(err)
		}
		updates = append(updates, authz.RelationshipUpdate{Operation: authz.OperationCreate, Relationship: r})
	}
	if err := svc.WriteRelationships(ctx, updates); err != nil {
		t.Fatal(err)
	}
	if err := svc.ValidateStored(ctx); err != nil {
		t.Fatal(err)
	}
	project := authz.ObjectRef{Type: "project", ID: "p"}
	user := func(id string) authz.SubjectRef {
		return authz.SubjectRef{Object: authz.ObjectRef{Type: "user", ID: id}}
	}
	if ok, err := svc.CheckPermission(ctx, project, "view", user("dave")); err != nil || !ok {
		t.Fatalf("dave: %v %v", ok, err)
	}
	if ok, err := svc.CheckPermission(ctx, project, "view", user("alice")); err != nil || ok {
		t.Fatalf("alice is banned: %v %v", ok, err)
	}
	ids, err := svc.LookupResources(ctx, "project", "view", user("dave"), 0)
	if err != nil || len(ids) != 1 || ids[0] != "p" {
		t.Fatalf("lookup: %v %v", ids, err)
	}
	subjects, err := svc.LookupSubjects(ctx, project, "view", "user", "")
	if err != nil || len(subjects.SubjectIDs) != 1 || subjects.SubjectIDs[0] != "dave" {
		t.Fatalf("subjects: %+v %v", subjects, err)
	}
	if _, err := schema.Build(schema.Def("user"), schema.Def("doc", schema.Perm("p", schema.Ref("ghost")))); err == nil {
		t.Fatal("dangling reference accepted")
	}
}
