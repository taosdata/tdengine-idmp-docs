# Installation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerequisites

<Tabs groupId="language">
<TabItem value="java" label="Java">

- Java ≥ 11 (latest LTS version recommended)
- Maven command-line tool

</TabItem>
<TabItem value="python" label="Python">

- Python ≥ 3.10

</TabItem>
</Tabs>

## Install the SDK

<Tabs groupId="language">
<TabItem value="java" label="Java">

### Step 1: Install to local Maven repository

```bash
cd idmp-java-sdk
mvn install -DskipTests
```

**Step 2: Add dependency to your `pom.xml`**

```xml
<dependency>
  <groupId>com.taosdata</groupId>
  <artifactId>idmp-sdk</artifactId>
  <version>{SDK_VERSION}</version>
</dependency>
```

Replace `{SDK_VERSION}` with the actual version number, e.g. `1.0.13.0`.

</TabItem>
<TabItem value="python" label="Python">

Navigate to the `idmp-python-sdk` directory and install with pip:

```bash
cd idmp-python-sdk
pip install .
```

:::tip
Install inside a virtual environment to avoid dependency conflicts:

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install .
```

:::

</TabItem>
</Tabs>

## Verify Installation

<Tabs groupId="language">
<TabItem value="java" label="Java">

If the following import compiles without error, the SDK is installed correctly:

```java
import org.openapitools.client.ApiClient;
```

</TabItem>
<TabItem value="python" label="Python">

```bash
python -c "import idmp_sdk; print('SDK installed successfully')"
```

</TabItem>
</Tabs>

## Private / Offline Environments

<Tabs groupId="language">
<TabItem value="java" label="Java">

Upload the JAR to your private Maven repository (Nexus, Artifactory, etc.) and configure the repository in `pom.xml`:

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

Upload the SDK to a private PyPI server, then install with:

```bash
pip install idmp-sdk --index-url https://your-pypi-server/simple/
```

</TabItem>
</Tabs>
