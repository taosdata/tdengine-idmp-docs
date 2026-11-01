---
title: Common Troubleshooting
sidebar_label: Common Troubleshooting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 18.1 Common Troubleshooting

## 18.1.1 Confirming the Problem

If you encounter an issue while using TDengine IDMP, start by disabling the browser cache and reloading the page:

1. Open your browser's developer tools.
2. Switch to the **Network** tab.
3. Check **Disable cache**.
4. Reload the page and check whether the problem persists.

If the problem persists, follow the steps below to collect frontend and backend diagnostic information before submitting a report.

## 18.1.2 Collecting Frontend Information

### 18.1.2.1 Console Errors

1. Open your browser's developer tools.
2. Switch to the **Console** tab.
3. If errors are present, right-click any error entry and choose **Save as** to save the console output to a file.

### 18.1.2.2 Network Request Failures

1. Open your browser's developer tools.
2. Switch to the **Network** tab.
3. Identify any failed requests (shown in red).
4. Right-click a failed request and choose **Copy**. Save the following to a file:
   - Request headers
   - Response headers
   - Response body
   - Stack trace (if available)

## 18.1.3 Collecting Backend Logs

Collect application logs, service startup logs, and installation logs for the failure window. Error-only logs do not replace the context in the main log. The paths below are package defaults; installed configuration and process arguments determine the actual locations. Files are created as needed, so a missing file does not necessarily mean it was deleted.

### 18.1.3.1 Local Installation

Application logs and service startup logs serve different purposes. If a service fails before application logging starts, check the service wrapper output or system service journal first.

<Tabs>
<TabItem label="Linux / macOS" value="linux">

The usual log directory is `/var/log/taos`. CLS on Linux uses a separate directory.

| Component | Default log files | Purpose |
| --- | --- | --- |
| TDengine IDMP | `/var/log/taos/tda.log`, `tda-error.log` | Backend requests, processing context, and errors |
| TDengine IDMP AI | `/var/log/taos/ai-agent.log`, `ai-agent-error.log` | AI requests, tool execution, and errors |
| TDengine IDMP UI (Nginx) | `/var/log/taos/nginx-access.log`, `nginx-error.log` | HTTP access, proxy errors, and Nginx startup failures |
| TDengine IDMP MCP | `/var/log/taos/mcp-tdengine-idmp_YYYYMMDD.log*` | MCP requests and process logs; suffixes vary with rotation |
| TDengine IDMP CLS (Linux) | `/var/log/taoscls/taoscls.log` | License service logs; confirm `[log].file` in `cls/config/taoscls.toml` |
| TDengine IDMP service output (macOS) | `/var/log/taos/tdengine-idmp-<service>-out.log`, `tdengine-idmp-<service>-error.log` | Standard output and error for Backend, Chat, UI, and H2 |
| TDengine TSDB-Enterprise | `/var/log/taos/taosdlog.*` and other TSDB logs | Related database failures; managed independently by TSDB |

On Linux with systemd, inspect the service status and recent startup output. For example, when CLS fails to start:

```bash
systemctl status tdengine-idmp-cls --no-pager -l
journalctl -u tdengine-idmp-cls --since '30 minutes ago' --no-pager
```

Other IDMP services include `tdengine-idmp-backend`, `tdengine-idmp-chat`, `tdengine-idmp-ui`, and `tdengine-idmp-h2`. The macOS package does not include CLS; check the corresponding launchd output files.

</TabItem>
<TabItem label="Windows" value="windows">

Application logs and WinSW service wrapper logs default to `C:\TDengine\log`.

| Component | Default log files | Purpose |
| --- | --- | --- |
| TDengine IDMP | `C:\TDengine\log\tda.log`, `tda-error.log` | Backend main and error logs |
| TDengine IDMP AI | `C:\TDengine\log\ai-agent.log`, `ai-agent-error.log` | AI main and error logs |
| TDengine IDMP UI (Nginx) | `C:\TDengine\log\nginx-access.log`, `nginx-error.log` | HTTP access, proxy, and startup errors |
| TDengine IDMP MCP | `C:\TDengine\log\mcp-tdengine-idmp_YYYYMMDD.log*` | MCP process logs; suffixes vary with rotation |
| TDengine IDMP CLS | `C:\TDengine\log\taoscls.log` | License service log configured by the IDMP package |
| TDengine IDMP service wrapper (WinSW) | `C:\TDengine\log\tdengine-idmp-<service>-srv.wrapper.log` | Service lifecycle, process exits, and wrapper errors |
| TDengine IDMP service process output | `C:\TDengine\log\tdengine-idmp-<service>-srv.out.log`, `*.err.log` | Standard output and error from the service process |
| TDengine TSDB-Enterprise | `C:\TDengine\log\taosdlog.*` and other TSDB logs | Related database failures; managed independently by TSDB |

Replace `<service>` with `backend`, `chat`, `cls`, `ui`, or `h2`. For a CLS failure with exit code `1067`, collect `taoscls.log`, `tdengine-idmp-cls-srv.wrapper.log`, any corresponding `out.log` and `err.log`, and relevant rotated files. The exit code alone does not identify the cause.

```powershell
Get-Service tdengine-idmp-cls
Get-Content 'C:\TDengine\log\tdengine-idmp-cls-srv.wrapper.log' -Tail 100
```

For a custom installation directory, inspect `<logpath>` in the installed service XML, process arguments, and `cls/config/taoscls.toml` instead of assuming the default paths. Standalone CLS installations can use different paths from the CLS bundled with IDMP.

</TabItem>
</Tabs>

### 18.1.3.2 Custom Paths and Rotated Files

Check each component's effective configuration. A single environment variable does not determine every component's log directory.

| Component | Configuration source |
| --- | --- |
| TDengine IDMP | `tda.log-dir` in the installed configuration; source-based launches default to `./logs` relative to the working directory |
| TDengine IDMP AI | `IDMP_LOG_PATH` in the service process environment; creates `ai-agent.log` and `ai-agent-error.log`; an unwritable directory causes a warning and console-only logging |
| TDengine IDMP MCP | `--log_path` / `IDMP_LOG_PATH`; Backend-managed MCP processes receive the Backend log directory as a command argument |
| TDengine IDMP UI (Nginx) | `access_log` and `error_log` in the loaded Nginx configuration, plus the `-e` startup argument |
| TDengine IDMP CLS | `[log].file` in the loaded `cls/config/taoscls.toml` |
| TDengine IDMP service wrapper (Windows) | `<logpath>` in the installed service XML |

For a custom Linux or macOS installation, the installer can place regular logs in the installation directory's `log` subdirectory; check CLS configuration separately. Collect main logs, error logs, and rotated files around the failure, such as Backend `tda.log.*` and AI `ai-agent-*.log.gz`. Keep compressed files intact rather than collecting only the current file. MCP `*_lock` files and Nginx `nginx.pid` are not logs.

### 18.1.3.3 Installation Logs

Runtime logs are separate from installation logs. The Windows IDMP EXE uses Inno Setup and accepts `/LOG="full file path"` to select an installation log. Without an explicit path, do not assume it is under `C:\TDengine\log`. The caller must capture standard output and error from the Linux installer script.

When installing through Apex, Apex manages installation command output and package evidence under `logs/<run directory>/components/idmp/<node>/` in Apex Home. IDMP startup and runtime logs remain in the component directories above. Apex failure bundles have size and collection limits and do not replace the complete original logs.

### 18.1.3.4 Docker Deployment

Container paths are independent of the host operating system. Use `docker ps -a` and deployment configuration to confirm container names, volume mounts, and log settings before collecting output and files. Check `docker logs` when a container cannot start.

```bash
docker ps -a
docker logs --timestamps --tail 500 tdengine-idmp-backend > backend-container.log 2>&1
docker cp tdengine-idmp-backend:/var/log/taos/tda.log ./
docker cp tdengine-idmp-backend:/var/log/taos/tda-error.log ./
docker cp tdengine-idmp-ai:/var/log/taos/ai-agent.log ./
docker cp tdengine-idmp-ai:/var/log/taos/ai-agent-error.log ./
```

These container names are examples. Copy other component logs, CLS logs, and rotated files according to the actual deployment. Custom configuration can change the paths inside a container.

:::warning

Before sharing logs, redact passwords, tokens, verification codes, and sensitive business data. Preserve the failure time, time zone, component versions, and surrounding context.

:::

## 18.1.4 Path Too Long on Windows

By default, Windows limits file paths to 260 characters (`MAX_PATH`). In a Windows environment, if the element hierarchy contains too many levels, the resulting paths may exceed this limit and cause related operations to fail. Enable long path support in Windows using either of the following methods (requires Windows 10 version 1607 or later; a restart is required for the change to take effect).

### Via the Registry

1. Press `Win + R`, type `regedit`, and open the Registry Editor.
2. Navigate to `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem`.
3. Set the value of `LongPathsEnabled` to `1`. If the value does not exist, right-click the blank area and choose **New → DWORD (32-bit) Value** to create it.
4. Restart the computer for the change to take effect.

Alternatively, run PowerShell as administrator, execute the following command, and restart the computer:

```powershell
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -Type DWord
```

### Via Group Policy

1. Press `Win + R`, type `gpedit.msc`, and open the Local Group Policy Editor (available on Windows Pro/Enterprise editions only).
2. Navigate to **Computer Configuration → Administrative Templates → System → Filesystem**.
3. Double-click **Enable Win32 long paths**, select **Enabled**, and click **OK**.
4. Restart the computer for the change to take effect.

## 18.1.5 Retrieving the Registration Code Offline or Without a Private Mail Server

If the environment cannot reach the public internet and no private mail server is available, the registration activation code cannot be delivered by email. You can still complete first-time activation by reading the code from the backend log.

1. Open IDMP, enter the email and organization name, then click **Get verification code**.
2. If the mail server configuration dialog appears and you have no private SMTP, click **Cancel**. The backend has usually already generated the code and written it to the log.
3. Search the server log for `register verify code for`, enter the 6 digits after the colon on the activation page, then click **Activate**. Confirm that the email in the log matches the form, and prefer the newest line (codes are valid for about 10 minutes).

More specific keywords:

- `Sending register verify code for`: when the registration email send path runs
- `Generated register verify code for debug`: offline or default SMTP unavailable (most common)

Docker example (container name is often `tdengine-idmp`):

```bash
docker exec -it tdengine-idmp sh -c \
  'grep -n "register verify code for" /var/log/taos/tda.log | tail -10'
```

Log paths are listed in [Collecting Backend Logs](#1813-collecting-backend-logs). If the default file is missing, also try `/app/logs/tda.log` inside the container.

:::note
If the phone verification step on the Chinese activation page cannot receive SMS offline, search the logs for `phone verification code`. For fuller email delivery troubleshooting, see [Section 18.2](./02-email.md).
:::

## 18.1.6 Submitting an Issue

TDengine uses [GitHub Issues](https://github.com/taosdata/tdengine-idmp-docs/issues/new/choose) to track and manage bug reports and support requests. Follow the issue template and attach the information collected above. The support team will respond as soon as possible.
