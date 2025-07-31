# 使用 Docker 部署

本指南介绍如何使用 Docker/Docker Compose 的方式，实现 TDengine IDMP 和 TDengine TSDB 服务的搭建。

## 前置条件

1. 本文适用 Docker 20.10 以上版本
1. 本文适用 Docker Compose v1.29.2 以上版本

## 部署 TDengine TSDB 和 TDengine IDMP 服务

### 1. 克隆部署仓库

```bash
git clone https://github.com/taosdata/tdengine-idmp-deployment.git
```

该仓库包含了 TDengine IDMP 与 TSDB 的 Docker Compose 配置文件。

### 2. 启动服务

```bash
cd tdengine-idmp-deployment/docker
docker compose up -d
```

执行上述命令会自动拉取所需镜像并以后台方式启动所有服务容器。

### 3. 访问服务

默认情况下，TDengine IDMP 服务监听主机的 6042 端口。可通过以下地址访问管理界面：

- [http://localhost:6042](http://localhost:6042)
- [http://ip:6042](http://ip:6042)

:::tip
如需修改端口，请编辑 `docker-compose.yml` 文件中的 `ports` 配置项。
:::

### 4. 停止服务

执行以下命令，会停止并移除所有通过 Compose 启动的容器，但不会删除数据卷。

```bash
docker compose down
```

如需清理数据，请添加 `-v` 参数：

```bash
docker compose down -v
```

## 部署 TDengine IDMP 服务

:::warning
TDengine IDMP 依赖 TDengine TSDB-Enterprise 3.3.7.0+
:::

如果您的环境中已存在满足要求的 TDengine TSDB 实例，您可以只启动 TDengine IDMP 容器，并将其连接至该 TDengine TSDB 实例。

### 1. 拉取 TDengine  IDMP 镜像

```bash
docker pull tdengine/idmp-ee
```

### 2. 编辑 TDengine IDMP 配置文件

TDengine IDMP 的配置文件 `application.yml` 的示例如下：

```yaml
quarkus:
  http:
    port: 6042 # IDMP server port
  log:
    level: INFO # set the log level for IDMP
    file:
      rotation:
        max-file-size: 300M  # max file size for log rotation
        max-backup-index: "15" # max backup index for log rotation
tda:
  data-dir: /var/lib/taos/idmp  # data directory
  index-dir: /var/lib/taos/idmp/index # index directory
  log-dir: /var/log/taos # all IDMP logs including IDMP server and AI server will be stored in this directory
  ai-server:
    url: http://localhost:8777 # AI server URL
  server-url: http://localhost:6042 # public IDMP URL
  default-connection:
    enable: true
    auth-type: UserPassword # can be set to UserPassword or Token
    url: http://192.168.1.100:6041
    username: root
    password: taosdata
  default-tdengine-db-name: idmp # default database used for IDMP in each TDengine connection
  default-tdengine-db-create-sql: create database if not exists idmp
  default-tdengine-subscription-group: idmp # default subscription group name used for IDMP for each TDengine connection
  datasource:
    connection-batch-process-size: 10000 # batch size for processing TDengine SQLs.
    connection-timeout: 15 # timeout for TDengine connection in seconds
    pool:
      max-size: 32  # the max of client connections to tdengine connection
      min-size: 1 # the min of client connections to tdengine connection
      initial-size: 5 # the initiated size of client connections to tdengine connection
  jwt:
    ttl: 604800 # user token expired in 604800 seconds or 7 days
  permission-cache:
    expire-time: 3600 # permission cache expired for 3600 seconds
  analysis:
    event:
      urls: ws://192.168.1.100:6042 # The websocket URI for tdengine to access IDMP server.
      event-types: # The event types for IDMP to use
        - WINDOW_OPEN
        - WINDOW_CLOSE
```

在 `tda.default-connection` 下，配置 TDengine TSDB 的连接信息，其中：
- auth-type: 认证方式，支持 UserPassword 和 Token 两种方式，默认为方式 UserPassword
- url: 为 TDengine TSDB 中 taosAdapter 组件的 IP 地址和端口号，端口号默认为 6041
- username 和 password: 为 TDengine TSDB 的用户名和密码，默认为 root 和 taosdata

在 `tda.analysis` 下，`envent.urls` 为 TDengine TSDB 访问 IDMP 服务的 WebSocket 地址。

### 2. 启动 TDengine IDMP 容器

```bash
docker run -d \
  -p 6042:6042 \
  -v ./application.yml:/usr/local/taos/idmp/config/application.yml \
  --name tdengine-idmp \
  tdengine/idmp-ee
```

说明：
- `-p` 选项，用于将​​容器的端口映射到主机的端口​​，使得外部可以通过主机的端口访问容器内运行的服务。如需自定义端口，例如：将 TDengine IDMP 服务的端口 6042 映射至主机的 7042 端口，可按照以下方式，修改端口映射参数 `-p 7042:6042`。
- `-v` 选项，用于挂载主机目录或卷到容器中，实现主机和容器之间的文件共享或持久化存储。在以上命令中，将主机当前目录下的 `application.yml` 文件挂载到容器内的 `/usr/local/taos/idmp/config/application.yml` 路径下。

### 3. 访问 TDengine IDMP 服务

默认情况下，服务监听主机的 6042 端口。可在浏览器访问：

- [http://localhost:6042](http://localhost:6042)
- 或在其他设备通过 [http://ip:6042](http://ip:6042) 访问

### 4. 停止并移除容器

```bash
docker stop tdengine-idmp
docker rm tdengine-idmp
```

停止后数据不会保留，如需持久化数据请挂载数据卷。