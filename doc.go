// Package authz is a lean relationship-based access control engine meant to
// be linked into a Go program. Its API mirrors SpiceDB's v1 PermissionsService:
// ReadRelationships, WriteRelationships and DeleteRelationships with
// preconditions, CheckPermission and CheckBulkPermissions,
// ExpandPermissionTree, LookupResources and LookupSubjects.
//
// A Service is built from a datastore and a schema value (package schema).
// The schema is code: build it with schema.Build, or parse the SpiceDB DSL
// with package schema/dsl. ValidateStored checks at boot that the
// relationships already in the datastore still fit the schema in code.
//
// AI: what is deliberately left out, and why. Caveats, zed tokens and the
// Watch service are absent: with one database behind the engine, every read
// runs at one snapshot and every write in one transaction, so there is no
// separate consistency vocabulary to expose. Schema storage is absent because
// an embedded engine's schema lives in the program that embeds it; a server
// built on this package persists schema text itself.
//
// The package has no dependencies. It knows object types only as the strings
// the schema declares.
package authz
