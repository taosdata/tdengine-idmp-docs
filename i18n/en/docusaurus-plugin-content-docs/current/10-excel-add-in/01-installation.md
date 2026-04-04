---
title: Installing the Excel Add-In
sidebar_label: Installing the Excel Add-In
---

# 10.1 Installing the Excel Add-In

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The TDengine IDMP Excel Add-In allows you to retrieve time-series data and element attributes directly inside Microsoft Excel, without writing any code or SQL.

## 10.1.1 Prerequisites

### 10.1.1.1 HTTPS Requirement

The Excel Add-In connects to IDMP over **HTTPS only**. Before installing, ensure that the IDMP HTTPS service is enabled and accessible (default port: **6034**).

To enable HTTPS, add the following to the IDMP configuration file (`application.yml`):

```yaml
quarkus:
  http:
    port: 6042          # IDMP HTTP service port
    ssl-port: 6034      # IDMP HTTPS service port
    insecure-requests: enabled  # Allow HTTP and HTTPS to work simultaneously
    ssl:
      enabled: true     # Enable SSL/HTTPS
      certificate:
        files: /usr/local/taos/idmp/config/certbundle.pem   # Certificate file path
        key-files: /usr/local/taos/idmp/config/privkey.pem  # Private key file path
```

:::info Full Configuration Reference

For the complete IDMP configuration file documentation, see [Configuration File Reference](../14-administration/03-installation/06-config-reference.md).

:::

**Built-in test certificate.** IDMP ships with a test certificate valid for 3 months, bound to the domain `idmp.tdengine.net`. This certificate is suitable for evaluation and testing. It is not recommended for production use.

If you are using the built-in test certificate, add the following entry to the hosts file on the client machine (replace the IP with your actual server address):

```text
192.168.1.100  idmp.tdengine.net
```

Hosts file locations:

- **Linux / macOS:** `/etc/hosts`
- **Windows:** `C:\Windows\System32\drivers\etc\hosts`

### 10.1.1.2 System Requirements

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Requirement</th><th>Details</th></tr></thead>
<tbody>
<tr><td><strong>Excel version</strong></td><td>Excel 2016 or later (Windows or macOS)</td></tr>
<tr><td><strong>Permissions</strong></td><td>Administrator rights required on Windows</td></tr>
<tr><td><strong>Network</strong></td><td>Requires access to download the installation script and connect to the IDMP service</td></tr>
<tr><td><strong>Node.js</strong></td><td>Node.js 22.3 or later required on Windows if logging is enabled</td></tr>
</tbody>
</table>

## 10.1.2 Installation

<Tabs>
<TabItem value="macos" label="macOS">

Open a terminal and run:

```bash
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s install --force-close --url https://idmp.tdengine.net:6034 --enable-logging
```

Replace `https://idmp.tdengine.net:6034` with your actual IDMP HTTPS address.

**Parameters:**

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>Parameter</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>--force-close</code></td><td>Force-closes Excel during installation. Save your work before running.</td></tr>
<tr><td><code>--url</code></td><td>The IDMP HTTPS service address</td></tr>
<tr><td><code>--enable-logging</code></td><td>Enables installation and runtime logging</td></tr>
</tbody>
</table>

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

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>Parameter</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>-Action Install</code></td><td>Runs the installation</td></tr>
<tr><td><code>-ForceCloseExcel</code></td><td>Force-closes Excel during installation. Save your work before running.</td></tr>
<tr><td><code>-Url</code></td><td>The IDMP HTTPS service address</td></tr>
<tr><td><code>-EnableLogging</code></td><td>Enables installation and runtime logging</td></tr>
</tbody>
</table>

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
