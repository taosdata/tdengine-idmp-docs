---
title: Configuring Actions
sidebar_label: Configuring Actions
---

# 7.8 Configuring Actions

The Actions section (section 5 of the analysis form) lets an RT analysis automatically run predefined actions each time it fires and a specified condition is met. Actions are configured by referencing an [action template](../13-libraries/04-action-templates.md): the template defines *what* to do, while the action rule on the RT analysis side defines *when* to do it, along with local parameter adjustments that apply to this analysis only.

The system provides four action types, each corresponding to a system-provided [action template](../13-libraries/04-action-templates.md):

| Action type | Purpose |
|---|---|
| **Notification** (NOTIFICATION) | Send an alert notification via a contact point (email / Feishu / WeCom, etc.) |
| **Feishu Task** (FEISHU) | Create a task in Feishu and assign it to handlers |
| **IDMP Task** (IDMP) | Append a comment to an element / event in this system |
| **Agent Task** (AGENT) | Invoke an AI Function to diagnose or handle an issue using element context |

**Typical scenario:** An RT analysis on a distribution transformer element outputs an average voltage `avg_voltage` every 5 minutes. You want to automatically send an alert notification to the operations group whenever `avg_voltage` exceeds 235. Simply add one action rule in section 5 of the analysis that references the "Notification" template, and set the trigger condition to `attributes['avg_voltage'] > 235`.

## 7.8.1 Action Rules

The Actions section consists of one or more **action rules**. Click **Add Action** to add a rule. Each rule has the following parts:

| Part | Description |
|---|---|
| **Trigger Condition** (optional) | A condition expression that determines whether the action runs for the current output. **Leaving it empty means unconditional** — the action runs every time the analysis fires. |
| **Action Template** (required) | The referenced action template. Once selected, the template's description is shown as a tip next to the selector, and the template's editable configuration is expanded. |

You can add multiple action rules to the same RT analysis; the rules are independent and evaluated in order. Click **Delete** on a rule to remove it.

## 7.8.2 Trigger Condition

The trigger condition references the analysis's output attributes using the `attributes['attributeName']` syntax, and must evaluate to a boolean. Click the condition input box to open the condition editor and build the expression by selecting output attributes.

| Expression example | Meaning |
|---|---|
| (empty) | Unconditional: the action runs every time the analysis fires |
| `attributes['avg_voltage'] > 235` | Runs the action when the average voltage exceeds 235 |
| `attributes['max_current'] > 50 && attributes['avg_voltage'] > 220` | Runs when both conditions are met |

**The trigger condition is optional:**

- **Left empty** → treated as unconditional; the action always runs.
- **An expression is provided** → a conservative (fail-closed) policy applies, and the action runs only when the expression explicitly evaluates to true. The action is **not** run in the following cases:
  - An attribute referenced by the expression has no available latest value.
  - The expression has a syntax error or evaluates to a non-boolean result.

:::note
Attribute references in the trigger condition use the `attributes['attributeName']` syntax, which differs from the `{attributeName}` placeholder syntax used in notification titles and content, and the `${attributeName}` placeholder syntax used in the agent task's command (see [13.4.3](../13-libraries/04-action-templates.md#1343-text-placeholders)). The first is for condition evaluation; the latter two are for text interpolation.
:::

## 7.8.3 Action Configuration

After referencing an action template, the rule expands the editable fields specific to the template's action type. These fields are initialized from the template's preset values; changes made here apply only to the current RT analysis and are **not written back to the template**.

### 7.8.3.1 Notification

| Field | Description |
|---|---|
| **Contact Point** | The contact point used to send the notification; can be reselected here. When the template does not specify a contact point, the first one in the list is selected by default. |
| **Minimum Notification Interval (minutes)** | The minimum interval between two consecutive notifications sent by the same RT analysis to the same contact point; can be adjusted here. |
| **Notification Title** | The notification title; can be edited here. Supports `{...}` placeholders, and uses the default title when left blank. |
| **Notification Content** | The notification body; can be edited here. Supports `{...}` placeholders. |

For the placeholder syntax and default text of the notification title and content, see [Action Templates - Text Placeholders](../13-libraries/04-action-templates.md#1343-text-placeholders).

### 7.8.3.2 Feishu Task

| Field | Description |
|---|---|
| **Feishu App ID** | The App ID of the self-built Feishu application (found on the app's detail page). |
| **Feishu App Secret** | The App Secret of the self-built application. Shown as a masked `******` in view mode. |
| **Task Handlers** | One or more IDMP users to assign. At execution time, each user is resolved to a Feishu `open_id` by email and added as a task member; users whose email cannot be matched are skipped. |
| **Title** | The Feishu task title. Supports `{...}` placeholders. |
| **Content** | The Feishu task description. Supports `{...}` placeholders. |
| **Action Body (JSON)** | A free-form JSON payload attached to the Feishu task; treated as `{}` when left blank. |

:::note
The Feishu App ID and App Secret are obtained from your self-built application on the [Feishu Open Platform](https://open.feishu.cn/app). The application must have the corresponding permissions, such as creating tasks and reading users (to resolve open_id by email).
:::

### 7.8.3.3 IDMP Task

An IDMP task **appends a comment** to the selected target object. The supported target object types are **Element** and **Event**.

| Field | Description |
|---|---|
| **Object Type** | The target object type: **Element** or **Event**. |
| **Target Object** | The specific object of the selected type. An Element target defaults to the element the analysis belongs to; an Event target is selected from that element's events. |
| **Comment** | The comment body appended to the target object. Supports `{...}` placeholders. |

### 7.8.3.4 Agent Task

| Field | Description |
|---|---|
| **AI Function** | The AI Function to invoke, selected from the system's registered AI Functions. |
| **Command** | A free-text instruction passed to the AI Function that provides additional context. Supports `${...}` placeholders, which are substituted at runtime with element context (e.g., `Diagnose the anomaly on ${elementName}`). |

:::note
When an agent task runs, it invokes the selected AI Function. The system automatically creates an API Key for this task to authenticate. Do not delete it from the API Key list, or agent tasks will no longer be able to call the AI service.
:::

## 7.8.4 Snapshots and Configuration Override

When the RT analysis is saved, the system reads the template by the referenced template ID and saves the template's **name, action type, description, and categories** as a snapshot in the action rule. These general fields are backfilled from the template's current values and the submitted form values are not trusted. Local adjustments to individual fields (such as reselecting the contact point, editing the Feishu task title, or rewriting the agent command) are saved together with the analysis as a **configuration override**.

As a result:

- When the RT analysis is reopened, the action rule directly displays the saved snapshot and configuration override, **independent of the template's current state** — even if the template is later modified, the runtime parameters of the saved RT analysis remain unchanged.
- Even if the referenced template is later deleted, the RT analysis can still display and run based on the saved snapshot and configuration override.

## 7.8.5 Runtime Execution

Each time the RT analysis fires and produces output, the system runs the actions in order, rule by rule. For each action rule:

1. **Evaluate the trigger condition.** When the trigger condition is left empty, it is treated as unconditional and execution continues; otherwise the condition is evaluated according to [7.8.2](#782-trigger-condition) — execution continues only when the result is true, otherwise the rule is skipped.
2. **Execute by type.**
   - **Notification**: first applies throttling keyed on "analysis + action template + contact point"; if less than the **minimum notification interval** has elapsed since the last send, the current send is skipped. Otherwise, the title and content are rendered by substituting `{...}` placeholders and the notification is sent through the channel of the selected contact point.
   - **Feishu Task**: uses the App ID / App Secret to obtain a Feishu access token, resolves handler emails to `open_id`, and creates a Feishu task with the handlers assigned.
   - **IDMP Task**: appends a comment to the target object.
   - **Agent Task**: substitutes `${...}` placeholders in the command and invokes the selected AI Function's execute endpoint in a session, passing the element context (element name, attribute values, the owning analysis, etc.). The call is triggered asynchronously and does not block the analysis's main flow.

**Failure isolation.** Each action runs independently. A failure in a single action (e.g., contact point not found, invalid Feishu credentials, AI Function call failure) is only logged; it does not affect the other actions of the same analysis, nor the analysis's own computation and output writing.

## 7.8.6 Backward Compatibility

| Scenario | Behavior |
|---|---|
| An older RT analysis has no action configuration | No action runs; behavior is the same as before. |
| The trigger condition is left empty | Treated as unconditional; the action runs every time the analysis fires. |
| The trigger condition does not evaluate to true | The action is skipped (conservative policy, see [7.8.2](#782-trigger-condition)). |
| The referenced template has been deleted | The action displays and runs based on the saved snapshot and configuration override. |
| An action throws an exception during execution | It is logged and skipped, without affecting the other actions or the main RT analysis flow. |
