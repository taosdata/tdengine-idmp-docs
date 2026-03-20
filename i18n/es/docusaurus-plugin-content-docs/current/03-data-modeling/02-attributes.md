---
title: Atributos
sidebar_label: Atributos
---

# 3.2 Atributos

Los atributos definen las propiedades y características medibles de un elemento. Son el puente entre el comportamiento físico de un activo y los datos almacenados en TDengine TSDB — transformando números sin procesar en valores de ingeniería con nombre, tipo y unidad de medida.

## 3.2.1 Qué es un atributo

Un atributo es una propiedad con nombre de un elemento que contiene o referencia un valor. Para un elemento de tipo bomba, los atributos podrían incluir caudal, presión de salida, temperatura del motor y estado operativo. Para un medidor inteligente, podrían incluir corriente, tensión, potencia e ID de dispositivo.

Los atributos dan contexto a los datos sin procesar. En lugar de consultar una columna de base de datos por su nombre técnico, los usuarios y las aplicaciones pueden referenciar los datos por un nombre de atributo significativo dentro de una jerarquía de activos bien definida.

## 3.2.2 Tipos de atributo

El **Tipo de referencia de datos** determina de dónde proviene el valor de un atributo. Hay cuatro tipos:

### 1. TDengine Metric

Referencia una columna de métrica (una columna de medición de serie temporal) en una tabla de TDengine TSDB. El valor del atributo se lee en tiempo real a medida que se ingieren nuevos datos. Utilice este tipo para cualquier valor que cambie con el tiempo — temperatura, presión, caudal, corriente, tensión, etc.

El formato de la Configuración de referencia de datos es:

```text
ConnectionName/DatabaseName/TableName/ColumnName
```

Ejemplo: `TDengine/idmp_sample_utility/em-12/current`

### 2. TDengine Tag

Referencia un valor de etiqueta en una tabla de TDengine TSDB. Las etiquetas son campos de metadatos estáticos adjuntos a una tabla (como ID de dispositivo, ubicación o planta de instalación). Utilice este tipo para atributos cuyos valores provienen de etiquetas de TSDB en lugar de columnas de series temporales.

El formato es el mismo que TDengine Metric:

```text
ConnectionName/DatabaseName/TableName/TagName
```

Ejemplo: `TDengine/idmp_sample_utility/em-17/location`

### 3. Fórmula

Un atributo calculado cuyo valor se deriva de una expresión que referencia otros atributos del mismo elemento. La expresión se convierte en una expresión SQL de TDengine y se ejecuta contra TDengine TSDB. La salida debe ser numérica.

Expresión de ejemplo:

```text
log(current) * voltage + 10
```

El parámetro de sustitución especial `TIME` está disponible — se sustituye por la hora local actual en milisegundos. Puede hacer clic en **Evaluar** en el editor de expresiones para probar y validar la fórmula antes de guardar. Consulte la [Sección 3.2.9](#329-expression-editor) para la referencia completa del Editor de expresiones.

:::note
Los atributos de fórmula solo pueden referenciar atributos del mismo elemento. Para usar un valor de otro elemento, añada un nuevo atributo al elemento actual que apunte a la misma fuente de datos.
:::

### 4. Constructor de cadenas

Similar a Fórmula pero la salida es una cadena. La entrada puede ser cualquier atributo del elemento actual (no limitado a tipos numéricos). Las funciones más comunes incluyen:

- `CONCAT(...)` — concatenar múltiples cadenas
- `SUBSTR(str, start, length)` — extraer una subcadena
- `CAST(value AS varchar)` — convertir un valor no cadena a cadena

También están disponibles parámetros de sustitución más allá de `TIME`, como el nombre del elemento actual, el nombre del atributo actual y el nombre de la plantilla.

Expresión de ejemplo:

```text
CONCAT(${Template#name}, 'Device', ${attributes['Device ID']}, ' voltage is ', CAST(${attributes['Voltage']} AS varchar), 'V')
```

:::note
Use `CONCAT()` para unir cadenas — el operador `+` no puede usarse para la concatenación de cadenas. Utilice siempre `CAST()` para convertir atributos numéricos a cadena antes de pasarlos a `CONCAT()`.
:::

## 3.2.3 Propiedades de los atributos

Cada atributo tiene las siguientes propiedades configurables:

### Campos básicos

| Propiedad | Descripción |
|---|---|
| **Nombre** | Un nombre único para el atributo dentro de su elemento |
| **Descripción** | Una explicación legible de lo que el atributo mide o representa |
| **Categorías** | Una o más etiquetas para agrupar y filtrar atributos dentro de la pestaña Atributos |
| **Tipo de valor** | El tipo de datos del valor: `Float`, `Double`, `Int`, `BigInt`, `TinyInt`, `SmallInt`, `Bool`, `Nchar`, `Varchar`, `Timestamp` |
| **Valor predeterminado** | El valor devuelto cuando no hay datos disponibles de la fuente de datos |
| **Clase de UdM** | La categoría de cantidad física (p. ej., Corriente eléctrica, Temperatura, Presión). Seleccionar una Clase de UdM filtra las opciones de unidad disponibles para UdM predeterminada y UdM de visualización. |
| **UdM predeterminada** | La unidad en la que se almacena el valor del atributo (p. ej., amperio, °C, bar) |
| **UdM de visualización** | La unidad usada al mostrar el valor en paneles y dashboards. Puede diferir de la UdM predeterminada — IDMP aplica la conversión automáticamente. |
| **Dígitos de visualización** | El número de decimales mostrados al visualizar el valor |
| **Tipo de referencia de datos** | De dónde proviene el valor del atributo: TDengine Metric, TDengine Tag o Ninguno (consulte [3.2.2](#322-attribute-types)) |
| **Configuración de referencia de datos** | La ruta a la fuente de datos de TDengine TSDB en el formato `base_de_datos/tabla/columna` |
| **Ruta** | La ruta completa del atributo dentro del modelo de activos (solo lectura, generada automáticamente) |

### Configuración de límites

Defina umbrales operativos para el atributo. Cada límite tiene un nombre y un valor numérico:

| Límite | Significado |
|---|---|
| **Mínimo** | El valor más bajo físicamente posible o aceptable |
| **LoLo** | Umbral de alarma bajo-bajo — condición crítica baja |
| **Lo** | Umbral de alarma bajo — condición de advertencia baja |
| **Objetivo** | El punto de ajuste deseado o valor normal de operación |
| **Hi** | Umbral de alarma alto — condición de advertencia alta |
| **HiHi** | Umbral de alarma alto-alto — condición crítica alta |
| **Máximo** | El valor más alto físicamente posible o aceptable |

Cada entrada de límite también tiene un campo **Atributo** opcional — puede vincular un límite a otro atributo en lugar de un valor fijo, permitiendo límites dinámicos que cambian según las condiciones en tiempo real.

### Configuración de pronóstico

Configure el pronóstico basado en IA para este atributo:

| Opción | Descripción |
|---|---|
| **TDgpt** | Usar el motor de pronóstico de series temporales integrado de TDengine (TDgpt) para predecir valores futuros |
| **Externo** | Conectar a un servicio de pronóstico externo a través de un endpoint configurado |
| **Ninguno** | Sin pronóstico (predeterminado) |

### Propiedades adicionales

Pares clave-valor de formato libre para almacenar cualquier metadato personalizado específico del atributo (p. ej., etiqueta de instrumento, fecha de calibración, modelo de sensor). Haga clic en **+** para añadir una nueva entrada.

### Indicadores de configuración

| Indicador | Descripción |
|---|---|
| **Elemento constante** | Marca este atributo como constante — su valor no cambia con el tiempo |
| **Oculto** | Oculta el atributo de la lista predeterminada de Atributos. Los atributos ocultos solo son visibles cuando el interruptor **Mostrar atributos ocultos** está activado. |
| **Excluido** | Excluye el atributo de los análisis y los conocimientos generados por IA |

## 3.2.4 Exploración de atributos

Para ver los atributos de un elemento:

1. Seleccione el elemento en el árbol de activos.
2. Haga clic en la pestaña **Atributos** en el panel de detalles del elemento.

La lista de atributos muestra: Nombre, Descripción, Valor actual, Tipo de valor, Tipo de referencia de datos, Hora de última actualización y Configuración de referencia de datos.

Use el desplegable **Categorías** para filtrar por categoría. Active **Mostrar atributos ocultos** para incluir los atributos marcados como ocultos.

Haga clic en cualquier nombre de atributo para abrir su vista de detalle completa.

## 3.2.5 Creación de atributos

Para añadir un nuevo atributo a un elemento:

1. Seleccione el elemento y haga clic en la pestaña **Atributos**.
2. Haga clic en el icono **+** en la barra de herramientas (parte superior derecha de la pestaña Atributos).
3. Complete el formulario del atributo:
   - Introduzca el **Nombre** y la **Descripción**.
   - Seleccione el **Tipo de valor** y establezca un **Valor predeterminado** si es necesario.
   - Seleccione la **Clase de UdM**, luego elija la **UdM predeterminada** y la **UdM de visualización**.
   - Establezca los **Dígitos de visualización**.
   - Seleccione el **Tipo de referencia de datos** e introduzca la ruta de **Configuración de referencia de datos**.
   - Opcionalmente expanda y configure la **Configuración de límites**, la **Configuración de pronóstico** y las **Propiedades adicionales**.
   - Establezca los indicadores de **Configuración** (Oculto, Excluido) según sea necesario.
4. Haga clic en **Guardar**.

## 3.2.6 Edición de atributos

Hay dos formas de editar un atributo:

### Método 1: Desde la vista de detalle del atributo

1. Haga clic en el nombre del atributo en la lista para abrir su vista de detalle.
2. Haga clic en el icono **Editar** (lápiz) en la barra de herramientas.
3. Modifique los campos deseados y haga clic en **Guardar**.

### Método 2: Desde el menú ⋮ de la lista de atributos

1. En la lista de Atributos, haga clic en el menú **⋮** en la fila del atributo.
2. Seleccione **Editar**.
3. Modifique los campos deseados y haga clic en **Guardar**.

## 3.2.7 Eliminación de atributos

Hay dos formas de eliminar un atributo:

### Método 1: Desde la vista de detalle del atributo

1. Abra la vista de detalle del atributo haciendo clic en su nombre.
2. Haga clic en el icono **Eliminar** (papelera) en la barra de herramientas superior derecha.
3. Confirme la eliminación.

### Método 2: Desde el menú ⋮ de la lista de atributos

1. En la lista de Atributos, haga clic en el menú **⋮** en la fila del atributo.
2. Seleccione **Eliminar** y confirme.

:::warning
Eliminar un atributo elimina su configuración y todos los metadatos asociados de TDengine IDMP. Los datos de series temporales subyacentes en TDengine TSDB no se ven afectados. Los dashboards, análisis o reglas de eventos que referencien el atributo eliminado pueden dejar de funcionar y deberán actualizarse.
:::

## 3.2.8 Otras operaciones con atributos

El menú **⋮** en la lista de atributos también ofrece las siguientes operaciones:

| Acción | Descripción |
|---|---|
| **Ver** | Abrir la vista de detalle del atributo |
| **Copiar** | Copiar la configuración del atributo. El atributo copiado puede pegarse como un nuevo atributo en el mismo elemento o en cualquier otro elemento. |
| **Subir / Bajar** | Reordenar el atributo dentro de la lista |
| **Añadir a tendencia** | Añadir rápidamente este atributo a un nuevo panel de gráfico de tendencias |
| **Valor histórico** | Ver los valores de series temporales históricos de este atributo |

## 3.2.9 Editor de expresiones

El Editor de expresiones es un componente de interfaz de usuario compartido que se usa en cualquier lugar donde se configuren expresiones en IDMP — incluyendo definiciones de atributos de Fórmula y Constructor de cadenas, atributos de salida de análisis y condiciones de activación de análisis (prefiltro y expresiones de ventana de evento). Se abre como cuadro de diálogo cuando hace clic en un campo de entrada de expresión.

### Dónde se usan las expresiones

| Ubicación | Propósito |
|---|---|
| **Atributo Fórmula** — Configuración de referencia de datos | Define un valor de atributo calculado derivado de otros atributos del mismo elemento |
| **Atributo Constructor de cadenas** — Configuración de referencia de datos | Construye un valor de cadena combinando valores de atributos con funciones de cadena |
| **Análisis** — Atributos de salida, columna Expresión | Calcula un resultado para escribir en un atributo de elemento o evento cada vez que se activa el análisis |
| **Análisis** — Activador, Prefiltro | Filtra filas de datos antes de que el activador evalúe |
| **Análisis** — Activador de ventana de evento, condiciones de Inicio/Parada | Define cuándo se abre y cierra la ventana de evento |

### Disposición del Editor de expresiones

El cuadro de diálogo tiene tres paneles:

### Panel de atributos (izquierda)

Examine e inserte los atributos del elemento en la expresión. Los atributos se organizan en grupos:

| Grupo | Contenido |
|---|---|
| **Métricas** | Atributos de métrica de serie temporal (p. ej., Corriente, Tensión, Potencia) |
| **Etiquetas** | Atributos de etiqueta (dimensión) — campos de metadatos estáticos |
| **Otros atributos** | Cualquier atributo restante definido en el elemento |
| **Parámetros de sustitución** | Valores de sustitución a nivel de sistema como `TIME` (hora local actual en milisegundos), nombre del elemento actual, nombre del atributo y nombre de la plantilla |

Un campo **Filtrar** en la parte superior le permite buscar por nombre. Haga clic en un atributo o parámetro para insertarlo en la posición del cursor en la expresión.

### Editor de expresiones (centro)

Un editor de código donde escribe la expresión. Una barra de acceso directo de operadores en la parte superior proporciona inserción con un clic de operadores comunes:

```text
+  -  *  /  =  <  >  >=  <=  !=  <>  &  |
```

### Panel de funciones (derecha)

Examine e inserte funciones por categoría. Un campo **Filtrar** le permite buscar por nombre de función. Haga clic en un nombre de función para insertarlo en la posición del cursor.

### Categorías de funciones

| Categoría | Funciones de ejemplo |
|---|---|
| **Funciones matemáticas** | ABS, CEIL, FLOOR, ROUND, SQRT, LOG, POW, SIN, COS, ... |
| **Funciones de cadena** | CONCAT, LENGTH, LOWER, UPPER, SUBSTR, TRIM, LTRIM, RTRIM, ... |
| **Funciones de conversión** | CAST, TO\_ISO8601, TO\_TIMESTAMP, ... |
| **Funciones de fecha y hora** | NOW, TODAY, TIMEZONE, TIMETRUNCATE, ... |
| **Funciones de agregación** | AVG, COUNT, SUM, STDDEV, STDDEV\_POP, PERCENTILE, SPREAD, ELAPSED, HISTOGRAM, ... |
| **Funciones de selección** | MAX, MIN, FIRST, LAST, LAST\_ROW, TOP, BOTTOM, UNIQUE, MODE, SAMPLE, ... |
| **Funciones específicas de serie temporal** | MAVG, DERIVATIVE, DIFF, IRATE, CSUM, INTERP, TWA, STATECOUNT, STATEDURATION, ... |

### Evaluación de una expresión

Donde se admite (definiciones de atributos de Fórmula y Constructor de cadenas), el editor incluye un botón **Evaluar** y una visualización de **Resultado de evaluación** en la parte inferior del panel central. Haga clic en **Evaluar** para ejecutar la expresión contra los datos actuales del elemento y verificar el resultado antes de guardar.

Haga clic en **Guardar** en el cuadro de diálogo para aplicar la expresión, o en **Cancelar** para descartar los cambios.

## 3.2.10 Plantillas de atributo {#attribute-templates}

Una **plantilla de atributo** define un atributo estándar — incluyendo su nombre, tipo de datos, unidad de medida y enlace de referencia de datos — como parte de una [plantilla de elemento](./01-elements.md#316-element-templates). Cuando se crea un elemento a partir de la plantilla, todas sus plantillas de atributo se instancian automáticamente, con las cadenas de sustitución resueltas a los valores reales para ese elemento.

### Creación de una plantilla de atributo

1. En **Bibliotecas**, abra la plantilla de elemento a la que desea añadir atributos.
2. Haga clic en la pestaña **Plantilla de atributo** en la parte superior de la página de detalles de la plantilla.
3. Haga clic en **+** para abrir el formulario de creación de plantilla de atributo.
4. Complete los campos del atributo y configure el enlace de referencia de datos (véase más abajo).

### Campos de la plantilla de atributo

| Campo | Descripción |
|---|---|
| **Nombre** | Nombre del atributo |
| **Descripción** | Descripción opcional |
| **Configuración** | Indicadores de configuración adicionales (p. ej., oculto, constante) |
| **Categorías** | Etiquetas de categoría |
| **Tipo de valor** | Tipo de datos: Float, Int, Varchar, Bool, etc. |
| **Valor predeterminado** | Valor predeterminado opcional |
| **UdM predeterminada** | La unidad de medida usada para el almacenamiento |
| **UdM de visualización** | La unidad de medida mostrada en la interfaz de usuario (puede diferir de la UdM de almacenamiento) |
| **Dígitos de visualización** | Número de decimales mostrados en la interfaz de usuario |
| **Tipo de referencia de datos** | Cómo se vincula el atributo a los datos de TDengine TSDB (véase más abajo) |
| **Configuración de referencia de datos** | La ruta de enlace resuelta, p. ej., `TDengine/idmp_sample_utility/${KEYWORD1}/current` |
| **Configuración de límites** | Umbrales de alarma Hi/Lo opcionales |
| **Configuración de pronóstico** | Configuración de pronóstico TDgpt opcional para este atributo |

### Enlace de referencia de datos

El **Tipo de referencia de datos** determina cómo se conecta el atributo a los datos de series temporales en TDengine TSDB:

| Tipo de referencia de datos | Uso |
|---|---|
| **Ninguno** | Sin enlace a TSDB — el atributo solo contiene un valor estático o calculado. |
| **TDengine Metric** | Vincula el atributo a una columna de métrica de serie temporal en una supertabla de TDengine. |
| **TDengine Tag** | Vincula el atributo a una columna de etiqueta en una supertabla de TDengine. |

Cuando selecciona **TDengine Metric** o **TDengine Tag**, configure el enlace especificando la conexión TDengine, la base de datos, el nombre de la tabla secundaria (usando cadenas de sustitución como `${KEYWORD1}` para que cada elemento se vincule a su propia tabla) y el nombre de columna. La Configuración de referencia de datos resultante toma la forma:

```text
TDengine/<database>/${KEYWORD1}/<column>
```

Haga clic en **Comprobar** para verificar que el enlace se resuelve correctamente para una entrada de prueba.
