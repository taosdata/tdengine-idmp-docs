# AI 协作指南

本项目支持多种 AI Agent 协同工作。

## 配置目录

- 仓库根目录 `.skills/` - 项目技能的唯一维护位置
- 仓库根目录 `.agents/skills`、`.claude/skills` - 指向 `.skills/` 的技能入口

## 可用 Skills

### 用户手册编写 (idmp-doc-writing)

**位置：** 仓库根目录 `.skills/idmp-doc-writing/`（从本文档目录访问为 `../.skills/idmp-doc-writing/`）

**用途：** 编写符合项目规范的 Markdown 文档

**使用方式：**

- 使用 `/idmp-doc-writing` 命令

**主要规范：**

- 代码块使用 ``` 反引号，必须指定语言
- 链接使用 `[文本](url)` 格式，禁止尖括号
- 粗体标点后必须有空格：`**参数:** 说明`
- 中英文之间加空格

**本地检查：**

```bash
rtk proxy bash ../.skills/idmp-doc-writing/scripts/check-local.sh
```

## 文档质量检查

项目使用以下工具自动检查文档质量：

**格式检查** (`.github/workflows/check_docs.yaml`):

1. **markdownlint** - Markdown 格式规范
2. **typos** - 拼写检查
3. **AutoCorrect** - 中文排版规范

**构建验证** (`.github/workflows/build_docs.yaml`):

- Docusaurus 构建测试 - 确保文档可以成功构建
- 验证导入、链接、组件语法

## 给 AI 的提示

如果你是 AI Agent，在编写或修改文档时：

1. 先读取 `../.skills/idmp-doc-writing/SKILL.md` 了解用户手册工作流
2. 参考 `../.skills/idmp-doc-writing/CHEATSHEET.md` 快速查阅常见场景
3. 遵循项目的文档编写规范
4. 完成后简要说明修改内容

## 目录结构

```text
IDMP 仓库根目录/
├── .skills/
│   ├── idmp-doc-writing/   # 用户手册 skill（实际文件）
│   └── doc/                # RS、FS 和技术方案 skill（idmp-doc-fs）
├── .agents/skills         # 软链接到 ../.skills
├── .claude/skills         # 软链接到 ../.skills
└── tdengine-idmp-docs/
    └── .github/workflows/
        ├── check_docs.yaml
        └── build_docs.yaml
```
