---
title: Local Deployment
sidebar_label: Local Deployment
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GatewayBasePathConfig from './common/_gateway-base-path.md'

# 14.3.2 Local Deployment

This guide explains how to deploy TDengine IDMP with an installer package on Linux, macOS, or Windows.

To install TSDB, IDMP, TDgpt, and other modules together with a single command, use All-in-One deployment. See [section 14.13](../40-all-in-one-deploy/index.md).

## 14.3.2.1 Prerequisites

:::warning
TDengine IDMP requires TDengine TSDB-Enterprise 3.4.1.7 or later. Install and start TDengine TSDB-Enterprise before installing TDengine IDMP.
:::

Before installation, confirm the following:

- TDengine TSDB-Enterprise 3.4.1.7 or later is installed and running. See [Deploy with an installer package](https://docs.tdengine.com/get-started/package/).
- Java 21 or later (installed automatically by the install command)
- glibc 2.28 or later (Linux only)
- Microsoft Visual C++ Redistributable 14.44 or later (installed automatically by the install command; Windows only)
- A stable internet connection
- A correctly configured system time zone. See your operating system documentation.

For complete hardware and OS requirements, see [Planning](../02-planning.md).

## 14.3.2.2 Install TDengine IDMP

Follow the one-line install command provided for TDengine IDMP-Enterprise in the TDengine Download Center. Copy and paste it into a terminal to install.

:::tip
On Linux, run the command as `root`. On Windows, open an elevated PowerShell window as Administrator before running the command.
:::

### Common installation errors

IDMP requires a supported Java runtime. During installation, the script checks whether Java is installed and whether the version meets the requirement. Common errors:

1. `Java Version 21+ is required, but not found at: ...`
   - Java is not installed. Install Java 21 or later.
   - Java is installed but not found. Create a symlink, for example: `ln -s /path/to/your-java-executable /usr/local/bin/java`.
2. `Java Version 21+ is required, but version X is found at: ...`
   - The Java version is too low. Install Java 21 or later.
   - A qualifying Java is installed but not found first on `PATH`. Create a symlink as above, and ensure the correct Java executable has the highest priority on `PATH`. The error message prints the search path used by the installer.

## 14.3.2.3 Configure the TSDB connection

TDengine IDMP requires TDengine TSDB-Enterprise 3.4.1.7 or later. Before starting IDMP, configure the TDengine TSDB-Enterprise connection. Open the IDMP configuration file with a text editor. The default location is:

- Linux/macOS: `/usr/local/taos/idmp/config/application.yml`
- Windows: `C:\TDengine\idmp\config\application.yml`

Under `tda.default-connection`, set the connection details:

```yaml
tda:
  default-connection:
    enable: true
    auth-type: UserPassword # can be set to UserPassword or Token
    url: http://192.168.1.100:6041
    username: root
    password: taosdata
    explorer-url: http://192.168.1.100:6060
```

Where:

- **auth-type:** Authentication method. Supports UserPassword (default) and Token.
- **url:** The IP address and port of the taosAdapter component in TDengine TSDB-Enterprise. The default port is 6041.
- **username** and **password:** Credentials for TDengine TSDB-Enterprise. Defaults are `root` and `taosdata`.
- **explorer-url:** The taosExplorer URL. The default port is 6060. **If you access IDMP remotely, set this to the server's actual IP address or domain name**; otherwise the browser cannot reach Explorer.

:::info Complete Configuration Reference

- For the complete IDMP configuration file reference, see: [TDengine IDMP Configuration File Reference](/administration/installation/config-reference/)
- <GatewayBasePathConfig />

:::

After you finish this configuration, you can start the TDengine IDMP service.

## 14.3.2.4 Start TDengine IDMP

<Tabs>

<TabItem label="Linux" value="linux">

Run the following command to start TDengine IDMP:

```bash
sudo svc-tdengine-idmp start
```

You can also use other `svc-tdengine-idmp` commands to check status or stop the service:

```bash
sudo svc-tdengine-idmp status # Check service status
sudo svc-tdengine-idmp stop   # Stop service
```

You can also manage services with `systemctl`. After installation, the service names are:

- `tdengine-idmp-h2`
- `tdengine-idmp-backend`
- `tdengine-idmp-ui`
- `tdengine-idmp-chat`
- `tdengine-idmp-cls`

For example:

```bash
sudo systemctl start tdengine-idmp-h2
sudo systemctl start tdengine-idmp-backend
sudo systemctl start tdengine-idmp-ui
sudo systemctl start tdengine-idmp-chat

sudo systemctl status tdengine-idmp-backend
sudo systemctl stop tdengine-idmp-ui
sudo systemctl stop tdengine-idmp-backend
sudo systemctl stop tdengine-idmp-chat
sudo systemctl stop tdengine-idmp-h2
```

:::info

Root permissions are required to run these commands. On non-root accounts, prefix the command with `sudo`.
You can also operate a single component, for example: `sudo svc-tdengine-idmp start backend`.

:::

</TabItem>

<TabItem label="macOS" value="macos">

Run the following command to start TDengine IDMP:

```bash
sudo svc-tdengine-idmp start
```

You can also use other `svc-tdengine-idmp` commands:

```bash
sudo svc-tdengine-idmp status
sudo svc-tdengine-idmp stop
```

To manage services manually with `launchctl`, use these LaunchDaemon names:

- `com.taosdata.tdengine-idmp-h2`
- `com.taosdata.tdengine-idmp-backend`
- `com.taosdata.tdengine-idmp-ui`
- `com.taosdata.tdengine-idmp-chat`

For example:

```bash
sudo launchctl start com.taosdata.tdengine-idmp-h2
sudo launchctl start com.taosdata.tdengine-idmp-backend
sudo launchctl start com.taosdata.tdengine-idmp-ui
sudo launchctl start com.taosdata.tdengine-idmp-chat

sudo launchctl list | grep tdengine-idmp
sudo launchctl print system/com.taosdata.tdengine-idmp-backend
```

:::info

- Root privileges are required to run these commands.
- The first column returned by `sudo launchctl list | grep tdengine-idmp` is the process PID. `-` means the service is not running.
- If the service is unhealthy, check `launchd.log` or logs under `/usr/local/taos/idmp/logs`.

:::

</TabItem>

<TabItem label="Windows" value="windows">

After installation, the TDengine IDMP services are registered as Windows services but do not start automatically. Start them as follows.

**Recommended: batch script**

```batch
C:\TDengine\idmp\bin\start-tdengine-idmp.bat
```

**Windows Services Manager:**

1. Press `Win + R`, type `services.msc`, and press Enter.
2. Start the following services:
   - `tdengine-idmp-h2`
   - `tdengine-idmp-chat`
   - `tdengine-idmp-cls`
   - `tdengine-idmp-backend`
   - `tdengine-idmp-ui`

**sc command:**

```batch
sc.exe start tdengine-idmp-h2
sc.exe start tdengine-idmp-chat
sc.exe start tdengine-idmp-cls
sc.exe start tdengine-idmp-backend
sc.exe start tdengine-idmp-ui
```

**Check status:**

```batch
sc.exe query tdengine-idmp-h2
sc.exe query tdengine-idmp-chat
sc.exe query tdengine-idmp-cls
sc.exe query tdengine-idmp-backend
sc.exe query tdengine-idmp-ui
```

**Stop services:**

```batch
C:\TDengine\idmp\bin\stop-tdengine-idmp.bat
```

Or:

```batch
sc.exe stop tdengine-idmp-ui
sc.exe stop tdengine-idmp-backend
sc.exe stop tdengine-idmp-cls
sc.exe stop tdengine-idmp-chat
sc.exe stop tdengine-idmp-h2
```

:::info

- Run batch scripts as Administrator. If you hit a permission error, right-click the script and choose **Run as administrator**.
- If a service is unhealthy, check logs under `C:\TDengine\log` or use Event Viewer.

:::

</TabItem>
</Tabs>

By default, the TDengine IDMP service listens on:

- HTTP: `http://localhost:6042` or `http://ip:6042`
- HTTPS: `https://localhost:6034` or `https://ip:6034`

## 14.3.2.5 Uninstall TDengine IDMP

<Tabs>

<TabItem label="Linux/macOS" value="unix">

Uninstall TDengine IDMP:

```bash
rmidmp -e yes
```

To keep data, logs, and configuration:

```bash
rmidmp -e no
```

If installed with **rpm** (Linux):

```bash
rpm -e tdengine-idmp
```

If installed with **deb** (Linux):

```bash
dpkg -r tdengine-idmp
```

</TabItem>

<TabItem label="Windows" value="windows">

Double-click `C:\TDengine\idmp\unins000.exe` and follow the uninstall wizard.

</TabItem>

</Tabs>

## 14.3.2.6 Upgrade TDengine IDMP

Use the official install script to upgrade. The script detects an existing installation and enters upgrade mode so user data and configuration remain safe:

- **Automatic upgrade detection:** The script determines whether the run is an upgrade.
- **Data and configuration protection:** In upgrade mode, the script does not overwrite or modify these directories:

<Tabs>
<TabItem label="Linux/macOS" value="unix">

- `data/idmp`: user data
- `idmp/venv`: Python virtual environment
- `idmp/config`: configuration
- `logs`: logs

</TabItem>
<TabItem label="Windows" value="windows">

- `data\idmp`: user data
- `idmp\venv`: Python virtual environment
- `idmp\config`: configuration
- `logs`: logs

</TabItem>
</Tabs>

- **Program files only:** The upgrade updates program files and dependencies while leaving user data and configuration unchanged.
- **Fresh install:** On a first install, all directories and files are initialized.

:::info
Always upgrade with the official install script. If you need a manual backup, copy the directories above before upgrading. After the upgrade, check service status and logs to confirm success.
:::
