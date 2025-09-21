---
title: Data Visualization
---

TDengine IDMP provides panels and dashboards for visualizing data. Every element in the system can have its own panels and dashboards.

Elements at different levels typically focus on different metrics depending on their position in the tree hierarchy. For example, a dashboard for the entire power company might focus on total power generation and overall cost, while a dashboard for a wind turbine might display the operational status and generation efficiency of a specific turbine.

## Basic Panel Operations

TDengine IDMP panels support the following types of visualization:

- Trend charts
- Bar charts
- Pie charts
- Gauge charts
- Tables
- Rich text
- Stat values

When viewing a panel, you can click the icons in the action bar to edit the panel, set it as a favorite, specify the time range, zoom out, adjust refresh frequency, download the panel as an image, zoom in on a specific display area, or enter full-screen mode. Below the panel is a legend, where clicking a label will toggle the visibility of that metric.

Click the Edit (pencil) button to enter editing mode. The following section provides a more detailed explanation of panel editing operations.

## Types of Data Displayed in Panels

When creating a panel for an element, you can choose the following from the sidebar:

1. **Element:** You can select attributes of the current element or of its child elements to use as display metrics. The system only lists attributes whose data reference type is TDengine Metric, as only these represent time-series data that is meaningful to visualize.
2. **Child Element Grouping:** You can select a child element template from the children of the current element, then choose which attribute of that template to aggregate. You can also select one or more dimension metrics for grouping.

The default option is **Element**. In the sidebar, double-click on an attribute to add it to the panel and visualize it.

## Panel Metric Configuration

For each metric, you can configure the following options:

1. **Name**: Name displayed on the panel for the metric. The attribute name is used by default.
2. **Expression:** Expression applied to the selected attribute or across multiple attributes.
3. **Function:** Aggregation function when a time window is set or dimension-based grouping is applied. The default value is `AVG`.
4. **Conditions**: Filter conditions applied to the raw data to refine which data points are visualized.
5. **Time Shift**: Offset for the timestamps of the metric. This is used to compare trends across different time periods. For example, setting it to `-1d` means the panel will show data from the same time one day earlier.
6. **Prediction:** Time-series forecasting for the selected metric.
7. **Order By:** Sorting for the metric. By default, no sorting is applied.

For all displayed metrics, you can also configure the following options in the top-right corner of the metric list:

1. **Limit:** Maximum number of data points displayed for the metric.
2. **Window:** Sliding window aggregation to the metric. You can set the interval and the window duration.

## Panel Dimension Configuration

In the sidebar, double-click on a dimension to select it. For each selected dimension, you can configure the following options:

1. **Name**: Name displayed on the panel for the dimension. By default, it uses the attribute name.
2. **Conditions**: Filter conditions applied to the dimension.
3. **Group By:** Aggregates data by dimension. Enabled by default.
4. **Order By:** Sorting for the dimension. By default, no sorting is applied.

## Advanced Panel Configuration

After enabling "Advanced", you can add multiple advanced SQL queries here and display the query results simultaneously in the same panel.

In each advanced SQL query, you can choose one of the following two types of queries:

1. **TDengine**: Query using the TDengine connection associated with the current element or element template.
2. **Event**: Query events generated internally by the system.

After entering a complete SQL query, you can click the "Verify" button to verify whether the current SQL is valid and executable. After successful validation, a green icon will appear next to the button indicating success. At this point, you can click on the two selection boxes below to make selections:

1. **Time Column**: If you want to use a specific column from the query results as the time column, you can select or deselect it.
2. **Dimensions**: If you want to set some columns of the result as dimensions, you can select one or more columns as dimension columns.

Advanced queries also support the following three replacement parameters:

1. **${FROM_TIME}**: Uses the start time value from the panel or dashboard time selector for replacement. You can enter "FROM" shortcut hint in the SQL editor and press Enter to input the complete parameter.
2. **${TO_TIME}**: Uses the end time value from the panel or dashboard time selector for replacement. You can enter "TO" shortcut hint in the SQL editor and press Enter to input the complete parameter.
3. **${Element#fullVirtualTable}**: Used in element templates, can pass in the complete virtual table of the element from the panel or dashboard element selector for replacement. You can enter "ELEMENT" shortcut hint in the SQL editor and press Enter to input the complete parameter.

Additionally, you can click the "Format" icon to format the current SQL query, and you can also enable or temporarily disable the current SQL.

## Panel Display Settings

While a panel is in edit mode, you can modify the display settings for the panel on the right sidebar. Any changes you make are immediately reflected in the main area for you to preview.
