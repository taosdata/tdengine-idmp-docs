# Stale Extraction Detection

## Problem

When doc content changes, `parse.py` regenerates `section.md` and `meta.yaml` with the new `content_hash`, but the old `extraction.yaml` may still be present. The AI agent currently decides what to extract based on the absence of `extraction.yaml` — so it will skip sections that have changed but still have an outdated extraction file.

The current plan says `parse.py` should delete stale `extraction.yaml` files. This works but is destructive: if the AI agent fails partway through re-extraction, the old result is lost with nothing to replace it.

`merge.py` has a safety net (it rejects `extraction.yaml` files whose adjacent `meta.yaml` hash doesn't match the manifest), so stale results won't silently corrupt the section map. But the AI agent still won't know it needs to re-extract those sections.

## Options

### Option 1: `parse.py` deletes stale `extraction.yaml` (current plan)

- Simple, already implemented
- Destructive: old result is gone even if re-extraction fails
- The agent's "no `extraction.yaml` = needs work" heuristic works as-is

### Option 2: Enumerate changed sections in the prompt

- `prepare.py` embeds the list of changed section directories directly in `extraction-prompt.md`
- Agent reads one file and knows exactly what to do
- Prompt could get very long on first run (700+ sections) or after `--force`
- Prompt file changes on every run (less stable)

### Option 3: `prepare.py` writes a `needs-extraction.yaml` manifest

- `prepare.py` writes `.sections/needs-extraction.yaml` listing section_ids that need extraction
- Prompt tells the agent to read that file and process only those sections
- No destructive deletion of old `extraction.yaml`
- `merge.py`'s hash check already rejects stale results naturally
- `parse.py` becomes simpler (remove deletion logic)
- Agent reads two files (prompt + manifest) instead of one

### Option 4: AI agent compares hashes itself

- Agent reads `meta.yaml` hash and compares to `extraction.yaml` timestamp or content
- Pushes change-detection logic into the AI prompt
- Makes the prompt more complex and error-prone
- Not recommended

### Option 5: Rename stale files instead of deleting

- `parse.py` renames stale `extraction.yaml` to `extraction.yaml.stale`
- Agent sees no `extraction.yaml`, re-extracts
- `merge.py` could fall back to `.stale` if new extraction fails
- Adds complexity for marginal benefit

## Recommendation

Option 3 is likely the cleanest. It separates concerns (prepare.py owns the diff, the prompt stays generic, merge.py validates), avoids destructive deletion, and keeps the AI prompt simple and stable.

## Current Mitigation

`parse.py` currently deletes stale `extraction.yaml` files (option 1). `merge.py` independently verifies content_hash before merging, so even if a stale file slips through, it won't corrupt the section map.
