---
title: Docker 快速上手
sidebar_label: Docker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 2.2 Docker 快速上手

TDengine IDMP 提供 Docker Compose 部署方式，可简化本地部署流程。该方式将同时安装 TDengine TSDB-Enterprise 与 TDengine IDMP，并自动建立两者之间的连接。

## 2.2.1 环境要求

通过 Docker Compose 部署 TDengine IDMP 前，请确认本地环境已满足以下软件版本要求。

- Docker Engine 20.10 或更高版本。参见 [Install Docker Engine](https://docs.docker.com/engine/install/)。
- Docker Compose 1.29.2 或更高版本。参见 [Install Docker Compose](https://docs.docker.com/compose/install/)。
- 已在本地机器上安装 Git。参见 [git-scm.com](https://git-scm.com/)。

## 2.2.2 准备 Docker 环境

:::tip
使用 Docker 方式部署 TDengine IDMP 需要从 Docker Hub 拉取镜像。如果您无法正常访问 Docker Hub，可以从 [TDengine 下载中心](https://www.taosdata.com/download-center) 下载容器镜像文件，然后执行以下命令加载镜像（以 x64 架构为例）：

```bash
docker load -i tdengine-tsdb-enterprise-docker-<version>-linux-x64.tar.gz
docker load -i tdengine-idmp-enterprise-docker-<version>-linux-x64.tar.gz
docker load -i tdengine-idmp-ai-enterprise-docker-<version>-linux-x64.tar.gz

docker tag tdengine/tsdb-ee-amd64:<version> tdengine/tsdb-ee:latest
docker tag tdengine/idmp-ee-amd64:<version> tdengine/idmp-ee:latest
docker tag tdengine/idmp-ai-ee-amd64:<version> tdengine/idmp-ai-ee:latest
```

待镜像导入成功后，再继续执行以下步骤。
:::

克隆 TDengine IDMP 部署仓库：

<Tabs>
<TabItem label="GitHub" value="github">

从 GitHub 的 [TDengine IDMP Deployment](https://github.com/taosdata/tdengine-idmp-deployment) 仓库克隆代码：

```bash
git clone https://github.com/taosdata/tdengine-idmp-deployment.git
```

</TabItem>
<TabItem label="Gitee（国内镜像）" value="gitee">

对于无法正常访问 GitHub 的用户，可从 Gitee 的 [TDengine IDMP Deployment](https://gitee.com/taosdata/tdengine-idmp-deployment) 镜像仓库克隆代码：

```bash
git clone https://gitee.com/taosdata/tdengine-idmp-deployment.git
```

</TabItem>
</Tabs>

## 2.2.3 通过 Docker 启动 TDengine IDMP

```bash
cd tdengine-idmp-deployment/docker
export TZ="Asia/Shanghai"
chmod +x idmp.sh
./idmp.sh start
```

该命令将提示您选择部署模式：

- **标准部署** — TDengine TSDB Enterprise + IDMP
- **完整部署** — TDengine TSDB Enterprise + IDMP + TDgpt（支持时序数据预测和异常检测功能）

AI 服务已作为独立镜像 `tdengine/idmp-ai-ee` 部署，Docker Compose 配置中将自动包含该服务。

如果本地不存在所需镜像，将自动从远端拉取。

:::note
请将 `TZ` 环境变量设置为与您的实际环境匹配的时区。`Asia/Shanghai` 适用于北京时间环境。Compose 中的所有容器将继承该设置——时区配置错误将导致实时分析触发时间和事件时间戳出现偏差。
:::

## 2.2.4 激活

TDengine IDMP 首次运行后需完成激活方可正式使用，激活成功后将获得 15 天免费试用期。

1. 首次访问时，您需要激活服务。在填写"邮箱"和"组织"后，点击**获取激活码**，系统会向您填写的邮箱发送一封激活邮件，输入邮件中的激活码后，点击**激活**，即可完成激活，您将获得 15 天的免费试用期。

   :::note
   为方便 AI 相关功能的体验，IDMP 安装后预置了 DeepSeek 的 API key，有效期 3 天。到期后，请在 TDengine IDMP 的**管理后台 → 连接**更新您的 API key。
   :::

2. 激活码验证通过后，会弹出**隐私配置**对话框，您可以根据需求选择信息采集项，采集的信息将帮助我们改进产品，您的业务及生产数据绝不会被采集，配置完成后，请点击**同意**。

## 2.2.5 配置用户信息

激活完成后，系统将引导完成初始用户信息的配置，设置登录凭据以供后续访问使用。

1. 激活产品后，将进入用户信息配置页面。
2. 请根据系统提示，填写您的姓名和手机号。
3. 请设置系统的登录密码。
4. 密码验证通过后，就完成了用户信息的配置，点击**继续**，将自动跳转到加载示例场景页面。

请继续阅读[第 2.4 节](./04-experiencing-idmp.md)，探索 IDMP 功能。
