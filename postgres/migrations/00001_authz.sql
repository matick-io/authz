-- +goose Up
-- The authz schema: relation tuples and their changelog, written by the
-- datastore; the userset closure and the permission sets, kept by the index
-- in the same transaction.
--
-- Storage is one row per tuple, text compared by bytes (collate "C"), btree
-- indexes, as SpiceDB and OpenFGA store theirs. Should a table grow large,
-- the levers are type and relation names interned to smallint, then uuid
-- object ids. Bitmap sets (Leopard, roaring) belong to an in-process index
-- fed by the changelog, never to these tables, which SQL must be able to
-- join.
create schema authz;

-- Relation tuples, object#relation@subject: the source of truth for grants.
-- The subject is an object, or a userset (object#relation) when
-- subject_relation is set. subject_id '*' is the wildcard, every object of
-- the subject type, and is never a userset.
create table authz.relationship (
    resource_type    text collate "C" not null,
    resource_id      text collate "C" not null,
    relation         text collate "C" not null,
    subject_type     text collate "C" not null,
    subject_id       text collate "C" not null,
    subject_relation text collate "C" not null default '',
    created_at       timestamptz not null default now(),
    primary key (resource_type, resource_id, relation, subject_type, subject_id, subject_relation),
    constraint relationship_wildcard_has_no_relation
        check (subject_id <> '*' or subject_relation = '')
);

-- LookupResources starts from the subject; resource_id makes it index-only.
create index relationship_by_subject
    on authz.relationship (subject_type, subject_id, subject_relation, resource_type, relation, resource_id);

-- Changelog, the Watch stream as a table: per write transaction, the tuples
-- touched (operation 2) and deleted (operation 3), under a revision drawn in
-- commit order.
create sequence authz.revision;

create table authz.relationship_change (
    revision         bigint   not null,
    seq              integer  not null,
    operation        smallint not null,
    resource_type    text collate "C" not null,
    resource_id      text collate "C" not null,
    relation         text collate "C" not null,
    subject_type     text collate "C" not null,
    subject_id       text collate "C" not null,
    subject_relation text collate "C" not null,
    primary key (revision, seq)
);

-- Userset closure (Leopard): the transitive nesting of usersets, one row per
-- ancestor/descendant pair. Derived from the tuples; Reindex rebuilds it.
create table authz.userset_closure (
    ancestor_type       text collate "C" not null,
    ancestor_id         text collate "C" not null,
    ancestor_relation   text collate "C" not null,
    descendant_type     text collate "C" not null,
    descendant_id       text collate "C" not null,
    descendant_relation text collate "C" not null,
    primary key (ancestor_type, ancestor_id, ancestor_relation,
                 descendant_type, descendant_id, descendant_relation),
    constraint userset_closure_not_reflexive check (
        (ancestor_type, ancestor_id, ancestor_relation)
        is distinct from (descendant_type, descendant_id, descendant_relation))
);

-- Climbing from a descendant to its ancestors.
create index userset_closure_by_descendant
    on authz.userset_closure (descendant_type, descendant_id, descendant_relation,
                              ancestor_type, ancestor_relation, ancestor_id);

-- How far an asynchronous follower has applied the changelog to the index.
create table authz.userset_closure_cursor (
    id       smallint primary key default 1,
    revision bigint   not null,
    constraint userset_closure_cursor_singleton check (id = 1)
);

-- Permission sets (Materialize): the usersets that grant a permission on an
-- object. Who is in a set is a tuple, directly or through the closure. This
-- table and the closure are the two application SQL may read, through a view
-- of its own.
create table authz.permission_set (
    resource_type text collate "C" not null,
    resource_id   text collate "C" not null,
    permission    text collate "C" not null,
    set_type      text collate "C" not null,
    set_id        text collate "C" not null,
    set_relation  text collate "C" not null,
    primary key (resource_type, resource_id, permission, set_type, set_id, set_relation)
);

-- LookupResources starts from the sets a subject is in.
create index permission_set_by_set
    on authz.permission_set (set_type, set_id, set_relation, resource_type, permission, resource_id);

-- +goose Down
drop schema if exists authz cascade;
