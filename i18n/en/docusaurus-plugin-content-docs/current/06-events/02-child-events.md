---
title: Child Events
sidebar_label: Child Events
---

# 6.2 Child Events

The same type of anomaly often occurs in multiple degrees on the plant floor — a "voltage exceedance" of 220 V is a yellow card, 240 V is a red card; a "temperature anomaly" that ramps up slowly demands a very different response than one that spikes instantly. TDengine IDMP supports modeling "one situation, multiple severities" through **Child Events**: within a single time window, the system evaluates the current severity by priority and records every change in severity as an independent event. When two or more child events accumulate in the window, a parent event is automatically created as the skeleton that spans the whole episode.

:::note
The current release supports only **one level** of parent/child events — a child event cannot have its own children. Multi-level parent/child events are on the product roadmap.
:::

## 6.2.1 How Parent and Child Events Are Produced

Child events are produced by multiple trigger rules configured on the **Event Window** trigger of an analysis:

- **Each trigger rule corresponds to one class of child event** — split by severity (e.g., `severe` / `moderate`) or by hit condition.
- For each new data point, the stream computation evaluates the rules **top to bottom in order**: if trigger 1 matches, the child event for trigger 1 is produced and **no subsequent triggers are evaluated**; if trigger 1 does not match, trigger 2 is evaluated; and so on.
- **Every time a child event is produced, it is written to the event list and a notification is sent according to the event template rules.**
- Within the lifetime of a single event window, **as soon as two or more child events accumulate**, IDMP **automatically creates a parent event** as the overview of the whole episode. The parent event enters the event list as its own row and is linked to all child events, **but the parent event itself does not send notifications** — alerts come only from child events.
- If only one trigger rule ever matches during the window, there will be just one child event and no parent event — the child event is the only record of the episode.
- If an Event Window is configured with only one trigger rule, parent/child events do not come into play at all, and the behavior is identical to a regular Event Window analysis.

Child events are produced only by the Event Window trigger; the other seven trigger types do not produce parent/child events.

## 6.2.2 Trigger Order Is the Priority

Because the stream computation evaluates strictly top-to-bottom and stops on the first match, **the order of the triggers is the business priority** — higher-severity rules **must** be placed earlier, or a logical error will occur. For example, placing `moderate` before `severe` would mean any data above the moderate threshold matches moderate first and never reaches severe.

To reduce mistakes, the analysis configuration page **automatically reorders** rows after the user changes a row's severity — higher-severity rows are pushed to the top. Keeping this automatic behavior is recommended; if business reasons require breaking "severity = priority", document the intent clearly in the event template description.

## 6.2.3 Time Range of Child Events

Child and parent events share the same time axis, with the following relationships:

- **The start time of child event #1** = the moment the first trigger rule matches;
- **The start time of each subsequent child event** = the end time of the previous child event — that is, child events within a window are **chained head-to-tail** with no gap and no overlap;
- **The end time of the last child event** = the end time of the parent event, i.e. the moment the window's stop condition is met;
- **The start time of the parent event** = the start time of child event #1; the **end time** = the moment the window's stop condition is met.

The parent event is automatically created when the second child event appears, but its **start time is backfilled** to the start of the first child event, so the parent covers all child events within the window.

## 6.2.4 Notifications and Acknowledgment

- **Notifications come only from child events** — when a child event opens, a start notification is sent according to the event template rules; the auto-created parent event **does not send its own notification**.
- A child event also sends a **close notification** when it ends. However, if its close coincides with the start of the next child event (a hit-switch in the stream computation), the close notification is overridden by the next child event's start notification. Therefore only the **last** child event's close notification in the window is emitted independently. See the [6.2.9 example](#629-example-two-tier-severity-for-voltage-exceedance) for details.
- The parent event and each child event each go through **independent Acknowledgment workflows**. The current release does not cascade "acknowledge parent = acknowledge children"; child events must be acknowledged one by one. This capability is on the roadmap.
- The element's [notification rules](./05-alerts-and-notifications.md) (resend interval, escalation, max resend count) apply to each child event, identical to ordinary events.

## 6.2.5 Naming of Child Events

The event template's naming rule applies uniformly to both parent and child events — by convention the name contains **element name + analysis name + timestamp** (the exact format is determined by the template's naming rule; see [6.1.2.2 Event Naming Rule](./01-event-templates.md#6122-event-naming-rule)). A child event appends the trigger name suffix to the parent event name:

```text
<parent event name> - <trigger name>
```

For example, if the parent event name is `EM-11-Voltage Overlimit Monitoring-20260407163240`, the child trigger rule named `severe` produces a child event named `EM-11-Voltage Overlimit Monitoring-20260407163240-severe`.

**The trigger name can be edited in the event window trigger table of the analysis.** Keep it short and recognizable so different severities of child events are easy to tell apart in the event list.

## 6.2.6 Browsing in the Event List

In the global events view and the element's Events tab, a parent event row that contains child events shows a **>** expand icon at the front. Clicking it toggles to a **v** collapse icon, and the child events are listed beneath the parent with their **names indented to the right**, one row per child.

Child events are **independent rows** in the list — each can be clicked individually to view its detail page, and each appears in search, filter, and export results.

## 6.2.7 Viewing in the Detail Page

- **Child event detail page**: the General tab's field area shows a **Parent Event** field. Click it to navigate to the parent event.
- **Parent event detail page**: the **Child Events** tab in the bottom section lists all child events under this parent, with the same columns as the events list.

The rest of the detail page has the same structure as ordinary events. See [6.4 Event Detail](./04-event-detail.md).

## 6.2.8 Configuring Child Events

Child events are not defined in the event template. They are configured in the **Event Window** trigger of an **analysis**, by clicking the **+ Add Sub-expression** button beneath the start trigger to add trigger rows. For full UI walkthrough, field semantics, and save-time validation rules, see [7.3.6 Event Window](../07-real-time-analysis/03-trigger-types.md#736-event-window).

## 6.2.9 Example: Two-Tier Severity for Voltage Exceedance

A transformer voltage element needs to monitor both **severe** and **moderate** exceedances using the same time window and the same energy statistics calculation. The configuration is as follows:

1. Create an **Event Window** trigger with stop condition `voltage < 215`.
2. Beneath the start trigger, click **+ Add Sub-expression** and add two rows in "high priority first" order:

   | Order | Trigger Name | Expression       | Severity |
   | ----- | ------------ | ---------------- | -------- |
   | 1     | `severe`     | `voltage > 240`  | Critical |
   | 2     | `moderate`   | `voltage > 230`  | Major    |

3. Configure unified outputs in the Calculation section — peak voltage during the window, average voltage, and cumulative over-limit duration.

Suppose the runtime voltage trace is: T₀ rises to 235 V (falls into moderate) → T₁ rises to 245 V (falls into severe) → T₂ drops back to 232 V (falls into moderate again) → T₃ drops to 214 V (window ends). The event list will show:

| Row    | Event                                | Start | End | Severity |
| ------ | ------------------------------------ | ----- | --- | -------- |
| Parent | `…-Voltage Overlimit…`               | T₀    | T₃  | —        |
| Child  | `…-Voltage Overlimit…-moderate`      | T₀    | T₁  | Major    |
| Child  | `…-Voltage Overlimit…-severe`        | T₁    | T₂  | Critical |
| Child  | `…-Voltage Overlimit…-moderate`      | T₂    | T₃  | Major    |

Timeline walkthrough:

- **T₀**: the child event `…-moderate` is produced; one notification is sent. At this moment there is only 1 child event in the window — **the parent event does not yet exist**.
- **T₁**: the child event `…-severe` is produced + the previous moderate child closes at T₁; **the parent event is automatically created** with its start time backfilled to T₀, and is linked to all child events. **Only the severe child event's notification is sent** at T₁; the parent does not send a notification.
- **T₂**: a second moderate child event is produced, the severe child closes at T₂, and the moderate child sends one notification.
- **T₃**: the window stop condition is met. The last moderate child event and the parent event both close simultaneously (end time = T₃); the last moderate child sends one **close notification** — the only independent close notification in the entire window (the child event closures at T₁ and T₂ coincide with the next child event's start and are overridden by the start notification). The parent event sends no notification throughout.

Although the episode produces only 3 child events (plus 1 parent event), it emits a total of **4 notifications**: one start notification each at T₀, T₁, and T₂, plus one close notification at T₃ from the last moderate child event. The parent event silently plays the "overview" role in the event list throughout.
