# authz

A leaner SpiceDB you link into your Go program.

Zanzibar semantics, SpiceDB's API shape and schema language, one Postgres, no
second service. Grants live in your own database, so they can commit in the
same transaction as the rows they protect and your row-level security can read
them.

> **Status: pre-release.** Every suite, SpiceDB's own corpus included, runs in
> CI on the in-memory store, on Postgres and against a real SpiceDB. Nothing is
> tagged yet: the postgres module pins the core by commit until something
> external needs a tag.

## Why this exists

SpiceDB is a service. Running it means a second process, a second source of
truth for grants, and a dual write every time your application changes
membership. That is fine at Google's scale and painful in a single-binary
application on one Postgres, where the natural home for a grant is a table the
application already owns.

This repository keeps the parts of SpiceDB that matter to an embedder:

- the relation model, usersets included (`team:core#member`), wildcards
  (`user:*`), and permissions built from union, intersection, exclusion and
  arrows;
- the schema DSL, as a subset the parser rejects loudly when you leave it;
- the API surface: relationship read, write and delete with preconditions,
  check, bulk check, expand, lookup resources, lookup subjects.

It leaves out what only a distributed service needs: caveats, consistency
tokens, the Watch service, dispatch clusters, schema storage. One database
gives one snapshot per read and one transaction per write, and that is the
whole consistency story. The schema is code, kept by the program that embeds
the engine.

## Modules

| Module | Path | Depends on | Holds |
|---|---|---|---|
| authz | `github.com/matick-io/authz` | pgx and goose | the `Datastore` contract and tuple types (root), `schema` with its DSL parser in `schema/dsl`, `engine`, the datastores in `datastore/memory` and `datastore/postgres`, the latter with its index and migrations; under `internal`, the index core (`materialize`), the conformance suite and the Postgres test helper |
| tests | `github.com/matick-io/authz/tests` | the library, plus the SpiceDB client | the validation files, SpiceDB's corpus, the differential and conformance suites, the benchmarks |

A datastore is the engine's only dependency and carries its own index, so an
embedder imports the root, `schema` or `schema/dsl`, `engine` and one
datastore package. `go.work` lets the tests module use the library in place.

Planned, not yet present: an `api` module offering the SpiceDB v1 gRPC surface
over the core, and a `cmd` module building a standalone server from `api` and
`postgres`. An embedder never needs either.

## Embedding

```go
sch, err := dsl.Parse(schemaText)                        // or schema.Build, in Go
if err := postgres.Migrate(ctx, pool); err != nil { ... } // or your deploy step
ds, err := postgres.New(pool, postgres.WithIndex(sch))   // the datastore with its index
svc, err := engine.New(ds, sch)                          // finds the index on the datastore
if err := svc.ValidateStored(ctx); err != nil { ... }    // the stored grants still fit the schema

ok, err := svc.CheckPermission(ctx,
    authz.ObjectRef{Type: "project", ID: "p1"}, "view",
    authz.SubjectRef{Object: authz.ObjectRef{Type: "user", ID: "alice"}})
```

The schema is code: `dsl.Parse` reads the SpiceDB DSL and `schema.Build`
builds the same value without a parser. An engine is built for one schema;
changing it means building a new engine, after `ValidateStored` says the
grants already stored still fit. `authz.ParseRelationship` reads the SpiceDB
tuple form, `type:id#relation@type:id[#relation]`, and `Relationship.String`
writes it. For tests, `memory.New()` is a datastore with the same contract
and no database, and `memory.WithIndex(sch)` gives it an index.

[docs/getting-started.md](docs/getting-started.md) is the walkthrough:
migrations from your deploy step, the checks at boot, a grant written in the
transaction of the row it protects, and the view an application keeps over
the permission sets so its SQL never names an authz table.

## The API, next to SpiceDB's

| SpiceDB v1 | Here | Notes |
|---|---|---|
| `WriteSchema`, `ReadSchema` | absent | the schema is code; `ValidateStored` checks the store against it |
| `ReadRelationships` | `ReadRelationships` | filter plus a limit; no cursor |
| `WriteRelationships` | `WriteRelationships` | create, touch, delete; preconditions; one transaction |
| | `WriteRelationshipsIn` | the same, inside a transaction the caller owns |
| | `ImportRelationships` | many creates in one pass, for loading a dataset |
| `DeleteRelationships` | `DeleteRelationships` | by filter, with preconditions |
| `CheckPermission` | `CheckPermission` | returns a bool; no caveats, so no conditional result |
| `CheckBulkPermissions` | `CheckBulkPermissions` | one snapshot, per-item errors; requests that differ only in the resource id share one walk |
| `ExpandPermissionTree` | `ExpandPermissionTree` | |
| `LookupResources` | `LookupResources` | sorted ids, caller-chosen limit, never truncated silently |
| `LookupSubjects` | `LookupSubjects` | exact wildcard algebra, with excluded ids |
| `Watch` | absent | the change log, `Reader.Changes`, is the same stream as a table |
| caveats, zed tokens | absent | |

An unknown type, permission or subject type is an error, never a silent
denial. A resolution that runs past the depth limit is an error, never a
truncated answer. A cycle in the data, such as a folder whose parent is its own
descendant, resolves as in Zanzibar: a path that returns to an open question
contributes nothing, and the memo keeps no answer that rested on one.

## Schema language

The SpiceDB DSL, restricted to:

```
definition <type> {
    relation <name>: <type> | <type>#<relation> | <type>:*
    permission <name> = <expr>
}
```

where an expression is a relation or permission on the same type, an arrow
`relation->name`, or a combination with `+`, `&` and `-`. Mixing operators in
one expression requires parentheses, as in SpiceDB. Arrows start from a
relation and cannot walk a relation that allows a wildcard. `nil` is the
empty set. Type names may carry a `prefix/`, as in SpiceDB. Comments use `//`
and `/* */`.

## Datastores and indexes

A datastore implements `authz.Datastore`: a `View` at one read snapshot and a
`Transact` that commits only on success, over a `Reader` and `Writer` the
engine calls, plus a change log. Every write records what came into being and
what went, under a revision drawn in commit order, so an index or a mirror can
follow it without missing a step.

The engine is correct on a bare datastore. Two optional indexes make it fast,
after Zanzibar's Leopard and AuthZed's Materialize:

- a `NestingIndex` answers questions about nested usersets in one call however
  deep the nesting, so only arrows count against the depth limit;
- a `PermissionIndex` precomputes whole permissions, for the rewrites a set can
  represent: unions, references and arrows, with no wildcard, intersection or
  exclusion on the path.

A datastore that keeps an index returns it from `Index` (`authz.Indexed`), and
`engine.New` reads it; nothing else is wired. The internal `materialize`
package holds what every implementation shares: the derivation of closure and
set rows from relationships, the comparison of a maintained index with a
fresh derivation, and the follower that feeds an index from the changelog.
The Postgres datastore keeps both in two tables beside the relationships,
maintained in SQL inside the write's own transaction (`WithIndex`), or with
some lag through `Follow` (`WithAsyncIndex`).
Writes that touch the index serialise on an advisory lock; plain grants never
take it. `Verify` compares the tables with a recomputation, `Reindex` rebuilds
them, and a budget refuses a single write that would add more closure rows
than allowed. The memory index is a `materialize.Snapshot` rebuilt on change:
exact by construction, and the reference the Postgres index is held to.

Every datastore in this repository passes the conformance suite in
`internal/datastoretest`.

## Validation files

`tests/samples/*.yaml` hold scenarios as data, in SpiceDB's validation-file
format: a schema, its relationships, assertions, and the subjects each object
expands to. `tests/corpus/spicedb/` is SpiceDB's own integration corpus, copied
with its licence and notice; a file needing caveats, expiration or
intersection arrows is skipped with the reason.

Every file runs on every kind: memory, memory with its index, Postgres bare,
with the closure, with the permission sets, and SpiceDB itself when one is
reachable. After the assertions and the validation block, a consistency pass
checks every (resource, relation, subject) pair the file gives rise to,
requires both lookups to return exactly the pairs that checked true, and
compares the matrices across kinds. Add a scenario there rather than as Go
code.

Beside the files: a differential test that writes random relationships to
every kind and asks random questions, holding the indexed kinds to the walk
and the walk to SpiceDB; conformance tables for what a write refuses and which
schemas each side accepts; and scenario benchmarks with SpiceDB as the peer.

## Testing

```bash
go test ./... ./tests/...
```

runs everything that needs no database. The Postgres suites read
`AUTHZ_TEST_DATABASE_URL`, drop and recreate the `authz` schema and its
migration table in that database, and skip when the variable is unset; point
it at a scratch database:

```bash
AUTHZ_TEST_DATABASE_URL='postgres://user:pass@localhost:5432/authz_test?sslmode=disable' \
  go test ./... ./tests/...
```

`AUTHZ_SPICEDB=label=host:port`, comma separated for several instances, and
`AUTHZ_SPICEDB_KEY` add SpiceDB as a kind, which is how CI runs.
`AUTHZ_DIFF_ROUNDS` scales the differential test. The benchmarks are
`go test ./tests -run '^$' -bench BenchmarkScenarios`; `tests/cmd/benchreport`
lays their output out per scenario, and CI publishes the comparison to the
gh-pages branch.

## Roadmap

- The `api` module, wire-compatible with SpiceDB v1 where the feature exists.
- Version tags once something external pins one.

## License

Apache-2.0; see [LICENSE](LICENSE).
