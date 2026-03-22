# Web UI — File Structure and Dependencies

## New Files

```
sub-projects/capability-map/
  scripts/
    serve.py                  # Flask app entry point
  templates/                  # Jinja2 templates
    base.html                 # Shared layout: sidebar + main content
    overview.html             # Dashboard stats
    categories.html           # Capabilities grouped by category
    capability.html           # Single capability detail
    gaps.html                 # Coverage gap analysis
  static/                     # Static assets
    style.css                 # All styling (~200 lines)
    app.js                    # Client-side search + UI interactions (~100 lines)
```

## Modified Files

| File | Change |
|---|---|
| `scripts/requirements.txt` | Add `flask` |

## Dependencies

Only addition: `flask` (which brings Jinja2, Werkzeug, etc.). Install:

```bash
cd sub-projects/capability-map
source .venv/bin/activate
pip install -r scripts/requirements.txt
```

## Running

```bash
python scripts/serve.py
# Starts on http://localhost:5000
# Ctrl+C to stop
```

Flask runs in debug mode by default (auto-restarts on Python code changes). YAML data is re-read on every request regardless.

## CSS Design Notes

- CSS custom properties for colors
- System font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
- Color-coded badges:
  - Relation: `.badge-defined` (green), `.badge-referenced` (blue)
  - Confidence: `.badge-high` (green), `.badge-medium` (amber), `.badge-low` (orange)
  - Status: `.status-ga` (green), `.status-beta` (yellow), `.status-planned` (gray)
- Striped table rows, compact padding
- Desktop-first, single responsive breakpoint

## JS Notes (`static/app.js`)

- Search filtering on `/categories`: listen to input, hide/show capability rows, collapse empty category sections
- Expand/collapse all button for categories
- Hash scrolling: if URL has `#category-id`, scroll to and open that `<details>` element
- ~80-100 lines, no dependencies
