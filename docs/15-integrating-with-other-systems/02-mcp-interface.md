---
title: MCP 接口
sidebar_label: MCP 接口
---

# 15.2 MCP 接口

IDMP 现已通过反向代理对外提供基于 HTTP Stream 的 MCP 接口。AI 智能体无需单独部署 `mcp-tdengine-idmp`，只需连接 IDMP 提供的 Streamable HTTP 地址，即可读取工业数据与上下文，并调用受控写能力。当前能力面包含 **50 个工具**、**4 个动态资源** 和 **7 个提示模板**，适合设备诊断、告警分诊、交接班、根因分析，以及分析规则与看板配置等场景。

## 15.2.1 适用场景

- 让支持 Streamable HTTP 的 MCP 客户端直接访问 IDMP 的元素、属性、事件、分析任务和看板。
- 将实时工业上下文接入 LLM 工作流，用于设备健康检查、告警根因分析和自然语言问答。
- 用 Prompt 模板把交接班、告警分诊、批次复盘等多步运维流程固化为标准化工作流。
- 在受控边界内创建分析任务、告警规则、看板、属性和元素标注，减少手工配置。

## 15.2.2 接入方式

| 项目 | 说明 |
|---|---|
| Transport | `HTTP` / `Streamable HTTP` |
| 接口 URL | `http://<IDMP_HOST>:6042/api/v1/mcp/stream` |
| 鉴权方式 | `Authorization: Bearer <IDMP_TOKEN>` |
| 能力发现 | 客户端连接后会自动读取 Tools、Resources 和 Prompts |

如果您的 IDMP 对外入口不是 `http://<IDMP_HOST>:6042`，请将上面的地址替换为实际访问域名，但 MCP 路径保持为 `/api/v1/mcp/stream`。

## 15.2.3 在常见 Agent 中配置

不同客户端的字段名可能略有差异，但核心信息始终一致：**远程 URL + HTTP Stream transport + Authorization Header**。

### 15.2.3.1 Claude Code

Claude Code 官方支持通过命令行直接添加远程 HTTP MCP Server，推荐使用如下命令：

```bash
claude mcp add --transport http tdengine-idmp \
  http://<IDMP_HOST>:6042/api/v1/mcp/stream \
  --header "Authorization: Bearer <IDMP_TOKEN>"
```

如果希望把配置共享给当前项目，可额外加上 `--scope project`。

### 15.2.3.2 Codex

Codex 通过 `~/.codex/config.toml` 中的 `mcp_servers` 段配置远程 MCP Server。推荐使用环境变量保存 Token：

```toml
[mcp_servers.tdengine-idmp]
url = "http://<IDMP_HOST>:6042/api/v1/mcp/stream"
bearer_token_env_var = "IDMP_TOKEN"
```

启动 Codex 前，先在当前终端设置 `IDMP_TOKEN` 环境变量即可。

### 15.2.3.3 Copilot CLI

GitHub Copilot CLI 官方支持通过交互式命令 `/mcp add` 添加远程 MCP Server。进入 `copilot` 交互界面后，执行：

```text
/mcp add
```

在表单中填写以下信息：

| 字段 | 值 |
|---|---|
| Server Name | `tdengine-idmp` |
| Server Type | `HTTP` |
| URL | `http://<IDMP_HOST>:6042/api/v1/mcp/stream` |
| HTTP Headers | `{"Authorization":"Bearer <IDMP_TOKEN>"}` |
| Tools | `*` |

也可以直接编辑 Copilot CLI 的配置文件 `~/.copilot/mcp-config.json`：

```json
{
  "mcpServers": {
    "tdengine-idmp": {
      "type": "http",
      "url": "http://<IDMP_HOST>:6042/api/v1/mcp/stream",
      "headers": {
        "Authorization": "Bearer <IDMP_TOKEN>"
      },
      "tools": [
        "*"
      ]
    }
  }
}
```

## 15.2.4 MCP 能力总览

| 类型 | 数量 | 说明 |
|---|---|---|
| Tools | 50 | 包含查询类工具和受控写工具，可读写元素、属性、事件、分析任务和看板 |
| Resources | 4 | 提供层级、模板、事件模板和分析算法等动态资源 |
| Prompts | 7 | 封装交接班、健康检查、告警分诊、根因分析等标准工作流 |

## 15.2.5 Tools 能力

| 类别 | 代表工具 | 说明 |
|---|---|---|
| 元素与层级 | `get_element_context`、`search_elements`、`get_element_by_path`、`list_element_children`、`count_branch_elements` | 获取元素上下文、层级路径和分支范围 |
| 属性数据 | `get_attribute_value`、`get_attribute_history`、`get_batch_attribute_data`、`search_attributes` | 查询当前值、历史值和跨元素批量属性数据 |
| 事件与通知 | `list_events`、`get_event`、`acknowledge_event`、`add_event_annotation`、`get_notification_history` | 查询事件、确认告警、补充标注、查看通知历史 |
| 分析任务 | `list_analyses`、`get_analysis`、`add_analysis`、`create_analysis`、`create_alarm_rule`、`manage_analysis` | 查询、创建、暂停、恢复或删除分析任务 |
| 看板与数据大屏 | `list_panels`、`get_panel`、`add_panel`、`create_panel`、`delete_panel`、`search_dashboards` | 查询、生成、创建和删除看板，并搜索数据大屏 |
| AI 与系统元数据 | `ask_idmp`、`recommend_analyses`、`recommend_panels`、`get_system_config`、`list_categories` | 调用 IDMP AI，并读取系统配置与分类元数据 |

当前对外只暴露 12 个受控写工具：`acknowledge_event`、`add_event_annotation`、`add_analysis`、`create_analysis`、`create_alarm_rule`、`manage_analysis`、`add_panel`、`create_panel`、`delete_panel`、`create_attribute`、`create_element_annotation` 和 `update_contact_point`。

## 15.2.6 Dynamic Resources

| Resource | 适用场景 | 返回内容 |
|---|---|---|
| `idmp://hierarchy` | 按名称定位元素或建立完整资产树上下文 | 扁平元素层级列表，包含 `id`、`name`、`parentId` 和模板元数据 |
| `idmp://element-templates` | 设计看板、分析规则或属性查询前先了解设备类型 | 元素模板及其标准属性定义 |
| `idmp://event-templates` | 解释事件模板 ID、严重级别和告警语义 | 事件模板定义 |
| `idmp://analysis-algorithms` | 创建分析规则前查看当前环境支持的 trigger / algorithm 类型 | 分析算法和触发类型元数据 |

## 15.2.7 Prompt 工作流

| Prompt | 适用场景 | 推荐流程 |
|---|---|---|
| `shift_handover` | 生成交接班报告 | `get_element_context` → `list_events` → `list_element_annotations` → `list_analyses` |
| `equipment_health_check` | 做单台设备健康检查 | `get_element_context` → `ask_idmp` |
| `root_cause_analysis` | 对单条告警或事件做根因分析 | `get_event` → `get_element_context` → `get_attribute_history` → `get_event_annotations` |
| `batch_review` | 复盘某个批次或时间窗口 | `get_element_context` → `list_events` → `get_attribute_history` → `list_analyses` |
| `fleet_comparison` | 横向比较同类设备 | `list_elements` → `get_element_context` → `list_events` → `ask_idmp` |
| `maintenance_due` | 生成维保到期清单 | `get_element_context` → `list_events` → `list_element_annotations` → `ask_idmp` |
| `alarm_triage` | 对全系统未确认告警做优先级分诊 | `get_event_count_unacknowledged` → `list_events` → `get_event` → `get_element_context` → `ask_idmp` |

## 15.2.8 常见使用方式

| 场景 | 建议顺序 |
|---|---|
| 元素定位与上下文获取 | `idmp://hierarchy` → `get_element_context` → 按需补充 `get_attribute_value`、`list_events`、`list_panels` |
| 单设备健康诊断 | `get_element_context` → `equipment_health_check`，或将关键上下文整理后交给 `ask_idmp` |
| 告警分诊 | `get_event_count_unacknowledged` → `list_events` → `get_event` → `get_element_context` → `alarm_triage` |
| 根因分析 | `get_event` → `get_element_context` → `get_attribute_history` → `get_event_annotations` → `root_cause_analysis` |
| 新建分析或看板 | `idmp://analysis-algorithms` / `idmp://element-templates` → `create_attribute`（如需输出属性）→ `add_analysis` / `create_analysis` 或 `add_panel` / `create_panel` |

如果客户端支持 Prompt，优先使用 `shift_handover`、`equipment_health_check`、`root_cause_analysis` 等模板，会比从零组织工具链更稳定。
