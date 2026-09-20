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

点击 [TDengineSetup-x64.exe](https://downloads.taosdata.com/apex/latest/TDengineSetup-x64.exe) 下载 TDengine 安装器，然后双击执行，并选择主机方式安装。

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
```

如果修改了配置，请重启 `sshd` 服务使变更生效。

## 14.13.2.5 启动、停止和卸载组件

### 14.13.2.5.1 启动和停止

打开新的 Powershell 窗口，输入命令执行对应操作：

- `apex-component-start.ps1`        启动 TDengine 所有服务
- `apex-component-stop.ps1`         停止 TDengine 所有服务

### 14.13.2.5.2 卸载和彻底清除

打开新的 Powershell 窗口，输入命令执行对应操作：

- `apex-component-uninstall.ps1`        卸载 TDengine 所有组件
- `apex-component-purge.ps1`            卸载 TDengine 所有组件并清除所有数据

## 14.13.2.6 故障排查 {#faq}

如果部署未成功，请检查以下内容：

- 是否账户拥有管理员权限
- 是否可以联网下载 TDengineSetup 安装包
- 所需端口是否未被占用且未被 Windows 防火墙阻止

### 如果 Windows 系统的用户名为中文，安装时报错，应该如何解决？

请参考以下步骤，打开 Unicode UTF-8 提供全球语言支持开关：

1. 打开控制面板
2. 将右上角的“查看方式”改为“类别”
3. 点击“时钟和区域”
4. 再点击“区域”，即可打开设置窗口
5. 在弹出的窗口中，切换到顶部的“管理”选项卡
6. 点击 “更改系统区域设置...” 按钮，勾选“使用 Unicode UTF-8 提供全球语言支持”复选框即可
7. 保存配置后，重启计算机

## 14.13.2.7 下一步

部署成功后，打开浏览器输入以下地址，进入 IDMP：

```text
http://localhost:6042
```

如果你从另一台机器访问，请将 `localhost` 替换为安装 TDengine All-in-One 的主机名或 IP 地址。
