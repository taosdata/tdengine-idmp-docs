# Verification

End-to-end tests and acceptance criteria.

## Test 1: Section parsing

```bash
python scripts/parse.py
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
python scripts/prepare.py
```

Expected:
- `.sections/extraction-prompt.md` is created (generic prompt, not section-specific)
- No `extraction.yaml` files exist yet (first run, no prior extraction)
- Summary reports all sections as needing extraction

## Test 3: Full AI extraction and merge

1. Direct AI agent to read `.sections/extraction-prompt.md` — it walks `.sections/`, reads each `section.md`, writes `extraction.yaml` next to it
2. Run:
   ```bash
   python scripts/merge.py
   ```

Expected:
- Every section directory has an `extraction.yaml` file
- `capabilities.section-map.yaml` is created
- Every `section_id` in the section map exists in `.sections/manifest.yaml`
- Each section has a `capabilities` list (may be empty)
- Each section map entry includes `file`, `heading`, `heading_level`, and `anchor`
- `prompt_version` is recorded

## Test 4: Taxonomy bootstrap

```bash
python scripts/prepare.py --bootstrap
```

Expected:
- Draft `capabilities.taxonomy.yaml` is generated
- ~50-80 canonical capabilities grouped into ~13 categories
- `planned` entries from `20-roadmap/index.md` are included
- No duplicate IDs or aliases in the draft

## Test 5: Validation passes

```bash
python scripts/validate.py
```

Expected: exit code 0 after taxonomy is curated and unmatched items are resolved. All rules from `03-data-contracts.md` pass.

## Test 6: Incremental update — file move

1. Note current sections for a file (e.g., `03-data-modeling/01-elements.md`)
2. Move the file to a different directory (e.g., `05-modeling/01-elements.md`) without renaming
3. Run:
   ```bash
   python scripts/parse.py
   python scripts/prepare.py
   ```

Expected:
- `section_id` is unchanged (it uses stripped filename, not directory path), so section directories and `extraction.yaml` files survive
- `prepare.py` reports zero sections needing extraction
- After `merge.py`, section map entries have updated `file` paths but the same `section_id`

## Test 7: Incremental update — content change

1. Edit a section in one doc (add a paragraph describing a new capability)
2. Run:
   ```bash
   python scripts/parse.py
   python scripts/prepare.py
   ```

Expected:
- Only the changed section is queued (verify via `prepare.py` summary output)
- `parse.py` has already deleted the stale `extraction.yaml` for the changed section
- After AI agent reprocesses the section and `merge.py` runs, new capability ID appears in section map
- Running `validate.py` surfaces it as an unmatched capability

## Test 8: Taxonomy curation cycle

1. Take an unmatched capability from Test 7
2. Add it to the taxonomy (as alias, new capability, or sub-capability)
3. Run `python scripts/validate.py`

Expected:
- The unmatched capabilities report no longer includes it

## Test 9: Broken reference detection

1. Delete a doc file that's referenced in the section map
2. Run `python scripts/validate.py`

Expected: exit code 1, report identifies the broken file path and affected section_ids.

## Test 10: Stale section map detection

1. Edit a doc section without re-running extraction
2. Run `python scripts/parse.py` (updates `.sections/`)
3. Run `python scripts/validate.py`

Expected: warning that `content_hash` in section map doesn't match `.sections/manifest.yaml` for the edited section.

## Test 11: Merge with malformed extraction result

1. Write an invalid `extraction.yaml` in one section directory (e.g., bad YAML syntax or missing `capabilities` key)
2. Run `python scripts/merge.py`

Expected: `merge.py` reports the malformed file with its directory path, skips that section, and successfully merges all other valid `extraction.yaml` files. The section map is updated with valid results only.

## Acceptance Criteria

The system is ready for production use when:

1. All 11 tests pass
2. A PM has reviewed the taxonomy and confirmed:
   - Capability names and categories are accurate
   - Parent/child relationships make sense
   - Status and since values are correct
3. The `validate.py` unmatched capabilities report is empty (all extracted IDs mapped to taxonomy or ignored)
4. CI validation is wired into the PR workflow and passing
5. The `validate.py --strict` run produces no warnings
