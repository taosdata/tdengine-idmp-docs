# Pipeline

Parsing, extraction, post-processing, batching, incremental strategy, and failure handling.

## Stage 1: Section Parsing (`parse.py`)

Pure Python, no AI. Reads every in-scope doc, splits into sections, writes `capabilities.sections.yaml`.

### Parsing rules

1. Apply the inclusion/exclusion policy from `02-scope-and-definitions.md` to filter files
2. Split each file on H2 (`##`) and H3 (`###`) headings
3. Each section includes: the heading text + all body content until the next heading of equal or higher level
4. The file's frontmatter (`title`, `sidebar_label`) becomes metadata for the top-level section
5. Content before the first H2 is captured as the intro section with `heading: "(intro)"` and `heading_level: 0`
6. Sections with no meaningful content (e.g., only a `<DocCardList />` component) are skipped
7. Generate `section_id` per the rules in `03-data-contracts.md`
8. Compute `content_hash` (SHA-256 of heading line + body)

### Output

`capabilities.sections.yaml` — the complete parsed representation of all in-scope docs.

This file is deterministic: running `parse.py` twice on the same docs produces identical output.

---

## Stage 2: AI Extraction (`extract.py`)

Reads `capabilities.sections.yaml`, sends sections to AI, writes `capabilities.extraction-cache.yaml`.

### Extraction prompt template

```
You are analyzing sections of TDengine IDMP documentation to identify system capabilities.

A capability is something the system can do — a task, function, or behavior
available to users or administrators.
Examples: "trend-chart", "element-search", "sso-authentication".

Do NOT treat the following as capabilities:
- Navigation instructions (e.g., "click the menu")
- UI layout descriptions that aren't functional
- References to external systems or standards

For each capability you identify, classify the relation:
- "defined" — this section explains what the capability is, how it works,
  or how to use/configure it. The section is a primary source for this capability.
- "referenced" — this section meaningfully points to, depends on, or
  integrates with the capability, but does not define it.
  Example: "Anomaly detection can trigger event creation" in an Events section
  is a meaningful reference to anomaly-detection.

Do NOT mark a capability as referenced for incidental mentions, e.g.,
a capability appearing in a list of navigation links or a see-also footnote.

For each section below, identify capabilities and output a structured response.

---
{sections formatted as below}
---

For each section, output a YAML list under its section_id:

```yaml
- section_id: "{section_id}"
  capabilities:
    - id: "{short-lowercase-hyphenated-id}"
      relation: "defined"    # or "referenced"
      confidence: "high"     # or "medium" or "low"
```

If a section contains no capabilities, output:

```yaml
- section_id: "{section_id}"
  capabilities: []
```

You MUST output exactly one entry per section_id provided, in the same order.
```

### Strict response schema

The response must be keyed by `section_id` so there is no ambiguity when batching. Every input section must produce exactly one output entry. The `extract.py` script validates this after each API call and rejects malformed responses.

Expected response structure per section:

```yaml
- section_id: "03-data-modeling/01-elements.md#creating-elements"
  capabilities:
    - id: element-creation
      relation: defined
      confidence: high
    - id: element-template
      relation: referenced
      confidence: medium
```

### Batching strategy

To reduce API calls:
- Group sections by file (all sections from one file appear together for context)
- Batch multiple files per API call, up to ~8000 tokens of section content per batch
- Include `section_id` in both input and required output so responses map back unambiguously
- Target: ~30 API calls for the full corpus (~500 sections)

### Post-processing

After each API response:

1. **Validate response shape** — confirm every input `section_id` has a corresponding output entry
2. **Normalize capability IDs** — lowercase, trim whitespace, replace spaces with hyphens
3. **Deduplicate** — remove duplicate capability IDs within a single section
4. **Retain confidence** — keep all confidence levels in the cache (filtering happens at generation time)

---

## Stage 3: Generation (`generate.py`)

Joins extraction cache with taxonomy to produce `capabilities.yaml`.

### Join logic

1. Load all capability IDs from the extraction cache
2. For each extracted ID, look up in taxonomy:
   - Direct match on `id` → mapped
   - Match on any `aliases` entry → mapped to the capability that owns that alias
   - Match on `ignored` list → skipped
   - No match → added to `unmatched_capabilities` in output
3. For each taxonomy capability, collect all `defined` and `referenced` sections
4. Populate `children` arrays from `parent` references
5. Compute summary statistics
6. Write `capabilities.yaml`

### Confidence filtering

By default, `low` confidence extractions are excluded from `defined_in` / `referenced_in` in the generated output but are included in the `unmatched_capabilities` section with a flag. This can be overridden with `--include-low-confidence`.

---

## Incremental Extraction Strategy

After the initial full extraction, subsequent runs should be efficient.

### Change detection

When `extract.py` runs with `--incremental`:

1. Load current `capabilities.sections.yaml` (just reparsed by `parse.py`)
2. Load existing `capabilities.extraction-cache.yaml`
3. For each section in the current sections file:
   - **Same `section_id` and same `content_hash`** → unchanged, carry forward cached result
   - **Same `section_id`, different `content_hash`** → content changed, re-extract
   - **New `section_id`** (not in cache) → new section, extract
4. For each section in cache not in current sections file:
   - **Same `content_hash` found under a different `section_id`** → section was moved/renamed. Create new cache entry with new `section_id`, copy extraction results, remove old entry. No re-extraction.
   - **`content_hash` not found anywhere** → section was deleted. Remove from cache. Log warning if it had `defined` capabilities.
5. Re-extract only sections identified in step 3.

### No "minor edit skip"

Every content change triggers re-extraction, regardless of diff size. A one-word change can alter capability semantics. The cost of re-extracting one section is trivial compared to the risk of stale data.

### Cost estimation

A typical PR changes 1-5 files (~5-50 sections). At ~20 sections per API batch, incremental runs need 1-3 API calls, roughly 10x cheaper than full extraction.

### When to do a full re-extraction

- If the extraction prompt template changes (`prompt_version` in cache differs)
- After major documentation restructuring
- As a quarterly audit
- If the cache file is lost or corrupted

---

## Taxonomy Bootstrap (First Run Only)

After the first full extraction, `extract.py` generates a draft `capabilities.taxonomy.yaml`:

1. Collect all unique capability IDs with `relation: defined` and `confidence: high` or `medium`
2. Cluster similar IDs using string similarity (e.g., `trend-chart-creation` and `trend-chart-configuration`)
3. For each cluster, propose a canonical ID and name
4. Infer categories from the source file's chapter directory
5. Parse `20-roadmap/index.md` to add `planned` entries
6. Write draft taxonomy for human review

---

## Failure Handling

### API call failures

- **Transient errors** (rate limit, timeout, 5xx): retry up to 3 times with exponential backoff
- **Persistent errors**: skip the batch, log the affected `section_id`s, continue with remaining batches. The skipped sections will have no entries in the cache and will be retried on the next run.

### Malformed AI output

- **Missing section_id in response**: reject the entire batch response, log it, retry once with the same input. If retry also fails, skip and log.
- **Invalid YAML**: same as above — reject, retry once, skip if still invalid.
- **Extra or unexpected fields**: ignore unknown fields, process known fields normally.

### Partial extraction state

If `extract.py` crashes mid-run:
- The cache file is written atomically (write to temp file, then rename). A crash leaves the previous cache intact.
- On next run with `--incremental`, sections without cache entries are treated as new and re-extracted.

### Cache recovery

If the cache file is corrupted or deleted:
- Run `parse.py` then `extract.py` (full mode) to rebuild from scratch.
- The taxonomy file is unaffected since it's independently maintained.
