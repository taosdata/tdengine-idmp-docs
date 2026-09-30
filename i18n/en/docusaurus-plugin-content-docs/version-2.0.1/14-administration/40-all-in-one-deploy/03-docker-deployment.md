---
title: TDengine All-in-One Docker Deployment
sidebar_label: All-in-One on Docker
---

# 14.13.3 TDengine All-in-One Docker Deployment

This guide explains how to deploy TDengine All-in-One using Docker.

Docker deployment supports Linux, Windows, and macOS. macOS supports Docker deployment only.

**Watch TDengine Tutorial Videos:** [**Deploy & Activate with Docker**](https://youtu.be/v807Z4dwh9k)

## 14.13.3.1 Environment Requirements

Before deployment, confirm that the system meets the following requirements.

| Platform | Requirement |
| --- | --- |
| Linux | Docker Engine 20.10 or later |
| Windows | Docker Engine or Docker Desktop |
| macOS | Docker Desktop |
| All platforms | OpenSSH Server and passwordless SSH access |

## 14.13.3.2 Prepare Docker

Confirm that Docker Desktop is installed and running.

Check the Docker version:

```bash
docker version
```

Check the Docker service:

```bash
docker info
```

## 14.13.3.3 Run the Docker Deployment

### Linux

Run the following command as the root user:

```bash
curl -fsSL https://downloads.taosdata.com/apex/install.sh | bash -s -- -m docker
```

### macOS

Open a terminal and run:

```bash
curl -fsSL https://downloads.taosdata.com/apex/install.sh | bash -s -- -m docker
```

Docker Desktop must be running before you start the deployment.

### Windows

#### Download the Installer

Download [TDengineSetup-x64.exe](https://downloads.tdengine.com/apex/latest/ApexSetup-x64.exe) and double-click to start the deployment.

#### Run the Installer

Locate **ApexSetup-x64.exe**, right-click the file, and select **Run as administrator**.

If prompted by Windows User Account Control (UAC), click **Yes**.

#### Select the Deployment Type

When the installer appears, click **Continue** and select **All In One (Docker)**.

#### Start the Deployment

When the PowerShell deployment prompt appears, press **Enter** to continue the installation.

Wait for the deployment process to complete. Do not close the PowerShell window while the installation is running.

Example (inside the container):

```text
rm -rf /opt/TDengine/idmp/log
```

Then rerun the deployment command above.

## 14.13.3.4 Access and Activate IDMP

After the deployment completes successfully, open the following application:

**IDMP**

Used to manage your industrial data, create asset models, build dashboards, configure analyses, set up notifications, and manage data integration.

**URL:**

```text
http://localhost:6042
```

![IDMP activation page](../images/idmp-activation.jpg)

**Activate your License Free Forever!**

![TDengine Free Edition license activation](../images/license-activation.jpg)

**Note:** If your mail server doesn't work or you lack an internet connection, please run this to retrieve your verification code:

```bash
docker logs <idmp-container> 2>&1 | grep -E "Generated register verify code|Generated verify code|Sending register verify code" | tail -1
```

**Note:** If you are connecting from another machine, replace `localhost` with the host name or IP address of the server where TDengine is installed.

**Watch TDengine Tutorial Videos:** [**TDengine Tutorial Videos**](https://www.youtube.com/playlist?list=PLQ3OTMvx-LOQ)
