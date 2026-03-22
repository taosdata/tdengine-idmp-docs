#!/usr/bin/env python3
"""
One-time migration: add content_hash to existing extraction.yaml files.

Each extraction.yaml that lacks a content_hash field is updated by reading
the hash from the sibling meta.yaml and prepending it as the first field.

Usage:
    python scripts/migrate_extraction_hashes.py           # apply migration
    python scripts/migrate_extraction_hashes.py --dry-run # preview only
    python scripts/migrate_extraction_hashes.py --check   # exit 1 if any files still need migration
"""

import argparse
import sys
from pathlib import Path

import yaml

SECTIONS_DIR = Path(__file__).parent.parent / ".sections"


def load_yaml(path: Path) -> dict:
    try:
        return yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    except (yaml.YAMLError, OSError):
        return {}


def find_extraction_files(sections_dir: Path) -> list[Path]:
    return sorted(sections_dir.rglob("extraction.yaml"))


def needs_migration(extraction_path: Path) -> bool:
    data = load_yaml(extraction_path)
    return "content_hash" not in data


def migrate(extraction_path: Path, dry_run: bool) -> str | None:
    """
    Add content_hash to extraction_path from sibling meta.yaml.
    Returns an error string on failure, None on success.
    """
    meta_path = extraction_path.parent / "meta.yaml"
    if not meta_path.exists():
        return f"SKIP (no meta.yaml): {extraction_path}"

    meta = load_yaml(meta_path)
    content_hash = meta.get("content_hash")
    if not content_hash:
        return f"SKIP (meta.yaml has no content_hash): {extraction_path}"

    if dry_run:
        return None

    data = load_yaml(extraction_path)
    # Rewrite with content_hash as the first key
    updated = {"content_hash": content_hash, **data}
    # Preserve the YAML structure manually to keep content_hash first
    lines = [f"content_hash: {content_hash}\n"]
    rest = yaml.dump(
        {k: v for k, v in data.items()},
        default_flow_style=False,
        allow_unicode=True,
        sort_keys=False,
    )
    lines.append(rest)
    extraction_path.write_text("".join(lines), encoding="utf-8")
    return None


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Add content_hash to existing extraction.yaml files (one-time migration).",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show which files would be updated without writing anything",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Exit 1 if any extraction.yaml files still lack content_hash",
    )
    args = parser.parse_args()

    if not SECTIONS_DIR.exists():
        print(f"ERROR: {SECTIONS_DIR} does not exist. Run parse.py first.", file=sys.stderr)
        return 1

    all_files = find_extraction_files(SECTIONS_DIR)
    pending = [f for f in all_files if needs_migration(f)]

    if args.check:
        if pending:
            print(f"FAIL: {len(pending)} extraction.yaml files lack content_hash.")
            for f in pending[:10]:
                print(f"  {f.relative_to(SECTIONS_DIR)}")
            if len(pending) > 10:
                print(f"  ... and {len(pending) - 10} more")
            return 1
        print(f"OK: all {len(all_files)} extraction.yaml files have content_hash.")
        return 0

    if not pending:
        print(f"Nothing to do — all {len(all_files)} extraction.yaml files already have content_hash.")
        return 0

    if args.dry_run:
        print(f"[dry-run] {len(pending)} of {len(all_files)} extraction.yaml files would be updated:")
        for f in pending:
            print(f"  {f.relative_to(SECTIONS_DIR)}")
        print("[dry-run] No files written.")
        return 0

    errors = []
    updated = 0
    for f in pending:
        err = migrate(f, dry_run=False)
        if err:
            errors.append(err)
        else:
            updated += 1

    print(f"Updated {updated} extraction.yaml files.")
    if errors:
        print(f"Skipped {len(errors)} files:")
        for e in errors:
            print(f"  {e}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
