package tests

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"testing"

	"gopkg.in/yaml.v3"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/dsl"
	"github.com/matick-io/authz/schema"
)

// AI: validation files, SpiceDB's format for a schema, its relationships,
// its assertions and the subjects each object expands to. Our own samples
// (samples/) and SpiceDB's integration corpus (corpus/spicedb, see NOTICE
// there) are the same format and run through the same code, on every kind.
// After the assertions and the validation block, a consistency pass mirrors
// SpiceDB's suite: every (resource, relation or permission, subject) pair
// the file gives rise to is checked, in bulk, and the lookups in both
// directions must return exactly the pairs that checked true. The matrices
// of every kind are then compared with the first kind's. A file using
// caveats, expiration or intersection arrows, which the engine does not
// have, is skipped with the reason; a schema commented `// engine-only:`
// runs on the engine only.
//
// The relation paths in a validation block's `is <...>` part are not
// checked here; SpiceDB's tooling checks them, and the samples write the
// permission itself there.

type validationFile struct {
	Schema        string `yaml:"schema"`
	Relationships string `yaml:"relationships"`
	Assertions    struct {
		True     []string `yaml:"assertTrue"`
		False    []string `yaml:"assertFalse"`
		Caveated []string `yaml:"assertCaveated"`
	} `yaml:"assertions"`
	Validation map[string][]string `yaml:"validation"`
}

// unsupportedBy names the SpiceDB feature a file needs that the engine lacks.
func unsupportedBy(f *validationFile) string {
	switch {
	case strings.Contains(f.Schema, "caveat ") || strings.Contains(f.Schema, " with "):
		return "caveats"
	case strings.Contains(f.Schema, "expiration"):
		return "expiration"
	case regexp.MustCompile(`\.(all|any)\(`).MatchString(f.Schema):
		return "intersection arrows"
	case len(f.Assertions.Caveated) > 0:
		return "caveated assertions"
	}
	for _, a := range append(append([]string{}, f.Assertions.True...), f.Assertions.False...) {
		if strings.Contains(a, " with ") {
			return "caveat context"
		}
	}
	return ""
}

func fileLines(block string) []string {
	var out []string
	for _, line := range strings.Split(block, "\n") {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "//") || strings.HasPrefix(line, "#") {
			continue
		}
		out = append(out, line)
	}
	return out
}

// engineOnly reports the reason a schema's comments give for running on the
// engine only.
func engineOnly(schemaText string) (string, bool) {
	for _, line := range strings.Split(schemaText, "\n") {
		if rest, ok := strings.CutPrefix(strings.TrimSpace(line), "// engine-only:"); ok {
			return strings.TrimSpace(rest), true
		}
	}
	return "", false
}

type checkMatrix map[string]string // resource#member@subject -> "true" | "false" | unsupported

// TestSamples runs our own validation files on every kind.
func TestSamples(t *testing.T) { runValidationFiles(t, filepath.Join("samples", "*.yaml")) }

// TestSpiceDBCorpus runs SpiceDB's integration corpus on every kind.
func TestSpiceDBCorpus(t *testing.T) {
	runValidationFiles(t, filepath.Join("corpus", "spicedb", "*.yaml"))
}

func runValidationFiles(t *testing.T, glob string) {
	paths, err := filepath.Glob(glob)
	if err != nil || len(paths) == 0 {
		t.Fatalf("no validation files at %s: %v", glob, err)
	}
	kinds := benchKinds(t)
	ran, skipped := 0, map[string][]string{}
	for _, path := range paths {
		name := strings.TrimSuffix(filepath.Base(path), ".yaml")
		raw, err := os.ReadFile(path)
		if err != nil {
			t.Fatal(err)
		}
		var f validationFile
		if err := yaml.Unmarshal(raw, &f); err != nil {
			t.Fatalf("%s: %v", name, err)
		}
		if reason := unsupportedBy(&f); reason != "" {
			skipped[reason] = append(skipped[reason], name)
			continue
		}
		sch, err := dsl.Parse(f.Schema)
		if err != nil {
			skipped["dsl: "+err.Error()] = append(skipped["dsl: "+err.Error()], name)
			continue
		}
		ran++
		t.Run(name, func(t *testing.T) {
			var tuples []authz.Relationship
			for _, line := range fileLines(f.Relationships) {
				r, err := authz.ParseRelationship(line)
				if err != nil {
					t.Fatalf("relationship %q: %v", line, err)
				}
				tuples = append(tuples, r)
			}
			matrices := make([]checkMatrix, len(kinds))
			for i, kind := range kinds {
				t.Run("kind="+kind.name, func(t *testing.T) {
					if reason, ok := engineOnly(f.Schema); ok && kind.spicedb {
						t.Skipf("engine-only: %s", reason)
					}
					a := kind.open(t, f.Schema)
					if len(tuples) > 0 {
						if err := a.ImportRelationships(context.Background(), tuples); err != nil {
							t.Fatalf("relationships: %v", err)
						}
					}
					// The engine also checks the stored relationships against the schema.
					if v, ok := a.(interface{ ValidateStored(context.Context) error }); ok {
						if err := v.ValidateStored(context.Background()); err != nil {
							t.Fatalf("stored relationships do not fit the schema: %v", err)
						}
					}
					runAssertions(t, a, &f)
					runValidationBlock(t, a, &f)
					matrices[i] = consistency(t, a, sch, tuples)
				})
			}
			for i := 1; i < len(kinds); i++ {
				compareMatrices(t, kinds[0].name, matrices[0], kinds[i].name, matrices[i])
			}
		})
	}
	var reasons []string
	for r := range skipped {
		reasons = append(reasons, r)
	}
	sort.Strings(reasons)
	t.Logf("ran %d of %d files", ran, len(paths))
	for _, r := range reasons {
		t.Logf("skipped %d for %s: %s", len(skipped[r]), r, strings.Join(skipped[r], ", "))
	}
}

func runAssertions(t *testing.T, a authorizer, f *validationFile) {
	t.Helper()
	ctx := context.Background()
	for _, entry := range []struct {
		lines []string
		want  bool
	}{{f.Assertions.True, true}, {f.Assertions.False, false}} {
		for _, line := range entry.lines {
			r, err := authz.ParseRelationship(strings.TrimSpace(line))
			if err != nil {
				t.Fatalf("assertion %q: %v", line, err)
			}
			got, err := a.CheckPermission(ctx, r.Resource, r.Relation, r.Subject)
			if err != nil {
				report(t, err, "assert %s: %v", line, err)
				continue
			}
			if got != entry.want {
				t.Errorf("assert %s: got %v want %v", line, got, entry.want)
			}
		}
	}
}

// expectedSubjectRe reads one line of a validation block: the subject, an
// optional caveat marker, optional exclusions for a wildcard, and the
// relations it was found through, which are not checked here.
var expectedSubjectRe = regexp.MustCompile(`^\[(?P<subject>[^\]\s]+)(?P<caveat>\[\.\.\.\])?(?:\s+-\s+\{(?P<exclusions>[^}]+)\})?\]\s+is\s+<`)

// runValidationBlock checks a file's validation block: for each object and
// relation, the subjects SpiceDB expands to, grouped by subject kind, must be
// what LookupSubjects returns.
func runValidationBlock(t *testing.T, a authorizer, f *validationFile) {
	t.Helper()
	ctx := context.Background()
	for key, lines := range f.Validation {
		r, err := authz.ParseRelationship(strings.TrimSpace(key) + "@user:x")
		if err != nil {
			t.Fatalf("validation key %q: %v", key, err)
		}
		type expectation struct {
			ids, excluded []string
			wildcard      bool
		}
		byKind := map[[2]string]*expectation{}
		for _, line := range lines {
			m := expectedSubjectRe.FindStringSubmatch(strings.TrimSpace(line))
			if m == nil {
				t.Fatalf("validation line %q: not understood", line)
			}
			subject := parseSubject(t, key, m[1])
			kind := [2]string{subject.Object.Type, subject.Relation}
			if byKind[kind] == nil {
				byKind[kind] = &expectation{}
			}
			if subject.Object.ID == authz.WildcardID {
				byKind[kind].wildcard = true
				for _, ex := range strings.Split(m[3], ",") {
					if ex = strings.TrimSpace(ex); ex != "" {
						byKind[kind].excluded = append(byKind[kind].excluded, parseSubject(t, key, ex).Object.ID)
					}
				}
				continue
			}
			byKind[kind].ids = append(byKind[kind].ids, subject.Object.ID)
		}
		for kind, want := range byKind {
			got, err := a.LookupSubjects(ctx, r.Resource, r.Relation, kind[0], kind[1])
			if err != nil {
				report(t, err, "validation %s %s#%s: %v", key, kind[0], kind[1], err)
				continue
			}
			sort.Strings(want.ids)
			sort.Strings(want.excluded)
			sort.Strings(got.SubjectIDs)
			sort.Strings(got.ExcludedSubjectIDs)
			switch {
			case want.wildcard != got.Wildcard:
				t.Errorf("validation %s %s#%s: wildcard %v, want %v", key, kind[0], kind[1], got.Wildcard, want.wildcard)
			case want.wildcard && strings.Join(want.excluded, ",") != strings.Join(got.ExcludedSubjectIDs, ","):
				t.Errorf("validation %s %s#%s: excluded %v, want %v", key, kind[0], kind[1], got.ExcludedSubjectIDs, want.excluded)
			case !want.wildcard && strings.Join(want.ids, ",") != strings.Join(got.SubjectIDs, ","):
				t.Errorf("validation %s %s#%s: got %v, want %v", key, kind[0], kind[1], got.SubjectIDs, want.ids)
			}
		}
	}
}

// consistency builds the matrix of every check the file gives rise to and
// holds both lookups to it. Resources are every object of a type named in
// the file plus one nobody has heard of; subjects are every subject the
// relationships name plus, per subject type, one that no relationship
// names, which only a wildcard can admit.
func consistency(t *testing.T, a authorizer, sch *schema.Schema, tuples []authz.Relationship) checkMatrix {
	t.Helper()
	ctx := context.Background()
	idsByType := map[string]map[string]bool{}
	subjectSet := map[string]authz.SubjectRef{}
	for _, r := range tuples {
		if idsByType[r.Resource.Type] == nil {
			idsByType[r.Resource.Type] = map[string]bool{}
		}
		idsByType[r.Resource.Type][r.Resource.ID] = true
		if r.Subject.Object.ID == authz.WildcardID {
			continue
		}
		if idsByType[r.Subject.Object.Type] == nil {
			idsByType[r.Subject.Object.Type] = map[string]bool{}
		}
		idsByType[r.Subject.Object.Type][r.Subject.Object.ID] = true
		subjectSet[r.Subject.String()] = r.Subject
		plain := authz.SubjectRef{Object: r.Subject.Object}
		subjectSet[plain.String()] = plain
	}
	for typ := range idsByType {
		nobody := authz.SubjectRef{Object: authz.ObjectRef{Type: typ, ID: "nobody"}}
		subjectSet[nobody.String()] = nobody
	}
	var subjects []authz.SubjectRef
	for _, s := range subjectSet {
		subjects = append(subjects, s)
	}
	sort.Slice(subjects, func(i, j int) bool { return subjects[i].String() < subjects[j].String() })

	matrix := checkMatrix{}
	var reqs []authz.CheckPermissionRequest
	for _, typ := range sch.Order {
		def := sch.Definitions[typ]
		ids := []string{"ghost"}
		for id := range idsByType[typ] {
			ids = append(ids, id)
		}
		sort.Strings(ids)
		for _, id := range ids {
			for _, member := range def.Order {
				for _, s := range subjects {
					if s.Relation != "" && !sch.Definitions[s.Object.Type].Has(s.Relation) {
						continue
					}
					reqs = append(reqs, authz.CheckPermissionRequest{Resource: authz.ObjectRef{Type: typ, ID: id}, Permission: member, Subject: s})
				}
			}
		}
	}
	const chunk = 500
	for start := 0; start < len(reqs); start += chunk {
		end := min(start+chunk, len(reqs))
		results, err := a.CheckBulkPermissions(ctx, reqs[start:end])
		if err != nil {
			t.Fatalf("bulk: %v", err)
		}
		for _, r := range results {
			matrix[matrixKey(r.Request)] = bulkAnswer(r)
		}
	}

	// Every lookup in both directions against the matrix.
	for _, typ := range sch.Order {
		def := sch.Definitions[typ]
		ids := []string{"ghost"}
		for id := range idsByType[typ] {
			ids = append(ids, id)
		}
		for _, member := range def.Order {
			for _, s := range subjects {
				if s.Relation != "" && !sch.Definitions[s.Object.Type].Has(s.Relation) {
					continue
				}
				var want []string
				unsupportedCell := false
				for _, id := range ids {
					switch matrix[matrixKey(authz.CheckPermissionRequest{Resource: authz.ObjectRef{Type: typ, ID: id}, Permission: member, Subject: s})] {
					case "true":
						want = append(want, id)
					case unsupported:
						unsupportedCell = true
					}
				}
				if unsupportedCell {
					continue
				}
				got, err := a.LookupResources(ctx, typ, member, s, 0)
				if err != nil {
					if !errors.Is(err, errUnsupported) {
						t.Errorf("resources %s#%s@%s: %v", typ, member, s, err)
					}
					continue
				}
				sort.Strings(want)
				sort.Strings(got)
				if strings.Join(want, ",") != strings.Join(got, ",") {
					t.Errorf("resources %s#%s@%s: got [%s], checks say [%s]", typ, member, s, strings.Join(got, ","), strings.Join(want, ","))
				}
			}
			kinds := map[[2]string]bool{}
			for _, s := range subjects {
				kinds[[2]string{s.Object.Type, s.Relation}] = true
			}
			for _, id := range ids {
				res := authz.ObjectRef{Type: typ, ID: id}
				for kind := range kinds {
					if kind[1] != "" && !sch.Definitions[kind[0]].Has(kind[1]) {
						continue
					}
					got, err := a.LookupSubjects(ctx, res, member, kind[0], kind[1])
					if err != nil {
						if !errors.Is(err, errUnsupported) {
							t.Errorf("subjects %s#%s %s#%s: %v", res, member, kind[0], kind[1], err)
						}
						continue
					}
					excluded := map[string]bool{}
					for _, ex := range got.ExcludedSubjectIDs {
						excluded[ex] = true
					}
					returned := map[string]bool{}
					for _, sid := range got.SubjectIDs {
						returned[sid] = true
					}
					for _, s := range subjects {
						if s.Object.Type != kind[0] || s.Relation != kind[1] {
							continue
						}
						answer := matrix[matrixKey(authz.CheckPermissionRequest{Resource: res, Permission: member, Subject: s})]
						if answer == unsupported {
							continue
						}
						var listed bool
						if got.Wildcard {
							listed = !excluded[s.Object.ID]
						} else {
							listed = returned[s.Object.ID]
						}
						if listed != (answer == "true") {
							t.Errorf("subjects %s#%s %s#%s: %s listed=%v but check=%s", res, member, kind[0], kind[1], s, listed, answer)
						}
					}
					// A subject the lookup names that the file never did must still check true.
					for _, sid := range got.SubjectIDs {
						s := authz.SubjectRef{Object: authz.ObjectRef{Type: kind[0], ID: sid}, Relation: kind[1]}
						if _, known := subjectSet[s.String()]; known {
							continue
						}
						ok, err := a.CheckPermission(ctx, res, member, s)
						if err != nil || !ok {
							t.Errorf("subjects %s#%s %s#%s: lists %s, check says %v %v", res, member, kind[0], kind[1], s, ok, err)
						}
					}
				}
			}
		}
	}
	return matrix
}

func matrixKey(r authz.CheckPermissionRequest) string {
	return r.Resource.String() + "#" + r.Permission + "@" + r.Subject.String()
}

func compareMatrices(t *testing.T, aName string, a checkMatrix, bName string, b checkMatrix) {
	t.Helper()
	if a == nil || b == nil {
		return
	}
	var keys []string
	for k := range a {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	differ := 0
	for _, k := range keys {
		x, y := a[k], b[k]
		if x == unsupported || y == unsupported || x == y {
			continue
		}
		differ++
		if differ <= 10 {
			t.Errorf("%s: %s says %s, %s says %s", k, aName, x, bName, y)
		}
	}
	if differ > 10 {
		t.Errorf("%d more differences between %s and %s", differ-10, aName, bName)
	}
}
