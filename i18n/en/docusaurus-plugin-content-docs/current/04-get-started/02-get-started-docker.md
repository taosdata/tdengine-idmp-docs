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

2. Use the unified management script to start TDengine IDMP:

   ```bash
   chmod +x idmp.sh
   ./idmp.sh start
   ```
   
   This command will prompt you to select a deployment mode: start standard deployment (TSDB Enterprise + IDMP) or full deployment (TSDB Enterprise + IDMP + TDgpt), and automatically pull the required images (if not available locally).

<Init />

<Getstarted />

## Uninstall TDengine IDMP

Once you’ve completed your evaluation, you can stop and remove the TDengine containers by running the following command:

```bash
./idmp.sh stop
```

This command will automatically detect the currently running service type and use the appropriate configuration file to stop the services.  
The script provides an interactive prompt:

- **Default behavior**: Data volumes are preserved to ensure no data is lost.
- **Optional cleanup**: You can choose to remove data volumes if you want a completely clean environment.

For more detailed instructions on starting and stopping the service, see [Docker Deployment](../07-operation/02-installation/03-docker-guide.md).