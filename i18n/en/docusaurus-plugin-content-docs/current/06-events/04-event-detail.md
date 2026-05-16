---
title: Event Detail
sidebar_label: Event Detail
---

# 6.4 Event Detail

Clicking an event name — in either the global events view or an element's Events tab — opens the event detail page. The top of the page is the **General Information** area, which shows all standard event fields and provides an action toolbar; the bottom is a row of five tabs: **Attributes**, **Associated Attributes**, **Annotations**, **Notification Record**, and **Child Events**.

## 6.4.1 General Information

The General Information area displays all standard event fields and provides entry points for acknowledgment, adding to groups, root cause analysis, and analysis chart operations.

### 6.4.1.1 Toolbar

The General Information toolbar provides the following action controls.

| Control | Description |
|---|---|
| **Back to List** | Return to the events list |
| **Ack** | Acknowledge the event |
| **Add to Group** | Add this event to one or more custom groups for quick access from the left sidebar |
| **Root Cause Analysis** | Open a root cause analysis view for this event |
| **Analysis Chart** |  Add to Analysis Chart for the event's time range on its associated element |
| **Resend** | Manually resend a notification for this event to its configured contact points |

### 6.4.1.2 Fields

The General Information area shows the following standard event fields, covering the event's time, associated objects, trigger context, and status.

| Field | Description |
|---|---|
| **Name** | Event name, generated from the naming pattern of the event template; a child event's name appends the trigger name suffix to the parent event name |
| **Template** | The event template used to create this event |
| **Severity Level** | The severity category |
| **Reason Code** | The reason code, if set |
| **Categories** | Category tags |
| **Description** | Free-text description |
| **Operating Reason** | The specific reason that triggered this event — for an ordinary event, the analysis condition that fired; for a child event, the trigger rule that matched and its expression |
| **Current Value** | The value of the attribute that satisfied the trigger condition at the moment the event fired |
| **Start Time** | When the event began |
| **End Time** | When the event ended (blank if still active) |
| **Associated Element(s)** | The element(s) involved in the analysis that triggered this event — click to navigate. An analysis may span multiple elements, so this field is a list. |
| **Associated Analysis** | The analysis rule that generated this event — click to navigate to it |
| **Parent Event** | For a child event, the parent event it belongs to — click to navigate; blank for ordinary events |
| **Status** | Acknowledgment status (Unacknowledged / Acknowledged) |
| **Acknowledged By** | The user and time of acknowledgment (if any) |

## 6.4.2 Bottom Tabs

Below the General Information area, five tabs provide access to extended event information — event attributes, associated attributes, operational annotations, notification delivery history, and the list of child events.

### 6.4.2.1 Attributes

The **Attributes** tab shows the named values that the analysis captured onto the event record when it created the event — that is, the entries in the stream computation window's output configuration that are designated to be **written to event attributes**. They are defined by the [event template](./01-event-templates.md) and populated by the analysis that triggered the event. Typical uses include recording key data at the time of the event, such as the peak temperature during an exceedance or the batch ID at the time of a fault.

| Column | Description |
|---|---|
| **Name** | Attribute name, as defined in the event template |
| **Value** | The value recorded at event creation time |
| **Value Type** | The data type of the value |

Attribute values are read-only — they are set when the event is created and cannot be modified afterward. The toolbar supports filtering by category, refreshing, and selecting visible columns.

### 6.4.2.2 Associated Attributes

The **Associated Attributes** tab shows the element attributes related to the analysis window, along with the entries in the window's calculation output configuration that are designated to be **written to element attributes** — that is, the aggregated calculation results that the analysis writes back to the associated element's attribute list at the same time the event is produced.

Event attributes and calculation output attributes come from the same window output configuration, differing only in their write target:

- **Event attributes** are stored with the event and are visible only on the event record.
- **Associated attributes** enter the element's time-series data and are available to downstream consumers such as dashboards and analysis charts.

In the Associated Attributes tab of the event detail page, each entry shows the attribute name, the recorded value, and the value type — making it convenient to view both the "event-side record" and the "time-series record" of the calculation output in one place.

### 6.4.2.3 Annotations

The Annotations tab lets operators add text annotations related to the event — for example, investigation findings or corrective actions taken. See [Annotations](../11-collaboration/02-annotations.md) for details.

### 6.4.2.4 Notification Record

The Notification Record shows a complete log of all notifications sent for this event. Each entry shows the contact point name, the delivery timestamp, and the delivery status.

### 6.4.2.5 Child Events

**Visible only on a parent event** — lists all child events under this parent, with the same columns as the [Browsing Events](./03-browsing-events.md) list; click any row to navigate to the corresponding child event's detail page. For the rules of parent/child event production, naming, and time ranges, see [6.2 Child Events](./02-child-events.md).
