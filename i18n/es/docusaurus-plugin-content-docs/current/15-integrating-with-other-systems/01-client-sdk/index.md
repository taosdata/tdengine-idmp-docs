---
title: SDK de cliente
sidebar_label: SDK de cliente
---

import DocCardList from '@theme/DocCardList';

# 15.1 SDK de cliente

El SDK de TDengine IDMP le proporciona acceso programático al activo de datos completo: elementos, atributos, métricas de series temporales y eventos. El SDK se genera automáticamente a partir de la especificación OpenAPI de IDMP y está disponible de forma nativa en **Java** y **Python**. Para otros lenguajes, la especificación OpenAPI puede usarse con [OpenAPI Generator](https://openapi-generator.tech/) para producir un cliente en cualquier lenguaje compatible.

## Casos de uso típicos

- Lectura o escritura masiva de datos de atributos de elementos desde sistemas de terceros
- Automatización de la creación y gestión de elementos, métricas y eventos
- Integración de datos de IDMP en herramientas de BI personalizadas o plataformas de datos
- Activación de flujos de trabajo de automatización externos desde eventos de IDMP
- Alimentación de contexto industrial en pipelines de IA/ML

:::note Próximamente
La información de versión y compatibilidad se publicará aquí cuando el SDK alcance disponibilidad general. Descargue el último paquete del SDK desde el [Centro de descargas de TDengine](https://www.taosdata.com/download-center).
:::

## Contenido del paquete del SDK

Descargue el paquete del SDK desde el [Centro de descargas de TDengine](https://www.taosdata.com/download-center). El paquete tiene la siguiente estructura:

```bash
idmp-sdk-1.0.14.2/
  ├── idmp-v1.0.14.2.json         # OpenAPI spec — use this to generate SDKs for other languages
  ├── idmp-java-sdk/              # Java SDK source and compiled JAR
  └── idmp-python-sdk/            # Python SDK source
```

## Generar un SDK para otros lenguajes

Si necesita un lenguaje diferente a Java o Python, use OpenAPI Generator con el archivo de especificación incluido.

**Paso 1 — Descargar el CLI de OpenAPI Generator:**

```bash
wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.6.0/openapi-generator-cli-7.6.0.jar \
     -O openapi-generator-cli.jar
```

**Paso 2 — Generar el SDK para el lenguaje objetivo:**

```bash
# Example: generate a Go SDK
java -jar openapi-generator-cli.jar generate \
  -i idmp-v1.0.14.2.json \
  -g go \
  -o idmp-go-sdk \
  --skip-validate-spec
```

Reemplace `-g go` con el nombre del lenguaje objetivo. Consulte la [documentación de OpenAPI Generator](https://openapi-generator.tech/docs/generators) para conocer los lenguajes compatibles y las opciones disponibles.

<DocCardList />
