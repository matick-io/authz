-- +goose Up
-- AI: the Leopard-style nesting index. A relationship whose subject is a
-- userset is a nesting edge (team:t#member is nested within project:p#member);
-- this table holds the transitive closure of those edges, one row per proper
-- ancestor/descendant pair. It is derived state: Reindex rebuilds it from
-- authz.relationship, and the cursor records how far an asynchronous follower
-- has applied the change log.
create table if not exists authz.userset_closure (
    ancestor_type       text not null,
    ancestor_id         text not null,
    ancestor_relation   text not null,
    descendant_type     text not null,
    descendant_id       text not null,
    descendant_relation text not null,
    primary key (ancestor_type, ancestor_id, ancestor_relation,
                 descendant_type, descendant_id, descendant_relation),
    constraint userset_closure_not_reflexive check (
        (ancestor_type, ancestor_id, ancestor_relation)
        is distinct from (descendant_type, descendant_id, descendant_relation))
);

-- Reverse lookups climb from a descendant to its ancestors.
create index if not exists userset_closure_by_descendant
    on authz.userset_closure (descendant_type, descendant_id, descendant_relation,
                              ancestor_type, ancestor_relation, ancestor_id);

create table if not exists authz.userset_closure_cursor (
    id       smallint primary key default 1,
    revision bigint   not null,
    constraint userset_closure_cursor_singleton check (id = 1)
);

-- +goose Down
drop table if exists authz.userset_closure_cursor;
drop table if exists authz.userset_closure;
