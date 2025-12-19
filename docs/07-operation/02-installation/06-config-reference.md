---
title: 配置文件参考
---

# TDengine IDMP 配置文件参考

TDengine IDMP 的配置文件为 `application.yml`，默认位置：
- **Linux/macOS**: `/usr/local/taos/idmp/config/application.yml`
- **Windows**: `C:\TDengine\idmp\config\application.yml`

## 基础配置

### HTTP/HTTPS 服务配置

```yaml
quarkus:
  http:
    port: 6042 # IDMP HTTP 服务端口
    ssl-port: 6034 # IDMP HTTPS 服务端口
    insecure-requests: enabled # 允许 HTTP 和 HTTPS 同时工作
    ssl:
      enabled: true # 启用 SSL/HTTPS
      certificate:
        files: /usr/local/taos/idmp/config/certbundle.pem # 证书文件路径
        key-files: /usr/local/taos/idmp/config/privkey.pem # 私钥文件路径
  log:
    level: INFO # 日志级别
    file:
      rotation:
        max-file-size: 300M  # 日志轮转文件大小
        max-backup-index: "15" # 日志备份文件数量
```

#### HTTPS 配置说明

**内置测试证书**：
- 安装包内置了一个有效期为 3 个月的测试证书
- 测试证书绑定的域名为：`idmp.tdengine.net`
- 该证书仅适用于功能演示、测试等场景，**不建议生产环境使用**

**使用测试证书访问 HTTPS**：

如果使用内置的测试证书，需要配置域名解析。在客户端的 hosts 文件中添加以下映射：

```
192.168.1.100  idmp.tdengine.net  # 请替换为实际的服务器 IP
```

**hosts 文件位置**：
- **Linux/macOS**: `/etc/hosts`
- **Windows**: `C:\Windows\System32\drivers\etc\hosts`

**生产环境证书配置**：

在生产环境中，应使用正式的 SSL 证书。修改配置文件中的证书路径：

```yaml
quarkus:
  http:
    ssl:
      certificate:
        files: /path/to/your/certificate.pem  # 您的证书文件
        key-files: /path/to/your/private-key.pem  # 您的私钥文件
```

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
