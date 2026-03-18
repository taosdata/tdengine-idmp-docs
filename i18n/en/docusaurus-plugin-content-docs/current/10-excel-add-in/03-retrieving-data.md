---
title: Using the Add-In
sidebar_label: Using the Add-In
---

# 10.3 Using the Add-In

Once connected to IDMP, the **TDengine EAI** ribbon tab provides all the tools for retrieving data, exploring events, filtering assets, and configuring the add-in. Each button opens a task pane on the right side of Excel where you configure the query and select an output cell.

## Ribbon Overview

| Button | Description |
|---|---|
| **Current Value** | Retrieve the latest value of one or more attributes |
| **Archive Value** | Retrieve the attribute value at a specific point in time |
| **Raw Data** | Retrieve raw time-series data over a time range |
| **Sampled Data** | Retrieve time-series data sampled at a regular interval |
| **Timed Data** | Retrieve the attribute value at specific timestamps |
| **Calculated Data** | Retrieve aggregated (calculated) values over time windows |
| **Time Filtered** | Retrieve data filtered by a state or condition expression |
| **Event Explore** | Query and export events from IDMP |
| **Attribute Filter** | Search and export attribute metadata |
| **Asset Filter** | Search and export element (asset) metadata |
| **Properties** | Retrieve a specific metadata property of an element attribute |
| **Update** | Refresh all data in the workbook |
| **Settings** | Configure global add-in settings |

## Common Fields

Most data retrieval forms share the following fields:

| Field | Description |
|---|---|
| **Data Items** | The IDMP element attributes to query. Click the search icon to browse the asset hierarchy and select one or more attributes. |
| **Output Cell** | The Excel cell where results will be written. Defaults to the currently selected cell (e.g., `Sheet1!A1`). |
| **Time Position** | How timestamps are written alongside the data: **No Time Stamp** (values only), **Time at Left** (timestamp in the column to the left), or **Time on Top** (timestamp in the row above). |

Click **OK** to insert data and close the pane, or **Apply** to insert data and keep the pane open for further queries.

## Current Value

Retrieves the latest value of the selected attributes and writes it to the output cell.

| Field | Description |
|---|---|
| **Data Items** | The attributes to query (required) |
| **Output Cell** | Target cell |
| **Time Position** | No Time Stamp / Time at Left / Time on Top |

## Archive Value

Retrieves the attribute value at a specific historical timestamp, with gap-filling support.

| Field | Description |
|---|---|
| **Data Items** | The attributes to query (required) |
| **Fill Type** | How to fill if no exact value exists at the timestamp: **Previous** (use the last known value before), or other fill strategies |
| **Time Stamp** | The specific timestamp to query (required) |
| **Output Cell** | Target cell |
| **Time Position** | No Time Stamp / Time at Left / Time on Top |

## Raw Data

Retrieves all raw time-series data points within a time range, with no aggregation.

| Field | Description |
|---|---|
| **Data Items** | The attributes to query (required) |
| **Start Time** | Start of the time range (required) |
| **End Time** | End of the time range (required) |
| **Output Cell** | Top-left cell of the output range |
| **Time Position** | No Time Stamp / Time at Left / Time on Top |

## Sampled Data

Retrieves time-series data resampled at a regular interval over a time range. Use this to get a uniformly-spaced series regardless of the original data frequency.

| Field | Description |
|---|---|
| **Data Items** | The attributes to query (required) |
| **Start Time** | Start of the time range (required) |
| **End Time** | End of the time range (required) |
| **Time Interval** | The resampling interval (e.g., `1h`, `30m`, `1d`) |
| **Filter Expression** | Optional filter to exclude certain data points before sampling |
| **Output Cell** | Top-left cell of the output range |
| **Time Position** | No Time Stamp / Time at Left / Time on Top |

## Timed Data

Retrieves the attribute value at one or more specific timestamps that you provide, with fill support for gaps.

| Field | Description |
|---|---|
| **Data Items** | The attributes to query (required) |
| **Fill Type** | How to fill if no exact value exists at a given timestamp (e.g., **Previous**) |
| **Time Stamp** | The specific timestamp(s) to query |
| **Output Cell** | Target cell |
| **Time Position** | No Time Stamp / Time at Left / Time on Top |

## Calculated Data

Retrieves aggregated data over regular time windows — for example, the hourly average, daily maximum, or sum per shift.

| Field | Description |
|---|---|
| **Data Items** | The attributes to query (required) |
| **Start Time** | Start of the time range (required) |
| **End Time** | End of the time range (required) |
| **Time Interval** | The aggregation window size (e.g., `1h`) |
| **Filter Expression** | Optional filter applied before aggregation |
| **Aggregation Function** | The aggregation to apply (required). Supports all TDengine selection and aggregation functions that return one row of data per window (e.g., AVG, MAX, MIN, SUM, COUNT, FIRST, LAST, TOP, BOTTOM). |
| **Output Cell** | Top-left cell of the output range |
| **Time Options** | Optionally show **Start Time**, **End Time**, or **Max/Min Time** columns alongside the aggregated values |

## Time Filtered

Retrieves data filtered by a state or condition defined by start and end expressions — useful for extracting data only during specific operating conditions (e.g., when a machine is running).

| Field | Description |
|---|---|
| **Data Items** | The attributes to query (required) |
| **Expression — Start With** | The condition expression that marks the beginning of a valid period (required) |
| **Expression — End With** | The condition expression that marks the end of a valid period (required) |
| **Start Time** | Start of the search range (required) |
| **End Time** | End of the search range (required) |
| **Time Interval** | Interval for data points within each valid period |
| **Time Units** | The unit for the time interval (e.g., Second) |
| **Output Cell** | Top-left cell of the output range |
| **Time Options** | Optionally show **Start Time** and/or **End Time** columns |

## Event Explore

Queries IDMP events and exports the results as a table in the spreadsheet. Supports filtering by multiple criteria.

| Field | Description |
|---|---|
| **Name** | Filter by event name |
| **Description** | Filter by event description |
| **Template** | Filter by event template |
| **Severity Level** | Filter by severity (All, Warning, Critical, etc.) |
| **Is Ack** | Filter by acknowledgement status |
| **Created at** | Filter by event creation time range |
| **Updated at** | Filter by last update time range |
| **Maximum Results** | Maximum number of events to return (default: 1000) |
| **Order By** | Sort field, with ASC or DESC order |
| **Element Criteria — Root Path** | Limit results to events associated with elements under a specific asset tree path |
| **Output Cell** | Top-left cell of the output table |
| **Columns to Display** | Select which event fields to include as columns in the output table. A multi-select picker lets you choose from all available event fields (e.g., Ack, Status, and more). |

## Attribute Filter

Searches IDMP attribute metadata and exports the results as a table. Useful for auditing your data model or building dynamic references.

| Field | Description |
|---|---|
| **Attribute Name** | Filter by attribute name |
| **Attribute Description** | Filter by attribute description |
| **Attribute Categories** | Filter by attribute category tag |
| **Attribute Value Type** | Filter by data type (Float, Int, Bool, etc.) |
| **Maximum Results** | Maximum number of results (default: 1000) |
| **Order By** | Sort field, with ASC or DESC order |
| **Element Criteria** | Filter by the element that owns the attribute: Root Path, Name, Description, Categories, Template |
| **Output Cell** | Top-left cell of the output table |
| **Columns to Display** | Select which attribute fields to include as columns in the output table. A multi-select picker lets you choose from all available attribute fields (e.g., Name, Description, and more). |

## Asset Filter

Searches IDMP elements (assets) and exports the results as a table.

| Field | Description |
|---|---|
| **Root Path** | Limit results to elements under a specific path in the asset tree |
| **Name** | Filter by element name |
| **Description** | Filter by element description |
| **Attribute Name** | Filter elements that have an attribute matching this name |
| **Attribute Description** | Filter by attribute description on the element |
| **Categories** | Filter by element category |
| **Template** | Filter by element template |
| **Created at** | Filter by element creation time range |
| **Updated at** | Filter by last update time range |
| **Maximum Results** | Maximum number of results (default: 1000) |
| **Order By** | Sort field, with ASC or DESC order |
| **Output Cell** | Top-left cell of the output table |

## Properties

Retrieves a specific metadata property of an element attribute (such as its unit, description, or configured limits) and writes it to a cell.

| Field | Description |
|---|---|
| **Data Items** | The attribute to query (required) |
| **Property** | The metadata property to retrieve (e.g., unit of measure, description, Hi limit) |
| **Output Cell** | Target cell |

## Update

Click **Update** in the ribbon to refresh all data in the workbook. Every cell that was populated by the TDengine EAI add-in is re-queried with its original parameters and updated with the latest results.

Use this to keep a workbook current without reopening each form individually. For automatic periodic refresh, configure the **Interval** in Settings.

## Settings

Configures global defaults for the add-in.

| Field | Description |
|---|---|
| **Time format** | The format used when writing timestamps to cells (default: `YYYY-MM-DD HH:mm:ss`) |
| **Number format** | The Excel number format applied to numeric output cells (default: `General`) |
| **Maximum event count** | Default maximum results for Event Explore queries (default: 1000) |
| **Maximum filter search count** | Default maximum results for Attribute Filter and Asset Filter queries (default: 1000) |
| **Interval (seconds)** | Auto-refresh interval in seconds. Set to `0` to disable automatic refresh. |

Click **Confirm** to save settings.
