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
- `--check` mode: re-parses into a temp location and compares `manifest.yaml` against existing `.sections/manifest.yaml` without overwriting. Reports stale/new/deleted sections. Used in CI.
- Apply scope policy by default; `--include`/`--exclude` override for ad-hoc runs
- Dependencies: `pyyaml` only

### 2. `prepare.py` — Extraction Prep (No AI)

Compares `.sections/manifest.yaml` against the section map, determines what needs extraction, and produces a prompt file for the AI agent.

```
Usage:
  python scripts/capabilities/prepare.py                    # Prepare extraction (only changed/new sections)
  python scripts/capabilities/prepare.py --force            # Ignore section map, queue all sections
  python scripts/capabilities/prepare.py --bootstrap        # Generate draft taxonomy from section map (first run)
```

- Compares `section_id` + `content_hash` against section map; only queues changed/new sections
- On first run (no section map), all sections are queued
- Carries forward unchanged section map entries, remaps moved sections, removes deleted sections
- Writes `.sections/extraction-prompt.md` — a self-contained prompt file for the AI agent
- If nothing needs extraction, reports "section map is up to date" and does not create the prompt file

Dependencies: `pyyaml` only

### 3. AI Extraction (Manual — AI Agent)

The operator directs an AI agent (e.g., Claude Code) to read `.sections/extraction-prompt.md` and write results to `capabilities.extraction-result.yaml`. This is a manual step — see `04-pipeline.md` Stage 3 for the workflow.

### 4. `merge.py` — Result Validation & Merge (No AI)

Validates the AI agent's output and merges it into the section map.

```
Usage:
  python scripts/capabilities/merge.py                      # Validate and merge extraction result
```

- Validates that every queued `section_id` has a result entry
- Normalizes capability IDs, deduplicates within sections
- Merges into `capabilities.section-map.yaml` atomically
- Cleans up `capabilities.extraction-result.yaml` and `.sections/extraction-prompt.md` on success

Dependencies: `pyyaml` only

### 5. `validate.py` — CI Validation

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
- Cross-consistency (section map hashes match sections file)

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

The `parse.py --check` mode re-parses the doc tree into a temporary location and compares the resulting `manifest.yaml` against the existing `.sections/manifest.yaml`. If they differ (e.g., a doc was edited or renamed but `parse.py` wasn't re-run), it exits with code 1 and reports which sections are stale, new, or deleted. This is fast (no AI, pure Python) and catches the most common drift scenario: someone edits docs without re-running the pipeline.

The `validate.py` step then checks all the schema and cross-reference rules.

Together, CI catches:
- Stale sections file (docs changed but `parse.py` wasn't re-run)
- Broken file references after doc renames/deletes
- Schema issues in the taxonomy file
- Stale section map (hash mismatches between sections and section map)
- Orphaned or unmatched capabilities

CI does **not** run AI extraction — only parsing freshness checks and validation.

## Scheduled Extraction

Since extraction requires a manual AI agent step, fully automated scheduled extraction is not possible. However, CI can detect when extraction is needed:

```yaml
- name: Check if extraction is needed
  run: |
    python3 scripts/capabilities/parse.py
    python3 scripts/capabilities/prepare.py --check   # Exit 1 if sections need extraction
```

This can post a reminder (e.g., Slack notification, GitHub issue comment) when the section map is stale, prompting an operator to run the extraction workflow manually.

## File Locations

```
repo-root/
├── .sections/                             # Git-ignored, regenerated by parse.py
│   ├── manifest.yaml                      # Section index with content hashes
│   ├── extraction-prompt.md               # Generated by prepare.py (transient)
│   ├── elements/                          # One dir per source file (stripped name)
│   │   ├── creating-elements/
│   │   │   ├── section.md                 # Raw section content
│   │   │   └── meta.yaml                  # Section metadata
│   │   └── (intro)/
│   │       ├── section.md
│   │       └── meta.yaml
│   └── ...
├── capabilities.section-map.yaml          # Machine-generated via AI agent (committed)
├── capabilities.extraction-result.yaml    # AI agent output (transient, deleted after merge)
├── capabilities.taxonomy.yaml             # Human-curated (committed)
└── scripts/capabilities/
    ├── parse.py                           # Section parsing (no AI)
    ├── prepare.py                         # Extraction prep — change detection, prompt generation (no AI)
    ├── merge.py                           # Validate & merge AI results into section map (no AI)
    ├── validate.py                        # CI validation
    └── requirements.txt                   # pyyaml
```

The `.sections/` directory is git-ignored and regenerated by `parse.py`. The two committed data files (`capabilities.section-map.yaml` + `capabilities.taxonomy.yaml`) together form the complete capability inventory and are consumed directly by any reporting or presentation layer.

## Typical Operator Workflows

### First-time setup

```bash
python scripts/capabilities/parse.py
python scripts/capabilities/prepare.py
# Direct AI agent to read .sections/extraction-prompt.md and write capabilities.extraction-result.yaml
python scripts/capabilities/merge.py
python scripts/capabilities/prepare.py --bootstrap
# Review and curate capabilities.taxonomy.yaml
python scripts/capabilities/validate.py
```

### After editing docs

```bash
python scripts/capabilities/parse.py
python scripts/capabilities/prepare.py              # Only changed sections are queued
# Direct AI agent to process .sections/extraction-prompt.md
python scripts/capabilities/merge.py
# Review any unmatched capabilities, update taxonomy if needed
python scripts/capabilities/validate.py
```

### Quarterly audit

```bash
python scripts/capabilities/parse.py
python scripts/capabilities/prepare.py --force      # Queue all sections
# Direct AI agent to process .sections/extraction-prompt.md
python scripts/capabilities/merge.py
python scripts/capabilities/validate.py --strict
```
