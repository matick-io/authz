// Package materialize is the home of indexes that precompute what the engine
// would otherwise walk, in the manner of Zanzibar's Leopard and AuthZed's
// Materialize. Nothing here is required: the engine is correct on a bare
// datastore, and an index only makes it faster.
//
// Every index is fed by the datastore's change log (authz.Change) and can
// run in either of two ways: synchronously, inside the write transaction
// through the hook a datastore package offers, so it is never behind; or
// asynchronously, following Changes with some lag, which is how Materialize
// runs and what lets the same index feed another store.
//
// The postgres subpackage holds the nesting index for the Postgres datastore.
// AI: permission sets, Materialize's second half (which sets hold which
// permission on which resource), are planned on the same feed and will carry
// its constraints: no wildcard, intersection or exclusion on a materialised
// path.
package materialize
