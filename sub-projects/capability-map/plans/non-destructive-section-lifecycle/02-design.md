# Solution Design

## Overall Approach

Stamp each `extraction.yaml` with the `content_hash` of the section it was extracted from.
This makes every extraction self-describing: any script can determine whether it is current
by comparing the embedded hash against the manifest, without relying on filesystem state
or deletion signals.

This allows `parse.py` to stop deleting `extraction.yaml` on content changes — the hash
stamp is the staleness signal. `prepare.py` reads the stamps and publishes a
`needs-extraction.yaml` manifest that tells the AI agent exactly what to process.

## Design Decisions

### 1. Hash stamp in `extraction.yaml`, not in a separate file

The hash is embedded directly in `extraction.yaml` alongside the capabilities list:

```yaml
content_hash: abc123def   # hash of section.md at time of extraction
capabilities:
  - id: trend-chart
    relation: defined
    confidence: high
```

This keeps the extraction result self-contained. Any reader — `prepare.py`, `merge.py`,
a human — can assess its freshness without consulting another file.

### 2. `prepare.py` owns staleness detection, not `parse.py`

`parse.py` is a low-level parsing script. Change detection and work-queue management belong
in `prepare.py`, which already has the manifest and calls `find_sections_needing_extraction()`.
Extending that function to compare hashes rather than check file presence is a natural fit.

`parse.py`'s only remaining responsibility is to write `section.md` and `meta.yaml`
correctly, and to remove directories for sections that no longer exist.

### 3. `parse.py` still destroys orphaned directories

When a section is deleted from the docs or moved (changing its section_id and directory
path), `parse.py` still calls `shutil.rmtree()` on the orphaned directory. This destroys
the `extraction.yaml` inside.

This is a **conscious trade-off**, but the loss window is narrower than it first appears.
`merge.py` already remaps moved sections by content hash from the old section map (path-c).
That means a moved section's extraction is only unrecoverable if the extraction existed in
`.sections/` but had **not yet been persisted into `capabilities.section-map.yaml`** via
a successful `merge.py` run. The common case — a section that was extracted and merged in a
previous pipeline run — is handled by the remap. The unrecoverable case is specifically:
extracted but not yet merged, then moved.

This residual loss is acceptable: the window is narrow, the extraction cost is non-zero but
not large, and introducing a holding area or recovery mechanism would add complexity for
marginal benefit.

### 4. `prepare.py` writes `needs-extraction.yaml`

The result of staleness detection is persisted to `.sections/needs-extraction.yaml` rather
than only printed to stdout. This gives the AI agent an explicit, stable work list instead
of relying on filesystem scanning. The file is fully regenerated on every `prepare.py` run.

### 5. `merge.py` is unchanged; `validate.py` gains a stamp cross-check

`merge.py`'s path-a hash check (`meta.yaml content_hash == manifest hash`) remains the
correctness safety net. It does not read `content_hash` from `extraction.yaml` — `meta.yaml`
is the authoritative source for the section's current hash, and that is what `merge.py`
compares against the manifest.

The stamp in `extraction.yaml` serves a different purpose: it lets `prepare.py` detect
staleness early, before extraction is attempted. If an agent writes the wrong hash stamp
(but correct capabilities and a matching `meta.yaml` hash), `merge.py` would accept the
result, but `prepare.py` would fail to detect staleness on the next content change.

To catch this, `validate.py` gains a cross-check: for every section present in the section
map, it verifies that `extraction.yaml.content_hash == meta.yaml.content_hash`. This is a
warning-level check (the extraction data is still correct; only the stamp is wrong), and
it catches bad agent output before it silently persists across runs.

### 6. No `.deleted/` holding area

The simpler design deliberately does not introduce a `.deleted/` directory or
`needs-deletion.yaml`. Deleted and moved sections lose their extraction data — that is
acceptable given the cost and complexity trade-off. `section.md` and `meta.yaml` are
cheap to regenerate and their destructive deletion remains fine.

### 7. No `PROMPT_VERSION` bump

Updating the extraction prompt does not require bumping `PROMPT_VERSION` or manually deleting
the existing `.sections/extraction-prompt.md`. Instead, `write_prompt_if_needed()` compares
the file's current content against `EXTRACTION_PROMPT_CONTENT` on every `prepare.py` run.
If the content differs, the file is atomically rewritten; otherwise it is left untouched.
This makes prompt rollout automatic and eliminates the procedural manual-delete step.
Mass re-extraction is not triggered because no `extraction.yaml` files are touched — the
prompt update only affects what the agent reads on its next run.

## Summary of Changes

| Component | Before | After |
|---|---|---|
| `extraction.yaml` | no hash field | `content_hash` field added |
| `parse.py` | deletes stale `extraction.yaml` on hash mismatch | no change to `extraction.yaml`; orphan rmtree unchanged |
| `prepare.py` | detects needs-extraction by file absence only; prompt rewritten only if missing | detects by absence OR hash mismatch; writes `needs-extraction.yaml` atomically; prompt rewritten on content change automatically |
| AI agent prompt | scans for absent `extraction.yaml` | reads `needs-extraction.yaml`; writes `content_hash` in output |
| `merge.py` | unchanged | unchanged |
| `validate.py` | no hash stamp check | cross-checks `extraction.yaml.content_hash == meta.yaml.content_hash` for all extracted sections |
