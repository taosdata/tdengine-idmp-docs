---
title: Uso del complemento
sidebar_label: Uso del complemento
---

# 10.3 Uso del complemento

Una vez conectado a IDMP, la pestaña **TDengine EAI** de la cinta de opciones proporciona todas las herramientas para recuperar datos, explorar eventos, filtrar activos y configurar el complemento. Cada botón abre un panel de tareas en el lado derecho de Excel, donde puede configurar la consulta y seleccionar una celda de salida.

## Descripción general de la cinta de opciones

| Botón | Descripción |
|---|---|
| **Current Value** | Recuperar el valor más reciente de uno o más atributos |
| **Archive Value** | Recuperar el valor del atributo en un momento específico |
| **Raw Data** | Recuperar datos brutos de series temporales en un intervalo de tiempo |
| **Sampled Data** | Recuperar datos de series temporales muestreados a intervalos regulares |
| **Timed Data** | Recuperar el valor del atributo en marcas de tiempo específicas |
| **Calculated Data** | Recuperar valores agregados (calculados) en ventanas temporales |
| **Time Filtered** | Recuperar datos filtrados por estado o expresión de condición |
| **Event Explore** | Consultar y exportar eventos de IDMP |
| **Attribute Filter** | Buscar y exportar metadatos de atributos |
| **Asset Filter** | Buscar y exportar metadatos de elementos (activos) |
| **Properties** | Recuperar una propiedad de metadatos específica de un atributo de elemento |
| **Update** | Actualizar todos los datos del libro de trabajo |
| **Settings** | Configurar ajustes globales del complemento |

## Campos comunes

La mayoría de los formularios de recuperación de datos comparten los siguientes campos:

| Campo | Descripción |
|---|---|
| **Data Items** | Los atributos de elementos de IDMP que se van a consultar. Haga clic en el icono de búsqueda para explorar la jerarquía de activos y seleccionar uno o más atributos. |
| **Output Cell** | La celda de Excel donde se escribirán los resultados. De forma predeterminada, es la celda actualmente seleccionada (p. ej., `Sheet1!A1`). |
| **Time Position** | Cómo se escriben las marcas de tiempo junto con los datos: **No Time Stamp** (solo valores), **Time at Left** (marca de tiempo en la columna de la izquierda) o **Time on Top** (marca de tiempo en la fila superior). |

Haga clic en **OK** para insertar los datos y cerrar el panel, o en **Apply** para insertar los datos y mantener el panel abierto para consultas posteriores.

## Current Value

Recupera el valor más reciente de los atributos seleccionados y lo escribe en la celda de salida.

| Campo | Descripción |
|---|---|
| **Data Items** | Los atributos que se van a consultar (obligatorio) |
| **Output Cell** | Celda de destino |
| **Time Position** | No Time Stamp / Time at Left / Time on Top |

## Archive Value

Recupera el valor del atributo en una marca de tiempo histórica específica, con soporte para relleno de huecos.

| Campo | Descripción |
|---|---|
| **Data Items** | Los atributos que se van a consultar (obligatorio) |
| **Fill Type** | Cómo rellenar si no existe un valor exacto en la marca de tiempo: **Previous** (usar el último valor conocido anterior) u otras estrategias de relleno |
| **Time Stamp** | La marca de tiempo específica que se va a consultar (obligatorio) |
| **Output Cell** | Celda de destino |
| **Time Position** | No Time Stamp / Time at Left / Time on Top |

## Raw Data

Recupera todos los puntos de datos brutos de series temporales en un intervalo de tiempo, sin ninguna agregación.

| Campo | Descripción |
|---|---|
| **Data Items** | Los atributos que se van a consultar (obligatorio) |
| **Start Time** | Inicio del intervalo de tiempo (obligatorio) |
| **End Time** | Fin del intervalo de tiempo (obligatorio) |
| **Output Cell** | Celda superior izquierda del rango de salida |
| **Time Position** | No Time Stamp / Time at Left / Time on Top |

## Sampled Data

Recupera datos de series temporales remuestreados a intervalos regulares en un intervalo de tiempo. Úselo para obtener una serie con espaciado uniforme independientemente de la frecuencia de los datos originales.

| Campo | Descripción |
|---|---|
| **Data Items** | Los atributos que se van a consultar (obligatorio) |
| **Start Time** | Inicio del intervalo de tiempo (obligatorio) |
| **End Time** | Fin del intervalo de tiempo (obligatorio) |
| **Time Interval** | El intervalo de remuestreo (p. ej., `1h`, `30m`, `1d`) |
| **Filter Expression** | Filtro opcional para excluir ciertos puntos de datos antes del muestreo |
| **Output Cell** | Celda superior izquierda del rango de salida |
| **Time Position** | No Time Stamp / Time at Left / Time on Top |

## Timed Data

Recupera el valor del atributo en una o más marcas de tiempo específicas que usted proporciona, con soporte para relleno de huecos.

| Campo | Descripción |
|---|---|
| **Data Items** | Los atributos que se van a consultar (obligatorio) |
| **Fill Type** | Cómo rellenar si no existe un valor exacto en una marca de tiempo dada (p. ej., **Previous**) |
| **Time Stamp** | Las marcas de tiempo específicas que se van a consultar |
| **Output Cell** | Celda de destino |
| **Time Position** | No Time Stamp / Time at Left / Time on Top |

## Calculated Data

Recupera datos agregados en ventanas de tiempo regulares — por ejemplo, la media horaria, el máximo diario o la suma por turno.

| Campo | Descripción |
|---|---|
| **Data Items** | Los atributos que se van a consultar (obligatorio) |
| **Start Time** | Inicio del intervalo de tiempo (obligatorio) |
| **End Time** | Fin del intervalo de tiempo (obligatorio) |
| **Time Interval** | El tamaño de la ventana de agregación (p. ej., `1h`) |
| **Filter Expression** | Filtro opcional aplicado antes de la agregación |
| **Aggregation Function** | La agregación que se va a aplicar (obligatorio). Compatible con todas las funciones de selección y agregación de TDengine que devuelven una fila de datos por ventana (p. ej., AVG, MAX, MIN, SUM, COUNT, FIRST, LAST, TOP, BOTTOM). |
| **Output Cell** | Celda superior izquierda del rango de salida |
| **Time Options** | Opcionalmente, mostrar columnas de **Start Time**, **End Time** o **Max/Min Time** junto con los valores agregados |

## Time Filtered

Recupera datos filtrados por un estado o condición definida por expresiones de inicio y fin — útil para extraer datos solo durante condiciones operativas específicas (p. ej., cuando una máquina está en funcionamiento).

| Campo | Descripción |
|---|---|
| **Data Items** | Los atributos que se van a consultar (obligatorio) |
| **Expression — Start With** | La expresión de condición que marca el inicio de un período válido (obligatorio) |
| **Expression — End With** | La expresión de condición que marca el fin de un período válido (obligatorio) |
| **Start Time** | Inicio del rango de búsqueda (obligatorio) |
| **End Time** | Fin del rango de búsqueda (obligatorio) |
| **Time Interval** | Intervalo para los puntos de datos dentro de cada período válido |
| **Time Units** | La unidad del intervalo de tiempo (p. ej., Second) |
| **Output Cell** | Celda superior izquierda del rango de salida |
| **Time Options** | Opcionalmente, mostrar columnas de **Start Time** y/o **End Time** |

## Event Explore

Consulta eventos de IDMP y exporta los resultados como tabla en la hoja de cálculo. Admite el filtrado por múltiples criterios.

| Campo | Descripción |
|---|---|
| **Name** | Filtrar por nombre de evento |
| **Description** | Filtrar por descripción de evento |
| **Template** | Filtrar por plantilla de evento |
| **Severity Level** | Filtrar por gravedad (All, Warning, Critical, etc.) |
| **Is Ack** | Filtrar por estado de reconocimiento |
| **Created at** | Filtrar por rango de tiempo de creación del evento |
| **Updated at** | Filtrar por rango de tiempo de última actualización |
| **Maximum Results** | Número máximo de eventos a devolver (predeterminado: 1000) |
| **Order By** | Campo de ordenación, con orden ascendente o descendente |
| **Element Criteria — Root Path** | Limitar los resultados a eventos asociados con elementos bajo una ruta específica del árbol de activos |
| **Output Cell** | Celda superior izquierda de la tabla de salida |
| **Columns to Display** | Seleccionar qué campos de evento incluir como columnas en la tabla de salida. Un selector múltiple permite elegir entre todos los campos de evento disponibles (p. ej., Ack, Status y más). |

## Attribute Filter

Busca metadatos de atributos de IDMP y exporta los resultados como tabla. Útil para auditar su modelo de datos o crear referencias dinámicas.

| Campo | Descripción |
|---|---|
| **Attribute Name** | Filtrar por nombre de atributo |
| **Attribute Description** | Filtrar por descripción de atributo |
| **Attribute Categories** | Filtrar por etiqueta de categoría de atributo |
| **Attribute Value Type** | Filtrar por tipo de dato (Float, Int, Bool, etc.) |
| **Maximum Results** | Número máximo de resultados (predeterminado: 1000) |
| **Order By** | Campo de ordenación, con orden ascendente o descendente |
| **Element Criteria** | Filtrar por el elemento propietario del atributo: Root Path, Name, Description, Categories, Template |
| **Output Cell** | Celda superior izquierda de la tabla de salida |
| **Columns to Display** | Seleccionar qué campos de atributo incluir como columnas en la tabla de salida. Un selector múltiple permite elegir entre todos los campos de atributo disponibles (p. ej., Name, Description y más). |

## Asset Filter

Busca elementos (activos) de IDMP y exporta los resultados como tabla.

| Campo | Descripción |
|---|---|
| **Root Path** | Limitar los resultados a elementos bajo una ruta específica del árbol de activos |
| **Name** | Filtrar por nombre de elemento |
| **Description** | Filtrar por descripción de elemento |
| **Attribute Name** | Filtrar elementos que tengan un atributo que coincida con este nombre |
| **Attribute Description** | Filtrar por descripción de atributo en el elemento |
| **Categories** | Filtrar por categoría de elemento |
| **Template** | Filtrar por plantilla de elemento |
| **Created at** | Filtrar por rango de tiempo de creación del elemento |
| **Updated at** | Filtrar por rango de tiempo de última actualización |
| **Maximum Results** | Número máximo de resultados (predeterminado: 1000) |
| **Order By** | Campo de ordenación, con orden ascendente o descendente |
| **Output Cell** | Celda superior izquierda de la tabla de salida |

## Properties

Recupera una propiedad de metadatos específica de un atributo de elemento (como su unidad de medida, descripción o límites configurados) y la escribe en una celda.

| Campo | Descripción |
|---|---|
| **Data Items** | El atributo que se va a consultar (obligatorio) |
| **Property** | La propiedad de metadatos que se va a recuperar (p. ej., unidad de medida, descripción, límite superior) |
| **Output Cell** | Celda de destino |

## Update

Haga clic en **Update** en la cinta de opciones para actualizar todos los datos del libro de trabajo. Cada celda que fue rellenada por el complemento TDengine EAI se vuelve a consultar con sus parámetros originales y se actualiza con los resultados más recientes.

Use esta función para mantener el libro de trabajo actualizado sin necesidad de reabrir cada formulario individualmente. Para una actualización periódica automática, configure el **Interval** en Settings.

## Settings

Configura los valores predeterminados globales del complemento.

| Campo | Descripción |
|---|---|
| **Time format** | El formato utilizado al escribir marcas de tiempo en las celdas (predeterminado: `YYYY-MM-DD HH:mm:ss`) |
| **Number format** | El formato numérico de Excel aplicado a las celdas de salida numérica (predeterminado: `General`) |
| **Maximum event count** | Número máximo de resultados predeterminado para consultas de Event Explore (predeterminado: 1000) |
| **Maximum filter search count** | Número máximo de resultados predeterminado para consultas de Attribute Filter y Asset Filter (predeterminado: 1000) |
| **Interval (seconds)** | Intervalo de actualización automática en segundos. Establezca `0` para desactivar la actualización automática. |

Haga clic en **Confirm** para guardar la configuración.
