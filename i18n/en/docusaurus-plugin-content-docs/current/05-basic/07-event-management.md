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

## Active Events

Events that have occurred but have not been closed are considered active. While an event is active, you can acknowledge it, view its trend chart, and analyze its root cause. The event list indicates whether an event is still active. Once an event is closed, the system no longer sends any notification messages related to it.

## Event Notification Messages

Based on the configured notification rule, the system automatically sends notification messages to the specified contact point. The process is as follows:

- **Initial Notification**: When an event occurs, the system determines whether to send a notification message based on the notification rule and notification interval.
- **Resend Mechanism**: If the event requires acknowledgment and is not acknowledged within the "resend interval" and the event remains open, the system will resend the notification message at regular intervals.
- **Escalation Mechanism**: If an escalation contact point is configured in the notification rule and the event remains unacknowledged and open within the "escalation interval", the system will send a message to the escalation contact.
- **Notification Termination**: Once the event is acknowledged, the system no longer sends any notification messages.

## Notification Rules

All events for an element share a single notification rule that defines the notification behavior when events occur.

**Notification Rule Configuration Parameters**:

| Parameter                | Description                                                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Contact Point            | The method for receiving notifications (email, Feishu, Webhook, etc.)                                                   |
| Resend Interval          | The time interval for resending notifications for unacknowledged active events                                          |
| Escalation Contact Point | An additional contact point to send notifications to if the event remains unacknowledged within the escalation interval |
| Escalation Interval      | The time threshold for triggering escalation notifications                                                              |
| Maximum Resend Count     | The maximum number of times a single event can be resent                                                                |
| Message Template         | The text content of the notification message, supporting variable substitution                                          |

**Inheritance Mechanism**: Child elements automatically inherit the notification rule from their parent element at the time of creation. After modification, the new notification rule will apply to that element and all its descendants.

## Event Templates

Every event must be associated with an event template. Each event template contains basic configurations such as severity level, as well as parameters that control notification frequency and acknowledgment mechanisms.

### Core Functionality

- **Event Marking**: The severity level is used to mark the event's priority level, facilitating event classification and analysis.
- **Notification Frequency Control**: The "minimum notification interval" parameter prevents excessively frequent notifications. For example, if set to 20 minutes, even if an analysis triggers an event every minute, the system will only send a notification once every 20 minutes.
- **Template Inheritance**: Supports inheritance relationships between base templates and sub-templates, where sub-templates can inherit configurations from parent templates.

### Event Template Configuration Parameters

When creating or editing an event template, you need to configure the following parameters:

| Parameter                     | Description                                                                                                                                                                                                                    | Example                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| Name                          | The unique identifier of the event template, used to identify the template in the system                                                                                                                                       | test-event-template                  |
| Category                      | The category of the event template, used to organize and manage templates. You can choose "Base Template" or a custom category                                                                                                 | Base Template                        |
| Base Template Only            | Indicates whether this template is used only as a base template and cannot be used to create events directly. "Yes" means the template serves as a base for other templates, "No" means it can be used directly                | No                                   |
| Severity Level                | The priority level mark for events, including: Critical, Major, Minor, Warning, Normal                                                                                                                                         | Critical                             |
| Event Naming Pattern          | Defines the rules for generating event names, which can include variables and fixed text for automatic event name generation                                                                                                   | -                                    |
| Allow Extension               | Whether other templates can extend from this template. "Yes" means other templates can inherit this template's configuration                                                                                                   | Yes                                  |
| Allow Acknowledgment          | Whether events require manual acknowledgment. When set to "Yes", unacknowledged events will continue to send notifications at the resend interval until acknowledged, closed, or the maximum resend count is reached           | Yes                                  |
| Reason Code                   | The reason classification for events, which must be defined in advance in "Libraries/Enumerations"                                                                                                                             | Circuit Fault                        |
| Reason Code Value             | Specific subdivisions of the reason code, providing more detailed reason descriptions                                                                                                                                          | Voltage / Overvoltage                |
| Minimum Notification Interval | The minimum time interval between consecutive notifications for events from the same analysis. Notifications will only be sent if the time since the last notification exceeds this interval, preventing notification overload | 20 minutes                           |
| Description                   | Detailed information about the event template, explaining its purpose and usage scenarios                                                                                                                                      | Used to detect overvoltage anomalies |

### Configuration Guidelines

- **Allow ACK**: When "Allow ACK" is enabled, unacknowledged active events will continue to send notifications at the intervals specified in the notification rule until they are acknowledged, closed, or the maximum resend count is reached.
- **Notification Interval Control**: The "minimum notification interval" parameter helps prevent excessive notifications from the same analysis. For example, after setting it to 20 minutes, even if an analysis triggers events every minute, notifications will only be sent once per 20 minutes.
- **Reason Code**: Proper use of reason codes and reason code values helps classify and count events, facilitating subsequent root cause analysis and problem tracking.
- **Template Extension**: When "Allow Extension" is enabled, you can create sub-templates based on this template. Sub-templates will inherit part of the parent template's configuration, making it easier to manage similar types of events.
