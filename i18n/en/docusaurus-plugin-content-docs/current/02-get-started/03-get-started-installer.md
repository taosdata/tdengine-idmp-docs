---
title: Get Started with Local Install
sidebar_label: Local Install
---

# 2.3 Get Started with Local Install

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PkgList from "/src/components/PkgListEn/";
import Init from './_init.md';
import Getstarted from './_get_started.md';

You can install TDengine IDMP locally on a Linux, macOS, or Windows machine.

## 2.3.1 System Requirements

Ensure the following prerequisites are in place before installing:

- TDengine TSDB-Enterprise 3.3.7.0 or later — must be installed and running. See [Deploy from Package](https://docs.tdengine.com/get-started/deploy-from-package/).
- Java 21 or later
- glibc 2.25 or later (Linux only)
- Python 3.12
- On Debian/Ubuntu: the `python3-venv` package
- SMTP email service (required for alert notifications; deploy internally if internet access is unavailable)
- A correctly configured system timezone. Refer to your operating system's user manual for instructions.

For full hardware and OS requirements, see [Planning Your Deployment](../14-administration/02-planning.md).

## 2.3.2 Install TDengine IDMP

<Tabs>
<TabItem label="Linux-Generic" value="tar">

1. Download the installation package from the following link:

   <PkgList productName="TDengine IDMP-Enterprise" platform="Linux-Generic" />

1. Run the following commands to install TDengine IDMP:

   ```bash
   tar -zxvf tdengine-idmp-enterprise-1.0.14.0-linux-generic.tar.gz && \
   cd tdengine-idmp-enterprise-1.0.14.0 && \
   sudo ./install.sh
   ```

   :::tip
   Your machine must be connected to the internet when you install TDengine IDMP. Dependencies are downloaded and installed during the installation process.
   :::

1. Configure the TDengine TSDB-Enterprise connection:

   Open `/usr/local/taos/idmp/config/application.yml` in a text editor and set the connection details under `tda.default-connection`:

   ```yaml
   tda:
     default-connection:
       enable: true
       auth-type: UserPassword
       url: http://localhost:6041
       username: root
       password: taosdata
   ```

1. (Optional) Test the connection to TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   If the connection is successful, the list of databases in TDengine TSDB-Enterprise will be displayed.

1. Start TDengine IDMP:

   ```bash
   sudo svc-tdengine-idmp start
   ```

</TabItem>
<TabItem label="Linux-Red Hat" value="rpm">

1. Download the installation package from the following link:

   <PkgList productName="TDengine IDMP-Enterprise" platform="Linux-Red Hat" />

1. Run the following command to install TDengine IDMP:

   ```bash
   sudo rpm -ivh --nodeps tdengine-idmp-enterprise-1.0.14.0-linux-generic.rpm
   ```

   :::tip
   Your machine must be connected to the internet when you install TDengine IDMP. Dependencies are downloaded and installed during the installation process.
   :::

1. Configure the TDengine TSDB-Enterprise connection:

   Open `/usr/local/taos/idmp/config/application.yml` in a text editor and set the connection details under `tda.default-connection`:

   ```yaml
   tda:
     default-connection:
       enable: true
       auth-type: UserPassword
       url: http://localhost:6041
       username: root
       password: taosdata
   ```

1. (Optional) Test the connection to TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   If the connection is successful, the list of databases in TDengine TSDB-Enterprise will be displayed.

1. Start TDengine IDMP:

   ```bash
   sudo svc-tdengine-idmp start
   ```

</TabItem>
<TabItem label="Linux-Ubuntu" value="deb">

1. Download the installation package from the following link:

   <PkgList productName="TDengine IDMP-Enterprise" platform="Linux-Ubuntu" />

1. Run the following command to install TDengine IDMP:

   ```bash
   sudo dpkg -i tdengine-idmp-enterprise-1.0.14.0-linux-generic.deb
   ```

   :::tip
   Your machine must be connected to the internet when you install TDengine IDMP. Dependencies are downloaded and installed during the installation process.
   :::

1. Configure the TDengine TSDB-Enterprise connection:

   Open `/usr/local/taos/idmp/config/application.yml` in a text editor and set the connection details under `tda.default-connection`:

   ```yaml
   tda:
     default-connection:
       enable: true
       auth-type: UserPassword
       url: http://localhost:6041
       username: root
       password: taosdata
   ```

1. (Optional) Test the connection to TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   If the connection is successful, the list of databases in TDengine TSDB-Enterprise will be displayed.

1. Start TDengine IDMP:

   ```bash
   sudo svc-tdengine-idmp start
   ```

</TabItem>
<TabItem label="macOS" value="mac">

1. Download the installation package from the following link:

   <PkgList productName="TDengine IDMP-Enterprise" platform="macOS" />

1. Run the following command to install TDengine IDMP:

   ```bash
   sudo installer -pkg tdengine-idmp-enterprise-1.0.14.0-macos-generic.pkg -target /
   ```

   :::tip
   Your machine must be connected to the internet when you install TDengine IDMP. Dependencies are downloaded and installed during the installation process.
   :::

1. Configure the TDengine TSDB-Enterprise connection:

   Open `/usr/local/taos/idmp/config/application.yml` in a text editor and set the connection details under `tda.default-connection`:

   ```yaml
   tda:
     default-connection:
       enable: true
       auth-type: UserPassword
       url: http://localhost:6041
       username: root
       password: taosdata
   ```

1. (Optional) Test the connection to TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   If the connection is successful, the list of databases in TDengine TSDB-Enterprise will be displayed.

1. Start TDengine IDMP:

   ```bash
   sudo svc-tdengine-idmp start
   ```

</TabItem>
<TabItem label="Windows" value="windows">

1. Download the installation package from the following link:

   <PkgList productName="TDengine IDMP-Enterprise" platform="Windows" />

1. Double-click the downloaded `.exe` installation package and follow the installation wizard to complete the installation.

   :::note
   Administrator privileges are required. If you encounter permission issues, right-click the installer and select **Run as administrator**.
   :::

   :::info Dependencies
   TDengine IDMP on Windows requires:
   - Java 21 or higher, with the `java` command available in the system PATH environment variable
   - Python 3.12
   - To verify that Java is properly configured, run `java -version` in the command prompt
   :::

1. After installation, TDengine IDMP related services will be automatically registered as Windows services.

   The default installation path is `C:\TDengine\idmp`.

1. Configure the TDengine TSDB-Enterprise connection:

   Open `C:\TDengine\idmp\config\application.yml` in a text editor and set the connection details under `tda.default-connection`:

   ```yaml
   tda:
     default-connection:
       enable: true
       auth-type: UserPassword
       url: http://localhost:6041
       username: root
       password: taosdata
   ```

1. (Optional) Test the connection to TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   If the connection is successful, the list of databases in TDengine TSDB-Enterprise will be displayed.

1. Start TDengine IDMP:

   ```batch
   C:\TDengine\idmp\bin\start-tdengine-idmp.bat
   ```

   Or start the `tdengine-idmp`, `tdengine-idmp-h2`, and `tdengine-idmp-chat` services through Windows Service Manager.

</TabItem>
</Tabs>

<Init />

<Getstarted />

## 2.3.3 Uninstall TDengine IDMP

<Tabs>
<TabItem label="Linux/macOS" value="linux">

```bash
sudo rmidmp
```

</TabItem>
<TabItem label="Windows" value="windows">

Double-click `C:\TDengine\idmp\unins000.exe` and follow the uninstallation wizard to complete the process.

</TabItem>
</Tabs>
