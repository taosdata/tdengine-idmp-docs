---
title: 规划
sidebar_label: 规划
---

# 14.2 规划

## 14.2.1 硬件要求

运行 TDengine IDMP 的最低硬件要求如下：

- **CPU：** 4 核
- **内存：** 10 GB
- **磁盘：** 50 GB 可用空间

生产部署时，请根据管理的元素（资产）数量来规划资源：

### 14.2.1.1 IDMP 服务资源

<table>
<colgroup><col style="width:13em"/><col/><col/><col/><col/></colgroup>
<thead><tr><th>元素规模</th><th>CPU</th><th>内存</th><th>磁盘</th><th>典型使用场景</th></tr></thead>
<tbody>
<tr><td>< 10,000</td><td>4 核</td><td>10 GB</td><td>50 GB</td><td>PoC / 演示 / 小型项目</td></tr>
<tr><td>10,000 – 100,000</td><td>8 核</td><td>16 GB</td><td>100 GB</td><td>小中型生产</td></tr>
<tr><td>100,000 – 500,000</td><td>16 核</td><td>32 GB</td><td>200 GB</td><td>中型生产</td></tr>
<tr><td>500,000 – 1,000,000</td><td>32 核</td><td>64 GB</td><td>500 GB</td><td>大型生产</td></tr>
<tr><td>> 1,000,000</td><td>64+ 核</td><td>128+ GB</td><td>1 TB+</td><td>超大型生产</td></tr>
</tbody>
</table>

### 14.2.1.2 外部依赖资源

当元素规模较大时，请为外部依赖组件规划专用资源：

<table>
<colgroup><col style="width:10em"/><col/><col/><col/></colgroup>
<thead><tr><th>组件</th><th>1 万–10 万元素</th><th>10 万–50 万元素</th><th>50 万+元素</th></tr></thead>
<tbody>
<tr><td>Redis</td><td>2 核 / 4 GB</td><td>4 核 / 8 GB</td><td>8 核 / 16 GB（集群）</td></tr>
<tr><td>MySQL</td><td>4 核 / 8 GB</td><td>8 核 / 16 GB</td><td>16 核 / 32 GB（主从）</td></tr>
<tr><td>分布式文件系统</td><td>100 GB</td><td>500 GB</td><td>1 TB+</td></tr>
</tbody>
</table>

### 14.2.1.3 规划指南

- **磁盘类型：** 生产环境使用 SSD，以获得显著更好的查询和导入/导出性能。
- **网络带宽：** 大规模部署时，使用 10 Gbps 内网带宽以支持数据采集和查询吞吐。
- **增长余量：** 按预期峰值元素数量的 1.5 倍规划资源，以容纳业务增长。

:::note
以上数据为参考指导，实际资源需求取决于建模复杂度和工作负载特征。TDengine TSDB 的容量规划请参考 [TDengine TSDB 文档](https://docs.taosdata.com/operation/planning/)。
:::

## 14.2.2 支持的操作系统

<table>
<colgroup><col style="width:7em"/><col/><col/><col/></colgroup>
<thead><tr><th>操作系统</th><th>支持版本</th><th>x86_64</th><th>arm64</th></tr></thead>
<tbody>
<tr><td>Ubuntu</td><td>20.04、22.04</td><td>是</td><td>是</td></tr>
<tr><td>Debian</td><td>10、11、12</td><td>是</td><td>是</td></tr>
<tr><td>CentOS</td><td>8</td><td>是</td><td>是</td></tr>
<tr><td>macOS</td><td>13、14、15</td><td>是</td><td>是</td></tr>
<tr><td>Windows</td><td>10、11、Server 2019+</td><td>是</td><td>是</td></tr>
</tbody>
</table>

## 14.2.3 软件前置条件

<table>
<colgroup><col style="width:13em"/><col/></colgroup>
<thead><tr><th>依赖项</th><th>版本</th></tr></thead>
<tbody>
<tr><td>Python</td><td>3.12</td></tr>
<tr><td>Java</td><td>21 或更高版本</td></tr>
<tr><td>glibc</td><td>2.25 或更高版本</td></tr>
<tr><td>TDengine TSDB 企业版</td><td>3.3.7.0 或更高版本</td></tr>
<tr><td>SMTP 邮件服务</td><td>邮件通知所必需；若服务器无法访问互联网，请在内网自行部署</td></tr>
</tbody>
</table>

## 14.2.4 网络端口

TDengine IDMP 默认使用以下端口：

<table>
<colgroup><col style="width:5em"/><col/><col/></colgroup>
<thead><tr><th>端口</th><th>协议</th><th>说明</th></tr></thead>
<tbody>
<tr><td>6042</td><td>HTTP</td><td>外部端口——IDMP Web UI 和 REST API（浏览器和 API 访问）</td></tr>
<tr><td>6034</td><td>HTTPS</td><td>外部端口——安全访问 Web UI 和 REST API；生产环境推荐使用</td></tr>
<tr><td>6038</td><td>HTTP</td><td>内部端口——内嵌 H2 数据库 Web 界面</td></tr>
<tr><td>6039</td><td>TCP</td><td>内部端口——内嵌 H2 数据库监听器</td></tr>
<tr><td>6040</td><td>HTTP</td><td>内部端口——内部聊天服务 API</td></tr>
</tbody>
</table>

请确保防火墙开放外部端口（6042 和 6034），内部端口仅在私有网络内可访问。

## 14.2.5 安装目录

TDengine IDMP 默认安装于 `/usr/local/taos/idmp`，目录结构如下：

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>目录</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>app</code></td><td>指向 <code>standalone/app</code> 的符号链接</td></tr>
<tr><td><code>backend</code></td><td>后端服务二进制文件</td></tr>
<tr><td><code>bin</code></td><td>启动/停止脚本</td></tr>
<tr><td><code>chat</code></td><td>聊天服务文件</td></tr>
<tr><td><code>config</code></td><td>服务配置文件（包含 <code>application.yml</code>）</td></tr>
<tr><td><code>data</code></td><td>数据文件（符号链接至 <code>/var/lib/taos</code>）</td></tr>
<tr><td><code>frontend</code></td><td>前端静态资源</td></tr>
<tr><td><code>lib</code></td><td>后端库依赖</td></tr>
<tr><td><code>logs</code></td><td>日志文件（符号链接至 <code>/var/log/taos</code>）</td></tr>
<tr><td><code>quarkus</code></td><td>后端服务框架文件</td></tr>
<tr><td><code>service</code></td><td>系统服务配置</td></tr>
<tr><td><code>standalone</code></td><td>前后端集成服务文件</td></tr>
</tbody>
</table>
