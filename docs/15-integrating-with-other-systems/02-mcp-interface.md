---
title: MCP 接口
sidebar_label: MCP 接口
---

# 15.2 MCP 接口

IDMP 通过反向代理对外提供 MCP 接口。AI 智能体无需在本地安装 MCP 服务端，只需连接 IDMP 提供的远程地址，即可读取元素上下文、时序属性、事件、分析结果、面板与 Dashboard，并在权限范围内执行受控写操作。推荐优先使用 Streamable HTTP；如果现有 Agent 仅支持 SSE，也可以通过 SSE 方式接入。

## 15.2.1 适用场景

- 让支持 MCP 的智能体直接访问 IDMP 中的元素、属性、事件、分析任务、面板和 Dashboard。
- 将实时工业上下文接入 LLM 工作流，用于元素健康检查、告警根因分析和自然语言问答。
- 把交接班、告警分诊、批次复盘等多步运维流程标准化，减少人工整理上下文的成本。
- 在受控边界内创建分析任务、告警规则、面板、属性和元素标注，减少手工配置。

## 15.2.2 获取登录令牌

1. 登录 IDMP Web UI。
2. 单击右上角头像，打开个人信息弹窗。
3. 在 **登录令牌** 区域复制当前令牌。
4. **登录令牌** 区域显示的是 `Authorization` Header 的 value 部分，形如 `Bearer <token>`；它已包含 `Bearer` 前缀，但**不包含** `Authorization:` 字段名。对于需要 `Authorization` Header 的客户端，请将该值填入 `Authorization` 字段中。

如果客户端要求填写的是纯 Bearer Token，而不是完整 Header 值，请先去掉开头的 `Bearer` 前缀，再填入对应字段。

如果令牌失效或重新登录，请重新打开头像弹窗复制最新令牌。

## 15.2.3 接入地址与鉴权

| 项目 | 说明 |
|---|---|
| 推荐访问地址 | `https://<IDMP_HOST>:6034` |
| 推荐 Transport | `Streamable HTTP` |
| Streamable HTTP URL | `https://<IDMP_HOST>:6034/api/v1/mcp/stream` |
| SSE URL | `https://<IDMP_HOST>:6034/api/v1/mcp/sse` |
| 鉴权方式 | `Authorization: <IDMP_LOGIN_TOKEN>` |
| 默认 HTTPS 端口 | `6034` |
| HTTP 排障地址 | `http://<IDMP_HOST>:6042/api/v1/mcp/stream` |

将示例中的 `<IDMP_HOST>` 替换为您的实际 IDMP 域名或 IP。`<IDMP_LOGIN_TOKEN>` 表示从界面复制的登录令牌值，形如 `Bearer <token>`，已包含 `Bearer` 前缀，但不包含 `Authorization:` 字段名。生产环境建议优先使用 HTTPS；仅在证书或网络排障时，才临时切换到 HTTP 地址。

## 15.2.4 Streamable HTTP 与 SSE 的区别

| 对比项 | Streamable HTTP | SSE |
|---|---|---|
| 配置类型 | `type: "http"` | `type: "sse"` |
| 接口路径 | `/api/v1/mcp/stream` | `/api/v1/mcp/sse` |
| 交互方式 | 基于 HTTP 的双向请求/响应流 | 服务端事件推送 + 客户端补充请求 |
| 适配情况 | 新版 MCP 客户端优先支持 | 主要用于仍保留 SSE 兼容层的客户端 |
| 推荐级别 | **推荐** | 按需使用 |

推荐优先使用 Streamable HTTP，原因如下：

1. 与新版 MCP 客户端的兼容性更好。
2. 请求、响应和错误语义更清晰，排障更直接。
3. 更适合后续能力扩展，长期维护成本更低。
4. 与 IDMP 当前默认的远程 MCP 展示方式一致，配置更统一。

## 15.2.5 配置方式

不同 Agent 的字段名可能略有差异，但核心信息始终一致：**远程 URL + Transport 类型 + Authorization Header**。

MCP 服务端由 IDMP 统一提供，客户端侧只需要配置远程地址和鉴权信息。

下文中，`<IDMP_LOGIN_TOKEN>` 表示从界面复制的登录令牌值，形如 `Bearer <token>`，已包含 `Bearer` 前缀，但不包含 `Authorization:` 字段名；`<IDMP_BEARER_TOKEN>` 表示去掉 `Bearer` 前缀后的纯 token 值。

### 15.2.5.1 Claude Code

Claude Code 支持通过命令行添加远程 MCP Server。推荐优先使用 Streamable HTTP：

```bash
claude mcp add --transport http tdengine-idmp \
  https://<IDMP_HOST>:6034/api/v1/mcp/stream \
  --header "Authorization: <IDMP_LOGIN_TOKEN>"
```

如果希望将配置共享给当前项目，可额外加上 `--scope project`。如果当前环境只能使用 SSE，请将 URL 替换为 `https://<IDMP_HOST>:6034/api/v1/mcp/sse`，并按客户端要求选择对应的 transport 类型。

### 15.2.5.2 Codex

Codex 可通过 `~/.codex/config.toml` 配置远程 MCP Server。推荐使用环境变量保存令牌：

```toml
[mcp_servers.tdengine-idmp]
url = "https://<IDMP_HOST>:6034/api/v1/mcp/stream"
bearer_token_env_var = "IDMP_BEARER_TOKEN"
```

启动 Codex 前，请先在当前终端设置 `IDMP_BEARER_TOKEN`，并确保其值**不包含** `Bearer` 前缀。如果当前环境需要 SSE，可将 URL 改为 `https://<IDMP_HOST>:6034/api/v1/mcp/sse`；如客户端版本需要显式 transport 字段，请设置为 `sse`。

### 15.2.5.3 Copilot CLI

GitHub Copilot CLI 支持通过交互式命令 `/mcp add` 添加远程 MCP Server。进入 `copilot` 交互界面后，执行：

```text
/mcp add
```

在表单中填写以下信息：

| 字段 | 值 |
|---|---|
| Server Name | `tdengine-idmp` |
| Server Type | `HTTP` |
| URL | `https://<IDMP_HOST>:6034/api/v1/mcp/stream` |
| HTTP Headers | `{"Authorization":"<IDMP_LOGIN_TOKEN>"}` |

如果当前环境需要 SSE，请将 URL 改为 `https://<IDMP_HOST>:6034/api/v1/mcp/sse`，并在界面中选择 `SSE` 或等价的 transport 类型。

也可以直接编辑 Copilot CLI 的配置文件 `~/.copilot/mcp-config.json`：

```json
{
  "mcpServers": {
    "tdengine-idmp": {
      "type": "http",
      "url": "https://<IDMP_HOST>:6034/api/v1/mcp/stream",
      "headers": {
        "Authorization": "<IDMP_LOGIN_TOKEN>"
      }
    }
  }
}
```

### 15.2.5.4 通用表单与 JSON 配置示例

如果 Agent 提供交互式表单，请填写以下字段：

| 字段 | Streamable HTTP | SSE |
|---|---|---|
| Server Name | `tdengine-idmp` | `tdengine-idmp` |
| Type / Transport | `http` | `sse` |
| URL | `https://<IDMP_HOST>:6034/api/v1/mcp/stream` | `https://<IDMP_HOST>:6034/api/v1/mcp/sse` |
| HTTP Headers | `{"Authorization":"<IDMP_LOGIN_TOKEN>"}` | `{"Authorization":"<IDMP_LOGIN_TOKEN>"}` |

对于其他支持 JSON 配置的 Agent，可参考以下示例。

**Streamable HTTP:**

```json
{
  "mcpServers": {
    "tdengine-idmp": {
      "type": "http",
      "url": "https://<IDMP_HOST>:6034/api/v1/mcp/stream",
      "headers": {
        "Authorization": "<IDMP_LOGIN_TOKEN>"
      }
    }
  }
}
```

**SSE:**

```json
{
  "mcpServers": {
    "tdengine-idmp": {
      "type": "sse",
      "url": "https://<IDMP_HOST>:6034/api/v1/mcp/sse",
      "headers": {
        "Authorization": "<IDMP_LOGIN_TOKEN>"
      }
    }
  }
}
```

## 15.2.6 Tool 功能

以下内容对应 MCP 中的 Tool 功能。

| Tool 类别 | 能力说明 | 典型用途 |
|---|---|---|
| 元素与层级 | 读取元素上下文、层级路径、子元素和分支范围 | 元素定位、资产树浏览、范围查询 |
| 属性数据 | 查询当前值、历史值和跨元素批量属性数据 | 趋势分析、状态核查、跨元素对比 |
| 事件与告警 | 查询事件、确认告警、补充标注、查看通知历史 | 告警分诊、事件复盘、通知追踪 |
| 分析任务 | 查询、创建、暂停、恢复和删除分析任务或告警规则 | 实时分析、规则下发、告警自动化 |
| 面板 | 查询、生成、创建和删除面板 | 单个元素的可视化配置与展示 |
| Dashboard | 搜索和关联 Dashboard | 跨面板汇总、场景级数据展示 |
| AI 与系统元数据 | 调用 IDMP AI，并读取系统配置、分类和推荐结果 | 自然语言问答、能力推荐、元数据读取 |
| 受控写入 | 创建属性、元素标注、事件标注和通知规则更新等 | 在权限范围内完成受控配置变更 |

## 15.2.7 Resource 功能

以下内容对应 MCP 中的 Resource 功能。

| Resource 功能 | 适用场景 | 返回内容 |
|---|---|---|
| 元素层级与路径解析 | 按名称定位元素，或建立完整资产树上下文 | 元素层级、路径关系及基础元数据 |
| 元素模板与标准属性 | 在设计面板、分析规则或属性查询前了解元素类型 | 元素模板及标准属性定义 |
| 事件语义 | 解释事件模板 ID、严重级别和告警含义 | 事件模板定义和语义信息 |
| 分析算法元数据 | 创建分析任务前了解支持的触发方式和算法类型 | 分析算法、触发类型及相关元数据 |

## 15.2.8 Prompt 功能

以下内容对应 MCP 中的 Prompt 功能。

| Prompt 功能 | 适用场景 | 推荐上下文 |
|---|---|---|
| 交接班报告生成 | 汇总班次期间的关键事件、标注和分析结果 | 元素上下文、事件列表、元素标注、分析任务 |
| 元素健康检查 | 对单个元素做运行状态诊断 | 元素上下文、关键属性、最近事件 |
| 根因分析 | 对单条告警或事件做原因追踪 | 事件详情、元素上下文、历史属性、事件标注 |
| 批次复盘 | 回顾某个批次或时间窗口内的关键变化 | 元素上下文、事件列表、历史属性、分析任务 |
| 同类元素对比 | 横向比较同类型元素的运行表现 | 元素列表、元素上下文、事件和 AI 分析结果 |
| 维保到期梳理 | 生成待维护元素清单并给出处理建议 | 元素上下文、事件、元素标注、AI 建议 |
| 告警分诊 | 对全系统未确认告警进行优先级排序 | 告警计数、事件详情、元素上下文、AI 判断 |

## 15.2.9 常见问题

### 15.2.9.1 HTTPS 证书校验不通过怎么办？

请先确认域名解析、证书链和客户端信任链是否正确。如果只是临时排查连通性问题，可以先改用 `http://<IDMP_HOST>:6042/api/v1/mcp/stream` 验证网络是否可达，排障完成后再切回 HTTPS。

### 15.2.9.2 为什么更推荐 Streamable HTTP？

因为新版 MCP 客户端通常优先支持 Streamable HTTP，且它的交互语义、错误处理和长期兼容性都更好。只有在现有 Agent 明确只支持 SSE 时，才建议使用 SSE。

### 15.2.9.3 为什么示例优先使用 `6034` 端口？

`6034` 是 IDMP 默认的 HTTPS 端口，文档库中的外部访问示例也统一使用这一端口。`6042` 可用于 HTTP 访问和排障，但生产环境更建议使用 `6034` 对外提供安全入口。

### 15.2.9.4 为什么连接成功后看不到全部 Tool、Resource 或 Prompt 功能？

不同 Agent 对 Tool、Resource 和 Prompt 的展示方式不完全一致。有些 Agent 会隐藏暂未使用的功能，有些只显示自己支持的部分，因此“能连上”并不意味着界面一定会完整列出所有功能。

### 15.2.9.5 为什么某些 Resource 或 Prompt 功能没有生效？

是否读取 Resource、是否调用 Prompt，取决于 Agent 自身的实现策略。有些 Agent 只主动调用基础 Tool，不一定会自动消费所有 Resource 或 Prompt 功能。

### 15.2.9.6 为什么写入类操作失败？

MCP 写入能力遵循 IDMP 当前登录用户的权限边界。如果令牌对应的用户没有目标元素、分析任务、面板或通知规则的权限，相关写入请求会失败。请优先检查角色授权和元素访问范围。

### 15.2.9.7 为什么连接成功但查询不到元素数据？

请依次检查元素路径是否正确、当前用户是否具备访问权限、查询时间范围是否覆盖实际数据，以及目标环境中是否已经写入对应属性或事件数据。对于历史趋势类查询，建议显式指定时间范围，而不要完全依赖 Agent 自动推断。
