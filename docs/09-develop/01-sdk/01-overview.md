# 概述

## 简介

TDengine IDMP SDK 使您可以以编程的方式无障碍访问整个数据资产。SDK 基于 IDMP 的 OpenAPI 规范自动生成，目前原生提供 **Java** 和 **Python** 两种语言版本，其他语言可通过 [OpenAPI Generator](https://openapi-generator.tech/) 自行生成。

典型使用场景包括：

- 从第三方系统批量写入或读取元素属性数据
- 自动化创建和管理元素、指标、事件
- 将 IDMP 数据集成到自研 BI 工具或数据平台
- 基于 IDMP 事件触发外部系统的自动化流程

## 当前版本

| 项目 | 版本 |
|---|---|
| SDK 版本 | {SDK_VERSION} |
| 发布日期 | {RELEASE_DATE} |
| 配套 IDMP 版本 | {IDMP_VERSION} 及以上 |

## 兼容性矩阵

| SDK 版本 | 支持 IDMP 版本 | Java | Python | 状态 |
|---|---|---|---|---|
| {SDK_VERSION} | {IDMP_VERSION} 及以上 | ≥ 11 | ≥ 3.10 | 当前版本 |
| {PREV_SDK_VERSION} | {PREV_IDMP_VERSION} | ≥ 11 | ≥ 3.10 | 仅安全修复 |

## SDK 压缩包内容

从 [TDengine 下载中心](https://www.taosdata.com/download-center) 下载 SDK 压缩包后，目录结构如下：

```bash
idmp-sdk-{SDK_VERSION}/
  ├── idmp-v{SDK_VERSION}.json    # OpenAPI 规范文件，可用于生成其他语言的 SDK
  ├── idmp-java-sdk/              # Java SDK 源码及编译后的 JAR 包
  └── idmp-python-sdk/            # Python SDK 源码
```

## 生成其他语言的 SDK

如需使用 Java 和 Python 以外的语言，可通过 OpenAPI Generator 从规范文件自动生成。

### 第一步：下载 OpenAPI Generator CLI

```bash
wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.6.0/openapi-generator-cli-7.6.0.jar \
     -O openapi-generator-cli.jar
```

### 第二步：生成目标语言 SDK

```bash
# 示例：生成 Go SDK
java -jar openapi-generator-cli.jar generate \
  -i idmp-v{SDK_VERSION}.json \
  -g go \
  -o idmp-go-sdk \
  --skip-validate-spec
```

将 `-g go` 替换为目标语言名称，不同语言支持的 `--library` 和 `--additional-properties` 参数各有不同，详见 [OpenAPI Generator 文档](https://openapi-generator.tech/docs/generators)。
