---
title: Get Started with Docker
sidebar_label: Docker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 2.2 Get Started with Docker

TDengine IDMP provides a one-click Docker Compose deployment that simplifies local setup. This installs TDengine TSDB-Enterprise together with TDengine IDMP and automatically establishes the connection between them.

The TDengine Download Center provides an All-in-One installation method that deploys all TDengine modules, including IDMP, with a single command. It supports Docker, Linux, and Windows. For details, see [section 14.13](../14-administration/40-all-in-one-deploy/index.md).

## 2.2.1 Environment Requirements

- Docker Engine 20.10 or later. See [Install Docker Engine](https://docs.docker.com/engine/install/).
- Docker Compose 1.29.2 or later. See [Install Docker Compose](https://docs.docker.com/compose/install/).
- A stable internet connection

## 2.2.2 Installation

Follow the Docker command provided for TDengine All-in-One in the Download Center.

All-in-One one-click deployment of TDengine IDMP automatically switches to `https://tdengine-registry.cn-beijing.cr.aliyuncs.com` to pull images and significantly improve download speed.

## 2.2.3 Start TDengine IDMP with Docker

:::tip
After All-in-One installation completes, IDMP and related services start automatically. You can also start them manually. On Linux and macOS:

```bash
cd ~/.apex/docker
./tdengine.sh start
```

:::

This command prompts you to select a deployment mode:

- **Standard** — TDengine TSDB Enterprise + IDMP
- **Full** — TDengine TSDB Enterprise + IDMP + TDgpt (time-series forecasting and anomaly detection)

The AI service is deployed as the independent image `tdengine/idmp-ai-ee` and is included automatically in the Docker Compose configuration.

Required images are pulled automatically if they are not present locally.

By default, the TDengine IDMP service listens on the following host ports:

- HTTP: `http://localhost:6042` or `http://ip:6042`
- HTTPS: `https://localhost:6034` or `https://ip:6034`

## 2.2.4 Activation

1. On first access, activate the service. After entering your email address and organization, click **Get Code**. The system sends an activation email. Enter the code from the email and click **Activate**.

   :::note
   To make it easier to try AI features, IDMP ships with a DeepSeek API key that is valid for 7 days. After it expires, update your API key under **Admin Console → Connections** in TDengine IDMP.
   :::

2. After the activation code is verified, the **Privacy Settings** dialog appears. Select the diagnostic items you want to share. Shared information helps us improve the product. Your business and production data are never collected. When finished, click **Agree**.

## 2.2.5 Configure User Information

1. After activation, you enter the user information page.
2. Follow the prompts to enter your name and phone number.
3. Set the system login password.
4. After the password is validated, user information configuration is complete. Click **Continue**.

## 2.2.6 Configure License Type

1. After user information is configured, you enter the software license selection page.
2. You can choose a free license or a commercial license.
3. If you choose a free license, the system generates a free license after you agree to the free edition terms.
4. If you choose a commercial license, enter the commercial license code obtained from TDengine.
5. After license configuration is complete, the system redirects to the sample scenario loading page.

Continue to [section 2.4](./04-experiencing-idmp.md) to explore IDMP features.
