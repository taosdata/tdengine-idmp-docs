---
title: AI Composite Metrics
sidebar_label: AI Composite Metrics
---

# 8.5 AI Composite Metrics

Composite Metrics is an AI-generated library of business KPIs for your asset hierarchy. Based on your element templates, collected data, and industry context, the AI produces a curated set of domain-relevant metrics for each asset group — complete with calculation formulas, TDengine SQL, business meaning, and industry aliases. This gives engineers a ready reference for what to measure and how to compute it, without requiring data science expertise.

## 8.5.1 Where to Find Composite Metrics

Composite Metrics is located in **Libraries** → **Composite Metrics** in the left sidebar.

The top-level list shows one entry per asset tree group (for example, "Oil Field" or "Utilities"), along with the number of metrics generated and the last update time. Click any group to open its metric list.

## 8.5.2 Metric List

Each metric in the list has the following columns:

<table>
<colgroup><col style="width:12em"/><col/></colgroup>
<thead><tr><th>Column</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Metric Name</strong></td><td>A structured name for the metric (e.g., <code>ElectricityMeter_Equipment_Current_LoadFactor</code>)</td></tr>
<tr><td><strong>Metric Definition</strong></td><td>A plain language description of what the metric measures</td></tr>
<tr><td><strong>Industry Alias</strong></td><td>Alternative names for this metric as used in the industry</td></tr>
<tr><td><strong>Syntax Support</strong></td><td>Whether the metric can be computed directly using TDengine SQL (<code>true</code>/<code>false</code>)</td></tr>
</tbody>
</table>

Click any metric to open its full detail view.

## 8.5.3 Metric Detail

Each metric detail view shows:

<table>
<colgroup><col style="width:14em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>The metric identifier</td></tr>
<tr><td><strong>Description</strong></td><td>Full description of what the metric measures</td></tr>
<tr><td><strong>English Abbreviation</strong></td><td>Short code for the metric (e.g., <code>CLF</code>)</td></tr>
<tr><td><strong>Industry Aliases</strong></td><td>Alternative industry names for this metric</td></tr>
<tr><td><strong>Calculation Formula</strong></td><td>The abstract formula (e.g., <code>AVG(Current) / MAX(Current)</code>)</td></tr>
<tr><td><strong>Calculation SQL</strong></td><td>The concrete TDengine SQL query that computes the metric</td></tr>
<tr><td><strong>Involved Fields</strong></td><td>The element attributes used in the calculation</td></tr>
<tr><td><strong>Data Template</strong></td><td>The element template this metric applies to</td></tr>
<tr><td><strong>Missing Fields</strong></td><td>Attributes required by the formula that are not yet configured on the element</td></tr>
<tr><td><strong>Business Meaning</strong></td><td>Plain language explanation of what the metric value indicates operationally</td></tr>
<tr><td><strong>Syntax Support</strong></td><td>Whether TDengine SQL can directly compute this metric</td></tr>
<tr><td><strong>Hierarchy Level</strong></td><td>The level of the asset hierarchy at which this metric applies (e.g., <code>EQUIPMENT</code>, <code>SITE</code>)</td></tr>
<tr><td><strong>Test Result</strong></td><td>Whether the SQL was executed successfully against actual data</td></tr>
<tr><td><strong>Aggregate Function</strong></td><td>Whether the metric uses an aggregate function</td></tr>
<tr><td><strong>Nested Subquery</strong></td><td>Whether the SQL requires a nested subquery</td></tr>
</tbody>
</table>

## 8.5.4 Actions

The metric list toolbar provides the following actions:

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Action</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Download</strong></td><td>Export the full metric list as a file for offline review or modification</td></tr>
<tr><td><strong>Upload</strong></td><td>Import a modified metric list back into IDMP. Use this after editing downloaded metrics to correct formulas or descriptions.</td></tr>
<tr><td><strong>Regenerate</strong></td><td>Ask the AI to re-generate the composite metrics for this group. Use this after adding more element data, descriptions, or attributes to improve the quality of suggestions. Regeneration typically takes 5 to 10 minutes.</td></tr>
<tr><td><strong>Select Columns</strong></td><td>Choose which columns are visible in the metric list. Use this to focus on the fields most relevant to your current review.</td></tr>
</tbody>
</table>

## 8.5.5 How the AI Generates Metrics

The AI analyzes each asset tree group — examining the element templates, attribute names, units, and collected time-series data — and produces metrics that are relevant for that type of asset in its industry context. For an electricity meter group, it produces metrics like load factor, voltage stability index, and phase unbalance score. For an oil well group, it produces metrics like production efficiency, water cut ratio, and pressure decline rate.

Because the AI cannot guarantee 100% accuracy, the download / upload workflow allows you to review, correct, and enrich the generated metrics before treating them as authoritative references for your operation.
