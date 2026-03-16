---
title: 安装包快速上手
sidebar_label: 安装包
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Init from './_init.md';

TDengine IDMP 支持在 Linux、macOS 或 Windows 机器上进行本地安装。本节以 Linux 为主要示例进行说明。

## 2.3.1 系统要求

安装前，请确保以下前置条件已满足：

- TDengine TSDB-Enterprise 3.3.7.0 或更高版本——必须已安装并运行。参见 [使用安装包部署](https://docs.tdengine.com/get-started/deploy-from-package/)。
- Java 21 或更高版本
- glibc 2.25 或更高版本（仅 Linux）
- Python 3.12
- Debian/Ubuntu 系统需安装 `python3-venv` 包
- SMTP 邮件服务（告警通知所必需；如无法访问公网，需在内网部署）
- 已正确配置的系统时区。请参考操作系统的用户手册进行设置。

:::tip
安装 TDengine IDMP 时，主机必须能够访问互联网。安装过程中将从网络下载并安装依赖项。
:::

如需了解完整的硬件和操作系统要求，请参见[部署规划](../14-administration/02-planning.md)。

## 2.3.2 下载安装包

从 [TDengine 下载中心](https://www.taosdata.com/download-center) 下载适用于您平台的 IDMP 安装包。在弹出的对话框中填写邮箱地址，下载链接将发送至您的邮箱。

## 2.3.3 安装 TDengine IDMP

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

双击 `.exe` 安装包，按照向导完成安装。需要管理员权限。如遇权限问题，请右键点击安装包选择**以管理员身份运行**。

:::note
TDengine IDMP 在 Windows 上运行需要：
- Java 21 或更高版本，且 `java` 命令需在系统 PATH 环境变量中
- Python 3.12
- 如需验证 Java 是否正确配置，可在命令提示符中执行 `java -version`
:::

安装完成后，TDengine IDMP 相关服务将自动注册为 Windows 服务。

</TabItem>
</Tabs>

默认安装路径：
- Linux / macOS：`/usr/local/taos/idmp`
- Windows：`C:\TDengine\idmp`

安装成功后将打印：`TDengine IDMP has been installed successfully!`

## 2.3.4 配置与 TDengine TSDB 的连接

用文本编辑器打开配置文件：

- Linux / macOS：`/usr/local/taos/idmp/config/application.yml`
- Windows：`C:\TDengine\idmp\config\application.yml`

在 `tda.default-connection` 下，配置连接信息：

```yaml
tda:
  default-connection:
    enable: true
    auth-type: UserPassword
    url: http://localhost:6041
    username: root
    password: taosdata
```

（可选）执行以下命令测试与 TDengine TSDB-Enterprise 的连接：

```bash
curl --request POST \
  --user root:taosdata \
  --url http://localhost:6041/rest/sql \
  --data 'show databases;'
```

连接成功时，将返回 TDengine TSDB-Enterprise 的数据库列表。

## 2.3.5 启动 IDMP 服务

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

或通过 Windows 服务管理器启动 `tdengine-idmp`、`tdengine-idmp-h2` 和 `tdengine-idmp-chat` 三个服务。

</TabItem>
</Tabs>

<Init />

TDengine IDMP 实例现已就绪。请继续阅读[第 2.4 节](./04-experiencing-idmp.md)，加载示例数据并探索 IDMP 功能。
