# 安装包简介

## 操作系统和架构

目前，TDengine IDMP 支持以下操作系统和架构，如您期望在其它操作系统或架构上使用，可以[联系我们](https://www.taosdata.com/contactus)获取支持。

|操作系统 | 支持版本|x86_64|arm64|
|---|---|:---:|:---:|
| Ubuntu   | Ubuntu 20.04<br/>Ubuntu 22.04 | 是 | 是 |
| Debian   | Debian 10<br/>Debian 11<br/>Debian 12 | 是 | 是 |
| CentOS   | CentOS 8 | 是 | 是 |
| macOS 13 | macOS 13<br/>macOS 14<br/>macOS 15 | 是 | 是 |
| Windows  | Windows Server 2019<br/>Windows Server 2022<br/>Windows 11 | 是 | 否 |

## 端口占用

TDengine IDMP 默认使用以下端口，请确保这些端口未被其他应用程序占用。

| 端口 | 协议 | 描述 |
|------|------|---------|
| 6042 | HTTP | 外部端口，TDengine IDMP Web 页面 和 REST API 端口，用于浏览器访问页面和 API 接口，请确保防火墙开放对该端口的访问。|
| 8082 | HTTP | 内部端口，TDengine IDMP 内部 H2 数据库服务 Web 页面端口，用于访问内部 H2 数据库。 |
| 8777 | HTTP | 内部端口，TDengine IDMP 内部 chat 服务 API 端口，用于访问内部 chat 服务。 |
| 9092 | TCP  | 内部端口，TDengine IDMP 内部 H2 数据库服务监听端口，用于访问内部 H2 数据库。 |

## 安装目录

TDengine IDMP 安装完成后，默认会在 `/usr/local/taos/idmp` 目录下，创建以下目录用来存放可执行文件文件、配置文件，数据文件以及日志文件等。安装目录下各子目录的描述如下所示：

| 目录        | 描述	|
|------------|---|
| app        | 软链接到 standalone/app 目录 |
| backend    | 存放后端服务文件 |
| bin        | 存放启动/停止服务脚本 |
| chat       | 存放 chat 服务文件 |
| config      | 存放 TDengine IDMP 服务配置文件 |
| data       | 存放数据文件 |
| frontend   | 存放前端服务文件 |
| lib        | 存放后端服务依赖库文件 |
| logs       | 存放日志文件 |
| quarkus    | 存放后端服务框架文件 |
| service    | 系统服务配置文件 |
| standalone | 存放前后端集成服务文件 |
