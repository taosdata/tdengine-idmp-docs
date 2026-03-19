# Scope Policy

Which documentation chapters are parsed for capability extraction, and why.

## Included chapters

| Chapter | Why |
|---|---|
| 01-introduction | Defines core concepts and architecture |
| 03-data-modeling | Core capability area |
| 04-visualization | Core capability area |
| 05-canvas-panels | Core capability area |
| 06-events | Core capability area |
| 07-real-time-analysis | Core capability area |
| 08-ai-powered-insights | Core capability area |
| 09-advanced-analytics | Core capability area |
| 10-excel-add-in | Core capability area |
| 11-collaboration | Core capability area |
| 12-data-ingestion | Core capability area |
| 13-libraries | Core capability area |
| 14-administration | Core capability area |
| 15-integrating-with-other-systems | Core capability area |

## Excluded chapters

| Chapter | Why |
|---|---|
| 00-index.md | Reading guide — no capabilities |
| 02-get-started | Onboarding tutorials — capabilities defined in their own chapters |
| 16-best-practices | Usage guidance, not capability definitions |
| 17-tutorials | Step-by-step walkthroughs, not definitions |
| 18-troubleshooting | Problem resolution, not definitions |
| 19-glossary | Term definitions, not capabilities |
| 20-roadmap | Planned features — ingested separately into taxonomy as `planned` entries |
| 21-release-history | Version notes — reference for `since` field, not parsed |

Override defaults with `--include`/`--exclude` flags on `parse.py`.

## What counts as a capability

A capability is **something the system can do** — a task, function, or behavior that a user can use or an administrator can configure.

**Counts as a capability:**
- "Trend Chart" — a visualization the user can create
- "Element Search" — a way to find assets in the hierarchy
- "SSO Authentication" — an admin-configurable security mechanism
- "AI Anomaly Detection" — an analytical function the system performs

**Does NOT count as a capability:**
- Pure conceptual explanations — "Why industrial data management matters"
- Navigation instructions — "Click the menu"
- UI layout descriptions — "The sidebar shows..."
- External standards — "OPC UA is a protocol"
- Onboarding content — "Getting started with cloud"
- Best practices — recommendations about how to use capabilities

## Concepts vs. capabilities

Some sections explain a concept *and* define a capability simultaneously. The rule: **if the concept maps to something the user can create, configure, or interact with in the system, it is a capability** — even if the section reads like a conceptual explanation.

| Section content | Capability? | Why |
|---|---|---|
| "An element represents a physical asset… You can create elements, organize them into hierarchies, and attach attributes." | **Yes** — `element-management` | Users create and organize elements. The concept description *is* the capability definition. |
| "Attributes are properties of elements. Each attribute has a name, type, and data source." | **Yes** — `element-attributes` | Users create and configure attributes on elements. |
| "Time series data is the raw measurement data collected from sensors." | **No** | Describes what data *is*, not what the system *does*. |
| "In the AI era, industrial data foundations are critical for deriving value." | **No** | Pure background — no system action. |
