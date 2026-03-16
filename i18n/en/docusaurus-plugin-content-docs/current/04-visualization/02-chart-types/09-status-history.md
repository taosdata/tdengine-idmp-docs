---
title: Status History
sidebar_label: Status History
---

## 4.11.1 Overview

The Status History panel displays a grid of colored cells where each column represents a time bucket and each row represents a metric. It provides a compact, calendar-style view of state patterns across multiple dimensions simultaneously — ideal for spotting recurring patterns, shifts, or periods of abnormal behavior across a long time range.

## 4.11.2 When to Use

Use the Status History panel when:

- You want a high-level calendar-style overview of states across many time buckets (hours, days, shifts)
- You are comparing state patterns across multiple metrics or devices at the same time
- You need to answer questions like "which hours this week had out-of-limit conditions?" or "which devices were in alarm on Monday?"

For a continuous band showing every state transition in detail, use the State Timeline instead.

## 4.11.3 Configuration

### Edit Mode Toolbar

In addition to the [common edit mode controls](../01-panels.md#panel-edit-mode), the Status History adds:

| Control | Description |
|---|---|
| **Save as Image** | Download the current preview as a PNG image |
| **Full Screen** | Expand the editor preview to fill the browser window |
| **Panel Insights** | Run AI analysis on the current preview data |

### Graph Settings

| Setting | Description |
|---|---|
| **Title** | Chart title |
| **Subtitle** | Secondary title |
| **Value Mapping** | Click **+ Edit Value Mappings** to define how data values map to display colors and labels. For example: 0 → "Off" (gray), 1 → "Running" (green), 2 → "Fault" (red). |
| **Border Width** | Width of the borders between cells (slider) |
| **Row Height** | Relative height of each row (slider) |
| **Column Width** | Width of each time-bucket column (slider) |
| **Fill Opacity** | Transparency of the cell fill color, 0–1 |
| **Rotate Labels** | Rotation of X-axis time labels |

The time bucket size is controlled by the **Sliding Window** setting in the data configuration. For example, a 1-hour sliding window produces one column per hour.

## 4.11.4 Example Scenarios

**Weekly alarm heatmap.** Ten alarm signals are added as rows. A 1-hour sliding window produces 168 columns (one per hour over 7 days). Value mappings set 0 → gray and 1 → red. The resulting grid shows at a glance which devices were in alarm and at what hours throughout the week.

**Shift-by-shift operating mode review.** An 8-hour sliding window across a month produces one column per shift. Each row represents a production line's operating mode. The operations manager can immediately see which shifts ran in the expected mode and which had unplanned stoppages.

**Out-of-limit condition calendar.** A quality engineer adds 12 process variables as rows with a 1-day sliding window. Value mappings color cells green (in-limit) or red (out-of-limit). The resulting calendar view highlights which days had quality issues across the process.
