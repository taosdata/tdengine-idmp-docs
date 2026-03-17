---
title: 安装包快速上手
sidebar_label: 安装包
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PkgListV37 from "/src/components/PkgListZh";
import Getstarted from './_get_started.md';

# 2.3 安装包快速上手

TDengine IDMP 支持在 Linux、macOS 或 Windows 机器上进行本地安装。

## 2.3.1 系统要求

安装前，请确保以下前置条件已满足：

- TDengine TSDB-Enterprise 3.3.7.0 或更高版本——必须已安装并运行。参见 [使用安装包部署](https://docs.tdengine.com/get-started/deploy-from-package/)。
- Java 21 或更高版本
- glibc 2.25 或更高版本（仅 Linux）
- Python 3.12
- Debian/Ubuntu 系统需安装 `python3-venv` 包
- SMTP 邮件服务（告警通知所必需；如无法访问公网，需在内网部署）
- 已正确配置的系统时区。请参考操作系统的用户手册进行设置。

如需了解完整的硬件和操作系统要求，请参见[部署规划](../14-administration/02-planning.md)。

## 2.3.2 安装 TDengine IDMP

<Tabs>
<TabItem label="Linux - tar.gz 安装" value="tar">

1. 请点击以下链接获取最新版本的 `tar.gz` 安装包。请在弹出的对话框中，填写您的邮箱地址，我们会将下载链接发送到您的邮箱。

   <PkgListV37 productName="TDengine IDMP-Enterprise" version="1.0.14.0" platform="Linux-Generic" arch="x64" pkgType="Server" />

2. 执行以下命令，解压并安装：

   ```bash
   tar zxvf tdengine-idmp-enterprise-1.0.14.0-linux-generic.tar.gz
   cd tdengine-idmp-enterprise-1.0.14.0
   sudo ./install.sh
   ```

3. TDengine IDMP 的默认安装路径为 `/usr/local/taos/idmp`，安装成功后，可以看到终端展示 "TDengine IDMP has been installed successfully!"。

:::tip
安装 TDengine IDMP 时，主机必须能够访问互联网。安装过程中将从网络下载并安装依赖项。
:::

</TabItem>
<TabItem label="Debian/Ubuntu - deb 安装" value="deb">

1. 请点击以下链接获取最新版本的 `.deb` 安装包。请在弹出的对话框中，填写您的邮箱地址，我们会将下载链接发送到您的邮箱。

   <PkgListV37 productName="TDengine IDMP-Enterprise" version="1.0.14.0" platform="Linux-Ubuntu" arch="x64" pkgType="Server" />

2. 执行以下命令，安装 deb 包：

   ```bash
   sudo dpkg -i tdengine-idmp-enterprise-1.0.14.0-linux-generic.deb
   ```

3. TDengine IDMP 的默认安装路径为 `/usr/local/taos/idmp`，安装成功后，可以看到终端展示 "TDengine IDMP has been installed successfully!"。

:::tip
安装 TDengine IDMP 时，主机必须能够访问互联网。安装过程中将从网络下载并安装依赖项。
:::

</TabItem>
<TabItem label="CentOS/RHEL - rpm 安装" value="rpm">

1. 请点击以下链接获取最新版本的 `.rpm` 安装包。请在弹出的对话框中，填写您的邮箱地址，我们会将下载链接发送到您的邮箱。

   <PkgListV37 productName="TDengine IDMP-Enterprise" version="1.0.14.0" platform="Linux-Red Hat" arch="x64" pkgType="Server" />

2. 执行以下命令，安装 rpm 包：

   ```bash
   sudo rpm -ivh --nodeps tdengine-idmp-enterprise-1.0.14.0-linux-generic.rpm
   ```

3. TDengine IDMP 的默认安装路径为 `/usr/local/taos/idmp`，安装成功后，可以看到终端展示 "TDengine IDMP has been installed successfully!"。

:::tip
安装 TDengine IDMP 时，主机必须能够访问互联网。安装过程中将从网络下载并安装依赖项。
:::

</TabItem>
<TabItem label="macOS 安装" value="macos">

1. 请点击以下链接获取最新版本的 macOS 安装包。请在弹出的对话框中，填写您的邮箱地址，我们会将下载链接发送到您的邮箱。

   <PkgListV37 productName="TDengine IDMP-Enterprise" version="1.0.14.0" platform="macOS" arch="x64" pkgType="Server" />

2. 双击安装包，按照提示完成安装。

3. TDengine IDMP 的默认安装路径为 `/usr/local/taos/idmp`。

:::tip
安装 TDengine IDMP 时，主机必须能够访问互联网。安装过程中将从网络下载并安装依赖项。
:::

</TabItem>
<TabItem label="Windows 安装" value="windows">

1. 请点击以下链接获取最新版本的 Windows 安装包。请在弹出的对话框中，填写您的邮箱地址，我们会将下载链接发送到您的邮箱。

   <PkgListV37 productName="TDengine IDMP-Enterprise" version="1.0.14.0" platform="Windows" arch="x64" pkgType="Server" />

2. 双击安装包，按照安装向导完成安装。TDengine IDMP 的默认安装路径为 `C:\TDengine\idmp`。

3. 安装完成后，TDengine IDMP 相关服务将自动注册为 Windows 服务。

:::note
Windows 安装包运行需要管理员权限。如果遇到权限问题，请右键点击安装包，选择**以管理员身份运行**。
:::

:::info 依赖说明
TDengine IDMP 在 Windows 上运行需要：

- Java 21 或更高版本，并确保 `java` 命令在系统 PATH 环境变量中
- Python 3.12 版本
- 如需验证 Java 是否正确配置，可在命令提示符中执行 `java -version`
:::

</TabItem>
</Tabs>

## 2.3.3 配置与 TDengine TSDB 的连接

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

## 2.3.4 启动 IDMP 服务

<Tabs>
<TabItem label="Linux/macOS" value="linux">

```bash
sudo svc-tdengine-idmp start
```

</TabItem>
<TabItem label="Windows 安装" value="windows">

```batch
C:\TDengine\idmp\bin\start-tdengine-idmp.bat
```

或通过 Windows 服务管理器启动 `tdengine-idmp`、`tdengine-idmp-h2` 和 `tdengine-idmp-chat` 三个服务。

</TabItem>
</Tabs>

## 2.3.5 激活

1. 首次访问时，您需要激活服务。在填写"邮箱"和"组织"后，点击**获取激活码**，系统会向您填写的邮箱发送一封激活邮件，输入邮件中的激活码后，点击**激活**，即可完成激活，您将获得 15 天的免费试用期。

   :::note
   为方便 AI 相关功能的体验，IDMP 安装后预置了 DeepSeek 的 API key，有效期 3 天。到期后，请在 TDengine IDMP 的**管理后台 → 连接**更新您的 API key。
   :::

2. 激活码验证通过后，会弹出**隐私配置**对话框，您可以根据需求选择信息采集项，采集的信息将帮助我们改进产品，您的业务及生产数据绝不会被采集，配置完成后，请点击**同意**。

## 2.3.6 配置用户信息

1. 激活产品后，将进入用户信息配置页面。
2. 请根据系统提示，填写您的姓名和手机号。
3. 请设置系统的登录密码。
4. 密码验证通过后，就完成了用户信息的配置，点击**继续**，将自动跳转到加载示例场景页面。

请继续阅读[第 2.4 节](./04-experiencing-idmp.md)，探索 IDMP 功能。
