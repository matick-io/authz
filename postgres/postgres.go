// Package postgres is the authz.Datastore on Postgres, via pgx. Reads run in a
// repeatable-read, read-only transaction so one resolution sees one snapshot;
// writes run in one transaction so a WriteRelationships lands whole or not at
// all, and every write records what it changed in the change log at a
// revision that follows commit order.
//
// The adapter stores tuples and their changes and nothing else. An index that
// wants to stay in step with writes registers a Hook, which runs inside the
// write transaction with the Change it produced; an index that can lag follows
// Changes instead. Tx hands an index the transaction behind a Reader so it can
// query its own tables at the same snapshot.
//
// A write can also run inside a transaction the application owns, so a grant
// commits with the row it protects or not at all: TransactIn takes the
// application's pgx.Tx and does everything Transact does except begin and
// commit.
package postgres

import (
	"context"
	"embed"
	"errors"
	"fmt"
	"io/fs"
	"sort"
	"strings"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/matick-io/authz"
)

// Migrations holds the goose-annotated SQL that creates the authz schema. The
// host's migration runner can apply it, or Migrate applies the Up sections
// directly.
//
//go:embed migrations/*.sql
var Migrations embed.FS

// Migrate applies the Up section of every embedded migration, in file order.
// Every statement is idempotent, so running it again is harmless.
func Migrate(ctx context.Context, pool *pgxpool.Pool) error {
	return ApplyMigrations(ctx, pool, Migrations, "migrations")
}

// ApplyMigrations applies the Up sections of goose-annotated SQL files found
// in dir of fsys, in name order. Index packages reuse it for their own tables.
func ApplyMigrations(ctx context.Context, pool *pgxpool.Pool, fsys fs.FS, dir string) error {
	entries, err := fs.ReadDir(fsys, dir)
	if err != nil {
		return err
	}
	names := make([]string, 0, len(entries))
	for _, e := range entries {
		names = append(names, e.Name())
	}
	sort.Strings(names)
	for _, name := range names {
		raw, err := fs.ReadFile(fsys, dir+"/"+name)
		if err != nil {
			return err
		}
		if _, err := pool.Exec(ctx, upSection(string(raw))); err != nil {
			return fmt.Errorf("migration %s: %w", name, err)
		}
	}
	return nil
}

func upSection(sql string) string {
	_, after, ok := strings.Cut(sql, "-- +goose Up")
	if !ok {
		return sql
	}
	before, _, _ := strings.Cut(after, "-- +goose Down")
	return before
}

// Hook runs inside a write transaction, after the relationships and the
// change log rows are written and before commit, with the Change the
// transaction produced. Returning an error rolls the whole write back.
type Hook func(ctx context.Context, tx pgx.Tx, change authz.Change) error

// Datastore is the Postgres-backed store.
type Datastore struct {
	pool  *pgxpool.Pool
	hooks []Hook
}

// Option configures New.
type Option func(*Datastore)

// WithHook registers a Hook. Hooks run in registration order.
func WithHook(h Hook) Option {
	return func(d *Datastore) { d.hooks = append(d.hooks, h) }
}

// New wraps a pool. The authz schema must exist; see Migrate.
func New(pool *pgxpool.Pool, opts ...Option) *Datastore {
	d := &Datastore{pool: pool}
	for _, o := range opts {
		o(d)
	}
	return d
}

// changelogLockKey serialises the tail of every write transaction that
// changed something, so revisions are handed out in commit order and a reader
// of Changes never sees a later revision before an earlier one commits.
const changelogLockKey = 0x6368616e6765 // "change"

// View runs fn in a repeatable-read, read-only transaction.
func (d *Datastore) View(ctx context.Context, fn func(authz.Reader) error) error {
	tx, err := d.pool.BeginTx(ctx, pgx.TxOptions{IsoLevel: pgx.RepeatableRead, AccessMode: pgx.ReadOnly})
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx) //nolint:errcheck // AI: rollback after commit is a no-op
	if err := fn(&conn{q: tx}); err != nil {
		return err
	}
	return tx.Commit(ctx)
}

// Transact runs fn in a read-committed transaction of its own, records the
// change it produced, runs the hooks, and commits if everything returned nil.
func (d *Datastore) Transact(ctx context.Context, fn func(authz.Writer) error) error {
	tx, err := d.pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx) //nolint:errcheck // AI: rollback after commit is a no-op
	if err := d.TransactIn(ctx, tx, fn); err != nil {
		return err
	}
	return tx.Commit(ctx)
}

// TransactIn is Transact inside a transaction the caller owns: fn runs on a
// Writer over tx, then the change is recorded and the hooks run, all in tx,
// and the caller commits or rolls back. It is how a grant lands in the same
// transaction as the application row it protects:
//
//	tx, err := pool.Begin(ctx)
//	defer tx.Rollback(ctx)
//	// ... insert the row ...
//	err = ds.TransactIn(ctx, tx, func(w authz.Writer) error {
//	    return svc.WriteRelationshipsIn(ctx, w, updates)
//	})
//	// ... commit
//
// Call it last, just before the commit: the change log's lock is taken here
// and held until tx ends, and every other write that changed something waits
// on it. AI: the change log and the hooks belong to the write, not to the
// commit, so they run here rather than in Transact; a Writer handed out
// without them would leave every index and mirror behind.
func (d *Datastore) TransactIn(ctx context.Context, tx pgx.Tx, fn func(authz.Writer) error) error {
	c := &conn{q: tx}
	if err := fn(c); err != nil {
		return err
	}
	return d.finish(ctx, tx, c)
}

// finish is the tail of every write that may have changed something: the
// change log rows and the hooks, inside tx. A write that changed nothing
// records nothing and runs no hook.
func (d *Datastore) finish(ctx context.Context, tx pgx.Tx, c *conn) error {
	if len(c.recorded) == 0 {
		return nil
	}
	change, err := c.logChange(ctx)
	if err != nil {
		return err
	}
	for _, h := range d.hooks {
		if err := h(ctx, tx, change); err != nil {
			return err
		}
	}
	return nil
}

// CreateAll implements authz.BulkCreator: one COPY into the relationships,
// one Change, the hooks once, one commit.
func (d *Datastore) CreateAll(ctx context.Context, rels []authz.Relationship) error {
	if len(rels) == 0 {
		return nil
	}
	tx, err := d.pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx) //nolint:errcheck
	rows := make([][]any, len(rels))
	for i, r := range rels {
		rows[i] = values(r)
	}
	if _, err := tx.CopyFrom(ctx, pgx.Identifier{"authz", "relationship"}, columnNames, pgx.CopyFromRows(rows)); err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == "23505" {
			return fmt.Errorf("%w: %s", authz.ErrRelationshipExists, pgErr.Detail)
		}
		return err
	}
	c := &conn{q: tx}
	for _, r := range rels {
		c.record(authz.OperationTouch, r)
	}
	if err := d.finish(ctx, tx, c); err != nil {
		return err
	}
	// AI: a bulk load leaves the planner's statistics behind until autoanalyze
	// catches up, and until then every query on the new rows plans as if the
	// table were empty; the first benchmark after an import measured that.
	if _, err := tx.Exec(ctx, "analyze authz.relationship"); err != nil {
		return err
	}
	return tx.Commit(ctx)
}

// Tx returns the transaction behind a Reader or Writer this package produced,
// so an index kept in the same database can query its tables at the same
// snapshot and maintain them in the same write.
func Tx(r authz.Reader) (pgx.Tx, bool) {
	c, ok := r.(*conn)
	if !ok {
		return nil, false
	}
	return c.q, true
}

type conn struct {
	q        pgx.Tx
	recorded []authz.RelationshipUpdate
}

const columns = "resource_type, resource_id, relation, subject_type, subject_id, subject_relation"

var columnNames = []string{"resource_type", "resource_id", "relation", "subject_type", "subject_id", "subject_relation"}

func (c *conn) Relationships(ctx context.Context, q authz.RelationshipQuery) ([]authz.Relationship, error) {
	where, args := predicate(q)
	sql := "select " + columns + " from authz.relationship" + where + " order by " + columns
	if q.Limit > 0 {
		args = append(args, q.Limit)
		sql += fmt.Sprintf(" limit $%d", len(args))
	}
	rows, err := c.q.Query(ctx, sql, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	return scanRelationships(rows)
}

func scanRelationships(rows pgx.Rows) ([]authz.Relationship, error) {
	var out []authz.Relationship
	for rows.Next() {
		var r authz.Relationship
		if err := rows.Scan(&r.Resource.Type, &r.Resource.ID, &r.Relation, &r.Subject.Object.Type, &r.Subject.Object.ID, &r.Subject.Relation); err != nil {
			return nil, err
		}
		out = append(out, r)
	}
	return out, rows.Err()
}

func (c *conn) RelationshipKinds(ctx context.Context) ([]authz.RelationshipKind, error) {
	rows, err := c.q.Query(ctx, `
		select distinct resource_type, relation, subject_type, subject_relation
		from authz.relationship
		order by resource_type, relation, subject_type, subject_relation`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []authz.RelationshipKind
	for rows.Next() {
		var k authz.RelationshipKind
		if err := rows.Scan(&k.ResourceType, &k.Relation, &k.SubjectType, &k.SubjectRelation); err != nil {
			return nil, err
		}
		out = append(out, k)
	}
	return out, rows.Err()
}

func (c *conn) Changes(ctx context.Context, after authz.Revision, limit int) ([]authz.Change, error) {
	sql := "select revision, operation, " + columns + " from authz.relationship_change where revision > $1"
	args := []any{int64(after)}
	if limit > 0 {
		sql += " and revision in (select distinct revision from authz.relationship_change where revision > $1 order by revision limit $2)"
		args = append(args, limit)
	}
	sql += " order by revision, seq"
	rows, err := c.q.Query(ctx, sql, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []authz.Change
	for rows.Next() {
		var rev int64
		var op int16
		var r authz.Relationship
		if err := rows.Scan(&rev, &op, &r.Resource.Type, &r.Resource.ID, &r.Relation, &r.Subject.Object.Type, &r.Subject.Object.ID, &r.Subject.Relation); err != nil {
			return nil, err
		}
		if len(out) == 0 || out[len(out)-1].Revision != authz.Revision(rev) {
			out = append(out, authz.Change{Revision: authz.Revision(rev)})
		}
		last := &out[len(out)-1]
		last.Updates = append(last.Updates, authz.RelationshipUpdate{Operation: authz.UpdateOperation(op), Relationship: r})
	}
	return out, rows.Err()
}

// logChange takes the changelog lock, draws the next revision and writes the
// recorded updates under it.
func (c *conn) logChange(ctx context.Context) (authz.Change, error) {
	if _, err := c.q.Exec(ctx, "select pg_advisory_xact_lock($1)", int64(changelogLockKey)); err != nil {
		return authz.Change{}, err
	}
	var rev int64
	if err := c.q.QueryRow(ctx, "select nextval('authz.revision')").Scan(&rev); err != nil {
		return authz.Change{}, err
	}
	rows := make([][]any, len(c.recorded))
	for seq, u := range c.recorded {
		rows[seq] = append([]any{rev, int32(seq), int16(u.Operation)}, values(u.Relationship)...)
	}
	if _, err := c.q.CopyFrom(ctx, pgx.Identifier{"authz", "relationship_change"}, append([]string{"revision", "seq", "operation"}, columnNames...), pgx.CopyFromRows(rows)); err != nil {
		return authz.Change{}, err
	}
	return authz.Change{Revision: authz.Revision(rev), Updates: c.recorded}, nil
}

func (c *conn) record(op authz.UpdateOperation, r authz.Relationship) {
	c.recorded = append(c.recorded, authz.RelationshipUpdate{Operation: op, Relationship: r})
}

func (c *conn) Create(ctx context.Context, r authz.Relationship) error {
	_, err := c.q.Exec(ctx, "insert into authz.relationship ("+columns+") values ($1, $2, $3, $4, $5, $6)", values(r)...)
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) && pgErr.Code == "23505" {
		return fmt.Errorf("%w: %s", authz.ErrRelationshipExists, r)
	}
	if err != nil {
		return err
	}
	c.record(authz.OperationTouch, r)
	return nil
}

func (c *conn) Touch(ctx context.Context, r authz.Relationship) error {
	tag, err := c.q.Exec(ctx, "insert into authz.relationship ("+columns+") values ($1, $2, $3, $4, $5, $6) on conflict do nothing", values(r)...)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 1 {
		c.record(authz.OperationTouch, r)
	}
	return nil
}

func (c *conn) Delete(ctx context.Context, r authz.Relationship) error {
	tag, err := c.q.Exec(ctx, `
		delete from authz.relationship
		where resource_type = $1 and resource_id = $2 and relation = $3
		  and subject_type = $4 and subject_id = $5 and subject_relation = $6`, values(r)...)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 1 {
		c.record(authz.OperationDelete, r)
	}
	return nil
}

func (c *conn) DeleteMatching(ctx context.Context, q authz.RelationshipQuery) (int64, error) {
	where, args := predicate(q)
	rows, err := c.q.Query(ctx, "delete from authz.relationship"+where+" returning "+columns, args...)
	if err != nil {
		return 0, err
	}
	deleted, err := scanRelationships(rows)
	rows.Close()
	if err != nil {
		return 0, err
	}
	sort.Slice(deleted, func(i, j int) bool { return deleted[i].String() < deleted[j].String() })
	for _, r := range deleted {
		c.record(authz.OperationDelete, r)
	}
	return int64(len(deleted)), nil
}

func values(r authz.Relationship) []any {
	return []any{r.Resource.Type, r.Resource.ID, r.Relation, r.Subject.Object.Type, r.Subject.Object.ID, r.Subject.Relation}
}

// predicate renders a RelationshipQuery as a WHERE clause. Id sets bind as one
// text[] parameter, so a set of any size is one round trip.
func predicate(q authz.RelationshipQuery) (string, []any) {
	var conds []string
	var args []any
	add := func(cond string, arg any) {
		args = append(args, arg)
		conds = append(conds, fmt.Sprintf(cond, len(args)))
	}
	if q.ResourceType != "" {
		add("resource_type = $%d", q.ResourceType)
	}
	if len(q.ResourceIDs) > 0 {
		add("resource_id = any($%d)", q.ResourceIDs)
	}
	if q.Relation != "" {
		add("relation = $%d", q.Relation)
	}
	if q.SubjectType != "" {
		add("subject_type = $%d", q.SubjectType)
	}
	if len(q.SubjectIDs) > 0 {
		add("subject_id = any($%d)", q.SubjectIDs)
	}
	if q.SubjectRelation != nil {
		add("subject_relation = $%d", *q.SubjectRelation)
	}
	if len(conds) == 0 {
		return "", nil
	}
	return " where " + strings.Join(conds, " and "), args
}
