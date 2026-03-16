---
title: Exporting Data
sidebar_label: Exporting Data
---

Throughout IDMP, any table or list view can be exported to a CSV file. This makes it straightforward to take data out of IDMP for use in spreadsheets, reports, or other tools — without writing any queries or using the Excel Add-In.

## Where CSV Export Is Available

The CSV export option is available on every tabular view in IDMP, including:

| View | What is exported |
|---|---|
| **Explorer — Child element list** | The list of child elements under a selected element |
| **Explorer — Attribute list** | Attribute values and metadata for a selected element |
| **Events list** | Filtered event records including timestamps, severity, and status |
| **Event Filter results** | Events matching criteria from an Event Search Criteria |
| **Attribute Filter results** | Attribute metadata matching your search criteria |
| **Asset Filter results** | Element metadata matching your search criteria |
| **Analyses results** | Output rows from a saved analysis query |

## How to Export

Look for the **Export** or **Download** icon (typically a downward arrow or CSV icon) in the toolbar above the table. Click it to download the currently displayed data — including any active filters — as a CSV file.

The export reflects what is visible in the table at the time of download. Apply filters first to narrow the data before exporting.

## Excel Add-In

For more structured or recurring data retrieval into Excel, the [Excel Add-In](../10-excel-add-in/index.md) provides a purpose-built integration that lets you pull live or historical time-series data directly into worksheet cells with full control over time ranges, aggregation, and output layout.
