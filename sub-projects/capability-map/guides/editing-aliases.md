# Editing Aliases

How to safely modify `capabilities.aliases.yaml`.

## File structure

```yaml
aliases:
  canonical-id:          # Must exist in capabilities.taxonomy.yaml
    - extracted-alias-1
    - extracted-alias-2
```

The key is always the **canonical** capability ID (from the taxonomy). The list values are non-canonical IDs that the AI extraction produced.

## Adding an alias

1. Find the canonical capability ID in `capabilities.taxonomy.yaml`
2. Add the alias under that key in `capabilities.aliases.yaml`
3. Run `python scripts/validate.py` — should pass cleanly

## Renaming a canonical ID

This is the operation that breaks things. A canonical ID appears in three places:

| File | Field | What to update |
|---|---|---|
| `capabilities.taxonomy.yaml` | `id` | Rename the capability entry |
| `capabilities.taxonomy.yaml` | `parent` | Update any children pointing to the old ID |
| `capabilities.aliases.yaml` | group key | Rename the key; move the old ID into the alias list |

**Steps:**

1. In `capabilities.taxonomy.yaml`, change the `id` (and `name` if needed)
2. Search the taxonomy for `parent: old-id` and update to `parent: new-id`
3. In `capabilities.aliases.yaml`, rename the group key from `old-id` to `new-id`
4. Add `old-id` to the alias list under `new-id` (extractions still reference it)
5. Run `python scripts/validate.py`

**Example** — renaming `system-configuration` → `admin-console`:

```yaml
# Before
system-configuration:
  - admin-console

# After
admin-console:
  - system-configuration
```

And in the taxonomy: `id: system-configuration` → `id: admin-console`.

## Removing an alias

Delete the alias from the list. If the list becomes empty, remove the entire group key.

If the alias still appears in `capabilities.section-map.yaml`, it will surface as an unmatched ID on the next `validate.py` run. Either re-extract the affected sections or add the ID to `ignored`.

## Common mistakes

| Mistake | What happens | Fix |
|---|---|---|
| Group key not in taxonomy | Schema validation error | Rename the key or add the capability to taxonomy |
| Old canonical ID not added as alias after rename | Existing extractions become unmatched | Add old ID to the alias list |
| Forgot to update `parent` references | Taxonomy integrity error (dangling parent) | Search taxonomy for `parent: old-id` |

## Validation

Always run after editing:

```bash
python scripts/validate.py
```

Schema validation catches structural issues (wrong types, missing keys). Cross-reference checks catch dangling references.
