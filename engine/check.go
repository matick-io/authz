package engine

import (
	"context"

	"fmt"
	"github.com/matick-io/authz"

	"github.com/matick-io/authz/schema"
)

// CheckPermission reports whether subject holds permission (or relation) on
// resource. An unknown type, permission or subject type is authz.ErrInvalidArgument,
// never a silent false.
func (s *Service) CheckPermission(ctx context.Context, resource authz.ObjectRef, permission string, subject authz.SubjectRef) (bool, error) {
	req := authz.CheckPermissionRequest{Resource: resource, Permission: permission, Subject: subject}
	if err := req.Validate(); err != nil {
		return false, err
	}
	var result bool
	err := s.ds.View(ctx, func(r authz.Reader) error {
		if err := target(s.sch, resource.Type, permission, subject); err != nil {
			return err
		}
		res := s.newResolver(r)
		var err error
		result, err = res.check(ctx, resource, permission, subject, 0)
		return err
	})
	return result, err
}

// CheckBulkPermissions answers every request at one snapshot. A request that
// fails validation carries its error in its result; the others still answer.
func (s *Service) CheckBulkPermissions(ctx context.Context, requests []authz.CheckPermissionRequest) ([]authz.CheckPermissionResult, error) {
	results := make([]authz.CheckPermissionResult, len(requests))
	for i, req := range requests {
		results[i].Request = req
		results[i].Err = req.Validate()
	}
	err := s.ds.View(ctx, func(r authz.Reader) error {
		res := s.newResolver(r)
		for i := range results {
			if results[i].Err != nil {
				continue
			}
			req := results[i].Request
			if err := target(s.sch, req.Resource.Type, req.Permission, req.Subject); err != nil {
				results[i].Err = err
				continue
			}
			// AI: the tuple cache is shared across the batch, the memo is not:
			// a cycle cut in one question must not answer another.
			res.memo = map[string]memoEntry{}
			results[i].HasPermission, results[i].Err = res.check(ctx, req.Resource, req.Permission, req.Subject, 0)
			if results[i].Err != nil && ctx.Err() != nil {
				return ctx.Err()
			}
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return results, nil
}

// resolver answers point questions at one snapshot. AI: two caches, both
// scoped to the snapshot. tuples memoises each (resource, relation) read so
// a userset reached from several paths costs one query. memo records each
// (resource, relation, subject) question, and an entry that is present but not
// done marks a question still on the stack: re-entering it is a cycle in the
// relationship graph, which resolves to false on that path, as in Zanzibar.
type resolver struct {
	r        authz.Reader
	sch      *schema.Schema
	idx      authz.NestingIndex
	pidx     authz.PermissionIndex
	maxDepth int
	tuples   map[string][]authz.Relationship
	memo     map[string]memoEntry
}

type memoEntry struct {
	done   bool
	result bool
}

func (s *Service) newResolver(r authz.Reader) *resolver {
	return &resolver{r: r, sch: s.sch, idx: s.idx, pidx: s.pidx, maxDepth: s.maxDepth, tuples: map[string][]authz.Relationship{}, memo: map[string]memoEntry{}}
}

func (s *Service) materialized(typ, permission string) bool {
	return s.pidx != nil && s.pidx.Materialized(typ, permission)
}

func (c *resolver) relationTuples(ctx context.Context, res authz.ObjectRef, relation string) ([]authz.Relationship, error) {
	key := res.String() + "#" + relation
	if ts, ok := c.tuples[key]; ok {
		return ts, nil
	}
	ts, err := c.r.Relationships(ctx, authz.RelationshipQuery{ResourceType: res.Type, ResourceIDs: []string{res.ID}, Relation: relation})
	if err != nil {
		return nil, err
	}
	c.tuples[key] = ts
	return ts, nil
}

func (c *resolver) check(ctx context.Context, res authz.ObjectRef, relation string, subject authz.SubjectRef, depth int) (bool, error) {
	if depth > c.maxDepth {
		return false, authz.ErrMaxDepthExceeded
	}
	if err := ctx.Err(); err != nil {
		return false, err
	}
	key := res.String() + "#" + relation + "@" + subject.String()
	if e, ok := c.memo[key]; ok {
		if !e.done {
			return false, nil
		}
		return e.result, nil
	}
	c.memo[key] = memoEntry{}
	result, err := c.checkUncached(ctx, res, relation, subject, depth)
	if err != nil {
		delete(c.memo, key)
		return false, err
	}
	c.memo[key] = memoEntry{done: true, result: result}
	return result, nil
}

func (c *resolver) checkUncached(ctx context.Context, res authz.ObjectRef, relation string, subject authz.SubjectRef, depth int) (bool, error) {
	// A userset is a member of itself.
	if subject.Relation != "" && subject.Object == res && subject.Relation == relation {
		return true, nil
	}
	def := c.sch.Definition(res.Type)
	if def == nil {
		return false, nil
	}
	if _, ok := def.Relations[relation]; ok {
		if c.idx != nil {
			return c.checkRelationIndexed(ctx, res, relation, subject, depth)
		}
		return c.checkRelationWalking(ctx, res, relation, subject, depth)
	}
	if perm, ok := def.Permissions[relation]; ok {
		if c.pidx != nil && c.pidx.Materialized(res.Type, relation) {
			return c.pidx.HasPermission(ctx, c.r, res, relation, subject)
		}
		return c.eval(ctx, res, perm.Expr, subject, depth)
	}
	return false, nil
}

// checkRelationWalking follows nesting one hop at a time; each hop counts
// against the depth limit.
func (c *resolver) checkRelationWalking(ctx context.Context, res authz.ObjectRef, relation string, subject authz.SubjectRef, depth int) (bool, error) {
	ts, err := c.relationTuples(ctx, res, relation)
	if err != nil {
		return false, err
	}
	for _, t := range ts {
		if t.Subject == subject {
			return true, nil
		}
		if t.Subject.Relation == "" && t.Subject.Object.ID == authz.WildcardID &&
			t.Subject.Object.Type == subject.Object.Type && subject.Relation == "" {
			return true, nil
		}
	}
	for _, t := range ts {
		if t.Subject.Relation == "" {
			continue
		}
		ok, err := c.check(ctx, t.Subject.Object, t.Subject.Relation, subject, depth+1)
		if err != nil {
			return false, err
		}
		if ok {
			return true, nil
		}
	}
	return false, nil
}

// checkRelationIndexed asks the nesting index one question: is the subject
// named, as itself or by wildcard, on this relation or on any userset nested
// within it. The only recursion left is through usersets whose relation is a
// permission, which no tuple can name a member of.
func (c *resolver) checkRelationIndexed(ctx context.Context, res authz.ObjectRef, relation string, subject authz.SubjectRef, depth int) (bool, error) {
	ids := []string{subject.Object.ID}
	if subject.Relation == "" {
		ids = append(ids, authz.WildcardID)
	}
	subjectRelation := subject.Relation
	selector := authz.RelationshipQuery{ResourceType: res.Type, ResourceIDs: []string{res.ID}, Relation: relation}
	q := selector
	q.SubjectType, q.SubjectIDs, q.SubjectRelation, q.Limit = subject.Object.Type, ids, &subjectRelation, 1
	ts, err := c.idx.NestedRelationships(ctx, c.r, q)
	if err != nil {
		return false, err
	}
	if len(ts) > 0 {
		return true, nil
	}
	for _, pu := range c.sch.PermissionUsersets() {
		q := selector
		permission := pu.Relation
		q.SubjectType, q.SubjectRelation = pu.Type, &permission
		ts, err := c.idx.NestedRelationships(ctx, c.r, q)
		if err != nil {
			return false, err
		}
		for _, t := range ts {
			ok, err := c.check(ctx, t.Subject.Object, t.Subject.Relation, subject, depth+1)
			if err != nil {
				return false, err
			}
			if ok {
				return true, nil
			}
		}
	}
	return false, nil
}

func (c *resolver) eval(ctx context.Context, res authz.ObjectRef, e schema.Expr, subject authz.SubjectRef, depth int) (bool, error) {
	switch n := e.(type) {
	case *schema.ComputedUserset:
		return c.check(ctx, res, n.Relation, subject, depth+1)
	case *schema.Arrow:
		ts, err := c.relationTuples(ctx, res, n.Relation)
		if err != nil {
			return false, err
		}
		for _, t := range ts {
			if t.Subject.Object.ID == authz.WildcardID || !c.sch.Definition(t.Subject.Object.Type).Has(n.Target) {
				continue
			}
			ok, err := c.check(ctx, t.Subject.Object, n.Target, subject, depth+1)
			if err != nil {
				return false, err
			}
			if ok {
				return true, nil
			}
		}
		return false, nil
	case *schema.SetOp:
		switch n.Op {
		case schema.Union:
			for _, child := range n.Children {
				ok, err := c.eval(ctx, res, child, subject, depth)
				if err != nil || ok {
					return ok, err
				}
			}
			return false, nil
		case schema.Intersection:
			for _, child := range n.Children {
				ok, err := c.eval(ctx, res, child, subject, depth)
				if err != nil || !ok {
					return false, err
				}
			}
			return true, nil
		case schema.Exclusion:
			ok, err := c.eval(ctx, res, n.Children[0], subject, depth)
			if err != nil || !ok {
				return false, err
			}
			excluded, err := c.eval(ctx, res, n.Children[1], subject, depth)
			if err != nil {
				return false, err
			}
			return !excluded, nil
		}
	}
	return false, fmt.Errorf("authz: unknown expression node %T", e)
}
