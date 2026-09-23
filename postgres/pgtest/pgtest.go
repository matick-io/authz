// Package pgtest serialises test packages that share one scratch database.
//
// AI: go test runs packages in parallel processes, and every Postgres suite
// here drops and recreates the authz schema. Main takes a session-level
// advisory lock for the life of the test binary, so two packages never touch
// the database at once, and needs no -p 1 flag to remember.
package pgtest

import (
	"context"
	"fmt"
	"os"
	"testing"

	"github.com/jackc/pgx/v5"
)

// EnvVar names the database the Postgres suites use; unset, they skip.
const EnvVar = "AUTHZ_TEST_DATABASE_URL"

const lockKey = 0x7465737473 // "tests"

// Main runs m while holding the database lock and returns its exit code.
// Without EnvVar set it runs m directly.
func Main(m *testing.M) int {
	url := os.Getenv(EnvVar)
	if url == "" {
		return m.Run()
	}
	ctx := context.Background()
	conn, err := pgx.Connect(ctx, url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "pgtest: %v\n", err)
		return 1
	}
	defer conn.Close(ctx)
	if _, err := conn.Exec(ctx, "select pg_advisory_lock($1)", int64(lockKey)); err != nil {
		fmt.Fprintf(os.Stderr, "pgtest: %v\n", err)
		return 1
	}
	code := m.Run()
	_, _ = conn.Exec(ctx, "select pg_advisory_unlock($1)", int64(lockKey))
	return code
}
