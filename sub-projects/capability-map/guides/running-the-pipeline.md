# Running the Pipeline

All commands run from `sub-projects/capability-map/`.

## After editing docs

```bash
python scripts/parse.py            # Regenerates section.md and meta.yaml; preserves extraction.yaml
python scripts/prepare.py          # Detects stale extractions via content_hash; writes needs-extraction.yaml
# Direct AI agent to read .sections/extraction-prompt.md
# Agent reads .sections/needs-extraction.yaml for the list of sections to process
python scripts/merge.py
# Review any unmatched capabilities, update taxonomy if needed
python scripts/validate.py
```

`prepare.py` detects two cases that need extraction:

- Sections with no `extraction.yaml` (never extracted)
- Sections whose `extraction.yaml` has a `content_hash` that no longer matches the manifest (content changed since last extraction)

The result is written to `.sections/needs-extraction.yaml` — the AI agent reads this file rather than scanning for absent files.

### Preview before running

```bash
python scripts/parse.py --dry-run   # Shows what would be written/removed, touches nothing
python scripts/prepare.py --dry-run # Shows which sections need extraction, writes nothing
```

## Quarterly audit (full re-extraction)

```bash
python scripts/parse.py
python scripts/prepare.py --force  # Deletes all extraction.yaml, forces full re-extraction
# Direct AI agent to read .sections/extraction-prompt.md and process all sections
python scripts/merge.py
python scripts/validate.py --strict
```

## First-time setup

```bash
python scripts/parse.py
python scripts/prepare.py
# Direct AI agent to read .sections/extraction-prompt.md and process all sections
python scripts/merge.py
python scripts/prepare.py --bootstrap   # Generate draft taxonomy from extraction results
# Review and curate capabilities.taxonomy.yaml
python scripts/validate.py
```

## Recovery from a failed extraction run

If the AI agent is interrupted mid-run:

- Old `extraction.yaml` files are preserved (no longer deleted by `parse.py`)
- `merge.py` rejects stale extractions via hash check and falls through to carry-forward
- Re-run `prepare.py` — only the incomplete sections appear in `needs-extraction.yaml`
- Direct the agent again; it picks up where it left off

## CI check

```bash
python scripts/parse.py --check    # Exit 1 if docs have changed since last parse
python scripts/prepare.py --check  # Exit 1 if any sections need extraction (absent or stale)
```

## Script reference

| Script | Purpose | Key flags |
|---|---|---|
| `parse.py` | Parse docs into `.sections/`; preserve `extraction.yaml` | `--check` (CI), `--dry-run` (preview), `--include`, `--exclude` |
| `prepare.py` | Detect stale extractions; write `needs-extraction.yaml` and AI prompt | `--force` (delete all extraction.yaml), `--check` (CI), `--dry-run` (preview), `--bootstrap` |
| `merge.py` | Rebuild section map from extraction results | (none) |
| `validate.py` | CI validation — schema, cross-refs, coverage, hash stamps | `--strict` (warnings as errors) |
