---
title: 使用安装包部署
sidebar_label: 使用安装包部署
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GatewayBasePathConfig from './common/_gateway-base-path.md'

# 14.3.2 使用安装包部署

本指南介绍如何使用安装包在 Linux、macOS 或 Windows 上部署 TDengine IDMP。

如需一行命令同时安装 TSDB、IDMP、TDgpt 等全部模块，请使用 All-in-One 安装方式，详见[第 14.13 节](../40-all-in-one-deploy/index.md)。

## 14.3.2.1 先决条件

:::warning
TDengine IDMP 依赖 TDengine TSDB-Enterprise 3.4.1.7+，在安装 TDengine IDMP 前，请确保您已安装并启动了 TDengine TSDB-Enterprise 服务。
:::

安装前，请确保以下前置条件已满足：

- TDengine TSDB-Enterprise 3.4.1.7 或更高版本——必须已安装并运行。参见 [使用安装包部署](https://docs.taosdata.com/get-started/package/)。
- Java 21 或更高版本（安装命令将自动安装）
- glibc 2.28 或更高版本（仅针对 Linux）
- Microsoft Visual C++ Redistributable 14.44 或更高版本（安装命令将自动安装，仅针对 Windows）
- 稳定连接互联网
- 已正确配置的系统时区。请参考操作系统的用户手册进行设置。

如需了解完整的硬件和操作系统要求，请参见[部署规划](../02-planning.md)。

## 14.3.2.2 安装

请参照官网下载中心 TDengine IDMP-Enterprise 提供的一键部署命令行，复制粘贴至终端，进行安装。

:::tip
在 Linux 系统中，需以 `root` 身份执行命令行；在 Windows 系统中，需以管理员身份打开 Powershell 窗口，执行命令行。
:::

### 常见错误

IDMP 的正常运行，依赖指定版本的 Java 环境。在安装过程中，安装脚本会检查 Java 是否已安装、版本是否满足要求。常见错误如下：

1. 安装过程中，如果遇到以下错误 "Java Version 21+ is required, but not found at: ..."，应该如何解决？
   - Java 没有安装，请安装 Java 21 或更高版本。
   - Java 已安装，但安装程序没有找到，可以通过创建软链接的方式来解决，例如：`ln -s /path/to/your-java-executable /usr/local/bin/java`。
2. 安装过程中，如果遇到以下错误 "Java Version 21+ is required, but version X is found at: ..."，应该如何解决？
   - Java 版本过低，请安装 Java 21 或更高版本。
   - 满足要求的 Java 已安装，但安装程序没有找到，可以通过创建软链接的方式来解决，例如：`ln -s /path/to/your-java-executable /usr/local/bin/java`，如果系统中存在多个 Java 版本，请注意 PATH 的优先级。在以上报错信息中，会打印 PATH 的搜索路径，请您确保满足要求的 Java 可执行文件在 PATH 中的优先级最高。

## 14.3.2.3 配置

TDengine IDMP 依赖 TDengine TSDB-Enterprise 3.4.1.7+。在启动 TDengine IDMP 之前，请配置 TDengine TSDB-Enterprise 连接。用编辑器打开 TDengine IDMP 的配置文件，默认位于：

- Linux/macOS：`/usr/local/taos/idmp/config/application.yml`
- Windows：`C:\TDengine\idmp\config\application.yml`

在 `tda.default-connection` 下，配置 TDengine TSDB-Enterprise 的连接信息，示例如下：

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

其中：

- auth-type: 认证方式，支持 UserPassword 和 Token 两种方式，默认为方式 UserPassword。
- url: 为 TDengine TSDB-Enterprise 中 taosAdapter 组件的 IP 地址和端口号，端口号默认为 6041。
- username 和 password: 为 TDengine TSDB-Enterprise 的用户名和密码，默认为 root 和 taosdata。
- explorer-url: taosExplorer 的访问地址，默认端口 6060。**如需远程访问 IDMP，必须将此地址配置为服务器的实际 IP 或域名**，否则浏览器将无法连接到 Explorer 服务。

:::info 完整配置参考

- 如需查看完整的 IDMP 配置文件说明，请参考：[TDengine IDMP 配置文件参考](/administration/installation/config-reference/)
- <GatewayBasePathConfig />

:::

完成以上配置后，就可以启动 TDengine IDMP 服务了。

## 14.3.2.4 启动

<Tabs>

<TabItem label="Linux 系统" value="linux">
安装完成后，您可以使用 `svc-tdengine-idmp` 命令来启动 TDengine IDMP 的服务进程。

```bash
sudo svc-tdengine-idmp start
```

您也可以用 `svc-tdengine-idmp` 的其他命令来查看服务状态、停止服务等操作，例如：

```bash
sudo svc-tdengine-idmp status # 查看服务状态
sudo svc-tdengine-idmp stop   # 停止服务
```

您还可以直接使用 `systemctl` 命令，手动管理各服务。安装后的服务名称如下：

- `tdengine-idmp-h2`
- `tdengine-idmp-backend`
- `tdengine-idmp-ui`
- `tdengine-idmp-chat`
- `tdengine-idmp-cls`

例如：

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

- 执行 `systemctl` 和 `svc-tdengine-idmp` 命令时，需要 _root_ 权限，对于非 _root_ 用户，请在命令前添加 `sudo`。
- 也可对单个组件操作，例如：`sudo svc-tdengine-idmp start backend`。

:::
</TabItem>

<TabItem label="macOS 系统" value="macos">
安装完成后，您可以使用 `svc-tdengine-idmp` 命令来启动 TDengine IDMP 的服务进程。

```bash
sudo svc-tdengine-idmp start
```

您也可以用 `svc-tdengine-idmp` 的其他命令来查看服务状态、停止服务等操作：

```bash
sudo svc-tdengine-idmp status
sudo svc-tdengine-idmp stop
```

如果想手动管理这些服务，可以使用以下命令。安装后的 LaunchDaemon 名称如下：

- `com.taosdata.tdengine-idmp-h2`
- `com.taosdata.tdengine-idmp-backend`
- `com.taosdata.tdengine-idmp-ui`
- `com.taosdata.tdengine-idmp-chat`

例如：

```bash
sudo launchctl start com.taosdata.tdengine-idmp-h2
sudo launchctl start com.taosdata.tdengine-idmp-backend
sudo launchctl start com.taosdata.tdengine-idmp-ui
sudo launchctl start com.taosdata.tdengine-idmp-chat

sudo launchctl list | grep tdengine-idmp
sudo launchctl print system/com.taosdata.tdengine-idmp-backend
```

:::info

- `launchctl` 命令管理上述服务需要管理员权限，务必在前面加 `sudo`。
- `sudo launchctl list | grep tdengine-idmp` 返回结果的第一列为对应进程 PID，若为 `-` 则说明该服务未运行。
- 如果服务异常，请查看系统日志 `launchd.log` 或者 `/usr/local/taos/idmp/logs` 目录下的日志，获取更多信息。

:::
</TabItem>

<TabItem label="Windows 系统" value="windows">
安装完成后，TDengine IDMP 的服务会自动注册为 Windows 服务，但默认不会自动启动。您可以使用以下命令启动服务。

**使用批处理脚本启动（推荐）：**

```batch
C:\TDengine\idmp\bin\start-tdengine-idmp.bat
```

**使用 Windows 服务管理器：**

1. 按 `Win + R`，输入 `services.msc` 打开服务管理器
2. 找到以下服务并依次启动：
   - `tdengine-idmp-h2`
   - `tdengine-idmp-chat`
   - `tdengine-idmp-cls`
   - `tdengine-idmp-backend`
   - `tdengine-idmp-ui`

**使用 sc 命令：**

```batch
sc.exe start tdengine-idmp-h2
sc.exe start tdengine-idmp-chat
sc.exe start tdengine-idmp-cls
sc.exe start tdengine-idmp-backend
sc.exe start tdengine-idmp-ui
```

**查看服务状态：**

```batch
sc.exe query tdengine-idmp-h2
sc.exe query tdengine-idmp-chat
sc.exe query tdengine-idmp-cls
sc.exe query tdengine-idmp-backend
sc.exe query tdengine-idmp-ui
```

**停止服务：**

```batch
C:\TDengine\idmp\bin\stop-tdengine-idmp.bat
```

或使用 sc 命令：

```batch
sc.exe stop tdengine-idmp-ui
sc.exe stop tdengine-idmp-backend
sc.exe stop tdengine-idmp-cls
sc.exe stop tdengine-idmp-chat
sc.exe stop tdengine-idmp-h2
```

:::info

- 执行批处理脚本时需要管理员权限。如果遇到权限问题，请右键点击脚本文件，选择"以管理员身份运行"。
- 如果服务异常，请查看 `C:\TDengine\log` 目录下的日志文件，或使用事件查看器查看 Windows 系统日志。

:::
</TabItem>

</Tabs>

默认情况下，TDengine IDMP 服务监听主机的以下端口：

- HTTP 访问：`http://localhost:6042` 或 `http://ip:6042`
- HTTPS 访问：`https://localhost:6034` 或 `https://ip:6034`

## 14.3.2.5 卸载

<Tabs>

<TabItem label="Linux/macOS 系统" value="unix">
可以通过如下命令卸载 TDengine IDMP 服务：

```bash
rmidmp -e yes
```

如果期望保留数据、日志和配置等，可以执行：

```bash
rmidmp -e no
```

如果是通过 **rpm** 方式安装（Linux 系统），请使用如下命令卸载：

```bash
rpm -e tdengine-idmp
```

如果是通过 **deb** 方式安装（Linux 系统），请使用如下命令卸载：

```bash
dpkg -r tdengine-idmp
```

</TabItem>

<TabItem label="Windows 系统" value="windows">
在 Windows 系统上卸载 TDengine IDMP：

直接双击运行 `C:\TDengine\idmp\unins000.exe`，按照卸载向导完成卸载。

</TabItem>

</Tabs>

## 14.3.2.6 升级说明

TDengine IDMP 推荐使用安装脚本进行升级。安装脚本会自动检测现有安装环境，并根据实际情况选择升级模式，确保用户数据和配置文件安全。具体说明如下：

- **升级模式自动检测：** 安装脚本会自动判断是否为升级安装。
- **数据与配置保护：** 在升级模式下，安装脚本不会覆盖或修改以下目录及其内容：

<Tabs>
<TabItem label="Linux/macOS" value="unix">

- `data/idmp`：用户数据目录
- `idmp/venv`：Python 虚拟环境
- `idmp/config`：配置文件目录
- `logs`：日志目录

</TabItem>
<TabItem label="Windows" value="windows">

- `data\idmp`：用户数据目录
- `idmp\venv`：Python 虚拟环境
- `idmp\config`：配置文件目录
- `logs`：日志目录

</TabItem>
</Tabs>

- **仅更新程序文件：** 升级时仅更新核心程序文件和依赖，确保新版本功能可用，用户数据和配置保持不变。
- **首次安装：** 如果是首次安装，则会完整初始化所有目录和文件。

:::info
建议始终通过官方安装脚本进行升级操作。如需手动备份数据和配置，可在升级前备份上述目录。升级完成后，建议检查服务状态和日志，确保升级成功。
:::
