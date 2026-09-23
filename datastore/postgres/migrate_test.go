package postgres

import (
	"fmt"
	"io/fs"
	"strings"
	"testing"

	"github.com/matick-io/authz"
)

// AI: runs without a database. The files must number from 1 without a gap,
// each with an Up and a Down, and SchemaVersion must be the last number, or
// a deploy could skip one or fail to roll back.
func TestMigrationsAreOneSequence(t *testing.T) {
	entries, err := fs.ReadDir(Migrations, "migrations")
	if err != nil {
		t.Fatal(err)
	}
	for i, e := range entries {
		if want := fmt.Sprintf("%05d_", i+1); !strings.HasPrefix(e.Name(), want) {
			t.Fatalf("migration %d is %q, want a %s prefix", i+1, e.Name(), want)
		}
		raw, err := fs.ReadFile(Migrations, "migrations/"+e.Name())
		if err != nil {
			t.Fatal(err)
		}
		if !strings.Contains(string(raw), "-- +goose Up") || !strings.Contains(string(raw), "-- +goose Down") {
			t.Fatalf("%s lacks an Up or a Down section", e.Name())
		}
	}
	if SchemaVersion != int64(len(entries)) {
		t.Fatalf("SchemaVersion is %d for %d migrations", SchemaVersion, len(entries))
	}
}

func TestPredicate(t *testing.T) {
	member := "member"
	where, args := predicate(authz.RelationshipQuery{
		ResourceType: "project", ResourceIDs: []string{"p1", "p2"}, Relation: "member",
		SubjectType: "team", SubjectIDs: []string{"core"}, SubjectRelation: &member,
	})
	want := " where resource_type = $1 and resource_id = any($2) and relation = $3 and subject_type = $4 and subject_id = any($5) and subject_relation = $6"
	if where != want || len(args) != 6 {
		t.Fatalf("got %q with %d args", where, len(args))
	}
	if where, args := predicate(authz.RelationshipQuery{}); where != "" || args != nil {
		t.Fatalf("empty query rendered %q", where)
	}
}
