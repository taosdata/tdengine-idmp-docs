# 安装

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 前提条件

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

### 第一步：将 SDK 安装到本地 Maven 仓库

```bash
cd idmp-java-sdk
mvn install -DskipTests
```

### 第二步：在项目 `pom.xml` 中添加依赖

```xml
<dependency>
  <groupId>com.taosdata</groupId>
  <artifactId>idmp-sdk</artifactId>
  <version>{SDK_VERSION}</version>
</dependency>
```

将 `{SDK_VERSION}` 替换为实际版本号，例如 `1.0.13.0`。

</TabItem>
<TabItem value="python" label="Python">

进入 `idmp-python-sdk` 目录后，使用 pip 安装：

```bash
cd idmp-python-sdk
pip install .
```

:::tip
建议在虚拟环境中安装，避免与其他项目的依赖冲突：

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install .
```

:::

</TabItem>
</Tabs>

## 验证安装

安装完成后，运行以下命令验证 SDK 是否可以正常加载：

<Tabs groupId="language">
<TabItem value="java" label="Java">

在项目中添加如下代码，能正常编译即表示安装成功：

```java
import org.openapitools.client.ApiClient;
// 如果编译通过，说明 SDK 安装正确
```

</TabItem>
<TabItem value="python" label="Python">

```bash
python -c "import idmp_sdk; print('SDK 安装成功')"
```

</TabItem>
</Tabs>

## 企业私有仓库

如果您的开发环境无法访问公网，需要将 SDK 托管到私有仓库：

<Tabs groupId="language">
<TabItem value="java" label="Java">

将 JAR 包上传到您的私有 Maven 仓库（如 Nexus、Artifactory），然后在 `pom.xml` 中配置私有仓库地址：

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

将 SDK 源码上传到私有 PyPI 服务器，然后指定索引地址安装：

```bash
pip install idmp-sdk --index-url https://your-pypi-server/simple/
```

</TabItem>
</Tabs>
