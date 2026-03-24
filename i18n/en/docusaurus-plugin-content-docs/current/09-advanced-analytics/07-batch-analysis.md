---
title: Batch Analysis
sidebar_label: Batch Analysis
---

# 9.7 Batch Analysis

Batch analysis is the core analytical method for discrete manufacturing and process operations in industrial data science. IDMP supports systematic comparison and analysis of full-cycle data across batch production, chemical reaction, and fabrication processes — helping users identify the process factors that drive product quality, surface patterns and anomalies across batches, and build a data foundation for process optimization and quality control.

## How It Works

The fundamental idea behind batch analysis is: **treat each bounded production, reaction, or processing run as a self-contained unit of analysis, then compare, aggregate, and trace across multiple batches to find patterns, locate differences, and identify anomalies.**

Unlike continuous process analysis, batch analysis focuses on the complete lifecycle of each batch — from start to finish. A well-executed batch typically shows stable process parameters, key metrics within target ranges, and curves that closely match those of past successful batches. A problematic batch may exhibit parameter drift during a specific phase, anomalous spikes, or a visible divergence from the reference curve.

Batch analysis typically serves four objectives:

- **Batch comparison:** Overlay the current batch against historical batches, golden batches, or standard reference curves to visualize consistency and pinpoint deviations
- **Quality traceability:** Group batches by quality outcome, compare process parameters between passing and failing groups, and identify the root causes of quality variation
- **Anomaly batch identification:** Screen historical batches to surface those where process parameters deviated from the normal operating window, supporting quality audits and process reviews
- **Trend monitoring:** Track batch-to-batch trends in key metrics — yield, cycle time, energy consumption — to detect gradual process drift or equipment aging

## Application Scenarios

Batch analysis delivers broad practical value across discrete manufacturing and process industries:

**Pharmaceutical and Biopharmaceutical**

- Compare full-cycle data across fermentation, crystallization, and purification batches to identify the process parameters that drive yield and purity
- Archive each batch's complete process data as an electronic batch record to support GMP compliance audits and deviation investigations

**Chemical and Fine Chemical**

- Aggregate and compare batch parameters for synthesis reactions, polymerization, and distillation to optimize reaction conditions and feed ratios
- Track yield and quality trends across batches to detect the effects of raw material variation or catalyst deactivation as they develop

**Semiconductor and Electronics Manufacturing**

- Compare chamber parameters across etch, deposition, and diffusion batches to identify the process variables most strongly linked to yield
- Monitor equipment state drift through batch-to-batch parameter consistency analysis, supporting preventive maintenance decisions

**Injection Molding and Forming**

- Aggregate injection temperature, hold pressure, and cooling rate statistics across molding cycles or production lots to establish the process window baseline
- Compare defective-lot process data against conforming lots to quickly pinpoint the phase where parameters went off-spec

## Batch Definition and Implementation

In IDMP, a batch is defined as an **Event** — a discrete operational record with an explicit start time, end time, and duration. Each batch event captures the time boundaries of the batch and can carry custom attributes such as batch ID, product type, operator, and quality conclusion. Batch events are linked to the element and its time-series attributes, making it straightforward to extract and analyze the complete process data for any batch.

Batch boundaries can be defined in two ways:

**Manual entry:** An operator creates the batch event in the event management interface after the batch is complete, entering the start and end times directly. Suitable for processes where production rhythm is irregular or batch boundaries require human judgment.

**Automatic generation (recommended):** Add a **batch number** attribute to the equipment — a time-series field that carries the batch identifier currently in production. Whenever the batch number changes (signaling the start of a new batch), IDMP's **State Window** trigger detects the state transition, fires the analysis to aggregate the previous batch's data, and automatically creates the corresponding batch event record. No manual time-marking is needed; the system maintains a complete, accurate record of every batch in real time.

:::note
The batch number attribute must be an integer type so that the IDMP State Window trigger can detect batch transitions. Batches can be tracked by auto-incrementing the batch number with each new run, or by any other integer-based encoding scheme.

For processes where batch boundaries are naturally defined by data silence gaps — for example, equipment that stops reporting data between batches — the **Session Window** trigger can be used instead, automatically completing the batch summary when the data stream resumes after a gap.
:::

## How to Use

Batch analysis in IDMP is viewed and explored through the **Events** interface. Automatic batch event generation is configured through **Element Analysis**.

### Configure Automatic Batch Generation

Steps:

1. Confirm that the equipment has a **batch number** attribute (integer type) that is updated at the start of each new batch.
2. Navigate to the element's **Analysis** tab, click **+** to create a new analysis, and enter a name such as "Batch Process Summary."
3. In the **Trigger** step, select **State Window** as the trigger type and set the **State** attribute to the batch number field.
4. In the **Calculation** step, configure the batch summary metrics to compute — such as average temperature, peak pressure, total duration, and yield — and map the results to output attributes.
5. In the **Event** step, enable event generation, select the **event template** for batch events, and configure the naming rule and custom attributes (such as batch ID and product type).
6. Click **Save**. The analysis begins running continuously.

Once configured, every time the batch number changes, the system automatically completes the previous batch summary and creates its event record.

### Analyze Batches in the Event View

After batch events are generated, they can be explored through the following views:

- **Batch list:** In the element's **Events** tab, browse the full history of batch records for the equipment, with filtering by time range, event type, and other criteria.
- **Batch details:** Click a single batch event to view its complete record — start and end times, duration, aggregated summary metrics, and custom attribute values.
- **Trend chart comparison:** In a Trend Chart panel, overlay batch time ranges on process parameter curves to visualize how each parameter evolved across the batch; overlay multiple batches for side-by-side curve comparison to identify process differences between batches.

![Multi-batch curve overlay comparison](../04-visualization/images/event-trend-start-time.png)

:::note
Event template management — including custom attribute definitions, naming rules, and severity configuration — is done in **Foundation Library → Event Templates**. For the full analysis configuration reference, see the [Real-Time Analysis](../07-real-time-analysis/02-creating-analysis.md) chapter. For the full events reference, see the [Events](../06-events/) chapter.
:::

## Example

**Background**

An automotive parts plant runs eight injection molding machines producing precision plastic enclosures, with each production lot of approximately 1,000 parts running for 6–8 hours. Injection temperature, hold pressure, and cooling time are the critical parameters governing dimensional accuracy and surface quality. Recent lots have shown elevated defect rates, and the process team wants to use batch analysis to pinpoint the cause.

**Steps**

1. The injection molding machine already has a `Batch Number` integer attribute, which the MES system updates at the start of each new lot.
2. In the machine element's **Analysis** tab, create an "Injection Molding Batch Summary" analysis. Set the trigger type to **State Window** with the `Batch Number` attribute as the state. In the calculation step, configure four summary metrics: average injection temperature, average hold pressure, average cooling time, and total lot duration. In the event step, enable event generation using the "Injection Molding Batch" event template, with batch ID and operator as custom attributes.
3. After saving, the system back-calculates three months of historical data, automatically generating event records for all past lots. Going forward, each lot is summarized and recorded automatically when it ends.

**Outcome**

The process team filtered the event list to the 40 most recent lots and divided them into a high-defect group and a low-defect group. Overlaying the injection temperature curves for both groups in a Trend Chart revealed a clear pattern: high-defect lots showed injection temperature falling below the setpoint (under 220°C) consistently during the second half of the cycle (hours 5–8), while low-defect lots maintained temperature stably between 225°C and 235°C throughout.

Investigation traced the root cause to aging barrel heating elements that could no longer sustain the target temperature during lower-throughput night shifts. After replacing the heating elements and adjusting process parameters, defect rates across the following 15 lots dropped from an average of 4.2% to 1.1%, and injection temperature profiles became consistent batch to batch.
