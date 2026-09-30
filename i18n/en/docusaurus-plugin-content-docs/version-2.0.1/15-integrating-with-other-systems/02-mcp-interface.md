---
title: MCP Interface
sidebar_label: MCP Interface
---

# 15.2 MCP Interface

IDMP exposes its MCP integration through reverse-proxied remote endpoints. AI agents do not need to install a local MCP server. Instead, they connect directly to the endpoint provided by IDMP and can read element context, time-series attributes, events, analyses, panels, and dashboards, while performing controlled write actions within the user's permission boundary. Streamable HTTP is the recommended transport. SSE remains available for agents that still depend on it.

## 15.2.1 Typical Use Cases

- Connect MCP-aware agents directly to IDMP elements, attributes, events, analyses, panels, and dashboards.
- Bring live industrial context into LLM workflows for element health checks, alarm investigation, and natural-language question answering.
- Standardize multi-step workflows such as shift handover, alarm triage, and batch review, reducing manual context assembly.
- Create analyses, alarm rules, panels, attributes, and annotations within a controlled write boundary instead of exposing broad administrative CRUD.

## 15.2.2 Getting an API Key

1. Sign in to the IDMP Web UI.
2. Open the avatar menu in the upper-right corner and select the top account item to open the personal settings dialog.
3. Switch to the **API Key** tab.
4. To create a new API key, click **Add New API Key**, enter a unique title, and choose **Never** or a future **Expiration Date**.
5. Copy the full API key. The list view shows only a masked value. To retrieve the full value again later, use the row-level copy action.
6. The copied value starts with `api_` and does not include the `Bearer` prefix. For clients that require a full `Authorization` header, format it as `Bearer <IDMP_API_KEY>`.

For the full API key management workflow and limits, see [Section 14.8](../14-administration/08-profile-settings.md). If you already automate sign-in and issue JWTs, that flow remains valid. This document recommends API keys because they are a better fit for long-running MCP clients.

In the sections below, `<IDMP_API_KEY>` means the raw API key copied from the UI, in the form `api_<key_id>.<secret>`. The sample `Authorization` headers add the `Bearer` prefix explicitly.

## 15.2.3 Streamable HTTP Access

Streamable HTTP is the recommended remote MCP transport and should be the default choice for clients that support the newer MCP transport model.

### 15.2.3.1 Endpoint and Authentication

| Item | Value |
|---|---|
| Recommended base address | `https://<IDMP_HOST>:6034` |
| Transport type | `http` |
| MCP URL | `https://<IDMP_HOST>:6034/api/v1/mcp/stream` |
| Authentication | `Authorization: Bearer <IDMP_API_KEY>` |
| Default HTTPS port | `6034` |
| HTTP troubleshooting URL | `http://<IDMP_HOST>:6042/api/v1/mcp/stream` |

Replace `<IDMP_HOST>` with your actual IDMP domain or IP address. `<IDMP_API_KEY>` means the raw API key copied from the UI, in the form `api_<key_id>.<secret>`. It does not include the `Bearer` prefix. Use HTTPS for production traffic. Switch to the HTTP URL only when you are troubleshooting certificate or network issues.

### 15.2.3.2 Claude Code

Claude Code can add a remote MCP server from the command line:

```bash
claude mcp add --transport http tdengine-idmp \
  https://<IDMP_HOST>:6034/api/v1/mcp/stream \
  --header "Authorization: Bearer <IDMP_API_KEY>"
```

If you want to share the configuration with the current project, add `--scope project`.

### 15.2.3.3 Codex

Codex can configure a remote MCP server in `~/.codex/config.toml`. It is recommended to keep the token in an environment variable:

```toml
[mcp_servers.tdengine-idmp]
url = "https://<IDMP_HOST>:6034/api/v1/mcp/stream"
bearer_token_env_var = "IDMP_API_KEY"
```

Before starting Codex, make sure `IDMP_API_KEY` is available in the current shell as the raw `api_...` value, without the `Bearer` prefix.

### 15.2.3.4 Copilot CLI

GitHub Copilot CLI supports adding a remote MCP server through the interactive `/mcp add` command. Inside an interactive `copilot` session, run:

```text
/mcp add
```

Then fill in the form with values like these:

| Field | Value |
|---|---|
| Server Name | `tdengine-idmp` |
| Server Type | `HTTP` |
| URL | `https://<IDMP_HOST>:6034/api/v1/mcp/stream` |
| HTTP Headers | `{"Authorization":"Bearer <IDMP_API_KEY>"}` |

You can also edit Copilot CLI's configuration file directly at `~/.copilot/mcp-config.json`:

```json
{
  "mcpServers": {
    "tdengine-idmp": {
      "type": "http",
      "url": "https://<IDMP_HOST>:6034/api/v1/mcp/stream",
      "headers": {
        "Authorization": "Bearer <IDMP_API_KEY>"
      }
    }
  }
}
```

### 15.2.3.5 Generic Form and JSON Examples

If your agent provides an interactive form, fill it with values like these:

| Field | Value |
|---|---|
| Server Name | `tdengine-idmp` |
| Type / Transport | `http` |
| URL | `https://<IDMP_HOST>:6034/api/v1/mcp/stream` |
| HTTP Headers | `{"Authorization":"Bearer <IDMP_API_KEY>"}` |

For other agents that support JSON-style configuration, use a structure like the following:

```json
{
  "mcpServers": {
    "tdengine-idmp": {
      "type": "http",
      "url": "https://<IDMP_HOST>:6034/api/v1/mcp/stream",
      "headers": {
        "Authorization": "Bearer <IDMP_API_KEY>"
      }
    }
  }
}
```

## 15.2.4 SSE Access

SSE is intended for clients that still depend on the SSE transport. Use it only when your agent explicitly requires SSE.

### 15.2.4.1 Endpoint and Authentication

| Item | Value |
|---|---|
| Recommended base address | `https://<IDMP_HOST>:6034` |
| Transport type | `sse` |
| MCP URL | `https://<IDMP_HOST>:6034/api/v1/mcp/sse` |
| Authentication | `Authorization: Bearer <IDMP_API_KEY>` |
| Default HTTPS port | `6034` |
| HTTP troubleshooting URL | `http://<IDMP_HOST>:6042/api/v1/mcp/sse` |

Replace `<IDMP_HOST>` with your actual IDMP domain or IP address. `<IDMP_API_KEY>` means the raw API key copied from the UI, in the form `api_<key_id>.<secret>`. It does not include the `Bearer` prefix. Use HTTPS for production traffic. When you need to troubleshoot certificate or network issues, keep the `/api/v1/mcp/sse` path and only switch the protocol and port temporarily to HTTP and `6042`.

### 15.2.4.2 Generic Form and JSON Examples

If your agent provides an interactive form, fill it with values like these:

| Field | Value |
|---|---|
| Server Name | `tdengine-idmp` |
| Type / Transport | `sse` |
| URL | `https://<IDMP_HOST>:6034/api/v1/mcp/sse` |
| HTTP Headers | `{"Authorization":"Bearer <IDMP_API_KEY>"}` |

For other agents that support JSON-style configuration, use a structure like the following:

```json
{
  "mcpServers": {
    "tdengine-idmp": {
      "type": "sse",
      "url": "https://<IDMP_HOST>:6034/api/v1/mcp/sse",
      "headers": {
        "Authorization": "Bearer <IDMP_API_KEY>"
      }
    }
  }
}
```

## 15.2.5 Transport Selection Guidance

1. Choose Streamable HTTP for new integrations and newer MCP clients.
1. Choose SSE only when the agent explicitly lacks Streamable HTTP support or you must preserve an existing SSE-compatible setup.
1. For troubleshooting, keep the current transport path and switch only the protocol and port from HTTPS `6034` to HTTP `6042` temporarily.

## 15.2.6 Tool Capabilities

The following section describes the Tool capabilities exposed through MCP.

| Tool category | What it covers | Typical use |
|---|---|---|
| Elements and hierarchy | Read element context, paths, child elements, and branch scope | Element lookup, asset-tree browsing, scoped discovery |
| Attribute data | Query current values, history, and batch attribute data across elements | Trend analysis, state checks, cross-element comparison |
| Events and alarms | Query events, acknowledge alarms, add annotations, and inspect notification history | Alarm triage, event review, notification tracing |
| Analyses | Read, create, pause, resume, and delete analyses or alarm rules | Real-time analysis, rule delivery, alarm automation |
| Panels | Query, generate, create, and delete panels | Visualization for a single element or focused use case |
| Dashboards | Search and associate dashboards | Cross-panel summaries and scenario-level views |
| AI and system metadata | Call IDMP AI and read system configuration, categories, and recommendations | Natural-language Q&A, capability recommendation, metadata lookup |
| Controlled writes | Create attributes, annotations, and notification rule updates within the user's scope | Safe configuration changes without broad admin access |

## 15.2.7 Resource Capabilities

The following section describes the Resource capabilities exposed through MCP.

| Resource capability | When to use it | Returned content |
|---|---|---|
| Element hierarchy and path resolution | Before locating an element by name or building full asset-tree context | Hierarchy data, path relationships, and basic metadata |
| Element templates and standard attributes | Before designing panels, analyses, or attribute queries | Element templates and standard attribute definitions |
| Event semantics | Before interpreting template IDs, severities, and alarm meaning | Event template definitions and semantic metadata |
| Analysis algorithm metadata | Before creating an RT analysis and selecting a trigger or algorithm type | Supported triggers, algorithms, and related metadata |

## 15.2.8 Prompt Capabilities

The following section describes the Prompt capabilities exposed through MCP.

| Prompt capability | Typical use | Recommended context |
|---|---|---|
| Shift handover report generation | Summarize key events, annotations, and RT analysis results for one shift | Element context, event list, element annotations, analyses |
| Element health check | Diagnose the operating state of one element | Element context, key attributes, recent events |
| Root-cause analysis | Investigate one alarm or event | Event details, element context, historical attributes, event annotations |
| Batch review | Review one batch or bounded time window | Element context, event list, attribute history, analyses |
| Same-type element comparison | Compare operational patterns across similar elements | Element list, element context, events, and AI output |
| Maintenance-due review | Build a maintenance-due list and next-step suggestions | Element context, events, annotations, AI suggestions |
| Alarm triage | Prioritize unacknowledged alarms across the system | Alarm counts, event details, element context, AI judgment |

## 15.2.9 Tool Permission Reference

### 15.2.9.1 Permission Model

An MCP API key inherits the current role permissions of its owner. Existing keys therefore reflect later role changes. When a Tool branch calls multiple endpoints, the caller must have every permission required by those calls.

Permission relationships use consistent wording: `or` means any one listed permission is sufficient, while `and` means all listed permissions are required. “Note” explains why multiple permissions are needed or why any one of them is sufficient; it does not add another permission requirement.

Unauthenticated requests return `401`. Authorization failures normally return `403`, which MCP exposes as the corresponding upstream error. Endpoints marked "Authenticated user" in this documentation currently have no dedicated role-permission point; valid authentication is still required, and element scope, resource ownership, or business validation may still apply. `confirm=true` is a destructive-operation safety gate, not a substitute for RBAC authorization.

### 15.2.9.2 Elements and Hierarchy

- **`search_elements`, `list_elements`, `list_element_children`, `count_branch_elements`**
  - Permission: View element (`view:element`)
- **`get_element_by_path`, `get_element_fullpath`, `get_elements_by_ids`**
  - Permission: View element (`view:element`)
- **`list_element_changes`**
  - Permission: View element (`view:element`)
- **`list_element_templates`**
  - Permission: View element template (`view:element:template`)
- **`list_element_templates_in_scope`**
  - Permission: View element (`view:element`)
- **`get_element_context`**
  - Permission: View element (`view:element`); selected branches add event-list, element-analysis, or element panel and dashboard view permissions
  - Note: The base context reads element data; selected event, analysis, or panel branches read additional data and therefore require their corresponding view permissions.

### 15.2.9.3 Attribute Data

- **`get_attribute_value`, `get_attribute_history`**
  - Permission: View element (`view:element`)
- **`get_attributes_by_path`, `get_batch_attribute_data`**
  - Permission: View element (`view:element`)
- **`list_element_attributes`, `search_attributes`**
  - Permission: View element (`view:element`)
- **`create_attribute`**
  - Permission: Add element (`add:element`)
  - Note: Default mode reads existing attributes before reusing them, so it also requires View element (`view:element`); `reuse_if_exists=false` skips that read.

### 15.2.9.4 Events and Alarms

- **`list_events`, `search_events`, `get_event`, `get_event_annotations`, `get_event_count_unacknowledged`**
  - Permission: View event list (`view:event-list`)
- **`acknowledge_event`**
  - Permission: Edit event list (`edit:event-list`)
- **`add_event_annotation`**
  - Permission: View event list (`view:event-list`)
  - Note: Event annotations are covered by the event-detail view permission, so View event list (`view:event-list`) is used.
- **`get_notification_history`**
  - Permission: Authenticated user; no dedicated role-permission point currently exists
  - Note: Without `event_id`, results are filtered by current-user contacts; with `event_id`, that filter does not apply, so all notification records for that event may be returned.

### 15.2.9.5 Analyses

- **`list_analyses`, `get_analysis`**
  - Permission: View element analysis (`view:element:analysis`)
- **`search_analyses`**
  - Permission: View element analysis (`view:element:analysis`) or View system analyses (`view:system:analyses`)
  - Note: Element-analysis and system-analysis searches are separate entry points; either permission authorizes its corresponding search.
- **`create_analysis`**
  - Permission: Add element analysis (`add:element:analysis`)
- **`create_alarm_rule`**
  - Permission: Add element analysis (`add:element:analysis`)
  - Note: Creating the alarm rule requires Add element analysis; hierarchy expansion also reads descendants and attributes, so it requires View element (`view:element`).
- **`add_analysis`**
  - Permission: AI Analysis (`ai:analysis`) and Add element analysis (`add:element:analysis`)
  - Note: The operation invokes both AI analysis and element-analysis creation, so both permissions are required.
- **`manage_analysis` (`PAUSE` / `RESUME`)**
  - Permission: Add element analysis (`add:element:analysis`) or Edit element analysis (`edit:element:analysis`)
  - Note: Both permissions cover pause and resume operations; either permission authorizes the operation.
- **`manage_analysis` (`DELETE`)**
  - Permission: Delete element (`delete:element`)
  - Note: Deletion is destructive, so `confirm=true` is required in addition to the deletion permission.

### 15.2.9.6 Panels and Dashboards

- **`list_panels`, `search_panels`, `search_dashboards`**
  - Permission: View element panels and dashboards (`view:element:dashboard`)
- **`get_panel`**
  - Permission: View element panels and dashboards (`view:element:dashboard`)
- **`get_panel_dashboard_counts`**
  - Permission: View element panels and dashboards (`view:element:dashboard`)
- **`create_panel`**
  - Permission: Add element panels and dashboards (`add:element:dashboard`)
- **`add_panel`**
  - Permission: AI Panel (`ai:panel`) and Add element panels and dashboards (`add:element:dashboard`)
  - Note: The operation invokes both AI panel generation and panel/dashboard creation, so both permissions are required.
- **`delete_panel`**
  - Permission: Edit element panels and dashboards (`edit:element:dashboard`) or Delete element (`delete:element`)
  - Note: These permissions cover separate deletion authorization paths; either permission authorizes deletion, and `confirm=true` is also required.

### 15.2.9.7 AI and Recommendations

- **`ask_idmp`**
  - Permission: AI Chat (`ai:chat`)
- **`recommend_analyses`**
  - Permission: AI Analysis (`ai:analysis`)
- **`recommend_panels`**
  - Permission: AI Panel (`ai:panel`)

### 15.2.9.8 System Metadata, Categories, Annotations, and Notification Rules

- **`get_system_config`**
  - Permission: Authenticated user; no dedicated role-permission point currently exists
- **`list_categories`**
  - Permission: View category (`view:category`)
- **`list_element_annotations`**
  - Permission: Unified authentication is required; no dedicated element-annotation role-permission point currently exists
  - Note: Queries by the supplied element ID without an additional caller element-scope check.
- **`create_element_annotation`**
  - Permission: Unified authentication is required; no dedicated element-annotation role-permission point currently exists
  - Note: Creates against the supplied element ID and records the author; later updates or deletion are limited to the annotation owner.
- **`list_contact_points`**
  - Permission: Edit notification rule (`edit:notifyRule`)
- **`update_contact_point`**
  - Permission: Edit notification rule (`edit:notifyRule`)

## 15.2.10 Frequently Asked Questions

### 15.2.10.1 What should I do if HTTPS certificate validation fails?

First verify DNS resolution, the certificate chain, and the client's trust store. If you are only troubleshooting connectivity, keep the current transport path and temporarily switch to HTTP instead: Streamable HTTP uses `http://<IDMP_HOST>:6042/api/v1/mcp/stream`, while SSE uses `http://<IDMP_HOST>:6042/api/v1/mcp/sse`. After troubleshooting, move back to HTTPS.

### 15.2.10.2 Why is Streamable HTTP the preferred choice?

Newer MCP clients usually support Streamable HTTP first, and it offers clearer request, response, and error semantics. It is also a better long-term fit for future capability growth, so use SSE only when your current agent explicitly requires it.

### 15.2.10.3 Why do the examples use port `6034`?

`6034` is IDMP's default HTTPS port, and the rest of the documentation uses the same secure external entry point. `6042` is still useful for plain HTTP access and troubleshooting, but `6034` is the recommended production-facing port.

### 15.2.10.4 Why can't I see every Tool, Resource, or Prompt capability after connecting?

Agents do not all render Tools, Resources, and Prompts in the same way. Some hide capabilities until they are needed, while others display only the subset they actively support. A successful connection does not guarantee a full visual listing.

### 15.2.10.5 Why do some Resource or Prompt capabilities not take effect?

Whether an agent reads Resources or invokes Prompts depends on the agent's own implementation strategy. Some agents actively use only the basic Tools and may ignore other capability types unless they are explicitly designed to consume them.

### 15.2.10.6 Why do write actions fail?

Write capabilities follow the current IDMP user's permission boundary. If the token does not grant access to the target element, RT analysis, panel, or notification rule, the write request will fail. Check the user's role and scope first.

### 15.2.10.7 Why does the connection succeed but no element data is returned?

Check whether the element path is correct, whether the current user has access, whether the queried time range actually covers the data, and whether the environment contains the expected attributes or events. For history-oriented requests, it is best to specify the time range explicitly instead of relying entirely on agent inference.
