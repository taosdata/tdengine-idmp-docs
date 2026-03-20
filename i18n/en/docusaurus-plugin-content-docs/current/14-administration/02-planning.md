---
title: Planning
sidebar_label: Planning
---

# 14.2 Planning

## Hardware Requirements

The minimum hardware requirements to run TDengine IDMP are:

- **CPU:** 4 cores
- **Memory:** 10 GB
- **Disk:** 50 GB free space

For production deployments, size resources based on the number of elements (assets) managed:

### IDMP Service Resources

| Element Scale | CPU | Memory | Disk | Typical Use Case |
|:---:|:---:|:---:|:---:|:---|
| < 10,000 | 4 cores | 10 GB | 50 GB | PoC / demo / small projects |
| 10,000 – 100,000 | 8 cores | 16 GB | 100 GB | Small to medium production |
| 100,000 – 500,000 | 16 cores | 32 GB | 200 GB | Medium production |
| 500,000 – 1,000,000 | 32 cores | 64 GB | 500 GB | Large production |
| > 1,000,000 | 64+ cores | 128+ GB | 1 TB+ | Very large production |

### External Dependency Resources

When element scale is large, plan dedicated resources for external dependency components:

| Component | 10K–100K Elements | 100K–500K Elements | 500K+ Elements |
|:---|:---:|:---:|:---:|
| Redis | 2 cores / 4 GB | 4 cores / 8 GB | 8 cores / 16 GB (cluster) |
| MySQL | 4 cores / 8 GB | 8 cores / 16 GB | 16 cores / 32 GB (primary-replica) |
| DFS | 100 GB | 500 GB | 1 TB+ |

### Planning Guidelines

- **Disk type:** Use SSDs in production for significantly better query and import/export performance.
- **Network bandwidth:** For large-scale deployments, use 10 Gbps internal networking to support data collection and query throughput.
- **Growth headroom:** Plan resources at 1.5× the expected peak element count to accommodate business growth.

:::note
These figures are reference guidelines. Actual resource needs depend on modeling complexity and workload characteristics. For TDengine TSDB capacity planning, refer to the [TDengine TSDB documentation](https://docs.tdengine.com/operations-and-maintenance/system-requirements/).
:::

## Supported Operating Systems

| OS | Supported Versions | x86_64 | arm64 |
|:---:|:---:|:---:|:---:|
| Ubuntu | 20.04, 22.04 | Yes | Yes |
| Debian | 10, 11, 12 | Yes | Yes |
| CentOS | 8 | Yes | Yes |
| macOS | 13, 14, 15 | Yes | Yes |
| Windows | 10, 11, Server 2019+ | Yes | Yes |

## Software Prerequisites

| Dependency | Version |
|---|---|
| Python | 3.12 |
| Java | 21 or later |
| glibc | 2.25 or later |
| TDengine TSDB Enterprise | 3.3.7.0 or later |
| SMTP mail service | Required for email notifications; deploy internally if the server cannot reach the internet |

## Network Ports

TDengine IDMP uses the following ports by default:

| Port | Protocol | Description |
|---|---|---|
| 6042 | HTTP | External port — IDMP web UI and REST API (browser and API access) |
| 6034 | HTTPS | External port — Secure access to the web UI and REST API; recommended for production |
| 6038 | HTTP | Internal port — Built-in H2 database web interface |
| 6039 | TCP | Internal port — Built-in H2 database listener |
| 6040 | HTTP | Internal port — Internal chat service API |

Ensure the external ports (6042 and 6034) are open in the firewall. Keep internal ports accessible only within the private network.

## Installation Directory

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
