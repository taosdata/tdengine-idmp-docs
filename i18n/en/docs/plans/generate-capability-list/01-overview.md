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
2. **Extract** capabilities from each section using AI, marking each as "defined" or "referenced"
3. **Join** extraction results with a human-maintained taxonomy of canonical names and categories
4. **Generate** the final capability list automatically

This means:
- AI does the heavy lifting (reading, identifying, tracking)
- Humans only make judgment calls (naming, categorizing, grouping)
- The final output is always regenerable — no hand-curated mappings to lose

## Data Flow

```
Docs (source of truth, in-scope files only)
    ↓  parse.py (no AI, pure Python)
capabilities.sections.yaml (parsed sections with content, hashes, and stable IDs)
    ↓  extract.py (AI extraction per section)
capabilities.extraction-cache.yaml (sections + identified capabilities)
    ↓  generate.py (join with taxonomy)
capabilities.taxonomy.yaml (human-curated canonical names)
    ↓
capabilities.yaml (final output, never hand-edited)
```

## Key Design Decisions

1. **Section-level extraction** — AI analyzes at the H2/H3 heading level, not whole files, for precise cross-referencing
2. **Stable `section_id`** — each section gets a deterministic ID derived from file path + heading path, independent of content. Content hash is used only for change detection.
3. **Structured extraction** — AI outputs capability IDs in a consistent hyphenated format, with a strict per-section response schema
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
| [04-pipeline.md](04-pipeline.md) | Parsing, extraction, post-processing, batching, incremental strategy, failure handling |
| [05-taxonomy-governance.md](05-taxonomy-governance.md) | Curation workflow, capability modeling rubric, metadata ownership |
| [06-tooling-and-operations.md](06-tooling-and-operations.md) | Scripts, CI, scheduled runs, file locations |
| [07-verification.md](07-verification.md) | End-to-end tests and acceptance criteria |
