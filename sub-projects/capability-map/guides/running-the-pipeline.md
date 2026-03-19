# Running the Pipeline

All commands run from `sub-projects/capability-map/`.

## After editing docs

```bash
python scripts/parse.py
python scripts/prepare.py          # Reports which sections need extraction
# Direct AI agent to read .sections/extraction-prompt.md
# (agent skips sections that already have extraction.yaml)
python scripts/merge.py
# Review any unmatched capabilities, update taxonomy if needed
python scripts/validate.py
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

## Script reference

| Script | Purpose | Key flags |
|---|---|---|
| `parse.py` | Parse docs into `.sections/`; delete stale `extraction.yaml` | `--check` (CI), `--include`, `--exclude` |
| `prepare.py` | Report extraction status; write AI prompt | `--force` (delete all extraction.yaml), `--check` (CI), `--bootstrap` |
| `merge.py` | Rebuild section map from extraction results | (none) |
| `validate.py` | CI validation — schema, cross-refs, coverage | `--strict` (warnings as errors) |
