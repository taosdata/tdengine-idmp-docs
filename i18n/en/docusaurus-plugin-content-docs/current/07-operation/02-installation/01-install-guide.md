---
title: Local Deployment
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This document describes how to install TDengine IDMP on your local machine.

## Prerequisites

- Ensure that your local machine meets the minimum requirements for TDengine IDMP. For details, see [Planning Your Deployment](../01-planning.md).
- Install TDengine TSDB-Enterprise version 3.3.7.0 or higher. For instructions, see [Deploy TDengine TSDB-Enterprise Enterprise](https://docs.tdengine.com/operations-and-maintenance/deploy-your-cluster/).
- Install Java 21 or later.
- Install glibc 2.25 or later.
- On Debian and Ubuntu systems, install the `python3-venv` package.

## Install TDengine IDMP

Select your operating system to display the appropriate installation procedure.

:::tip

Your machine must be connected to the internet when you install TDengine IDMP. Dependencies are downloaded and installed during the TDengine IDMP installation process.

:::

1. In a web browser, access the [TDengine Download Center](https://tdengine.com/downloads/?product=TDengine+IDMP-Enterprise&platform=Linux-Generic).

1. Select the installation package for your operating system and download it.

1. Follow the instructions in the Download Center to install TDengine IDMP.

:::important

Do not start TDengine IDMP until you have configured the TDengine TSDB-Enterprise connection as described in the following section.

:::

## Configure TSDB Connection

1. Configure the TDengine TSDB-Enterprise connection in TDengine IDMP:

   1. Open the TDengine IDMP configuration file with a text editor. The default location is:
      - Linux/macOS: `/usr/local/taos/idmp/config/application.yml`
      - Windows: `C:\TDengine\idmp\config\application.yml`

   1. Under the `tda.default-connection` section, set the TDengine TSDB-Enterprise connection details as shown in the following example:

      ```yaml
      tda:
        default-connection:
          enable: true
          auth-type: UserPassword
          url: http://<hostname>:<port>
          username: <username>
          password: <password>
      ```

      - **url:** Specify the URL and port number of your taosAdapter instance.

      - **username:** Enter a TDengine TSDB-Enterprise user.

      - **password:** Enter the password for the TDengine TSDB-Enterprise user.

   :::info Complete Configuration Reference

   - For complete IDMP configuration file documentation, please refer to: [TDengine IDMP Configuration File Reference](/operation/installation/config-reference/).
   - If you need to configure the base path for gateway reverse proxy, you shall first specify the path by setting the TDA_REST_BASE_PATH environment variable. Meanwhile, the gateway side needs to configure rules to strip this base path from the request path before forwarding the request to the backend services.

   :::

1. (Optional) Run the following command to test the connection to TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user <username>:<password> \
     --url http://<hostname>:<port>/rest/sql \
     --data 'show databases;'
   ```

   If the connection is successful, the list of databases in TDengine TSDB-Enterprise will be displayed.

## Start TDengine IDMP

<Tabs>

<TabItem label="Linux" value="linux">

Run the following command to start TDengine IDMP:

```bash
sudo svc-tdengine-idmp start
```

You can also use other `svc-tdengine-idmp` commands to check the service status, stop the service, and perform other operations:

```bash
sudo svc-tdengine-idmp status # Check service status
sudo svc-tdengine-idmp stop   # Stop service
```

You can manually manage the TDengine IDMP service using `systemctl`. For example:

```bash
sudo systemctl start tdengine-idmp
sudo systemctl stop tdengine-idmp
sudo systemctl status tdengine-idmp
sudo systemctl restart tdengine-idmp
```

:::info

Root permissions are required to run these commands.

:::

</TabItem>

<TabItem label="macOS" value="macos">

Run the following command to start TDengine IDMP:

```bash
sudo svc-tdengine-idmp start
```

You can also use other `svc-tdengine-idmp` commands to check the service status, stop the service, and perform other operations:

```bash
sudo svc-tdengine-idmp status # Check service status
sudo svc-tdengine-idmp stop   # Stop service
```

You can manually manage the TDengine IDMP service using `launchctl`. For example:

```bash
sudo launchctl start com.taosdata.tdengine-idmp
sudo launchctl stop com.taosdata.tdengine-idmp
sudo launchctl list | grep tdengine-idmp
sudo launchctl print system/com.taosdata.tdengine-idmp
```

:::info

- Root privileges are required to run these commands.
- The command `sudo launchctl list | grep tdengine-idmp` returns the PID of the TDengine IDMP Java process in the first column. If the command returns `-`, the TDengine IDMP service is not running.
- If the service is not working properly, check the system log (`launchd.log`) or the logs located in the `/usr/local/taos/idmp/logs` directory for more information.

:::

</TabItem>

<TabItem label="Windows" value="windows">

Run the following command to start TDengine IDMP:

```batch
C:\TDengine\idmp\bin\start-tdengine-idmp.bat
```

You can also manage TDengine IDMP services through Windows Service Manager:

1. Press `Win + R`, type `services.msc`, and press Enter to open Services
2. Find the following services:
   - `tdengine-idmp`
   - `tdengine-idmp-h2`
   - `tdengine-idmp-chat`
3. Right-click on each service to Start, Stop, or Restart

To stop TDengine IDMP, run:

```batch
C:\TDengine\idmp\bin\stop-tdengine-idmp.bat
```

:::info

- Administrator privileges are required to run these commands.
- If the services are not working properly, check the logs located in the `C:\TDengine\idmp\logs` directory for more information.

:::

</TabItem>
</Tabs>

Once TDengine IDMP starts successfully, it includes the following three services:

- `tdengine-idmp-h2`: Stores metadata and configuration for TDengine IDMP.
- `tdengine-idmp-chat`: Handles AI-related tasks and analytics.
- `tdengine-idmp`: The core service responsible for managing and providing data access.

## Uninstall TDengine IDMP

<Tabs>
<TabItem label="Linux-Generic" value="targz">
Run the following command to uninstall TDengine IDMP:

```bash
rmidmp -e [yes | no]
```

To retain data, log, and configuration files, specify `no`. To delete these files, specify `yes`.

</TabItem>
<TabItem label="Linux-Red Hat" value="rpm">

Run the following command to uninstall TDengine IDMP:

```bash
rpm -e tdengine-idmp
```

</TabItem>
<TabItem label="Linux-Ubuntu" value="deb">
Run the following command to uninstall TDengine IDMP:

```bash
dpkg -r tdengine-idmp
```

</TabItem>
<TabItem label="macOS" value="macos">
Run the following command to uninstall TDengine IDMP:

```bash
rmidmp -e [yes | no]
```

To retain data, log, and configuration files, specify `no`. To delete these files, specify `yes`.

</TabItem>

<TabItem label="Windows" value="windows">

Double-click `C:\TDengine\idmp\unins000.exe` and follow the uninstallation wizard to complete the process.

Alternatively, you can uninstall TDengine IDMP through **Control Panel** → **Programs** → **Programs and Features**:

1. Find **TDengine IDMP** in the list
2. Right-click and select **Uninstall**
3. Follow the uninstallation wizard to complete the process

</TabItem>
</Tabs>

## Upgrade Instructions

TDengine IDMP recommends using the official installation script for upgrades. The script will automatically detect the existing installation environment and select the appropriate upgrade mode to ensure the safety of your data and configuration files. Details are as follows:

- **Automatic Upgrade Detection**: The installation script will automatically determine whether it is an upgrade installation.
- **Data and Configuration Protection**: In upgrade mode, the installation script will not overwrite or modify the following directories and their contents:

<Tabs>
<TabItem label="Linux/macOS" value="unix">

- `data/idmp`: User data directory
- `idmp/venv`: Python virtual environment
- `idmp/config`: Configuration directory
- `logs`: Log directory

</TabItem>
<TabItem label="Windows" value="windows">

- `data\idmp`: User data directory
- `idmp\venv`: Python virtual environment
- `idmp\config`: Configuration directory
- `logs`: Log directory

</TabItem>
</Tabs>

- **Program Files Only Updated**: During an upgrade, only core program files and dependencies are updated, ensuring new features are available while user data and configuration remain unchanged.
- **First-Time Installation**: If this is a first-time installation, all directories and files will be fully initialized.

:::info
It is strongly recommended to use the official installation script for upgrades. If you wish to manually back up your data and configuration, you can do so before upgrading. After the upgrade, check the service status and logs to ensure the upgrade was successful.
:::
