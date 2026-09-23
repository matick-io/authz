package authz

import "context"

// NestingIndex answers questions about nested usersets in one call however
// deep the nesting, so the engine never walks nesting when the datastore
// keeps one (Indexed). Each method receives the Reader of the resolution in
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
	// NestedResourceIDsAmong is NestedResourceIDs restricted to the resource
	// ids in among: which of them hold any of the named subjects. It is how a
	// bulk check asks one question about many resources at once.
	NestedResourceIDsAmong(ctx context.Context, r Reader, subjectType string, subjectIDs []string, subjectRelation, resourceType, relation string, among []string) ([]string, error)
}

// Index is what a datastore keeps beside its tuples to answer nesting and,
// when configured, whole permissions in one call: a NestingIndex that is
// also a PermissionIndex. A datastore that keeps one implements Indexed, and
// engine.New reads it; nothing else has to be wired.
type Index interface {
	NestingIndex
	PermissionIndex
}

// Indexed is a Datastore that keeps an Index of its own. Index returns nil
// when none is configured, and the engine then walks nesting and evaluates
// every permission from the tuples.
type Indexed interface {
	Datastore
	Index() Index
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
	// ResourcesWithPermissionAmong is ResourcesWithPermission restricted to
	// the resource ids in among, for a bulk check: which of them the subject
	// holds the permission on, sorted.
	ResourcesWithPermissionAmong(ctx context.Context, r Reader, resourceType, permission string, subject SubjectRef, among []string) ([]string, error)
	// SubjectsWithPermission returns, sorted, the ids of every subject of the
	// given type and relation that holds the materialised permission on
	// resource.
	SubjectsWithPermission(ctx context.Context, r Reader, resource ObjectRef, permission, subjectType, subjectRelation string) ([]string, error)
}
