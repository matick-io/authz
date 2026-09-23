package postgres

import (
	"context"
	"errors"
	"strings"
	"testing"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/engine"
	"github.com/matick-io/authz/internal/materialize"
)

// WithIndex materialises every permission the schema allows unless told
// otherwise, the engine finds the index on the datastore, and a write keeps
// it in step.
func TestWithIndex(t *testing.T) {
	sch := parse(t, hierarchySchema)
	pool := openPool(t)
	if _, err := New(pool, WithIndex(nil)); !errors.Is(err, authz.ErrInvalidArgument) {
		t.Fatalf("nil schema: %v", err)
	}
	plain, err := New(pool)
	if err != nil || plain.Index() != nil {
		t.Fatalf("a datastore not asked for an index has one: %v %v", plain.Index(), err)
	}
	closureOnly, err := New(pool, WithNestingIndex())
	if err != nil {
		t.Fatal(err)
	}
	if closureOnly.index.Materialized("document", "view") {
		t.Fatal("closure only still has permission sets")
	}
	ds, err := New(pool, WithIndex(sch))
	if err != nil {
		t.Fatal(err)
	}
	for _, name := range materialize.Materializable(sch) {
		typ, perm, _ := strings.Cut(name, "#")
		if !ds.index.Materialized(typ, perm) {
			t.Errorf("%s not materialised by default", name)
		}
	}
	if ds.Index() == nil || len(ds.hooks) != 1 {
		t.Fatalf("the index is not on the datastore: index %v, %d hooks", ds.Index(), len(ds.hooks))
	}
	svc, err := engine.New(ds, sch)
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
		t.Fatal("the write did not maintain the sets")
	}
	if drift, err := ds.index.Verify(ctx); err != nil || !drift.Empty() {
		t.Fatalf("drift after a write: %v %s", err, drift)
	}
	if ok, err := svc.CheckPermission(ctx, obj("document:d"), "view", subj("user:alice")); err != nil || !ok {
		t.Fatalf("check through the index: %v %v", ok, err)
	}
}
