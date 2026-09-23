package index_test

import (
	"context"
	"errors"
	"strings"
	"testing"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/engine"
	"github.com/matick-io/authz/postgres/index"
)

// Attach materialises every permission the schema allows unless told
// otherwise, and hands back a datastore and options that work as one unit.
func TestAttach(t *testing.T) {
	sch := parse(t, hierarchySchema)
	pool := openPool(t)
	if _, err := index.Attach(pool, nil); !errors.Is(err, authz.ErrInvalidArgument) {
		t.Fatalf("nil schema: %v", err)
	}
	closureOnly, err := index.Attach(pool, sch, index.WithPermissionSets(sch))
	if err != nil {
		t.Fatal(err)
	}
	if closureOnly.Index.Materialized("document", "view") || len(closureOnly.Options) != 1 {
		t.Fatalf("closure only still has permission sets: %d options", len(closureOnly.Options))
	}
	a, err := index.Attach(pool, sch)
	if err != nil {
		t.Fatal(err)
	}
	for _, name := range index.Materializable(sch) {
		typ, perm, _ := strings.Cut(name, "#")
		if !a.Index.Materialized(typ, perm) {
			t.Errorf("%s not materialised by default", name)
		}
	}
	if len(a.Options) != 2 {
		t.Fatalf("expected nesting and permission options, got %d", len(a.Options))
	}
	svc, err := engine.New(a.Datastore, sch, a.Options...)
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
	if got := readSets(t, pool); len(got) == 0 {
		t.Fatal("the hook did not maintain the sets")
	}
	if drift, err := a.Index.Verify(ctx, pool); err != nil || !drift.Empty() {
		t.Fatalf("drift after a hooked write: %v %s", err, drift)
	}
	if ok, err := svc.CheckPermission(ctx, obj("document:d"), "view", subj("user:alice")); err != nil || !ok {
		t.Fatalf("check through the attached index: %v %v", ok, err)
	}
}
