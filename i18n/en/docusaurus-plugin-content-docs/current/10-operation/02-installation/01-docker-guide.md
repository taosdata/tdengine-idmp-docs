---
title: Docker Deployment
---

import GatewayBasePathConfig from './common/_gateway-base-path.md'

This guide explains how to install TDengine IDMP and TDengine TSDB-Enterprise using Docker and Docker Compose.

## Prerequisites

1. Install Docker Engine 20.10 or later on your local machine. For instructions, see [Install Docker Engine](https://docs.docker.com/engine/install/) in the Docker documentation.
1. Install Docker Compose 1.29.2 or later on your local machine. For instructions, see [Overview of installing Docker Compose](https://docs.docker.com/compose/install/) in the Docker documentation.
1. Install Git on your local machine. For more information, see the [Git website](https://git-scm.com/).

## Install TDengine TSDB-Enterprise and TDengine IDMP

### 1. Clone the repository

   ```bash
   git clone https://github.com/taosdata/tdengine-idmp-deployment.git
   ```

   This repository includes the Docker Compose file to deploy TDengine IDMP and TDengine TSDB-Enterprise.

   You can deploy the services using either the unified management script (recommended) or manual Docker Compose commands.

### 2. Recommended: Use the unified management script

#### Start the service

   ```bash
   cd tdengine-idmp-deployment/docker
   chmod +x idmp.sh
   ./idmp.sh start
   ```

  The script provides the following features:

  1. **Automatic environment detection**: Detects and uses the available Docker Compose command on your system.
  2. **Interactive deployment selection**: Prompts you to select the deployment mode
    - **Standard deployment**: TSDB Enterprise + IDMP, suitable for basic usage.
    - **Full deployment**: TSDB Enterprise + IDMP + TDgpt, includes AI analysis features.
  3. **Smart network configuration**: Automatically detects the host IP address and configures the access URL, or allows you to customize it.
  4. **One-click startup**: Automatically pulls required images (if not available locally) and starts the selected services in the background.

#### Access the service

  By default, the TDengine IDMP service listens on the following ports of the host:

- **HTTP access**: [http://localhost:6042](http://localhost:6042) or [http://ip:6042](http://ip:6042)
- **HTTPS access**: [https://localhost:6034](https://localhost:6034) or [https://ip:6034](https://ip:6034)

IDMP supports HTTPS with default port 6034. The built-in test certificate is bound to the domain `idmp.tdengine.net`. If using the built-in test certificate, please configure the appropriate domain name resolution.

:::tip

- To change the port mapping, edit the `ports` configuration in the `docker-compose.yml` or `docker-compose-tdgpt.yml` file.
- <GatewayBasePathConfig />

:::

#### Stop the service

   ```bash
   ./idmp.sh stop
   ```

  This command will automatically detect the currently running service type and use the appropriate configuration file to stop the services.  
  The script provides an interactive prompt:

- **Keep data and logs**: Default, keep data volumes when stopping containers.
- **Clear data and logs**: Delete data volumes when stopping containers, suitable for scenarios where you need to completely clean the environment.

### 3. Alternative: Manual Docker Compose deployment

#### Set environment variable

   ```bash
   cd tdengine-idmp-deployment/docker
   export IDMP_URL="http://your-host-ip:6042"  # Replace with your actual IP address or configured DNS names
   ```

#### Choose deployment mode

  **Standard deployment (TSDB Enterprise + IDMP):**

   ```bash
   docker compose up -d
   ```

  **Full deployment (TSDB Enterprise + IDMP + TDgpt):**

   ```bash
   docker compose -f docker-compose-tdgpt.yml up -d
   ```

#### Access the service

   By default, the TDengine IDMP service listens on the following ports of the host:

- **HTTP access**: [http://localhost:6042](http://localhost:6042) or [http://ip:6042](http://ip:6042)
- **HTTPS access**: [https://localhost:6034](https://localhost:6034) or [https://ip:6034](https://ip:6034)

IDMP supports HTTPS with default port 6034. The built-in test certificate is bound to the domain `idmp.tdengine.net`. If using the built-in test certificate, please configure the appropriate domain name resolution.

   :::tip

   To change the port mapping, edit the ports configuration in the `docker-compose.yml` or `docker-compose-tdgpt.yml` file.

   :::

#### Stop the service

   This command will stop and remove all containers started by Docker Compose, but it will not delete the data volumes.

   ```bash
   docker compose down
   # or
   docker compose -f docker-compose-tdgpt.yml down
   ```

   To delete data volumes, add `-v`.

   ```bash
   docker compose down -v
   # or
   docker compose -f docker-compose-tdgpt.yml down -v
   ```

#### Upgrade IDMP Service Separately

1. Stop the IDMP service separately:

    ```bash
    docker compose down tdengine-idmp
    ```
  
2. Start the IDMP service and pull the latest image:

    ```bash
    docker compose up tdengine-idmp --pull always -d
    ```

## Install TDengine IDMP

:::important

TDengine IDMP requires TDengine TSDB-Enterprise 3.3.7.0 or later. If your environment already has a TDengine TSDB-Enterprise instance that meets the requirements, you can connect TDengine IDMP to the existing TSDB instance.

:::

1. Pull the TDengine IDMP image:

   ```bash
   docker pull tdengine/idmp-ee
   ```

2. Configure TDengine IDMP:

   The TDengine IDMP configuration file `application.yml` is described as follows:

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

   - Under the `tda.default-connection` section, set the TDengine TSDB-Enterprise connection as follows:
     - auth-type: Authentication method. Supports UserPassword (default) and Token.
     - url: The IP address and port of the taosAdapter component in TDengine TSDB-Enterprise. The default port is 6041.
     - username and password: Credentials for accessing TDengine TSDB-Enterprise. Default values are root and taosdata.
  
   - Under `tda.analysis`, `event.urls` specifies the WebSocket address through which TDengine TSDB-Enterprise accesses the IDMP service.

   :::info Complete Configuration Reference

    For complete IDMP configuration file documentation, please refer to: [TDengine IDMP Configuration File Reference](/operation/installation/config-reference/)

   :::

3. Start the TDengine IDMP container

   ```bash
   docker run -d \
     -p 6042:6042 \
     -p 6034:6034 \
     -v ./application.yml:/usr/local/taos/idmp/config/application.yml \
     --name tdengine-idmp \
     tdengine/idmp-ee
   ```

   :::note

   - The -p option is used to map the container's port to a port on the host, allowing external access to services running inside the container via the host's port. To customize the port mapping—for example, to map the TDengine IDMP service's port 6042 inside the container to port 7042 on the host—you can modify the port mapping parameter as follows: -p 7042:6042.
   - The -v option is used to mount a host directory or volume into the container, enabling file sharing or persistent storage between the host and the container. In the above command, the application.yml file from the current directory on the host is mounted to the container path /usr/local/taos/idmp/config/application.yml.

   :::

4. Access TDengine IDMP.

   By default, the TDengine IDMP service listens on the following ports of the host:

- **HTTP access**: [http://localhost:6042](http://localhost:6042) or [http://ip:6042](http://ip:6042)
- **HTTPS access**: [https://localhost:6034](https://localhost:6034) or [https://ip:6034](https://ip:6034)

IDMP supports HTTPS with default port 6034. The built-in test certificate is bound to the domain `idmp.tdengine.net`. If using the built-in test certificate, please configure the appropriate domain name resolution.

5. Stop and remove the container:

   ```bash
   docker stop tdengine-idmp
   docker rm tdengine-idmp
   ```

   Data will not be retained after stopping the service. To persist data, mount a data volume.

## Troubleshooting

### 1. The container `tdengine-idmp` is in an `unhealthy` state, or the IDMP page displays the error `Python Server unhealthy`

In this case, you need to check whether the Python application in `tdengine-idmp` is functioning properly. Follow the commands below to troubleshoot step by step:

```bash
# Enter the docker container
docker exec -it tdengine-idmp bash

# Check Python processes
ps -ef | grep python

# If the process does not exist, check the log file for error messages
cd /var/log/taos && cat idmp-ai.log | more

# If the log file does not exist or it is difficult to find errors, execute the following command for testing
export IDMP_DATA_PATH=/var/lib/taos/idmp && export IDMP_LOG_PATH=/var/log/taos && export SENTENCE_MODEL_PATH=/usr/local/taos/idmp/ai-server/static/sentence-transformer && export PPOCR_PATH=/usr/local/taos/idmp/ai-server/static/ppocr-v5 && export MODEL_FORMAT=onnx && python /usr/local/taos/idmp/ai-server/run.py
```

If the log file contains error messages or the last command execution results in an error, it is recommended to contact the TDengine team. When contacting them, please provide the log file and screenshots of command-line errors. To obtain the log file, refer to the following command:

```bash
# Execute outside the container (do not ignore the dot at the end, which represents the current directory)
docker cp tdengine-idmp:/var/log/taos/idmp-ai.log .
```

### 2. The IDMP page displays the error `AI service is unhealthy`

First, you can navigate to the AI connection details page by clicking on the connection in the `Admin Console -> Connections` page to check whether the built-in key has expired. If it has expired, please set a valid key or create a new connection as soon as possible; if it has not expired, follow the troubleshooting steps in `Issue 1`; if no errors are found, it is recommended to contact the TDengine team.
