---
title: Connections
sidebar_label: Connections
---

# 12.1 Connections

A **connection** tells IDMP how to reach an external system. Connections are configured in **Admin Console → Connections** and are referenced by data ingestion tasks and asset model imports.

:::note
Supported connection types include TDengine TSDB, MySQL, PostgreSQL, SQL Server, InfluxDB, and AI. TDengine connections manage business data; MySQL, PostgreSQL, SQL Server, and InfluxDB connections provide external metrics and tags; AI connections support AI Chat and question recommendations.
:::

The connection list shows all configured connections with the following columns:

| Column | Description |
|---|---|
| **Name** | Connection name |
| **Type** | Connection type (e.g., TDengine TSDB) |
| **Connection Status** | Whether the connection is currently in use |
| **URL** | The endpoint address |
| **Auth Type** | Authentication method used |

To create a connection, click **+**. To edit, enable/disable, or delete an existing connection, click the **⋮** menu on the connection row, or hover over the connection name in the left tree to reveal the quick-action menu.

## 12.1.1 TDengine TSDB Connections

A TDengine TSDB connection links IDMP to a TDengine time-series database. Once created, it enables asset model import and real-time data access for all elements and attributes that reference this connection.

**Connection form fields:**

| Field | Description |
|---|---|
| **Name** (required) | A unique name for this connection. Accepts letters, numbers, underscores, hyphens, and spaces. |
| **Type** | Select **TDengine TSDB** |
| **URL** (required) | The TDengine REST API endpoint, e.g., `http://localhost:6041` |
| **Auth Type** | **Username Password** or **Token** |
| **Username** | Database username (for Username Password auth) |
| **Password** (required) | Database password. For Token auth, enter the token here. |
| **Explorer URL** (required) | The TDengine Explorer address for this instance, typically `http://[host]:6060` |
| **Additional Properties** | Optional key-value pairs for advanced configuration |

Click **Check** to verify the connection before saving, then click **Save**.

## 12.1.2 External Data Source Connections

MySQL, PostgreSQL, SQL Server, and InfluxDB connections can supply [attribute data references](../03-data-modeling/02-attributes.md#322-data-reference-types). Before creating one, prepare an enabled TDengine connection with the corresponding external data source connector.

1. Click **+**, enter a name, and select the external data source type.
2. Enter the **URL**, **Database**, and authentication details.
3. Select the **Parent TDengine connection**. IDMP automatically creates and manages the corresponding external data source in that TDengine instance.
4. Click **Check**, then **Save** after validation succeeds.

The main settings for each type are:

| Type | Example URL | Authentication | Notes |
|---|---|---|---|
| **MySQL** | `http://mysql-host:3306` | Username Password | Enter the database name separately |
| **PostgreSQL** | `http://pg-host:5432` | Username Password | Enter the database name separately; select a Schema when configuring an attribute reference |
| **SQL Server** | `http://sqlserver-host:1433` | Username Password | Optional default database and Schema; explicitly select the database, Schema, and table for an attribute reference |
| **InfluxDB** | `http://influx-host:8181` | Token | Currently supports InfluxDB 3; a database name is required |

Use `http://` or `https://` followed by the host and an explicit port. Enter the database name and credentials in their respective fields, rather than in the URL. When editing a connection, leave the password or token blank to keep it unchanged. The connection type and parent TDengine connection cannot be changed directly after creation.

### 12.1.2.1 SQL Server Settings

- The connection's default database and Schema are optional. Blank values on creation leave defaults unset. Clearing an existing value removes the corresponding TDengine external source default when the update is successfully applied. An unchanged, already blank field does not issue a clear.
- The database selector offers the connection default and current value. To use another database, enter its name and press Enter, then select its Schema and table. IDMP does not automatically select `dbo`.
- Additional properties support `connect_timeout_ms`, `read_timeout_ms`, and `trust_server_certificate`. Completely blank rows are omitted from submissions. A row with a value requires a property name. Default Schema has a separate field.
- DATE columns can be explicitly selected as the timeline, but are excluded from automatic timeline selection. Tables must still satisfy the unique timestamp primary-key constraint; views use an explicit selection or a unique candidate.
- The SQL Server namespace endpoint is `GET /datasources/connections/{id}/namespaces?database=<database-name>`, relative to the API root. The optional `database` parameter selects the database whose Schemas are returned. If omitted, the connection default is used. If neither is set, the result is an empty list.

:::note
Attributes can only select external connections created and managed in IDMP. External data sources created directly in TDengine do not automatically appear in the IDMP connection list.
:::

:::tip
For AI connections used by the intelligent Q&A and analysis features, see [Chapter 8 AI-Powered Insights](../08-ai-powered-insights/index.md).
:::
