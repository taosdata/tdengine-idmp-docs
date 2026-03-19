# Tooling

All scripts live in `scripts/capabilities/` at the repo root. Python 3.10+, dependencies: `pyyaml`, `anthropic` (for AI extraction).

## Scripts

### 1. `parse.py` — Section Parsing (No AI)

Pure Python. Reads the doc tree, splits into sections, writes `capabilities.sections.yaml`.

```
Usage:
  python scripts/capabilities/parse.py
```

No modes needed — it's fast (no AI calls), deterministic, and always regenerates from scratch. Run this before extraction.

### 2. `extract.py` — AI Extraction

Reads `capabilities.sections.yaml`, sends sections to AI, writes `capabilities.extraction-cache.yaml`.

```
Usage:
  python scripts/capabilities/extract.py                    # Full extraction
  python scripts/capabilities/extract.py --incremental      # Only changed sections
  python scripts/capabilities/extract.py --dry-run           # Show what would be re-extracted
```

Modes:
- **Full** — extracts all sections, rebuilds cache from scratch
- **Incremental** — compares content hashes in current `capabilities.sections.yaml` against cache, only re-extracts changed/new sections
- **Dry run** — reports what changed without calling AI

On first run, also generates a draft `capabilities.taxonomy.yaml` with suggested canonical IDs and categories.

### 3. `generate.py` — Join & Generate

Joins the extraction cache with the taxonomy to produce `capabilities.yaml`.

```
Usage:
  python scripts/capabilities/generate.py
  python scripts/capabilities/generate.py --format markdown   # Also output markdown table
```

Outputs:
- `capabilities.yaml` — the full capability list with cross-references
- `capabilities.md` (optional) — a readable markdown table grouped by category
- Prints unmatched capabilities to stdout for human triage

### 4. `validate.py` — CI Validation

Lightweight checks that don't require AI:

```
Usage:
  python scripts/capabilities/validate.py
```

Checks:
- All `file` paths in the cache resolve to actual files
- All `defined_in` / `referenced_in` paths in `capabilities.yaml` resolve
- No duplicate capability IDs in taxonomy
- Every taxonomy entry has required fields (`id`, `name`, `category`, `status`)
- Every `planned` capability has a `roadmap_ref`
- Reports orphaned capabilities (in taxonomy but never found in any doc)

Exit code 0 if clean, 1 with report if issues found.

## CI Integration

Add to `.github/workflows/check_docs.yaml`:

```yaml
- name: Validate capability list
  run: python3 scripts/capabilities/validate.py
```

This runs on every PR and catches:
- Broken file references (docs renamed/deleted without updating cache)
- Schema issues in the taxonomy file
- Orphaned capabilities

Note: CI does **not** run AI extraction — that would be slow and expensive. It only validates the existing data files. AI extraction is run manually or on a schedule.

## File Locations Summary

```
repo-root/
├── capabilities.sections.yaml         # Machine-generated, no AI (committed)
├── capabilities.extraction-cache.yaml # Machine-generated, AI (committed)
├── capabilities.taxonomy.yaml         # Human-curated (committed)
├── capabilities.yaml                  # Generated output (committed)
├── capabilities.md                    # Generated markdown (optional, committed)
└── scripts/capabilities/
    ├── parse.py                       # Section parsing (no AI)
    ├── extract.py                     # AI extraction
    ├── generate.py                    # Join & generate
    ├── validate.py                    # CI validation
    └── requirements.txt               # pyyaml, anthropic
```

All four data files are committed to the repo so they're available without running extraction.

## Optional: Scheduled full extraction

A GitHub Actions workflow that runs full extraction weekly or monthly:

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
          title: "Update capability extraction cache"
          body: "Automated incremental extraction of capability list."
```

This creates a PR with any changes for human review, rather than auto-committing.
