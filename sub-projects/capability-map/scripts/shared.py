"""
shared.py — Shared constants and utilities for capability-map scripts.

Imported by parse.py, prepare.py, merge.py, and validate.py.
"""

import os
import sys
import tempfile
from pathlib import Path

import yaml

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parents[3]
DOC_ROOT = REPO_ROOT / "i18n" / "en" / "docusaurus-plugin-content-docs" / "current"
SUBPROJECT_DIR = Path(__file__).resolve().parents[1]
SECTIONS_DIR = SUBPROJECT_DIR / ".sections"
SECTION_MAP_FILE = SUBPROJECT_DIR / "capabilities.section-map.yaml"
TAXONOMY_FILE = SUBPROJECT_DIR / "capabilities.taxonomy.yaml"
ALIASES_FILE = SUBPROJECT_DIR / "capabilities.aliases.yaml"
CAPABILITY_SET_SCHEMA = SUBPROJECT_DIR / "reference" / "capability-set.schema.json"
ALIASES_SCHEMA = SUBPROJECT_DIR / "reference" / "capability-aliases.schema.json"

# ---------------------------------------------------------------------------
# Versions
# ---------------------------------------------------------------------------

MANIFEST_VERSION = "1.0"
SECTION_MAP_VERSION = "1.0"
TAXONOMY_VERSION = "1.0"
PROMPT_VERSION = "1.0"

# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------

VALID_RELATIONS = {"defined", "referenced"}
VALID_CONFIDENCES = {"high", "medium", "low"}
VALID_STATUSES = {"ga", "beta", "preview", "planned", "deprecated"}

# ---------------------------------------------------------------------------
# YAML helpers
# ---------------------------------------------------------------------------

def flatten_aliases(grouped: dict[str, list[str]]) -> dict[str, str]:
    """Flatten grouped aliases (canonical → [aliases]) to a lookup dict (alias → canonical).

    The aliases file stores ``canonical_id: [alias1, alias2, ...]`` for easy
    human review.  Consumers need the reverse mapping ``alias → canonical`` for
    fast lookup during extraction resolution.
    """
    flat: dict[str, str] = {}
    for canonical, aliases in grouped.items():
        for alias in aliases:
            flat[alias] = canonical
    return flat


def load_yaml(path: Path) -> dict | list | None:
    """Load a YAML file. Returns None if missing or unparseable (prints warning)."""
    if not path.exists():
        return None
    try:
        return yaml.safe_load(path.read_text(encoding="utf-8"))
    except yaml.YAMLError as e:
        print(f"WARNING: could not parse {path}: {e}", file=sys.stderr)
        return None


def dump_yaml(data: dict | list) -> str:
    """Serialise data to a YAML string with consistent options."""
    return yaml.dump(data, allow_unicode=True, default_flow_style=False, sort_keys=False)


def write_atomic(path: Path, content: str) -> None:
    """Write content to a temp file then rename atomically."""
    dir_ = path.parent
    fd, tmp_path = tempfile.mkstemp(dir=dir_, suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            f.write(content)
        os.replace(tmp_path, path)
    except Exception:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass
        raise

# ---------------------------------------------------------------------------
# Section ID helpers
# ---------------------------------------------------------------------------

def section_id_to_dir(section_id: str, sections_dir: Path) -> Path:
    """
    Convert a section_id to its directory path under sections_dir.

    'elements#creating-elements'   → sections_dir/elements/creating-elements/
    'data-modeling/index#overview' → sections_dir/data-modeling/index/overview/
    'elements#(intro)'             → sections_dir/elements/(intro)/
    """
    name_part, slug = section_id.split("#", 1)
    dir_path = sections_dir
    for component in name_part.split("/"):
        dir_path = dir_path / component
    return dir_path / slug
