---
title: Trigger Types
sidebar_label: Trigger Types
---

# 7.3 Trigger Types

The trigger defines when an analysis fires. TDengine IDMP supports eight trigger types, selected from the **Trigger Type** dropdown in the Trigger section of the analysis form.

Triggers other than Periodic Window depend on an element's attributes having live data flowing through TDengine — specifically, the attributes must be of **TDengine Metric** data reference type. If an element has no such attributes, only Sliding Window and Session Window are available.

## Sliding Window

Fires on a fixed sliding time interval based on event time — the timestamps of the incoming data.

### When to Use

- You need a metric that is always fresh and continuously updated as new data arrives
- You want rolling aggregations such as moving averages, rolling totals, or sliding-window KPIs
- Operators need a dashboard value that reflects the last N minutes of activity at all times
- You want to detect trends or rate-of-change by comparing successive window results

### Parameters

| Parameter | Description |
|---|---|
| **Sliding** | The interval between trigger firings (e.g., every 1 minute, every 10 seconds) |

### Examples

**Rolling energy consumption.** A factory floor dashboard shows average power draw for each motor over the last 10 minutes, recalculated every minute. Operators can spot a motor running hotter than usual before it trips a breaker.

**Production rate tracking.** A packaging line counts units produced in the last 5 minutes, updated every 30 seconds. The line supervisor can see in real time whether the rate is on target for the shift goal.

**Vibration trending.** A rotating equipment monitor computes RMS vibration over a 1-minute sliding window every 15 seconds. A gradual upward trend in the output signals developing bearing wear days before a fault occurs.

---

## Anomaly Detection

Runs an anomaly detection algorithm against a target attribute on a sliding schedule. The system automatically identifies readings that deviate from expected behavior without requiring manually defined thresholds.

### When to Use

- You want to catch abnormal behavior without knowing in advance what "abnormal" looks like
- Equipment behavior is complex enough that fixed thresholds produce too many false alarms
- You want the system to learn the normal operating pattern and flag deviations automatically
- You need early warning of developing faults that would not yet breach a hard limit

### Parameters

| Parameter | Description |
|---|---|
| **Sliding** | How often to run the anomaly check |
| **Target** (required) | The attribute to analyze for anomalies. Multiple targets can be selected; when multiple targets are chosen, the system automatically creates an independent sub-analysis for each target attribute. |
| **Algorithm** (required) | The anomaly detection algorithm to apply |
| **White Noise Data Check** | When enabled, skips the anomaly check if the data appears to be white noise (no meaningful signal) |
| **Algorithm Parameters** | Optional algorithm-specific parameters in `a=1,b=2,c=3` format |

### Examples

**Chiller performance degradation.** An anomaly detection analysis runs every 5 minutes on a chiller's coefficient of performance. No threshold is configured — the algorithm learns the normal seasonal pattern. When performance begins drifting outside that pattern, an event fires weeks before the chiller would fail a manual efficiency check.

**Pump flow anomaly.** A water pump's flow rate looks normal to the eye, but an anomaly detection analysis flags a subtle periodic fluctuation that indicates the beginning of impeller cavitation. Maintenance schedules an inspection during the next planned outage.

---

## Periodic Window

Fires on the system wall clock at a fixed time interval, independent of when data arrives.

### When to Use

- You need periodic reports or summaries that land at predictable times — hourly, daily, per shift
- Downstream systems (ERP, MES, dashboards) expect data on a fixed period
- You want to aggregate an entire shift, day, or week into a single KPI record
- The calculation makes sense only over a complete time period, not a rolling window

### Parameters

| Parameter | Description |
|---|---|
| **Period** | The time interval (e.g., every 1 hour, every 1 day) |
| **Offset** | A delay after the period boundary before firing. For example, a 1-day period with a 6-hour offset fires at 06:00 each day — useful for generating daily reports after late-arriving data has had time to settle. |

### Examples

**Daily production summary.** An analysis fires every day at 06:00 (period: 1 day, offset: 6 hours), aggregating total output, average yield, and downtime for the previous day. Managers can review the summary in their dashboard each morning without manual calculation.

**Hourly OEE snapshot.** An OEE analysis fires at the top of each hour, computing availability, performance, and quality for the preceding hour. The results feed a trend chart that shows how OEE evolves across the shift.

**Shift handover report.** A 12-hour period with an appropriate offset aligns exactly with shift boundaries. Each outgoing shift automatically generates a complete record — total units, faults, and average process temperature — without manual calculation.

---

## Data Input

Fires whenever new data is written to a specific attribute — or any attribute — on the element.

### When to Use

- You want the analysis to react to every new measurement with the minimum possible delay
- The value of the result depends on the very latest reading, not a time-aggregated window
- You are computing derived attributes (unit conversions, calculated tags) that should always reflect current data
- You want to evaluate a condition on every single incoming point

### Parameters

| Parameter | Description |
|---|---|
| **Target** | The attribute whose new data writes trigger the analysis. Leave empty to trigger on any new data from any attribute. |

### Examples

**Real-time unit conversion.** A pressure sensor reports in PSI. A Data Input analysis converts each reading to bar and writes it back as a derived attribute. Every downstream dashboard and analysis sees the converted value with no lag.

**Instant limit check.** A temperature attribute triggers an analysis on every new reading. If the value exceeds the operating limit, an event fires immediately — not at the next scheduled interval.

---

## State Window

Fires when the value of an integer-type attribute changes from one state to another.

### When to Use

- Equipment operates in distinct modes — running, idle, faulted, warming up — and you want to analyze each mode separately
- You need to know how long a machine spent in each state to calculate utilization or OEE
- You want to capture a summary of what happened during each operating mode, not just the transitions
- State-based grouping aligns more naturally with your process than time-based grouping
- Each batch in your process carries a unique batch number attribute, and you want automatic per-batch summaries without manually marking start and end times

### Parameters

| Parameter | Description |
|---|---|
| **State** (required) | The integer attribute whose state changes trigger the analysis. Multiple state attributes can be selected; when multiple are chosen, the system automatically creates an independent sub-analysis for each attribute. |

### Examples

**Equipment utilization tracking.** A production machine has a status attribute: 0 = idle, 1 = running, 2 = faulted. A State Window analysis captures the duration and average output for every running period. The maintenance team can see exactly how much productive time was lost to each fault.

**OEE availability calculation.** Each time a machine transitions out of its "running" state, the analysis records the run duration. Summing these durations across a shift gives the availability component of OEE without any manual data extraction.

**Mode-specific energy analysis.** A compressor runs in three modes: standby, load, and full load. State Window captures average power consumption for each mode separately, making it easy to compare actual consumption against nameplate specifications per operating mode.

**Batch process summarization.** A reactor carries a batch number attribute that increments with each new batch. Every time the batch number changes — a state transition — the analysis fires, computing average temperature, total reaction time, and yield for the completed batch. Each batch gets its own summary automatically, regardless of how long it ran, with no operator intervention required.

---

## Event Window

Fires based on a user-defined start condition and stop condition, expressed as expressions evaluated against element attributes.

### When to Use

- You need to detect and characterize a sustained condition — not a momentary spike, but something that develops and resolves over time
- You want to capture everything that happened during an abnormal episode: duration, peak values, averages
- The boundary of the analysis window is defined by process behavior, not the clock
- You need to filter out noise by requiring a condition to persist for a minimum duration before it counts

### Parameters

| Parameter | Description |
|---|---|
| **Start Trigger — Expression** (required) | A condition expression that, when it evaluates to a positive value, opens the event window |
| **Start Trigger — True for** | A minimum duration the start condition must remain true before the window opens. Prevents false triggers from momentary noise. |
| **Stop Trigger — Expression** (required) | A condition expression that, when it evaluates to a positive value, closes the event window and fires the analysis |

Both expressions can be tested with the **Evaluate** button before saving.

### Examples

**Temperature exceedance characterization.** The start condition is `temperature > 85`. The stop condition is `temperature < 80`. Every time the process runs hot, the analysis captures how long it lasted, the peak temperature reached, and the average temperature during the exceedance — turning a raw alarm into a structured event with full context.

**Compressor surge detection.** The start condition is `discharge_pressure > surge_limit AND flow < min_flow`. The "True for" setting is 5 seconds, filtering out transient noise. When a genuine surge condition is confirmed, the window opens. The stop condition closes it when pressure returns to normal. Each surge event is recorded with its duration and pressure profile.

**Low-efficiency production window.** The start condition is `oee < 0.75`. The stop condition is `oee > 0.85`. Each time OEE drops below the target and recovers, the analysis summarizes the episode — when it started, how long it lasted, and which component (availability, performance, or quality) drove the loss.

---

## Session Window

Fires when there has been no new data on the element for a specified inactivity period. The analysis runs once the silence gap is detected, covering the data from the preceding active period.

### When to Use

- Equipment transmits data in natural bursts — a vehicle reporting only while running, a batch machine active only during a job
- You want to treat each burst of activity as a complete, self-contained unit of analysis
- There is no fixed schedule to anchor the analysis; the data itself defines when a session begins and ends
- You need per-trip, per-batch, or per-cycle summaries without manually marking start and end times

### Parameters

| Parameter | Description |
|---|---|
| **No Activity Interval** | How long data must be absent before the session is considered closed and the trigger fires |

### Examples

**Fleet trip analysis.** A delivery vehicle transmits GPS, speed, and fuel data only while the ignition is on. With a 10-minute no-activity interval, each trip becomes a session. When the driver parks and the data stream stops, the analysis fires — computing total distance, average speed, fuel consumed, and idle time for that trip.

**Batch cycle summary.** A reactor sends process data during each batch run and goes silent between runs. Session Window fires at the end of each batch, computing average temperature, total reaction time, and yield — without any operator needing to mark the batch boundaries manually.

**CNC job reporting.** A machining center transmits spindle load and feed rate data only during active jobs. Each job becomes a session, and the analysis at the end of each session records actual cutting time, peak load, and any anomalous vibration events detected during the job.

---

## Count Window

Fires when a specified number of new records have been written to the element's attributes.

### When to Use

- Your process is defined by cycles or samples rather than elapsed time — every 100 parts inspected, every 50 sensor readings
- Data arrives at irregular intervals but you want consistent batch sizes for analysis
- You are working with instruments that report on demand or event-driven rather than on a fixed schedule
- Sample-based quality analysis requires a fixed number of measurements per calculation

### Parameters

| Parameter | Description |
|---|---|
| **Target** | The specific attribute to count new records for. Leave empty to count across all attributes. |
| **Count** | The number of new records that must accumulate before the trigger fires |

### Examples

**Statistical process control.** A quality sensor on a production line takes a measurement every time a part passes. A Count Window analysis fires every 25 readings, computing the mean and standard deviation for that sample group. Control chart limits are evaluated against each group result, independent of how long the 25 parts took to produce.

**Lab instrument batch.** A gas chromatograph reports one result per sample run. A Count Window fires every 10 results, computing the average concentration and flagging any outlier readings in the batch — matching the natural unit of work for the lab team.
