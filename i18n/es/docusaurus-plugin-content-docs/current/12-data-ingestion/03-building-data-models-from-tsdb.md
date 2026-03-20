---
title: Construcción de modelos de datos desde TDengine TSDB
sidebar_label: Construcción de modelos de datos desde TDengine TSDB
---

# 12.3 Construcción de modelos de datos desde TDengine TSDB

Para los usuarios que ya tienen datos en TDengine TSDB, IDMP puede construir automáticamente el modelo de datos de activos — elementos, plantillas de elementos y atributos — directamente desde el esquema del TSDB. Esto elimina la necesidad de crear elementos y atributos manualmente.

IDMP proporciona cuatro enfoques, todos accesibles desde la página de detalles de la conexión de TDengine en **Admin Console → Connections → [nombre de la conexión]**:

| Pestaña | Más adecuado para |
|---|---|
| **Easy Import** | Datos TSDB bien estructurados con etiquetas de ubicación jerárquicas — la ruta más rápida hacia un modelo completo |
| **Map STable to Element** | Datos sin etiquetas de ubicación, o cuando se necesita mapear múltiples supertablas a una plantilla de elemento |
| **Import from CSV** | Configuración masiva mediante un archivo CSV, especialmente para modelos de datos de una sola columna con muchas supertablas |
| **Import from OPC** | Datos con estructura OPC ya almacenados en TSDB |

## 12.3.1 Easy Import

Easy Import funciona mejor cuando sus supertablas de TSDB ya tienen una etiqueta que codifica la jerarquía de activos — por ejemplo, una etiqueta `location` cuyo valor es una ruta separada por puntos como `Plant.Line1.Machine3`. IDMP mapea cada supertabla a una plantilla de elemento y cada tabla secundaria a una instancia de elemento.

**Cómo utilizar:**

1. Seleccione la **Database** y la **Supertable** en la parte superior de la página. Marque **Ignore** para omitir una supertabla por completo.
2. En la sección **Tags**, configure cada etiqueta:
   - Marque **Path** para usar el valor de la etiqueta como la ubicación del elemento en el árbol de activos. Establezca **Path Level** (0 = hoja) para controlar la profundidad de la jerarquía. Opcionalmente, establezca un **Parent Element** para enraizar la importación bajo un elemento existente.
   - Deje **Path** sin marcar para importar la etiqueta como un atributo estático (propiedad del elemento).
   - Use el campo **Rename** para dar al atributo un nombre de visualización diferente al nombre de columna del TSDB.
   - Opcionalmente, asigne una **Attribute Category**.
3. En la sección **Metrics**, marque **Map STable to Element** para cada columna de métrica que desee importar como atributo dinámico. Use **Rename** y **Attribute Category** según sea necesario.
4. Opcionalmente, establezca una **Element Category** y un **Subtable Filter** (una expresión estilo SQL WHERE para incluir solo las tablas secundarias que coincidan).
5. Haga clic en **Next Supertable** para pasar a la siguiente supertabla, o haga clic en **Finish** para completar la configuración inmediatamente usando los valores predeterminados para las supertablas restantes.

Un resumen en la parte inferior de la página muestra cuántas etiquetas y métricas están seleccionadas para la supertabla actual, y el recuento total de supertablas seleccionadas frente a ignoradas.

**Sincronización automática:** Una vez que la tarea de importación se ejecuta, IDMP monitoriza el TSDB en busca de cambios de metadatos. Las nuevas tablas secundarias añadidas a una supertabla configurada se sincronizan automáticamente como nuevos elementos — sin intervención manual.

**Reconstrucción:** Si se añaden nuevas supertablas a la base de datos, haga clic en **Rebuild** para reabrir la configuración con los ajustes existentes precargados. Añada las nuevas supertablas y guarde.

**Enriquecimiento de datos:** Tras la importación, enriquezca cada elemento con unidades de medida, descripciones, categorías y umbrales de límite para dar contexto empresarial a los datos y hacerlos listos para IA.

## 12.3.2 Map STable to Element

Use este enfoque cuando sus datos TSDB carecen de una etiqueta jerárquica, usan un modelo de una sola columna (una supertabla por medición), o cuando necesita mapear columnas de múltiples supertablas a una única plantilla de elemento.

IDMP crea internamente supertablas y tablas virtuales para fusionar datos de múltiples supertablas en un elemento unificado — este proceso es transparente para el usuario.

**La pestaña Map STable to Element** muestra una lista de modelos de activos configurados con columnas: **Database**, **Supertable**, **Element Template Name**, **Status**, **Create Time** y **Update Time**.

Haga clic en **+ Add New Asset Model** para configurar un nuevo mapeo. El formulario incluye:

| Campo | Descripción |
|---|---|
| **Database** | La base de datos TDengine de origen |
| **Supertable** | La supertabla de origen |
| **Element Template** (obligatorio) | La plantilla de elemento a la que mapear. Debe crearse en Bibliotecas antes de comenzar. |
| **Element Name** (obligatorio) | Expresión que define el nombre del elemento. Haga clic en **+** para insertar cadenas de sustitución (p. ej., valores de etiquetas). Haga clic en el icono de vista previa para verificar el resultado. |
| **Element Path** (obligatorio) | Expresión que define la ubicación del elemento en el árbol de activos. Use puntos para separar los niveles de jerarquía, p. ej., `${location}.${rack}`. Haga clic en el icono de vista previa para verificar. |
| **Element Category** | Etiqueta de categoría opcional para los elementos creados |
| **Tags** | Mapear cada etiqueta de supertabla a una plantilla de atributo en la plantilla de elemento, o seleccionar **None** para descartarla |
| **Metrics** | Mapear cada columna de métricas de supertabla a una plantilla de atributo, o seleccionar **None** para descartarla |
| **Subtable Filter** | Expresión de filtro opcional para incluir solo las tablas secundarias que coincidan |

Haga clic en **Finish** para crear el modelo de activos. Cada modelo de activos cubre un mapeo de supertabla a plantilla. Para un modelo de datos completo de una sola columna, cree un modelo de activos por supertabla (o por subconjunto de métricas).

**Sincronización automática:** Las nuevas tablas secundarias añadidas a las supertablas mapeadas se sincronizan automáticamente como nuevos elementos.

:::note
Si se añaden nuevas supertablas a la base de datos después de la configuración, debe añadir manualmente un nuevo modelo de activos para cada una. Las nuevas supertablas no se detectan automáticamente.
:::

## 12.3.3 Import from CSV

La importación CSV es una alternativa masiva a Map STable to Element. Es más útil cuando tiene muchas supertablas que configurar — especialmente modelos de una sola columna — y prefiere definir todos los mapeos en una hoja de cálculo en lugar de hacerlo a través de la interfaz de usuario.

**Flujo de trabajo:**

1. Haga clic en el icono de **export** (descarga) en la barra de herramientas para exportar una plantilla de configuración CSV basada en su esquema TSDB. Seleccione las bases de datos y supertablas a incluir. Opcionalmente, marque **Export child table names** para incluir nombres de tablas secundarias individuales en los casos en que cada tabla secundaria necesite un nombre o ruta de elemento específico.
2. Edite el archivo CSV para rellenar las expresiones de nombre de elemento, expresiones de ruta de elemento, mapeos de plantillas de atributo y otros ajustes.
3. Haga clic en el icono de **import** (carga) en la barra de herramientas para cargar el archivo CSV completado. La tarea de importación se inicia inmediatamente.

La tabla de historial de tareas muestra: **Created At**, **Status**, **File Name** y **Reason** (si falló).

**Sincronización automática:** Las tareas sin un filtro de nombre de tabla secundaria específico sincronizan automáticamente las nuevas tablas secundarias añadidas a la base de datos.

**Reglas de formato del archivo CSV:**

- Las líneas de comentario comienzan con `#` y son obligatorias — no las elimine.
- La primera fila sin comentario es la fila de encabezado.
- Los datos se dividen en bloques; cada bloque comienza con una fila que establece el **Database Name** y el **Supertable Name**.
- Si no se especifica ninguna plantilla de elemento, se crea automáticamente una usando el nombre de la supertabla.
- La **Element Name Expression** admite cadenas de sustitución como `${tbname}` (nombre de tabla secundaria) o valores de etiquetas como `${tag_name}`.
- La **Element Path Expression** admite las mismas sustituciones. Un punto en el valor crea automáticamente niveles de jerarquía.
- El **Reference Type** debe ser `TDengineMetric` o `TDengineTag`.
- El archivo debe estar codificado en **UTF-8** (no UTF-8 con BOM). Si edita en Excel en Windows, convierta la codificación antes de cargar.

:::note
Si se añaden nuevas supertablas a la base de datos después de una importación CSV, cree una nueva tarea de importación para esas supertablas. Las tareas existentes no detectan nuevas supertablas automáticamente.
:::

## 12.3.4 Import from OPC

Use este enfoque cuando los datos con estructura OPC ya están almacenados en TDengine TSDB y desea construir el modelo de activos a partir de ellos.

La pestaña **Import from OPC** muestra la siguiente configuración por base de datos:

| Campo | Descripción |
|---|---|
| **Database** | La base de datos TDengine de origen |
| **Parent Element** | Un elemento existente opcional bajo el que enraizar los elementos importados |
| **Ignore** | Marque para omitir esta base de datos |

Para cada supertabla en la base de datos, configure:

| Columna | Descripción |
|---|---|
| Casilla de verificación | Incluir o excluir esta supertabla |
| **Super Table Name** | La supertabla a importar |
| **Path** | La columna de etiqueta cuyo valor representa la ruta del nodo OPC |
| **Data Column** | La columna de métricas que contiene los valores de datos |
| **Quality Column** | Etiqueta o columna opcional que contiene el valor de calidad de los datos |
| **Path Level** | El desplazamiento de profundidad dentro de la jerarquía de rutas |

Navegue entre bases de datos usando **Previous Database** y **Next Database**, luego haga clic en **Finish** para crear la tarea de importación.
