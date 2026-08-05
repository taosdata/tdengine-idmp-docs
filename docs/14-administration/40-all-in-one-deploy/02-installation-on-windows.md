---
title: TDengine All-in-One 在 Windows 上的安装
sidebar_label: All-in-One on Windows
---

# 14.13.2 TDengine All-in-One 在 Windows 上的安装

本文介绍如何在 Windows 节点上以主机模式部署 TDengine All-in-One。

## 14.13.2.1 环境要求

部署前，请确认各节点满足以下最低要求：

- Windows 10 SP3、Windows 11 或更高版本
- Windows Server 2019 或更高版本
- 可稳定访问互联网
- 多节点部署时需安装 OpenSSH Server

开始部署前，请以管理员身份打开 PowerShell。

## 14.13.2.2 部署 TDengine All-in-One

在以管理员身份打开的 PowerShell 中执行以下命令：

```powershell
iwr 'https://downloads.taosdata.com/apex/install.ps1' -UseBasicParsing -OutFile "$env:TEMP\apex-install.ps1"; & "$env:TEMP\apex-install.ps1" -Mode apex
```

当部署提示出现时，按 Enter 继续安装。

## 14.13.2.3 为多节点部署安装 OpenSSH Server

如果要部署到多个 Windows 节点，请在开始部署前在每个目标节点上安装 OpenSSH Server。

安装成功后，在 Powershell 中运行以下命令，启动 ssh 服务：

```powershell
Start-Service sshd
Set-Service -Name sshd -StartupType 'Automatic'
```

## 14.13.2.4 配置 SSH 免密登录

对于多节点主机部署，需要在节点之间配置 SSH 免密登录。单节点本机部署不需要此步骤。

```powershell
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | ssh administrator@127.0.0.1 "mkdir -p ~/.ssh && cat > ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

然后检查 `C:\ProgramData\ssh\sshd_config` 中是否包含以下配置：

```text
PubkeyAuthentication yes
AuthorizedKeysFile  .ssh/authorized_keys
PasswordAuthentication yes
PermitEmptyPasswords no
# Match Group administrators
#     AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

如果修改了配置，请重启 `sshd` 服务使变更生效。

## 14.13.2.5 启动、停止和卸载组件

### 14.13.2.5.1 启动和停止

打开 `services.msc`，找到相关 TDengine 服务，并通过右键菜单执行启动或停止。

Windows 服务列表包括：

- `taosd`
- `taosadapter`
- `taoskeeper`
- `taos-explorer`
- `taosx`
- `TDengine Analytics Node`
- `tdengine-idmp-h2`
- `tdengine-idmp-ui`
- `tdengine-idmp-backend`
- `tdengine-idmp-chat`
- `tdengine-idmp-cls`

### 14.13.2.5.2 卸载

打开“设置 > 应用 > 已安装的应用”，然后依次卸载以下程序：

- TDengine IDMP
- TDengine TSDB
- TDengine TDgpt

## 14.13.2.6 故障排查

如果部署未成功，请检查以下内容：

- 是否以管理员身份运行 PowerShell
- 是否可以联网下载安装包
- 所需端口是否可用且未被 Windows 防火墙阻止

## 14.13.2.7 下一步

部署成功后，打开浏览器输入以下地址，进入 IDMP：

```text
http://localhost:6042
```

如果你从另一台机器访问，请将 `localhost` 替换为安装 TDengine All-in-One 的主机名或 IP 地址。
