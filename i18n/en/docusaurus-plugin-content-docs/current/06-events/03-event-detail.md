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

<table>
<colgroup><col style="width:14em"/><col/></colgroup>
<thead><tr><th>Control</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Back to List</strong></td><td>Return to the events list</td></tr>
<tr><td><strong>Ack</strong></td><td>Acknowledge the event</td></tr>
<tr><td><strong>Favorite</strong></td><td>Mark this event as a favorite for quick access from the left sidebar</td></tr>
<tr><td><strong>Root Cause Analysis</strong></td><td>Open a root cause analysis view for this event</td></tr>
<tr><td><strong>Trend Chart Analysis</strong></td><td>Open a trend chart for the event's time range on its associated element</td></tr>
<tr><td><strong>Resend</strong></td><td>Manually resend a notification for this event to its configured contact points</td></tr>
</tbody>
</table>

### 6.3.1.2 Fields

The General tab displays the following standard event fields, covering the event's time, associated objects, and status information.

<table>
<colgroup><col style="width:13em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>Event name, generated from the naming pattern of the event template</td></tr>
<tr><td><strong>Template</strong></td><td>The event template used to create this event</td></tr>
<tr><td><strong>Severity Level</strong></td><td>The severity category</td></tr>
<tr><td><strong>Reason Code</strong></td><td>The reason code, if set</td></tr>
<tr><td><strong>Categories</strong></td><td>Category tags</td></tr>
<tr><td><strong>Description</strong></td><td>Free-text description</td></tr>
<tr><td><strong>Start Time</strong></td><td>When the event began</td></tr>
<tr><td><strong>End Time</strong></td><td>When the event ended (blank if still active)</td></tr>
<tr><td><strong>Duration</strong></td><td>Elapsed time from start to end</td></tr>
<tr><td><strong>Associated Element</strong></td><td>The element on which the triggering analysis runs — click to navigate to it</td></tr>
<tr><td><strong>Associated Analysis</strong></td><td>The analysis rule that generated this event — click to navigate to it</td></tr>
<tr><td><strong>Status</strong></td><td>Acknowledgment status (Unacknowledged / Acknowledged)</td></tr>
</tbody>
</table>

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

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Control</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Back to List</strong></td><td>Return to the events list</td></tr>
<tr><td><strong>Categories</strong></td><td>Filter the attribute list by category</td></tr>
<tr><td><strong>Refresh</strong></td><td>Reload the attribute values</td></tr>
<tr><td><strong>Select Columns</strong></td><td>Show or hide columns in the attribute table</td></tr>
</tbody>
</table>

### 6.3.2.2 Attribute Table

The attribute table lists all custom attributes of the event and their values. Each attribute row shows:

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>Column</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>Attribute name, as defined in the event template</td></tr>
<tr><td><strong>Value</strong></td><td>The value recorded at event creation time</td></tr>
<tr><td><strong>Value Type</strong></td><td>The data type of the value</td></tr>
</tbody>
</table>

These attributes are defined by the event template and populated by the analysis that triggered the event. Attribute values are read-only — they are set when the event is created and cannot be modified.
