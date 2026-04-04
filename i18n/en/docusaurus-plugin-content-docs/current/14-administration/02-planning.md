---
title: Planning
sidebar_label: Planning
---

# 14.2 Planning

## 14.2.1 Hardware Requirements

The minimum hardware requirements to run TDengine IDMP are:

- **CPU:** 4 cores
- **Memory:** 16 GB
- **Disk:** 50 GB free space

Typically, an 8-core server with 16 GB of memory will be sufficient to run TDengine TSDB and TDengine IDMP up to 10,000 elements.

For production deployments, size resources based on the number of elements (assets) managed.

### 14.2.1.1 IDMP Service Resources

<table>
<colgroup><col style="width:13em"/><col/><col/><col/><col/></colgroup>
<thead><tr><th>Element Scale</th><th>CPU</th><th>Memory</th><th>Disk</th><th>Typical Use Case</th></tr></thead>
<tbody>
<tr><td>< 10,000</td><td>4 cores</td><td>16 GB</td><td>50 GB</td><td>PoC / demo / small projects</td></tr>
<tr><td>10,000 – 100,000</td><td>8 cores</td><td>16 GB</td><td>100 GB</td><td>Small to medium production</td></tr>
<tr><td>100,000 – 500,000</td><td>16 cores</td><td>32 GB</td><td>200 GB</td><td>Medium production</td></tr>
<tr><td>500,000 – 1,000,000</td><td>32 cores</td><td>64 GB</td><td>500 GB</td><td>Large production</td></tr>
<tr><td>> 1,000,000</td><td>64+ cores</td><td>128+ GB</td><td>1 TB+</td><td>Very large production</td></tr>
</tbody>
</table>

### 14.2.1.2 External Dependency Resources

When element scale is large, plan dedicated resources for external dependency components:

<table>
<colgroup><col style="width:7em"/><col/><col/><col/></colgroup>
<thead><tr><th>Component</th><th>10K–100K Elements</th><th>100K–500K Elements</th><th>500K+ Elements</th></tr></thead>
<tbody>
<tr><td>Redis</td><td>2 cores / 4 GB</td><td>4 cores / 8 GB</td><td>8 cores / 16 GB (cluster)</td></tr>
<tr><td>MySQL</td><td>4 cores / 8 GB</td><td>8 cores / 16 GB</td><td>16 cores / 32 GB (primary-replica)</td></tr>
<tr><td>DFS</td><td>100 GB</td><td>500 GB</td><td>1 TB+</td></tr>
</tbody>
</table>

### 14.2.1.3 Planning Guidelines

- **Disk type:** Use SSDs in production for significantly better query and import/export performance.
- **Network bandwidth:** For large-scale deployments, use 10 Gbps internal networking to support data collection and query throughput.
- **Growth headroom:** Plan resources at 1.5× the expected peak element count to accommodate business growth.

:::note
These figures are reference guidelines. Actual resource needs depend on modeling complexity and workload characteristics. For TDengine TSDB capacity planning, refer to the [TDengine TSDB documentation](https://docs.tdengine.com/operations-and-maintenance/system-requirements/).
:::

## 14.2.2 Supported Operating Systems

TDengine IDMP supports installation on the following operating systems and processor architectures.

<table>
<colgroup><col style="width:6em"/><col/><col/><col/></colgroup>
<thead><tr><th>OS</th><th>Supported Versions</th><th>x86_64</th><th>arm64</th></tr></thead>
<tbody>
<tr><td>Ubuntu</td><td>20.04, 22.04</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Debian</td><td>10, 11, 12</td><td>Yes</td><td>Yes</td></tr>
<tr><td>CentOS</td><td>8</td><td>Yes</td><td>Yes</td></tr>
<tr><td>macOS</td><td>13, 14, 15</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Windows</td><td>10, 11, Server 2019+</td><td>Yes</td><td>Yes</td></tr>
</tbody>
</table>

## 14.2.3 Software Prerequisites

The following software dependencies must be present on the host before installing TDengine IDMP.

<table>
<colgroup><col style="width:16em"/><col/></colgroup>
<thead><tr><th>Dependency</th><th>Version</th></tr></thead>
<tbody>
<tr><td>Python</td><td>3.12</td></tr>
<tr><td>Java</td><td>21 or later</td></tr>
<tr><td>glibc</td><td>2.25 or later</td></tr>
<tr><td>TDengine TSDB Enterprise</td><td>3.3.7.0 or later</td></tr>
<tr><td>SMTP mail service</td><td>Required for email notifications; deploy internally if the server cannot reach the internet</td></tr>
</tbody>
</table>

## 14.2.4 Network Ports

TDengine IDMP uses the following ports by default:

<table>
<colgroup><col style="width:5em"/><col/><col/></colgroup>
<thead><tr><th>Port</th><th>Protocol</th><th>Description</th></tr></thead>
<tbody>
<tr><td>6042</td><td>HTTP</td><td>External port — IDMP web UI and REST API (browser and API access)</td></tr>
<tr><td>6034</td><td>HTTPS</td><td>External port — Secure access to the web UI and REST API; recommended for production</td></tr>
<tr><td>6038</td><td>HTTP</td><td>Internal port — Built-in H2 database web interface</td></tr>
<tr><td>6039</td><td>TCP</td><td>Internal port — Built-in H2 database listener</td></tr>
<tr><td>6040</td><td>HTTP</td><td>Internal port — Internal chat service API</td></tr>
</tbody>
</table>

Ensure the external ports (6042 and 6034) are open in the firewall. Keep internal ports accessible only within the private network.

## 14.2.5 Installation Directory

TDengine IDMP installs by default under `/usr/local/taos/idmp`. The directory structure is:

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>Directory</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>app</code></td><td>Symlink to <code>standalone/app</code></td></tr>
<tr><td><code>backend</code></td><td>Backend service binaries</td></tr>
<tr><td><code>bin</code></td><td>Start/stop scripts</td></tr>
<tr><td><code>chat</code></td><td>Chat service files</td></tr>
<tr><td><code>config</code></td><td>Service configuration files (including <code>application.yml</code>)</td></tr>
<tr><td><code>data</code></td><td>Data files (symlink to <code>/var/lib/taos</code>)</td></tr>
<tr><td><code>frontend</code></td><td>Frontend assets</td></tr>
<tr><td><code>lib</code></td><td>Backend library dependencies</td></tr>
<tr><td><code>logs</code></td><td>Log files (symlink to <code>/var/log/taos</code>)</td></tr>
<tr><td><code>quarkus</code></td><td>Backend service framework files</td></tr>
<tr><td><code>service</code></td><td>System service configuration</td></tr>
<tr><td><code>standalone</code></td><td>Integrated frontend/backend service files</td></tr>
</tbody>
</table>
