---
title: IDMP CLI
sidebar_label: IDMP CLI
---

# 15.4 IDMP CLI

`idmp-cli` 是 TDengine IDMP 的官方命令行工具，适用于本地终端操作、脚本自动化和 Agent 驱动任务。它把配置管理、认证、OpenAPI 命令发现和安全执行约束放到同一入口中，适合在不打开 Web UI 的情况下完成查询、排障和受控写操作。

如果目标是让 LLM 直接连接 IDMP 并通过远程 MCP 读取上下文，请参见 [15.2 MCP 接口](./02-mcp-interface.md)。如果目标是让本地终端、CI 或 Agent 稳定执行可审计的 IDMP 命令，则优先使用 `idmp-cli`。

:::tip 首次上手最短路径

1. 安装 `idmp-cli`。
2. 使用 `idmp-cli config init` 保存服务地址并完成首次登录。
3. 运行 `idmp-cli auth check --remote` 验证当前凭证已被服务端接受。
4. 先用 `idmp-cli schema search <关键词>` 查命令路径，再执行读取命令；写操作先执行 `--dry-run`。

:::

## 15.4.1 适用场景

`idmp-cli` 适合以下场景：

- 在终端中执行 IDMP 的日常查询与排障，例如查看元素、分析任务、面板和认证状态。
- 在脚本、CI 或批处理任务中稳定调用 IDMP API，并保留明确的风险确认机制。
- 为 Claude Code 或其他 Agent 提供可发现、可复用、可审计的命令执行入口。
- 在不知道准确命令路径时，通过 schema 搜索和预览快速定位目标接口。

## 15.4.2 使用前准备

开始前建议先准备以下信息和环境：

| 项目 | 说明 |
|---|---|
| IDMP 服务地址 | 使用当前环境真实可访问的地址。本文示例统一使用 `https://<IDMP_HOST>:6034`；如需排查证书或网络问题，可临时切换为 `http://<IDMP_HOST>:6042`。 |
| 登录凭证 | 可使用用户名 + 密码，或使用已签发的 API Key。 |
| 本地依赖 | 在线安装与离线安装 CLI 的最低要求是 `Node.js 16+` 和 `npm`；建议优先使用当前仍受支持的 Node.js LTS 版本。 |
| 支持平台 | CLI 支持 macOS、Linux、Windows，架构支持 `x64` 和 `arm64`。 |
| 可选 Agent 环境 | 如果计划配合 Claude Code 或其他 Agent 使用，还需要后续安装 plugin 或 skills。 |

:::warning HTTP 仅用于临时排障
如果必须临时切换到 `http://<IDMP_HOST>:6042` 排查连通性，请只在可信隔离网络中短时使用，并避免在 HTTP 下执行登录或传递真实密码、API Key、bearer token 等敏感凭证。
:::

在交互终端中，`config init` 和 `auth login` 可以提示输入缺失的敏感信息。为了便于复制和自动化复用，本文优先使用 `stdin` 传递密码或 API Key。

以下示例中的 `<IDMP_HOST>`、`admin@example.com`、`$IDMP_PASSWORD` 和 `$IDMP_API_KEY` 都是占位值。执行前需要先替换为真实值，或先设置环境变量。

**Linux / macOS**

```bash
export IDMP_PASSWORD='<password>'
export IDMP_API_KEY='api_<key_id>.<secret>'
```

**Windows PowerShell**

```powershell
$env:IDMP_PASSWORD = '<password>'
$env:IDMP_API_KEY = 'api_<key_id>.<secret>'
```

## 15.4.3 安装 IDMP CLI

安装阶段先完成 CLI 本体安装。Claude Code plugin 和其他 Agent skills 属于附加能力，建议在 CLI 可正常执行之后再安装。

### 15.4.3.1 在线安装

通过 npm 全局安装：

```bash
npm install -g @tdengine/idmp-cli
```

安装完成后，先确认命令已经可用：

```bash
idmp-cli --help
idmp-cli --version
```

上述步骤只安装 CLI，不会同时安装 Claude Code plugin 或其他 Agent skills。

### 15.4.3.2 离线安装

如果当前环境无法直接访问 npm，可使用 release 离线包。在解压后的离线包根目录执行以下命令：

**Linux / macOS**

```bash
bash installers/install-cli-offline.sh
```

**Windows**

```cmd
installers\install-cli-offline.cmd
```

`install-cli-offline.*` 会同时安装 CLI launcher 和当前平台对应的二进制 npm 包，并在执行前校验 `Node.js` / `npm` 可用性以及安装包版本是否匹配。

## 15.4.4 与 Agent 配合使用

`idmp-cli` 可以单独使用，也可以作为 Agent 的命令执行后端。推荐顺序是先安装 CLI，再按实际运行环境安装 plugin 或 skills。

### 15.4.4.1 Claude Code

如果本地使用的是 Claude Code，建议安装 TDengine 提供的 `idmp-plugin`。该 plugin 已内置匹配的 skills，不需要再向 Claude Code 重复安装同一套 skills。

**在线安装**

```bash
claude plugin marketplace add taosdata/agent-skills
claude plugin install idmp-plugin@taosdata
```

**离线安装**

在解压后的离线包根目录执行：

**Linux / macOS**

```bash
bash installers/install-plugin-offline.sh
```

**Windows**

```cmd
installers\install-plugin-offline.cmd
```

plugin 默认安装到 `~/.claude/plugins/idmp-plugin`。如需显式加载该目录，可使用：

**Linux / macOS**

```bash
claude --plugin-dir "$HOME/.claude/plugins/idmp-plugin"
```

**Windows PowerShell**

```powershell
claude --plugin-dir "$env:USERPROFILE\.claude\plugins\idmp-plugin"
```

### 15.4.4.2 其他 Agent

如果使用的不是 Claude Code，而是支持 skills 目录或等价机制的 Agent，建议单独安装 `taosdata/agent-skills`。需要注意：`install-skills-offline.*` 的默认目标目录仍然是 Claude 的 skills 目录，也就是 `~/.claude/skills`；在 Windows 上对应 `%USERPROFILE%\.claude\skills`。因此，给其他 Agent 离线安装时，不要直接使用默认参数。

**在线安装**

如需先确认仓库中有哪些 skill，可先预览：

```bash
npx --yes skills add taosdata/agent-skills -g -y --list
```

确认后再执行安装：

```bash
npx --yes skills add taosdata/agent-skills -g -y
```

**离线安装**

在解压后的离线包根目录执行。下面的示例显式指定了目标 Agent 的 skills 目录，避免脚本继续写入 Claude 默认目录：

**Linux / macOS**

```bash
bash installers/install-skills-offline.sh --target-dir /path/to/other-agent/skills
```

**Windows**

```cmd
installers\install-skills-offline.cmd --target-dir C:\path\to\other-agent\skills
```

如果省略 `--target-dir`，脚本会把 skills 复制到 Claude 默认目录，而不会自动识别“当前要给哪个其他 Agent 安装”。这个离线脚本本质上只是复制 skill 目录；目标 Agent 是否能发现这些 skills，仍取决于它自己的目录约定或导入机制。

对于没有独立 skills 目录的 Agent，可把离线包中的 `assets/skills/*` 复制到目标 Agent 的技能目录，或把各 skill 目录中的 Markdown 内容导入该 Agent 的可复用 prompt / instruction 系统中。无论使用哪种方式，都应先确保 `idmp-cli` 已安装并且在 `PATH` 中可用。

### 15.4.4.3 推荐的 Agent 执行顺序

建议将以下顺序写入 Agent 的执行规范中：

1. 先由 skill 判断任务属于元素、分析、面板、数据导入导出还是权限等场景。
2. 再使用 `idmp-cli schema search <关键词>` 查找真实命令路径。
3. 对不熟悉的命令，先执行 `idmp-cli schema <service.resource.method>`。
4. 能使用快捷命令时优先使用快捷命令；需要精确控制时再使用结构化命令；原始 API 作为最后兜底方式。
5. 对写操作先执行 `--dry-run`，确认后再执行 `--ack-risk`。
6. 写入完成后，再次读取目标对象或执行 `auth check --remote` / `doctor` 进行确认。

## 15.4.5 初始化 profile 并登录

`profile` 可以理解为“一套保存好的环境配置”。第一次使用时，通常先创建 `default` profile 即可。`config init` 会在创建或更新 profile 的同时完成登录，并把会话保存到本地。

### 15.4.5.1 使用用户名和密码登录

**Linux / macOS**

```bash
printf '%s\n' "$IDMP_PASSWORD" | idmp-cli config init \
  --profile default \
  --server https://<IDMP_HOST>:6034 \
  --username admin@example.com \
  --password-stdin
```

**Windows PowerShell**

```powershell
$env:IDMP_PASSWORD | idmp-cli config init `
  --profile default `
  --server https://<IDMP_HOST>:6034 `
  --username admin@example.com `
  --password-stdin
```

该命令完成以下操作：

1. 保存 `default` profile。
2. 记录目标服务地址。
3. 使用当前账号登录。
4. 持久化当前会话，供后续命令直接复用。

### 15.4.5.2 使用 API Key 登录

如果当前环境已经签发 API Key，可直接改用以下方式：

**Linux / macOS**

```bash
printf '%s\n' "$IDMP_API_KEY" | idmp-cli config init \
  --profile default \
  --server https://<IDMP_HOST>:6034 \
  --api-key-stdin
```

**Windows PowerShell**

```powershell
$env:IDMP_API_KEY | idmp-cli config init `
  --profile default `
  --server https://<IDMP_HOST>:6034 `
  --api-key-stdin
```

在这种模式下，CLI 会把当前会话识别为 `api_key` 认证方式。对于长期运行的脚本和 Agent，这种方式通常比手动维护登录态更稳定。

### 15.4.5.3 验证当前状态

首次登录完成后，建议立即执行以下检查：

```bash
idmp-cli profile list
idmp-cli auth check --remote
idmp-cli doctor --offline
```

以上三个命令分别用于确认已保存的环境、验证当前凭证是否被服务端接受，以及检查本地配置、会话存储和生成元数据是否完整。

上述示例统一使用 IDMP 默认外部 HTTPS 端口 `6034`。如需临时排查证书或网络问题，可仅将协议和端口切换为 `http://<IDMP_HOST>:6042`，但应只在可信隔离网络中做短时连通性排障，且避免在 HTTP 下登录或提交真实密码、API Key、bearer token 等敏感凭证。问题排除后再切回 HTTPS。

如果当前环境使用的是自签证书，`idmp-cli` 默认不会跳过证书校验。只有当该证书或其签发 CA 已导入当前机器的系统信任链时，CLI 才能正常通过 `https://<IDMP_HOST>:6034` 访问 IDMP。若尚未导入信任链，可先切换到 `http://<IDMP_HOST>:6042` 做临时排障，但同样应避免在 HTTP 下传递敏感凭证。当前 CLI 不提供类似 `--insecure` 的忽略证书校验参数。

## 15.4.6 理解命令模型

`idmp-cli` 的常用命令可以分为 4 类。先理解这 4 类命令，再开始日常使用，定位问题会更高效。

| 类型 | 结构 | 适用场景 | 示例 |
|---|---|---|---|
| 内置命令 | `idmp-cli auth ...` | 配置、登录、环境切换、排障 | `idmp-cli auth check --remote` |
| 快捷命令 | `idmp-cli element +list` | 高频读取场景，减少参数记忆成本 | `idmp-cli panel +search 电表 --size 10` |
| 结构化命令 | `idmp-cli <service> <resource> <method>` | 需要精确控制 OpenAPI 命令路径和参数 | `idmp-cli element elements list --params '{"current":1,"size":20}'` |
| 原始 API 命令 | `idmp-cli api GET /api/v1/...` | 已明确原始路径，或目标接口不暴露为顶层命令 | `idmp-cli api GET /api/v1/elements --params '{"current":1,"size":20}'` |

如果对具体命令路径没有把握，优先使用 `schema search`。这一步比直接猜命令更可靠，也更适合交给 Agent 自动执行。

### 15.4.6.1 什么是 `+list` 这种写法

`+list`、`+search`、`+get` 这类命令可以理解为“挂在某个 service 命令组下面的快捷子命令”。这里的 `+` 是命令名本身的一部分，不是 shell 语法，也不是 IDMP API 的原始路径。CLI 会把这些快捷命令注册到对应 service 下，例如 `element +list`、`analysis +list <element-id>`、`panel +search <关键词>`。

快捷命令最终仍会映射到一个真实的 schema 路径执行。例如：

| 快捷命令 | 实际映射 |
|---|---|
| `idmp-cli element +list` | `element.elements.list` |
| `idmp-cli element +search <关键词>` | `element.elements.search` |
| `idmp-cli analysis +list <element-id>` | `analysis.analyses.list` |

因此，同样叫 `+list`，不同 service 下的具体含义并不完全一样。`element +list` 表示“列元素”，`analysis +list <element-id>` 表示“列某个元素下的分析任务”。它们共享的是“高频读取快捷入口”这个设计思路，而不是一套完全统一的参数模板。

如果不确定某个 shortcut 最终会调用什么命令，最稳妥的方式是先执行 `--dry-run`：

```bash
idmp-cli element +list --parent-id 100 --dry-run
idmp-cli analysis +list <ELEMENT_ID> --dry-run
```

输出里会看到 `shortcut`、`method`、`path`、`params`、`risk` 等字段，可直接确认它最终映射到哪个结构化命令。快捷命令在执行层面仍然会经过统一的参数校验、风险控制、自动分页和输出格式处理。

## 15.4.7 日常使用推荐流程

建议把“查路径 → 看 schema → 执行读取 → 预览写入”作为默认流程。

### 15.4.7.1 先查命令路径

```bash
idmp-cli schema search elements
idmp-cli schema element.elements.list
idmp-cli element elements list --help
```

`schema search` 用于按关键词搜索候选路径，`schema <service.resource.method>` 用于查看参数、风险等级、分页支持和示例命令。对不熟悉的命令，建议先查看 schema，再执行真实调用。

### 15.4.7.2 高频读取优先使用快捷命令

```bash
idmp-cli element +search <关键词> --size 20 --format table
idmp-cli element +list --size 20 --format table
idmp-cli analysis +list <ELEMENT_ID> --format pretty
idmp-cli panel +search 电表 --size 10 --format table
```

快捷命令适合“按关键词搜索元素”“列出元素”“查看某个元素的分析任务”这类高频读取场景。其本质仍然调用生成式命令，但参数形式更接近运维人员的日常操作方式。对于需要 `ELEMENT_ID` 的命令，可先通过 `element +search` 或 `element +list` 获取目标 ID。

### 15.4.7.3 需要精确控制时使用结构化命令

```bash
idmp-cli element elements list --params '{"current":1,"size":20}' --format table
idmp-cli analysis analyses list --params '{"elementId":"<ELEMENT_ID>","current":1,"size":20}' --format pretty
```

结构化命令直接对应 OpenAPI 服务域、资源和方法，适合需要明确 `service / resource / method` 关系，或者需要使用 schema 输出作为执行依据的场景。

### 15.4.7.4 原始路径调用作为兜底方式

```bash
idmp-cli api GET /api/v1/elements --params '{"current":1,"size":20}'
```

当已经明确原始 API 路径，或者目标接口只以代理路径存在时，可使用 `api` 命令直接调用。对于这类场景，建议仍然优先评估是否存在对应的快捷命令或结构化命令；只有在没有更稳定抽象层时，再退回原始 API。

### 15.4.7.5 结果很多时，使用自动分页

```bash
idmp-cli element +list --size 100 --page-all --page-limit 500 --page-delay 200ms --format table
idmp-cli api GET /api/v1/elements --params '{"current":1,"size":100}' --page-all --page-limit 500
```

`--page-all` 仅适用于支持 `current / size` 风格分页的 GET 命令。启用后，CLI 会按页抓取并合并结果。`--page-limit` 用于限制最大合并行数，`0` 表示不设上限；`--page-delay` 用于在分页请求之间增加间隔，避免对服务端产生过高瞬时压力。

如果服务端没有明确返回“已经结束”的分页信号，CLI 会在自动拉取 500 页后主动中止。因此在脚本、CI 和 Agent 场景下，建议始终配合 `--page-limit` 使用，而不是无上限抓取。

## 15.4.8 写操作的安全执行方式

`idmp-cli` 对非只读操作默认启用风险确认机制。对于脚本、CI 和 Agent，这一点尤为重要。

### 15.4.8.1 先执行 dry-run

```bash
idmp-cli schema analysis.analyses.create
idmp-cli analysis analyses create \
  --params '<PARAMS_JSON_FROM_SCHEMA>' \
  --data '<DATA_JSON_FROM_SCHEMA>' \
  --dry-run
```

`--dry-run` 只预览请求，不会真正写入。输出中通常会包含 `method`、`path`、`risk`、`params` 和 `data`，可用于确认目标路径和请求体是否正确。不同写命令需要的字段并不相同，因此建议先通过 `schema` 获取当前命令的参数和请求体结构，再组织真实输入。

### 15.4.8.2 再执行真实写入

```bash
idmp-cli analysis analyses create \
  --params '<PARAMS_JSON_FROM_SCHEMA>' \
  --data '<DATA_JSON_FROM_SCHEMA>' \
  --ack-risk
```

对于非只读命令，如果省略 `--ack-risk`，CLI 会拒绝执行。在交互终端中，部分写操作也会要求显式确认。建议始终保留“先 `--dry-run`，后 `--ack-risk`”的执行顺序。

## 15.4.9 本地配置与环境变量

在脚本和 Agent 场景中，以下本地路径和环境变量最常用：

| 项目 | 默认值或变量 | 用途 |
|---|---|---|
| 配置目录 | `~/.idmp-cli` | 默认保存 CLI 配置和会话信息。 |
| 配置文件 | `~/.idmp-cli/config.json` | 保存 profile 和当前默认环境。 |
| 会话文件 | `~/.idmp-cli/sessions.json` | 保存各 profile 的会话元数据。 |
| 当前 profile | `--profile` 或 `IDMP_PROFILE` | 临时切换当前环境。 |
| 服务地址 | `IDMP_BASE_URL` | 在未读取本地 profile 时，直接通过环境变量指定目标服务。 |
| API Key | `IDMP_API_KEY` | 通过环境变量直接提供 API Key。 |
| Token | `IDMP_TOKEN` | 通过环境变量直接提供 bearer token。 |
| 配置目录覆盖 | `IDMP_CLI_CONFIG_DIR` | 将配置和会话重定向到自定义目录。 |
| 会话存储方式 | `IDMP_CLI_SESSION_STORAGE` | 控制会话保存在 `file`、`keyring` 或 `auto` 模式。 |

在 Windows 上，上述默认路径通常对应 `%USERPROFILE%\.idmp-cli`、`%USERPROFILE%\.idmp-cli\config.json` 和 `%USERPROFILE%\.idmp-cli\sessions.json`。

`IDMP_CLI_SESSION_STORAGE=auto` 并不总是等于 keyring：在 macOS 和 Windows 上通常会落到系统密钥链；在 Linux 上只有当前会话可用 D-Bus session bus 时才会使用 keyring，否则会回退到 `file`。如需确认当前实际生效的后端，可执行 `idmp-cli auth status` 或 `idmp-cli doctor --offline`，查看输出中的 `session_storage_mode` 和 `session_storage_backend`。

如果多个 Agent、并行 CI 任务或多个终端会同时执行 `config init`、`auth login`、`profile add/remove/use` 这类会修改本地状态的命令，不要共享同一个 `IDMP_CLI_CONFIG_DIR`。更稳妥的做法是为每个运行单元分配独立配置目录。

如果需要在多环境之间快速切换，可结合 `profile use <name>`、`profile list` 和全局参数 `--profile <name>` 一起使用。

## 15.4.10 安全使用建议

CLI 在自动化和 Agent 场景中经常具有写权限，因此建议在接入前先明确以下安全约束。

### 15.4.10.1 保护凭证输入与存储

建议优先采用以下方式处理敏感信息：

1. 密码和 API Key 优先通过 `--password-stdin`、`--api-key-stdin` 或环境变量传递，不建议直接出现在命令行参数中。
2. 在共享终端、CI 和录屏环境中，避免把真实凭证写入脚本、命令历史或文档示例。
3. 如需把会话令牌尽量保存在系统密钥链中，可根据运行环境设置 `IDMP_CLI_SESSION_STORAGE=auto` 或 `IDMP_CLI_SESSION_STORAGE=keyring`。
4. `--debug-http` 只建议在排障时临时启用，且应避免把调试输出长期保存在共享日志系统中。

### 15.4.10.2 隔离环境与权限

建议按环境拆分 profile 和身份边界：

1. 为 `default`、`staging`、`prod` 等环境分别建立独立 profile。
2. 在脚本和 CI 中显式传入 `--profile <name>`，不要依赖人工切换后的默认状态。
3. 生产环境优先使用最小权限账号或最小权限 API Key，避免把高权限凭证直接交给通用 Agent。
4. 如需在 CI 或多用户主机上运行，可通过 `IDMP_CLI_CONFIG_DIR` 将配置目录重定向到独立路径，避免互相覆盖。

### 15.4.10.3 先预览，再执行变更

对任何非只读操作，建议保持以下顺序：

1. 先执行 `idmp-cli schema <service.resource.method>` 确认参数和请求体结构。
2. 再执行 `--dry-run` 预览真实请求。
3. 仅在确认目标对象、参数和环境都正确后，再显式传入 `--ack-risk`。
4. 如需审计或问题追踪，可额外传入 `--request-id <id>`。

### 15.4.10.4 注意环境变量覆盖关系

如果同时设置了本地 profile 和环境变量，需要特别注意以下覆盖关系：

1. `IDMP_BASE_URL` 会覆盖 profile 中保存的服务地址。
2. `IDMP_TOKEN` 和 `IDMP_API_KEY` 会覆盖本地保存的登录会话。
3. 当两者同时存在时，`IDMP_TOKEN` 优先级高于 `IDMP_API_KEY`。

排障前建议先检查这些环境变量是否已被设置，否则 CLI 可能连接到与当前 profile 不一致的环境。

## 15.4.11 常见问题

### 15.4.11.1 安装后提示 `idmp-cli: command not found`

优先检查以下两项：

1. 全局 npm bin 目录是否已经加入 `PATH`。
2. `npm install -g` 执行完成后，当前终端是否已经重新打开。

### 15.4.11.2 Web UI 可以登录，但 CLI 认证失败

建议按以下顺序排查：

1. 重新执行 `idmp-cli config init`，确认 `--server` 地址没有写错。
2. 确认当前密码或 API Key 仍然有效。
3. 执行 `idmp-cli auth check --remote`，让服务端直接验证当前凭证。

### 15.4.11.3 如果 HTTPS 使用的是自签证书怎么办？

`idmp-cli` 默认遵循操作系统的证书信任链，不会自动忽略未受信任的自签证书。因此：

1. 如果自签证书或其 CA 已导入当前机器的系统信任链，CLI 可以正常使用 HTTPS。
2. 如果尚未导入系统信任链，CLI 会在 TLS 校验阶段失败。
3. 当前 CLI 不提供 `--insecure` 之类的跳过证书校验参数。
4. 如需临时排查连通性问题，可先切换到 `http://<IDMP_HOST>:6042`，但仅建议在可信隔离网络中短时使用，且避免在 HTTP 下提交敏感凭证；问题定位完成后再切回 HTTPS。

### 15.4.11.4 不知道该使用哪个命令路径

建议始终按以下顺序处理：

1. `idmp-cli schema search <关键词>`
2. `idmp-cli schema <service.resource.method>`
3. 再执行生成式命令或原始 `api` 命令

这种方式比直接猜测命令路径更稳定，也更适合自动化和 Agent 场景。

### 15.4.11.5 Agent 总是在猜错命令

通常可从以下 3 个方面修正：

1. Claude Code 仅安装 `idmp-plugin`，不要重复安装同一套 skills。
2. 其他 Agent 先安装 `taosdata/agent-skills`，离线安装时要显式传 `--target-dir`，或手动复制 `assets/skills/*`。
3. 明确要求 Agent 执行“先 `schema search`，再 `schema`，最后再出真实命令”的流程。
