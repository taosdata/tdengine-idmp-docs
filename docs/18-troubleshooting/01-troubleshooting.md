---
title: 常见问题排查
sidebar_label: 常见问题排查
---

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

如果您是通过本地安装方式部署的 TDengine IDMP，日志文件可以在以下位置找到：

| 组件 | 日志文件路径 |
| --- | --- |
| TDengine IDMP 日志 | `/var/log/taos/tda.log` |
| TDengine IDMP 错误日志 | `/var/log/taos/tda-error.log` |
| TDengine IDMP AI 日志 | `/var/log/taos/idmp-ai.log` |
| TDengine IDMP AI 错误日志 | `/var/log/taos/idmp-ai-error.log` |
| TDengine TSDB-Enterprise 日志 | `/var/log/taos/taosdlog.*` |

### 容器化部署方式

如果您是通过容器化方式部署的 TDengine IDMP，可以通过以下命令将日志文件从容器内复制到本地：

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

## 18.1.5 提交问题

我们使用 [GitHub Issues](https://github.com/taosdata/tdengine-idmp-docs/issues/new/choose) 来跟踪和管理问题。请按照 GitHub Issues 的模板，提交以上收集到的信息，我们的支持团队会尽快回复并帮助您解决问题。
