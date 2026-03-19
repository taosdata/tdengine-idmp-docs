# Capability List Generation — Overview

## Goal

Build a structured, maintainable inventory of all capabilities in TDengine IDMP, derived from the existing documentation (139 markdown files across ~20 chapters).

## What is a "Capability"?

A capability is a thing the system can do — a task, function, or behavior that a user can use or an administrator can configure. Examples: "Trend Chart," "Element Search," "SSO Authentication," "AI Anomaly Detection."

We use "capability" rather than "feature" because it precisely describes "what the system can do," works at all levels of granularity, and avoids overloaded product/marketing connotations.

## High-Level Approach

We use AI-assisted extraction with a human-curated taxonomy (Option C from our design discussion):

1. **AI reads every doc section** and identifies capabilities mentioned, marking each as "defined" or "referenced"
2. **A human-maintained taxonomy** maps extracted capability IDs to canonical names and categories
3. **The final capability list** is generated automatically by joining extraction results with the taxonomy

This means:
- AI does the heavy lifting (reading, identifying, tracking)
- Humans only make judgment calls (naming, categorizing, grouping)
- The final output is always regenerable — no hand-curated mappings to lose

## Data Flow

```
Docs (source of truth)
    ↓  parse.py (no AI, pure Python)
capabilities.sections.yaml (parsed sections with content and hashes — inspectable intermediate)
    ↓  extract.py (AI extraction per section)
capabilities.extraction-cache.yaml (sections + identified capabilities)
    ↓  generate.py (join with taxonomy)
capabilities.taxonomy.yaml (human-curated canonical names)
    ↓
capabilities.yaml (final output, never hand-edited)
```

## Key Design Decisions

1. **Section-level extraction** — AI analyzes at the H2/H3 heading level, not whole files, for precise cross-referencing
2. **Content-hash identity** — sections are identified by content hash, not file path, so file moves don't trigger re-extraction
3. **Structured extraction** — AI outputs capability IDs in a consistent format during extraction (e.g., `trend-chart`, `anomaly-detection`), reducing alias variation
4. **Defined vs. referenced** — each capability mention is tagged as either "defined here" (canonical source) or "referenced here" (cross-reference)
5. **Incremental updates** — only re-extract sections whose content hash has changed; moves and minor edits don't trigger re-extraction

## Documents in This Plan

| Document | Topic |
|---|---|
| [01-overview.md](01-overview.md) | This document — goals, approach, decisions |
| [02-data-model.md](02-data-model.md) | Schema design for all three data files |
| [03-extraction-process.md](03-extraction-process.md) | Two-stage pipeline: section parsing → AI extraction, with persisted intermediate file |
| [04-taxonomy-curation.md](04-taxonomy-curation.md) | How the human-maintained taxonomy works |
| [05-incremental-updates.md](05-incremental-updates.md) | Change detection, content hashing, handling file moves |
| [06-tooling.md](06-tooling.md) | Scripts, CI integration, generated outputs |
| [07-verification.md](07-verification.md) | How to test the system end-to-end |
