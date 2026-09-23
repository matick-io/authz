module github.com/matick-io/authz/tests

go 1.26.0

require (
	github.com/authzed/authzed-go v1.10.0
	github.com/authzed/grpcutil v0.0.0-20260105210157-e237581949c2
	github.com/jackc/pgx/v5 v5.10.0
	github.com/matick-io/authz v0.0.0
	google.golang.org/grpc v1.83.2
	gopkg.in/yaml.v3 v3.0.1
)

require (
	buf.build/gen/go/bufbuild/protovalidate/protocolbuffers/go v1.36.11-20260415201107-50325440f8f2.1 // indirect
	cloud.google.com/go/compute/metadata v0.9.0 // indirect
	github.com/cenkalti/backoff/v4 v4.3.0 // indirect
	github.com/certifi/gocertifi v0.0.0-20210507211836-431795d63e8d // indirect
	github.com/envoyproxy/protoc-gen-validate v1.3.3 // indirect
	github.com/grpc-ecosystem/go-grpc-middleware v1.4.0 // indirect
	github.com/grpc-ecosystem/grpc-gateway/v2 v2.29.0 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761 // indirect
	github.com/jackc/puddle/v2 v2.2.2 // indirect
	github.com/jzelinskie/stringz v0.0.3 // indirect
	github.com/mfridman/interpolate v0.0.2 // indirect
	github.com/planetscale/vtprotobuf v0.6.1-0.20240319094008-0393e58bdf10 // indirect
	github.com/pressly/goose/v3 v3.28.0 // indirect
	github.com/sethvargo/go-retry v0.4.0 // indirect
	github.com/stretchr/testify v1.12.1 // indirect
	go.uber.org/multierr v1.11.0 // indirect
	go.yaml.in/yaml/v3 v3.0.5 // indirect
	golang.org/x/net v0.58.0 // indirect
	golang.org/x/sync v0.22.0 // indirect
	golang.org/x/sys v0.47.0 // indirect
	golang.org/x/text v0.41.0 // indirect
	google.golang.org/genproto/googleapis/api v0.0.0-20260911204522-f61a6ca850bd // indirect
	google.golang.org/genproto/googleapis/rpc v0.0.0-20260911204522-f61a6ca850bd // indirect
	google.golang.org/protobuf v1.36.12 // indirect
)

replace github.com/matick-io/authz => ../
