---
title: Client SDK
sidebar_label: Client SDK
---

import DocCardList from '@theme/DocCardList';

# 15.1 Client SDK

The TDengine IDMP SDK gives you programmatic access to the full data asset: elements, attributes, time-series metrics, and events. The SDK is auto-generated from IDMP's OpenAPI specification and is natively available in **Java** and **Python**. For other languages, the OpenAPI spec can be used with [OpenAPI Generator](https://openapi-generator.tech/) to produce a client in any supported language.

## Typical Use Cases

- Bulk read or write element attribute data from third-party systems
- Automate creation and management of elements, metrics, and events
- Integrate IDMP data into custom BI tools or data platforms
- Trigger external automation workflows from IDMP events
- Feed industrial context into AI/ML pipelines

:::note Coming Soon
Version and compatibility information will be published here when the SDK reaches general availability. Download the latest SDK package from the [TDengine Download Center](https://www.taosdata.com/download-center).
:::

## SDK Package Contents

Download the SDK package from the [TDengine Download Center](https://www.taosdata.com/download-center). The package has the following structure:

```bash
idmp-sdk-1.0.14.5/
  ├── idmp-v1.0.14.5.json         # OpenAPI spec — use this to generate SDKs for other languages
  ├── idmp-java-sdk/              # Java SDK source and compiled JAR
  └── idmp-python-sdk/            # Python SDK source
```

## Generating an SDK for Other Languages

If you need a language other than Java or Python, use OpenAPI Generator with the included spec file.

**Step 1 — Download the OpenAPI Generator CLI:**

```bash
wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.6.0/openapi-generator-cli-7.6.0.jar \
     -O openapi-generator-cli.jar
```

**Step 2 — Generate the target language SDK:**

```bash
# Example: generate a Go SDK
java -jar openapi-generator-cli.jar generate \
  -i idmp-v1.0.14.5.json \
  -g go \
  -o idmp-go-sdk \
  --skip-validate-spec
```

Replace `-g go` with the target language name. See the [OpenAPI Generator documentation](https://openapi-generator.tech/docs/generators) for supported languages and available options.

<DocCardList />
