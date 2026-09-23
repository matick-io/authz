module github.com/matick-io/authz/postgres

go 1.25.0

require (
	github.com/jackc/pgx/v5 v5.10.0
	// AI: the core is pinned by version, never by path. A consumer ignores
	// replace directives, so a module that only builds through one only
	// builds here; go.work makes the local core win while developing. Bump
	// the pin when this module needs something newer from the core, and
	// replace it with a tag once one exists.
	github.com/matick-io/authz v0.0.0-20260923122543-36f551dfea5d
)

require (
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761 // indirect
	github.com/jackc/puddle/v2 v2.2.2 // indirect
	golang.org/x/sync v0.17.0 // indirect
	golang.org/x/text v0.29.0 // indirect
)
