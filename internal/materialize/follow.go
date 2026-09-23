package materialize

import (
	"context"
	"time"

	"github.com/matick-io/authz"
)

// Applier is an index fed from the change log: it knows the revision it
// has applied up to, and applies one change together with the advance of
// that cursor, atomically, so a crash between the two cannot happen.
type Applier interface {
	Cursor(ctx context.Context) (authz.Revision, error)
	Apply(ctx context.Context, change authz.Change) error
}

// Catchup applies every change after the applier's cursor, reading batch
// changes at a time, and reports how many it applied. It is one pass; Follow
// loops. AI: this is the asynchronous way to run an index, the trade AuthZed
// Materialize makes: the engine then reads an index that may trail the
// relationships by the lag of the follower.
func Catchup(ctx context.Context, ds authz.Datastore, a Applier, batch int) (int, error) {
	if batch <= 0 {
		batch = 100
	}
	applied := 0
	for {
		cursor, err := a.Cursor(ctx)
		if err != nil {
			return applied, err
		}
		var changes []authz.Change
		if err := ds.View(ctx, func(r authz.Reader) error {
			var err error
			changes, err = r.Changes(ctx, cursor, batch)
			return err
		}); err != nil {
			return applied, err
		}
		if len(changes) == 0 {
			return applied, nil
		}
		for _, change := range changes {
			if err := a.Apply(ctx, change); err != nil {
				return applied, err
			}
			applied++
		}
	}
}

// Follow runs Catchup every interval until ctx ends. Errors are sent on errs
// when there is room and never stop the loop.
func Follow(ctx context.Context, ds authz.Datastore, a Applier, interval time.Duration, errs chan<- error) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()
	for {
		if _, err := Catchup(ctx, ds, a, 0); err != nil && errs != nil {
			select {
			case errs <- err:
			default:
			}
		}
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
		}
	}
}
