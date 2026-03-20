# Design Decisions

Eight architectural decisions that shape the capability-map project.

1. **Section-level extraction** — AI analyzes at the H2/H3 heading level, not whole files, for precise cross-referencing and incremental updates.

2. **Stable `section_id`** — each section gets a deterministic ID from stripped filename + heading slug, independent of directory path or content. Content hash is used only for change detection. This means file moves and renumbering don't invalidate the section map.

3. **Per-section extraction** — AI reads one `section.md`, writes one `extraction.yaml`. Simple prompt, no batching, naturally incremental. Partial completion is free — re-run the agent and it picks up where it left off.

4. **Defined vs. referenced** — each capability mention is tagged as either "defined here" (canonical source) or "referenced here" (cross-reference). This powers both the capability inventory and cross-reference analysis.

5. **Incremental updates** — only re-extract sections whose content hash has changed; file moves update paths without re-extraction.

6. **Three committed files** — the section map, taxonomy, and alias mapping are the complete source of truth. Consumers join them directly. No generated "final output" file means there's no stale artifact to manage.

7. **Capability sets as a first-class interchange format** — the project defines a [portable capability set format](../reference/capability-set-format.md) that can describe any enumeration of capabilities: a product's current state, a specific release, a roadmap, a customer requirement, or a competitive landscape. The product taxonomy is one instance of this format (`kind: product`), but it is not special — it follows the same schema as every other set.

   This is a deliberate architectural choice, not just a file format decision. By giving all capability enumerations a shared structure, the system enables:
   - **Gap analysis** — compare a customer requirement set against the product set to find what's missing.
   - **Release tracking** — diff the product set between versions to produce a precise changelog at the capability level.
   - **Roadmap alignment** — compare planned capabilities against requirements to validate prioritization.
   - **Competitive positioning** — compare the product set against a competitor's capabilities.

   The format is intentionally lightweight (only `id` and `name` are required per capability) so that non-engineering stakeholders — product managers, sales engineers, customers — can author capability sets without needing to understand the extraction pipeline. The shared `id` namespace makes cross-referencing mechanical rather than manual.

   This decision also drove the separation of extraction-specific concerns (aliases, ignored IDs) into a dedicated file. The taxonomy must stay conformant to the general format so it can be meaningfully compared against sets produced by people who have never seen the extraction pipeline.

8. **Aliases separated from taxonomy** — non-canonical IDs from AI extraction are mapped to canonical IDs in a dedicated `capabilities.aliases.yaml` file, not inline in each capability entry. This is a direct consequence of decision #7: aliases are an extraction pipeline concern, not a property of the capability itself. Separating them keeps the taxonomy portable and makes the alias registry independently auditable.
