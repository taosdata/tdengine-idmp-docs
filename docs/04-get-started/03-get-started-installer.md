import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PkgListV37 from "/components/PkgListV37";

# 通过安装包快速体验

TDengine IDMP 提供了丰富的功能，本文档将带领您通过安装包完成 TDengine IDMP 的安装和启动。在导入示例场景数据后，即可轻松体验元素浏览、AI 面板生成和 AI 分析等功能。

## 安装

TDengine IDMP 支持多种安装、部署方式，在不同的操作系统和架构下，都能够体验其强大的功能带来的便利。对操作系统和架构的支持，详见[部署规划](../operation/planning)。

TDengine IDMP 的运行还需要满足以下先决条件：
* Python: 3.10-3.12 版本
* Java: 21 及以上版本
* glibc: 2.25 及以上版本

除此以外，TDengine IDMP 依赖 TDengine TSDB-Enterprise 3.3.7.0 及以上版本。在安装 TDengine IDMP 前，请确保您已安装并启动了 TDengine TSDB-Enterprise 服务。如果尚未安装，请参考：[使用安装包快速体验 TDengine TSDB](https://docs.taosdata.com/get-started/package/)。如果您期望体验时序数据预测的功能，则需要安装 TDgpt, 请参考：[安装包部署 TDgpt](https://docs.taosdata.com/advanced/TDgpt/tutorial/#%E5%AE%89%E8%A3%85%E5%8C%85%E9%83%A8%E7%BD%B2-tdgpt).

<Tabs>

<TabItem label="Linux - tar.gz 安装" value="tar">
1. 请点击以下链接获取最新版本的 `tar.gz` 安装包。请在弹出的对话框中，填写您的邮箱地址，我们会将下载链接发送到您的邮箱。
    <PkgListV37 productName="TDengine IDMP-Enterprise" version="1.0.2.4" platform="Linux-Generic" arch="x64" pkgType="Server" />
2. 执行以下命令，解压并安装：
    ```bash
    tar zxvf tdengine-idmp-enterprise-1.0.2.4-linux-generic.tar.gz
    cd tdengine-idmp-enterprise-1.0.2.4
    ./install.sh
    ```
3. TDengine IDMP 的默认安装路径为 `/usr/local/taos/idmp`, 安装成功后，可以看到终端展示 "TDengine IDMP has been installed successfully!"。
4. 可以通过以下命令查看更多安装选项：
    ```bash
    ./install.sh -h
    ```
</TabItem>

<TabItem label="Debian/Ubuntu - deb 安装" value="deb">
1.从列表中下载获得最新 `.deb` 安装包。请在弹出的对话框中，填写您的邮箱地址，我们会将下载链接发送到您的邮箱。
    <PkgListV37 productName="TDengine IDMP-Enterprise" version="1.0.2.4" platform="Linux-Ubuntu" arch="x64" pkgType="Server" />
1. 执行以下命令，安装 deb 包：
    ```bash
    dpkg -i tdengine-idmp-enterprise-1.0.2.4-linux-generic.deb
    ```
2. TDengine IDMP 的默认安装路径为 `/usr/local/taos/idmp`, 安装成功后，可以看到终端展示 "TDengine IDMP has been installed successfully!"。
</TabItem>

<TabItem label="CentOS/RHEL - rpm 安装" value="rpm">
1. 请点击以下链接获取最新版本的`.rpm` 安装包。请在弹出的对话框中，填写您的邮箱地址，我们会将下载链接发送到您的邮箱。
   <PkgListV37 productName="TDengine IDMP-Enterprise" version="1.0.2.4" platform="Linux-Red Hat" arch="x64" pkgType="Server" />
2. 执行以下命令，安装 rpm 包：
    ```bash
    rpm -ivh --nodeps tdengine-idmp-enterprise-1.0.2.4-linux-generic.rpm
    ```
3. TDengine IDMP 的默认安装路径为 `/usr/local/taos/idmp`, 安装成功后，可以看到终端展示 "TDengine IDMP has been installed successfully!"。
</TabItem>

<TabItem label="macOS 安装" value="macos">
1. 请点击以下链接获取最新版本的 `macOS` 安装包。请在弹出的对话框中，填写您的邮箱地址，我们会将下载链接发送到您的邮箱。
   <PkgListV37 productName="TDengine IDMP-Enterprise" version="1.0.2.4" platform="macOS" arch="x64" pkgType="Server" />
2. 双击安装包，按照提示完成安装。
3. TDengine IDMP 的默认安装路径为 `/usr/local/taos/idmp`。
</TabItem>

</Tabs>

如果安装过程中遇到错误，请参考安装过程的[常见错误及解决方案](../operation/installation/install-guide#常见错误)。

## 启动

以下步骤将演示如何启动 TDengine IDMP.

1. 配置 TDengine TSDB-Enterprise 连接：用编辑器打开 TDengine IDMP 的配置文件，默认位于 `/usr/local/taos/idmp/config/application.yml`，在 `tda.default-connection` 下，配置 TDengine TSDB-Enterprise 的连接信息，示例如下：
    ```yaml
    tda:
      default-connection:
        enable: true
        auth-type: UserPassword # can be set to UserPassword or Token
        url: http://192.168.1.100:6041
        username: root
        password: taosdata
    ```
    其中：
    * auth-type: 认证方式，支持 UserPassword 和 Token 两种方式，默认为方式 UserPassword
    * url: 为 TDengine TSDB-Enterprise 中 taosAdapter 组件的 IP 地址和端口号，端口号默认为 6041
    * username 和 password: 为 TDengine TSDB-Enterprise 的用户名和密码，默认为 root 和 taosdata
1. 测试 TDengine TSDB-Enterprise 连接：在终端中，可以使用 `curl` 命令测试 TDengine TSDB-Enterprise 连接的连通性，示例如下：
    ```bash
    curl --request POST \
      --user root:taosdata \
      --url http://192.168.1.100:6041/rest/sql \
      --data 'show databases;'
    ```
    如果连接成功，您将看到 TDengine TSDB-Enterprise 的数据库列表。
1. 启动 TDengine IDMP 服务：
    ```bash
    svc-tdengine-idmp start
    ```

至此，TDengine IDMP 服务已成功启动。您可以在浏览器输入以下地址访问：[http://ip:6042](http://ip:6042),
请将 `ip` 替换为真实的主机 IP 地址，如果在本地运行，则可以直接访问 [http://localhost:6042](http://localhost:6042)。

关于服务启动、停止更详细的操作指南，请您参考[使用安装包部署](../operation/installation/install-guide)章节。为了简化安装包的部署，您还可以使用我们提供的 Ansible Playbook 来完成安装和配置，具体步骤请参考[使用 Ansible Playbook 部署](../operation/installation/ansible-guide)章节。

import Init from './_init.md'

<Init />

import Getstarted from './_get_started.md'

<Getstarted />
