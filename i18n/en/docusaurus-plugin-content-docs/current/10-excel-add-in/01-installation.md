---
title: Installing the Excel Add-In
sidebar_label: Installing the Excel Add-In
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 10.1 Installing the Excel Add-In

The TDengine IDMP Excel Add-In allows you to retrieve time-series data and element attributes directly inside Microsoft Excel, without writing any code or SQL.

## 10.1.1 Prerequisites

### HTTPS Requirement

The Excel Add-In connects to IDMP over **HTTPS only**. Before installing, ensure that the IDMP HTTPS service is enabled and accessible (default port: **6034**).

To enable HTTPS, add the following to the IDMP configuration file (`application.yml`):

```yaml
quarkus:
  http:
    port: 6042
    ssl-port: 6034
    insecure-requests: enabled
    ssl:
      enabled: true
      certificate:
        files: /usr/local/taos/idmp/config/certbundle.pem
        key-files: /usr/local/taos/idmp/config/privkey.pem
```

**Built-in test certificate.** IDMP ships with a test certificate valid for 3 months, bound to the domain `idmp.tdengine.net`. This certificate is suitable for evaluation and testing. It is not recommended for production use. To configure a self-signed certificate with a longer validity period, see [Certificate Configuration](./02-certificate-configuration.md).

If you are using the built-in test certificate, add the following entry to the hosts file on the client machine (replace the IP with your actual server address):

```text
192.168.1.100  idmp.tdengine.net
```

Hosts file locations:

- **Linux / macOS:** `/etc/hosts`
- **Windows:** `C:\Windows\System32\drivers\etc\hosts`

### System Requirements

| Requirement | Details |
|---|---|
| **Excel version** | Excel 2016 or later (Windows or macOS) |
| **Permissions** | Administrator rights required on Windows |
| **Node.js** | Node.js 22.3 or later required on Windows if logging is enabled |

## 10.1.2 Installation

<Tabs>
<TabItem value="macos" label="macOS">

Open a terminal and run:

```bash
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s install --force-close --url https://idmp.tdengine.net:6034 --enable-logging
```

Replace `https://idmp.tdengine.net:6034` with your actual IDMP HTTPS address.

**Parameters:**

| Parameter | Description |
|---|---|
| `--force-close` | Force-closes Excel during installation. Save your work before running. |
| `--url` | The IDMP HTTPS service address |
| `--enable-logging` | Enables installation and runtime logging |

Log file location: `~/Library/Containers/com.microsoft.Excel/Data/tdengine_eai.log`

:::warning
Excel will be force-closed during installation. Save all open workbooks before running the command.
:::

</TabItem>
<TabItem value="windows" label="Windows">

Open PowerShell **as Administrator** and run:

```powershell
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action Install -ForceCloseExcel -Url 'https://idmp.tdengine.net:6034' -EnableLogging"
```

Replace `https://idmp.tdengine.net:6034` with your actual IDMP HTTPS address.

**Parameters:**

| Parameter | Description |
|---|---|
| `-Action Install` | Runs the installation |
| `-ForceCloseExcel` | Force-closes Excel during installation. Save your work before running. |
| `-Url` | The IDMP HTTPS service address |
| `-EnableLogging` | Enables installation and runtime logging |

Log file location: `C:\Users\<your-username>\AppData\Roaming\Microsoft\AddIns\VueOfficeAddin\Logs\tdengine_eai.log`

:::warning
PowerShell must be run as Administrator. Excel will be force-closed during installation. Save all open workbooks before running the command.
:::

</TabItem>
</Tabs>

## 10.1.3 Enabling and Disabling Logging

To toggle logging independently of installation:

<Tabs>
<TabItem value="macos" label="macOS">

```bash
# Enable logging
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s enable-logging-only --force-close

# Disable logging
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s disable-logging-only --force-close
```

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
# Enable logging
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action EnableLogging -ForceCloseExcel"

# Disable logging
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action DisableLogging -ForceCloseExcel"
```

</TabItem>
</Tabs>

## 10.1.4 Uninstallation

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
Uninstallation also force-closes Excel. Save all open workbooks before running the uninstall command.
:::
