---
title: Sharing Panels and Dashboards
sidebar_label: Sharing
---

# 4.5 Sharing Panels and Dashboards

TDengine IDMP provides a built-in sharing mechanism that generates time-limited links to panels and dashboards. A shared link gives the recipient a read-only view of the panel or dashboard as it was at the time of sharing, without requiring a login.

## 4.5.1 Sharing a Panel

To share a panel:

1. Open the panel in view mode (click **View** on any panel card, or navigate to a panel you have open).
2. Click the **Share** button in the view mode toolbar.
3. A dialog opens with an **Available Duration** field. Enter a number and select the unit: **Minutes**, **Hours**, or **Day**.
4. Click **Submit**. The link is generated and automatically copied to your clipboard. Copy it from the displayed field if needed.

The shared link captures the current time range and panel state. Recipients who open the link see the panel with the data from the time range in effect when the link was created.

Shared links are **time-limited**: they expire after the chosen duration. After expiry, the link returns an access-denied response. This means shared links are suitable for short-term communication (sending a chart to a colleague, attaching to a report, pasting in a chat thread) but are not permanent references.

## 4.5.2 Sharing a Dashboard

Dashboards support the same sharing mechanism as panels. To share a dashboard:

1. Open the dashboard in view mode.
2. Click the **Share** button in the dashboard toolbar.
3. Copy the generated link.

The link gives the recipient a read-only view of the dashboard with the same time range and panel layout in place at the time the link was generated.

## 4.5.3 Downloading a Panel as an Image

In addition to link sharing, any panel can be downloaded as a PNG image:

1. Open the panel in view mode.
2. Click the **Save as Image** button in the toolbar.
3. The browser downloads the current chart as a PNG file.

The downloaded image captures the chart as currently rendered — the visible time range, all series, legend, and limit lines — and can be embedded in reports, presentations, or documentation without requiring any IDMP access.

## 4.5.4 Opening a Panel in a New Window

For side-by-side comparison or multi-monitor setups, any saved panel can be opened in a separate browser window. There are two ways to do this:

- **From the Panels tab:** Hover over the panel card and click **⋮** → **Open in New Window**.
- **From view mode:** Click the **Open in New Window** button in the view mode toolbar.

The panel opens in a new browser window in view mode, with its own toolbar and time range controls. This window operates independently: you can set a different time range in the new window than the one in the main tab.

## 4.5.5 Managing Shared Links

All generated shared links can be reviewed and maintained from a single place under **Admin Console** → **Share Management**. The list shows the key information of each shared link in a paginated table:

- **Resource Name:** The name of the panel or dashboard the link points to.
- **Resource Type:** Panel, Dashboard, Panel Template, or Dashboard Template.
- **Element:** The element the resource belongs to.
- **Expiration:** The moment the link becomes invalid.
- **Status:** Enabled or Disabled.
- **Count:** The number of times the link has been accessed.

For security, the share token is masked (`••••••••`) in the list. To reveal the plain-text token, click the **View** button in the token column. If an administrator has enabled secondary verification for share tokens in the security configuration, revealing the token requires a second password or multi-factor verification.

The top of the page provides filtering and actions:

- **Resource type / element filters:** The two dropdowns in the top-left corner filter the list by resource type or by element.
- **Refresh:** Reloads the latest list of shared links.
- **Column settings:** Controls which columns are shown in the table.

The **⋮** menu on each row offers the following actions for that shared link:

- **View Details:** Opens a dialog showing the share address, available duration, expiration, status, and access count. The share address in the dialog can be copied with one click; copying fetches the full link, and secondary verification is required first if it is enabled.
- **Update Expiration:** Sets a new expiration time via a date picker. The chosen time must be later than the current time.
- **Enable / Disable:** Disabling invalidates the link immediately so recipients can no longer access it; re-enabling restores it.
- **Delete:** Permanently removes the shared link.
