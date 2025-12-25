---
title: Excel Add-in 部署
---

# TDengine Excel Add-in

本文档详细介绍 TDengine Excel Add-in 组件的安装和卸载步骤。

## 前置条件

在安装 Excel Add-in 之前，请确保满足以下条件：

### 1. HTTPS 服务配置

Excel Add-in **必须使用 HTTPS 连接**到 IDMP 服务。请确保 IDMP 的 HTTPS 服务已正确配置并启动（默认端口 6034）。

#### 配置 HTTPS 服务

在 IDMP 配置文件（`application.yml`）中启用 HTTPS：

```yaml
quarkus:
  http:
    port: 6042 # IDMP HTTP 服务端口
    ssl-port: 6034 # IDMP HTTPS 服务端口
    insecure-requests: enabled # 允许 HTTP 和 HTTPS 同时工作
    ssl:
      enabled: true # 启用 SSL/HTTPS
      certificate:
        files: /usr/local/taos/idmp/config/certbundle.pem # 证书文件路径
        key-files: /usr/local/taos/idmp/config/privkey.pem # 私钥文件路径
```

#### 内置测试证书

IDMP 安装包内置了一个有效期为 3 个月的测试证书：
- **证书绑定域名**：`idmp.tdengine.net`
- **适用场景**：功能演示、测试等场景
- **限制**：**不建议生产环境使用**

#### 域名解析配置

如使用内置测试证书，需在客户端的 hosts 文件中添加域名解析：

```text
192.168.1.100  idmp.tdengine.net  # 请替换为实际的服务器 IP
```

**hosts 文件位置**：
- **Linux/macOS**: `/etc/hosts`
- **Windows**: `C:\Windows\System32\drivers\etc\hosts`

:::info 完整配置参考

如需查看完整的 IDMP 配置文件说明，请参考：[TDengine IDMP 配置文件参考](/operation/installation/config-reference/)

:::

### 2. 系统环境要求

1. **管理员权限**：Windows 平台需要管理员权限执行安装命令
2. **Excel 版本**：支持 Excel 2016 及以上版本（Windows/macOS）
3. **网络连接**：需要能够访问下载安装脚本和连接 IDMP 服务

## 安装指南

### macOS 平台安装

在终端中执行以下命令进行安装：

```bash
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s install --force-close --url https://localhost:6034
```

**参数说明：**
- `--force-close`：安装过程中会强制关闭 Excel 应用程序，请提前保存工作内容
- `--url`：指定 IDMP HTTPS 服务地址，**请替换为实际的服务地址**

:::warning 注意事项

- 安装过程中 Excel 会被强制关闭，请提前保存所有工作内容
- 如果使用自定义证书域名，需将 `https://localhost:6034` 替换为「证书绑定域名：端口号」
- 例如：`https://idmp.tdengine.net:6034`

:::

### Windows 平台安装

以**管理员身份**打开 PowerShell，执行以下命令：

```powershell
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action Install -ForceCloseExcel -Url 'https://localhost:6034'"
```

**参数说明：**
- `-Action Install`：执行安装操作
- `-ForceCloseExcel`：强制关闭 Excel 应用程序
- `-Url`：指定 IDMP HTTPS 服务地址，**请替换为实际的服务地址**

:::warning 注意事项

- 必须以管理员身份运行 PowerShell
- 安装过程中 Excel 会被强制关闭，请提前保存所有工作内容
- 如果使用自定义证书域名，需将 `https://localhost:6034` 替换为「证书绑定域名：端口号」
- 例如：`https://idmp.tdengine.net:6034`

:::

## 卸载指南

### macOS 平台卸载

在终端中执行以下命令进行卸载：

```bash
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s uninstall --force-close
```

### Windows 平台卸载

以**管理员身份**打开 PowerShell，执行以下命令：

```powershell
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action Uninstall -ForceCloseExcel"
```

:::info 卸载说明

- 卸载过程同样会强制关闭 Excel，请提前保存工作内容
- Windows 平台卸载同样需要管理员权限
- 卸载完成后，Excel Add-in 相关功能将完全移除

:::