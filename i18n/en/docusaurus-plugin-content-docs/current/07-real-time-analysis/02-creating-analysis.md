---
title: Creating an Analysis
sidebar_label: Creating an Analysis
---

# 7.2 Creating an Analysis

To create a new analysis manually, navigate to an element's **Analyses** tab and click **+** in the toolbar, or click the **+ Create New Analysis Manually** button in the empty list. This opens the analysis creation form.

The form is divided into four numbered sections that you complete in order: **General Information**, **Trigger**, **Calculation**, and **Event**.

## 7.2.1 General Information

The General Information section (section 1 of the analysis form) defines the analysis's identification and global behavior options, including naming, categorization, and activation policy.

<table>
<colgroup><col style="width:21em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong> (required)</td><td>A unique name for this analysis. Use concise and descriptive naming — for example, "Hourly Max Voltage" or "Compressor Efficiency".</td></tr>
<tr><td><strong>Categories</strong></td><td>Optional category tags to organize and filter analyses. You can create new tags inline.</td></tr>
<tr><td><strong>Enable analysis upon creation</strong></td><td>When checked (default), the analysis starts running immediately after it is saved. Uncheck to create the analysis in a paused state.</td></tr>
<tr><td><strong>Recalculate for out-of-order data</strong></td><td>When checked, if data arrives late (with a timestamp earlier than already-processed data), the analysis re-runs for the affected window. Useful when sensor data may arrive delayed or out of sequence.</td></tr>
<tr><td><strong>Description</strong></td><td>Optional free-text description of what this analysis computes and why.</td></tr>
</tbody>
</table>

## 7.2.2 Trigger

The Trigger section defines when the analysis runs. See [Trigger Types](./03-trigger-types.md) for full details on all eight trigger types and their parameters.

All trigger types share two common optional fields:

- **Pre-filter** — A filter expression applied to the data before trigger evaluation. Only data rows satisfying the filter condition participate in the calculation. Useful for excluding invalid readings (e.g., filtering out zero values before computing averages).
- **Fill History** — When enabled, the analysis runs over historical data to backfill calculated outputs. Enabling this field reveals two additional options:
  - **Fill History First** — When checked, the analysis processes all historical data before it begins processing new real-time data.
  - **Start Time** — The date and time from which to start the historical backfill.

## 7.2.3 Calculation

The Calculation section defines what the analysis computes and where the results are stored. See [Calculation](./04-calculation.md) for full details.

## 7.2.4 Event

The Event section controls whether the analysis generates an event each time it fires. This section is disabled by default. Enable it by checking the **Generate** checkbox. See [Generating Events](./05-generating-events.md) for full details.

## 7.2.5 Saving and Discarding

Click **Save** to create the analysis. If **Enable analysis upon creation** was checked, the analysis starts running immediately and appears in the list with **Running** status.

Click **Discard** to cancel. If there are unsaved changes, a confirmation dialog will appear.

:::tip
The form includes a collapsible **User Guide** panel on the right side that explains each field as you fill it in.
:::
