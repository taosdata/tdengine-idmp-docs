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

| Field | Description |
|---|---|
| **Name** (required) | A descriptive name for the task |
| **Type** | The data source protocol (see task types below) |
| **Target** (required) | The destination TDengine database. Click **+ Create Database** to create a new one. |

### 12.2.1.3 Connection Configuration

Configuration fields vary by task type. Two common examples are shown below.

### 12.2.1.4 Example: OPC-UA

OPC-UA (OPC Unified Architecture) is a widely used industrial protocol for connecting PLCs, sensors, and SCADA systems.

#### Connection Configuration

| Field | Description |
|---|---|
| **Server Endpoint** (required) | OPC-UA server address, e.g., `127.0.0.1:6666/OPCUA/ServerPath` |
| **Failover Server Endpoints** | Backup server endpoints for high availability |
| **Security Mode** | OPC-UA security mode (None, Sign, SignAndEncrypt) |
| **Security Policy** | Encryption policy to use |
| **Secure Channel Certificate** | Certificate file for secure channel |
| **Certificate's Private Key** | Private key file for the certificate |
| **Connect Timeout** | Connection timeout in seconds (default: 10) |
| **Request Timeout** | Request timeout in seconds (default: 10) |

#### Authentication

Choose **Anonymous**, **Username** (username and password), or **Certificates** (client certificate files).

Click **Check Connection** to verify before proceeding.

#### Data Sets

| Field | Description |
|---|---|
| **Root node ID** | Starting node for data point discovery, e.g., `ns=1;i=1001` |
| **Namespaces** | OPC-UA namespaces to include (populated after connection check) |
| **Node Class** | Type of OPC-UA nodes to collect (default: all) |
| **Point ID Regex Pattern** | Filter data points by node ID pattern |
| **Point Name Regex Pattern** | Filter data points by name pattern |
| **Super Table Name** (required) | Target supertable name template (default: `opc_{type}`) |
| **Value Column Name** | Column name for the value (default: `val`) |
| **Timestamp** | Timestamp source (default: `original_ts`) |

#### Collect

| Field | Description |
|---|---|
| **Collect Mode** | `subscribe` (push) or `poll` (pull) |
| **Point Update Mode** | How point metadata updates are handled |
| **Point Update Interval** | Interval in seconds to check for point changes (default: 600) |

### 12.2.1.5 Example: SparkplugB (MQTT)

SparkplugB is an MQTT-based protocol widely used in IIoT deployments.

#### Connection Configuration

| Field | Description |
|---|---|
| **Brokers** (required) | MQTT broker address(es), e.g., `mqtt://host:1883` |
| **MQTT Protocol Version** | MQTT version to use |
| **Client ID** | MQTT client identifier |
| **Keep Alive** | Keep-alive interval in seconds |
| **Username** | MQTT username |
| **Password** | MQTT password |
| **TLS Verification** | Enable TLS for the MQTT connection |
| **Group ID** | Sparkplug group ID to subscribe to |
| **Node Device List** | List of Sparkplug node/device IDs to collect |
| **Message Type** | Sparkplug message types to process |

An **Advanced Options** section is available for all task types for further tuning.

Click **Submit** to create the task.

:::note
The Data In feature is powered by TDengine TSDB's data ingestion engine. For complete documentation of all task types and their configuration fields, refer to the [TDengine TSDB documentation](https://docs.tdengine.com).
:::

### 12.2.1.6 Supported Task Types

IDMP supports ingesting data from the following source types:

| Type | Description |
|---|---|
| **TDengine Data Subscription** | Subscribe to TDengine TMQ topics for real-time data ingestion |
| **TDengine Query** | Pull data from TDengine via SQL queries on a schedule |
| **PI** | OSIsoft PI System |
| **PI Backfill** | Historical backfill from OSIsoft PI |
| **OPC-UA** | OPC Unified Architecture |
| **OPC-DA** | OPC Data Access |
| **InfluxDB** | InfluxDB time-series database |
| **OpenTSDB** | OpenTSDB time-series database |
| **PostgreSQL** | PostgreSQL relational database |
| **Oracle** | Oracle database |
| **Microsoft SQL Server** | Microsoft SQL Server |
| **MongoDB** | MongoDB document database |
| **SparkplugB** | MQTT Sparkplug B protocol |
| **KingHistorian** | KingHistorian industrial historian |
| **Pulsar** | Apache Pulsar messaging |
| **Pulsar-Tuya** | Pulsar with Tuya IoT platform integration |

## 12.2.2 Agents

The **Agent** tab lists the IDMP agent processes registered for this connection, with columns: **ID**, **Name**, **Created At**, and **Status**. Agents handle task execution for protocols that require an intermediary process.

## 12.2.3 Data Collection Agents

The **Data Collection Agents** tab provides configuration guides for third-party agents that can write data directly into TDengine using standard protocols:

| Agent | Description |
|---|---|
| **Prometheus** | Configure Prometheus remote write to push metrics into TDengine |
| **Telegraf** | Configure Telegraf output plugin to write metrics to TDengine |
| **InfluxDB Line Protocol** | Write data using the InfluxDB line protocol wire format |
| **OpenTSDB JSON Protocol** | Write data using the OpenTSDB HTTP JSON API |
| **OpenTSDB Telnet Protocol** | Write data using the OpenTSDB telnet interface |

Click any card to view the configuration guide for that agent.
