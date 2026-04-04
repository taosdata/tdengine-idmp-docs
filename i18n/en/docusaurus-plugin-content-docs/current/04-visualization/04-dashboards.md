---
title: Dashboards
sidebar_label: Dashboards
---

# 4.4 Dashboards

Dashboards in TDengine IDMP are free-form canvases that combine multiple panels into a single view. Where a panel shows one chart for one element, a dashboard brings together panels from across an element's hierarchy — multiple charts, gauges, tables, and stat panels arranged in a grid — to give operators and engineers a comprehensive, at-a-glance picture of an asset or a process.

## 4.4.1 The Dashboards Tab

Navigate to any element in the asset tree and click the **Dashboards** tab to access its dashboards.

The toolbar above the dashboard list provides controls on the left side:

- **Categories:** Filter dashboards by category tag. Defaults to "All".
- **View toggles:** Two icon buttons to toggle between showing saved dashboards only, or including dashboards visible from parent or child elements.

On the right side:

- **+ (Add New Dashboard):** Open the dashboard editor to create a new dashboard.
- **Copy:** Duplicate an existing dashboard.
- **Refresh:** Reload the dashboard list.
- **Settings:** Configure dashboard list preferences.

The list displays all saved dashboards for the element with these columns:

<table>
<colgroup><col style="width:9em"/><col/></colgroup>
<thead><tr><th>Column</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>Dashboard name</td></tr>
<tr><td><strong>Path</strong></td><td>The element path this dashboard belongs to</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description</td></tr>
<tr><td><strong>Template</strong></td><td>Whether this dashboard was created from a template</td></tr>
<tr><td><strong>Categories</strong></td><td>Category tags assigned to this dashboard</td></tr>
</tbody>
</table>

Hover over a row to reveal action buttons for viewing, editing, or deleting the dashboard.

## 4.4.2 Creating a Dashboard

To create a new dashboard:

1. Click the **+** button in the Dashboards tab toolbar.
2. The dashboard editor opens with an empty grid canvas.
3. Add panels to the canvas by dragging from the left panel library or creating new panels.
4. Configure the dashboard name and settings in the right panel.
5. Click **Save** to save the dashboard.

Dashboards can also be created from a panel's view mode: use **Save to Dashboard** in the panel toolbar to add that panel to a new or existing dashboard.

## 4.4.3 Dashboard Editor

The dashboard editor has three areas: a left panel library, a center canvas, and a right settings panel.

### 4.4.3.1 Editor Toolbar

<table>
<colgroup><col style="width:20em"/><col/></colgroup>
<thead><tr><th>Control</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Back</strong></td><td>Return to the Dashboards tab</td></tr>
<tr><td><strong>Save</strong></td><td>Save all changes to the dashboard</td></tr>
<tr><td><strong>Discard</strong></td><td>Discard changes</td></tr>
<tr><td><strong>+ (Create New Panel and Insert)</strong></td><td>Open the panel editor to create a new panel and add it to this dashboard</td></tr>
<tr><td><strong>Time picker</strong></td><td>Set the time range for all panels in the dashboard</td></tr>
<tr><td><strong>Zoom out</strong></td><td>Expand the time range to the next level</td></tr>
<tr><td><strong>Refresh</strong></td><td>Reload all panel data</td></tr>
<tr><td><strong>Auto-refresh</strong></td><td>Set an automatic refresh interval (Off, 5s, 10s, 30s, 1m, etc.)</td></tr>
<tr><td><strong>Full Screen</strong></td><td>Expand the dashboard to fill the browser window</td></tr>
</tbody>
</table>

### 4.4.3.2 Left Panel: Panel Library

The left panel shows the panels available for this element, organized in a tree:

- **Panels:** Lists all saved panels belonging to the current element. Expand the section to see panel names.
- **Child Elements:** Lists child elements whose panels can also be included in this dashboard.

To add a panel to the canvas, drag it from the library onto the grid.

### 4.4.3.3 Center: Grid Canvas

The canvas is a 12-column grid. Panels are placed by dragging from the library or by using the **+** toolbar button. Once placed on the canvas, panels can be:

- **Resized** by dragging the panel's resize handle at the bottom-right corner.
- **Moved** by dragging the panel header to a new position on the grid.
- **Removed** by clicking the panel's close icon.

Panels render their live data on the canvas according to the dashboard's current time range setting.

### 4.4.3.4 Right Panel: Dashboard Settings

<table>
<colgroup><col style="width:12em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>The dashboard title (required)</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description for the dashboard</td></tr>
<tr><td><strong>Categories</strong></td><td>One or more tags for filtering and organizing dashboards</td></tr>
<tr><td><strong>Notification Rule</strong></td><td>Configure an alerting rule at the dashboard level</td></tr>
</tbody>
</table>

## 4.4.4 Adding Panels to a Dashboard

There are three ways to populate a dashboard:

**Drag from the panel library.** The left panel shows all existing panels saved to the current element. Drag any panel onto the canvas. The panel renders with its saved data configuration and visualization settings.

**Create a new panel.** Click the **+ (Create New Panel and Insert)** button in the toolbar. This opens the standard panel editor in a new tab. After saving the new panel, it is added to the dashboard canvas.

**Add from panel view mode.** When viewing any panel in full view mode, open the panel card's **⋮** menu and select a dashboard action, or navigate to the Dashboards tab and use the panel library to drag it onto the canvas.

## 4.4.5 The Global Dashboards View

The **Dashboards** item in the main navigation bar opens the global dashboards list, which shows all dashboards across every element in the system.

The left sidebar of the global view organizes navigation into six sections:

- **Dashboards:** The primary list of all dashboards system-wide.
- **Panels:** A global list of all saved panels across all elements.
- **Favorite Dashboards:** Dashboards you have marked as favorites.
- **Favorite Panels:** Panels you have marked as favorites.
- **Dashboard Filters:** Saved filter configurations for the dashboards list.
- **Panel Filters:** Saved filter configurations for the panels list.

The dashboard list displays the following columns:

<table>
<colgroup><col style="width:9em"/><col/></colgroup>
<thead><tr><th>Column</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>Dashboard name</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description</td></tr>
<tr><td><strong>Template</strong></td><td>Whether this dashboard was created from a template</td></tr>
<tr><td><strong>Categories</strong></td><td>Category tags assigned to this dashboard</td></tr>
</tbody>
</table>

The toolbar provides a search field, a CSV download button to export the list, and a settings gear for list preferences.

From the global view, you can:

- **Search and filter** by categories to find dashboards across the hierarchy.
- **Open** any dashboard directly.
- **Edit** or **delete** dashboards without first navigating to the element.

This view is particularly useful for fleet-wide monitoring — finding dashboards for all meters in a region, or reviewing all production-line dashboards for a site — without traversing the asset tree.
