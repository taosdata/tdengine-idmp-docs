---
title: Missing Data Imputation
sidebar_label: Missing Data Imputation
---

# 8.9 Missing Data Imputation

Time-series data in industrial environments frequently has gaps — sensors go offline, network interruptions delay data delivery, or hardware faults cause temporary measurement loss. Missing data imputation fills these gaps with estimated values, ensuring that downstream analyses, averages, and KPI calculations are not skewed by missing readings.

:::note
Missing data imputation via TDgpt requires the **TDgpt module** to be installed alongside IDMP. It does not require an LLM connection.
:::

IDMP provides AI-based imputation through **TDgpt**, which uses learned patterns from the signal's historical behavior to estimate what the values during a gap should have been.

## How Imputation Works

TDgpt's imputation capability operates on a time window of historical data around a gap. It applies a trained model to predict the most likely values for the missing timestamps and writes those estimates back into the data. The imputed values are flagged as estimated, distinguishing them from actual sensor measurements.

Imputation is complementary to TDengine's native interpolation functions (`INTERP`, `FILL`). Native interpolation uses simple strategies (linear, previous value, next value) and is suitable for short, predictable gaps. TDgpt imputation uses learned patterns and is better suited for longer gaps, irregular signals, or cases where simple interpolation would produce unrealistic values.

## Configuring Imputation

This section introduces AI-powered missing-data imputation and its basic usage. For the full interactive workflow executed directly in the Trend Chart or Analysis Chart, see Chapter 9 [Missing Data Imputation](../09-advanced-analytics/02-missing-data-imputation.md).

Imputation can be launched directly from the Trend Chart view page. Open a Trend Chart that displays the attribute with missing data, then use the **Imputation** icon in the toolbar to enable imputation and select the method.

## Supported TDgpt Algorithms

| Algorithm | Characteristics |
|---|---|
| **MEAN** | Fills gaps with the local mean of surrounding values — fast and robust for stable signals |
| **IEM** | Iterative expectation-maximization — suitable for correlated multivariate signals |
| **LSTM** | PyTorch LSTM model — captures temporal dependencies for complex, non-stationary signals |
| **TDtsfm** | TDengine's time-series foundation model |

## Viewing and Toggling Imputation in a Trend Chart

Imputed values appear in Trend Chart panels and attribute history views alongside measured data, visually distinguishable from actual sensor measurements.

In the Trend Chart panel, the **Imputation** icon in the toolbar lets you enable or disable imputation directly from the chart view, without changing the attribute configuration. Use this to compare the raw data, including gaps, against the imputed view.
