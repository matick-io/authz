package memory

import (
	"context"
	"errors"
	"sync"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/engine"
	"github.com/matick-io/authz/materialize"
	"github.com/matick-io/authz/schema"
)

// ErrNotMemory is returned when the index is asked to answer for a Reader
// that did not come from the memory datastore.
var ErrNotMemory = errors.New("memory: the index needs the memory datastore's reader")

// Index is the memory datastore's index: a materialize.Snapshot, rebuilt from
// the store the first time it is asked after the store changed. It is exact
// by construction and costs a full derivation per change, which suits a store
// that is itself a test oracle; it is the reference the Postgres index is
// held to, and the way to run every suite on an indexed engine without a
// database.
type Index struct {
	ds   *Datastore
	sets *materialize.Sets
	mu   sync.Mutex
	rev  authz.Revision
	snap *materialize.Snapshot
}

// NewIndex returns an index over ds materialising the named permissions of
// the schema, written as type#permission (materialize.Materializable lists
// those the schema allows); none keeps the closure only.
func NewIndex(ds *Datastore, sch *schema.Schema, permissions ...string) (*Index, error) {
	sets, err := materialize.NewSets(sch, permissions...)
	if err != nil {
		return nil, err
	}
	return &Index{ds: ds, sets: sets}, nil
}

// Options returns the engine options that read this index.
func (x *Index) Options() []engine.Option {
	opts := []engine.Option{engine.WithNestingIndex(x)}
	if !x.sets.Empty() {
		opts = append(opts, engine.WithPermissionIndex(x))
	}
	return opts
}

// snapshot returns the snapshot for the store as the reader sees it,
// rebuilding it when the store changed since the last one.
func (x *Index) snapshot(ctx context.Context, r authz.Reader) (*materialize.Snapshot, error) {
	st, ok := r.(*state)
	if !ok || st.d != x.ds {
		return nil, ErrNotMemory
	}
	rev := authz.Revision(len(st.d.changes))
	x.mu.Lock()
	defer x.mu.Unlock()
	if x.snap != nil && x.rev == rev {
		return x.snap, nil
	}
	rels, err := st.Relationships(ctx, authz.RelationshipQuery{})
	if err != nil {
		return nil, err
	}
	snap, err := materialize.Build(ctx, x.sets, rels)
	if err != nil {
		return nil, err
	}
	x.snap, x.rev = snap, rev
	return snap, nil
}

// NestedRelationships implements authz.NestingIndex.
func (x *Index) NestedRelationships(ctx context.Context, r authz.Reader, q authz.RelationshipQuery) ([]authz.Relationship, error) {
	s, err := x.snapshot(ctx, r)
	if err != nil {
		return nil, err
	}
	return s.NestedRelationships(ctx, r, q)
}

// NestedResourceIDs implements authz.NestingIndex.
func (x *Index) NestedResourceIDs(ctx context.Context, r authz.Reader, subjectType string, subjectIDs []string, subjectRelation, resourceType, relation string) ([]string, error) {
	s, err := x.snapshot(ctx, r)
	if err != nil {
		return nil, err
	}
	return s.NestedResourceIDs(ctx, r, subjectType, subjectIDs, subjectRelation, resourceType, relation)
}

// NestedResourceIDsAmong implements authz.NestingIndex.
func (x *Index) NestedResourceIDsAmong(ctx context.Context, r authz.Reader, subjectType string, subjectIDs []string, subjectRelation, resourceType, relation string, among []string) ([]string, error) {
	s, err := x.snapshot(ctx, r)
	if err != nil {
		return nil, err
	}
	return s.NestedResourceIDsAmong(ctx, r, subjectType, subjectIDs, subjectRelation, resourceType, relation, among)
}

// Materialized implements authz.PermissionIndex.
func (x *Index) Materialized(resourceType, permission string) bool {
	return x.sets.Materialized(resourceType, permission)
}

// HasPermission implements authz.PermissionIndex.
func (x *Index) HasPermission(ctx context.Context, r authz.Reader, resource authz.ObjectRef, permission string, subject authz.SubjectRef) (bool, error) {
	s, err := x.snapshot(ctx, r)
	if err != nil {
		return false, err
	}
	return s.HasPermission(ctx, r, resource, permission, subject)
}

// ResourcesWithPermission implements authz.PermissionIndex.
func (x *Index) ResourcesWithPermission(ctx context.Context, r authz.Reader, resourceType, permission string, subject authz.SubjectRef) ([]string, error) {
	s, err := x.snapshot(ctx, r)
	if err != nil {
		return nil, err
	}
	return s.ResourcesWithPermission(ctx, r, resourceType, permission, subject)
}

// ResourcesWithPermissionAmong implements authz.PermissionIndex.
func (x *Index) ResourcesWithPermissionAmong(ctx context.Context, r authz.Reader, resourceType, permission string, subject authz.SubjectRef, among []string) ([]string, error) {
	s, err := x.snapshot(ctx, r)
	if err != nil {
		return nil, err
	}
	return s.ResourcesWithPermissionAmong(ctx, r, resourceType, permission, subject, among)
}

// SubjectsWithPermission implements authz.PermissionIndex.
func (x *Index) SubjectsWithPermission(ctx context.Context, r authz.Reader, resource authz.ObjectRef, permission, subjectType, subjectRelation string) ([]string, error) {
	s, err := x.snapshot(ctx, r)
	if err != nil {
		return nil, err
	}
	return s.SubjectsWithPermission(ctx, r, resource, permission, subjectType, subjectRelation)
}
