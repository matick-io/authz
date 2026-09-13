package postgres_test

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"strings"
	"sync"
	"testing"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/datastore/postgres"
	"github.com/matick-io/authz/engine"
	index "github.com/matick-io/authz/materialize/postgres"
)

// AI: these tests are the proof that the index is a faithful cache of the
// relationships: exact after concurrent writers, exact after a follower
// catches up under load, untouched by a write that rolled back, and able to
// detect its own drift when reconfigured.

// hierarchyCandidates is the pool of relationships the randomised tests draw
// from: folder trees, team nesting, owners and viewers, an organisation.
func hierarchyCandidates() []string {
	folders := []string{"f0", "f1", "f2", "f3", "f4", "f5"}
	teams := []string{"t0", "t1", "t2"}
	var out []string
	for _, a := range folders {
		for _, b := range folders {
			if a != b {
				out = append(out, fmt.Sprintf("folder:%s#parent@folder:%s", a, b))
			}
		}
		for _, tm := range teams {
			out = append(out, fmt.Sprintf("folder:%s#owner@team:%s#member", a, tm))
			out = append(out, fmt.Sprintf("folder:%s#viewer@team:%s#member", a, tm))
		}
		out = append(out, fmt.Sprintf("folder:%s#owner@user:u%s", a, a))
		out = append(out, fmt.Sprintf("folder:%s#organization@organization:acme", a))
		out = append(out, fmt.Sprintf("document:d%s#parent@folder:%s", a, a))
	}
	for _, a := range teams {
		for _, b := range teams {
			if a != b {
				out = append(out, fmt.Sprintf("team:%s#member@team:%s#member", a, b))
			}
		}
		out = append(out, fmt.Sprintf("team:%s#member@user:m%s", a, a))
	}
	return out
}

func requireExact(t *testing.T, idx *index.Index, f *fixture) {
	t.Helper()
	drift, err := idx.Verify(context.Background(), f.pool)
	if err != nil {
		t.Fatal(err)
	}
	if !drift.Empty() {
		t.Fatalf("index drifted from the relationships:\n%s", drift)
	}
}

// Concurrent writers, each in its own transaction with the hook, leave the
// index exactly as a recomputation would, and the change log strictly
// ordered.
func TestConcurrentWritersKeepIndexExact(t *testing.T) {
	f := newFixture(t, parse(t, hierarchySchema))
	ctx := context.Background()
	candidates := hierarchyCandidates()
	var wg sync.WaitGroup
	errs := make(chan error, 64)
	for w := 0; w < 8; w++ {
		wg.Add(1)
		go func(seed int64) {
			defer wg.Done()
			rnd := rand.New(rand.NewSource(seed))
			for i := 0; i < 40; i++ {
				tuple := candidates[rnd.Intn(len(candidates))]
				op := authz.OperationTouch
				if rnd.Intn(3) == 0 {
					op = authz.OperationDelete
				}
				if err := f.svc.WriteRelationships(ctx, []authz.RelationshipUpdate{{Operation: op, Relationship: rel(t, tuple)}}); err != nil {
					errs <- fmt.Errorf("writer %d: %s: %w", seed, tuple, err)
					return
				}
			}
		}(int64(w))
	}
	wg.Wait()
	close(errs)
	for err := range errs {
		t.Error(err)
	}
	requireExact(t, f.idx, f)

	var changes []authz.Change
	if err := f.ds.View(ctx, func(r authz.Reader) error {
		var err error
		changes, err = r.Changes(ctx, 0, 0)
		return err
	}); err != nil {
		t.Fatal(err)
	}
	if len(changes) == 0 {
		t.Fatal("no changes recorded")
	}
	for i, c := range changes {
		if len(c.Updates) == 0 {
			t.Errorf("change %d is empty", c.Revision)
		}
		if i > 0 && c.Revision <= changes[i-1].Revision {
			t.Errorf("revisions out of order: %d after %d", c.Revision, changes[i-1].Revision)
		}
	}
}

// A follower applying the change log while writers keep writing ends exact
// once the writers stop and it catches up, and never applies a change twice.
func TestFollowerUnderLoad(t *testing.T) {
	sch := parse(t, hierarchySchema)
	pool := openPool(t)
	idx, err := index.New(index.WithPermissionSets(sch, index.Materializable(sch)...))
	if err != nil {
		t.Fatal(err)
	}
	ds := postgres.New(pool)
	svc, err := engine.New(ds, sch)
	if err != nil {
		t.Fatal(err)
	}
	ctx := context.Background()
	candidates := hierarchyCandidates()
	done := make(chan struct{})
	var writers sync.WaitGroup
	writeErrs := make(chan error, 16)
	for w := 0; w < 4; w++ {
		writers.Add(1)
		go func(seed int64) {
			defer writers.Done()
			rnd := rand.New(rand.NewSource(seed))
			for i := 0; i < 50; i++ {
				tuple := candidates[rnd.Intn(len(candidates))]
				op := authz.OperationTouch
				if rnd.Intn(3) == 0 {
					op = authz.OperationDelete
				}
				if err := svc.WriteRelationships(ctx, []authz.RelationshipUpdate{{Operation: op, Relationship: rel(t, tuple)}}); err != nil {
					writeErrs <- err
					return
				}
			}
		}(int64(100 + w))
	}
	var applied int
	var followErr error
	var follower sync.WaitGroup
	follower.Add(1)
	go func() {
		defer follower.Done()
		for {
			n, err := idx.Catchup(ctx, pool, ds)
			applied += n
			if err != nil {
				followErr = err
				return
			}
			select {
			case <-done:
				return
			default:
			}
		}
	}()
	writers.Wait()
	close(done)
	follower.Wait()
	close(writeErrs)
	for err := range writeErrs {
		t.Error(err)
	}
	if followErr != nil {
		t.Fatal(followErr)
	}
	final, err := idx.Catchup(ctx, pool, ds)
	if err != nil {
		t.Fatal(err)
	}
	applied += final
	var changes []authz.Change
	if err := ds.View(ctx, func(r authz.Reader) error {
		var err error
		changes, err = r.Changes(ctx, 0, 0)
		return err
	}); err != nil {
		t.Fatal(err)
	}
	if applied != len(changes) {
		t.Fatalf("follower applied %d changes, log holds %d", applied, len(changes))
	}
	var cursor int64
	if err := pool.QueryRow(ctx, "select revision from authz.userset_closure_cursor").Scan(&cursor); err != nil {
		t.Fatal(err)
	}
	if last := changes[len(changes)-1].Revision; authz.Revision(cursor) != last {
		t.Fatalf("cursor at %d, log ends at %d", cursor, last)
	}
	drift, err := idx.Verify(ctx, pool)
	if err != nil {
		t.Fatal(err)
	}
	if !drift.Empty() {
		t.Fatalf("follower diverged:\n%s", drift)
	}
	if again, err := idx.Catchup(ctx, pool, ds); err != nil || again != 0 {
		t.Fatalf("caught-up follower applied %d again, err %v", again, err)
	}
}

// A write the index refuses rolls back whole: no relationship, no change,
// no index row, and the index still matches the relationships. The budget
// counts closure rows per change: the first write adds three (t0>t1 and the
// folder above both), the second three more, the third would add four.
func TestVetoedWriteLeavesIndexExact(t *testing.T) {
	sch := parse(t, hierarchySchema)
	pool := openPool(t)
	idx, err := index.New(index.WithNestingBudget(3), index.WithPermissionSets(sch, index.Materializable(sch)...))
	if err != nil {
		t.Fatal(err)
	}
	ds := postgres.New(pool, postgres.WithHook(idx.Hook()))
	svc, err := engine.New(ds, sch, engine.WithNestingIndex(idx), engine.WithPermissionIndex(idx))
	if err != nil {
		t.Fatal(err)
	}
	ctx := context.Background()
	write := func(tuples ...string) error {
		var ups []authz.RelationshipUpdate
		for _, s := range tuples {
			ups = append(ups, authz.RelationshipUpdate{Operation: authz.OperationTouch, Relationship: rel(t, s)})
		}
		return svc.WriteRelationships(ctx, ups)
	}
	if err := write("team:t0#member@team:t1#member", "folder:f0#owner@team:t0#member"); err != nil {
		t.Fatal(err)
	}
	if err := write("team:t1#member@team:t2#member"); err != nil {
		t.Fatal(err)
	}
	before := readSets(t, pool)
	err = write("team:t2#member@team:t3#member", "folder:f9#owner@user:x", "team:t3#member@user:deep")
	if !errors.Is(err, index.ErrNestingTooLarge) {
		t.Fatalf("want ErrNestingTooLarge, got %v", err)
	}
	if got := readSets(t, pool); strings.Join(got, "\n") != strings.Join(before, "\n") {
		t.Fatalf("permission sets changed under a vetoed write:\n%v\n%v", before, got)
	}
	if ok, _ := svc.CheckPermission(ctx, obj("folder:f9"), "view", subj("user:x")); ok {
		t.Fatal("a grant from the vetoed write is visible")
	}
	drift, err := idx.Verify(ctx, pool)
	if err != nil {
		t.Fatal(err)
	}
	if !drift.Empty() {
		t.Fatalf("index drifted after the veto:\n%s", drift)
	}
}

// Configuring new permission sets on an existing store is detectable, and
// Reindex repairs it.
func TestReconfigurationIsDetected(t *testing.T) {
	sch := parse(t, hierarchySchema)
	pool := openPool(t)
	closureOnly, err := index.New()
	if err != nil {
		t.Fatal(err)
	}
	ds := postgres.New(pool, postgres.WithHook(closureOnly.Hook()))
	svc, err := engine.New(ds, sch, engine.WithNestingIndex(closureOnly))
	if err != nil {
		t.Fatal(err)
	}
	ctx := context.Background()
	var ups []authz.RelationshipUpdate
	for _, s := range []string{"folder:root#owner@user:alice", "folder:a#parent@folder:root", "document:d#parent@folder:a", "team:t#member@team:u#member"} {
		ups = append(ups, authz.RelationshipUpdate{Operation: authz.OperationCreate, Relationship: rel(t, s)})
	}
	if err := svc.WriteRelationships(ctx, ups); err != nil {
		t.Fatal(err)
	}
	drift, err := closureOnly.Verify(ctx, pool)
	if err != nil || !drift.Empty() {
		t.Fatalf("closure-only index drifted: %v %s", err, drift)
	}
	withSets, err := index.New(index.WithPermissionSets(sch, "document#view", "folder#view"))
	if err != nil {
		t.Fatal(err)
	}
	drift, err = withSets.Verify(ctx, pool)
	if err != nil {
		t.Fatal(err)
	}
	if len(drift.SetsMissing) == 0 || len(drift.ClosureMissing) != 0 || len(drift.SetsExtra) != 0 {
		t.Fatalf("expected only missing set rows, got:\n%s", drift)
	}
	if err := withSets.Reindex(ctx, pool); err != nil {
		t.Fatal(err)
	}
	drift, err = withSets.Verify(ctx, pool)
	if err != nil || !drift.Empty() {
		t.Fatalf("after reindex: %v %s", err, drift)
	}
	indexed, err := engine.New(postgres.New(pool, postgres.WithHook(withSets.Hook())), sch, engine.WithNestingIndex(withSets), engine.WithPermissionIndex(withSets))
	if err != nil {
		t.Fatal(err)
	}
	if ok, err := indexed.CheckPermission(ctx, obj("document:d"), "view", subj("user:alice")); err != nil || !ok {
		t.Fatalf("after reindex the reconfigured index answers %v %v", ok, err)
	}
}

// Every answer reflects the latest committed write; there is no cache to
// invalidate between calls.
func TestAnswersFollowWritesImmediately(t *testing.T) {
	f := newFixture(t, parse(t, hierarchySchema))
	ctx := context.Background()
	check := func(want bool, what string) {
		t.Helper()
		ok, err := f.svc.CheckPermission(ctx, obj("document:d"), "view", subj("user:dave"))
		if err != nil || ok != want {
			t.Fatalf("%s: got %v want %v (err %v)", what, ok, want, err)
		}
		ids, err := f.svc.LookupResources(ctx, "document", "view", subj("user:dave"), 0)
		if err != nil || (len(ids) == 1) != want {
			t.Fatalf("%s: lookup %v want present=%v (err %v)", what, ids, want, err)
		}
	}
	f.write(t, authz.OperationCreate, "folder:root#owner@user:alice", "folder:a#parent@folder:root", "document:d#parent@folder:a", "team:core#member@team:leads#member")
	check(false, "before any grant")
	f.write(t, authz.OperationCreate, "team:leads#member@user:dave")
	check(false, "team not yet attached")
	f.write(t, authz.OperationCreate, "folder:root#viewer@team:core#member")
	check(true, "team attached at the root")
	f.write(t, authz.OperationDelete, "team:core#member@team:leads#member")
	check(false, "nesting removed")
	f.write(t, authz.OperationCreate, "team:core#member@team:leads#member")
	check(true, "nesting restored")
	f.write(t, authz.OperationDelete, "folder:a#parent@folder:root")
	check(false, "hierarchy cut")
	f.write(t, authz.OperationCreate, "folder:a#parent@folder:root")
	check(true, "hierarchy rejoined")
	requireExact(t, f.idx, f)
}
