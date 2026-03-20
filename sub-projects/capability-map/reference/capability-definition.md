# What is a "Capability"?

## Definition

A **capability** is something the system can do — a task, function, or behavior that a user can use or an administrator can configure.

## Why "capability" and not "feature"

We deliberately chose "capability" over "feature" for three reasons:

1. **Precision.** "Capability" describes exactly what we are cataloging: *what the system can do*. "Feature" is vaguer — it can mean a UI element, a selling point, a release item, or a technical implementation detail depending on who is speaking.

2. **Granularity-neutral.** A capability can be broad ("Visualization") or narrow ("Trend Chart Axis Configuration"). The word works at every level without sounding odd. "Feature" tends to imply a specific, shippable unit — calling a top-level domain area a "feature" feels wrong, and calling a minor config option a "feature" feels inflated.

3. **No marketing baggage.** "Feature" carries product-marketing connotations — feature lists, feature comparisons, feature requests. This project is a documentation inventory, not a marketing exercise. "Capability" keeps the focus on what the system *does*, not how it is positioned.

## The test: is it a capability?

Ask: **Can a user independently use this, or can an admin independently configure it?**

- **Yes → capability.** It has its own UI entry point or API surface. A product manager would track it.
- **Yes, but only in the context of a parent → sub-capability.** It is a distinct function that cannot be used without its parent (e.g., "Notification Rules" under "Event Notifications").
- **No, it is a different name for an existing capability → alias.** Different phrasing, a configuration detail, or a CRUD variation of something already tracked (e.g., "create-element" and "edit-element" are aliases of "element-management").
- **No, it is not a capability at all → ignored.** Concepts, navigation instructions, tutorials, external standards, and best practices are not capabilities.

## Examples

### Things that ARE capabilities

| Example | Why |
|---|---|
| Trend Chart | A visualization the user can create |
| Element Search | A way to find assets in the hierarchy |
| SSO Authentication | An admin-configurable security mechanism |
| AI Anomaly Detection | An analytical function the system performs |
| Data Contextualization | An action the user performs to add meaning to raw data |

### Things that are NOT capabilities

| Example | Why |
|---|---|
| "Why industrial data management matters" | Background explanation — no system action |
| "Click the menu to open settings" | Navigation instruction |
| "The sidebar shows recent items" | UI layout description |
| "OPC UA is a protocol" | External standard, not something IDMP *does* |
| "Getting started with cloud" | Onboarding tutorial |
| "Best practices for dashboard design" | Usage guidance |

## Concepts vs. capabilities

Some documentation sections explain a **concept** (what something is) and simultaneously define a **capability** (what the system lets you do with it). These are not mutually exclusive.

The rule: **if the concept maps to something the user can create, configure, or interact with in the system, it is a capability** — even if the section reads like a conceptual explanation.

| Section content | Capability? | Reasoning |
|---|---|---|
| "An element represents a physical asset. You can create elements, organize them into hierarchies, and attach attributes." | Yes — `element-management` | Users create and organize elements. The concept description *is* the capability definition. |
| "Attributes are properties of elements. Each attribute has a name, type, and data source." | Yes — `element-attributes` | Users create and configure attributes on elements. |
| "Time series data is the raw measurement data collected from sensors." | No | Describes what the data *is*, not what the system *does*. Ingestion and visualization are separate capabilities. |
| "In the AI era, industrial data foundations are critical." | No | Pure background — no system action. |

## How capabilities are structured in the taxonomy

Each capability in `capabilities.taxonomy.yaml` carries these fields:

| Field | Description | Owner |
|---|---|---|
| `id` | Canonical kebab-case identifier (e.g., `anomaly-detection`) | Human |
| `name` | Human-readable display name (e.g., "Anomaly Detection") | Human |
| `category` | Domain grouping (must reference a `categories` entry) | Human |
| `status` | Lifecycle stage: `ga`, `beta`, `preview`, `planned`, `deprecated` | Human |
| `since` | Version string when shipped; `null` for planned capabilities | Human |
| `tags` | Freeform labels (e.g., `[ai]`) | Human |
| `aliases` | Alternate IDs that map to this canonical entry | Human |
| `parent` | Parent capability ID for sub-capabilities; `null` for top-level | Human |
| `notes` | Free-form notes | Human |

All taxonomy fields are human-owned. The AI extraction pipeline proposes candidate IDs; a human decides whether each becomes a new capability, an alias, or an ignored entry.

## Sub-capability vs. alias: a rule of thumb

- **Different *actions* on the same *thing*** → likely aliases. "create-element" and "edit-element" are both aliases of `element-management`.
- **Same *action* on different *things*** → separate capabilities. "trend-chart" and "gauge-panel" are distinct.
- **Would a PM track this separately in a release?** If yes → sub-capability. If no → alias.

## Relation to documentation sections

The section map (`capabilities.section-map.yaml`) records how capabilities relate to documentation:

- **`defined`** — the section is the primary documentation for that capability; this is where the capability is explained.
- **`referenced`** — the section mentions the capability in passing, usually in the context of another capability.

A capability with no `defined` sections is a coverage gap. A capability with no sections at all is orphaned.

## Naming convention

Capability names should be consistent across the taxonomy, release notes, roadmaps, and any other document that references them. The following rules apply to both the `name` field (display name) and the `id` field (kebab-case identifier).

### Display name (`name`)

1. **Use a noun phrase.** Name the *thing*, not the *action*. Prefer "Data Import" over "Importing Data", "LLM Connection" over "Connecting to LLM".

2. **Use title case.** Capitalize each significant word: "Trend Chart", "Root Cause Analysis". Do not capitalize articles, prepositions, or conjunctions unless they are the first word: "Unit of Measurement", "Integration with Other Systems".

3. **Use the domain qualifier when the bare name is ambiguous.** "Filter" is ambiguous; "Event Filter" is not. "Templates" is ambiguous; "Element Templates" is not. If the capability is unambiguous on its own (e.g., "Dashboards", "Annotations"), no qualifier is needed.

4. **Use "&" for compound nouns, not "and".** "Backup & Restore", "Libraries & Reference Data". Reserve "and" for natural-language prose.

5. **Keep names short.** Aim for 1-3 words. If a name needs 4+ words, consider whether the capability should be split or whether a shorter phrasing exists.

6. **Avoid redundant suffixes.** Do not append "Management", "Support", or "Functionality" unless the word carries real meaning. "User Management" is fine (managing users is the capability). "Chart Support" is not — just "Chart".

7. **AI prefix for AI-powered capabilities.** Capabilities that are specifically AI-driven use the "AI" prefix: "AI Anomaly Detection", "AI Composite Metrics", "AI Generated Panels". Capabilities that merely *use* AI internally but are not presented as AI features do not need the prefix.

### Identifier (`id`)

1. **Kebab-case.** Lowercase, words separated by hyphens: `trend-chart`, `root-cause-analysis`.

2. **Mirror the display name.** The `id` should be a direct kebab-case translation of the `name`: "Event Filter" → `event-filter`, "AI Composite Metrics" → `ai-composite-metrics`. Drop "&" and "with": "Backup & Restore" → `backup-restore`, "Integration with Other Systems" → `integration`.

3. **No verbs.** Since display names are noun phrases, IDs are noun phrases too: `data-import` not `import-data`, `element-search` not `search-elements`.

4. **No type suffixes.** Do not append `-capability`, `-feature`, or `-function` to IDs.

### Current names to normalize

Applying the convention above, the following existing names should be updated:

| Current name | Issue | Suggested name | Suggested id |
|---|---|---|---|
| Exporting Data | Gerund form | Data Export | `data-export` |
| Connecting to LLM | Gerund form | LLM Connection | `llm-connection` |

All other current names already conform to the convention.
