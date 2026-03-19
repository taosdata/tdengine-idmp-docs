# Tooling and Operations

Scripts, CI integration, scheduled runs, and file locations.

## Scripts

All scripts live in `scripts/capabilities/`. Python 3.10+.

### 1. `parse.py` — Section Parsing (No AI)

Reads the doc tree, splits into sections, writes `capabilities.sections.yaml`.

```
Usage:
  python scripts/capabilities/parse.py                                      # Regenerate sections file
  python scripts/capabilities/parse.py --check                              # CI mode: compare against committed file, exit 1 if stale
  python scripts/capabilities/parse.py --include 03-data-modeling 04-visualization
  python scripts/capabilities/parse.py --exclude 16-best-practices
```

- No AI calls — fast, deterministic, always regenerates from scratch
- `--check` mode: re-parses and compares against committed `capabilities.sections.yaml` without overwriting it. Reports stale files. Used in CI.
- Apply scope policy by default; `--include`/`--exclude` override for ad-hoc runs
- Dependencies: `pyyaml` only

### 2. `extract.py` — AI Extraction

Reads `capabilities.sections.yaml`, sends sections to AI, writes `capabilities.extraction-cache.yaml`.

```
Usage:
  python scripts/capabilities/extract.py                    # Full extraction
  python scripts/capabilities/extract.py --incremental      # Only changed sections
  python scripts/capabilities/extract.py --dry-run           # Show what would be re-extracted
  python scripts/capabilities/extract.py --bootstrap         # First run: also generate draft taxonomy
```

Modes:
- **Full** — extracts all sections, rebuilds cache from scratch
- **Incremental** — compares `section_id` + `content_hash` against cache, only re-extracts changed/new sections. Handles moves by matching `content_hash` across different `section_id`s.
- **Dry run** — reports what changed without calling AI
- **Bootstrap** — full extraction + generate draft `capabilities.taxonomy.yaml`

Dependencies: `pyyaml`, `anthropic`

### 3. `generate.py` — Join & Generate

Joins the extraction cache with the taxonomy to produce `capabilities.yaml`.

```
Usage:
  python scripts/capabilities/generate.py
  python scripts/capabilities/generate.py --format markdown   # Also output capabilities.md
  python scripts/capabilities/generate.py --include-low-confidence
```

Outputs:
- `capabilities.yaml` — the full capability list with cross-references
- `capabilities.md` (with `--format markdown`) — readable table grouped by category
- Prints unmatched capabilities to stdout for human triage

Dependencies: `pyyaml`

### 4. `validate.py` — CI Validation

Lightweight checks, no AI. See `03-data-contracts.md` for the full list of validation rules.

```
Usage:
  python scripts/capabilities/validate.py
  python scripts/capabilities/validate.py --strict    # Treat warnings as errors
```

Checks include:
- Path and reference integrity (all files and section_ids resolve)
- Taxonomy integrity (no duplicate IDs/aliases, valid enums, valid parent chains)
- Coverage checks (warn on missing `defined_in`, orphaned capabilities, unmatched IDs)
- Cross-consistency (cache hashes match sections file)

Exit code 0 if clean, 1 if errors found. Warnings printed but don't fail unless `--strict`.

Dependencies: `pyyaml`

## CI Integration

Add to `.github/workflows/check_docs.yaml`:

```yaml
- name: Check capability list freshness
  run: |
    python3 scripts/capabilities/parse.py --check
    python3 scripts/capabilities/validate.py
```

The `parse.py --check` mode re-parses the doc tree and compares the result against the committed `capabilities.sections.yaml`. If they differ (e.g., a doc was edited or renamed but the sections file wasn't regenerated), it exits with code 1 and reports which files are stale. This is fast (no AI, pure Python) and catches the most common drift scenario: someone edits docs without re-running the pipeline.

The `validate.py` step then checks all the schema and cross-reference rules.

Together, CI catches:
- Stale sections file (docs changed but `parse.py` wasn't re-run)
- Broken file references after doc renames/deletes
- Schema issues in the taxonomy file
- Stale cache (hash mismatches between sections and cache)
- Orphaned or unmatched capabilities

CI does **not** run AI extraction — only parsing freshness checks and validation.

## Scheduled Extraction (Optional)

A GitHub Actions workflow for periodic incremental extraction:

```yaml
name: Update capability list
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday
  workflow_dispatch: {}    # Manual trigger

jobs:
  extract:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r scripts/capabilities/requirements.txt
      - run: python scripts/capabilities/parse.py
      - run: python scripts/capabilities/extract.py --incremental
      - run: python scripts/capabilities/generate.py
      - run: python scripts/capabilities/validate.py
      - uses: peter-evans/create-pull-request@v5
        with:
          title: "chore: update capability extraction cache"
          body: "Automated incremental extraction. Review unmatched capabilities."
```

This creates a PR for human review, never auto-commits.

## File Locations

```
repo-root/
├── capabilities.sections.yaml          # Machine-generated, no AI (committed)
├── capabilities.extraction-cache.yaml  # Machine-generated, AI (committed)
├── capabilities.taxonomy.yaml          # Human-curated (committed)
├── capabilities.yaml                   # Generated output (committed)
├── capabilities.md                     # Generated markdown (optional, committed)
└── scripts/capabilities/
    ├── parse.py                        # Section parsing (no AI)
    ├── extract.py                      # AI extraction
    ├── generate.py                     # Join & generate
    ├── validate.py                     # CI validation
    └── requirements.txt                # pyyaml, anthropic
```

All data files are committed so the capability list is available without running extraction.

## Typical Operator Workflows

### First-time setup

```bash
python scripts/capabilities/parse.py
python scripts/capabilities/extract.py --bootstrap
# Review and curate capabilities.taxonomy.yaml
python scripts/capabilities/generate.py
python scripts/capabilities/validate.py
```

### After editing docs

```bash
python scripts/capabilities/parse.py
python scripts/capabilities/extract.py --incremental
python scripts/capabilities/generate.py
# Review any unmatched capabilities, update taxonomy if needed
python scripts/capabilities/validate.py
```

### Quarterly audit

```bash
python scripts/capabilities/parse.py
python scripts/capabilities/extract.py          # Full re-extraction
python scripts/capabilities/generate.py --format markdown
python scripts/capabilities/validate.py --strict
# Review capabilities.md for completeness
```
