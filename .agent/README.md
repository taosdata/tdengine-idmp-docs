# AI Agent 配置目录

用户手册技能已统一到 IDMP 仓库根目录的
[`.skills/idmp-doc-writing/`](../../.skills/idmp-doc-writing/SKILL.md)。
此目录不再维护技能副本。

仓库根目录的 `.agents/skills` 和 `.claude/skills` 均指向 `.skills/`，共用同一份内容。

从 `tdengine-idmp-docs/` 运行本地检查：

```bash
rtk proxy bash ../.skills/idmp-doc-writing/scripts/check-local.sh
```
