# Capability Set Format

A **capability set** is a YAML file describing a collection of capabilities. It can represent a product's current state, a specific release, a roadmap, or a customer requirement — any context where you need to enumerate "what can this system do?" or "what do we need it to do?"

## When to use a capability set

| Use case | Example |
|---|---|
| Product inventory | What TDengine IDMP can do today |
| Release snapshot | What shipped in v1.0.14 |
| Roadmap | What is planned for future releases |
| Customer requirement | What a customer needs from the platform |
| Competitive analysis | What a competing product offers |
| Gap analysis | Diff two sets to find what's missing |

## Schema

A capability set file has three sections: metadata, an optional categories list, and capabilities.

```yaml
# --- Metadata ---
version: '1.0'         # Schema version
kind: product          # What this set represents (see "kind" below)
name: TDengine IDMP    # Human-readable name for this set
description: ...       # Optional. Brief context for the set.
date: 2026-03-20       # Optional. When this set was authored or snapshotted.

# --- Categories (optional) ---
categories:
- id: ai-insights
  name: AI-Powered Insights
- id: visualization
  name: Visualization & Dashboards

# --- Capabilities ---
capabilities:
- id: trend-chart
  name: Trend Chart
  category: visualization
- id: anomaly-detection
  name: Anomaly Detection
  status: ga
  category: ai-insights
  tags: [ai]
  notes: Detects anomalies in real-time sensor data
```

### Metadata fields

| Field | Required | Description |
|---|---|---|
| `version` | Yes | Schema version. Currently `1.0`. |
| `kind` | Yes | The type of set: `product`, `release`, `roadmap`, `requirement`, or `comparison` |
| `name` | Yes | Human-readable label for the set |
| `description` | No | Brief context explaining the set's purpose or scope |
| `date` | No | ISO 8601 date when the set was authored or captured |

### Categories

An optional list of categories that group capabilities within this set. Each set defines its own categorization — there is no global category registry.

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Kebab-case identifier, referenced by capabilities in this set |
| `name` | Yes | Human-readable display name |

If `categories` is omitted, the `category` field on individual capabilities is treated as a freeform label.

### Capability fields

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Kebab-case identifier, unique within the set. See [naming convention](capability-definition.md#naming-convention). |
| `name` | Yes | Human-readable display name. See [naming convention](capability-definition.md#naming-convention). |
| `status` | No | Lifecycle stage. Interpretation depends on `kind` (see below). |
| `category` | No | Category ID. Should reference a `categories` entry if one is defined. |
| `tags` | No | List of freeform labels for additional classification. |
| `parent` | No | ID of a parent capability, for expressing hierarchy within the set. |
| `notes` | No | Free-form context. |

Only `id` and `name` are required. Everything else is optional, so a minimal capability set can be just a list of names.

### Status values by kind

The `status` field means different things depending on the set's `kind`:

| Kind | Typical status values | Meaning |
|---|---|---|
| `product` | `ga`, `beta`, `preview`, `deprecated` | Current lifecycle stage |
| `release` | `new`, `updated`, `unchanged` | What changed in this release |
| `roadmap` | `planned`, `in-progress`, `shipped` | Planning stage |
| `requirement` | `required`, `nice-to-have`, `out-of-scope` | Priority from the customer's perspective |
| `comparison` | `available`, `partial`, `unavailable` | Coverage level |

These are conventions, not enforced enums. Use values that make sense for your context.

## Examples

### Minimal: customer requirement

```yaml
version: '1.0'
kind: requirement
name: Acme Corp Requirements
date: 2026-03-20

capabilities:
- id: trend-chart
  name: Trend Chart
  status: required
- id: anomaly-detection
  name: Anomaly Detection
  status: required
- id: forecasting
  name: Forecasting
  status: nice-to-have
- id: scheduled-reports
  name: Scheduled Reports
  status: required
```

### Release snapshot

```yaml
version: '1.0'
kind: release
name: TDengine IDMP v1.0.14
date: 2026-03-15

capabilities:
- id: ai-composite-metrics
  name: AI Composite Metrics
  status: new
  tags: [ai]
- id: notification-escalation
  name: Notification Escalation
  status: new
- id: trend-chart
  name: Trend Chart
  status: updated
  notes: Added multi-axis support
- id: anomaly-detection
  name: Anomaly Detection
  status: unchanged
```

### Product inventory (full)

```yaml
version: '1.0'
kind: product
name: TDengine IDMP
date: 2026-03-20
description: Complete capability inventory extracted from official documentation.

categories:
- id: visualization
  name: Visualization & Dashboards
- id: ai-insights
  name: AI-Powered Insights

capabilities:
- id: trend-chart
  name: Trend Chart
  status: ga
  category: visualization
  tags: [chart]
- id: anomaly-detection
  name: Anomaly Detection
  status: ga
  category: ai-insights
  tags: [ai]
- id: forecasting
  name: Forecasting
  status: ga
  category: ai-insights
  tags: [ai]
  notes: Time-series forecasting using statistical and ML models
```

## Comparing two capability sets

To compare two sets, match capabilities by `id`. The comparison produces three groups:

| Group | Meaning |
|---|---|
| **In both** | Capability exists in both sets. Compare `status` or other fields for differences. |
| **Only in A** | Capability exists in set A but not B. |
| **Only in B** | Capability exists in set B but not A. |

Example: comparing a customer requirement set against the product inventory reveals which required capabilities are available, which are missing, and which product capabilities the customer did not ask for.

When IDs don't match exactly across sets (different teams may name things differently), use the `name` field as a fallback for fuzzy matching, or maintain a manual ID mapping.

## Relationship to capabilities.taxonomy.yaml

The project's `capabilities.taxonomy.yaml` is a capability set of `kind: product` that conforms to this format. Any tool that reads capability sets should ignore fields it does not recognize.
