---
title: Get Started with Local Install
sidebar_label: Local Install
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Init from './_init.md';

You can install TDengine IDMP locally on a Linux, macOS, or Windows machine. Linux is used as the primary example in this section.

## 2.3.1 System Requirements

Ensure the following prerequisites are in place before installing:

- TDengine TSDB-Enterprise 3.3.7.0 or later — must be installed and running. See [Deploy from Package](https://docs.tdengine.com/get-started/deploy-from-package/).
- Java 21 or later
- glibc 2.25 or later (Linux only)
- Python 3.12
- On Debian/Ubuntu: the `python3-venv` package
- SMTP email service (required for alert notifications; deploy internally if internet access is unavailable)
- A correctly configured system timezone. Refer to your operating system's user manual for instructions.

:::tip
Your machine must be connected to the internet when you install TDengine IDMP. Dependencies are downloaded and installed during the installation process.
:::

For full hardware and OS requirements, see [Planning Your Deployment](../14-administration/02-planning.md).

## 2.3.2 Download the Installation Package

Download the IDMP package for your platform from the [TDengine Download Center](https://www.taosdata.com/download-center). Enter your email address in the dialog — the download link will be sent to you.

## 2.3.3 Install TDengine IDMP

<Tabs>
<TabItem label="Linux-Generic" value="tar">

```bash
tar -zxvf tdengine-idmp-enterprise-<version>-linux-generic.tar.gz && \
cd tdengine-idmp-enterprise-<version> && \
sudo ./install.sh
```

</TabItem>
<TabItem label="Linux-Red Hat" value="rpm">

```bash
sudo rpm -ivh --nodeps tdengine-idmp-enterprise-<version>-linux-generic.rpm
```

</TabItem>
<TabItem label="Linux-Ubuntu" value="deb">

```bash
sudo dpkg -i tdengine-idmp-enterprise-<version>-linux-generic.deb
```

</TabItem>
<TabItem label="macOS" value="mac">

```bash
sudo installer -pkg tdengine-idmp-enterprise-<version>-macos-generic.pkg -target /
```

</TabItem>
<TabItem label="Windows" value="windows">

Double-click the `.exe` installer and follow the wizard. Administrator privileges are required. If you encounter permission issues, right-click the installer and select **Run as administrator**.

:::note
TDengine IDMP on Windows requires:
- Java 21 or higher, with the `java` command available in the system PATH environment variable
- Python 3.12
- To verify that Java is properly configured, run `java -version` in the command prompt
:::

After installation, TDengine IDMP related services will be automatically registered as Windows services.

</TabItem>
</Tabs>

Default installation paths:
- Linux / macOS: `/usr/local/taos/idmp`
- Windows: `C:\TDengine\idmp`

A successful installation prints: `TDengine IDMP has been installed successfully!`

## 2.3.4 Configure the Connection to TDengine TSDB

Open the configuration file in a text editor:

- Linux / macOS: `/usr/local/taos/idmp/config/application.yml`
- Windows: `C:\TDengine\idmp\config\application.yml`

Under the `tda.default-connection` section, set the connection details:

```yaml
tda:
  default-connection:
    enable: true
    auth-type: UserPassword
    url: http://localhost:6041
    username: root
    password: taosdata
```

(Optional) Run the following command to test the connection to TDengine TSDB-Enterprise:

```bash
curl --request POST \
  --user root:taosdata \
  --url http://localhost:6041/rest/sql \
  --data 'show databases;'
```

If the connection is successful, the list of databases in TDengine TSDB-Enterprise will be displayed.

## 2.3.5 Start the IDMP Service

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

Or start the `tdengine-idmp`, `tdengine-idmp-h2`, and `tdengine-idmp-chat` services through Windows Service Manager.

</TabItem>
</Tabs>

<Init />

Your TDengine IDMP instance is now ready to use. Continue to [Section 2.4](./04-experiencing-idmp.md) to load sample data and explore IDMP features.

