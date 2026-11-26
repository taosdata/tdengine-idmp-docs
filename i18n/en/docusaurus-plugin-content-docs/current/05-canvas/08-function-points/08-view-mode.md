---
title: Preview Mode Function
sidebar_label: Preview Mode Function
---

# 5.8.8 Preview Mode Function

A canvas screen is in preview mode whenever it is opened for viewing rather than for editing. In preview mode, the following built-in capabilities are available without any extra configuration:

- **Double-click trend dialog**: double-click a symbol with bound data to open a draggable trend dialog showing the point's history. The time range inherits the canvas's current range, up to 10 dialogs can be open at once, and duplicates for the same symbol are deduplicated.
- **Hover value tooltip**: hovering over a symbol with bound data shows the point's path, time, and current value, keeping the screen clean while the data is available on demand.
- **Add to Analysis Workbench**: in preview mode, right-click a symbol with bound data to push it to the Analysis Workbench; multiple symbols can be pushed in a batch. Choose **Add to Analysis Workbench** to open it in a new tab, or **Add to Standalone Analysis Workbench** to open a standalone Analysis Workbench in a dialog on the current page.
- **View panel details**: right-click a panel symbol and choose **View Details** to open the panel's preview page in a new tab.

:::note
The capabilities above take effect in preview mode only. Inside the editor, even after switching to **Preview** or **Lock** from the toolbar, the double-click trend dialog, the right-click menu, and **Open Link** navigation are not triggered; only the **Preview** state shows the hover value tooltip. See [5.4.19 Lock](../04-toolbar.md#5419-lock).
:::
