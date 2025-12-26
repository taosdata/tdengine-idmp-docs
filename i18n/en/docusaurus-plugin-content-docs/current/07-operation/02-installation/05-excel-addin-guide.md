---
title: Excel Add-in Deployment
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# TDengine Excel Add-in

This document provides detailed instructions for installing and uninstalling the TDengine Excel Add-in component.

## Prerequisites

Before installing the Excel Add-in, please ensure the following conditions are met:

### 1. HTTPS Service Configuration

The Excel Add-in **must use HTTPS connection** to the IDMP service. Please ensure that IDMP's HTTPS service is properly configured and running (default port 6034).

#### Configure HTTPS Service

Enable HTTPS in the IDMP configuration file (`application.yml`):

```yaml
quarkus:
  http:
    port: 6042 # IDMP HTTP service port
    ssl-port: 6034 # IDMP HTTPS service port
    insecure-requests: enabled # Allow both HTTP and HTTPS to work simultaneously
    ssl:
      enabled: true # Enable SSL/HTTPS
      certificate:
        files: /usr/local/taos/idmp/config/certbundle.pem # Certificate file path
        key-files: /usr/local/taos/idmp/config/privkey.pem # Private key file path
```

#### Built-in Test Certificate

IDMP installation package includes a built-in test certificate valid for 3 months:
- **Certificate domain binding**: `idmp.tdengine.net`
- **Applicable scenarios**: Function demonstration, testing, etc.
- **Limitations**: **Not recommended for production environments**

#### Domain Name Resolution Configuration

If using the built-in test certificate, you need to add domain name resolution in the client's hosts file:

```text
192.168.1.100  idmp.tdengine.net  # Replace with your actual server IP
```

**Hosts file locations**:
- **Linux/macOS**: `/etc/hosts`
- **Windows**: `C:\Windows\System32\drivers\etc\hosts`

:::info Complete Configuration Reference

For complete IDMP configuration file documentation, please refer to: [TDengine IDMP Configuration File Reference](/operation/installation/config-reference/)

:::

### 2. System Environment Requirements

1. **Administrator Privileges**: Windows platform requires administrator privileges to execute installation commands
2. **Excel Version**: Supports Excel 2016 and above (Windows/macOS)
3. **Network Connection**: Requires access to download installation scripts and connect to IDMP service

## Installation Guide

<Tabs>
  <TabItem label="macOS" value="macOS">

Execute the following command in the terminal to install:

```bash
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s install --force-close --url https://localhost:6034 --enable-logging
```

**Parameter Description:**
- `--force-close`: Excel application will be forcibly closed during installation, please save your work content in advance
- `--url`: Specify IDMP HTTPS service address, **please replace with your actual service address**
- `--enable-logging`: Enables installation and add-in operation logging to help troubleshoot issues.  
  Log file save path:  `~/Library/Containers/com.microsoft.Excel/Data/tdengine_eai.log`

You can also enable or disable logging separately:

- **Enable logging:**
  ```bash
  curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s enable-logging-only --force-close
  ```

- **Disable logging:**
  ```bash
  curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s disable-logging-only --force-close
  ```

:::warning Important Notes

- Excel will be forcibly closed during installation, please save all your work content in advance
- If using a custom certificate domain, replace `https://localhost:6034` with "certificate bound domain:port"
- For example: `https://idmp.tdengine.net:6034`

:::

  </TabItem>
  <TabItem label="Windows" value="Windows">

Open PowerShell **as Administrator** and execute the following command:

```powershell
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action Install -ForceCloseExcel -Url 'https://localhost:6034' -EnableLogging"
```

**Parameter Description:**
- `-Action Install`: Execute installation operation
- `-ForceCloseExcel`: Forcibly close Excel application
- `-Url`: Specify IDMP HTTPS service address, **please replace with your actual service address**
- `-EnableLogging`: Enables installation and add-in operation logging to help troubleshoot issues.  
  Log file save path:
`C:\Users\<YourUsername>\AppData\Roaming\Microsoft\AddIns\VueOfficeAddin\Logs\tdengine_eai.log`

You can also enable or disable logging separately:

- **Enable logging:**
  ```bash
  powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action EnableLogging -ForceCloseExcel"
  ```

- **Disable logging:**
  ```bash
  powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action DisableLogging -ForceCloseExcel"
  ```

:::warning Important Notes

- Must run PowerShell as Administrator
- Excel will be forcibly closed during installation, please save all your work content in advance
- If using a custom certificate domain, replace `https://localhost:6034` with "certificate bound domain:port"
- For example: `https://idmp.tdengine.net:6034`

:::

  </TabItem>
</Tabs>

## Uninstallation Guide

<Tabs>
  <TabItem label="macOS" value="macOS">

Execute the following command in the terminal to uninstall:

```bash
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s uninstall --force-close
```

:::info Uninstallation Notes

- The uninstallation process will also forcibly close Excel, please save your work content in advance
- After uninstallation is complete, all Excel Add-in related functions will be completely removed

:::

  </TabItem>
  <TabItem label="Windows" value="Windows">

Open PowerShell **as Administrator** and execute the following command:

```powershell
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action Uninstall -ForceCloseExcel"
```

:::info Uninstallation Notes

- The uninstallation process will also forcibly close Excel, please save your work content in advance
- Windows platform uninstallation also requires administrator privileges
- After uninstallation is complete, all Excel Add-in related functions will be completely removed

:::

  </TabItem>
</Tabs>