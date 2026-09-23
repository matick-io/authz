// Package materialize is the generic core of the indexes that precompute
// what the engine would otherwise walk: the closure of userset nesting, after
// Zanzibar's Leopard, and permission sets, after AuthZed's Materialize.
// Nothing here is required; the engine is correct on a bare datastore and an
// index only makes it faster.
//
// What every datastore shares lives here: which permissions a schema lets a
// set represent (Materializable, Sets); the derivation of closure rows and
// set rows from relationships (Closure, Derivation); the comparison of a
// maintained index with a fresh derivation (Derive, Compare, Drift); the
// follower that feeds an index from the change log (Catchup, Follow); and
// Snapshot, an index that answers from a copy of the relationships, which is
// the reference every datastore's own index is held to and the index of the
// memory datastore. A datastore adds storage, incremental maintenance inside
// its own transactions, and native queries; see datastore/postgres.
package materialize

import (
	"errors"
	"fmt"
	"sort"
	"strings"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/schema"
)

// ErrNotMaterializable is returned for a permission whose rewrite the
// permission sets cannot represent: one with a wildcard, an intersection or
// an exclusion on its path, or a userset of a permission.
var ErrNotMaterializable = errors.New("materialize: permission cannot be materialised")

// maxGrantDepth bounds arrow recursion while deriving sets.
const maxGrantDepth = 50

// Sets is the configuration of the permission sets: which permissions of a
// schema are materialised, and what the schema says about each.
//
// AI: Materialize's model in two parts. A stored row says which usersets
// grant a materialised permission on a resource: for `permission view =
// member + owner + parent->view` on folder:f, the sets are folder:f#member,
// folder:f#owner and, through the arrow, every set that grants view on f's
// parents. Only the sets reached through an arrow are stored; a resource's
// own sets are schema and are added at query time (Static), which is also
// what makes a resource with no relationships answer like the walk does (a
// userset is a member of itself). Who is in a set is not stored again: it is
// the relationships of the set and of everything nested within it, which
// the closure answers.
type Sets struct {
	sch        *schema.Schema
	configured map[string]bool            // "type#permission"
	byType     map[string][]string        // type -> configured permissions
	arrows     map[string]map[string]bool // type -> relation walked by an arrow on some materialised path
	static     map[string][]string        // "type#permission" -> the resource's own sets
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

// NewSets configures the named permissions, written as type#permission. Each
// must be materialisable (Materializable lists those that are); otherwise
// ErrNotMaterializable. No names is a valid, empty configuration.
func NewSets(sch *schema.Schema, permissions ...string) (*Sets, error) {
	if sch == nil {
		return nil, fmt.Errorf("%w: nil schema", authz.ErrInvalidArgument)
	}
	s := &Sets{sch: sch, configured: map[string]bool{}, byType: map[string][]string{}, arrows: map[string]map[string]bool{}, static: map[string][]string{}}
	for _, name := range permissions {
		typ, perm, ok := strings.Cut(name, "#")
		if !ok {
			return nil, fmt.Errorf("%w: %q is not type#permission", authz.ErrInvalidArgument, name)
		}
		if err := validatePath(sch, typ, perm, map[string]bool{}, s.arrows); err != nil {
			return nil, err
		}
		if !s.configured[name] {
			s.configured[name] = true
			s.byType[typ] = append(s.byType[typ], perm)
			s.static[name] = staticRefs(sch, typ, perm, map[string]bool{})
		}
	}
	return s, nil
}

// Schema returns the schema the sets were configured for.
func (s *Sets) Schema() *schema.Schema { return s.sch }

// Empty reports whether no permission is configured.
func (s *Sets) Empty() bool { return s == nil || len(s.configured) == 0 }

// Materialized reports whether resourceType#permission is configured.
func (s *Sets) Materialized(resourceType, permission string) bool {
	return s != nil && s.configured[resourceType+"#"+permission]
}

// Configured lists the configured permissions, sorted as type#permission.
func (s *Sets) Configured() []string {
	var out []string
	for name := range s.configured {
		out = append(out, name)
	}
	sort.Strings(out)
	return out
}

// Permissions lists the configured permissions of a type.
func (s *Sets) Permissions(resourceType string) []string {
	if s == nil {
		return nil
	}
	return s.byType[resourceType]
}

// Types lists, sorted, the types with a configured permission.
func (s *Sets) Types() []string {
	var out []string
	for typ := range s.byType {
		out = append(out, typ)
	}
	sort.Strings(out)
	return out
}

// Static lists the resource's own sets for a permission: the permission
// itself, the relations its rewrite references on the same object, and the
// same-object permissions it references, transitively. They are schema, so
// they are never stored; every query adds them for the resource it names.
// The slice is never nil for a configured permission.
func (s *Sets) Static(resourceType, permission string) []string {
	if s == nil {
		return []string{}
	}
	if refs := s.static[resourceType+"#"+permission]; refs != nil {
		return refs
	}
	return []string{}
}

// WalksArrow reports whether an arrow on some materialised path walks
// resourceType#relation, so a change to that relation must propagate to the
// resources above it.
func (s *Sets) WalksArrow(resourceType, relation string) bool {
	return s != nil && s.arrows[resourceType][relation]
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
		case *schema.Nil:
		}
	}
	walk(def.Permissions[perm].Expr)
	return out
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
		case *schema.Nil:
			return nil
		}
		return fmt.Errorf("%w: %s: unknown expression %T", ErrNotMaterializable, key, e)
	}
	return walk(p.Expr)
}

func validateRelation(sch *schema.Schema, typ string, rel *schema.Relation) error {
	if via, ok := wildcardReachable(sch, typ, rel, map[string]bool{}); ok {
		return fmt.Errorf("%w: %s#%s reaches the wildcard %s", ErrNotMaterializable, typ, rel.Name, via)
	}
	for _, a := range rel.AllowedSubjects {
		if a.Relation != "" {
			if _, isPerm := sch.Definition(a.Type).Permissions[a.Relation]; isPerm {
				return fmt.Errorf("%w: %s#%s allows %s#%s, a userset of a permission", ErrNotMaterializable, typ, rel.Name, a.Type, a.Relation)
			}
		}
	}
	return nil
}

// wildcardReachable reports whether a relation admits a wildcard directly or
// through any userset it admits, however deep, naming the path. AI: a set
// has a row per concrete member, so a wildcard anywhere below a relation
// would go unrepresented; SpiceDB draws the same line one step earlier by
// refusing such a schema outright.
func wildcardReachable(sch *schema.Schema, typ string, rel *schema.Relation, visiting map[string]bool) (string, bool) {
	key := typ + "#" + rel.Name
	if visiting[key] {
		return "", false
	}
	visiting[key] = true
	for _, a := range rel.AllowedSubjects {
		if a.Wildcard {
			return a.Type + ":* on " + key, true
		}
		if a.Relation == "" {
			continue
		}
		if sub, ok := sch.Definition(a.Type).Relations[a.Relation]; ok {
			if via, ok := wildcardReachable(sch, a.Type, sub, visiting); ok {
				return via + " via " + key, true
			}
		}
	}
	return "", false
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
