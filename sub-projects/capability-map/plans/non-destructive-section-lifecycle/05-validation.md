# Validation Plan

Run all steps from the `sub-projects/capability-map/` directory.

## 1. Stale extraction detection via hash stamp

a. Edit one line in any in-scope doc section.
b. Run `python scripts/parse.py`.
c. **Verify:** The section's `extraction.yaml` still exists (not deleted).
d. **Verify:** `meta.yaml` has the new `content_hash`; `extraction.yaml` still has the old hash.
e. Run `python scripts/prepare.py`.
f. **Verify:** `.sections/needs-extraction.yaml` lists that section_id (hash mismatch detected).
g. Run `python scripts/merge.py`.
h. **Verify:** merge output shows `SKIP <section_id>: stale extraction` — old result not accepted.

## 2. Fresh extraction with hash stamp

a. Continuing from step 1, manually write a new `extraction.yaml` for the changed section,
   including the new `content_hash` from `meta.yaml`.
b. Run `python scripts/prepare.py`.
c. **Verify:** The section is no longer listed in `needs-extraction.yaml`.
d. Run `python scripts/merge.py`.
e. **Verify:** The new extraction appears correctly in `capabilities.section-map.yaml`.

## 3. Missing hash treated as stale

a. Find any `extraction.yaml` and remove its `content_hash` field (simulate a pre-existing file).
b. Run `python scripts/prepare.py`.
c. **Verify:** That section appears in `needs-extraction.yaml` (missing hash = needs extraction).

## 4. Deleted section (conscious trade-off)

a. Remove one in-scope doc section from the docs.
b. Run `python scripts/parse.py`.
c. **Verify:** The section directory is deleted (rmtree behavior unchanged).
d. Run `python scripts/merge.py`.
e. **Verify:** Section does not appear in `capabilities.section-map.yaml`.

## 5. Idempotency

a. Run `python scripts/parse.py` twice in a row on an unchanged corpus.
b. **Verify:** No `extraction.yaml` files are touched.
c. Run `python scripts/prepare.py` twice.
d. **Verify:** `needs-extraction.yaml` is identical between runs (same sections, same total).

## 6. Nothing to do

a. On a fully-extracted corpus with no doc changes (all `extraction.yaml` hashes current),
   run `python scripts/prepare.py`.
b. **Verify:** `needs-extraction.yaml` has `total: 0` and `sections: []`.

## 7. `--force` mode

a. Run `python scripts/prepare.py --force`.
b. **Verify:** All `extraction.yaml` files are deleted.
c. **Verify:** `needs-extraction.yaml` lists all sections.

## 8. `--check` mode

a. Run `python scripts/prepare.py --check`.
b. **Verify:** `needs-extraction.yaml` is NOT written or modified.
c. **Verify:** Exit code is 1 if sections need extraction, 0 if all up to date.

### 8b. `--check` detects stale hash (not just absent file)

a. Edit one line in any in-scope doc section.
b. Run `python scripts/parse.py` (updates `meta.yaml`; `extraction.yaml` still present with old hash).
c. Run `python scripts/prepare.py --check`.
d. **Verify:** Exit code is 1 — the stale hash triggers the failure, even though `extraction.yaml` exists.
e. **Verify:** `needs-extraction.yaml` is NOT written.

## 9. `parse.py --dry-run`

a. On a corpus with some changed and some unchanged sections, run `python scripts/parse.py --dry-run`.
b. **Verify:** No files are written or deleted in `.sections/`.
c. **Verify:** Output lists counts for NEW, UPDATED, and unchanged sections.
d. **Verify:** Output lists any directories that would be removed (orphaned sections).
e. **Verify:** Exit code is 0.
f. Pass both `--dry-run` and `--check` together.
g. **Verify:** An error is printed and exit code is 1 (flags are mutually exclusive).

## 10. `prepare.py --dry-run`

a. On a corpus where some sections need extraction, run `python scripts/prepare.py --dry-run`.
b. **Verify:** `needs-extraction.yaml` is NOT written or modified.
c. **Verify:** `extraction-prompt.md` is NOT regenerated.
d. **Verify:** Output lists the section_ids that would appear in `needs-extraction.yaml`.
e. **Verify:** Exit code is 0.
f. Pass both `--dry-run` and `--force` together.
g. **Verify:** An error is printed and exit code is 1 (flags are mutually exclusive).

## 11. Wrong hash stamp caught by `validate.py`

a. Manually write an `extraction.yaml` with a `content_hash` that does not match the
   sibling `meta.yaml` (simulate an agent writing the wrong stamp).
b. Run `python scripts/merge.py` — the section should be accepted (hash matches `meta.yaml`
   against manifest, which is the correctness gate).
c. Run `python scripts/validate.py`.
d. **Verify:** `validate.py` reports a warning for that section_id (wrong stamp detected).

## 12. Prompt freshness is automatic (no manual delete required)

a. Update `EXTRACTION_PROMPT_CONTENT` in `prepare.py` (simulate a future prompt change).
b. Run `python scripts/prepare.py` — do NOT delete `extraction-prompt.md` first.
c. **Verify:** `extraction-prompt.md` is rewritten automatically (content comparison detects
   the change).
d. Run `python scripts/prepare.py` again.
e. **Verify:** `extraction-prompt.md` is NOT rewritten (content is already current).

## 13. Interrupted `needs-extraction.yaml` write leaves no partial file

a. Simulate an interrupted write by verifying that `write_atomic()` is used (review the
   implementation; no runtime test needed for interruption itself).
b. **Verify:** The file is written via a temp-file rename, not direct `write_text()`.

## 14. Forbidden flag combinations

a. Run `python scripts/prepare.py --force --check`.
b. **Verify:** Error message and exit code 1.
c. Run `python scripts/prepare.py --force --dry-run`.
d. **Verify:** Error message and exit code 1.
e. Run `python scripts/prepare.py --check --dry-run`.
f. **Verify:** Error message and exit code 1.
g. Run `python scripts/prepare.py --bootstrap --check`.
h. **Verify:** Error message and exit code 1.

## 15. Prompt content regeneration (replaces manual deletion)

a. Run `python scripts/prepare.py` on a fully up-to-date corpus.
b. **Verify:** `extraction-prompt.md` exists with current content; no re-extraction triggered.
c. Modify `EXTRACTION_PROMPT_CONTENT` in `prepare.py` (simulate a prompt update).
d. Run `python scripts/prepare.py` — do NOT delete `extraction-prompt.md` first.
e. **Verify:** `extraction-prompt.md` is rewritten to match the new content.
f. **Verify:** `PROMPT_VERSION` in `scripts/shared.py` is unchanged.
g. **Verify:** No `extraction.yaml` files were deleted (prompt update alone does not trigger re-extraction).
