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
4. The **Login Token** field shows the value part of the `Authorization` header, in the form `Bearer <token>`. It already includes the `Bearer` prefix, but it does **not** include the `Authorization:` field name. For clients that accept an `Authorization` header, place this value in the `Authorization` field.

If a client expects only the raw Bearer token instead of the full header value, remove the leading `Bearer` prefix before filling that field.

If the token expires or you sign in again, reopen the avatar dialog and copy the latest token.

In the sections below, `<IDMP_LOGIN_TOKEN>` means the login token copied from the UI, in the form `Bearer <token>`. It already includes the `Bearer` prefix but does not include the `Authorization:` field name. `<IDMP_BEARER_TOKEN>` means the raw token value after removing that prefix.

## 15.2.3 Streamable HTTP Access

Streamable HTTP is the recommended remote MCP transport and should be the default choice for clients that support the newer MCP transport model.

### 15.2.3.1 Endpoint and Authentication

| Item | Value |
|---|---|
| Recommended base address | `https://<IDMP_HOST>:6034` |
| Transport type | `http` |
| MCP URL | `https://<IDMP_HOST>:6034/api/v1/mcp/stream` |
| Authentication | `Authorization: <IDMP_LOGIN_TOKEN>` |
| Default HTTPS port | `6034` |
| HTTP troubleshooting URL | `http://<IDMP_HOST>:6042/api/v1/mcp/stream` |

Replace `<IDMP_HOST>` with your actual IDMP domain or IP address. Use HTTPS for production traffic. Switch to the HTTP URL only when you are troubleshooting certificate or network issues.

### 15.2.3.2 Claude Code

Claude Code can add a remote MCP server from the command line:

```bash
claude mcp add --transport http tdengine-idmp \
  https://<IDMP_HOST>:6034/api/v1/mcp/stream \
  --header "Authorization: <IDMP_LOGIN_TOKEN>"
```

If you want to share the configuration with the current project, add `--scope project`.

### 15.2.3.3 Codex

Codex can configure a remote MCP server in `~/.codex/config.toml`. It is recommended to keep the token in an environment variable:

```toml
[mcp_servers.tdengine-idmp]
url = "https://<IDMP_HOST>:6034/api/v1/mcp/stream"
bearer_token_env_var = "IDMP_BEARER_TOKEN"
```

Before starting Codex, make sure `IDMP_BEARER_TOKEN` is available in the current shell and does **not** include the `Bearer` prefix.

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
| HTTP Headers | `{"Authorization":"<IDMP_LOGIN_TOKEN>"}` |

You can also edit Copilot CLI's configuration file directly at `~/.copilot/mcp-config.json`:

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

### 15.2.3.5 Generic Form and JSON Example

If your agent provides an interactive form, fill it with values like these:

| Field | Value |
|---|---|
| Server Name | `tdengine-idmp` |
| Type / Transport | `http` |
| URL | `https://<IDMP_HOST>:6034/api/v1/mcp/stream` |
| HTTP Headers | `{"Authorization":"<IDMP_LOGIN_TOKEN>"}` |

For other agents that support JSON-style configuration, use a structure like the following:

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

## 15.2.4 SSE Access

SSE is intended for clients that still depend on the SSE transport. Use it only when your agent explicitly requires SSE.

### 15.2.4.1 Endpoint and Authentication

| Item | Value |
|---|---|
| Recommended base address | `https://<IDMP_HOST>:6034` |
| Transport type | `sse` |
| MCP URL | `https://<IDMP_HOST>:6034/api/v1/mcp/sse` |
| Authentication | `Authorization: <IDMP_LOGIN_TOKEN>` |
| Default HTTPS port | `6034` |
| HTTP troubleshooting URL | `http://<IDMP_HOST>:6042/api/v1/mcp/sse` |

Replace `<IDMP_HOST>` with your actual IDMP domain or IP address. Use HTTPS for production traffic. When you need to troubleshoot certificate or network issues, keep the `/api/v1/mcp/sse` path and only switch the protocol and port temporarily to HTTP and `6042`.

### 15.2.4.2 Generic Form and JSON Example

If your agent provides an interactive form, fill it with values like these:

| Field | Value |
|---|---|
| Server Name | `tdengine-idmp` |
| Type / Transport | `sse` |
| URL | `https://<IDMP_HOST>:6034/api/v1/mcp/sse` |
| HTTP Headers | `{"Authorization":"<IDMP_LOGIN_TOKEN>"}` |

For other agents that support JSON-style configuration, use a structure like the following:

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

First verify DNS resolution, the certificate chain, and the client's trust store. If you are only troubleshooting connectivity, keep the current transport path and temporarily switch to HTTP instead: Streamable HTTP uses `http://<IDMP_HOST>:6042/api/v1/mcp/stream`, while SSE uses `http://<IDMP_HOST>:6042/api/v1/mcp/sse`. After troubleshooting, move back to HTTPS.

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
