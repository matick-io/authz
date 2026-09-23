package postgres

import (
	"context"
	"sort"

	"github.com/jackc/pgx/v5"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/internal/materialize"
)

// AI: the permission-set half of the index. The model and the derivation
// are materialize's (see materialize.Sets); this file stores the rows in
// authz.permission_set, keeps them in step with each change, and answers
// the three questions with one query each. A check is a join of the
// resource's few granting sets with the relationships and the closure; a
// change to an arrow relation rewrites only the rows of the resources above
// it.

// source reads the relationships of resources for a derivation, in one
// query per batch.
type source struct {
	tx pgx.Tx
}

func (s source) Relationships(ctx context.Context, resources []authz.ObjectRef) ([]authz.Relationship, error) {
	types := make([]string, len(resources))
	ids := make([]string, len(resources))
	for i, res := range resources {
		types[i], ids[i] = res.Type, res.ID
	}
	rows, err := s.tx.Query(ctx, `
		select resource_type, resource_id, relation, subject_type, subject_id, subject_relation from authz.relationship
		where (resource_type, resource_id) in (select * from unnest($1::text[], $2::text[]))`, types, ids)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []authz.Relationship
	for rows.Next() {
		var r authz.Relationship
		if err := rows.Scan(&r.Resource.Type, &r.Resource.ID, &r.Relation, &r.Subject.Object.Type, &r.Subject.Object.ID, &r.Subject.Relation); err != nil {
			return nil, err
		}
		out = append(out, r)
	}
	return out, rows.Err()
}

// recomputeAll brings the rows of every configured permission on the given
// resources in line with the rewrite: one load of their relationships, one
// read of their existing rows, one delete, one COPY.
func (x *Index) recomputeAll(ctx context.Context, tx pgx.Tx, d *materialize.Derivation, resources []authz.ObjectRef) error {
	if len(resources) == 0 {
		return nil
	}
	want, err := d.Rows(ctx, resources)
	if err != nil {
		return err
	}
	wanted := make(map[materialize.SetRow]bool, len(want))
	for _, row := range want {
		wanted[row] = true
	}
	types := make([]string, len(resources))
	ids := make([]string, len(resources))
	for i, res := range resources {
		types[i], ids[i] = res.Type, res.ID
	}
	rows, err := tx.Query(ctx, `
		select resource_type, resource_id, permission, set_type, set_id, set_relation from authz.permission_set
		where (resource_type, resource_id) in (select * from unnest($1::text[], $2::text[]))`, types, ids)
	if err != nil {
		return err
	}
	have := map[materialize.SetRow]bool{}
	for rows.Next() {
		var row materialize.SetRow
		if err := rows.Scan(&row.Resource.Type, &row.Resource.ID, &row.Permission, &row.Set.Type, &row.Set.ID, &row.Set.Relation); err != nil {
			rows.Close()
			return err
		}
		have[row] = true
	}
	rows.Close()
	if err := rows.Err(); err != nil {
		return err
	}
	var gone [6][]string
	for row := range have {
		if !wanted[row] {
			gone[0] = append(gone[0], row.Resource.Type)
			gone[1] = append(gone[1], row.Resource.ID)
			gone[2] = append(gone[2], row.Permission)
			gone[3] = append(gone[3], row.Set.Type)
			gone[4] = append(gone[4], row.Set.ID)
			gone[5] = append(gone[5], row.Set.Relation)
		}
	}
	if len(gone[0]) > 0 {
		if _, err := tx.Exec(ctx, `
			delete from authz.permission_set
			where (resource_type, resource_id, permission, set_type, set_id, set_relation)
			      in (select * from unnest($1::text[], $2::text[], $3::text[], $4::text[], $5::text[], $6::text[]))`,
			gone[0], gone[1], gone[2], gone[3], gone[4], gone[5]); err != nil {
			return err
		}
	}
	var fresh [][]any
	for _, row := range want {
		if !have[row] {
			fresh = append(fresh, []any{row.Resource.Type, row.Resource.ID, row.Permission, row.Set.Type, row.Set.ID, row.Set.Relation})
		}
	}
	if len(fresh) > 0 {
		if _, err := tx.CopyFrom(ctx, pgx.Identifier{"authz", "permission_set"},
			[]string{"resource_type", "resource_id", "permission", "set_type", "set_id", "set_relation"},
			pgx.CopyFromRows(fresh)); err != nil {
			return err
		}
	}
	return nil
}

// applySets recomputes every resource a change can have affected: the
// resources written to, and everything that reaches them through an arrow
// on a materialised path, transitively.
func (x *Index) applySets(ctx context.Context, tx pgx.Tx, change authz.Change) error {
	affected := map[authz.ObjectRef]bool{}
	var frontier []authz.ObjectRef
	for _, u := range change.Updates {
		if res := u.Relationship.Resource; !affected[res] {
			affected[res] = true
			frontier = append(frontier, res)
		}
	}
	for depth := 0; len(frontier) > 0; depth++ {
		if depth > materializeMaxDepth {
			return authz.ErrMaxDepthExceeded
		}
		parents, err := x.arrowParents(ctx, tx, frontier)
		if err != nil {
			return err
		}
		var next []authz.ObjectRef
		for _, p := range parents {
			if !affected[p] {
				affected[p] = true
				next = append(next, p)
			}
		}
		frontier = next
	}
	keys := make([]authz.ObjectRef, 0, len(affected))
	for res := range affected {
		if len(x.sets.Permissions(res.Type)) > 0 {
			keys = append(keys, res)
		}
	}
	sort.Slice(keys, func(i, j int) bool { return keys[i].String() < keys[j].String() })
	return x.recomputeAll(ctx, tx, x.sets.NewDerivation(source{tx}), keys)
}

// materializeMaxDepth bounds the propagation of a change up through arrows.
const materializeMaxDepth = 50

// arrowParents finds the resources whose materialised permissions reach any
// of the given resources through an arrow: relationships naming one of them
// as subject on a relation some materialised path walks.
func (x *Index) arrowParents(ctx context.Context, tx pgx.Tx, of []authz.ObjectRef) ([]authz.ObjectRef, error) {
	types := make([]string, len(of))
	ids := make([]string, len(of))
	for i, r := range of {
		types[i], ids[i] = r.Type, r.ID
	}
	rows, err := tx.Query(ctx, `
		select distinct resource_type, resource_id, relation from authz.relationship
		where (subject_type, subject_id) in (select * from unnest($1::text[], $2::text[]))`, types, ids)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []authz.ObjectRef
	for rows.Next() {
		var rt, rid, rel string
		if err := rows.Scan(&rt, &rid, &rel); err != nil {
			return nil, err
		}
		if x.sets.WalksArrow(rt, rel) {
			out = append(out, authz.ObjectRef{Type: rt, ID: rid})
		}
	}
	return out, rows.Err()
}

// reindexSets rebuilds the permission sets for every resource that has
// relationships, in chunks.
func (x *Index) reindexSets(ctx context.Context, tx pgx.Tx) error {
	if _, err := tx.Exec(ctx, "truncate authz.permission_set"); err != nil {
		return err
	}
	d := x.sets.NewDerivation(source{tx})
	for _, typ := range x.sets.Types() {
		ids, err := scanIDs(tx.Query(ctx, "select distinct resource_id from authz.relationship where resource_type = $1 order by 1", typ))
		if err != nil {
			return err
		}
		const chunk = 5000
		for start := 0; start < len(ids); start += chunk {
			end := min(start+chunk, len(ids))
			resources := make([]authz.ObjectRef, 0, end-start)
			for _, id := range ids[start:end] {
				resources = append(resources, authz.ObjectRef{Type: typ, ID: id})
			}
			if err := x.recomputeAll(ctx, tx, d, resources); err != nil {
				return err
			}
		}
	}
	return nil
}

// memberOfSQL is every set the subject is in: directly, through nesting, or
// as itself when the subject is a userset.
const memberOfSQL = `
member_of(t, i, rel) as (
    select r.resource_type, r.resource_id, r.relation
    from authz.relationship r
    where r.subject_type = $1 and r.subject_id = $2 and r.subject_relation = $3
  union
    select c.ancestor_type, c.ancestor_id, c.ancestor_relation
    from authz.relationship r
    join authz.userset_closure c
      on c.descendant_type = r.resource_type and c.descendant_id = r.resource_id and c.descendant_relation = r.relation
    where r.subject_type = $1 and r.subject_id = $2 and r.subject_relation = $3
  union
    select $1, $2, $3 where $3 <> ''
)`

// grantingSQL is every set that grants the permission on the resource: the
// stored arrow-derived rows plus the resource's own relations from the
// schema, passed as $7.
const grantingSQL = `
granting(t, i, rel) as (
    select set_type, set_id, set_relation from authz.permission_set
    where resource_type = $4 and resource_id = $5 and permission = $6
  union
    select $4, $5, unnest($7::text[])
)`

func (x *Index) staticFor(resourceType, permission string) []string {
	return x.sets.Static(resourceType, permission)
}

// HasPermission implements authz.PermissionIndex. AI: it starts from the
// few sets that grant the permission on the one resource and tests the
// subject against each, never from every set the subject is in: a subject
// granted ninety thousand resources made the other order two hundred times
// slower.
func (x *Index) HasPermission(ctx context.Context, r authz.Reader, resource authz.ObjectRef, permission string, subject authz.SubjectRef) (bool, error) {
	tx, ok := Tx(r)
	if !ok {
		return false, ErrNotPostgres
	}
	// AI: simple protocol, so every execution is planned for its values. As a
	// prepared statement Postgres switches to a generic plan after five
	// executions, and the generic plan probes the subject index, which for a
	// subject holding tens of thousands of grants took 45 ms instead of 2.
	// Every index read below is sent the same way for the same reason.
	var found bool
	err := tx.QueryRow(ctx, "with "+grantingSQL+`
		select exists (
		    select 1 from granting g
		    where ($3 <> '' and g.t = $1 and g.i = $2 and g.rel = $3)
		       or exists (
		           select 1 from authz.relationship r
		           where r.resource_type = g.t and r.resource_id = g.i and r.relation = g.rel
		             and r.subject_type = $1 and r.subject_id = $2 and r.subject_relation = $3)
		       or exists (
		           select 1 from authz.userset_closure c
		           join authz.relationship r
		             on r.resource_type = c.descendant_type and r.resource_id = c.descendant_id and r.relation = c.descendant_relation
		           where c.ancestor_type = g.t and c.ancestor_id = g.i and c.ancestor_relation = g.rel
		             and r.subject_type = $1 and r.subject_id = $2 and r.subject_relation = $3))`,
		pgx.QueryExecModeSimpleProtocol, subject.Object.Type, subject.Object.ID, subject.Relation, resource.Type, resource.ID, permission, x.staticFor(resource.Type, permission)).Scan(&found)
	return found, err
}

// ResourcesWithPermissionAmong implements authz.PermissionIndex. AI: it is
// HasPermission over many resources at once, resource-first for the same
// reason: the granting sets of every resource in the batch, each tested for
// the subject, never the subject's every set.
func (x *Index) ResourcesWithPermissionAmong(ctx context.Context, r authz.Reader, resourceType, permission string, subject authz.SubjectRef, among []string) ([]string, error) {
	tx, ok := Tx(r)
	if !ok {
		return nil, ErrNotPostgres
	}
	if len(among) == 0 {
		return nil, nil
	}
	return scanIDs(tx.Query(ctx, `
		with granting(res, t, i, rel) as (
		    select resource_id, set_type, set_id, set_relation from authz.permission_set
		    where resource_type = $4 and resource_id = any($5::text[]) and permission = $6
		  union
		    select a, $4, a, s from unnest($5::text[]) a cross join unnest($7::text[]) s
		)
		select distinct g.res from granting g
		where ($3 <> '' and g.t = $1 and g.i = $2 and g.rel = $3)
		   or exists (
		       select 1 from authz.relationship r
		       where r.resource_type = g.t and r.resource_id = g.i and r.relation = g.rel
		         and r.subject_type = $1 and r.subject_id = $2 and r.subject_relation = $3)
		   or exists (
		       select 1 from authz.userset_closure c
		       join authz.relationship r
		         on r.resource_type = c.descendant_type and r.resource_id = c.descendant_id and r.relation = c.descendant_relation
		       where c.ancestor_type = g.t and c.ancestor_id = g.i and c.ancestor_relation = g.rel
		         and r.subject_type = $1 and r.subject_id = $2 and r.subject_relation = $3)
		order by 1`,
		pgx.QueryExecModeSimpleProtocol, subject.Object.Type, subject.Object.ID, subject.Relation, resourceType, among, permission, x.staticFor(resourceType, permission)))
}

// ResourcesWithPermission implements authz.PermissionIndex.
func (x *Index) ResourcesWithPermission(ctx context.Context, r authz.Reader, resourceType, permission string, subject authz.SubjectRef) ([]string, error) {
	tx, ok := Tx(r)
	if !ok {
		return nil, ErrNotPostgres
	}
	// AI: the second branch is the resource's own sets, which are schema and
	// not stored: a resource of the type holds the permission for the subject
	// when the subject is in one of its referenced relations, or is the
	// resource's own permission set.
	return scanIDs(tx.Query(ctx, "with "+memberOfSQL+`
		select ps.resource_id from authz.permission_set ps
		join member_of m on ps.set_type = m.t and ps.set_id = m.i and ps.set_relation = m.rel
		where ps.resource_type = $4 and ps.permission = $5
		union
		select m.i from member_of m where m.t = $4 and m.rel = any($6::text[])
		order by 1`,
		pgx.QueryExecModeSimpleProtocol, subject.Object.Type, subject.Object.ID, subject.Relation, resourceType, permission, x.staticFor(resourceType, permission)))
}

// SubjectsWithPermission implements authz.PermissionIndex.
func (x *Index) SubjectsWithPermission(ctx context.Context, r authz.Reader, resource authz.ObjectRef, permission, subjectType, subjectRelation string) ([]string, error) {
	tx, ok := Tx(r)
	if !ok {
		return nil, ErrNotPostgres
	}
	return scanIDs(tx.Query(ctx, `
		with granting(t, i, rel) as (
		    select set_type, set_id, set_relation from authz.permission_set
		    where resource_type = $1 and resource_id = $2 and permission = $3
		  union
		    select $1, $2, unnest($6::text[])
		),
		sets(t, i, rel) as (
		    select t, i, rel from granting
		  union
		    select c.descendant_type, c.descendant_id, c.descendant_relation
		    from granting g
		    join authz.userset_closure c
		      on c.ancestor_type = g.t and c.ancestor_id = g.i and c.ancestor_relation = g.rel
		)
		select r.subject_id from sets s
		join authz.relationship r on r.resource_type = s.t and r.resource_id = s.i and r.relation = s.rel
		where r.subject_type = $4 and r.subject_relation = $5
		union
		select s.i from sets s where $5 <> '' and s.t = $4 and s.rel = $5
		order by 1`,
		pgx.QueryExecModeSimpleProtocol, resource.Type, resource.ID, permission, subjectType, subjectRelation, x.staticFor(resource.Type, permission)))
}
