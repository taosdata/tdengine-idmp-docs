---
title: Conexiones
sidebar_label: Conexiones
---

# 12.1 Conexiones

Una **conexión** indica a IDMP cómo acceder a un sistema externo. Las conexiones se configuran en **Admin Console → Connections** y son referenciadas por las tareas de ingesta de datos y las importaciones de modelos de activos.

:::note
Las conexiones son de dos tipos, TDengine y AI: las conexiones TDengine se utilizan para la gestión de datos de negocio, mientras que las conexiones AI se utilizan para preguntas y respuestas inteligentes y recomendaciones de problemas.
:::

La lista de conexiones muestra todas las conexiones configuradas con las siguientes columnas:

| Columna | Descripción |
|---|---|
| **Name** | Nombre de la conexión |
| **Type** | Tipo de conexión (p. ej., TDengine TSDB) |
| **Connection Status** | Si la conexión está actualmente en uso |
| **URL** | La dirección del endpoint |
| **Auth Type** | Método de autenticación utilizado |

Para crear una conexión, haga clic en **+**. Para editar, habilitar/deshabilitar o eliminar una conexión existente, haga clic en el menú **⋮** de la fila de la conexión, o pase el cursor sobre el nombre de la conexión en el árbol izquierdo para mostrar el menú de acciones rápidas.

Una conexión TDengine TSDB vincula IDMP a una base de datos de series temporales TDengine. Una vez creada, habilita la importación de modelos de activos y el acceso a datos en tiempo real para todos los elementos y atributos que referencian esta conexión.

**Campos del formulario de conexión:**

| Campo | Descripción |
|---|---|
| **Name** (obligatorio) | Un nombre único para esta conexión. Acepta letras, números, guiones bajos, guiones y espacios. |
| **Type** | Seleccione **TDengine TSDB** |
| **URL** (obligatorio) | El endpoint de la API REST de TDengine, p. ej., `http://localhost:6041` |
| **Auth Type** | **Username Password** o **Token** |
| **Username** | Nombre de usuario de la base de datos (para autenticación con nombre de usuario y contraseña) |
| **Password** (obligatorio) | Contraseña de la base de datos |
| **Explorer URL** (obligatorio) | La dirección de TDengine Explorer para esta instancia, normalmente `http://[host]:6060` |
| **Additional Properties** | Pares clave-valor opcionales para configuración avanzada |

Haga clic en **Check** para verificar la conexión antes de guardar, y luego haga clic en **Save**.

:::tip
Para las conexiones AI utilizadas por las funciones de preguntas y respuestas inteligentes y análisis, consulte el [Capítulo 8 AI-Powered Insights](../08-ai-powered-insights/index.md).
:::
