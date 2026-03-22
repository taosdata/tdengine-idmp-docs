"""Vercel serverless entry point — exposes the Flask WSGI app."""

import sys
from pathlib import Path

# Ensure the project root is on sys.path so `scripts.serve` is importable.
PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from scripts.serve import app  # noqa: E402, F401
