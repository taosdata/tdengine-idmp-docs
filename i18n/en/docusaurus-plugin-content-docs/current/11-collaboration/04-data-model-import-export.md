---
title: Data Model Import and Export
sidebar_label: Data Model Import and Export
---

# 11.4 Data Model Import and Export

IDMP's Import/Export feature in the Management Console lets you transfer your data model — elements, element templates, event templates, UOM categories, and libraries — between IDMP instances. This is useful for replicating a configuration from a development environment to production, or for sharing a standard asset model across multiple deployments.

## 11.4.1 Accessing Import/Export

Navigate to **Management Console → Import/Export**.

The main page shows a history table of all past import and export operations, with columns for **Created at**, **Status**, **Name**, and **Reason**. Use the **Categories** and **Import** filter buttons to switch between viewing export and import history.

## 11.4.2 Exporting the Data Model

Click the **Export** icon (download arrow) in the top-right corner to open the export configuration form.

### 11.4.2.1 Selecting Resources

The export form has two selectors:

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>Selector</th><th>What it selects</th></tr></thead>
<tbody>
<tr><td><strong>Select Elements</strong></td><td>One or more root elements from the asset tree. IDMP includes the selected elements and all resources they depend on.</td></tr>
<tr><td><strong>Select Libraries</strong></td><td>One or more library entries (element templates, UOM categories, etc.) to include independently of any elements.</td></tr>
</tbody>
</table>

As you make selections, the **Selected Resources** tree preview updates to show exactly what will be included in the export — elements, their templates, event templates, UOM categories, and individual units of measure.

### 11.4.2.2 Export Summary

At the bottom of the form, a summary table confirms the counts of each resource type to be exported:

<table>
<colgroup><col style="width:15em"/><col/></colgroup>
<thead><tr><th>Resource</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Elements Count</strong></td><td>Number of elements selected</td></tr>
<tr><td><strong>Element Templates Count</strong></td><td>Number of element templates pulled in</td></tr>
<tr><td><strong>Event Templates Count</strong></td><td>Number of event templates pulled in</td></tr>
<tr><td><strong>Categories Count</strong></td><td>Number of UOM categories pulled in</td></tr>
<tr><td><strong>UOMs Count</strong></td><td>Number of units of measure pulled in</td></tr>
<tr><td><strong>Total Resources Count</strong></td><td>Total number of resources in the export</td></tr>
</tbody>
</table>

Click **Confirm** to generate and download the export file. Click **Discard** to cancel.

## 11.4.3 Importing a Data Model

Click the **Import** icon (upload arrow) in the top-right corner to open the import form.

### 11.4.3.1 Import Fields

<table>
<colgroup><col style="width:22em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Metadata File</strong> (required)</td><td>The data model file produced by a previous IDMP export. Click <strong>Select Metadata File</strong> to upload it.</td></tr>
<tr><td><strong>TSGen Configuration File</strong> (optional)</td><td>An optional TDengine schema-generation configuration file to associate with the import.</td></tr>
<tr><td><strong>Select Connections</strong> (required)</td><td>The TDengine connection that imported elements will be bound to for time-series data storage.</td></tr>
<tr><td><strong>Contact Point</strong> (required)</td><td>The notification contact point to associate with imported event templates.</td></tr>
</tbody>
</table>

Click **Confirm** to start the import. The operation runs in the background and its progress and result appear in the history table on the main Import/Export page.

## 11.4.4 Typical Workflow

A typical cross-instance deployment workflow looks like this:

1. On the **source** instance, configure your elements, templates, and libraries.
2. Go to **Management Console → Import/Export** and export the relevant elements and libraries.
3. Download the metadata file.
4. On the **target** instance, go to **Management Console → Import/Export** and import the metadata file.
5. Select the appropriate connection and contact point on the target instance.
6. Confirm the import and verify the resources appear in the Explorer and Libraries.
