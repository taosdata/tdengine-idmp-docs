# Web UI — Overview

## Goal

Build a minimal interactive web GUI for exploring the capability inventory — browsing capabilities by category, drilling into doc coverage per capability, and identifying gaps.

## Approach

Flask app with Jinja2 templates, serving pages from the YAML data files. Server-rendered HTML with minimal client-side JS for search and UI interactions.

- **Framework**: Flask (added to `requirements.txt`)
- **Data loading**: Re-read YAML files on every request — edit taxonomy, refresh, see changes immediately
- **Templates**: Jinja2 (built into Flask)
- **Styling**: Single CSS file, no framework
- **JS**: Minimal vanilla JS for client-side search filtering and expand/collapse

## Key Design Decisions

1. **Server-rendered, not SPA** — simpler, no build step, no frontend framework. Flask + Jinja2 is sufficient for 77 capabilities and 703 sections.
2. **Live reload from YAML** — re-reads files on every request. Enables the curation workflow: edit taxonomy → refresh → see changes. At ~280KB total YAML, this is fast enough.
3. **No database** — the two YAML files are the data layer. No ORM, no migrations.
4. **Standalone from Docusaurus** — this is an internal tool, not part of the customer-facing docs site. Own templates, own CSS.

## Non-Goals

- Production deployment — this runs locally via `python scripts/serve.py`
- User authentication
- Editing capabilities through the UI (YAML files are edited directly)
- Mobile-optimized design (desktop tool)
