---
title: 配置文件参考
sidebar_label: 配置文件参考
---

# 14.3.3 TDengine IDMP 配置文件参考

TDengine IDMP 的配置文件为 `application.yml`，默认位置：

- **Linux/macOS**: `/usr/local/taos/idmp/config/application.yml`
- **Windows**: `C:\TDengine\idmp\config\application.yml`

## 14.3.3.1 基础配置

### TLS/HTTPS 证书配置

TDengine IDMP 采用 **TLS 在前端（nginx）终结** 的架构：浏览器通过 HTTPS 访问前端 nginx，nginx 再以 HTTP 反向代理到后端 Java 服务。**对外 HTTPS 只需在前端配置证书，后端无需启用 TLS。**

```text
浏览器 --HTTPS(6034)--> 前端 nginx --HTTP--> 后端 Quarkus
```

#### 本机安装（Linux / macOS / Windows）

HTTPS 证书由 nginx（UI 服务）使用，放在安装目录的 `config/` 下：

- **Linux/macOS**：`/usr/local/taos/idmp/config/certbundle.pem`、`privkey.pem`
- **Windows**：`C:\TDengine\idmp\config\certbundle.pem`、`privkey.pem`

**配置方法**：

1. 将证书和私钥分别命名为 `certbundle.pem`、`privkey.pem`，覆盖上述文件。
2. 若使用其他文件名或路径，修改 nginx 配置中的 `ssl_certificate`、`ssl_certificate_key`（Linux/macOS：`config/nginx.conf`；Windows：`config/nginx-win.conf`）。
3. 重启 UI 服务：`svc-tdengine-idmp restart ui`（Linux/macOS）；Windows 以管理员身份下重启 `tdengine-idmp-ui` 服务。

HTTPS 访问端口为 `6034`。升级安装会保留已有证书，无需重新配置。

#### Docker 部署

HTTPS 证书仅配置在前端容器（`tdengine-idmp-ui`），路径为 `/etc/nginx/ssl/certbundle.pem`、`privkey.pem`。镜像已内置测试证书，生产环境可通过挂载替换：

**配置方法**：

在 `docker-compose` 中为 `tdengine-idmp-ui` 挂载证书，然后重启该容器：

```yaml
tdengine-idmp-ui:
  volumes:
    - /path/to/your/certbundle.pem:/etc/nginx/ssl/certbundle.pem:ro
    - /path/to/your/privkey.pem:/etc/nginx/ssl/privkey.pem:ro
```

HTTPS 访问端口为宿主机 `6034`（映射到容器 `443`）。后端容器无需配置 TLS 证书。

#### 内置测试证书

- 安装包 / 镜像内置了一个有效期为 3 个月的测试证书
- 测试证书绑定的域名为：`idmp.tdengine.net`
- 该证书仅适用于功能演示、测试等场景，**不建议生产环境使用**

**使用测试证书访问 HTTPS**：

如果使用内置的测试证书，需要配置域名解析。在客户端的 hosts 文件中添加以下映射：

```text
192.168.1.100  idmp.tdengine.net  # 请替换为实际的服务器 IP
```

**hosts 文件位置**：

- **Linux/macOS**: `/etc/hosts`
- **Windows**: `C:\Windows\System32\drivers\etc\hosts`

### 后端 HTTP 服务配置

以下为本机安装完成后的典型后端配置（TLS 由 nginx 处理，后端不启用 HTTPS）：

```yaml
quarkus:
  http:
    port: 16042 # 本机安装：后端内部 HTTP 端口（nginx 代理 6042/6034）
    ssl-port: -1
    ssl:
      enabled: false
  log:
    level: INFO # 日志级别
    file:
      rotation:
        max-file-size: 300M  # 日志轮转文件大小
        max-backup-index: "3" # 日志备份文件数量
```

:::note
**Docker 部署**：后端容器内 `quarkus.http.port` 为 `6042`，同样不对外提供 HTTPS；用户访问 `https://<host>:6034` 时由前端 nginx 终结 TLS。
:::

### TDengine 连接配置

```yaml
tda:
  data-dir: /var/lib/taos/idmp  # data directory
  index-dir: /var/lib/taos/idmp/index # index directory
  log-dir: /var/log/taos # all IDMP logs including IDMP server and AI server will be stored in this directory
  ai-server:
    url: http://localhost:6040 # AI server URL
  server-url: http://192.168.1.100:6042 # public IDMP URL
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

说明：

- `tda.server-url`为 TDengine IDMP 服务的访问地址，可配置为域名或 IP 地址，如果配置为 localhost + port 的方式，则 TDengine IDMP 服务只能在本机访问。
- 在 `tda.default-connection` 下，配置 TDengine TSDB-Enterprise 的连接信息，其中：
  - auth-type: 认证方式，支持 UserPassword 和 Token 两种方式，默认为方式 UserPassword
  - url: 为 TDengine TSDB-Enterprise 中 taosAdapter 组件的 IP 地址和端口号，端口号默认为 6041
  - username 和 password: 为 TDengine TSDB-Enterprise 的用户名和密码，默认为 root 和 taosdata
- `enable-login-captcha-check` 表示是否启用验证码登录，默认为 `false` 即不启用，若想要开启可以设置为 `true`，也可以通过设置环境变量 `ENABLE_LOGIN_CAPTCHA_CHECK` 为 `true` 来开启。
- 在 `tda.analysis` 下，`event.urls` 为 TDengine TSDB-Enterprise 访问 IDMP 服务的 WebSocket 地址。

### AI 服务器 TLS 配置

当 AI 服务器使用自签名证书时，通过以下环境变量配置 TLS：

| 环境变量 | 说明 | 默认值 |
|---|---|---|
| `IDMP_TLS_CA_BUNDLE` | 自定义 CA 证书路径，支持冒号分隔的多路径、目录扫描和混合模式 | 空 |
| `IDMP_TLS_SKIP_VERIFY` | 设为 `true` 跳过 TLS 验证（仅开发/测试环境） | 空 |

两个变量均支持通过同名 Java 系统属性回退。详细使用说明见 [8.1.5 TLS/SSL 配置](../../08-ai-powered-insights/01-connecting-to-llm.md#815-tlsssl-配置)。
