# AI Extraction Process

The extraction is a **two-stage pipeline** with a persisted intermediate file between them. This makes each stage independently runnable, inspectable, and debuggable.

```
Docs (139 .md files)
    ↓  Stage 1: parse.py
capabilities.sections.yaml  (persisted intermediate — all sections with content and hashes)
    ↓  Stage 2: extract.py
capabilities.extraction-cache.yaml  (persisted — sections + AI-identified capabilities)
```

---

## Stage 1: Section Parsing (`parse.py`)

A pure Python script (no AI) that splits every markdown file into sections and writes the results to `capabilities.sections.yaml`.

### Parsing rules

1. Split on H2 (`##`) and H3 (`###`) headings
2. Each section includes: the heading text, all body content until the next heading of equal or higher level
3. The file's frontmatter (`title`, `sidebar_label`) becomes metadata for the top-level section
4. Content before the first H2 is treated as the "intro section" of the file

### Output: `capabilities.sections.yaml`

This file is the complete parsed representation of all docs, persisted to disk.

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

The `heading_path` is built from:
- The chapter directory name (cleaned: `03-data-modeling` → `Data Modeling`)
- The file's `title` from frontmatter
- The heading text itself

### Why persist this file?

- **Inspect parsing independently** — verify section boundaries are correct before spending tokens on AI extraction
- **Rerun extraction without reparsing** — if you change the AI prompt, you don't need to reparse all docs
- **Supports incremental extraction** — compare section hashes between old and new `capabilities.sections.yaml` to find what changed
- **Debugging** — if a capability mapping seems wrong, trace it back: which section was it? what content was in that section?

---

## Stage 2: AI Extraction (`extract.py`)

Reads `capabilities.sections.yaml`, sends sections to AI, writes results to `capabilities.extraction-cache.yaml`.

### Prompt strategy

The prompt asks AI to:
1. Read the section content
2. Identify capabilities the system provides that are described in this section
3. For each capability, determine if this section **defines** it (explains what it is and how it works) or **references** it (mentions it in passing)
4. Output a structured capability ID for each, using a consistent naming convention

### Prompt template

```
You are analyzing a section of TDengine IDMP documentation to identify system capabilities.

A capability is something the system can do — a task, function, or behavior available to users or administrators. Examples: "trend-chart", "element-search", "sso-authentication".

Do NOT treat the following as capabilities:
- Conceptual explanations or background information
- Navigation instructions (e.g., "click the menu")
- UI layout descriptions that aren't functional
- References to external systems or standards

Section context:
- File: {file}
- Path: {heading_path}
- Heading: {heading}

Content:
---
{content}
---

For each capability found, output:
- id: a short, lowercase, hyphenated identifier (e.g., "trend-chart", "anomaly-detection-rule-config")
- relation: "defined" if this section explains the capability, "referenced" if it only mentions it
- confidence: high | medium | low

Output as YAML list. If no capabilities are found, output an empty list.
```

### Key prompt design decisions

- **Explicit exclusions** — prevents AI from treating every paragraph as a capability
- **Structured IDs** — consistent hyphenated format reduces alias variation at source
- **Confidence field** — allows filtering out low-confidence extractions during aggregation
- **Defined vs. referenced** — the core distinction that enables precise cross-referencing

### Batching

To reduce API calls and cost:
- Group sections by file (all sections from one file in a single prompt, with clear delimiters)
- Process ~5 files per API call (depending on total token count)
- Target: ~30 API calls for the full 139-file corpus

### Incremental mode

When run with `--incremental`:
1. Load the previous `capabilities.sections.yaml` and the new one
2. Compare content hashes to identify changed/new/moved/deleted sections
3. Only send changed and new sections to AI
4. Carry forward cached results for unchanged sections (matched by content hash, regardless of file path)
5. Flag deleted sections for review

---

## Stage 3: Post-Processing

After AI extraction:

1. **Normalize IDs** — lowercase, trim, deduplicate within a section
2. **Filter by confidence** — drop `low` confidence extractions (can be reviewed separately)
3. **Assemble cache** — merge AI results with section metadata, write to `capabilities.extraction-cache.yaml`

---

## Stage 4: Initial Taxonomy Bootstrap

On first run only, generate a draft taxonomy:

1. Collect all unique capability IDs with `relation: defined`
2. Cluster similar IDs (e.g., `trend-chart-creation` and `trend-chart-configuration`) using string similarity
3. For each cluster, propose a canonical ID and name
4. Group into categories based on the source file's chapter
5. Output as draft `capabilities.taxonomy.yaml` for human review

This bootstrap step is only needed once. After that, the taxonomy evolves incrementally via the unmatched capabilities workflow.
