---
title: Stat Value
sidebar_label: Stat Value
---

# 4.2.7 Stat Value

## Overview

The Stat Value panel displays a single large numeric value with an optional label and timestamp. It is designed for dashboards and status boards where a key figure needs to be visible at a distance or in a summary view.

![Stat value panel showing a large numeric readout](../images/stat-demo.png)

The value shown is the latest data point in the selected time range. Font size, color, background, and layout are all configurable to match the visual design of the containing dashboard.

## When to Use

Use the Stat Value panel when:

- You need a headline number on a dashboard — total production today, current temperature, active alarm count
- You want a large, readable display for an operator screen viewed from a distance
- You are building a KPI summary panel combining several key figures side by side

For values that need context against a scale or range, use the Gauge Chart or Bar Gauge. For trend history, use the Trend Chart.

## Configuration

### Edit Mode Toolbar

In addition to the [common edit mode controls](../01-panels.md#414-panel-edit-mode), the Stat Value adds:

| Control | Description |
|---|---|
| **Save as Image** | Download the current preview as a PNG image |
| **Full Screen** | Expand the editor preview to fill the browser window |
| **Panel Insights** | Run AI analysis on the current preview data |

### Graph Settings

| Setting | Description |
|---|---|
| **Orientation** | **Horizontal** (label and value side by side) or **Vertical** (label above value) |
| **Display Time** | **On:** show the timestamp of the displayed value below the number. **Off:** show the value only. |
| **Title Text size** | Font size for the metric name label (default 16) |
| **Title Text color** | Color of the label text |
| **Value Text size** | Font size for the numeric value (default 48) |
| **Value Text color** | Color of the value text |
| **Background Color** | Panel background color |
| **Width** | Fixed pixel width for the panel (leave blank for automatic sizing) |

## Example Scenarios

**Dashboard headline.** A plant manager's dashboard includes three Stat Value panels in a row: total energy consumed today, current plant output in units per hour, and active alarm count. Each uses a large font size (64) with a white value on a dark background, readable from across the control room.

**Shift summary KPI.** At shift handover, a Stat Value panel displays total units produced in the last 8 hours. Display Time is enabled so the operator can confirm when the value was last updated.

**Temperature watchpoint.** A critical furnace temperature is displayed as a Stat Value with Value Text color set to red when the attribute's Hi limit is exceeded, providing an immediate visual alert within the dashboard.
