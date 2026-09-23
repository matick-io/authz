package authz

import (
	"fmt"
	"regexp"
	"strings"
)

// ObjectRef names one object: a type from the schema and an id.
type ObjectRef struct {
	Type string
	ID   string
}

// String renders the SpiceDB form, type:id.
func (o ObjectRef) String() string { return o.Type + ":" + o.ID }

// SubjectRef is an object, or a userset (every subject holding Relation on the
// object) when Relation is set.
type SubjectRef struct {
	Object   ObjectRef
	Relation string
}

// String renders the SpiceDB form, type:id or type:id#relation.
func (s SubjectRef) String() string {
	if s.Relation == "" {
		return s.Object.String()
	}
	return s.Object.String() + "#" + s.Relation
}

// Relationship is one tuple: Subject holds Relation on Resource.
type Relationship struct {
	Resource ObjectRef
	Relation string
	Subject  SubjectRef
}

// String renders the SpiceDB tuple form, type:id#relation@type:id[#relation].
func (r Relationship) String() string {
	return r.Resource.String() + "#" + r.Relation + "@" + r.Subject.String()
}

// IsNesting reports whether the relationship nests one userset within
// another: its subject is a userset. Indexes care about exactly these.
func (r Relationship) IsNesting() bool { return r.Subject.Relation != "" }

// WildcardID is the subject id that stands for every object of its type.
const WildcardID = "*"

// ParseRelationship reads the SpiceDB tuple form Relationship.String produces.
func ParseRelationship(s string) (Relationship, error) {
	left, right, ok := strings.Cut(s, "@")
	if !ok {
		return Relationship{}, fmt.Errorf("%w: relationship %q lacks '@'", ErrInvalidArgument, s)
	}
	res, rel, ok := strings.Cut(left, "#")
	if !ok {
		return Relationship{}, fmt.Errorf("%w: relationship %q lacks '#' before '@'", ErrInvalidArgument, s)
	}
	resource, err := parseObject(res)
	if err != nil {
		return Relationship{}, err
	}
	subjObj, subjRel, _ := strings.Cut(right, "#")
	subject, err := parseObject(subjObj)
	if err != nil {
		return Relationship{}, err
	}
	// SpiceDB writes a subject without a relation as user:x#... in places.
	if subjRel == "..." {
		subjRel = ""
	}
	r := Relationship{Resource: resource, Relation: rel, Subject: SubjectRef{Object: subject, Relation: subjRel}}
	return r, r.Validate()
}

func parseObject(s string) (ObjectRef, error) {
	typ, id, ok := strings.Cut(s, ":")
	if !ok {
		return ObjectRef{}, fmt.Errorf("%w: object %q lacks ':'", ErrInvalidArgument, s)
	}
	return ObjectRef{Type: typ, ID: id}, nil
}

var (
	nameRe     = regexp.MustCompile(`^[a-z]([a-z0-9_]{0,62}[a-z0-9])?$`)
	typeNameRe = regexp.MustCompile(`^([a-z]([a-z0-9_]{0,62}[a-z0-9])?/)*[a-z]([a-z0-9_]{0,62}[a-z0-9])?$`)
	objectIDRe = regexp.MustCompile(`^[a-zA-Z0-9/_|\-=+]+$`)
)

// MaxObjectIDLength is the longest object id accepted, as in SpiceDB.
const MaxObjectIDLength = 1024

// ValidName reports whether s is a legal relation or permission name:
// lowercase, digits and underscores, starting with a letter, 1-64 chars.
func ValidName(s string) bool { return nameRe.MatchString(s) }

// ValidTypeName reports whether s is a legal object type name: a name as
// ValidName has it, optionally under namespaces separated by '/', as in
// SpiceDB (acme/user).
func ValidTypeName(s string) bool { return typeNameRe.MatchString(s) }

// ValidObjectID reports whether s is a legal object id (the SpiceDB charset).
func ValidObjectID(s string) bool {
	return len(s) <= MaxObjectIDLength && objectIDRe.MatchString(s)
}

// Validate checks the type and id are well formed.
func (o ObjectRef) Validate() error {
	if !ValidTypeName(o.Type) {
		return fmt.Errorf("%w: object type %q", ErrInvalidArgument, o.Type)
	}
	if !ValidObjectID(o.ID) {
		return fmt.Errorf("%w: object id %q", ErrInvalidArgument, o.ID)
	}
	return nil
}

// Validate checks the subject is well formed; a wildcard may carry no relation.
func (s SubjectRef) Validate() error {
	if s.Object.ID == WildcardID {
		if !ValidTypeName(s.Object.Type) {
			return fmt.Errorf("%w: subject type %q", ErrInvalidArgument, s.Object.Type)
		}
		if s.Relation != "" {
			return fmt.Errorf("%w: wildcard subject %s cannot carry a relation", ErrInvalidArgument, s)
		}
		return nil
	}
	if err := s.Object.Validate(); err != nil {
		return err
	}
	if s.Relation != "" && !ValidName(s.Relation) {
		return fmt.Errorf("%w: subject relation %q", ErrInvalidArgument, s.Relation)
	}
	return nil
}

// Validate checks every part of the relationship is well formed. It does not
// consult a schema; the engine does that.
func (r Relationship) Validate() error {
	if err := r.Resource.Validate(); err != nil {
		return err
	}
	if !ValidName(r.Relation) {
		return fmt.Errorf("%w: relation %q", ErrInvalidArgument, r.Relation)
	}
	return r.Subject.Validate()
}
