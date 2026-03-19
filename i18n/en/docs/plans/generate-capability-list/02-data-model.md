# Data Model — Four Files

The system uses four files with distinct ownership and purposes.

## File 1: `capabilities.sections.yaml` (Machine-Generated, No AI)

The parsed representation of all docs, split into sections. Produced by `parse.py` (pure Python, no AI). This is the inspectable intermediate between raw docs and AI extraction.

```yaml
version: "1.0"
parsed_at: "2026-03-18"
doc_root: "i18n/en/docusaurus-plugin-content-docs/current"
total_files: 139
total_sections: 487

sections:
  - file: "03-data-modeling/01-elements.md"
    heading: "## Creating Elements"
    heading_level: 2
    heading_path: ["Data Modeling", "Elements", "Creating Elements"]
    content_hash: "a3f2b8c4..."
    content: |
      To create an element, navigate to the Element
      Browser and click the "+" button...

  - file: "03-data-modeling/01-elements.md"
    heading: "## Element Templates"
    heading_level: 2
    heading_path: ["Data Modeling", "Elements", "Element Templates"]
    content_hash: "d2e4f6a8..."
    content: |
      Element templates define reusable structures...
```

Key fields:
- **`content_hash`** — SHA-256 of the section's markdown content. Used for change detection and content-based identity (survives file moves).
- **`heading_path`** — breadcrumb from doc title through heading hierarchy. For human readability and anchor generation.
- **`content`** — the raw markdown body of the section. Included so AI extraction can read from this file without touching the original docs.

## File 2: `capabilities.extraction-cache.yaml` (Machine-Generated, AI)

Stores per-section AI extraction results. Same structure as the sections file but with capability identifications added and content removed (no need to duplicate it).

```yaml
version: "1.0"
last_full_extraction: "2026-03-18"

sections:
  - file: "03-data-modeling/01-elements.md"
    heading: "## Creating Elements"
    heading_path: ["Data Modeling", "Elements", "Creating Elements"]
    content_hash: "a3f2b8c4..."
    extracted_at: "2026-03-18"
    capabilities:
      - id: element-creation
        relation: defined        # defined | referenced
      - id: element-template
        relation: referenced

  - file: "08-ai-powered-insights/03-anomaly-detection.md"
    heading: "## Configuring Detection Rules"
    heading_path: ["AI-Powered Insights", "Anomaly Detection", "Configuring Detection Rules"]
    content_hash: "e7d1f9a2..."
    extracted_at: "2026-03-18"
    capabilities:
      - id: anomaly-detection-configuration
        relation: defined
      - id: real-time-analysis-trigger
        relation: referenced
```

Key fields:
- **`content_hash`** — links back to the same section in `capabilities.sections.yaml`. Also used for incremental change detection.
- **`relation`** — `defined` means this section is a canonical source for the capability. `referenced` means it mentions the capability in passing.
- **`extracted_at`** — when this section was last sent to AI. Useful for auditing.

## File 2: `capabilities.taxonomy.yaml` (Human-Curated)

Maps raw capability IDs from extraction to canonical names, categories, and metadata. This is the only file humans edit.

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
    status: ga               # ga | beta | preview | planned
    since: "1.0.0.0"
    tags: [core]
    aliases:                  # other extracted IDs that map to this
      - trend-chart-creation
      - trend-chart-configuration
    notes: ""

  - id: anomaly-detection
    name: "AI Anomaly Detection"
    category: ai-insights
    status: ga
    since: "1.0.6.0"
    tags: [ai]
    aliases:
      - anomaly-detection-configuration
      - anomaly-detection-rules
    notes: ""

  # Planned capabilities (from roadmap, not yet in docs)
  - id: root-cause-analysis-events
    name: "AI-Based Root Cause Analysis for Events"
    category: ai-insights
    status: planned
    since: null
    tags: [ai]
    roadmap_ref: "2026-Q1"
    aliases: []
    notes: ""
```

Key fields:
- **`aliases`** — extracted capability IDs that should map to this canonical capability. This is how many-to-one grouping works.
- **`status`** / **`since`** / **`roadmap_ref`** — product management metadata.
- **`tags`** — freeform labels for filtering (e.g., `ai`, `core`, `enterprise-only`).

## File 3: `capabilities.yaml` (Generated Output)

Produced by joining the extraction cache with the taxonomy. Never hand-edited. This is the consumable output.

```yaml
version: "1.0"
generated_at: "2026-03-18"
product: "TDengine IDMP"

summary:
  total: 52
  by_status: { ga: 45, beta: 3, planned: 4 }
  by_category:
    - { id: visualization, name: "Visualization & Dashboards", count: 8 }
    - { id: ai-insights, name: "AI-Powered Insights", count: 7 }
    # ...

capabilities:
  - id: trend-chart
    name: "Trend Chart"
    category: visualization
    status: ga
    since: "1.0.0.0"
    tags: [core]
    defined_in:
      - file: "04-visualization/02-chart-types/01-trend-chart.md"
        heading: "## Trend Chart"
        anchor: "04-visualization/02-chart-types/01-trend-chart.md#trend-chart"
    referenced_in:
      - file: "08-ai-powered-insights/02-ai-panels.md"
        heading: "## Supported Panel Types"
        anchor: "08-ai-powered-insights/02-ai-panels.md#supported-panel-types"
      - file: "16-best-practices/index.md"
        heading: "## Visualization Best Practices"
        anchor: "16-best-practices/index.md#visualization-best-practices"

unmatched_capabilities:
  - id: some-new-capability
    found_in:
      - file: "03-data-modeling/06-new-feature.md"
        heading: "## Some New Feature"
        relation: defined
    suggestion: "Possible match: data-modeling.element-search (similarity: 0.7)"
```

Key sections:
- **`summary`** — quick stats for PM dashboards.
- **`capabilities`** — full list with precise `defined_in` and `referenced_in` cross-references at the section level.
- **`unmatched_capabilities`** — extracted IDs that don't match any taxonomy entry or alias. These are candidates for human triage.
