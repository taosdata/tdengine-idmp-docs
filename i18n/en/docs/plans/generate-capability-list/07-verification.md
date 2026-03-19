# Verification

End-to-end tests and acceptance criteria.

## Test 1: Section parsing

```bash
python scripts/capabilities/parse.py
```

Expected:
- `capabilities.sections.yaml` is created
- Only in-scope files are included (no glossary, roadmap, tutorials, etc.)
- Each section has a unique `section_id`, valid `content_hash`, and non-empty `content`
- Intro sections have `heading: "(intro)"` and `heading_level: 0`
- Duplicate headings within a file get numeric suffixes (`overview`, `overview-2`)
- Total section count is reasonable (~400-600 for ~95 in-scope files)

## Test 2: Full AI extraction

```bash
python scripts/capabilities/extract.py
```

Expected:
- `capabilities.extraction-cache.yaml` is created
- Every `section_id` in the cache exists in `capabilities.sections.yaml`
- Each section has a `capabilities` list (may be empty)
- Each capability entry has `id`, `relation`, and `confidence`
- `prompt_version` is recorded

## Test 3: Taxonomy bootstrap

```bash
python scripts/capabilities/extract.py --bootstrap
```

Expected:
- Draft `capabilities.taxonomy.yaml` is generated
- ~50-80 canonical capabilities grouped into ~13 categories
- `planned` entries from `20-roadmap/index.md` are included
- No duplicate IDs or aliases in the draft

## Test 4: Generation

```bash
python scripts/capabilities/generate.py
```

Expected:
- `capabilities.yaml` is produced with `defined_in` and `referenced_in` cross-references
- Summary section shows correct counts by status and category
- `unmatched_capabilities` lists IDs not yet in taxonomy
- All `section_id` references in the output exist in the cache
- `children` arrays are populated from `parent` fields

## Test 5: Validation passes

```bash
python scripts/capabilities/validate.py
```

Expected: exit code 0 after taxonomy is curated and unmatched items are resolved. All rules from `03-data-contracts.md` pass.

## Test 6: Incremental update — file move

1. Note current sections for a file (e.g., `03-data-modeling/01-elements.md`)
2. Rename the file to a different path
3. Run:
   ```bash
   python scripts/capabilities/parse.py
   python scripts/capabilities/extract.py --incremental --dry-run
   ```

Expected:
- Dry run reports sections as "moved" (content_hash match at new section_id)
- Reports zero sections needing re-extraction for this file
- Running without `--dry-run` creates new cache entries with new section_ids, removes old entries, no AI calls

## Test 7: Incremental update — content change

1. Edit a section in one doc (add a paragraph describing a new capability)
2. Run:
   ```bash
   python scripts/capabilities/parse.py
   python scripts/capabilities/extract.py --incremental
   ```

Expected:
- Only the changed section is re-extracted (verify via logs or API call count)
- New capability ID appears in cache
- Running `generate.py` surfaces it as an unmatched capability

## Test 8: Taxonomy curation cycle

1. Take an unmatched capability from Test 7
2. Add it to the taxonomy (as alias, new capability, or sub-capability)
3. Run `python scripts/capabilities/generate.py`

Expected:
- The capability now appears under its canonical entry in `capabilities.yaml`
- `unmatched_capabilities` list no longer includes it

## Test 9: Broken reference detection

1. Delete a doc file that's referenced in the sections file
2. Run `python scripts/capabilities/validate.py`

Expected: exit code 1, report identifies the broken file path and affected section_ids.

## Test 10: Stale cache detection

1. Edit a doc section without re-running `extract.py`
2. Run `python scripts/capabilities/parse.py` (updates sections file)
3. Run `python scripts/capabilities/validate.py`

Expected: warning that `content_hash` in cache doesn't match sections file for the edited section.

## Test 11: Failure recovery

1. Simulate a crash during extraction (e.g., kill the process mid-run)
2. Verify the cache file is intact (previous version, not corrupted)
3. Run `python scripts/capabilities/extract.py --incremental`

Expected: re-extracts sections that weren't cached, produces complete cache.

## Test 12: Markdown output

```bash
python scripts/capabilities/generate.py --format markdown
```

Expected:
- `capabilities.md` is produced with a table grouped by category
- Each row: Capability Name, Status, Since, Defined In (with section links)
- Sub-capabilities are indented or grouped under their parent
- Summary section at top with counts by status and category

## Acceptance Criteria

The system is ready for production use when:

1. All 12 tests pass
2. A PM has reviewed the taxonomy and confirmed:
   - Capability names and categories are accurate
   - Parent/child relationships make sense
   - Status and since values are correct
3. The `unmatched_capabilities` list is empty (all extractions mapped or ignored)
4. CI validation is wired into the PR workflow and passing
5. The `validate.py --strict` run produces no warnings
