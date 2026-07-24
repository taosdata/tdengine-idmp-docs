---
title: TDengine All-in-One 一键部署
sidebar_label: TDengine All-in-One 一键部署
---

# 14.13 TDengine All-in-One 安装部署

TDengine All-in-One 是面向各种业务场景的AI工业数据平台，它集成了 IDMP、TSDB、TDgpt 和TDmodel等多个功能组件。
TDengine All-in-One 采用脚本作为安装部署入口，无论是 Linux、Windows 还是 Docker，均采用统一的方式进行部署。主要特点有：

- 支持 TSDB + IDMP + TDgpt + TDmodel: All-in-One 的典型场景
- 支持通过部署 YAML、组件 YAML 配置部署拓扑、组件版本、依赖关系、安装包和资源包
- 一个安装入口，同时支持在线和离线安装
- 支持 Linux、Windows 和 Docker 交付形态
- 支持单机部署，和多节点主机部署
- 多节点主机部署时，基于 SSH 免密登录

## 14.13.1 环境要求

对于 Linux 系统，运行环境最低要求如下：

1. Linux 内核版本：3.10.0-1160 以上
2. glibc 版本：2.28 及以上
3. 多节点主机方式部署时，需提前在各节点安装 OpenSSH Server
4. 如部署 TDgpt 并启用 moirai 模型，CPU 需支持 AVX2 指令集；Docker 部署时需确保宿主机向容器暴露 AVX2。

对于 Windows 系统，运行环境最低要求如下：

1. Windows 10 SP3 、Windows 11 以上
2. Windows Server 2019 以上
3. 多节点主机方式部署时，需提前在各节点安装 OpenSSH Server

而 Docker 运行环境的最低要求是：Docker Engine 20.10 以上

## 14.13.2 一键部署流程

访问涛思官网下载中心网站，可以看到 All\-in\-One 安装手册与一键部署命令。

1. 用户执行安装命令，从互联网下载并执行安装脚本
2. 如 Docker 部署方式，提示用户是否跳过registry自动配置
3. 执行部署脚本，完成自动化安装部署
    1. 下载安装包、依赖包及资源包
    2. 上传到待部署节点，完成部署
    3. 启动服务

一键部署默认在本机部署All-in-one的所有组件。

如用户期望定制部署，可以在完成下载部署工具 apex 后，退出部署流程，参照 `~/.apex/manifests/deployment-xxx.yaml` 创建定制的部署脚本，执行 `apex deploy -f <定制yaml>` 完成部署。

默认部署选项，对应的 YAML 文件为： deployment-single-node.yaml

## 14.13.3 执行 All\-in\-One 部署命令

Linux 和 Windows 操作系统，均支持主机、Docker 两种安装方式；macOS 操作系统，仅支持 Docker 安装方式。
Linux 与 macOS 需打开终端，在终端中执行命令；Windows 需以管理员身份打开 Powershell 终端，在终端中执行命令。
Linux 须以 root 身份执行安装部署，Windows 须以 管理员 身份执行。目前 Linux 主机部署方式仅支持 Ubuntu 发行版，后续将覆盖所有国产化操作系统、主流发行版本。

```SQL
# Linux
# 主机模式安装命令
curl -fsSL https://downloads.taosdata.com/apex/install.sh | bash -s -- -m apex
# Docker模式安装命令 (Linux & macOS)
curl -fsSL https://downloads.taosdata.com/apex/install.sh | bash -s -- -m docker

# Windows
# 主机模式安装命令
iwr 'https://downloads.taosdata.com/apex/install.ps1' -UseBasicParsing -OutFile "$env:TEMP\apex-install.ps1"; & "$env:TEMP\apex-install.ps1" -Mode apex
# Docker模式安装命令
iwr https://downloads.taosdata.com/apex/install.ps1 -UseBasicParsing -OutFile $env:TEMP\apex-install.ps1; & $env:TEMP\apex-install.ps1 -Mode docker
```

上述命令将从互联网下载涛思部署工具 apex，然后执行安装部署流程。在主机模式安装时遇异常退出，希望重新启动部署，可执行以下命令

```SQL
~/.apex/deploy-scripts/linux/deploy.sh
```

## 14.13.4 TDengine Docker 镜像下载加速

用户可以选择在安装过程中，不跳过 registry 自动配置，由安装部署脚本自动配置、重启Docker服务。
如果用户希望手动配置 registry-mirrors ，可参照下面的指引来完成。
背景：在国内采用 Docker 部署方式，用户大概率会遇到在国内下载速度缓慢的问题。目前国内用户下载 TDengine 的 Docker 镜像时，需要从 Docker Hub 拉取镜像。受限于网络环境，从 Docker Hub 下载带宽很窄导致拉取镜像体验不佳。为解决这个问题，涛思在阿里云容器镜像服务上托管了 TDengine Docker 镜像，大幅提升国内用户下载带宽，改善用户体验。

### 14.13.4.1 Linux 系统

```JSON
# 编辑 /etc/docker/daemon.json，添加以下内容
{
  "registry-mirrors": [
    "https://tdengine-registry.cn-beijing.cr.aliyuncs.com",
    "https://docker.1panel.live"  # 用户原有镜像代理示例，根据实际情况修改
  ]
}

# 重新载入配置文件、重启 Docker 服务
systemctl daemon-reload && systemctl restart docker
```

### 14.13.4.2 Windows 系统

```JSON
# 编辑 C:\ProgramData\Docker\config\daemon.json
# 或者 在Docker Desktop的设置中，找到 Docker Engine 选项卡，参照一下内容编辑JSON配置
{
  "registry-mirrors": [
    "https://tdengine-registry.cn-beijing.cr.aliyuncs.com",
    "https://docker.1panel.live"  # 用户原有镜像代理示例，根据实际情况修改
  ]
}

# 重启 Docker 服务
# Docker Desktop
修改完成后，点击下方的 Apply & Restart 完成重启
# Windows Server
Restart-Service docker
# Windows 10/11
sc restart docker
```

### 14.13.4.3 macOS系统

```JSON
# 在 Docker Desktop 的设置中，找到 Docker Engine 选项卡，参照一下内容编辑 JSON 配置
{
  "registry-mirrors": [
    "https://tdengine-registry.cn-beijing.cr.aliyuncs.com",
    "https://docker.1panel.live"  # 用户原有镜像代理示例，根据实际情况修改
  ]
}

# 重启 Docker 服务 Docker Desktop
修改完成后，点击下方的 Apply & Restart 完成重启
```

## 14.13.5 安装SSH Server

当部署多节点时，所有待部署 TDengine All-in-One 的节点必须安装 SSH Server。

在 Linux 系统上安装 OpenSSH Server，如下。

```SQL
# Ubuntu
apt update && apt install -y openssh-server && ufw allow ssh && ufw reload
# 启动服务、设置开机自启
systemctl start ssh && systemctl enable ssh

# CentOS
yum install openssh-server -y && firewall-cmd --permanent --add-service=ssh && firewall-cmd --reload
# 启动服务、设置开机自启
 systemctl start sshd && systemctl enable sshd
```

在 Windows 10/11 或 Windows Server上安装 OpenSSH Server，可以通过 Powershell 命令来完成

```SQL
下载并安装 OpenSSH Server

# 启动服务
Start-Service sshd
# 设置开机自启
Set-Service -Name sshd -StartupType 'Automatic'
```

## 14.13.6 配置SSH免密登录

当部署多节点时，TDengine All\-in\-One安装过程中需要各节点配置 SSH 免密登录，本机部署无需配置。

```SQL
# 生成 ed25519 算法的密钥对
ssh-keygen -t ed25519

# Linux系统拷贝公钥至目标主机，请将 remote_host 替换为主机 IP 地址
ssh-copy-id root@<remote_host>

# Windows系统 Powershell终端中拷贝公钥至目标主机
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | ssh administrator@127.0.0.1 "mkdir -p ~/.ssh && cat > ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"

#打开 ssh 配置文件，确保以下四行内容没有被注释，最后两行已被注释，保存退出
#重启sshd服务以生效 Restart-Service sshd
notepad C:\ProgramData\ssh\sshd_config

PubkeyAuthentication yes
AuthorizedKeysFile  .ssh/authorized_keys
PasswordAuthentication yes
PermitEmptyPasswords no
# Match Group administrators
#     AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

## 14.13.7 TDengine All\-in\-One 各模块启停、卸载命令一览

**Linux 系统主机部署方式**

|**组件**|**启动**|**停止**|**卸载**|
|---|---|---|---|
|**TSDB**|`start-all.sh`<br />`systemctl start taosd`|`stop-all.sh`<br />`systemctl stop taosd`|`rmtaos`|
|**IDMP**|`svc-tdengine-idmp start`|`svc-tdengine-idmp stop`|`rmidmp`|
|**TDgpt**|`systemctl start taosanoded`|`systemctl stop taosanoded`|`rmtaosanode`|
|**TDmodel**|`systemctl start tdmodeld`|`systemctl stop tdmodeld`|`rmtdmodel`|

**Windows 系统主机部署方式**

**启停**
打开 services.msc，找到对应的 TDengine 服务，点击鼠标右键可执行 启动 或 停止 服务。

TDengine Windows 服务列表
- taosd
- taosadapter
- taoskeeper
- taos-explorer
- taosx
- TDengine Analytics Node
- tdengine-idmp-h2
- tdengine-idmp-ui
- tdengine-idmp-backend
- tdengine-idmp-chat
- tdengine-idmp-cls


**卸载**
Windows 系统打开 设置 - 应用 - 安装的应用，逐一卸载 TDengine IDMP、TDengine TSDB、TDengine TDgpt 三个应用，即告完成卸载。