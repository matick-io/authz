package materialize

import (
	"context"
	"fmt"
	"sort"
	"strings"

	"github.com/matick-io/authz"
)

// Rows is what an index stores, rendered one row per line: closure rows as
// `ancestor > descendant`, set rows as `resource#permission <- set`. Sorted.
type Rows struct {
	Closure, Sets []string
}

// Derive computes the rows an index should hold for rels: the closure, and,
// when sets is configured, the set rows of every resource rels mention.
func Derive(ctx context.Context, sets *Sets, rels []authz.Relationship) (Rows, error) {
	var out Rows
	for _, e := range Closure(rels) {
		out.Closure = append(out.Closure, e.String())
	}
	if !sets.Empty() {
		rows, err := sets.NewDerivation(listSource(rels)).Rows(ctx, resourcesOf(sets, rels))
		if err != nil {
			return Rows{}, err
		}
		for _, r := range rows {
			out.Sets = append(out.Sets, r.String())
		}
	}
	return out, nil
}

// Drift is how a maintained index differs from a fresh derivation: rows it
// holds that the derivation does not (Extra), and rows it lacks (Missing).
type Drift struct {
	ClosureMissing, ClosureExtra []string
	SetsMissing, SetsExtra       []string
}

// Empty reports whether the maintained index matches the derivation.
func (d Drift) Empty() bool {
	return len(d.ClosureMissing) == 0 && len(d.ClosureExtra) == 0 && len(d.SetsMissing) == 0 && len(d.SetsExtra) == 0
}

func (d Drift) String() string {
	if d.Empty() {
		return "index matches a recomputation"
	}
	var b strings.Builder
	section := func(name string, rows []string) {
		if len(rows) == 0 {
			return
		}
		fmt.Fprintf(&b, "%s (%d):\n", name, len(rows))
		for _, r := range rows {
			fmt.Fprintf(&b, "  %s\n", r)
		}
	}
	section("closure rows missing", d.ClosureMissing)
	section("closure rows extra", d.ClosureExtra)
	section("permission set rows missing", d.SetsMissing)
	section("permission set rows extra", d.SetsExtra)
	return b.String()
}

// Compare reports how the rows an index holds differ from the rows it
// should hold.
func Compare(have, want Rows) Drift {
	var d Drift
	d.ClosureMissing, d.ClosureExtra = diffSorted(sorted(have.Closure), sorted(want.Closure))
	d.SetsMissing, d.SetsExtra = diffSorted(sorted(have.Sets), sorted(want.Sets))
	return d
}

func sorted(rows []string) []string {
	out := append([]string(nil), rows...)
	sort.Strings(out)
	return out
}

// diffSorted returns the rows only in want (missing) and only in have (extra).
func diffSorted(have, want []string) (missing, extra []string) {
	i, j := 0, 0
	for i < len(have) || j < len(want) {
		switch {
		case j == len(want) || (i < len(have) && have[i] < want[j]):
			extra = append(extra, have[i])
			i++
		case i == len(have) || want[j] < have[i]:
			missing = append(missing, want[j])
			j++
		default:
			i++
			j++
		}
	}
	return missing, extra
}
