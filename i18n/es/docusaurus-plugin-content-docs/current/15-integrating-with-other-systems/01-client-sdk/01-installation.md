---
title: Instalación
sidebar_label: Instalación
---

# 15.1.1 Instalación

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Prerrequisitos

<Tabs groupId="language">
<TabItem value="java" label="Java">

- Java ≥ 11 (se recomienda la última versión LTS)
- Herramientas de línea de comandos de Maven

</TabItem>
<TabItem value="python" label="Python">

- Python ≥ 3.10

</TabItem>
</Tabs>

## Instalar el SDK

<Tabs groupId="language">
<TabItem value="java" label="Java">

**Paso 1 — Instalar el SDK en su repositorio Maven local:**

```bash
cd idmp-java-sdk
mvn install -DskipTests
```

### Paso 2 — Agregar la dependencia al `pom.xml` de su proyecto

```xml
<dependency>
  <groupId>com.taosdata</groupId>
  <artifactId>idmp-sdk</artifactId>
  <version>1.0.14.2</version>
</dependency>
```

</TabItem>
<TabItem value="python" label="Python">

Navegue al directorio `idmp-python-sdk` e instale con pip:

```bash
cd idmp-python-sdk
pip install .
```

:::tip
Instale en un entorno virtual para evitar conflictos de dependencias con otros proyectos:

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install .
```

:::

</TabItem>
</Tabs>

## Verificar la instalación

<Tabs groupId="language">
<TabItem value="java" label="Java">

Agregue el siguiente import a su proyecto. Si compila sin errores, el SDK está instalado correctamente:

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

## Configuración de repositorio privado

Si su entorno de desarrollo no tiene acceso a internet, aloje el SDK en un repositorio privado:

<Tabs groupId="language">
<TabItem value="java" label="Java">

Cargue el JAR a su repositorio Maven privado (Nexus, Artifactory, etc.), luego configure la URL del repositorio en `pom.xml`:

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

Cargue el código fuente del SDK a un servidor PyPI privado, luego instale desde ese índice:

```bash
pip install idmp-sdk --index-url https://your-pypi-server/simple/
```

</TabItem>
</Tabs>
