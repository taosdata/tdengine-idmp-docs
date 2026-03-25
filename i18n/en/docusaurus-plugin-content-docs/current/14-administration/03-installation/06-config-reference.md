---
title: Configuration File Reference
---

# TDengine IDMP Configuration File Reference

The TDengine IDMP configuration file is `application.yml`, located at:

- **Linux/macOS**: `/usr/local/taos/idmp/config/application.yml`
- **Windows**: `C:\TDengine\idmp\config\application.yml`

## Basic Configuration

### HTTP/HTTPS Service Configuration

```yaml
quarkus:
  http:
    port: 6042 # IDMP HTTP service port
    ssl-port: 6034 # IDMP HTTPS service port
    insecure-requests: enabled # Allow HTTP and HTTPS to work simultaneously
    ssl:
      enabled: true # Enable SSL/HTTPS
      certificate:
        files: /usr/local/taos/idmp/config/certbundle.pem # Certificate file path
        key-files: /usr/local/taos/idmp/config/privkey.pem # Private key file path
  log:
    level: INFO # Log level
    file:
      rotation:
        max-file-size: 300M  # Log rotation file size
        max-backup-index: "15" # Number of log backup files
```

#### HTTPS Configuration Instructions

**Built-in Test Certificate**:

- The installation package includes a built-in test certificate valid for 3 months
- The test certificate is bound to the domain: `idmp.tdengine.net`
- This certificate is only suitable for function demonstration, testing and other scenarios, **not recommended for production environments**

**Accessing HTTPS with Test Certificate**:

If using the built-in test certificate, you need to configure domain name resolution. Add the following mapping to the client's hosts file:

```text
192.168.1.100  idmp.tdengine.net  # Replace with your actual server IP
```

**Hosts file locations**:

- **Linux/macOS**: `/etc/hosts`
- **Windows**: `C:\Windows\System32\drivers\etc\hosts`

**Production Environment Certificate Configuration**:

In production environments, you should use official SSL certificates. Modify the certificate paths in the configuration file:

```yaml
quarkus:
  http:
    ssl:
      certificate:
        files: /path/to/your/certificate.pem  # Your certificate file
        key-files: /path/to/your/private-key.pem  # Your private key file
```

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
