---
title: Planning
sidebar_label: Planning
---

# 14.2 Planning

## 14.2.1 Hardware Requirements

The minimum hardware requirements to run TDengine IDMP are:

- **CPU:** 4 cores
- **Memory:** 10 GB
- **Disk:** 50 GB free space

For production deployments, size resources based on the number of elements (assets) managed.

### 14.2.1.1 IDMP Service Resources

| Element Scale | CPU | Memory | Disk | Typical Use Case |
|:---:|:---:|:---:|:---:|:---|
| < 5,000 | 4 cores | 10 GB | 50 GB | PoC / demo / small projects |
| 5,000 – 50,000 | 8 cores | 16 GB | 100 GB | Small to medium production |
| 50,000 – 100,000 | 16 cores | 32 GB | 200 GB | Medium production |
| 100,000 – 500,000 | 32 cores | 64 GB | 500 GB | Large production |
| > 500,000 | 64+ cores | 128+ GB | 1 TB+ | Very large production |

### 14.2.1.2 External Dependency Resources

When element scale is large, plan dedicated resources for external dependency components:

| Component | 10K–100K Elements | 100K–500K Elements | 500K+ Elements |
|:---|:---:|:---:|:---:|
| Redis | 2 cores / 4 GB | 4 cores / 8 GB | 8 cores / 16 GB (cluster) |
| MySQL | 4 cores / 8 GB | 8 cores / 16 GB | 16 cores / 32 GB (primary-replica) |
| DFS | 100 GB | 500 GB | 1 TB+ |

### 14.2.1.3 Planning Guidelines

- **Disk type:** Use SSDs in production for significantly better query and import/export performance.
- **Network bandwidth:** For large-scale deployments, use 10 Gbps internal networking to support data collection and query throughput.
- **Growth headroom:** Plan resources at 1.5× the expected peak element count to accommodate business growth.

:::note
These figures are reference guidelines. Actual resource needs depend on modeling complexity and workload characteristics. For TDengine TSDB capacity planning, refer to the [TDengine TSDB documentation](https://docs.tdengine.com/operations-and-maintenance/system-requirements/).
:::

### 14.2.1.4 Recommended Hardware Configurations

When TDengine TSDB, IDMP, and a privately deployed large model are delivered and deployed together as an integrated appliance, use one of the following four tiers for overall hardware sizing. Each tier satisfies the IDMP service resource and external dependency resource requirements described above, and additionally covers the TSDB and privately deployed large model requirements.

| Tier | Supported Scale | Server Configuration | Machines | Power |
| :--- | :--- | :--- | :---: | :---: |
| **Entry** | 10K time series / 5,000 elements | 1 × PC Server (TSDB and IDMP co-located, 32 cores / 128 GB, 2×4T HDD)<br />1 × GPU Server (4×RTX 5090 32G, 128 GB VRAM) | 2 | 5 kW |
| **Standard** | 50K time series / 30K elements | 3 × TSDB Server (32 cores / 128 GB, 8×4T HDD, three replicas)<br />1 × IDMP Server (16 cores / 64 GB)<br />1 × GPU Server (8×RTX 5090 32G, 256 GB VRAM) | 5 | 10 kW |
| **Advanced** | 500K time series / 250K elements | 3 × TSDB Server (2×32 cores / 256 GB, 8×4T SSD + 8×24T HDD, three replicas)<br />1 × IDMP Server (32 cores / 128 GB)<br />1 × GPU Server (4×H200 SXM 141G, 564 GB VRAM) | 5 | 15 kW |
| **Flagship** | 1M time series / 500K elements | 3 × TSDB Server (2×64 cores / 512 GB, 8×8T SSD + 16×32T HDD, three replicas)<br />3 × IDMP Server (2 instances + 1 API gateway, 32 cores / 256 GB)<br />2 × GPU Server (8×H200 SXM 141G each, 2256 GB VRAM in total) | 8 | 30 kW |

Deployment topology per tier: Entry uses [Single Instance](./01-deployment-architecture.md#1412-single-instance); Standard and Advanced use a single IDMP instance with a three-replica TSDB cluster; Flagship uses [HA Minimal](./01-deployment-architecture.md#1413-ha-minimal) (API gateway plus two IDMP instances).

Recommended privately deployed large models per tier: Entry and Standard use Qwen3.8-27B; Advanced and Flagship use DeepSeek-V4-Flash.

## 14.2.2 Supported Operating Systems

| OS | Supported Versions | x86_64 | arm64 |
|:---:|:---:|:---:|:---:|
| Ubuntu | 20.04, 22.04 | Yes | Yes |
| Debian | 10, 11, 12 | Yes | Yes |
| CentOS | 8 | Yes | Yes |
| macOS | 13, 14, 15 | Yes | Yes |
| Windows | 10, 11, Server 2019+ | Yes | Yes |

## 14.2.3 Software Prerequisites

| Dependency | Version |
|---|---|
| Python | 3.12 |
| Java | 21 or later |
| glibc | 2.25 or later |
| TDengine TSDB Enterprise | 3.3.7.0 or later |
| SMTP mail service | Required for email notifications; deploy internally if the server cannot reach the internet |

## 14.2.4 Network Ports

TDengine IDMP uses the following ports by default:

| Port | Protocol | Description |
|---|---|---|
| 6042 | HTTP | External port — IDMP web UI and REST API (browser and API access) |
| 6034 | HTTPS | External port — Secure access to the web UI and REST API; recommended for production |
| 6037 | MCP | External port — AI Agent access port |
| 6059 | HTTP | External port — CLS Web UI port |
| 6038 | HTTP | Internal port — Built-in H2 database web interface |
| 6039 | TCP | Internal port — Built-in H2 database listener |
| 6040 | HTTP | Internal port — Internal chat service API |

Ensure the external ports (6042 and 6034) are open in the firewall. Keep internal ports accessible only within the private network.

## 14.2.5 Installation Directory

TDengine IDMP installs by default under `/usr/local/taos/idmp`. The directory structure is:

| Directory | Description |
|---|---|
| `app` | Symlink to `standalone/app` |
| `backend` | Backend service binaries |
| `bin` | Start/stop scripts |
| `chat` | Chat service files |
| `config` | Service configuration files (including `application.yml`) |
| `data` | Data files (symlink to `/var/lib/taos`) |
| `frontend` | Frontend assets |
| `lib` | Backend library dependencies |
| `logs` | Log files (symlink to `/var/log/taos`) |
| `quarkus` | Backend service framework files |
| `service` | System service configuration |
| `standalone` | Integrated frontend/backend service files |
