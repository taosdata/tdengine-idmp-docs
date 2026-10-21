---
title: 安装 Excel 插件
sidebar_label: 安装 Excel 插件
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 10.1 安装 Excel 插件

TDengine IDMP Excel 插件让您能够直接在 Microsoft Excel 中检索时序数据和元素属性，无需编写任何代码或 SQL。

## 10.1.1 前提条件

### HTTPS 要求

Excel 插件仅通过 **HTTPS** 连接 IDMP。默认端口为 **6034**。

IDMP 的 TLS 在前端 nginx 终结：客户端通过 HTTPS 访问前端，nginx 再以 HTTP 反向代理到后端。安装包和 Docker 镜像默认已提供该 HTTPS 入口。后端不启用 TLS，本机安装时 `application.yml` 中 `ssl-port` 为 `-1`、`ssl.enabled` 为 `false`。

安装完成后，确认客户端可以访问 `https://<服务器地址>:6034`。

**内置测试证书：** 安装包和镜像内置一个有效期为 3 个月的测试证书，绑定域名 `idmp.tdengine.net`。该证书仅适用于功能演示与测试，**生产环境决不能使用，否则有严重安全漏洞**。生产环境替换 HTTPS 证书的方法，参见[第 14 章 14.3.3「配置文件参考」的 TLS/HTTPS 证书配置](../14-administration/03-installation/03-config-reference.md#tlshttps-证书配置)。

更长有效期的自签名证书见 [Excel 插件证书配置](./02-certificate-configuration.md)。

如果使用内置测试证书，请在客户端机器的 hosts 文件中添加以下条目（将 IP 替换为您的实际服务器地址）：

```text
192.168.1.100  idmp.tdengine.net
```

hosts 文件位置：

- **Linux / macOS：** `/etc/hosts`
- **Windows：** `C:\Windows\System32\drivers\etc\hosts`

### 系统要求

| 要求           | 详情                                                   |
| -------------- | ------------------------------------------------------ |
| **Excel 版本** | Excel 2021 及更高版本（Windows 或 macOS）              |
| **权限**       | Windows 上需要管理员权限                               |
| **网络连接**   | 需要能够访问下载安装脚本并连接 IDMP 服务               |
| **Node.js**    | 启用日志记录时，Windows 上需要 Node.js 22.3 或更高版本 |

## 10.1.2 在线安装

<Tabs>
<TabItem value="macos" label="macOS">

打开终端并运行：

```bash
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s install --force-close --url https://idmp.tdengine.net:6034 --enable-logging
```

将 `https://idmp.tdengine.net:6034` 替换为您的实际 IDMP HTTPS 地址。

**参数说明：**

| 参数               | 说明                                           |
| ------------------ | ---------------------------------------------- |
| `--force-close`    | 安装期间强制关闭 Excel。运行前请保存工作内容。 |
| `--url`            | IDMP HTTPS 服务地址                            |
| `--enable-logging` | 启用安装和运行时日志记录                       |

日志文件位置：`~/Library/Containers/com.microsoft.Excel/Data/tdengine_eai.log`

:::warning
安装期间 Excel 将被强制关闭。运行命令前请保存所有已打开的工作簿。
:::

</TabItem>
<TabItem value="windows" label="Windows">

以**管理员身份**打开 PowerShell 并运行：

```powershell
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action Install -ForceCloseExcel -Url 'https://idmp.tdengine.net:6034' -EnableLogging"
```

将 `https://idmp.tdengine.net:6034` 替换为您的实际 IDMP HTTPS 地址。

**参数说明：**

| 参数               | 说明                                           |
| ------------------ | ---------------------------------------------- |
| `-Action Install`  | 执行安装                                       |
| `-ForceCloseExcel` | 安装期间强制关闭 Excel。运行前请保存工作内容。 |
| `-Url`             | IDMP HTTPS 服务地址                            |
| `-EnableLogging`   | 启用安装和运行时日志记录                       |

日志文件位置：`C:\Users\<your-username>\AppData\Roaming\Microsoft\AddIns\VueOfficeAddin\Logs\tdengine_eai.log`

:::warning
PowerShell 必须以管理员身份运行。安装期间 Excel 将被强制关闭。运行命令前请保存所有已打开的工作簿。
:::

</TabItem>
</Tabs>

## 10.1.3 离线安装

如果客户端无法访问外网，可在一台能联网的机器上下载安装文件，再拷贝到目标机器进行安装。

<Tabs>
<TabItem value="macos" label="macOS">

### 下载安装文件

| 文件           | 下载地址                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------- |
| `install.sh`   | [install.sh](https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh)     |
| `manifest.xml` | [manifest.xml](https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/manifest.xml) |

在能访问互联网的机器上下载文件（可保存到不同目录）。若目录不存在，请先创建：

```bash
mkdir -p ~/Downloads ~/manifest
curl -fsSL https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh -o ~/Downloads/install.sh
curl -fsSL https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/manifest.xml -o ~/manifest/manifest.xml
chmod +x ~/Downloads/install.sh
```

将下载的文件拷贝到目标 macOS 机器后，运行：

```bash
~/Downloads/install.sh install --force-close --url https://idmp.tdengine.net:6034 --manifest-dir ~/manifest --enable-logging
```

将 `https://idmp.tdengine.net:6034`、`~/Downloads/install.sh` 和 `~/manifest` 替换为您的实际 IDMP HTTPS 地址、安装脚本路径，以及包含 `manifest.xml` 的目录。

**参数说明：**

| 参数               | 说明                                                          |
| ------------------ | ------------------------------------------------------------- |
| `--manifest-dir`   | 包含 `manifest.xml` 的本地目录；指定后不再从网络下载 manifest |
| `--force-close`    | 安装期间强制关闭 Excel。运行前请保存工作内容。                |
| `--url`            | IDMP HTTPS 服务地址                                           |
| `--enable-logging` | 启用安装和运行时日志记录                                      |

:::warning
安装期间 Excel 将被强制关闭。运行命令前请保存所有已打开的工作簿。
:::

</TabItem>
<TabItem value="windows" label="Windows">

### 下载安装文件

| 文件           | 下载地址                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------- |
| `install.ps1`  | [install.ps1](https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1)   |
| `manifest.xml` | [manifest.xml](https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/manifest.xml) |

在能访问互联网的机器上下载文件（可保存到不同目录）。若目录不存在，请先创建：

```powershell
New-Item -ItemType Directory -Force -Path C:\Scripts, C:\manifest
Invoke-WebRequest -Uri https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1 -OutFile C:\Scripts\install.ps1
Invoke-WebRequest -Uri https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/manifest.xml -OutFile C:\manifest\manifest.xml
```

将下载的文件拷贝到目标 Windows 机器后，以**管理员身份**打开 PowerShell 并运行：

```powershell
C:\Scripts\install.ps1 -Action Install -ForceCloseExcel -Url 'https://idmp.tdengine.net:6034' -ManifestDir 'C:\manifest' -EnableLogging
```

将 `https://idmp.tdengine.net:6034`、`C:\Scripts\install.ps1` 和 `C:\manifest` 替换为您的实际 IDMP HTTPS 地址、安装脚本路径，以及包含 `manifest.xml` 的目录。

**参数说明：**

| 参数               | 说明                                                          |
| ------------------ | ------------------------------------------------------------- |
| `-ManifestDir`     | 包含 `manifest.xml` 的本地目录；指定后不再从网络下载 manifest |
| `-Action Install`  | 执行安装                                                      |
| `-ForceCloseExcel` | 安装期间强制关闭 Excel。运行前请保存工作内容。                |
| `-Url`             | IDMP HTTPS 服务地址                                           |
| `-EnableLogging`   | 启用安装和运行时日志记录                                      |

:::warning
PowerShell 必须以管理员身份运行。安装期间 Excel 将被强制关闭。运行命令前请保存所有已打开的工作簿。
:::

</TabItem>
</Tabs>

:::info
离线安装时，目标机器仍需能访问 IDMP HTTPS 服务。离线安装仅避免从外网下载安装脚本和 manifest 文件。
:::

## 10.1.4 启用和禁用日志记录

要单独切换日志记录状态（不重新安装）：

<Tabs>
<TabItem value="macos" label="macOS">

```bash
# 启用日志记录
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s enable-logging-only --force-close

# 禁用日志记录
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s disable-logging-only --force-close
```

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
# 启用日志记录
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action EnableLogging -ForceCloseExcel"

# 禁用日志记录
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action DisableLogging -ForceCloseExcel"
```

</TabItem>
</Tabs>

## 10.1.5 卸载

<Tabs>
<TabItem value="macos" label="macOS">

```bash
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s uninstall --force-close
```

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action Uninstall -ForceCloseExcel"
```

</TabItem>
</Tabs>

:::info
卸载时同样会强制关闭 Excel。运行卸载命令前请保存所有已打开的工作簿。
:::
