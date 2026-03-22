#!/usr/bin/env python3
"""Capability Inventory Explorer — Flask web UI."""

import base64
import os
import re
from collections import defaultdict
from pathlib import Path

import markdown as md
import yaml
from flask import Flask, Response, abort, jsonify, render_template, request

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

# SUBPROJECT_ROOT env var allows Vercel (or other deploy targets) to override
# the project root when the file layout differs from the local repo.
SUBPROJECT = Path(os.environ.get("SUBPROJECT_ROOT", Path(__file__).resolve().parents[1]))
REPO_ROOT = SUBPROJECT.parents[1]
TAXONOMY_FILE = SUBPROJECT / "capabilities.taxonomy.yaml"
ALIASES_FILE = SUBPROJECT / "capabilities.aliases.yaml"
SECTION_MAP_FILE = SUBPROJECT / "capabilities.section-map.yaml"
SECTIONS_DIR = SUBPROJECT / ".sections"
OTHER_CAP_SETS_DIR = SUBPROJECT / "other-cap-sets"
DOC_ROOT = REPO_ROOT / "i18n" / "en" / "docusaurus-plugin-content-docs" / "current"
DOCS_BASE_URL = "https://idmpdocs.taosdata.com"

# ---------------------------------------------------------------------------
# Flask app
# ---------------------------------------------------------------------------

app = Flask(
    __name__,
    template_folder=str(SUBPROJECT / "templates"),
    static_folder=str(SUBPROJECT / "static"),
)
app.jinja_env.filters["section_path"] = lambda sid: sid.replace("#", "/")


# ---------------------------------------------------------------------------
# Basic auth gate
# ---------------------------------------------------------------------------

_APP_PASSWORD = os.environ.get("APP_PASSWORD")


@app.before_request
def check_auth():
    """Require HTTP Basic Auth when APP_PASSWORD env var is set."""
    if not _APP_PASSWORD:
        return  # No password configured — allow all requests (local dev)
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Basic "):
        try:
            decoded = base64.b64decode(auth[6:]).decode("utf-8")
            _, _, password = decoded.partition(":")
            if password == _APP_PASSWORD:
                return  # Authenticated
        except Exception:
            pass
    return Response(
        "Unauthorized",
        401,
        {"WWW-Authenticate": 'Basic realm="Capability Explorer"'},
    )


# ---------------------------------------------------------------------------
# Data helpers
# ---------------------------------------------------------------------------


def _flatten_aliases(grouped: dict[str, list[str]]) -> dict[str, str]:
    """Flatten grouped aliases (canonical → [aliases]) to alias → canonical lookup."""
    flat: dict[str, str] = {}
    for canonical, aliases in grouped.items():
        for alias in aliases:
            flat[alias] = canonical
    return flat


def render_markdown(text: str) -> str:
    """Render Markdown text to HTML."""
    return md.markdown(text, extensions=["tables", "fenced_code"])


def section_id_to_path(section_id: str) -> str:
    """Convert section_id 'foo#bar' to URL-safe path 'foo/bar' (replace # with /)."""
    return section_id.replace("#", "/")


def section_path_to_dir(section_path: str) -> Path | None:
    """Map a URL path like 'introduction/attributes' to its .sections/ directory."""
    section_dir = SECTIONS_DIR / section_path
    if section_dir.is_dir():
        return section_dir
    return None


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
    aliases_data = yaml.safe_load(ALIASES_FILE.read_text(encoding="utf-8")) if ALIASES_FILE.exists() else {}

    # --- indexes ---
    capabilities = taxonomy.get("capabilities", [])
    categories = taxonomy.get("categories", [])

    cap_by_id = {c["id"]: c for c in capabilities}
    cat_by_id = {c["id"]: c for c in categories}

    alias_to_cap: dict[str, str] = _flatten_aliases(aliases_data.get("aliases", {}))
    ignored_ids = {e["id"] for e in aliases_data.get("ignored", [])}

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
        "ignored_ids": ignored_ids,
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


def load_comparison_data(
    set_a_path: Path, set_b_path: Path, aliases_path: Path
) -> dict:
    """Load two capability sets and compute a three-group comparison.

    Returns matched, only_in_a, only_in_b groups plus summary stats.
    """
    set_a = yaml.safe_load(set_a_path.read_text(encoding="utf-8"))
    set_b = yaml.safe_load(set_b_path.read_text(encoding="utf-8"))
    aliases_data = (
        yaml.safe_load(aliases_path.read_text(encoding="utf-8"))
        if aliases_path.exists()
        else {}
    )

    caps_a = set_a.get("capabilities", [])
    caps_b = set_b.get("capabilities", [])
    cap_by_id_a = {c["id"]: c for c in caps_a}
    cat_by_id_a = {c["id"]: c for c in set_a.get("categories", [])}

    # Build B category index; if the file has no categories list, derive from
    # the freeform category labels used on capabilities (preserving order).
    if set_b.get("categories"):
        cat_by_id_b = {c["id"]: c for c in set_b["categories"]}
    else:
        seen: dict[str, None] = {}
        for c in caps_b:
            cat = c.get("category", "uncategorized")
            seen.setdefault(cat, None)
        cat_by_id_b = {
            cid: {"id": cid, "name": cid.replace("-", " ").title()}
            for cid in seen
        }

    alias_to_canonical = _flatten_aliases(aliases_data.get("aliases", {}))

    # Resolve each B cap against A
    matched = []
    only_in_b = []
    matched_a_ids: set[str] = set()

    for cap_b in caps_b:
        raw_id = cap_b["id"]
        if raw_id in cap_by_id_a:
            resolved = raw_id
        elif raw_id in alias_to_canonical and alias_to_canonical[raw_id] in cap_by_id_a:
            resolved = alias_to_canonical[raw_id]
        else:
            only_in_b.append(cap_b)
            continue
        matched.append(
            {"cap_a": cap_by_id_a[resolved], "cap_b": cap_b, "resolved_id": resolved}
        )
        matched_a_ids.add(resolved)

    only_in_a = [c for c in caps_a if c["id"] not in matched_a_ids]

    # --- Stats ---
    required_caps = [m for m in caps_b if m.get("status") == "required"]
    nice_caps = [m for m in caps_b if m.get("status") == "nice-to-have"]
    required_met = sum(
        1 for m in matched if m["cap_b"].get("status") == "required"
    )
    nice_met = sum(
        1 for m in matched if m["cap_b"].get("status") == "nice-to-have"
    )
    required_total = len(required_caps)
    nice_total = len(nice_caps)

    compare_stats = {
        "total_a": len(caps_a),
        "total_b": len(caps_b),
        "matched_count": len(matched),
        "only_a_count": len(only_in_a),
        "only_b_count": len(only_in_b),
        "required_total": required_total,
        "required_met": required_met,
        "required_missing": required_total - required_met,
        "coverage_pct": (
            round(100 * required_met / required_total) if required_total else 0
        ),
        "nice_total": nice_total,
        "nice_met": nice_met,
    }

    # --- Group by category ---
    # Build per-category lists for B-side (matched + missing)
    b_categories_order = list(cat_by_id_b.keys())
    req_by_cat: dict[str, list] = defaultdict(list)
    for m in matched:
        cat = m["cap_b"].get("category", "uncategorized")
        req_by_cat[cat].append({**m, "match": True})
    for cap_b in only_in_b:
        cat = cap_b.get("category", "uncategorized")
        req_by_cat[cat].append({"cap_b": cap_b, "match": False})

    # Group only_in_a by A's categories
    a_categories_order = list(cat_by_id_a.keys())
    product_only_by_cat: dict[str, list] = defaultdict(list)
    for cap_a in only_in_a:
        cat = cap_a.get("category", "uncategorized")
        product_only_by_cat[cat].append(cap_a)

    return {
        "set_a_meta": {
            "name": set_a.get("name", "Set A"),
            "kind": set_a.get("kind", ""),
            "date": set_a.get("date", ""),
        },
        "set_b_meta": {
            "name": set_b.get("name", "Set B"),
            "kind": set_b.get("kind", ""),
            "date": set_b.get("date", ""),
        },
        "matched": matched,
        "only_in_a": only_in_a,
        "only_in_b": only_in_b,
        "compare_stats": compare_stats,
        "req_by_cat": dict(req_by_cat),
        "cat_by_id_b": cat_by_id_b,
        "b_categories_order": b_categories_order,
        "product_only_by_cat": dict(product_only_by_cat),
        "cat_by_id_a_compare": cat_by_id_a,
        "a_categories_order": a_categories_order,
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


@app.route("/section/<path:section_path>")
def section_view(section_path: str):
    """Render a single section.md snippet."""
    section_dir = section_path_to_dir(section_path)
    if not section_dir:
        abort(404)
    section_md = section_dir / "section.md"
    meta_file = section_dir / "meta.yaml"
    if not section_md.exists():
        abort(404)

    content_html = render_markdown(section_md.read_text(encoding="utf-8"))
    meta = {}
    if meta_file.exists():
        meta = yaml.safe_load(meta_file.read_text(encoding="utf-8")) or {}

    # Build link to the full doc page
    file_path = meta.get("file", "")
    doc_url = f"/doc/{file_path}" if file_path else None

    data = load_data()
    return render_template(
        "section.html",
        section_id=meta.get("section_id", section_path),
        content_html=content_html,
        meta=meta,
        doc_url=doc_url,
        **data,
    )


@app.route("/api/section/<path:section_path>")
def api_section(section_path: str):
    """Return rendered HTML for a section (used by hover preview)."""
    section_dir = section_path_to_dir(section_path)
    if not section_dir:
        abort(404)
    section_md = section_dir / "section.md"
    if not section_md.exists():
        abort(404)
    content_html = render_markdown(section_md.read_text(encoding="utf-8"))
    return jsonify({"html": content_html})


@app.route("/doc/<path:file_path>")
def doc_view(file_path: str):
    """Render a full source markdown doc file."""
    if not DOC_ROOT.is_dir():
        abort(404)  # DOC_ROOT unavailable (e.g. Vercel deployment)
    abs_path = DOC_ROOT / file_path
    if not abs_path.exists() or not abs_path.is_file():
        abort(404)
    # Security: ensure the resolved path is under DOC_ROOT
    if not abs_path.resolve().is_relative_to(DOC_ROOT.resolve()):
        abort(404)

    raw_md = abs_path.read_text(encoding="utf-8")
    content_html = render_markdown(raw_md)

    # Friendly title from the file name
    title = file_path.replace(".md", "").split("/")[-1]
    title = re.sub(r"^\d+-", "", title).replace("-", " ").title()

    external_url = build_doc_url({"file": file_path, "anchor": None})

    data = load_data()
    return render_template(
        "doc.html",
        file_path=file_path,
        title=title,
        content_html=content_html,
        external_url=external_url,
        **data,
    )


@app.route("/compare")
def compare_view():
    set_b_file = OTHER_CAP_SETS_DIR / "jnj-required-capabilities.yaml"
    data = load_data()
    comparison = load_comparison_data(TAXONOMY_FILE, set_b_file, ALIASES_FILE)
    return render_template("compare.html", **data, **comparison)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    print(f"Loading data from: {SUBPROJECT}")
    print(f"Taxonomy: {TAXONOMY_FILE}")
    print(f"Section map: {SECTION_MAP_FILE}")
    app.run(debug=True, port=5000)
