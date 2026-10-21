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

The Excel Add-In connects to IDMP over **HTTPS only**. The default port is **6034**.

IDMP terminates TLS at the frontend nginx. Clients reach nginx over HTTPS, and nginx reverse-proxies to the backend over HTTP. The installation package and Docker images already expose this HTTPS endpoint. The backend does not enable TLS. On a native install, `application.yml` keeps `ssl-port: -1` and `ssl.enabled: false`.

After installation, confirm that clients can open `https://<server-address>:6034`.

**Built-in test certificate.** The package and images include a test certificate valid for 3 months and bound to `idmp.tdengine.net`. This certificate is intended solely for demonstration and testing. **Under no circumstances shall it be deployed in production environments; otherwise, severe security vulnerabilities may arise.** For how to replace the HTTPS certificate in production, see [Chapter 14, section 14.3.3 Configuration File Reference: TLS/HTTPS Certificate Configuration](../14-administration/03-installation/03-config-reference.md#tlshttps-certificate-configuration).

For a self-signed certificate with a longer validity period, see [Certificate Configuration](./02-certificate-configuration.md).

If you are using the built-in test certificate, add the following entry to the hosts file on the client machine (replace the IP with your actual server address):

```text
192.168.1.100  idmp.tdengine.net
```

Hosts file locations:

- **Linux / macOS:** `/etc/hosts`
- **Windows:** `C:\Windows\System32\drivers\etc\hosts`

### System Requirements

| Requirement       | Details                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| **Excel version** | Excel 2021 or later (Windows or macOS)                                                         |
| **Permissions**   | Administrator rights required on Windows                                                       |
| **Network**       | Network access is required to download the installation script and connect to the IDMP service |
| **Node.js**       | Node.js 22.3 or later required on Windows if logging is enabled                                |

## 10.1.2 Online Installation

<Tabs>
<TabItem value="macos" label="macOS">

Open a terminal and run:

```bash
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s install --force-close --url https://idmp.tdengine.net:6034 --enable-logging
```

Replace `https://idmp.tdengine.net:6034` with your actual IDMP HTTPS address.

**Parameters:**

| Parameter          | Description                                                            |
| ------------------ | ---------------------------------------------------------------------- |
| `--force-close`    | Force-closes Excel during installation. Save your work before running. |
| `--url`            | The IDMP HTTPS service address                                         |
| `--enable-logging` | Enables installation and runtime logging                               |

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

| Parameter          | Description                                                            |
| ------------------ | ---------------------------------------------------------------------- |
| `-Action Install`  | Runs the installation                                                  |
| `-ForceCloseExcel` | Force-closes Excel during installation. Save your work before running. |
| `-Url`             | The IDMP HTTPS service address                                         |
| `-EnableLogging`   | Enables installation and runtime logging                               |

Log file location: `C:\Users\<your-username>\AppData\Roaming\Microsoft\AddIns\VueOfficeAddin\Logs\tdengine_eai.log`

:::warning
PowerShell must be run as Administrator. Excel will be force-closed during installation. Save all open workbooks before running the command.
:::

</TabItem>
</Tabs>

## 10.1.3 Offline Installation

If the client machine cannot access the public internet, download the installation files on a machine with network access, then copy them to the target machine for installation.

<Tabs>
<TabItem value="macos" label="macOS">

### Download Installation Files

| File           | Download URL                                                                                    |
| -------------- | ----------------------------------------------------------------------------------------------- |
| `install.sh`   | [install.sh](https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh)     |
| `manifest.xml` | [manifest.xml](https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/manifest.xml) |

On a machine with internet access, download the files (they can be saved to different directories). Create the directories first if they do not exist:

```bash
mkdir -p ~/Downloads ~/manifest
curl -fsSL https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh -o ~/Downloads/install.sh
curl -fsSL https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/manifest.xml -o ~/manifest/manifest.xml
chmod +x ~/Downloads/install.sh
```

Copy the downloaded files to the target macOS machine, then run:

```bash
~/Downloads/install.sh install --force-close --url https://idmp.tdengine.net:6034 --manifest-dir ~/manifest --enable-logging
```

Replace `https://idmp.tdengine.net:6034`, `~/Downloads/install.sh`, and `~/manifest` with your actual IDMP HTTPS address, install script path, and the directory containing `manifest.xml`.

**Parameters:**

| Parameter          | Description                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `--manifest-dir`   | Local directory containing `manifest.xml`; when set, the manifest is not downloaded from the network |
| `--force-close`    | Force-closes Excel during installation. Save your work before running.                               |
| `--url`            | The IDMP HTTPS service address                                                                       |
| `--enable-logging` | Enables installation and runtime logging                                                             |

:::warning
Excel will be force-closed during installation. Save all open workbooks before running the command.
:::

</TabItem>
<TabItem value="windows" label="Windows">

### Download Installation Files

| File           | Download URL                                                                                    |
| -------------- | ----------------------------------------------------------------------------------------------- |
| `install.ps1`  | [install.ps1](https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1)   |
| `manifest.xml` | [manifest.xml](https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/manifest.xml) |

On a machine with internet access, download the files (they can be saved to different directories). Create the directories first if they do not exist:

```powershell
New-Item -ItemType Directory -Force -Path C:\Scripts, C:\manifest
Invoke-WebRequest -Uri https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1 -OutFile C:\Scripts\install.ps1
Invoke-WebRequest -Uri https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/manifest.xml -OutFile C:\manifest\manifest.xml
```

Copy the downloaded files to the target Windows machine, then open PowerShell **as Administrator** and run:

```powershell
C:\Scripts\install.ps1 -Action Install -ForceCloseExcel -Url 'https://idmp.tdengine.net:6034' -ManifestDir 'C:\manifest' -EnableLogging
```

Replace `https://idmp.tdengine.net:6034`, `C:\Scripts\install.ps1`, and `C:\manifest` with your actual IDMP HTTPS address, install script path, and the directory containing `manifest.xml`.

**Parameters:**

| Parameter          | Description                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `-ManifestDir`     | Local directory containing `manifest.xml`; when set, the manifest is not downloaded from the network |
| `-Action Install`  | Runs the installation                                                                                |
| `-ForceCloseExcel` | Force-closes Excel during installation. Save your work before running.                               |
| `-Url`             | The IDMP HTTPS service address                                                                       |
| `-EnableLogging`   | Enables installation and runtime logging                                                             |

:::warning
PowerShell must be run as Administrator. Excel will be force-closed during installation. Save all open workbooks before running the command.
:::

</TabItem>
</Tabs>

:::info
During offline installation, the target machine must still be able to reach the IDMP HTTPS service. Offline installation only avoids downloading the install script and manifest from the public internet.
:::

## 10.1.4 Enabling and Disabling Logging

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

## 10.1.5 Uninstallation

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
