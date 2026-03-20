# Scope Policy

Which documentation chapters are parsed for capability extraction, and why.

## Included chapters

| Chapter | Why |
|---|---|
| 01-introduction | Defines core concepts and architecture |
| 03-data-modeling | Core capability area |
| 04-visualization | Core capability area |
| 05-canvas-panels | Core capability area |
| 06-events | Core capability area |
| 07-real-time-analysis | Core capability area |
| 08-ai-powered-insights | Core capability area |
| 09-advanced-analytics | Core capability area |
| 10-excel-add-in | Core capability area |
| 11-collaboration | Core capability area |
| 12-data-ingestion | Core capability area |
| 13-libraries | Core capability area |
| 14-administration | Core capability area |
| 15-integrating-with-other-systems | Core capability area |

## Excluded chapters

| Chapter | Why |
|---|---|
| 00-index.md | Reading guide — no capabilities |
| 02-get-started | Onboarding tutorials — capabilities defined in their own chapters |
| 16-best-practices | Usage guidance, not capability definitions |
| 17-tutorials | Step-by-step walkthroughs, not definitions |
| 18-troubleshooting | Problem resolution, not definitions |
| 19-glossary | Term definitions, not capabilities |
| 20-roadmap | Planned features — ingested separately into taxonomy as `planned` entries |
| 21-release-history | Version notes, not parsed |

Override defaults with `--include`/`--exclude` flags on `parse.py`.

## What counts as a capability

See [reference/capability-definition.md](../reference/capability-definition.md) for the full definition, examples, naming convention, and the concepts-vs-capabilities distinction.
