package postgres

import (
	"context"
	"fmt"
	"sort"
	"strings"

	"github.com/jackc/pgx/v5"

	"github.com/matick-io/authz"
	pgstore "github.com/matick-io/authz/datastore/postgres"
	"github.com/matick-io/authz/schema"
)

// AI: the permission-set half of the index, Materialize's model in two tables.
// authz.permission_set says which usersets grant a materialised permission on
// a resource: for `permission view = member + owner + parent->view` on
// folder:f, the sets are folder:f#member, folder:f#owner and, through the
// arrow, every set that grants view on f's parents. Who is in a set is not
// stored again: it is the relationships of the set and of everything nested
// within it, which the closure already answers. A check is therefore one
// join, and a change to an arrow relation only rewrites the rows of the
// resources above it.

// maxGrantDepth bounds arrow recursion while deriving sets.
const maxGrantDepth = 50

type permissionSets struct {
	sch        *schema.Schema
	configured map[string]bool            // "type#permission"
	byType     map[string][]string        // type -> configured permissions
	arrows     map[string]map[string]bool // type -> relation walked by an arrow on some materialised path
	// static lists, per "type#permission", the resource's own relations the
	// rewrite references without an arrow. AI: those sets are pure schema, so
	// they are never stored; every query adds them for the resource it names,
	// which is also what makes a resource with no relationships answer like
	// the walk does (a userset is a member of itself).
	static map[string][]string
}

// staticRefs lists the permission itself, the relations it references on
// the same object, and the same-object permissions it references,
// transitively. AI: the permission is included because a userset is a member
// of itself, so `resource#permission` must count as a set that grants the
// permission on the resource.
func staticRefs(sch *schema.Schema, typ, perm string, visiting map[string]bool) []string {
	key := typ + "#" + perm
	if visiting[key] {
		return nil
	}
	visiting[key] = true
	def := sch.Definition(typ)
	seen := map[string]bool{perm: true}
	out := []string{perm}
	var walk func(e schema.Expr)
	walk = func(e schema.Expr) {
		switch n := e.(type) {
		case *schema.ComputedUserset:
			if _, ok := def.Relations[n.Relation]; ok {
				if !seen[n.Relation] {
					seen[n.Relation] = true
					out = append(out, n.Relation)
				}
				return
			}
			for _, r := range staticRefs(sch, typ, n.Relation, visiting) {
				if !seen[r] {
					seen[r] = true
					out = append(out, r)
				}
			}
		case *schema.SetOp:
			for _, c := range n.Children {
				walk(c)
			}
		}
	}
	walk(def.Permissions[perm].Expr)
	return out
}

// Materializable lists, sorted as type#permission, every permission of the
// schema the permission sets can represent.
func Materializable(sch *schema.Schema) []string {
	var out []string
	for _, typ := range sch.Order {
		def := sch.Definitions[typ]
		for _, name := range def.Order {
			if _, ok := def.Permissions[name]; !ok {
				continue
			}
			if err := validatePath(sch, typ, name, map[string]bool{}, nil); err == nil {
				out = append(out, typ+"#"+name)
			}
		}
	}
	sort.Strings(out)
	return out
}

func newPermissionSets(sch *schema.Schema, permissions []string) (*permissionSets, error) {
	if sch == nil {
		return nil, fmt.Errorf("%w: nil schema", authz.ErrInvalidArgument)
	}
	ps := &permissionSets{sch: sch, configured: map[string]bool{}, byType: map[string][]string{}, arrows: map[string]map[string]bool{}, static: map[string][]string{}}
	for _, name := range permissions {
		typ, perm, ok := strings.Cut(name, "#")
		if !ok {
			return nil, fmt.Errorf("%w: %q is not type#permission", authz.ErrInvalidArgument, name)
		}
		if err := validatePath(sch, typ, perm, map[string]bool{}, ps.arrows); err != nil {
			return nil, err
		}
		if !ps.configured[name] {
			ps.configured[name] = true
			ps.byType[typ] = append(ps.byType[typ], perm)
			ps.static[name] = staticRefs(sch, typ, perm, map[string]bool{})
		}
	}
	return ps, nil
}

// validatePath walks a permission's rewrite and refuses anything the set
// model cannot express. arrows, when non-nil, collects the relations arrows
// walk so changes to them can be propagated upward.
func validatePath(sch *schema.Schema, typ, perm string, visiting map[string]bool, arrows map[string]map[string]bool) error {
	key := typ + "#" + perm
	if visiting[key] {
		return nil
	}
	visiting[key] = true
	def := sch.Definition(typ)
	if def == nil {
		return fmt.Errorf("%w: unknown type %q", authz.ErrInvalidArgument, typ)
	}
	p, ok := def.Permissions[perm]
	if !ok {
		if _, isRel := def.Relations[perm]; isRel {
			return fmt.Errorf("%w: %s is a relation; only permissions are materialised", ErrNotMaterializable, key)
		}
		return fmt.Errorf("%w: unknown permission %q", authz.ErrInvalidArgument, key)
	}
	var walk func(e schema.Expr) error
	walk = func(e schema.Expr) error {
		switch n := e.(type) {
		case *schema.ComputedUserset:
			if rel, ok := def.Relations[n.Relation]; ok {
				return validateRelation(sch, typ, rel)
			}
			return validatePath(sch, typ, n.Relation, visiting, arrows)
		case *schema.Arrow:
			rel := def.Relations[n.Relation]
			if err := validateRelation(sch, typ, rel); err != nil {
				return err
			}
			if arrows != nil {
				if arrows[typ] == nil {
					arrows[typ] = map[string]bool{}
				}
				arrows[typ][n.Relation] = true
			}
			for _, subjectType := range rel.SubjectTypes() {
				target := sch.Definition(subjectType)
				if r, ok := target.Relations[n.Target]; ok {
					if err := validateRelation(sch, subjectType, r); err != nil {
						return err
					}
				} else if _, ok := target.Permissions[n.Target]; ok {
					if err := validatePath(sch, subjectType, n.Target, visiting, arrows); err != nil {
						return err
					}
				}
			}
			return nil
		case *schema.SetOp:
			if n.Op != schema.Union {
				return fmt.Errorf("%w: %s uses %s, which has no set form", ErrNotMaterializable, key, opName(n.Op))
			}
			for _, c := range n.Children {
				if err := walk(c); err != nil {
					return err
				}
			}
			return nil
		}
		return fmt.Errorf("%w: %s: unknown expression %T", ErrNotMaterializable, key, e)
	}
	return walk(p.Expr)
}

func validateRelation(sch *schema.Schema, typ string, rel *schema.Relation) error {
	for _, a := range rel.AllowedSubjects {
		if a.Wildcard {
			return fmt.Errorf("%w: %s#%s allows the wildcard %s:*", ErrNotMaterializable, typ, rel.Name, a.Type)
		}
		if a.Relation != "" {
			if _, isPerm := sch.Definition(a.Type).Permissions[a.Relation]; isPerm {
				return fmt.Errorf("%w: %s#%s allows %s#%s, a userset of a permission", ErrNotMaterializable, typ, rel.Name, a.Type, a.Relation)
			}
		}
	}
	return nil
}

func opName(op schema.Op) string {
	switch op {
	case schema.Intersection:
		return "an intersection"
	case schema.Exclusion:
		return "an exclusion"
	}
	return "an unknown operator"
}

// derivation is the working state of one maintenance pass: derived sets
// memoised by resource and permission, and each resource's relationships
// loaded once. AI: a derivation that read an entry still in progress (an
// arrow cycle) is complete for the resource at the top of the stack, whose
// own sets it already holds, but not for the resources beneath it, so those
// are never memoised: memoising them would make the stored rows depend on
// evaluation order, which the concurrent-writer proof caught.
type derivation struct {
	tx     pgx.Tx
	sets   map[string][]userset                 // "type:id#permission"
	busy   map[string]bool                      // in progress
	tuples map[[2]string]map[string][][2]string // resource -> relation -> subjects
	hit    bool
}

func newDerivation(tx pgx.Tx) *derivation {
	return &derivation{tx: tx, sets: map[string][]userset{}, busy: map[string]bool{}, tuples: map[[2]string]map[string][][2]string{}}
}

// preload loads the relationships of every resource in one query.
func (d *derivation) preload(ctx context.Context, resources [][2]string) error {
	var types, ids []string
	for _, r := range resources {
		if _, ok := d.tuples[r]; ok {
			continue
		}
		d.tuples[r] = map[string][][2]string{}
		types = append(types, r[0])
		ids = append(ids, r[1])
	}
	if len(types) == 0 {
		return nil
	}
	rows, err := d.tx.Query(ctx, `
		select resource_type, resource_id, relation, subject_type, subject_id from authz.relationship
		where (resource_type, resource_id) in (select * from unnest($1::text[], $2::text[]))`, types, ids)
	if err != nil {
		return err
	}
	defer rows.Close()
	for rows.Next() {
		var key [2]string
		var rel string
		var s [2]string
		if err := rows.Scan(&key[0], &key[1], &rel, &s[0], &s[1]); err != nil {
			return err
		}
		d.tuples[key][rel] = append(d.tuples[key][rel], s)
	}
	return rows.Err()
}

// load returns the relationships of one resource grouped by relation, from
// the cache or with one query.
func (d *derivation) load(ctx context.Context, typ, id string) (map[string][][2]string, error) {
	key := [2]string{typ, id}
	if t, ok := d.tuples[key]; ok {
		return t, nil
	}
	if err := d.preload(ctx, [][2]string{key}); err != nil {
		return nil, err
	}
	return d.tuples[key], nil
}

// grants derives the sets that grant permission on typ:id from the rewrite:
// the resource's own relations for references, and the grantors of the
// targets for arrows.
func (ps *permissionSets) grants(ctx context.Context, d *derivation, typ, id, perm string, depth int) ([]userset, error) {
	if depth > maxGrantDepth {
		return nil, authz.ErrMaxDepthExceeded
	}
	key := typ + ":" + id + "#" + perm
	if sets, ok := d.sets[key]; ok {
		return sets, nil
	}
	if d.busy[key] {
		d.hit = true
		return nil, nil
	}
	d.busy[key] = true
	defer delete(d.busy, key)
	outerHit := d.hit
	d.hit = false
	def := ps.sch.Definition(typ)
	own, err := d.load(ctx, typ, id)
	if err != nil {
		return nil, err
	}
	seen := map[userset]bool{}
	var out []userset
	add := func(u userset) {
		if !seen[u] {
			seen[u] = true
			out = append(out, u)
		}
	}
	// The permission's own set grants itself: a userset is a member of itself.
	add(userset{typ, id, perm})
	var walk func(e schema.Expr) error
	walk = func(e schema.Expr) error {
		switch n := e.(type) {
		case *schema.ComputedUserset:
			if _, ok := def.Relations[n.Relation]; ok {
				add(userset{typ, id, n.Relation})
				return nil
			}
			sub, err := ps.grants(ctx, d, typ, id, n.Relation, depth+1)
			if err != nil {
				return err
			}
			for _, u := range sub {
				add(u)
			}
			return nil
		case *schema.Arrow:
			for _, t := range own[n.Relation] {
				target := ps.sch.Definition(t[0])
				if _, ok := target.Relations[n.Target]; ok {
					add(userset{t[0], t[1], n.Target})
					continue
				}
				if _, ok := target.Permissions[n.Target]; ok {
					sub, err := ps.grants(ctx, d, t[0], t[1], n.Target, depth+1)
					if err != nil {
						return err
					}
					for _, u := range sub {
						add(u)
					}
				}
			}
			return nil
		case *schema.SetOp:
			for _, c := range n.Children {
				if err := walk(c); err != nil {
					return err
				}
			}
			return nil
		}
		return fmt.Errorf("materialize: unknown expression %T", e)
	}
	if err := walk(def.Permissions[perm].Expr); err != nil {
		return nil, err
	}
	if !d.hit {
		d.sets[key] = out
	}
	d.hit = d.hit || outerHit
	return out, nil
}

type setRow struct {
	typ, id, permission string
	set                 userset
}

// recomputeAll brings the rows of every configured permission on the given
// resources in line with the rewrite: one load of their relationships, one
// read of their existing rows, one delete, one COPY. Only sets reached
// through an arrow are stored; a resource's own sets are schema and are added
// at query time.
func (ps *permissionSets) recomputeAll(ctx context.Context, d *derivation, resources [][2]string) error {
	if len(resources) == 0 {
		return nil
	}
	if err := d.preload(ctx, resources); err != nil {
		return err
	}
	wanted := map[setRow]bool{}
	var want []setRow
	types := make([]string, len(resources))
	ids := make([]string, len(resources))
	for i, res := range resources {
		types[i], ids[i] = res[0], res[1]
		for _, perm := range ps.byType[res[0]] {
			sets, err := ps.grants(ctx, d, res[0], res[1], perm, 0)
			if err != nil {
				return err
			}
			for _, u := range sets {
				if u.typ == res[0] && u.id == res[1] {
					continue
				}
				row := setRow{res[0], res[1], perm, u}
				if !wanted[row] {
					wanted[row] = true
					want = append(want, row)
				}
			}
		}
	}
	rows, err := d.tx.Query(ctx, `
		select resource_type, resource_id, permission, set_type, set_id, set_relation from authz.permission_set
		where (resource_type, resource_id) in (select * from unnest($1::text[], $2::text[]))`, types, ids)
	if err != nil {
		return err
	}
	have := map[setRow]bool{}
	for rows.Next() {
		var row setRow
		if err := rows.Scan(&row.typ, &row.id, &row.permission, &row.set.typ, &row.set.id, &row.set.relation); err != nil {
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
			gone[0] = append(gone[0], row.typ)
			gone[1] = append(gone[1], row.id)
			gone[2] = append(gone[2], row.permission)
			gone[3] = append(gone[3], row.set.typ)
			gone[4] = append(gone[4], row.set.id)
			gone[5] = append(gone[5], row.set.relation)
		}
	}
	if len(gone[0]) > 0 {
		if _, err := d.tx.Exec(ctx, `
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
			fresh = append(fresh, []any{row.typ, row.id, row.permission, row.set.typ, row.set.id, row.set.relation})
		}
	}
	if len(fresh) > 0 {
		if _, err := d.tx.CopyFrom(ctx, pgx.Identifier{"authz", "permission_set"},
			[]string{"resource_type", "resource_id", "permission", "set_type", "set_id", "set_relation"},
			pgx.CopyFromRows(fresh)); err != nil {
			return err
		}
	}
	return nil
}

// apply recomputes every resource a change can have affected: the resources
// written to, and everything that reaches them through an arrow on a
// materialised path, transitively.
func (ps *permissionSets) apply(ctx context.Context, tx pgx.Tx, change authz.Change) error {
	affected := map[[2]string]bool{}
	var frontier [][2]string
	for _, u := range change.Updates {
		res := [2]string{u.Relationship.Resource.Type, u.Relationship.Resource.ID}
		if !affected[res] {
			affected[res] = true
			frontier = append(frontier, res)
		}
	}
	for depth := 0; len(frontier) > 0; depth++ {
		if depth > maxGrantDepth {
			return authz.ErrMaxDepthExceeded
		}
		parents, err := ps.arrowParents(ctx, tx, frontier)
		if err != nil {
			return err
		}
		var next [][2]string
		for _, p := range parents {
			if !affected[p] {
				affected[p] = true
				next = append(next, p)
			}
		}
		frontier = next
	}
	keys := make([][2]string, 0, len(affected))
	for res := range affected {
		if len(ps.byType[res[0]]) > 0 {
			keys = append(keys, res)
		}
	}
	sort.Slice(keys, func(i, j int) bool { return keys[i][0]+":"+keys[i][1] < keys[j][0]+":"+keys[j][1] })
	return ps.recomputeAll(ctx, newDerivation(tx), keys)
}

// arrowParents finds the resources whose materialised permissions reach any
// of the given resources through an arrow: relationships naming one of them
// as subject on a relation some materialised path walks.
func (ps *permissionSets) arrowParents(ctx context.Context, tx pgx.Tx, of [][2]string) ([][2]string, error) {
	types := make([]string, len(of))
	ids := make([]string, len(of))
	for i, r := range of {
		types[i], ids[i] = r[0], r[1]
	}
	rows, err := tx.Query(ctx, `
		select distinct resource_type, resource_id, relation from authz.relationship
		where (subject_type, subject_id) in (select * from unnest($1::text[], $2::text[]))`, types, ids)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out [][2]string
	for rows.Next() {
		var rt, rid, rel string
		if err := rows.Scan(&rt, &rid, &rel); err != nil {
			return nil, err
		}
		if ps.arrows[rt][rel] {
			out = append(out, [2]string{rt, rid})
		}
	}
	return out, rows.Err()
}

// reindex rebuilds the permission sets for every resource that has
// relationships, in chunks.
func (ps *permissionSets) reindex(ctx context.Context, tx pgx.Tx) error {
	if _, err := tx.Exec(ctx, "truncate authz.permission_set"); err != nil {
		return err
	}
	d := newDerivation(tx)
	for typ := range ps.byType {
		ids, err := scanIDs(tx.Query(ctx, "select distinct resource_id from authz.relationship where resource_type = $1 order by 1", typ))
		if err != nil {
			return err
		}
		const chunk = 5000
		for start := 0; start < len(ids); start += chunk {
			end := start + chunk
			if end > len(ids) {
				end = len(ids)
			}
			resources := make([][2]string, 0, end-start)
			for _, id := range ids[start:end] {
				resources = append(resources, [2]string{typ, id})
			}
			if err := ps.recomputeAll(ctx, d, resources); err != nil {
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
	if x.sets == nil {
		return nil
	}
	s := x.sets.static[resourceType+"#"+permission]
	if s == nil {
		return []string{}
	}
	return s
}

// HasPermission implements authz.PermissionIndex.
func (x *Index) HasPermission(ctx context.Context, r authz.Reader, resource authz.ObjectRef, permission string, subject authz.SubjectRef) (bool, error) {
	tx, ok := pgstore.Tx(r)
	if !ok {
		return false, ErrNotPostgres
	}
	var found bool
	err := tx.QueryRow(ctx, "with "+memberOfSQL+", "+grantingSQL+`
		select exists (select 1 from granting g join member_of m on g.t = m.t and g.i = m.i and g.rel = m.rel)`,
		subject.Object.Type, subject.Object.ID, subject.Relation, resource.Type, resource.ID, permission, x.staticFor(resource.Type, permission)).Scan(&found)
	return found, err
}

// ResourcesWithPermission implements authz.PermissionIndex.
func (x *Index) ResourcesWithPermission(ctx context.Context, r authz.Reader, resourceType, permission string, subject authz.SubjectRef) ([]string, error) {
	tx, ok := pgstore.Tx(r)
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
		subject.Object.Type, subject.Object.ID, subject.Relation, resourceType, permission, x.staticFor(resourceType, permission)))
}

// SubjectsWithPermission implements authz.PermissionIndex.
func (x *Index) SubjectsWithPermission(ctx context.Context, r authz.Reader, resource authz.ObjectRef, permission, subjectType, subjectRelation string) ([]string, error) {
	tx, ok := pgstore.Tx(r)
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
		resource.Type, resource.ID, permission, subjectType, subjectRelation, x.staticFor(resource.Type, permission)))
}
