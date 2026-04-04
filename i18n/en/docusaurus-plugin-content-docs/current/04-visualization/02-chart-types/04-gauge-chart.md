---
title: Gauge Chart
sidebar_label: Gauge Chart
---

# 4.2.4 Gauge Chart

## 4.2.4.1 Overview

The Gauge Chart displays a single current value on a semicircular dial, similar to an analog instrument panel gauge. The needle and colored arc segments show at a glance where the value stands within its operating range.

![Gauge chart displaying a real-time value on a dial](../images/gauge-demo.png)

The gauge always shows the latest data point in the selected time range. Multiple gauges can be displayed in a single panel — one per metric — arranged horizontally or vertically.

## 4.2.4.2 When to Use

Use the Gauge Chart when:

- You want to show a single real-time measurement in a format operators immediately understand
- You need to communicate whether a value is in a safe, warning, or alarm zone at a glance
- You are building operator displays or status boards where spatial metaphors (needle position) convey urgency

For multiple values compared across time, use the Trend Chart. For a plain numeric readout without the dial metaphor, use the Stat Value panel.

## 4.2.4.3 Configuration

### Edit Mode Toolbar

In addition to the [common edit mode controls](../01-panels.md#414-panel-edit-mode), the Gauge Chart adds:

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

The gauge supports configuring the dial labels, title display, and font sizes:

![Gauge with threshold labels and metric name displayed](../images/gauge-items.png)

<table>
<colgroup><col style="width:14em"/><col/></colgroup>
<thead><tr><th>Setting</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Title</strong></td><td>Chart title displayed above the panel</td></tr>
<tr><td><strong>Orientation</strong></td><td>Layout direction when multiple gauges are shown: Horizontal or Vertical</td></tr>
<tr><td><strong>Show threshold labels</strong></td><td>Toggle: display threshold values around the dial arc</td></tr>
<tr><td><strong>Show Title</strong></td><td>Toggle: display the metric name below the dial</td></tr>
<tr><td><strong>Title Text size</strong></td><td>Font size for the metric name label (default 16)</td></tr>
<tr><td><strong>Value Text size</strong></td><td>Font size for the numeric value at the center of the dial (default 48)</td></tr>
</tbody>
</table>

### Limits Settings

Attribute-defined limits — LoLo, Lo, Target, Hi, HiHi — are rendered as colored arc segments on the dial. This visually divides the gauge face into safety zones, making it immediately clear when the needle is in a warning or alarm region:

![Gauge with colored arc segments marking operating zones](../images/gauge-limit.png)

Limits are inherited from the attribute configuration on the element and do not need to be re-entered here.

## 4.2.4.4 Example Scenarios

**Pump discharge pressure.** A pump's discharge pressure attribute has Lo and Hi limits defined. The gauge chart shows the current pressure with the arc divided into green (normal), yellow (warning), and red (alarm) zones. The operator sees at a glance whether the pump is running within spec.

**Motor speed monitoring.** Three motors on a production line each contribute one gauge to the same panel with Horizontal orientation. The operator sees all three speeds side by side and immediately spots the one running outside the normal zone.

**Temperature watchpoint.** A furnace temperature is displayed on a gauge with the HiHi limit set to the maximum safe operating temperature. When the needle approaches the red zone, the operator knows to act before the alarm fires.
