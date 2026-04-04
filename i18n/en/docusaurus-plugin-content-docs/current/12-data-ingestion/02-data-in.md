---
title: Data In
sidebar_label: Data In
---

# 12.2 Data In

**Data In** manages the ingestion of time-series data from external sources into TDengine TSDB. It is accessed from **Admin Console → Data In**.

The Data In page lists all TDengine connections. Click a connection to manage its ingestion tasks, agents, and data collection agent configurations.

## 12.2.1 Data In Tasks

The **Data In Task** tab lists all configured ingestion tasks for a connection, with columns: **ID**, **Name**, **Type**, **Target**, **Create At**, **Agent**, **Metrics**, and **Status**.

The toolbar provides controls to start, stop, delete, import, and export tasks, as well as a refresh button and settings.

### 12.2.1.1 Creating a Task

Click **+** to create a new task. Configure the following sections:

### 12.2.1.2 General Information

<table>
<colgroup><col style="width:12em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong> (required)</td><td>A descriptive name for the task</td></tr>
<tr><td><strong>Type</strong></td><td>The data source protocol (see task types below)</td></tr>
<tr><td><strong>Target</strong> (required)</td><td>The destination TDengine database. Click <strong>+ Create Database</strong> to create a new one.</td></tr>
</tbody>
</table>

### 12.2.1.3 Connection Configuration

Configuration fields vary by task type. Two common examples are shown below.

### 12.2.1.4 Example: OPC-UA

OPC-UA (OPC Unified Architecture) is a widely used industrial protocol for connecting PLCs, sensors, and SCADA systems.

#### Connection Configuration

<table>
<colgroup><col style="width:17em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Server Endpoint</strong> (required)</td><td>OPC-UA server address, e.g., <code>127.0.0.1:6666/OPCUA/ServerPath</code></td></tr>
<tr><td><strong>Failover Server Endpoints</strong></td><td>Backup server endpoints for high availability</td></tr>
<tr><td><strong>Security Mode</strong></td><td>OPC-UA security mode (None, Sign, SignAndEncrypt)</td></tr>
<tr><td><strong>Security Policy</strong></td><td>Encryption policy to use</td></tr>
<tr><td><strong>Secure Channel Certificate</strong></td><td>Certificate file for secure channel</td></tr>
<tr><td><strong>Certificate's Private Key</strong></td><td>Private key file for the certificate</td></tr>
<tr><td><strong>Connect Timeout</strong></td><td>Connection timeout in seconds (default: 10)</td></tr>
<tr><td><strong>Request Timeout</strong></td><td>Request timeout in seconds (default: 10)</td></tr>
</tbody>
</table>

#### Authentication

Choose **Anonymous**, **Username** (username and password), or **Certificates** (client certificate files).

Click **Check Connection** to verify before proceeding.

#### Data Sets

<table>
<colgroup><col style="width:17em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Root node ID</strong></td><td>Starting node for data point discovery, e.g., <code>ns=1;i=1001</code></td></tr>
<tr><td><strong>Namespaces</strong></td><td>OPC-UA namespaces to include (populated after connection check)</td></tr>
<tr><td><strong>Node Class</strong></td><td>Type of OPC-UA nodes to collect (default: all)</td></tr>
<tr><td><strong>Point ID Regex Pattern</strong></td><td>Filter data points by node ID pattern</td></tr>
<tr><td><strong>Point Name Regex Pattern</strong></td><td>Filter data points by name pattern</td></tr>
<tr><td><strong>Super Table Name</strong> (required)</td><td>Target supertable name template (default: <code>opc_{type}</code>)</td></tr>
<tr><td><strong>Value Column Name</strong></td><td>Column name for the value (default: <code>val</code>)</td></tr>
<tr><td><strong>Timestamp</strong></td><td>Timestamp source (default: <code>original_ts</code>)</td></tr>
</tbody>
</table>

#### Collect

<table>
<colgroup><col style="width:14em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Collect Mode</strong></td><td><code>subscribe</code> (push) or <code>poll</code> (pull)</td></tr>
<tr><td><strong>Point Update Mode</strong></td><td>How point metadata updates are handled</td></tr>
<tr><td><strong>Point Update Interval</strong></td><td>Interval in seconds to check for point changes (default: 600)</td></tr>
</tbody>
</table>

### 12.2.1.5 Example: SparkplugB (MQTT)

SparkplugB is an MQTT-based protocol widely used in IIoT deployments.

#### Connection Configuration

<table>
<colgroup><col style="width:14em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Brokers</strong> (required)</td><td>MQTT broker address(es), e.g., <code>mqtt://host:1883</code></td></tr>
<tr><td><strong>MQTT Protocol Version</strong></td><td>MQTT version to use</td></tr>
<tr><td><strong>Client ID</strong></td><td>MQTT client identifier</td></tr>
<tr><td><strong>Keep Alive</strong></td><td>Keep-alive interval in seconds</td></tr>
<tr><td><strong>Username</strong></td><td>MQTT username</td></tr>
<tr><td><strong>Password</strong></td><td>MQTT password</td></tr>
<tr><td><strong>TLS Verification</strong></td><td>Enable TLS for the MQTT connection</td></tr>
<tr><td><strong>Group ID</strong></td><td>Sparkplug group ID to subscribe to</td></tr>
<tr><td><strong>Node Device List</strong></td><td>List of Sparkplug node/device IDs to collect</td></tr>
<tr><td><strong>Message Type</strong></td><td>Sparkplug message types to process</td></tr>
</tbody>
</table>

An **Advanced Options** section is available for all task types for further tuning.

Click **Submit** to create the task.

:::note
The Data In feature is powered by TDengine TSDB's data ingestion engine. For complete documentation of all task types and their configuration fields, refer to the [TDengine TSDB documentation](https://docs.tdengine.com).
:::

### 12.2.1.6 Supported Task Types

IDMP supports ingesting data from the following source types:

<table>
<colgroup><col style="width:17em"/><col/></colgroup>
<thead><tr><th>Type</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>TDengine Data Subscription</strong></td><td>Subscribe to TDengine TMQ topics for real-time data ingestion</td></tr>
<tr><td><strong>TDengine Query</strong></td><td>Pull data from TDengine via SQL queries on a schedule</td></tr>
<tr><td><strong>PI</strong></td><td>OSIsoft PI System</td></tr>
<tr><td><strong>PI Backfill</strong></td><td>Historical backfill from OSIsoft PI</td></tr>
<tr><td><strong>OPC-UA</strong></td><td>OPC Unified Architecture</td></tr>
<tr><td><strong>OPC-DA</strong></td><td>OPC Data Access</td></tr>
<tr><td><strong>InfluxDB</strong></td><td>InfluxDB time-series database</td></tr>
<tr><td><strong>OpenTSDB</strong></td><td>OpenTSDB time-series database</td></tr>
<tr><td><strong>PostgreSQL</strong></td><td>PostgreSQL relational database</td></tr>
<tr><td><strong>Oracle</strong></td><td>Oracle database</td></tr>
<tr><td><strong>Microsoft SQL Server</strong></td><td>Microsoft SQL Server</td></tr>
<tr><td><strong>MongoDB</strong></td><td>MongoDB document database</td></tr>
<tr><td><strong>SparkplugB</strong></td><td>MQTT Sparkplug B protocol</td></tr>
<tr><td><strong>KingHistorian</strong></td><td>KingHistorian industrial historian</td></tr>
<tr><td><strong>Pulsar</strong></td><td>Apache Pulsar messaging</td></tr>
<tr><td><strong>Pulsar-Tuya</strong></td><td>Pulsar with Tuya IoT platform integration</td></tr>
</tbody>
</table>

## 12.2.2 Agents

The **Agent** tab lists the IDMP agent processes registered for this connection, with columns: **ID**, **Name**, **Created At**, and **Status**. Agents handle task execution for protocols that require an intermediary process.

## 12.2.3 Data Collection Agents

The **Data Collection Agents** tab provides configuration guides for third-party agents that can write data directly into TDengine using standard protocols:

<table>
<colgroup><col style="width:16em"/><col/></colgroup>
<thead><tr><th>Agent</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Prometheus</strong></td><td>Configure Prometheus remote write to push metrics into TDengine</td></tr>
<tr><td><strong>Telegraf</strong></td><td>Configure Telegraf output plugin to write metrics to TDengine</td></tr>
<tr><td><strong>InfluxDB Line Protocol</strong></td><td>Write data using the InfluxDB line protocol wire format</td></tr>
<tr><td><strong>OpenTSDB JSON Protocol</strong></td><td>Write data using the OpenTSDB HTTP JSON API</td></tr>
<tr><td><strong>OpenTSDB Telnet Protocol</strong></td><td>Write data using the OpenTSDB telnet interface</td></tr>
</tbody>
</table>

Click any card to view the configuration guide for that agent.
