package engine

import (
	"context"

	"fmt"
	"github.com/matick-io/authz"

	"github.com/matick-io/authz/schema"
)

// ExpandPermissionTree returns the rewrite of permission on resource as a tree
// whose leaves are the subjects each relation names. Usersets appear as leaf
// subjects and are not expanded further, as in SpiceDB; arrows are followed.
func (s *Service) ExpandPermissionTree(ctx context.Context, resource authz.ObjectRef, permission string) (*authz.PermissionTree, error) {
	if err := resource.Validate(); err != nil {
		return nil, err
	}
	if !authz.ValidName(permission) {
		return nil, fmt.Errorf("%w: permission %q", authz.ErrInvalidArgument, permission)
	}
	var out *authz.PermissionTree
	err := s.ds.View(ctx, func(r authz.Reader) error {
		def := s.sch.Definition(resource.Type)
		if def == nil {
			return fmt.Errorf("%w: unknown object type %q", authz.ErrInvalidArgument, resource.Type)
		}
		if !def.Has(permission) {
			return fmt.Errorf("%w: %s has no relation or permission %q", authz.ErrInvalidArgument, resource.Type, permission)
		}
		e := &expander{resolver: s.newResolver(r), onPath: map[string]bool{}}
		var err error
		out, err = e.tree(ctx, resource, permission, 0)
		return err
	})
	return out, err
}

type expander struct {
	*resolver
	onPath map[string]bool
}

func (e *expander) tree(ctx context.Context, res authz.ObjectRef, relation string, depth int) (*authz.PermissionTree, error) {
	if depth > e.maxDepth {
		return nil, authz.ErrMaxDepthExceeded
	}
	if err := ctx.Err(); err != nil {
		return nil, err
	}
	node := &authz.PermissionTree{Resource: res, Relation: relation, Operation: authz.TreeLeaf}
	key := res.String() + "#" + relation
	if e.onPath[key] {
		// A cycle through arrows; the subjects are already on the path above.
		return node, nil
	}
	e.onPath[key] = true
	defer delete(e.onPath, key)

	def := e.sch.Definition(res.Type)
	if def == nil {
		return node, nil
	}
	if _, ok := def.Relations[relation]; ok {
		ts, err := e.relationTuples(ctx, res, relation)
		if err != nil {
			return nil, err
		}
		node.Subjects = make([]authz.SubjectRef, 0, len(ts))
		for _, t := range ts {
			node.Subjects = append(node.Subjects, t.Subject)
		}
		return node, nil
	}
	if perm, ok := def.Permissions[relation]; ok {
		return e.exprTree(ctx, res, relation, perm.Expr, depth)
	}
	return node, nil
}

func (e *expander) exprTree(ctx context.Context, res authz.ObjectRef, permission string, x schema.Expr, depth int) (*authz.PermissionTree, error) {
	switch n := x.(type) {
	case *schema.ComputedUserset:
		return e.tree(ctx, res, n.Relation, depth+1)
	case *schema.Arrow:
		node := &authz.PermissionTree{Resource: res, Relation: permission, Operation: authz.TreeUnion}
		ts, err := e.relationTuples(ctx, res, n.Relation)
		if err != nil {
			return nil, err
		}
		for _, t := range ts {
			if t.Subject.Object.ID == authz.WildcardID || !e.sch.Definition(t.Subject.Object.Type).Has(n.Target) {
				continue
			}
			child, err := e.tree(ctx, t.Subject.Object, n.Target, depth+1)
			if err != nil {
				return nil, err
			}
			node.Children = append(node.Children, child)
		}
		return node, nil
	case *schema.SetOp:
		node := &authz.PermissionTree{Resource: res, Relation: permission}
		switch n.Op {
		case schema.Union:
			node.Operation = authz.TreeUnion
		case schema.Intersection:
			node.Operation = authz.TreeIntersection
		case schema.Exclusion:
			node.Operation = authz.TreeExclusion
		}
		for _, child := range n.Children {
			sub, err := e.exprTree(ctx, res, permission, child, depth)
			if err != nil {
				return nil, err
			}
			node.Children = append(node.Children, sub)
		}
		return node, nil
	}
	return nil, fmt.Errorf("authz: unknown expression node %T", x)
}
