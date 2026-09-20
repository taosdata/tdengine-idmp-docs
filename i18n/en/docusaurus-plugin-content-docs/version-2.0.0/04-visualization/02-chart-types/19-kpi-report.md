---
title: KPI Report
sidebar_label: KPI Report
---

# 4.2.19 KPI Report

## 4.2.19.1 Overview

The **KPI Report** is a special panel type that presents Key Performance Indicators as a table rather than a chart. It shows elements as a tree structure by asset hierarchy in the first column, while each remaining column shows a KPI sub-attribute or a calculated result, and can compare values by statistical period (MoM / YoY).

Unlike ECharts-based chart panels, the KPI Report renders as an expandable hierarchical table — ideal for reviewing many assets, many metrics, and their period comparisons in a single table.

## 4.2.19.2 Data Source

The data columns of a KPI Report come from [KPI attributes](../../03-data-modeling/02-attributes.md). Each KPI attribute contains several sub-attributes (combinations of aggregation function × statistical period), and these sub-attributes are the selectable data columns.

## 4.2.19.3 Configuring Columns

1. In the left sidebar, select the **Period** (hourly / daily / weekly / monthly / quarterly) to filter the KPI sub-attributes available to add.
2. In the **KPI Metrics** picker, double-click or click "Add to columns" to add a sub-attribute as a column.
3. Configure each column in the Column Definition table:

| Setting | Description |
| --- | --- |
| **Column Name** | Column title; double-click the header to edit inline |
| **Expression** | The column's data-source expression (generated automatically for data columns; customizable for calculated columns) |
| **Statistical Period** | The column's time-aggregation period |
| **Relative Period** | Relative period offset, e.g. current / previous |
| **Compare** | Optional MoM or YoY comparison, adding a comparison value in the same cell |
| **Aggregate** | Child-element aggregation: sum / average / min / max / count / none |
| **Visible** | Controls whether the column is shown |

You can also click "Add calculated column" to compute from an expression that references other columns.

## 4.2.19.4 Comparison Display

When comparison is enabled for a column, the cell appends a comparison result next to the primary value:

| Option | Description |
| --- | --- |
| **Comparison Display** | Show the comparison as a **percentage** or an absolute **value** |
| **Up Color** | Color when the value increases (red by default) |
| **Down Color** | Color when the value decreases (green by default) |

## 4.2.19.5 Panel Options

Configure these in the properties panel on the right:

| Option | Description |
| --- | --- |
| **Top Filter** | The filter shown at the top when viewing the panel: none / period / asset structure |
| **Summary Row** | An optional footer summary row, with a customizable label |
| **Header / Data Row / Asset Structure Column styles** | Font, font size, text color, background color, etc. |
| **Header Row Height / Data Row Height / Table Margin / Report Background** | Table sizing and background |
| **Merge Headers** | Select adjacent columns to merge their headers for grouped display |
| **Cell Style** | Right-click a data cell to set / clear its individual style |

## 4.2.19.6 When to Use

**Multi-asset KPI summary.** Review the daily output, energy consumption, and yield of every production line across the plant in a single report, compared month-over-month (YoY / MoM), to quickly locate abnormal assets.

**Period-comparison board.** Enable MoM on each KPI column and display the change of the current period versus the previous one as a percentage — red for up, green for down — at a glance.
