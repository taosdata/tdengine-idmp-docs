---
title: Get Started with Local Install
sidebar_label: Local Install
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 2.3 Get Started with Local Install

You can install TDengine IDMP locally on a Linux, macOS, or Windows machine.

The TDengine Download Center provides an All-in-One installation method that deploys all TDengine modules, including IDMP, with a single command. It supports Docker, Linux, and Windows. For details, see [section 14.13](../14-administration/40-all-in-one-deploy/index.md).

## 2.3.1 System Requirements

Ensure the following prerequisites are in place before installing:

- TDengine TSDB-Enterprise 3.4.1.7 or later — must be installed and running. See [Deploy from Package](https://docs.tdengine.com/get-started/package/).
- Java 21 or later (installed automatically by the install command)
- glibc 2.28 or later (Linux only)
- Microsoft Visual C++ Redistributable 14.44 or later (installed automatically by the install command; Windows only)
- A stable internet connection
- A correctly configured system timezone. Refer to your operating system's user manual for instructions.

For full hardware and OS requirements, see [Planning Your Deployment](../14-administration/02-planning.md).

## 2.3.2 Install TDengine IDMP

Follow the one-line install command provided for TDengine IDMP-Enterprise in the Download Center. Copy and paste it into a terminal to install.

:::tip
On Linux, run the command as `root`. On Windows, open an elevated PowerShell window as Administrator before running the command.
:::

## 2.3.3 Configure the Connection to TDengine TSDB

Open the configuration file in a text editor:

- Linux / macOS: `/usr/local/taos/idmp/config/application.yml`
- Windows: `C:\TDengine\idmp\config\application.yml`

Under `tda.default-connection`, set the connection details:

```yaml
tda:
  default-connection:
    enable: true
    auth-type: UserPassword
    url: http://localhost:6041
    username: root
    password: taosdata
    explorer-url: http://localhost:6060
```

| Parameter | Description |
| --- | --- |
| `url` | TDengine REST API address, default port 6041 |
| `username` | TDengine username |
| `password` | TDengine password |
| `explorer-url` | taosExplorer access URL, default port 6060. **For remote access, this must be set to the server's actual IP or domain name** (for example `http://192.168.1.100:6060`); otherwise the browser cannot connect to the Explorer service |

(Optional) Test the connection to TDengine TSDB-Enterprise:

```bash
curl --request POST \
  --user root:taosdata \
  --url http://localhost:6041/rest/sql \
  --data 'show databases;'
```

If the connection is successful, the list of databases in TDengine TSDB-Enterprise is displayed.

## 2.3.4 Start the IDMP Service

<Tabs>
<TabItem label="Linux/macOS" value="linux">

```bash
sudo svc-tdengine-idmp start
```

</TabItem>
<TabItem label="Windows" value="windows">

```batch
C:\TDengine\idmp\bin\start-tdengine-idmp.bat
```

Or start the `tdengine-idmp-ui`, `tdengine-idmp-backend`, `tdengine-idmp-h2`, `tdengine-idmp-chat`, and `tdengine-idmp-cls` services through Windows Service Manager.

</TabItem>
</Tabs>

By default, the TDengine IDMP service listens on the following host ports:

- HTTP: `http://localhost:6042` or `http://ip:6042`
- HTTPS: `https://localhost:6034` or `https://ip:6034`

## 2.3.5 Activation

1. On first access, activate the service. After entering your email address and organization, click **Get Code**. The system sends an activation email. Enter the code from the email and click **Activate**.

   :::note
   To make it easier to try AI features, IDMP ships with a DeepSeek API key that is valid for 7 days. After it expires, update your API key under **Admin Console → Connections** in TDengine IDMP.
   :::

2. After the activation code is verified, the **Privacy Settings** dialog appears. Select the diagnostic items you want to share. Shared information helps us improve the product. Your business and production data are never collected. When finished, click **Agree**.

## 2.3.6 Configure User Information

1. After activation, you enter the user information page.
2. Follow the prompts to enter your name and phone number.
3. Set the system login password.
4. After the password is validated, user information configuration is complete. Click **Continue**.

## 2.3.7 Configure License Information

1. After user information is configured, you enter the software license selection page.
2. You can choose a free license or a commercial license.
3. If you choose a free license, the system generates a free license after you agree to the free edition terms.
4. If you choose a commercial license, enter the commercial license code obtained from TDengine.
5. After license configuration is complete, the system redirects to the sample scenario loading page.

Continue to [section 2.4](./04-experiencing-idmp.md) to explore IDMP features.
