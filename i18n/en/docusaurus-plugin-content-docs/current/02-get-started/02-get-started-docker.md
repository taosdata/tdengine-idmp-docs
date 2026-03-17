---
title: Get Started with Docker
sidebar_label: Docker
---

import Init from './_init.md';

TDengine IDMP is offered as a Docker Compose setup to make deployment easy. This installs TDengine TSDB-Enterprise along with TDengine IDMP and automatically establishes a connection between them.

## 2.2.1 Environment Requirements

- Docker Engine 20.10 or later. See [Install Docker Engine](https://docs.docker.com/engine/install/).
- Docker Compose 1.29.2 or later. See [Install Docker Compose](https://docs.docker.com/compose/install/).
- Git installed on your local machine. See [git-scm.com](https://git-scm.com/).

## 2.2.2 Prepare the Docker Environment

Clone the TDengine IDMP deployment repository:

```bash
git clone https://github.com/taosdata/tdengine-idmp-deployment.git
```

## 2.2.3 Start TDengine IDMP with Docker

```bash
cd tdengine-idmp-deployment/docker
export TZ="UTC"
chmod +x idmp.sh
./idmp.sh start
```

This command will prompt you to select a deployment mode:

- **Standard** — TDengine TSDB Enterprise + IDMP
- **Full** — TDengine TSDB Enterprise + IDMP + TDgpt (adds AI/ML algorithms for time-series forecasting and anomaly detection)

The required images will be pulled automatically if not already present locally.

:::note
Set the `TZ` environment variable to match your environment. `UTC` is a good default for server environments. All containers in the Compose stack inherit this setting — an incorrect timezone will cause analysis triggers and event timestamps to be misaligned.
:::

<Init />

Your TDengine IDMP instance is now ready to use. Continue to [Section 2.4](./04-experiencing-idmp.md) to load sample data and explore IDMP features.
