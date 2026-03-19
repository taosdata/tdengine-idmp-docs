#!/usr/bin/env python3
"""Capability Inventory Explorer — Flask web UI."""

import re
from collections import defaultdict
from pathlib import Path

import yaml
from flask import Flask, abort, render_template

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

SUBPROJECT = Path(__file__).resolve().parents[1]
TAXONOMY_FILE = SUBPROJECT / "capabilities.taxonomy.yaml"
SECTION_MAP_FILE = SUBPROJECT / "capabilities.section-map.yaml"
DOCS_BASE_URL = "https://idmpdocs.taosdata.com"

# ---------------------------------------------------------------------------
# Flask app
# ---------------------------------------------------------------------------

app = Flask(
    __name__,
    template_folder=str(SUBPROJECT / "templates"),
    static_folder=str(SUBPROJECT / "static"),
)


# ---------------------------------------------------------------------------
# Data helpers
# ---------------------------------------------------------------------------


def build_doc_url(section: dict) -> str:
    """Convert a section's file + anchor to a Docusaurus URL."""
    file_path = section["file"]
    anchor = section.get("anchor")
    # Strip numeric prefixes and .md from each path segment
    parts = file_path.replace(".md", "").split("/")
    stripped = [re.sub(r"^\d+-", "", p) for p in parts]
    url_path = "/".join(stripped)
    url = f"{DOCS_BASE_URL}/{url_path}"
    if anchor:
        url += f"#{anchor}"
    return url


def load_data() -> dict:
    """Load both YAML files and compute all derived data.

    Called on every request for live-reload.
    """
    taxonomy = yaml.safe_load(TAXONOMY_FILE.read_text(encoding="utf-8"))
    section_map = yaml.safe_load(SECTION_MAP_FILE.read_text(encoding="utf-8"))

    # --- indexes ---
    capabilities = taxonomy.get("capabilities", [])
    categories = taxonomy.get("categories", [])
    ignored = taxonomy.get("ignored", [])

    cap_by_id = {c["id"]: c for c in capabilities}
    cat_by_id = {c["id"]: c for c in categories}
    ignored_ids = {e["id"] for e in ignored}

    alias_to_cap: dict[str, str] = {}
    for cap in capabilities:
        for alias in cap.get("aliases") or []:
            alias_to_cap[alias] = cap["id"]

    # All known IDs (canonical + aliases + ignored)
    known_ids = set(cap_by_id.keys()) | set(alias_to_cap.keys()) | ignored_ids

    # --- per-capability section lists ---
    sections_by_cap: dict[str, dict[str, list]] = defaultdict(
        lambda: {"defined": [], "referenced": []}
    )
    all_extracted_ids: set[str] = set()
    confidence_counts = {"high": 0, "medium": 0, "low": 0}
    defined_count = 0
    referenced_count = 0

    sections = section_map.get("sections", [])
    for section in sections:
        section["doc_url"] = build_doc_url(section)
        for entry in section.get("capabilities") or []:
            cid = entry["id"]
            rel = entry["relation"]
            conf = entry["confidence"]
            all_extracted_ids.add(cid)
            confidence_counts[conf] = confidence_counts.get(conf, 0) + 1
            if rel == "defined":
                defined_count += 1
            else:
                referenced_count += 1
            # Resolve alias → canonical for indexing
            canonical = alias_to_cap.get(cid, cid)
            sections_by_cap[canonical][rel].append(
                {"section": section, "confidence": conf}
            )

    # --- group by category, parent/child ---
    caps_by_category: dict[str, list] = defaultdict(list)
    children_by_parent: dict[str, list] = defaultdict(list)
    for cap in capabilities:
        caps_by_category[cap["category"]].append(cap)
        parent = cap.get("parent")
        if parent:
            children_by_parent[parent].append(cap)

    # Sort: confidence high > medium > low
    conf_order = {"high": 0, "medium": 1, "low": 2}
    for cap_sections in sections_by_cap.values():
        for rel in ("defined", "referenced"):
            cap_sections[rel].sort(key=lambda x: conf_order.get(x["confidence"], 9))

    # --- stats ---
    total_mappings = defined_count + referenced_count
    sections_with_caps = sum(
        1 for s in sections if s.get("capabilities")
    )

    gaps = [
        cap
        for cap in capabilities
        if not sections_by_cap[cap["id"]]["defined"]
    ]
    orphaned = [
        cap
        for cap in capabilities
        if not sections_by_cap[cap["id"]]["defined"]
        and not sections_by_cap[cap["id"]]["referenced"]
    ]
    unmatched_ids = sorted(all_extracted_ids - known_ids)

    # Collect unmatched details: which sections reference each unmatched ID
    unmatched_details: list[dict] = []
    for uid in unmatched_ids:
        refs = []
        for section in sections:
            for entry in section.get("capabilities") or []:
                if entry["id"] == uid:
                    refs.append(
                        {
                            "section": section,
                            "relation": entry["relation"],
                            "confidence": entry["confidence"],
                        }
                    )
        unmatched_details.append({"id": uid, "refs": refs})

    stats = {
        "total_capabilities": len(capabilities),
        "total_categories": len(categories),
        "total_sections": len(sections),
        "sections_with_caps": sections_with_caps,
        "total_mappings": total_mappings,
        "defined_count": defined_count,
        "referenced_count": referenced_count,
        "confidence_counts": confidence_counts,
        "coverage_pct": (
            round(100 * (len(capabilities) - len(gaps)) / len(capabilities))
            if capabilities
            else 0
        ),
        "high_pct": (
            round(100 * confidence_counts["high"] / total_mappings)
            if total_mappings
            else 0
        ),
    }

    # Category stats for overview table
    category_stats = []
    for cat in categories:
        cat_caps = caps_by_category.get(cat["id"], [])
        cat_defined = sum(
            len(sections_by_cap[c["id"]]["defined"]) for c in cat_caps
        )
        cat_referenced = sum(
            len(sections_by_cap[c["id"]]["referenced"]) for c in cat_caps
        )
        category_stats.append(
            {
                "category": cat,
                "cap_count": len(cat_caps),
                "defined_count": cat_defined,
                "referenced_count": cat_referenced,
            }
        )

    return {
        "capabilities": capabilities,
        "categories": categories,
        "ignored": ignored,
        "cap_by_id": cap_by_id,
        "cat_by_id": cat_by_id,
        "sections_by_cap": sections_by_cap,
        "caps_by_category": caps_by_category,
        "children_by_parent": children_by_parent,
        "stats": stats,
        "category_stats": category_stats,
        "gaps": gaps,
        "orphaned": orphaned,
        "unmatched_details": unmatched_details,
    }


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@app.route("/")
def overview():
    data = load_data()
    return render_template("overview.html", **data)


@app.route("/categories")
def categories_view():
    data = load_data()
    return render_template("categories.html", **data)


@app.route("/capability/<cap_id>")
def capability_detail(cap_id: str):
    data = load_data()
    cap = data["cap_by_id"].get(cap_id)
    if not cap:
        abort(404)
    cap_sections = data["sections_by_cap"].get(cap_id, {"defined": [], "referenced": []})
    children = data["children_by_parent"].get(cap_id, [])
    parent = data["cap_by_id"].get(cap.get("parent")) if cap.get("parent") else None
    category = data["cat_by_id"].get(cap["category"])
    return render_template(
        "capability.html",
        cap=cap,
        cap_sections=cap_sections,
        children=children,
        parent=parent,
        category=category,
        **data,
    )


@app.route("/gaps")
def gaps_view():
    data = load_data()
    return render_template("gaps.html", **data)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    print(f"Loading data from: {SUBPROJECT}")
    print(f"Taxonomy: {TAXONOMY_FILE}")
    print(f"Section map: {SECTION_MAP_FILE}")
    app.run(debug=True, port=5000)
