# Web UI — Routes and Data Layer

## Routes

| Route | Template | Description |
|---|---|---|
| `/` | `overview.html` | Dashboard: summary stats, category breakdown, confidence distribution |
| `/categories` | `categories.html` | All capabilities grouped by category with sub-capability nesting |
| `/capability/<id>` | `capability.html` | Single capability: defined/referenced sections with doc links |
| `/gaps` | `gaps.html` | Coverage gap analysis: missing definitions, unmatched IDs, orphans |

## Data Loading

`load_data()` is called on every request. It reads both YAML files and returns a context dict with indexes, per-capability section lists, and pre-computed stats.

Key indexes built:
- `cap_by_id` — capability ID → capability dict
- `cat_by_id` — category ID → category dict
- `alias_to_cap` — alias string → canonical capability ID
- `sections_by_cap` — capability ID → `{defined: [...], referenced: [...]}`
- `caps_by_category` — category ID → list of capabilities
- `children_by_parent` — parent capability ID → list of child capabilities

## Doc URL Construction

Docusaurus URL pattern (routeBasePath `/`, base URL `https://idmpdocs.taosdata.com`):

```python
def build_doc_url(section):
    file_path = section['file']
    anchor = section.get('anchor')
    # Strip numeric prefixes and .md from each path segment
    parts = file_path.replace('.md', '').split('/')
    stripped = [re.sub(r'^\d+-', '', p) for p in parts]
    url_path = '/'.join(stripped)
    url = f"{DOCS_BASE_URL}/{url_path}"
    if anchor:
        url += f"#{anchor}"
    return url
```

Validate this against the existing `parse.py` slug-stripping logic.

## Stats Computation

Pre-computed in `load_data()` and passed to templates:

- `total_capabilities`, `total_categories`, `total_sections`
- `sections_with_caps` — sections that have at least one capability mapping
- `total_mappings`, `defined_count`, `referenced_count`
- `confidence_counts` — `{high: N, medium: N, low: N}`
- `gaps` — capabilities with zero "defined" sections
- `orphaned` — capabilities with zero section references at all
- `unmatched_ids` — extracted IDs not in taxonomy id/aliases/ignored
