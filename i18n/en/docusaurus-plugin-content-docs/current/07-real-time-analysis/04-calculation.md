---
title: Calculation
sidebar_label: Calculation
---

The Calculation section (section 3 of the analysis form) defines what the analysis computes and where it stores the results. It contains four parts: **Apply Calculation On**, **Rollup On Window**, **Output Timestamp**, and **Output Attributes**.

## Apply Calculation On

This radio button determines the data scope for the calculation.

| Option | Description |
|---|---|
| **Element Self** | The calculation runs on the element's own attributes. This is the typical case — use it when you are computing something about this specific device or location. |
| **Child Elements Aggregation** | The calculation aggregates data across the element's child elements that share a common template. Use this to compute metrics like "average power output across all turbines under this wind farm". |

When **Child Elements Aggregation** is selected, two additional fields appear:

| Field | Description |
|---|---|
| **Child Element Template** | The template that the child elements must match. Only children with this template are included in the aggregation. Automatically pre-populated if all children share the same template. |
| **Subtable Filter** | An optional filter expression to narrow which child elements are included in the aggregation. For example, filter to only children in a specific operating state. |

:::note
**Child Elements Aggregation** is only available when the element has child elements. On leaf elements, this option is disabled and only **Element Self** is available.
:::

## Rollup On Window

The **Rollup On Window** checkbox (enabled by default) controls whether the calculation is aggregated over a time window.

When enabled, the **Interval** field specifies the length of the aggregation window (number + time unit). For example, an interval of 1 hour means each trigger firing computes the aggregate over the past 1 hour of data.

When disabled, the calculation runs over individual data points without windowed aggregation — suitable for row-level calculations or transformations.

## Output Timestamp

The **Output Timestamp** dropdown specifies which timestamp is written to the output attribute for each result row:

| Option | Description |
|---|---|
| **Window Start** | The timestamp of the beginning of the window |
| **Window End** | The timestamp of the end of the window (default) |

The **Offset** field adds a time offset (number + unit, default 0 seconds) to the selected window boundary. This can be useful to shift the output timestamp for display alignment.

## Output Attributes

The **Output Attributes** table maps calculation expressions to element attributes (and optionally event attributes when event generation is enabled).

Each row in the table has the following columns:

| Column | Description |
|---|---|
| **Expression** | A calculation expression. Click the cell to open the Expression Editor (see [Section 3.2.9](../03-data-modeling/02-attributes.md#329-expression-editor)). |
| **Element Attribute** | The element attribute where the computed result is stored as a new time-series value |
| **Event Attribute** | *(Visible only when event generation is enabled in section 4)* An event attribute to capture the computed value at the moment the event fires |

Use the **+** button at the bottom of the table to add additional output rows. Each row is an independent expression — you can compute multiple metrics in a single analysis and write them to different attributes.

