package authz

import (
	"context"
	"errors"
	"fmt"
	"regexp"
	"strings"
)

// ObjectRef names one object: a type from the schema and an id.
type ObjectRef struct {
	Type string
	ID   string
}

// String renders the SpiceDB form, type:id.
func (o ObjectRef) String() string { return o.Type + ":" + o.ID }

// SubjectRef is an object, or a userset (every subject holding Relation on the
// object) when Relation is set.
type SubjectRef struct {
	Object   ObjectRef
	Relation string
}

// String renders the SpiceDB form, type:id or type:id#relation.
func (s SubjectRef) String() string {
	if s.Relation == "" {
		return s.Object.String()
	}
	return s.Object.String() + "#" + s.Relation
}

// Relationship is one tuple: Subject holds Relation on Resource.
type Relationship struct {
	Resource ObjectRef
	Relation string
	Subject  SubjectRef
}

// String renders the SpiceDB tuple form, type:id#relation@type:id[#relation].
func (r Relationship) String() string {
	return r.Resource.String() + "#" + r.Relation + "@" + r.Subject.String()
}

// IsNesting reports whether the relationship nests one userset within
// another: its subject is a userset. Indexes care about exactly these.
func (r Relationship) IsNesting() bool { return r.Subject.Relation != "" }

// WildcardID is the subject id that stands for every object of its type.
const WildcardID = "*"

// ParseRelationship reads the SpiceDB tuple form Relationship.String produces.
func ParseRelationship(s string) (Relationship, error) {
	left, right, ok := strings.Cut(s, "@")
	if !ok {
		return Relationship{}, fmt.Errorf("%w: relationship %q lacks '@'", ErrInvalidArgument, s)
	}
	res, rel, ok := strings.Cut(left, "#")
	if !ok {
		return Relationship{}, fmt.Errorf("%w: relationship %q lacks '#' before '@'", ErrInvalidArgument, s)
	}
	resource, err := parseObject(res)
	if err != nil {
		return Relationship{}, err
	}
	subjObj, subjRel, _ := strings.Cut(right, "#")
	subject, err := parseObject(subjObj)
	if err != nil {
		return Relationship{}, err
	}
	r := Relationship{Resource: resource, Relation: rel, Subject: SubjectRef{Object: subject, Relation: subjRel}}
	return r, r.Validate()
}

func parseObject(s string) (ObjectRef, error) {
	typ, id, ok := strings.Cut(s, ":")
	if !ok {
		return ObjectRef{}, fmt.Errorf("%w: object %q lacks ':'", ErrInvalidArgument, s)
	}
	return ObjectRef{Type: typ, ID: id}, nil
}

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

// RelationshipQuery is the datastore-level selection. Unlike RelationshipFilter
// it takes id sets, so a resolver can ask about many objects in one round
// trip, and no field is required.
type RelationshipQuery struct {
	ResourceType    string
	ResourceIDs     []string
	Relation        string
	SubjectType     string
	SubjectIDs      []string
	SubjectRelation *string
	Limit           int
}

// RelationshipKind is one distinct (resource type, relation, subject type,
// subject relation) combination present in the datastore.
type RelationshipKind struct {
	ResourceType    string
	Relation        string
	SubjectType     string
	SubjectRelation string
}

// Revision numbers committed write transactions in commit order. Zero is
// before the first.
type Revision uint64

// Change is what one committed transaction did to the relationships: every
// relationship that came into being (OperationTouch) or went
// (OperationDelete), in write order. Writes that changed nothing, such as a
// touch of a present relationship, do not appear.
//
// AI: this is SpiceDB's Watch stream as a value type. Indexes (the
// materialize module) and applications that mirror grants into their own
// tables consume it; a datastore must record it in the same transaction as
// the write so a consumer never sees a change before its relationships.
type Change struct {
	Revision Revision
	Updates  []RelationshipUpdate
}

// Reader is the read half of a datastore, always observed at one snapshot.
type Reader interface {
	Relationships(ctx context.Context, q RelationshipQuery) ([]Relationship, error)
	RelationshipKinds(ctx context.Context) ([]RelationshipKind, error)
	// Changes returns committed changes after the given revision in revision
	// order, at most limit of them (0 for no limit). A caller has caught up
	// when it gets back fewer than it asked for.
	Changes(ctx context.Context, after Revision, limit int) ([]Change, error)
}

// Writer is a Reader inside one transaction.
type Writer interface {
	Reader
	// Create fails with ErrRelationshipExists when the relationship is present.
	Create(ctx context.Context, r Relationship) error
	Touch(ctx context.Context, r Relationship) error
	Delete(ctx context.Context, r Relationship) error
	DeleteMatching(ctx context.Context, q RelationshipQuery) (int64, error)
}

// Datastore is what the engine runs on. View runs fn at one read snapshot;
// Transact runs fn in one transaction and commits only if fn returns nil.
//
// A datastore stores tuples and their change log; it knows nothing about
// nesting. An index that accelerates nested usersets is a NestingIndex fed by
// the change log, either inside the write transaction through a hook the
// datastore package offers, or afterwards by following Changes.
type Datastore interface {
	View(ctx context.Context, fn func(Reader) error) error
	Transact(ctx context.Context, fn func(Writer) error) error
}

// BulkCreator is a fast path a datastore may offer for loading many
// relationships at once (engine.Service.ImportRelationships). CreateAll
// creates every relationship in one transaction, records one Change, runs
// the datastore's hooks once, and fails with ErrRelationshipExists if any is
// already present.
type BulkCreator interface {
	CreateAll(ctx context.Context, rels []Relationship) error
}

// NestingIndex answers questions about nested usersets in one call however
// deep the nesting, so the engine never walks nesting when one is registered
// (WithNestingIndex). Each method receives the Reader of the resolution in
// progress so an index kept in the same database can answer at the same
// snapshot.
//
// Without an index the engine walks nesting hop by hop and each hop counts
// against the depth limit; with one, only arrows do.
type NestingIndex interface {
	// NestedRelationships is Relationships over the usersets q names with its
	// resource selector (ResourceType, ResourceIDs and Relation, all required)
	// and every userset nested within them. Subject fields and Limit apply as
	// in Relationships.
	NestedRelationships(ctx context.Context, r Reader, q RelationshipQuery) ([]Relationship, error)
	// NestedResourceIDs returns, sorted, the ids of every resourceType#relation
	// userset that holds any of the named subjects directly or through
	// nesting. A WildcardID among subjectIDs matches wildcard grants.
	NestedResourceIDs(ctx context.Context, r Reader, subjectType string, subjectIDs []string, subjectRelation, resourceType, relation string) ([]string, error)
}

// PermissionIndex precomputes whole permissions: for each resource and each
// materialised permission, the usersets whose members hold it. It is
// Materialize's permission sets. The engine consults it for a permission the
// index reports as Materialized and evaluates the rewrite for every other, so
// an index may cover any subset of the schema. As with NestingIndex, each
// method receives the Reader of the resolution in progress.
//
// AI: an index can only materialise a permission whose rewrite is unions,
// references and arrows over relations that allow neither wildcards nor
// usersets of a permission; intersections and exclusions have no set form.
// Those are Materialize's constraints too, and the index refuses anything
// else at construction rather than answering it wrongly.
type PermissionIndex interface {
	// Materialized reports whether the index answers for resourceType#permission.
	Materialized(resourceType, permission string) bool
	// HasPermission reports whether subject holds the materialised permission
	// on resource.
	HasPermission(ctx context.Context, r Reader, resource ObjectRef, permission string, subject SubjectRef) (bool, error)
	// ResourcesWithPermission returns, sorted, the ids of every resourceType on
	// which subject holds the materialised permission.
	ResourcesWithPermission(ctx context.Context, r Reader, resourceType, permission string, subject SubjectRef) ([]string, error)
	// SubjectsWithPermission returns, sorted, the ids of every subject of the
	// given type and relation that holds the materialised permission on
	// resource.
	SubjectsWithPermission(ctx context.Context, r Reader, resource ObjectRef, permission, subjectType, subjectRelation string) ([]string, error)
}

var (
	nameRe     = regexp.MustCompile(`^[a-z]([a-z0-9_]{0,62}[a-z0-9])?$`)
	objectIDRe = regexp.MustCompile(`^[a-zA-Z0-9/_|\-=+]+$`)
)

// MaxObjectIDLength is the longest object id accepted, as in SpiceDB.
const MaxObjectIDLength = 1024

// ValidName reports whether s is a legal object type, relation or permission
// name: lowercase, digits and underscores, starting with a letter, 1-64 chars.
func ValidName(s string) bool { return nameRe.MatchString(s) }

// ValidObjectID reports whether s is a legal object id (the SpiceDB charset).
func ValidObjectID(s string) bool {
	return len(s) <= MaxObjectIDLength && objectIDRe.MatchString(s)
}

// Validate checks the type and id are well formed.
func (o ObjectRef) Validate() error {
	if !ValidName(o.Type) {
		return fmt.Errorf("%w: object type %q", ErrInvalidArgument, o.Type)
	}
	if !ValidObjectID(o.ID) {
		return fmt.Errorf("%w: object id %q", ErrInvalidArgument, o.ID)
	}
	return nil
}

// Validate checks the subject is well formed; a wildcard may carry no relation.
func (s SubjectRef) Validate() error {
	if s.Object.ID == WildcardID {
		if !ValidName(s.Object.Type) {
			return fmt.Errorf("%w: subject type %q", ErrInvalidArgument, s.Object.Type)
		}
		if s.Relation != "" {
			return fmt.Errorf("%w: wildcard subject %s cannot carry a relation", ErrInvalidArgument, s)
		}
		return nil
	}
	if err := s.Object.Validate(); err != nil {
		return err
	}
	if s.Relation != "" && !ValidName(s.Relation) {
		return fmt.Errorf("%w: subject relation %q", ErrInvalidArgument, s.Relation)
	}
	return nil
}

// Validate checks every part of the relationship is well formed. It does not
// consult a schema; the engine does that.
func (r Relationship) Validate() error {
	if err := r.Resource.Validate(); err != nil {
		return err
	}
	if !ValidName(r.Relation) {
		return fmt.Errorf("%w: relation %q", ErrInvalidArgument, r.Relation)
	}
	return r.Subject.Validate()
}

// Validate checks the filter is well formed; ResourceType is required.
func (f RelationshipFilter) Validate() error {
	if !ValidName(f.ResourceType) {
		return fmt.Errorf("%w: filter resource type %q", ErrInvalidArgument, f.ResourceType)
	}
	if f.ResourceID != "" && !ValidObjectID(f.ResourceID) {
		return fmt.Errorf("%w: filter resource id %q", ErrInvalidArgument, f.ResourceID)
	}
	if f.Relation != "" && !ValidName(f.Relation) {
		return fmt.Errorf("%w: filter relation %q", ErrInvalidArgument, f.Relation)
	}
	if f.Subject != nil {
		if !ValidName(f.Subject.Type) {
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
