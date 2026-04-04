---
title: Events
sidebar_label: Events
---

# 6 Events

An event in TDengine IDMP is a discrete operational occurrence with a defined start time, end time, and duration — the digital record that something happened. A pump tripped, a temperature exceeded its limit, a batch phase completed, a maintenance window began. This concept is equivalent to **event frames** in AVEVA PI System, one of the most powerful ideas in industrial data management.

Raw sensor streams provide a measurement value at a given moment; events record what was happening operationally — and for how long. Instead of searching through millions of data points to find when a compressor ran in surge, querying the structured event record that already captured it is sufficient.

## Events in the AI Era

Events matter even more as AI becomes central to industrial operations. AI and machine learning systems work best when data is structured and contextualized — and that is exactly the capability that events provide. Compared to feeding a model millions of raw sensor readings, providing structured records is far more effective: "Compressor Surge, Start: 10:23:15, Duration: 12 seconds, Severity: High." That context is what turns signal data into something a model can reason about.

Events directly enable the industrial AI use cases that matter most: training predictive maintenance models, powering anomaly detection, performing root cause analysis, and driving AI agents that can reason about what is happening in a plant. All of these require not just measurement values, but an understanding of the operational conditions those values represented — and for how long. Events are the bridge between continuous time-series data and the operational intelligence that AI systems need to be useful.

## Event Lifecycle

Events in TDengine IDMP are always generated automatically by analysis rules associated with an element, following a standardized lifecycle from template definition to event creation and notification delivery.

```text
Event Template (defined in Libraries)
        ↓
Analysis (configured on an element, references the template)
        ↓
Event (generated automatically when the analysis condition is met)
        ↓
Notification (optionally sent to configured contact points)
```

Every event must be based on an **event template**, which defines the naming pattern, severity level, categories, custom attribute schema, and acknowledgment requirements. Event templates are managed under **Libraries → Event Template**.

## Standard Event Fields

Every event carries the following standard fields, which describe the event's time range, associated objects, severity, and current processing status.

<table>
<colgroup><col style="width:13em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>Display name generated from the naming pattern in the event template</td></tr>
<tr><td><strong>Start Time</strong></td><td>When the event began</td></tr>
<tr><td><strong>End Time</strong></td><td>When the event ended (blank if still active)</td></tr>
<tr><td><strong>Duration</strong></td><td>Elapsed time between start and end</td></tr>
<tr><td><strong>Template</strong></td><td>The event template this event was created from</td></tr>
<tr><td><strong>Severity Level</strong></td><td>Severity category (Critical, Major, Minor, Warning, Normal)</td></tr>
<tr><td><strong>Reason Code</strong></td><td>Optional code identifying the cause</td></tr>
<tr><td><strong>Categories</strong></td><td>Tags for filtering and grouping</td></tr>
<tr><td><strong>Description</strong></td><td>Free-text description</td></tr>
<tr><td><strong>Associated Element</strong></td><td>The element that generated this event</td></tr>
<tr><td><strong>Associated Analysis</strong></td><td>The analysis rule that triggered this event</td></tr>
<tr><td><strong>Status</strong></td><td>Acknowledgment status of the event (Unacknowledged / Acknowledged)</td></tr>
</tbody>
</table>

In addition to these standard fields, an event can carry **custom attributes** — named values recorded at the time of the event, such as the peak temperature during an exceedance or the batch ID at the time of a fault. Custom attributes are defined in the event template.

## What's Covered in This Chapter

This chapter covers the complete event management workflow, from template definition to event browsing, detail viewing, alert notifications, acknowledgment, and trend analysis.

- **[Event Templates](./01-event-templates.md)** — Creating and managing event templates in Libraries
- **[Browsing Events](./02-browsing-events.md)** — The global events view, element-level events, and filtering
- **[Event Detail](./03-event-detail.md)** — Fields, attributes, annotations, and notification history
- **[Alerts and Notifications](./04-alerts-and-notifications.md)** — Contact points, notification rules, and notification behavior
- **[Acknowledgment](./05-acknowledgment.md)** — Acknowledging events and the acknowledgment workflow
- **[Trend Analysis](./06-trend-analysis.md)** — Analyzing events with trend charts

import DocCardList from '@theme/DocCardList';

<DocCardList />
