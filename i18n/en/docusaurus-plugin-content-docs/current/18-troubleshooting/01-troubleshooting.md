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

### Local Installation

For a locally installed deployment, the location of the log files depends on the operating system. Refer to the paths for your OS below:

<Tabs>
<TabItem label="Linux / macOS" value="linux">

On Linux / macOS, the default log directory is `/var/log/taos`:

| Component | Log File Path |
| --- | --- |
| TDengine IDMP | `/var/log/taos/tda.log` |
| TDengine IDMP error log | `/var/log/taos/tda-error.log` |
| TDengine IDMP AI | `/var/log/taos/ai-agent.log` |
| TDengine IDMP AI error log | `/var/log/taos/ai-agent-error.log` |
| TDengine TSDB-Enterprise | `/var/log/taos/taosdlog.*` |

</TabItem>
<TabItem label="Windows" value="windows">

On Windows, the default log directory is `C:\TDengine\log`:

| Component | Log File Path |
| --- | --- |
| TDengine IDMP | `C:\TDengine\log\tda.log` |
| TDengine IDMP error log | `C:\TDengine\log\tda-error.log` |
| TDengine IDMP AI | `C:\TDengine\log\ai-agent.log` |
| TDengine IDMP AI error log | `C:\TDengine\log\ai-agent-error.log` |
| TDengine TSDB-Enterprise | `C:\TDengine\log\taosdlog.*` |

</TabItem>
</Tabs>

### Docker Deployment

For a Docker-based deployment, the paths inside the container are always Linux paths (`/var/log/taos`), regardless of the host operating system. Copy the log files out of the containers to the current directory on the host using the following commands (these also work on a Windows host; just replace the destination `./` with a Windows directory such as `C:\logs\`):

```bash
for f in $(docker exec tdengine-tsdb ls /var/log/taos/taosdlog.* 2>/dev/null); do
    docker cp tdengine-tsdb:$f .
done
docker cp tdengine-idmp-backend:/var/log/taos/tda.log ./
docker cp tdengine-idmp-backend:/var/log/taos/tda-error.log ./
docker cp tdengine-idmp-ai:/var/log/taos/ai-agent.log ./
docker cp tdengine-idmp-ai:/var/log/taos/ai-agent-error.log ./
```

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
