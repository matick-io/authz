-- +goose Up
-- AI: Materialize-style permission sets. A row says the userset
-- (set_type, set_id, set_relation) grants permission on the resource; who is
-- in the set is answered by authz.relationship and authz.userset_closure.
create table if not exists authz.permission_set (
    resource_type text not null,
    resource_id   text not null,
    permission    text not null,
    set_type      text not null,
    set_id        text not null,
    set_relation  text not null,
    primary key (resource_type, resource_id, permission, set_type, set_id, set_relation)
);

-- Reverse lookups start from the sets a subject is in.
create index if not exists permission_set_by_set
    on authz.permission_set (set_type, set_id, set_relation, resource_type, permission, resource_id);

-- +goose Down
drop table if exists authz.permission_set;
