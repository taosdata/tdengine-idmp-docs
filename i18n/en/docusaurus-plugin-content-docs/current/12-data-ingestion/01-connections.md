---
title: Connections
sidebar_label: Connections
---

# 12.1 Connections

A **connection** tells IDMP how to reach an external system. Connections are configured in **Admin Console → Connections** and are referenced by data ingestion tasks and asset model imports.

The connection list shows all configured connections with the following columns:

<table>
<colgroup><col style="width:12em"/><col/></colgroup>
<thead><tr><th>Column</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>Connection name</td></tr>
<tr><td><strong>Type</strong></td><td>Connection type (e.g., TDengine TSDB)</td></tr>
<tr><td><strong>Connection Status</strong></td><td>Whether the connection is currently in use</td></tr>
<tr><td><strong>URL</strong></td><td>The endpoint address</td></tr>
<tr><td><strong>Auth Type</strong></td><td>Authentication method used</td></tr>
</tbody>
</table>

To create a connection, click **+**. To edit, enable/disable, or delete an existing connection, click the **⋮** menu on the connection row, or hover over the connection name in the left tree to reveal the quick-action menu.

A TDengine TSDB connection links IDMP to a TDengine time-series database. Once created, it enables asset model import and real-time data access for all elements and attributes that reference this connection.

**Connection form fields:**

<table>
<colgroup><col style="width:15em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong> (required)</td><td>A unique name for this connection. Accepts letters, numbers, underscores, hyphens, and spaces.</td></tr>
<tr><td><strong>Type</strong></td><td>Select <strong>TDengine TSDB</strong></td></tr>
<tr><td><strong>URL</strong> (required)</td><td>The TDengine REST API endpoint, e.g., <code>http://localhost:6041</code></td></tr>
<tr><td><strong>Auth Type</strong></td><td><strong>Username Password</strong> or <strong>Token</strong></td></tr>
<tr><td><strong>Username</strong></td><td>Database username (for Username Password auth)</td></tr>
<tr><td><strong>Password</strong> (required)</td><td>Database password</td></tr>
<tr><td><strong>Explorer URL</strong> (required)</td><td>The TDengine Explorer address for this instance, typically <code>http://[host]:6060</code></td></tr>
<tr><td><strong>Additional Properties</strong></td><td>Optional key-value pairs for advanced configuration</td></tr>
</tbody>
</table>

Click **Check** to verify the connection before saving, then click **Save**.

:::tip
For AI connections used by the intelligent Q&A and analysis features, see [Chapter 8 AI-Powered Insights](../08-ai-powered-insights/index.md).
:::
