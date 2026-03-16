import GatewayBasePathConfig from './common/_gateway-base-path.md'

# 使用 Docker 部署

本指南介绍如何使用 Docker/Docker Compose 的方式，实现 TDengine IDMP 和 TDengine TSDB-Enterprise 服务的搭建。

## 前置条件

1. 本文适用 Docker 20.10 以上版本
1. 本文适用 Docker Compose v1.29.2 以上版本
1. 所需 Docker 内存大于等于 10GB

## 部署 TDengine TSDB-Enterprise 和 TDengine IDMP 服务

### 1. 克隆部署仓库

```bash
git clone https://github.com/taosdata/tdengine-idmp-deployment.git
```

该仓库包含了 TDengine IDMP 与 TSDB 的 Docker Compose 配置文件。

您可以选择使用统一管理脚本进行部署或者手动使用 Docker Compose 部署。

### 2. 使用统一管理脚本部署（推荐）

#### 启动服务

```bash
cd tdengine-idmp-deployment/docker
chmod +x idmp.sh
./idmp.sh start
```

执行以上命令：

1. **自动环境检测**：检测并使用系统中可用的 Docker Compose 命令
2. **交互式部署选择**：提示您选择部署模式
   - **标准部署**：包含 TSDB Enterprise + IDMP，适合基本功能使用
   - **完整部署**：包含 TSDB Enterprise + IDMP + TDgpt，适合需要时序数据预测和异常检测等功能的用户
3. **智能网络配置**：自动检测主机 IP 地址并配置访问 URL，也可自定义访问地址
4. **一键启动**：自动拉取所需镜像（如本地不存在）并以后台模式启动选定的服务

#### 访问服务

默认情况下，TDengine IDMP 服务监听主机的以下端口：

- **HTTP 访问**：[http://localhost:6042](http://localhost:6042) 或 [http://ip:6042](http://ip:6042)
- **HTTPS 访问**：[https://localhost:6034](https://localhost:6034) 或 [https://ip:6034](https://ip:6034)

:::tip

- 如需修改端口，请编辑 `docker-compose.yml` 或者 `docker-compose-tdgpt.yml` 文件中的 `ports` 配置项。
- <GatewayBasePathConfig />

:::

#### 停止服务

```bash
./idmp.sh stop
```

该命令会自动检测当前运行的服务类型，并使用相应的配置文件停止服务。停止过程中，脚本会以交互的方式，询问是否清除数据和日志等文件：

- **保留数据**：默认行为，停止容器时保留数据卷 (volumes)
- **清除数据**：停止容器时删除数据卷，适用于需要完全清理环境的场景

### 3. 手动使用 Docker Compose 部署

#### 配置环境变量

```bash
cd tdengine-idmp-deployment/docker
export IDMP_URL="http://your-host-ip:6042"  # 请替换为实际 IP 地址或配置好的域名
```

#### 选择部署方式

**标准部署（TSDB Enterprise + IDMP）：**

```bash
docker compose up -d
```

**完整部署（TSDB Enterprise + IDMP + TDgpt）：**

```bash
docker compose -f docker-compose-tdgpt.yml up -d
```

#### 访问服务

默认情况下，TDengine IDMP 服务监听主机的以下端口：

- **HTTP 访问**：[http://localhost:6042](http://localhost:6042) 或 [http://ip:6042](http://ip:6042)
- **HTTPS 访问**：[https://localhost:6034](https://localhost:6034) 或 [https://ip:6034](https://ip:6034)

:::tip
如需修改端口，请编辑相应的 `docker-compose.yml` 或者 `docker-compose-tdgpt.yml` 文件中的 `ports` 配置项。
:::

#### 停止服务

**停止标准部署：**

```bash
docker compose down
```

**停止完整部署：**

```bash
docker compose -f docker-compose-tdgpt.yml down
```

如需清理数据，请添加 `-v` 参数，例如：

**清理标准部署数据：**

```bash
docker compose down -v
```

**停止完整部署数据：**

```bash
docker compose -f docker-compose-tdgpt.yml down -v
```

#### 单独升级 IDMP 服务

1. 单独停止 IDMP 服务：

    ```bash
    docker compose down tdengine-idmp
    ```
  
2. 启动 IDMP 服务并拉取最新镜像：

    ```bash
    docker compose up tdengine-idmp --pull always -d
    ```

## 单独部署 TDengine IDMP 服务

:::warning
TDengine IDMP 依赖 TDengine TSDB-Enterprise 3.3.7.0+
:::

如果您的环境中已存在满足要求的 TDengine TSDB-Enterprise 实例，您可以只启动 TDengine IDMP 容器，并将其连接至该 TDengine TSDB-Enterprise 实例。

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
    ssl-port: 6034
    insecure-requests: enabled
    ssl:
      enabled: true
      certificate:
        files: /usr/local/taos/idmp/config/certbundle.pem
        key-files: /usr/local/taos/idmp/config/privkey.pem
  log:
    level: INFO # set the log level for IDMP
    file:
      rotation:
        max-file-size: 300M  # max file size for log rotation
        max-backup-index: "15" # max backup index for log rotation
  profile: prod
tda:
  data-dir: /var/lib/taos/idmp  # data directory
  index-dir: /var/lib/taos/idmp/index # index directory
  log-dir: /var/log/taos # all IDMP logs including IDMP server and AI server will be stored in this directory
  ai-server:
    url: http://localhost:6040 # AI server URL
  server-url: ${IDMP_URL:http://localhost:6042} # public IDMP URL
  default-connection:
    enable: true
    auth-type: UserPassword # can be set to UserPassword or Token
    url: ${TSDB_URL:http://localhost:6041}
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
      urls: ${TDA_ANALYSIS_EVENT_URLS:ws://localhost:6042} # The websocket URI for tdengine to access IDMP server.
      event-types: # The event types for IDMP to use
        - WINDOW_OPEN
        - WINDOW_CLOSE
```

说明：

- `tda.server-url`为 TDengine IDMP 服务的访问地址，可配置为域名或 IP 地址，如果配置为 localhost + port 的方式，则 TDengine IDMP 服务只能在本机访问。
- 在 `tda.default-connection` 下，配置 TDengine TSDB-Enterprise 的连接信息，其中：
  - auth-type: 认证方式，支持 UserPassword 和 Token 两种方式，默认为方式 UserPassword
  - url: 为 TDengine TSDB-Enterprise 中 taosAdapter 组件的 IP 地址和端口号，端口号默认为 6041
  - username 和 password: 为 TDengine TSDB-Enterprise 的用户名和密码，默认为 root 和 taosdata
- `enable-login-captcha-check` 表示是否启用验证码登录，默认为 `false` 即不启用，若想要开启可以设置为 `true`，也可以通过设置环境变量 `ENABLE_LOGIN_CAPTCHA_CHECK` 为 `true` 来开启。
- 在 `tda.analysis` 下，`event.urls` 为 TDengine TSDB-Enterprise 访问 IDMP 服务的 WebSocket 地址。

:::info 完整配置参考

如需查看完整的 IDMP 配置文件说明，请参考：[TDengine IDMP 配置文件参考](/operation/installation/config-reference/)

:::

### 2. 启动 TDengine IDMP 容器

```bash
docker run -d \
  -p 6042:6042 \
  -p 6034:6034 \
  -v ./application.yml:/usr/local/taos/idmp/config/application.yml \
  --name tdengine-idmp \
  tdengine/idmp-ee
```

说明：

- `-p` 选项，用于将​​容器的端口映射到主机的端口​​，使得外部可以通过主机的端口访问容器内运行的服务。如需自定义端口，例如：将 TDengine IDMP 服务的端口 6042 映射至主机的 7042 端口，可按照以下方式，修改端口映射参数 `-p 7042:6042`。
- `-v` 选项，用于挂载主机目录或卷到容器中，实现主机和容器之间的文件共享或持久化存储。在以上命令中，将主机当前目录下的 `application.yml` 文件挂载到容器内的 `/usr/local/taos/idmp/config/application.yml` 路径下。

### 3. 访问 TDengine IDMP 服务

默认情况下，TDengine IDMP 服务监听主机的以下端口：

- **HTTP 访问**：[http://localhost:6042](http://localhost:6042) 或 [http://ip:6042](http://ip:6042)
- **HTTPS 访问**：[https://localhost:6034](https://localhost:6034) 或 [https://ip:6034](https://ip:6034)

### 4. 停止并移除容器

```bash
docker stop tdengine-idmp
docker rm tdengine-idmp
```

停止后数据不会保留，如需持久化数据请挂载数据卷。

## 常见错误

### 1. 容器 `tdengine-idmp` 状态为 `unhealthy`，或者 IDMP 页面中显示 `Python Server unhealthy.` 等错误

这种情况需要排查 `tdengine-idmp` 的 Python 应用是否正常，请按照以下命令逐步排查：

```bash
# 进入 docker 容器
docker exec -it tdengine-idmp bash

# 查看 Python 进程
ps -ef | grep python

# 如果进程不存在，可以查看 log 文件中是否包含错误信息
cd /var/log/taos && cat idmp-ai.log | more

# 如果 log 文件不存在，或者查找错误困难，可以执行下方命令进行测试
export IDMP_DATA_PATH=/var/lib/taos/idmp && export IDMP_LOG_PATH=/var/log/taos && export SENTENCE_MODEL_PATH=/usr/local/taos/idmp/ai-server/static/sentence-transformer && export PPOCR_PATH=/usr/local/taos/idmp/ai-server/static/ppocr-v5 && export MODEL_FORMAT=onnx && python /usr/local/taos/idmp/ai-server/run.py
```

以上过程，如果 log 文件中包含错误信息，或者最后一条命令执行报错，建议联系 TDengine 团队。联系时请提供 log 文件与命令行报错截图，log 文件的获取方式参考以下命令：

```bash
# 容器外部执行（不要忽略末尾点号，代表当前目录）
docker cp tdengine-idmp:/var/log/taos/idmp-ai.log .
```

### 2. IDMP 页面中显示 `AI service is unhealthy` 等错误

首先，可以在 `管理后台 -> 连接` 页面点击进入 AI 连接的详情页面，查看是否内置密钥过期。如果过期，请尽快设置有效的密钥或新建连接；如果未过期，请按照 `常见问题1` 进行排查；如果仍未发现问题，建议联系 TDengine 团队。
