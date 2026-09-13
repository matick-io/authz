// Package dsl parses the SpiceDB schema DSL into a schema.Schema. It is an
// optional layer: the engine takes a schema value and never sees the text.
//
// The subset understood:
//
//	definition <type> {
//	    relation <name>: <type> | <type>#<relation> | <type>:*
//	    permission <name> = <expr>
//	}
//
// where an expression combines relations, permissions and arrows
// (`relation->name`) with `+`, `&` and `-`. Mixing operators in one expression
// requires parentheses, as in SpiceDB. `//` and `/* */` comments are allowed.
package dsl

import (
	"fmt"
	"strings"
	"unicode"

	"github.com/matick-io/authz/schema"
)

// Parse parses and validates schema text. Syntax errors carry a position;
// validation errors come from schema.Build.
func Parse(text string) (*schema.Schema, error) {
	defs, err := newParser(text).parseSchema()
	if err != nil {
		return nil, err
	}
	return schema.Build(defs...)
}

type tokenKind int

const (
	tokEOF tokenKind = iota
	tokIdent
	tokLBrace
	tokRBrace
	tokLParen
	tokRParen
	tokColon
	tokPipe
	tokHash
	tokStar
	tokEquals
	tokPlus
	tokAmp
	tokMinus
	tokArrow
)

var tokenNames = map[tokenKind]string{
	tokEOF: "end of schema", tokIdent: "identifier", tokLBrace: "'{'", tokRBrace: "'}'",
	tokLParen: "'('", tokRParen: "')'", tokColon: "':'", tokPipe: "'|'", tokHash: "'#'",
	tokStar: "'*'", tokEquals: "'='", tokPlus: "'+'", tokAmp: "'&'", tokMinus: "'-'", tokArrow: "'->'",
}

type token struct {
	kind      tokenKind
	text      string
	line, col int
}

type parser struct {
	src       []rune
	pos       int
	line, col int
	tok       token
}

func newParser(text string) *parser {
	p := &parser{src: []rune(text), line: 1, col: 1}
	p.next()
	return p
}

func (p *parser) errorf(t token, format string, args ...any) error {
	return &schema.Error{Line: t.line, Col: t.col, Msg: fmt.Sprintf(format, args...)}
}

func (p *parser) advance() rune {
	r := p.src[p.pos]
	p.pos++
	if r == '\n' {
		p.line++
		p.col = 1
	} else {
		p.col++
	}
	return r
}

func (p *parser) peek(offset int) rune {
	if p.pos+offset >= len(p.src) {
		return 0
	}
	return p.src[p.pos+offset]
}

func (p *parser) skipSpaceAndComments() error {
	for p.pos < len(p.src) {
		r := p.peek(0)
		switch {
		case unicode.IsSpace(r):
			p.advance()
		case r == '/' && p.peek(1) == '/':
			for p.pos < len(p.src) && p.peek(0) != '\n' {
				p.advance()
			}
		case r == '/' && p.peek(1) == '*':
			start := token{line: p.line, col: p.col}
			p.advance()
			p.advance()
			for {
				if p.pos >= len(p.src) {
					return p.errorf(start, "unterminated block comment")
				}
				if p.peek(0) == '*' && p.peek(1) == '/' {
					p.advance()
					p.advance()
					break
				}
				p.advance()
			}
		default:
			return nil
		}
	}
	return nil
}

// next lexes the following token into p.tok. Lexing errors are surfaced as a
// token of kind tokEOF with the message in text, so the parser reports them at
// the point of use with a position.
func (p *parser) next() {
	if err := p.skipSpaceAndComments(); err != nil {
		e := err.(*schema.Error)
		p.tok = token{kind: tokEOF, text: e.Msg, line: e.Line, col: e.Col}
		return
	}
	t := token{line: p.line, col: p.col}
	if p.pos >= len(p.src) {
		t.kind = tokEOF
		p.tok = t
		return
	}
	r := p.advance()
	switch {
	case r == '{':
		t.kind = tokLBrace
	case r == '}':
		t.kind = tokRBrace
	case r == '(':
		t.kind = tokLParen
	case r == ')':
		t.kind = tokRParen
	case r == ':':
		t.kind = tokColon
	case r == '|':
		t.kind = tokPipe
	case r == '#':
		t.kind = tokHash
	case r == '*':
		t.kind = tokStar
	case r == '=':
		t.kind = tokEquals
	case r == '+':
		t.kind = tokPlus
	case r == '&':
		t.kind = tokAmp
	case r == '-':
		if p.peek(0) == '>' {
			p.advance()
			t.kind = tokArrow
		} else {
			t.kind = tokMinus
		}
	case unicode.IsLetter(r) || r == '_':
		var sb strings.Builder
		sb.WriteRune(r)
		for p.pos < len(p.src) {
			n := p.peek(0)
			if unicode.IsLetter(n) || unicode.IsDigit(n) || n == '_' {
				sb.WriteRune(p.advance())
				continue
			}
			break
		}
		t.kind = tokIdent
		t.text = sb.String()
	default:
		t.kind = tokEOF
		t.text = fmt.Sprintf("unexpected character %q", r)
	}
	p.tok = t
}

func (p *parser) expect(kind tokenKind) (token, error) {
	t := p.tok
	if t.kind != kind {
		return t, p.unexpected(tokenNames[kind])
	}
	p.next()
	return t, nil
}

func (p *parser) unexpected(wanted string) error {
	t := p.tok
	if t.kind == tokEOF && t.text != "" {
		return p.errorf(t, "%s", t.text)
	}
	got := tokenNames[t.kind]
	if t.kind == tokIdent {
		got = fmt.Sprintf("%q", t.text)
	}
	return p.errorf(t, "expected %s, found %s", wanted, got)
}

func (p *parser) expectName(what string) (string, token, error) {
	t := p.tok
	if t.kind != tokIdent {
		return "", t, p.unexpected(what + " name")
	}
	if !schema.NameRe.MatchString(t.text) {
		return "", t, p.errorf(t, "%s name %q must be lowercase letters, digits and underscores, starting with a letter, at most 64 characters", what, t.text)
	}
	p.next()
	return t.text, t, nil
}

func (p *parser) keyword(kw string) bool {
	return p.tok.kind == tokIdent && p.tok.text == kw
}

func (p *parser) parseSchema() ([]*schema.Definition, error) {
	var defs []*schema.Definition
	seen := map[string]bool{}
	for p.tok.kind != tokEOF {
		if !p.keyword("definition") {
			return nil, p.unexpected("'definition'")
		}
		p.next()
		d, t, err := p.parseDefinition()
		if err != nil {
			return nil, err
		}
		if seen[d.Name] {
			return nil, p.errorf(t, "definition %q declared twice", d.Name)
		}
		seen[d.Name] = true
		defs = append(defs, d)
	}
	if p.tok.text != "" {
		return nil, p.errorf(p.tok, "%s", p.tok.text)
	}
	return defs, nil
}

func (p *parser) parseDefinition() (*schema.Definition, token, error) {
	name, nameTok, err := p.expectName("definition")
	if err != nil {
		return nil, nameTok, err
	}
	if _, err := p.expect(tokLBrace); err != nil {
		return nil, nameTok, err
	}
	var members []schema.Member
	seen := map[string]bool{}
	for p.tok.kind != tokRBrace {
		var member schema.Member
		var memberName string
		var t token
		switch {
		case p.keyword("relation"):
			p.next()
			rel, tok, err := p.parseRelation()
			if err != nil {
				return nil, nameTok, err
			}
			member, memberName, t = rel, rel.Name, tok
		case p.keyword("permission"):
			p.next()
			perm, tok, err := p.parsePermission()
			if err != nil {
				return nil, nameTok, err
			}
			member, memberName, t = perm, perm.Name, tok
		default:
			return nil, nameTok, p.unexpected("'relation', 'permission' or '}'")
		}
		if seen[memberName] {
			return nil, nameTok, p.errorf(t, "%q is declared twice on %s", memberName, name)
		}
		seen[memberName] = true
		members = append(members, member)
	}
	p.next()
	return schema.Def(name, members...), nameTok, nil
}

func (p *parser) parseRelation() (*schema.Relation, token, error) {
	name, t, err := p.expectName("relation")
	if err != nil {
		return nil, t, err
	}
	if _, err := p.expect(tokColon); err != nil {
		return nil, t, err
	}
	var subjects []schema.AllowedSubject
	for {
		a, err := p.parseAllowedSubject()
		if err != nil {
			return nil, t, err
		}
		subjects = append(subjects, a)
		if p.tok.kind != tokPipe {
			break
		}
		p.next()
	}
	return schema.Rel(name, subjects...), t, nil
}

func (p *parser) parseAllowedSubject() (schema.AllowedSubject, error) {
	typ, _, err := p.expectName("subject type")
	if err != nil {
		return schema.AllowedSubject{}, err
	}
	switch p.tok.kind {
	case tokHash:
		p.next()
		rel, _, err := p.expectName("subject relation")
		if err != nil {
			return schema.AllowedSubject{}, err
		}
		return schema.Userset(typ, rel), nil
	case tokColon:
		p.next()
		if _, err := p.expect(tokStar); err != nil {
			return schema.AllowedSubject{}, err
		}
		return schema.Wildcard(typ), nil
	}
	return schema.Subject(typ), nil
}

func (p *parser) parsePermission() (*schema.Permission, token, error) {
	name, t, err := p.expectName("permission")
	if err != nil {
		return nil, t, err
	}
	if _, err := p.expect(tokEquals); err != nil {
		return nil, t, err
	}
	e, err := p.parseExpr()
	if err != nil {
		return nil, t, err
	}
	return schema.Perm(name, e), t, nil
}

// parseExpr parses `term (op term)*`. AI: as in SpiceDB, one expression may use
// only one operator; mixing + & - requires parentheses, so precedence is never
// a question the reader has to answer.
func (p *parser) parseExpr() (schema.Expr, error) {
	first, err := p.parseTerm()
	if err != nil {
		return nil, err
	}
	var op schema.Op
	var opTok token
	terms := []schema.Expr{first}
	for {
		var cur schema.Op
		switch p.tok.kind {
		case tokPlus:
			cur = schema.Union
		case tokAmp:
			cur = schema.Intersection
		case tokMinus:
			cur = schema.Exclusion
		default:
			if len(terms) == 1 {
				return first, nil
			}
			return foldSetOp(op, terms), nil
		}
		if op != 0 && cur != op {
			return nil, p.errorf(p.tok, "mixing %s and %s in one expression requires parentheses", tokenNames[opTok.kind], tokenNames[p.tok.kind])
		}
		op, opTok = cur, p.tok
		p.next()
		t, err := p.parseTerm()
		if err != nil {
			return nil, err
		}
		terms = append(terms, t)
	}
}

func foldSetOp(op schema.Op, terms []schema.Expr) schema.Expr {
	switch op {
	case schema.Union:
		return schema.UnionOf(terms...)
	case schema.Intersection:
		return schema.IntersectionOf(terms...)
	}
	// a - b - c is (a - b) - c.
	acc := terms[0]
	for _, t := range terms[1:] {
		acc = schema.ExclusionOf(acc, t)
	}
	return acc
}

func (p *parser) parseTerm() (schema.Expr, error) {
	if p.tok.kind == tokLParen {
		p.next()
		e, err := p.parseExpr()
		if err != nil {
			return nil, err
		}
		if _, err := p.expect(tokRParen); err != nil {
			return nil, err
		}
		return e, nil
	}
	if p.tok.kind == tokIdent && p.tok.text == "nil" {
		return nil, p.errorf(p.tok, "'nil' permissions are not supported; omit the permission instead")
	}
	name, _, err := p.expectName("relation or permission")
	if err != nil {
		return nil, err
	}
	if p.tok.kind == tokArrow {
		p.next()
		target, _, err := p.expectName("arrow target")
		if err != nil {
			return nil, err
		}
		return schema.Via(name, target), nil
	}
	return schema.Ref(name), nil
}
