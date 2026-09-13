-- +goose Up
-- AI: the change log is SpiceDB's Watch stream as a table. Every write
-- transaction that changed something records what came into being (operation
-- 2, touch) and what went (operation 3, delete) under one revision drawn in
-- commit order, so indexes and mirrors can follow it without missing a step.
create sequence if not exists authz.revision;

create table if not exists authz.relationship_change (
    revision         bigint   not null,
    seq              integer  not null,
    operation        smallint not null,
    resource_type    text     not null,
    resource_id      text     not null,
    relation         text     not null,
    subject_type     text     not null,
    subject_id       text     not null,
    subject_relation text     not null,
    primary key (revision, seq)
);

-- +goose Down
drop table if exists authz.relationship_change;
drop sequence if exists authz.revision;
