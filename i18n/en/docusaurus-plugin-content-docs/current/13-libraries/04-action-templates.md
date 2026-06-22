---
title: Action Templates
sidebar_label: Action Templates
---

# 13.4 Action Templates

An **action template** defines a reusable automated action that [real-time analyses](../07-real-time-analysis/index.md) invoke when a trigger condition is met. For example, when a distribution transformer's analysis outputs an average voltage above a threshold, it can automatically send an alert notification to the operations group. By capturing actions as templates, multiple analyses can reference the same template and adjust its runtime parameters locally within each analysis, without affecting the template itself.

Action templates are managed in **Libraries → Action Templates**.

:::note
This release implements the full configuration and execution logic for the **Notification** action type. This chapter covers Notification action templates.
:::

## 13.4.1 Action Template List

The list shows all defined action templates, with the following columns:

| Column | Description |
|---|---|
| **Name** | The action template name |
| **Action Type** | The action type; shown as **Notification** for the notification type |
| **Categories** | Category tags assigned to the template |
| **Description** | Optional description |

Click a template name to view or edit it. Use the **⋮** menu on a row to edit or delete.

## 13.4.2 Creating an Action Template

Click **+** to create a new action template. All action types share a common set of general information fields, then display the configuration fields specific to the selected **action type**.

### General Information Fields

| Field | Description |
|---|---|
| **Name** (required) | A unique name for the action template. Use concise, descriptive naming — for example, "Voltage Limit Feishu Alert". |
| **Action Type** (required) | The action type. Selecting **Notification** reveals the notification configuration fields below. |
| **Categories** | Optional category tags to organize and filter templates. You can create new tags inline. The category type is **Action Template**. |
| **Description** | Optional free-text description of the action's purpose. |

### Notification Configuration Fields

When the action type is set to **Notification**, the following configuration fields are displayed:

| Field | Description |
|---|---|
| **Contact Point** | The contact point used to send the notification, selected from the system's defined contact points. The contact point itself carries the channel type (email / Feishu / WeCom, etc.), which determines the channel through which the notification is sent. |
| **Minimum Notification Interval (minutes)** | The minimum interval between two consecutive notifications sent by the same RT analysis to the same contact point. Default is 10 minutes. Limits notification frequency when a condition is met continuously, preventing notification overload. |
| **Notification Title** | The notification title. Supports placeholders (see [13.4.3](#1343-placeholders-in-notification-content)). When left blank, a localized default title is used. |
| **Notification Content** | The notification body. Supports placeholders, which are substituted at execution time with the actual information of the RT analysis's element and the output attribute values. |

Click **Save** to create the action template.

## 13.4.3 Placeholders in Notification Content

Both the **Notification Title** and **Notification Content** support placeholders. Placeholders are substituted at action execution time with the actual information of the analysis's element and the output attribute values of the current analysis run. Placeholders use curly-brace syntax `{...}`:

| Placeholder | Substituted with |
|---|---|
| `{elementName}` | The name of the element to which the triggering analysis belongs |
| `{elementPath}` | The full path of that element in the asset tree |
| `{analysisName}` | The name of the triggering RT analysis |
| `{attributeName}` | The computed value of the corresponding output attribute, e.g., `{avg_voltage}` |

Unresolved placeholders are left unchanged in the notification.

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
An analysis's **trigger condition** expression references output attributes using the `attributes['attributeName']` syntax (see [Configuring Actions](../07-real-time-analysis/08-actions.md)), which differs from the `{attributeName}` placeholder syntax used here in notification titles and content. Do not mix the two.
:::

## 13.4.4 Editing and Deleting

To edit an action template, click its name in the list, then click **Edit**. To delete, use the **⋮** menu on the row or the delete button on the detail page.

**Reference check before deletion.** Before an action template is deleted, the system checks whether any RT analysis currently references it. If a reference exists, deletion is rejected and the names of the referencing analyses are listed. You must first remove the reference to the template in the relevant analyses before the template can be deleted.

## 13.4.5 Using Action Templates in an Analysis

Once created, an action template is referenced in the **Actions** section (section 5) of the analysis creation form. Each action rule consists of a **trigger condition** and a referenced **action template**; the action runs when the condition is met. After referencing a template, you can make local adjustments to the notification's contact point, minimum notification interval, title, and content. These adjustments apply only to the current RT analysis and are not written back to the template.

For full details on the analysis-side configuration and runtime behavior, see [Configuring Actions](../07-real-time-analysis/08-actions.md).
