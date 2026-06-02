# AGENTS.md — TDengine IDMP Documentation

## Product Overview

TDengine IDMP (Industrial Data Management Platform) is an AI-native industrial data management platform. It works alongside TDengine TSDB (a high-performance time-series database) to provide asset modeling, data contextualization, real-time analytics, visualization, event management, and AI-powered insights for industrial operations.

## Repository Purpose

This is the **documentation site** for TDengine IDMP, built with [Docusaurus](https://docusaurus.io/). It serves user guides, administration guides, and API references at `https://idmpdocs.taosdata.com`.

---

## Repository Structure

```text
docs/                                              # Chinese documentation (default locale, zh-Hans)
i18n/en/docusaurus-plugin-content-docs/current/   # English documentation
static/                                            # Static assets served at site root
static/docs-img/                                   # Shared images, referenced as /docs-img/...
src/                                               # Docusaurus site source (pages, components)
.github/workflows/                                 # CI: check_docs.yaml, build_docs.yaml
.agent/skills/doc-writing/                         # Doc-writing skill (SKILL.md, CHEATSHEET.md)
docs-guide.md                                      # Full documentation writing guide
justfile                                           # Task runner recipes
mise.toml                                          # Node 24, pnpm 10, just (version pins)
docusaurus.config.js                               # Site config (url: https://idmpdocs.taosdata.com, routeBasePath: /)
```

Both `docs/` and `i18n/en/` mirror each other exactly — same filenames, same directory structure, same numbering. When you add or rename a file in `docs/`, do the same in `i18n/en/`.

---

## Commands

Install dependencies first if `node_modules/` is missing:

```bash
just install        # pnpm install
```

| Task | Command |
|---|---|
| Preview (Chinese) | `just start` |
| Preview (English) | `just start-en` |
| Production build | `just build` |
| Preview build output | `just serve` |
| Clear cache/build | `just clear` |

**Do NOT auto-commit or auto-push.** Always wait for the user to explicitly request a commit or push.

---

## Documentation Conventions

Read `.agent/skills/doc-writing/SKILL.md` for the full rules. The critical points are:

### File Naming

- Lowercase, hyphens only: `03-data-modeling/`, `01-elements.md`
- Number prefix determines sidebar order: `01-`, `02-`, `03-`, ...
- Multi-section chapters: directory with `index.md` + numbered sub-files (`01-`, `02-`, ...)
- Single-section chapters: flat `.md` file at the chapter level
- Never create `01-overview.md` — overview content belongs in `index.md`

### Section Numbering in Headings

All headings must carry dot-separated section numbers matching the document's position:

```markdown
# 3.2 Attributes           ← H1
## 3.2.1 Static Values     ← H2
### 3.2.1.1 Syntax         ← H3
```

Maximum 4 dot-separated segments. Use `sidebar_label` (without number) in front matter to avoid duplication in sidebar.

### Bilingual Consistency

- Chinese (`docs/`) and English (`i18n/en/`) versions are **not** direct translations — adapt naturally for each language.
- UI terminology must match the actual UI text in each locale.
- Both versions must have identical file paths and names.

### Format Rules (CI-enforced)

| Rule | Correct | Wrong |
|---|---|---|
| Code blocks | `` ```bash `` with language | `` ``` `` without language, or `~~~` |
| Links | `[text](url)` | `<url>` angle brackets |
| Bold + colon | `**Param:** description` | `**Param:**description` |
| Heading style | `## Title` (ATX) | Underline-style |
| One H1 per file | ✅ | Multiple H1s ❌ |

### Chinese Typography (AutoCorrect)

```markdown
✅ 使用 Java SDK 进行开发
✅ 版本 3.0 已发布
❌ 使用Java SDK进行开发
```

Use full-width punctuation (`。`, `，`, `：`) in Chinese prose.

### MDX Variable Escaping

Escape `{...}` in plain text and tables (not inside code blocks):

```markdown
✅ 版本 \{SDK_VERSION\} 及以上
✅ | 版本 | \{SDK_VERSION\} |
```

### Images

- Chapter-local images: `docs/[chapter]/images/` — reference with relative paths (`./images/foo.png`)
- Shared images: `static/docs-img/` — reference with absolute paths (`/docs-img/foo.png`)
- Always verify the image file exists before referencing it

---

## CI Checks

The CI pipeline (`.github/workflows/check_docs.yaml`) runs on every PR:

1. **markdownlint** — Markdown format validation
2. **typos** — spell checking
3. **AutoCorrect** — Chinese typography
4. **Docusaurus build** — validates MDX syntax, imports, and links

To run checks locally (requires the tools to be installed):

```bash
markdownlint -c .github/workflows/markdown_config.json --ignore .agent ./
autocorrect --lint ./**/*.md
```

All checks must pass before a PR can be merged.

---

## Adding New Content

### New page in an existing chapter

1. Create the file in `docs/[chapter]/XX-name.md` (next number in sequence).
2. Create the matching file in `i18n/en/docusaurus-plugin-content-docs/current/[chapter]/XX-name.md`.
3. Add a link to it in the chapter's `index.md` under "What's Covered".

### New chapter

1. Create `docs/NN-chapter-name/index.md` with introduction content and `<DocCardList />`.
2. Add sub-files starting at `01-`.
3. Mirror the full structure in `i18n/en/`.
4. Place images in `docs/NN-chapter-name/images/`.

---

## Key References

- Full writing guide: [`docs-guide.md`](./docs-guide.md)
- Doc-writing skill: [`.agent/skills/doc-writing/SKILL.md`](./.agent/skills/doc-writing/SKILL.md)
- Quick-reference cheatsheet: [`.agent/skills/doc-writing/CHEATSHEET.md`](./.agent/skills/doc-writing/CHEATSHEET.md)
- Site config: [`docusaurus.config.js`](./docusaurus.config.js)
