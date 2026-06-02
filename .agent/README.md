# AI Agent 配置目录

这个目录为各种 AI Agent 提供统一的配置和 skill 访问入口。

## 目录结构

```
.agent/
├── README.md           # 本文件
└── skills/             # AI Skills 目录（主目录）
    └── doc-writing/    # 文档编写 skill（实际文件）
        ├── SKILL.md
        ├── CHEATSHEET.md
        ├── README.md
        └── scripts/
            └── check-local.sh
```

## Skills 说明

### doc-writing

文档编写规范和质量检查 skill，适用于 TDengine IDMP 项目的 Markdown 文档编写。

**主要文件：**
- `SKILL.md` - 完整的文档编写规范
- `CHEATSHEET.md` - 快速参考速查表
- `scripts/check-local.sh` - 本地质量检查脚本

**使用方式：**
- Claude Code: `/doc-writing`
- 其他 AI: 读取 `.agent/skills/doc-writing/SKILL.md` 作为上下文

## 兼容性

此目录结构兼容多种 AI Agent：
- Claude Code (通过 `.claude/skills/`)
- GPT-4/GPT-5 (通过 `.agent/skills/`)
- Cursor AI (通过 `.agent/skills/`)
- 其他支持自定义配置目录的 AI Agent

## 维护说明

- 主要内容维护在 `.agent/skills/` 目录（实际文件存储位置）
- `.claude/skills/` 通过软链接引用，无需重复维护
- 添加新 skill 时，在 `.agent/skills/` 创建后，在 `.claude/skills/` 创建软链接
