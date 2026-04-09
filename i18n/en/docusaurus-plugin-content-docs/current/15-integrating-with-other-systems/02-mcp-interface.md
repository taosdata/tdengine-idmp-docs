---
title: MCP Interface
sidebar_label: MCP Interface
---

# 15.2 MCP Interface

IDMP now exposes its MCP integration through a reverse-proxied HTTP Stream endpoint. AI agents do not need to install or run `mcp-tdengine-idmp` locally. Instead, they connect directly to the Streamable HTTP endpoint provided by IDMP and can immediately discover the available tools, resources, and prompts. The current surface includes **50 tools**, **4 dynamic resources**, and **7 prompt templates** for diagnostics, alarm triage, shift handover, root-cause analysis, and guided creation of analyses and panels.

## 15.2.1 Typical Use Cases

- Connect Streamable HTTP MCP clients directly to IDMP elements, attributes, events, analyses, and panels.
- Bring live industrial context into LLM workflows for health checks, alarm investigation, and natural-language question answering.
- Standardize multi-step operational workflows such as shift handover, batch review, and alarm triage through prompt templates.
- Create analyses, alarm rules, panels, attributes, and annotations within a controlled write boundary instead of exposing broad administrative CRUD.

## 15.2.2 Access Model

| Item | Value |
|---|---|
| Transport | `HTTP` / `Streamable HTTP` |
| Endpoint URL | `http://<IDMP_HOST>:6042/api/v1/mcp/stream` |
| Authentication | `Authorization: Bearer <IDMP_TOKEN>` |
| Capability discovery | The client automatically reads Tools, Resources, and Prompts after connecting |

If your deployment uses a public domain or another entry point instead of `http://<IDMP_HOST>:6042`, replace the host portion accordingly and keep the MCP path as `/api/v1/mcp/stream`.

## 15.2.3 Configuring Common Agents

Different clients may use slightly different field names, but the essential information is always the same: **remote URL + HTTP Stream transport + Authorization header**.

### 15.2.3.1 Claude Code

Claude Code officially supports adding a remote HTTP MCP server from the command line. Use a command like this:

```bash
claude mcp add --transport http tdengine-idmp \
  http://<IDMP_HOST>:6042/api/v1/mcp/stream \
  --header "Authorization: Bearer <IDMP_TOKEN>"
```

If you want to share the configuration with the current project, add `--scope project`.

### 15.2.3.2 Codex

Codex configures remote MCP servers under `mcp_servers` in `~/.codex/config.toml`. A practical setup is to keep the token in an environment variable:

```toml
[mcp_servers.tdengine-idmp]
url = "http://<IDMP_HOST>:6042/api/v1/mcp/stream"
bearer_token_env_var = "IDMP_TOKEN"
```

Before starting Codex, make sure the `IDMP_TOKEN` environment variable is available in the current shell.

### 15.2.3.3 Copilot CLI

GitHub Copilot CLI officially supports adding remote MCP servers through the interactive `/mcp add` command. Inside an interactive `copilot` session, run:

```text
/mcp add
```

Then fill in the form with values like these:

| Field | Value |
|---|---|
| Server Name | `tdengine-idmp` |
| Server Type | `HTTP` |
| URL | `http://<IDMP_HOST>:6042/api/v1/mcp/stream` |
| HTTP Headers | `{"Authorization":"Bearer <IDMP_TOKEN>"}` |
| Tools | `*` |

You can also edit Copilot CLI's configuration file directly at `~/.copilot/mcp-config.json`:

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

## 15.2.4 MCP Surface Summary

| Type | Count | Description |
|---|---|---|
| Tools | 50 | Query tools plus a controlled write surface for elements, attributes, events, analyses, and panels |
| Resources | 4 | Dynamic resources for hierarchy, templates, event templates, and analysis algorithms |
| Prompts | 7 | Structured workflows for handover, health checks, alarm triage, root-cause analysis, and more |

## 15.2.5 Tool Categories

| Category | Representative tools | What they cover |
|---|---|---|
| Elements and hierarchy | `get_element_context`, `search_elements`, `get_element_by_path`, `list_element_children`, `count_branch_elements` | Element context, hierarchy lookup, branch navigation, and scoped discovery |
| Attribute data | `get_attribute_value`, `get_attribute_history`, `get_batch_attribute_data`, `search_attributes` | Current values, time-series history, and cross-element attribute queries |
| Events and notifications | `list_events`, `get_event`, `acknowledge_event`, `add_event_annotation`, `get_notification_history` | Event querying, alarm acknowledgement, annotation, and notification tracing |
| Analyses | `list_analyses`, `get_analysis`, `add_analysis`, `create_analysis`, `create_alarm_rule`, `manage_analysis` | Reading, creating, pausing, resuming, and deleting analysis tasks |
| Panels and dashboards | `list_panels`, `get_panel`, `add_panel`, `create_panel`, `delete_panel`, `search_dashboards` | Querying, generating, creating, and deleting panels, plus dashboard search |
| AI and system metadata | `ask_idmp`, `recommend_analyses`, `recommend_panels`, `get_system_config`, `list_categories` | Built-in AI calls plus system metadata and category lookup |

The write surface is intentionally limited to 12 scoped tools: `acknowledge_event`, `add_event_annotation`, `add_analysis`, `create_analysis`, `create_alarm_rule`, `manage_analysis`, `add_panel`, `create_panel`, `delete_panel`, `create_attribute`, `create_element_annotation`, and `update_contact_point`.

## 15.2.6 Dynamic Resources

| Resource | When to use it | Returned content |
|---|---|---|
| `idmp://hierarchy` | Before resolving elements by name or building full asset-tree context | A flat element hierarchy with `id`, `name`, `parentId`, and template metadata |
| `idmp://element-templates` | Before designing panels, analyses, or attribute queries | Element templates and their standard attribute definitions |
| `idmp://event-templates` | Before interpreting event template IDs, severities, and alarm semantics | Event template definitions |
| `idmp://analysis-algorithms` | Before creating analyses so the client can inspect supported trigger and algorithm types | Analysis algorithm and trigger metadata |

## 15.2.7 Prompt Workflows

| Prompt | Typical use | Suggested tool flow |
|---|---|---|
| `shift_handover` | Generate a structured shift handover report | `get_element_context` → `list_events` → `list_element_annotations` → `list_analyses` |
| `equipment_health_check` | Run a health assessment for one equipment element | `get_element_context` → `ask_idmp` |
| `root_cause_analysis` | Investigate one alarm or event | `get_event` → `get_element_context` → `get_attribute_history` → `get_event_annotations` |
| `batch_review` | Review one batch or time-bounded operation | `get_element_context` → `list_events` → `get_attribute_history` → `list_analyses` |
| `fleet_comparison` | Compare all elements of the same type | `list_elements` → `get_element_context` → `list_events` → `ask_idmp` |
| `maintenance_due` | Build a maintenance-due report for child equipment | `get_element_context` → `list_events` → `list_element_annotations` → `ask_idmp` |
| `alarm_triage` | Prioritize system-wide unacknowledged alarms | `get_event_count_unacknowledged` → `list_events` → `get_event` → `get_element_context` → `ask_idmp` |

## 15.2.8 Common Usage Patterns

| Scenario | Recommended flow |
|---|---|
| Element lookup and context gathering | `idmp://hierarchy` → `get_element_context` → add `get_attribute_value`, `list_events`, or `list_panels` as needed |
| Single-equipment health check | `get_element_context` → `equipment_health_check`, or pass a compact context summary into `ask_idmp` |
| Alarm triage | `get_event_count_unacknowledged` → `list_events` → `get_event` → `get_element_context` → `alarm_triage` |
| Root-cause analysis | `get_event` → `get_element_context` → `get_attribute_history` → `get_event_annotations` → `root_cause_analysis` |
| Creating analyses or panels | `idmp://analysis-algorithms` / `idmp://element-templates` → `create_attribute` (if an output attribute is needed) → `add_analysis` / `create_analysis` or `add_panel` / `create_panel` |

If your client supports prompts, start with `shift_handover`, `equipment_health_check`, or `root_cause_analysis` instead of building the tool sequence manually.
