---
title: TDengine All-in-One 在 Linux 上的安装
sidebar_label: All-in-One on Linux
---

# 14.13.1 TDengine All-in-One 在 Linux 上的安装

本文介绍如何在 Linux 上以主机模式部署 TDengine All-in-One。

## 14.13.1.1 环境要求

部署前，请确认各节点满足以下最低要求：

- 主机部署当前支持 Ubuntu、Kylin、openEuler和Anolis OS
- Linux 内核 `3.10.0-1160` 或更高版本
- `glibc 2.28` 或更高版本
- 可稳定访问互联网
- 多节点部署时需安装 OpenSSH Server

所有安装命令都必须以 `root` 身份执行。

## 14.13.1.2 部署 TDengine All-in-One

以 `root` 身份执行以下命令：

```bash
curl -fsSL https://downloads.taosdata.com/apex/install.sh | bash -s -- -m apex
```

该命令会下载 Apex 部署工具并启动部署流程。

在部署过程中，选择 All-in-One 选项以部署完整平台。

如果部署异常退出并且需要重新启动，请执行：

```bash
~/.apex/deploy-scripts/linux/deploy.sh
```

## 14.13.1.3 为多节点部署安装 OpenSSH Server

如果要部署到多个 Linux 节点，请在开始部署前在每个目标节点上安装 OpenSSH Server。

```bash
# Ubuntu
apt update && apt install -y openssh-server && ufw allow ssh && ufw reload
systemctl start ssh && systemctl enable ssh

# CentOS
yum install openssh-server -y && firewall-cmd --permanent --add-service=ssh && firewall-cmd --reload
systemctl start sshd && systemctl enable sshd
```

## 14.13.1.4 配置 SSH 免密登录

对于多节点主机部署，需要在主控节点与每个目标节点之间配置 SSH 免密登录。单节点本机部署不需要此步骤。

```bash
ssh-keygen -t ed25519
ssh-copy-id root@<remote_host>
```

将 `<remote_host>` 替换为目标主机的 IP 地址。

## 14.13.1.5 启动、停止和卸载组件

| 组件 | 启动 | 停止 | 卸载 |
|---|---|---|---|
| TSDB | `start-all.sh` 或 `systemctl start taosd` | `stop-all.sh` 或 `systemctl stop taosd` | `rmtaos` |
| IDMP | `svc-tdengine-idmp start` | `svc-tdengine-idmp stop` | `rmidmp` |
| TDgpt | `systemctl start taosanoded` | `systemctl stop taosanoded` | `rmtaosanode` |

## 14.13.1.6 故障排查

如果部署未成功，请检查以下内容：

- 安装是否以 `root` 身份执行
- 是否可以联网下载安装包
- 所需端口是否可用且未被防火墙阻止

## 14.13.1.7 体验 IDMP

部署成功后，打开浏览器输入以下地址，进入 IDMP：

```text
http://localhost:6042
```

如果你从另一台机器访问，请将 `localhost` 替换为安装 TDengine All-in-One 的主机名或 IP 地址。
