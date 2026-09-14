package engine

import (
	"context"
	"fmt"
	"sort"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/schema"
)

// AI: the bulk path, after SpiceDB's design. A group of checks that differ
// only in the resource id walks the graph once: the relationships of every
// resource in the group are read in one query, and each question found
// below (a userset, an arrow target) is asked once for every resource that
// led to it. Set operators narrow the group as they go: an intersection
// asks its second operand only about the resources the first admitted, a
// union stops asking about a resource once one branch admitted it. The
// answers are the single path's, question by question, and the differential
// test holds the two paths to each other on every round.

// checkMany reports which of ids hold relation, a relation or a permission
// of typ, for subject.
//
// AI: a batch's members can depend on each other: a group nested in another
// group of the same batch, a folder whose parent is in the batch. The walk
// re-asks the batch's own question about those, and they are open in the
// batch's frame. Unlike an open question in a frame above, which is a cycle
// on the path and answers false, a sibling answers with what the batch has
// found for it so far, and the batch runs again until a pass finds nothing
// new: the fixed point, reached in as many passes as the longest chain of
// dependencies within the batch.
func (c *resolver) checkMany(ctx context.Context, typ string, ids []string, relation string, subject authz.SubjectRef, depth int) (idSet, error) {
	if depth > c.maxDepth {
		return nil, authz.ErrMaxDepthExceeded
	}
	if err := ctx.Err(); err != nil {
		return nil, err
	}
	out := idSet{}
	var pending []string
	seen := map[string]bool{}
	sibling := c.stack.open - 1 // the frame asking, whose open members are siblings
	for _, id := range ids {
		if seen[id] {
			continue
		}
		seen[id] = true
		key := memoKey(typ, id, relation, subject)
		if e, ok := c.memo[key]; ok {
			switch {
			case e.done:
				if e.result {
					out.add(id)
				}
			case e.result:
				// Found by the batch that owns it: a fact, since a batch only
				// ever adds to what it found, so any frame may use it.
				out.add(id)
			case e.index == sibling:
				// A sibling not found yet: provisionally not, until the batch's
				// next pass.
			default:
				c.stack.hit(e.index)
			}
			continue
		}
		pending = append(pending, id)
	}
	if len(pending) == 0 {
		return out, nil
	}
	index, outerLow := c.stack.enter()
	for _, id := range pending {
		c.memo[memoKey(typ, id, relation, subject)] = memoEntry{index: index}
	}
	found := idSet{}
	var err error
	for {
		var more idSet
		more, err = c.checkManyUncached(ctx, typ, pending, relation, subject, depth)
		if err != nil {
			break
		}
		grew := false
		for id := range more {
			if _, ok := found[id]; !ok {
				found.add(id)
				c.provisional(typ, id, relation, subject)
				grew = true
			}
		}
		if !grew || len(found) == len(pending) {
			break
		}
	}
	final := c.stack.leave(index, outerLow)
	if err != nil || !final {
		for _, id := range pending {
			delete(c.memo, memoKey(typ, id, relation, subject))
		}
		if err != nil {
			return nil, err
		}
	} else {
		for _, id := range pending {
			_, ok := found[id]
			c.memo[memoKey(typ, id, relation, subject)] = memoEntry{done: true, result: ok}
		}
	}
	for id := range found {
		out.add(id)
	}
	return out, nil
}

// provisional records that a member of an open batch holds the answer, for
// the siblings that ask about it before the batch is done.
func (c *resolver) provisional(typ, id, relation string, subject authz.SubjectRef) {
	key := memoKey(typ, id, relation, subject)
	if e, ok := c.memo[key]; ok && !e.done {
		e.result = true
		c.memo[key] = e
	}
}

func memoKey(typ, id, relation string, subject authz.SubjectRef) string {
	return authz.ObjectRef{Type: typ, ID: id}.String() + "#" + relation + "@" + subject.String()
}

func (c *resolver) checkManyUncached(ctx context.Context, typ string, ids []string, relation string, subject authz.SubjectRef, depth int) (idSet, error) {
	found := idSet{}
	rest := ids
	// A userset is a member of itself.
	if subject.Relation == relation && subject.Object.Type == typ {
		rest = rest[:0:0]
		for _, id := range ids {
			if id == subject.Object.ID {
				found.add(id)
			} else {
				rest = append(rest, id)
			}
		}
	}
	def := c.sch.Definition(typ)
	if def == nil || len(rest) == 0 {
		return found, nil
	}
	var sub idSet
	var err error
	switch {
	case def.Relations[relation] != nil:
		if c.idx != nil {
			sub, err = c.checkRelationManyIndexed(ctx, typ, rest, relation, subject, depth)
		} else {
			sub, err = c.checkRelationManyWalking(ctx, typ, rest, relation, subject, depth)
		}
	case def.Permissions[relation] != nil:
		if c.pidx != nil && c.pidx.Materialized(typ, relation) {
			var hits []string
			hits, err = c.pidx.ResourcesWithPermissionAmong(ctx, c.r, typ, relation, subject, rest)
			sub = idSet{}
			for _, id := range hits {
				sub.add(id)
			}
		} else {
			sub, err = c.evalMany(ctx, typ, rest, def.Permissions[relation].Expr, subject, depth)
		}
	default:
		return found, nil
	}
	if err != nil {
		return nil, err
	}
	for id := range sub {
		found.add(id)
	}
	return found, nil
}

// relationTuplesMany reads relation on many resources in one query, through
// the same cache as relationTuples.
func (c *resolver) relationTuplesMany(ctx context.Context, typ string, ids []string, relation string) (map[string][]authz.Relationship, error) {
	out := make(map[string][]authz.Relationship, len(ids))
	var missing []string
	for _, id := range ids {
		key := authz.ObjectRef{Type: typ, ID: id}.String() + "#" + relation
		if ts, ok := c.tuples[key]; ok {
			out[id] = ts
		} else {
			missing = append(missing, id)
		}
	}
	if len(missing) == 0 {
		return out, nil
	}
	ts, err := c.r.Relationships(ctx, authz.RelationshipQuery{ResourceType: typ, ResourceIDs: missing, Relation: relation})
	if err != nil {
		return nil, err
	}
	for _, t := range ts {
		out[t.Resource.ID] = append(out[t.Resource.ID], t)
	}
	for _, id := range missing {
		c.tuples[authz.ObjectRef{Type: typ, ID: id}.String()+"#"+relation] = out[id]
	}
	return out, nil
}

// usersetKind is a subject type and relation, the shape of a group of
// usersets a batch re-asks its question of.
type usersetKind struct{ typ, relation string }

// referrers maps, per kind, each userset id to the resources that name it;
// batches sorts them so the questions are asked in a stable order.
type referrers map[usersetKind]map[string][]string

func (r referrers) add(subject authz.SubjectRef, resourceID string) {
	k := usersetKind{subject.Object.Type, subject.Relation}
	if r[k] == nil {
		r[k] = map[string][]string{}
	}
	r[k][subject.Object.ID] = append(r[k][subject.Object.ID], resourceID)
}

// batches returns the kinds in order, and for each the userset ids still
// worth asking about: those with a referrer not already found.
func (r referrers) batches(found idSet) ([]usersetKind, map[usersetKind][]string) {
	kinds := make([]usersetKind, 0, len(r))
	ids := map[usersetKind][]string{}
	for k, members := range r {
		var pending []string
		for uid, rids := range members {
			for _, rid := range rids {
				if _, ok := found[rid]; !ok {
					pending = append(pending, uid)
					break
				}
			}
		}
		if len(pending) == 0 {
			continue
		}
		sort.Strings(pending)
		kinds = append(kinds, k)
		ids[k] = pending
	}
	sort.Slice(kinds, func(i, j int) bool {
		return kinds[i].typ < kinds[j].typ || (kinds[i].typ == kinds[j].typ && kinds[i].relation < kinds[j].relation)
	})
	return kinds, ids
}

func (c *resolver) checkRelationManyWalking(ctx context.Context, typ string, ids []string, relation string, subject authz.SubjectRef, depth int) (idSet, error) {
	byID, err := c.relationTuplesMany(ctx, typ, ids, relation)
	if err != nil {
		return nil, err
	}
	found := idSet{}
	refs := referrers{}
	for _, id := range ids {
		direct := false
		for _, t := range byID[id] {
			if t.Subject == subject || (t.Subject.Relation == "" && t.Subject.Object.ID == authz.WildcardID &&
				t.Subject.Object.Type == subject.Object.Type && subject.Relation == "") {
				direct = true
				break
			}
		}
		if direct {
			found.add(id)
			c.provisional(typ, id, relation, subject)
			continue
		}
		for _, t := range byID[id] {
			if t.Subject.Relation != "" {
				refs.add(t.Subject, id)
			}
		}
	}
	kinds, pending := refs.batches(found)
	for _, k := range kinds {
		sub, err := c.checkMany(ctx, k.typ, pending[k], k.relation, subject, depth+1)
		if err != nil {
			return nil, err
		}
		for uid := range sub {
			for _, rid := range refs[k][uid] {
				found.add(rid)
			}
		}
	}
	return found, nil
}

// checkRelationManyIndexed asks the nesting index which of the resources name
// the subject, directly or through any nesting, in one query; then, for
// usersets whose relation is a permission, which such usersets the rest
// reach, asks the batch question of those, and maps the holders back.
func (c *resolver) checkRelationManyIndexed(ctx context.Context, typ string, ids []string, relation string, subject authz.SubjectRef, depth int) (idSet, error) {
	sids := []string{subject.Object.ID}
	if subject.Relation == "" {
		sids = append(sids, authz.WildcardID)
	}
	hits, err := c.idx.NestedResourceIDsAmong(ctx, c.r, subject.Object.Type, sids, subject.Relation, typ, relation, ids)
	if err != nil {
		return nil, err
	}
	found := idSet{}
	for _, id := range hits {
		found.add(id)
		c.provisional(typ, id, relation, subject)
	}
	rest := remaining(ids, found)
	for _, pu := range c.sch.PermissionUsersets() {
		if len(rest) == 0 {
			break
		}
		permission := pu.Relation
		ts, err := c.idx.NestedRelationships(ctx, c.r, authz.RelationshipQuery{
			ResourceType: typ, ResourceIDs: rest, Relation: relation, SubjectType: pu.Type, SubjectRelation: &permission,
		})
		if err != nil {
			return nil, err
		}
		candidates := idSet{}
		for _, t := range ts {
			candidates.add(t.Subject.Object.ID)
		}
		if len(candidates) == 0 {
			continue
		}
		sub, err := c.checkMany(ctx, pu.Type, sortedIDs(candidates, 0), pu.Relation, subject, depth+1)
		if err != nil {
			return nil, err
		}
		if len(sub) == 0 {
			continue
		}
		holders, err := c.idx.NestedResourceIDsAmong(ctx, c.r, pu.Type, sortedIDs(sub, 0), pu.Relation, typ, relation, rest)
		if err != nil {
			return nil, err
		}
		for _, id := range holders {
			found.add(id)
		}
		rest = remaining(rest, found)
	}
	return found, nil
}

// remaining keeps the ids not in found, in order.
func remaining(ids []string, found idSet) []string {
	out := make([]string, 0, len(ids))
	for _, id := range ids {
		if _, ok := found[id]; !ok {
			out = append(out, id)
		}
	}
	return out
}

// kept keeps the ids in found, in order.
func kept(ids []string, found idSet) []string {
	out := make([]string, 0, len(found))
	for _, id := range ids {
		if _, ok := found[id]; ok {
			out = append(out, id)
		}
	}
	return out
}

func (c *resolver) evalMany(ctx context.Context, typ string, ids []string, e schema.Expr, subject authz.SubjectRef, depth int) (idSet, error) {
	if len(ids) == 0 {
		return idSet{}, nil
	}
	switch n := e.(type) {
	case *schema.Nil:
		return idSet{}, nil
	case *schema.ComputedUserset:
		return c.checkMany(ctx, typ, ids, n.Relation, subject, depth+1)
	case *schema.Arrow:
		byID, err := c.relationTuplesMany(ctx, typ, ids, n.Relation)
		if err != nil {
			return nil, err
		}
		refs := referrers{}
		for _, id := range ids {
			for _, t := range byID[id] {
				if t.Subject.Object.ID == authz.WildcardID || !c.sch.Definition(t.Subject.Object.Type).Has(n.Target) {
					continue
				}
				// The arrow follows the subject object whatever its relation.
				refs.add(authz.SubjectRef{Object: t.Subject.Object, Relation: n.Target}, id)
			}
		}
		found := idSet{}
		kinds, pending := refs.batches(found)
		for _, k := range kinds {
			sub, err := c.checkMany(ctx, k.typ, pending[k], k.relation, subject, depth+1)
			if err != nil {
				return nil, err
			}
			for tid := range sub {
				for _, rid := range refs[k][tid] {
					found.add(rid)
				}
			}
		}
		return found, nil
	case *schema.SetOp:
		switch n.Op {
		case schema.Union:
			found := idSet{}
			rest := ids
			for _, child := range n.Children {
				if len(rest) == 0 {
					break
				}
				sub, err := c.evalMany(ctx, typ, rest, child, subject, depth)
				if err != nil {
					return nil, err
				}
				for id := range sub {
					found.add(id)
				}
				rest = remaining(rest, found)
			}
			return found, nil
		case schema.Intersection:
			cur := ids
			for _, child := range n.Children {
				if len(cur) == 0 {
					break
				}
				sub, err := c.evalMany(ctx, typ, cur, child, subject, depth)
				if err != nil {
					return nil, err
				}
				cur = kept(cur, sub)
			}
			out := idSet{}
			for _, id := range cur {
				out.add(id)
			}
			return out, nil
		case schema.Exclusion:
			admitted, err := c.evalMany(ctx, typ, ids, n.Children[0], subject, depth)
			if err != nil || len(admitted) == 0 {
				return admitted, err
			}
			excluded, err := c.evalMany(ctx, typ, kept(ids, admitted), n.Children[1], subject, depth)
			if err != nil {
				return nil, err
			}
			for id := range excluded {
				delete(admitted, id)
			}
			return admitted, nil
		}
	}
	return nil, fmt.Errorf("authz: unknown expression node %T", e)
}
