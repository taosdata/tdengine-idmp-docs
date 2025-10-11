---
title: Docker Deployment
---

This guide explains how to install TDengine IDMP and TDengine TSDB-Enterprise using Docker and Docker Compose.

## Prerequisites

1. Install Docker Engine 20.10 or later on your local machine. For instructions, see [Install Docker Engine](https://docs.docker.com/engine/install/) in the Docker documentation.
1. Install Docker Compose 1.29.2 or later on your local machine. For instructions, see [Overview of installing Docker Compose](https://docs.docker.com/compose/install/) in the Docker documentation.
1. Install Git on your local machine. For more information, see the [Git website](https://git-scm.com/).

## Install TDengine TSDB-Enterprise and TDengine IDMP

### 1. Clone the repository:

   ```bash
   git clone https://github.com/taosdata/tdengine-idmp-deployment.git
   ```

   This repository includes the Docker Compose file to deploy TDengine IDMP and TDengine TSDB-Enterprise.

   You can deploy the services using either the unified management script (recommended) or manual Docker Compose commands.

### 2. Recommended: Use the unified management script

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

  By default, the TDengine IDMP service listens on port 6042 of the host. You can access the management interface using the following address:

  - [http://localhost:6042](http://localhost:6042)
  - [http://ip:6042](http://ip:6042)

  :::tip
  To change the port mapping, edit the `ports` configuration in the `docker-compose.yml` or `docker-compose-tdgpt.yml` file.
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

   By default, the TDengine IDMP service listens on port 6042 of the host. You can access the management interface using the following address:

   - [http://localhost:6042](http://localhost:6042)
   - [http://ip:6042](http://ip:6042)

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
    enable-login-captcha-check: ${ENABLE_LOGIN_CAPTCHA_CHECK:false}
     analysis:
       event:
         urls: ws://192.168.1.100:6042 # The websocket URI for tdengine to access IDMP server.
         event-types: # The event types for IDMP to use
           - WINDOW_OPEN
           - WINDOW_CLOSE
   ```

   * Under the `tda.default-connection` section, set the TDengine TSDB-Enterprise connection as follows:
     - auth-type: Authentication method. Supports UserPassword (default) and Token.
     - url: The IP address and port of the taosAdapter component in TDengine TSDB-Enterprise. The default port is 6041.
     - username and password: Credentials for accessing TDengine TSDB-Enterprise. Default values are root and taosdata.
  
   * `enable-login-captcha-check` indicates whether captcha login is enabled. The default value is false, meaning it is not enabled. If you want to enable it, you can set it to true. It can also be enabled by setting the environment variable `ENABLE_LOGIN_CAPTCHA_CHECK` to true.

   * Under `tda.analysis`, `event.urls` specifies the WebSocket address through which TDengine TSDB-Enterprise accesses the IDMP service.

3. Start the TDengine IDMP container

   ```bash
   docker run -d \
     -p 6042:6042 \
     -v ./application.yml:/usr/local/taos/idmp/config/application.yml \
     --name tdengine-idmp \
     tdengine/idmp-ee
   ```

   :::note

   - The -p option is used to map the container's port to a port on the host, allowing external access to services running inside the container via the host's port. To customize the port mapping—for example, to map the TDengine IDMP service's port 6042 inside the container to port 7042 on the host—you can modify the port mapping parameter as follows: -p 7042:6042.
   - The -v option is used to mount a host directory or volume into the container, enabling file sharing or persistent storage between the host and the container. In the above command, the application.yml file from the current directory on the host is mounted to the container path /usr/local/taos/idmp/config/application.yml.

   :::

4. Access TDengine IDMP.

   By default, the service listens on port 6042 of the host. To access the service, open `http://localhost:6042` or specify the IP address of the host.

5. Stop and remove the container:

   ```bash
   docker stop tdengine-idmp
   docker rm tdengine-idmp
   ```

   Data will not be retained after stopping the service. To persist data, mount a data volume.