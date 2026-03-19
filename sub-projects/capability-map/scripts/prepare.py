#!/usr/bin/env python3
"""
prepare.py — Stage 2: Extraction Prep (No AI)

Reports extraction status, writes the AI prompt file, and optionally bootstraps
a draft taxonomy. Does NOT modify capabilities.section-map.yaml.

Usage:
  python scripts/prepare.py                    # Report status, write prompt if needed
  python scripts/prepare.py --force            # Delete all extraction.yaml, forcing full re-extraction
  python scripts/prepare.py --check            # CI mode: exit 1 if sections need extraction
  python scripts/prepare.py --bootstrap        # Generate draft taxonomy from section map (first run)

Run from: sub-projects/capability-map/
"""

import argparse
import difflib
import re
import sys
from collections import defaultdict
from pathlib import Path

import yaml

from shared import (
    DOC_ROOT,
    PROMPT_VERSION,
    SECTION_MAP_FILE,
    SECTIONS_DIR,
    TAXONOMY_FILE,
    TAXONOMY_VERSION,
    dump_yaml,
    load_yaml,
    section_id_to_dir,
)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

EXTRACTION_PROMPT_FILE = SECTIONS_DIR / "extraction-prompt.md"
ROADMAP_FILE = DOC_ROOT / "20-roadmap" / "index.md"

EXTRACTION_PROMPT_CONTENT = """\
# Capability Extraction Task

For each section directory under `.sections/` that contains a `section.md`
but no `extraction.yaml`, do the following:

1. Read `section.md`.
2. Identify capabilities — things the system can do: tasks, functions, or
   behaviors available to users or administrators.
   Examples: "trend-chart", "element-search", "sso-authentication".
   Do NOT treat navigation instructions, UI layout descriptions, or
   references to external systems as capabilities.
3. For each capability, classify the relation:
   - "defined" — this section explains what the capability is, how it works,
     or how to use/configure it.
   - "referenced" — this section meaningfully depends on or integrates with
     the capability, but does not define it.
   Do NOT mark incidental mentions (navigation links, see-also footnotes)
   as referenced.
4. Write `extraction.yaml` in the same directory as `section.md`.

Output format for each `extraction.yaml`:

```yaml
capabilities:
  - id: "short-lowercase-hyphenated-id"
    relation: "defined"     # or "referenced"
    confidence: "high"      # or "medium" or "low"
```

If a section contains no capabilities:

```yaml
capabilities: []
```
"""

# Chapter directory → taxonomy category id
CHAPTER_TO_CATEGORY = {
    "introduction": "platform",
    "data-modeling": "data-modeling",
    "visualization": "visualization",
    "canvas-panels": "canvas",
    "events": "events",
    "real-time-analysis": "real-time-analysis",
    "ai-powered-insights": "ai-insights",
    "advanced-analytics": "advanced-analytics",
    "excel-add-in": "excel",
    "collaboration": "collaboration",
    "data-ingestion": "data-ingestion",
    "libraries": "libraries",
    "administration": "administration",
    "integrating-with-other-systems": "integration",
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def strip_numeric_prefix(name: str) -> str:
    return re.sub(r"^\d+-", "", name)


def infer_category(file_path: str) -> str:
    """Infer taxonomy category from the chapter directory of a file path."""
    parts = Path(file_path).parts
    if parts:
        chapter = strip_numeric_prefix(parts[0])
        return CHAPTER_TO_CATEGORY.get(chapter, "platform")
    return "platform"


# ---------------------------------------------------------------------------
# Extraction status
# ---------------------------------------------------------------------------

def find_sections_needing_extraction(
    manifest: dict,
    sections_dir: Path,
) -> tuple[list[str], list[str]]:
    """
    Returns (needs_extraction, up_to_date) lists of section_ids.

    A section needs extraction if its directory has no extraction.yaml.
    (parse.py already deleted stale extraction.yaml for changed sections.)
    """
    needs = []
    up_to_date = []

    for entry in manifest.get("sections", []):
        sid = entry["section_id"]
        section_dir = section_id_to_dir(sid, sections_dir)
        extraction = section_dir / "extraction.yaml"
        if extraction.exists():
            up_to_date.append(sid)
        else:
            needs.append(sid)

    return needs, up_to_date


# ---------------------------------------------------------------------------
# Prompt version management
# ---------------------------------------------------------------------------

def check_prompt_version(section_map: dict | None) -> bool:
    """Return True if section map prompt_version differs from current."""
    if not section_map:
        return False
    return section_map.get("prompt_version") != PROMPT_VERSION


def delete_all_extractions(sections_dir: Path) -> int:
    """Delete all extraction.yaml files. Returns count deleted."""
    count = 0
    for extraction in sections_dir.rglob("extraction.yaml"):
        extraction.unlink()
        count += 1
    return count


# ---------------------------------------------------------------------------
# Prompt file
# ---------------------------------------------------------------------------

def write_prompt_if_needed(prompt_file: Path, force: bool = False) -> bool:
    """Write extraction-prompt.md. Returns True if written."""
    if prompt_file.exists() and not force:
        return False
    prompt_file.write_text(EXTRACTION_PROMPT_CONTENT, encoding="utf-8")
    return True


# ---------------------------------------------------------------------------
# Bootstrap: draft taxonomy generation
# ---------------------------------------------------------------------------

def similarity(a: str, b: str) -> float:
    return difflib.SequenceMatcher(None, a, b).ratio()


def cluster_ids(ids: list[str], threshold: float = 0.75) -> list[list[str]]:
    """
    Group similar capability IDs into clusters using greedy single-linkage.
    IDs within a cluster share a similarity ratio >= threshold.
    """
    clusters: list[list[str]] = []
    assigned = set()

    for cid in sorted(ids):
        if cid in assigned:
            continue
        cluster = [cid]
        assigned.add(cid)
        for other in sorted(ids):
            if other in assigned:
                continue
            if similarity(cid, other) >= threshold:
                cluster.append(other)
                assigned.add(other)
        clusters.append(cluster)

    return clusters


def propose_canonical(cluster: list[str]) -> str:
    """
    Choose the canonical ID for a cluster: shortest ID that is a prefix of
    the others, or the most common shared prefix, or just the shortest.
    """
    if len(cluster) == 1:
        return cluster[0]

    # Find the shortest ID that all others start with (as a prefix)
    for candidate in sorted(cluster, key=len):
        if all(other == candidate or other.startswith(candidate + "-") for other in cluster):
            return candidate

    # Otherwise pick the shortest
    return min(cluster, key=len)


def id_to_name(cid: str) -> str:
    """Convert a hyphenated ID to a title-cased display name."""
    return " ".join(word.capitalize() for word in cid.split("-"))


def parse_roadmap_items(roadmap_file: Path) -> list[dict]:
    """
    Parse 20-roadmap/index.md to extract planned capability entries.
    Looks for markdown list items or headings that suggest capabilities.
    Returns list of dicts with id, name, roadmap_ref.
    """
    if not roadmap_file.exists():
        return []

    content = roadmap_file.read_text(encoding="utf-8")
    lines = content.split("\n")
    planned = []
    current_quarter = None

    quarter_pattern = re.compile(r"(?:#{1,3}|^)\s*(20\d\d[-\s]?Q[1-4])", re.IGNORECASE)
    item_pattern = re.compile(r"^[-*]\s+(.+)$")

    for line in lines:
        # Detect quarter headings
        q_match = quarter_pattern.search(line)
        if q_match:
            raw = q_match.group(1).strip()
            # Normalise to "2026-Q1" format
            current_quarter = re.sub(r"\s+", "-", raw).upper()
            continue

        # Detect list items as planned capabilities
        item_match = item_pattern.match(line.strip())
        if item_match and current_quarter:
            raw_name = item_match.group(1).strip()
            # Strip markdown formatting
            raw_name = re.sub(r"\*\*|__|\*|_|`", "", raw_name).strip()
            # Skip very short or generic items
            if len(raw_name) < 4 or raw_name.lower() in ("tbd", "n/a", "none"):
                continue

            cap_id = re.sub(r"[^\w\s-]", "", raw_name.lower())
            cap_id = re.sub(r"[\s_]+", "-", cap_id)
            cap_id = re.sub(r"-+", "-", cap_id).strip("-")

            planned.append({
                "id": cap_id,
                "name": raw_name,
                "roadmap_ref": current_quarter,
            })

    return planned


def bootstrap_taxonomy(section_map: dict, sections_dir: Path) -> dict:
    """
    Generate a draft capabilities.taxonomy.yaml from the section map.
    Collects defined+high/medium confidence IDs, clusters them, infers
    categories, and adds planned entries from roadmap.
    """
    # Collect all defined, high/medium confidence capability IDs with their source file
    id_files: dict[str, list[str]] = defaultdict(list)  # id → list of files

    for section in section_map.get("sections", []):
        file_path = section.get("file", "")
        for cap in section.get("capabilities", []):
            if (
                cap.get("relation") == "defined"
                and cap.get("confidence") in ("high", "medium")
            ):
                id_files[cap["id"]].append(file_path)

    all_ids = sorted(id_files.keys())

    # Cluster similar IDs
    clusters = cluster_ids(all_ids)

    # Build capability entries
    capabilities = []
    for cluster in clusters:
        canonical = propose_canonical(cluster)
        # Determine category from most common source file
        all_files = []
        for cid in cluster:
            all_files.extend(id_files.get(cid, []))

        category_counts: dict[str, int] = defaultdict(int)
        for f in all_files:
            category_counts[infer_category(f)] += 1
        category = max(category_counts, key=lambda k: category_counts[k]) if category_counts else "platform"

        aliases = [cid for cid in cluster if cid != canonical]

        entry: dict = {
            "id": canonical,
            "name": id_to_name(canonical),
            "category": category,
            "status": "ga",
            "since": None,
            "tags": [],
            "aliases": aliases,
            "parent": None,
            "notes": "# REVIEW: auto-generated draft",
        }
        capabilities.append(entry)

    # Add planned entries from roadmap
    planned_items = parse_roadmap_items(ROADMAP_FILE)
    existing_ids = {c["id"] for c in capabilities}

    for item in planned_items:
        if item["id"] not in existing_ids:
            capabilities.append({
                "id": item["id"],
                "name": item["name"],
                "category": "platform",
                "status": "planned",
                "since": None,
                "tags": [],
                "aliases": [],
                "parent": None,
                "roadmap_ref": item["roadmap_ref"],
                "notes": "# REVIEW: auto-generated from roadmap",
            })
            existing_ids.add(item["id"])

    # Build standard categories list
    categories = [
        {"id": "platform", "name": "Platform"},
        {"id": "data-modeling", "name": "Industrial Data Modeling"},
        {"id": "visualization", "name": "Visualization & Dashboards"},
        {"id": "canvas", "name": "Canvas Panels"},
        {"id": "events", "name": "Event Management"},
        {"id": "real-time-analysis", "name": "Real-Time Analysis"},
        {"id": "ai-insights", "name": "AI-Powered Insights"},
        {"id": "advanced-analytics", "name": "Advanced Analytics"},
        {"id": "excel", "name": "Excel Add-in"},
        {"id": "collaboration", "name": "Collaboration"},
        {"id": "data-ingestion", "name": "Data Ingestion"},
        {"id": "libraries", "name": "Libraries & Reference Data"},
        {"id": "administration", "name": "Administration"},
        {"id": "integration", "name": "Integration with Other Systems"},
    ]

    from datetime import date
    taxonomy = {
        "version": TAXONOMY_VERSION,
        "last_updated": str(date.today()),
        "categories": categories,
        "capabilities": capabilities,
        "ignored": [],
    }

    return taxonomy


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        description="Prepare capability extraction: report status, write prompt, optionally bootstrap taxonomy.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Delete all extraction.yaml files, forcing full re-extraction",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="CI mode: exit 1 if any sections need extraction, modify nothing",
    )
    parser.add_argument(
        "--bootstrap",
        action="store_true",
        help="Generate draft capabilities.taxonomy.yaml from section map (first run only)",
    )
    args = parser.parse_args()

    # --- Load manifest ---
    manifest_path = SECTIONS_DIR / "manifest.yaml"
    if not manifest_path.exists():
        print("ERROR: .sections/manifest.yaml not found. Run parse.py first.", file=sys.stderr)
        return 1

    manifest = load_yaml(manifest_path)
    section_map = load_yaml(SECTION_MAP_FILE)

    # --- Bootstrap mode ---
    if args.bootstrap:
        if not section_map:
            print(
                "ERROR: capabilities.section-map.yaml not found. Run parse.py, extract, then merge.py first.",
                file=sys.stderr,
            )
            return 1
        print("Generating draft taxonomy from section map...")
        taxonomy = bootstrap_taxonomy(section_map, SECTIONS_DIR)
        TAXONOMY_FILE.write_text(dump_yaml(taxonomy), encoding="utf-8")
        n_caps = len(taxonomy.get("capabilities", []))
        n_planned = sum(1 for c in taxonomy.get("capabilities", []) if c.get("status") == "planned")
        print(f"Written: {TAXONOMY_FILE}")
        print(f"  {n_caps} capabilities ({n_planned} planned from roadmap)")
        print("  Review and curate before committing.")
        return 0

    # --- Prompt version check ---
    if not args.check and check_prompt_version(section_map):
        print(
            f"Prompt version changed (section map: {section_map.get('prompt_version')!r} → current: {PROMPT_VERSION!r}). "
            "Deleting all extraction.yaml files for full re-extraction."
        )
        deleted = delete_all_extractions(SECTIONS_DIR)
        print(f"Deleted {deleted} extraction.yaml files.")
        write_prompt_if_needed(EXTRACTION_PROMPT_FILE, force=True)

    # --- Force mode ---
    if args.force and not args.check:
        deleted = delete_all_extractions(SECTIONS_DIR)
        print(f"--force: deleted {deleted} extraction.yaml files.")

    # --- Status report ---
    needs, up_to_date = find_sections_needing_extraction(manifest, SECTIONS_DIR)
    total = len(needs) + len(up_to_date)

    if args.check:
        if needs:
            print(f"Sections need extraction: {len(needs)} of {total}")
            for sid in needs[:20]:
                print(f"  {sid}")
            if len(needs) > 20:
                print(f"  ... and {len(needs) - 20} more")
            return 1
        print(f"OK: section map is up to date ({total} sections, all extracted)")
        return 0

    # Normal mode: write prompt and report
    wrote_prompt = write_prompt_if_needed(EXTRACTION_PROMPT_FILE)
    if wrote_prompt:
        print(f"Written: {EXTRACTION_PROMPT_FILE}")

    if needs:
        print(f"Sections: {total} total, {len(needs)} need extraction, {len(up_to_date)} up to date")
        print(f"\nNext step: direct the AI agent to read {EXTRACTION_PROMPT_FILE}")
    else:
        print(f"Sections: {total} total, all up to date")
        print("Nothing to extract. Run merge.py to rebuild the section map if needed.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
