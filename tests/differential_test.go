package tests

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"os"
	"sort"
	"strconv"
	"strings"
	"testing"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/schema"
	"github.com/matick-io/authz/schema/dsl"
)

// AI: the differential test is the broadest proof the engine has. From a
// schema it derives every relationship the schema allows over small id
// pools, then interleaves random writes and deletes with random questions,
// applying every write to every kind and requiring every kind to give the
// memory store's answer. The walk on memory is the oracle for the indexed
// kinds: an indexed answer that differs is a bug in the index or its
// maintenance. SpiceDB, when reachable, is the oracle for the walk itself:
// a difference there is a semantic disagreement with the reference
// implementation, to be settled deliberately. AUTHZ_DIFF_ROUNDS scales the
// number of rounds.

func diffRounds() int {
	if n, err := strconv.Atoi(os.Getenv("AUTHZ_DIFF_ROUNDS")); err == nil && n > 0 {
		return n
	}
	return 60
}

const idsPerType = 4

func poolIDs(typ string) []string {
	out := make([]string, idsPerType)
	for i := range out {
		out[i] = fmt.Sprintf("%s%d", typ, i)
	}
	return out
}

// allowedRelationships enumerates every relationship the schema admits over
// the id pools, wildcards included. With acyclic set, a subject that has
// relations of its own (so a userset or an arrow could lead back through it)
// is admitted only below its resource in (type order, id) rank, so neither a
// nesting cycle nor an arrow cycle can ever be written.
func allowedRelationships(sch *schema.Schema, acyclic bool) []authz.Relationship {
	rank := func(typ string, idIndex int) int {
		for i, t := range sch.Order {
			if t == typ {
				return i*idsPerType + idIndex
			}
		}
		return -1
	}
	var out []authz.Relationship
	for _, typ := range sch.Order {
		def := sch.Definitions[typ]
		for _, name := range def.Order {
			rel, ok := def.Relations[name]
			if !ok {
				continue
			}
			for ri, rid := range poolIDs(typ) {
				for _, a := range rel.AllowedSubjects {
					switch {
					case a.Wildcard:
						out = append(out, authz.Relationship{Resource: authz.ObjectRef{Type: typ, ID: rid}, Relation: name,
							Subject: authz.SubjectRef{Object: authz.ObjectRef{Type: a.Type, ID: authz.WildcardID}}})
					default:
						for si, sid := range poolIDs(a.Type) {
							if acyclic && len(sch.Definitions[a.Type].Order) > 0 && rank(a.Type, si) >= rank(typ, ri) {
								continue
							}
							out = append(out, authz.Relationship{Resource: authz.ObjectRef{Type: typ, ID: rid}, Relation: name,
								Subject: authz.SubjectRef{Object: authz.ObjectRef{Type: a.Type, ID: sid}, Relation: a.Relation}})
						}
					}
				}
			}
		}
	}
	return out
}

type question struct {
	kind                       string // check, resources, subjects
	resource                   authz.ObjectRef
	resourceType, permission   string
	subject                    authz.SubjectRef
	subjectType, subjectRelati string
}

func (q question) String() string {
	switch q.kind {
	case "check":
		return fmt.Sprintf("check %s#%s@%s", q.resource, q.permission, q.subject)
	case "resources":
		return fmt.Sprintf("resources %s#%s@%s", q.resourceType, q.permission, q.subject)
	}
	return fmt.Sprintf("subjects %s#%s %s#%s", q.resource, q.permission, q.subjectType, q.subjectRelati)
}

// randomQuestion picks a resource type with a member, a random member, and a
// random subject drawn from the schema's types, sometimes a userset.
func randomQuestion(rnd *rand.Rand, sch *schema.Schema) question {
	var typ string
	var def *schema.Definition
	for {
		typ = sch.Order[rnd.Intn(len(sch.Order))]
		def = sch.Definitions[typ]
		if len(def.Order) > 0 {
			break
		}
	}
	member := def.Order[rnd.Intn(len(def.Order))]
	subjectType := sch.Order[rnd.Intn(len(sch.Order))]
	subject := authz.SubjectRef{Object: authz.ObjectRef{Type: subjectType, ID: poolIDs(subjectType)[rnd.Intn(idsPerType)]}}
	sdef := sch.Definitions[subjectType]
	if len(sdef.Order) > 0 && rnd.Intn(4) == 0 {
		subject.Relation = sdef.Order[rnd.Intn(len(sdef.Order))]
	}
	q := question{resource: authz.ObjectRef{Type: typ, ID: poolIDs(typ)[rnd.Intn(idsPerType)]}, resourceType: typ, permission: member, subject: subject}
	switch rnd.Intn(3) {
	case 0:
		q.kind = "check"
	case 1:
		q.kind = "resources"
	default:
		q.kind = "subjects"
		q.subjectType = subjectType
		q.subjectRelati = subject.Relation
	}
	return q
}

// unsupported is the answer of a kind that cannot answer the question at
// all (see errUnsupported); it is skipped, never compared.
const unsupported = "unsupported"

func answer(ctx context.Context, a authorizer, q question) string {
	fail := func(err error) string {
		if errors.Is(err, errUnsupported) {
			return unsupported
		}
		return "error: " + err.Error()
	}
	switch q.kind {
	case "check":
		ok, err := a.CheckPermission(ctx, q.resource, q.permission, q.subject)
		if err != nil {
			return fail(err)
		}
		return fmt.Sprint(ok)
	case "resources":
		ids, err := a.LookupResources(ctx, q.resourceType, q.permission, q.subject, 0)
		if err != nil {
			return fail(err)
		}
		sort.Strings(ids)
		return strings.Join(ids, ",")
	}
	got, err := a.LookupSubjects(ctx, q.resource, q.permission, q.subjectType, q.subjectRelati)
	if err != nil {
		return fail(err)
	}
	sort.Strings(got.SubjectIDs)
	sort.Strings(got.ExcludedSubjectIDs)
	if got.Wildcard {
		return "*-" + strings.Join(got.ExcludedSubjectIDs, ",")
	}
	return strings.Join(got.SubjectIDs, ",")
}

func bulkAnswer(r authz.CheckPermissionResult) string {
	switch {
	case errors.Is(r.Err, errUnsupported):
		return unsupported
	case r.Err != nil:
		return "error: " + r.Err.Error()
	}
	return fmt.Sprint(r.HasPermission)
}

// AI: every Postgres kind shares one set of tables, so the oracle (memory)
// is compared with one other kind at a time; SpiceDB kinds are peers like
// any other.
func TestDifferential(t *testing.T) {
	all := benchKinds(t)
	if len(all) < 2 {
		t.Skip("the differential test needs a second kind (set AUTHZ_TEST_DATABASE_URL or AUTHZ_SPICEDB)")
	}
	for _, other := range all[1:] {
		t.Run(other.name, func(t *testing.T) { runDifferential(t, []benchKind{all[0], other}) })
	}
}

func runDifferential(t *testing.T, kinds []benchKind) {
	schemas := map[string]string{
		"collaboration": productSchema,
		"hierarchy": `
definition user {}
definition team {
    relation member: user | team#member
}
definition organization {
    relation admin: user
    relation member: user | team#member
    permission manage = admin
    permission view = member + admin
}
definition folder {
    relation organization: organization
    relation parent: folder
    relation owner: user | team#member
    relation viewer: user | team#member
    permission view = viewer + owner + parent->view + organization->view
    permission edit = owner + parent->edit + organization->manage
}
definition document {
    relation parent: folder
    relation viewer: user
    permission view = viewer + parent->view
    permission edit = parent->edit
}`,
		// AI: every construct at once, so their interactions are covered:
		// usersets inside exclusions and intersections, wildcards beside
		// them, a relation whose subjects are a permission, arrows to
		// relations, and set algebra on both sides of an arrow.
		"algebra": `
definition user {}
definition group {
    relation member: user | group#member
    relation banned: user | group#member
    permission allowed = member - banned
}
definition space {
    relation owner: user | group#member
    relation admin: user | group#allowed
    relation member: user | group#member
    relation public: user:*
    relation blocked: user | group#member
    permission manage = owner + admin
    permission view = (member + public + manage) - blocked
    permission both = public & owner
    permission blocked_owner = blocked & owner
}
definition item {
    relation space: space
    relation editor: user | group#member
    relation viewer: user | user:* | space#member
    permission view = viewer + editor + space->view
    permission edit = editor & space->manage
    permission owner_view = space->owner
    permission restricted = view - space->blocked
    permission narrow = (viewer - editor) & space->view
}`,
		// AI: a wildcard inside a userset is what SpiceDB refuses to have
		// (see the wildcard-nesting sample); the indexes must still agree with
		// the walk on it.
		"wildcards": `
// engine-only: a wildcard reachable through usersets
definition user {}
definition group {
    relation member: user | user:* | group#member
    relation banned: user | group#member
    permission allowed = member - banned
}
definition doc {
    relation viewer: user | group#member
    relation blocked: user | group#member
    permission view = viewer - blocked
    permission both = viewer & blocked
    permission any = viewer + blocked
}`,
	}
	for name, text := range schemas {
		t.Run(name, func(t *testing.T) {
			if reason, ok := engineOnly(text); ok && (kinds[0].spicedb || kinds[1].spicedb) {
				t.Skipf("engine-only schema: %s", reason)
			}
			sch, err := dsl.Parse(text)
			if err != nil {
				t.Fatal(err)
			}
			ctx := context.Background()
			services := make([]authorizer, len(kinds))
			for i, kind := range kinds {
				services[i] = kind.open(t, text)
			}
			candidates := allowedRelationships(sch, kinds[0].acyclicNesting || kinds[1].acyclicNesting)
			present := map[string]bool{}
			rnd := rand.New(rand.NewSource(int64(len(name))))
			skipped := 0
			for round := 0; round < diffRounds(); round++ {
				var ups []authz.RelationshipUpdate
				inRound := map[string]bool{}
				for n := 1 + rnd.Intn(3); n > 0; n-- {
					r := candidates[rnd.Intn(len(candidates))]
					// AI: one tuple at most once per write; SpiceDB refuses
					// duplicates in a request and the engine applies them in order,
					// so the two would not be asked the same thing.
					if inRound[r.String()] {
						continue
					}
					inRound[r.String()] = true
					op := authz.OperationTouch
					if present[r.String()] && rnd.Intn(2) == 0 {
						op = authz.OperationDelete
						delete(present, r.String())
					} else {
						present[r.String()] = true
					}
					ups = append(ups, authz.RelationshipUpdate{Operation: op, Relationship: r})
				}
				for i, svc := range services {
					if err := svc.WriteRelationships(ctx, ups); err != nil {
						t.Fatalf("round %d: %s: write %v: %v", round, kinds[i].name, ups, err)
					}
				}
				var checks []question
				single := make([][]string, len(services)) // per kind, each check answered one at a time
				for k := 0; k < 12; k++ {
					q := randomQuestion(rnd, sch)
					answers := make([]string, len(services))
					for i, svc := range services {
						answers[i] = answer(ctx, svc, q)
					}
					for i := 1; i < len(services); i++ {
						if answers[i] == unsupported {
							skipped++
							continue
						}
						if answers[i] != answers[0] {
							t.Errorf("round %d: %s: %s\n  %s: %q\n  %s: %q", round, q, q.kind, kinds[0].name, answers[0], kinds[i].name, answers[i])
						}
					}
					if q.kind == "check" {
						checks = append(checks, q)
						for i := range services {
							single[i] = append(single[i], answers[i])
						}
					}
				}
				// AI: the round's checks once more as one bulk call per kind. A
				// bulk answer must equal the one given a check at a time, so the
				// bulk path's shared tuple cache and per-item memo are held to
				// the single path on every round, on every kind.
				if len(checks) > 0 {
					reqs := make([]authz.CheckPermissionRequest, len(checks))
					for j, q := range checks {
						reqs[j] = authz.CheckPermissionRequest{Resource: q.resource, Permission: q.permission, Subject: q.subject}
					}
					for i, svc := range services {
						results, err := svc.CheckBulkPermissions(ctx, reqs)
						if err != nil {
							t.Fatalf("round %d: %s: bulk: %v", round, kinds[i].name, err)
						}
						if len(results) != len(reqs) {
							t.Fatalf("round %d: %s: bulk returned %d results for %d requests", round, kinds[i].name, len(results), len(reqs))
						}
						for j, r := range results {
							got := bulkAnswer(r)
							if got == unsupported || single[i][j] == unsupported {
								continue
							}
							if got != single[i][j] {
								t.Errorf("round %d: %s: %s\n  in bulk: %q\n  one at a time: %q", round, kinds[i].name, checks[j], got, single[i][j])
							}
						}
					}
				}
				if t.Failed() {
					t.FailNow()
				}
			}
			if skipped > 0 {
				t.Logf("%d questions skipped as unsupported by %s", skipped, kinds[1].name)
			}
		})
	}
}
