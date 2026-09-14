package materialize

import (
	"context"
	"sort"

	"github.com/matick-io/authz"
)

// Snapshot is an index over a copy of the relationships, built in full by
// Build. It implements authz.NestingIndex and authz.PermissionIndex and
// answers every question from its maps, ignoring the Reader it is given:
// the snapshot answers for the moment it was built. It is the reference
// implementation of the index's queries, which a datastore's native queries
// must agree with, and the index of the memory datastore, which rebuilds it
// whenever the store changed.
type Snapshot struct {
	sets       *Sets
	byResource map[Userset][]authz.Relationship // the relationships of each resource userset
	bySubject  map[Userset][]authz.Relationship // the relationships naming each subject, plain subjects with Relation ""
	below      map[Userset][]Userset            // ancestor -> descendants
	above      map[Userset][]Userset            // descendant -> ancestors
	granting   map[string][]Userset             // "resource#permission" -> stored sets
	bySet      map[string]map[Userset][]string  // "type#permission" -> set -> resource ids
}

// Build derives the closure and, when sets is configured, the set rows of
// rels, and indexes the relationships for the queries.
func Build(ctx context.Context, sets *Sets, rels []authz.Relationship) (*Snapshot, error) {
	s := &Snapshot{
		sets:       sets,
		byResource: map[Userset][]authz.Relationship{},
		bySubject:  map[Userset][]authz.Relationship{},
		below:      map[Userset][]Userset{},
		above:      map[Userset][]Userset{},
		granting:   map[string][]Userset{},
		bySet:      map[string]map[Userset][]string{},
	}
	for _, r := range rels {
		res := Userset{r.Resource.Type, r.Resource.ID, r.Relation}
		sub := Userset{r.Subject.Object.Type, r.Subject.Object.ID, r.Subject.Relation}
		s.byResource[res] = append(s.byResource[res], r)
		s.bySubject[sub] = append(s.bySubject[sub], r)
	}
	for _, e := range Closure(rels) {
		s.below[e.Ancestor] = append(s.below[e.Ancestor], e.Descendant)
		s.above[e.Descendant] = append(s.above[e.Descendant], e.Ancestor)
	}
	if !sets.Empty() {
		rows, err := sets.NewDerivation(listSource(rels)).Rows(ctx, resourcesOf(sets, rels))
		if err != nil {
			return nil, err
		}
		for _, row := range rows {
			key := row.Resource.String() + "#" + row.Permission
			s.granting[key] = append(s.granting[key], row.Set)
			kind := row.Resource.Type + "#" + row.Permission
			if s.bySet[kind] == nil {
				s.bySet[kind] = map[Userset][]string{}
			}
			s.bySet[kind][row.Set] = append(s.bySet[kind][row.Set], row.Resource.ID)
		}
	}
	return s, nil
}

// Rows renders what the snapshot holds, for Compare.
func (s *Snapshot) Rows() Rows {
	var out Rows
	for a, ds := range s.below {
		for _, d := range ds {
			out.Closure = append(out.Closure, Edge{Ancestor: a, Descendant: d}.String())
		}
	}
	for key, sets := range s.granting {
		for _, u := range sets {
			out.Sets = append(out.Sets, key+" <- "+u.String())
		}
	}
	sort.Strings(out.Closure)
	sort.Strings(out.Sets)
	return out
}

// NestedRelationships implements authz.NestingIndex.
func (s *Snapshot) NestedRelationships(_ context.Context, _ authz.Reader, q authz.RelationshipQuery) ([]authz.Relationship, error) {
	var out []authz.Relationship
	for _, id := range q.ResourceIDs {
		root := Userset{q.ResourceType, id, q.Relation}
		for _, u := range append([]Userset{root}, s.below[root]...) {
			for _, r := range s.byResource[u] {
				if subjectMatches(q, r) {
					out = append(out, r)
				}
			}
		}
	}
	sort.Slice(out, func(i, j int) bool { return out[i].String() < out[j].String() })
	out = uniqueRelationships(out)
	if q.Limit > 0 && len(out) > q.Limit {
		out = out[:q.Limit]
	}
	return out, nil
}

func subjectMatches(q authz.RelationshipQuery, r authz.Relationship) bool {
	if q.SubjectType != "" && r.Subject.Object.Type != q.SubjectType {
		return false
	}
	if len(q.SubjectIDs) > 0 {
		found := false
		for _, id := range q.SubjectIDs {
			if id == r.Subject.Object.ID {
				found = true
				break
			}
		}
		if !found {
			return false
		}
	}
	if q.SubjectRelation != nil && r.Subject.Relation != *q.SubjectRelation {
		return false
	}
	return true
}

func uniqueRelationships(rels []authz.Relationship) []authz.Relationship {
	out := rels[:0]
	for i, r := range rels {
		if i == 0 || r != rels[i-1] {
			out = append(out, r)
		}
	}
	return out
}

// NestedResourceIDs implements authz.NestingIndex.
func (s *Snapshot) NestedResourceIDs(_ context.Context, _ authz.Reader, subjectType string, subjectIDs []string, subjectRelation, resourceType, relation string) ([]string, error) {
	return s.nestedResourceIDs(subjectType, subjectIDs, subjectRelation, resourceType, relation, nil), nil
}

// NestedResourceIDsAmong implements authz.NestingIndex.
func (s *Snapshot) NestedResourceIDsAmong(_ context.Context, _ authz.Reader, subjectType string, subjectIDs []string, subjectRelation, resourceType, relation string, among []string) ([]string, error) {
	return s.nestedResourceIDs(subjectType, subjectIDs, subjectRelation, resourceType, relation, among), nil
}

func (s *Snapshot) nestedResourceIDs(subjectType string, subjectIDs []string, subjectRelation, resourceType, relation string, among []string) []string {
	allowed := map[string]bool{}
	for _, id := range among {
		allowed[id] = true
	}
	found := map[string]bool{}
	consider := func(u Userset) {
		if u.Type == resourceType && u.Relation == relation && (among == nil || allowed[u.ID]) {
			found[u.ID] = true
		}
	}
	for _, sid := range subjectIDs {
		for _, r := range s.bySubject[Userset{subjectType, sid, subjectRelation}] {
			res := Userset{r.Resource.Type, r.Resource.ID, r.Relation}
			consider(res)
			for _, a := range s.above[res] {
				consider(a)
			}
		}
	}
	return sortedKeys(found)
}

func sortedKeys(set map[string]bool) []string {
	out := make([]string, 0, len(set))
	for id := range set {
		out = append(out, id)
	}
	sort.Strings(out)
	return out
}

// Materialized implements authz.PermissionIndex.
func (s *Snapshot) Materialized(resourceType, permission string) bool {
	return s.sets.Materialized(resourceType, permission)
}

// grantingSets lists the sets that grant permission on resource: the stored
// rows and the resource's own sets from the schema.
func (s *Snapshot) grantingSets(resource authz.ObjectRef, permission string) []Userset {
	out := append([]Userset(nil), s.granting[resource.String()+"#"+permission]...)
	for _, rel := range s.sets.Static(resource.Type, permission) {
		out = append(out, Userset{resource.Type, resource.ID, rel})
	}
	return out
}

// inSet reports whether subject is in set u: as the set itself, or named on
// it or on anything nested within it.
func (s *Snapshot) inSet(u Userset, subject authz.SubjectRef) bool {
	if subject.Relation != "" && u == (Userset{subject.Object.Type, subject.Object.ID, subject.Relation}) {
		return true
	}
	for _, v := range append([]Userset{u}, s.below[u]...) {
		for _, r := range s.byResource[v] {
			if r.Subject == subject {
				return true
			}
		}
	}
	return false
}

// HasPermission implements authz.PermissionIndex.
func (s *Snapshot) HasPermission(_ context.Context, _ authz.Reader, resource authz.ObjectRef, permission string, subject authz.SubjectRef) (bool, error) {
	for _, g := range s.grantingSets(resource, permission) {
		if s.inSet(g, subject) {
			return true, nil
		}
	}
	return false, nil
}

// memberOf lists every set the subject is in: directly, through nesting, or
// as itself when the subject is a userset.
func (s *Snapshot) memberOf(subject authz.SubjectRef) map[Userset]bool {
	out := map[Userset]bool{}
	for _, r := range s.bySubject[Userset{subject.Object.Type, subject.Object.ID, subject.Relation}] {
		res := Userset{r.Resource.Type, r.Resource.ID, r.Relation}
		out[res] = true
		for _, a := range s.above[res] {
			out[a] = true
		}
	}
	if subject.Relation != "" {
		out[Userset{subject.Object.Type, subject.Object.ID, subject.Relation}] = true
	}
	return out
}

// ResourcesWithPermission implements authz.PermissionIndex.
func (s *Snapshot) ResourcesWithPermission(_ context.Context, _ authz.Reader, resourceType, permission string, subject authz.SubjectRef) ([]string, error) {
	return s.resourcesWithPermission(resourceType, permission, subject, nil), nil
}

// ResourcesWithPermissionAmong implements authz.PermissionIndex.
func (s *Snapshot) ResourcesWithPermissionAmong(_ context.Context, _ authz.Reader, resourceType, permission string, subject authz.SubjectRef, among []string) ([]string, error) {
	return s.resourcesWithPermission(resourceType, permission, subject, among), nil
}

func (s *Snapshot) resourcesWithPermission(resourceType, permission string, subject authz.SubjectRef, among []string) []string {
	allowed := map[string]bool{}
	for _, id := range among {
		allowed[id] = true
	}
	found := map[string]bool{}
	member := s.memberOf(subject)
	static := map[string]bool{}
	for _, rel := range s.sets.Static(resourceType, permission) {
		static[rel] = true
	}
	for u := range member {
		for _, id := range s.bySet[resourceType+"#"+permission][u] {
			if among == nil || allowed[id] {
				found[id] = true
			}
		}
		if u.Type == resourceType && static[u.Relation] && (among == nil || allowed[u.ID]) {
			found[u.ID] = true
		}
	}
	return sortedKeys(found)
}

// SubjectsWithPermission implements authz.PermissionIndex.
func (s *Snapshot) SubjectsWithPermission(_ context.Context, _ authz.Reader, resource authz.ObjectRef, permission, subjectType, subjectRelation string) ([]string, error) {
	found := map[string]bool{}
	for _, g := range s.grantingSets(resource, permission) {
		for _, u := range append([]Userset{g}, s.below[g]...) {
			for _, r := range s.byResource[u] {
				if r.Subject.Object.Type == subjectType && r.Subject.Relation == subjectRelation {
					found[r.Subject.Object.ID] = true
				}
			}
			if subjectRelation != "" && u.Type == subjectType && u.Relation == subjectRelation {
				found[u.ID] = true
			}
		}
	}
	return sortedKeys(found), nil
}
