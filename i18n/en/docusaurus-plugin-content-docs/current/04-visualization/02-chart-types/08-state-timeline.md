---
title: State Timeline
sidebar_label: State Timeline
---

# 4.2.8 State Timeline

## 4.2.8.1 Overview

The State Timeline displays how a value changes over time as a horizontal colored band. Each segment of the band is colored and labeled according to the value it represents, making it easy to see at a glance how long a process was in each state and when transitions occurred.

![State timeline showing equipment operating states over time](../images/state-timeline-demo.png)

Multiple metrics render as multiple stacked horizontal bands, enabling side-by-side comparison of state histories across different signals.

## 4.2.8.2 When to Use

Use the State Timeline when:

- Your data represents discrete states rather than continuous measurements (on/off, running/idle/fault, open/closed)
- You want to see how long a process spent in each state and when transitions happened
- You need to compare state histories across multiple signals or equipment on the same time axis

For continuous numeric signals, use the Trend Chart. For a compact grid view of states bucketed by time interval across many metrics, use the Status History panel.

## 4.2.8.3 Configuration

### Edit Mode Toolbar

In addition to the [common edit mode controls](../01-panels.md#414-panel-edit-mode), the State Timeline adds:

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

The appearance of each state band is controlled by the following settings:

![State timeline style settings showing border, height, and fill options](../images/state-timeline-style.png)

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Setting</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Title</strong></td><td>Chart title</td></tr>
<tr><td><strong>Subtitle</strong></td><td>Secondary title</td></tr>
<tr><td><strong>Border Width</strong></td><td>Width of the border drawn around each state segment (0 = no border)</td></tr>
<tr><td><strong>Row Height</strong></td><td>Relative height of each band (default 0.3)</td></tr>
<tr><td><strong>Fill Opacity</strong></td><td>Transparency of the state color fill, 0–1</td></tr>
<tr><td><strong>Rotate Labels</strong></td><td>Rotation of X-axis time labels</td></tr>
<tr><td><strong>Label Interval</strong></td><td>Density of X-axis labels</td></tr>
</tbody>
</table>

State colors and labels are determined by the **Value Mapping** configuration, where you map each value (e.g., 0, 1, "Running") to a display color and text label.

### Limits Settings

Limit lines can be overlaid on the timeline to mark threshold values:

![State timeline with limit lines](../images/state-timeline-limit.png)

### Legend Settings

The legend identifies each state color. In Table mode it can also show summary statistics:

![State timeline legend](../images/state-timeline-legend.png)

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Setting</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Show</strong></td><td>Display mode: List, Table, or Hidden</td></tr>
<tr><td><strong>Placement</strong></td><td>Position: Bottom or Right</td></tr>
<tr><td><strong>Legend Values</strong></td><td>Statistics shown in Table mode</td></tr>
</tbody>
</table>

## 4.2.8.4 Example Scenarios

**Equipment on/off history.** A pump's run state (0 = Off, 1 = Running) is mapped to gray and green respectively. The state timeline over a 24-hour period shows exactly when the pump was running and for how long each run lasted.

**Multi-mode process timeline.** A batch reactor has four operating modes: Heating, Reaction, Cooling, Idle. Each mode is mapped to a distinct color. The timeline shows the full batch cycle from start to finish and makes it immediately visible if any phase ran longer than expected.

**Alarm active/inactive history.** Multiple alarm signals are stacked as separate bands. A maintenance engineer reviews a week of history to identify which alarms were most frequently active and whether they correlate in time.
