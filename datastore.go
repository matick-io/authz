package authz

import "context"

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
