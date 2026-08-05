---
title: Configuration File Reference
sidebar_label: Configuration File Reference
---

# 14.3.3 TDengine IDMP Configuration File Reference

The TDengine IDMP configuration file is `application.yml`, located at:

- **Linux/macOS**: `/usr/local/taos/idmp/config/application.yml`
- **Windows**: `C:\TDengine\idmp\config\application.yml`

## 14.3.3.1 Basic Configuration

### TLS/HTTPS Certificate Configuration

TDengine IDMP uses **TLS termination at the frontend (nginx)**. Browsers connect to nginx over HTTPS; nginx then reverse-proxies to the backend Java service over plain HTTP. **Only the frontend needs TLS certificates for external HTTPS; the backend does not need TLS enabled.**

```text
Browser --HTTPS(6034)--> Frontend nginx --HTTP--> Backend Quarkus
```

#### Native Installation (Linux / macOS / Windows)

HTTPS certificates are used by nginx (UI service) and stored under the install directory `config/`:

- **Linux/macOS**: `/usr/local/taos/idmp/config/certbundle.pem`, `privkey.pem`
- **Windows**: `C:\TDengine\idmp\config\certbundle.pem`, `privkey.pem`

**How to configure**:

1. Name your certificate and private key `certbundle.pem` and `privkey.pem`, and overwrite the files above.
2. If you use different file names or paths, update `ssl_certificate` and `ssl_certificate_key` in the nginx config (Linux/macOS: `config/nginx.conf`; Windows: `config/nginx-win.conf`).
3. Restart the UI service: `svc-tdengine-idmp restart ui` (Linux/macOS); restart the `tdengine-idmp-ui` service as Administrator on Windows.

HTTPS is served on port `6034`. Upgrades preserve existing certificates.

#### Docker Deployment

HTTPS certificates are configured only in the frontend container (`tdengine-idmp-ui`) at `/etc/nginx/ssl/certbundle.pem` and `privkey.pem`. Images include a built-in test certificate; mount your own for production:

**How to configure**:

Mount certificates for `tdengine-idmp-ui` in `docker-compose`, then restart the container:

```yaml
tdengine-idmp-ui:
  volumes:
    - /path/to/your/certbundle.pem:/etc/nginx/ssl/certbundle.pem:ro
    - /path/to/your/privkey.pem:/etc/nginx/ssl/privkey.pem:ro
```

HTTPS is served on host port `6034` (mapped to container `443`). The backend container does not need TLS certificates.

#### Built-in Test Certificate

- The installation package / images include a built-in test certificate valid for 3 months
- The test certificate is bound to the domain: `idmp.tdengine.net`
- This certificate is only suitable for demos and testing, **not recommended for production**

**Accessing HTTPS with the test certificate**:

If using the built-in test certificate, configure domain name resolution on the client. Add the following mapping to the hosts file:

```text
192.168.1.100  idmp.tdengine.net  # Replace with your actual server IP
```

**Hosts file locations**:

- **Linux/macOS**: `/etc/hosts`
- **Windows**: `C:\Windows\System32\drivers\etc\hosts`

### Backend HTTP Service Configuration

The following shows a typical backend configuration after native installation (TLS is handled by nginx; HTTPS is not enabled on the backend):

```yaml
quarkus:
  http:
    port: 16042 # Native install: internal backend HTTP port (nginx exposes 6042/6034)
    ssl-port: -1
    ssl:
      enabled: false
  log:
    level: INFO # Log level
    file:
      rotation:
        max-file-size: 300M  # Log rotation file size
        max-backup-index: "3" # Number of log backup files
```

:::note
**Docker deployment**: the backend container uses `quarkus.http.port: 6042` and does not expose HTTPS externally. Users access `https://<host>:6034`; TLS is terminated by frontend nginx.
:::

### TDengine Connection Configuration

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

**Configuration Notes:**

- `tda.server-url` is the access address for the TDengine IDMP service. It can be configured as a domain name or IP address. If configured as localhost + port, the TDengine IDMP service can only be accessed locally.
- Under `tda.default-connection`, configure the connection information for TDengine TSDB-Enterprise:
  - auth-type: Authentication method, supports UserPassword and Token, default is UserPassword
  - url: The IP address and port number of the taosAdapter component in TDengine TSDB-Enterprise, default port is 6041
  - username and password: The username and password for TDengine TSDB-Enterprise, default is root and taosdata
- `enable-login-captcha-check` indicates whether to enable captcha login verification, default is `false` (disabled). To enable it, set it to `true`, or set the environment variable `ENABLE_LOGIN_CAPTCHA_CHECK` to `true`.
- Under `tda.analysis`, `event.urls` is the WebSocket address for TDengine TSDB-Enterprise to access the IDMP service.

### AI Server TLS Configuration

When the AI server uses a self-signed certificate, configure TLS via the following environment variables:

| Variable | Description | Default |
|---|---|---|
| `IDMP_TLS_CA_BUNDLE` | Custom CA certificate paths. Supports colon-separated multi-paths, directory scanning, and mixed mode. | Empty |
| `IDMP_TLS_SKIP_VERIFY` | Set to `true` to skip TLS verification (development/test only) | Empty |

Both variables also fall back to the Java system property of the same name. See [8.1.5 TLS/SSL Configuration](../../08-ai-powered-insights/01-connecting-to-llm.md#815-tlsssl-configuration) for detailed usage.
