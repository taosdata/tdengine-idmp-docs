---
title: Planning Your Deployment
---

## Minimum Hardware Requirements

To ensure stable operation, installing TDengine IDMP requires at least the following hardware specifications:

- CPU: 2 cores
- Memory: 4 GB
- Disk: 10 GB of available space

## Resource Planning by Data Point Scale

Based on different data point scales, it is recommended to plan TDengine IDMP server resources according to the following configurations:

### IDMP Service Resource Configuration

| Data Point Scale | CPU | Memory | Disk | IDMP Instances | Applicable Scenarios |
|:---:|:---:|:---:|:---:|:---:|:---|
| Under 10,000 | 4 Cores | 8 GB | 50 GB | 1 | PoC/Demo/Small Projects |
| 10,000 - 100,000 | 8 Cores | 16 GB | 100 GB | 1 - 2 | Small to Medium Production |
| 100,000 - 500,000 | 16 Cores | 32 GB | 200 GB | 2 - 4 | Medium Production |
| 500,000 - 1,000,000 | 32 Cores | 64 GB | 500 GB | 4 - 8 | Large Production |
| Over 1,000,000 | 64 Cores+ | 128 GB+ | 1 TB+ | 8+ | Ultra-large Production |

### External Dependency Resource Configuration

When the data point scale is large, it is recommended to plan resources separately for external dependency components:

| Component | 10,000 - 100,000 Points | 100,000 - 500,000 Points | Over 500,000 Points |
|:---|:---:|:---:|:---:|
| Redis | 2 Cores / 4 GB | 4 Cores / 8 GB | 8 Cores / 16 GB (Cluster) |
| MySQL | 4 Cores / 8 GB | 8 Cores / 16 GB | 16 Cores / 32 GB (Master-Slave) |
| DFS | 100 GB | 500 GB | 1 TB+ |

### Planning Suggestions

1. **Disk Type**: SSD is recommended for production environments to significantly improve query, import, and export performance.
2. **Network Bandwidth**: 10Gbps internal network is recommended for large-scale scenarios to ensure data collection and query throughput.
3. **Multi-instance Deployment**: When the scale exceeds 100,000 points, it is recommended to deploy multiple IDMP instances and use a gateway for load balancing.
4. **High Availability for External Dependencies**: It is recommended to configure Redis/MySQL in master-slave or cluster mode in production environments to ensure high availability.
5. **Reserve Expansion Space**: It is recommended to plan resources at 1.5 times the expected peak data points to allow for business growth.

> **Note**: The above configurations are reference suggestions. Actual resource requirements are also affected by factors such as collection frequency, query concurrency, and data retention periods. Please adjust according to actual business scenarios. For TDengine TSDB's resource planning, please refer to [TDengine System Requirements](https://docs.tdengine.com/operations-and-maintenance/system-requirements/)。

## Supported Operating Systems

TDengine IDMP currently supports the following operating systems and architectures.

| Operating System | Version | x86-64 | arm64 |
|:---:|:---:|:---:|:---:|
| Ubuntu   | Ubuntu 20.04<br/>Ubuntu 22.04 | Yes | Yes |
| Debian   | Debian 10<br/>Debian 11<br/>Debian 12 | Yes | Yes |
| CentOS   | CentOS 8 | Yes | Yes |
| macOS 13 | macOS 13<br/>macOS 14<br/>macOS 15 | Yes | Yes |
| Windows  | n/a | No | No |

## Dependencies

The following dependencies are required to run TDengine IDMP:

1. Python 3.12
1. Java 21 or later
1. glibc 2.25 or later
1. TDengine TSDB-Enterprise 3.3.7.0 or later
1. SMTP email service (required when Internet access is not available)

## Network Ports

TDengine IDMP uses the following default ports. Please ensure these ports are not occupied by other applications.

| Port | Protocol | Description |
|---|---|---|
| 6042 | HTTP | External Port: This port is used by the TDengine IDMP web interface and REST API for browser access and API communication. Please ensure that your firewall allows access to this port. |
| 6038 | HTTP | Internal Port: This port is used by the TDengine IDMP internal H2 database service for accessing the H2 database web console. |
| 6039 | TCP  | Internal Port: Listening port for TDengine IDMP's internal H2 database service, used to access the internal H2 database. |
| 6040 | HTTP | Internal Port: This port is used by the internal chat service API of TDengine IDMP for accessing the chat functionality. |

## Installation Directory

By default,TDengine IDMP is installed to the `/usr/local/taos/idmp` directory. This directory contains the following subdirectories.

| Subdirectory | Description |
|---|---|
| app        | softlink to standalone/app |
| backend    | backend service files |
| bin        | scripts to start and stop the service |
| chat       | chat service files |
| config      | TDengine IDMP configuration files |
| data       | data files (softlink to /var/lib/taos) |
| frontend   | frontend service files |
| lib        | backend service dependencies |
| logs       | log files (softlink to /var/log/taos) |
| quarkus    | backend service framework |
| service    | system service configuration files |
| standalone | frontend integrated service files |
