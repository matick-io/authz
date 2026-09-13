// Package tests holds the scenario suites (samples/), the engine tests that
// need the DSL, and the benchmarks. It is the one module that may depend on
// everything; the core stays dependency-free.
//
// AI: a sample is a directory of three line-oriented files, so no parser
// dependency is needed and the same files can be converted for other engines:
//
//	schema.zed         the schema DSL
//	relationships.txt  one relationship per line, SpiceDB tuple form:
//	                   project:p1#member@team:core#member
//	assertions.txt     one assertion per line, three kinds:
//	  check     project:p1#view@user:alice        true|false
//	  resources project#view@user:alice           p1,p2 | none
//	  subjects  project:p1#view user              alice,bob | none | * | *-hank,zed
//	  subjects  project:p1#view team#member       core,leads
//
// Lines starting with # are comments. Expected id lists are sorted.
package tests

import (
	"bufio"
	"context"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"testing"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/dsl"
	"github.com/matick-io/authz/engine"
	"github.com/matick-io/authz/schema"
)

// RunAllSamples runs every sample directory under root.
func RunAllSamples(t *testing.T, root string, open func(t *testing.T, sch *schema.Schema) (authz.Datastore, []engine.Option)) {
	entries, err := os.ReadDir(root)
	if err != nil {
		t.Fatal(err)
	}
	ran := 0
	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		dir := filepath.Join(root, e.Name())
		if _, err := os.Stat(filepath.Join(dir, "schema.zed")); err != nil {
			continue
		}
		ran++
		t.Run(e.Name(), func(t *testing.T) { RunSample(t, dir, open) })
	}
	if ran == 0 {
		t.Fatalf("no samples under %s", root)
	}
}

// RunSample loads and asserts one sample directory.
func RunSample(t *testing.T, dir string, open func(t *testing.T, sch *schema.Schema) (authz.Datastore, []engine.Option)) {
	ctx := context.Background()
	text, err := os.ReadFile(filepath.Join(dir, "schema.zed"))
	if err != nil {
		t.Fatal(err)
	}
	sch, err := dsl.Parse(string(text))
	if err != nil {
		t.Fatalf("schema: %v", err)
	}
	ds, opts := open(t, sch)
	svc, err := engine.New(ds, sch, opts...)
	if err != nil {
		t.Fatal(err)
	}
	var updates []authz.RelationshipUpdate
	forEachLine(t, filepath.Join(dir, "relationships.txt"), func(n int, line string) {
		r, err := authz.ParseRelationship(line)
		if err != nil {
			t.Fatalf("relationships.txt:%d: %v", n, err)
		}
		updates = append(updates, authz.RelationshipUpdate{Operation: authz.OperationCreate, Relationship: r})
	})
	if len(updates) > 0 {
		if err := svc.WriteRelationships(ctx, updates); err != nil {
			t.Fatalf("relationships: %v", err)
		}
	}
	if err := svc.ValidateStored(ctx); err != nil {
		t.Fatalf("stored relationships do not fit the schema: %v", err)
	}
	asserted := 0
	forEachLine(t, filepath.Join(dir, "assertions.txt"), func(n int, line string) {
		asserted++
		fields := strings.Fields(line)
		where := fmt.Sprintf("assertions.txt:%d", n)
		if len(fields) < 3 {
			t.Fatalf("%s: expected `kind target expectation`, got %q", where, line)
		}
		switch fields[0] {
		case "check":
			assertCheck(t, ctx, svc, where, fields[1], fields[2])
		case "resources":
			assertResources(t, ctx, svc, where, fields[1], fields[2])
		case "subjects":
			if len(fields) != 4 {
				t.Fatalf("%s: expected `subjects resource#permission type[#relation] expectation`, got %q", where, line)
			}
			assertSubjects(t, ctx, svc, where, fields[1], fields[2], fields[3])
		default:
			t.Fatalf("%s: unknown assertion kind %q", where, fields[0])
		}
	})
	if asserted == 0 {
		t.Fatalf("%s has no assertions", dir)
	}
}

func forEachLine(t *testing.T, path string, fn func(n int, line string)) {
	t.Helper()
	f, err := os.Open(path)
	if err != nil {
		t.Fatal(err)
	}
	defer f.Close()
	sc := bufio.NewScanner(f)
	for n := 1; sc.Scan(); n++ {
		line := strings.TrimSpace(sc.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		fn(n, line)
	}
	if err := sc.Err(); err != nil {
		t.Fatal(err)
	}
}

func parseSubject(t *testing.T, where, s string) authz.SubjectRef {
	t.Helper()
	obj, relation, _ := strings.Cut(s, "#")
	typ, id, ok := strings.Cut(obj, ":")
	if !ok {
		t.Fatalf("%s: subject %q lacks ':'", where, s)
	}
	return authz.SubjectRef{Object: authz.ObjectRef{Type: typ, ID: id}, Relation: relation}
}

func parseIDs(s string) []string {
	if s == "none" {
		return nil
	}
	ids := strings.Split(s, ",")
	sort.Strings(ids)
	return ids
}

func assertCheck(t *testing.T, ctx context.Context, svc *engine.Service, where, target, expectation string) {
	t.Helper()
	r, err := authz.ParseRelationship(target)
	if err != nil {
		t.Fatalf("%s: %v", where, err)
	}
	want := expectation == "true"
	if !want && expectation != "false" {
		t.Fatalf("%s: expected true or false, got %q", where, expectation)
	}
	got, err := svc.CheckPermission(ctx, r.Resource, r.Relation, r.Subject)
	if err != nil {
		t.Errorf("%s: check %s: %v", where, target, err)
		return
	}
	if got != want {
		t.Errorf("%s: check %s: got %v want %v", where, target, got, want)
	}
}

func assertResources(t *testing.T, ctx context.Context, svc *engine.Service, where, target, expectation string) {
	t.Helper()
	left, subject, ok := strings.Cut(target, "@")
	if !ok {
		t.Fatalf("%s: %q lacks '@'", where, target)
	}
	typ, permission, ok := strings.Cut(left, "#")
	if !ok {
		t.Fatalf("%s: %q lacks '#'", where, target)
	}
	got, err := svc.LookupResources(ctx, typ, permission, parseSubject(t, where, subject), 0)
	if err != nil {
		t.Errorf("%s: resources %s: %v", where, target, err)
		return
	}
	if want := parseIDs(expectation); strings.Join(got, ",") != strings.Join(want, ",") {
		t.Errorf("%s: resources %s: got [%s] want [%s]", where, target, strings.Join(got, ","), strings.Join(want, ","))
	}
}

func assertSubjects(t *testing.T, ctx context.Context, svc *engine.Service, where, target, subjectKind, expectation string) {
	t.Helper()
	r, err := authz.ParseRelationship(target + "@user:x")
	if err != nil {
		t.Fatalf("%s: %v", where, err)
	}
	subjectType, subjectRelation, _ := strings.Cut(subjectKind, "#")
	got, err := svc.LookupSubjects(ctx, r.Resource, r.Relation, subjectType, subjectRelation)
	if err != nil {
		t.Errorf("%s: subjects %s %s: %v", where, target, subjectKind, err)
		return
	}
	var wantWildcard bool
	var wantIDs, wantExcluded []string
	switch {
	case expectation == "*":
		wantWildcard = true
	case strings.HasPrefix(expectation, "*-"):
		wantWildcard = true
		wantExcluded = parseIDs(strings.TrimPrefix(expectation, "*-"))
	default:
		wantIDs = parseIDs(expectation)
	}
	if got.Wildcard != wantWildcard ||
		strings.Join(got.SubjectIDs, ",") != strings.Join(wantIDs, ",") ||
		strings.Join(got.ExcludedSubjectIDs, ",") != strings.Join(wantExcluded, ",") {
		t.Errorf("%s: subjects %s %s: got %s want %s", where, target, subjectKind, render(got), expectation)
	}
}

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
