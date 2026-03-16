---
title: Trigger Types
sidebar_label: Trigger Types
---

The trigger defines when an analysis fires. TDengine IDMP supports eight trigger types, selected from the **Trigger Type** dropdown in the Trigger section of the analysis form.

Triggers that are not Periodic Time Window depend on an element's attributes having live data flowing through TDengine — specifically, the attributes must be of **TDengine Metric** data reference type. If an element has no such attributes, only Sliding Window and Session Window are available.

## Sliding Window

Fires on a fixed sliding time interval based on event time (the timestamps of the incoming data).

| Parameter | Description |
|---|---|
| **Sliding** | The interval between trigger firings (e.g., every 1 minute, every 10 seconds) |

**Use when:** You want to recalculate a metric at a regular cadence as new data flows in — for example, compute a rolling 10-minute average every minute.

## Anomaly Detection

Runs an anomaly detection algorithm against a target attribute on a sliding schedule.

| Parameter | Description |
|---|---|
| **Sliding** | How often to run the anomaly check |
| **Target** (required) | The attribute to analyze for anomalies |
| **Algorithm** (required) | The anomaly detection algorithm to apply |
| **White Noise Data Check** | When enabled, skips the anomaly check if the data appears to be white noise (no meaningful signal) |
| **Algorithm Parameters** | Optional algorithm-specific parameters in `a=1,b=2,c=3` format |

## Periodic Time Window

Fires on the system wall clock at a fixed calendar interval, independent of when data arrives.

| Parameter | Description |
|---|---|
| **Period** | The calendar interval (e.g., every 1 hour, every 1 day) |
| **Offset** | A delay after the period boundary before firing. For example, a 1-day period with a 2-hour offset fires at 02:00 each day — useful for generating daily reports with a settling delay. |

**Use when:** You want scheduled calculations like daily summaries, hourly KPI snapshots, or shift reports.

## Data Input

Fires whenever new data is written to a specific attribute (or any attribute) on the element.

| Parameter | Description |
|---|---|
| **Target** | The attribute whose new data writes trigger the analysis. Leave empty to trigger on any new data from any attribute. |

**Use when:** You want the analysis to run every time a new measurement arrives, in near-real-time.

## State Window

Fires when the value of an integer-type attribute changes state — that is, when it transitions from one value to another.

| Parameter | Description |
|---|---|
| **State** (required) | The integer attribute whose state changes trigger the analysis |

**Use when:** You have a status attribute (e.g., equipment running/stopped) and want to run calculations each time the state changes.

## Event Window

Fires based on a user-defined start and stop condition, expressed as expressions evaluated against element attributes. This trigger type is the most flexible and is used to detect arbitrary conditions in the data.

| Parameter | Description |
|---|---|
| **Start Trigger — Expression** (required) | A condition expression that, when it evaluates to a positive value, starts the event window |
| **Start Trigger — True for** | A minimum duration the start condition must remain true before the window opens. Prevents false triggers from momentary noise. |
| **Stop Trigger — Expression** (required) | A condition expression that, when it evaluates to a positive value, closes the event window and fires the analysis |

Both expressions can be evaluated using the **Evaluate** button to test them against current data before saving.

**Use when:** You want to detect conditions such as "temperature exceeded threshold for more than 10 minutes" and compute statistics over the duration of that condition.

## Session Window

Fires when there has been no new data on the element for a specified inactivity period. The analysis runs once the silence gap is detected, covering the period of the last active session.

| Parameter | Description |
|---|---|
| **No Activity Interval** | How long data must be absent before the session is considered closed and the trigger fires |

**Use when:** You have batch-style data or equipment that transmits in bursts, and you want to analyze each burst after it completes.

## Count Window

Fires when a specified number of new records have been written to the element's attributes.

| Parameter | Description |
|---|---|
| **Target** | The specific attribute to count new records for. Leave empty to count across all attributes. |
| **Count** | The number of new records that must accumulate before the trigger fires |

**Use when:** You want to run an analysis after every N new measurements, regardless of the time elapsed between them.
