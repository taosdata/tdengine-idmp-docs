---
title: Alerts and Notifications
sidebar_label: Alerts and Notifications
---

# 6.4 Alerts and Notifications

When an analysis generates an event, TDengine IDMP can automatically send a notification to configured contact points — email addresses, webhooks, messaging platforms, or other channels. This chapter describes how to set up contact points, configure notification rules on elements, and understand how the notification system behaves.

## 6.4.1 Contact Points

Contact points are the foundational delivery channels of the notification system, configured and managed at the system level. A **contact point** defines the specific delivery target for notifications, and notification rules on individual elements reference contact points to specify the notification delivery channel.

### 6.4.1.1 Managing Contact Points

Contact points are managed centrally in **Admin Console → System Configuration → Notification Contact Point**.

The contact point list displays the following information:

<table>
<colgroup><col style="width:9em"/><col/></colgroup>
<thead><tr><th>Column</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>A descriptive name for this contact point (e.g., <code>Jeff_default_contact_point</code>)</td></tr>
<tr><td><strong>Type</strong></td><td>The delivery channel type (e.g., EMAIL, webhook, Feishu)</td></tr>
<tr><td><strong>Address</strong></td><td>The recipient address or endpoint URL</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description</td></tr>
</tbody>
</table>

To create a new contact point, click **+** and fill in the name, type, address, and description fields. The available types depend on the integrations configured for your IDMP instance.

:::tip
Contact points are shared across the system. The same contact point can be referenced by notification rules on many different elements. Create one contact point per recipient or channel, then reuse it wherever needed.
:::

## 6.4.2 Notification Rules

Notification rules define element-level event notification policies, including notification channels, resend mechanisms, and escalation paths. A **notification rule** defines how and to whom notifications are sent when an event occurs on a specific element. Each element has exactly one notification rule, shared by all events generated on that element.

### 6.4.2.1 Configuring a Notification Rule

The notification rule configuration is accessed from the element's Events tab toolbar. Navigate to the target element in the asset tree, open its **Events** tab, and click the **Notification Rule** icon in the toolbar (the icon showing a document with a bell, second from the right). The system opens the Notification Rule dialog showing the current configuration.

Click **Edit** in the dialog to modify the settings. The configurable parameters are:

<table>
<colgroup><col style="width:17em"/><col/></colgroup>
<thead><tr><th>Parameter</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Contact Point</strong> (required)</td><td>The primary delivery channel for event notifications. Select from the pre-configured contact points.</td></tr>
<tr><td><strong>Resend Interval</strong> (required)</td><td>How often to re-send a notification for an active, unacknowledged event. For example, set to 1 hour to alert operators every hour until the event is acknowledged or closed.</td></tr>
<tr><td><strong>Escalation Contact Point</strong></td><td>An additional contact point to notify if the event remains unacknowledged for longer than the escalation interval. Used to alert supervisors or on-call staff when first-line operators have not responded.</td></tr>
<tr><td><strong>Escalation Interval</strong></td><td>How long an event must remain unacknowledged before the escalation contact point is notified.</td></tr>
<tr><td><strong>Max Resend Count</strong></td><td>The maximum number of times a single event can trigger a re-notification. Prevents indefinite re-sending for long-running events.</td></tr>
<tr><td><strong>Message</strong></td><td>The notification message body. Supports variable substitution — for example <code>{elementName}</code>, <code>{eventName}</code>, <code>{startTime}</code>, <code>{severityLevel}</code>, <code>{eventUrl}</code> — to include event-specific information in each notification.</td></tr>
<tr><td><strong>Event Template</strong></td><td>Per-template minimum severity threshold. For each event template listed, specify the lowest severity level that will trigger a notification. Events below the configured severity are suppressed.</td></tr>
</tbody>
</table>

The dialog also has a **Preview Message** button for viewing how the rendered message looks, and a **Send Message** button for manually dispatching a notification immediately.

## 6.4.3 Notification Behavior

The notification system follows a complete lifecycle from initial delivery through resend, escalation, and termination. Understanding the notification lifecycle helps configure the appropriate resend and escalation settings.

### 6.4.3.1 Notification Flow

The notification flow describes the automated notification delivery logic executed by the system after an event is generated. When an analysis generates an event:

1. **Initial Notification** — The system immediately sends a notification to the configured contact point, subject to the **Minimum Notification Interval** setting on the event template. If a notification was sent recently for an event from the same analysis (within the minimum interval), the initial notification is suppressed to prevent overload.

2. **Resend Mechanism** — If the event requires acknowledgment (configured in the event template) and the event is not acknowledged within the **Resend Interval**, the system sends another notification. This continues until:
   - The event is acknowledged by an operator, or
   - The event is closed (end time is set), or
   - The **Maximum Resend Count** is reached.

3. **Escalation** — If an **Escalation Contact Point** and **Escalation Interval** are configured, and the event remains unacknowledged beyond the escalation interval, the system sends a notification to the escalation contact point in addition to the primary contact point.

4. **Notification Stops** — Once the event is acknowledged or closed, no further notifications are sent for that event.

### 6.4.3.2 Active Events

An active event is one that has occurred but has not yet been closed. Active events continue to trigger re-notifications according to the notification rule. The event list marks active events to make them easy to identify. Once closed, the system stops all automatic notifications for that event.

### 6.4.3.3 In-App Notification Pop-up

When an event is generated, IDMP displays an in-app **New Event Notification** pop-up in the bottom-right corner of the screen, enabling all logged-in users to stay informed of newly occurred events in real time. The pop-up appears regardless of which page the user is currently viewing. It displays the event name, start time, end time, and severity level, along with the current count of **Unacknowledged Events** in the system. Click the **×** button to dismiss it.

### 6.4.3.4 Delivery History

Delivery history provides a complete notification audit trail. Every notification attempt — successful or failed — is logged in the **Notification Record** section of the event detail page. This log includes the contact point name, timestamp, and delivery status.

## 6.4.4 Notification Rule Template

Notification rule templates support defining notification policies at the element template level, avoiding repetitive per-element configuration. When elements of the same type all require the same notification setup, a **notification rule template** can be defined on the [element template](../03-data-modeling/01-elements.md#316-element-templates).

The **Notification Rule Template** tab on an element template exposes the same parameters as a regular notification rule — contact point, resend interval, escalation contact point, escalation interval, max resend count, message, and per-event-template severity thresholds. Configure it once, and every element created from that template inherits the notification rule automatically.
