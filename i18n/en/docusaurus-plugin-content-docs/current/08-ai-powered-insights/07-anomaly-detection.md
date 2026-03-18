---
title: Anomaly Detection
sidebar_label: Anomaly Detection
---

# 8.7 Anomaly Detection

:::note
Anomaly detection requires the **TDgpt module** to be installed alongside IDMP. It does not require an LLM connection.
:::

Anomaly detection in IDMP is powered by **TDgpt**, TDengine's built-in time-series AI engine. It is available as one of the eight trigger types when creating a real-time analysis. Unlike threshold-based triggers where you must define explicit boundary conditions, the Anomaly Detection trigger identifies unusual behavior automatically — you select the target attribute and the algorithm; TDgpt determines when anomalies begin and end.

## How It Works

When an analysis is configured with the **Anomaly Detection** trigger, TDgpt continuously monitors the selected attribute's time-series data. It applies the chosen algorithm to model the expected behavior of the signal and flags periods where the observed values deviate significantly from that model. The analysis fires when an anomaly window is detected, and the event it generates captures the anomaly start and end times.

Because detection is model-based rather than rule-based, TDgpt can identify complex patterns — gradual drift, sudden spikes, seasonal deviations — that fixed thresholds would miss or falsely trigger on.

## Configuring an Anomaly Detection Analysis

To create an anomaly detection analysis:

1. Navigate to the element's **Analyses** tab and click **+** to create a new analysis.
2. In the **Trigger** section, select **Anomaly Detection** as the trigger type.
3. Configure the Anomaly Detection trigger fields:

| Field | Description |
|---|---|
| **Attribute** | The element attribute to monitor for anomalies |
| **Algorithm** | The anomaly detection algorithm to apply (see below) |
| **Window** | The time window over which the algorithm evaluates each data segment |

4. Complete the **Calculation** and **Event** sections as with any other analysis type.
5. Click **Save**.

## Supported Algorithms

TDgpt includes multiple anomaly detection algorithms backed by different ML frameworks:

| Algorithm | Framework | Characteristics |
|---|---|---|
| **IQR** | Statistical | Interquartile range — simple, fast, works well for univariate signals with clear outliers |
| **LOF** | scikit-learn | Local Outlier Factor — density-based, effective for detecting point anomalies |
| **Isolation Forest** | scikit-learn | Tree-based, robust to high-dimensional data and varying anomaly density |
| **LSTM-AD** | PyTorch | LSTM-based sequence model — captures temporal dependencies, suitable for seasonal or periodic signals |
| **TDtsfm** | TDengine | TDengine's own time-series foundation model, pre-trained on industrial time-series data |

The appropriate algorithm depends on the nature of the signal and the type of anomaly you expect. For most industrial sensor streams, IQR or Isolation Forest provide a good starting point.

## Output

When TDgpt detects an anomaly window, the analysis fires and (if event generation is enabled) creates an event capturing the anomaly period. The start and end timestamps of the anomaly window are stored as event attributes.

For the full trigger configuration reference, see [Trigger Types](../07-real-time-analysis/03-trigger-types.md).
