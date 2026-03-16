---
title: Connections
sidebar_label: Connections
---

A **connection** tells IDMP how to reach an external system. Connections are configured in **Admin Console → Connections** and are referenced by data ingestion tasks and asset model imports.

The connection list shows all configured connections with the following columns:

| Column | Description |
|---|---|
| **Name** | Connection name |
| **Type** | Connection type (e.g., TDengine TSDB) |
| **Connection Status** | Whether the connection is currently in use |
| **URL** | The endpoint address |
| **Auth Type** | Authentication method used |

To create a connection, click **+**. To edit, enable/disable, or delete an existing connection, click the **⋮** menu on the connection row, or hover over the connection name in the left tree to reveal the quick-action menu.

A TDengine TSDB connection links IDMP to a TDengine time-series database. Once created, it enables asset model import and real-time data access for all elements and attributes that reference this connection.

**Connection form fields:**

| Field | Description |
|---|---|
| **Name** (required) | A unique name for this connection. Accepts letters, numbers, underscores, hyphens, and spaces. |
| **Type** | Select **TDengine TSDB** |
| **URL** (required) | The TDengine REST API endpoint, e.g., `http://localhost:6041` |
| **Auth Type** | **Username Password** or **Token** |
| **Username** | Database username (for Username Password auth) |
| **Password** (required) | Database password |
| **Explorer URL** (required) | The TDengine Explorer address for this instance, typically `http://[host]:6060` |
| **Additional Properties** | Optional key-value pairs for advanced configuration |

Click **Check** to verify the connection before saving, then click **Save**.

:::tip
For AI connections used by the intelligent Q&A and analysis features, see [Chapter 8 AI-Powered Insights](../08-ai-powered-insights/index.md).
:::
