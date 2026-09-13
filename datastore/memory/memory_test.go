package memory_test

import (
	"testing"

	"github.com/matick-io/authz"
	"github.com/matick-io/authz/datastore/datastoretest"
	"github.com/matick-io/authz/datastore/memory"
)

func TestConformance(t *testing.T) {
	datastoretest.Run(t, func(t *testing.T) authz.Datastore { return memory.New() })
}
