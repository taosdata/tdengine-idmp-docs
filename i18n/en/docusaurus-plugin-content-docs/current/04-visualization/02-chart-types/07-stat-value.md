---
title: Stat Value
sidebar_label: Stat Value
---

# 4.2.7 Stat Value

## 4.2.7.1 Overview

The Stat Value panel displays a single large numeric value with an optional label and timestamp. It is designed for dashboards and status boards where a key figure needs to be visible at a distance or in a summary view.

![Stat value panel showing a large numeric readout](../images/stat-demo.png)

The value shown is the latest data point in the selected time range. Font size, color, background, and layout are all configurable to match the visual design of the containing dashboard.

## 4.2.7.2 When to Use

Use the Stat Value panel when:

- You need a headline number on a dashboard — total production today, current temperature, active alarm count
- You want a large, readable display for an operator screen viewed from a distance
- You are building a KPI summary panel combining several key figures side by side

For values that need context against a scale or range, use the Gauge Chart or Bar Gauge. For trend history, use the Trend Chart.

## 4.2.7.3 Configuration

### Edit Mode Toolbar

In addition to the [common edit mode controls](../01-panels.md#414-panel-edit-mode), the Stat Value adds:

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

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>Setting</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Orientation</strong></td><td><strong>Horizontal</strong> (label and value side by side) or <strong>Vertical</strong> (label above value)</td></tr>
<tr><td><strong>Display Time</strong></td><td><strong>On:</strong> show the timestamp of the displayed value below the number. <strong>Off:</strong> show the value only.</td></tr>
<tr><td><strong>Title Text size</strong></td><td>Font size for the metric name label (default 16)</td></tr>
<tr><td><strong>Title Text color</strong></td><td>Color of the label text</td></tr>
<tr><td><strong>Value Text size</strong></td><td>Font size for the numeric value (default 48)</td></tr>
<tr><td><strong>Value Text color</strong></td><td>Color of the value text</td></tr>
<tr><td><strong>Background Color</strong></td><td>Panel background color</td></tr>
<tr><td><strong>Width</strong></td><td>Fixed pixel width for the panel (leave blank for automatic sizing)</td></tr>
</tbody>
</table>

## 4.2.7.4 Example Scenarios

**Dashboard headline.** A plant manager's dashboard includes three Stat Value panels in a row: total energy consumed today, current plant output in units per hour, and active alarm count. Each uses a large font size (64) with a white value on a dark background, readable from across the control room.

**Shift summary KPI.** At shift handover, a Stat Value panel displays total units produced in the last 8 hours. Display Time is enabled so the operator can confirm when the value was last updated.

**Temperature watchpoint.** A critical furnace temperature is displayed as a Stat Value with Value Text color set to red when the attribute's Hi limit is exceeded, providing an immediate visual alert within the dashboard.
