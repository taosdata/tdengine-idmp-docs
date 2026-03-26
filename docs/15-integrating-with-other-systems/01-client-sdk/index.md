---
title: 客户端 SDK
sidebar_label: 客户端 SDK
---

import DocCardList from '@theme/DocCardList';

# 15.1 客户端 SDK

TDengine IDMP SDK 提供对完整数据资产的编程访问：元素、属性、时序指标和事件。SDK 根据 IDMP 的 OpenAPI 规范自动生成，原生支持 **Java** 和 **Python**。对于其他语言，可使用 OpenAPI 规范配合 [OpenAPI Generator](https://openapi-generator.tech/) 生成任意受支持语言的客户端。

## 典型使用场景

- 从第三方系统批量读写元素属性数据
- 自动化创建和管理元素、指标和事件
- 将 IDMP 数据集成到自定义 BI 工具或数据平台
- 从 IDMP 事件触发外部自动化工作流
- 将工业上下文输送到 AI/ML 管道

:::note 即将推出
SDK 正式发布时，版本和兼容性信息将在此发布。请从 [涛思数据下载中心](https://www.taosdata.com/download-center) 下载最新 SDK 包。
:::

## SDK 包内容

从 [涛思数据下载中心](https://www.taosdata.com/download-center) 下载 SDK 包，其结构如下：

```bash
idmp-sdk-1.0.14.4/
  ├── idmp-v1.0.14.4.json    # OpenAPI 规范——用于为其他语言生成 SDK
  ├── idmp-java-sdk/              # Java SDK 源码和编译后的 JAR
  └── idmp-python-sdk/            # Python SDK 源码
```

## 为其他语言生成 SDK

若需要 Java 或 Python 以外的语言，可使用 OpenAPI Generator 配合随包附带的规范文件。

**第一步——下载 OpenAPI Generator CLI：**

```bash
wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.6.0/openapi-generator-cli-7.6.0.jar \
     -O openapi-generator-cli.jar
```

**第二步——生成目标语言 SDK：**

```bash
# 示例：生成 Go SDK
java -jar openapi-generator-cli.jar generate \
  -i idmp-v1.0.14.4.json \
  -g go \
  -o idmp-go-sdk \
  --skip-validate-spec
```

将 `-g go` 替换为目标语言名称。受支持语言及可用选项请参见 [OpenAPI Generator 文档](https://openapi-generator.tech/docs/generators)。

<DocCardList />
