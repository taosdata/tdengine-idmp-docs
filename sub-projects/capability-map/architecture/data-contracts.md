# Data Contracts

Schemas, field definitions, and consumer join algorithm for the two committed data files.

## `capabilities.taxonomy.yaml` fields

| Field | Owner | Description |
|---|---|---|
| `id` | Human | Canonical kebab-case identifier |
| `name` | Human | Human-readable display name |
| `category` | Human | Domain category (must exist in `categories` list) |
| `status` | Human | `ga`, `beta`, `preview`, `planned`, `deprecated` |
| `since` | Human | Version string when shipped; `null` for `planned` |
| `tags` | Human | Freeform labels |
| `aliases` | Human | Extracted IDs that map to this canonical entry |
| `parent` | Human | Parent capability ID for sub-capabilities; `null` for top-level |
| `roadmap_ref` | Human | Quarter reference (e.g., `"2026-Q1"`) for `planned`; `null` otherwise |
| `notes` | Human | Free-form notes |

## `capabilities.section-map.yaml` fields

| Field | Source | Description |
|---|---|---|
| `section_id` | parse.py | Stable identity: `{stripped_filename}#{heading_slug}` |
| `file` | parse.py | Full relative path to source doc |
| `heading` | parse.py | Section heading text |
| `heading_level` | parse.py | `0` (intro), `2` (H2), `3` (H3) |
| `anchor` | parse.py | URL fragment for deep links; `null` for intro sections |
| `content_hash` | parse.py | SHA-256 of section content; used for change detection |
| `extracted_at` | AI agent | Date extraction was performed |
| `capabilities[].id` | AI agent | Extracted capability identifier |
| `capabilities[].relation` | AI agent | `defined` or `referenced` |
| `capabilities[].confidence` | AI agent | `high`, `medium`, or `low` |

## Enum definitions

| Field | Valid values | Notes |
|---|---|---|
| `status` | `ga`, `beta`, `preview`, `planned`, `deprecated` | |
| `relation` | `defined`, `referenced` | `defined`: section explains or instructs on the capability. `referenced`: section meaningfully depends on/integrates with it (not incidental mentions). |
| `confidence` | `high`, `medium`, `low` | Low-confidence extractions are included but flagged by `validate.py`. |

## How consumers join the two files

1. Load `capabilities.section-map.yaml` → list of `(section_id, capability_id, relation, confidence)` tuples
2. Load `capabilities.taxonomy.yaml` → canonical definitions with `id`, `name`, `category`, `status`, `since`, `aliases`, `parent`, `ignored`
3. Join extracted IDs to canonical:
   - Direct match on taxonomy `id` → mapped
   - Match on any `aliases` entry → mapped to the owning capability
   - Match on `ignored` list → skip
   - No match → unmatched (flag for triage)
4. For each canonical capability, collect its `defined` and `referenced` sections; use `file` + `anchor` to generate deep links
5. Derive `children` from `parent` fields in the taxonomy
6. Filter by `confidence` as appropriate (e.g., exclude `low` from customer-facing output)
