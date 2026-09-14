package engine

import (
	"context"

	"fmt"
	"github.com/matick-io/authz"
	"sort"

	"github.com/matick-io/authz/schema"
)

// LookupResources returns the ids of every resource of resourceType on which
// subject holds permission, sorted. limit 0 returns all of them.
//
// AI: this is the reverse walk (OpenFGA's ListObjects, SpiceDB's
// LookupResources). It starts from the subject's own grants, never truncates
// on its own, and with a authz.NestingIndex resolves each relation in one call.
func (s *Service) LookupResources(ctx context.Context, resourceType, permission string, subject authz.SubjectRef, limit int) ([]string, error) {
	if !authz.ValidTypeName(resourceType) {
		return nil, fmt.Errorf("%w: resource type %q", authz.ErrInvalidArgument, resourceType)
	}
	if !authz.ValidName(permission) {
		return nil, fmt.Errorf("%w: permission %q", authz.ErrInvalidArgument, permission)
	}
	if subject.Object.ID == authz.WildcardID {
		return nil, fmt.Errorf("%w: a wildcard cannot be the subject of a lookup", authz.ErrInvalidArgument)
	}
	if err := subject.Validate(); err != nil {
		return nil, err
	}
	var out []string
	err := s.ds.View(ctx, func(r authz.Reader) error {
		if err := target(s.sch, resourceType, permission, subject); err != nil {
			return err
		}
		l := &reverseResolver{r: r, sch: s.sch, idx: s.idx, pidx: s.pidx, subject: subject, maxDepth: s.maxDepth, memo: map[string]reverseEntry{}}
		ids, err := l.resolve(ctx, resourceType, permission, 0)
		if err != nil {
			return err
		}
		out = sortedIDs(ids, limit)
		return nil
	})
	return out, err
}

type idSet map[string]struct{}

func (s idSet) add(id string) { s[id] = struct{}{} }

// clone copies the set, for a caller that will add to a set it did not build.
func (s idSet) clone() idSet {
	out := make(idSet, len(s)+1)
	for id := range s {
		out[id] = struct{}{}
	}
	return out
}

func (s idSet) keys() []string {
	out := make([]string, 0, len(s))
	for id := range s {
		out = append(out, id)
	}
	return out
}

func sortedIDs(s idSet, limit int) []string {
	out := s.keys()
	sort.Strings(out)
	if limit > 0 && len(out) > limit {
		out = out[:limit]
	}
	return out
}

type reverseEntry struct {
	done bool
	ids  idSet
}

// reverseResolver answers "which objects of type T does subject reach through
// relation R" for a fixed subject. Its memo is keyed by (T, R) alone, because
// the answer does not depend on where the question came from.
//
// AI: a question can ask itself while answering: a relation that admits its
// own usersets (team#member: team#member) when walking, or a permission with
// an arrow back to its own type (folder view = viewer + parent->view) in
// either mode. That is the shape of nesting or hierarchy, not a data cycle,
// so an in-progress entry answers with its provisional set and the asker
// re-runs until the set stops growing: each pass discovers one more level,
// and a pass that changes nothing is the fixed point. Passing the depth limit
// without converging is an error, never a truncated answer.
type reverseResolver struct {
	r        authz.Reader
	sch      *schema.Schema
	idx      authz.NestingIndex
	pidx     authz.PermissionIndex
	subject  authz.SubjectRef
	maxDepth int
	memo     map[string]reverseEntry
	// provisionalHit is set when a resolution read an in-progress entry, so
	// the entry's owner knows its result rests on a provisional value.
	provisionalHit bool
}

func (l *reverseResolver) resolve(ctx context.Context, typ, relation string, depth int) (idSet, error) {
	if depth > l.maxDepth {
		return nil, authz.ErrMaxDepthExceeded
	}
	if err := ctx.Err(); err != nil {
		return nil, err
	}
	key := typ + "#" + relation
	if e, ok := l.memo[key]; ok {
		if !e.done {
			l.provisionalHit = true
		}
		return e.ids, nil
	}
	l.memo[key] = reverseEntry{ids: idSet{}}
	for pass := 0; ; pass++ {
		outerHit := l.provisionalHit
		l.provisionalHit = false
		before := make(map[string]bool, len(l.memo))
		for k := range l.memo {
			before[k] = true
		}
		ids, err := l.resolveUncached(ctx, typ, relation, depth)
		if err != nil {
			delete(l.memo, key)
			return nil, err
		}
		hit := l.provisionalHit
		l.provisionalHit = outerHit || hit
		if !hit || len(ids) == len(l.memo[key].ids) {
			l.memo[key] = reverseEntry{done: true, ids: ids}
			return ids, nil
		}
		if pass >= l.maxDepth {
			delete(l.memo, key)
			return nil, authz.ErrMaxDepthExceeded
		}
		// Entries completed under the provisional value are recomputed.
		for k := range l.memo {
			if k != key && !before[k] {
				delete(l.memo, k)
			}
		}
		l.memo[key] = reverseEntry{ids: ids}
	}
}

func (l *reverseResolver) resolveUncached(ctx context.Context, typ, relation string, depth int) (idSet, error) {
	def := l.sch.Definition(typ)
	if def == nil {
		return idSet{}, nil
	}
	if rel, ok := def.Relations[relation]; ok {
		if l.idx != nil {
			return l.resolveRelationIndexed(ctx, typ, rel, depth)
		}
		return l.resolveRelationWalking(ctx, typ, rel, depth)
	}
	if perm, ok := def.Permissions[relation]; ok {
		if l.pidx != nil && l.pidx.Materialized(typ, relation) {
			ids, err := l.pidx.ResourcesWithPermission(ctx, l.r, typ, relation, l.subject)
			if err != nil {
				return nil, err
			}
			out := idSet{}
			for _, id := range ids {
				out.add(id)
			}
			return out, nil
		}
		out, err := l.eval(ctx, typ, def, perm.Expr, depth)
		if err != nil {
			return nil, err
		}
		// A userset is a member of itself, for permissions as for relations.
		if l.subject.Relation == relation && l.subject.Object.Type == typ {
			// AI: eval may hand back a set the memo owns, provisional or done;
			// adding to it in place would change an answer already given.
			out = out.clone()
			out.add(l.subject.Object.ID)
		}
		return out, nil
	}
	return idSet{}, nil
}

func (l *reverseResolver) collect(ctx context.Context, into idSet, q authz.RelationshipQuery) error {
	ts, err := l.r.Relationships(ctx, q)
	if err != nil {
		return err
	}
	for _, t := range ts {
		into.add(t.Resource.ID)
	}
	return nil
}

// resolveRelationWalking finds the usersets the subject is in for each allowed
// userset type, then the typ#rel objects naming those usersets; nesting
// resolves through the fixed-point loop in resolve.
func (l *reverseResolver) resolveRelationWalking(ctx context.Context, typ string, rel *schema.Relation, depth int) (idSet, error) {
	out := idSet{}
	subj := l.subject
	// A userset is a member of itself.
	if subj.Relation != "" && subj.Object.Type == typ && subj.Relation == rel.Name {
		out.add(subj.Object.ID)
	}
	// Direct grants to the subject as named.
	direct := subj.Relation
	if err := l.collect(ctx, out, authz.RelationshipQuery{
		ResourceType: typ, Relation: rel.Name,
		SubjectType: subj.Object.Type, SubjectIDs: []string{subj.Object.ID}, SubjectRelation: &direct,
	}); err != nil {
		return nil, err
	}
	// Wildcard grants to the subject's type.
	if subj.Relation == "" && rel.Allows(subj.Object.Type, "", true) {
		none := ""
		if err := l.collect(ctx, out, authz.RelationshipQuery{
			ResourceType: typ, Relation: rel.Name,
			SubjectType: subj.Object.Type, SubjectIDs: []string{authz.WildcardID}, SubjectRelation: &none,
		}); err != nil {
			return nil, err
		}
	}
	// Grants to usersets the subject belongs to.
	for _, a := range rel.AllowedSubjects {
		if a.Wildcard || a.Relation == "" {
			continue
		}
		members, err := l.resolve(ctx, a.Type, a.Relation, depth+1)
		if err != nil {
			return nil, err
		}
		if len(members) == 0 {
			continue
		}
		via := a.Relation
		if err := l.collect(ctx, out, authz.RelationshipQuery{
			ResourceType: typ, Relation: rel.Name,
			SubjectType: a.Type, SubjectIDs: members.keys(), SubjectRelation: &via,
		}); err != nil {
			return nil, err
		}
	}
	return out, nil
}

// resolveRelationIndexed climbs the nesting index once: every typ#rel userset
// that names the subject directly, by wildcard, or through any depth of
// nesting. Usersets whose relation is a permission are resolved by the engine
// first, then climbed from in the same way.
func (l *reverseResolver) resolveRelationIndexed(ctx context.Context, typ string, rel *schema.Relation, depth int) (idSet, error) {
	out := idSet{}
	subj := l.subject
	if subj.Relation != "" && subj.Object.Type == typ && subj.Relation == rel.Name {
		out.add(subj.Object.ID)
	}
	ids := []string{subj.Object.ID}
	if subj.Relation == "" {
		ids = append(ids, authz.WildcardID)
	}
	found, err := l.idx.NestedResourceIDs(ctx, l.r, subj.Object.Type, ids, subj.Relation, typ, rel.Name)
	if err != nil {
		return nil, err
	}
	for _, id := range found {
		out.add(id)
	}
	for _, pu := range l.sch.PermissionUsersets() {
		members, err := l.resolve(ctx, pu.Type, pu.Relation, depth+1)
		if err != nil {
			return nil, err
		}
		if len(members) == 0 {
			continue
		}
		found, err := l.idx.NestedResourceIDs(ctx, l.r, pu.Type, members.keys(), pu.Relation, typ, rel.Name)
		if err != nil {
			return nil, err
		}
		for _, id := range found {
			out.add(id)
		}
	}
	return out, nil
}

func (l *reverseResolver) eval(ctx context.Context, typ string, def *schema.Definition, e schema.Expr, depth int) (idSet, error) {
	switch n := e.(type) {
	case *schema.Nil:
		return idSet{}, nil
	case *schema.ComputedUserset:
		return l.resolve(ctx, typ, n.Relation, depth+1)
	case *schema.Arrow:
		out := idSet{}
		rel := def.Relations[n.Relation]
		for _, subjectType := range rel.SubjectTypes() {
			if !l.sch.Definition(subjectType).Has(n.Target) {
				continue
			}
			targets, err := l.resolve(ctx, subjectType, n.Target, depth+1)
			if err != nil {
				return nil, err
			}
			if len(targets) == 0 {
				continue
			}
			// The arrow follows the subject object whatever its relation.
			if err := l.collect(ctx, out, authz.RelationshipQuery{
				ResourceType: typ, Relation: n.Relation,
				SubjectType: subjectType, SubjectIDs: targets.keys(),
			}); err != nil {
				return nil, err
			}
		}
		return out, nil
	case *schema.SetOp:
		sets := make([]idSet, 0, len(n.Children))
		for _, child := range n.Children {
			s, err := l.eval(ctx, typ, def, child, depth)
			if err != nil {
				return nil, err
			}
			sets = append(sets, s)
		}
		switch n.Op {
		case schema.Union:
			out := idSet{}
			for _, s := range sets {
				for id := range s {
					out.add(id)
				}
			}
			return out, nil
		case schema.Intersection:
			out := idSet{}
			for id := range sets[0] {
				in := true
				for _, s := range sets[1:] {
					if _, ok := s[id]; !ok {
						in = false
						break
					}
				}
				if in {
					out.add(id)
				}
			}
			return out, nil
		case schema.Exclusion:
			out := idSet{}
			for id := range sets[0] {
				if _, ok := sets[1][id]; !ok {
					out.add(id)
				}
			}
			return out, nil
		}
	}
	return nil, fmt.Errorf("authz: unknown expression node %T", e)
}

// LookupSubjects returns the subjects of subjectType (with subjectRelation, or
// "" for plain objects) that hold permission on resource.
func (s *Service) LookupSubjects(ctx context.Context, resource authz.ObjectRef, permission, subjectType, subjectRelation string) (*authz.LookupSubjectsResult, error) {
	if err := resource.Validate(); err != nil {
		return nil, err
	}
	if !authz.ValidName(permission) {
		return nil, fmt.Errorf("%w: permission %q", authz.ErrInvalidArgument, permission)
	}
	if !authz.ValidTypeName(subjectType) {
		return nil, fmt.Errorf("%w: subject type %q", authz.ErrInvalidArgument, subjectType)
	}
	if subjectRelation != "" && !authz.ValidName(subjectRelation) {
		return nil, fmt.Errorf("%w: subject relation %q", authz.ErrInvalidArgument, subjectRelation)
	}
	var out *authz.LookupSubjectsResult
	err := s.ds.View(ctx, func(r authz.Reader) error {
		if err := target(s.sch, resource.Type, permission, authz.SubjectRef{Object: authz.ObjectRef{Type: subjectType, ID: "x"}, Relation: subjectRelation}); err != nil {
			return err
		}
		f := &forwardResolver{
			resolver:        s.newResolver(r),
			subjectType:     subjectType,
			subjectRelation: subjectRelation,
			memo:            map[string]forwardEntry{},
		}
		set, err := f.expand(ctx, resource, permission, 0)
		if err != nil {
			return err
		}
		out = &authz.LookupSubjectsResult{Wildcard: set.wildcard}
		if set.wildcard {
			out.ExcludedSubjectIDs = sortedIDs(set.excluded, 0)
		} else {
			out.SubjectIDs = sortedIDs(set.ids, 0)
		}
		return nil
	})
	return out, err
}

// subjectSet is either finite (ids) or cofinite (every subject except
// excluded) when wildcard is set. The algebra below is exact in both cases.
type subjectSet struct {
	wildcard bool
	ids      idSet
	excluded idSet
}

func finite() subjectSet { return subjectSet{ids: idSet{}, excluded: idSet{}} }

func everyone() subjectSet { return subjectSet{wildcard: true, ids: idSet{}, excluded: idSet{}} }

func union(a, b subjectSet) subjectSet {
	switch {
	case a.wildcard && b.wildcard:
		out := everyone()
		for id := range a.excluded {
			if _, ok := b.excluded[id]; ok {
				out.excluded.add(id)
			}
		}
		return out
	case a.wildcard:
		return union(b, a)
	case b.wildcard:
		out := everyone()
		for id := range b.excluded {
			if _, ok := a.ids[id]; !ok {
				out.excluded.add(id)
			}
		}
		return out
	}
	out := finite()
	for id := range a.ids {
		out.ids.add(id)
	}
	for id := range b.ids {
		out.ids.add(id)
	}
	return out
}

func intersection(a, b subjectSet) subjectSet {
	switch {
	case a.wildcard && b.wildcard:
		out := everyone()
		for id := range a.excluded {
			out.excluded.add(id)
		}
		for id := range b.excluded {
			out.excluded.add(id)
		}
		return out
	case a.wildcard:
		return intersection(b, a)
	case b.wildcard:
		out := finite()
		for id := range a.ids {
			if _, ok := b.excluded[id]; !ok {
				out.ids.add(id)
			}
		}
		return out
	}
	out := finite()
	for id := range a.ids {
		if _, ok := b.ids[id]; ok {
			out.ids.add(id)
		}
	}
	return out
}

func exclusion(a, b subjectSet) subjectSet {
	switch {
	case a.wildcard && b.wildcard:
		out := finite()
		for id := range b.excluded {
			if _, ok := a.excluded[id]; !ok {
				out.ids.add(id)
			}
		}
		return out
	case a.wildcard:
		out := everyone()
		for id := range a.excluded {
			out.excluded.add(id)
		}
		for id := range b.ids {
			out.excluded.add(id)
		}
		return out
	case b.wildcard:
		out := finite()
		for id := range a.ids {
			if _, ok := b.excluded[id]; ok {
				out.ids.add(id)
			}
		}
		return out
	}
	out := finite()
	for id := range a.ids {
		if _, ok := b.ids[id]; !ok {
			out.ids.add(id)
		}
	}
	return out
}

type forwardEntry struct {
	done  bool
	set   subjectSet
	index int // the frame answering this expansion while it is open
}

type forwardResolver struct {
	*resolver
	subjectType     string
	subjectRelation string
	memo            map[string]forwardEntry
}

func (f *forwardResolver) expand(ctx context.Context, res authz.ObjectRef, relation string, depth int) (subjectSet, error) {
	if depth > f.maxDepth {
		return subjectSet{}, authz.ErrMaxDepthExceeded
	}
	if err := ctx.Err(); err != nil {
		return subjectSet{}, err
	}
	key := res.String() + "#" + relation
	if e, ok := f.memo[key]; ok {
		if !e.done {
			f.stack.hit(e.index)
			return finite(), nil
		}
		return e.set, nil
	}
	// AI: the same low-link discipline as the check resolver (see frames): a
	// set that rested on an open expansion is not kept.
	index, outerLow := f.stack.enter()
	f.memo[key] = forwardEntry{index: index}
	set, err := f.expandUncached(ctx, res, relation, depth)
	if final := f.stack.leave(index, outerLow); err != nil || !final {
		delete(f.memo, key)
		return set, err
	}
	f.memo[key] = forwardEntry{done: true, set: set}
	return set, nil
}

func (f *forwardResolver) expandUncached(ctx context.Context, res authz.ObjectRef, relation string, depth int) (subjectSet, error) {
	def := f.sch.Definition(res.Type)
	if def == nil {
		return finite(), nil
	}
	if _, ok := def.Relations[relation]; ok {
		if f.idx != nil {
			return f.expandRelationIndexed(ctx, res, relation, depth)
		}
		return f.expandRelationWalking(ctx, res, relation, depth)
	}
	if perm, ok := def.Permissions[relation]; ok {
		if f.pidx != nil && f.pidx.Materialized(res.Type, relation) {
			ids, err := f.pidx.SubjectsWithPermission(ctx, f.r, res, relation, f.subjectType, f.subjectRelation)
			if err != nil {
				return subjectSet{}, err
			}
			out := finite()
			for _, id := range ids {
				out.ids.add(id)
			}
			return out, nil
		}
		out, err := f.eval(ctx, res, perm.Expr, depth)
		if err != nil {
			return subjectSet{}, err
		}
		// A userset is a member of itself, for permissions as for relations.
		if f.subjectType == res.Type && f.subjectRelation == relation {
			self := finite()
			self.ids.add(res.ID)
			out = union(out, self)
		}
		return out, nil
	}
	return finite(), nil
}

func (f *forwardResolver) expandRelationWalking(ctx context.Context, res authz.ObjectRef, relation string, depth int) (subjectSet, error) {
	out := finite()
	if f.subjectType == res.Type && f.subjectRelation == relation && f.subjectRelation != "" {
		out.ids.add(res.ID)
	}
	ts, err := f.relationTuples(ctx, res, relation)
	if err != nil {
		return subjectSet{}, err
	}
	for _, t := range ts {
		if t.Subject.Object.Type == f.subjectType && t.Subject.Relation == f.subjectRelation {
			if t.Subject.Object.ID == authz.WildcardID {
				out = union(out, everyone())
			} else {
				out.ids.add(t.Subject.Object.ID)
			}
		}
		if t.Subject.Relation == "" {
			continue
		}
		sub, err := f.expand(ctx, t.Subject.Object, t.Subject.Relation, depth+1)
		if err != nil {
			return subjectSet{}, err
		}
		out = union(out, sub)
	}
	return out, nil
}

// expandRelationIndexed reads the nesting index once: every subject of the
// wanted kind named on this relation or on any userset nested within it.
// Usersets whose relation is a permission are expanded by the engine.
func (f *forwardResolver) expandRelationIndexed(ctx context.Context, res authz.ObjectRef, relation string, depth int) (subjectSet, error) {
	out := finite()
	if f.subjectType == res.Type && f.subjectRelation == relation && f.subjectRelation != "" {
		out.ids.add(res.ID)
	}
	selector := authz.RelationshipQuery{ResourceType: res.Type, ResourceIDs: []string{res.ID}, Relation: relation}
	q := selector
	wanted := f.subjectRelation
	q.SubjectType, q.SubjectRelation = f.subjectType, &wanted
	ts, err := f.idx.NestedRelationships(ctx, f.r, q)
	if err != nil {
		return subjectSet{}, err
	}
	for _, t := range ts {
		if t.Subject.Object.ID == authz.WildcardID {
			out = union(out, everyone())
		} else {
			out.ids.add(t.Subject.Object.ID)
		}
	}
	for _, pu := range f.sch.PermissionUsersets() {
		q := selector
		permission := pu.Relation
		q.SubjectType, q.SubjectRelation = pu.Type, &permission
		ts, err := f.idx.NestedRelationships(ctx, f.r, q)
		if err != nil {
			return subjectSet{}, err
		}
		for _, t := range ts {
			sub, err := f.expand(ctx, t.Subject.Object, t.Subject.Relation, depth+1)
			if err != nil {
				return subjectSet{}, err
			}
			out = union(out, sub)
		}
	}
	return out, nil
}

func (f *forwardResolver) eval(ctx context.Context, res authz.ObjectRef, e schema.Expr, depth int) (subjectSet, error) {
	switch n := e.(type) {
	case *schema.Nil:
		return finite(), nil
	case *schema.ComputedUserset:
		return f.expand(ctx, res, n.Relation, depth+1)
	case *schema.Arrow:
		out := finite()
		ts, err := f.relationTuples(ctx, res, n.Relation)
		if err != nil {
			return subjectSet{}, err
		}
		for _, t := range ts {
			if t.Subject.Object.ID == authz.WildcardID || !f.sch.Definition(t.Subject.Object.Type).Has(n.Target) {
				continue
			}
			sub, err := f.expand(ctx, t.Subject.Object, n.Target, depth+1)
			if err != nil {
				return subjectSet{}, err
			}
			out = union(out, sub)
		}
		return out, nil
	case *schema.SetOp:
		acc, err := f.eval(ctx, res, n.Children[0], depth)
		if err != nil {
			return subjectSet{}, err
		}
		for _, child := range n.Children[1:] {
			next, err := f.eval(ctx, res, child, depth)
			if err != nil {
				return subjectSet{}, err
			}
			switch n.Op {
			case schema.Union:
				acc = union(acc, next)
			case schema.Intersection:
				acc = intersection(acc, next)
			case schema.Exclusion:
				acc = exclusion(acc, next)
			}
		}
		return acc, nil
	}
	return subjectSet{}, fmt.Errorf("authz: unknown expression node %T", e)
}
