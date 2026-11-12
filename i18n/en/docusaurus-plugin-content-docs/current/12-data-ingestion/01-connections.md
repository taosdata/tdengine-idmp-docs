---
title: Connections
sidebar_label: Connections
---

# 12.1 Connections

A **connection** tells IDMP how to reach an external system. Connections are configured in **Admin Console → Connections** and are referenced by data ingestion tasks and asset model imports.

:::note
Supported connection types include TDengine TSDB, MySQL, PostgreSQL, SQL Server, InfluxDB, and Oracle. TDengine connections manage business data. The other connection types provide external metrics and tags.
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

The connection form accepts the following parameters. Credential requirements apply when creating a connection. When editing an existing connection, leave the password or token blank to keep its current value.

| Parameter | Required | Description and example |
|---|---|---|
| **Name** | Yes | A unique connection name, such as `production-tsdb`. Accepts letters, numbers, underscores, hyphens, and spaces. |
| **Type** | Yes | Select **TDengine TSDB**. |
| **URL** | Yes | The TDengine taosAdapter service address, such as `http://tsdb-host:6041`. Use a hostname or IP address accessible from the IDMP service and the actual service port. Use an `https://` address for TLS. |
| **Auth Type** | Yes | Select **Username Password**, **Cloud Token**, or **Enterprise Token**, according to the instance deployment. |
| **Username** | Conditional | For username/password authentication, enter a TDengine database user, such as `idmp_user`, with access to the required databases. Omit this field for token authentication. |
| **Password / Token** | Yes | Enter the database password for username/password authentication, or the token issued for the corresponding cloud or enterprise instance. |
| **Explorer URL** | Yes | The address used by the browser to access TDengine Explorer, such as `http://tsdb-host:6060`. IDMP fills this field based on the URL; verify it against the actual public address, especially when using a domain name or reverse proxy. |
| **Additional Properties** | No | Advanced TDengine JDBC connection parameters, entered as name/value pairs. Usually left empty. Any parameters supplied must match the driver version in use. |

For example, to connect to a TDengine instance on the local network, enter `production-tsdb` as the name and `http://tsdb-host:6041` as the URL. Select **Username Password**, enter the database credentials, set Explorer URL to `http://tsdb-host:6060`, and leave additional properties empty. Click **Check**, then **Save** after verification succeeds.

:::note
In the URL, `localhost` refers to the host or container running the IDMP service. If TDengine runs elsewhere, use an address that IDMP can reach. The Explorer URL must be accessible from the user's browser.
:::

## 12.1.2 External Data Source Connections

MySQL, PostgreSQL, SQL Server, InfluxDB, and Oracle connections can supply [attribute data references](../03-data-modeling/02-attributes.md#322-data-reference-types). Before creating one, prepare an enabled TDengine connection with the corresponding external data source connector.

1. Click **+**, enter a name, and select the external data source type.
2. Enter the **URL**, **Database** or **Service name**, and authentication details for the selected type.
3. Select the **Parent TDengine connection**.
4. Click **Check** to verify direct access from IDMP and federated access from TDengine. Form validation errors appear by their fields. If the connection check request fails, the error appears in a notification. A successful check hides the status and error from any previous failed save.
5. Click **Save** to create or update the external data source in the parent TDengine instance. If applying the configuration fails, the error appears below **Additional Properties**.

The following rules apply to all external data source types:

- **URL format**: Use `http://host:port` or `https://host:port`. An explicit port from `1` to `65535` is required. Enter the database and credentials in their own fields. The URL must not contain a username, password, query, fragment, or path other than `/`. Do not use a `jdbc:` prefix.
- **Scheme and port**. For relational databases, use the database listener port. For MySQL, PostgreSQL, and SQL Server, `http://` disables TLS by default and `https://` enables it by default. Additional properties can override the TLS settings. Oracle uses TCP only and requires the `http://` scheme. For InfluxDB, enter its HTTP or HTTPS service endpoint.
- **Network and permissions**: Both the IDMP service and the parent TDengine instance must be able to reach the external source. The account or token must have read access to the target database, Schema, and tables, together with permission to list the required metadata.
- **Length limits**. Database names and Oracle service names are limited to 64 UTF-8 bytes, hostnames to 256 UTF-8 bytes, and relational database usernames to 128 UTF-8 bytes. SQL Server and Oracle Schema names are limited to 64 UTF-8 bytes.
- **Editing**. Re-enter the password or token when changing the host, port, or username. For other edits, leave the password or token blank to keep its current value. The connection type and parent TDengine connection cannot be changed directly after creation.

### 12.1.2.1 MySQL Connections

A MySQL connection reads external metrics and tags from a specified database using the following parameters.

| Parameter | Required | Description and example |
|---|---|---|
| **Name** | Yes | A unique connection name, such as `factory-mysql`. |
| **Type** | Yes | Select **MySQL**. |
| **URL** | Yes | The MySQL host and port, such as `http://mysql-host:3306`, or `https://mysql-host:3306` for TLS. Adjust the port to match the deployment. |
| **Auth Type** | Yes | Select **Username Password**. |
| **Username** | Yes | A MySQL database account, such as `idmp_reader`. |
| **Password** | On creation | The password for this MySQL account. Leave blank when editing to retain the existing password. |
| **Database** | Yes | The existing database to read, such as `factory`. Do not enter a table name. |
| **Parent TDengine connection** | Yes | An enabled TDengine connection with the MySQL external source connector, such as `production-tsdb`. |
| **Additional Properties** | No | Supports `connect_timeout_ms` and `read_timeout_ms`. See the additional properties table below for meanings, defaults, and ranges. |

For example, set URL to `http://mysql-host:3306`, Database to `factory`, and Username to `idmp_reader`. Enter the account password and select `production-tsdb` as the parent. Leave additional properties empty to use the default timeouts.

With `https://`, `sslMode` defaults to `VERIFY_IDENTITY`, which enables TLS with server certificate and hostname verification. Use a hostname matching the certificate and ensure that both IDMP and TDengine trust it. To override the URL default, set `sslMode` under Additional Properties. The alias `ssl_mode` is also accepted.

### 12.1.2.2 PostgreSQL Connections

A PostgreSQL connection specifies the database to access. Select its Schema and table later when configuring an attribute data reference.

| Parameter | Required | Description and example |
|---|---|---|
| **Name** | Yes | A unique connection name, such as `factory-postgresql`. |
| **Type** | Yes | Select **PostgreSQL**. |
| **URL** | Yes | The PostgreSQL host and port, such as `http://pg-host:5432`, or `https://pg-host:5432` for TLS. |
| **Auth Type** | Yes | Select **Username Password**. |
| **Username** | Yes | A PostgreSQL database account, such as `idmp_reader`. |
| **Password** | On creation | The password for this PostgreSQL account. Leave blank when editing to retain the existing password. |
| **Database** | Yes | The database to read, such as `factory`. Do not enter a Schema name or `database.Schema`. |
| **Parent TDengine connection** | Yes | An enabled TDengine connection with the PostgreSQL external source connector, such as `production-tsdb`. |
| **Additional Properties** | No | Supports `connect_timeout_ms` and `read_timeout_ms`. The connection form has no separate default Schema field for PostgreSQL. |

For example, set URL to `http://pg-host:5432` and Database to `factory`, enter the credentials for `idmp_reader`, and select `production-tsdb` as the parent. After saving, select this connection in the attribute data reference, followed by the target Schema, such as `public`, and table.

With `https://`, `sslmode` defaults to `verify-full`, which enables TLS with certificate chain and hostname verification. Use a hostname that matches the certificate. To override the URL default, set `sslmode` under Additional Properties.

### 12.1.2.3 SQL Server Connections

A SQL Server connection can specify a default database and Schema. The target database, Schema, and table can also be selected explicitly in an attribute data reference.

| Parameter | Required | Description and example |
|---|---|---|
| **Name** | Yes | A unique connection name, such as `factory-sqlserver`. |
| **Type** | Yes | Select **SQL Server**. |
| **URL** | Yes | The SQL Server host and explicit TCP port, such as `http://sqlserver-host:1433`. For a named instance, use its actual listening port without appending an instance name. Use `https://sqlserver-host:1433` for TLS. |
| **Auth Type** | Yes | Select **Username Password**. |
| **Username** | Yes | A SQL Server database account, such as `idmp_reader`. |
| **Password** | On creation | The password for this SQL Server account. Leave blank when editing to retain the existing password. |
| **Database** | No | The connection's default database, such as `FactoryDB`. Leave blank to keep the connection default unset, then explicitly select a database in the attribute reference. |
| **Parent TDengine connection** | Yes | An enabled TDengine connection with the SQL Server external source connector, such as `production-tsdb`. |
| **Additional Properties** | No | Set `schema` to the connection's default schema, such as `dbo`. Also supports `connect_timeout_ms`, `read_timeout_ms`, and `trust_server_certificate`. |

For example, set URL to `https://sqlserver-host:1433` and Database to `FactoryDB`, then add `schema=dbo` under Additional Properties. Enter the database credentials and select `production-tsdb` as the parent.

With `https://`, `encrypt` defaults to `true` and the server certificate is verified by default. To override the URL default, set `encrypt` under Additional Properties. The TDengine federated connector does not support `encrypt=Strict`.

When configuring or editing this connection, also consider the following:

- When creating a connection, you can leave Database blank and omit `schema`. Clearing an existing database or removing the `schema` row clears the corresponding TDengine external source default once the update is applied.
- The database selector in an attribute reference offers the connection default and current value. To use another database, enter its name and press Enter, then select its Schema and table. IDMP does not automatically select `dbo`.
- DATE columns can be explicitly selected as the timeline, but are excluded from automatic timeline selection. Tables must still satisfy the unique timestamp primary-key constraint; views use an explicit selection or a unique candidate.

### 12.1.2.4 InfluxDB Connections

InfluxDB external connections currently support only InfluxDB 3 and use an API token to access a specified database.

| Parameter | Required | Description and example |
|---|---|---|
| **Name** | Yes | A unique connection name, such as `factory-influxdb`. |
| **Type** | Yes | Select **InfluxDB**. IDMP configures it for InfluxDB 3; no separate version input is required. |
| **URL** | Yes | The InfluxDB 3 service endpoint, such as `http://influx-host:8181`, or `https://influx-host:8181` for TLS. Use the actual service port without appending paths such as `/api/v3/query_sql`. |
| **Auth Type** | Yes | Select **InfluxDB API Token**. |
| **InfluxDB API Token** | On creation | An API token issued by InfluxDB 3 with read access to the target database. Enter the raw token without the `Bearer` prefix or its following space. Leave blank when editing to retain the existing token. |
| **Database** | Yes | The InfluxDB 3 database name, such as `factory`. Do not enter an organization ID, bucket, or measurement name. |
| **Parent TDengine connection** | Yes | An enabled TDengine connection with the InfluxDB external source connector, such as `production-tsdb`. |
| **Additional Properties** | No | Supports `connect_timeout_ms` and `read_timeout_ms`. InfluxDB 2 settings such as organization ID are not needed. |

For example, set URL to `http://influx-host:8181` and Database to `factory`, enter an API token with read access to that database, and select `production-tsdb` as the parent.

IDMP uses the InfluxDB 3 HTTP SQL API for metadata access and connection checks, while the parent TDengine accesses data through Flight SQL. Ensure that the interfaces required by both are reachable. Actual ports and service capabilities depend on the InfluxDB deployment.

### 12.1.2.5 Oracle Connections

An Oracle connection accesses a specified service over TCP. Select the Schema and table within that service when configuring an attribute data reference.

| Parameter | Required | Description and example |
|---|---|---|
| **Name** | Yes | A unique connection name, such as `factory-oracle`. |
| **Type** | Yes | Select **Oracle**. |
| **URL** | Yes | The Oracle listener host and TCP port, such as `http://oracle-host:1521`. Use the `http://` scheme. |
| **Auth Type** | Yes | Select **Username Password**. |
| **Username** | Yes | An Oracle database account, such as `idmp_reader`. |
| **Password** | On creation | The password for this Oracle account. Re-enter it when changing the host, port, or username. |
| **Service name** | Yes | The Oracle service name, such as `factory.example.com`. SIDs, TNS aliases, and JDBC URLs are unsupported in this field. |
| **Parent TDengine connection** | Yes | An enabled TDengine connection with the Oracle external source connector, such as `production-tsdb`. |
| **Additional Properties** | No | Set `schema` to the connection's default Schema, such as `FACTORY`. You can also set the connection and read timeouts. |

### 12.1.2.6 External Data Source Additional Properties

Configure additional properties as name/value pairs. Omitted parameters use the defaults below. For relational external connections, you can also type JDBC driver property names that IDMP allows. TDengine federated access uses only the options IDMP maps to its external source. Other allowed driver properties, such as MySQL's `allowPublicKeyRetrieval`, apply only to direct access from IDMP.

| Parameter name | Applicable types | Default | Description and allowed values |
|---|---|---|---|
| `schema` | SQL Server, Oracle | Unset | The connection's default schema, such as `dbo` for SQL Server. |
| `connect_timeout_ms` | All external sources | `10000` | Connection establishment timeout in milliseconds. Enter an integer in the range below without a unit suffix. |
| `read_timeout_ms` | All external sources | `30000` | Timeout for query or read responses in milliseconds. Enter an integer in the range below without a unit suffix. |
| `trust_server_certificate` | SQL Server only | `false` | Whether to trust the server certificate without verification. Accepts only lowercase `true` or `false`. With `https://`, the default `false` verifies the certificate; `true` keeps encryption but skips certificate verification and should be used only where that risk is explicitly accepted. This option does not enable TLS by itself. |

For Oracle, both timeouts accept `0` or values from `100` to `600000`. TDengine passes `0` to the Oracle connector. Direct access from IDMP still uses the default timeouts in the table. For other external sources, both timeouts accept values from `1` to `2147483647`.

Completely blank rows are omitted. Each parameter requires a name and a valid value. Remove the parameter row to use its default.

:::note
Attributes can only select external connections created and managed in IDMP. External data sources created directly in TDengine do not automatically appear in the IDMP connection list.
:::
