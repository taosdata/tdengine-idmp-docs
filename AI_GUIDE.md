# AI 协作指南

本项目支持多种 AI Agent 协同工作。

## 配置目录

- `.agent/` - 通用 AI Agent 配置（兼容 GPT、Cursor 等）

## 可用 Skills

### 文档编写 (doc-writing)

**位置：** `.agent/skills/doc-writing/`

**用途：** 编写符合项目规范的 Markdown 文档

**使用方式：**

- 使用 `/doc-writing` 命令

**主要规范：**

- 代码块使用 ``` 反引号，必须指定语言
- 链接使用 `[文本](url)` 格式，禁止尖括号
- 粗体标点后必须有空格：`**参数:** 说明`
- 中英文之间加空格

**本地检查：**

```bash
bash .agent/skills/doc-writing/scripts/check-local.sh
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

1. 先读取 `.agent/skills/doc-writing/SKILL.md` 了解完整规范
2. 参考 `.agent/skills/doc-writing/CHEATSHEET.md` 快速查阅常见场景
3. 遵循项目的文档编写规范
4. 完成后简要说明修改内容

## 目录结构

```text
.
├── .agent/                 # 通用 AI 配置（主目录）
│   ├── README.md
│   └── skills/
│       └── doc-writing/    # 文档编写 skill（实际文件）
├── .claude/                # Claude Code 配置
│   └── skills/             # 软链接到 .agent/skills
└── .github/
    └── workflows/
        ├── check_docs.yaml # CI 检查流程
        ├── build_docs.yaml # CI 构建流程
        └── ...
```
