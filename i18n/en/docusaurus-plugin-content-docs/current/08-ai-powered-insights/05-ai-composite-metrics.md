---
title: AI Composite Metrics
sidebar_label: AI Composite Metrics
---

# 8.5 AI Composite Metrics

Composite Metrics is an AI-generated library of business KPIs for your asset hierarchy. Based on your element templates, collected data, and industry context, the AI produces a curated set of domain-relevant metrics for each asset group — complete with calculation formulas, TDengine SQL, business meaning, and industry aliases. This gives engineers a ready reference for what to measure and how to compute it, without requiring data science expertise.

## Where to Find Composite Metrics

Composite Metrics is located in **Libraries** → **Composite Metrics** in the left sidebar.

The top-level list shows one entry per asset tree group (for example, "Oil Field" or "Utilities"), along with the number of metrics generated and the last update time. Click any group to open its metric list.

## Metric List

Each metric in the list has the following columns:

| Column | Description |
|---|---|
| **Metric Name** | A structured name for the metric (e.g., `ElectricityMeter_Equipment_Current_LoadFactor`) |
| **Metric Definition** | A plain language description of what the metric measures |
| **Industry Alias** | Alternative names for this metric as used in the industry |
| **Syntax Support** | Whether the metric can be computed directly using TDengine SQL (`true`/`false`) |

Click any metric to open its full detail view.

## Metric Detail

Each metric detail view shows:

| Field | Description |
|---|---|
| **Name** | The metric identifier |
| **Description** | Full description of what the metric measures |
| **English Abbreviation** | Short code for the metric (e.g., `CLF`) |
| **Industry Aliases** | Alternative industry names for this metric |
| **Calculation Formula** | The abstract formula (e.g., `AVG(Current) / MAX(Current)`) |
| **Calculation SQL** | The concrete TDengine SQL query that computes the metric |
| **Involved Fields** | The element attributes used in the calculation |
| **Data Template** | The element template this metric applies to |
| **Missing Fields** | Attributes required by the formula that are not yet configured on the element |
| **Business Meaning** | Plain language explanation of what the metric value indicates operationally |
| **Syntax Support** | Whether TDengine SQL can directly compute this metric |
| **Hierarchy Level** | The level of the asset hierarchy at which this metric applies (e.g., `EQUIPMENT`, `SITE`) |
| **Test Result** | Whether the SQL was executed successfully against actual data |
| **Aggregate Function** | Whether the metric uses an aggregate function |
| **Nested Subquery** | Whether the SQL requires a nested subquery |

## Actions

The metric list toolbar provides the following actions:

| Action | Description |
|---|---|
| **Download** | Export the full metric list as a file for offline review or modification |
| **Upload** | Import a modified metric list back into IDMP. Use this after editing downloaded metrics to correct formulas or descriptions. |
| **Regenerate** | Ask the AI to re-generate the composite metrics for this group. Use this after adding more element data, descriptions, or attributes to improve the quality of suggestions. Regeneration typically takes 5 to 10 minutes. |
| **Select Columns** | Choose which columns are visible in the metric list. Use this to focus on the fields most relevant to your current review. |

## How the AI Generates Metrics

The AI analyzes each asset tree group — examining the element templates, attribute names, units, and collected time-series data — and produces metrics that are relevant for that type of asset in its industry context. For an electricity meter group, it produces metrics like load factor, voltage stability index, and phase unbalance score. For an oil well group, it produces metrics like production efficiency, water cut ratio, and pressure decline rate.

Because the AI cannot guarantee 100% accuracy, the download / upload workflow allows you to review, correct, and enrich the generated metrics before treating them as authoritative references for your operation.
