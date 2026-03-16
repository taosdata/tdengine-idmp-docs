---
title: Docker 快速上手
sidebar_label: Docker
---

import Init from './_init.md';

TDengine IDMP 提供 Docker Compose 部署方式，可简化本地部署流程。该方式将同时安装 TDengine TSDB-Enterprise 与 TDengine IDMP，并自动建立两者之间的连接。

## 2.2.1 环境要求

- Docker Engine 20.10 或更高版本。参见 [Install Docker Engine](https://docs.docker.com/engine/install/)。
- Docker Compose 1.29.2 或更高版本。参见 [Install Docker Compose](https://docs.docker.com/compose/install/)。
- 已在本地机器上安装 Git。参见 [git-scm.com](https://git-scm.com/)。

## 2.2.2 准备 Docker 环境

克隆 TDengine IDMP 部署仓库：

```bash
git clone https://github.com/taosdata/tdengine-idmp-deployment.git
```

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

如果本地不存在所需镜像，将自动从远端拉取。

:::note
请将 `TZ` 环境变量设置为与您的实际环境匹配的时区。`Asia/Shanghai` 适用于北京时间环境。Compose 中的所有容器将继承该设置——时区配置错误将导致实时分析触发时间和事件时间戳出现偏差。
:::

<Init />

TDengine IDMP 实例现已就绪。请继续阅读[第 2.4 节](./04-experiencing-idmp.md)，加载示例数据并探索 IDMP 功能。
