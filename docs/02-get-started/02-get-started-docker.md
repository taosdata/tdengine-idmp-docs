---
title: Docker 快速上手
sidebar_label: Docker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 2.2 Docker 快速上手

TDengine IDMP 提供基于 Docker Compose 的一键部署方式，可简化本地部署流程。该方式将同时安装 TDengine TSDB-Enterprise 与 TDengine IDMP，并自动建立两者之间的连接。

TDengine 官网下载中心提供了 All-in-one 安装方式，可以一行命令完成 TDengine 所有模块包含 IDMP 的安装部署，支持 Docker、Linux 和 Windows 等部署环境，详细过程请阅读[第 14.13 节](../14-administration/40-all-in-one-deploy/index.md)

## 2.2.1 环境要求

- Docker Engine 20.10 或更高版本。参见 [Install Docker Engine](https://docs.docker.com/engine/install/)。
- Docker Compose 1.29.2 或更高版本。参见 [Install Docker Compose](https://docs.docker.com/compose/install/)。
- 稳定连接互联网

## 2.2.2 安装

请参照官网下载中心 TDengine All-in-One 提供的 Docker 命令行，进行安装。
使用 All-in-One 一键部署 TDengine IDMP 将自动切换到 `https://tdengine-registry.cn-beijing.cr.aliyuncs.com` 拉取镜像，大幅提升拉取镜像的速度。

## 2.2.3 通过 Docker 启动 TDengine IDMP

:::tip
通过 All-in-One 一键部署安装完成后，将自动启动 IDMP 及相关服务。您也可以手动启动服务，以 Linux & macOS 为例，启动命令如下：

```bash
cd ~/.apex/docker
./tdengine.sh start
```

:::

该命令将提示您选择部署模式：

- **标准部署** — TDengine TSDB Enterprise + IDMP
- **完整部署** — TDengine TSDB Enterprise + IDMP + TDgpt（支持时序数据预测和异常检测功能）

AI 服务已作为独立镜像 `tdengine/idmp-ai-ee` 部署，Docker Compose 配置中将自动包含该服务。

如果本地不存在所需镜像，将自动从远端拉取。

默认情况下，TDengine IDMP 服务监听主机的以下端口：

- HTTP 访问：`http://localhost:6042` 或 `http://ip:6042`
- HTTPS 访问：`https://localhost:6034` 或 `https://ip:6034`

## 2.2.4 激活

1. 首次访问时，您需要激活服务。在填写"邮箱"和"组织"后，点击**获取激活码**，系统会向您填写的邮箱发送一封激活邮件，输入邮件中的激活码后，点击**激活**，即可完成账户激活。

   :::note
   为方便 AI 相关功能的体验，IDMP 安装后预置了 DeepSeek 的 API key，有效期 7 天。到期后，请在 TDengine IDMP 的**管理后台 → 连接**更新您的 API key。
   :::

2. 激活码验证通过后，会弹出**隐私配置**对话框，您可以根据需求选择信息采集项，采集的信息将帮助我们改进产品，您的业务及生产数据绝不会被采集，配置完成后，请点击**同意**。

## 2.2.5 配置用户信息

1. 激活产品后，将进入用户信息配置页面。
2. 请根据系统提示，填写您的姓名和手机号。
3. 请设置系统的登录密码。
4. 密码验证通过后，就完成了用户信息的配置，点击**继续**

## 2.2.6 配置许可类型

1. 完成用户信息配置后，将进入软件许可选择页面
2. 用户可以选择免费版许可和商业版许可两种模式
3. 如果选择免费许可，当用户点击同意免费版软件使用条款后，系统将自动生成免费版软件许可
4. 如果选择商业版许可，此时用户需要输入从涛思公司获得的商业版软件许可码
5. 完成许可配置后，系统将自动跳转到加载示例场景页面。

请继续阅读[第 2.4 节](./04-experiencing-idmp.md)，探索 IDMP 功能。
