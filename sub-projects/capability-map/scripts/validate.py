#!/usr/bin/env python3
"""
validate.py — CI Validation (No AI)

Lightweight schema and cross-reference checks. Reads .sections/manifest.yaml,
capabilities.section-map.yaml, and capabilities.taxonomy.yaml and reports
errors and warnings.

Usage:
  python scripts/validate.py                # Report errors and warnings
  python scripts/validate.py --strict       # Treat warnings as errors

Exit code: 0 if clean, 1 if errors (or warnings in --strict mode).

Run from: sub-projects/capability-map/
"""

import argparse
import sys
from pathlib import Path

import yaml

from shared import (
    ALIASES_FILE,
    DOC_ROOT,
    SECTION_MAP_FILE,
    SECTIONS_DIR,
    SUBPROJECT_DIR,
    TAXONOMY_FILE,
    VALID_CONFIDENCES,
    VALID_RELATIONS,
    VALID_STATUSES,
    flatten_aliases,
)


# ---------------------------------------------------------------------------
# Result collector
# ---------------------------------------------------------------------------

class Results:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, msg: str) -> None:
        self.errors.append(msg)

    def warn(self, msg: str) -> None:
        self.warnings.append(msg)

    def ok(self) -> bool:
        return not self.errors

    def print_report(self, strict: bool) -> None:
        if self.errors:
            print(f"\nERRORS ({len(self.errors)}):")
            for e in self.errors:
                print(f"  ERROR: {e}")
        if self.warnings:
            label = "WARNINGS (treated as errors)" if strict else "WARNINGS"
            print(f"\n{label} ({len(self.warnings)}):")
            for w in self.warnings:
                severity = "ERROR" if strict else "WARN"
                print(f"  {severity}: {w}")

    def exit_code(self, strict: bool) -> int:
        if self.errors:
            return 1
        if strict and self.warnings:
            return 1
        return 0


# ---------------------------------------------------------------------------
# Loaders
# ---------------------------------------------------------------------------

def load_validated(path: Path, results: Results, label: str) -> dict | None:
    """Load a YAML file and record errors in results if missing/invalid."""
    if not path.exists():
        results.error(f"{label} not found: {path}")
        return None
    try:
        data = yaml.safe_load(path.read_text(encoding="utf-8"))
        if data is None:
            results.error(f"{label} is empty: {path}")
            return None
        return data
    except yaml.YAMLError as e:
        results.error(f"{label} is not valid YAML: {e}")
        return None


# ---------------------------------------------------------------------------
# Check 1: Path and reference integrity
# ---------------------------------------------------------------------------

def check_path_integrity(
    manifest: dict,
    section_map: dict,
    results: Results,
) -> None:
    """
    - Every file in .sections/ meta.yaml resolves to an actual file on disk
    - Every section_id in section map exists in manifest
    """
    manifest_ids = {s["section_id"] for s in manifest.get("sections", [])}

    # Check meta.yaml files on disk
    if SECTIONS_DIR.exists():
        for meta_file in SECTIONS_DIR.rglob("meta.yaml"):
            try:
                meta = yaml.safe_load(meta_file.read_text(encoding="utf-8")) or {}
            except yaml.YAMLError:
                results.error(f"meta.yaml is not valid YAML: {meta_file}")
                continue

            file_field = meta.get("file", "")
            if file_field:
                abs_path = DOC_ROOT / file_field
                if not abs_path.exists():
                    results.error(
                        f"meta.yaml references non-existent file: {file_field} "
                        f"(from {meta_file.relative_to(SUBPROJECT_DIR)})"
                    )

    # Check every section_id in section map exists in manifest
    for section in section_map.get("sections", []):
        sid = section.get("section_id", "")
        if sid not in manifest_ids:
            results.error(
                f"section map entry {sid!r} not found in manifest — "
                "run parse.py to regenerate .sections/"
            )


# ---------------------------------------------------------------------------
# Check 2: Cross-consistency (hash matching)
# ---------------------------------------------------------------------------

def check_cross_consistency(
    manifest: dict,
    section_map: dict,
    results: Results,
) -> None:
    """
    content_hash in section map must match manifest for the same section_id.
    Detects stale section map (docs changed but merge.py not re-run).
    """
    manifest_hashes = {
        s["section_id"]: s["content_hash"]
        for s in manifest.get("sections", [])
    }

    for section in section_map.get("sections", []):
        sid = section.get("section_id", "")
        map_hash = section.get("content_hash")
        manifest_hash = manifest_hashes.get(sid)

        if manifest_hash is None:
            continue  # already reported in path integrity

        if map_hash != manifest_hash:
            results.error(
                f"content_hash mismatch for {sid!r}: "
                f"section map has {map_hash!r}, manifest has {manifest_hash!r} — "
                "run parse.py then merge.py"
            )


# ---------------------------------------------------------------------------
# Check 3: Taxonomy integrity
# ---------------------------------------------------------------------------

def check_taxonomy_integrity(taxonomy: dict, results: Results) -> None:
    """
    Validate the taxonomy file's internal consistency.
    """
    categories = {c["id"] for c in taxonomy.get("categories", [])}
    capabilities = taxonomy.get("capabilities", [])

    # Collect all capability ids for cross-checks
    cap_ids: set[str] = set()

    # --- Required fields and enum values ---
    for cap in capabilities:
        cap_id = cap.get("id", "")

        # Required fields
        for field in ("id", "name", "category", "status"):
            if not cap.get(field):
                results.error(
                    f"capability {cap_id!r} missing required field {field!r}"
                )

        # Duplicate id
        if cap_id in cap_ids:
            results.error(f"duplicate capability id: {cap_id!r}")
        cap_ids.add(cap_id)

        # Valid status
        status = cap.get("status", "")
        if status and status not in VALID_STATUSES:
            results.error(
                f"capability {cap_id!r} has invalid status {status!r} "
                f"(valid: {', '.join(sorted(VALID_STATUSES))})"
            )

        # Category exists
        cat = cap.get("category", "")
        if cat and cat not in categories:
            results.error(
                f"capability {cap_id!r} references unknown category {cat!r}"
            )

    # Second pass: validate parent references and detect cycles
    cap_parents: dict[str, str | None] = {
        cap.get("id", ""): cap.get("parent") for cap in capabilities
    }

    for cap in capabilities:
        cap_id = cap.get("id", "")
        parent = cap.get("parent")
        if parent is None:
            continue
        if parent not in cap_ids:
            results.error(
                f"capability {cap_id!r} has parent {parent!r} which does not exist"
            )
        else:
            # Detect circular chains
            visited = {cap_id}
            current = parent
            while current is not None:
                if current in visited:
                    results.error(
                        f"circular parent chain detected involving {cap_id!r}"
                    )
                    break
                visited.add(current)
                current = cap_parents.get(current)

    # --- Validate alias mapping file ---
    if ALIASES_FILE.exists():
        try:
            aliases_data = yaml.safe_load(ALIASES_FILE.read_text(encoding="utf-8")) or {}
        except yaml.YAMLError as e:
            results.error(f"aliases file is not valid YAML: {e}")
            aliases_data = {}

        # Check aliases: canonical IDs must exist, alias IDs must not conflict
        for canonical, alias_list in aliases_data.get("aliases", {}).items():
            if canonical not in cap_ids:
                results.error(
                    f"alias group key {canonical!r} is not a capability id"
                )
            if not isinstance(alias_list, list):
                results.error(
                    f"alias group {canonical!r} value must be a list, got {type(alias_list).__name__}"
                )
                continue
            for alias in alias_list:
                if alias in cap_ids:
                    results.error(
                        f"alias {alias!r} (under {canonical!r}) conflicts with an existing capability id"
                    )

        # Ignored list: every entry must have a reason
        for entry in aliases_data.get("ignored", []):
            ignored_id = entry.get("id", "")
            if not entry.get("reason"):
                results.error(f"ignored entry {ignored_id!r} has no reason")


# ---------------------------------------------------------------------------
# Check 4: Coverage checks
# ---------------------------------------------------------------------------

def check_coverage(
    section_map: dict,
    taxonomy: dict,
    results: Results,
) -> None:
    """
    Join section map + taxonomy and report orphans, unmatched IDs, and
    capabilities with no 'defined' sections.
    """
    capabilities = taxonomy.get("capabilities", [])

    # Load aliases from separate file
    aliases_data = {}
    if ALIASES_FILE.exists():
        try:
            aliases_data = yaml.safe_load(ALIASES_FILE.read_text(encoding="utf-8")) or {}
        except yaml.YAMLError:
            pass
    alias_to_cap = flatten_aliases(aliases_data.get("aliases", {}))
    ignored_ids = {e.get("id", "") for e in aliases_data.get("ignored", [])}

    # Build lookup: all known ids (canonical + aliases) → canonical id
    known: dict[str, str] = {}
    for cap in capabilities:
        cap_id = cap.get("id", "")
        known[cap_id] = cap_id
    for alias, canonical in alias_to_cap.items():
        known[alias] = canonical

    # Walk section map: collect defined sections per canonical id
    # defined_sections[canonical_id] = list of (section_id, confidence)
    defined_sections: dict[str, list[tuple[str, str]]] = {
        cap.get("id", ""): [] for cap in capabilities
    }
    unmatched_extracted: list[tuple[str, str]] = []  # (extracted_id, section_id)

    for section in section_map.get("sections", []):
        sid = section.get("section_id", "")
        for cap in section.get("capabilities", []):
            extracted_id = cap.get("id", "")
            relation = cap.get("relation", "")
            confidence = cap.get("confidence", "medium")

            if extracted_id in ignored_ids:
                continue

            canonical = known.get(extracted_id)
            if canonical is None:
                unmatched_extracted.append((extracted_id, sid))
            elif relation == "defined":
                defined_sections[canonical].append((sid, confidence))

    # Report unmatched extracted IDs
    if unmatched_extracted:
        seen: set[str] = set()
        for extracted_id, sid in unmatched_extracted:
            if extracted_id not in seen:
                results.warn(
                    f"extracted id {extracted_id!r} (e.g. from {sid!r}) "
                    "not in taxonomy id, aliases, or ignored list"
                )
                seen.add(extracted_id)

    # Report taxonomy capabilities with no defined sections (orphaned or missing definition)
    for cap in capabilities:
        cap_id = cap.get("id", "")
        status = cap.get("status", "")

        if status == "planned":
            continue  # planned capabilities have no docs yet — expected

        sections_for_cap = defined_sections.get(cap_id, [])

        if not sections_for_cap:
            results.warn(
                f"capability {cap_id!r} has no 'defined' sections in the section map "
                "(may be orphaned or definition was deleted)"
            )
        elif all(confidence == "low" for _, confidence in sections_for_cap):
            results.warn(
                f"capability {cap_id!r} all 'defined' sections have confidence 'low'"
            )


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        description="Validate capability map data files.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Treat warnings as errors (exit 1 if any warnings)",
    )
    args = parser.parse_args()

    results = Results()

    # --- Load required files ---
    manifest_path = SECTIONS_DIR / "manifest.yaml"
    manifest = load_validated(manifest_path, results, "manifest")
    section_map = load_validated(SECTION_MAP_FILE, results, "section map")
    # Taxonomy is optional until bootstrap has been run — missing is a warning, not an error
    taxonomy = None
    if TAXONOMY_FILE.exists():
        taxonomy = load_validated(TAXONOMY_FILE, results, "taxonomy")

    if not manifest or not section_map:
        results.print_report(args.strict)
        return 1

    # --- Run checks ---
    print("Checking path and reference integrity...")
    check_path_integrity(manifest, section_map, results)

    print("Checking cross-consistency (content hashes)...")
    check_cross_consistency(manifest, section_map, results)

    if taxonomy:
        print("Checking taxonomy integrity...")
        check_taxonomy_integrity(taxonomy, results)

        print("Checking coverage...")
        check_coverage(section_map, taxonomy, results)
    else:
        results.warn(
            "capabilities.taxonomy.yaml not found — "
            "taxonomy and coverage checks skipped. "
            "Run: python scripts/prepare.py --bootstrap"
        )

    # --- Report ---
    results.print_report(args.strict)

    total_checks = (
        len(results.errors) + len(results.warnings)
        if results.errors or results.warnings
        else 0
    )

    if total_checks == 0:
        print("\nOK: all checks passed")
    else:
        n_errors = len(results.errors)
        n_warnings = len(results.warnings)
        print(f"\n{n_errors} error(s), {n_warnings} warning(s)")

    return results.exit_code(args.strict)


if __name__ == "__main__":
    sys.exit(main())
