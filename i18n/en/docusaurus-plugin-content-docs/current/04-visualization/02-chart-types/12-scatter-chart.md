---
title: Scatter Chart
sidebar_label: Scatter Chart
---

# 4.2.12 Scatter Chart

## 4.2.12.1 Overview

The Scatter Chart plots individual data points as dots in a two-dimensional space. In the default mode each point's X position is the timestamp and its Y position is the metric value — a time-scatter view. For correlation analysis, two attributes are plotted against each other (Y vs. X), revealing the relationship between the two variables.

![Scatter chart showing data points in two-dimensional space](../images/scatter-demo.png)

Beyond basic plotting, the Scatter Chart supports data aggregation and regression analysis, making it the primary panel type for statistical and correlation-based analysis in TDengine IDMP.

## 4.2.12.2 When to Use

Use the Scatter Chart when:

- You want to explore the relationship between two process variables (e.g., power vs. temperature, flow rate vs. pressure drop)
- You need to identify clusters or outliers in a dataset
- You want to fit a regression curve to quantify a relationship
- You want to plot raw, unsampled data points without aggregation

For continuous line-based trend analysis, use the Trend Chart. For discrete state patterns, use the State Timeline.

## 4.2.12.3 Configuration

### View Mode Toolbar

In addition to the [common view mode controls](../01-panels.md#413-panel-view-mode), the Scatter Chart adds:

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>Control</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Disable Sampling</strong></td><td>Fetch raw data without downsampling to ensure all individual data points are plotted</td></tr>
</tbody>
</table>

### Edit Mode Toolbar

In addition to the [common edit mode controls](../01-panels.md#414-panel-edit-mode), the Scatter Chart adds:

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>Control</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Disable Sampling</strong></td><td>Toggle raw data mode for the preview</td></tr>
<tr><td><strong>Save as Image</strong></td><td>Download the current preview as a PNG image</td></tr>
<tr><td><strong>Full Screen</strong></td><td>Expand the editor preview to fill the browser window</td></tr>
<tr><td><strong>Panel Insights</strong></td><td>Run AI analysis on the current preview data</td></tr>
</tbody>
</table>

### Graph Settings

#### Point Style

The symbol shape, size, and opacity of each data point are configurable:

![Scatter chart symbol shape options](../images/scatter-step.png)

![Scatter chart point size and opacity settings](../images/scatter-style.png)

#### Special Points

The **Special Point** setting highlights specific data points — such as the maximum or minimum value — with a distinct marker and custom color:

![Special point markers highlighting maximum and minimum values](../images/scatter-point.png)

#### Labels

When data is dense, axis labels can overlap. Use **Rotate Labels** and **Label Interval** to improve readability:

![Dense axis labels before adjustment](../images/scatter-tendency.png)

![Labels rotated to prevent overlap](../images/scatter-rotate.png)

![Label interval reduced to lower density](../images/scatter-interval.png)

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>Setting</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Style</strong></td><td>Symbol shape for data points (circle, heart, smiley, and others)</td></tr>
<tr><td><strong>Symbol Size</strong></td><td>Size of each dot (slider, default 6)</td></tr>
<tr><td><strong>Scatter Opacity</strong></td><td>Transparency of dots, 0–1</td></tr>
<tr><td><strong>Special Point</strong></td><td>Highlight max/min or other specific points with a distinct marker</td></tr>
<tr><td><strong>Rotate Labels</strong></td><td>Rotation angle for X-axis labels</td></tr>
<tr><td><strong>Label Interval</strong></td><td>Density of X-axis labels</td></tr>
</tbody>
</table>

### Transform Settings

The Scatter Chart has a unique Transform section for analytical functions:

**Data Aggregation** groups points into clusters, displayed with distinct colors to enable visual clustering analysis:

![Scatter chart with data aggregation showing color-coded clusters](../images/scatter-aggregation.png)

**Regression Analysis** fits a curve to the data and overlays it on the scatter plot. Supported functions include linear regression, exponential regression, and polynomial regression (with configurable degree):

![Scatter chart with regression curve overlaid](../images/scatter-analysis.png)

<table>
<colgroup><col style="width:15em"/><col/></colgroup>
<thead><tr><th>Transform Function Type</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Off</strong></td><td>No transform; raw data points are plotted</td></tr>
<tr><td><strong>Data Aggregation</strong></td><td>Groups data points and displays aggregated clusters</td></tr>
<tr><td><strong>Regression Analysis</strong></td><td>Fits a regression curve (linear, exponential, or polynomial) to the data</td></tr>
</tbody>
</table>

### Axis Settings

#### Axis Title

Configure Y-axis labels with names and units:

![Scatter chart with Y-axis title configured](../images/scatter-title.png)

#### Dual Y Axis

When two metrics have very different scales, a shared Y axis compresses the smaller signal. Enabling the **Right Y Axis** assigns each to its own scale:

![Scatter chart with two metrics on a shared axis — smaller signal compressed](../images/scatter-both.png)

![Scatter chart with dual Y axis — each metric readable](../images/scatter-bothY.png)

### Limits Settings

Limit lines can be overlaid on the scatter plot to mark operating boundaries:

![Scatter chart with limit lines](../images/scatter-limit.png)

### Legend Settings

In Table mode, the legend shows summary statistics. When placed on the Right with Table mode, the legend table width is also adjustable:

![Scatter chart legend in table mode with statistics](../images/scatter-legend.png)

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Setting</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Show</strong></td><td>Display mode: List, Table, or Hidden</td></tr>
<tr><td><strong>Placement</strong></td><td>Position: Bottom or Right</td></tr>
<tr><td><strong>Legend Values</strong></td><td>Statistics shown in Table mode: Last, Min, Max, Mean, Sum, etc.</td></tr>
</tbody>
</table>

## 4.2.12.4 Example Scenarios

**Power vs. temperature correlation.** A process engineer plots active power (X dimension) against motor temperature (Y metric) over a month of data. The scatter plot reveals a clear positive correlation — the regression curve quantifies the relationship and the R² value indicates its strength.

**Quality clustering.** A quality engineer plots two process variables (pressure and temperature) for all batches in a quarter. Data Aggregation colors the clusters — most batches cluster tightly in the green zone, but a handful of outliers in a separate cluster correlate with the failed batches.

**Outlier detection.** A data engineer enables Disable Sampling to plot every raw reading of a sensor. The Special Point setting highlights the maximum value with a red marker. A clear outlier point significantly above the cluster is identified for investigation.
