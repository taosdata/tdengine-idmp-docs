---
title: Get Started with Local Install
sidebar_label: Local Install
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PkgList from "/src/components/PkgListEn/";
import Init from './_init.md';
import Getstarted from './_get_started.md';

You can install TDengine IDMP locally on a Linux or macOS machine. In this document, Linux is used as an example.

## Prerequisites

- Ensure that your local machine meets the minimum requirements for TDengine IDMP. For details, see [Planning Your Deployment](../../operation/planning/).
- Install TDengine TSDB-Enterprise version 3.3.7.0 or higher. For instructions, see [Deploy from Package](https://docs.tdengine.com/get-started/deploy-from-package/).
- Install Java 21 or later.
- Install glibc 2.25 or later.
- Install Python 3.12.
- Setup SMTP email service (required when Internet access is not available).
- On Debian and Ubuntu systems, install the `python3-venv` package.
- A correctly configured system timezone. Refer to your operating system's user manual for instructions.

## Install TDengine IDMP

<Tabs>
<TabItem label="Linux-Generic" value="tar">

1. Download the installation package from the following link:

   <PkgList productName="TDengine IDMP-Enterprise" platform="Linux-Generic" />

1. Run the following commands to install TDengine IDMP:

   ```bash
   tar -zxvf tdengine-idmp-enterprise-1.0.12.8-linux-generic.tar.gz && \
   cd tdengine-idmp-enterprise-1.0.12.8 && \
   sudo ./install.sh
   ```

   :::tip

   Your machine must be connected to the internet when you install TDengine IDMP. Dependencies are downloaded and installed during the TDengine IDMP installation process.

   :::

1. Configure the TDengine TSDB-Enterprise connection in TDengine IDMP:

   1. Open the TDengine IDMP configuration file with a text editor. The default location is `/usr/local/taos/idmp/config/application.yml`.
   1. Under the `tda.default-connection` section, set the TDengine TSDB-Enterprise connection details as shown in the following example:

      ```yaml
      tda:
        default-connection:
          enable: true
          auth-type: UserPassword
          url: http://localhost:6041
          username: root
          password: taosdata
      ```

1. (Optional) Run the following command to test the connection to TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   If the connection is successful, the list of databases in TDengine TSDB-Enterprise will be displayed.

1. Start TDengine IDMP.

   ```bash
   sudo svc-tdengine-idmp start
   ```

</TabItem>

<TabItem label="Linux-Red Hat" value="rpm">

1. Download the installation package from the following link:

   <PkgList productName="TDengine IDMP-Enterprise" platform="Linux-Red Hat" />

1. Run the following command to install TDengine IDMP:

   ```bash
   sudo rpm -ivh --nodeps tdengine-idmp-enterprise-1.0.12.8-linux-generic.rpm
   ```

   :::tip

   Your machine must be connected to the internet when you install TDengine IDMP. Dependencies are downloaded and installed during the TDengine IDMP installation process.

   :::

1. Configure the TDengine TSDB-Enterprise connection in TDengine IDMP:

   1. Open the TDengine IDMP configuration file with a text editor. The default location is `/usr/local/taos/idmp/config/application.yml`.
   1. Under the `tda.default-connection` section, set the TDengine TSDB-Enterprise connection details as shown in the following example:

      ```yaml
      tda:
        default-connection:
          enable: true
          auth-type: UserPassword
          url: http://localhost:6041
          username: root
          password: taosdata
      ```

1. (Optional) Run the following command to test the connection to TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   If the connection is successful, the list of databases in TDengine TSDB-Enterprise will be displayed.

1. Start TDengine IDMP.

   ```bash
   sudo svc-tdengine-idmp start
   ```

</TabItem>

<TabItem label="Linux-Ubuntu" value="deb">

1. Download the installation package from the following link:

   <PkgList productName="TDengine IDMP-Enterprise" platform="Linux-Ubuntu" />

1. Run the following command to install TDengine IDMP:

   ```bash
   sudo dpkg -i tdengine-idmp-enterprise-1.0.12.8-linux-generic.deb
   ```

   :::tip

   Your machine must be connected to the internet when you install TDengine IDMP. Dependencies are downloaded and installed during the TDengine IDMP installation process.

   :::

1. Configure the TDengine TSDB-Enterprise connection in TDengine IDMP:

   1. Open the TDengine IDMP configuration file with a text editor. The default location is `/usr/local/taos/idmp/config/application.yml`.
   1. Under the `tda.default-connection` section, set the TDengine TSDB-Enterprise connection details as shown in the following example:

      ```yaml
      tda:
        default-connection:
          enable: true
          auth-type: UserPassword
          url: http://localhost:6041
          username: root
          password: taosdata
      ```

1. (Optional) Run the following command to test the connection to TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   If the connection is successful, the list of databases in TDengine TSDB-Enterprise will be displayed.

1. Start TDengine IDMP.

   ```bash
   sudo svc-tdengine-idmp start
   ```

</TabItem>

<TabItem label="macOS" value="mac">

1. Download the installation package from the following link:

   <PkgList productName="TDengine IDMP-Enterprise" platform="macOS" />

1. Run the following command to install TDengine IDMP:

   ```bash
   sudo installer -pkg tdengine-idmp-enterprise-1.0.12.8-macos-generic.pkg -target /
   ```

   :::tip

   Your machine must be connected to the internet when you install TDengine IDMP. Dependencies are downloaded and installed during the TDengine IDMP installation process.

   :::

1. Configure the TDengine TSDB-Enterprise connection in TDengine IDMP:

   1. Open the TDengine IDMP configuration file with a text editor. The default location is `/usr/local/taos/idmp/config/application.yml`.
   1. Under the `tda.default-connection` section, set the TDengine TSDB-Enterprise connection details as shown in the following example:

      ```yaml
      tda:
        default-connection:
          enable: true
          auth-type: UserPassword
          url: http://localhost:6041
          username: root
          password: taosdata
      ```

1. (Optional) Run the following command to test the connection to TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   If the connection is successful, the list of databases in TDengine TSDB-Enterprise will be displayed.

1. Start TDengine IDMP.

   ```bash
   sudo svc-tdengine-idmp start
   ```

</TabItem>

<TabItem label="Windows" value="windows">

1. Download the installation package from the following link:

   <PkgList productName="TDengine IDMP-Enterprise" platform="Windows" />

1. Double-click the downloaded `.exe` installation package and follow the installation wizard to complete the installation.

1. The default installation path for TDengine IDMP is `C:\TDengine\idmp`.

1. After installation, TDengine IDMP related services will be automatically registered as Windows services.

   :::note
   The Windows installation package requires administrator privileges. If you encounter permission issues, right-click the installation package and select "Run as administrator".
   :::

   :::info Dependencies
   TDengine IDMP on Windows requires:
   - Java 21 or higher, with the `java` command available in the system PATH environment variable
   - Python 3.12
   - To verify that Java is properly configured, run `java -version` in the command prompt
   :::

1. Configure the TDengine TSDB-Enterprise connection in TDengine IDMP:

   1. Open the TDengine IDMP configuration file with a text editor. The default location is `C:\TDengine\idmp\config\application.yml`.
   1. Under the `tda.default-connection` section, set the TDengine TSDB-Enterprise connection details as shown in the following example:

      ```yaml
      tda:
        default-connection:
          enable: true
          auth-type: UserPassword
          url: http://localhost:6041
          username: root
          password: taosdata
      ```

1. (Optional) Run the following command to test the connection to TDengine TSDB-Enterprise:

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

## Uninstall TDengine IDMP

Once you’ve completed your evaluation, you can uninstall TDengine IDMP.

<Tabs>
<TabItem label="Linux/macOS" value="linux">

Run the following command to uninstall TDengine IDMP:

```bash
sudo rmidmp
```

</TabItem>

<TabItem label="Windows" value="windows">

Double-click `C:\TDengine\idmp\unins000.exe` and follow the uninstallation wizard to complete the process.

</TabItem>
</Tabs>

For more detailed instructions on starting and stopping the service, see [Local Deployment](../../operation/installation/install-guide).
