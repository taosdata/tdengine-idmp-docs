---
title: Table
sidebar_label: Table
---

# 4.2.6 Table

## 4.2.6.1 Overview

The Table panel displays query results in a structured grid with one row per time point and one column per metric. It is the most direct way to read the exact values returned by a query — no aggregation, no visual encoding, just the numbers.

All configured metrics appear as columns. The timestamp column is always included. Pagination controls at the bottom of the panel let you navigate across large result sets.

## 4.2.6.2 When to Use

Use the Table panel when:

- You need to inspect exact data values rather than visual trends
- You are verifying data quality or checking for missing values
- You want to build a summary report with aggregated values per time bucket
- You need to export data for further analysis

For visual trend analysis, use the Trend Chart. For a single summary number, use the Stat Value panel.

## 4.2.6.3 Configuration

### Edit Mode Toolbar

In addition to the [common edit mode controls](../01-panels.md#414-panel-edit-mode), the Table adds:

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
<tr><td><strong>Timestamp Format</strong></td><td>Display format for the timestamp column (default: <code>YYYY-MM-DD HH:mm:ss</code>)</td></tr>
</tbody>
</table>

The Table panel has no Axis, Limits, or Legend sections.

## 4.2.6.4 Example Scenarios

**Data quality check.** A data engineer adds all attributes of a meter element to a Table panel with a 1-hour time range and Disable Sampling enabled. The raw row-by-row output lets them verify that readings are arriving at the expected interval and that no values are missing or out of range.

**Shift summary report.** An operations manager configures a Table with a 1-day Sliding Window and aggregation functions (sum for energy, mean for temperature). The resulting table shows one row per day with the aggregate values for each metric — a clean tabular report suitable for export.

**Event review.** A maintenance engineer reviews a 7-day table of alarm counts grouped by hour. The timestamp and count columns give an exact record of when alarm activity was highest, complementing the trend visualization.
