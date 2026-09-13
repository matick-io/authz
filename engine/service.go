package engine

import (
	"context"

	"fmt"
	"github.com/matick-io/authz"

	"github.com/matick-io/authz/schema"
)

// DefaultMaxDepth bounds how many hops one resolution may take before it
// fails with authz.ErrMaxDepthExceeded. Arrows always count; nesting counts only
// when no authz.NestingIndex is registered.
const DefaultMaxDepth = 50

// Service is the engine: one schema, one datastore. It is safe for concurrent
// use. The schema is fixed for the Service's lifetime; build a new Service to
// change it, after ValidateStored says the stored relationships still fit.
type Service struct {
	ds       authz.Datastore
	sch      *schema.Schema
	idx      authz.NestingIndex
	pidx     authz.PermissionIndex
	maxDepth int
}

// Option configures New.
type Option func(*Service)

// WithNestingIndex registers an index that answers nested usersets in one
// call (see authz.NestingIndex). Without one the engine walks nesting.
func WithNestingIndex(idx authz.NestingIndex) Option {
	return func(s *Service) { s.idx = idx }
}

// WithPermissionIndex registers an index of precomputed permissions (see
// authz.PermissionIndex). The engine uses it for every permission it reports as
// materialised and evaluates the rewrite for the rest.
func WithPermissionIndex(idx authz.PermissionIndex) Option {
	return func(s *Service) { s.pidx = idx }
}

// WithMaxDepth overrides DefaultMaxDepth.
func WithMaxDepth(n int) Option {
	return func(s *Service) {
		if n > 0 {
			s.maxDepth = n
		}
	}
}

// New builds a Service over a datastore with the schema it will enforce. It
// touches the datastore only through ValidateStored, which the caller runs at
// boot.
func New(ds authz.Datastore, sch *schema.Schema, opts ...Option) (*Service, error) {
	if ds == nil {
		return nil, fmt.Errorf("%w: nil datastore", authz.ErrInvalidArgument)
	}
	if sch == nil {
		return nil, fmt.Errorf("%w: nil schema", authz.ErrInvalidArgument)
	}
	s := &Service{ds: ds, sch: sch, maxDepth: DefaultMaxDepth}
	for _, o := range opts {
		o(s)
	}
	return s, nil
}

// Schema returns the schema the Service enforces.
func (s *Service) Schema() *schema.Schema { return s.sch }

// ValidateStored checks that every kind of relationship in the datastore is
// still expressible in the schema: its type and relation exist and its
// subject is allowed. A mismatch is authz.ErrSchemaMismatch. Run it at boot, and
// after any schema change, so a relation renamed in code cannot silently
// orphan the grants stored under the old name.
func (s *Service) ValidateStored(ctx context.Context) error {
	return s.ds.View(ctx, func(r authz.Reader) error {
		kinds, err := r.RelationshipKinds(ctx)
		if err != nil {
			return err
		}
		for _, k := range kinds {
			if err := kindConforms(s.sch, k); err != nil {
				return err
			}
		}
		return nil
	})
}

func kindConforms(sch *schema.Schema, k authz.RelationshipKind) error {
	def := sch.Definition(k.ResourceType)
	if def == nil {
		return fmt.Errorf("%w: relationships of type %s exist but the schema does not define it", authz.ErrSchemaMismatch, k.ResourceType)
	}
	rel, ok := def.Relations[k.Relation]
	if !ok {
		return fmt.Errorf("%w: relationships %s#%s exist but the schema does not define that relation", authz.ErrSchemaMismatch, k.ResourceType, k.Relation)
	}
	subject := k.SubjectType
	if k.SubjectRelation != "" {
		subject += "#" + k.SubjectRelation
	}
	if sch.Definition(k.SubjectType) == nil {
		return fmt.Errorf("%w: relationships %s#%s@%s exist but the schema does not define %s", authz.ErrSchemaMismatch, k.ResourceType, k.Relation, subject, k.SubjectType)
	}
	// AI: the kinds query collapses wildcard and concrete subjects into one
	// row, so a kind conforms if either form is allowed; per-relationship
	// checks happen on write.
	if !rel.Allows(k.SubjectType, k.SubjectRelation, false) && !(k.SubjectRelation == "" && rel.Allows(k.SubjectType, "", true)) {
		return fmt.Errorf("%w: relationships %s#%s@%s exist but the schema does not allow that subject", authz.ErrSchemaMismatch, k.ResourceType, k.Relation, subject)
	}
	return nil
}

// ReadRelationships returns the relationships matching the filter, in a stable
// order. limit 0 means all of them.
func (s *Service) ReadRelationships(ctx context.Context, filter authz.RelationshipFilter, limit int) ([]authz.Relationship, error) {
	if err := filter.Validate(); err != nil {
		return nil, err
	}
	var out []authz.Relationship
	err := s.ds.View(ctx, func(r authz.Reader) error {
		var err error
		out, err = r.Relationships(ctx, filter.Query(limit))
		return err
	})
	return out, err
}

// WriteRelationships applies every update in one transaction, after the
// preconditions hold and every relationship conforms to the schema. Either all
// updates land or none do.
func (s *Service) WriteRelationships(ctx context.Context, updates []authz.RelationshipUpdate, preconditions ...authz.Precondition) error {
	if err := s.validateUpdates(updates, preconditions); err != nil {
		return err
	}
	return s.ds.Transact(ctx, func(w authz.Writer) error {
		return s.applyUpdates(ctx, w, updates, preconditions)
	})
}

// WriteRelationshipsIn is WriteRelationships inside a transaction the caller
// owns, so a grant and the application rows it protects commit together or
// not at all. The datastore package says how to obtain a authz.Writer for a host
// transaction.
func (s *Service) WriteRelationshipsIn(ctx context.Context, w authz.Writer, updates []authz.RelationshipUpdate, preconditions ...authz.Precondition) error {
	if err := s.validateUpdates(updates, preconditions); err != nil {
		return err
	}
	return s.applyUpdates(ctx, w, updates, preconditions)
}

// ImportRelationships creates many relationships at once, for loading a
// dataset. Every relationship must conform to the schema and none may be
// present. A datastore that offers authz.BulkCreator loads them in one pass;
// any other creates them one by one inside a single transaction.
func (s *Service) ImportRelationships(ctx context.Context, rels []authz.Relationship) error {
	if len(rels) == 0 {
		return nil
	}
	for i, r := range rels {
		if err := r.Validate(); err != nil {
			return fmt.Errorf("relationship %d: %w", i, err)
		}
		if err := conforms(s.sch, r); err != nil {
			return fmt.Errorf("relationship %d: %w", i, err)
		}
	}
	if bulk, ok := s.ds.(authz.BulkCreator); ok {
		return bulk.CreateAll(ctx, rels)
	}
	return s.ds.Transact(ctx, func(w authz.Writer) error {
		for _, r := range rels {
			if err := w.Create(ctx, r); err != nil {
				return err
			}
		}
		return nil
	})
}

func (s *Service) validateUpdates(updates []authz.RelationshipUpdate, preconditions []authz.Precondition) error {
	if len(updates) == 0 {
		return fmt.Errorf("%w: no updates", authz.ErrInvalidArgument)
	}
	for i, u := range updates {
		switch u.Operation {
		case authz.OperationCreate, authz.OperationTouch, authz.OperationDelete:
		default:
			return fmt.Errorf("%w: update %d has no operation", authz.ErrInvalidArgument, i)
		}
		if err := u.Relationship.Validate(); err != nil {
			return fmt.Errorf("update %d: %w", i, err)
		}
		if err := conforms(s.sch, u.Relationship); err != nil {
			return fmt.Errorf("update %d: %w", i, err)
		}
	}
	for i, p := range preconditions {
		if err := p.Validate(); err != nil {
			return fmt.Errorf("precondition %d: %w", i, err)
		}
	}
	return nil
}

func (s *Service) applyUpdates(ctx context.Context, w authz.Writer, updates []authz.RelationshipUpdate, preconditions []authz.Precondition) error {
	if err := checkPreconditions(ctx, w, preconditions); err != nil {
		return err
	}
	for _, u := range updates {
		var err error
		switch u.Operation {
		case authz.OperationCreate:
			err = w.Create(ctx, u.Relationship)
		case authz.OperationTouch:
			err = w.Touch(ctx, u.Relationship)
		case authz.OperationDelete:
			err = w.Delete(ctx, u.Relationship)
		}
		if err != nil {
			return err
		}
	}
	return nil
}

// DeleteRelationships removes every relationship matching the filter, after
// the preconditions hold, and reports how many went.
func (s *Service) DeleteRelationships(ctx context.Context, filter authz.RelationshipFilter, preconditions ...authz.Precondition) (int64, error) {
	if err := filter.Validate(); err != nil {
		return 0, err
	}
	for i, p := range preconditions {
		if err := p.Validate(); err != nil {
			return 0, fmt.Errorf("precondition %d: %w", i, err)
		}
	}
	var n int64
	err := s.ds.Transact(ctx, func(w authz.Writer) error {
		if err := checkPreconditions(ctx, w, preconditions); err != nil {
			return err
		}
		var err error
		n, err = w.DeleteMatching(ctx, filter.Query(0))
		return err
	})
	return n, err
}

func checkPreconditions(ctx context.Context, r authz.Reader, preconditions []authz.Precondition) error {
	for _, p := range preconditions {
		matches, err := r.Relationships(ctx, p.Filter.Query(1))
		if err != nil {
			return err
		}
		switch p.Operation {
		case authz.PreconditionMustMatch:
			if len(matches) == 0 {
				return fmt.Errorf("%w: no relationship matches %s", authz.ErrPreconditionFailed, describeFilter(p.Filter))
			}
		case authz.PreconditionMustNotMatch:
			if len(matches) > 0 {
				return fmt.Errorf("%w: %s matches %s", authz.ErrPreconditionFailed, matches[0], describeFilter(p.Filter))
			}
		}
	}
	return nil
}

func describeFilter(f authz.RelationshipFilter) string {
	s := f.ResourceType + ":" + orAny(f.ResourceID) + "#" + orAny(f.Relation)
	if f.Subject != nil {
		s += "@" + f.Subject.Type + ":" + orAny(f.Subject.ID)
		if f.Subject.Relation != nil {
			s += "#" + *f.Subject.Relation
		}
	}
	return s
}

func orAny(s string) string {
	if s == "" {
		return "?"
	}
	return s
}

// conforms checks one relationship against the schema: the resource type and
// relation exist, the relation is stored (not a permission), and the subject is
// among the relation's allowed subject types.
func conforms(sch *schema.Schema, r authz.Relationship) error {
	def := sch.Definition(r.Resource.Type)
	if def == nil {
		return fmt.Errorf("%w: %s: unknown object type %q", authz.ErrInvalidArgument, r, r.Resource.Type)
	}
	rel, ok := def.Relations[r.Relation]
	if !ok {
		if _, isPerm := def.Permissions[r.Relation]; isPerm {
			return fmt.Errorf("%w: %s: %s#%s is a permission and cannot be written", authz.ErrInvalidArgument, r, r.Resource.Type, r.Relation)
		}
		return fmt.Errorf("%w: %s: unknown relation %s#%s", authz.ErrInvalidArgument, r, r.Resource.Type, r.Relation)
	}
	subj := r.Subject
	if subj.Object.ID == authz.WildcardID {
		if !rel.Allows(subj.Object.Type, "", true) {
			return fmt.Errorf("%w: %s: %s#%s does not allow %s:*", authz.ErrInvalidArgument, r, r.Resource.Type, r.Relation, subj.Object.Type)
		}
		return nil
	}
	subjDef := sch.Definition(subj.Object.Type)
	if subjDef == nil {
		return fmt.Errorf("%w: %s: unknown subject type %q", authz.ErrInvalidArgument, r, subj.Object.Type)
	}
	if subj.Relation != "" && !subjDef.Has(subj.Relation) {
		return fmt.Errorf("%w: %s: %s has no relation or permission %q", authz.ErrInvalidArgument, r, subj.Object.Type, subj.Relation)
	}
	if !rel.Allows(subj.Object.Type, subj.Relation, false) {
		return fmt.Errorf("%w: %s: %s#%s does not allow subject %s", authz.ErrInvalidArgument, r, r.Resource.Type, r.Relation, subjectKind(subj))
	}
	return nil
}

func subjectKind(s authz.SubjectRef) string {
	if s.Relation == "" {
		return s.Object.Type
	}
	return s.Object.Type + "#" + s.Relation
}

// target validates the (resource type, relation-or-permission, subject type)
// of a permission question against the schema before any resolution starts,
// so an unknown name is an error rather than a silent denial.
func target(sch *schema.Schema, resourceType, relation string, subject authz.SubjectRef) error {
	def := sch.Definition(resourceType)
	if def == nil {
		return fmt.Errorf("%w: unknown object type %q", authz.ErrInvalidArgument, resourceType)
	}
	if !def.Has(relation) {
		return fmt.Errorf("%w: %s has no relation or permission %q", authz.ErrInvalidArgument, resourceType, relation)
	}
	subjDef := sch.Definition(subject.Object.Type)
	if subjDef == nil {
		return fmt.Errorf("%w: unknown subject type %q", authz.ErrInvalidArgument, subject.Object.Type)
	}
	if subject.Relation != "" && !subjDef.Has(subject.Relation) {
		return fmt.Errorf("%w: %s has no relation or permission %q", authz.ErrInvalidArgument, subject.Object.Type, subject.Relation)
	}
	return nil
}
