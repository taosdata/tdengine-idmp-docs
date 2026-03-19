# Design Decisions

Six architectural decisions that shape the capability-map pipeline.

1. **Section-level extraction** — AI analyzes at the H2/H3 heading level, not whole files, for precise cross-referencing and incremental updates.

2. **Stable `section_id`** — each section gets a deterministic ID from stripped filename + heading slug, independent of directory path or content. Content hash is used only for change detection. This means file moves and renumbering don't invalidate the section map.

3. **Per-section extraction** — AI reads one `section.md`, writes one `extraction.yaml`. Simple prompt, no batching, naturally incremental. Partial completion is free — re-run the agent and it picks up where it left off.

4. **Defined vs. referenced** — each capability mention is tagged as either "defined here" (canonical source) or "referenced here" (cross-reference). This powers both the capability inventory and cross-reference analysis.

5. **Incremental updates** — only re-extract sections whose content hash has changed; file moves update paths without re-extraction.

6. **Two committed files, no generated output** — the section map and taxonomy are the complete source of truth. Consumers join them directly. No generated "final output" file means there's no stale artifact to manage.
