package tests

import (
	"context"
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"testing"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/dsl"
	"github.com/matick-io/authz/engine"
	"github.com/matick-io/authz/schema"
)

// AI: the differential test is the broadest proof the indexes have. From a
// schema it derives every relationship the schema allows over small id
// pools, then interleaves random writes and deletes with random questions,
// applying every write to every datastore kind and requiring every kind to
// give the memory store's answer. The walk on memory is the oracle; an
// indexed answer that differs is a bug in the index or its maintenance.
// AUTHZ_DIFF_ROUNDS scales the number of rounds.

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
// the id pools, wildcards included.
func allowedRelationships(sch *schema.Schema) []authz.Relationship {
	var out []authz.Relationship
	for _, typ := range sch.Order {
		def := sch.Definitions[typ]
		for _, name := range def.Order {
			rel, ok := def.Relations[name]
			if !ok {
				continue
			}
			for _, rid := range poolIDs(typ) {
				for _, a := range rel.AllowedSubjects {
					switch {
					case a.Wildcard:
						out = append(out, authz.Relationship{Resource: authz.ObjectRef{Type: typ, ID: rid}, Relation: name,
							Subject: authz.SubjectRef{Object: authz.ObjectRef{Type: a.Type, ID: authz.WildcardID}}})
					default:
						for _, sid := range poolIDs(a.Type) {
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

func answer(ctx context.Context, svc *engine.Service, q question) string {
	switch q.kind {
	case "check":
		ok, err := svc.CheckPermission(ctx, q.resource, q.permission, q.subject)
		if err != nil {
			return "error: " + err.Error()
		}
		return fmt.Sprint(ok)
	case "resources":
		ids, err := svc.LookupResources(ctx, q.resourceType, q.permission, q.subject, 0)
		if err != nil {
			return "error: " + err.Error()
		}
		return strings.Join(ids, ",")
	}
	got, err := svc.LookupSubjects(ctx, q.resource, q.permission, q.subjectType, q.subjectRelati)
	if err != nil {
		return "error: " + err.Error()
	}
	if got.Wildcard {
		return "*-" + strings.Join(got.ExcludedSubjectIDs, ",")
	}
	return strings.Join(got.SubjectIDs, ",")
}

// AI: every Postgres kind shares one set of tables, so the oracle (memory)
// is compared with one Postgres kind at a time.
func TestDifferential(t *testing.T) {
	all := datastores(t)
	if len(all) < 2 {
		t.Skip("the differential test needs a second datastore kind (set AUTHZ_TEST_DATABASE_URL)")
	}
	for _, other := range all[1:] {
		t.Run(other.name, func(t *testing.T) { runDifferential(t, []datastoreKind{all[0], other}) })
	}
}

func runDifferential(t *testing.T, kinds []datastoreKind) {
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
	}
	for name, text := range schemas {
		t.Run(name, func(t *testing.T) {
			sch, err := dsl.Parse(text)
			if err != nil {
				t.Fatal(err)
			}
			ctx := context.Background()
			services := make([]*engine.Service, len(kinds))
			for i, kind := range kinds {
				ds, opts := kind.open(t, sch)
				svc, err := engine.New(ds, sch, append(opts, engine.WithMaxDepth(1000))...)
				if err != nil {
					t.Fatal(err)
				}
				services[i] = svc
			}
			candidates := allowedRelationships(sch)
			present := map[string]bool{}
			rnd := rand.New(rand.NewSource(int64(len(name))))
			for round := 0; round < diffRounds(); round++ {
				var ups []authz.RelationshipUpdate
				for n := 1 + rnd.Intn(3); n > 0; n-- {
					r := candidates[rnd.Intn(len(candidates))]
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
				for k := 0; k < 12; k++ {
					q := randomQuestion(rnd, sch)
					want := answer(ctx, services[0], q)
					for i := 1; i < len(services); i++ {
						if got := answer(ctx, services[i], q); got != want {
							t.Errorf("round %d: %s: %s\n  %s: %q\n  %s: %q", round, q, q.kind, kinds[0].name, want, kinds[i].name, got)
						}
					}
				}
				if t.Failed() {
					t.FailNow()
				}
			}
		})
	}
}
