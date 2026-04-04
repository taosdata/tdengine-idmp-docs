---
title: Root Cause Analysis
sidebar_label: Root Cause Analysis
---

# 6.7 Root Cause Analysis

When an event occurs, quickly identifying the root cause is critical for reducing downtime and preventing recurrence. TDengine IDMP provides a root cause analysis feature that helps operators systematically trace the event trigger chain and identify the initial cause of the problem.

## 6.7.1 Opening Root Cause Analysis

The system provides two ways to quickly open root cause analysis from an event.

**From the event list:**

Hover over an event row to reveal the **⋮** menu, then click **Root Cause Analysis**. IDMP opens the root cause analysis view for that event.

**From the event detail page:**

On the General tab, click the **Root Cause Analysis** button in the toolbar to open the same view.

## 6.7.2 Root Cause Analysis Report

AI generates a structured, easy-to-understand, and business-insightful analysis report based on the key data of the current event. This helps users quickly identify the root cause of the event and reduce operational costs.

## 6.7.3 Root Cause Analysis Operations

The root cause analysis view supports the following interactive operations:

<table>
<colgroup><col style="width:16em"/><col/></colgroup>
<thead><tr><th>Operation</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Expand/Collapse Analysis</strong></td><td>Click the <strong>Root Cause Analysis</strong> button to expand or collapse the analysis area</td></tr>
<tr><td><strong>Resize Area</strong></td><td>Drag the left border of the root cause analysis area to change its width</td></tr>
<tr><td><strong>Regenerate</strong></td><td>Click the <strong>Regenerate</strong> button to regenerate the root cause analysis report</td></tr>
</tbody>
</table>

:::note
Root cause analysis relies on the correlation configuration between events. It is recommended to clearly define event dependencies in event templates and analysis rules to obtain more accurate root cause analysis results.
:::
