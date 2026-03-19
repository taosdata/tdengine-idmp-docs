#!/usr/bin/env python3
"""
merge.py — Result Collection & Merge (No AI)

Sole writer of capabilities.section-map.yaml. Rebuilds the section map from
.sections/manifest.yaml, extraction.yaml files, and the previous section map
(for carry-forward and remap of moved sections).

Usage:
  python scripts/merge.py

Run from: sub-projects/capability-map/
"""

import re
import sys
from datetime import date
from pathlib import Path

import yaml

from shared import (
    PROMPT_VERSION,
    SECTION_MAP_FILE,
    SECTION_MAP_VERSION,
    SECTIONS_DIR,
    VALID_CONFIDENCES,
    VALID_RELATIONS,
    dump_yaml,
    load_yaml,
    section_id_to_dir,
    write_atomic,
)

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def normalize_id(cap_id: str) -> str:
    """Lowercase, trim, replace spaces with hyphens."""
    cap_id = cap_id.strip().lower()
    cap_id = re.sub(r"\s+", "-", cap_id)
    return cap_id


# ---------------------------------------------------------------------------
# Extraction validation and normalisation
# ---------------------------------------------------------------------------

def validate_and_normalize_extraction(
    raw: dict,
    section_dir: Path,
) -> tuple[list[dict] | None, list[str]]:
    """
    Validate and normalise an extraction.yaml dict.

    Returns (capabilities_list, warnings). capabilities_list is None if the
    file is structurally invalid (should be skipped). Warnings are non-fatal.
    """
    warnings = []

    if not isinstance(raw, dict):
        return None, ["not a YAML mapping"]

    caps_raw = raw.get("capabilities")
    if caps_raw is None:
        return None, ["missing 'capabilities' key"]

    if not isinstance(caps_raw, list):
        return None, ["'capabilities' is not a list"]

    caps = []
    seen_ids: set[str] = set()

    for i, item in enumerate(caps_raw):
        if not isinstance(item, dict):
            warnings.append(f"item {i} is not a mapping, skipping")
            continue

        raw_id = item.get("id")
        if not raw_id or not isinstance(raw_id, str):
            warnings.append(f"item {i} missing or invalid 'id', skipping")
            continue

        cap_id = normalize_id(raw_id)
        if not cap_id:
            warnings.append(f"item {i} 'id' is empty after normalization, skipping")
            continue

        relation = item.get("relation", "")
        if relation not in VALID_RELATIONS:
            warnings.append(
                f"item {i} ({cap_id!r}): invalid relation {relation!r}, defaulting to 'defined'"
            )
            relation = "defined"

        confidence = item.get("confidence", "")
        if confidence not in VALID_CONFIDENCES:
            warnings.append(
                f"item {i} ({cap_id!r}): invalid confidence {confidence!r}, defaulting to 'medium'"
            )
            confidence = "medium"

        # Deduplicate within section
        if cap_id in seen_ids:
            warnings.append(f"duplicate id {cap_id!r} in section, skipping")
            continue
        seen_ids.add(cap_id)

        caps.append({"id": cap_id, "relation": relation, "confidence": confidence})

    return caps, warnings


# ---------------------------------------------------------------------------
# Core merge logic
# ---------------------------------------------------------------------------

def build_section_map(
    manifest: dict,
    sections_dir: Path,
    old_map: dict | None,
) -> tuple[list[dict], list[str]]:
    """
    Rebuild the section map from manifest + extraction.yaml files.

    Returns (section_entries, error_messages).

    Algorithm (per section in manifest):
      a. extraction.yaml exists AND meta.yaml content_hash matches manifest → use extraction
      b. no extraction.yaml but old map has entry with matching content_hash → carry forward
      c. old map has entry at different section_id but matching content_hash → remap (moved)
      d. otherwise → no extraction yet; include with capabilities: [], extracted_at: null
    """
    errors: list[str] = []

    manifest_sections: list[dict] = manifest.get("sections", [])

    # Build lookup: content_hash → section_id for old map (for remap detection)
    old_by_hash: dict[str, dict] = {}
    old_by_id: dict[str, dict] = {}
    if old_map:
        for entry in old_map.get("sections", []):
            h = entry.get("content_hash")
            sid = entry.get("section_id")
            if h:
                old_by_hash[h] = entry
            if sid:
                old_by_id[sid] = entry

    # Track which old entries were consumed (to detect deleted sections)
    consumed_old_ids: set[str] = set()

    new_entries: list[dict] = []

    for manifest_entry in manifest_sections:
        sid = manifest_entry["section_id"]
        manifest_hash = manifest_entry["content_hash"]

        section_dir = section_id_to_dir(sid, sections_dir)
        extraction_file = section_dir / "extraction.yaml"
        meta_file = section_dir / "meta.yaml"

        # Load meta.yaml for enrichment fields
        meta = load_yaml(meta_file) or {}

        def make_entry(capabilities: list[dict], extracted_at: str | None) -> dict:
            return {
                "section_id": sid,
                "file": meta.get("file", ""),
                "directory": meta.get("directory", ""),
                "heading": meta.get("heading", ""),
                "heading_level": meta.get("heading_level", 0),
                "anchor": meta.get("anchor"),
                "content_hash": manifest_hash,
                "extracted_at": extracted_at,
                "capabilities": capabilities,
            }

        # --- Path a: fresh extraction.yaml exists ---
        if extraction_file.exists():
            meta_hash = meta.get("content_hash")
            if meta_hash != manifest_hash:
                errors.append(
                    f"SKIP {sid}: meta.yaml content_hash ({meta_hash!r}) does not match "
                    f"manifest ({manifest_hash!r}) — stale extraction, skipping"
                )
                # Fall through to carry-forward / empty
            else:
                raw = load_yaml(extraction_file)
                if raw is None:
                    errors.append(f"SKIP {sid}: could not parse extraction.yaml")
                else:
                    caps, warnings = validate_and_normalize_extraction(raw, section_dir)
                    for w in warnings:
                        print(f"  WARNING {sid}: {w}", file=sys.stderr)
                    if caps is None:
                        errors.append(f"SKIP {sid}: extraction.yaml is structurally invalid")
                    else:
                        new_entries.append(make_entry(caps, str(date.today())))
                        consumed_old_ids.add(sid)
                        continue

        # --- Path b: carry forward (same section_id, matching hash in old map) ---
        old_entry = old_by_id.get(sid)
        if old_entry and old_entry.get("content_hash") == manifest_hash:
            new_entries.append(make_entry(
                old_entry.get("capabilities", []),
                old_entry.get("extracted_at"),
            ))
            consumed_old_ids.add(sid)
            continue

        # --- Path c: remap (same content_hash, different section_id in old map) ---
        old_entry_by_hash = old_by_hash.get(manifest_hash)
        if old_entry_by_hash and old_entry_by_hash.get("section_id") != sid:
            old_sid = old_entry_by_hash["section_id"]
            print(f"  REMAP: {old_sid} → {sid}", file=sys.stderr)
            new_entries.append(make_entry(
                old_entry_by_hash.get("capabilities", []),
                old_entry_by_hash.get("extracted_at"),
            ))
            consumed_old_ids.add(sid)
            continue

        # --- Path d: no extraction yet ---
        new_entries.append(make_entry([], None))

    # --- Warn about dropped sections (in old map but not in manifest) ---
    if old_map:
        for old_entry in old_map.get("sections", []):
            old_sid = old_entry.get("section_id")
            if old_sid and old_sid not in consumed_old_ids:
                defined_caps = [
                    c["id"] for c in old_entry.get("capabilities", [])
                    if c.get("relation") == "defined"
                ]
                if defined_caps:
                    print(
                        f"  WARNING: deleted section {old_sid!r} had defined capabilities: "
                        + ", ".join(defined_caps),
                        file=sys.stderr,
                    )

    return new_entries, errors


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    manifest_path = SECTIONS_DIR / "manifest.yaml"
    if not manifest_path.exists():
        print("ERROR: .sections/manifest.yaml not found. Run parse.py first.", file=sys.stderr)
        return 1

    manifest = load_yaml(manifest_path)
    if not manifest:
        print("ERROR: .sections/manifest.yaml is empty or invalid.", file=sys.stderr)
        return 1

    old_map = load_yaml(SECTION_MAP_FILE)

    print(f"Merging {manifest.get('total_sections', '?')} sections from manifest...")

    entries, errors = build_section_map(manifest, SECTIONS_DIR, old_map)

    # Report errors
    for err in errors:
        print(f"  ERROR: {err}", file=sys.stderr)

    # Summary stats
    n_extracted = sum(1 for e in entries if e["extracted_at"] is not None)
    n_pending = sum(1 for e in entries if e["extracted_at"] is None)
    n_with_caps = sum(1 for e in entries if e["capabilities"])

    # Determine last_full_extraction
    last_full = None
    if old_map:
        last_full = old_map.get("last_full_extraction")
    if n_pending == 0:
        last_full = str(date.today())

    section_map = {
        "version": SECTION_MAP_VERSION,
        "last_full_extraction": last_full,
        "prompt_version": PROMPT_VERSION,
        "sections": entries,
    }

    write_atomic(SECTION_MAP_FILE, dump_yaml(section_map))

    print(f"Written: {SECTION_MAP_FILE}")
    print(f"  {len(entries)} sections total")
    print(f"  {n_extracted} extracted, {n_pending} pending extraction")
    print(f"  {n_with_caps} sections with at least one capability")

    if errors:
        print(f"\n{len(errors)} error(s) — see output above. Skipped sections left pending.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
