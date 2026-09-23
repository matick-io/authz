// Package tests holds the validation files (samples/ and corpus/), the
// engine tests that need the DSL, the conformance tables, and the
// benchmarks. It is the one module that may depend on everything; the core
// stays dependency-free.
package tests

import (
	"errors"
	"strings"
	"testing"

	"github.com/matick-io/authz"
)

// errUnsupported is an answer a kind cannot give at all, such as SpiceDB at a
// data cycle; it is logged, never compared.
var errUnsupported = errors.New("unsupported by this kind")

func parseSubject(t *testing.T, where, s string) authz.SubjectRef {
	t.Helper()
	obj, relation, _ := strings.Cut(s, "#")
	typ, id, ok := strings.Cut(obj, ":")
	if !ok {
		t.Fatalf("%s: subject %q lacks ':'", where, s)
	}
	return authz.SubjectRef{Object: authz.ObjectRef{Type: typ, ID: id}, Relation: relation}
}

// report fails the test on an error, except an answer the kind cannot give
// at all (errUnsupported, such as SpiceDB at a data cycle), which is logged.
func report(t *testing.T, err error, format string, args ...any) {
	t.Helper()
	if errors.Is(err, errUnsupported) {
		t.Logf(format, args...)
		return
	}
	t.Errorf(format, args...)
}

// render writes a LookupSubjects result the way the assertions do.
func render(r *authz.LookupSubjectsResult) string {
	switch {
	case r.Wildcard && len(r.ExcludedSubjectIDs) > 0:
		return "*-" + strings.Join(r.ExcludedSubjectIDs, ",")
	case r.Wildcard:
		return "*"
	case len(r.SubjectIDs) == 0:
		return "none"
	}
	return strings.Join(r.SubjectIDs, ",")
}
