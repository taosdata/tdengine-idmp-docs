---
title: Installation
sidebar_label: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

<Tabs groupId="language">
<TabItem value="java" label="Java">

- Java ≥ 11 (latest LTS release recommended)
- Maven command-line tools

</TabItem>
<TabItem value="python" label="Python">

- Python ≥ 3.10

</TabItem>
</Tabs>

## Installing the SDK

<Tabs groupId="language">
<TabItem value="java" label="Java">

**Step 1 — Install the SDK into your local Maven repository:**

```bash
cd idmp-java-sdk
mvn install -DskipTests
```

### Step 2 — Add the dependency to your project's `pom.xml`

```xml
<dependency>
  <groupId>com.taosdata</groupId>
  <artifactId>idmp-sdk</artifactId>
  <version>{SDK_VERSION}</version>
</dependency>
```

Replace `{SDK_VERSION}` with the actual version number, for example `1.0.13.0`.

</TabItem>
<TabItem value="python" label="Python">

Navigate to the `idmp-python-sdk` directory and install with pip:

```bash
cd idmp-python-sdk
pip install .
```

:::tip
Install in a virtual environment to avoid dependency conflicts with other projects:

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install .
```

:::

</TabItem>
</Tabs>

## Verifying the Installation

<Tabs groupId="language">
<TabItem value="java" label="Java">

Add the following import to your project. If it compiles without errors, the SDK is installed correctly:

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

## Private Repository Setup

If your development environment has no internet access, host the SDK in a private repository:

<Tabs groupId="language">
<TabItem value="java" label="Java">

Upload the JAR to your private Maven repository (Nexus, Artifactory, etc.), then configure the repository URL in `pom.xml`:

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

Upload the SDK source to a private PyPI server, then install from that index:

```bash
pip install idmp-sdk --index-url https://your-pypi-server/simple/
```

</TabItem>
</Tabs>
