# TDengine IDMP Documentation Writing Guide

This guide covers everything you need to know to contribute to the TDengine IDMP user manual. Follow these conventions so that new content integrates cleanly into the existing structure.

## Directory Structure

The documentation uses Docusaurus with two locales:

```
docs/                                                      # Chinese (default locale, zh-Hans)
i18n/en/docusaurus-plugin-content-docs/current/           # English
```

Both trees mirror each other exactly — same filenames, same directory structure, same numbering. When you add a file in `docs/`, add the corresponding English file in `i18n/en/`.

Static assets (images shared across the site) live in:

```
static/docs-img/      # Served at /docs-img/ as absolute paths
```

## Chapter and File Naming

### Chapters

Each chapter is a numbered directory:

```
docs/
  01-introduction.md          ← single-file chapter
  02-get-started/
    index.md
    01-get-started-cloud.md
    02-get-started-docker.md
    ...
```

Top-level single-file chapters use a flat `.md` file. Multi-section chapters use a directory with an `index.md` and numbered sub-files.

### Naming Rules

- Use lowercase and hyphens only: `03-data-modeling/`, `01-elements.md`
- No spaces, no underscores, no uppercase
- Number prefix determines sidebar order: `01-`, `02-`, `03-`, ...
- Sub-files within a chapter start at `01-` (not `02-` — the overview content goes in `index.md`, not a separate `01-overview.md`)

### The `index.md` Convention

Every multi-section chapter must have an `index.md`. This file serves as the chapter landing page and should contain:

1. A brief introduction to the chapter (a few paragraphs)
2. Optionally, a "What's Covered" section linking to sub-pages
3. A `<DocCardList />` component at the bottom

```markdown
---
title: Chapter Title
sidebar_label: Chapter Title
---

Brief introduction explaining what this chapter covers and why it matters.

## Key Concepts

...prose content...

## What's Covered in This Chapter

- **[Sub-page Title](./01-sub-page.md)** — one-line description

import DocCardList from '@theme/DocCardList';

<DocCardList />
```

Do **not** create a separate `01-overview.md` file. Overview content belongs in `index.md`.

## Images and Diagrams

### Where to Put Images

Store images alongside the chapter that owns them:

```
docs/04-visualization/images/trend-demo.png
docs/05-canvas/images/canvas-01.png
docs/14-administration/images/single_deploy.png
```

For images shared across chapters, use `static/docs-img/`:

```
static/docs-img/basic/ui-main.png   →   referenced as /docs-img/basic/ui-main.png
```

### Referencing Images

Use relative paths for chapter-local images:

```markdown
# From docs/04-visualization/01-panels.md
![Panel overview](./images/panel-demo.png)

# From docs/04-visualization/02-chart-types/01-trend-chart.md (one level deeper)
![Trend chart](../images/trend-demo.png)
```

Use absolute paths for images in `static/docs-img/`:

```markdown
![UI Overview](/docs-img/basic/ui-main.png)
```

Never reference images across unrelated chapter directories (e.g., avoid `../../03-data-modeling/images/` from a visualization chapter). If multiple chapters need the same image, move it to `static/docs-img/`.

### Image File Names

- Lowercase, hyphens only: `trend-demo.png`, `canvas-01.png`
- Descriptive but concise
- Verify the file exists before referencing it in markdown

## Cross-References Between Pages

Always use relative paths for links between documentation pages:

```markdown
# Same directory
See [Panels](./01-panels.md) for details.

# Parent directory
See [Elements](../03-data-modeling/01-elements.md#section-anchor).

# Cross-chapter (from a sub-file)
See [Chapter 7](../07-real-time-analysis/index.md).
```

When you rename or renumber a file, search for all references to it across the entire `docs/` and `i18n/en/` trees and update them:

```bash
grep -r "old-filename" docs/ i18n/en/docusaurus-plugin-content-docs/current/
```

## Chinese vs English Versions

The Chinese and English versions are **not** direct translations of each other. Key differences:

- UI terminology must match the actual UI text in each locale. Always verify against the running application.
- Section headings and prose may be adapted for clarity in each language.
- Both versions must have the same file structure and filenames.

### Verified Chinese UI Terms

| Concept | Chinese UI Term |
|---|---|
| General tab | 通用 |
| AI suggestions | AI 推荐 |
| AI Chat | AI 问答 |
| Zero-Query Intelligence | 无问智推 |
| Unit of measure category | 计量单位分类 |
| Manual (as in manual creation) | 手工 |
| Authentication type: token | 密钥 |
| Missing data imputation | 缺失数据填补 |
| Industrial data foundation | 工业数据基座 |

When in doubt, verify the term in the Chinese UI before writing it in the docs.

## Markdown Format Rules

These rules are enforced by CI (markdownlint, AutoCorrect, typos).

### Headings

```markdown
# One level-1 heading per file (the page title)
## Second level
### Third level
```

- ATX style (`#`) only — no underline-style headings
- Space after `#`: `## Title` not `##Title`
- No indentation before `#`
- Do not number headings manually (e.g., avoid `## 4.1.1 Title` in `index.md`)

### Code Blocks

Use fenced blocks with a language specifier:

````markdown
```bash
pnpm install
```

```yaml
key: value
```
````

Never use indented code blocks or `~~~` fences.

### Links

```markdown
✅ [link text](./file.md)
✅ [link text](https://example.com)
❌ <https://example.com>        ← angle brackets not allowed
❌ [link text]()                ← empty href not allowed
```

### Bold with Colon

A space is required after bold text that ends with a colon:

```markdown
✅ **Parameter:** description
❌ **Parameter:**description
```

### Chinese-English Spacing (AutoCorrect)

Add a space between Chinese text and English words or numbers:

```markdown
✅ 使用 Java SDK 进行开发
✅ 版本 3.0 已发布
❌ 使用Java SDK进行开发
❌ 版本3.0已发布
```

Use full-width punctuation in Chinese text:

```markdown
✅ 这是一个句子。
❌ 这是一个句子.
```

### MDX Variable Escaping

Docusaurus treats `{variable}` as a JavaScript expression. Escape curly braces in plain text and tables:

```markdown
✅ 版本 \{SDK_VERSION\} 及以上
✅ | 版本 | \{SDK_VERSION\} |

❌ 版本 {SDK_VERSION} 及以上     ← will fail build
```

Do **not** escape inside code blocks:

````markdown
```bash
idmp-v{SDK_VERSION}.tar.gz      ← no escaping needed inside code blocks
```
````

## Adding a New Chapter

1. Create the directory and files in `docs/` with correct numbering.
2. Create `index.md` with an introduction and `<DocCardList />`.
3. Number sub-files starting from `01-`.
4. Create the corresponding directory and files in `i18n/en/`.
5. Place chapter images in `docs/[chapter]/images/` and `i18n/en/.../[chapter]/images/`.
6. Verify all cross-references and image paths resolve correctly.

## Adding a New Section to an Existing Chapter

1. Determine the correct position and number (e.g., if the last file is `07-foo.md`, the new file is `08-bar.md`).
2. Create the file in both `docs/` and `i18n/en/`.
3. Add a link to it in the chapter's `index.md` under "What's Covered".
4. Update any other files that should reference it.

## CI Checks

Before pushing, run the local check script:

```bash
.agent/skills/doc-writing/scripts/check-local.sh
```

This runs markdownlint, typos, and AutoCorrect locally. Fix all issues before opening a PR.

The CI pipeline runs:
- `markdownlint-cli2` — markdown format validation
- `typos` — spell checking
- `AutoCorrect` — Chinese typography
- Docusaurus build — validates MDX, links, and imports

All checks must pass for a PR to be merged.

## Using Claude to Write Documentation

Claude Code, Anthropic's CLI tool, can dramatically accelerate documentation writing by browsing the live IDMP application, verifying UI terminology, and drafting content directly in the correct format.

### Setup

1. Install Claude Code:

```bash
npm install -g @anthropic-ai/claude-code
```

2. Install the **Claude in Chrome** extension from the Chrome Web Store (search "Claude" by Anthropic). This lets Claude see and interact with your browser in real time.

3. Start Claude Code with Chrome enabled:

```bash
cd /path/to/tdengine-idmp-docs
claude --chrome
```

Or enable Chrome integration from within an existing session with `/chrome`.

### Verifying UI Terminology with the Chrome Extension

The most common documentation mistake is using terminology that doesn't match the actual UI. Claude can browse the running application and extract exact labels before you write anything.

**Example prompt — verify Chinese UI terms:**

```
Open the IDMP application at localhost:6042, switch the UI to Chinese,
then navigate to the element browser. Tell me the exact text on each
context tab (the tabs that appear when you select an element).
```

**Example prompt — check a specific feature:**

```
In the IDMP UI at localhost:6042, go to the Analyses tab for any element
and tell me: what is the exact text of the "Ask AI" button? What placeholder
text appears in the AI input field?
```

Claude will navigate the app, read the exact UI text, and report back. Use this output directly in your documentation — no guessing, no outdated screenshots.

### Drafting a New Page

Once terminology is verified, ask Claude to draft the page:

```
Based on what you just saw in the UI, write a Chinese documentation page
for the Analyses tab. Follow the doc-writing skill rules: ATX headings,
no numbered headings, bold+colon+space, Chinese-English spacing.
Save it to docs/07-real-time-analysis/08-new-feature.md
```

Claude will write the page, apply all format rules, and save it directly to the correct location.

### Recommended Workflow

1. **Explore the UI:** Ask Claude to navigate to the feature you are documenting and describe what it sees — all buttons, labels, tabs, tooltips, and empty states.
2. **Verify terminology:** Confirm any terms you are unsure about against the live UI in both Chinese and English.
3. **Draft the page:** Ask Claude to write the documentation page based on the UI exploration. Specify the target file path.
4. **Review and refine:** Read the draft and ask Claude to adjust tone, add examples, or expand sections.
5. **Run CI checks:** Ask Claude to run `.agent/skills/doc-writing/scripts/check-local.sh` and fix any issues.

### Useful Prompts

**Audit an existing page against the current UI:**

```
Read docs/08-ai-powered-insights/03-ai-panel-insights.md, then open
localhost:6042 and navigate to the panel insights feature. Check whether
the terminology in the doc matches the actual UI text. List any mismatches.
```

**Write both Chinese and English versions:**

```
Write the Chinese version first in docs/12-data-ingestion/05-new-connector.md,
then write the English version in i18n/en/docusaurus-plugin-content-docs/
current/12-data-ingestion/05-new-connector.md. The English is NOT a direct
translation — adapt it naturally. Follow all doc-writing format rules.
```

**Check image paths after adding new images:**

```
I added new screenshots to docs/03-data-modeling/images/. Check that all
image references in docs/03-data-modeling/ resolve to existing files.
```

### Tips

- Claude remembers the doc-writing rules for this project. You do not need to repeat format instructions — just say "follow the doc-writing guidelines."
- Always specify whether you want Chinese, English, or both.
- When Claude drafts content, it will verify image files exist before referencing them. If an image is missing, it will warn you.
- The Chrome extension uses your existing browser login session, so Claude can access the IDMP app directly without needing credentials.

## Pre-Submission Checklist

- [ ] Files are correctly numbered and named (lowercase, hyphens)
- [ ] `index.md` has introduction content and `<DocCardList />`
- [ ] No `01-overview.md` files — overview content is in `index.md`
- [ ] Images are in the chapter's `images/` subdirectory
- [ ] All image file paths verified to exist
- [ ] All cross-references use correct relative paths
- [ ] Corresponding English file created in `i18n/en/`
- [ ] Chinese UI terminology verified against the running application
- [ ] `**Bold:**` followed by a space
- [ ] Chinese-English spacing correct (AutoCorrect compliant)
- [ ] MDX variables escaped in plain text and tables
- [ ] No angle-bracket URLs
- [ ] Local CI checks pass
