# Taxonomy Curation

The taxonomy file (`capabilities.taxonomy.yaml`) is the only file humans edit in this system. It answers one question: **what are our canonical capabilities and how do extracted IDs map to them?**

## What the taxonomy contains

For each canonical capability:
- **`id`** — stable, human-chosen identifier (e.g., `trend-chart`)
- **`name`** — display name (e.g., "Trend Chart")
- **`category`** — which domain it belongs to
- **`aliases`** — extracted capability IDs that map to this canonical entry
- **`status`** / **`since`** / **`tags`** — product management metadata

## When to edit the taxonomy

### New capability detected (most common)

When the generation script reports an unmatched capability:

```
UNMATCHED: trend-chart-axis-config
  Found in: 04-visualization/02-chart-types/01-trend-chart.md#configuring-axes
  Relation: defined
  Suggestion: possible match → trend-chart (similarity: 0.8)
```

The curator decides:
1. **It's an alias of an existing capability** → add `trend-chart-axis-config` to the `aliases` list of `trend-chart`
2. **It's a genuinely new capability** → create a new entry in the taxonomy
3. **It's not really a capability** (false positive) → add to an `ignore` list so it doesn't resurface

### New product release

When a new version ships:
- Update `status` from `planned` → `ga` (or `beta`) for capabilities that shipped
- Update `since` with the version number
- Add new `planned` entries from the roadmap

### Product reorganization

If capabilities are renamed, merged, or retired:
- Update `id` and `name` for renames
- Merge `aliases` lists when capabilities are combined
- Set `status: deprecated` for retired capabilities

## The `ignore` list

Some extracted IDs are false positives — not real capabilities. Rather than re-surfacing them every time:

```yaml
ignored:
  - id: navigation-menu
    reason: "UI layout, not a capability"
  - id: getting-started-overview
    reason: "Onboarding content, not a capability"
```

## Workflow summary

```
Unmatched capability surfaces
    ↓
Curator reviews (takes seconds per item)
    ↓
One of three actions:
  → Add as alias to existing capability
  → Create new capability entry
  → Add to ignore list
    ↓
Re-run generation → capabilities.yaml updated
```

The key property: **the curator never needs to read docs or trace cross-references**. They only need to answer "is this the same as an existing capability, or is it new?" — a quick judgment call.
