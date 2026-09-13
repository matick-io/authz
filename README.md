# authz

A leaner SpiceDB you link into your Go program.

Zanzibar semantics, SpiceDB's API shape and schema language, one Postgres, no
second service. Grants live in your own database, so they can commit in the
same transaction as the rows they protect and your row-level security can read
them.

> **Status: pre-release.** The engine and the Postgres datastore exist and pass
> their suites against the in-memory store. The Postgres suite has not yet run
> against a live server. Nothing here is versioned or stable.

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
- the API surface: schema read and write, relationship read, write and delete
  with preconditions, check, bulk check, expand, lookup resources, lookup
  subjects.

It leaves out what only a distributed service needs: caveats, consistency
tokens, the Watch service, dispatch clusters. One database gives one snapshot
per read and one transaction per write, and that is the whole consistency
story.

## Modules

| Module | Path | Depends on | Holds |
|---|---|---|---|
| core | `github.com/khaossystems/authz` | nothing | engine, schema DSL, `Datastore` contract, in-memory datastore, `datastoretest`, `sampletest` |
| postgres | `github.com/khaossystems/authz/postgres` | pgx | the Postgres datastore and its migrations |

Planned, not yet present: an `api` module offering the SpiceDB v1 gRPC surface
over the core, and a `cmd` module building a standalone server from `api` and
`postgres`. An embedder never needs either.

## Embedding

```go
import (
    "github.com/jackc/pgx/v5/pgxpool"

    "github.com/khaossystems/authz"
    "github.com/khaossystems/authz/postgres"
)

pool, _ := pgxpool.New(ctx, databaseURL)
if err := postgres.Migrate(ctx, pool); err != nil { ... }

svc := authz.New(postgres.New(pool))

err := svc.WriteSchema(ctx, `
definition user {}

definition team {
    relation member: user | team#member
}

definition project {
    relation owner: user
    relation member: user | team#member
    relation viewer: user | user:*
    permission view = member + owner + viewer
    permission edit = owner
}
`)

err = svc.WriteRelationships(ctx, []authz.RelationshipUpdate{
    {Operation: authz.OperationCreate, Relationship: mustParse("project:p1#member@team:core#member")},
    {Operation: authz.OperationCreate, Relationship: mustParse("team:core#member@user:alice")},
})

ok, err := svc.CheckPermission(ctx,
    authz.ObjectRef{Type: "project", ID: "p1"}, "view",
    authz.SubjectRef{Object: authz.ObjectRef{Type: "user", ID: "alice"}})

ids, err := svc.LookupResources(ctx, "project", "view",
    authz.SubjectRef{Object: authz.ObjectRef{Type: "user", ID: "alice"}}, 0)
```

`authz.ParseRelationship` reads the SpiceDB tuple form,
`type:id#relation@type:id[#relation]`, and `Relationship.String` writes it.

For tests, `memory.New()` is a datastore with the same contract and no
database.

## The API, next to SpiceDB's

| SpiceDB v1 | Here | Notes |
|---|---|---|
| `WriteSchema` | `WriteSchema` | refuses a schema that would orphan stored relationships |
| `ReadSchema` | `ReadSchema` | |
| `ReadRelationships` | `ReadRelationships` | filter plus a limit; no cursor |
| `WriteRelationships` | `WriteRelationships` | create, touch, delete; preconditions; one transaction |
| `DeleteRelationships` | `DeleteRelationships` | by filter, with preconditions |
| `CheckPermission` | `CheckPermission` | returns a bool; no caveats, so no conditional result |
| `CheckBulkPermissions` | `CheckBulkPermissions` | one snapshot, per-item errors |
| `ExpandPermissionTree` | `ExpandPermissionTree` | |
| `LookupResources` | `LookupResources` | sorted ids, caller-chosen limit, never truncated silently |
| `LookupSubjects` | `LookupSubjects` | exact wildcard algebra, with excluded ids |
| `Watch` | absent | |
| caveats, zed tokens | absent | |

An unknown type, permission or subject type is an error, never a silent
denial. A resolution that runs past the depth limit is an error, never a
truncated answer.

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
relation and cannot walk a relation that allows a wildcard. Comments use `//`
and `/* */`.

## Datastores and the nesting index

A datastore implements `authz.Datastore`: a `View` at one read snapshot and a
`Transact` that commits only on success, over a `Reader` and `Writer` the
engine calls.

The contract is stronger than SpiceDB's in one way. Two of the reader's
methods, `NestedRelationships` and `NestedResourceIDs`, must answer questions
about nested usersets in one call however deep the nesting, so the engine never
walks nesting itself. Only arrows and usersets whose relation is a permission
recurse, and only they count against the depth limit.

The Postgres datastore meets that obligation with a Leopard-style index:
`authz.userset_closure` holds the transitive closure of nesting edges,
maintained in the same transaction as the relationship write. Writes that touch
the index serialise on an advisory lock; plain grants never take it. `Reindex`
rebuilds the table from the relationships and is the oracle a property test
checks the maintained index against after every step of a random edit
sequence. A budget refuses a single write that would add more index rows than
allowed.

The in-memory datastore answers the same methods by search at query time, so
the two stores check each other.

Any datastore must pass `datastoretest.Run`.

## Samples

`samples/<name>/` holds a scenario as data: `schema.zed`,
`relationships.txt` (one tuple per line) and `assertions.txt`:

```
check     project:p1#view@user:alice     true
resources project#view@user:bob          p1,p2,p3
subjects  project:p2#view user           *-hank
subjects  project:p1#view team#member    core,leads
```

`sampletest.RunAll` runs every sample against a datastore. The core runs them
against memory; the Postgres module runs them against Postgres, so each sample
is also a differential test between the two. Add a scenario there rather than
as Go code.

## Testing

```bash
go test ./...
```

runs everything that needs no database. The Postgres suite, the closure
property test included, reads `AUTHZ_TEST_DATABASE_URL`, drops and recreates
the `authz` schema in that database, and skips when the variable is unset:

```bash
cd postgres && AUTHZ_TEST_DATABASE_URL=postgres://user:pass@localhost:5432/authz_test go test ./...
```

Point it at a scratch database.

## Roadmap

- Host-owned transactions: hand the engine your own `pgx.Tx` so a grant and the
  row it protects commit together.
- A real SpiceDB as a differential oracle in CI over the samples.
- The `api` module, wire-compatible with SpiceDB v1 where the feature exists.
- Per-module version tags once something external pins one.
