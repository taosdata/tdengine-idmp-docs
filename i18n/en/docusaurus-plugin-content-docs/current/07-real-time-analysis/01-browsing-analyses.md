---
title: Browsing and Managing Analyses
sidebar_label: Browsing Analyses
---

# 7.1 Browsing and Managing Analyses


Analyses are managed from the **Analyses** tab on any element in the Explorer. Navigate to an element in the asset tree and click the **Analyses** tab to see all analyses configured on that element.

## 7.1.1 The Analysis List

The analysis list shows all analyses on the current element with the following columns:

| Column | Description |
|---|---|
| **Name** | The analysis name — click to open the analysis detail view |
| **Trigger Type** | The trigger type (Sliding Window, Periodic Time Window, etc.) |
| **Stream Name** | The underlying TDengine stream name for this analysis |
| **Template** | The analysis template this analysis was created from, if any |
| **Categories** | Category tags |
| **Status** | Current execution status: **Running** or **Paused** |
| **Update Time** | When the analysis was last modified |

## 7.1.2 Toolbar

| Control | Description |
|---|---|
| **+** | Create a new analysis manually — opens the analysis creation form |
| **Paste** | Paste a previously copied analysis onto this element |
| **Refresh** | Reload the analysis list |
| **Auto-refresh interval** | Dropdown to set automatic refresh: Off, 1s, 5s, 10s, 15s, 30s, 1m, 5m |
| **Export Current List as CSV** | Export the analysis list as a CSV file |
| **Select Columns** | Show or hide columns in the list |

The filter area above the list provides a **Categories** dropdown to filter by category tag, and an **AI** button to toggle the AI-assisted creation panel.

## 7.1.3 Row Actions

Hover over any analysis row and click the **⋮** (more) menu on the right to access these actions:

| Action | Description |
|---|---|
| **View** | Open the read-only detail view for this analysis |
| **Edit** | Open the analysis in edit mode to modify its configuration |
| **Copy** | Copy this analysis so it can be pasted onto another element |
| **Convert to Template** | Save this analysis as a reusable analysis template in Libraries |
| **Trend Chart Analysis** | Open a trend chart for the element, useful for inspecting analysis output |
| **Fill History** | Re-run the analysis over historical data to backfill output attributes |
| **Pause** | Pause the analysis — stops execution without deleting it (shows **Resume** when paused) |
| **Delete** | Delete the analysis and optionally delete the output data it produced |

## 7.1.4 Analysis Statuses

| Status | Meaning |
|---|---|
| **Running** | The analysis stream is active and executing on new data as it arrives |
| **Paused** | The analysis has been manually paused — no new computations run until resumed |

When you delete an analysis, a confirmation dialog asks whether to also delete the old output data that the analysis previously wrote.
