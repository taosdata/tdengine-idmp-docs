---
title: 安装
sidebar_label: 安装
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.1 安装

## 前置条件

<Tabs groupId="language">
<TabItem value="java" label="Java">

- Java ≥ 11（推荐使用最新 LTS 版本）
- Maven 命令行工具

</TabItem>
<TabItem value="python" label="Python">

- Python ≥ 3.10

</TabItem>
</Tabs>

## 安装 SDK

<Tabs groupId="language">
<TabItem value="java" label="Java">

**第一步——将 SDK 安装到本地 Maven 仓库：**

```bash
cd idmp-java-sdk
mvn install -DskipTests
```

**第二步——在项目的 `pom.xml` 中添加依赖：**

```xml
<dependency>
  <groupId>com.taosdata</groupId>
  <artifactId>idmp-sdk</artifactId>
  <version>1.0.14.2</version>
</dependency>
```

</TabItem>
<TabItem value="python" label="Python">

进入 `idmp-python-sdk` 目录，使用 pip 安装：

```bash
cd idmp-python-sdk
pip install .
```

:::tip
建议在虚拟环境中安装，以避免与其他项目产生依赖冲突：

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install .
```

:::

</TabItem>
</Tabs>

## 验证安装

<Tabs groupId="language">
<TabItem value="java" label="Java">

在项目中添加以下 import。如果编译没有报错，说明 SDK 已正确安装：

```java
import org.openapitools.client.ApiClient;
// If this compiles, the SDK is installed correctly
```

</TabItem>
<TabItem value="python" label="Python">

```bash
python -c "import idmp_sdk; print('SDK installed successfully')"
```

</TabItem>
</Tabs>

## 私有仓库配置

若开发环境无法访问互联网，可将 SDK 托管在私有仓库中：

<Tabs groupId="language">
<TabItem value="java" label="Java">

将 JAR 上传到私有 Maven 仓库（Nexus、Artifactory 等），然后在 `pom.xml` 中配置仓库 URL：

```xml
<repositories>
  <repository>
    <id>private-repo</id>
    <url>https://your-maven-repo/repository/maven-releases/</url>
  </repository>
</repositories>
```

</TabItem>
<TabItem value="python" label="Python">

将 SDK 源码上传到私有 PyPI 服务器，然后从该索引安装：

```bash
pip install idmp-sdk --index-url https://your-pypi-server/simple/
```

</TabItem>
</Tabs>
