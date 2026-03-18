---
title: Alerts and Notifications
sidebar_label: Alerts and Notifications
---

# 6.4 Alerts and Notifications

When an analysis generates an event, TDengine IDMP can automatically send a notification to configured contact points — email addresses, webhooks, messaging platforms, or other channels. This chapter describes how to set up contact points, configure notification rules on elements, and understand how the notification system behaves.

## 6.4.1 Contact Points

A **contact point** is a delivery channel for notifications. Contact points are configured system-wide and then referenced by notification rules on individual elements.

### Managing Contact Points

Contact points are managed in **Admin Console → System Configuration → Notification Contact Point**.

The contact point list shows:

| Column | Description |
|---|---|
| **Name** | A descriptive name for this contact point (e.g., `Jeff_default_contact_point`) |
| **Type** | The delivery channel type (e.g., EMAIL, webhook, Feishu) |
| **Address** | The recipient address or endpoint URL |
| **Description** | Optional description |

To create a new contact point, click **+** and fill in the name, type, address, and description fields. The available types depend on the integrations configured for your IDMP instance.

:::tip
Contact points are shared across the system. The same contact point can be referenced by notification rules on many different elements. Create one contact point per recipient or channel, then reuse it wherever needed.
:::

## 6.4.2 Notification Rules

A **notification rule** defines how and to whom notifications are sent when an event occurs on a specific element. Each element has exactly one notification rule, shared by all events generated on that element.

### Configuring a Notification Rule

To configure the notification rule for an element, navigate to the element in the asset tree, open its **Events** tab, and click the **Notification Rule** icon in the toolbar (the icon showing a document with a bell, second from the right). This opens the Notification Rule dialog showing the current configuration.

Click **Edit** in the dialog to modify the settings. The configurable parameters are:

| Parameter | Description |
|---|---|
| **Contact Point** (required) | The primary delivery channel for event notifications. Select from the pre-configured contact points. |
| **Resend Interval** (required) | How often to re-send a notification for an active, unacknowledged event. For example, set to 1 hour to alert operators every hour until the event is acknowledged or closed. |
| **Escalation Contact Point** | An additional contact point to notify if the event remains unacknowledged for longer than the escalation interval. Used to alert supervisors or on-call staff when first-line operators have not responded. |
| **Escalation Interval** | How long an event must remain unacknowledged before the escalation contact point is notified. |
| **Max Resend Count** | The maximum number of times a single event can trigger a re-notification. Prevents indefinite re-sending for long-running events. |
| **Message** | The notification message body. Supports variable substitution — for example `{elementName}`, `{eventName}`, `{startTime}`, `{severityLevel}`, `{eventUrl}` — to include event-specific information in each notification. |
| **Event Template** | Per-template minimum severity threshold. For each event template listed, specify the lowest severity level that will trigger a notification. Events below the configured severity are suppressed. |

The dialog also has a **Preview Message** button to see how the rendered message looks, and a **Send Message** button to manually dispatch a notification immediately.

## 6.4.3 Notification Behavior

Understanding the notification lifecycle helps you configure the right resend and escalation settings.

### Notification Flow

When an analysis generates an event:

1. **Initial Notification** — The system immediately sends a notification to the configured contact point, subject to the **Minimum Notification Interval** setting on the event template. If a notification was sent recently for an event from the same analysis (within the minimum interval), the initial notification is suppressed to prevent overload.

2. **Resend Mechanism** — If the event requires acknowledgment (configured in the event template) and the event is not acknowledged within the **Resend Interval**, the system sends another notification. This continues until:
   - The event is acknowledged by an operator, or
   - The event is closed (end time is set), or
   - The **Maximum Resend Count** is reached.

3. **Escalation** — If an **Escalation Contact Point** and **Escalation Interval** are configured, and the event remains unacknowledged beyond the escalation interval, the system sends a notification to the escalation contact point in addition to the primary contact point.

4. **Notification Stops** — Once the event is acknowledged or closed, no further notifications are sent for that event.

### Active Events

An event that has occurred but has not yet been closed is called an **active event**. Active events continue to trigger re-notifications according to the notification rule. The event list marks active events to make them easy to identify. Once closed, the system stops all automatic notifications for that event.

### In-App Notification Pop-up

When an event is generated, IDMP shows an in-app **New Event Notification** pop-up in the bottom-right corner of the screen. This pop-up appears for all logged-in users regardless of which page they are viewing. It displays the event name, start time, end time, and severity level, along with the current count of **Unacknowledged Events** in the system. Click the **×** button to dismiss it.

### Delivery History

Every notification attempt — successful or failed — is logged in the **Notification Record** section of the event detail page. This log includes the contact point name, timestamp, and delivery status, providing a complete audit trail of who was notified and when.

## 6.4.4 Notification Rule Template

When elements of the same type all require the same notification setup, you can define a **notification rule template** on the [element template](../03-data-modeling/01-elements.md#316-element-templates) rather than configuring each element individually.

The **Notification Rule Template** tab on an element template exposes the same parameters as a regular notification rule — contact point, resend interval, escalation contact point, escalation interval, max resend count, message, and per-event-template severity thresholds. Configure it once, and every element created from that template inherits the notification rule automatically.
