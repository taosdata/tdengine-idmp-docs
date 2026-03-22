# Pipeline Integration

## How downstream stages interact with the new artifacts

### AI extraction agent

**Before:** Agent scanned `.sections/` for directories with `section.md` but no `extraction.yaml`.

**After:** Agent reads `.sections/needs-extraction.yaml` for the explicit list of section IDs
to process. If `sections: []`, the agent has nothing to do and can exit immediately.

**New responsibility:** For each section, the agent reads `content_hash` from `meta.yaml`
and writes it as the first field in `extraction.yaml`. This stamp is what allows `prepare.py`
to detect staleness on future runs without relying on file deletion.

The per-section independence property is unchanged — if the agent is interrupted, completed
sections are preserved. On the next `prepare.py` run, only incomplete sections (absent or
stale `extraction.yaml`) will appear in `needs-extraction.yaml`.

### merge.py

No changes to `merge.py`. Its path-a hash check (`meta.yaml content_hash == manifest hash`)
remains the correctness safety net. It does not read `content_hash` from `extraction.yaml` —
it continues to use `meta.yaml` as the source of truth for the section's current hash.

### validate.py

`validate.py` gains a hash stamp cross-check: for every section present in the section map,
it verifies that `extraction.yaml.content_hash == meta.yaml.content_hash`. This is a
warning-level check — the extraction data is still correct if only the stamp is wrong, but
a wrong stamp would cause `prepare.py` to miss future re-extractions for that section.
See the `validate.py` step in the implementation plan for the full function.

## Conscious trade-off: deleted and moved sections

When a section is **deleted** from the docs, or **moved** in the doc structure (changing its
section_id and therefore its directory path), `parse.py` destroys its `.sections/` directory
via `shutil.rmtree()`. The `extraction.yaml` inside is lost.

This is intentional, and the actual loss window is narrower than it first appears:

- A **deleted** section has no extraction target — the loss is irrelevant.
- A **moved** section gets a new section_id and new directory. `merge.py`'s path-c remap
  already carries forward capabilities from the old section map by matching on `content_hash`.
  So if the moved section was previously extracted **and merged**, its capabilities survive
  the move without re-extraction.

The unrecoverable case is specifically: a section is extracted (written to `.sections/`)
but has **not yet been persisted into `capabilities.section-map.yaml`** via a successful
`merge.py` run, and is then moved. In that narrow window, the extraction is lost and
re-extraction is required.

The extraction cost is non-zero but acceptable. Introducing a holding area or recovery
mechanism for this edge case would add significant complexity for marginal benefit.

## Operational notes for pipeline operators

### Normal incremental update

After editing docs:

1. `python scripts/parse.py` — regenerates `section.md` and `meta.yaml`; leaves `extraction.yaml` untouched
2. `python scripts/prepare.py` — detects stale extractions via hash comparison; writes `needs-extraction.yaml`
3. Direct the AI agent to read `.sections/extraction-prompt.md`
4. `python scripts/merge.py` — rebuilds section map; stale extractions are independently rejected via hash check
5. `python scripts/validate.py` — optional; checks structural integrity

### Recovery from a failed re-extraction

If the AI agent fails mid-run on a changed section:
- The old `extraction.yaml` is still present (no longer deleted by `parse.py`)
- `merge.py` rejects it (hash mismatch) and falls through to carry-forward from the old map
- The section remains in `needs-extraction.yaml` on the next `prepare.py` run
- Re-run the agent; it processes only the remaining sections listed in `needs-extraction.yaml`

### `--dry-run` mode (operator preview)

Before committing to a run, operators can preview what each script would do:

```
python scripts/parse.py --dry-run
```
Prints a summary of sections that would be written (new/updated) and directories that
would be removed, without touching any files. Exit code is always 0.

```
python scripts/prepare.py --dry-run
```
Prints the list of section_ids that would appear in `needs-extraction.yaml` without
writing the file or regenerating the extraction prompt. Exit code is always 0.

`--dry-run` is distinct from `--check`:
- `--check` is for CI automation — exits non-zero on failure, used in pipelines.
- `--dry-run` is for human operators — always exits 0, used before a real run.

Mutually exclusive pairs: `parse.py --dry-run --check` and `prepare.py --dry-run --force`
both produce an error and exit 1.

### `--check` mode in CI

`prepare.py --check` exits non-zero if any sections need extraction. Detection now covers
both absent and stale (hash-mismatched) `extraction.yaml` files.
