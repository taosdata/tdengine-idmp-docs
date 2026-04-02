---
name: doc-writing
description: "Write and review TDengine IDMP Markdown documentation following project CI standards (markdownlint, typos, AutoCorrect). Use when creating/editing docs or fixing format issues."
---

# doc-writing

Write and review high-quality Markdown documentation for TDengine IDMP project, ensuring compliance with CI checks.

## When to use

- Creating new Markdown documentation
- Editing existing documentation
- Reviewing documentation for format/quality issues
- Fixing CI check failures (markdownlint, typos, AutoCorrect)

## Input

Ask the user for:
- Task type: create/edit/review
- File path (for edit/review) or target directory (for create)
- Content requirements (for create)

## Core Format Rules (MUST follow)

### 1. Code Blocks
- Use ``` backticks (NOT ~~~)
- MUST specify language: ```java, ```python, ```bash, etc.
- Use fenced blocks, NOT indented blocks

### 2. Links
- Use `[text](url)` format
- NEVER use angle brackets: `<url>` ❌
- Links must not be empty

### 3. Bold Punctuation (Custom Rule)
- `**Bold:**` MUST have space after: `**Bold:** text` ✅
- `**Bold:**text` ❌ (will fail CI)

### 4. Headings
- Use ATX style (#), NOT underline style
- Space after #: `# Title` ✅, `#Title` ❌
- No indentation before #
- Only ONE level-1 heading per document

### 4.1 Section Numbering (MUST follow)

All headings (H1/H2/H3) must carry dot-separated section numbers matching the document's position in the chapter hierarchy.

**Format:**
- H1: `# 14.3 安装部署` / `# 14.3 Installation`
- H2: `## 14.3.1 前置条件` / `## 14.3.1 Prerequisites`
- H3: `### 14.3.1.1 使用 Docker 部署` / `### 14.3.1.1 Docker Deployment`

**Depth limit:** Maximum **4 dot-separated segments** (e.g. `14.3.1.1`). If a heading would exceed 4 segments, leave it **unnumbered**.

**Sidebar label rule:** Files with Docusaurus front matter must use `sidebar_label` with the **plain title (no number)** to prevent the `numberPrefixParser` from duplicating the number in the sidebar. The H1 on the page still carries the full section number.

```markdown
---
title: 使用 Docker 部署
sidebar_label: 使用 Docker 部署
---

import GatewayBasePathConfig from './common/_gateway-base-path.md'

# 14.3.1 使用 Docker 部署
```

**Skip numbering for:**
- `index.md` and `00-index.md` files
- `common/` include fragments
- Chapters 19 (glossary), 20 (roadmap), 21 (release-history)
- Files without a numbered H1 (the script only numbers H2/H3 when H1 already has a number)

### 5. Chinese-English Mixed Text
- Add space between Chinese and English: `使用 Java SDK` ✅
- Add space between Chinese and numbers: `版本 3.0` ✅
- Use full-width punctuation in Chinese: `这是句子。` ✅

## Disabled Rules (can ignore)

- MD001: Heading levels can skip
- MD013: No line length limit
- MD024: Duplicate headings allowed
- MD033: HTML tags allowed (for Docusaurus)
- MD029: Ordered list numbers can be arbitrary

## Directory Structure

- Chinese docs: `docs/`
- English docs: `i18n/en/docusaurus-plugin-content-docs/current/`
- Internal docs (CI excluded): `.claude/` - Documentation here is excluded from all CI checks

## Workflow

### Create New Document
1. Read similar existing docs to understand style
2. Create document following format rules
3. Ensure code examples are runnable
4. Output: file path + brief summary

### Edit Document
1. Use Read tool to load document
2. Use Edit tool for precise changes
3. Maintain consistent style
4. Output: file path + changes made

### Review Document
1. Check format: code blocks, links, bold punctuation
2. Check content: technical accuracy, completeness
3. List issues with priority
4. Output: review report

## Quality Check Tools

Project uses these tools in CI:

**Format & Style Checks** (`.github/workflows/check_docs.yaml`):
- markdownlint-cli / markdownlint-cli2 - Markdown format validation
- typos - Spell checking
- AutoCorrect - Chinese formatting

**CI Exclusions**:
- All checks skip `.claude/**` directory (configured in workflow and `.autocorrectrc`)
- Internal documentation can use any format without affecting CI

**Build Validation** (`.github/workflows/build_docs.yaml`):
- Docusaurus build test - Ensures docs can be built successfully
- Runs on: Node.js 24, pnpm 10, Python 3.10
- Validates: imports, links, component syntax, MDX expressions

Local check script: `.agent/skills/doc-writing/scripts/check-local.sh`

## MDX Variable Escaping Rules (CRITICAL for Build)

Docusaurus uses MDX which treats `{variable}` as JavaScript expressions. Undefined variables will cause build failures.

### When to Escape Variables

**MUST escape** (use `\{variable\}`):
- Variables in plain text: `SDK version is \{SDK_VERSION\}` ✅
- Variables in tables: `| Version | \{SDK_VERSION\} |` ✅
- Variables in headings: `## Version \{SDK_VERSION\}` ✅

**DO NOT escape** (keep `{variable}`):
- Variables in code blocks: ` ```bash ... {SDK_VERSION} ... ``` ` ✅
- Variables in inline code: `` `{SDK_VERSION}` `` ✅
- Variables in comments within code: `// Use {SDK_VERSION}` ✅

### Common Variable Patterns

```markdown
✅ Correct:
| SDK Version | \{SDK_VERSION\} |
| Release Date | \{RELEASE_DATE\} |
配套 IDMP 版本 \{IDMP_VERSION\} 及以上

```bash
idmp-sdk-{SDK_VERSION}/
  ├── idmp-v{SDK_VERSION}.json
```

❌ Wrong (will fail build):
| SDK Version | {SDK_VERSION} |        ← Missing escape
每页条数，最大 {MAX_PAGE_SIZE}          ← Missing escape

```bash
idmp-sdk-\{SDK_VERSION\}/              ← Should NOT escape in code blocks
```
```

### Build Error Examples

```
ReferenceError: SDK_VERSION is not defined
ReferenceError: MAX_PAGE_SIZE is not defined
ReferenceError: METHOD_NAME is not defined
```

If you see these errors, find the variable in plain text/tables and add `\` before `{`.

## Image File Validation (CRITICAL)

When adding or modifying image references in documentation, ALWAYS verify the image file exists.

### Image Reference Rules

**MUST check before adding**:
1. Verify image file exists at the referenced path
2. Check both Chinese (`docs/`) and English (`i18n/en/`) versions if applicable
3. Ensure image path is relative to the markdown file location

**Common image patterns**:
```markdown
![Alt text](./images/screenshot.png)
![Alt text](../images/diagram.png)
![Alt text](/static/img/logo.png)
```

**Validation steps**:
1. Extract image path from markdown: `![text](path)`
2. Resolve relative path based on markdown file location
3. Use Read tool to verify file exists
4. If missing, warn user: "Image file not found: {path}. Please add the image or remove the reference."

**Example check**:
```markdown
Document: docs/06-data-visualization/15-state-history.md
Reference: ![Example](./images/state-history-demo.png)
Check path: docs/06-data-visualization/images/state-history-demo.png
```

### When to skip image checks

- Image URLs (starting with `http://` or `https://`)
- Placeholder images marked with comments: `<!-- ![Placeholder](./image.png) -->`
- Images in code blocks or inline code

## Common Errors

```markdown
❌ **Param:**text          → ✅ **Param:** text
❌ <https://example.com>   → ✅ [link](https://example.com)
❌ ~~~python               → ✅ ```python
❌ 使用Java SDK            → ✅ 使用 Java SDK
```

## Chinese Technical Writing Style (MUST follow)

Chinese documentation must use professional, formal language. Avoid colloquial or conversational expressions. Apply the following rules consistently.

### 11.1 Prohibited Patterns and Replacements

| Category | ❌ Colloquial / Informal | ✅ Professional / Formal |
|----------|------------------------|------------------------|
| **Second-person pronouns** | 你、您、你的 | Omit or use the product/system as subject |
| **Manual** | 手工 | 手动 |
| **Indicate** | 意味着 | 表示、表明 |
| **Want / Hope** | 希望、想要 | 需要 |
| **So that** | 这样就可以 | 以便、从而 |
| **Filter** (informal) | 过滤 (when used as UI label) | 筛选 |
| **Accessible** | 可访问 (for actions) | 可执行、可使用 |
| **Just / Simply** | 只需要... 就可以了 | 仅需 |
| **Real-time understand** | 实时了解 | 实时掌握 |
| **Both** | 两者兼有 | 同时写入两者 |

### 11.2 Sentence-Level Rules

| Rule | ❌ Colloquial | ✅ Professional |
|------|-------------|----------------|
| **Avoid conversational tone** | 这很简单，只要点击按钮就行 | 点击按钮即可完成操作 |
| **Use formal conjunctions** | 然后就会看到... | 随后系统将显示... |
| **No casual examples** | 比如说某个东西 | 例如某个组件 |
| **Add grammatical subjects** | 会显示确认对话框 | 系统将弹出确认对话框 |
| **Use structured sentences** | 保持简洁且具有描述性—— | 建议使用简洁且具有描述性的命名 |
| **Active → formal** | 你可以在这里看到 | 该区域显示 |
| **Avoid filler** | 帮助你入门 | 供参考 |
| **Quantifier precision** | 只有满足...才会被考虑 | 仅满足...参与计算 |

### 11.3 Section Introduction Rule

Every `##` subsection that directly starts with a table, list, or steps (without a descriptive paragraph) **must** have a professional introductory sentence added after the heading. The introduction should:

- Summarize the purpose or functionality of that section in 1-2 sentences
- Use professional, descriptive language
- Provide context for the content that follows

Example:
```markdown
❌ Missing introduction:
## Event Fields

| Field | Description |
|---|---|

✅ With introduction:
## Event Fields

Once event generation is enabled, the following fields must be configured to define
the event's structure, severity, and delivery policy.

| Field | Description |
|---|---|
```

### 11.4 Bilingual Consistency

When editing Chinese documentation, always check and update the corresponding English documentation in `i18n/en/docusaurus-plugin-content-docs/current/` to maintain consistency. Key alignment points:

- Terminology must match (e.g., 定时窗口 ↔ Scheduled Window, 流计算 ↔ stream computation)
- Section structure must match
- Added introductory paragraphs must be present in both languages
- Brand names must be consistent (e.g., AVEVA, not OSIsoft)

## Output Format

After completing task, briefly state:
- File path
- Main content or changes
- Items needing human review (if any)

## Safety

- Do NOT modify files outside docs directories without confirmation
- Do NOT commit changes automatically
- Do NOT add sensitive information (credentials, tokens) to docs
- Warn user if detecting potential security issues in examples

## References

See `CHEATSHEET.md` for quick reference of common scenarios.

---

## Detailed Rules Reference

### 标题规范（markdownlint）

### 1.1 使用 ATX 样式（# 号）
项目要求使用 `#` 号标题，不能使用下划线样式。

```markdown
✅ 正确：
### 三级标题

❌ 错误（会报错）：
三级标题
--------
```

### 1.2 标题前后空格
```markdown
✅ 正确：
# 文档标题
## 二级标题

❌ 错误（MD018/MD019）：
#文档标题      ← # 后缺少空格
##  二级标题    ← # 后多个空格
```

### 1.3 标题不能缩进
```markdown
✅ 正确：
## 二级标题

❌ 错误（MD023）：
  ## 二级标题    ← 前面有空格
```

### 1.4 只能有一个一级标题
```markdown
✅ 正确：
# 文档标题

## 第一节

## 第二节

❌ 错误（MD025）：
# 文档标题

# 另一个一级标题   ← 只能有一个 #
```

### 1.5 标题序号规范（Section Numbering）

所有正文文档的 H1/H2/H3 标题必须添加章节序号，序号格式为点分隔整数，与文档在章节层次中的位置对应。

**规则：**
- 最多 4 个点分隔段（例如 `14.3.1.1`），超过 4 段的标题不编号
- `index.md`、`common/` 片段、第 19/20/21 章（词汇表/路线图/发版历史）跳过编号
- 文件有 front matter 时，`sidebar_label` 使用不含序号的纯标题，H1 保留序号

**序号推导示例：**

| 文件路径 | H1 序号 | H2 格式 | H3 格式 |
|---------|---------|---------|---------|
| `docs/14-administration/03-installation/01-docker-guide.md` | `14.3.1` | `14.3.1.1`、`14.3.1.2` | `14.3.1.1.1`（超 4 段→不编号） |
| `docs/03-data-modeling/02-attributes.md` | `3.2` | `3.2.1`、`3.2.2` | `3.2.2.1`、`3.2.2.2` |
| `docs/14-administration/03-installation/06-config-reference.md` | `14.3.5`（3 段） | `14.3.5.1`（4 段，可编号） | 超 4 段→不编号 |

```markdown
✅ 正确（docs/14-administration/03-installation/02-install-guide.md）：
---
title: 使用安装包部署
sidebar_label: 使用安装包部署
---

# 14.3.2 使用安装包部署

## 14.3.2.1 先决条件

### 不编号（H3 会达到第 5 段，超限）

❌ 错误：
# 使用安装包部署        ← H1 缺少序号
## 先决条件             ← H2 缺少序号
```

**自动检查脚本（可在会话文件中找到）：**

```python
# 核心检测逻辑
# H2 需要编号条件：H1 段数 ≤ 3
# H3 需要编号条件：H1 段数 ≤ 2
segs = len(h1_num.split('.'))
if segs <= 3 and h2 not numbered: → 问题
if segs <= 2 and h3 not numbered: → 问题
```

---

## 二、代码块规范（markdownlint）

### 2.1 使用围栏代码块（反引号）
```markdown
✅ 正确：
```java
System.out.println("Hello");
```

❌ 错误（MD046）：
    System.out.println("Hello");  ← 使用缩进代码块
```

### 2.2 使用反引号而非波浪号
```markdown
✅ 正确（MD048）：
```bash
echo "Hello"
```

❌ 错误：
~~~bash
echo "Hello"
~~~
```

### 2.3 建议指定语言
虽然没有强制要求，但建议指定语言以获得语法高亮：

```markdown
✅ 推荐：
```java
```python
```bash
```json
```yaml
```sql
```
```

---

## 三、链接规范（markdownlint）

### 3.1 链接不能为空
```markdown
✅ 正确：
[链接文本](https://example.com)
[锚点链接](#section-id)

❌ 错误（MD042）：
[链接文本]()  ← 地址为空
```

### 3.2 不要使用尖括号包裹 URL（自定义规则）
项目自定义规则禁止尖括号包裹 URL：

```markdown
✅ 正确：
访问 https://example.com 获取更多信息
[点击这里](https://example.com)

❌ 错误（no-angle-bracket-url）：
访问 <https://example.com> 获取更多信息
```

### 3.3 避免使用 javascript: 链接
```markdown
❌ 错误：
[点击](javascript:void(0))
```

---

## 四、中文排版规范（AutoCorrect）

### 4.1 中英文之间加空格
这是 AutoCorrect 的核心规则，会被检查：

```markdown
✅ 正确：
使用 Java SDK 进行开发
TDengine 是一个时序数据库
支持 REST API 和 WebSocket

❌ 错误（会被 AutoCorrect 标记）：
使用Java SDK进行开发
TDengine是一个时序数据库
支持REST API和WebSocket
```

### 4.2 中文与数字之间加空格
```markdown
✅ 正确：
版本 3.0 已发布
有 100 个连接

❌ 错误：
版本3.0已发布
有100个连接
```

### 4.3 全角标点符号
```markdown
✅ 正确：
这是一个中文句子。
请在"设置"中配置参数。
选择"文件"→"新建"。

❌ 错误：
这是一个中文句子.
请在"设置"中配置参数.
```

### 4.4 强调符号后加空格（自定义规则）
项目自定义规则要求 `**` 后加空格：

```markdown
✅ 正确（space-after-punctuation-in-emphasis）：
**重要**：这是提示内容。
**注意** - 请先备份数据。

❌ 错误：
**重要**:这是提示内容。
**注意**-请先备份数据。
```

---

## 五、列表规范

### 5.1 有序列表（项目已禁用 MD029 限制）
```markdown
✅ 都可以：
1. 第一项
2. 第二项
3. 第三项

或：
1. 第一项
1. 第二项
1. 第三项
```

### 5.2 无序列表（项目已禁用 MD060 统一风格）
```markdown
✅ 都可以（但建议统一）：
- 项目 1
- 项目 2

或：
* 项目 1
* 项目 2
```

---

## 六、Docusaurus 组件使用

### 6.1 Tabs 组件（注意空行）
```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
// Java 代码
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Python 代码
```

</TabItem>
</Tabs>
```

**注意**：组件标签前后需要空行，否则可能导致解析错误。

### 6.2 提示框
```markdown
:::tip
提示信息
:::

:::note
说明信息
:::

:::warning
警告信息
:::

:::danger
危险警告
:::
```

### 6.3 文档卡片列表
```markdown
import DocCardList from '@theme/DocCardList';

<DocCardList />
```

---

## 七、命名规范

### 7.1 文件名规范
```
✅ 正确：
01-overview.md
get-started-docker.md
api-reference.md

❌ 错误：
01 overview.md          ← 包含空格
GetStartedDocker.md     ← 驼峰命名
get_started.md          ← 下划线分隔
GET-STARTED.MD          ← 大写扩展名
```

### 7.2 目录命名
```
✅ 正确：
01-intro/
02-get-started/
api-reference/

❌ 错误：
01_intro/
Get Started/
```

---

## 八、处理自定义术语（typos）

如果某些专业术语被 typos 误报为拼写错误，添加到 `.github/workflows/typos.toml`：

```toml
[default.extend-identifiers]
TDengine = "TDengine"
IDMP = "IDMP"

[default.extend-words]
API = "API"
SDK = "SDK"
```

---

## 九、已禁用的规则（无需担心）

以下规则已在配置中禁用，你可以放心使用：

| 规则 | 说明 | 禁用原因 |
|------|------|---------|
| MD001 | 标题必须逐级递增 | 允许跳级 |
| MD013 | 行长度限制 | 不限制行长度 |
| MD024 | 禁止重复标题 | 不同章节可用相同标题 |
| MD029 | 有序列表序号必须递增 | 允许任意序号 |
| MD033 | 禁止行内 HTML | Docusaurus 需要 HTML 组件 |
| MD041 | 第一行必须是标题 | 允许导入语句在前 |
| MD052 | 引用链接必须存在 | 允许使用引用链接 |

---

## 十、提交前自查清单

在提交 PR 前，确认以下事项：

- [ ] 标题使用 `#` 号，后面有空格
- [ ] **H1/H2/H3 标题已添加章节序号**（最多 4 段，超限不编号）
- [ ] **有 front matter 的文件：`sidebar_label` 不含序号，H1 保留序号**
- [ ] 代码块使用反引号，并指定了语言
- [ ] 中英文之间有空格
- [ ] 中文使用全角标点
- [ ] 链接地址不为空
- [ ] 没有使用尖括号包裹 URL
- [ ] 文件名使用小写和连字符
- [ ] **强调符号后有空格**（重要！自定义规则）
- [ ] **MDX 变量已正确转义**（表格和普通文本中的 `{变量}` 改为 `\{变量\}`）
- [ ] **代码块中的变量未转义**（保持 `{变量}` 原样）
- [ ] **图片文件已验证存在**（所有 `![](path)` 引用的图片文件都已检查）

---

## 参考文件

| 文件 | 用途 |
|------|------|
| `.github/workflows/check_docs.yaml` | CI 格式检查工作流 |
| `.github/workflows/build_docs.yaml` | CI 构建验证工作流 |
| `.github/workflows/markdown_config.json` | 基础 markdownlint 配置 |
| `.github/workflows/.markdownlint-cli2.jsonc` | 高级 markdownlint 配置 |
| `.github/workflows/typos.toml` | 拼写检查白名单 |
