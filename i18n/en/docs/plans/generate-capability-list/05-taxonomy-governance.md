# Taxonomy Governance

The taxonomy file (`capabilities.taxonomy.yaml`) is the only file humans edit. This document defines how to curate it: when to create capabilities, how to model relationships, and who owns which metadata.

## Capability Modeling Rubric

Not everything extracted is a top-level capability. The curator must decide how to classify each unmatched ID.

### Decision tree

```
Is this something a user can independently use or an admin can independently configure?
  ├─ YES → Is it meaningful on its own, or only as part of a larger capability?
  │    ├─ Meaningful on its own → Create as a CAPABILITY (top-level, parent: null)
  │    └─ Only meaningful as part of another → Create as a SUB-CAPABILITY (parent: <parent-id>)
  ├─ NO, it's a configuration detail of an existing capability
  │    → Add as an ALIAS of the parent capability
  └─ NO, it's not a capability at all
       → Add to IGNORED list
```

### Guidelines with examples

| Classification | Criteria | Example |
|---|---|---|
| **Capability** | Independently usable or configurable. Has its own UI entry point or API surface. A user would say "I'm using X." | "Trend Chart", "AI Anomaly Detection", "SSO Authentication" |
| **Sub-capability** | Only meaningful in the context of a parent. Has a distinct function but can't be used without the parent. | "Trend Chart Axis Configuration" (parent: trend-chart), "Anomaly Detection Rule Templates" (parent: anomaly-detection) |
| **Alias** | A different name or phrasing for the same capability, or a configuration detail that doesn't warrant its own entry. | "trend-chart-creation" → alias of "trend-chart", "sso-setup" → alias of "sso-authentication" |
| **Ignored** | Not a capability. A concept, UI element, tutorial step, or external reference. | "navigation-menu", "getting-started-overview", "opc-ua-protocol" |

### When in doubt

- If two extracted IDs describe different *actions* on the same *thing*, they're likely aliases of one capability (e.g., "create-element" and "edit-element" are both aliases of "element-management").
- If two extracted IDs describe the same *action* on different *things*, they're separate capabilities (e.g., "trend-chart" and "gauge-panel" are different capabilities, not aliases).
- If you're unsure whether something is a sub-capability or an alias, ask: "Would a PM track this separately in a release?" If yes, sub-capability. If no, alias.

## Curation Workflow

### When unmatched capabilities appear

After running `validate.py`, the unmatched capabilities report lists extracted IDs not in the taxonomy:

```
UNMATCHED: trend-chart-axis-config
  Found in: trend-chart#configuring-axes
  Relation: defined
  Confidence: high
```

The curator applies the decision tree:

1. **Alias** → add the ID to the `aliases` list of an existing capability
2. **New capability** → create a new entry with `parent: null`
3. **New sub-capability** → create a new entry with `parent: <parent-id>`
4. **Not a capability** → add to the `ignored` list with a `reason`

Then re-run `validate.py` to confirm the unmatched list is resolved.

### When a new product version ships

1. Update `status` from `planned` → `ga` (or `beta`) for capabilities that shipped
2. Update `since` with the version number
3. Add new `planned` entries from the roadmap

### When capabilities are reorganized

- **Rename**: update `id` and `name`. Update any `parent` references and `aliases` that pointed to the old ID.
- **Merge**: combine `aliases` lists, remove the deprecated entry, set `status: deprecated` if you want to keep a record.
- **Split**: create new entries, redistribute aliases, update `parent` references.
- **Retire**: set `status: deprecated`. Do not delete — the entry serves as a historical record.

## Metadata Ownership

### Taxonomy is the source of truth for:

| Field | Owner | Notes |
|---|---|---|
| `id`, `name` | Human curator | Canonical identity |
| `category` | Human curator | Domain classification |
| `status` | Human curator | Updated on each release |
| `since` | Human curator | Set when capability ships; reference `21-release-history/` docs |
| `tags` | Human curator | Freeform labels |
| `aliases` | Human curator | Maps extracted IDs to canonical |
| `parent` | Human curator | Capability hierarchy |
| `roadmap_ref` | Human curator | Reference `20-roadmap/index.md`; updated quarterly |

### NOT owned by the taxonomy (derived from extraction):

| Data | Source |
|---|---|
| Which sections define/reference a capability | Section map |
| Section content and structure | Sections file |
| File paths and anchors | Sections file |

### Synchronization with other docs

The roadmap (`20-roadmap/index.md`) and release history (`21-release-history/`) are **reference inputs**, not automatically synced sources. The human curator reads them when updating `status`, `since`, and `roadmap_ref`. There is no automated synchronization — the taxonomy is authoritative.

If the taxonomy drifts from the roadmap (e.g., a planned capability is removed from the roadmap), the `validate.py` script does **not** flag this. It's the curator's responsibility to keep these aligned during quarterly reviews.

## The Ignored List

Persisted in the taxonomy file so false positives don't resurface:

```yaml
ignored:
  - id: navigation-menu
    reason: "UI layout, not a capability"
  - id: getting-started-overview
    reason: "Onboarding content, not a capability"
```

Validation checks that every ignored entry has a non-empty `reason`.
