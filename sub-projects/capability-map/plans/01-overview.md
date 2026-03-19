# Capability List Generation — Overview

## Goal

Build a structured, maintainable inventory of all capabilities in TDengine IDMP, derived from the existing English documentation (~139 markdown files across ~20 chapters).

## Non-Goals

- Automatically generating marketing copy or customer-facing feature pages
- Replacing the documentation itself — the capability list is a *derived index*, not a substitute
- Covering non-English locales (English is the sole source; see Locale Strategy below)
- Tracking code-level implementation details — only user/admin-facing capabilities

## High-Level Approach

AI-assisted extraction with a human-curated taxonomy:

1. **Parse** every in-scope doc into sections (pure Python, no AI)
2. **Prepare** — detect which sections changed and mark them for extraction
3. **Extract** — AI agent walks section directories, reads each `section.md`, writes `extraction.yaml`
4. **Merge** — collect all `extraction.yaml` files into the section map

This means:
- AI does the heavy lifting (reading, identifying, classifying)
- Humans curate the taxonomy (naming, categorizing, grouping)
- The two committed data files (section map + taxonomy) are the complete source of truth
- Any report or web app consumes these files directly

## Data Flow

```
Docs (source of truth, in-scope files only)
    ↓  parse.py (no AI, pure Python — also deletes stale extraction.yaml)
.sections/ (one directory per section: section.md + meta.yaml, git-ignored)
    ↓  prepare.py (no AI — reports extraction status, writes prompt)
    ↓  AI agent (manual — e.g., Claude Code)
.sections/*/extraction.yaml (one per section, written by AI agent)
    ↓  merge.py (no AI — collect & merge into section map)
capabilities.section-map.yaml (section→capability mappings, committed)
    +
capabilities.taxonomy.yaml (human-curated canonical names, committed)
    =
Complete source of truth — consumed directly by reports, web apps, etc.
```

## Project Setup

This sub-project lives at `sub-projects/capability-map/` and uses its own Python virtual environment to isolate dependencies from the main docs project:

```bash
cd sub-projects/capability-map
python3 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
```

The `.venv/` directory should be git-ignored.

## Key Design Decisions

1. **Section-level extraction** — AI analyzes at the H2/H3 heading level, not whole files, for precise cross-referencing
2. **Stable `section_id`** — each section gets a deterministic ID derived from stripped filename + heading slug, independent of directory path or content. Content hash is used only for change detection.
3. **Per-section extraction** — AI reads one `section.md`, writes one `extraction.yaml` next to it. Simple prompt, no batching, naturally incremental.
4. **Defined vs. referenced** — each capability mention is tagged as either "defined here" (canonical source) or "referenced here" (cross-reference)
5. **Incremental updates** — only re-extract sections whose content hash has changed; file moves update paths without re-extraction
6. **Explicit scope** — only docs that describe product behavior are parsed; glossary, roadmap, release history, and tutorials are excluded by default

## Locale Strategy

This plan targets `i18n/en/` only. English is the sole extraction source. If other locales are added later, the taxonomy (`capabilities.taxonomy.yaml`) is shared across locales — it defines canonical capability IDs and names independent of any single locale's docs. Extraction would run separately per locale, but all results map to the same taxonomy.

## Documents in This Plan

| Document | Topic |
|---|---|
| [01-overview.md](01-overview.md) | This document — goals, non-goals, approach, key decisions |
| [02-scope-and-definitions.md](02-scope-and-definitions.md) | What is a capability, doc inclusion/exclusion policy, edge cases |
| [03-data-contracts.md](03-data-contracts.md) | All schemas: section_id, anchors, file formats, enums, validation rules |
| [04-pipeline.md](04-pipeline.md) | Parsing, extraction prep, AI extraction, merging, failure handling |
| [05-taxonomy-governance.md](05-taxonomy-governance.md) | Curation workflow, capability modeling rubric, metadata ownership |
| [06-tooling-and-operations.md](06-tooling-and-operations.md) | Scripts, CI, scheduled runs, file locations |
| [07-verification.md](07-verification.md) | End-to-end tests and acceptance criteria |
