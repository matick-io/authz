// Command benchreport turns `go test -bench` output for BenchmarkScenarios
// into Markdown: one table per scenario with an operation per row and an
// engine kind per column, and a bar chart per headline operation. It reads a
// benchmark file and writes to stdout.
//
// AI: benchstat is the tool for the statistics; this only lays the same
// numbers out side by side and draws them, using Mermaid so GitHub renders
// the charts in a run summary or on a page with no further tooling.
package main

import (
	"bufio"
	"fmt"
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

	var b strings.Builder
	b.WriteString("# Engine comparison\n\n")
	b.WriteString("Time per operation in microseconds; lower is better. Every kind answered the same questions with the same results before being timed.\n\n")
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
				if v, ok := value[s][op][k]; ok {
					fmt.Fprintf(&b, " %s |", micros(v))
				} else {
					b.WriteString(" |")
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
					values = append(values, strconv.FormatFloat(v/1000, 'f', 2, 64))
				}
			}
			if len(values) < 2 {
				continue
			}
			fmt.Fprintf(&b, "```mermaid\nxychart-beta\n    title \"%s: %s (µs/op)\"\n    x-axis [%s]\n    y-axis \"µs/op\"\n    bar [%s]\n```\n\n",
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

func micros(ns float64) string {
	switch {
	case ns >= 1e9:
		return fmt.Sprintf("%.2f s", ns/1e9)
	case ns >= 1e6:
		return fmt.Sprintf("%.1f ms", ns/1e6)
	}
	return fmt.Sprintf("%.1f µs", ns/1e3)
}
