package postgres

import (
	"io/fs"
	"strings"
	"testing"

	"github.com/matick-io/authz"
)

// AI: runs without a database: the embedded migration must split cleanly so
// Migrate never executes the Down section.
func TestUpSectionExcludesDown(t *testing.T) {
	raw, err := fs.ReadFile(Migrations, "migrations/00001_authz.sql")
	if err != nil {
		t.Fatal(err)
	}
	up := upSection(string(raw))
	if !strings.Contains(up, "create table if not exists authz.relationship") {
		t.Fatalf("up section lost the table: %q", up)
	}
	if strings.Contains(up, "drop schema") {
		t.Fatalf("up section contains the down section: %q", up)
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
