---
title: 连接
sidebar_label: 连接
---

# 12.1 连接

**连接**告知 IDMP 如何访问外部系统。连接在**管理后台 → 连接**中配置，被数据接入任务和资产模型导入所引用。

:::note
连接支持 TDengine TSDB、MySQL、PostgreSQL、SQL Server、InfluxDB 和 AI。TDengine 连接用于业务数据管理；MySQL、PostgreSQL、SQL Server、InfluxDB 连接用于引用外部指标和标签；AI 连接用于智能问答与问题推荐。
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

**连接表单字段：**

| 字段 | 说明 |
|---|---|
| **名称**（必填） | 此连接的唯一名称。支持字母、数字、下划线、连字符和空格。 |
| **类型** | 选择 **TDengine TSDB** |
| **URL**（必填） | TDengine REST API 端点，如 `http://localhost:6041` |
| **认证类型** | **用户名密码**或**密钥** |
| **用户名** | 数据库用户名（用于用户名密码认证） |
| **密码**（必填） | 数据库密码，密钥认证时填写密钥 |
| **Explorer 地址**（必填） | 该实例的 TDengine Explorer 地址，通常为 `http://[host]:6060` |
| **附加属性** | 可选的键值对，用于高级配置 |

点击**检查**验证连接后，再点击**保存**。

## 12.1.2 外部数据源连接

MySQL、PostgreSQL、SQL Server 和 InfluxDB 连接可作为[属性数据引用](../03-data-modeling/02-attributes.md#322-数据引用类型)的来源。创建前，需准备一个已启用且支持对应外部数据源连接器的 TDengine 连接。

1. 点击 **+**，填写名称并选择外部数据源类型。
2. 填写 **URL**、**数据库**和认证信息。
3. 选择**绑定的 TDengine 连接**。IDMP 会自动在该 TDengine 中创建和管理对应的外部数据源。
4. 点击**检查**，验证通过后点击**保存**。

各类型的主要配置如下：

| 类型 | URL 示例 | 认证方式 | 说明 |
|---|---|---|---|
| **MySQL** | `http://mysql-host:3306` | 用户名密码 | 数据库名称单独填写 |
| **PostgreSQL** | `http://pg-host:5432` | 用户名密码 | 数据库名称单独填写，引用属性时再选择 Schema |
| **SQL Server** | `http://sqlserver-host:1433` | 用户名密码 | 可配置默认数据库和 Schema；引用属性时明确选择数据库、Schema 和表 |
| **InfluxDB** | `http://influx-host:8181` | Token | 当前支持 InfluxDB 3，需填写数据库名称 |

URL 使用 `http://` 或 `https://` 加主机和明确的端口，数据库名称和凭证在各自字段中填写，不追加到 URL 中。编辑连接时，密码或 Token 留空表示保持原值；连接类型和绑定的 TDengine 连接创建后不可直接更改。

### 12.1.2.1 SQL Server 配置说明

- 连接级数据库和 Schema 可以留空。创建时留空表示不设置默认值；编辑时将已有值清空，会在下次成功下发时清除 TDengine 外部数据源的对应默认值。原本为空且未修改的字段不会下发清空。
- 配置属性引用时，数据库列表仅提供连接默认库和当前值。其他数据库请手动输入名称并按回车确认，然后选择该库中的 Schema 和表；不会自动选择 `dbo`。
- 附加属性支持 `connect_timeout_ms`、`read_timeout_ms` 和 `trust_server_certificate`。完全空白的参数行不会提交；已填值但未选择参数名时，需先补全名称。默认 Schema 使用独立输入框。
- DATE 列可以作为显式指定的时间轴，但自动选择时间轴时会排除 DATE。表仍须满足唯一时间戳主键约束；视图按显式选择或唯一候选列校验。
- SQL Server 命名空间接口为 `GET /datasources/connections/{id}/namespaces?database=<数据库名>`（相对于 API 根路径）。可选参数 `database` 指定要列出 Schema 的数据库；省略时使用连接默认库，两者都为空时返回空列表。

:::note
属性只能选择在 IDMP 中创建并管理的外部连接。直接在 TDengine 中创建的外部数据源不会自动出现在 IDMP 连接列表中。
:::

:::tip
有关智能问答和分析功能所用 AI 连接的配置，请参阅[第 8 章 AI 智能洞察](../08-ai-powered-insights/index.md)。
:::
