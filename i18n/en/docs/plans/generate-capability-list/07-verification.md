# Verification

How to test the system end-to-end after implementation.

## Test 1: Full initial extraction

```bash
python scripts/capabilities/extract.py
```

Expected:
- `capabilities.extraction-cache.yaml` is created with sections from all 139 docs
- Each section has a `content_hash`, `heading_path`, and list of capabilities
- Draft `capabilities.taxonomy.yaml` is generated with ~50-80 canonical capabilities grouped into ~13 categories
- No errors or crashes

## Test 2: Generation from cache + taxonomy

```bash
python scripts/capabilities/generate.py
```

Expected:
- `capabilities.yaml` is produced with `defined_in` and `referenced_in` cross-references
- Summary section shows correct counts
- `unmatched_capabilities` section lists any IDs not yet in taxonomy
- All file paths in `defined_in` / `referenced_in` point to real files

## Test 3: Validation passes

```bash
python scripts/capabilities/validate.py
```

Expected: exit code 0 after taxonomy is curated and unmatched items are resolved.

## Test 4: Incremental update — file move

Simulate a file rename:
1. Note the current extraction for a file (e.g., `03-data-modeling/01-elements.md`)
2. Rename the file to a different path
3. Run `python scripts/capabilities/extract.py --incremental --dry-run`

Expected:
- Dry run reports the file as "moved" (hash match at new path)
- Reports zero sections needing re-extraction for this file
- Running without `--dry-run` updates paths in cache, no AI calls

## Test 5: Incremental update — content change

1. Edit a section in one doc (add a paragraph describing a new capability)
2. Run `python scripts/capabilities/extract.py --incremental`

Expected:
- Only the changed section is re-extracted (check logs for API call count)
- New capability ID appears in cache
- Running `generate.py` surfaces it as an unmatched capability

## Test 6: Taxonomy curation cycle

1. Take an unmatched capability from Test 5
2. Add it as an alias to an existing taxonomy entry (or create a new entry)
3. Re-run `python scripts/capabilities/generate.py`

Expected:
- The capability now appears under its canonical entry in `capabilities.yaml`
- `unmatched_capabilities` list no longer includes it

## Test 7: Broken reference detection

1. Delete a doc file that's referenced in the cache
2. Run `python scripts/capabilities/validate.py`

Expected: exit code 1, report identifies the broken reference and which capabilities are affected.

## Test 8: Markdown output

```bash
python scripts/capabilities/generate.py --format markdown
```

Expected:
- `capabilities.md` is produced with a table grouped by category
- Each row shows: Capability Name, Status, Since Version, Defined In (with doc links)
- Summary section at top with counts by status and category

## Acceptance Criteria

The system is ready for production use when:
1. All 8 tests pass
2. A PM has reviewed the taxonomy and confirmed capability names/categories are accurate
3. The `unmatched_capabilities` list is empty (all extractions mapped or ignored)
4. CI validation is wired into the PR workflow
