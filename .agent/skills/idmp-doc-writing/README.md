# idmp-doc-writing

Create and maintain TDengine IDMP end-user manuals and Docusaurus product documentation.

## Description

This skill helps AI agents write user-facing IDMP documentation that passes all CI checks:

- markdownlint (format validation)
- typos (spell checking)
- AutoCorrect (Chinese formatting)

## Files

- `SKILL.md` - Main skill instructions (Agent Skills standard format)
- `CHEATSHEET.md` - Quick reference for common scenarios
- `scripts/check-local.sh` - Local validation script

## Usage

### Claude Code

```text
/idmp-doc-writing
```

### Other AI Agents

Read `SKILL.md` for IDMP user manuals, operation guides, administration guides, API references, translations, or documentation CI failures. Use `idmp-doc-fs` for RS, FS, requirements, architecture, and technical design documents.

### Manual Validation

```bash
bash .agent/skills/idmp-doc-writing/scripts/check-local.sh
```

## Key Rules

1. **Code blocks**: Use ``` backticks with language specification
2. **Links**: Use `[text](url)`, never `<url>`
3. **Bold punctuation**: `**Bold:** text` (space required)
4. **Chinese-English**: Add spaces between Chinese and English/numbers
5. **Headings**: ATX style (#) with space after

## CI Integration

This skill aligns with `.github/workflows/check_docs.yaml` which runs:

- markdownlint-cli / markdownlint-cli2
- typos (with `.github/workflows/typos.toml`)
- AutoCorrect

## References

- [Agent Skills specification](https://agentskills.io/specification)
- Project CI workflow: `.github/workflows/check_docs.yaml`
