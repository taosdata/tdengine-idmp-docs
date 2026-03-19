# Tooling and Operations

Scripts, CI integration, scheduled runs, and file locations.

## Scripts

All scripts live in `sub-projects/capability-map/scripts/`. Python 3.10+. All commands below assume you are running from the `sub-projects/capability-map/` directory.

### 1. `parse.py` — Section Parsing (No AI)

Reads the doc tree, splits into sections, writes the `.sections/` directory and `.sections/manifest.yaml`.

```
Usage:
  python scripts/parse.py                                      # Regenerate .sections/ directory
  python scripts/parse.py --check                              # CI mode: compare against committed file, exit 1 if stale
  python scripts/parse.py --include 03-data-modeling 04-visualization
  python scripts/parse.py --exclude 16-best-practices
```

- No AI calls — fast, deterministic, always regenerates from scratch
- `--check` mode: re-parses into a temp location and compares `manifest.yaml` against existing `.sections/manifest.yaml` without overwriting. Reports stale/new/deleted sections. Used in CI.
- Apply scope policy by default; `--include`/`--exclude` override for ad-hoc runs
- Dependencies: `pyyaml` only

### 2. `prepare.py` — Extraction Prep (No AI)

Reports extraction status and writes the AI prompt. **Does not modify `capabilities.section-map.yaml`** — that is owned by `merge.py`.

```
Usage:
  python scripts/prepare.py                    # Report status, write prompt if needed
  python scripts/prepare.py --force            # Delete all extraction.yaml, forcing full re-extraction
  python scripts/prepare.py --check            # CI mode: exit 1 if sections need extraction, don't modify anything
  python scripts/prepare.py --bootstrap        # Generate draft taxonomy from section map (first run)
```

- Compares `.sections/manifest.yaml` against section map to report which sections need extraction
- Stale `extraction.yaml` files are already deleted by `parse.py`; `--force` deletes all of them
- Writes `.sections/extraction-prompt.md` (generic, stable prompt — only written on first run)
- If nothing needs extraction, reports "section map is up to date"

Dependencies: `pyyaml` only

### 3. AI Extraction (Manual — AI Agent)

The operator directs an AI agent (e.g., Claude Code) to read `.sections/extraction-prompt.md`. The agent walks `.sections/`, reads each `section.md` that has no `extraction.yaml`, and writes `extraction.yaml` in the same directory. This is a manual step — see `04-pipeline.md` Stage 3 for the workflow.

### 4. `merge.py` — Result Collection & Merge (No AI)

**Sole writer of `capabilities.section-map.yaml`.** Rebuilds the section map from `.sections/manifest.yaml`, `extraction.yaml` files, and the previous section map (for carry-forward).

```
Usage:
  python scripts/merge.py                      # Rebuild section map from extraction results
```

- Uses `.sections/manifest.yaml` as authoritative section list
- Walks `.sections/` for directories containing `extraction.yaml`
- Only merges `extraction.yaml` if adjacent `meta.yaml` `content_hash` matches the manifest (rejects stale files)
- Carries forward existing section map entries for sections not re-extracted (content_hash match)
- Remaps moved sections (content_hash match at different section_id)
- Drops deleted sections (in old section map but not in manifest)
- Validates, normalizes capability IDs, deduplicates within sections
- Enriches each entry with `file`, `heading`, `heading_level`, `anchor` from adjacent `meta.yaml`
- Writes `capabilities.section-map.yaml` atomically
- Skips malformed `extraction.yaml` files with a warning (does not block valid results)

Dependencies: `pyyaml` only

### 5. `validate.py` — CI Validation

Lightweight checks, no AI. See `03-data-contracts.md` for the full list of validation rules.

```
Usage:
  python scripts/validate.py
  python scripts/validate.py --strict    # Treat warnings as errors
```

Checks include:
- Path and reference integrity (all files and section_ids resolve)
- Taxonomy integrity (no duplicate IDs/aliases, valid enums, valid parent chains)
- Coverage checks (warn on capabilities with no `defined` sections, orphaned capabilities, unmatched IDs)
- Cross-consistency (section map hashes match `.sections/manifest.yaml`)

Exit code 0 if clean, 1 if errors found. Warnings printed but don't fail unless `--strict`.

Dependencies: `pyyaml`

## CI Integration (Future Work)

> **Note:** CI integration will be added once the core scripts are implemented and validated. The configuration below is planned but not yet active.

Add to `.github/workflows/check_docs.yaml`:

```yaml
- name: Check capability list freshness
  working-directory: sub-projects/capability-map
  run: |
    python3 scripts/parse.py --check
    python3 scripts/validate.py
```

The `parse.py --check` mode re-parses the doc tree into a temporary location and compares the resulting `manifest.yaml` against the existing `.sections/manifest.yaml`. If they differ (e.g., a doc was edited or renamed but `parse.py` wasn't re-run), it exits with code 1 and reports which sections are stale, new, or deleted. This is fast (no AI, pure Python) and catches the most common drift scenario: someone edits docs without re-running the pipeline.

The `validate.py` step then checks all the schema and cross-reference rules.

Together, CI catches:
- Stale `.sections/` (docs changed but `parse.py` wasn't re-run)
- Broken file references after doc renames/deletes
- Schema issues in the taxonomy file
- Stale section map (hash mismatches between sections and section map)
- Orphaned or unmatched capabilities

CI does **not** run AI extraction — only parsing freshness checks and validation.

## Scheduled Extraction (Future Work)

Since extraction requires a manual AI agent step, fully automated scheduled extraction is not possible. However, CI can detect when extraction is needed:

```yaml
- name: Check if extraction is needed
  working-directory: sub-projects/capability-map
  run: |
    python3 scripts/parse.py
    python3 scripts/prepare.py --check   # Exit 1 if sections need extraction
```

This can post a reminder (e.g., Slack notification, GitHub issue comment) when the section map is stale, prompting an operator to run the extraction workflow manually.

## File Locations

```
repo-root/
├── i18n/en/...                                    # The actual docs (unchanged)
└── sub-projects/capability-map/                   # This sub-project
    ├── .sections/                                 # Git-ignored, regenerated by parse.py
    │   ├── manifest.yaml                          # Section index with content hashes
    │   ├── extraction-prompt.md                   # Generic AI prompt (written once by prepare.py)
    │   ├── elements/                              # One dir per source file (stripped name)
    │   │   ├── creating-elements/
    │   │   │   ├── section.md                     # Raw section content (parse.py)
    │   │   │   ├── meta.yaml                      # Section metadata (parse.py)
    │   │   │   └── extraction.yaml                # AI extraction result (AI agent)
    │   │   └── (intro)/
    │   │       ├── section.md
    │   │       ├── meta.yaml
    │   │       └── extraction.yaml
    │   └── ...
    ├── capabilities.section-map.yaml              # Machine-generated via AI agent (committed)
    ├── capabilities.taxonomy.yaml                 # Human-curated (committed)
    ├── plans/                                     # Plan documents
    │   ├── 01-overview.md
    │   ├── ...
    │   └── 07-verification.md
    └── scripts/
        ├── parse.py                               # Section parsing (no AI)
        ├── prepare.py                             # Extraction prep — change detection (no AI)
        ├── merge.py                               # Collect & merge AI results into section map (no AI)
        ├── validate.py                            # CI validation
        └── requirements.txt                       # pyyaml
```

The `.sections/` directory is git-ignored and regenerated by `parse.py`. The two committed data files (`capabilities.section-map.yaml` + `capabilities.taxonomy.yaml`) together form the complete capability inventory and are consumed directly by any reporting or presentation layer.

## Typical Operator Workflows

### First-time setup

```bash
python scripts/parse.py
python scripts/prepare.py
# Direct AI agent to read .sections/extraction-prompt.md and process all sections
python scripts/merge.py
python scripts/prepare.py --bootstrap
# Review and curate capabilities.taxonomy.yaml
python scripts/validate.py
```

### After editing docs

```bash
python scripts/parse.py
python scripts/prepare.py              # Reports which sections need extraction (parse.py already deleted stale extraction.yaml)
# Direct AI agent to read .sections/extraction-prompt.md (it skips sections that already have extraction.yaml)
python scripts/merge.py
# Review any unmatched capabilities, update taxonomy if needed
python scripts/validate.py
```

### Quarterly audit

```bash
python scripts/parse.py
python scripts/prepare.py --force      # Deletes all extraction.yaml files, forcing full re-extraction
# Direct AI agent to read .sections/extraction-prompt.md and process all sections
python scripts/merge.py
python scripts/validate.py --strict
```
