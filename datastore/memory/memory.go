// Package memory is an in-process authz.Datastore for tests. It holds
// everything in maps under one lock, so a View sees a consistent state and a
// Transact that returns an error leaves nothing behind. It keeps the
// changelog like any other datastore. Without an index the engine walks
// nesting on it, which makes it the oracle the indexed datastores are checked
// against; with one (WithIndex) it is the reference index, rebuilt in full
// on every change.
package memory

import (
	"context"
	"fmt"
	"sort"
	"sync"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/internal/materialize"
	"github.com/matick-io/authz/schema"
)

// Datastore is the in-memory store. The zero value is not usable; call New.
type Datastore struct {
	mu      sync.RWMutex
	rels    map[string]authz.Relationship
	changes []authz.Change
	index   *Index
	cfg     indexConfig
}

// Option configures New.
type Option func(*Datastore)

type indexConfig struct {
	wanted bool
	sch    *schema.Schema
	perms  []string
}

// WithIndex keeps an index over the store: the userset closure, and the
// permission sets of the named permissions, written type#permission, or of
// every permission the schema lets a set represent when none are named. A
// named permission the sets cannot represent fails New.
func WithIndex(sch *schema.Schema, permissions ...string) Option {
	return func(d *Datastore) { d.cfg = indexConfig{wanted: true, sch: sch, perms: permissions} }
}

// New returns an empty datastore; the engine finds its index, if any,
// through Index.
func New(opts ...Option) (*Datastore, error) {
	d := &Datastore{rels: map[string]authz.Relationship{}}
	for _, o := range opts {
		o(d)
	}
	if d.cfg.wanted {
		if d.cfg.sch == nil {
			return nil, fmt.Errorf("%w: nil schema", authz.ErrInvalidArgument)
		}
		perms := d.cfg.perms
		if len(perms) == 0 {
			perms = materialize.Materializable(d.cfg.sch)
		}
		sets, err := materialize.NewSets(d.cfg.sch, perms...)
		if err != nil {
			return nil, err
		}
		d.index = &Index{ds: d, sets: sets}
	}
	return d, nil
}

// Index returns the datastore's index, or nil when New was not asked for one.
func (d *Datastore) Index() authz.Index {
	if d.index == nil {
		return nil
	}
	return d.index
}

// View runs fn under a read lock.
func (d *Datastore) View(_ context.Context, fn func(authz.Reader) error) error {
	d.mu.RLock()
	defer d.mu.RUnlock()
	return fn(&state{d: d})
}

// Transact runs fn under the write lock, restores the previous contents if fn
// returns an error, and otherwise records what changed as the next revision.
func (d *Datastore) Transact(_ context.Context, fn func(authz.Writer) error) error {
	d.mu.Lock()
	defer d.mu.Unlock()
	prev := make(map[string]authz.Relationship, len(d.rels))
	for k, v := range d.rels {
		prev[k] = v
	}
	st := &state{d: d}
	if err := fn(st); err != nil {
		d.rels = prev
		return err
	}
	if len(st.recorded) > 0 {
		d.changes = append(d.changes, authz.Change{Revision: authz.Revision(len(d.changes) + 1), Updates: st.recorded})
	}
	return nil
}

// state is the Reader and Writer; the caller holds the lock.
type state struct {
	d        *Datastore
	recorded []authz.RelationshipUpdate
}

func (s *state) Relationships(_ context.Context, q authz.RelationshipQuery) ([]authz.Relationship, error) {
	var out []authz.Relationship
	for _, r := range s.d.rels {
		if matches(q, r) {
			out = append(out, r)
		}
	}
	sort.Slice(out, func(i, j int) bool { return out[i].String() < out[j].String() })
	if q.Limit > 0 && len(out) > q.Limit {
		out = out[:q.Limit]
	}
	return out, nil
}

func (s *state) RelationshipKinds(context.Context) ([]authz.RelationshipKind, error) {
	seen := map[authz.RelationshipKind]bool{}
	var out []authz.RelationshipKind
	for _, r := range s.d.rels {
		k := authz.RelationshipKind{ResourceType: r.Resource.Type, Relation: r.Relation, SubjectType: r.Subject.Object.Type, SubjectRelation: r.Subject.Relation}
		if !seen[k] {
			seen[k] = true
			out = append(out, k)
		}
	}
	sort.Slice(out, func(i, j int) bool {
		a, b := out[i], out[j]
		if a.ResourceType != b.ResourceType {
			return a.ResourceType < b.ResourceType
		}
		if a.Relation != b.Relation {
			return a.Relation < b.Relation
		}
		if a.SubjectType != b.SubjectType {
			return a.SubjectType < b.SubjectType
		}
		return a.SubjectRelation < b.SubjectRelation
	})
	return out, nil
}

func (s *state) Changes(_ context.Context, after authz.Revision, limit int) ([]authz.Change, error) {
	var out []authz.Change
	for _, c := range s.d.changes {
		if c.Revision <= after {
			continue
		}
		if limit > 0 && len(out) == limit {
			break
		}
		out = append(out, c)
	}
	return out, nil
}

func (s *state) record(op authz.UpdateOperation, r authz.Relationship) {
	s.recorded = append(s.recorded, authz.RelationshipUpdate{Operation: op, Relationship: r})
}

func (s *state) Create(_ context.Context, r authz.Relationship) error {
	key := r.String()
	if _, exists := s.d.rels[key]; exists {
		return authz.ErrRelationshipExists
	}
	s.d.rels[key] = r
	s.record(authz.OperationTouch, r)
	return nil
}

func (s *state) Touch(_ context.Context, r authz.Relationship) error {
	key := r.String()
	if _, exists := s.d.rels[key]; exists {
		return nil
	}
	s.d.rels[key] = r
	s.record(authz.OperationTouch, r)
	return nil
}

func (s *state) Delete(_ context.Context, r authz.Relationship) error {
	key := r.String()
	if _, exists := s.d.rels[key]; !exists {
		return nil
	}
	delete(s.d.rels, key)
	s.record(authz.OperationDelete, r)
	return nil
}

func (s *state) DeleteMatching(ctx context.Context, q authz.RelationshipQuery) (int64, error) {
	q.Limit = 0
	matched, err := s.Relationships(ctx, q)
	if err != nil {
		return 0, err
	}
	for _, r := range matched {
		delete(s.d.rels, r.String())
		s.record(authz.OperationDelete, r)
	}
	return int64(len(matched)), nil
}

func matches(q authz.RelationshipQuery, r authz.Relationship) bool {
	if q.ResourceType != "" && r.Resource.Type != q.ResourceType {
		return false
	}
	if len(q.ResourceIDs) > 0 && !contains(q.ResourceIDs, r.Resource.ID) {
		return false
	}
	if q.Relation != "" && r.Relation != q.Relation {
		return false
	}
	if q.SubjectType != "" && r.Subject.Object.Type != q.SubjectType {
		return false
	}
	if len(q.SubjectIDs) > 0 && !contains(q.SubjectIDs, r.Subject.Object.ID) {
		return false
	}
	if q.SubjectRelation != nil && r.Subject.Relation != *q.SubjectRelation {
		return false
	}
	return true
}

func contains(ids []string, id string) bool {
	for _, x := range ids {
		if x == id {
			return true
		}
	}
	return false
}
