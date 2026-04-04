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

## 8.9.1 How Imputation Works

TDgpt's imputation capability operates on a time window of historical data around a gap. It applies a trained model to predict the most likely values for the missing timestamps and writes those estimates back into the data. The imputed values are flagged as estimated, distinguishing them from actual sensor measurements.

Imputation is complementary to TDengine's native interpolation functions (`INTERP`, `FILL`). Native interpolation uses simple strategies (linear, previous value, next value) and is suitable for short, predictable gaps. TDgpt imputation uses learned patterns and is better suited for longer gaps, irregular signals, or cases where simple interpolation would produce unrealistic values.

## 8.9.2 Configuring Imputation

Imputation is configured directly from a Trend Chart panel. Open a Trend Chart that displays the attribute with missing data, then use the **imputation control icon** on the right side of the chart to enable imputation and select the method.

## 8.9.3 Supported TDgpt Algorithms

The following algorithms are available when TDgpt imputation is enabled, each suited to different signal characteristics and gap lengths.

<table>
<colgroup><col style="width:7em"/><col/></colgroup>
<thead><tr><th>Algorithm</th><th>Characteristics</th></tr></thead>
<tbody>
<tr><td><strong>MEAN</strong></td><td>Fills gaps with the local mean of surrounding values — fast and robust for stable signals</td></tr>
<tr><td><strong>IEM</strong></td><td>Iterative expectation-maximization — suitable for correlated multivariate signals</td></tr>
<tr><td><strong>LSTM</strong></td><td>PyTorch LSTM model — captures temporal dependencies for complex, non-stationary signals</td></tr>
<tr><td><strong>TDtsfm</strong></td><td>TDengine's time-series foundation model</td></tr>
</tbody>
</table>

## 8.9.4 Viewing and Toggling Imputation in a Trend Chart

Imputed values appear in Trend Chart panels and attribute history views alongside measured data, visually distinguishable from actual sensor measurements.

In the Trend Chart panel, an **imputation control icon** on the right side of the chart lets you toggle imputation on or off directly from the chart view, without changing the attribute configuration. Use this to compare the raw data (with gaps) against the imputed view.
