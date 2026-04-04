---
title: Using the Add-In
sidebar_label: Using the Add-In
---

# 10.3 Using the Add-In

Once connected to IDMP, the **TDengine EAI** ribbon tab provides all the tools for retrieving data, exploring events, filtering assets, and configuring the add-in. Each button opens a task pane on the right side of Excel where you configure the query and select an output cell.

## 10.3.1 Ribbon Overview

The **TDengine EAI** ribbon tab exposes all add-in functions as buttons; each button opens a dedicated task pane for configuring and executing that operation.

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>Button</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Current Value</strong></td><td>Retrieve the latest value of one or more attributes</td></tr>
<tr><td><strong>Archive Value</strong></td><td>Retrieve the attribute value at a specific point in time</td></tr>
<tr><td><strong>Raw Data</strong></td><td>Retrieve raw time-series data over a time range</td></tr>
<tr><td><strong>Sampled Data</strong></td><td>Retrieve time-series data sampled at a regular interval</td></tr>
<tr><td><strong>Timed Data</strong></td><td>Retrieve the attribute value at specific timestamps</td></tr>
<tr><td><strong>Calculated Data</strong></td><td>Retrieve aggregated (calculated) values over time windows</td></tr>
<tr><td><strong>Time Filtered</strong></td><td>Retrieve data filtered by a state or condition expression</td></tr>
<tr><td><strong>Event Explore</strong></td><td>Query and export events from IDMP</td></tr>
<tr><td><strong>Attribute Filter</strong></td><td>Search and export attribute metadata</td></tr>
<tr><td><strong>Asset Filter</strong></td><td>Search and export element (asset) metadata</td></tr>
<tr><td><strong>Properties</strong></td><td>Retrieve a specific metadata property of an element attribute</td></tr>
<tr><td><strong>Update</strong></td><td>Refresh all data in the workbook</td></tr>
<tr><td><strong>Settings</strong></td><td>Configure global add-in settings</td></tr>
</tbody>
</table>

## 10.3.2 Common Fields

Most data retrieval forms share the following fields:

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Data Items</strong></td><td>The IDMP element attributes to query. Click the search icon to browse the asset hierarchy and select one or more attributes.</td></tr>
<tr><td><strong>Output Cell</strong></td><td>The Excel cell where results will be written. Defaults to the currently selected cell (e.g., <code>Sheet1!A1</code>).</td></tr>
<tr><td><strong>Time Position</strong></td><td>How timestamps are written alongside the data: <strong>No Time Stamp</strong> (values only), <strong>Time at Left</strong> (timestamp in the column to the left), or <strong>Time on Top</strong> (timestamp in the row above).</td></tr>
</tbody>
</table>

Click **OK** to insert data and close the pane, or **Apply** to insert data and keep the pane open for further queries.

## 10.3.3 Current Value

Retrieves the latest value of the selected attributes and writes it to the output cell.

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Data Items</strong></td><td>The attributes to query (required)</td></tr>
<tr><td><strong>Output Cell</strong></td><td>Target cell</td></tr>
<tr><td><strong>Time Position</strong></td><td>No Time Stamp / Time at Left / Time on Top</td></tr>
</tbody>
</table>

## 10.3.4 Archive Value

Retrieves the attribute value at a specific historical timestamp, with gap-filling support.

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Data Items</strong></td><td>The attributes to query (required)</td></tr>
<tr><td><strong>Fill Type</strong></td><td>How to fill if no exact value exists at the timestamp: <strong>Previous</strong> (use the last known value before), or other fill strategies</td></tr>
<tr><td><strong>Time Stamp</strong></td><td>The specific timestamp to query (required)</td></tr>
<tr><td><strong>Output Cell</strong></td><td>Target cell</td></tr>
<tr><td><strong>Time Position</strong></td><td>No Time Stamp / Time at Left / Time on Top</td></tr>
</tbody>
</table>

## 10.3.5 Raw Data

Retrieves all raw time-series data points within a time range, with no aggregation.

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Data Items</strong></td><td>The attributes to query (required)</td></tr>
<tr><td><strong>Start Time</strong></td><td>Start of the time range (required)</td></tr>
<tr><td><strong>End Time</strong></td><td>End of the time range (required)</td></tr>
<tr><td><strong>Output Cell</strong></td><td>Top-left cell of the output range</td></tr>
<tr><td><strong>Time Position</strong></td><td>No Time Stamp / Time at Left / Time on Top</td></tr>
</tbody>
</table>

## 10.3.6 Sampled Data

Retrieves time-series data resampled at a regular interval over a time range. Use this to get a uniformly-spaced series regardless of the original data frequency.

<table>
<colgroup><col style="width:12em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Data Items</strong></td><td>The attributes to query (required)</td></tr>
<tr><td><strong>Start Time</strong></td><td>Start of the time range (required)</td></tr>
<tr><td><strong>End Time</strong></td><td>End of the time range (required)</td></tr>
<tr><td><strong>Time Interval</strong></td><td>The resampling interval (e.g., <code>1h</code>, <code>30m</code>, <code>1d</code>)</td></tr>
<tr><td><strong>Filter Expression</strong></td><td>Optional filter to exclude certain data points before sampling</td></tr>
<tr><td><strong>Output Cell</strong></td><td>Top-left cell of the output range</td></tr>
<tr><td><strong>Time Position</strong></td><td>No Time Stamp / Time at Left / Time on Top</td></tr>
</tbody>
</table>

## 10.3.7 Timed Data

Retrieves the attribute value at one or more specific timestamps that you provide, with fill support for gaps.

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Data Items</strong></td><td>The attributes to query (required)</td></tr>
<tr><td><strong>Fill Type</strong></td><td>How to fill if no exact value exists at a given timestamp (e.g., <strong>Previous</strong>)</td></tr>
<tr><td><strong>Time Stamp</strong></td><td>The specific timestamp(s) to query</td></tr>
<tr><td><strong>Output Cell</strong></td><td>Target cell</td></tr>
<tr><td><strong>Time Position</strong></td><td>No Time Stamp / Time at Left / Time on Top</td></tr>
</tbody>
</table>

## 10.3.8 Calculated Data

Retrieves aggregated data over regular time windows — for example, the hourly average, daily maximum, or sum per shift.

<table>
<colgroup><col style="width:14em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Data Items</strong></td><td>The attributes to query (required)</td></tr>
<tr><td><strong>Start Time</strong></td><td>Start of the time range (required)</td></tr>
<tr><td><strong>End Time</strong></td><td>End of the time range (required)</td></tr>
<tr><td><strong>Time Interval</strong></td><td>The aggregation window size (e.g., <code>1h</code>)</td></tr>
<tr><td><strong>Filter Expression</strong></td><td>Optional filter applied before aggregation</td></tr>
<tr><td><strong>Aggregation Function</strong></td><td>The aggregation to apply (required). Supports all TDengine selection and aggregation functions that return one row of data per window (e.g., AVG, MAX, MIN, SUM, COUNT, FIRST, LAST, TOP, BOTTOM).</td></tr>
<tr><td><strong>Output Cell</strong></td><td>Top-left cell of the output range</td></tr>
<tr><td><strong>Time Options</strong></td><td>Optionally show <strong>Start Time</strong>, <strong>End Time</strong>, or <strong>Max/Min Time</strong> columns alongside the aggregated values</td></tr>
</tbody>
</table>

## 10.3.9 Time Filtered

Retrieves data filtered by a state or condition defined by start and end expressions — useful for extracting data only during specific operating conditions (e.g., when a machine is running).

<table>
<colgroup><col style="width:15em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Data Items</strong></td><td>The attributes to query (required)</td></tr>
<tr><td><strong>Expression — Start With</strong></td><td>The condition expression that marks the beginning of a valid period (required)</td></tr>
<tr><td><strong>Expression — End With</strong></td><td>The condition expression that marks the end of a valid period (required)</td></tr>
<tr><td><strong>Start Time</strong></td><td>Start of the search range (required)</td></tr>
<tr><td><strong>End Time</strong></td><td>End of the search range (required)</td></tr>
<tr><td><strong>Time Interval</strong></td><td>Interval for data points within each valid period</td></tr>
<tr><td><strong>Time Units</strong></td><td>The unit for the time interval (e.g., Second)</td></tr>
<tr><td><strong>Output Cell</strong></td><td>Top-left cell of the output range</td></tr>
<tr><td><strong>Time Options</strong></td><td>Optionally show <strong>Start Time</strong> and/or <strong>End Time</strong> columns</td></tr>
</tbody>
</table>

## 10.3.10 Event Explore

Queries IDMP events and exports the results as a table in the spreadsheet. Supports filtering by multiple criteria.

<table>
<colgroup><col style="width:18em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>Filter by event name</td></tr>
<tr><td><strong>Description</strong></td><td>Filter by event description</td></tr>
<tr><td><strong>Template</strong></td><td>Filter by event template</td></tr>
<tr><td><strong>Severity Level</strong></td><td>Filter by severity (All, Warning, Critical, etc.)</td></tr>
<tr><td><strong>Is Ack</strong></td><td>Filter by acknowledgement status</td></tr>
<tr><td><strong>Created at</strong></td><td>Filter by event creation time range</td></tr>
<tr><td><strong>Updated at</strong></td><td>Filter by last update time range</td></tr>
<tr><td><strong>Maximum Results</strong></td><td>Maximum number of events to return (default: 1000)</td></tr>
<tr><td><strong>Order By</strong></td><td>Sort field, with ASC or DESC order</td></tr>
<tr><td><strong>Element Criteria — Root Path</strong></td><td>Limit results to events associated with elements under a specific asset tree path</td></tr>
<tr><td><strong>Output Cell</strong></td><td>Top-left cell of the output table</td></tr>
<tr><td><strong>Columns to Display</strong></td><td>Select which event fields to include as columns in the output table. A multi-select picker lets you choose from all available event fields (e.g., Ack, Status, and more).</td></tr>
</tbody>
</table>

## 10.3.11 Attribute Filter

Searches IDMP attribute metadata and exports the results as a table. Useful for auditing your data model or building dynamic references.

<table>
<colgroup><col style="width:14em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Attribute Name</strong></td><td>Filter by attribute name</td></tr>
<tr><td><strong>Attribute Description</strong></td><td>Filter by attribute description</td></tr>
<tr><td><strong>Attribute Categories</strong></td><td>Filter by attribute category tag</td></tr>
<tr><td><strong>Attribute Value Type</strong></td><td>Filter by data type (Float, Int, Bool, etc.)</td></tr>
<tr><td><strong>Maximum Results</strong></td><td>Maximum number of results (default: 1000)</td></tr>
<tr><td><strong>Order By</strong></td><td>Sort field, with ASC or DESC order</td></tr>
<tr><td><strong>Element Criteria</strong></td><td>Filter by the element that owns the attribute: Root Path, Name, Description, Categories, Template</td></tr>
<tr><td><strong>Output Cell</strong></td><td>Top-left cell of the output table</td></tr>
<tr><td><strong>Columns to Display</strong></td><td>Select which attribute fields to include as columns in the output table. A multi-select picker lets you choose from all available attribute fields (e.g., Name, Description, and more).</td></tr>
</tbody>
</table>

## 10.3.12 Asset Filter

Searches IDMP elements (assets) and exports the results as a table.

<table>
<colgroup><col style="width:14em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Root Path</strong></td><td>Limit results to elements under a specific path in the asset tree</td></tr>
<tr><td><strong>Name</strong></td><td>Filter by element name</td></tr>
<tr><td><strong>Description</strong></td><td>Filter by element description</td></tr>
<tr><td><strong>Attribute Name</strong></td><td>Filter elements that have an attribute matching this name</td></tr>
<tr><td><strong>Attribute Description</strong></td><td>Filter by attribute description on the element</td></tr>
<tr><td><strong>Categories</strong></td><td>Filter by element category</td></tr>
<tr><td><strong>Template</strong></td><td>Filter by element template</td></tr>
<tr><td><strong>Created at</strong></td><td>Filter by element creation time range</td></tr>
<tr><td><strong>Updated at</strong></td><td>Filter by last update time range</td></tr>
<tr><td><strong>Maximum Results</strong></td><td>Maximum number of results (default: 1000)</td></tr>
<tr><td><strong>Order By</strong></td><td>Sort field, with ASC or DESC order</td></tr>
<tr><td><strong>Output Cell</strong></td><td>Top-left cell of the output table</td></tr>
</tbody>
</table>

## 10.3.13 Properties

Retrieves a specific metadata property of an element attribute (such as its unit, description, or configured limits) and writes it to a cell.

<table>
<colgroup><col style="width:9em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Data Items</strong></td><td>The attribute to query (required)</td></tr>
<tr><td><strong>Property</strong></td><td>The metadata property to retrieve (e.g., unit of measure, description, Hi limit)</td></tr>
<tr><td><strong>Output Cell</strong></td><td>Target cell</td></tr>
</tbody>
</table>

## 10.3.14 Update

Click **Update** in the ribbon to refresh all data in the workbook. Every cell that was populated by the TDengine EAI add-in is re-queried with its original parameters and updated with the latest results.

Use this to keep a workbook current without reopening each form individually. For automatic periodic refresh, configure the **Interval** in Settings.

## 10.3.15 Settings

Configures global defaults for the add-in.

<table>
<colgroup><col style="width:17em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Time format</strong></td><td>The format used when writing timestamps to cells (default: <code>YYYY-MM-DD HH:mm:ss</code>)</td></tr>
<tr><td><strong>Number format</strong></td><td>The Excel number format applied to numeric output cells (default: <code>General</code>)</td></tr>
<tr><td><strong>Maximum event count</strong></td><td>Default maximum results for Event Explore queries (default: 1000)</td></tr>
<tr><td><strong>Maximum filter search count</strong></td><td>Default maximum results for Attribute Filter and Asset Filter queries (default: 1000)</td></tr>
<tr><td><strong>Interval (seconds)</strong></td><td>Auto-refresh interval in seconds. Set to <code>0</code> to disable automatic refresh.</td></tr>
</tbody>
</table>

Click **Confirm** to save settings.
