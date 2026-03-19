#!/usr/bin/env python3
"""
parse.py — Stage 1: Section Parsing (No AI)

Reads every in-scope doc, splits into sections, writes the .sections/ directory
and .sections/manifest.yaml.

Usage:
  python scripts/parse.py                              # Regenerate .sections/ directory
  python scripts/parse.py --check                      # CI mode: compare against existing manifest, exit 1 if stale
  python scripts/parse.py --include 03-data-modeling 04-visualization
  python scripts/parse.py --exclude 16-best-practices

Run from: sub-projects/capability-map/
"""

import argparse
import hashlib
import re
import shutil
import sys
import tempfile
from datetime import date
from pathlib import Path

import yaml

from shared import (
    DOC_ROOT,
    MANIFEST_VERSION,
    REPO_ROOT,
    SECTIONS_DIR,
    dump_yaml,
    section_id_to_dir,
)



DEFAULT_INCLUDE = [
    "01-introduction",
    "03-data-modeling",
    "04-visualization",
    "05-canvas-panels",
    "06-events",
    "07-real-time-analysis",
    "08-ai-powered-insights",
    "09-advanced-analytics",
    "10-excel-add-in",
    "11-collaboration",
    "12-data-ingestion",
    "13-libraries",
    "14-administration",
    "15-integrating-with-other-systems",
]

DEFAULT_EXCLUDE = [
    "00-index.md",
    "02-get-started",
    "14-release-history",
    "16-best-practices",
    "17-tutorials",
    "18-troubleshooting",
    "19-glossary",
    "20-roadmap",
    "21-release-history",
]


# ---------------------------------------------------------------------------
# Slug algorithm (Docusaurus GitHub-style)
# ---------------------------------------------------------------------------

def _apply_slug_algorithm(text: str) -> str:
    """
    Core Docusaurus GitHub-style slug algorithm applied to already-cleaned text
    (no heading prefix, no custom ID).
    """
    text = text.strip()
    text = text.lower()
    text = re.sub(r'[ _]+', '-', text)
    text = re.sub(r'[^\w-]', '', text, flags=re.UNICODE)
    text = re.sub(r'_', '-', text)
    text = re.sub(r'-+', '-', text)
    text = text.strip('-')
    return text


def make_slug(heading_text: str) -> str:
    """
    Convert a heading text to a URL anchor slug (Docusaurus GitHub-style).
    This is the raw slug — used for the `anchor` field (actual URL fragment).
    Handles custom IDs: '## My Heading {#custom-id}' → 'custom-id'
    """
    # Check for custom ID: {#some-id}
    custom_id_match = re.search(r'\{#([^}]+)\}\s*$', heading_text)
    if custom_id_match:
        return custom_id_match.group(1)

    # Strip markdown heading prefix (##, ###, etc.)
    text = re.sub(r'^#+\s*', '', heading_text)
    return _apply_slug_algorithm(text)


def make_slug_for_id(heading_text: str) -> str:
    """
    Convert a heading text to a stable slug for use in `section_id`.

    Like make_slug(), but also strips leading numeric outline prefixes
    (e.g. '1.1 ', '3.1.2 ') before slugging. This keeps section_id stable
    when headings are renumbered during doc reorganisation — the same
    reasoning as stripping numeric prefixes from filenames.

    Examples:
      '## 1. TDengine Metric'         → 'tdengine-metric'
      '## 1.1 What is TDengine IDMP'  → 'what-is-tdengine-idmp'
      '## 3.1.2 Asset Tree'           → 'asset-tree'
      '## Creating Elements'          → 'creating-elements'   (unchanged)
      '## My Section {#custom-id}'    → 'custom-id'           (custom ID wins)
    """
    # Custom ID takes precedence — no stripping needed
    custom_id_match = re.search(r'\{#([^}]+)\}\s*$', heading_text)
    if custom_id_match:
        return custom_id_match.group(1)

    # Strip markdown heading prefix
    text = re.sub(r'^#+\s*', '', heading_text)
    # Strip leading numeric outline prefix: digits and dots followed by a space.
    # Matches: '1 ', '1. ', '1.1 ', '3.1.2 ', '10.2.3 ', etc.
    # The optional trailing dot handles ordered-list style like '1. Heading'.
    text = re.sub(r'^\d+(\.\d+)*\.?\s+', '', text)
    return _apply_slug_algorithm(text)


# ---------------------------------------------------------------------------
# Filename stripping
# ---------------------------------------------------------------------------

def strip_name(name: str) -> str:
    """
    Strip .md extension and numeric ordering prefix from a filename or directory name.
    Examples:
      '01-elements.md' → 'elements'
      '03-data-modeling' → 'data-modeling'
      'index.md' → 'index'
      '01-introduction.md' → 'introduction'
    """
    # Remove .md extension
    if name.endswith('.md'):
        name = name[:-3]
    # Strip leading digits followed by a hyphen: ^\d+-
    name = re.sub(r'^\d+-', '', name)
    # Guard against empty string
    return name or name


# ---------------------------------------------------------------------------
# Frontmatter parsing
# ---------------------------------------------------------------------------

def strip_frontmatter(content: str) -> tuple[dict, str]:
    """
    Parse and strip YAML frontmatter from markdown content.
    Returns (frontmatter_dict, remaining_content).
    """
    if not content.startswith('---'):
        return {}, content

    end = content.find('\n---', 3)
    if end == -1:
        return {}, content

    fm_text = content[3:end].strip()
    remaining = content[end + 4:].lstrip('\n')
    try:
        fm = yaml.safe_load(fm_text) or {}
    except yaml.YAMLError:
        fm = {}
    return fm, remaining


# ---------------------------------------------------------------------------
# Section splitting
# ---------------------------------------------------------------------------

def split_sections(content: str) -> list[dict]:
    """
    Split markdown content (frontmatter already stripped) into sections.

    Each section is a dict:
      {
        'heading_text': str,   # raw heading line text (without ## prefix), or '(intro)'
        'heading_level': int,  # 0=intro, 2=H2, 3=H3
        'body': str,           # content after the heading line
        'raw': str,            # heading_line + '\n' + body (for hashing)
      }

    Rules:
    - Content before the first H2 is the intro section (heading_level=0)
    - Split on H2 (##) and H3 (###) headings only
    - Each section captures content until the next heading of equal or higher level
    - Sections with no meaningful content are marked with 'empty': True
    """
    lines = content.split('\n')
    sections = []

    # Collect intro (content before first H2)
    intro_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if re.match(r'^#{2,3}\s', line):
            break
        intro_lines.append(line)
        i += 1

    intro_body = '\n'.join(intro_lines).strip()
    if intro_body:
        sections.append({
            'heading_text': '(intro)',
            'heading_level': 0,
            'heading_line': '',
            'body': intro_body,
            'raw': intro_body,
        })

    # Now parse H2/H3 sections
    while i < len(lines):
        line = lines[i]
        h2_match = re.match(r'^(##)\s+(.+)$', line)
        h3_match = re.match(r'^(###)\s+(.+)$', line)

        if h2_match or h3_match:
            level = 2 if h2_match else 3
            heading_raw = h2_match.group(2) if h2_match else h3_match.group(2)
            heading_line = line
            i += 1

            # Collect body until next H2 or H3 (or H1/H2 if we're in H3)
            body_lines = []
            while i < len(lines):
                next_line = lines[i]
                # Stop at any H2 or H3
                if re.match(r'^#{2,3}\s', next_line):
                    break
                body_lines.append(next_line)
                i += 1

            body = '\n'.join(body_lines).strip()
            raw = heading_line + '\n' + body

            sections.append({
                'heading_text': heading_raw.strip(),
                'heading_level': level,
                'heading_line': heading_line,
                'body': body,
                'raw': raw,
            })
        else:
            i += 1

    return sections


def is_empty_section(body: str) -> bool:
    """
    Return True if a section body has no meaningful content.
    Sections containing only DocCardList or similar Docusaurus components are empty.
    """
    stripped = body.strip()
    if not stripped:
        return True
    # Remove JSX/HTML tags
    no_tags = re.sub(r'<[^>]+\s*/>', '', stripped)
    no_tags = re.sub(r'<[^>]+>', '', no_tags)
    no_tags = re.sub(r'</[^>]+>', '', no_tags)
    # Remove import statements
    no_tags = re.sub(r'^import\s+.*$', '', no_tags, flags=re.MULTILINE)
    return not no_tags.strip()


# ---------------------------------------------------------------------------
# Content hash
# ---------------------------------------------------------------------------

def compute_hash(raw: str) -> str:
    """First 9 hex chars of SHA-256 of the raw section content (heading line + body)."""
    return hashlib.sha256(raw.encode('utf-8')).hexdigest()[:9]


# ---------------------------------------------------------------------------
# File discovery and scope filtering
# ---------------------------------------------------------------------------

def collect_doc_files(doc_root: Path, include: list[str], exclude: list[str]) -> list[Path]:
    """
    Collect all .md files under doc_root that match the inclusion/exclusion policy.
    Returns paths relative to doc_root, sorted.
    """
    all_files = sorted(doc_root.rglob('*.md'))
    result = []

    for abs_path in all_files:
        rel = abs_path.relative_to(doc_root)
        parts = rel.parts  # e.g. ('03-data-modeling', '01-elements.md') or ('01-introduction.md',)

        # Check exclusion first (more specific wins)
        excluded = False
        for excl in exclude:
            # Match against first path component or the full filename
            if parts[0] == excl or (len(parts) == 1 and parts[0] == excl):
                excluded = True
                break
            # Also match by stripped name for robustness
            if strip_name(parts[0]) == strip_name(excl.rstrip('/').split('/')[-1]):
                excluded = True
                break

        if excluded:
            continue

        # Check inclusion
        included = False
        for incl in include:
            incl_stripped = strip_name(incl.rstrip('/').split('/')[-1])
            # Top-level file match (e.g. '01-introduction.md')
            if len(parts) == 1:
                file_stripped = strip_name(parts[0])
                if file_stripped == incl_stripped:
                    included = True
                    break
            else:
                # Directory match: first component is the chapter dir
                dir_stripped = strip_name(parts[0])
                if dir_stripped == incl_stripped:
                    included = True
                    break

        if included:
            result.append(rel)

    return result


# ---------------------------------------------------------------------------
# Section ID generation
# ---------------------------------------------------------------------------

def compute_section_ids(
    rel_path: Path,
    sections: list[dict],
    existing_stripped_names: dict[str, list[Path]],
) -> list[str]:
    """
    Compute section_ids for all sections in a file.

    section_id format: {stripped_filename}#{heading_slug}
    For intro: {stripped_filename}#(intro)

    For collisions (multiple files with same stripped name), prepend parent
    directory names (also stripped) until unique.

    existing_stripped_names: dict mapping stripped base name → list of rel_paths
    with that stripped name (for collision detection).
    """
    parts = rel_path.parts
    base = strip_name(parts[-1])

    # Determine disambiguation prefix
    # If multiple files share the same base stripped name, disambiguate
    colliders = existing_stripped_names.get(base, [])
    if len(colliders) > 1:
        # Need to prepend parent dirs (stripped) until unique among colliders
        # Find minimum number of parent segments to disambiguate this file
        def path_prefix(path: Path, n_parents: int) -> str:
            p = path.parts
            # p[-1] is filename, p[-2..] are directories
            dirs = [strip_name(d) for d in p[max(0, len(p) - 1 - n_parents):len(p) - 1]]
            return '/'.join(dirs + [strip_name(p[-1])])

        n = 1
        while n <= len(parts) - 1:
            this_prefix = path_prefix(rel_path, n)
            others_prefixes = {path_prefix(c, n) for c in colliders if c != rel_path}
            if this_prefix not in others_prefixes:
                break
            n += 1

        stripped_name = path_prefix(rel_path, n)
    else:
        stripped_name = base

    # Generate heading slugs with duplicate handling within this file.
    # section_id uses the stripped slug (numeric prefix removed) for stability.
    slug_counts: dict[str, int] = {}
    section_ids = []

    for sec in sections:
        if sec['heading_level'] == 0:
            slug = '(intro)'
        else:
            slug = make_slug_for_id(sec['heading_text'])

        # Duplicate handling
        if slug != '(intro)':
            count = slug_counts.get(slug, 0)
            slug_counts[slug] = count + 1
            if count > 0:
                slug = f'{slug}-{count}'
        # (intro) is always unique per file

        section_ids.append(f'{stripped_name}#{slug}')

    return section_ids


def compute_anchors(sections: list[dict]) -> list[str | None]:
    """
    Compute the URL anchor for each section using the raw (un-stripped) slug.
    This matches what Docusaurus actually generates for the page fragment.

    Intro sections have no anchor (None). Duplicate raw slugs within a file
    get the same -1, -2 suffix as Docusaurus would apply.
    """
    anchor_counts: dict[str, int] = {}
    anchors: list[str | None] = []

    for sec in sections:
        if sec['heading_level'] == 0:
            anchors.append(None)
            continue

        raw_slug = make_slug(sec['heading_text'])
        count = anchor_counts.get(raw_slug, 0)
        anchor_counts[raw_slug] = count + 1
        if count > 0:
            anchors.append(f'{raw_slug}-{count}')
        else:
            anchors.append(raw_slug)

    return anchors


# ---------------------------------------------------------------------------
# heading_path construction
# ---------------------------------------------------------------------------

def build_heading_paths(rel_path: Path, sections: list[dict], frontmatter: dict) -> list[list[str]]:
    """
    Build heading_path for each section: a breadcrumb list from chapter → file → heading.

    Example: ['Data Modeling', 'Elements', 'Creating Elements']
    """
    parts = rel_path.parts

    # Chapter name from directory (or file if top-level)
    if len(parts) > 1:
        chapter_name = frontmatter.get('title') or strip_name(parts[0]).replace('-', ' ').title()
        file_title = frontmatter.get('title') or strip_name(parts[-1]).replace('-', ' ').title()
        base_path = [chapter_name, file_title] if chapter_name != file_title else [chapter_name]
    else:
        file_title = frontmatter.get('title') or strip_name(parts[0]).replace('-', ' ').title()
        base_path = [file_title]

    paths = []
    for sec in sections:
        if sec['heading_level'] == 0:
            paths.append(base_path[:])
        else:
            # Strip numeric prefixes from heading text for display
            heading_display = re.sub(r'^\d+(\.\d+)*\s+', '', sec['heading_text'])
            # Also strip custom ID suffix
            heading_display = re.sub(r'\s*\{#[^}]+\}\s*$', '', heading_display).strip()
            paths.append(base_path + [heading_display])

    return paths


# ---------------------------------------------------------------------------
# Core parsing logic
# ---------------------------------------------------------------------------

def parse_doc_file(rel_path: Path, doc_root: Path) -> tuple[dict, list[dict]]:
    """
    Parse a single doc file. Returns (frontmatter, sections).
    Each section dict has: heading_text, heading_level, heading_line, body, raw.
    """
    abs_path = doc_root / rel_path
    content = abs_path.read_text(encoding='utf-8')
    frontmatter, body = strip_frontmatter(content)
    sections = split_sections(body)
    return frontmatter, sections


def parse_all(
    doc_root: Path,
    include: list[str],
    exclude: list[str],
) -> tuple[list[dict], dict]:
    """
    Parse all in-scope docs. Returns (section_records, scope_dict).

    section_records: list of dicts ready for writing to .sections/ and manifest
    scope_dict: the scope section for manifest.yaml
    """
    doc_files = collect_doc_files(doc_root, include, exclude)

    # Build collision map: stripped base name → list of rel_paths
    stripped_name_map: dict[str, list[Path]] = {}
    for rel in doc_files:
        base = strip_name(rel.parts[-1])
        stripped_name_map.setdefault(base, []).append(rel)

    records = []

    for rel_path in doc_files:
        frontmatter, sections = parse_doc_file(rel_path, doc_root)

        # Filter empty sections
        non_empty = [s for s in sections if not is_empty_section(s['body'])]

        if not non_empty:
            continue

        section_ids = compute_section_ids(rel_path, non_empty, stripped_name_map)
        anchors = compute_anchors(non_empty)
        heading_paths = build_heading_paths(rel_path, non_empty, frontmatter)

        for sec, sid, anchor, hpath in zip(non_empty, section_ids, anchors, heading_paths):
            content_hash = compute_hash(sec['raw'])

            file_str = str(rel_path).replace('\\', '/')
            directory = str(rel_path.parent).replace('\\', '/') if rel_path.parent != Path('.') else ''

            records.append({
                'section_id': sid,
                'file': file_str,
                'directory': directory,
                'heading': sec['heading_text'] if sec['heading_level'] != 0 else '(intro)',
                'heading_level': sec['heading_level'],
                'anchor': anchor,
                'heading_path': hpath,
                'content_hash': content_hash,
                'raw': sec['raw'],
            })

    scope = {
        'include': include,
        'exclude': exclude,
    }

    return records, scope


# ---------------------------------------------------------------------------
# Writing .sections/
# ---------------------------------------------------------------------------

def write_sections(records: list[dict], sections_dir: Path) -> None:
    """
    Write section.md and meta.yaml for every record under sections_dir.
    Preserve existing extraction.yaml if content_hash is unchanged.
    Delete stale extraction.yaml if content_hash changed.
    Remove directories for sections that no longer exist.
    """
    # Build set of expected section directories (as sets of path parts)
    # section_id like 'elements#creating-elements' or 'data-modeling/index#overview'
    # Directory: sections_dir / <stripped_name_parts> / <slug>
    expected_dirs: set[Path] = set()

    for rec in records:
        section_dir = section_id_to_dir(rec['section_id'], sections_dir)
        expected_dirs.add(section_dir)

    # Find all existing leaf directories (those containing section.md)
    existing_dirs: set[Path] = set()
    if sections_dir.exists():
        for p in sections_dir.rglob('section.md'):
            existing_dirs.add(p.parent)

    # Remove directories that no longer have a corresponding section
    for existing in existing_dirs:
        if existing not in expected_dirs:
            shutil.rmtree(existing, ignore_errors=True)
            # Clean up empty parent dirs
            _cleanup_empty_parents(existing.parent, sections_dir)

    # Write each record
    for rec in records:
        section_dir = section_id_to_dir(rec['section_id'], sections_dir)
        section_dir.mkdir(parents=True, exist_ok=True)

        # Check if content_hash changed (for extraction.yaml preservation/deletion)
        existing_meta = section_dir / 'meta.yaml'
        existing_extraction = section_dir / 'extraction.yaml'

        if existing_meta.exists() and existing_extraction.exists():
            try:
                old_meta = yaml.safe_load(existing_meta.read_text(encoding='utf-8'))
                if old_meta.get('content_hash') != rec['content_hash']:
                    # Content changed — delete stale extraction
                    existing_extraction.unlink()
            except (yaml.YAMLError, OSError):
                # If we can't read the old meta, delete extraction to be safe
                if existing_extraction.exists():
                    existing_extraction.unlink()

        # Write section.md
        (section_dir / 'section.md').write_text(rec['raw'], encoding='utf-8')

        # Write meta.yaml
        meta = {
            'section_id': rec['section_id'],
            'file': rec['file'],
            'directory': rec['directory'],
            'heading': rec['heading'],
            'heading_level': rec['heading_level'],
            'anchor': rec['anchor'],
            'heading_path': rec['heading_path'],
            'content_hash': rec['content_hash'],
        }
        (section_dir / 'meta.yaml').write_text(dump_yaml(meta), encoding='utf-8')



def _cleanup_empty_parents(directory: Path, stop_at: Path) -> None:
    """Remove empty parent directories up to (but not including) stop_at."""
    current = directory
    while current != stop_at and current.exists():
        try:
            current.rmdir()  # Only removes if empty
            current = current.parent
        except OSError:
            break


# ---------------------------------------------------------------------------
# Manifest writing
# ---------------------------------------------------------------------------

def write_manifest(
    records: list[dict],
    scope: dict,
    doc_root: Path,
    sections_dir: Path,
) -> None:
    """Write .sections/manifest.yaml."""
    manifest = {
        'version': MANIFEST_VERSION,
        'parsed_at': str(date.today()),
        'doc_root': str(doc_root.relative_to(REPO_ROOT)).replace('\\', '/'),
        'scope': scope,
        'total_files': len({r['file'] for r in records}),
        'total_sections': len(records),
        'sections': [
            {'section_id': r['section_id'], 'content_hash': r['content_hash']}
            for r in records
        ],
    }
    sections_dir.mkdir(parents=True, exist_ok=True)
    manifest_path = sections_dir / 'manifest.yaml'
    manifest_path.write_text(dump_yaml(manifest), encoding='utf-8')


# ---------------------------------------------------------------------------
# Check mode
# ---------------------------------------------------------------------------

def check_mode(doc_root: Path, include: list[str], exclude: list[str], sections_dir: Path) -> int:
    """
    CI mode: parse into a temp location, compare manifest against existing.
    Returns exit code (0=clean, 1=stale).
    """
    existing_manifest_path = sections_dir / 'manifest.yaml'
    if not existing_manifest_path.exists():
        print("ERROR: No existing manifest found. Run parse.py first.", file=sys.stderr)
        return 1

    existing_manifest = yaml.safe_load(existing_manifest_path.read_text(encoding='utf-8'))
    existing_sections = {
        s['section_id']: s['content_hash']
        for s in existing_manifest.get('sections', [])
    }

    # Parse fresh into memory (no disk writes)
    records, _ = parse_all(doc_root, include, exclude)
    new_sections = {r['section_id']: r['content_hash'] for r in records}

    stale = []
    new = []
    deleted = []

    for sid, new_hash in new_sections.items():
        if sid not in existing_sections:
            new.append(sid)
        elif existing_sections[sid] != new_hash:
            stale.append(sid)

    for sid in existing_sections:
        if sid not in new_sections:
            deleted.append(sid)

    if stale or new or deleted:
        if stale:
            print(f"STALE sections ({len(stale)}):")
            for sid in stale[:10]:
                print(f"  {sid}")
            if len(stale) > 10:
                print(f"  ... and {len(stale) - 10} more")
        if new:
            print(f"NEW sections ({len(new)}):")
            for sid in new[:10]:
                print(f"  {sid}")
            if len(new) > 10:
                print(f"  ... and {len(new) - 10} more")
        if deleted:
            print(f"DELETED sections ({len(deleted)}):")
            for sid in deleted[:10]:
                print(f"  {sid}")
            if len(deleted) > 10:
                print(f"  ... and {len(deleted) - 10} more")
        print(f"\n.sections/ is stale. Run: python scripts/parse.py")
        return 1

    print(f"OK: manifest is up to date ({len(new_sections)} sections)")
    return 0


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        description='Parse TDengine IDMP docs into sections for capability extraction.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        '--check',
        action='store_true',
        help='CI mode: compare against existing manifest, exit 1 if stale',
    )
    parser.add_argument(
        '--include',
        nargs='+',
        metavar='CHAPTER',
        help='Override default include list (chapter dir names or filenames)',
    )
    parser.add_argument(
        '--exclude',
        nargs='+',
        metavar='CHAPTER',
        help='Add to (or replace) default exclude list',
    )
    args = parser.parse_args()

    include = args.include if args.include else DEFAULT_INCLUDE
    exclude = args.exclude if args.exclude else DEFAULT_EXCLUDE

    if args.check:
        return check_mode(DOC_ROOT, include, exclude, SECTIONS_DIR)

    # Normal mode: regenerate .sections/
    print(f"Parsing docs from: {DOC_ROOT}")
    records, scope = parse_all(DOC_ROOT, include, exclude)

    total_files = len({r['file'] for r in records})
    print(f"Parsed {total_files} files, {len(records)} sections")

    SECTIONS_DIR.mkdir(parents=True, exist_ok=True)
    write_sections(records, SECTIONS_DIR)
    write_manifest(records, scope, DOC_ROOT, SECTIONS_DIR)

    print(f"Written to: {SECTIONS_DIR}")
    return 0


if __name__ == '__main__':
    sys.exit(main())
