---
title: Event Management
---

TDengine IDMP provides event management along with basic root cause analysis capabilities. In TDegine IDMP, events can be generated automatically through real-time analytics or manually created. Each element has its own event list, but you can also view all events across all elements in the **Events** tab in the main menu.

## General Event Information

Each event contains basic information such as its name, description, and category. It also includes the start time, end time, severity level, associated element, and the analysis that generated it. Additional features include the ability to add comments and view the notification history for each event.

You can configure events to require acknowledgment. If an event is set to require acknowledgment, and it is not confirmed within the defined resend interval, the system will automatically resend the notification to remind users to respond. You can acknowledge the event either from the event detail page or from the event list view.

## Event Attributes

An event can also have attributes, which are used to record specific values at the time the event occurred and assist with post-event analysis. When configuring an analysis, you can choose to output the analysis results directly into the attributes of the event.

## Trend Chart Analysis

From the event detail page, or by clicking the three-dot menu on the right side of the event list and selecting **Trend Chart Analysis**, you can automatically add the event-related attributes to a trend chart, with the start and end times clearly marked. You can also add other time-series data to the chart, making it easier to observe trend changes before and after the event and analyze the possible causes of the event.

## Root Cause Analysis

Open the event details page, click the "Root Cause Analysis" button in the top-right corner to initiate the generation of a root cause analysis. Based on the key data of the current event, the AI will generate a structured, easy-to-understand, and business-insightful exclusive analysis report to assist users in swiftly identifying the root cause of the event and reducing operational and maintenance costs.

## Active Events

Events that have occurred but have not been closed are considered active. While an event is active, you can acknowledge it, view its trend chart, and analyze its root cause. The event list indicates whether an event is still active. Once an event is closed, the system no longer sends any notification messages related to it.

## Event Notification Messages

When an event occurs, the system can automatically send a message to the designated contact based on its severity level and the configured notification rules. If the event is open, requires acknowledgment, and is not acknowledged within the specified resend interval, the system will resend the notification. If an escalation contact is defined in the notification rule, and the event is still open and unacknowledged after the configured escalation interval, the system will send a message to the escalation contact.

## Notification Rules

All events in an element share a single notification rule. In the notification rule, you can specify the contact point, resend interval, escalation contact, and escalation interval. The message body is a text template, but the system comes with predefined content and supports placeholder variables for dynamic substitution.

Every event is associated with an event template. Whether a notification is sent depends on the severity level configured in the event template. A notification is only sent if the event’s severity level is equal to or higher than the threshold defined for the device. This prevents notification overload and allows events from the same template to have different severity levels.

A child element automatically inherits the notification rule of their parent element notification rule at the time when the child element is created. However, you can modify the rule afterward, and the new notification rule will apply to that element and all its descendants.
