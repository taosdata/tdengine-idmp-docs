---
title: Connecting Excel to IDMP
sidebar_label: Connecting Excel to IDMP
---

# 10.2 Connecting Excel to IDMP

After installing the Excel Add-In, you need to open it in Excel and sign in to your IDMP instance before you can retrieve data.

## Opening the Add-In

The TDengine IDMP Add-In is an Office Web Add-In. After installation it does not automatically appear as a ribbon tab — you need to activate it from **My Add-ins** the first time.

1. Open Microsoft Excel.
2. Click the **Insert** tab in the ribbon.
3. In the **Add-ins** group, click **My Add-ins**.

   :::tip
   If you do not see a **My Add-ins** button, look for a small **Add-ins** icon in the Insert tab, or click the dropdown arrow on the Add-ins button. On older Excel versions (2016/2019), the button may be labeled **Office Add-ins**.
   :::

4. In the **Office Add-ins** dialog, select the **My Add-ins** tab.
5. Find **TDengine IDMP** in the list and double-click it, or select it and click **Add**.

The TDengine IDMP task pane opens on the right side of the Excel window.

:::note
After the first activation, Excel may remember the add-in and show a **TDengine IDMP** button directly in the **Home** tab or a dedicated ribbon tab on subsequent sessions. If the add-in disappears after restarting Excel, repeat the steps above to re-open it from **My Add-ins**.
:::

## Add-In Not Showing in My Add-ins

If **TDengine IDMP** does not appear in the **My Add-ins** list after installation:

- **Close and reopen Excel** — the add-in registration takes effect only after a full restart.
- **Check for a security block (Windows)** — files downloaded from the internet may be blocked by Windows. If the installation script downloaded any files, right-click each file, select **Properties**, and check **Unblock** at the bottom of the General tab.
- **Verify the installation completed** — re-run the installation command from [Installing the Excel Add-In](./01-installation.md) and check for error output.

## Signing In

Once the task pane is open:

1. Enter your IDMP server address in the format `https://<host>:<port>` (for example, `https://idmp.tdengine.net:6034`).
2. Enter your IDMP username and password.
3. Click **Sign In**.

Once connected, the task pane displays your IDMP asset hierarchy and allows you to browse elements and their attributes.

## Connection Requirements

- The IDMP server must be reachable from the machine running Excel.
- HTTPS must be configured on the IDMP server (see [Installing the Excel Add-In](./01-installation.md) for HTTPS setup).
- Your IDMP account must have at least read access to the elements and attributes you want to retrieve.
