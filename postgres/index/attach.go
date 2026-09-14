package index

import (
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/engine"
	pgstore "github.com/matick-io/authz/postgres"
	"github.com/matick-io/authz/schema"
)

// Attached is an index wired into a deployment: Datastore keeps the index in
// step through Hook, Options make the engine read it. Pass both to
// engine.New. The hook without the options leaves the index maintained but
// unread; the options without the hook leave it stale.
type Attached struct {
	Index     *Index
	Datastore *pgstore.Datastore
	Options   []engine.Option
}

// Attach wires an index in one call: it builds the index for the schema,
// hooks it into a datastore on pool, and returns both with the engine
// options that read the index. Every permission Materializable allows
// becomes a permission set; pass WithPermissionSets to narrow that, with no
// names for the closure alone. The index tables must exist (Migrate).
//
//	a, err := index.Attach(pool, sch)
//	svc, err := engine.New(a.Datastore, sch, a.Options...)
func Attach(pool *pgxpool.Pool, sch *schema.Schema, opts ...Option) (*Attached, error) {
	if sch == nil {
		return nil, fmt.Errorf("%w: nil schema", authz.ErrInvalidArgument)
	}
	idx, err := New(append([]Option{WithPermissionSets(sch, Materializable(sch)...)}, opts...)...)
	if err != nil {
		return nil, err
	}
	return &Attached{Index: idx, Datastore: pgstore.New(pool, pgstore.WithHook(idx.Hook())), Options: idx.Options()}, nil
}

// Options returns the engine options that read this index: the nesting
// closure always, the permission sets when any are configured.
func (x *Index) Options() []engine.Option {
	opts := []engine.Option{engine.WithNestingIndex(x)}
	if x.sets != nil {
		opts = append(opts, engine.WithPermissionIndex(x))
	}
	return opts
}
