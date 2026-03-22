# Problem and Analysis

## The Core Problem

The capability-map pipeline's AI extraction step is not zero-cost. Each `extraction.yaml`
represents real work: an AI inference call against a section of documentation. Losing this
result unnecessarily — and having to redo it — is wasteful.

Currently, `parse.py` deletes `extraction.yaml` when it detects that a section's content
has changed (hash mismatch). This is the right intent but the wrong mechanism: deletion
destroys the old result before the new one exists, so if re-extraction fails or is
interrupted, there is nothing to fall back on.

More importantly, deletion is not actually needed for correctness. `merge.py` already
independently validates that an `extraction.yaml` matches the current section content before
accepting it. The deletion in `parse.py` is purely a signal to the agent — and there is a
cleaner way to send that signal.

## What the Pipeline Currently Does

### parse.py: stale-extraction deletion (lines 592–605)

When writing each section, `parse.py` reads the old `meta.yaml` and compares content hashes.
If the hash changed, it deletes `extraction.yaml`:

```python
if old_meta.get('content_hash') != rec['content_hash']:
    existing_extraction.unlink()   # ← signal via destruction
```

**The problem:** If the AI agent fails before writing a replacement, the old result is gone
with no recovery path.

### parse.py: orphan removal (lines 580–585)

When a section disappears from the docs entirely, `parse.py` calls `shutil.rmtree()` on its
`.sections/` directory:

```python
shutil.rmtree(existing, ignore_errors=True)
```

This destroys the `extraction.yaml` along with everything else. This is a **conscious
trade-off** (see below).

### prepare.py: find_sections_needing_extraction()

Already computes which sections need extraction by checking for the presence of
`extraction.yaml`. Returns `(needs, up_to_date)` lists, currently only printed to stdout.
The detection logic does not distinguish between "never extracted" and "extracted but stale"
— it only knows "file absent or present".

### merge.py: hash validation (path-a, lines 181–202)

An independent safety net: before accepting an `extraction.yaml`, `merge.py` checks that
`meta.yaml`'s `content_hash` matches the manifest's hash. A stale `extraction.yaml` is
rejected here even if `parse.py` failed to delete it. This means the deletion in `parse.py`
is **not required for correctness**.

## What Is and Is Not a Problem

### Not a problem: deleted or moved sections

When a section is deleted from the docs, or moved in the doc structure (which changes its
section_id and therefore its directory path), `parse.py` destroys its directory via
`shutil.rmtree()`. This loses the `extraction.yaml`.

This is a **conscious trade-off**: re-extraction of a deleted or moved section is required
regardless (the content may have changed, and the section_id is different). The extraction
cost is non-zero but not large. Tolerating this loss keeps the design simple — there is no
need for a holding area or recovery mechanism for this case.

### Is a problem: changed sections losing their extraction before re-extraction completes

When a section's content changes, the old extraction is still valid as a fallback until a
new one is written. Deleting it preemptively (as `parse.py` currently does) creates an
unnecessary window of data loss.
