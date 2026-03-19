# Web UI — Verification

## Setup

```bash
cd sub-projects/capability-map
source .venv/bin/activate
pip install -r scripts/requirements.txt
python scripts/serve.py
```

## Test 1: Overview page

Open `http://localhost:5000/`

Expected:
- Summary cards show: 77 capabilities, 14 categories, 703 sections, 967 mappings
- Category breakdown table has 14 rows with correct counts
- Category rows are clickable, navigate to `/categories#category-id`

## Test 2: Categories page

Open `http://localhost:5000/categories`

Expected:
- 14 collapsible category sections
- Sub-capabilities indented under parents (e.g., event-filter under event-browsing, notification-rules under event-notifications)
- Capability names link to `/capability/<id>`
- Defined/referenced counts shown per capability

## Test 3: Search

On `/categories`, type "chart" in search box.

Expected:
- Only chart-related capabilities visible (trend-chart, bar-chart, pie-chart, etc.)
- Non-matching capabilities hidden
- Empty category sections collapsed

## Test 4: Capability detail

Open `http://localhost:5000/capability/anomaly-detection`

Expected:
- Shows name "Anomaly Detection", category "AI-Powered Insights", status "ga", tags ["ai"]
- Defined In table lists sections with clickable doc links
- Referenced In table lists sections where anomaly-detection is referenced
- Doc links open correct pages on idmpdocs.taosdata.com

## Test 5: Doc link accuracy

Click a doc link from any capability detail page.

Expected: opens the correct section on idmpdocs.taosdata.com with the right anchor.

## Test 6: Coverage gaps

Open `http://localhost:5000/gaps`

Expected:
- Cross-check against `python scripts/validate.py` output — same unmatched/orphaned lists
- Each entry links to the relevant capability or shows the section context

## Test 7: Live reload

1. Edit `capabilities.taxonomy.yaml` — change a capability name
2. Refresh any page showing that capability

Expected: new name appears without restarting the server.

## Test 8: Missing capability

Open `http://localhost:5000/capability/nonexistent-id`

Expected: 404 page or friendly "Capability not found" message.
