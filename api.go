package authz

import (
	"errors"
	"fmt"
)

// UpdateOperation is what a RelationshipUpdate does to its relationship.
type UpdateOperation int

const (
	// OperationCreate writes the relationship and fails with
	// ErrRelationshipExists when it is already present.
	OperationCreate UpdateOperation = iota + 1
	// OperationTouch writes the relationship if absent and succeeds either way.
	OperationTouch
	// OperationDelete removes the relationship and succeeds either way.
	OperationDelete
)

// RelationshipUpdate is one element of a WriteRelationships call, and one
// element of a Change, where Operation is OperationTouch for a relationship
// that came into being and OperationDelete for one that went.
type RelationshipUpdate struct {
	Operation    UpdateOperation
	Relationship Relationship
}

// RelationshipFilter selects relationships. ResourceType is required at the
// API; every other field narrows the selection when set.
type RelationshipFilter struct {
	ResourceType string
	ResourceID   string
	Relation     string
	Subject      *SubjectFilter
}

// SubjectFilter narrows a RelationshipFilter by subject. A nil Relation matches
// any subject relation; a pointer to "" matches only plain object subjects.
type SubjectFilter struct {
	Type     string
	ID       string
	Relation *string
}

// PreconditionOperation says what a Precondition requires of its filter.
type PreconditionOperation int

const (
	// PreconditionMustMatch requires at least one relationship to match.
	PreconditionMustMatch PreconditionOperation = iota + 1
	// PreconditionMustNotMatch requires no relationship to match.
	PreconditionMustNotMatch
)

// Precondition is checked inside the write transaction before any update is
// applied; a failure aborts the whole write with ErrPreconditionFailed.
type Precondition struct {
	Operation PreconditionOperation
	Filter    RelationshipFilter
}

// CheckPermissionRequest is one item of a CheckBulkPermissions call.
type CheckPermissionRequest struct {
	Resource   ObjectRef
	Permission string
	Subject    SubjectRef
}

// CheckPermissionResult answers one CheckPermissionRequest. Err is set when
// that item could not be evaluated; the other items are unaffected.
type CheckPermissionResult struct {
	Request       CheckPermissionRequest
	HasPermission bool
	Err           error
}

// LookupSubjectsResult is the set of subjects of one type that hold a
// permission. When Wildcard is true every subject of the type holds it except
// ExcludedSubjectIDs, and SubjectIDs is empty.
type LookupSubjectsResult struct {
	SubjectIDs         []string
	Wildcard           bool
	ExcludedSubjectIDs []string
}

// TreeOperation labels a PermissionTree node.
type TreeOperation int

const (
	// TreeLeaf holds the subjects a relation directly names.
	TreeLeaf TreeOperation = iota + 1
	TreeUnion
	TreeIntersection
	TreeExclusion
)

// PermissionTree is what ExpandPermissionTree returns: the rewrite of one
// permission on one resource, one level of usersets deep, as SpiceDB expands it.
type PermissionTree struct {
	Resource  ObjectRef
	Relation  string
	Operation TreeOperation
	Subjects  []SubjectRef      // TreeLeaf only
	Children  []*PermissionTree // set operations only; Exclusion has exactly two
}

// Errors the API returns. Wrap-compatible: test with errors.Is.
var (
	ErrInvalidArgument    = errors.New("authz: invalid argument")
	ErrRelationshipExists = errors.New("authz: relationship already exists")
	ErrPreconditionFailed = errors.New("authz: precondition failed")
	ErrMaxDepthExceeded   = errors.New("authz: maximum resolution depth exceeded")
	ErrSchemaMismatch     = errors.New("authz: stored relationships do not conform to the schema")
)

// Validate checks the filter is well formed; ResourceType is required.
func (f RelationshipFilter) Validate() error {
	if !ValidTypeName(f.ResourceType) {
		return fmt.Errorf("%w: filter resource type %q", ErrInvalidArgument, f.ResourceType)
	}
	if f.ResourceID != "" && !ValidObjectID(f.ResourceID) {
		return fmt.Errorf("%w: filter resource id %q", ErrInvalidArgument, f.ResourceID)
	}
	if f.Relation != "" && !ValidName(f.Relation) {
		return fmt.Errorf("%w: filter relation %q", ErrInvalidArgument, f.Relation)
	}
	if f.Subject != nil {
		if !ValidTypeName(f.Subject.Type) {
			return fmt.Errorf("%w: filter subject type %q", ErrInvalidArgument, f.Subject.Type)
		}
		if f.Subject.ID != "" && f.Subject.ID != WildcardID && !ValidObjectID(f.Subject.ID) {
			return fmt.Errorf("%w: filter subject id %q", ErrInvalidArgument, f.Subject.ID)
		}
		if f.Subject.Relation != nil && *f.Subject.Relation != "" && !ValidName(*f.Subject.Relation) {
			return fmt.Errorf("%w: filter subject relation %q", ErrInvalidArgument, *f.Subject.Relation)
		}
	}
	return nil
}

// Query renders the filter as the datastore-level selection.
func (f RelationshipFilter) Query(limit int) RelationshipQuery {
	q := RelationshipQuery{ResourceType: f.ResourceType, Relation: f.Relation, Limit: limit}
	if f.ResourceID != "" {
		q.ResourceIDs = []string{f.ResourceID}
	}
	if f.Subject != nil {
		q.SubjectType = f.Subject.Type
		if f.Subject.ID != "" {
			q.SubjectIDs = []string{f.Subject.ID}
		}
		q.SubjectRelation = f.Subject.Relation
	}
	return q
}

// Validate checks the precondition names an operation and a well-formed filter.
func (p Precondition) Validate() error {
	switch p.Operation {
	case PreconditionMustMatch, PreconditionMustNotMatch:
	default:
		return fmt.Errorf("%w: precondition has no operation", ErrInvalidArgument)
	}
	return p.Filter.Validate()
}

// Validate checks the request is well formed; a wildcard cannot be checked.
func (r CheckPermissionRequest) Validate() error {
	if err := r.Resource.Validate(); err != nil {
		return err
	}
	if !ValidName(r.Permission) {
		return fmt.Errorf("%w: permission %q", ErrInvalidArgument, r.Permission)
	}
	if r.Subject.Object.ID == WildcardID {
		return fmt.Errorf("%w: a wildcard cannot be the subject of a check", ErrInvalidArgument)
	}
	return r.Subject.Validate()
}
