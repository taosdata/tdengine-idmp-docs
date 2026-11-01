---
title: Alerts and Notifications
sidebar_label: Alerts and Notifications
---

# 6.5 Alerts and Notifications

When an analysis generates an event, TDengine IDMP can automatically send a notification to configured contact points — via email, Feishu, WeCom (Enterprise WeChat), DingTalk, Slack, Microsoft Teams, and other channels. This chapter describes how to set up contact points, configure notification rules on elements, and understand how the notification system behaves.

## 6.5.1 Contact Points

Contact points are the foundational delivery channels of the notification system, configured and managed at the system level. A **contact point** defines the specific delivery target for notifications, and notification rules on individual elements reference contact points to specify the notification delivery channel.

### 6.5.1.1 Managing Contact Points

Contact points are managed centrally in **Admin Console → System Configuration → Notification Contact Point**.

The contact point list displays the following information:

| Column          | Description                                                                        |
| --------------- | ---------------------------------------------------------------------------------- |
| **Name**        | A descriptive name for this contact point (e.g., `Jeff_default_contact_point`)     |
| **Type**        | The delivery channel type (Email, Feishu, WeCom, DingTalk, Slack, Microsoft Teams) |
| **Address**     | The recipient address or endpoint URL                                              |
| **Description** | Optional description                                                               |

To create a new contact point, click **+** and fill in the name, type, address, and description fields. The following channel types are supported:

| Channel Type                  | Description                                                                        |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| **Email**                     | Sends notifications via email. Requires selecting recipient users from the system. |
| **Feishu**                    | Sends notifications via a Feishu custom bot webhook.                               |
| **WeCom (Enterprise WeChat)** | Sends notifications via a WeCom group bot webhook.                                 |
| **DingTalk**                  | Sends notifications via a DingTalk custom bot webhook.                             |
| **Slack**                     | Sends notifications via a Slack Incoming Webhook.                                  |
| **Microsoft Teams**           | Sends notifications via a Microsoft Teams Workflow Webhook.                        |
| **Webhook**                   | Sends a generic JSON notification to any HTTP(S) endpoint.                          |

:::tip
Contact points are shared across the system. The same contact point can be referenced by notification rules on many different elements. Create one contact point per recipient or channel, then reuse it wherever needed.
:::

### 6.5.1.2 Webhook Contact Points

Webhook contact points are a generic delivery channel that sends notifications as JSON to any HTTP(S) endpoint. Unlike platform-specific channels such as Feishu, DingTalk, and Slack, the Webhook channel applies no platform-specific formatting, making it suitable for integrating with your own alerting systems, IT operations platforms, or third-party services.

#### 6.5.1.2.1 Configuration

1. In the contact point list, click **+** and select **Webhook** as the type.
2. In the **Address** field, enter the HTTP(S) URL that receives notifications.
3. Only HTTPS URLs are allowed by default. To send to an HTTP endpoint, enable the **Allow non-HTTPS URL** toggle.

:::note Security validation
To prevent server-side request forgery (SSRF), Webhook URLs are validated: loopback addresses (`127.x.x.x`, `::1`, `localhost`), link-local addresses (`169.254.x.x`), and cloud metadata hostnames are rejected. Private network addresses (`10.x`, `172.16.x`, `192.168.x`) are allowed so you can integrate with on-premises receivers.
:::

#### 6.5.1.2.2 Message body format

The message body for a Webhook contact point is edited in JSON format and supports variable substitution — placeholders are replaced with the corresponding event field values. In the notification rule message editor, when a Webhook contact point is selected, a **View JSON example** entry appears next to the message label for quick access to the template.

A typical JSON message body looks like this:

```json
{
  "elementName": "{elementName}",
  "elementPath": "{elementPath}",
  "eventName": "{eventName}",
  "analysisName": "{analysisName}",
  "startTime": "{startTime}",
  "endTime": "{endTime}",
  "ackRequired": "{ackRequired}",
  "severityLevel": "{severityLevel}",
  "unAckedEventCount": "{unAckedEventCount}",
  "eventUrl": "{eventUrl}",
  "reasonCodeDisplayName": "{reasonCodeDisplayName}",
  "eventRealtimeValues": "{eventRealtimeValues}",
  "eventCustomAttributes": "{eventCustomAttributes}"
}
```

The supported variables are:

| Placeholder               | Description                 |
| ------------------------- | --------------------------- |
| `{elementName}`           | Element name                |
| `{elementPath}`           | Element path                |
| `{eventName}`             | Event name                  |
| `{analysisName}`          | Corresponding analysis      |
| `{startTime}`             | Start time                  |
| `{endTime}`               | End time                    |
| `{ackRequired}`           | Acknowledgment required     |
| `{severityLevel}`         | Severity level              |
| `{unAckedEventCount}`     | Unacknowledged event count  |
| `{eventUrl}`              | Event URL                   |
| `{reasonCodeDisplayName}` | Reason code                 |
| `{eventRealtimeValues}`   | Event realtime values       |
| `{eventCustomAttributes}` | Event custom attributes     |

#### 6.5.1.2.3 Payload

When an event triggers a notification, the system sends a JSON request to the Webhook address via HTTP POST with the following body structure:

```json
{
  "title": "Notification title",
  "data": {
    "content": "Raw message body string (after variable substitution)",
    "contentJson": {
      "elementName": "actual element name",
      "eventName": "actual event name"
    }
  }
}
```

| Field               | Description                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| `title`             | Notification title (after variable substitution).                                              |
| `data.content`      | Raw message body string, always present.                                                       |
| `data.contentJson`  | Present only when the message body is a valid JSON object or array; the parsed native JSON value. Otherwise omitted. |

Therefore, by configuring the message body as valid JSON (as in the example above), the receiver can read the `data.content` string or directly access the `data.contentJson` structured object without parsing it themselves.

## 6.5.2 Notification Rules

Notification rules define element-level event notification policies. **An element can have multiple independent notification rules**, each deciding its own matching criteria, contact points, message content, non-repetition suppression, resend, and escalation settings. A single event can match multiple rules at the same time — each rule then delivers independently and keeps its own suppression and resend history, while sharing the event's acknowledgment state: once the event is acknowledged, the follow-up reminders of all its notification instances stop together.

### 6.5.2.1 Managing Notification Rules

The notification rule configuration is accessed from the element's Events tab toolbar. Navigate to the target element in the asset tree, open its **Events** tab, and click the **Notification Rule** icon in the toolbar (the icon showing a document with a bell). The system opens the notification rule panel on the right side of the page, listing all effective rules for the element along with the rule count. Notification rules on an element only affect that element; to manage them at the type level, use [notification rule templates](#654-notification-rule-template).

The rule list displays the following information:

| Column     | Description                                                                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**   | Rule name, unique within the element's effective rule set                                                                                    |
| **Criteria** | Summary of the matching criteria — source mode (Analysis / Event Search), main filter fields, and whether an attribute condition is configured |
| **State**  | Enabled / Disabled                                                                                                                            |
| **Source** | Rule origin: **Template** (inherited from the element template), **Template (modified)** (inherited with local overrides), **Element** (created independently on the element) |

The following operations are available for each rule:

| Operation                          | Description                                                                                                                             |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **New Notification Rule**          | Create an independent rule on the element, with source "Element"                                                                        |
| **View / Edit**                    | Open the rule editor to view or modify the settings                                                                                      |
| **Enable / Disable**               | Toggle this rule on or off without affecting other rules                                                                                |
| **Delete**                         | Only independent rules with source "Element" can be deleted; template-derived rules can only be disabled                                  |
| **Restore to Template Values**     | Available only for rules with source "Template (modified)" — discards local overrides and reverts content fields to the current template definition; the enabled state is preserved |

### 6.5.2.2 Rule Parameters

The following parameters are configurable in the rule editor:

| Parameter                      | Description                                                                                                                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name** (required)            | Rule name, unique within the element's effective rule set                                                                                                                                                                       |
| **Contact Point** (required)   | The primary delivery channel for event notifications, selected from the pre-configured contact points. No contact point is pre-selected by default                                                                               |
| **Escalation Contact Point**   | Optional. When an event remains unacknowledged for a long time, resends are redirected to this contact point — used to alert supervisors or on-call staff when first-line operators have not responded                            |
| **Non-Repetition Interval**    | The cross-event suppression window for the same element and same rule, default 30 minutes. Set to **Unrestricted** to disable cross-event suppression; otherwise 10 seconds to 30 days                                            |
| **Resend Interval** (required) | How often to re-send a notification for an active, unacknowledged event, default 1 hour, 10 seconds to 30 days. For example, set to 1 hour to alert operators every hour until the event is acknowledged or closed                |
| **Escalation Interval**        | How long an event must remain unacknowledged before the resend target switches to the escalation contact point, default 10 hours. Effective only when an escalation contact point is configured, 10 seconds to 30 days             |
| **Max Resend Count**           | The maximum number of business resends after the initial send, default 5, an integer from 0 to 100. 0 means no resend after the initial notification, preventing indefinite re-sending for long-running events                    |
| **Title**                      | Notification title, supports variable substitution; falls back to the default title when left blank (e.g., `Notification: {elementName} - {eventName}`)                                                                          |
| **Message**                    | The notification message body, supports variable substitution — see [Message body format](#65122-message-body-format) for available placeholders. The default body has 12 items: element name and path first, event URL second |
| **Criteria**                   | The rule's matching criteria, deciding which events trigger this rule's notifications — see the [next section](#6523-matching-criteria)                                                                                          |

### 6.5.2.3 Matching Criteria

Each rule contains one **criteria** with two mutually exclusive modes:

**Analysis** (default) — matches events by their source real-time analysis:

| Field                 | Description                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Analysis**          | Single-select the real-time analysis that triggers notifications; **All** is available                                                                                                            |
| **Child Event**       | The child event notification strategy, compared against the history within the same element, same rule, same analysis, and same root event process: **when severity is higher than all previously triggered conditions** (default), **when severity is higher than the previous trigger**, or **when any trigger matches** |
| **Minimum Severity**  | Optional **All** or a specific severity level; the event level must be greater than or equal to this threshold to match                                                                            |
| **Attribute Condition** | See below                                                                                                                                                                                         |

**Event Search** — matches events by their own fields, using the same interactions as event search:

| Field                 | Description                                              |
| --------------------- | -------------------------------------------------------- |
| **Event Template**    | Single-select; **All** is available                      |
| **Category**          | Single-select; **All** is available                      |
| **Name Contains**     | Matches by event name substring; empty means no filter   |
| **Minimum Severity**  | Optional **All** or a specific severity level; the event level must be greater than or equal to this threshold to match |
| **Attribute Condition** | See below                                              |

An **attribute condition** further filters on the event's attribute snapshot at first evaluation: each row consists of an **attribute**, a comparison operator (equals, not equals, greater than, greater than or equal, less than, less than or equal, contains), and a **value**; multiple rows combine with **AND** or **OR**. When no attribute condition is configured, all events match; a missing attribute value or incompatible type makes the row evaluate to false.

### 6.5.2.4 Input Validation

The following validations run when saving a rule:

| Validation                                | Behavior                                                                                                                                              |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enabled rules require a primary contact point | Saving fails when it is missing. You can disable the rule first to save it as a draft; the system never auto-selects a contact point                        |
| Interval range                            | Non-repetition, resend, and escalation intervals must be between 10 seconds and 30 days; the non-repetition interval can be set to **Unrestricted**     |
| Resend vs. non-repetition                 | When resending is active (max resend count greater than 0), the resend interval must be greater than the non-repetition interval; not compared when not resending or when non-repetition is **Unrestricted** |
| Escalation configuration                  | When no escalation contact point is configured, the escalation interval is not validated and no escalation sends occur                                 |
| Name uniqueness                           | Rule names must be unique within the element's effective rule set                                                                                     |

### 6.5.2.5 Preview and Try-Send

- **Preview**: select a sample event in the editor and run the preview — the backend evaluates the criteria and renders the title and body. Preview sends no messages and does not advance the non-repetition clock or resend counters. Results list each criteria field's **rule value**, **sample event value**, and **outcome**, so the reason for a non-match is directly visible.
- **Send Message**: an explicit try-send that renders the title and body from the selected sample event exactly like a formal alert and really dispatches one test notification, useful for verifying contact points and message format. A primary contact point must be selected first — an error is raised when it is missing or has been deleted. Try-send does not evaluate the matching criteria — it is not affected by the minimum severity, child event strategy, attribute conditions, or the non-repetition window; it creates no notification delivery record and does not count toward resends.

## 6.5.3 Notification Behavior

The notification system follows a complete lifecycle from rule evaluation through initial delivery, resend, escalation, and termination. Understanding the notification lifecycle helps configure the appropriate non-repetition, resend, and escalation settings.

### 6.5.3.1 Event Evaluation

After an event is generated and its first attribute preparation completes, the system resolves all effective rules for the event's **actual element** and evaluates them one by one — including rules created on the element and rules inherited from templates. Evaluation uses the attribute snapshot taken when the event occurred:

- New events generated by real-time analyses enter evaluation automatically;
- Manually created events must check **Evaluate notification rules** in the creation dialog (unchecked by default);
- Events produced by CSV import or replay are excluded by default;
- Modifying rules, changing an existing event's time/attributes/reason codes, or backfilling previously missing attribute values never triggers re-evaluation.

### 6.5.3.2 Notification Flow

The notification flow describes the automated notification delivery logic executed by the system after an event is generated:

1. **Rule Evaluation** — A single event can match multiple rules at once; each matched rule forms an independent notification instance, even when the target contact point is the same (no merging). When no rule matches, no notification is produced.

2. **Initial Notification** — Each instance first passes the child event strategy (Analysis mode, see [Matching Criteria](#6523-matching-criteria)) and the non-repetition window check, then sends the first notification to the primary contact point. Suppressed alerts record the suppression reason (visible in the [notification records](#6536-notification-records)) and are never queued or sent later.

3. **Resend Mechanism** — If the event requires acknowledgment (configured in the event template) and is not acknowledged within the **Resend Interval**, the system keeps sending notifications at the resend interval until:
   - The event is acknowledged by an operator, or
   - The event is closed (end time is set), or
   - The **Max Resend Count** is reached.

   Technical retries caused by channel failures do not count toward business resends.

4. **Escalation** — If an **Escalation Contact Point** is configured and the event remains unacknowledged beyond the **Escalation Interval**, subsequent business resends are redirected to the escalation contact point — escalation switches the resend target rather than sending an extra copy alongside the primary contact point. No escalation sends occur without an escalation contact point.

5. **Notification Stops** — Once the event is acknowledged or closed, no further notifications are sent for any of the event's notification instances.

6. **Recovery Notification** — When the event closes, the contact points that actually received the alert (deduplicated) receive a recovery notification. Recovery notifications are not constrained by the non-repetition window and do not advance its clock; instances whose initial send never succeeded do not produce a recovery notification.

### 6.5.3.3 Non-Repetition Window

The **non-repetition interval** is a cross-event suppression window scoped to the same element and the same rule: after an initial notification is successfully sent, new events within the window are suppressed even if they match the criteria, preventing notification overload when events fire frequently. Two exceptions apply:

- The previous event has been acknowledged;
- The previous event does not require acknowledgment (the event template does not enable **Allow Acknowledgment**).

Alerts suppressed within the window leave their reason in the notification records and are never sent later because a subsequent event was acknowledged. Setting the non-repetition interval to **Unrestricted** disables cross-event suppression.

### 6.5.3.4 Active Events

An active event is one that has occurred but has not yet been closed. Active events continue to trigger re-notifications according to the notification rule. The event list marks active events to make them easy to identify. Once closed, the system stops all automatic notifications for that event.

### 6.5.3.5 In-App Notification Pop-up

When an event is generated, IDMP displays an in-app **New Event Notification** pop-up in the bottom-right corner of the screen, enabling all logged-in users to stay informed of newly occurred events in real time. The pop-up appears regardless of which page the user is currently viewing. It displays the event name, start time, end time, and severity level, along with the current count of **Unacknowledged Events** in the system. Click the **×** button to dismiss it.

### 6.5.3.6 Notification Records

Notification records provide a complete notification audit trail, located in the **Notification Record** tab at the bottom of the event detail page. Every notification attempt — successful, failed, or suppressed — appears as one row per actual delivery, with these main columns:

| Column         | Description                                                                                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rule**       | Rule name snapshot at notification time, source (Template / Template (modified) / Element), and revision; later renames or deletions do not affect history rows   |
| **Contact Point** | Name snapshot of the contact point actually used, plus its role (primary / escalation)                                                                       |
| **Notification Time** | For successful rows, the channel success time; for failed rows, the attempt time; pending and suppressed rows show the planned/decision time instead of fabricating a notified time |
| **Delivery Type** | Alert / Resend / Recovery                                                                                                                                     |
| **Result**     | Pending / Claimed / Success / Failed / Cancelled / Unknown / Waiting / New                                                                                      |
| **Error**      | Error summary for failures                                                                                                                                      |

Multiple rules matched by the same event, different contact points of the same rule, and multiple resends to the same contact point each occupy their own row without merging. Suppressed rows are marked **Suppressed** with the specific reason (for example, within the non-repetition window, below the historical maximum severity, below the previous notification level, event acknowledged, or event closed). Each row can be expanded to view the details of individual technical attempts.

### 6.5.3.7 Manual Resend

The **Resend** button in the event detail toolbar and the **Send Notification** item in the event list row menu manually re-dispatch notifications: the system creates one resend task for each alert instance of the event and sends them using each instance's content snapshot from its first send. Manual resend is not limited by the **Max Resend Count**.

The following cases fail with an explicit error instead of sending empty content: the event has been acknowledged, the event has been closed, or the event has no resendable notification instances (for example, events with no rule match at evaluation time). When an instance's rule has been deleted or disabled, or its contact point is missing, only that instance is skipped and the rest are still sent.

## 6.5.4 Notification Rule Template

Notification rule templates support defining notification policies at the element template level, avoiding repetitive per-element configuration. When elements of the same type all require the same notification setup, maintain a set of template rules in the **Notification Rule Template** tab of the [element template](../03-data-modeling/01-elements.md#316-element-templates) — the parameters match notification rules on elements (see [Rule Parameters](#6522-rule-parameters)), plus the following template-specific behaviors:

- **Enable notification rules when created from template**: a creation-time initial value on each template rule. When an element is created from the template, or when the template later adds a rule, the initial enabled state of the corresponding rule on the element takes this field's value at that moment; later changes to the field do not affect existing elements. Template rules themselves have no runtime enable toggle.
- The current enabled state of each rule on an element is stored independently in the system — it does not follow template content changes and is not part of the asset's version history; creating a new element from the template does not copy a full rule snapshot.
- Changes to regular template fields (intervals, message, and so on) propagate to elements that have not overridden that field; editing a template rule on an element saves only the explicitly modified fields, and the rule source becomes **Template (modified)**; **Restore to Template Values** discards local overrides, reverting the content fields to the current template definition while keeping the element's current enabled state.
- Template-sourced rules cannot be deleted on elements, only disabled; when the template deletes a rule, the overrides and enable-state associations on elements are cleaned up together, while historical notification records are preserved.

The template rule list shows each rule's enable statistics across derived elements (**Enabled on x / N elements**). In **Element Enable Management**, you can batch enable or disable rules per element or per element subtree: elements missing a primary contact point are skipped and listed with the reason — the batch neither fails as a whole nor enables anything silently.
