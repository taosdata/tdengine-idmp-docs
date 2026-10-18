---
name: idmp-doc-writing
description: "编写、更新、审查或修复 TDengine IDMP 用户手册和 Docusaurus 产品文档。适用于用户手册、产品文档、操作指南、管理指南、API 参考、中英文文档、截图、Markdown/MDX 和文档 CI 修复。Create and maintain IDMP end-user documentation. 不用于 RS、FS、需求分析、架构设计或技术方案；这些场景使用项目级 idmp-doc-fs。"
metadata:
  author: Haoran Chen
  version: 0.2.0
  owner_team: platform
---

# IDMP User Manual Writing

Create and maintain the user-facing TDengine IDMP documentation site in `tdengine-idmp-docs/`, including Chinese and English user guides, administration guides, API references, images, and release notes.

## Telemetry (MUST)

调用 `skill-telemetry`，传入 `name=idmp-doc-writing version=0.2.0 author=Haoran Chen`。失败不阻塞，但必须尝试。

## Scope

Use this skill for:

- Writing or updating product user manuals and task-oriented operation guides.
- Maintaining the Chinese `docs/` tree and its English mirror.
- Editing Docusaurus Markdown or MDX, navigation pages, images, links, and examples.
- Reviewing user-facing documentation for accuracy, usability, terminology, and bilingual consistency.
- Fixing documentation CI failures from markdownlint, typos, AutoCorrect, broken links, or Docusaurus builds.

Do not use this skill for RS, FS, requirements analysis, technical design, architecture design, implementation plans, or internal module design. Those belong to the repository-level `idmp-doc-fs` workflow. If a request mixes product design and user-manual updates, use each skill only for its corresponding deliverable.

## Project Context

- Treat `tdengine-idmp-docs/` as the documentation root when working from the IDMP monorepo.
- Follow `tdengine-idmp-docs/AGENTS.md` and read `docs-guide.md` plus a nearby page of the same type before writing.
- Chinese documentation lives in `docs/`.
- English documentation lives in `i18n/en/docusaurus-plugin-content-docs/current/`.
- The two locale trees must keep matching file paths and structure.

## Input

Determine from the request and repository context:

- Task mode: create, update, review, translate, or fix CI.
- Target feature, page, or error output.
- Target locale: Chinese, English, or both.
- Product version when behavior differs by release.

Ask only when a missing choice would materially change the content. For an existing page, preserve its locale and structure unless the user requests otherwise.

## Workflow

1. Read the documentation instructions and inspect the relevant implementation, UI text, existing documentation, and neighboring pages.
2. Do not invent product behavior, commands, field names, defaults, UI labels, or screenshots.
3. Preserve the numbered, lowercase, hyphenated hierarchy used by neighboring pages.
4. Write for product users: state their goal and prerequisites, give executable steps, describe observable results, and include limitations or recovery guidance when relevant.
5. Keep Chinese and English trees structurally aligned when adding or renaming pages. Adapt each language naturally and use the actual localized UI terms.
6. Verify every local link and image path. Confirm referenced files exist.
7. Run the narrowest relevant checks, followed by the Docusaurus build when the change can affect MDX, navigation, imports, or links.

## Documentation Rules

- Use one H1 and ATX headings with section numbering consistent with `AGENTS.md`, `docs-guide.md`, and neighboring pages.
- Use fenced code blocks with a language identifier. Commands and examples must reflect supported product behavior.
- Use `[text](url)` links, not angle-bracket URLs, and never add an empty or `javascript:` link.
- In Chinese prose, preserve spacing between Chinese and English or numbers and use Chinese punctuation.
- Escape `{variable}` in MDX prose and tables, but not inside inline code or fenced code blocks.
- Verify images before referencing them. Prefer chapter-local `images/` paths or the established `static/docs-img/` path.
- Use professional product-documentation language. Avoid conversational filler, and introduce tables, lists, or procedures with enough context for users to understand their purpose.
- Read [CHEATSHEET.md](CHEATSHEET.md) when exact Markdown, MDX, typography, Docusaurus component, or terminology examples are needed.

## Validation

Run checks from `tdengine-idmp-docs/`. Use the repository's `just` commands when available:

```bash
just build
```

The bundled helper can run the formatting checks when its dependencies are installed:

```bash
bash .agent/skills/idmp-doc-writing/scripts/check-local.sh
```

Do not install global tools without user approval. If a required tool is unavailable, report the unrun check and continue with checks already available in the repository.

## Output

Report:

- Files created or changed.
- The user-facing behavior or workflow documented.
- Local checks run and their results.
- Missing product evidence, unavailable validation, or items requiring human review.

## Safety

- Do not expose credentials, tokens, private URLs, customer data, or environment-specific secrets in examples or screenshots.
- Do not modify product code while handling a documentation-only request unless the user explicitly expands the scope.
- Do not overwrite unrelated documentation or run destructive cleanup commands.
- Do not commit or push unless the user explicitly requests it.
