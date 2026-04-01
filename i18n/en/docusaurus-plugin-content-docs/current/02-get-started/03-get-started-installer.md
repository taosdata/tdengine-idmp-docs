---
title: Get Started with Local Install
sidebar_label: Local Install
---

# 2.3 Get Started with Local Install

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PkgList from "/src/components/PkgListEn/";

You can install TDengine IDMP locally on a Linux, macOS, or Windows machine.

## 2.3.1 System Requirements

Ensure the following prerequisites are in place before installing:

- TDengine TSDB-Enterprise 3.3.7.0 or later — must be installed and running. See [Deploy from Package](https://docs.tdengine.com/get-started/deploy-from-package/).
- Java 21 or later
- On Linux: glibc 2.28 or later
- SMTP email service (required for alert notifications; deploy internally if internet access is unavailable)
- A correctly configured system timezone. Refer to your operating system's user manual for instructions.

For full hardware and OS requirements, see [Planning Your Deployment](../14-administration/02-planning.md).

## 2.3.2 Install TDengine IDMP

<Tabs>
<TabItem label="Linux-Generic" value="tar">

1. Download the installation package from the following link:

   <PkgList productName="TDengine IDMP-Enterprise" version="1.0.15.0" platform="Linux-Generic" arch="x64" pkgType="Server" />
   <PkgList productName="TDengine IDMP-Enterprise" version="1.0.15.0" platform="Linux-Generic" arch="arm64" pkgType="Server" />

2. Run the following commands to extract and install (using x64 architecture as an example):

   ```bash
   tar zxvf tdengine-idmp-enterprise-1.0.15.0-linux-x64.tar.gz
   cd tdengine-idmp-enterprise-1.0.15.0
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

   <PkgList productName="TDengine IDMP-Enterprise" version="1.0.15.0" platform="Linux-Red Hat" arch="x64" pkgType="Server" />
   <PkgList productName="TDengine IDMP-Enterprise" version="1.0.15.0" platform="Linux-Red Hat" arch="arm64" pkgType="Server" />

2. Run the following command to install the rpm package (using x64 architecture as an example):

   ```bash
   sudo rpm -ivh --nodeps tdengine-idmp-enterprise-1.0.15.0-linux-x64.rpm
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

   <PkgList productName="TDengine IDMP-Enterprise" version="1.0.15.0" platform="Linux-Ubuntu" arch="x64" pkgType="Server" />
   <PkgList productName="TDengine IDMP-Enterprise" version="1.0.15.0" platform="Linux-Ubuntu" arch="arm64" pkgType="Server" />

2. Run the following command to install the deb package (using x64 architecture as an example):

   ```bash
   sudo dpkg -i tdengine-idmp-enterprise-1.0.15.0-linux-x64.deb
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

   <PkgList productName="TDengine IDMP-Enterprise" version="1.0.15.0" platform="macOS" arch="arm64" pkgType="Server" />

1. Run the following command to install TDengine IDMP:

   ```bash
   sudo installer -pkg tdengine-idmp-enterprise-1.0.15.0-macos-arm64.pkg -target /
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

## 2.3.3 Activate and Initialize the System

1. In a web browser, access TDengine IDMP at `http://ip:6042`.
2. Under **Activate TDengine IDMP**, enter your email address and organization.
3. Click **Get Code** and enter the code sent to your email address.

   :::tip
   If the email does not arrive, check your spam or junk folder.
   :::

4. Read the User Agreement and Privacy Policy and click **Activate**.
5. In the **Privacy Settings** dialog, select which diagnostic information you want to share with TDengine, then click **Agree**.

## 2.3.4 Enter Account Information

1. Enter your name, phone number, position, and password.

   :::note
   - Your password must be 8 to 20 characters long.
   - Your password must contain letters, digits, and special characters.
   - Supported special characters: `. ~ ! @ # $ ^ & *`
   :::

2. (Optional) Select a profile picture. JPG and PNG files under 1 MB are supported.
3. Click **Continue**.

Your TDengine IDMP instance is now ready to use. Continue to [Section 2.4](./04-experiencing-idmp.md) to load sample data and explore IDMP features.
