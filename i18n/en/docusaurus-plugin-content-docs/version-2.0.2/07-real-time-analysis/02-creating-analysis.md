---
title: Creating an RT Analysis
sidebar_label: Creating an RT Analysis
---

# 7.2 Creating an RT Analysis

To create a new RT analysis manually, navigate to an element's **RT analysis** tab and click **+** in the toolbar, or click the **+ Create New Analysis Manually** button in the empty list. This opens the analysis creation form.

The form is divided into numbered sections that you complete in order: **General Information**, **Trigger**, **Event**, **Calculation**, and **Actions**.

## 7.2.1 General Information

The General Information section (section 1 of the analysis form) defines the RT analysis's identification and global behavior options, including naming, categorization, and activation policy.

| Field | Description |
|---|---|
| **Name** (required) | A unique name for this RT analysis. Use concise and descriptive naming — for example, "Hourly Max Voltage" or "Compressor Efficiency". |
| **Categories** | Optional category tags to organize and filter RT analyses. You can create new tags inline. |
| **Enable analysis upon creation** | When checked (default), the RT analysis starts running immediately after it is saved. Uncheck to create the RT analysis in a paused state. |
| **Recalculate for out-of-order data** | When checked, if data arrives late (with a timestamp earlier than already-processed data), the RT analysis re-runs for the affected window. Useful when sensor data may arrive delayed or out of sequence. |
| **Description** | Optional free-text description of what this RT analysis computes and why. |

## 7.2.2 Trigger

The Trigger section defines when the RT analysis runs. See [Trigger Types](./03-trigger-types.md) for full details on all eight trigger types and their parameters.

All trigger types share two common optional fields:

- **Pre-filter** — A filter expression applied to the data before trigger evaluation. Only data rows satisfying the filter condition participate in the calculation. Useful for excluding invalid readings (e.g., filtering out zero values before computing averages).
- **Fill History** — When enabled, the RT analysis runs over historical data to backfill calculated outputs. Enabling this field reveals two additional options:
  - **Fill History First** — When checked, the analysis processes all historical data before it begins processing new real-time data.
  - **Start Time** — The date and time from which to start the historical backfill.

## 7.2.3 Event

The Event section controls whether the RT analysis generates an event each time it fires, along with the event's structure, severity, and delivery policy. Leaving the **Event Template** field empty means no event is generated; selecting an event template enables event generation. See [Generating Events](./05-generating-events.md) for full details.

## 7.2.4 Calculation

The Calculation section defines what the RT analysis computes and where the results are stored. See [Calculation](./04-calculation.md) for full details.

## 7.2.5 Actions

The Actions section defines actions that run automatically when the RT analysis fires and a specified condition is met. Each action rule consists of a trigger condition and a referenced [action template](../13-libraries/04-action-templates.md). This section is optional; when no action rules are added, the RT analysis behaves as before. See [Configuring Actions](./08-actions.md) for full details.

## 7.2.6 Saving and Discarding

Click **Save** to create the RT analysis. If **Enable analysis upon creation** was checked, the RT analysis starts running immediately and appears in the list with **Running** status.

Click **Discard** to cancel. If there are unsaved changes, a confirmation dialog will appear.

:::tip
The form includes a collapsible **User Guide** panel on the right side that explains each field as you fill it in.
:::
