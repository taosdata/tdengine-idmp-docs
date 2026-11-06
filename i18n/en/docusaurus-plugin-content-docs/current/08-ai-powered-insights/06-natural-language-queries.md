---
title: AI Assistant
sidebar_label: AI Assistant
---

# 8.6 AI Assistant

The **AI Assistant** (named **Teddy**) is a natural-language conversation panel docked on the right side of the Explorer browse and detail pages. It answers questions about the current element and page without writing TDengine SQL or navigating the asset hierarchy, for example, "What was the peak voltage for em-1 yesterday?"

## 8.6.1 Opening the AI Assistant

After selecting an element in the Explorer, the AI Assistant is displayed on the right side of the workspace by default. If it has been collapsed, click the **AI Assistant toggle** at the far right of the context tab bar to reopen it. The button to the left of the AI Assistant header collapses or expands the middle workspace. The AI Assistant's open or collapsed state is remembered across refreshes.

- The AI Assistant appears only when the AI service is running. If the AI connection is unavailable, an administrator must configure a valid [AI connection](./01-connecting-to-llm.md); if the AI license has expired or permissions are insufficient, contact an administrator as well.
- Drag the left edge of the AI Assistant to resize it between 320 pixels and 60% of the browser window. The width is remembered for the next visit.
- The top navigation bar does not provide a separate AI Assistant entry; the AI Assistant loads with the Explorer.
- Full-screen panel, element, and dashboard editor pages do not show the AI Assistant.
- Using **Summon** in the Expert Center, or opening a result from a scheduled-task notification, opens the standalone full-page AI chat; that page has a left-hand history sidebar and a different layout from the right-side AI Assistant.

## 8.6.2 Interface Layout

The AI Assistant panel consists of a header, a conversation area, and an input area.

**Header.** Shows **AI Assistant**. When a conversation is active, its name is appended to the title and truncated when necessary. Two controls are available at the right of the header: **Scheduled tasks** (alarm clock icon) and **History** (list icon).

**Conversation area.** Shows the greeting, previous messages, and streamed answers. The greeting is *"Hi, I'm Teddy. How can I help you?"*.

**Input area.** It contains:

- **Context tags** for the current element, manually added elements, and the current page; each tag can be closed individually (see [8.6.6 Context and Multi-Element Analysis](#866-context-and-multi-element-analysis)).
- A text input. Panel, real-time analysis, event, attribute, dashboard, and related element pages show page-specific placeholder text.
- The **Expert** button, **Skill** entry (type `/` to open the skill list), and **Deep Thinking** toggle at the bottom left of the input.
- A **microphone** button at the right of the input for voice input.
- A **Start New Talk** button when a conversation exists, which starts a blank conversation.
- The **Suggested Questions** area, shown for a new conversation above the input.

**Floating panes.** History and scheduled tasks open as floating panes over the right side of the conversation area. Their left edge can be dragged, and their bottom edge stops at the top of the input. The two panes are mutually exclusive: only one can be open at a time. AI Function execution sessions and panel insight sessions also share the conversation area; opening one closes the other.

## 8.6.3 Asking a Question

To run read-only analysis later or repeat it daily or weekly, create an [AI scheduled task](./13-scheduled-tasks.md) in the conversation. Scheduled tasks require separate background authorization and confirmation of the schedule and time zone when created or edited.

Type your question in the input field. Press **Enter** to send, or **Shift+Enter** to add a line break without sending.

You can also press the **microphone** button to use voice input. Speak your question and the system transcribes it into the input field.

## 8.6.4 Deep Thinking Mode

The **Deep Thinking** toggle switches the query to the Deep Thinking Model (configured in Connection Management). Use this mode for complex multi-step questions that require extended reasoning — for example, correlating multiple attributes across a time window, or asking for a root cause hypothesis. Standard questions about data values do not require Deep Thinking mode.

## 8.6.5 Suggested Questions

The **Suggested Questions** area generates questions by page type and uses the current element and element template as context. The panel, real-time analysis, event, and dashboard pages each recommend their corresponding question types.

- Switching the selected element in the left tree does not refresh the suggestions automatically; the current list stays unchanged.
- Suggestions regenerate automatically only when the recommendation type changes (for example, from a panel page to a real-time analysis page); switching between pages that share a recommendation type keeps the current list.
- Click the **refresh** icon (tooltip "Refresh") next to "Suggested Questions" to request a new set for the current element and page. An explicit refresh bypasses the cache so the result matches the current context.
- Click any suggestion to use it directly — the question is placed in the input field and sent automatically.

## 8.6.6 Context and Multi-Element Analysis

The AI Assistant sends the active context together with each question. The context tags above the input show what is active:

- **Element tag**: the element selected in the left tree.
- **Manually added element tags**: other elements added from the tree for multi-element comparison or correlation analysis.
- **Page tag**: the current page name, such as "Attributes", "Panels", or "Dashboards".

Click the close icon on an element tag or the page tag to exclude that part of the context from subsequent questions on the current element or page; closed tags are restored when the selected element or page changes. Closing a manually added element tag removes that element from the context; to use it again, add it back from the tree.

To add another element, hover over an element, a favorite element, or an element in a group in the left tree, and click the **Add to AI Assistant context** button at the left of the row actions. The AI Assistant opens automatically and shows a tag for the element above the input. Click the same button again to remove it. Up to five elements can be added; at most three context tags are displayed above the input at a time, and the remaining elements are still sent with each request. Tags that are not displayed cannot be closed from the input; remove those elements with the tree button.

Manually added elements persist across page navigation within the current browser session and are cleared when the page is refreshed.

## 8.6.7 History

Click the **History** button (list icon) at the right of the AI Assistant header to open the history floating pane. The pane contains:

- A conversation filter (**All conversations** / **Conversations with scheduled tasks**) and a refresh button.
- A search box that filters the currently loaded conversation summaries by title or first question.
- A conversation list grouped by date. Click an entry to open that conversation in the conversation area.
- Pagination controls at the bottom.

Click the History button again, click outside the pane, or press **Esc** to close it. Opening History closes any active AI Functions or Panel Insights session. History and Scheduled tasks are mutually exclusive.

When a confirmation card appears in the conversation, the History pane collapses temporarily so it does not cover the confirmation buttons, and then reopens automatically after the card is resolved.

## 8.6.8 Scheduled Tasks

Click the **Scheduled tasks** button (alarm clock icon) at the right of the AI Assistant header to open the scheduled task floating pane. The pane provides three tabs: **Tasks**, **All runs**, and **Authorization**. Use them to create and manage scheduled tasks, view execution records, and configure background authorization.

Opening the scheduled task pane closes any active AI Functions or Panel Insights session. Selecting a run result closes the pane and opens the result in the conversation area. Click the Scheduled tasks button again, click outside the pane, or press **Esc** to close it. Unlike History, the Scheduled tasks pane does not collapse automatically when a confirmation card appears; close it manually. For details about creating, confirming, and running scheduled tasks, see [AI Scheduled Tasks](./13-scheduled-tasks.md).

## 8.6.9 How Teddy Answers

When you submit a question, Teddy queries your TDengine data using the appropriate SQL, retrieves the results, and returns a natural language answer. For data questions, the response includes the computed values. For analytical questions, it may include charts, tables, or a narrative explanation.

All answers are grounded in your actual data — Teddy does not fabricate values.

## 8.6.10 Confirming Tool Operations

The AI Assistant can also use tools to create panels, update panels, or create analyses. Enable **Confirm before execution** under **Personal Settings → Agent** to pause write operations that require confirmation and display a card in the conversation. Read-only queries do not require confirmation. The toggle is off by default, saves changes automatically, and applies to the next task. See [Profile Settings](../14-administration/08-profile-settings.md#1485-agent).

### 8.6.10.1 Using a Confirmation Card

The card shows the operation, tool name, and argument details. Expand **Details** to review the target resource and arguments, then choose an action:

| Action | Behavior |
|---|---|
| **Execute** | Execute this operation with the current arguments, then continue the task |
| **Edit parameters** | Open the editable fields, change the values, and click **Execute** to use the updated arguments. Closing the editor does not execute the operation. |
| **Skip** | Do not execute this operation. Return the skipped result to the AI so it can continue the task. |
| **Cancel task** | Reject this operation and stop the current task. Operations already completed are not rolled back. |

When a confirmation expires, its actions become unavailable. Send a new request to proceed. Changing the personal preference does not resolve an existing card. After refreshing or reopening the conversation, a pending confirmation can still be handled once restored, provided it has not expired.

Token statistics show usage actually reported by the model. Missing usage is not replaced with zero. Explicitly reported zero usage is preserved as zero. Usage reported before a failure or pause is retained. A confirmation receipt without an additional model call does not generate additional token usage.

### 8.6.10.2 Calling User-Configured MCP Services from the AI Assistant

A user-configured MCP service is a service connected to IDMP for the AI Assistant to use. For example, after connecting a company work-order system, the AI Assistant can call its tools to look up or create work orders. **IDMP is the MCP client, and the work-order system is the MCP server.** The confirmation preference applies to calls made by the AI Assistant through IDMP. It does not affect other clients that connect directly to that MCP server. **IM temporarily does not support confirmation before execution.**

To configure this behavior:

1. An administrator configures and enables a service template under [Libraries → Agentic AI → MCP Templates](../13-libraries/05-agentic-ai.md#1352-mcp-templates). The current user supplies the required connection variables under [Personal Settings → Agent](../14-administration/08-profile-settings.md#1485-agent), making the tools available to the AI Assistant.
2. The MCP server sets `annotations.readOnlyHint` and `annotations.destructiveHint` in each tool definition. IDMP reads these declarations through `tools/list`. They are tool metadata, not input arguments or instructions for the AI to interpret.
3. Enable **Confirm before execution** under **Personal Settings → Agent**, then start a new AI Assistant task.
4. When the AI selects a tool, IDMP uses the table below to decide whether to pause. If confirmation is required, IDMP displays a card before sending the tool execution request to the MCP server. Clicking **Execute** sends `tools/call`.

The following table covers all combinations **with confirmation enabled**. “Omitted” means that the field is absent from the tool definition.

| `readOnlyHint` | `destructiveHint` | AI Assistant behavior |
|---|---|---|
| `true` | `false` | Call directly without a confirmation card |
| `true` | Omitted | Call directly without a confirmation card |
| `true` | `true` | Show a confirmation card; these declarations conflict and the server definition should be corrected |
| `false` | `false` | Show a confirmation card; additive operations also require confirmation |
| `false` | `true` | Show a confirmation card |
| `false` | Omitted | Show a confirmation card |
| Omitted | `false` | Show a confirmation card |
| Omitted | `true` | Show a confirmation card |
| Omitted | Omitted | Show a confirmation card |

**With confirmation disabled, all the tools above are called directly in new tasks.** The preference controls whether to wait for approval; existing permission and argument checks still apply.

For example, a work-order server can return the following tool definitions in its `tools/list` response. When registering tools with an SDK, set `annotations` on the tool definition, at the same level as `inputSchema`.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "create_work_order",
        "description": "Create a work order",
        "inputSchema": {
          "type": "object",
          "properties": {
            "title": { "type": "string" }
          },
          "required": ["title"]
        },
        "annotations": {
          "readOnlyHint": false,
          "destructiveHint": false
        }
      },
      {
        "name": "get_work_order",
        "description": "Look up a work order",
        "inputSchema": {
          "type": "object",
          "properties": {
            "id": { "type": "string" }
          },
          "required": ["id"]
        },
        "annotations": {
          "readOnlyHint": true,
          "destructiveHint": false
        }
      }
    ]
  }
}
```

With confirmation enabled, ask “Create a work order titled ‘Check em-3 voltage’.” When the AI selects `create_work_order`, IDMP displays a confirmation card and creates the work order only after **Execute** is clicked. Ask “Look up work order WO-123.” When the AI selects `get_work_order`, IDMP calls it directly and returns the result without a confirmation card.

`readOnlyHint: false` declares that a tool may modify data. It requires confirmation even when `destructiveHint: false` declares only additive changes. A genuinely read-only query should declare `readOnlyHint: true` and `destructiveHint: false`. These fields are [standard MCP tool annotations](https://modelcontextprotocol.io/specification/2025-06-18/schema#toolannotations). The confirmation behavior is an IDMP rule enforced by code; the AI cannot bypass it. The server should declare these hints according to the tool's actual behavior.

“Read-only” here is **declared by the MCP server**. IDMP uses that declaration to decide whether confirmation is required; it does not independently verify that the implementation performs no writes. Connect only trusted MCP servers, and have their maintainers declare tool behavior truthfully. For example, `get_work_order` should be declared read-only only if it actually queries work orders without modifying them. If it also updates a work order's status, declare `readOnlyHint: false` so that enabling confirmation displays a card first.

**Basic confirmation requires no additional confirmation endpoint, `validate_*` tool, or `x-idmp-confirmation-policy`.** Those extra conventions apply only to parameter editing, described below.

### 8.6.10.3 Editing Parameters in a Confirmation Card

Only the fields in the following table can currently be edited. The field must already exist in the original tool arguments and contain a string. Editing cannot add missing fields or modify arbitrary objects or arrays.

| Tool | Editable field | Limits |
|---|---|---|
| Create panel (`create_panel`) | Panel name (`config.name`) | 1–250 Unicode characters; cannot consist entirely of whitespace |
| Create analysis (`create_analysis`) | Analysis name (`config.name`) | 1–250 Unicode characters; cannot consist entirely of whitespace |
| Create analysis (`create_analysis`) | Description (`config.description`) | Up to 2048 Unicode characters; an empty string is allowed |
| Other tools, including panel updates | Editing is unavailable | Review the arguments, then execute, skip, or cancel the task |

SQL, expressions, alert thresholds, calculation intervals, target elements, and resource IDs are protected and cannot be changed in a confirmation card. To change these arguments, cancel the current task and send a revised request. Sensitive fields are not exposed for editing in plain text, and invalid values prevent submission. A message is shown if the tool has no editable parameters or the parameters cannot be loaded.

A confirmation card for a user-configured MCP tool does not automatically support parameter editing. For example, the `create_work_order` tool above can be executed, skipped, or cancelled, but its title cannot be edited in the card.

To enable editing for a custom MCP panel or analysis creation tool, the server must also implement IDMP's editing contract: declare `x-idmp-confirmation-policy` in the tool's `inputSchema` (`idmp-create-panel-v1` for panels, or `idmp-create-analysis-v1` for analyses), use the argument structure in the table above, and provide the corresponding read-only validator in the same MCP connection (`validate_panel` for `create_panel`, or `validate_analysis` for `create_analysis`). Both tools must be available, the edited arguments must pass validation, and protected arguments must remain unchanged. These are **IDMP-specific editing conventions, not part of the MCP standard**. A matching tool name or argument schema alone does not enable editing, and these extra requirements do not affect basic confirmation.

For example, ask: "For em-3, create an analysis that calculates the maximum voltage every five minutes and raises an alert above 240." With confirmation enabled, a card appears before the AI calls the analysis creation tool. Review the interval and threshold, and edit the name or description within the limits above before executing. With confirmation disabled, the tool executes under the existing rules. After successful creation, open the analysis using the link in the reply.
