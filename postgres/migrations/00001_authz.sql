-- +goose Up
-- AI: the relationship table is the one source of truth for grants. It lives in
-- its own schema so the product database can grant the application role read
-- access for row-level-security policies while writes go through the engine.
create schema if not exists authz;

create table if not exists authz.relationship (
    resource_type    text        not null,
    resource_id      text        not null,
    relation         text        not null,
    subject_type     text        not null,
    subject_id       text        not null,
    subject_relation text        not null default '',
    created_at       timestamptz not null default now(),
    primary key (resource_type, resource_id, relation, subject_type, subject_id, subject_relation),
    constraint relationship_wildcard_has_no_relation
        check (subject_id <> '*' or subject_relation = '')
);

-- Reverse lookups (LookupResources) start from the subject.
create index if not exists relationship_by_subject
    on authz.relationship (subject_type, subject_id, subject_relation, resource_type, relation);


-- +goose Down
drop schema if exists authz cascade;
