package tests

import (
	"os"
	"testing"

	"github.com/matick-io/authz/datastore/postgres/pgtest"
)

func TestMain(m *testing.M) { os.Exit(pgtest.Main(m)) }
