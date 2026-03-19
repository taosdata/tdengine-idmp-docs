# Data Contracts

All schemas, ID formats, anchor rules, enums, and validation requirements.

## Section ID Schema

Every parsed section gets a stable `section_id` that does **not** depend on content or directory path. It is derived from the **filename and heading** only, so it survives both content edits and directory moves.

### Format

```
{stripped_filename}#{heading_slug}
```

The `stripped_filename` has the `.md` extension and numeric prefix removed. Examples:

| Source file | section_id |
|---|---|
| `03-data-modeling/01-elements.md`, heading `## Creating Elements` | `elements#creating-elements` |
| `03-data-modeling/01-elements.md`, intro section | `elements#(intro)` |
| `04-visualization/02-chart-types/01-trend-chart.md`, heading `## Configuring Axes` | `trend-chart#configuring-axes` |

### Rules

1. `stripped_filename` is the file's base name with the `.md` extension removed, the numeric ordering prefix stripped, and no directory path. E.g., `03-data-modeling/01-elements.md` → `elements`.
2. `heading_slug` follows the slug algorithm defined below.
3. For content before the first H2, use the literal string `(intro)`.
4. **Duplicate headings within a file**: append `-1`, `-2`, etc. to the second and subsequent occurrences (e.g., `#overview`, `#overview-1`). This matches Docusaurus's default behavior.
5. Custom heading IDs in markdown (e.g., `## My Heading {#custom-id}`) — use the custom ID, skip the slug algorithm.
6. **Filename collisions**: if two or more files in different directories have the same stripped name (e.g., `index` appears in every chapter), disambiguate by prepending parent directory names (also stripped) until all `section_id` values are unique. Start with the immediate parent; if that doesn't resolve the collision, prepend the next ancestor, and so on. Examples: `data-modeling/index#overview` vs `visualization/index#overview`. The `parse.py` script detects collisions automatically and adds the minimum number of parent segments needed for uniqueness.

### Formatting prefix stripping

Filenames and directory names in this repo commonly use numeric prefixes for ordering (e.g., `01-elements.md`, `03-data-modeling/`). These prefixes are organizational, not meaningful — they change during reorganization (e.g., `03-data-modeling` → `05-data-modeling`). To keep `section_id` stable across such changes:

1. Strip the `.md` extension: `01-elements.md` → `01-elements`
2. Strip leading digits and hyphens: `01-elements` → `elements`
3. Apply the same stripping to directory names when used for disambiguation: `03-data-modeling` → `data-modeling`
4. The stripping regex: remove the leading match of `^\d+-` (one or more digits followed by a hyphen)
5. If stripping would produce an empty string (unlikely), keep the original name

### Why stripped filename only (no directory, no numeric prefix, no extension)?

Docs in this repo frequently move between directories and get renumbered (chapter reorganization). A section in `elements#creating-elements` describes the same capability whether the file is named `01-elements.md` or `05-elements.md`, and whether it lives in `03-data-modeling/` or `05-modeling/`. By stripping the directory path, numeric prefix, and extension from `section_id`, reorganization doesn't invalidate the section map or require extraction.

The full directory path is still stored in the `file` field of each section for reference and link generation, but it is not part of the stable identity.

### Why separate from content_hash?

- `section_id` provides **stable identity** — it survives both content edits and file moves. The section map can track "this section was extracted" without ambiguity.
- `content_hash` provides **change detection** — "has this section's content changed since last extraction?"
- Using hash as identity would cause collisions (two sections with identical content) and ambiguity (any edit changes identity).

## Content Hash

SHA-256 of the section's raw markdown content (heading line + body text, after frontmatter is stripped). Used solely for change detection.

```
content_hash = sha256(heading_line + "\n" + body_text)
```

## Slug Algorithm

One algorithm used everywhere: `section_id` generation, anchor generation, and deep links. This follows Docusaurus's default GitHub-style slug behavior.

### Steps

1. If the heading has a custom ID (`## My Heading {#custom-id}`), use `custom-id` as the slug. Skip remaining steps.
2. Strip the markdown heading prefix (`##`, `###`)
3. Strip leading/trailing whitespace
4. Convert to lowercase
5. Replace spaces and underscores with hyphens
6. Remove characters that are not alphanumeric, hyphens, or Unicode letters/digits (keep non-ASCII letters like `é`, `ü`, Chinese characters, etc.)
7. Collapse consecutive hyphens into one
8. Strip leading/trailing hyphens

### Examples

| Heading | Slug |
|---|---|
| `## Configuring Axes` | `configuring-axes` |
| `## AI-Powered Insights` | `ai-powered-insights` |
| `## What is an "Element"?` | `what-is-an-element` |
| `## 数据建模` | `数据建模` |
| `## My Section {#custom-id}` | `custom-id` |

### Duplicate handling

Within a single file, if the same slug appears more than once, append `-1`, `-2`, etc. to the second and subsequent occurrences:
- First `## Overview` → `overview`
- Second `## Overview` → `overview-1`

### Intro sections

The `(intro)` section (content before the first H2) uses the literal string `(intro)` as its slug in `section_id`. This is an internal identifier only — it does not correspond to a Docusaurus anchor. Consumers generating links for intro sections should use the file's root URL with no fragment (e.g., `04-visualization/02-chart-types/01-trend-chart.md` with no `#anchor`).

The `parse.py` script implements this algorithm. All other scripts consume its output.

## File Schemas

### Sections: `.sections/` directory (Machine-Generated, No AI, Git-Ignored)

Each parsed section is stored as its own directory under `.sections/`, named by the `section_id` components. Each directory contains up to three files:

**`section.md`** — the raw section content (heading line + body text). Written by `parse.py`.

**`meta.yaml`** — section metadata. Written by `parse.py`.

```yaml
section_id: "elements#creating-elements"
file: "03-data-modeling/01-elements.md"
heading: "Creating Elements"
heading_level: 2
anchor: "creating-elements"              # URL fragment for deep links; null for intro sections
heading_path: ["Data Modeling", "Elements", "Creating Elements"]
content_hash: "a3f2b8c4..."
```

**`extraction.yaml`** — AI extraction result for this section. Written by the AI agent during Stage 3. Not present until extraction has run for this section.

```yaml
capabilities:
  - id: element-creation
    relation: defined
    confidence: high
  - id: element-template
    relation: referenced
    confidence: medium
```

If a section contains no capabilities:

```yaml
capabilities: []
```

**`.sections/manifest.yaml`** — a summary index for quick diffing. Written by `parse.py`.

```yaml
version: "1.0"
parsed_at: "2026-03-18"
doc_root: "i18n/en/docusaurus-plugin-content-docs/current"
scope:
  include: ["01-introduction", "03-data-modeling", "04-visualization", ...]
  exclude: ["00-index.md", "02-get-started", "16-best-practices", ...]
total_files: 95
total_sections: 487

sections:
  - section_id: "elements#creating-elements"
    content_hash: "a3f2b8c4..."
  - section_id: "elements#(intro)"
    content_hash: "f1c2d3e4..."
  # ... one entry per section, for fast hash comparison
```

**`.sections/extraction-prompt.md`** — generic prompt for the AI agent. Written by `prepare.py` (once, not per run). See `04-pipeline.md` Stage 2 for the prompt template.

Directory structure example:

```
.sections/
├── manifest.yaml
├── extraction-prompt.md              # generic AI prompt (stable across runs)
├── elements/
│   ├── creating-elements/
│   │   ├── section.md
│   │   ├── meta.yaml
│   │   └── extraction.yaml           # AI output (written during extraction)
│   └── (intro)/
│       ├── section.md
│       ├── meta.yaml
│       └── extraction.yaml
├── data-modeling/index/              # disambiguated collision
│   └── overview/
│       ├── section.md
│       ├── meta.yaml
│       └── extraction.yaml
└── visualization/index/              # disambiguated collision
    └── overview/
        ├── section.md
        ├── meta.yaml
        └── extraction.yaml
```

The `.sections/` directory is git-ignored — it is regenerated by `parse.py` (which writes `section.md`, `meta.yaml`, and `manifest.yaml`). The `extraction.yaml` files are written by the AI agent and collected by `merge.py`. Only the section map file (below) is committed.

### File 1: `capabilities.section-map.yaml` (Machine-Generated, AI, Committed)

References sections by `section_id` and stores AI-identified capabilities. Each entry includes enough metadata (`file`, `heading`, `anchor`) for consumers to generate deep links and group by source — no need to consult `.sections/`.

```yaml
version: "1.0"
last_full_extraction: "2026-03-18"
prompt_version: "1.0"     # tracks which prompt template was used

sections:
  - section_id: "elements#creating-elements"
    file: "03-data-modeling/01-elements.md"
    heading: "Creating Elements"
    heading_level: 2
    anchor: "creating-elements"
    content_hash: "a3f2b8c4..."
    extracted_at: "2026-03-18"
    capabilities:
      - id: element-creation
        relation: defined
        confidence: high
      - id: element-template
        relation: referenced
        confidence: medium

  - section_id: "anomaly-detection#configuring-detection-rules"
    file: "08-ai-powered-insights/03-anomaly-detection.md"
    heading: "Configuring Detection Rules"
    heading_level: 3
    anchor: "configuring-detection-rules"
    content_hash: "e7d1f9a2..."
    extracted_at: "2026-03-18"
    capabilities:
      - id: anomaly-detection-configuration
        relation: defined
        confidence: high
      - id: real-time-analysis-trigger
        relation: referenced
        confidence: medium
```

Key fields:
- **`section_id`** — stable identity. Survives content edits and directory moves.
- **`file`** — full relative path to the source doc. Copied from `.sections/` `meta.yaml` at merge time.
- **`heading`** — the section's heading text (without `##` prefix). For display purposes.
- **`heading_level`** — `0` (intro), `2` (H2), or `3` (H3).
- **`anchor`** — the URL fragment for deep linking (e.g., `creating-elements`). `null` for intro sections, which link to the page root with no fragment. This is the slug derived from the heading per the slug algorithm, including duplicate-heading suffixes and custom heading IDs. Consumers construct deep links as `{file_url}#{anchor}`.
- **`content_hash`** — used for incremental change detection. If this differs from `.sections/manifest.yaml`, this section needs re-extraction.
- **`prompt_version`** — if the prompt template changes, all sections should be re-extracted.
- **`confidence`** — `high`, `medium`, or `low`. Low-confidence extractions are included but flagged.

### File 2: `capabilities.taxonomy.yaml` (Human-Curated)

```yaml
version: "1.0"
last_updated: "2026-03-18"

categories:
  - id: data-modeling
    name: "Industrial Data Modeling"
  - id: visualization
    name: "Visualization & Dashboards"
  - id: events
    name: "Event Management"
  - id: real-time-analysis
    name: "Real-Time Analysis"
  - id: ai-insights
    name: "AI-Powered Insights"
  - id: data-ingestion
    name: "Data Ingestion"
  - id: collaboration
    name: "Collaboration"
  - id: administration
    name: "Administration"
  - id: integration
    name: "Integration with Other Systems"
  - id: libraries
    name: "Libraries & Reference Data"
  - id: excel
    name: "Excel Add-in"
  - id: advanced-analytics
    name: "Advanced Analytics"
  - id: canvas
    name: "Canvas Panels"

capabilities:
  - id: trend-chart
    name: "Trend Chart"
    category: visualization
    status: ga
    since: "1.0.0.0"
    tags: [core]
    aliases:
      - trend-chart-creation
      - trend-chart-configuration
    parent: null                  # top-level capability
    notes: ""

  - id: trend-chart-axis-config
    name: "Trend Chart Axis Configuration"
    category: visualization
    status: ga
    since: "1.0.0.0"
    tags: []
    aliases: []
    parent: trend-chart           # sub-capability of trend-chart
    notes: ""

  - id: root-cause-analysis-events
    name: "AI-Based Root Cause Analysis for Events"
    category: ai-insights
    status: planned
    since: null
    tags: [ai]
    aliases: []
    parent: null
    roadmap_ref: "2026-Q1"
    notes: ""

ignored:
  - id: navigation-menu
    reason: "UI layout, not a capability"
  - id: getting-started-overview
    reason: "Onboarding content, not a capability"
```

Key fields:
- **`aliases`** — extracted capability IDs that map to this canonical entry
- **`parent`** — if set, this is a sub-capability of the referenced capability ID (see Taxonomy Governance for the modeling rubric)
- **`status`** — enum: `ga`, `beta`, `preview`, `planned`, `deprecated`
- **`since`** — version string when this capability first shipped. `null` for `planned`.
- **`roadmap_ref`** — quarter reference (e.g., `"2026-Q1"`) for `planned` capabilities. `null` otherwise.
- **`ignored`** — extracted IDs that are false positives. Persisted so they don't resurface.

There is no generated "File 3" — the section map + taxonomy are the complete source of truth. Any report, web app, or other consumer reads both files and joins them directly. See `04-pipeline.md` "Output: What Consumers Get" for the join algorithm.

## Enum Definitions

| Field | Valid values | Notes |
|---|---|---|
| `status` | `ga`, `beta`, `preview`, `planned`, `deprecated` | |
| `relation` | `defined`, `referenced` | `defined`: section explains what the capability is or how to use it. `referenced`: section meaningfully depends on or integrates with the capability (not incidental mentions). |
| `confidence` | `high`, `medium`, `low` | |
| `heading_level` | `0` (intro), `2` (H2), `3` (H3) | |

## Validation Rules

The `validate.py` script enforces all of the following:

### Path and reference integrity
- Every `file` in `.sections/` `meta.yaml` files resolves to an actual file on disk
- Every `section_id` in `capabilities.section-map.yaml` exists in `.sections/manifest.yaml`

### Taxonomy integrity
- No duplicate capability `id` values
- No duplicate values across all `aliases` lists (an alias must map to exactly one canonical)
- Every `category` referenced by a capability exists in the `categories` list
- Every `parent` references an existing capability `id`
- No circular parent chains
- Every capability has required fields: `id`, `name`, `category`, `status`
- Every `planned` capability has a `roadmap_ref`; non-planned capabilities have `roadmap_ref: null`
- Every `status` value is a valid enum
- Every ignored ID has a `reason`

### Coverage checks (derived at validation time by joining section map + taxonomy)
- Warn on taxonomy capabilities where no section map entry has a matching `id` (or alias) with `relation: defined` (may indicate the definition was deleted)
- Warn on taxonomy capabilities where all matching `defined` sections have `confidence: low`
- Report orphaned capabilities (in taxonomy but no matching extracted ID in any section map entry)
- Report unmatched extracted IDs (appear in section map but not in taxonomy `id`, `aliases`, or `ignored` list)

### Cross-consistency
- `content_hash` in section map matches `content_hash` in `.sections/manifest.yaml` for the same `section_id` (detects stale section map)
