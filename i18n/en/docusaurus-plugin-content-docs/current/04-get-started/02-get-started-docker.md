---
title: Get Started in Docker
sidebar_label: Docker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Init from './_init.md';
import Getstarted from './_get_started.md';

TDengine IDMP is offered as a Docker Compose setup to make deployment easy. This installs TDengine TSDB-Enterprise along with TDengine IDMP and automatically establishes a connection between them.

## Prerequisites

- Install Docker Engine 20.10 or later on your local machine. For instructions, see [Install Docker Engine](https://docs.docker.com/engine/install/) in the Docker documentation.
- Install Docker Compose 1.29.2 or later on your local machine. For instructions, see [Overview of installing Docker Compose](https://docs.docker.com/compose/install/) in the Docker documentation.
- Install Git on your local machine. For more information, see the [Git website](https://git-scm.com/).

## Deploy TDengine IDMP

1. Clone the [tdengine-idmp-deployment](https://github.com/taosdata/tdengine-idmp-deployment) repository:

   ```bash
   git clone https://github.com/taosdata/tdengine-idmp-deployment.git
   ```

1. Open the `docker` directory within the cloned repository:

   ```bash
   cd tdengine-idmp-deployment/docker
   ```

1. Start Docker Compose:

   - For a minimal installation, run the following command:

      ```bash
      docker compose up -d
      ```
   
   - To install TDengine TDgpt along with TDengine IDMP and TDengine TSDB-Enterprise, run the following command:

      ```bash
      docker compose -f docker-compose-tdgpt.yml up -d
      ```
      
      TDengine TDgpt includes AI/ML and other algorithms for performing time-series forecasting and anomaly detection within TDengine.

<Init />

<Getstarted />

## Uninstall TDengine IDMP

Once you’ve completed your evaluation, you can stop and remove the TDengine containers by running the following command:

```bash
docker compose down
```

If you also wish to remove the volumes created by TDengine, use the following command instead:

```bash
docker compose down -v
```

For more detailed instructions on starting and stopping the service, see [Docker Deployment](../07-operation/02-installation/03-docker-guide.md).