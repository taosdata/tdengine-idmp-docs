# 部署规划

## 最低硬件要求

为了保证系统正常运行，安装 TDengine IDMP 至少需要满足以下硬件要求：

- CPU：2 核心
- 内存：4 GB
- 硬盘：10 GB 可用空间

## 操作系统和架构

目前，TDengine IDMP 支持以下操作系统和架构，如您期望在其它操作系统或架构上使用，可以[联系我们](https://www.taosdata.com/contactus)获取支持。

| 操作系统 | 支持版本 | x86_64 | arm64 |
|:---:|:---:|:---:|:---:|
| Ubuntu   | Ubuntu 20.04<br/>Ubuntu 22.04 | 支持 | 支持 |
| Debian   | Debian 10<br/>Debian 11<br/>Debian 12 | 支持 | 支持 |
| CentOS   | CentOS 8 | 支持 | 支持 |
| macOS 13 | macOS 13<br/>macOS 14<br/>macOS 15 | 支持 | 支持 |
| Windows  | n/a | 暂不支持 | 暂不支持 |

## 基础依赖

TDengine IDMP 的运行需要以下基础依赖：
1. Python: 3.12 版本
1. Java: 21 及以上版本
1. glibc: 2.25 及以上版本
1. TDengine TSDB-Enterprise: 3.3.7.0 及以上版本
1. 可用的 SMTP 邮件服务（当无法访问 Internet 时，需要在内网部署）

## 端口占用

TDengine IDMP 默认使用以下端口，请确保这些端口未被其他应用程序占用。

| 端口 | 协议 | 描述 |
|---|---|---|
| 6042 | HTTP | 外部端口，TDengine IDMP Web 页面 和 REST API 端口，用于浏览器访问页面和 API 接口，请确保防火墙开放对该端口的访问。|
| 6038 | HTTP | 内部端口，TDengine IDMP 内部 H2 数据库服务 Web 页面端口，用于访问内部 H2 数据库。 |
| 6040 | HTTP | 内部端口，TDengine IDMP 内部 chat 服务 API 端口，用于访问内部 chat 服务。 |
| 6039 | TCP  | 内部端口，TDengine IDMP 内部 H2 数据库服务监听端口，用于访问内部 H2 数据库。 |

## 安装目录

TDengine IDMP 默认会安装在 `/usr/local/taos/idmp` 目录下。安装目录下各子目录的描述如下所示：

| 目录 | 描述 |
|---|---|
| app        | 软链接，目标为 standalone/app 目录 |
| backend    | 存放后端服务文件 |
| bin        | 存放启动/停止服务脚本 |
| chat       | 存放 chat 服务文件 |
| config      | 存放 TDengine IDMP 服务配置文件 |
| data       | 存放数据文件，软链接，目标为 /var/lib/taos |
| frontend   | 存放前端服务文件 |
| lib        | 存放后端服务依赖库文件 |
| logs       | 存放日志文件，软链接，目标为 /var/log/taos |
| quarkus    | 存放后端服务框架文件 |
| service    | 系统服务配置文件 |
| standalone | 存放前后端集成服务文件 |
