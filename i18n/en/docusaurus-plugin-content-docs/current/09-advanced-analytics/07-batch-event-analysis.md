---
title: Event and Batch Analysis
sidebar_label: Event and Batch Analysis
---

# 9.7 Event and Batch Analysis

An event in TDengine IDMP is a discrete operational event with an explicit start time, end time, and duration — a complete digital record of something that happened.

Batch analysis is a critical method for analyzing discrete production processes in industrial data science. **IDMP defines product batches as a specialized type of event**. Rather than providing a standalone batch analysis module, the IDMP platform treats batches as a special event type and leverages its powerful, flexible event analysis capabilities to manage the full batch lifecycle and perform in-depth analysis.

Through event analysis, IDMP enables systematic comparison of full-cycle data across batch production, chemical reactions, and manufacturing processes — helping users identify the key process factors that affect product quality, discover patterns and anomalies across batches, and provide a data foundation for process optimization and quality control.

**The Analysis Chart is the primary entry point for event and batch analysis.** The Analysis Chart is the only analysis panel in IDMP that operates as an independent window, where users can perform event comparison, window analysis, time-series forecasting, correlation analysis, and other process analysis methods. The event analysis and exploration, window analysis, and other functions described in this section are all performed in the Analysis Chart view page.

## Principles of Event and Batch Analysis

The core concept of event and batch analysis is: **treat each time-bounded production, reaction, or processing run as an independent analysis unit (i.e., an event/batch), then compare, aggregate, and trace full-cycle data across multiple events to discover patterns, identify differences, and detect anomalies.**

Unlike continuous production analysis, event/batch analysis focuses on the complete lifecycle of each batch from start to finish — including process parameter trends throughout the batch, statistical summaries of key metrics, and cross-batch comparisons. A well-executed batch typically exhibits stable process parameters, key metrics within target ranges, and curves that closely match historical successful batches. Problematic batches may show parameter drift during certain phases, anomalous spikes, or clear divergence from standard curves.

Event and batch analysis typically serves the following objectives:

- **Batch comparison:** Overlay current batches against historical batches, golden batches, or standard batches to visualize process parameter consistency and identify deviation points
- **Quality traceability:** Group and compare batches by quality outcome (pass vs. fail) to identify process parameter differences correlated with quality results and pinpoint root causes
- **Anomalous batch identification:** Screen large volumes of historical batches to identify those where process parameters deviated from normal ranges, supporting quality control and process audits
- **Trend monitoring:** Track long-term trends in key batch metrics (such as yield, cycle time, energy consumption) to detect process drift or equipment aging signals

## Application Scenarios

Event and batch analysis has broad applications across discrete manufacturing and process industries:

**Pharmaceutical and Biopharmaceutical**

- Compare full-cycle data across fermentation, crystallization, and purification batches to identify key process parameters affecting yield and purity
- Archive complete process data for each batch as electronic batch records to support GMP compliance audits and deviation investigations

**Chemical and Fine Chemical**

- Aggregate and compare parameters for synthesis reactions, polymerization, and distillation batches to optimize reaction conditions and feed ratios
- Track batch-to-batch trends in yield and product quality metrics to detect impacts from raw material changes or catalyst deactivation

**Semiconductor and Electronics Manufacturing**

- Compare chamber parameters across etching, deposition, and diffusion process batches to identify key process variables affecting yield
- Monitor equipment state drift through batch-to-batch parameter consistency analysis to support preventive maintenance decisions

**Injection Molding and Forming**

- Aggregate statistics on injection temperature, hold pressure, and cooling rate across molding cycles or batches to establish process window baselines
- Compare process data from defective batches against conforming batches to quickly pinpoint parameter anomaly phases

## Event Definition and Implementation

An **Event** in IDMP is a discrete operational record with an explicit start time, end time, and duration. Each event records its time boundaries and can carry custom attributes (such as batch ID, product type, operator, quality conclusion, etc.). Events are associated with elements and their time-series attributes, making it possible to extract and analyze complete process data for any batch time range.

Event time boundaries can be defined in two ways:

**Manual marking:** Operators manually create events in the event management interface after production ends, entering start and end times. This suits scenarios where production rhythm is irregular or batch boundaries require human judgment.

**Automatic generation (recommended):** Add a **batch number** field to equipment attributes — the equipment's time-series data outputs the currently producing batch number. Whenever the batch number changes (i.e., a new batch starts), IDMP's **State Window** trigger automatically detects this state transition, triggers analysis to aggregate the previous batch's complete statistics, and automatically generates the corresponding batch event record. The system maintains a complete record of every batch in real time and with accuracy, without requiring manual operator marking.

### Event Configuration and Automatic Generation

Event automatic generation can be implemented through the State Window trigger in element analysis. Configuration steps:

1. **Prepare batch number attribute:** Ensure the equipment attributes include a **batch number** field (integer attribute), and the batch number updates with each new batch start.
2. **Create analysis:** Navigate to the element's **Analysis** tab, click **+** to create a new analysis, and enter an analysis name (such as "Batch Process Summary").
3. **Configure trigger:** In the **Trigger** step, select **State Window** as the trigger type and set the **State** attribute to the batch number field.
4. **Define summary metrics:** In the **Calculation** step, configure batch statistics to aggregate (such as average temperature, peak pressure, total duration, yield, etc.) and write calculation results to corresponding output attributes.
5. **Enable event generation:** In the **Event** step, enable event generation, select the **event template** corresponding to the batch, and configure naming rules and custom attributes (such as batch ID, product type, etc.).
6. **Save and run:** Click **Save** and the analysis begins continuous operation.

Once configured, whenever the batch number changes, the system automatically completes data aggregation for the previous batch and generates an event record. This automated approach ensures real-time accuracy of batch events without manual intervention.

:::note
The batch number attribute type should be integer so that the IDMP State Window trigger can recognize batch transitions. Each new batch can increment the batch number, or use other integer encoding methods to distinguish different batches.

For scenarios where batch boundaries are naturally defined by data silence gaps (such as equipment stopping data reporting after completing a batch), you can also use the **Session Window** trigger to automatically complete batch aggregation after data stream interruption.
:::

## Window Analysis

Window analysis is an interactive tool for searching meaningful time segments in historical data. Users initiate it on demand from the Analysis Chart view page, selecting different window strategies to scan through historical data and surface qualifying time segments, which are then overlaid as highlighted regions on the current chart.

**Window analysis does not create events.** User-defined windows appear as highlighted time segments overlaid on the attribute trend curves, helping users visually observe data behavior within those segments. Window analysis is a purely visual exploration process — it does not create system events, nor does it trigger event processing workflows such as alerts or notifications.

### Window Analysis vs. Real-Time Analysis Triggers

The six window types supported by window analysis share the same window semantics as [real-time analysis trigger types](../07-real-time-analysis/03-trigger-types.md), but they serve different purposes:

| | Real-Time Analysis Triggers (Chapter 7) | Window Analysis (This Section) |
|---|---|---|
| **Execution mode** | Continuous, against live data streams | Interactive, against historical data, executed on demand |
| **Output** | Creates events + writes calculation results | Generates highlighted windows on the chart |
| **Creates events?** | Yes | No |
| **Entry point** | Element → Analysis → Configure trigger | Analysis Chart view page → Window Analysis icon |

In short, real-time analysis triggers are like "security cameras" — configured once, running continuously; window analysis is like "reviewing recorded footage" — searching for specific scenes in historical data on demand.

### Entry Point

In the Analysis Chart view page toolbar, click the **Window Analysis** icon to open the window analysis configuration dialog. Select a window type, configure parameters, and the system scans the historical data within the current time range, displaying discovered windows as highlighted segments on the chart.

![Window Analysis Configuration](./images/event-trend-adhoc.png)

### Supported Window Types

- **Sliding Window:** Divides data at fixed sliding time intervals based on event time. Suitable for rolling review scenarios, e.g., "one segment per hour — which hour had the highest energy consumption"
- **State Window:** Splits windows when an integer attribute's value transitions from one state to another. Suitable for reviewing segments by equipment operating mode (running/idle/fault) or batch number
- **Event Window:** Splits windows based on user-defined start and end condition expressions evaluated against element attributes. Suitable for finding "all periods where temperature exceeded 85°C" and similar custom conditions; supports minimum duration to filter noise
- **Anomaly Detection:** Runs anomaly detection algorithms on the target attribute without requiring manual threshold setting — the system automatically identifies data segments that deviate from normal behavior. Suitable for AI-driven anomaly discovery during exploration
- **Session Window:** Splits windows when the element has no new data within a specified inactivity period, covering the preceding active period. Suitable for naturally intermittent data, such as equipment start/stop cycles or vehicle driving/parking
- **Count Window:** Splits windows when the number of new records written for an element attribute reaches a specified count. Suitable for data arriving at irregular intervals where fixed sample-size analysis is needed

These six window types share the same window semantics as [real-time analysis trigger types](../07-real-time-analysis/03-trigger-types.md). See that chapter for detailed parameter configuration of each window type.

### Window Analysis Results

Discovered windows are displayed as highlighted time segments overlaid on the attribute trend curves in the Analysis Chart. Users can:

- Run multiple window strategy searches simultaneously in the same panel and cross-compare results
- Visually observe data behavior within each window to determine whether further analysis is needed
- Combine with event comparison, envelope analysis, and other capabilities for deeper exploration of windows of interest

## Event Analysis Entry Points

### Event Querying and Filtering

IDMP provides powerful event search and filtering capabilities to help users quickly locate events requiring in-depth analysis. Batch events, as a special event type, can leverage IDMP's full suite of event search capabilities.

**Search Entry**

Click **Events** in the top navigation bar, or switch to the **Events** tab on an element details page to enter the event list view. Click the search icon (magnifying glass) to open the search dialog.

**Basic Search**

Enter keywords in the search box (such as batch ID, product type, operator name, etc.), then press Enter or click **Search**. The system searches within event names, descriptions, and custom attributes, and returns a list of matching batch events.

**Advanced Filtering**

Click **Advanced** to expand additional filter criteria. You can precisely filter batch events by the following dimensions:

- **Time range:** Filter by batch start or end time to quickly locate batches within specific time periods
- **Event template:** Filter by batch event template to distinguish batches from different product lines or process types
- **Element path:** Limit search scope to batches under specific equipment or production lines
- **Custom attributes:** Filter by batch custom attributes (such as quality grade, shift, product specification, etc.)
- **Severity:** If batch events have severity configured, filter for anomalous or critical batches

**Save Filters**

For frequently used filter criteria (such as "defective batches in last 30 days," "all batches for product line A," etc.), click **Save As** to save filter conditions as a named filter. Saved filters appear in the sidebar's **Element Filters** list for quick re-execution with a click.

**From Event List to Deep Analysis**

After locating target events in the event list, click an event to view its detailed information (start/end times, duration, aggregated metrics, custom attribute values, etc.). From the event details page, you can jump directly to trend chart analysis, multi-event comparison, and other in-depth analysis scenarios.

Through flexible search and filtering, users can quickly locate key events of interest from massive historical event data, laying the foundation for subsequent comparative analysis, quality traceability, and process optimization.

### Event Analysis and Exploration

After events are generated, they can be analyzed and explored in depth through event views. IDMP provides multiple event comparison and visualization methods to help users understand differences and patterns across events from various perspectives.

**Batch List and Details**

In the element's **Events** tab, view all historical event records for that equipment, with filtering by time range, event type, and other criteria. Click a single event to view its complete information — start/end times, duration, aggregated metrics, and custom attribute values.

**Ad Hoc Events**

Beyond system-generated or manually entered events, IDMP also supports users directly creating **ad hoc events** — no template or trigger configuration required. Users can flexibly combine time ranges with attribute conditions to instantly define and generate events of interest. Specifically, users can click **+** on the element event list page, then a popup window **Generate Test Event Data** appears, where they can configure personalized event rules to generate ad hoc events.

![Ad Hoc Event Generation](./images/adhoc-event.png)

Ad hoc events can participate in analysis like formal events, overlaid with existing system events in the same chart for comparison. This capability is particularly useful in the following scenarios:

- **Exploratory analysis:** Before establishing a complete batch management system, quickly define time periods of interest through flexible condition combinations and immediately begin comparative analysis
- **Supplementary comparison:** When discovering equipment operation anomalies, precisely lock onto that time period by combining time range and parameter conditions, then compare side-by-side with nearby normal batches or golden batches to quickly identify differences
- **Hypothesis validation:** After adjusting process parameters, instantly define ad hoc events for several post-adjustment time periods and compare with pre-adjustment batches to validate improvement effectiveness

**Trend Overlay Comparison**

In the Analysis Chart, overlay event time ranges onto process parameter curves to visually present how each parameter evolved during the event. After selecting multiple events, overlay their curves in the same chart for comparison, quickly identifying process differences, parameter drift, and anomalous fluctuations between events.

![Multi-event curve overlay comparison](./images/event-trend-01.png)

The figure above shows multi-event curve overlay comparison. By plotting complete process curves from different events on the same timeline, you can clearly see parameter performance during each event and identify events that deviate from the normal range.

**Multi-Swimlane Analysis**

The multi-swimlane view plots each event's curves in separate subplots, with each attribute occupying its own "lane." This layout avoids visual clutter from curve overlap, and is particularly suitable for simultaneously comparing large numbers of events (10 or more). Users can quickly scan each event's complete process and identify events that clearly deviate from the group pattern.

![Multi-swimlane analysis](./images/event-trend-02.png)

The figure above shows event comparison in multi-swimlane layout. Each attribute occupies a separate row, arranged vertically, making it easy to inspect each event's process curve shape individually and quickly identify characteristic patterns of anomalous events.

**Event Line Analysis**

The Analysis Chart offers multiple display modes for attribute trends and event overlays. By default, events are overlaid directly on the attribute trend chart using a darker background.

Users can also click the **Enable Event Line Mode** action in the toolbar. In this mode, events appear as separate colored lines above the attribute trend chart. When hovering over an event line, the system reveals key information for that event. This mode is especially useful when investigating many different event types at once.

![Event line analysis](./images/event-trend-line.png)

**Time Series Forecasting**

The Analysis Chart integrates time series forecasting capabilities. Users can click the **Forecast** icon in the toolbar, select the attribute to forecast, configure the forecasting algorithm and parameters, and generate forecast data with one click. For detailed information about forecasting algorithms, see [Time-Series Forecasting](./01-forecasting.md).

![Forecast analysis](./images/event-trend-forecast.png)

**Missing Value Imputation**

The Analysis Chart also includes missing value imputation capabilities. Users can click the **Missing Value Imputation** icon in the toolbar, select the time window to impute, configure the imputation algorithm and parameters, and generate imputed data with one click. They can then choose to reset or save the imputed results. For detailed information about imputation algorithms, see [Missing Data Imputation](./03-missing-data-imputation.md).

![Missing value imputation](./images/event-trend-imputation.png)

![Missing value imputation save](./images/event-trend-imputation-save.png)

**Time Alignment**

Time alignment aligns the start points of multiple events to the same moment (such as t=0), enabling direct comparison of process parameters at the same relative time points across different events. This eliminates the effect of actual event occurrence time differences, focusing on the internal process itself. Time alignment is particularly suited for analyzing parameter performance during relative time periods such as "first 2 hours from start" or "mid-reaction phase."

![Time alignment analysis](./images/event-trend-03.png)

The figure above shows event comparison after time alignment. All event start points are aligned to t=0, with the horizontal axis representing relative time since event start. This approach enables clear comparison of parameter performance at the same relative time points across events, identifying process execution consistency.

**Time Normalization**

Time normalization maps events of different durations to a unified time scale (such as 0% to 100%), enabling comparison of events with varying lengths in the same coordinate system. After normalization, the horizontal axis no longer represents absolute or relative time, but rather event completion percentage. This method is particularly suitable for comparing events with significantly different cycle times (such as 6-hour vs. 8-hour batches), focusing on relative performance at each process stage rather than absolute duration.

![Time normalization analysis](./images/event-trend-04.png)

The figure above shows event comparison after time normalization. All event timelines are compressed or stretched to a unified 0%–100% scale, with the horizontal axis representing event completion progress. Through normalization, you can compare process parameters at relative progress points such as "first 25%," "mid 50%," or "final stage" across events of different durations, revealing differences in process execution rhythm.

**Envelope Analysis**

The envelope function automatically calculates and plots parameter boundary curves (such as maximum, minimum, mean ± standard deviation) based on historical event data. The envelope defines the normal parameter fluctuation range for events, forming a "safe corridor." Comparing a new event's curve against the envelope quickly reveals whether the event operated within normal bounds or deviated from historical patterns during specific time periods.

![Envelope analysis](./images/event-trend-05.png)

The figure above shows envelope analysis. The orange area represents the parameter fluctuation range of the current event (such as mean ± 2 standard deviations), while the colored curves represent the upper and lower limit parameters of the current event. When curves exceed the envelope boundaries, it indicates the event's parameters were anomalous during that period, requiring further investigation. The envelope provides a quantitative reference baseline for batch quality assessment.

Through the combined use of these analysis methods, users can deeply understand event differences from multiple perspectives, identify key process factors affecting quality, and provide data support for process optimization and quality control.

:::note
Event template creation and management — including custom attribute definitions, naming rules, and severity configuration — is performed in **Foundation Library → Event Templates**. For the full analysis configuration reference, see the [Real-Time Intelligent Analysis and Response](../07-real-time-analysis/02-creating-analysis.md) chapter. For the complete event reference, see the [Events](../../events/) chapter.
:::

## Usage Example

**Scenario Background**

An automotive parts plant's injection molding workshop operates 8 injection molding machines producing precision plastic housings, with each batch producing approximately 1,000 parts over a 6–8 hour cycle. Injection temperature, hold pressure, and cooling time are the critical parameters affecting housing dimensional accuracy and surface quality. Recently, defect rates for certain batches have been noticeably elevated, and the process team wants to use the Analysis Chart to comprehensively leverage window analysis, event comparison, and time-series forecasting to pinpoint the root cause.

**Steps**

1. **Configure automatic batch generation:** The injection molding machine equipment attributes already have a `Batch Number` integer attribute configured, which the MES system automatically writes a new batch number into at the start of each production batch. In the injection molding machine element's **Analysis** tab, create an "Injection Molding Batch Summary" analysis with trigger type set to **State Window** and state attribute set to `Batch Number`. In the calculation step, configure four summary metrics: average injection temperature, average hold pressure, average cooling time, and total batch duration. In the event step, enable event generation using the "Injection Molding Batch" event template. After saving, the system automatically generates event records for all batches from the past 3 months.
2. **Window analysis to explore anomalous periods:** In the Analysis Chart, open one injection molding machine's injection temperature trend. Click the **Window Analysis** icon in the toolbar, select **Event Window**, set the start condition to `injection_temp < 220` and end condition to `injection_temp > 225`. The system finds 18 temperature-low periods across the past 3 months of data and highlights them on the chart. The process team discovers these periods are concentrated in the second half of the night shift.
3. **Event comparison to pinpoint root cause:** In the event view, filter the 40 most recent batch events, divide them into two groups by defect rate, and use the trend overlay comparison and time alignment features to overlay both groups' injection temperature curves in the same chart. Analysis confirms that high-defect batches show injection temperature consistently falling below 220°C during the second half of production (approximately hours 5–8), while low-defect batches maintain stable temperature at 225–235°C throughout.
4. **Forecasting to support decisions:** In the Analysis Chart, enable time-series forecasting for the faulty injection molding machine's injection temperature. The forecast curve shows that without intervention, the temperature will continue declining over the next 24 hours, providing quantitative justification for urgent repair.

**Outcome**

Investigation revealed that the root cause was aging barrel heating elements that could no longer maintain the target temperature when night shift output declined. Window analysis helped the team quickly identify the distribution pattern of anomalous periods, event comparison confirmed the direct correlation between low temperature and high defect rates, and the time-series forecast provided quantitative justification for repair urgency. After replacing the heating elements and adjusting process parameters, defect rates across the subsequent 15 batches dropped from an average of 4.2% to 1.1%, and injection temperature curves became consistent.
