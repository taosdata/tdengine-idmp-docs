---
title: Get Started with Local Install
sidebar_label: Local Install
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PkgListV37 from "/components/PkgListEn/";
import Init from './_init.md';
import Getstarted from './_get_started.md';

You can install TDengine IDMP locally on a Linux or macOS machine. In this document, Linux is used as an example.

## Prerequisites

- Ensure that your local machine meets the minimum requirements for TDengine IDMP. For details, see [Planning Your Deployment](../07-operation/01-planning.md).
- Install TDengine TSDB-Enterprise version 3.3.7.0 or higher. For instructions, see [Deploy TDengine TSDB-Enterprise](https://docs.tdengine.com/get-started/deploy-enterprise-edition/).
- Install Java 21 or later.
- Install glibc 2.25 or later.
- On Debian and Ubuntu systems, install the `python3-venv` package.

## Install TDengine IDMP

<Tabs>
<TabItem label="Linux-Generic" value="tar">

1. Download the installation package from the following link:

   <PkgListV37 productName="TDengine IDMP-Enterprise" version="1.0.2.3" platform="Linux-Generic" arch="x64" pkgType="Server" jsonPath="/version-json/product-data.json"/>

1. Run the following commands to install TDengine IDMP:

   ```bash
   tar -zxvf tdengine-idmp-enterprise-1.0.2.3-linux-generic.tar.gz && \
   cd tdengine-idmp-enterprise-1.0.2.3 && \
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

   <PkgListV37 productName="TDengine IDMP-Enterprise" version="1.0.2.3" platform="Linux-Red Hat" arch="x64" pkgType="Server" jsonPath="/version-json/product-data.json"/>

1. Run the following command to install TDengine IDMP:

   ```bash
   sudo rpm -ivh --nodeps tdengine-idmp-enterprise-1.0.2.3-linux-generic.rpm
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

   <PkgListV37 productName="TDengine IDMP-Enterprise" version="1.0.2.3" platform="Linux-Ubuntu" arch="x64" pkgType="Server" jsonPath="/version-json/product-data.json"/>

1. Run the following command to install TDengine IDMP:

   ```bash
   sudo dpkg -i tdengine-idmp-enterprise-1.0.2.3-linux-generic.deb
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

   <PkgListV37 productName="TDengine IDMP-Enterprise" version="1.0.2.3" platform="macOS" arch="x64" pkgType="Server" jsonPath="/version-json/product-data.json"/>

1. Run the following command to install TDengine IDMP:

   ```bash
   sudo installer -pkg tdengine-idmp-enterprise-1.0.2.3-macos-generic.pkg -target /
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
</Tabs>

<Init />

<Getstarted />

## Uninstall TDengine IDMP

Once you’ve completed your evaluation, you can uninstall TDengine IDMP by running the following command:

```bash
sudo rmidmp
```

For more detailed instructions on starting and stopping the service, see [Local Deployment](../07-operation/02-installation/01-install-guide.md).