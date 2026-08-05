---
title: 使用 Docker 部署
sidebar_label: 使用 Docker 部署
---

import GatewayBasePathConfig from './common/_gateway-base-path.md'

# 14.3.1 使用 Docker 部署

本指南介绍如何使用 Docker / Docker Compose 部署 TDengine IDMP。推荐通过 TDengine All-in-One 一键完成 TSDB、IDMP 及相关组件的安装。

完整的 All-in-One Docker 部署说明请参见[第 14.13.3 节](../40-all-in-one-deploy/03-docker-deployment.md)。

## 14.3.1.1 前置条件

- Docker Engine 20.10 或更高版本。参见 [Install Docker Engine](https://docs.docker.com/engine/install/)。
- Docker Compose v2（Docker Compose 插件）或更高版本。参见 [Install Docker Compose](https://docs.docker.com/compose/install/)。
- 可用 Docker 内存大于等于 10 GB。
- 稳定连接互联网。

## 14.3.1.2 安装部署

请参照官网下载中心 TDengine All-in-One 提供的 Docker 命令行进行安装。

使用 All-in-One 一键部署 TDengine IDMP 将自动切换到 `https://tdengine-registry.cn-beijing.cr.aliyuncs.com` 拉取镜像，大幅提升拉取镜像的速度。详细步骤、镜像加速配置与故障排查请阅读[第 14.13.3 节](../40-all-in-one-deploy/03-docker-deployment.md)。

## 14.3.1.3 启动与停止

通过 All-in-One 一键部署安装完成后，将自动启动 IDMP 及相关服务。您也可以手动启停服务。

**Linux / macOS：**

```bash
cd ~/.apex/docker
./idmp.sh start
```

```bash
cd ~/.apex/docker
./idmp.sh stop
```

**Windows（管理员 PowerShell）：**

```powershell
cd $env:USERPROFILE\.apex\docker
.\idmp.ps1 start
```

```powershell
cd $env:USERPROFILE\.apex\docker
.\idmp.ps1 stop
```

启动时将提示您选择部署模式：

- **标准部署** — TDengine TSDB Enterprise + IDMP
- **完整部署** — TDengine TSDB Enterprise + IDMP + TDgpt（支持时序数据预测和异常检测功能）

AI 服务已作为独立镜像 `tdengine/idmp-ai-ee` 部署，Docker Compose 配置中将自动包含该服务。如果本地不存在所需镜像，将自动从远端拉取。

默认情况下，TDengine IDMP 服务监听主机的以下端口：

- **HTTP 访问：** `http://localhost:6042` 或 `http://ip:6042`
- **HTTPS 访问：** `https://localhost:6034` 或 `https://ip:6034`

:::tip

- 如需修改端口，请编辑 `~/.apex/docker` 目录下相应 Compose 文件中的 `ports` 配置项。
- <GatewayBasePathConfig />

:::

不要删除 All-in-One 生成的部署目录。该目录中可能包含 Docker Compose 文件、环境文件、卷映射、网络配置、组件配置以及升级或维护相关的元数据。

## 14.3.1.4 常见错误

1. IDMP 页面中显示 `AI service is unhealthy` 等错误。

首先，可以在**管理后台 → 连接**页面点击进入 AI 连接的详情页面，查看是否内置密钥过期。如果过期，请尽快设置有效的密钥或新建连接；如果仍未发现问题，建议联系 TDengine 团队。
