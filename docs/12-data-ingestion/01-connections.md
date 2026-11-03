---
title: 连接
sidebar_label: 连接
---

# 12.1 连接

**连接**告知 IDMP 如何访问外部系统。连接在**管理后台 → 连接**中配置，被数据接入任务和资产模型导入所引用。

:::note
连接支持 TDengine TSDB、MySQL、PostgreSQL、SQL Server 和 InfluxDB。TDengine 连接用于业务数据管理；MySQL、PostgreSQL、SQL Server、InfluxDB 连接用于引用外部指标和标签。
:::

连接列表显示所有已配置的连接，包含以下列：

| 列 | 说明 |
|---|---|
| **名称** | 连接名称 |
| **类型** | 连接类型（如 TDengine TSDB） |
| **连接状态** | 连接当前是否正在使用 |
| **URL** | 端点地址 |
| **认证类型** | 所用的认证方式 |

点击 **+** 创建连接。要编辑、启用/禁用或删除已有连接，点击连接行上的 **⋮** 菜单，或将鼠标悬停在左侧树形结构中的连接名称上，以显示快捷操作菜单。

## 12.1.1 TDengine TSDB 连接

TDengine TSDB 连接将 IDMP 与 TDengine 时序数据库相连接。创建后，它将为引用此连接的所有元素和属性启用资产模型导入和实时数据访问。

连接表单中的参数如下。表中的凭证必填要求适用于新建连接；编辑已有连接时，密码或令牌留空表示保持原值。

| 参数 | 是否必填 | 说明与填写示例 |
|---|---|---|
| **名称** | 是 | 此连接的唯一名称，例如 `production-tsdb`。支持字母、数字、下划线、连字符和空格。 |
| **类型** | 是 | 选择 **TDengine TSDB**。 |
| **URL** | 是 | TDengine 的 taosAdapter 服务地址，例如 `http://tsdb-host:6041`。填写 IDMP 服务能够访问的主机名或 IP 地址及实际服务端口；使用 TLS 时填写 `https://` 地址。 |
| **认证类型** | 是 | 按实例部署方式选择**用户名密码**、**云服务令牌**或**企业版令牌**。 |
| **用户名** | 条件必填 | 使用用户名密码认证时填写 TDengine 数据库用户，例如 `idmp_user`；令牌认证时不填写。该用户应具有所需数据库的访问权限。 |
| **密码 / 令牌** | 是 | 用户名密码认证时填写数据库密码；云服务令牌或企业版令牌认证时填写对应实例签发的令牌。 |
| **Explorer 地址** | 是 | 浏览器访问该实例 TDengine Explorer 的地址，例如 `http://tsdb-host:6060`。系统会根据 URL 自动填充，需核对实际对外地址；经过域名或反向代理访问时，以实际部署地址为准。 |
| **附加属性** | 否 | 以名称和值的形式填写 TDengine JDBC 驱动的高级连接参数。通常留空；如需设置，参数名和值应与所用驱动版本一致。 |

例如，连接局域网中的 TDengine 实例时，名称填写 `production-tsdb`，URL 填写 `http://tsdb-host:6041`，认证类型选择**用户名密码**，填写数据库账号和密码，Explorer 地址填写 `http://tsdb-host:6060`，附加属性留空。点击**检查**验证连接后，再点击**保存**。

:::note
URL 中的 `localhost` 指 IDMP 服务所在的主机或容器。TDengine 部署在其他主机或容器时，应填写 IDMP 实际能够访问的地址。Explorer 地址则需要能够从用户浏览器访问。
:::

## 12.1.2 外部数据源连接

MySQL、PostgreSQL、SQL Server 和 InfluxDB 连接可作为[属性数据引用](../03-data-modeling/02-attributes.md#322-数据引用类型)的来源。创建前，需准备一个已启用且支持对应外部数据源连接器的 TDengine 连接。

1. 点击 **+**，填写名称并选择外部数据源类型。
2. 按下文对应类型的参数表填写 **URL**、**数据库**和认证信息。
3. 选择**绑定的 TDengine 连接**。IDMP 会自动在该 TDengine 中创建和管理对应的外部数据源。
4. 点击**检查**，验证通过后点击**保存**。

四类外部数据源共用以下填写规则：

- **URL 格式**：使用 `http://主机:端口` 或 `https://主机:端口`，端口必须显式填写，范围为 `1` 至 `65535`。数据库名称和凭证应填写在各自字段中；URL 不应包含用户名、密码、查询参数、片段或 `/` 之外的路径，也不使用 `jdbc:` 前缀。
- **协议与端口**：对于 MySQL、PostgreSQL 和 SQL Server，URL 中的端口为数据库服务端口。`http://` 表示不启用 TLS，`https://` 表示启用 TLS；此处的 URL 格式不表示数据库需要提供 HTTP 服务。InfluxDB 填写其服务端点地址。
- **网络与权限**：IDMP 服务和绑定的 TDengine 实例均需能够访问外部数据源。账号或令牌应具有目标数据库、Schema 和表的读取权限，以及列出所需元数据的权限。
- **长度限制**：数据库名最长为 64 个 UTF-8 字节，主机名最长为 256 个 UTF-8 字节，关系型数据库用户名最长为 128 个 UTF-8 字节。SQL Server 的 Schema 名最长为 64 个 UTF-8 字节。
- **编辑规则**：密码或令牌留空表示保持原值。连接类型和绑定的 TDengine 连接创建后不可直接更改。

### 12.1.2.1 MySQL 连接

MySQL 连接用于读取指定数据库中的外部指标和标签，参数如下。

| 参数 | 是否必填 | 说明与填写示例 |
|---|---|---|
| **名称** | 是 | 此连接的唯一名称，例如 `factory-mysql`。 |
| **类型** | 是 | 选择 **MySQL**。 |
| **URL** | 是 | MySQL 服务的主机和端口，例如 `http://mysql-host:3306`；使用 TLS 时填写 `https://mysql-host:3306`。端口按实际部署修改。 |
| **认证类型** | 是 | 选择**用户名密码**。 |
| **用户名** | 是 | MySQL 数据库账号，例如 `idmp_reader`。 |
| **密码** | 新建时必填 | 上述 MySQL 账号的密码；编辑时留空可保留原密码。 |
| **数据库** | 是 | 需要读取的数据库名称，例如 `factory`。数据库必须已存在，不填写表名。 |
| **绑定的 TDengine 连接** | 是 | 选择已启用且支持 MySQL 外部数据源连接器的 TDengine 连接，例如 `production-tsdb`。 |
| **附加属性** | 否 | 支持 `connect_timeout_ms` 和 `read_timeout_ms`；含义、默认值及取值范围见下文附加属性表。 |

例如，URL 填写 `http://mysql-host:3306`，数据库填写 `factory`，用户名填写 `idmp_reader`，填写对应密码，并绑定 `production-tsdb`。使用默认超时时间时，附加属性留空即可。

使用 `https://` 时，连接启用 TLS，并校验服务端证书和主机名。应使用与证书匹配的主机名，并确保 IDMP 和 TDengine 的连接环境信任对应证书。

### 12.1.2.2 PostgreSQL 连接

PostgreSQL 连接指定要访问的数据库；Schema 和表在后续配置属性数据引用时选择。

| 参数 | 是否必填 | 说明与填写示例 |
|---|---|---|
| **名称** | 是 | 此连接的唯一名称，例如 `factory-postgresql`。 |
| **类型** | 是 | 选择 **PostgreSQL**。 |
| **URL** | 是 | PostgreSQL 服务的主机和端口，例如 `http://pg-host:5432`；使用 TLS 时填写 `https://pg-host:5432`。 |
| **认证类型** | 是 | 选择**用户名密码**。 |
| **用户名** | 是 | PostgreSQL 数据库账号，例如 `idmp_reader`。 |
| **密码** | 新建时必填 | 上述 PostgreSQL 账号的密码；编辑时留空可保留原密码。 |
| **数据库** | 是 | 需要读取的数据库名称，例如 `factory`。此处不填写 Schema 名或 `数据库.Schema`。 |
| **绑定的 TDengine 连接** | 是 | 选择已启用且支持 PostgreSQL 外部数据源连接器的 TDengine 连接，例如 `production-tsdb`。 |
| **附加属性** | 否 | 支持 `connect_timeout_ms` 和 `read_timeout_ms`；连接表单不单独设置 PostgreSQL 默认 Schema。 |

例如，URL 填写 `http://pg-host:5432`，数据库填写 `factory`，填写 `idmp_reader` 的账号密码，并绑定 `production-tsdb`。保存后，在属性数据引用中选择该连接，再选择 `public` 等目标 Schema 和表。

使用 `https://` 时，连接启用 TLS，并校验证书信任链和主机名；应使用与证书匹配的主机名。

### 12.1.2.3 SQL Server 连接

SQL Server 连接可设置默认数据库和默认 Schema，也可在属性数据引用中明确指定目标数据库、Schema 和表。

| 参数 | 是否必填 | 说明与填写示例 |
|---|---|---|
| **名称** | 是 | 此连接的唯一名称，例如 `factory-sqlserver`。 |
| **类型** | 是 | 选择 **SQL Server**。 |
| **URL** | 是 | SQL Server 服务的主机和明确的 TCP 端口，例如 `http://sqlserver-host:1433`。命名实例应填写其实际监听端口，不在 URL 中追加实例名。使用 TLS 时填写 `https://sqlserver-host:1433`。 |
| **认证类型** | 是 | 选择**用户名密码**。 |
| **用户名** | 是 | SQL Server 数据库账号，例如 `idmp_reader`。 |
| **密码** | 新建时必填 | 上述 SQL Server 账号的密码；编辑时留空可保留原密码。 |
| **数据库** | 否 | 连接默认数据库，例如 `FactoryDB`。留空表示不设置连接级默认库，配置属性引用时需明确选择数据库。 |
| **Schema** | 否 | 连接默认 Schema，例如 `dbo`。使用独立输入框填写，不在附加属性中添加同名参数；留空表示不设置连接级默认 Schema。 |
| **绑定的 TDengine 连接** | 是 | 选择已启用且支持 SQL Server 外部数据源连接器的 TDengine 连接，例如 `production-tsdb`。 |
| **附加属性** | 否 | 支持 `connect_timeout_ms`、`read_timeout_ms` 和 `trust_server_certificate`，详见下文附加属性表。 |

例如，URL 填写 `https://sqlserver-host:1433`，数据库填写 `FactoryDB`，Schema 填写 `dbo`，填写数据库账号密码，并绑定 `production-tsdb`。如需使用默认超时和证书验证，附加属性留空即可。

配置和编辑时还需注意：

- 创建时数据库和 Schema 留空表示不设置默认值；编辑时将已有值清空，会在下次成功下发时清除 TDengine 外部数据源的对应默认值。原本为空且未修改的字段不会下发清空。
- 配置属性引用时，数据库列表仅提供连接默认库和当前值。其他数据库需手动输入名称并按回车确认，再选择该库中的 Schema 和表；系统不会自动选择 `dbo`。
- DATE 列可以作为显式指定的时间轴，但自动选择时间轴时会排除 DATE。表仍须满足唯一时间戳主键约束；视图按显式选择或唯一候选列校验。

### 12.1.2.4 InfluxDB 连接

InfluxDB 外部连接当前仅支持 InfluxDB 3，使用 API 令牌访问指定数据库。

| 参数 | 是否必填 | 说明与填写示例 |
|---|---|---|
| **名称** | 是 | 此连接的唯一名称，例如 `factory-influxdb`。 |
| **类型** | 是 | 选择 **InfluxDB**。系统按 InfluxDB 3 配置此连接，不需要另行填写版本。 |
| **URL** | 是 | InfluxDB 3 服务端点，例如 `http://influx-host:8181`；使用 TLS 时填写 `https://influx-host:8181`。填写实际服务端口，不追加 `/api/v3/query_sql` 等接口路径。 |
| **认证类型** | 是 | 选择 **InfluxDB API 令牌**。 |
| **InfluxDB API 令牌** | 新建时必填 | InfluxDB 3 签发的 API Token，应具有目标数据库的读取权限。填写令牌原值，不附加 `Bearer` 前缀及其后的空格；编辑时留空可保留原令牌。 |
| **数据库** | 是 | InfluxDB 3 数据库名称，例如 `factory`。不填写组织 ID、Bucket 或 Measurement 名称。 |
| **绑定的 TDengine 连接** | 是 | 选择已启用且支持 InfluxDB 外部数据源连接器的 TDengine 连接，例如 `production-tsdb`。 |
| **附加属性** | 否 | 支持 `connect_timeout_ms` 和 `read_timeout_ms`。无需配置 InfluxDB 2 的组织 ID 等参数。 |

例如，URL 填写 `http://influx-host:8181`，数据库填写 `factory`，填写具有该库读取权限的 API 令牌，并绑定 `production-tsdb`。

IDMP 使用 InfluxDB 3 的 HTTP SQL API 读取元数据和执行连接检查，绑定的 TDengine 通过 Flight SQL 访问数据。部署时需确保两侧所需接口均可访问；具体端口和服务能力以 InfluxDB 部署为准。

### 12.1.2.5 外部数据源附加属性

附加属性通过参数名和值配置。省略参数时使用下表默认值；四类外部连接只接受下表中对应类型支持的参数。

| 参数名 | 适用类型 | 默认值 | 说明与取值范围 |
|---|---|---|---|
| `connect_timeout_ms` | MySQL、PostgreSQL、SQL Server、InfluxDB | `10000` | 建立连接的超时时间，单位为毫秒。填写 `1` 至 `2147483647` 的整数，不添加 `ms` 等单位；例如 `10000` 表示 10 秒。 |
| `read_timeout_ms` | MySQL、PostgreSQL、SQL Server、InfluxDB | `30000` | 等待查询或读取响应的超时时间，单位为毫秒。填写 `1` 至 `2147483647` 的整数；例如 `30000` 表示 30 秒。 |
| `trust_server_certificate` | 仅 SQL Server | `false` | 是否信任服务端证书而跳过证书验证，只接受小写 `true` 或 `false`。使用 `https://` 时，默认 `false` 表示验证证书；`true` 保留加密但跳过证书验证，仅适用于明确接受该风险的环境。此参数不会自行启用 TLS。 |

完全空白的参数行不会提交；已填写参数值时必须选择参数名，选择参数名后也必须填写合法值。若需要保留默认值，应删除对应参数行，而不是将值留空。

:::note
属性只能选择在 IDMP 中创建并管理的外部连接。直接在 TDengine 中创建的外部数据源不会自动出现在 IDMP 连接列表中。
:::
