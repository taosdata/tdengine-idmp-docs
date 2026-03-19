# Incremental Updates

After the initial full extraction, subsequent runs should be efficient — only re-extracting what actually changed.

## Change Detection Strategy

### Three tiers of change

| Change type | Detection | Action |
|---|---|---|
| **File moved** (same content) | Content hash exists in cache under a different path | Update path in cache. No re-extraction. |
| **Heading structure changed** (sections added/removed/renamed) | Section list differs from cache for this file | Re-extract affected sections only |
| **Body content changed** (under same headings) | Content hash differs for a known heading | Re-extract that section only |
| **Minor edit** (typo, formatting) | Content hash differs but heading structure unchanged and diff is small (<10% of section) | Skip re-extraction, update hash. Flag for optional review. |

### Content hash as identity

Sections are identified by the SHA-256 hash of their raw markdown content (heading + body). This means:

- **File renames/moves** → hash unchanged → no re-extraction, just path update
- **Section reordering within a file** → each section's hash unchanged → no re-extraction
- **Section split into two** → old hash disappears, two new hashes appear → re-extract the new sections
- **Section merged** → two old hashes disappear, one new hash appears → re-extract the merged section

### The update algorithm

```
1. Parse all current doc sections → list of (file, heading, content_hash)
2. Load existing cache

3. For each current section:
   a. Hash found in cache (any path)?
      → YES: Section is unchanged (possibly moved). Update path if needed.
      → NO: New or changed section. Mark for re-extraction.

4. For each cached section not found in current docs:
   → Content was deleted. Flag capabilities that were "defined" here.

5. Re-extract only marked sections (Step 3b).

6. Update cache with new results.

7. Re-generate capabilities.yaml.
   → Report any new unmatched capabilities for human triage.
```

## Handling file moves specifically

When a file moves from `03-data-modeling/01-elements.md` to `03-modeling/01-elements.md`:

1. All section hashes from the old path are still found in the new path's sections
2. Cache entries get their `file` field updated
3. `capabilities.yaml` gets regenerated with updated paths in `defined_in` / `referenced_in`
4. No AI calls needed

This also handles directory restructuring (e.g., renumbering chapters from `04-visualization` to `05-visualization`).

## Cost estimation for incremental runs

A typical PR changes 1-5 files. Each file has ~5-10 sections. So:
- **Sections to re-extract:** 5-50
- **Sections per API batch:** ~20
- **API calls needed:** 1-3
- **Compared to full extraction:** ~30 API calls

Incremental runs are roughly **10x cheaper** than full extraction.

## When to do a full re-extraction

- After major documentation restructuring
- If the extraction prompt template changes (new instructions may produce different results)
- As a quarterly audit to catch any drift
- If the cache file is lost or corrupted

Full re-extraction is idempotent — running it twice on the same docs produces the same results (modulo AI non-determinism, which is mitigated by the taxonomy layer).
