# Getting started

How to embed authz in an application on Postgres so that it survives library
upgrades and, later, a move to authz as a service.

## Own when the migrations run, not their SQL

The library defines its tables in `postgres.Migrations`: numbered goose
migrations, one file today, creating the relationships, the change log, the
userset closure and the permission sets. Your deploy step applies it before any migration of your own
that depends on those tables, through one of:

- `postgres.NewMigrator(pool)`, with `Up`, `Down`, `DownTo` and `Version`,
  recording what ran in the `public.authz_migration` table;
- your own goose provider over `postgres.Migrations`, with
  `goose.WithTableName(postgres.MigrationTable)` so both agree on what ran;
- any other tool that reads goose-annotated SQL files.

Bumping the library brings new files; the next deploy applies them.

## Refuse to start on a mismatch

```go
if err := postgres.Check(ctx, pool); err != nil { ... }   // database at postgres.SchemaVersion
if err := svc.ValidateStored(ctx); err != nil { ... }     // stored grants fit the schema
```

## Wire the engine

```go
ds, err := postgres.New(pool, postgres.WithIndex(sch)) // the datastore with its index
svc, err := engine.New(ds, sch)                       // finds the index on the datastore
```

Write a grant inside the transaction that writes the row it protects:

```go
err = ds.TransactIn(ctx, tx, func(w authz.Writer) error {
    return svc.WriteRelationshipsIn(ctx, w, updates)
})
```

## Read permissions through a view you own

Every authz table lives in the `authz` schema, and any role with read access
can query it. Two are meant to be read from SQL:

- `authz.permission_set`: which usersets hold a permission on a resource;
- `authz.userset_closure`: which usersets are nested within which.

Their columns are part of the library's contract and change only with a
major version. Their text compares by bytes (`collate "C"`): a column of
yours with the database's default collation joins them as is; one that
declares a collation of its own must say `collate "C"` in the join. The
others, `authz.relationship`, `authz.relationship_change`,
`authz.userset_closure_cursor` and `public.authz_migration`, are the
library's own and may change with any version.

Recommended practice: application SQL never names an authz table. For each
resource type you list or search, define one view in your own migrations and
join that. It is an anti-corruption layer: a library change touches one view,
and when authz becomes a service the view becomes a table fed from the change
log, with the same name and columns.

```sql
create view project_permission as
select ps.resource_id::uuid as project_id, r.subject_id::uuid as user_id, ps.permission
from authz.permission_set ps
join authz.relationship r
  on (r.resource_type, r.resource_id, r.relation) = (ps.set_type, ps.set_id, ps.set_relation)
where ps.resource_type = 'project'
  and r.subject_type = 'user' and r.subject_relation = '' and r.subject_id <> '*'
union
select ps.resource_id::uuid, r.subject_id::uuid, ps.permission
from authz.permission_set ps
join authz.userset_closure c
  on (c.ancestor_type, c.ancestor_id, c.ancestor_relation) = (ps.set_type, ps.set_id, ps.set_relation)
join authz.relationship r
  on (r.resource_type, r.resource_id, r.relation) = (c.descendant_type, c.descendant_id, c.descendant_relation)
where ps.resource_type = 'project'
  and r.subject_type = 'user' and r.subject_relation = '' and r.subject_id <> '*';
```

The first half is the users directly in a set that grants the permission, the
second the users in a set nested within one. Wildcards (`user:*`) are not
rows a view can name; check them through the engine.

```sql
select p.*
from project p
join project_permission pp on pp.project_id = p.project_id
where pp.user_id = $1 and pp.permission = 'view' and p.name ilike $2
order by p.name
limit 50;
```

A permission appears in `authz.permission_set` only if the index
materialises it: every permission the schema lets a set represent, unless
`postgres.WithIndex` is given the names of fewer.
