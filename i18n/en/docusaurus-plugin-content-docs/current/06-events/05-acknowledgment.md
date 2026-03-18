---
title: Acknowledgment
sidebar_label: Acknowledgment
---

# 6.5 Acknowledgment


Acknowledgment is the act of a human operator confirming that they have reviewed an event. It serves as an explicit record that the event was seen and acted upon, and it stops the automatic re-notification cycle for that event.

## 6.5.1 How Acknowledgment Works

Whether a specific event requires acknowledgment is determined by the **Allow Acknowledgment** setting in the event template. If this setting is enabled, events created from that template will have an **Unacknowledged** status when first generated.

An unacknowledged event:

- Displays an acknowledgment indicator in the event list (the **A** column)
- Continues to trigger re-notifications on the schedule defined by the element's notification rule
- Appears when the **Unacknowledged** filter toggle is enabled in the events view

Once acknowledged:

- The event status changes to **Acknowledged**
- The acknowledgment indicator updates in the event list
- Re-notifications stop immediately — no further alerts are sent for this event regardless of whether it remains active

## 6.5.2 How to Acknowledge an Event

There are two ways to acknowledge an event:

**From the event list:**

Click the **Acknowledge** action icon on the event row. The status updates immediately.

**From the event detail page:**

Open the event by clicking its name, then click the **Ack** icon in the toolbar on the General tab.

## 6.5.3 Finding Unacknowledged Events

The **Events** item in the main navigation bar displays a badge showing the total number of unacknowledged events in the system. This gives every logged-in user an at-a-glance count of outstanding events that still require attention, visible from any page in IDMP.

The global events view and the element-level events tab both provide an **Unacknowledged** toggle in the toolbar. Enable this toggle to filter the list to only events that still require attention. This is the fastest way for an operator to identify their open action items at the start of a shift.

Unacknowledged events can also be found through saved event filters — create and save a filter with the Unacknowledged toggle enabled, then pin it as a favorite for one-click access.

## 6.5.4 Acknowledgment and Notification Interaction

Acknowledgment and notification are tightly linked. The key behaviors to understand:

- If **Allow Acknowledgment** is disabled on the event template, the event has no acknowledgment requirement, and re-notifications do not occur — the system sends at most one initial notification per event.
- If **Allow Acknowledgment** is enabled, re-notifications continue until the event is acknowledged or closed, or the maximum resend count is reached.
- Acknowledging an event does not close it. An acknowledged event may still be active (no end time). Closing an event is a separate action performed by the analysis when its end condition is met.
- If an event is closed before being acknowledged, re-notifications also stop — the system does not send notifications for closed events.
