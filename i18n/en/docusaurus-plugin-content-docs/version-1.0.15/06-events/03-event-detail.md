---
title: Event Detail
sidebar_label: Event Detail
---

# 6.3 Event Detail

Clicking an event name — in either the global events view or an element's Events tab — opens the event detail page. The detail page has two tabs: **General** and **Attributes**. The action toolbar differs between tabs.

## 6.3.1 General Tab

The General tab displays all standard event field information and provides entry points for acknowledgment, favorites, root cause analysis, and trend analysis operations.

### 6.3.1.1 Toolbar

The General tab toolbar provides the following action controls.

| Control | Description |
|---|---|
| **Back to List** | Return to the events list |
| **Ack** | Acknowledge the event |
| **Favorite** | Mark this event as a favorite for quick access from the left sidebar |
| **Root Cause Analysis** | Open a root cause analysis view for this event |
| **Trend Chart Analysis** | Open a trend chart for the event's time range on its associated element |
| **Resend** | Manually resend a notification for this event to its configured contact points |

### 6.3.1.2 Fields

The General tab displays the following standard event fields, covering the event's time, associated objects, and status information.

| Field | Description |
|---|---|
| **Name** | Event name, generated from the naming pattern of the event template |
| **Template** | The event template used to create this event |
| **Severity Level** | The severity category |
| **Reason Code** | The reason code, if set |
| **Categories** | Category tags |
| **Description** | Free-text description |
| **Start Time** | When the event began |
| **End Time** | When the event ended (blank if still active) |
| **Duration** | Elapsed time from start to end |
| **Associated Element** | The element on which the triggering analysis runs — click to navigate to it |
| **Associated Analysis** | The analysis rule that generated this event — click to navigate to it |
| **Status** | Acknowledgment status (Unacknowledged / Acknowledged) |

### 6.3.1.3 Expandable Sections

Three collapsible sections appear below the standard fields, providing access to additional event properties, operational annotations, and notification delivery history.

### 6.3.1.4 Properties

Displays additional system-level properties of the event record.

### 6.3.1.5 Annotation

An area for operators to add text annotations related to the event — for example, investigation findings or corrective actions taken. See [Annotations](../11-collaboration/02-annotations.md) for details.

### 6.3.1.6 Notification Record

Displays a complete log of all notifications sent for this event. Each entry shows the contact point name, the delivery timestamp, and the delivery status.

## 6.3.2 Attributes Tab

The Attributes tab displays the event's custom attributes — the named values recorded when the event was created by the analysis — providing access to the business data captured at the time of the event.

### 6.3.2.1 Toolbar

The Attributes tab toolbar provides the following action controls.

| Control | Description |
|---|---|
| **Back to List** | Return to the events list |
| **Categories** | Filter the attribute list by category |
| **Refresh** | Reload the attribute values |
| **Select Columns** | Show or hide columns in the attribute table |

### 6.3.2.2 Attribute Table

The attribute table lists all custom attributes of the event and their values. Each attribute row shows:

| Column | Description |
|---|---|
| **Name** | Attribute name, as defined in the event template |
| **Value** | The value recorded at event creation time |
| **Value Type** | The data type of the value |

These attributes are defined by the event template and populated by the analysis that triggered the event. Attribute values are read-only — they are set when the event is created and cannot be modified.
