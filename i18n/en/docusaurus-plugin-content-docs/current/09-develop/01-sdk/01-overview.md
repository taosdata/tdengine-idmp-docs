# Overview

## Introduction

TDengine IDMP SDK gives you programmatic access to your entire data asset estate. It is generated from the IDMP OpenAPI specification and natively provides **Java** and **Python** bindings. Other languages can be generated via [OpenAPI Generator](https://openapi-generator.tech/).

Typical use cases include:

- Bulk reading or writing element attribute data from/to third-party systems
- Automating the creation and management of elements, metrics, and events
- Integrating IDMP data into custom BI tools or data platforms
- Triggering external automation workflows based on IDMP events

## Current Version

| Item | Value |
|---|---|
| SDK Version | {SDK_VERSION} |
| Release Date | {RELEASE_DATE} |
| Compatible IDMP Version | {IDMP_VERSION} and above |

## Compatibility Matrix

| SDK Version | IDMP Server Version | Java | Python | Status |
|---|---|---|---|---|
| {SDK_VERSION} | {IDMP_VERSION} and above | ≥ 11 | ≥ 3.10 | Current |
| {PREV_SDK_VERSION} | {PREV_IDMP_VERSION} | ≥ 11 | ≥ 3.10 | Security fixes only |

## SDK Package Contents

Download the SDK package from the [TDengine Download Center](https://tdengine.com/downloads/). The package structure is:

```
idmp-sdk-{SDK_VERSION}/
  ├── idmp-v{SDK_VERSION}.json    # OpenAPI specification — use to generate SDKs for other languages
  ├── idmp-java-sdk/              # Java SDK source code and compiled JAR
  └── idmp-python-sdk/            # Python SDK source code
```

## Generating SDKs for Other Languages

If you need a language other than Java or Python, use OpenAPI Generator to generate from the spec file.

**Step 1: Download OpenAPI Generator CLI**

```bash
wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.6.0/openapi-generator-cli-7.6.0.jar \
     -O openapi-generator-cli.jar
```

**Step 2: Generate the SDK**

```bash
# Example: generate a Go SDK
java -jar openapi-generator-cli.jar generate \
  -i idmp-v{SDK_VERSION}.json \
  -g go \
  -o idmp-go-sdk \
  --skip-validate-spec
```

Replace `-g go` with your target language. For available language names, `--library` options, and `--additional-properties`, refer to the [OpenAPI Generator documentation](https://openapi-generator.tech/docs/generators).
