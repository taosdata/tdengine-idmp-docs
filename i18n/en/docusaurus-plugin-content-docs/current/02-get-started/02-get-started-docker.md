---
title: Get Started with Docker
sidebar_label: Docker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 2.2 Get Started with Docker

TDengine IDMP is offered as a Docker Compose setup to make deployment easy. This installs TDengine TSDB-Enterprise along with TDengine IDMP and automatically establishes a connection between them.

## 2.2.1 Environment Requirements

- Ensure that your local machine meets the minimum system requirements for TDengine IDMP. See [Planning](../14-administration/02-planning.md).
- Install Git on your local machine. See [the official Git website](https://git-scm.com) to download the installer.
- Install Docker Desktop on your local machine and ensure that it is running. See [the official Docker website](https://www.docker.com/) to download the installer.
- Ensure that TDengine TSDB and TDengine IDMP are not running on your machine locally or in Docker containers. If TDengine TSDB or TDengine IDMP are running, stop all TDengine services or containers before beginning this procedure.

## 2.2.2 Procedure

<Tabs>
<TabItem value="Linux">

1. Clone the TDengine IDMP deployment repository:

   ```bash
   git clone https://github.com/taosdata/tdengine-idmp-deployment.git
   ```

2. Start TDengine IDMP with Docker

   ```bash
   cd tdengine-idmp-deployment/docker
   export TZ="UTC"
   chmod +x idmp.sh
   ./idmp.sh start
   ```

   This command will prompt you to select a deployment mode:

   - **Standard** — TDengine TSDB Enterprise + IDMP
   - **Full** — TDengine TSDB Enterprise + IDMP + TDgpt (adds AI/ML algorithms for time-series forecasting and anomaly detection)

   The required images will be pulled automatically if not already present locally.

   If you want to install a specific version, execute the following
   
   ```bash
   cd tdengine-idmp-deployment/docker
   export TZ="UTC"
   chmod +x idmp.sh
   IDMP_TAG=1.0.14.4 ./idmp.sh start
   ```
   remember to replace "1.0.14.4" with the version number you want
   
   :::note
   Set the `TZ` environment variable to match your environment. `UTC` is a good default for server environments. All containers in the Compose stack inherit this setting — an incorrect timezone will cause analysis triggers and event timestamps to be misaligned.
   :::

</TabItem>
<TabItem value="Windows">

1. From the Start Menu, open Git CMD. In the terminal displayed, run the following command to clone the TDengine IDMP deployment repository to your local machine:

   ```shell
   git clone https://github.com/taosdata/tdengine-idmp-deployment.git
   ```

1. Open the `docker` directory within the repository:

   ```shell
   cd tdengine-idmp-deployment\docker
   ```

1. Run Docker Compose to spin up TDengine containers.
   - To deploy TDengine TSDB and TDengine IDMP without TDgpt, run the following command:

     ```shell
     docker compose up -d
     ```

   - To deploy TDengine TSDB and TDengine IDMP with TDgpt, run the following command:

     ```shell
     docker compose -f docker-compose-tdgpt.yml up -d
     ```

   These commands pull the required Docker images and spin up TDengine TSDB and TDengine IDMP containers.

</TabItem>
</Tabs>

## 2.2.3 Activate and Initialize the System

1. In a web browser, access TDengine IDMP at `http://localhost:6042`.
2. Under **Activate TDengine IDMP**, enter your email address and organization.
3. Click **Get Code** and enter the code sent to your email address.

   :::tip
   If the email does not arrive, check your spam or junk folder.
   :::

4. Read the User Agreement and Privacy Policy and click **Activate**.
5. In the **Privacy Settings** dialog, select which diagnostic information you want to share with TDengine, then click **Agree**.

## 2.2.4 Enter Account Information

1. Enter your name, phone number, position, and password.

   :::note
   - Your password must be 8 to 20 characters long.
   - Your password must contain letters, digits, and special characters.
   - Supported special characters: `. ~ ! @ # $ ^ & *`
   :::

2. (Optional) Select a profile picture. JPG and PNG files under 1 MB are supported.
3. Click **Continue**.

Your TDengine IDMP instance is now ready to use. Continue to [Section 2.4](./04-experiencing-idmp.md) to load sample data and explore IDMP features.

## 2.2.5 Uninstalling TDengine

You can use Docker Compose to remove TDengine containers from your system if desired.

1. In a terminal, open the `docker` directory from which you deployed TDengine in Docker.
1. Run Docker Compose to spin down TDengine containers.
   - If you deployed TDengine TSDB and TDengine IDMP without TDgpt, run the following command:

     ```shell
     docker compose down -v
     ```

   - If you deployed TDengine TSDB and TDengine IDMP with TDgpt, run the following command:

     ```shell
     docker compose -f docker-compose-tdgpt.yml down -v
     ```

The TDengine containers and volumes created during the deployment process are removed. You can also use Docker Desktop to view and delete containers, images, and volumes.

## 2.2.6 Troubleshooting

Commonly encountered issues are described as follows:

1. **Issue:** When you run a Docker Compose command, the following error occurs:

   ```text
   unable to get image 'tdengine/tsdb-ee:latest': failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine; check if the path is correct and if the daemon is running: open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.
   ```

   **Solution:** This indicates that Docker is not running. Ensure that you have started the Docker Desktop application and that it is operating normally, then run the Docker Compose command again.

1. **Issue:** When you run the `docker compose up` command, the following error occurs:

   ```text
   Error response from daemon: ports are not available: exposing port TCP 0.0.0.0:6041 -> 127.0.0.1:0: listen tcp 0.0.0.0:6041: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.
   ```

   **Solution:** This indicates that TDengine is already installed and running on your machine. Uninstall TDengine or stop all TDengine services before spinning up TDengine in Docker.
