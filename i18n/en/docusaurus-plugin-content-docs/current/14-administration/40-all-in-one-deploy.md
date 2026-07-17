---
title: TDengine All-in-One Installation and Deployment
sidebar_label: TDengine All-in-One Installation and Deployment
---

# 14.13 TDengine All-in-One Installation and Deployment

TDengine All-in-One is an AI industrial data platform for a wide range of business scenarios. It integrates multiple functional components, including IDMP, TSDB, TDgpt, and TDmodel.
TDengine All-in-One uses scripts as the entry point for installation and deployment. Linux, Windows, and Docker deployments all use a unified deployment method. Key features include:

- Support for multiple scenarios:
  - TSDB + IDMP + TDgpt + TDmodel: the typical All-in-One scenario
  - IDMP: deploy IDMP when TSDB has already been deployed
  - TSDB: deploy TSDB only
- Support for configuring deployment topology, component versions, dependencies, installation packages, and resource packages through deployment YAML and component YAML files
- A single installation entry point that supports both online and offline installation
- Support for Linux, Windows, and Docker delivery modes
- Support for single-node, cluster, and distributed deployment
- SSH-based deployment

## 14.13.1 Environment Requirements

For Linux, the minimum runtime requirements are as follows:

1. Linux kernel version 3.10.0-1160 or later
2. glibc 2.28 or later
3. OpenSSH Server

For Windows, the minimum runtime requirements are as follows:

1. Windows 10 SP3, Windows 11, or later
2. Windows Server 2019 or later
3. OpenSSH Server

For Docker, the minimum runtime requirement is Docker Engine 20.10 or later.

## 14.13.2 One-Click Deployment Process

1. The user runs the installation command to download and execute the installation script from the internet.
2. The user is prompted to configure SSH passwordless login automatically or manually.
3. The user is prompted to select a deployment mode: All-in-One, IDMP, or TSDB.
4. The deployment script runs and completes automated installation and deployment:
    1. Download installation packages, dependency packages, and resource packages.
    2. Upload them to the target deployment nodes and complete deployment.
    3. Start the services.

By default, one-click deployment deploys all All-in-One components on the local machine.

If you need a customized deployment, after downloading the apex deployment tool, exit the deployment process, create a customized deployment script based on `~/.apex/manifests/deployment-xxx.yaml`, and run `apex deploy -f <custom-yaml>` to complete the deployment.

The default deployment provides three options. The corresponding YAML files are:

1. deployment-single-node.yaml
2. deployment-idmp-only.yaml
3. deployment-tsdb-only.yaml

## 14.13.3 Install SSH Server

Each node where TDengine All-in-One will be deployed must have SSH Server installed. By default, this is the local machine.

Install OpenSSH Server on Linux:

```SQL
# Ubuntu
apt update && apt install -y openssh-server && ufw allow ssh && ufw reload
# Start the service and enable it at boot
systemctl start ssh && systemctl enable ssh

# CentOS
yum install openssh-server -y && firewall-cmd --permanent --add-service=ssh && firewall-cmd --reload
# Start the service and enable it at boot
 systemctl start sshd && systemctl enable sshd
```

On Windows 10/11 or Windows Server, you can install OpenSSH Server by using PowerShell commands:

```SQL
Download and install OpenSSH Server

# Start the service
Start-Service sshd
# Enable startup at boot
Set-Service -Name sshd -StartupType 'Automatic'
```

## 14.13.4 Configure SSH Passwordless Login

During TDengine All-in-One installation, SSH passwordless login must be configured for each node. This is required even when deploying to the local machine.

```SQL
# Generate an ed25519 key pair
ssh-keygen -t ed25519

# Copy the public key to the target host on Linux. Replace remote_host with the host IP address.
ssh-copy-id root@<remote_host>

# Copy the public key to the target host from a Windows PowerShell terminal
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | ssh administrator@127.0.0.1 "mkdir -p ~/.ssh && cat > ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"

# Open the ssh configuration file. Make sure the following four lines are not commented out,
# and the last two lines are commented out. Save and exit.
# Restart the sshd service for the change to take effect: Restart-Service sshd
notepad C:\ProgramData\ssh\sshd_config

PubkeyAuthentication yes
AuthorizedKeysFile  .ssh/authorized_keys
PasswordAuthentication yes
PermitEmptyPasswords no
# Match Group administrators
#     AuthorizedKeysFile __PROGRAMDATA__/ssh/administrators_authorized_keys
```

## 14.13.5 Run the All-in-One Deployment Command

Linux and Windows support both host and Docker installation modes. macOS supports only Docker installation. On Linux and macOS, open a terminal and run the command there. On Windows, open a PowerShell terminal as administrator and run the command there. On Linux, the installation and deployment must be run as root. On Windows, they must be run as administrator. Currently, Linux host deployment supports only Ubuntu. Support for domestic operating systems and mainstream distributions will be added later.

```SQL
# Linux
# Host mode installation command
curl -fsSL https://downloads.taosdata.com/apex/install.sh | bash -s -- -m apex
# Docker mode installation command (Linux & macOS)
curl -fsSL https://downloads.taosdata.com/apex/install.sh | bash -s -- -m docker

# Windows [coming soon]
# Host mode installation command
& ([scriptblock]::Create((iwr https://downloads.taosdata.com/apex/install.ps1 -UseBasicParsing).Content)) -Mode apex
# Docker mode installation command
& ([scriptblock]::Create((iwr https://downloads.taosdata.com/apex/install.ps1 -UseBasicParsing).Content)) -Mode docker
```

The commands above download the Taos deployment tool apex from the internet and then run the installation and deployment process. If host-mode installation exits unexpectedly, for example because OpenSSH Server is not installed, and you want to restart deployment, run the following command:

```SQL
~/.apex/deploy-scripts/linux/deploy.sh
```

## 14.13.6 TDengine Docker Image Download Acceleration

When Docker deployment is used, users in China are likely to experience slow download speeds.

Currently, users in China need to pull TDengine Docker images from Docker Hub. Due to network conditions, Docker Hub download bandwidth can be limited, resulting in a poor image pull experience. To solve this issue, Taos hosts TDengine Docker images on Alibaba Cloud Container Registry, greatly improving download bandwidth for users in China and improving the user experience.

### 14.13.6.1 Linux

```JSON
# Edit /etc/docker/daemon.json and add the following content
{
  "registry-mirrors": [
    "https://tdengine-registry.cn-beijing.cr.aliyuncs.com",
    "https://docker.1panel.live"  # Example of an existing image proxy. Modify it as needed.
  ]
}

# Reload the configuration file and restart the Docker service
systemctl daemon-reload && systemctl restart docker
```

### 14.13.6.2 Windows

```JSON
# Edit C:\ProgramData\Docker\config\daemon.json
# Or, in Docker Desktop settings, go to the Docker Engine tab and edit the JSON configuration as follows
{
  "registry-mirrors": [
    "https://tdengine-registry.cn-beijing.cr.aliyuncs.com",
    "https://docker.1panel.live"  # Example of an existing image proxy. Modify it as needed.
  ]
}

# Restart the Docker service
# Docker Desktop
After making the changes, click Apply & Restart at the bottom to restart.
# Windows Server
Restart-Service docker
# Windows 10/11
sc restart docker
```

### 14.13.6.3 macOS

```JSON
# In Docker Desktop settings, go to the Docker Engine tab and edit the JSON configuration as follows
{
  "registry-mirrors": [
    "https://tdengine-registry.cn-beijing.cr.aliyuncs.com",
    "https://docker.1panel.live"  # Example of an existing image proxy. Modify it as needed.
  ]
}

# Restart the Docker service in Docker Desktop
After making the changes, click Apply & Restart at the bottom to restart.
```

## 14.13.7 TDengine All-in-One Component Start, Stop, and Uninstall Commands

**Linux host deployment mode**

|**Component**|**Start**|**Stop**|**Uninstall**|
|---|---|---|---|
|**TSDB**|`start-all.sh`<br />`systemctl start taosd`|`stop-all.sh`<br />`systemctl stop taosd`|`rmtaos`|
|**IDMP**|`svc-tdengine-idmp start`|`svc-tdengine-idmp stop`|`rmidmp`|
|**TDgpt**|`systemctl start taosanoded`|`systemctl stop taosanoded`|`rmtaosanode`|
|**TDmodel**|`systemctl start tdmodeld`|`systemctl stop tdmodeld`|`rmtdmodel`|
