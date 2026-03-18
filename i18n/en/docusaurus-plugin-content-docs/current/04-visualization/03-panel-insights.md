---
title: Panel Insights
sidebar_label: Panel Insights
---

# 4.3 Panel Insights


Panel Insights is the AI analysis feature built directly into every panel. With one click, the AI engine reads the chart data currently displayed, reasons about it in the context of the element's asset model and attribute metadata, and produces a written interpretation of what the data shows.

## 4.3.1 Accessing Panel Insights

Panel Insights is available in both view mode and edit mode:

- **View mode:** Click the **Panel Insights** button at the right end of the toolbar. The button is labeled "Panel Insights" and appears as the last control in the toolbar row.
- **Edit mode:** Click the **Panel Insights** button in the edit mode toolbar to analyze the current preview data before saving.

The insight report opens in a slide-out panel to the right of the chart.

## 4.3.2 What Panel Insights Analyzes

The AI engine has access to:

- The data currently plotted in the chart, including all series and the selected time range
- The element's position in the asset hierarchy (site, production line, machine)
- The attribute's metadata: engineering unit, configured limits (LoLo, Lo, Target, Hi, HiHi, Maximum), and description
- Any active sliding window or aggregation settings

The insight report is generated in the context of this full asset picture — not just the raw numbers. A value that exceeds the Hi limit is flagged as a threshold violation; a gradual upward trend is identified as a trend and distinguished from noise; an anomalous spike is called out and its timing noted.

## 4.3.3 What the Insight Report Contains

A typical insight report covers:

**Trend analysis.** The AI describes the overall direction of the data over the selected time range — rising, falling, stable, or cyclical — and characterizes the magnitude and rate of change.

**Threshold violations.** If any values crossed the configured limits (Lo, Hi, LoLo, HiHi), the report notes when they occurred, how long they lasted, and how far the value deviated from the limit.

**Anomalies and notable points.** The AI identifies values that appear anomalous relative to the surrounding data — sudden spikes, unexpected drops, or points that deviate significantly from the trend.

**Pattern identification.** For multi-day or multi-week time ranges, the AI identifies recurring patterns — daily cycles, weekend vs. weekday differences, or batch-correlated behavior.

**Summary and recommendation.** The report closes with a plain-language summary of the overall data picture and, where applicable, a suggested action or further investigation.

## 4.3.4 Using Insights Effectively

Panel Insights is most useful when:

- **The time range is meaningful.** Insights generated from a 7-day range will be richer than those from 1 hour, because the AI can identify patterns and trends that span multiple operating cycles.
- **Attribute limits are configured.** Without defined limits, the AI cannot distinguish normal from abnormal — it can only describe the data statistically. With limits, the insight becomes operationally meaningful.
- **The attribute has a clear engineering context.** An attribute named `Temperature_Bearing_A` with a unit of °C and a Hi limit of 85 yields a better insight than an unnamed raw sensor with no metadata.

Insights are generated on demand and are not stored. Each click of the Panel Insights button regenerates the analysis against the current data and time range. If you change the time range or add a metric, click Panel Insights again to refresh the report.
