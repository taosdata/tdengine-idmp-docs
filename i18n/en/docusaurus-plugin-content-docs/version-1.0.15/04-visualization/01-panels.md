---
title: Panels
sidebar_label: Panels
---

# 4.1 Panels

Panels are the building blocks of all visualization in TDengine IDMP. A panel is a self-contained visualization component — a chart, gauge, table, or other display — bound to one or more attributes of a specific element. Every panel belongs to an element and draws its data from that element's attributes.

This page covers the common features shared across all panel types: browsing, creating, editing, the toolbar controls, and the data configuration interface. Individual panel types and their specific settings are described in the sections that follow.

## 4.1.1 The Panels Tab

Navigate to any element in the asset tree and click the **Panels** tab to access its panels.

### 4.1.1.1 Browsing Panels

The toolbar above the panel grid provides three controls:

- **Categories:** Filter panels by category tag. Select a category from the dropdown to show only panels with that tag. Defaults to "All".
- **AI:** Toggle AI suggestions on or off. When enabled, the AI engine analyzes the element's attributes and suggests relevant panels based on the data type and operational context. Click again to show only saved panels.
- **Card/List view:** Switch between card view (thumbnail previews) and list view (compact list with metadata).

On the right side of the toolbar:

- **+ (Add New Panel):** Opens the panel editor to create a new panel from scratch.
- **Grid icon:** Adjust the card grid density.
- **Refresh:** Reload the panel list.

### 4.1.1.2 AI-Suggested Panels

When the AI toggle is active, powered by **Zero Query Intelligence**, the system generates panel suggestions alongside your saved panels. Each suggestion card shows a preview and a panel title. You can:

- Click **👍** to mark a suggestion as useful — this does not save it.
- Click **👎** to dismiss the suggestion.
- Click **⋮** on a suggestion → **Generate** to save it as a permanent panel.
- Click **⋮** → **Delete** to remove the suggestion.

A **+ More Suggestions** card at the end of the list requests additional AI-generated suggestions.

At the bottom of the panel list, a text input lets you describe a panel in natural language: "Tell me what panel you want and I'll build it for you." Click **Ask AI** to generate the described panel.

### 4.1.1.3 Saved Panels

Saved panels appear as cards with a live thumbnail preview. Hover over a card to reveal the **⋮** (more) menu, which provides the following actions:

| Action | Description |
|---|---|
| **View** | Open the panel in full view mode |
| **Edit** | Open the panel editor |
| **Copy** | Create a duplicate of the panel on the same element |
| **Convert to Template** | Save this panel's configuration as a panel template |
| **Open in New Window** | Open the panel in a separate browser window |
| **Delete** | Remove the panel permanently |

## 4.1.2 Creating a Panel

To create a new panel manually:

1. Click the **+ Add New Panel** card at the end of the panel grid.
2. A dialog appears asking you to select the panel type: **Standard** or **Canvas**.
   - **Standard:** A regular data-driven panel (Trend Chart, Bar Chart, Gauge, etc.).
   - **Canvas:** A free-layout canvas panel for building custom visual displays.
3. Select a type and the panel editor opens immediately in edit mode.
4. Configure the data source, metrics, and visualization settings.
5. Click **Save** to save the panel.

To create a panel from an AI suggestion, click **⋮** → **Generate** on any suggestion card.

## 4.1.3 Panel View Mode

Clicking **View** on a panel card opens the panel in full view mode. The panel occupies the main content area with the element hierarchy on the left.

### 4.1.3.1 View Mode Toolbar

The following controls appear in the view mode toolbar for every panel type:

| Control | Description |
|---|---|
| **Back to List** | Return to the Panels tab |
| **Edit** | Open the panel editor |
| **Favorite** | Mark this panel as a favorite for quick access |
| **Time picker** | Select the time range for the chart (e.g., Last 7 Days). Click the dropdown arrow for preset ranges or a custom range. |
| **Zoom out** | Expand the time range to the next level |
| **Refresh** | Reload the chart data immediately |
| **Auto-refresh** | Set an automatic refresh interval (Off, 5s, 10s, 30s, 1m, etc.) |
| **Save as Image** | Download the current chart as a PNG image |
| **Share** | Generate a time-limited shareable link to this panel view |
| **Full Screen** | Expand the panel to fill the browser window |
| **Open in New Window** | Open this panel in a separate browser window |
| **Panel Insights** | Open the AI-generated insight report for this panel |

Additional toolbar controls that are specific to a panel type are documented in each panel type's section.

## 4.1.4 Panel Edit Mode

Click **Edit** in view mode, or **⋮** → **Edit** on a panel card, to open the panel editor. The editor is divided into three panels.

### 4.1.4.1 Edit Mode Toolbar

The following controls appear in the edit mode toolbar for every panel type:

| Control | Description |
|---|---|
| **Back to List** | Return to the Panels tab (prompts to save or discard changes) |
| **Save** | Save all changes to the panel |
| **Discard** | Discard changes and return to view mode |
| **Time picker** | Select the preview time range |
| **Zoom out** | Expand the preview time range to the next level |
| **Refresh** | Reload the preview data |
| **Auto-refresh** | Set an automatic refresh interval for the preview |

Additional toolbar controls that are specific to a panel type are documented in each panel type's section.

### 4.1.4.2 Left Panel: Data Source

The left panel controls which data is available to the panel. Two radio buttons at the top determine the data source mode: **Element** and **Child Elements Grouping**.

### 4.1.4.3 Element mode

The panel draws data from the current element and any of its descendant child elements. The left panel shows two sections:

- **Metrics:** The attributes (time-series metrics) belonging to the current element itself.
- **Child Elements:** A navigable hierarchy of all descendants. Expand the tree to browse to any child element and access its attributes. Attributes from any level of the hierarchy can be added to the panel.

To add an attribute, double-click it in the tree to add it to the Metrics table. Alternatively, hover over an attribute to reveal the **⋮** menu, then choose **Add to Metric** or **Add to Dimension**.

### 4.1.4.4 Child Elements Grouping mode

The panel aggregates data across all child elements of a selected element template. Instead of navigating to individual child elements, you select an **element template** from the dropdown (for example, "Electricity meter" or "Water meter"). The tree then shows all Metrics and Tags that the element template has, allowing you to build a panel that displays aggregated or grouped values across every child element of that template simultaneously.

### 4.1.4.5 Center Panel: Preview and Data Configuration

The upper portion of the center panel shows a live preview of the chart, updated as you make changes. Below the chart is a minimap for navigation.

Below the minimap is the data configuration area, divided into two collapsible sections:

### 4.1.4.6 Metrics

The Metrics section defines the data series plotted on the chart. The header row provides three additional controls:

- **View SQL:** Display the SQL query generated from the current configuration.
- **Limit:** Set a limit on the number of records returned.
- **Sliding Window:** Apply a sliding window aggregation. Configure the window size and unit (s = seconds, m = minutes, h = hours, d = days). The edit icon opens the full sliding window configuration; the trash icon removes it.

Each row in the Metrics table represents one data series:

| Column | Description |
|---|---|
| **Name** | The display label for this series in the chart legend |
| **Expression** | The aggregation expression (e.g., `avg(attribute)`, `max(attribute)`) |
| **UOM** | The display unit of measurement. Leave blank to use the attribute's configured unit. |
| **Conditions** | Optional filter conditions applied to this series |
| **Time Shift** | Offset this series by a time amount to overlay historical comparison. Enter a number and select the unit. |
| **Prediction** | AI forecast configuration for this series. Set to None for no forecast, or configure a forecast model. |
| **Order By** | Sort order for the query results |

Use the action icons at the end of each row to edit or delete a metric.

### 4.1.4.7 Dimensions

The Dimensions section defines grouping dimensions for aggregate queries. This is used when grouping data by a categorical field (similar to SQL GROUP BY). Each dimension row has:

| Column | Description |
|---|---|
| **Name** | Display label for this dimension |
| **Expression** | The grouping expression |
| **Conditions** | Filter conditions for this dimension |
| **Group By** | Whether to include this dimension in GROUP BY |
| **Order By** | Sort order |

### 4.1.4.8 Advanced SQL Mode

The **Advanced** toggle at the bottom of the data configuration area switches to a raw SQL editor. In advanced mode you can add multiple SQL queries — each appears as a separate query block — and all results are displayed together in the same panel.

Each query block has a **Query Type** selector:

| Query Type | Description |
|---|---|
| **TDengine** | Executes against the TDengine connection associated with the current element or element template |
| **Event** | Queries system-generated events |

After entering a SQL statement, click **Validate** to check whether it is valid and executable. A green indicator appears next to the button on success. After validation, two additional selectors become available:

- **Time Column:** Select which result column to use as the time axis. Deselect to treat the query result as non-time-series.
- **Dimensions:** Select one or more result columns to treat as dimension (grouping) columns rather than metric values.

### 4.1.4.9 Template variables

Advanced SQL supports four built-in template variables that are substituted at query time:

| Variable | Replaced with |
|---|---|
| `${FROM_TIME}` | The start time from the panel's time picker |
| `${TO_TIME}` | The end time from the panel's time picker |
| `${Element#fullVirtualTable}` | The full virtual table name of the current element |
| `${Element#name}` | The name of the current element |

:::tip
All four variables support autocomplete in the SQL editor: type `FROM_TIME`, `TO_TIME`, or `ELEMENT` and the editor completes to the full variable syntax. `${FROM_TIME}` and `${TO_TIME}` automatically add or omit surrounding quotes based on context — do not add quotes manually. `${Element#fullVirtualTable}` automatically handles backtick quoting. `${Element#name}` resolves to a plain string — add single quotes around it when used in a string comparison.
:::

Additional controls on each query block:

- **Format:** Click the format icon to auto-format the SQL statement.
- **Enable / Disable:** Toggle a query block on or off without deleting it, useful for temporarily excluding a query from the panel.

### 4.1.4.10 Right Panel: Visualization Settings

The right panel contains all visual configuration for the chart. At the top is the **panel type selector** — a dropdown listing all available panel types. Changing the type re-renders the preview with the new visualization while preserving the data configuration.

The visualization settings are organized into collapsible sections. The following three sections appear for every panel type:

### 4.1.4.11 General

| Field | Description |
|---|---|
| **Name** | The panel title displayed at the top of the chart |
| **Description** | An optional description shown on hover or in exports |
| **Categories** | One or more tags for organizing and filtering panels in the Panels list |

### 4.1.4.12 Data Links

Define clickable links attached to data points. Each link specifies a label and a URL, which can include template variables referencing the data point's time or value. Clicking a data point in the chart opens the configured link.

### 4.1.4.13 Notification Rule

Configure a scheduled report delivery rule on this panel. See [Scheduled Reports](./06-scheduled-reports.md) for details.

Additional settings sections — Graph, Axis, Limits, Legend, and others — are panel-type-specific and documented in each panel type's section.

## 4.1.5 Organizing Panels

**Categories** are free-form text tags assigned to a panel in the General settings. They appear in the Categories filter dropdown on the Panels tab, letting users quickly find panels by function or system area (e.g., Electrical, Mechanical, Quality).

**Favorites** mark panels for quick access. Favorited panels appear in the Favorites filter on the Panels tab.

**Convert to Template** saves the panel's configuration as a reusable panel template. Once saved to the template library, the same panel structure can be applied to other elements of the same type without reconfiguration. See [Panel and Dashboard Templates](./07-panel-dashboard-templates.md) for details on template management.
