---
title: 数据接入任务
sidebar_label: 数据接入任务
---

# 12.2 数据接入任务

**数据接入**管理从外部数据源向 TDengine TSDB 的时序数据接入。可从**管理后台 → 数据接入**访问。

数据接入页面列出所有 TDengine 连接。点击某个连接可管理其接入任务、代理和数据采集代理配置。

## 12.2.1 数据接入任务

**数据接入任务**选项卡列出某个连接的所有已配置接入任务，包含以下列：**ID**、**名称**、**类型**、**目标**、**创建时间**、**代理**、**指标**和**状态**。

工具栏提供启动、停止、删除、导入和导出任务的控制按钮，以及刷新按钮和设置选项。

### 12.2.1.1 创建任务

点击 **+** 创建新任务。配置以下部分：

#### 基本信息

<table>
<colgroup><col style="width:9em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>名称</strong>（必填）</td><td>任务的描述性名称</td></tr>
<tr><td><strong>类型</strong></td><td>数据源协议（参见下方任务类型列表）</td></tr>
<tr><td><strong>目标</strong>（必填）</td><td>目标 TDengine 数据库。点击<strong>+ 创建数据库</strong>新建一个。</td></tr>
</tbody>
</table>

#### 连接配置

配置字段因任务类型而异。以下是两个常见示例。

#### 示例：OPC-UA

OPC-UA（OPC 统一架构）是一种广泛用于连接 PLC、传感器和 SCADA 系统的工业协议。

##### 连接配置

<table>
<colgroup><col style="width:12em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>服务器端点</strong>（必填）</td><td>OPC-UA 服务器地址，如 <code>127.0.0.1:6666/OPCUA/ServerPath</code></td></tr>
<tr><td><strong>故障转移服务器端点</strong></td><td>用于高可用性的备用服务器端点</td></tr>
<tr><td><strong>安全模式</strong></td><td>OPC-UA 安全模式（无、签名、签名并加密）</td></tr>
<tr><td><strong>安全策略</strong></td><td>使用的加密策略</td></tr>
<tr><td><strong>安全通道证书</strong></td><td>安全通道的证书文件</td></tr>
<tr><td><strong>证书私钥</strong></td><td>证书的私钥文件</td></tr>
<tr><td><strong>连接超时</strong></td><td>连接超时时间（秒，默认：10）</td></tr>
<tr><td><strong>请求超时</strong></td><td>请求超时时间（秒，默认：10）</td></tr>
</tbody>
</table>

##### 认证

选择**匿名**、**用户名**（用户名和密码）或**证书**（客户端证书文件）。

点击**检查连接**验证后再继续。

##### 数据集

<table>
<colgroup><col style="width:12em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>根节点 ID</strong></td><td>数据点发现的起始节点，如 <code>ns=1;i=1001</code></td></tr>
<tr><td><strong>命名空间</strong></td><td>要包含的 OPC-UA 命名空间（连接检查后填充）</td></tr>
<tr><td><strong>节点类</strong></td><td>要采集的 OPC-UA 节点类型（默认：全部）</td></tr>
<tr><td><strong>节点 ID 正则表达式</strong></td><td>按节点 ID 模式过滤数据点</td></tr>
<tr><td><strong>节点名称正则表达式</strong></td><td>按名称模式过滤数据点</td></tr>
<tr><td><strong>超级表名称</strong>（必填）</td><td>目标超级表名称模板（默认：<code>opc_{type}</code>）</td></tr>
<tr><td><strong>值列名称</strong></td><td>值的列名（默认：<code>val</code>）</td></tr>
<tr><td><strong>时间戳</strong></td><td>时间戳来源（默认：<code>original_ts</code>）</td></tr>
</tbody>
</table>

##### 采集

<table>
<colgroup><col style="width:9em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>采集模式</strong></td><td><code>subscribe</code>（推送）或 <code>poll</code>（拉取）</td></tr>
<tr><td><strong>节点更新模式</strong></td><td>节点元数据更新的处理方式</td></tr>
<tr><td><strong>节点更新间隔</strong></td><td>检查节点变更的间隔（秒，默认：600）</td></tr>
</tbody>
</table>

#### 示例：SparkplugB（MQTT）

SparkplugB 是一种基于 MQTT 的协议，广泛用于工业物联网部署。

##### 连接配置

<table>
<colgroup><col style="width:12em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>Broker 地址</strong>（必填）</td><td>MQTT Broker 地址，如 <code>mqtt://host:1883</code></td></tr>
<tr><td><strong>MQTT 协议版本</strong></td><td>使用的 MQTT 版本</td></tr>
<tr><td><strong>客户端 ID</strong></td><td>MQTT 客户端标识符</td></tr>
<tr><td><strong>心跳间隔</strong></td><td>心跳间隔（秒）</td></tr>
<tr><td><strong>用户名</strong></td><td>MQTT 用户名</td></tr>
<tr><td><strong>密码</strong></td><td>MQTT 密码</td></tr>
<tr><td><strong>TLS 验证</strong></td><td>为 MQTT 连接启用 TLS</td></tr>
<tr><td><strong>组 ID</strong></td><td>要订阅的 Sparkplug 组 ID</td></tr>
<tr><td><strong>节点设备列表</strong></td><td>要采集的 Sparkplug 节点/设备 ID 列表</td></tr>
<tr><td><strong>消息类型</strong></td><td>要处理的 Sparkplug 消息类型</td></tr>
</tbody>
</table>

所有任务类型都有**高级选项**部分，可进行进一步调优。

点击**提交**创建任务。

:::note
数据接入功能由 TDengine TSDB 的数据接入引擎驱动。有关所有任务类型及其配置字段的完整文档，请参阅 [TDengine TSDB 文档](https://docs.tdengine.com)。
:::

### 12.2.1.2 支持的任务类型

IDMP 支持从以下数据源类型接入数据：

<table>
<colgroup><col style="width:14em"/><col/></colgroup>
<thead><tr><th>类型</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>TDengine 数据订阅</strong></td><td>订阅 TDengine TMQ 主题，实现实时数据接入</td></tr>
<tr><td><strong>TDengine 查询</strong></td><td>通过 SQL 查询按计划从 TDengine 拉取数据</td></tr>
<tr><td><strong>PI</strong></td><td>OSIsoft PI 系统</td></tr>
<tr><td><strong>PI 回填</strong></td><td>从 OSIsoft PI 历史回填数据</td></tr>
<tr><td><strong>OPC-UA</strong></td><td>OPC 统一架构</td></tr>
<tr><td><strong>OPC-DA</strong></td><td>OPC 数据访问</td></tr>
<tr><td><strong>InfluxDB</strong></td><td>InfluxDB 时序数据库</td></tr>
<tr><td><strong>OpenTSDB</strong></td><td>OpenTSDB 时序数据库</td></tr>
<tr><td><strong>PostgreSQL</strong></td><td>PostgreSQL 关系型数据库</td></tr>
<tr><td><strong>Oracle</strong></td><td>Oracle 数据库</td></tr>
<tr><td><strong>Microsoft SQL Server</strong></td><td>Microsoft SQL Server</td></tr>
<tr><td><strong>MongoDB</strong></td><td>MongoDB 文档数据库</td></tr>
<tr><td><strong>SparkplugB</strong></td><td>MQTT Sparkplug B 协议</td></tr>
<tr><td><strong>KingHistorian</strong></td><td>KingHistorian 工业历史数据库</td></tr>
<tr><td><strong>Pulsar</strong></td><td>Apache Pulsar 消息队列</td></tr>
<tr><td><strong>Pulsar-Tuya</strong></td><td>集成涂鸦物联网平台的 Pulsar</td></tr>
</tbody>
</table>

## 12.2.2 代理

**代理**选项卡列出为此连接注册的 IDMP 代理进程，包含以下列：**ID**、**名称**、**创建时间**和**状态**。代理负责处理需要中间进程的协议任务。

## 12.2.3 数据采集代理

**数据采集代理**选项卡提供第三方代理的配置指南，这些代理可使用标准协议直接向 TDengine 写入数据：

<table>
<colgroup><col style="width:13em"/><col/></colgroup>
<thead><tr><th>代理</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>Prometheus</strong></td><td>配置 Prometheus 远程写入，将指标推送到 TDengine</td></tr>
<tr><td><strong>Telegraf</strong></td><td>配置 Telegraf 输出插件，将指标写入 TDengine</td></tr>
<tr><td><strong>InfluxDB 行协议</strong></td><td>使用 InfluxDB 行协议线格式写入数据</td></tr>
<tr><td><strong>OpenTSDB JSON 协议</strong></td><td>使用 OpenTSDB HTTP JSON API 写入数据</td></tr>
<tr><td><strong>OpenTSDB Telnet 协议</strong></td><td>使用 OpenTSDB telnet 接口写入数据</td></tr>
</tbody>
</table>

点击任意卡片查看该代理的配置指南。
