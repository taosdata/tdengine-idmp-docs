---
title: Forecasting
sidebar_label: Forecasting
---

# 8.8 Forecasting

:::note
Forecasting requires the **TDgpt module** to be installed alongside IDMP. It does not require an LLM connection.
:::

IDMP supports AI-based time-series forecasting powered by **TDgpt**. Forecasting predicts future values of an element attribute based on its historical behavior, enabling proactive operations — identifying potential threshold breaches, planning maintenance windows, or estimating future consumption.

## 8.8.1 Configuring Forecasting on an Attribute

Forecasting is configured per attribute in the **Forecast Configuration** section of the attribute properties.

To enable forecasting for an attribute:

1. Open the attribute (from the element's **Attributes** tab, click the attribute name).
2. Click **Edit**.
3. Expand the **Forecast Configuration** section.
4. Select the forecast provider:

| Option | Description |
|---|---|
| **TDgpt** | Use TDengine's built-in time-series forecasting engine. Select the forecast algorithm and configure the forecast horizon (how far ahead to predict). |
| **External** | Connect to an external forecasting service via a configured endpoint. |
| **None** | No forecasting (default). |

5. When **TDgpt** is selected, configure:

| Field | Description |
|---|---|
| **Algorithm** | The forecasting algorithm (see below) |
| **Forecast Rows** | The number of future data points to predict |

6. Click **Save**.

## 8.8.2 Supported Algorithms

TDgpt provides several forecasting algorithms:

| Algorithm | Characteristics |
|---|---|
| **ARIMA** | Classical statistical model for stationary time series with trend and seasonality components |
| **HoltWinters** | Exponential smoothing with trend and seasonal decomposition — good for regular periodic patterns |
| **LSTM** | PyTorch-based LSTM neural network — captures complex nonlinear temporal dependencies |
| **TDtsfm** | TDengine's time-series foundation model, pre-trained on diverse industrial time-series data for zero-shot and fine-tuned forecasting |

## 8.8.3 Viewing and Toggling Forecasts in a Trend Chart

Once forecasting is enabled on an attribute, forecast values appear alongside historical data in Trend Chart panels. The predicted values are rendered as a continuation of the time-series line, visually distinguishable from measured data.

In the Trend Chart panel, a **forecast control icon** on the right side of the chart lets you toggle the forecast overlay on or off without changing the attribute configuration. Use this to quickly show or hide the predicted values while browsing data.

Forecast results are accessible programmatically via TDengine SQL using the `FORECAST` function, which returns the predicted values for a configured number of future rows.

## 8.8.4 Use Cases

- **Energy management:** Forecast electricity consumption for the next 24 hours to optimize load scheduling.
- **Predictive maintenance:** Forecast temperature or vibration trends to anticipate when a value will breach a threshold.
- **Capacity planning:** Forecast storage tank levels or production throughput over the coming week.
