package materialize

import (
	"context"
	"sort"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/schema"
)

// Userset is a resource and relation, the unit the closure and the sets are
// made of.
type Userset struct {
	Type, ID, Relation string
}

func (u Userset) String() string { return u.Type + ":" + u.ID + "#" + u.Relation }

// Edge is one closure row: Descendant is nested within Ancestor, through one
// or more nesting relationships.
type Edge struct {
	Ancestor, Descendant Userset
}

func (e Edge) String() string { return e.Ancestor.String() + " > " + e.Descendant.String() }

// SetRow is one permission-set row: Set grants Permission on Resource,
// reached through an arrow.
type SetRow struct {
	Resource   authz.ObjectRef
	Permission string
	Set        Userset
}

func (r SetRow) String() string {
	return r.Resource.String() + "#" + r.Permission + " <- " + r.Set.String()
}

// Closure derives the transitive closure of the nesting edges among rels: one
// Edge per proper ancestor and descendant pair, sorted. A relationship whose
// subject is a userset is a nesting edge. It is the whole of what a nesting
// index stores, and what a datastore's incremental maintenance must arrive
// at; a cycle ends where it stops finding new pairs.
func Closure(rels []authz.Relationship) []Edge {
	parents := map[Userset][]Userset{}
	for _, r := range rels {
		if !r.IsNesting() {
			continue
		}
		child := Userset{r.Subject.Object.Type, r.Subject.Object.ID, r.Subject.Relation}
		parents[child] = append(parents[child], Userset{r.Resource.Type, r.Resource.ID, r.Relation})
	}
	var out []Edge
	for child := range parents {
		seen := map[Userset]bool{child: true}
		stack := []Userset{child}
		for len(stack) > 0 {
			u := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			for _, p := range parents[u] {
				if seen[p] {
					continue
				}
				seen[p] = true
				out = append(out, Edge{Ancestor: p, Descendant: child})
				stack = append(stack, p)
			}
		}
	}
	sort.Slice(out, func(i, j int) bool { return out[i].String() < out[j].String() })
	return out
}

// Source is the read a derivation needs: the relationships of the given
// resources. A datastore answers it in one query; a Snapshot from its copy.
type Source interface {
	Relationships(ctx context.Context, resources []authz.ObjectRef) ([]authz.Relationship, error)
}

// Derivation is the working state of one maintenance pass: the sets that
// grant each permission on each resource, memoised, and each resource's
// relationships loaded once.
//
// AI: a derivation that read an entry still in progress (an arrow cycle) is
// complete for the resource at the top of the stack, whose own sets it
// already holds, but not for the resources beneath it, so those are never
// memoised: memoising them would make the stored rows depend on evaluation
// order, which the concurrent-writer proof caught.
type Derivation struct {
	sets   *Sets
	src    Source
	memo   map[string][]Userset
	busy   map[string]bool
	tuples map[authz.ObjectRef]map[string][]authz.ObjectRef // resource -> relation -> subject objects
	hit    bool
}

// NewDerivation starts a pass reading relationships from src.
func (s *Sets) NewDerivation(src Source) *Derivation {
	return &Derivation{sets: s, src: src, memo: map[string][]Userset{}, busy: map[string]bool{}, tuples: map[authz.ObjectRef]map[string][]authz.ObjectRef{}}
}

// Preload loads the relationships of every resource not loaded yet, in one
// read.
func (d *Derivation) Preload(ctx context.Context, resources []authz.ObjectRef) error {
	var missing []authz.ObjectRef
	for _, res := range resources {
		if _, ok := d.tuples[res]; ok {
			continue
		}
		d.tuples[res] = map[string][]authz.ObjectRef{}
		missing = append(missing, res)
	}
	if len(missing) == 0 {
		return nil
	}
	rels, err := d.src.Relationships(ctx, missing)
	if err != nil {
		return err
	}
	for _, r := range rels {
		if _, ok := d.tuples[r.Resource]; !ok {
			d.tuples[r.Resource] = map[string][]authz.ObjectRef{}
		}
		d.tuples[r.Resource][r.Relation] = append(d.tuples[r.Resource][r.Relation], r.Subject.Object)
	}
	return nil
}

func (d *Derivation) load(ctx context.Context, res authz.ObjectRef) (map[string][]authz.ObjectRef, error) {
	if t, ok := d.tuples[res]; ok {
		return t, nil
	}
	if err := d.Preload(ctx, []authz.ObjectRef{res}); err != nil {
		return nil, err
	}
	return d.tuples[res], nil
}

// Grants derives the sets that grant permission on res from the rewrite: the
// resource's own relations for references, and the grantors of the targets
// for arrows. The resource's own sets are included; Rows leaves them out.
func (d *Derivation) Grants(ctx context.Context, res authz.ObjectRef, permission string) ([]Userset, error) {
	return d.grants(ctx, res, permission, 0)
}

func (d *Derivation) grants(ctx context.Context, res authz.ObjectRef, perm string, depth int) ([]Userset, error) {
	if depth > maxGrantDepth {
		return nil, authz.ErrMaxDepthExceeded
	}
	key := res.String() + "#" + perm
	if sets, ok := d.memo[key]; ok {
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
	def := d.sets.sch.Definition(res.Type)
	own, err := d.load(ctx, res)
	if err != nil {
		return nil, err
	}
	seen := map[Userset]bool{}
	var out []Userset
	add := func(u Userset) {
		if !seen[u] {
			seen[u] = true
			out = append(out, u)
		}
	}
	// The permission's own set grants itself: a userset is a member of itself.
	add(Userset{res.Type, res.ID, perm})
	var walk func(e schema.Expr) error
	walk = func(e schema.Expr) error {
		switch n := e.(type) {
		case *schema.ComputedUserset:
			if _, ok := def.Relations[n.Relation]; ok {
				add(Userset{res.Type, res.ID, n.Relation})
				return nil
			}
			sub, err := d.grants(ctx, res, n.Relation, depth+1)
			if err != nil {
				return err
			}
			for _, u := range sub {
				add(u)
			}
			return nil
		case *schema.Arrow:
			for _, t := range own[n.Relation] {
				target := d.sets.sch.Definition(t.Type)
				if _, ok := target.Relations[n.Target]; ok {
					add(Userset{t.Type, t.ID, n.Target})
					continue
				}
				if _, ok := target.Permissions[n.Target]; ok {
					sub, err := d.grants(ctx, t, n.Target, depth+1)
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
		case *schema.Nil:
			return nil
		}
		return ErrNotMaterializable
	}
	if err := walk(def.Permissions[perm].Expr); err != nil {
		return nil, err
	}
	if !d.hit {
		d.memo[key] = out
	}
	d.hit = d.hit || outerHit
	return out, nil
}

// Rows derives the rows an index stores for the given resources: for every
// configured permission of each resource's type, the sets reached through an
// arrow. Sets on the resource itself are schema (Static) and are left out.
// The rows are unique and sorted.
func (d *Derivation) Rows(ctx context.Context, resources []authz.ObjectRef) ([]SetRow, error) {
	if err := d.Preload(ctx, resources); err != nil {
		return nil, err
	}
	seen := map[SetRow]bool{}
	var out []SetRow
	for _, res := range resources {
		for _, perm := range d.sets.Permissions(res.Type) {
			sets, err := d.grants(ctx, res, perm, 0)
			if err != nil {
				return nil, err
			}
			for _, u := range sets {
				if u.Type == res.Type && u.ID == res.ID {
					continue
				}
				row := SetRow{Resource: res, Permission: perm, Set: u}
				if !seen[row] {
					seen[row] = true
					out = append(out, row)
				}
			}
		}
	}
	sort.Slice(out, func(i, j int) bool { return out[i].String() < out[j].String() })
	return out, nil
}

// listSource is a Source over relationships held in memory.
type listSource []authz.Relationship

func (l listSource) Relationships(_ context.Context, resources []authz.ObjectRef) ([]authz.Relationship, error) {
	wanted := make(map[authz.ObjectRef]bool, len(resources))
	for _, res := range resources {
		wanted[res] = true
	}
	var out []authz.Relationship
	for _, r := range l {
		if wanted[r.Resource] {
			out = append(out, r)
		}
	}
	return out, nil
}

// resourcesOf lists, sorted, every resource among rels whose type has a
// configured permission: the resources an index stores rows for.
func resourcesOf(sets *Sets, rels []authz.Relationship) []authz.ObjectRef {
	seen := map[authz.ObjectRef]bool{}
	var out []authz.ObjectRef
	for _, r := range rels {
		if len(sets.Permissions(r.Resource.Type)) == 0 || seen[r.Resource] {
			continue
		}
		seen[r.Resource] = true
		out = append(out, r.Resource)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].String() < out[j].String() })
	return out
}
