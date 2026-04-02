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

| Column | Description |
|---|---|
| **Name** | Dashboard name |
| **Path** | The element path this dashboard belongs to |
| **Description** | Optional description |
| **Template** | Whether this dashboard was created from a template |
| **Categories** | Category tags assigned to this dashboard |

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

| Control | Description |
|---|---|
| **Back** | Return to the Dashboards tab |
| **Save** | Save all changes to the dashboard |
| **Discard** | Discard changes |
| **+ (Create New Panel and Insert)** | Open the panel editor to create a new panel and add it to this dashboard |
| **Time picker** | Set the time range for all panels in the dashboard |
| **Zoom out** | Expand the time range to the next level |
| **Refresh** | Reload all panel data |
| **Auto-refresh** | Set an automatic refresh interval (Off, 5s, 10s, 30s, 1m, etc.) |
| **Full Screen** | Expand the dashboard to fill the browser window |

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

| Field | Description |
|---|---|
| **Name** | The dashboard title (required) |
| **Description** | Optional description for the dashboard |
| **Categories** | One or more tags for filtering and organizing dashboards |
| **Notification Rule** | Configure an alerting rule at the dashboard level |

## 4.4.4 Adding Panels to a Dashboard

There are three ways to populate a dashboard:

**Drag from the panel library.** The left panel shows all existing panels saved to the current element. Drag any panel onto the canvas. The panel renders with its saved data configuration and visualization settings.

**Create a new panel.** Click the **+ (Create New Panel and Insert)** button in the toolbar. This opens the standard panel editor in a new tab. After saving the new panel, it is added to the dashboard canvas.

**Add from panel view mode.** When viewing any panel in full view mode, open the panel card's **⋮** menu and select a dashboard action, or navigate to the Dashboards tab and use the panel library to drag it onto the canvas.

## 4.4.5 Dashboard View Mode

Click **View** on a dashboard card to open the dashboard in full view mode.

### View Mode Toolbar

| Control | Description |
|---|---|
| **Back to List** | Return to the Dashboards tab |
| **Edit** | Open the dashboard editor |
| **Favorite** | Mark this dashboard as a favorite for quick access |
| **Time picker** | Set the time range for all panels in the dashboard |
| **Zoom out** | Expand the time range to the next level |
| **Refresh** | Reload all panel data |
| **Auto-refresh** | Set an automatic refresh interval |
| **Share** | Generate a time-limited shareable link to this dashboard view |
| **Data Zoom** | Enable data zoom mode to select a time range on charts |
| **Full Screen** | Expand the dashboard to fill the browser window |
| **Annotations** | Open the annotations panel to add text annotations to this dashboard |

### Annotations

Annotations let users attach text notes to a dashboard. The workflow is the same as panel annotations — see [4.1.5 Annotations](./01-panels.md#415-annotations) for details.

## 4.4.6 The Global Dashboards View

The **Dashboards** item in the main navigation bar opens the global dashboards list, which shows all dashboards across every element in the system.

The left sidebar of the global view organizes navigation into six sections:

- **Dashboards:** The primary list of all dashboards system-wide.
- **Panels:** A global list of all saved panels across all elements.
- **Favorite Dashboards:** Dashboards you have marked as favorites.
- **Favorite Panels:** Panels you have marked as favorites.
- **Dashboard Filters:** Saved filter configurations for the dashboards list.
- **Panel Filters:** Saved filter configurations for the panels list.

The dashboard list displays the following columns:

| Column | Description |
|---|---|
| **Name** | Dashboard name |
| **Description** | Optional description |
| **Template** | Whether this dashboard was created from a template |
| **Categories** | Category tags assigned to this dashboard |

The toolbar provides a search field, a CSV download button to export the list, and a settings gear for list preferences.

From the global view, you can:

- **Search and filter** by categories to find dashboards across the hierarchy.
- **Open** any dashboard directly.
- **Edit** or **delete** dashboards without first navigating to the element.

This view is particularly useful for fleet-wide monitoring — finding dashboards for all meters in a region, or reviewing all production-line dashboards for a site — without traversing the asset tree.
