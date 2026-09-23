// Command benchreport turns `go test -bench` output for BenchmarkScenarios
// into Markdown: one table per scenario with an operation per row and an
// engine kind per column, each of our cells carrying its ratio to the
// like-for-like SpiceDB column, a summary of geometric-mean ratios, and a
// bar chart per headline operation. It reads a benchmark file and writes to
// stdout.
//
// AI: benchstat is the tool for the statistics; this only lays the same
// numbers out side by side, computes the ratios, and draws them with Mermaid
// so GitHub renders the charts in a run summary or on a page with no further
// tooling. Pairing: our memory kind against spicedb-memdb; every postgres
// kind against spicedb-postgres, or spicedb-memdb when that is the only one.
package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"regexp"
	"sort"
	"strconv"
	"strings"
)

// line: BenchmarkScenarios/pattern/name=needle/kind=memory/lookup_needle-16   100   12345 ns/op   ...
var lineRe = regexp.MustCompile(`^BenchmarkScenarios/(.+)/kind=([^/]+)/([^\s-]+)(?:-\d+)?\s+\d+\s+([\d.]+) ns/op`)

type cell struct {
	scenario, kind, op string
	nsPerOp            float64
}

func main() {
	if len(os.Args) != 2 {
		fmt.Fprintln(os.Stderr, "usage: benchreport bench.txt")
		os.Exit(2)
	}
	f, err := os.Open(os.Args[1])
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	defer f.Close()
	var cells []cell
	sc := bufio.NewScanner(f)
	sc.Buffer(make([]byte, 1<<20), 1<<20)
	for sc.Scan() {
		m := lineRe.FindStringSubmatch(sc.Text())
		if m == nil {
			continue
		}
		ns, _ := strconv.ParseFloat(m[4], 64)
		cells = append(cells, cell{scenario: m[1], kind: m[2], op: m[3], nsPerOp: ns})
	}
	if len(cells) == 0 {
		fmt.Fprintln(os.Stderr, "no BenchmarkScenarios lines found")
		os.Exit(1)
	}
	fmt.Print(render(cells))
}

// baselineFor names the SpiceDB kind a kind is compared with, or "".
func baselineFor(kind string, kinds []string) string {
	if strings.HasPrefix(kind, "spicedb") {
		return ""
	}
	has := func(k string) bool {
		for _, x := range kinds {
			if x == k {
				return true
			}
		}
		return false
	}
	if kind == "memory" {
		if has("spicedb-memdb") {
			return "spicedb-memdb"
		}
		return ""
	}
	if has("spicedb-postgres") {
		return "spicedb-postgres"
	}
	if has("spicedb-memdb") {
		return "spicedb-memdb"
	}
	return ""
}

func render(cells []cell) string {
	scenarios := ordered(cells, func(c cell) string { return c.scenario })
	kinds := ordered(cells, func(c cell) string { return c.kind })
	value := map[string]map[string]map[string]float64{} // scenario -> op -> kind -> ns
	ops := map[string][]string{}
	for _, c := range cells {
		if value[c.scenario] == nil {
			value[c.scenario] = map[string]map[string]float64{}
		}
		if value[c.scenario][c.op] == nil {
			value[c.scenario][c.op] = map[string]float64{}
			ops[c.scenario] = append(ops[c.scenario], c.op)
		}
		value[c.scenario][c.op][c.kind] = c.nsPerOp
	}
	ratio := func(s, op, kind string) (float64, bool) {
		base := baselineFor(kind, kinds)
		if base == "" {
			return 0, false
		}
		ours, ok1 := value[s][op][kind]
		theirs, ok2 := value[s][op][base]
		if !ok1 || !ok2 || theirs == 0 {
			return 0, false
		}
		return ours / theirs, true
	}

	var b strings.Builder
	b.WriteString("# Engine comparison\n\n")
	b.WriteString("Time per operation; lower is better. Every kind answered the same questions with the same results before being timed. ")
	b.WriteString("A ratio in parentheses is our time divided by the like-for-like SpiceDB time: memory against spicedb-memdb, the postgres kinds against spicedb-postgres (or spicedb-memdb when that is the only one). Below 1× we are faster. An empty cell is an answer that kind cannot give.\n\n")

	// Summary: geometric mean of ratios per kind, overall and per scenario.
	type acc struct {
		logSum float64
		n      int
	}
	overall := map[string]*acc{}
	perScenario := map[string]map[string]*acc{}
	for _, s := range scenarios {
		perScenario[s] = map[string]*acc{}
		for _, op := range ops[s] {
			for _, k := range kinds {
				if r, ok := ratio(s, op, k); ok && r > 0 {
					if overall[k] == nil {
						overall[k] = &acc{}
					}
					if perScenario[s][k] == nil {
						perScenario[s][k] = &acc{}
					}
					overall[k].logSum += math.Log(r)
					overall[k].n++
					perScenario[s][k].logSum += math.Log(r)
					perScenario[s][k].n++
				}
			}
		}
	}
	var compared []string
	for _, k := range kinds {
		if overall[k] != nil {
			compared = append(compared, k)
		}
	}
	if len(compared) > 0 {
		b.WriteString("## Summary: geometric mean of our time ÷ SpiceDB time\n\n| scenario |")
		for _, k := range compared {
			fmt.Fprintf(&b, " %s vs %s |", k, baselineFor(k, kinds))
		}
		b.WriteString("\n|---|")
		for range compared {
			b.WriteString("---:|")
		}
		b.WriteString("\n| **all scenarios** |")
		for _, k := range compared {
			a := overall[k]
			fmt.Fprintf(&b, " **%s** (%d ops) |", ratioText(math.Exp(a.logSum/float64(a.n))), a.n)
		}
		b.WriteString("\n")
		for _, s := range scenarios {
			fmt.Fprintf(&b, "| %s |", s)
			for _, k := range compared {
				if a := perScenario[s][k]; a != nil && a.n > 0 {
					fmt.Fprintf(&b, " %s |", ratioText(math.Exp(a.logSum/float64(a.n))))
				} else {
					b.WriteString(" |")
				}
			}
			b.WriteString("\n")
		}
		b.WriteString("\n")
	}

	for _, s := range scenarios {
		fmt.Fprintf(&b, "## %s\n\n", s)
		b.WriteString("| op |")
		for _, k := range kinds {
			fmt.Fprintf(&b, " %s |", k)
		}
		b.WriteString("\n|---|")
		for range kinds {
			b.WriteString("---:|")
		}
		b.WriteString("\n")
		for _, op := range ops[s] {
			fmt.Fprintf(&b, "| %s |", op)
			for _, k := range kinds {
				v, ok := value[s][op][k]
				if !ok {
					b.WriteString(" |")
					continue
				}
				if r, ok := ratio(s, op, k); ok {
					fmt.Fprintf(&b, " %s (%s) |", duration(v), ratioText(r))
				} else {
					fmt.Fprintf(&b, " %s |", duration(v))
				}
			}
			b.WriteString("\n")
		}
		b.WriteString("\n")
		for _, op := range ops[s] {
			if !headline(op) {
				continue
			}
			var labels, values []string
			for _, k := range kinds {
				if v, ok := value[s][op][k]; ok {
					labels = append(labels, strconv.Quote(k))
					values = append(values, strconv.FormatFloat(v/1e6, 'f', 3, 64))
				}
			}
			if len(values) < 2 {
				continue
			}
			fmt.Fprintf(&b, "```mermaid\nxychart-beta\n    title \"%s: %s (ms/op)\"\n    x-axis [%s]\n    y-axis \"ms/op\"\n    bar [%s]\n```\n\n",
				s, op, strings.Join(labels, ", "), strings.Join(values, ", "))
		}
	}
	return b.String()
}

// headline picks the operations worth a chart: lookups and the hit check.
func headline(op string) bool {
	return strings.HasPrefix(op, "lookup") || op == "check_hit"
}

func ordered(cells []cell, key func(cell) string) []string {
	seen := map[string]bool{}
	var out []string
	for _, c := range cells {
		k := key(c)
		if !seen[k] {
			seen[k] = true
			out = append(out, k)
		}
	}
	sort.SliceStable(out, func(i, j int) bool { return false })
	return out
}

func duration(ns float64) string {
	switch {
	case ns >= 1e9:
		return fmt.Sprintf("%.2f s", ns/1e9)
	case ns >= 1e6:
		return fmt.Sprintf("%.1f ms", ns/1e6)
	}
	return fmt.Sprintf("%.1f µs", ns/1e3)
}

func ratioText(r float64) string {
	switch {
	case r >= 100:
		return fmt.Sprintf("%.0f×", r)
	case r >= 10:
		return fmt.Sprintf("%.1f×", r)
	}
	return fmt.Sprintf("%.2f×", r)
}
