---
title: Browsing and Managing Analyses
sidebar_label: Browsing Analyses
---

# 7.1 Browsing and Managing Analyses

Analyses are managed from the **Analyses** tab on any element in the Explorer. Locate the target element in the asset tree and switch to the **Analyses** tab to view all analyses configured on that element.

## 7.1.1 The Analysis List

The analysis list is the core view for managing element analyses. It presents all configured analyses and their key information in a tabular format, enabling quick review of each analysis's trigger method, execution status, and last update time.

The analysis list includes the following columns:

<table>
<colgroup><col style="width:9em"/><col/></colgroup>
<thead><tr><th>Column</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>The analysis name — click to open the analysis detail view</td></tr>
<tr><td><strong>Trigger Type</strong></td><td>The trigger type (Sliding Window, Periodic Window, etc.)</td></tr>
<tr><td><strong>Stream Name</strong></td><td>The underlying TDengine stream name for this analysis</td></tr>
<tr><td><strong>Template</strong></td><td>The analysis template this analysis was created from, if any</td></tr>
<tr><td><strong>Categories</strong></td><td>Category tags</td></tr>
<tr><td><strong>Status</strong></td><td>Current execution status: <strong>Running</strong> or <strong>Paused</strong></td></tr>
<tr><td><strong>Update Time</strong></td><td>When the analysis was last modified</td></tr>
</tbody>
</table>

## 7.1.2 Toolbar

The toolbar is located above the analysis list and provides common operations such as creating, pasting, refreshing, and exporting analyses.

<table>
<colgroup><col style="width:17em"/><col/></colgroup>
<thead><tr><th>Control</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>+</strong></td><td>Create a new analysis manually — opens the analysis creation form</td></tr>
<tr><td><strong>Paste</strong></td><td>Paste a previously copied analysis onto this element</td></tr>
<tr><td><strong>Refresh</strong></td><td>Reload the analysis list</td></tr>
<tr><td><strong>Auto-refresh interval</strong></td><td>Dropdown to set automatic refresh: Off, 1s, 5s, 10s, 15s, 30s, 1m, 5m</td></tr>
<tr><td><strong>Export Current List as CSV</strong></td><td>Export the analysis list as a CSV file</td></tr>
<tr><td><strong>Select Columns</strong></td><td>Show or hide columns in the list</td></tr>
</tbody>
</table>

The filter area above the list provides a **Categories** dropdown to filter by category tag, and an **AI** button to toggle the AI-assisted creation panel.

## 7.1.3 Row Actions

Hover over any analysis row and click the **⋮** (more) menu on the right to access these actions:

<table>
<colgroup><col style="width:14em"/><col/></colgroup>
<thead><tr><th>Action</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>View</strong></td><td>Open the read-only detail view for this analysis</td></tr>
<tr><td><strong>Edit</strong></td><td>Open the analysis in edit mode to modify its configuration</td></tr>
<tr><td><strong>Copy</strong></td><td>Copy this analysis so it can be pasted onto another element</td></tr>
<tr><td><strong>Convert to Template</strong></td><td>Save this analysis as a reusable analysis template in Libraries</td></tr>
<tr><td><strong>Trend Chart Analysis</strong></td><td>Open a trend chart for the element, useful for inspecting analysis output</td></tr>
<tr><td><strong>Fill History</strong></td><td>Re-run the analysis over historical data to backfill output attributes</td></tr>
<tr><td><strong>Pause</strong></td><td>Pause the analysis — stops execution without deleting it (shows <strong>Resume</strong> when paused)</td></tr>
<tr><td><strong>Delete</strong></td><td>Delete the analysis and optionally delete the output data it produced</td></tr>
</tbody>
</table>

## 7.1.4 Analysis Statuses

Each analysis has a definitive execution status indicating whether it is currently active. The status is displayed in the **Status** column of the analysis list.

<table>
<colgroup><col style="width:6em"/><col/></colgroup>
<thead><tr><th>Status</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td><strong>Running</strong></td><td>The analysis stream computation is active and executing continuously as new data arrives</td></tr>
<tr><td><strong>Paused</strong></td><td>The analysis has been manually paused — no new computations run until resumed</td></tr>
</tbody>
</table>

When deleting an analysis, a confirmation dialog asks whether to also delete the output data previously written by the analysis.
