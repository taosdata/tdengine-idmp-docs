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

## 15.2.2 Getting a Login Token

1. Sign in to the IDMP Web UI.
2. Click the avatar in the upper-right corner to open the personal information dialog.
3. Copy the value shown in **Login Token**.
4. Use the copied value as-is in the `Authorization` header, for example `Bearer <IDMP_TOKEN>`.

If the token expires or you sign in again, reopen the avatar dialog and copy the latest token.

## 15.2.3 Endpoint and Authentication

| Item | Value |
|---|---|
| Recommended base address | `https://idmp.tdengine.net:6034` |
| Recommended transport | `Streamable HTTP` |
| Streamable HTTP URL | `https://idmp.tdengine.net:6034/api/v1/mcp/stream` |
| SSE URL | `https://idmp.tdengine.net:6034/api/v1/mcp/sse` |
| Authentication | `Authorization: Bearer <IDMP_TOKEN>` |
| Default HTTPS port | `6034` |
| HTTP troubleshooting URL | `http://idmp.tdengine.net:6042/api/v1/mcp/stream` |

Replace `https://idmp.tdengine.net:6034` with your actual IDMP HTTPS address. Use HTTPS for production traffic. Switch to the HTTP URL only when you are troubleshooting certificate or network issues.

## 15.2.4 Streamable HTTP vs SSE

| Aspect | Streamable HTTP | SSE |
|---|---|---|
| Configuration type | `type: "http"` | `type: "sse"` |
| Endpoint path | `/api/v1/mcp/stream` | `/api/v1/mcp/sse` |
| Interaction model | Bidirectional request/response streaming over HTTP | Server-sent events with client-side follow-up requests |
| Client support | Preferred by newer MCP clients | Mainly used for clients that still require SSE compatibility |
| Recommendation | **Recommended** | Use only when needed |

Streamable HTTP is recommended because:

1. newer MCP clients typically support it first,
2. request, response, and error semantics are clearer,
3. it is better aligned with future capability expansion, and
4. it matches IDMP's default remote MCP presentation.

## 15.2.5 Configuration Pattern

Different agents may use slightly different field names, but the required information is always the same: **remote URL + transport type + Authorization header**.

The MCP server is hosted by IDMP, so the client side only needs the remote address and authentication information.

### 15.2.5.1 Claude Code

Claude Code supports adding a remote MCP server from the command line. Streamable HTTP is the recommended option:

```bash
claude mcp add --transport http tdengine-idmp \
  https://idmp.tdengine.net:6034/api/v1/mcp/stream \
  --header "Authorization: Bearer <IDMP_TOKEN>"
```

If you want to share the configuration with the current project, add `--scope project`. If your environment requires SSE instead, replace the URL with `https://idmp.tdengine.net:6034/api/v1/mcp/sse` and choose the matching transport type required by the client.

### 15.2.5.2 Codex

Codex can configure a remote MCP server in `~/.codex/config.toml`. It is recommended to keep the token in an environment variable:

```toml
[mcp_servers.tdengine-idmp]
url = "https://idmp.tdengine.net:6034/api/v1/mcp/stream"
bearer_token_env_var = "IDMP_TOKEN"
```

Before starting Codex, make sure `IDMP_TOKEN` is available in the current shell. If your environment requires SSE, replace the URL with `https://idmp.tdengine.net:6034/api/v1/mcp/sse`. If your client version requires an explicit transport field, set it to `sse`.

### 15.2.5.3 Copilot CLI

GitHub Copilot CLI supports adding a remote MCP server through the interactive `/mcp add` command. Inside an interactive `copilot` session, run:

```text
/mcp add
```

Then fill in the form with values like these:

| Field | Value |
|---|---|
| Server Name | `tdengine-idmp` |
| Server Type | `HTTP` |
| URL | `https://idmp.tdengine.net:6034/api/v1/mcp/stream` |
| HTTP Headers | `{"Authorization":"Bearer <IDMP_TOKEN>"}` |

If your environment requires SSE, change the URL to `https://idmp.tdengine.net:6034/api/v1/mcp/sse` and select `SSE` or the equivalent transport type in the UI.

You can also edit Copilot CLI's configuration file directly at `~/.copilot/mcp-config.json`:

```json
{
  "mcpServers": {
    "tdengine-idmp": {
      "type": "http",
      "url": "https://idmp.tdengine.net:6034/api/v1/mcp/stream",
      "headers": {
        "Authorization": "Bearer <IDMP_TOKEN>"
      }
    }
  }
}
```

### 15.2.5.4 Generic Form and JSON Examples

If your agent provides an interactive form, fill it with values like these:

| Field | Streamable HTTP | SSE |
|---|---|---|
| Server Name | `tdengine-idmp` | `tdengine-idmp` |
| Type / Transport | `http` | `sse` |
| URL | `https://idmp.tdengine.net:6034/api/v1/mcp/stream` | `https://idmp.tdengine.net:6034/api/v1/mcp/sse` |
| HTTP Headers | `{"Authorization":"Bearer <IDMP_TOKEN>"}` | `{"Authorization":"Bearer <IDMP_TOKEN>"}` |

For other agents that support JSON-style configuration, use a structure like the following.

**Streamable HTTP:**

```json
{
  "mcpServers": {
    "tdengine-idmp": {
      "type": "http",
      "url": "https://idmp.tdengine.net:6034/api/v1/mcp/stream",
      "headers": {
        "Authorization": "Bearer <IDMP_TOKEN>"
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
      "url": "https://idmp.tdengine.net:6034/api/v1/mcp/sse",
      "headers": {
        "Authorization": "Bearer <IDMP_TOKEN>"
      }
    }
  }
}
```

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
| Analysis algorithm metadata | Before creating an analysis and selecting a trigger or algorithm type | Supported triggers, algorithms, and related metadata |

## 15.2.8 Prompt Capabilities

The following section describes the Prompt capabilities exposed through MCP.

| Prompt capability | Typical use | Recommended context |
|---|---|---|
| Shift handover report generation | Summarize key events, annotations, and analysis results for one shift | Element context, event list, element annotations, analyses |
| Element health check | Diagnose the operating state of one element | Element context, key attributes, recent events |
| Root-cause analysis | Investigate one alarm or event | Event details, element context, historical attributes, event annotations |
| Batch review | Review one batch or bounded time window | Element context, event list, attribute history, analyses |
| Same-type element comparison | Compare operational patterns across similar elements | Element list, element context, events, and AI output |
| Maintenance-due review | Build a maintenance-due list and next-step suggestions | Element context, events, annotations, AI suggestions |
| Alarm triage | Prioritize unacknowledged alarms across the system | Alarm counts, event details, element context, AI judgment |

## 15.2.9 Frequently Asked Questions

### 15.2.9.1 What should I do if HTTPS certificate validation fails?

First verify DNS resolution, the certificate chain, and the client's trust store. If you are only troubleshooting connectivity, temporarily switch to `http://idmp.tdengine.net:6042/api/v1/mcp/stream` to confirm network reachability, then move back to HTTPS after the certificate issue is fixed.

### 15.2.9.2 Why is Streamable HTTP the preferred choice?

Newer MCP clients usually support Streamable HTTP first, and it offers clearer request, response, and error semantics. It is also a better long-term fit for future capability growth, so use SSE only when your current agent explicitly requires it.

### 15.2.9.3 Why do the examples use port `6034`?

`6034` is IDMP's default HTTPS port, and the rest of the documentation uses the same secure external entry point. `6042` is still useful for plain HTTP access and troubleshooting, but `6034` is the recommended production-facing port.

### 15.2.9.4 Why can't I see every Tool, Resource, or Prompt capability after connecting?

Agents do not all render Tools, Resources, and Prompts in the same way. Some hide capabilities until they are needed, while others display only the subset they actively support. A successful connection does not guarantee a full visual listing.

### 15.2.9.5 Why do some Resource or Prompt capabilities not take effect?

Whether an agent reads Resources or invokes Prompts depends on the agent's own implementation strategy. Some agents actively use only the basic Tools and may ignore other capability types unless they are explicitly designed to consume them.

### 15.2.9.6 Why do write actions fail?

Write capabilities follow the current IDMP user's permission boundary. If the token does not grant access to the target element, analysis, panel, or notification rule, the write request will fail. Check the user's role and scope first.

### 15.2.9.7 Why does the connection succeed but no element data is returned?

Check whether the element path is correct, whether the current user has access, whether the queried time range actually covers the data, and whether the environment contains the expected attributes or events. For history-oriented requests, it is best to specify the time range explicitly instead of relying entirely on agent inference.
