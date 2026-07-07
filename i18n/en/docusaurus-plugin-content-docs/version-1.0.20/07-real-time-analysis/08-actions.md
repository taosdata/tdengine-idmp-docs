---
title: Configuring Actions
sidebar_label: Configuring Actions
---

# 7.8 Configuring Actions

The Actions section (section 5 of the analysis form) lets an RT analysis automatically run predefined actions each time it fires and a specified condition is met. Actions are configured by referencing an [action template](../13-libraries/04-action-templates.md): the template defines *what* to do, while the action rule on the RT analysis side defines *when* to do it, along with local parameter adjustments that apply to this analysis only.

**Typical scenario:** An RT analysis on a distribution transformer element outputs an average voltage `avg_voltage` every 5 minutes. You want to automatically send an alert notification to the operations group whenever `avg_voltage` exceeds 235. Simply create a notification action template in the libraries, then add one action rule in section 5 of the analysis that references the template, and set the trigger condition to `attributes['avg_voltage'] > 235`.

:::note
This release implements the full configuration and execution logic for the **Notification** action type. This chapter covers configuring notification actions.
:::

## 7.8.1 Action Rules

The Actions section consists of one or more **action rules**. Click **Add Action** to add a rule. Each rule has two required parts:

| Part | Description |
|---|---|
| **Trigger Condition** (required) | A condition expression that determines whether the action runs for the current output. The expression cannot be empty. |
| **Action Template** (required) | The referenced action template. Once selected, the template's action type and description are shown read-only, and the template's editable configuration is expanded. |

You can add multiple action rules to the same RT analysis; the rules are independent and evaluated in order. Click **Delete** on a rule to remove it.

## 7.8.2 Trigger Condition

The trigger condition references the analysis's output attributes using the `attributes['attributeName']` syntax, and must evaluate to a boolean. Click the condition input box to open the condition editor and build the expression by selecting output attributes.

| Expression example | Meaning |
|---|---|
| `attributes['avg_voltage'] > 235` | Runs the action when the average voltage exceeds 235 |
| `attributes['max_current'] > 50 && attributes['avg_voltage'] > 220` | Runs when both conditions are met |

**The condition is required and uses a conservative (fail-closed) policy:** the action runs only when the condition expression explicitly evaluates to true. The action is **not** run in any of the following cases:

- The condition expression is left empty.
- An attribute referenced by the expression has no available latest value.
- The expression has a syntax error or evaluates to a non-boolean result.

:::note
Attribute references in the trigger condition use the `attributes['attributeName']` syntax, which differs from the `{attributeName}` placeholder syntax used in notification titles and content (see [13.4.3](../13-libraries/04-action-templates.md#1343-placeholders-in-notification-content)). The former is for condition evaluation; the latter is for text interpolation.
:::

## 7.8.3 Notification Configuration

After referencing a **Notification** action template, the rule expands the following editable fields. These fields are initialized from the template's preset values; changes made here apply only to the current RT analysis and are **not written back to the template**:

| Field | Description |
|---|---|
| **Contact Point** | The contact point used to send the notification; can be reselected here. When the template does not specify a contact point, the first one in the list is selected by default. |
| **Minimum Notification Interval (minutes)** | The minimum interval between two consecutive notifications sent by the same RT analysis to the same contact point; can be adjusted here. |
| **Notification Title** | The notification title; can be edited here. Supports placeholders, and uses the default title when left blank. |
| **Notification Content** | The notification body; can be edited here. Supports placeholders. |

For the placeholder syntax and default text of the notification title and content, see [Action Templates - Placeholders in Notification Content](../13-libraries/04-action-templates.md#1343-placeholders-in-notification-content).

## 7.8.4 Snapshots and Configuration Override

When the RT analysis is saved, the system reads the template by the referenced template ID and saves the template's **name, action type, description, and categories** as a snapshot in the action rule. These general fields are backfilled from the template's current values and the submitted form values are not trusted. Local adjustments to individual fields (such as reselecting the contact point or editing the notification content) are saved together with the analysis as a **configuration override**.

As a result:

- When the RT analysis is reopened, the action rule directly displays the saved snapshot and configuration override, **independent of the template's current state** — even if the template is later modified, the runtime parameters of the saved RT analysis remain unchanged.
- Even if the referenced template is later deleted, the RT analysis can still display and run based on the saved snapshot and configuration override.

## 7.8.5 Runtime Execution

Each time the RT analysis fires and produces output, the system runs the actions in order, rule by rule. For each action rule:

1. **Evaluate the trigger condition.** The condition is evaluated according to the rules in [7.8.2](#782-trigger-condition); execution continues only when the result is true, otherwise the rule is skipped.
2. **Throttle check.** For a notification action, the last-send time is checked using the key "analysis + action template + contact point". If less than the **minimum notification interval** has elapsed since the last send, the current send is skipped.
3. **Render and send.** The notification title and content are rendered by substituting placeholders (with the element name, element path, analysis name, and output attribute values), then the notification is sent through the channel of the selected contact point.

**Failure isolation.** Each action runs independently. A failure in a single action (e.g., contact point not found, channel not supported) is only logged; it does not affect the other actions of the same analysis, nor the analysis's own computation and output writing.

## 7.8.6 Backward Compatibility

| Scenario | Behavior |
|---|---|
| An older RT analysis has no action configuration | No action runs; behavior is the same as before. |
| The trigger condition does not evaluate to true | The action is skipped (conservative policy, see [7.8.2](#782-trigger-condition)). |
| The referenced template has been deleted | The action displays and runs based on the saved snapshot and configuration override. |
| An action throws an exception during execution | It is logged and skipped, without affecting the other actions or the main RT analysis flow. |
