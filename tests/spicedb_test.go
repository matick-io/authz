package tests

import (
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"regexp"
	"sort"
	"strings"
	"testing"

	v1 "github.com/authzed/authzed-go/proto/authzed/api/v1"
	"github.com/authzed/authzed-go/v1"
	"github.com/authzed/grpcutil"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/status"

	"github.com/matick-io/authz"
)

// AI: SpiceDB as a kind of its own, through the official client, so the same
// samples, scenarios and differential rounds run against it: it is the
// reference the engine is held to, and the benchmark peer. Reads ask for full
// consistency, which is what the engine always gives, so the comparison is
// like for like. AUTHZ_SPICEDB lists instances as label=host:port,
// comma separated, one per datastore SpiceDB is running on, for example
// spicedb-memdb=127.0.0.1:50051,spicedb-postgres=127.0.0.1:50052, so each
// of our kinds has a like-for-like column; AUTHZ_SPICEDB_KEY is the
// preshared key they share.

// spicedbInstance is one reachable SpiceDB, from AUTHZ_SPICEDB.
type spicedbInstance struct {
	label, endpoint, key string
}

func spicedbInstances(tb testing.TB) []spicedbInstance {
	tb.Helper()
	spec := os.Getenv("AUTHZ_SPICEDB")
	if spec == "" {
		return nil
	}
	key := os.Getenv("AUTHZ_SPICEDB_KEY")
	var out []spicedbInstance
	for _, entry := range strings.Split(spec, ",") {
		label, endpoint, ok := strings.Cut(strings.TrimSpace(entry), "=")
		if !ok {
			tb.Fatalf("AUTHZ_SPICEDB entry %q is not label=host:port", entry)
		}
		out = append(out, spicedbInstance{label: label, endpoint: endpoint, key: key})
	}
	return out
}

func (in spicedbInstance) connect(tb testing.TB) *spicedb {
	tb.Helper()
	client, err := authzed.NewClient(in.endpoint, grpcutil.WithInsecureBearerToken(in.key), grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		tb.Fatal(err)
	}
	return &spicedb{client: client}
}

func spicedbKinds(tb testing.TB) []benchKind {
	tb.Helper()
	var kinds []benchKind
	for _, in := range spicedbInstances(tb) {
		in := in
		kinds = append(kinds, benchKind{name: in.label, spicedb: true, acyclicNesting: true, open: func(tb testing.TB, schemaText string) authorizer {
			tb.Helper()
			s := in.connect(tb)
			if err := s.reset(context.Background(), schemaText); err != nil {
				tb.Fatalf("%s reset: %v", in.label, err)
			}
			return s
		}})
	}
	return kinds
}

type spicedb struct {
	client *authzed.Client
}

var fullyConsistent = &v1.Consistency{Requirement: &v1.Consistency_FullyConsistent{FullyConsistent: true}}

// classify maps SpiceDB's refusal to answer past its dispatch depth (fifty
// by default, raised with --dispatch-max-depth) to errUnsupported.
func classify(err error) error {
	if err == nil {
		return nil
	}
	if status.Code(err) == codes.FailedPrecondition && strings.Contains(err.Error(), "max depth exceeded") {
		return fmt.Errorf("%w: spicedb: %v", errUnsupported, err)
	}
	return err
}

// classifyItem does the same for the per-item error of a bulk check, which
// carries a status message rather than a gRPC error.
func classifyItem(code int32, message string) error {
	if codes.Code(code) == codes.FailedPrecondition && strings.Contains(message, "max depth exceeded") {
		return fmt.Errorf("%w: spicedb: %s", errUnsupported, message)
	}
	return fmt.Errorf("spicedb: %s", message)
}

// definitionRe finds the types of a schema as SpiceDB prints it back. AI: the
// stored text is SpiceDB's own rendering, which drops parentheses our parser
// insists on, so the types are read off the text, not parsed.
var definitionRe = regexp.MustCompile(`(?m)^\s*definition\s+([\w/]+)`)

// reset empties every type of the schema currently stored, then writes the
// new schema. SpiceDB refuses to drop a type that still has relationships.
func (s *spicedb) reset(ctx context.Context, schemaText string) error {
	current, err := s.client.ReadSchema(ctx, &v1.ReadSchemaRequest{})
	if err != nil && status.Code(err) != codes.NotFound {
		return err
	}
	if err == nil {
		for _, m := range definitionRe.FindAllStringSubmatch(current.SchemaText, -1) {
			for {
				resp, err := s.client.DeleteRelationships(ctx, &v1.DeleteRelationshipsRequest{
					RelationshipFilter:            &v1.RelationshipFilter{ResourceType: m[1]},
					OptionalLimit:                 1000,
					OptionalAllowPartialDeletions: true,
				})
				if err != nil {
					return err
				}
				if resp.DeletionProgress == v1.DeleteRelationshipsResponse_DELETION_PROGRESS_COMPLETE {
					break
				}
			}
		}
	}
	_, err = s.client.WriteSchema(ctx, &v1.WriteSchemaRequest{Schema: schemaText})
	return err
}

func toObject(o authz.ObjectRef) *v1.ObjectReference {
	return &v1.ObjectReference{ObjectType: o.Type, ObjectId: o.ID}
}

func toSubject(s authz.SubjectRef) *v1.SubjectReference {
	return &v1.SubjectReference{Object: toObject(s.Object), OptionalRelation: s.Relation}
}

func toRelationship(r authz.Relationship) *v1.Relationship {
	return &v1.Relationship{Resource: toObject(r.Resource), Relation: r.Relation, Subject: toSubject(r.Subject)}
}

func (s *spicedb) CheckPermission(ctx context.Context, resource authz.ObjectRef, permission string, subject authz.SubjectRef) (bool, error) {
	resp, err := s.client.CheckPermission(ctx, &v1.CheckPermissionRequest{
		Consistency: fullyConsistent, Resource: toObject(resource), Permission: permission, Subject: toSubject(subject),
	})
	if err != nil {
		return false, classify(err)
	}
	return resp.Permissionship == v1.CheckPermissionResponse_PERMISSIONSHIP_HAS_PERMISSION, nil
}

func (s *spicedb) CheckBulkPermissions(ctx context.Context, requests []authz.CheckPermissionRequest) ([]authz.CheckPermissionResult, error) {
	items := make([]*v1.CheckBulkPermissionsRequestItem, len(requests))
	for i, r := range requests {
		items[i] = &v1.CheckBulkPermissionsRequestItem{Resource: toObject(r.Resource), Permission: r.Permission, Subject: toSubject(r.Subject)}
	}
	resp, err := s.client.CheckBulkPermissions(ctx, &v1.CheckBulkPermissionsRequest{Consistency: fullyConsistent, Items: items})
	if err != nil {
		return nil, classify(err)
	}
	out := make([]authz.CheckPermissionResult, len(requests))
	for i, pair := range resp.Pairs {
		out[i].Request = requests[i]
		switch r := pair.Response.(type) {
		case *v1.CheckBulkPermissionsPair_Item:
			out[i].HasPermission = r.Item.Permissionship == v1.CheckPermissionResponse_PERMISSIONSHIP_HAS_PERMISSION
		case *v1.CheckBulkPermissionsPair_Error:
			out[i].Err = classifyItem(r.Error.Code, r.Error.Message)
		}
	}
	return out, nil
}

// LookupResources reads SpiceDB's stream in one call. AI: the server's
// max-lookup-resources-limit caps a limit a client asks for; an unlimited
// request streams everything. Paging in thousands with cursors was measured
// at twenty times the cost, because every page restarts the query.
func (s *spicedb) LookupResources(ctx context.Context, resourceType, permission string, subject authz.SubjectRef, limit int) ([]string, error) {
	stream, err := s.client.LookupResources(ctx, &v1.LookupResourcesRequest{
		Consistency: fullyConsistent, ResourceObjectType: resourceType, Permission: permission, Subject: toSubject(subject),
	})
	if err != nil {
		return nil, err
	}
	var ids []string
	for {
		resp, err := stream.Recv()
		if errors.Is(err, io.EOF) {
			break
		}
		if err != nil {
			return nil, classify(err)
		}
		ids = append(ids, resp.ResourceObjectId)
	}
	ids = unique(ids)
	if limit > 0 && len(ids) > limit {
		ids = ids[:limit]
	}
	return ids, nil
}

func (s *spicedb) LookupSubjects(ctx context.Context, resource authz.ObjectRef, permission, subjectType, subjectRelation string) (*authz.LookupSubjectsResult, error) {
	stream, err := s.client.LookupSubjects(ctx, &v1.LookupSubjectsRequest{
		Consistency: fullyConsistent, Resource: toObject(resource), Permission: permission,
		SubjectObjectType: subjectType, OptionalSubjectRelation: subjectRelation,
	})
	if err != nil {
		return nil, err
	}
	out := &authz.LookupSubjectsResult{}
	for {
		resp, err := stream.Recv()
		if errors.Is(err, io.EOF) {
			break
		}
		if err != nil {
			return nil, classify(err)
		}
		if resp.Subject.SubjectObjectId == authz.WildcardID {
			out.Wildcard = true
			for _, ex := range resp.ExcludedSubjects {
				out.ExcludedSubjectIDs = append(out.ExcludedSubjectIDs, ex.SubjectObjectId)
			}
			continue
		}
		out.SubjectIDs = append(out.SubjectIDs, resp.Subject.SubjectObjectId)
	}
	if out.Wildcard {
		out.SubjectIDs = nil
	}
	// AI: SpiceDB may stream a subject once per path it was reached by; the
	// answer is a set, so duplicates are dropped before comparing.
	out.SubjectIDs = unique(out.SubjectIDs)
	out.ExcludedSubjectIDs = unique(out.ExcludedSubjectIDs)
	return out, nil
}

func unique(ids []string) []string {
	sort.Strings(ids)
	out := ids[:0]
	for i, id := range ids {
		if i == 0 || id != ids[i-1] {
			out = append(out, id)
		}
	}
	return out
}

func (s *spicedb) WriteRelationships(ctx context.Context, updates []authz.RelationshipUpdate, preconditions ...authz.Precondition) error {
	if len(preconditions) > 0 {
		return errors.New("spicedb kind: preconditions are not wired")
	}
	const batch = 1000
	for start := 0; start < len(updates); start += batch {
		end := start + batch
		if end > len(updates) {
			end = len(updates)
		}
		items := make([]*v1.RelationshipUpdate, 0, end-start)
		for _, u := range updates[start:end] {
			var op v1.RelationshipUpdate_Operation
			switch u.Operation {
			case authz.OperationCreate:
				op = v1.RelationshipUpdate_OPERATION_CREATE
			case authz.OperationTouch:
				op = v1.RelationshipUpdate_OPERATION_TOUCH
			case authz.OperationDelete:
				op = v1.RelationshipUpdate_OPERATION_DELETE
			}
			items = append(items, &v1.RelationshipUpdate{Operation: op, Relationship: toRelationship(u.Relationship)})
		}
		if _, err := s.client.WriteRelationships(ctx, &v1.WriteRelationshipsRequest{Updates: items}); err != nil {
			return err
		}
	}
	return nil
}

func (s *spicedb) ImportRelationships(ctx context.Context, rels []authz.Relationship) error {
	updates := make([]authz.RelationshipUpdate, len(rels))
	for i, r := range rels {
		updates[i] = authz.RelationshipUpdate{Operation: authz.OperationCreate, Relationship: r}
	}
	return s.WriteRelationships(ctx, updates)
}
