# Web UI — Page Designs

## Shared Layout (`base.html`)

Fixed sidebar (220px) + main content area.

Sidebar contains:
- App title: "Capability Explorer"
- Navigation links: Overview, Categories, Gaps
- Search input (visible on Categories page; hidden or global on others)

Main content area: padded, max-width ~1000px for readability.

## Overview (`/`)

**Summary cards** (2×3 grid):
- Total capabilities: 77
- Categories: 14
- Doc sections: 703
- Capability mappings: 967
- Coverage: X% (capabilities with ≥1 defined section)
- Confidence: X% high

**Category breakdown table**:

| Category | Capabilities | Defined | Referenced |
|---|---|---|---|
| AI-Powered Insights | 11 | 45 | 23 |
| Visualization & Dashboards | 19 | 87 | 34 |
| ... | | | |

Each row links to `/categories#category-id`.

## By Category (`/categories`)

One collapsible `<details>` element per category (open by default).

Within each category:
- Parent capabilities listed first
- Sub-capabilities indented under their parent (using `parent` field)
- Each capability row: name (linked to `/capability/<id>`), status badge, tag pills, defined count, referenced count

Client-side search box at top of page: filters capabilities across all categories by name/id/alias match (case-insensitive). JS hides non-matching rows and collapses empty categories.

## Capability Detail (`/capability/<id>`)

**Header block:**
- Capability name (large)
- Category (linked to `/categories#category-id`)
- Status badge, tag pills
- Aliases listed (if any)
- Parent link (if sub-capability) / children list (if parent)

**Defined In table:**

| Heading | File | Confidence | Link |
|---|---|---|---|
| 3.1.1 What is an Element | 03-data-modeling/01-elements.md | high | (external link) |

Sorted by confidence (high → medium → low). Doc link opens in new tab.

**Referenced In table:** same format.

If capability has no sections at all, show a "No documentation coverage" notice.

## Coverage Gaps (`/gaps`)

Three sections:

1. **No defined sections** — capabilities in taxonomy where no section has `relation: defined` for this capability ID or any of its aliases. Table: capability name (linked), category, referenced count.

2. **Orphaned capabilities** — taxonomy entries with zero section references (neither defined nor referenced). Table: capability name, category.

3. **Unmatched IDs** — capability IDs extracted by AI that don't match any taxonomy `id`, `aliases` entry, or `ignored` entry. Table: extracted ID, found in section(s), relation, confidence.
