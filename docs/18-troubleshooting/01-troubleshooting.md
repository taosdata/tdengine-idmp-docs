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

排查问题时，应同时收集故障时间段的应用日志、服务启动日志和安装日志。错误日志仅包含部分错误事件，不能替代主日志中的上下文。以下为安装包的默认位置；实际位置以安装后的配置和服务启动参数为准。日志按需生成，文件不存在不一定表示日志被删除。

### 18.1.3.1 本地安装方式

应用日志与服务启动日志的用途不同。服务未能启动时，应用日志可能尚未生成，应先检查服务包装器输出或系统服务日志。

<Tabs>
<TabItem label="Linux / macOS" value="linux">

常规日志目录默认为 `/var/log/taos`。Linux 的 CLS 使用独立目录，不属于该目录。

| 组件 | 默认日志文件 | 排查用途 |
| --- | --- | --- |
| TDengine IDMP | `/var/log/taos/tda.log`、`tda-error.log` | 后端请求、业务处理及错误上下文 |
| TDengine IDMP AI | `/var/log/taos/ai-agent.log`、`ai-agent-error.log` | AI 请求、工具执行及错误上下文 |
| TDengine IDMP UI（Nginx） | `/var/log/taos/nginx-access.log`、`nginx-error.log` | HTTP 访问、反向代理及 Nginx 启动错误 |
| TDengine IDMP MCP | `/var/log/taos/mcp-tdengine-idmp_YYYYMMDD.log*` | MCP 进程请求及运行信息，后缀随轮转变化 |
| TDengine IDMP CLS（Linux） | `/var/log/taoscls/taoscls.log` | 授权服务运行信息；以 `cls/config/taoscls.toml` 的 `[log].file` 为准 |
| TDengine IDMP 服务输出（macOS） | `/var/log/taos/tdengine-idmp-<服务>-out.log`、`tdengine-idmp-<服务>-error.log` | 后端、AI、UI、H2 服务的标准输出和标准错误 |
| TDengine TSDB-Enterprise | `/var/log/taos/taosdlog.*` 等 | 关联数据库故障；由 TSDB 独立管理 |

Linux 使用 systemd 时，可查看服务状态和近期启动输出。例如 CLS 启动失败：

```bash
systemctl status tdengine-idmp-cls --no-pager -l
journalctl -u tdengine-idmp-cls --since '30 minutes ago' --no-pager
```

其他 IDMP 服务名包括 `tdengine-idmp-backend`、`tdengine-idmp-chat`、`tdengine-idmp-ui` 和 `tdengine-idmp-h2`。macOS 安装包不包含 CLS；应检查对应 launchd 输出文件。

</TabItem>
<TabItem label="Windows" value="windows">

应用日志及 WinSW 服务包装器日志默认位于 `C:\TDengine\log`。

| 组件 | 默认日志文件 | 排查用途 |
| --- | --- | --- |
| TDengine IDMP | `C:\TDengine\log\tda.log`、`tda-error.log` | 后端主日志及错误日志 |
| TDengine IDMP AI | `C:\TDengine\log\ai-agent.log`、`ai-agent-error.log` | AI 主日志及错误日志 |
| TDengine IDMP UI（Nginx） | `C:\TDengine\log\nginx-access.log`、`nginx-error.log` | HTTP 访问、代理及启动错误 |
| TDengine IDMP MCP | `C:\TDengine\log\mcp-tdengine-idmp_YYYYMMDD.log*` | MCP 进程日志，后缀随轮转变化 |
| TDengine IDMP CLS | `C:\TDengine\log\taoscls.log` | IDMP 安装包配置的授权服务日志 |
| TDengine IDMP 服务包装器（WinSW） | `C:\TDengine\log\tdengine-idmp-<服务>-srv.wrapper.log` | 服务启动、停止、进程退出及包装器错误 |
| TDengine IDMP 服务进程输出 | `C:\TDengine\log\tdengine-idmp-<服务>-srv.out.log`、`*.err.log` | 服务进程的标准输出和标准错误 |
| TDengine TSDB-Enterprise | `C:\TDengine\log\taosdlog.*` 等 | 关联数据库故障；由 TSDB 独立管理 |

文件名中的 `<服务>` 为 `backend`、`chat`、`cls`、`ui` 或 `h2`。例如 CLS 报错 `1067` 时，应同时收集 `taoscls.log`、`tdengine-idmp-cls-srv.wrapper.log` 以及存在的对应 `out.log`、`err.log` 和轮转文件。仅有退出码不能确定失败原因。

```powershell
Get-Service tdengine-idmp-cls
Get-Content 'C:\TDengine\log\tdengine-idmp-cls-srv.wrapper.log' -Tail 100
```

如果修改了安装目录，应检查实际服务 XML 中的 `<logpath>`、程序参数和 `cls/config/taoscls.toml`，不能直接套用默认路径。独立安装的 CLS 与 IDMP 内置 CLS 的路径可能不同。

</TabItem>
</Tabs>

### 18.1.3.2 自定义目录与轮转文件

日志路径应根据对应组件的配置确认，不能通过单个环境变量统一推断所有组件的路径。

| 组件 | 配置依据 |
| --- | --- |
| TDengine IDMP | 安装后配置中的 `tda.log-dir`；直接从源码运行时默认值为相对工作目录的 `./logs` |
| TDengine IDMP AI | 服务进程的 `IDMP_LOG_PATH`，指定目录后生成 `ai-agent.log` 和 `ai-agent-error.log`；目录不可写时会警告并降级到控制台输出 |
| TDengine IDMP MCP | `--log_path` / `IDMP_LOG_PATH`；由 TDengine IDMP 后端管理的 MCP 启动命令会传入后端日志目录 |
| TDengine IDMP UI（Nginx） | 实际加载的 Nginx 配置中的 `access_log`、`error_log`，以及启动参数 `-e` |
| TDengine IDMP CLS | 实际加载的 `cls/config/taoscls.toml` 中的 `[log].file` |
| TDengine IDMP 服务包装器（Windows） | 实际服务 XML 中的 `<logpath>` |

Linux / macOS 使用自定义安装目录时，安装脚本可将常规日志放到安装目录的 `log` 子目录；CLS 仍应单独检查配置。收集故障前后的主日志、错误日志和相关轮转文件，例如 TDengine IDMP 的 `tda.log.*` 和 TDengine IDMP AI 的 `ai-agent-*.log.gz`。保留压缩文件原样，不仅收集当前文件；MCP 的 `*_lock`、Nginx 的 `nginx.pid` 不是日志。

### 18.1.3.3 安装日志

组件运行日志不等于安装日志。Windows IDMP EXE 使用 Inno Setup，可用 `/LOG="完整文件路径"` 为本次安装指定日志文件；未指定固定位置时，不能假定安装日志位于 `C:\TDengine\log`。Linux 安装脚本的标准输出和标准错误应由调用方保存。

通过 Apex 安装时，安装命令输出及安装包证据由 Apex 管理，位于 Apex Home 下本次 `logs/<运行目录>/components/idmp/<节点>/`。IDMP 启动和运行日志仍使用上述组件目录；Apex 的失败诊断包受大小和采集范围限制，不能替代完整原始日志。

### 18.1.3.4 容器化部署方式

容器内部路径与宿主机操作系统无关。先通过 `docker ps -a` 和部署配置确认实际容器名称、挂载卷及日志配置，再收集容器输出和文件；容器无法启动时尤其需要检查 `docker logs`。

```bash
docker ps -a
docker logs --timestamps --tail 500 tdengine-idmp-backend > backend-container.log 2>&1
docker cp tdengine-idmp-backend:/var/log/taos/tda.log ./
docker cp tdengine-idmp-backend:/var/log/taos/tda-error.log ./
docker cp tdengine-idmp-ai:/var/log/taos/ai-agent.log ./
docker cp tdengine-idmp-ai:/var/log/taos/ai-agent-error.log ./
```

以上容器名称仅为示例。其他组件、CLS 和轮转文件应按实际部署复制；自定义配置可能改变容器内目录。

:::warning

分享日志前，应检查并脱敏密码、Token、验证码和业务敏感信息，同时保留故障时间、时区、组件版本及前后文。

:::

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
