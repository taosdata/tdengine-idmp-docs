---
title: Events
sidebar_label: Events
---

# 6 Events

An event in TDengine IDMP is a discrete operational occurrence with a defined start time, end time, and duration — the digital record that something happened. A pump tripped, a temperature exceeded its limit, a batch phase completed, a maintenance window began. This concept is equivalent to **event frames** in OSIsoft PI System, one of the most powerful ideas in industrial data management.

Raw sensor streams tell you what a value was at a given moment; events tell you what was happening operationally — and for how long. Instead of searching through millions of data points to find when a compressor ran in surge, you query the structured event record that already captured it.

## Events in the AI Era

Events matter even more as AI becomes central to industrial operations. AI and machine learning systems work best when data is structured and contextualized — and that is exactly what events provide. Instead of feeding a model millions of raw sensor readings, you give it structured records: "Compressor Surge, Start: 10:23:15, Duration: 12 seconds, Severity: High." That context is what turns signal data into something a model can reason about.

Events directly enable the industrial AI use cases that matter most: training predictive maintenance models, powering anomaly detection, performing root cause analysis, and driving AI agents that can reason about what is happening in a plant. Every one of these requires knowing not just what values were measured, but what operational conditions those values represented — and for how long. Events are the bridge between continuous time-series data and the operational intelligence that AI systems need to be useful.

## Event Lifecycle

Events in TDengine IDMP are always generated automatically by analysis rules associated with an element. The full lifecycle is:

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

Every event carries the following standard fields:

| Field | Description |
|---|---|
| **Name** | Display name generated from the naming pattern in the event template |
| **Start Time** | When the event began |
| **End Time** | When the event ended (blank if still active) |
| **Duration** | Elapsed time between start and end |
| **Template** | The event template this event was created from |
| **Severity Level** | Severity category (Critical, Major, Minor, Warning, Normal) |
| **Reason Code** | Optional code identifying the cause |
| **Categories** | Tags for filtering and grouping |
| **Description** | Free-text description |
| **Associated Element** | The element that generated this event |
| **Associated Analysis** | The analysis rule that triggered this event |
| **Status** | Whether the event has been acknowledged |

In addition to these standard fields, an event can carry **custom attributes** — named values recorded at the time of the event, such as the peak temperature during an exceedance or the batch ID at the time of a fault. Custom attributes are defined in the event template.

## What's Covered in This Chapter

- **[Event Templates](./01-event-templates.md)** — Creating and managing event templates in Libraries
- **[Browsing Events](./02-browsing-events.md)** — The global events view, element-level events, and filtering
- **[Event Detail](./03-event-detail.md)** — Fields, attributes, annotations, and notification history
- **[Alerts and Notifications](./04-alerts-and-notifications.md)** — Contact points, notification rules, and notification behavior
- **[Acknowledgment](./05-acknowledgment.md)** — Acknowledging events and the acknowledgment workflow
- **[Trend Analysis](./06-trend-analysis.md)** — Analyzing events with trend charts

import DocCardList from '@theme/DocCardList';

<DocCardList />
