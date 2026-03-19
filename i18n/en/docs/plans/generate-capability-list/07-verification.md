# Verification

End-to-end tests and acceptance criteria.

## Test 1: Section parsing

```bash
python scripts/capabilities/parse.py
```

Expected:
- `.sections/` directory is created with one subdirectory per section
- `.sections/manifest.yaml` lists all sections with content hashes
- Only in-scope files are included (no glossary, roadmap, tutorials, etc.)
- Each section directory contains `section.md` (non-empty) and `meta.yaml` (with unique `section_id`, valid `content_hash`)
- `section_id` uses stripped filenames (no numeric prefixes, no directory paths)
- Intro sections have `heading: "(intro)"` and `heading_level: 0`
- Duplicate headings within a file get numeric suffixes (`overview`, `overview-1`)
- Filename collisions (e.g., `index.md`) are disambiguated with parent directory
- Total section count is reasonable (~400-600 for ~95 in-scope files)

## Test 2: Extraction prep

```bash
python scripts/capabilities/prepare.py
```

Expected:
- `.sections/extraction-prompt.md` is created with all sections (first run, no section map)
- Prompt file contains extraction instructions, section content grouped by file, and output format
- Summary reports all sections as queued

## Test 3: Full AI extraction and merge

1. Direct AI agent to read `.sections/extraction-prompt.md` and write `capabilities.extraction-result.yaml`
2. Run:
   ```bash
   python scripts/capabilities/merge.py
   ```

Expected:
- `capabilities.section-map.yaml` is created
- Every `section_id` in the section map exists in `.sections/manifest.yaml`
- Each section has a `capabilities` list (may be empty)
- Each capability entry has `id`, `relation`, and `confidence`
- `prompt_version` is recorded
- Transient files (`extraction-prompt.md`, `extraction-result.yaml`) are cleaned up

## Test 4: Taxonomy bootstrap

```bash
python scripts/capabilities/prepare.py --bootstrap
```

Expected:
- Draft `capabilities.taxonomy.yaml` is generated
- ~50-80 canonical capabilities grouped into ~13 categories
- `planned` entries from `20-roadmap/index.md` are included
- No duplicate IDs or aliases in the draft

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
   python scripts/capabilities/prepare.py
   ```

Expected:
- `prepare.py` reports sections as "moved" (content_hash match at new section_id)
- Reports zero sections needing extraction for this file
- No `.sections/extraction-prompt.md` is created (nothing to extract)
- Section map is updated with remapped section_ids

## Test 7: Incremental update — content change

1. Edit a section in one doc (add a paragraph describing a new capability)
2. Run:
   ```bash
   python scripts/capabilities/parse.py
   python scripts/capabilities/prepare.py
   ```

Expected:
- Only the changed section is queued (verify via `prepare.py` summary output)
- `.sections/extraction-prompt.md` contains only the changed section
- After AI extraction and `merge.py`, new capability ID appears in section map
- Running `validate.py` surfaces it as an unmatched capability

## Test 8: Taxonomy curation cycle

1. Take an unmatched capability from Test 7
2. Add it to the taxonomy (as alias, new capability, or sub-capability)
3. Run `python scripts/capabilities/validate.py`

Expected:
- The unmatched capabilities report no longer includes it

## Test 9: Broken reference detection

1. Delete a doc file that's referenced in the sections file
2. Run `python scripts/capabilities/validate.py`

Expected: exit code 1, report identifies the broken file path and affected section_ids.

## Test 10: Stale section map detection

1. Edit a doc section without re-running extraction
2. Run `python scripts/capabilities/parse.py` (updates `.sections/`)
3. Run `python scripts/capabilities/validate.py`

Expected: warning that `content_hash` in section map doesn't match `.sections/manifest.yaml` for the edited section.

## Test 11: Merge validation failure

1. Produce a `capabilities.extraction-result.yaml` with a missing `section_id` (remove one entry)
2. Run `python scripts/capabilities/merge.py`

Expected: exit code 1, reports the missing section_id, section map is not modified.

## Acceptance Criteria

The system is ready for production use when:

1. All 11 tests pass
2. A PM has reviewed the taxonomy and confirmed:
   - Capability names and categories are accurate
   - Parent/child relationships make sense
   - Status and since values are correct
3. The `unmatched_capabilities` list is empty (all extractions mapped or ignored)
4. CI validation is wired into the PR workflow and passing
5. The `validate.py --strict` run produces no warnings
