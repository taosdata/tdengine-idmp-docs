---
title: Action Templates
sidebar_label: Action Templates
---

# 13.4 Action Templates

An **action template** defines a reusable automated action that [real-time analyses](../07-real-time-analysis/index.md) invoke when a trigger condition is met. For example, when a distribution transformer's analysis outputs an average voltage above a threshold, it can automatically send an alert notification to the operations group. By capturing actions as templates, multiple analyses can reference the same template and adjust its runtime parameters locally within each analysis, without affecting the template itself.

The system provides one action template per action type, four in total:

| Action template | Action type | Purpose |
|---|---|---|
| **Notification** | Notification (NOTIFICATION) | Send an alert notification via a contact point |
| **Feishu Task** | Feishu (FEISHU) | Create a task in Feishu and assign it to handlers |
| **IDMP Task** | IDMP (IDMP) | Append a comment to an element / event |
| **Agent Task** | Agent (AGENT) | Invoke an AI Function for intelligent diagnosis or handling |

Action templates are managed in **Libraries → Action Templates**.

:::note
The system provides one action template per action type. You can **view and edit** each template's configuration fields in the list (the action type and template name are defined by the system).
:::

## 13.4.1 Action Template List

The list shows all action templates, with the following columns:

| Column | Description |
|---|---|
| **Name** | The action template name |
| **Categories** | Category tags assigned to the template |
| **Description** | Optional description |

:::note
To avoid misuse, the list does **not** show an action type column — each template's purpose is reflected by its name and description.
:::

Click a template name (or **View / Edit** in the **⋮** menu on a row) to view or edit the template's configuration.

## 13.4.2 Action Template Configuration

On a template's edit page, you first fill in the **general information** shared by all types, then edit the configuration fields specific to that template's action type. These values serve as the **defaults** used by analyses that reference the template.

### General Information Fields

| Field | Description |
|---|---|
| **Name** | The action template name (system-defined, read-only). |
| **Categories** | Optional category tags to organize and filter templates. You can create new tags inline. The category type is **Action Template**. |
| **Description** | Optional free-text description of the action's purpose. When a template is selected in an analysis, the description is shown as a tip next to the selector. |

### Notification Configuration

| Field | Description |
|---|---|
| **Contact Point** | The contact point used to send the notification, selected from the system's defined contact points. The contact point itself carries the channel type (email / Feishu / WeCom, etc.), which determines the channel through which the notification is sent. |
| **Minimum Notification Interval (minutes)** | The minimum interval between two consecutive notifications sent by the same analysis to the same contact point. Default is 10 minutes. Limits notification frequency when a condition is met continuously, preventing notification overload. |
| **Notification Title** | The notification title. Supports `{...}` placeholders (see [13.4.3](#1343-text-placeholders)); a localized default title is used when left blank. |
| **Notification Content** | The notification body. Supports `{...}` placeholders, which are substituted at execution time with the actual information of the analysis's element and the output attribute values. |

### Feishu Task Configuration

| Field | Description |
|---|---|
| **Feishu App ID** | The App ID of the self-built Feishu application. |
| **Feishu App Secret** | The App Secret of the self-built application. Shown as a masked `******` in view mode. |
| **Task Handlers** | One or more IDMP users. At execution time, each user is resolved to a Feishu `open_id` by email and added as a task member; users whose email cannot be matched are skipped. |
| **Title** | The Feishu task title. Supports `{...}` placeholders. |
| **Content** | The Feishu task description. Supports `{...}` placeholders. |
| **Action Body (JSON)** | A free-form JSON payload attached to the Feishu task; treated as `{}` when left blank. |

:::note
The App ID and App Secret are obtained from your self-built application on the [Feishu Open Platform](https://open.feishu.cn/app). The application must have the corresponding permissions, such as creating tasks and reading users.
:::

### IDMP Task Configuration

An IDMP task appends a comment to the target object.

| Field | Description |
|---|---|
| **Object Type** | The target object type (e.g., Element, Event), used as the default target type when the template is referenced. |
| **Comment** | The comment body appended to the target object. Supports `{...}` placeholders. |

:::note
The specific target object is selected on the analysis side when the template is referenced (see [13.4.5](#1345-using-action-templates-in-an-analysis)).
:::

### Agent Task Configuration

| Field | Description |
|---|---|
| **AI Function** | The AI Function to invoke, selected from the system's registered AI Functions. |
| **Command** | A free-text instruction passed to the AI Function that provides additional context. Supports `${...}` placeholders, which are substituted at runtime with element context (e.g., `Diagnose the anomaly on ${elementName}`). |

:::note
When an agent task runs, it invokes an AI Function. The system automatically creates an API Key for this task to authenticate. Do not delete it from the API Key list, or agent tasks will no longer be able to call the AI service.
:::

## 13.4.3 Text Placeholders

Two kinds of text in action templates support placeholders, with different syntaxes — do not mix them:

**Notification title / notification content / Feishu task title / Feishu task content / IDMP comment** use curly-brace `{...}` syntax, substituted at runtime with the actual information of the analysis's element and the output attribute values of the current analysis run:

| Placeholder | Substituted with |
|---|---|
| `{elementName}` | The name of the element to which the triggering analysis belongs |
| `{elementPath}` | The full path of that element in the asset tree |
| `{analysisName}` | The name of the triggering RT analysis |
| `{attributeName}` | The computed value of the corresponding output attribute, e.g., `{avg_voltage}` |

**The agent task's command** uses `${...}` syntax (the same as the attribute reference in trigger condition expressions), substituted at runtime with element context, e.g., `${elementName}`.

Unresolved placeholders are left unchanged in the final text.

A **default notification title** (per UI language) looks like:

```text
Analysis Action Triggered Notification: {analysisName}
```

A **default notification content** (per UI language) looks like:

```text
1. Element name: {elementName}
2. Element Path: {elementPath}
3. Corresponding Analysis: {analysisName}
```

:::tip
An analysis's **trigger condition** expression references output attributes using the `attributes['attributeName']` syntax (see [Configuring Actions](../07-real-time-analysis/08-actions.md)), which differs from the text placeholder syntaxes above.
:::

## 13.4.4 Editing an Action Template

To edit an action template, click its name in the list, then click **Edit**, modify the configuration fields, and save. Changes affect only the **defaults used by analyses that reference this template thereafter**; the runtime parameters of already-saved analyses are determined by their own snapshots and configuration overrides and are not retroactively modified (see [13.4.5](#1345-using-action-templates-in-an-analysis)).

:::note
Action templates are system-provided; their action type and name are defined by the system.
:::

## 13.4.5 Using Action Templates in an Analysis

Once configured, an action template is referenced in the **Actions** section (section 5) of the analysis creation form. Each action rule consists of a **trigger condition** and a referenced **action template**; the action runs when the condition is met (a trigger condition left empty is treated as unconditional and runs every time the analysis fires). After referencing a template, you can make local adjustments to the template's configuration; these adjustments apply only to the current analysis and are not written back to the template:

- **Notification**: reselect the contact point, adjust the minimum notification interval, and edit the title and content.
- **Feishu Task**: modify the App ID / App Secret, handlers, title, content, and action body.
- **IDMP Task**: reselect the object type, specify the target object, and edit the comment.
- **Agent Task**: reselect the AI Function and edit the command.

For full details on the analysis-side configuration and runtime behavior, see [Configuring Actions](../07-real-time-analysis/08-actions.md).
