package index

import (
	"context"
	"fmt"
	"strings"

	"github.com/jackc/pgx/v5"

	"github.com/matick-io/authz"
	pgstore "github.com/matick-io/authz/postgres"
)

// AI: the closure half of the index. A relationship whose subject is a
// userset is a nesting edge; authz.userset_closure holds the transitive
// closure of those edges, one row per proper ancestor/descendant pair, and the
// two Nested queries answer any depth of nesting in one round trip.

type userset struct {
	typ, id, relation string
}

func columnsOf(us []userset) (types, ids, relations []string) {
	for _, u := range us {
		types = append(types, u.typ)
		ids = append(ids, u.id)
		relations = append(relations, u.relation)
	}
	return
}

// walkSQL is the recursive climb from a set of descendants to every userset
// they are nested within, over the nesting edges in authz.relationship. It
// uses UNION, not UNION ALL, so a cycle terminates when it stops producing
// new rows. The seed collates its columns as the tables do, since a recursive
// query needs both terms to agree.
const walkSQL = `
with recursive walk(d_type, d_id, d_relation, n_type, n_id, n_relation) as (
    select d.typ collate "C", d.id collate "C", d.rel collate "C", d.typ collate "C", d.id collate "C", d.rel collate "C"
    from unnest($1::text[], $2::text[], $3::text[]) as d(typ, id, rel)
  union
    select w.d_type, w.d_id, w.d_relation, e.resource_type, e.resource_id, e.relation
    from walk w
    join authz.relationship e
      on e.subject_type = w.n_type and e.subject_id = w.n_id and e.subject_relation = w.n_relation
    where e.subject_relation <> ''
),
ins as (
    insert into authz.userset_closure
        (ancestor_type, ancestor_id, ancestor_relation, descendant_type, descendant_id, descendant_relation)
    select n_type, n_id, n_relation, d_type, d_id, d_relation
    from walk
    where (n_type, n_id, n_relation) is distinct from (d_type, d_id, d_relation)
    on conflict do nothing
    returning 1
)
select count(*) from ins`

// recomputeAncestors re-derives the ancestors of every userset in down and
// inserts what is missing, returning how many rows were added. budget 0 means
// unlimited.
func recomputeAncestors(ctx context.Context, tx pgx.Tx, down []userset, budget int64) (int64, error) {
	types, ids, relations := columnsOf(down)
	var added int64
	if err := tx.QueryRow(ctx, walkSQL, types, ids, relations).Scan(&added); err != nil {
		return 0, err
	}
	if budget > 0 && added > budget {
		return added, fmt.Errorf("%w: %d rows, budget %d", ErrNestingTooLarge, added, budget)
	}
	return added, nil
}

// closureBelow returns u and every userset nested within it.
func closureBelow(ctx context.Context, tx pgx.Tx, u userset) ([]userset, error) {
	return closureSide(ctx, tx, u, `
		select descendant_type, descendant_id, descendant_relation from authz.userset_closure
		where ancestor_type = $1 and ancestor_id = $2 and ancestor_relation = $3`)
}

// closureAbove returns u and every userset it is nested within.
func closureAbove(ctx context.Context, tx pgx.Tx, u userset) ([]userset, error) {
	return closureSide(ctx, tx, u, `
		select ancestor_type, ancestor_id, ancestor_relation from authz.userset_closure
		where descendant_type = $1 and descendant_id = $2 and descendant_relation = $3`)
}

func closureSide(ctx context.Context, tx pgx.Tx, u userset, sql string) ([]userset, error) {
	rows, err := tx.Query(ctx, sql, u.typ, u.id, u.relation)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []userset{u}
	for rows.Next() {
		var v userset
		if err := rows.Scan(&v.typ, &v.id, &v.relation); err != nil {
			return nil, err
		}
		out = append(out, v)
	}
	return out, rows.Err()
}

// edgeRemoved maintains the closure after a nesting edge was deleted. AI: the
// only pairs that can change are (something at or above the resource) ×
// (something at or below the subject); those rows are dropped and the
// ancestors of everything at or below the subject are re-derived from the
// edges that remain. Rows outside that rectangle never depended on the edge.
func (x *Index) edgeRemoved(ctx context.Context, tx pgx.Tx, r authz.Relationship) error {
	res := userset{r.Resource.Type, r.Resource.ID, r.Relation}
	sub := userset{r.Subject.Object.Type, r.Subject.Object.ID, r.Subject.Relation}
	up, err := closureAbove(ctx, tx, res)
	if err != nil {
		return err
	}
	down, err := closureBelow(ctx, tx, sub)
	if err != nil {
		return err
	}
	ut, ui, ur := columnsOf(up)
	dt, di, dr := columnsOf(down)
	if _, err := tx.Exec(ctx, `
		delete from authz.userset_closure
		where (ancestor_type, ancestor_id, ancestor_relation)
		      in (select * from unnest($1::text[], $2::text[], $3::text[]))
		  and (descendant_type, descendant_id, descendant_relation)
		      in (select * from unnest($4::text[], $5::text[], $6::text[]))`,
		ut, ui, ur, dt, di, dr); err != nil {
		return err
	}
	_, err = recomputeAncestors(ctx, tx, down, 0)
	return err
}

// reindexClosure rebuilds the closure from the relationships.
func reindexClosure(ctx context.Context, tx pgx.Tx) error {
	if _, err := tx.Exec(ctx, "truncate authz.userset_closure"); err != nil {
		return err
	}
	rows, err := tx.Query(ctx, "select distinct subject_type, subject_id, subject_relation from authz.relationship where subject_relation <> ''")
	if err != nil {
		return err
	}
	var starts []userset
	for rows.Next() {
		var u userset
		if err := rows.Scan(&u.typ, &u.id, &u.relation); err != nil {
			rows.Close()
			return err
		}
		starts = append(starts, u)
	}
	rows.Close()
	if err := rows.Err(); err != nil {
		return err
	}
	if len(starts) == 0 {
		return nil
	}
	_, err = recomputeAncestors(ctx, tx, starts, 0)
	return err
}

// nestedRelationshipsSQL renders the two-branch resource selector: the named
// usersets themselves, and every descendant in the closure.
func nestedRelationshipsSQL(q authz.RelationshipQuery) (string, []any) {
	args := []any{q.ResourceType, q.ResourceIDs, q.Relation}
	var subject []string
	add := func(cond string, arg any) {
		args = append(args, arg)
		subject = append(subject, fmt.Sprintf(cond, len(args)))
	}
	if q.SubjectType != "" {
		add("r.subject_type = $%d", q.SubjectType)
	}
	if len(q.SubjectIDs) > 0 {
		add("r.subject_id = any($%d)", q.SubjectIDs)
	}
	if q.SubjectRelation != nil {
		add("r.subject_relation = $%d", *q.SubjectRelation)
	}
	subjectSQL := ""
	if len(subject) > 0 {
		subjectSQL = " and " + strings.Join(subject, " and ")
	}
	sql := `
select r.resource_type, r.resource_id, r.relation, r.subject_type, r.subject_id, r.subject_relation
from authz.relationship r
where r.resource_type = $1 and r.resource_id = any($2) and r.relation = $3` + subjectSQL + `
union
select r.resource_type, r.resource_id, r.relation, r.subject_type, r.subject_id, r.subject_relation
from authz.userset_closure c
join authz.relationship r
  on r.resource_type = c.descendant_type and r.resource_id = c.descendant_id and r.relation = c.descendant_relation
where c.ancestor_type = $1 and c.ancestor_id = any($2) and c.ancestor_relation = $3` + subjectSQL + `
order by 1, 2, 3, 4, 5, 6`
	if q.Limit > 0 {
		args = append(args, q.Limit)
		sql += fmt.Sprintf(" limit $%d", len(args))
	}
	return sql, args
}

const nestedResourceIDsSQL = `
select r.resource_id
from authz.relationship r
where r.subject_type = $1 and r.subject_id = any($2) and r.subject_relation = $3
  and r.resource_type = $4 and r.relation = $5
union
select c.ancestor_id
from authz.relationship r
join authz.userset_closure c
  on c.descendant_type = r.resource_type and c.descendant_id = r.resource_id and c.descendant_relation = r.relation
where r.subject_type = $1 and r.subject_id = any($2) and r.subject_relation = $3
  and c.ancestor_type = $4 and c.ancestor_relation = $5
order by 1`

// nestedResourceIDsAmongSQL is nestedResourceIDsSQL restricted to a set of
// resource ids, for the bulk check.
const nestedResourceIDsAmongSQL = `
select r.resource_id
from authz.relationship r
where r.subject_type = $1 and r.subject_id = any($2) and r.subject_relation = $3
  and r.resource_type = $4 and r.relation = $5 and r.resource_id = any($6)
union
select c.ancestor_id
from authz.relationship r
join authz.userset_closure c
  on c.descendant_type = r.resource_type and c.descendant_id = r.resource_id and c.descendant_relation = r.relation
where r.subject_type = $1 and r.subject_id = any($2) and r.subject_relation = $3
  and c.ancestor_type = $4 and c.ancestor_relation = $5 and c.ancestor_id = any($6)
order by 1`

// NestedRelationships implements authz.NestingIndex.
func (x *Index) NestedRelationships(ctx context.Context, r authz.Reader, q authz.RelationshipQuery) ([]authz.Relationship, error) {
	tx, ok := pgstore.Tx(r)
	if !ok {
		return nil, ErrNotPostgres
	}
	if q.ResourceType == "" || len(q.ResourceIDs) == 0 || q.Relation == "" {
		return nil, fmt.Errorf("%w: NestedRelationships needs a complete resource selector", authz.ErrInvalidArgument)
	}
	sql, args := nestedRelationshipsSQL(q)
	rows, err := tx.Query(ctx, sql, append([]any{pgx.QueryExecModeSimpleProtocol}, args...)...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []authz.Relationship
	for rows.Next() {
		var rel authz.Relationship
		if err := rows.Scan(&rel.Resource.Type, &rel.Resource.ID, &rel.Relation, &rel.Subject.Object.Type, &rel.Subject.Object.ID, &rel.Subject.Relation); err != nil {
			return nil, err
		}
		out = append(out, rel)
	}
	return out, rows.Err()
}

// NestedResourceIDs implements authz.NestingIndex.
func (x *Index) NestedResourceIDs(ctx context.Context, r authz.Reader, subjectType string, subjectIDs []string, subjectRelation, resourceType, relation string) ([]string, error) {
	tx, ok := pgstore.Tx(r)
	if !ok {
		return nil, ErrNotPostgres
	}
	if len(subjectIDs) == 0 {
		return nil, nil
	}
	return scanIDs(tx.Query(ctx, nestedResourceIDsSQL, pgx.QueryExecModeSimpleProtocol, subjectType, subjectIDs, subjectRelation, resourceType, relation))
}

// NestedResourceIDsAmong implements authz.NestingIndex.
func (x *Index) NestedResourceIDsAmong(ctx context.Context, r authz.Reader, subjectType string, subjectIDs []string, subjectRelation, resourceType, relation string, among []string) ([]string, error) {
	tx, ok := pgstore.Tx(r)
	if !ok {
		return nil, ErrNotPostgres
	}
	if len(subjectIDs) == 0 || len(among) == 0 {
		return nil, nil
	}
	return scanIDs(tx.Query(ctx, nestedResourceIDsAmongSQL, pgx.QueryExecModeSimpleProtocol, subjectType, subjectIDs, subjectRelation, resourceType, relation, among))
}

func scanIDs(rows pgx.Rows, err error) ([]string, error) {
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []string
	for rows.Next() {
		var id string
		if err := rows.Scan(&id); err != nil {
			return nil, err
		}
		out = append(out, id)
	}
	return out, rows.Err()
}

// edgesAdded maintains the closure after nesting edges were inserted: the
// ancestors of every subject, and of everything nested within them, are
// re-derived in one walk.
func (x *Index) edgesAdded(ctx context.Context, tx pgx.Tx, subjects []userset) error {
	types, ids, relations := columnsOf(subjects)
	rows, err := tx.Query(ctx, `
		select descendant_type, descendant_id, descendant_relation from authz.userset_closure
		where (ancestor_type, ancestor_id, ancestor_relation)
		      in (select * from unnest($1::text[], $2::text[], $3::text[]))`, types, ids, relations)
	if err != nil {
		return err
	}
	seen := map[userset]bool{}
	down := make([]userset, 0, len(subjects))
	for _, s := range subjects {
		if !seen[s] {
			seen[s] = true
			down = append(down, s)
		}
	}
	for rows.Next() {
		var v userset
		if err := rows.Scan(&v.typ, &v.id, &v.relation); err != nil {
			rows.Close()
			return err
		}
		if !seen[v] {
			seen[v] = true
			down = append(down, v)
		}
	}
	rows.Close()
	if err := rows.Err(); err != nil {
		return err
	}
	_, err = recomputeAncestors(ctx, tx, down, x.budget)
	return err
}
