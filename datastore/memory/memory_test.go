package memory_test

import (
	"testing"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/datastore/memory"
	"github.com/matick-io/authz/internal/datastoretest"
)

func TestConformance(t *testing.T) {
	datastoretest.Run(t, func(t *testing.T) authz.Datastore {
		ds, err := memory.New()
		if err != nil {
			t.Fatal(err)
		}
		return ds
	})
}
