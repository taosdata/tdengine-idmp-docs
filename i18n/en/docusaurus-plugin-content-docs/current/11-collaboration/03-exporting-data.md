---
title: Exporting Data
sidebar_label: Exporting Data
---

# 11.3 Exporting Data

Throughout IDMP, any table or list view can be exported to a CSV file. This makes it straightforward to take data out of IDMP for use in spreadsheets, reports, or other tools — without writing any queries or using the Excel Add-In.

## 11.3.1 Where CSV Export Is Available

The CSV export option is available on every tabular view in IDMP, including:

<table>
<colgroup><col style="width:18em"/><col/></colgroup>
<thead><tr><th>View</th><th>What is exported</th></tr></thead>
<tbody>
<tr><td><strong>Explorer — Child element list</strong></td><td>The list of child elements under a selected element</td></tr>
<tr><td><strong>Explorer — Attribute list</strong></td><td>Attribute values and metadata for a selected element</td></tr>
<tr><td><strong>Events list</strong></td><td>Filtered event records including timestamps, severity, and status</td></tr>
<tr><td><strong>Event Filter results</strong></td><td>Events matching criteria from an Event Search Criteria</td></tr>
<tr><td><strong>Attribute Filter results</strong></td><td>Attribute metadata matching your search criteria</td></tr>
<tr><td><strong>Asset Filter results</strong></td><td>Element metadata matching your search criteria</td></tr>
<tr><td><strong>Analyses results</strong></td><td>Output rows from a saved analysis query</td></tr>
</tbody>
</table>

## 11.3.2 How to Export

Look for the **Export** or **Download** icon (typically a downward arrow or CSV icon) in the toolbar above the table. Click it to download the currently displayed data — including any active filters — as a CSV file.

The export reflects what is visible in the table at the time of download. Apply filters first to narrow the data before exporting.

## 11.3.3 Excel Add-In

For more structured or recurring data retrieval into Excel, the [Excel Add-In](../10-excel-add-in/index.md) provides a purpose-built integration that lets you pull live or historical time-series data directly into worksheet cells with full control over time ranges, aggregation, and output layout.
