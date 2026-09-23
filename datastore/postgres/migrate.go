package postgres

import (
	"context"
	"embed"
	"errors"
	"fmt"
	"io/fs"
	"strconv"
	"strings"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/stdlib"
	"github.com/pressly/goose/v3"
)

// Migrations is every table the datastore and its index need, as numbered
// goose-annotated SQL: one file today, creating the relationships, the change
// log, the userset closure and the permission sets. Migrator applies it. A
// host that runs goose itself hands it to its own provider under
// MigrationTable; a host with another tool has the files.
//
//go:embed migrations/*.sql
var Migrations embed.FS

// MigrationTable records the applied versions. It sits outside the authz
// schema so that any runner can create it before the schema exists, and it
// is qualified because a role named authz puts the authz schema first in its
// search path once the first migration has created it; an unqualified name
// would then resolve to a different table than the one the first run made.
const MigrationTable = "public.authz_migration"

// SchemaVersion is the version this code expects the database at: the number
// of the last migration in Migrations. Check compares the database with it.
var SchemaVersion = mustSchemaVersion()

// ErrSchemaVersion is Check's answer when the database is not at
// SchemaVersion: migrations are pending, or the code is older than the
// database.
var ErrSchemaVersion = errors.New("authz: database schema version does not match the library")

func mustSchemaVersion() int64 {
	entries, err := fs.ReadDir(Migrations, "migrations")
	if err != nil {
		panic(err)
	}
	var latest int64
	for _, e := range entries {
		digits, _, _ := strings.Cut(e.Name(), "_")
		v, err := strconv.ParseInt(digits, 10, 64)
		if err != nil {
			panic(fmt.Sprintf("authz: migration %q is not numbered", e.Name()))
		}
		latest = max(latest, v)
	}
	return latest
}

// Migrator applies Migrations to one database with goose and records what
// ran in MigrationTable. Up and Down are what a deploy step calls; Version is
// what Check reads.
type Migrator struct {
	provider *goose.Provider
}

// NewMigrator builds a Migrator on the pool. Close it when done; the pool
// stays open.
func NewMigrator(pool *pgxpool.Pool) (*Migrator, error) {
	dir, err := fs.Sub(Migrations, "migrations")
	if err != nil {
		return nil, err
	}
	// AI: the global registry is the host's, for Go migrations of its own;
	// this provider must see only the embedded files.
	provider, err := goose.NewProvider(goose.DialectPostgres, stdlib.OpenDBFromPool(pool), dir,
		goose.WithTableName(MigrationTable), goose.WithDisableGlobalRegistry(true))
	if err != nil {
		return nil, err
	}
	return &Migrator{provider: provider}, nil
}

// Up applies every pending migration in order, each in its own transaction.
func (m *Migrator) Up(ctx context.Context) error {
	_, err := m.provider.Up(ctx)
	return err
}

// Down rolls back the most recently applied migration.
func (m *Migrator) Down(ctx context.Context) error {
	_, err := m.provider.Down(ctx)
	return err
}

// DownTo rolls back every migration above version; 0 removes everything.
func (m *Migrator) DownTo(ctx context.Context, version int64) error {
	_, err := m.provider.DownTo(ctx, version)
	return err
}

// Version is the highest applied migration, 0 before the first.
func (m *Migrator) Version(ctx context.Context) (int64, error) {
	return m.provider.GetDBVersion(ctx)
}

// Close releases what the Migrator holds. The pool is untouched.
func (m *Migrator) Close() error { return m.provider.Close() }

// Migrate brings the database to SchemaVersion: NewMigrator, Up, Close.
func Migrate(ctx context.Context, pool *pgxpool.Pool) error {
	m, err := NewMigrator(pool)
	if err != nil {
		return err
	}
	defer m.Close()
	return m.Up(ctx)
}

// Check fails with ErrSchemaVersion unless the database is at SchemaVersion.
// Run it at boot beside engine.Service.ValidateStored, so a deploy whose
// migrations did not run stops before its first query fails.
func Check(ctx context.Context, pool *pgxpool.Pool) error {
	m, err := NewMigrator(pool)
	if err != nil {
		return err
	}
	defer m.Close()
	v, err := m.Version(ctx)
	if err != nil {
		return err
	}
	if v != SchemaVersion {
		return fmt.Errorf("%w: database at %d, code expects %d", ErrSchemaVersion, v, SchemaVersion)
	}
	return nil
}
