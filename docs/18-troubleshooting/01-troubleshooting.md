---
title: 常见问题排查
sidebar_label: 常见问题排查
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 18.1 常见问题排查

## 18.1.1 确认问题

在使用 TDengine IDMP 的过程中，如果遇到问题，请先关闭浏览器的缓存，再刷新页面后重试。具体操作如下所示：

1. 打开浏览器的开发者工具。
2. 切换到**网络**标签页。
3. 勾选**停用缓存**选项。
4. 刷新页面，检查问题是否仍然存在。

如果问题仍然存在，请按照以下步骤，收集前后端的错误信息，以便于我们进行排查。

## 18.1.2 收集前端信息

### 18.1.2.1 收集控制台的错误信息

1. 打开浏览器的开发者工具。
2. 切换到**控制台**标签页。
3. 如果控制台中存在错误，请右键单击控制台中的错误，选择**另存为**将错误保存到文件中。

### 18.1.2.2 收集网络请求的信息

1. 打开浏览器的开发者工具。
2. 切换到**网络**标签页。
3. 如果存在失败的请求，请右键单击失败的请求（显示为红色），选择**复制**。将以下内容保存到文件中：
   - 请求头
   - 响应头
   - 响应体
   - 堆栈跟踪（如果可用）

## 18.1.3 收集后端日志

### 本地安装方式

如果您是通过本地安装方式部署的 TDengine IDMP，日志文件的位置因操作系统而异。请根据您的操作系统查看对应路径：

<Tabs>
<TabItem label="Linux / macOS" value="linux">

Linux / macOS 的日志目录默认为 `/var/log/taos`：

| 组件 | 日志文件路径 |
| --- | --- |
| TDengine IDMP 日志 | `/var/log/taos/tda.log` |
| TDengine IDMP 错误日志 | `/var/log/taos/tda-error.log` |
| TDengine IDMP AI 日志 | `/var/log/taos/idmp-ai.log` |
| TDengine IDMP AI 错误日志 | `/var/log/taos/idmp-ai-error.log` |
| TDengine TSDB-Enterprise 日志 | `/var/log/taos/taosdlog.*` |

</TabItem>
<TabItem label="Windows" value="windows">

Windows 的日志目录默认为 `C:\TDengine\log`：

| 组件 | 日志文件路径 |
| --- | --- |
| TDengine IDMP 日志 | `C:\TDengine\log\tda.log` |
| TDengine IDMP 错误日志 | `C:\TDengine\log\tda-error.log` |
| TDengine IDMP AI 日志 | `C:\TDengine\log\idmp-ai.log` |
| TDengine IDMP AI 错误日志 | `C:\TDengine\log\idmp-ai-error.log` |
| TDengine TSDB-Enterprise 日志 | `C:\TDengine\log\taosdlog.*` |

</TabItem>
</Tabs>

### 容器化部署方式

如果您是通过容器化方式部署的 TDengine IDMP，容器内部始终使用 Linux 路径（`/var/log/taos`），与宿主机操作系统无关。可以通过以下命令将日志文件从容器内复制到宿主机的当前目录（在 Windows 宿主机上同样适用，仅需将目标路径 `./` 替换为相应的 Windows 目录，例如 `C:\logs\`）：

```bash
docker cp tdengine-tsdb:/var/log/taos/taosdlog.* ./
docker cp tdengine-idmp:/var/log/taos/tda.log ./
docker cp tdengine-idmp:/var/log/taos/tda-error.log ./
docker cp tdengine-idmp:/var/log/taos/idmp-ai.log ./
docker cp tdengine-idmp:/var/log/taos/idmp-ai-error.log ./
```

## 18.1.4 Windows 环境路径过长问题

Windows 系统默认限制文件路径长度不能超过 260 个字符（`MAX_PATH`）。在 Windows 环境中，当元素层级过多时，生成的路径可能超过该限制，从而导致相关操作失败。可以通过以下任一方式开启 Windows 长路径支持来解决此问题（要求 Windows 10 1607 及以上版本，配置完成后需重启计算机生效）。

### 通过注册表开启

1. 按下 `Win + R`，输入 `regedit`，打开注册表编辑器。
2. 定位到 `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem`。
3. 将 `LongPathsEnabled` 的值设置为 `1`。如果该值不存在，请右键单击空白处，选择**新建 → DWORD (32 位) 值**创建。
4. 重启计算机使配置生效。

也可以以管理员身份运行 PowerShell，执行以下命令后重启计算机：

```powershell
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -Type DWord
```

### 通过组策略开启

1. 按下 `Win + R`，输入 `gpedit.msc`，打开本地组策略编辑器（仅 Windows 专业版/企业版支持）。
2. 依次展开**计算机配置 → 管理模板 → 系统 → 文件系统**。
3. 双击**启用 Win32 长路径**，选择**已启用**，然后单击**确定**。
4. 重启计算机使配置生效。

## 18.1.5 断网或无私有邮件时如何获取注册激活码

当环境无法连接外网、且没有可用的私有邮件服务器时，注册激活码无法通过邮件送达，但仍可在后端日志中取码完成首次激活。

1. 打开 IDMP，填写邮箱与组织名称，点击**获取验证码**。
2. 若弹出邮件服务器配置对话框且没有私有 SMTP，直接点**取消**即可（后端通常已生成验证码并写入日志）。
3. 在服务器日志中检索关键词 `register verify code for`，取冒号后的 6 位数字填回激活页后点击**激活**。请核对日志中的邮箱与页面填写一致，并优先使用最新一条（有效期约 10 分钟）。

更精确时可分别搜索：

- `Sending register verify code for`：触发发送注册邮件时
- `Generated register verify code for debug`：断网或默认 SMTP 不可用时（最常见）

Docker 示例（容器名常见 `tdengine-idmp`）：

```bash
docker exec -it tdengine-idmp sh -c \
  'grep -n "register verify code for" /var/log/taos/tda.log | tail -10'
```

日志路径见上文 [收集后端日志](#1813-收集后端日志)。若主路径无文件，可再试容器内 `/app/logs/tda.log`。

:::note
激活后的手机验证码步骤（中文界面）若因断网收不到短信，可在日志中检索 `phone verification code` 取码。更完整的邮件链路排查见 [第 18.2 节](./02-email.md)。
:::

## 18.1.6 提交问题

我们使用 [GitHub Issues](https://github.com/taosdata/tdengine-idmp-docs/issues/new/choose) 来跟踪和管理问题。请按照 GitHub Issues 的模板，提交以上收集到的信息，我们的支持团队会尽快回复并帮助您解决问题。
