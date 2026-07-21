---
title: Common Troubleshooting
sidebar_label: Common Troubleshooting
---

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

For a locally installed deployment, log files are located at the following paths:

| Component | Log File Path |
| --- | --- |
| TDengine IDMP | `/var/log/taos/idmp.log` |
| TDengine IDMP error log | `/var/log/taos/idmp-error.log` |
| TDengine IDMP AI | `/var/log/taos/idmp-ai.log` |
| TDengine IDMP AI error log | `/var/log/taos/idmp-ai-error.log` |
| TDengine TSDB-Enterprise | `/var/log/taos/taosdlog.*` |

### Docker Deployment

For a Docker-based deployment, copy the log files out of the containers using the following commands:

```bash
docker cp tdengine-tsdb:/var/log/taos/taosdlog.* ./
docker cp tdengine-idmp:/var/log/taos/idmp.log ./
docker cp tdengine-idmp:/var/log/taos/idmp-error.log ./
docker cp tdengine-idmp:/var/log/taos/idmp-ai.log ./
docker cp tdengine-idmp:/var/log/taos/idmp-ai-error.log ./
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

## 18.1.5 Submitting an Issue

TDengine uses [GitHub Issues](https://github.com/taosdata/tdengine-idmp-docs/issues/new/choose) to track and manage bug reports and support requests. Follow the issue template and attach the information collected above. The support team will respond as soon as possible.
