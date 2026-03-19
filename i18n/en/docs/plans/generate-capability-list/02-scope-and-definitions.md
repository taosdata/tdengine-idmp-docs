# Scope and Definitions

## What is a "Capability"?

A capability is something the system can do — a task, function, or behavior that a user can use or an administrator can configure.

We use "capability" rather than "feature" because it precisely describes "what the system can do," works at all levels of granularity, and avoids overloaded product/marketing connotations.

### Examples of capabilities

- "Trend Chart" — a visualization the user can create
- "Element Search" — a way to find assets in the hierarchy
- "SSO Authentication" — an admin-configurable security mechanism
- "AI Anomaly Detection" — an analytical function the system performs

### What is NOT a capability

- **Pure conceptual explanations** — "Why industrial data management matters" is background, not a capability
- **Navigation instructions** — "Click the menu" is UI guidance
- **UI layout descriptions** — "The sidebar shows..." is not functional
- **External standards** — "OPC UA is a protocol" describes something outside IDMP
- **Onboarding content** — "Getting started with cloud" is a tutorial, not a capability
- **Best practices** — recommendations about how to use capabilities, not capabilities themselves

### Concepts vs. capabilities: the distinction

Some documentation sections explain a **concept** (what something is) and simultaneously define a **capability** (what the system lets you do with it). These are not mutually exclusive.

The rule: **if the concept maps to something the user can create, configure, or interact with in the system, it is a capability** — even if the section reads like a conceptual explanation.

| Section content | Capability? | Why |
|---|---|---|
| "An element represents a physical asset, location, or logical grouping. You can create elements, organize them into hierarchies, and attach attributes." | **Yes** — `element-management` | Users create and organize elements. The concept description *is* the capability definition. |
| "Attributes are properties of elements. Each attribute has a name, type, and data source." | **Yes** — `element-attributes` | Users create and configure attributes on elements. |
| "Time series data is the raw measurement data collected from sensors." | **No** | This describes what the data *is*, not what the system *does*. Time series are ingested and visualized, but those are separate capabilities (data ingestion, trend chart). |
| "Contextualization is the process of adding meaning to raw data by linking it to elements and attributes." | **Yes** — `data-contextualization` | Users perform contextualization actions in the system. |
| "In the AI era, industrial data foundations are critical for deriving value." | **No** | Pure background — no system action. |

The introduction chapter (`01-introduction`) contains core concept definitions that often serve as the **primary `defined` reference** for foundational capabilities like element management, attributes, and events. This is expected — the intro defines what these things are, and subsequent chapters elaborate on how to use them.

## Doc Inclusion/Exclusion Policy

Not all docs describe product capabilities. The parsing step applies an explicit scope filter.

### Included (parsed and extracted)

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

### Excluded (not parsed)

| Chapter | Why |
|---|---|
| 00-index.md | Reading guide — no capabilities |
| 02-get-started | Onboarding tutorials — capabilities are defined in their own chapters |
| 14-release-history | Legacy release notes — superseded by 21-release-history |
| 16-best-practices | Usage guidance, not capability definitions |
| 17-tutorials | Step-by-step walkthroughs, not definitions |
| 18-troubleshooting | Problem resolution, not definitions |
| 19-glossary | Term definitions, not capabilities |
| 20-roadmap | Planned features — ingested separately into taxonomy as `planned` entries |
| 21-release-history | Version notes — used as reference for `since` field, not parsed for capabilities |

### Overriding the defaults

The inclusion/exclusion policy is configured in a `scope` section at the top of `capabilities.sections.yaml` and can be overridden via CLI flags on `parse.py`:

```yaml
scope:
  include:
    - "01-introduction"
    - "03-data-modeling"
    - "04-visualization"
    # ...
  exclude:
    - "00-index.md"
    - "02-get-started"
    - "16-best-practices"
    # ...
```

## Edge Cases

### Introduction chapter (01-introduction)

The introduction defines core concepts (elements, attributes, events, etc.) that underpin the whole platform. These are included and extracted. As explained in "Concepts vs. capabilities" above, concept definitions that describe something the user can create or configure in the system *are* capability definitions. The intro chapter often serves as the primary `defined` reference for foundational capabilities, with subsequent chapters adding more detail.

### Index files within included chapters

Each chapter has an `index.md` that provides an overview. These are included and parsed. The intro section (content before the first H2) is captured as a section with heading `(intro)`.

### Sections that only contain a `DocCardList` component

Some index files have sections that are just a Docusaurus `<DocCardList />` component with no descriptive text. These produce empty sections after parsing and are skipped during extraction (no content to analyze).

### Roadmap items not yet in docs

Capabilities listed in `20-roadmap/index.md` that don't appear in any included doc are added to the taxonomy as `status: planned` entries during the bootstrap phase. They have no `defined_in` references until docs are written for them.
