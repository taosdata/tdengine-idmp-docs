# Taxonomy Curation

`capabilities.taxonomy.yaml` is the only file humans edit. Use `validate.py` to surface unmatched capabilities, then apply the decision tree below.

## Decision tree

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

## Classification guidelines

| Classification | Criteria | Example |
|---|---|---|
| **Capability** | Independently usable or configurable. Has its own UI entry point or API surface. | "Trend Chart", "AI Anomaly Detection", "SSO Authentication" |
| **Sub-capability** | Only meaningful in the context of a parent. Distinct function, can't be used without parent. | "Trend Chart Axis Configuration" (parent: trend-chart) |
| **Alias** | A different name or phrasing for the same capability, or a configuration detail that doesn't warrant its own entry. | "trend-chart-creation" → alias of "trend-chart" |
| **Ignored** | Not a capability: a concept, UI element, tutorial step, or external reference. | "navigation-menu", "getting-started-overview" |

**When in doubt:**
- Different *actions* on the same *thing* → likely aliases (e.g., "create-element" and "edit-element" → aliases of "element-management")
- Same *action* on different *things* → separate capabilities (e.g., "trend-chart" and "gauge-panel")
- Sub-capability vs alias: "Would a PM track this separately in a release?" If yes → sub-capability. If no → alias.

## Resolving unmatched capabilities

After `validate.py` reports an unmatched capability:

```
UNMATCHED: trend-chart-axis-config
  Found in: trend-chart#configuring-axes
  Relation: defined
  Confidence: high
```

Apply the decision tree, then update the appropriate file:
1. **Alias** → add the ID under its canonical key in `capabilities.aliases.yaml` (see [editing-aliases.md](editing-aliases.md))
2. **New capability** → create a new entry in `capabilities.taxonomy.yaml` with `parent: null`
3. **New sub-capability** → create a new entry in `capabilities.taxonomy.yaml` with `parent: <parent-id>`
4. **Not a capability** → add to `ignored` in `capabilities.aliases.yaml` with a `reason`

Re-run `validate.py` to confirm the unmatched list is resolved.

## When a new product version ships

1. Update `status` from `planned` → `ga` (or `beta`) for capabilities that shipped
2. Add new `planned` entries from `20-roadmap/index.md`

## When capabilities are reorganized

- **Rename**: see [editing-aliases.md](editing-aliases.md) — update taxonomy `id`, `parent` references, and alias group keys
- **Merge**: move aliases from the deprecated entry to the surviving one, set `status: deprecated` on the old entry
- **Split**: create new entries, redistribute alias mappings, update `parent` references
- **Retire**: set `status: deprecated` — do not delete (serves as historical record)
