---
title: 连接
sidebar_label: 连接
---

# 12.1 连接

**连接**告知 IDMP 如何访问外部系统。连接在**管理后台 → 连接**中配置，被数据接入任务和资产模型导入所引用。

:::note
连接支持 TDengine TSDB、MySQL、PostgreSQL、SQL Server、InfluxDB 和 Oracle。TDengine 连接用于业务数据管理。其他类型的连接用于引用外部指标和标签。
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

MySQL、PostgreSQL、SQL Server、InfluxDB 和 Oracle 连接可作为[属性数据引用](../03-data-modeling/02-attributes.md#322-数据引用类型)的来源。创建前，需准备一个已启用且支持对应外部数据源连接器的 TDengine 连接。

1. 点击 **+**，填写名称并选择外部数据源类型。
2. 按对应类型填写 **URL**、**数据库**或**服务名**，以及认证信息。
3. 选择**绑定的 TDengine 连接**。
4. 点击**检查**，验证 IDMP 直连和 TDengine 联邦访问。表单校验错误显示在相应字段，连接检查请求失败时通过页面通知显示错误。检查通过后，页面隐藏此前保存失败的状态和错误提示。
5. 点击**保存**，由 IDMP 在绑定的 TDengine 中创建或更新对应的外部数据源。配置下发失败时，错误显示在**附加属性**下方。

外部数据源共用以下填写规则：

- **URL 格式**：使用 `http://主机:端口` 或 `https://主机:端口`，端口必须显式填写，范围为 `1` 至 `65535`。数据库名称和凭证应填写在各自字段中；URL 不应包含用户名、密码、查询参数、片段或 `/` 之外的路径，也不使用 `jdbc:` 前缀。
- **协议与端口**。关系型数据库填写数据库监听端口。MySQL、PostgreSQL 和 SQL Server 默认根据 `http://` 或 `https://` 关闭或开启 TLS，也可通过附加属性显式设置 TLS。Oracle 仅支持 TCP，填写 `http://`。InfluxDB 填写实际的 HTTP 或 HTTPS 服务端点。
- **网络与权限**：IDMP 服务和绑定的 TDengine 实例均需能够访问外部数据源。账号或令牌应具有目标数据库、Schema 和表的读取权限，以及列出所需元数据的权限。
- **长度限制**。数据库名或 Oracle 服务名最长为 64 个 UTF-8 字节，主机名最长为 256 个 UTF-8 字节，关系型数据库用户名最长为 128 个 UTF-8 字节。SQL Server 和 Oracle 的 Schema 名最长为 64 个 UTF-8 字节。
- **编辑规则**。更改主机、端口或用户名时，需要重新输入密码或令牌。其他编辑可将密码或令牌留空以保留原值。连接类型和绑定的 TDengine 连接创建后不可直接更改。

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

使用 `https://` 时，`sslMode` 默认为 `VERIFY_IDENTITY`，启用 TLS 并校验服务端证书和主机名。应使用与证书匹配的主机名，并确保 IDMP 和 TDengine 的连接环境信任对应证书。可在附加属性中设置 `sslMode` 来覆盖 URL 的默认设置，也可使用别名 `ssl_mode`。

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

使用 `https://` 时，`sslmode` 默认为 `verify-full`，启用 TLS 并校验证书信任链和主机名。应使用与证书匹配的主机名。可在附加属性中设置 `sslmode` 来覆盖 URL 的默认设置。

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
| **绑定的 TDengine 连接** | 是 | 选择已启用且支持 SQL Server 外部数据源连接器的 TDengine 连接，例如 `production-tsdb`。 |
| **附加属性** | 否 | 通过 `schema` 设置连接默认 Schema，例如 `dbo`。也支持 `connect_timeout_ms`、`read_timeout_ms` 和 `trust_server_certificate`。 |

例如，URL 填写 `https://sqlserver-host:1433`，数据库填写 `FactoryDB`，在附加属性中添加 `schema=dbo`，填写数据库账号密码，并绑定 `production-tsdb`。

使用 `https://` 时，`encrypt` 默认为 `true`，并默认验证服务端证书。可在附加属性中设置 `encrypt` 来覆盖 URL 的默认设置。TDengine 联邦连接器不支持 `encrypt=Strict`。

配置和编辑时还需注意：

- 创建时可留空数据库并省略 `schema`。编辑时清空已有数据库或删除 `schema` 参数行，成功下发后会清除 TDengine 外部数据源的对应默认值。
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

### 12.1.2.5 Oracle 连接

Oracle 连接通过 TCP 访问指定服务。在配置属性数据引用时，可选择该服务下的 Schema 和表。

| 参数 | 是否必填 | 说明与填写示例 |
|---|---|---|
| **名称** | 是 | 此连接的唯一名称，例如 `factory-oracle`。 |
| **类型** | 是 | 选择 **Oracle**。 |
| **URL** | 是 | Oracle 监听器的主机和 TCP 端口，例如 `http://oracle-host:1521`。仅支持 `http://` 格式。 |
| **认证类型** | 是 | 选择**用户名密码**。 |
| **用户名** | 是 | Oracle 数据库账号，例如 `idmp_reader`。 |
| **密码** | 新建时必填 | 上述 Oracle 账号的密码。更改主机、端口或用户名时需重新填写。 |
| **服务名** | 是 | Oracle 服务名，例如 `factory.example.com`。请填写服务名。SID、TNS 别名和 JDBC URL 均不适用。 |
| **绑定的 TDengine 连接** | 是 | 选择已启用且支持 Oracle 外部数据源连接器的 TDengine 连接，例如 `production-tsdb`。 |
| **附加属性** | 否 | 可通过 `schema` 设置连接默认 Schema，例如 `FACTORY`。也支持设置连接和读取超时时间。 |

### 12.1.2.6 外部数据源附加属性

附加属性通过参数名和值配置。省略参数时使用下表默认值。关系型外部连接也可在参数名输入框中填写 IDMP 允许的 JDBC 驱动参数。TDengine 联邦访问只使用 IDMP 映射到其外部数据源的选项。其他允许的驱动参数只用于 IDMP 直连，例如 MySQL 的 `allowPublicKeyRetrieval`。

| 参数名 | 适用类型 | 默认值 | 说明与取值范围 |
|---|---|---|---|
| `schema` | SQL Server、Oracle | 未设置 | 连接级默认 Schema，例如 SQL Server 的 `dbo`。 |
| `connect_timeout_ms` | 所有外部数据源 | `10000` | 建立连接的超时时间，单位为毫秒。按下文范围填写整数，无需添加单位。 |
| `read_timeout_ms` | 所有外部数据源 | `30000` | 等待查询或读取响应的超时时间，单位为毫秒。按下文范围填写整数，无需添加单位。 |
| `trust_server_certificate` | 仅 SQL Server | `false` | 是否信任服务端证书而跳过证书验证，只接受小写 `true` 或 `false`。使用 `https://` 时，默认 `false` 表示验证证书；`true` 保留加密但跳过证书验证，仅适用于明确接受该风险的环境。此参数不会自行启用 TLS。 |

Oracle 的两个超时参数均接受 `0` 或 `100` 至 `600000`。填写 `0` 时，TDengine 将该值交给 Oracle 连接器处理，IDMP 直连仍使用表中的默认超时时间。其他外部数据源的范围为 `1` 至 `2147483647`。

完全空白的参数行不会提交。每个参数需要同时填写名称和合法值。要使用默认值，请删除对应参数行。

:::note
属性只能选择在 IDMP 中创建并管理的外部连接。直接在 TDengine 中创建的外部数据源不会自动出现在 IDMP 连接列表中。
:::
