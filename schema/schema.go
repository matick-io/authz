// Package schema is the model the engine runs on: object types, the relations
// they store, and the permissions computed from them. A schema is built in
// code with Build, Def, Rel and Perm, or parsed from the SpiceDB DSL by the
// separate dsl module, which produces the same value.
package schema

import (
	"fmt"
	"regexp"
)

// Schema is a validated set of definitions. Build is the only way to make one.
type Schema struct {
	Definitions map[string]*Definition
	Order       []string // definition names in declaration order

	permissionUsersets []AllowedSubject
}

// Definition is one object type.
type Definition struct {
	Name        string
	Relations   map[string]*Relation
	Permissions map[string]*Permission
	Order       []string // relation and permission names in declaration order

	members []Member
}

// Member is a Relation or a Permission, as passed to Def.
type Member interface{ member() }

// Relation is a stored relation and the subject types it accepts.
type Relation struct {
	Name            string
	AllowedSubjects []AllowedSubject
}

// AllowedSubject is one entry of a relation's subject type list: an object
// (`user`), a userset (`team#member`) or a wildcard (`user:*`).
type AllowedSubject struct {
	Type     string
	Relation string
	Wildcard bool
}

// Permission is a computed relation.
type Permission struct {
	Name string
	Expr Expr
}

func (*Relation) member()   {}
func (*Permission) member() {}

// Expr is a permission rewrite node: ComputedUserset, Arrow, SetOp or Nil.
type Expr interface{ expr() }

// ComputedUserset references a relation or permission on the same object.
type ComputedUserset struct{ Relation string }

// Nil is the empty set, SpiceDB's `nil`: a permission nobody holds, or a
// branch that contributes nothing.
type Nil struct{}

// Arrow walks Relation's subjects and evaluates Target on each of them.
type Arrow struct {
	Relation string
	Target   string
}

// SetOp combines children. Exclusion always has exactly two children.
type SetOp struct {
	Op       Op
	Children []Expr
}

// Op is a set operator.
type Op int

const (
	Union Op = iota + 1
	Intersection
	Exclusion
)

func (*ComputedUserset) expr() {}
func (*Arrow) expr()           {}
func (*SetOp) expr()           {}
func (*Nil) expr()             {}

// Nothing is the empty set (see Nil).
func Nothing() Expr { return &Nil{} }

// Error reports a validation failure, or a parse failure with its source
// position when it comes from the dsl module.
type Error struct {
	Line, Col int
	Msg       string
}

func (e *Error) Error() string {
	if e.Line == 0 {
		return "schema: " + e.Msg
	}
	return fmt.Sprintf("schema: line %d col %d: %s", e.Line, e.Col, e.Msg)
}

// NameRe is the shape of a relation or permission name: lowercase letters,
// digits and underscores, starting with a letter, at most 64 characters.
var NameRe = regexp.MustCompile(`^[a-z]([a-z0-9_]{0,62}[a-z0-9])?$`)

// TypeNameRe is the shape of an object type name: a name as NameRe has it,
// optionally under namespaces separated by '/', as in SpiceDB (acme/user).
var TypeNameRe = regexp.MustCompile(`^([a-z]([a-z0-9_]{0,62}[a-z0-9])?/)*[a-z]([a-z0-9_]{0,62}[a-z0-9])?$`)

// Def declares an object type with its relations and permissions.
func Def(name string, members ...Member) *Definition {
	return &Definition{Name: name, members: members}
}

// Rel declares a stored relation and the subjects it accepts.
func Rel(name string, subjects ...AllowedSubject) *Relation {
	return &Relation{Name: name, AllowedSubjects: subjects}
}

// Perm declares a computed permission.
func Perm(name string, expr Expr) *Permission {
	return &Permission{Name: name, Expr: expr}
}

// Subject allows plain objects of a type: `user`.
func Subject(typ string) AllowedSubject { return AllowedSubject{Type: typ} }

// Userset allows every subject holding relation on an object of a type:
// `team#member`.
func Userset(typ, relation string) AllowedSubject {
	return AllowedSubject{Type: typ, Relation: relation}
}

// Wildcard allows every object of a type at once: `user:*`.
func Wildcard(typ string) AllowedSubject { return AllowedSubject{Type: typ, Wildcard: true} }

// Ref references a relation or permission on the same object.
func Ref(name string) Expr { return &ComputedUserset{Relation: name} }

// Via is the arrow `relation->target`: for each subject of relation, target
// evaluated on that subject.
func Via(relation, target string) Expr { return &Arrow{Relation: relation, Target: target} }

// UnionOf is `a + b + ...`.
func UnionOf(children ...Expr) Expr { return &SetOp{Op: Union, Children: children} }

// IntersectionOf is `a & b & ...`.
func IntersectionOf(children ...Expr) Expr { return &SetOp{Op: Intersection, Children: children} }

// ExclusionOf is `a - b`.
func ExclusionOf(left, right Expr) Expr { return &SetOp{Op: Exclusion, Children: []Expr{left, right}} }

// Build assembles and validates a schema. Every name must be well formed and
// unique within its scope, every reference must resolve, arrows must start
// from a relation that allows no wildcard, and no permission may be defined
// in terms of itself.
func Build(defs ...*Definition) (*Schema, error) {
	s := &Schema{Definitions: map[string]*Definition{}}
	for _, d := range defs {
		if !TypeNameRe.MatchString(d.Name) {
			return nil, &Error{Msg: fmt.Sprintf("definition name %q must be lowercase letters, digits and underscores, starting with a letter, at most 64 characters per namespace segment", d.Name)}
		}
		if _, dup := s.Definitions[d.Name]; dup {
			return nil, &Error{Msg: fmt.Sprintf("definition %q declared twice", d.Name)}
		}
		built, err := buildDefinition(d)
		if err != nil {
			return nil, err
		}
		s.Definitions[d.Name] = built
		s.Order = append(s.Order, d.Name)
	}
	if err := s.validate(); err != nil {
		return nil, err
	}
	s.collectPermissionUsersets()
	return s, nil
}

func buildDefinition(d *Definition) (*Definition, error) {
	out := &Definition{Name: d.Name, Relations: map[string]*Relation{}, Permissions: map[string]*Permission{}}
	for _, m := range d.members {
		var name string
		switch m := m.(type) {
		case *Relation:
			name = m.Name
		case *Permission:
			name = m.Name
		default:
			return nil, &Error{Msg: fmt.Sprintf("definition %s: unknown member %T", d.Name, m)}
		}
		if !NameRe.MatchString(name) {
			return nil, &Error{Msg: fmt.Sprintf("definition %s: name %q must be lowercase letters, digits and underscores, starting with a letter, at most 64 characters", d.Name, name)}
		}
		if out.Has(name) {
			return nil, &Error{Msg: fmt.Sprintf("%q is declared twice on %s", name, d.Name)}
		}
		switch m := m.(type) {
		case *Relation:
			out.Relations[name] = m
		case *Permission:
			if m.Expr == nil {
				return nil, &Error{Msg: fmt.Sprintf("permission %s#%s has no expression", d.Name, name)}
			}
			out.Permissions[name] = m
		}
		out.Order = append(out.Order, name)
	}
	return out, nil
}

// Definition returns the definition of a type, or nil.
func (s *Schema) Definition(typ string) *Definition {
	if s == nil {
		return nil
	}
	return s.Definitions[typ]
}

// PermissionUsersets lists every `type#name` a relation may hold where name
// is a permission rather than a stored relation, deduplicated, in declaration
// order. AI: the nesting index only follows stored relations, because a
// permission's members come from its rewrite and not from tuples, so the
// engine resolves these few usersets itself. Most schemas have none.
func (s *Schema) PermissionUsersets() []AllowedSubject {
	return s.permissionUsersets
}

func (s *Schema) collectPermissionUsersets() {
	seen := map[AllowedSubject]bool{}
	for _, name := range s.Order {
		d := s.Definitions[name]
		for _, relName := range d.Order {
			rel, ok := d.Relations[relName]
			if !ok {
				continue
			}
			for _, a := range rel.AllowedSubjects {
				if a.Relation == "" || seen[a] {
					continue
				}
				if _, isPerm := s.Definitions[a.Type].Permissions[a.Relation]; isPerm {
					seen[a] = true
					s.permissionUsersets = append(s.permissionUsersets, a)
				}
			}
		}
	}
}

// Has reports whether name is a relation or permission on d.
func (d *Definition) Has(name string) bool {
	if d == nil {
		return false
	}
	_, r := d.Relations[name]
	_, p := d.Permissions[name]
	return r || p
}

// Allows reports whether the relation accepts a subject of the given type and
// subject relation. wildcard asks about `type:*`.
func (r *Relation) Allows(subjectType, subjectRelation string, wildcard bool) bool {
	for _, a := range r.AllowedSubjects {
		if a.Type != subjectType {
			continue
		}
		if wildcard {
			if a.Wildcard {
				return true
			}
			continue
		}
		if !a.Wildcard && a.Relation == subjectRelation {
			return true
		}
	}
	return false
}

// SubjectTypes lists the distinct object types a relation may hold, wildcards
// included, usersets reduced to their object type.
func (r *Relation) SubjectTypes() []string {
	seen := map[string]bool{}
	var out []string
	for _, a := range r.AllowedSubjects {
		if !seen[a.Type] {
			seen[a.Type] = true
			out = append(out, a.Type)
		}
	}
	return out
}

func (s *Schema) validate() error {
	for _, name := range s.Order {
		d := s.Definitions[name]
		for _, memberName := range d.Order {
			if rel, ok := d.Relations[memberName]; ok {
				if err := s.validateRelation(d, rel); err != nil {
					return err
				}
			}
			if perm, ok := d.Permissions[memberName]; ok {
				if err := s.validateExpr(d, perm.Name, perm.Expr); err != nil {
					return err
				}
			}
		}
	}
	return s.validateNoPermissionCycles()
}

func (s *Schema) validateRelation(d *Definition, rel *Relation) error {
	if len(rel.AllowedSubjects) == 0 {
		return &Error{Msg: fmt.Sprintf("relation %s#%s allows no subject types", d.Name, rel.Name)}
	}
	seen := map[AllowedSubject]bool{}
	for _, a := range rel.AllowedSubjects {
		if seen[a] {
			return &Error{Msg: fmt.Sprintf("relation %s#%s lists subject type %s twice", d.Name, rel.Name, a.String())}
		}
		seen[a] = true
		if a.Wildcard && a.Relation != "" {
			return &Error{Msg: fmt.Sprintf("relation %s#%s: a wildcard subject cannot carry a relation", d.Name, rel.Name)}
		}
		target := s.Definitions[a.Type]
		if target == nil {
			return &Error{Msg: fmt.Sprintf("relation %s#%s references undefined type %q", d.Name, rel.Name, a.Type)}
		}
		if a.Relation != "" && !target.Has(a.Relation) {
			return &Error{Msg: fmt.Sprintf("relation %s#%s references %s#%s, which is not defined", d.Name, rel.Name, a.Type, a.Relation)}
		}
	}
	return nil
}

func (s *Schema) validateExpr(d *Definition, perm string, e Expr) error {
	switch n := e.(type) {
	case *ComputedUserset:
		if n.Relation == perm {
			return &Error{Msg: fmt.Sprintf("permission %s#%s references itself", d.Name, perm)}
		}
		if !d.Has(n.Relation) {
			return &Error{Msg: fmt.Sprintf("permission %s#%s references %q, which is not defined on %s", d.Name, perm, n.Relation, d.Name)}
		}
	case *Arrow:
		rel, ok := d.Relations[n.Relation]
		if !ok {
			if _, isPerm := d.Permissions[n.Relation]; isPerm {
				return &Error{Msg: fmt.Sprintf("permission %s#%s: arrow %s->%s must start from a relation, not a permission", d.Name, perm, n.Relation, n.Target)}
			}
			return &Error{Msg: fmt.Sprintf("permission %s#%s: arrow references undefined relation %q", d.Name, perm, n.Relation)}
		}
		found := false
		for _, a := range rel.AllowedSubjects {
			if a.Wildcard {
				return &Error{Msg: fmt.Sprintf("permission %s#%s: arrow %s->%s cannot walk a relation that allows a wildcard", d.Name, perm, n.Relation, n.Target)}
			}
			if s.Definitions[a.Type].Has(n.Target) {
				found = true
			}
		}
		if !found {
			return &Error{Msg: fmt.Sprintf("permission %s#%s: arrow %s->%s: no subject type of %s defines %q", d.Name, perm, n.Relation, n.Target, n.Relation, n.Target)}
		}
	case *Nil:
		return nil
	case *SetOp:
		switch {
		case n.Op == Exclusion && len(n.Children) != 2:
			return &Error{Msg: fmt.Sprintf("permission %s#%s: exclusion takes exactly two operands", d.Name, perm)}
		case (n.Op == Union || n.Op == Intersection) && len(n.Children) == 0:
			return &Error{Msg: fmt.Sprintf("permission %s#%s: empty set operation", d.Name, perm)}
		case n.Op != Union && n.Op != Intersection && n.Op != Exclusion:
			return &Error{Msg: fmt.Sprintf("permission %s#%s: unknown set operator %d", d.Name, perm, n.Op)}
		}
		for _, c := range n.Children {
			if err := s.validateExpr(d, perm, c); err != nil {
				return err
			}
		}
	default:
		return &Error{Msg: fmt.Sprintf("permission %s#%s: unknown expression node %T", d.Name, perm, e)}
	}
	return nil
}

// validateNoPermissionCycles rejects permissions that reach themselves through
// ComputedUserset references on the same type; those never terminate.
func (s *Schema) validateNoPermissionCycles() error {
	const (
		white = iota
		grey
		black
	)
	for _, name := range s.Order {
		d := s.Definitions[name]
		colour := map[string]int{}
		var visit func(p string) error
		visit = func(p string) error {
			switch colour[p] {
			case grey:
				return &Error{Msg: fmt.Sprintf("permission %s#%s is defined in terms of itself", d.Name, p)}
			case black:
				return nil
			}
			colour[p] = grey
			for _, ref := range localRefs(d.Permissions[p].Expr) {
				if _, isPerm := d.Permissions[ref]; isPerm {
					if err := visit(ref); err != nil {
						return err
					}
				}
			}
			colour[p] = black
			return nil
		}
		for _, p := range d.Order {
			if _, isPerm := d.Permissions[p]; isPerm {
				if err := visit(p); err != nil {
					return err
				}
			}
		}
	}
	return nil
}

func localRefs(e Expr) []string {
	switch n := e.(type) {
	case *ComputedUserset:
		return []string{n.Relation}
	case *SetOp:
		var out []string
		for _, c := range n.Children {
			out = append(out, localRefs(c)...)
		}
		return out
	}
	return nil
}

// String renders the allowed subject in DSL form.
func (a AllowedSubject) String() string {
	switch {
	case a.Wildcard:
		return a.Type + ":*"
	case a.Relation != "":
		return a.Type + "#" + a.Relation
	}
	return a.Type
}
