---
title: Bar Chart
sidebar_label: Bar Chart
---

# 4.2.2 Bar Chart

## 4.2.2.1 Overview

The Bar Chart represents values as vertical or horizontal bars, where bar height (or width) encodes the data value. It is designed for aggregated data — values grouped by time buckets or by categorical dimensions — making it ideal for comparison across periods or groups.

![Bar chart comparing values across time buckets](../images/bar-demo.png)

Each bar corresponds to one aggregated value: a sum, average, or count over a time window (e.g., hourly energy consumption) or over a category (e.g., output per production line). Multiple metrics can be shown as grouped or stacked bar sets.

## 4.2.2.2 When to Use

Use the Bar Chart when:

- You are comparing discrete quantities across time periods (hourly, daily, monthly)
- You are comparing the same metric across multiple categories or sites
- You want to visualize the contribution of parts to a whole using stacked bars
- Your data is inherently aggregated rather than a continuous time-series

For continuous time-series data where the trend shape matters, use the Trend Chart instead. For a single summary value (e.g., total consumption today), use the Stat Value panel.

## 4.2.2.3 Configuration

### Edit Mode Toolbar

In addition to the [common edit mode controls](../01-panels.md#414-panel-edit-mode), the Bar Chart adds:

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Control</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Save as Image</strong></td><td>Download the current preview as a PNG image</td></tr>
<tr><td><strong>Full Screen</strong></td><td>Expand the editor preview to fill the browser window</td></tr>
<tr><td><strong>Panel Insights</strong></td><td>Run AI analysis on the current preview data</td></tr>
</tbody>
</table>

### Graph Settings

#### Orientation

The Bar Chart supports **Vertical** (default) and **Horizontal** layouts. Horizontal bars work better when category labels are long or when comparing many groups side by side:

![Bar chart in horizontal layout](../images/bar-horizontal.png)

#### Bar Style

**Bar Width** and **Bar Opacity** control the appearance of individual bars:

![Bar width and opacity settings](../images/bar-style.png)

If Bar Width is left unset, the chart automatically sizes bars based on the available width and the number of bars — this adaptive behavior works well in most cases. Only set a fixed width when displaying on a fixed-resolution screen where precise spacing is required.

<table>
<colgroup><col style="width:9em"/><col/></colgroup>
<thead><tr><th>Setting</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Orientation</strong></td><td>Vertical (bars extend up) or Horizontal (bars extend right)</td></tr>
<tr><td><strong>Bar Width</strong></td><td>Width of individual bars (slider; leave unset for auto)</td></tr>
<tr><td><strong>Bar Opacity</strong></td><td>Transparency of bars, 0–1</td></tr>
<tr><td><strong>Stack Series</strong></td><td>Stack multiple metrics: None, Same Sign, All, Positive, Negative</td></tr>
</tbody>
</table>

#### Labels

When category labels are long or numerous, they can overlap on the axis. Two settings address this:

1. **Rotate Labels** — tilt the label text to prevent overlap:

![Category axis labels rotated to avoid overlap](../images/bar-rotate.png)

2. **Label Interval** — reduce the number of labels shown:

![Label interval reduced to lower density](../images/bar-interval.png)

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Setting</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Rotate Labels</strong></td><td>Rotation angle for axis labels</td></tr>
<tr><td><strong>Label Interval</strong></td><td>Label density: Auto, Small, Medium, Large</td></tr>
</tbody>
</table>

### Axis Settings

#### Axis Title

The Y axis can be labeled with a name and unit:

![Y-axis title configured on the bar chart](../images/bar-ytitle.png)

#### Dual Y Axis

When two metrics with very different scales are plotted together, the smaller signal is compressed and unreadable on a shared axis. Enabling the **Right Y Axis** assigns each metric to its own scale:

![Dual Y axis showing two metrics at different scales](../images/bar-bothY.png)

<table>
<colgroup><col style="width:12em"/><col/></colgroup>
<thead><tr><th>Setting</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Left Y Axis Title</strong></td><td>Label for the left Y axis</td></tr>
<tr><td><strong>Value Range</strong></td><td>Min and Max for the Y axis (blank = auto-scale)</td></tr>
<tr><td><strong>Right Y Axis</strong></td><td>Enable a secondary Y axis on the right</td></tr>
</tbody>
</table>

### Limits Settings

Limit lines from the attribute configuration — LoLo, Lo, Target, Hi, HiHi — can be displayed as horizontal reference lines across the bars, marking safe and alert zones:

![Bar chart with limit lines marking operating boundaries](../images/bar-limit.png)

### Legend Settings

In Table mode, the legend can display summary statistics alongside each series:

![Legend in table mode with statistics](../images/bar-legend.png)

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Setting</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Show</strong></td><td>Display mode: List, Table, or Hidden</td></tr>
<tr><td><strong>Placement</strong></td><td>Position: Bottom or Right</td></tr>
<tr><td><strong>Legend Values</strong></td><td>Statistics shown in Table mode: Last, Min, Max, Mean, Sum, etc.</td></tr>
</tbody>
</table>

## 4.2.2.4 Example Scenarios

**Daily energy consumption comparison.** An energy analyst needs to compare electricity consumption across each day of the past month. A bar chart with a 1-day sliding window shows one bar per day. The Hi limit line highlights days that exceeded the target consumption level.

**Site-by-site throughput.** A operations manager adds a Dimension grouping by site name. Each bar represents one site's total production output for the selected period. Switching to horizontal layout improves readability when site names are long.

**Residential vs. industrial load stacking.** Two metrics — residential consumption and industrial consumption — are added to the same bar chart with Stack Series enabled. Each bar shows the total load with the two components visually separated by color, making it easy to see which component dominates at each time bucket.
