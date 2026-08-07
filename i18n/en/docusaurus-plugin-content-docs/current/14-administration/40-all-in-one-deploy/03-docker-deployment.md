---
title: TDengine All-in-One Docker Deployment
sidebar_label: All-in-One on Docker
---

# 14.13.3 TDengine All-in-One Docker Deployment

This guide explains how to deploy TDengine All-in-One using Docker.

**Watch TDengine Tutorial Videos:** [**Docker Deployment Video**](https://www.youtube.com/watch?v=v807Z4dwh9k&list=PLQ3OTMvx-LOQ&index=7)

Docker deployment supports Linux, Windows, and macOS. macOS supports Docker deployment only.

## 14.13.3.1 Environment Requirements

Before deployment, ensure that the platform meets the following requirements.

| Platform | Requirement |
| --- | --- |
| Linux | Docker Engine 20.10 or later |
| Windows | Docker Engine or Docker Desktop |
| macOS | Docker Desktop |

The host also requires stable internet access. Windows requires administrator privileges, and Linux requires `root` privileges.

**Recommended configuration:**

| Resource | Recommended |
| --- | --- |
| CPU | 12 cores |
| Memory | 16 GB RAM |
| Storage | 100 GB available disk space |

## 14.13.3.2 Prepare Docker

Confirm that Docker is installed and running.

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

Run the following command as `root`:

```bash
curl -fsSL https://downloads.taosdata.com/apex/install.sh | bash -s -- -m docker
```

### macOS

Open a terminal and run:

```bash
curl -fsSL https://downloads.taosdata.com/apex/install.sh | bash -s -- -m docker
```

Docker Desktop must be running before you start deployment.

### Windows

Open PowerShell as Administrator and run:

```powershell
iwr https://downloads.taosdata.com/apex/install.ps1 -UseBasicParsing -OutFile $env:TEMP\apex-install.ps1; & $env:TEMP\apex-install.ps1 -Mode docker
```

When the deployment prompt appears, press Enter to continue the installation.

## 14.13.3.4 Troubleshooting

If deployment is not successful, verify the following:

- Docker is installed and running.
- The host has internet access to download installation packages.
- Required ports are available and not blocked by the firewall.

**Note:** If you encounter an issue related to the log files, stop the IDMP
container and delete the log files from the mounted log volume, or delete them
from inside the container if the logs are not persisted.
Example (inside the container):

```text
rm -rf /var/log/taos
```

Then rerun the deployment command above.

## 14.13.3.5 Access and Activate IDMP

After deployment completes successfully, open IDMP in a browser:

```text
http://localhost:6042
```

If you access the service from another machine, replace `localhost` with the host name or IP address of the server where TDengine is installed.

Enter your email address, organization name, and verification code to activate IDMP.

![IDMP activation page](../images/idmp-activation.jpg)

For the Free Edition, review the license agreement and select **Agree and Activate Free License**.

![TDengine Free Edition license activation](../images/license-activation.jpg)
