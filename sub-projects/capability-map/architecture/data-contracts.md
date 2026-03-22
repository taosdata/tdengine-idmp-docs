# Data Contracts

Schemas, field definitions, and consumer join algorithm for the three committed data files, plus the intermediate manifest used between pipeline stages.

## `capabilities.taxonomy.yaml` — capability set

The taxonomy is a **capability set** conforming to the [capability set format](../reference/capability-set-format.md) with `kind: product`.

### Metadata fields

| Field | Description |
|---|---|
| `version` | Schema version (currently `1.0`) |
| `kind` | Always `product` for this file |
| `name` | Product name (`TDengine IDMP`) |
| `date` | ISO 8601 date when last updated |

### Categories

| Field | Description |
|---|---|
| `id` | Kebab-case category identifier |
| `name` | Human-readable display name |

### Capability fields

| Field | Owner | Description |
|---|---|---|
| `id` | Human | Canonical kebab-case identifier. See [naming convention](../reference/capability-definition.md#naming-convention). |
| `name` | Human | Human-readable display name. See [naming convention](../reference/capability-definition.md#naming-convention). |
| `category` | Human | Domain category (must reference a `categories` entry) |
| `status` | Human | `ga`, `beta`, `preview`, `planned`, `deprecated` |
| `tags` | Human | Freeform labels |
| `parent` | Human | Parent capability ID for sub-capabilities; `null` for top-level |
| `notes` | Human | Free-form notes |

## `capabilities.aliases.yaml` — alias and ignored-ID mappings

Maps non-canonical IDs (produced by AI extraction) to canonical capability IDs, or marks them as not-capabilities. Separated from the taxonomy so the taxonomy stays conformant to the portable capability set format.

### Fields

| Field | Description |
|---|---|
| `aliases` | Map of `canonical_id → [alias_id, ...]`. Each key must be an `id` in the taxonomy; each value is a list of non-canonical IDs found in extraction output that resolve to that capability. |
| `ignored` | List of `{id, reason}` entries for extracted IDs that are not capabilities. |

## `capabilities.section-map.yaml` — doc-to-capability mapping

### Section fields

| Field | Source | Description |
|---|---|---|
| `section_id` | parse.py | Stable identity: `{stripped_filename}#{heading_slug}` |
| `file` | parse.py | Full relative path to source doc |
| `directory` | parse.py | Parent directory (empty string for root-level files) |
| `heading` | parse.py | Section heading text |
| `heading_level` | parse.py | `0` (intro), `2` (H2), `3` (H3) |
| `anchor` | parse.py | URL fragment for deep links; `null` for intro sections |
| `content_hash` | parse.py | SHA-256 prefix of section content; used for change detection |
| `extracted_at` | AI agent | Date extraction was performed |
| `capabilities[].id` | AI agent | Extracted capability identifier |
| `capabilities[].relation` | AI agent | `defined` or `referenced` |
| `capabilities[].confidence` | AI agent | `high`, `medium`, or `low` |

## `.sections/manifest.yaml` — section manifest (git-ignored)

Written by `parse.py`, consumed by `merge.py` and `validate.py`. The authoritative list of all current sections — used for change detection, carry-forward decisions, and hash consistency checks. See [pipeline.md](pipeline.md) for how each stage uses it.

### Top-level fields

| Field | Description |
|---|---|
| `version` | Schema version (currently `1.0`) |
| `parsed_at` | ISO 8601 date of last `parse.py` run |
| `doc_root` | Relative path to the documentation root |
| `scope` | Include/exclude chapter lists that were applied |
| `total_files` | Number of source doc files parsed |
| `total_sections` | Number of sections produced |

### Entry fields

Each entry in the `sections` list:

| Field | Description |
|---|---|
| `section_id` | Stable identity, same as in the section map |
| `content_hash` | SHA-256 prefix of section content; `merge.py` compares this against extraction results and the previous section map to decide carry-forward vs re-extraction |

Full section metadata (file path, heading, anchor, etc.) lives in each section's `meta.yaml` file within `.sections/`, not in the manifest. The manifest is intentionally minimal — just IDs and hashes — so that diffing between runs is cheap.

The manifest is deterministic: running `parse.py` twice on the same docs produces identical output.

## Enum definitions

| Field | Valid values | Notes |
|---|---|---|
| `status` | `ga`, `beta`, `preview`, `planned`, `deprecated` | |
| `relation` | `defined`, `referenced` | `defined`: section explains or instructs on the capability. `referenced`: section meaningfully depends on/integrates with it (not incidental mentions). |
| `confidence` | `high`, `medium`, `low` | Low-confidence extractions are included but flagged by `validate.py`. |

## How consumers join the three files

1. Load `capabilities.section-map.yaml` → list of `(section_id, capability_id, relation, confidence)` tuples
2. Load `capabilities.taxonomy.yaml` → canonical definitions with `id`, `name`, `category`, `status`, `parent`
3. Load `capabilities.aliases.yaml` → flatten grouped aliases (`canonical → [aliases]`) into a reverse lookup (`alias → canonical`); collect ignored IDs
4. Join extracted IDs to canonical:
   - Direct match on taxonomy `id` → mapped
   - Match in flattened alias lookup → mapped to the canonical ID
   - Match on `ignored` list → skip
   - No match → unmatched (flag for triage)
5. For each canonical capability, collect its `defined` and `referenced` sections; use `file` + `anchor` to generate deep links
6. Derive `children` from `parent` fields in the taxonomy
7. Filter by `confidence` as appropriate (e.g., exclude `low` from customer-facing output)
