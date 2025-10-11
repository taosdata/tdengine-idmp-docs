import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 通过 Docker 快速体验

TDengine IDMP 提供了丰富的功能，本文档将带领您通过 Docker Compose 的方式启动 TDengine IDMP 服务。如果您不熟悉 Docker，请参考[通过安装包快速体验](./get-started-installer)。在导入示例场景数据后，即可轻松体验元素浏览、AI 面板生成和 AI 分析等功能。

## 启动

:::tip

使用 Docker 的方式体验 TDengine IDMP, 需要从 Docker Hub 拉取镜像。如果您无法正常访问 Docker Hub，可以从 TDengine 产品下载中心的 [TDengine IDMP - Docker](https://www.taosdata.com/download-center?product=TDengine+IDMP-Enterprise&platform=Docker)页面，下载容器镜像文件，然后执行以下命令，加载 TDengine TSDB-Enterprise 和 TDengine IDMP 的镜像文件，以 x64 架构为例：

```bash
docker load -i tdengine-tsdb-enterprise-docker-<version>-linux-x64.tar.gz
docker load -i tdengine-idmp-enterprise-docker-<version>-linux-x64.tar.gz

docker tag tdengine/tsdb-ee-amd64:<version> tdengine/tsdb-ee:latest
docker tag tdengine/idmp-ee-amd64:<version> tdengine/idmp-ee:latest
```

待镜像导入成功后，再继续执行以下命令启动服务。
:::

TDengine IDMP 提供了 Docker 镜像，用户可以通过 Docker Compose 快速启动 TDengine IDMP 服务。具体步骤如下：

1. 克隆 TDengine IDMP 部署仓库

    <Tabs>
    <TabItem label="GitHub" value="github">
    从 Github 的 [TDengine IDMP Deployment](https://github.com/taosdata/tdengine-idmp-deployment) 仓库克隆代码
    ```bash
    git clone https://github.com/taosdata/tdengine-idmp-deployment.git
    ```
    </TabItem>
    <TabItem label="Gitee (国内镜像)" value="gitee">
    对于国内用户，如果您无法正常访问 Github, 可以从 Gitee 的 [TDengine IDMP Deployment](https://gitee.com/taosdata/tdengine-idmp-deployment) 镜像仓库克隆代码
    ```bash
    git clone https://gitee.com/taosdata/tdengine-idmp-deployment.git
    ```
    </TabItem>
    </Tabs>

2. 使用统一管理脚本启动 TDengine IDMP

    ```bash
    cd tdengine-idmp-deployment/docker
    chmod +x idmp.sh
    ./idmp.sh start
    ```

    该命令会提示您选择部署模式：启动标准部署（TSDB Enterprise + IDMP）或 完整部署（TSDB Enterprise + IDMP + TDgpt），并自动拉取所需镜像（如本地不存在）。

至此，TDengine IDMP 服务已成功启动。您可以在浏览器输入以下地址访问：[http://ip:6042](http://ip:6042),
请将 `ip` 替换为真实的主机 IP 地址，如果在本地运行，则可以直接访问 [http://localhost:6042](http://localhost:6042)。关于服务启动、停止更详细的操作指南，请您参考[使用 Docker 部署](../operation/installation/docker-guide)章节。


import Init from './_init.md'

<Init />

import Getstarted from './_get_started.md'

<Getstarted />