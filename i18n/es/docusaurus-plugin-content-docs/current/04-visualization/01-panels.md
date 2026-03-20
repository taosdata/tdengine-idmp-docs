---
title: Paneles
sidebar_label: Paneles
---

# 4.1 Paneles

Los paneles son la unidad básica de construcción de todas las visualizaciones en TDengine IDMP. Un panel es un componente de visualización independiente —un gráfico, indicador, tabla u otra forma de presentación— vinculado a uno o más atributos de un elemento específico. Cada panel pertenece a un elemento y obtiene sus datos de los atributos de ese elemento.

Esta página cubre la funcionalidad común compartida por todos los tipos de paneles: navegación, creación, edición, controles de la barra de herramientas y la interfaz de configuración de datos. Cada tipo de panel y sus ajustes específicos se describen en las secciones posteriores.

## 4.1.1 Pestaña de paneles

Navegue hasta cualquier elemento en el árbol de activos y haga clic en la pestaña **Paneles** para acceder a sus paneles.

### Explorar paneles

La barra de herramientas sobre la cuadrícula de paneles ofrece tres controles:

- **Categoría:** Filtra los paneles por etiqueta de categoría. Seleccione una categoría del menú desplegable para mostrar solo los paneles con esa etiqueta. Por defecto muestra "Todos".
- **IA:** Activa o desactiva las recomendaciones de IA. Cuando está habilitado, el motor de IA analiza los atributos del elemento y recomienda paneles relevantes según el tipo de datos y el contexto operativo. Haga clic de nuevo para mostrar solo los paneles guardados.
- **Vista de tarjetas/lista:** Alterna entre la vista de tarjetas (vista previa en miniatura) y la vista de lista (lista compacta con metadatos).

En el lado derecho de la barra de herramientas:

- **+ (Nuevo panel):** Abre el editor de paneles para crear un nuevo panel desde cero.
- **Icono de cuadrícula:** Ajusta la densidad de la cuadrícula de tarjetas.
- **Actualizar:** Recarga la lista de paneles.

### Paneles recomendados por IA

Cuando el interruptor de IA está activado, impulsado por la tecnología **Wuwen Zhitui**, el sistema genera recomendaciones de paneles junto a los paneles guardados. Cada tarjeta de recomendación muestra una vista previa y el título del panel. Puede:

- Hacer clic en **👍** para marcar la sugerencia como útil — esto no la guarda.
- Hacer clic en **👎** para descartar la sugerencia.
- Hacer clic en **⋮** → **Generar** sobre la sugerencia para guardarla como panel permanente.
- Hacer clic en **⋮** → **Eliminar** para quitar la sugerencia.

La tarjeta **+ Más sugerencias** al final de la lista permite solicitar sugerencias adicionales generadas por IA.

En la parte inferior de la lista de paneles hay un campo de texto que le permite describir un panel en lenguaje natural: "Dígame qué panel desea y lo generaré." Haga clic en **Pregúntame** para generar el panel descrito.

### Paneles guardados

Los paneles guardados se muestran como tarjetas con vista previa en miniatura en tiempo real. Pase el cursor sobre una tarjeta para mostrar el menú **⋮** (más) con las siguientes acciones:

| Acción | Descripción |
|---|---|
| **Ver** | Abre el panel en modo de vista completa |
| **Editar** | Abre el editor de paneles |
| **Copiar** | Crea una copia del panel en el mismo elemento |
| **Convertir a plantilla** | Guarda la configuración de este panel como plantilla de panel |
| **Abrir en nueva ventana** | Abre el panel en una ventana del navegador separada |
| **Eliminar** | Elimina permanentemente el panel |

## 4.1.2 Crear un panel

Para crear un nuevo panel manualmente:

1. Haga clic en la tarjeta **+ Nuevo panel** al final de la cuadrícula de paneles.
2. Aparece un cuadro de diálogo preguntándole que seleccione el tipo de panel: **Estándar** u **Organización**.
   - **Estándar:** Panel estándar basado en datos (gráficos de tendencia, gráficos de barras, indicadores, etc.).
   - **Organización:** Panel de organización con diseño libre para construir visualizaciones personalizadas.
3. Al seleccionar el tipo, el editor de paneles se abre inmediatamente en modo de edición.
4. Configure la fuente de datos, las métricas y los ajustes de visualización.
5. Haga clic en **Guardar** para guardar el panel.

Para crear un panel desde una recomendación de IA, haga clic en **⋮** → **Generar** sobre cualquier tarjeta de recomendación.

## 4.1.3 Modo de visualización de paneles

Haga clic en **Ver** en una tarjeta de panel para abrirlo en modo de vista completa. El panel ocupa el área de contenido principal con la jerarquía de elementos en el lado izquierdo.

### Barra de herramientas del modo de visualización

La barra de herramientas del modo de visualización para cada tipo de panel contiene los siguientes controles:

| Control | Descripción |
|---|---|
| **Volver a la lista** | Regresa a la pestaña de paneles |
| **Editar** | Abre el editor de paneles |
| **Favorito** | Marca este panel como favorito para acceso rápido |
| **Selector de tiempo** | Selecciona el rango de tiempo del gráfico (por ejemplo, los últimos 7 días). Haga clic en la flecha desplegable para seleccionar rangos preestablecidos o un rango personalizado. |
| **Alejar** | Expande el rango de tiempo al siguiente nivel |
| **Actualizar** | Recarga los datos del gráfico inmediatamente |
| **Actualización automática** | Configura el intervalo de actualización automática (desactivado, 5 s, 10 s, 30 s, 1 min, etc.) |
| **Guardar como imagen** | Descarga el gráfico actual como imagen PNG |
| **Compartir** | Genera un enlace de uso compartido con tiempo limitado para esta vista del panel |
| **Pantalla completa** | Expande el panel para llenar la ventana del navegador |
| **Abrir en nueva ventana** | Abre este panel en una ventana del navegador separada |
| **Interpretar panel** | Abre el informe de interpretación generado por IA para este panel |

Los controles adicionales de la barra de herramientas específicos de cada tipo de panel se describen en las secciones correspondientes.

## 4.1.4 Modo de edición de paneles

Haga clic en **Editar** en el modo de visualización, o en **⋮** → **Editar** en una tarjeta de panel, para abrir el editor de paneles. El editor se divide en tres áreas.

### Barra de herramientas del modo de edición

La barra de herramientas del modo de edición para cada tipo de panel contiene los siguientes controles:

| Control | Descripción |
|---|---|
| **Volver a la lista** | Regresa a la pestaña de paneles (solicita guardar o descartar los cambios) |
| **Guardar** | Guarda todos los cambios en el panel |
| **Descartar** | Descarta los cambios y vuelve al modo de visualización |
| **Selector de tiempo** | Selecciona el rango de tiempo de la vista previa |
| **Alejar** | Expande el rango de tiempo de la vista previa al siguiente nivel |
| **Actualizar** | Recarga los datos de la vista previa |
| **Actualización automática** | Configura el intervalo de actualización automática para la vista previa |

Los controles adicionales de la barra de herramientas específicos de cada tipo de panel se describen en las secciones correspondientes.

### Área izquierda: Fuente de datos

El área izquierda controla qué datos están disponibles para el panel. Los dos botones de opción en la parte superior determinan el modo de fuente de datos: **Elemento** y **Agregación de subelementos**.

### Modo Elemento

El panel obtiene datos del elemento actual y de cualquiera de sus subelementos descendientes. El área izquierda muestra dos secciones:

- **Métricas:** Atributos que pertenecen al elemento actual en sí (métricas de series temporales).
- **Subelementos:** Jerarquía navegable de todos los elementos descendientes. Expanda el árbol para navegar hasta cualquier subelemento y acceder a sus atributos. Los atributos de cualquier nivel pueden añadirse al panel.

Para añadir un atributo, haga doble clic en él en el árbol para añadirlo a la tabla de métricas. Alternativamente, pase el cursor sobre el atributo para mostrar el menú **⋮** y seleccione **Añadir a métricas** o **Añadir a dimensiones**.

### Modo Agregación de subelementos

El panel agrega datos de todos los subelementos de la plantilla de elemento seleccionada. En lugar de navegar a subelementos individuales, selecciona una **Plantilla de elemento** (por ejemplo, "Contador de electricidad" o "Contador de agua") desde un menú desplegable. El árbol muestra entonces todas las métricas y etiquetas de esa plantilla de elemento, permitiéndole construir un panel que muestre valores agregados o agrupados de todos los subelementos bajo esa plantilla simultáneamente.

### Área central: Vista previa y configuración de datos

La parte superior del área central muestra una vista previa en tiempo real del gráfico que se actualiza instantáneamente con sus modificaciones. Debajo del gráfico hay una miniatura para navegar.

Debajo de la miniatura está el área de configuración de datos, dividida en dos secciones plegables:

### Métricas

La sección de métricas define las series de datos trazadas en el gráfico. La fila de título ofrece tres controles adicionales:

- **Ver SQL:** Muestra la consulta SQL generada desde la configuración actual.
- **Límite:** Establece un límite superior en el número de registros devueltos.
- **Ventana deslizante:** Aplica la agregación de ventana deslizante. Configura el tamaño y la unidad de la ventana (s = segundos, m = minutos, h = horas, d = días). El icono de edición abre la configuración completa de la ventana deslizante; el icono de papelera la elimina.

Cada fila en la tabla de métricas representa una serie de datos:

| Columna | Descripción |
|---|---|
| **Nombre** | La etiqueta de visualización de esta serie en la leyenda del gráfico |
| **Expresión** | Expresión de agregación (por ejemplo, `avg(atributo)`, `max(atributo)`) |
| **Unidad de medida** | La unidad de medida mostrada. Déjela vacía para usar la unidad configurada en el atributo. |
| **Condición de filtro** | Condición de filtro opcional aplicada a esta serie |
| **Desplazamiento temporal** | Desplaza esta serie por una cantidad de tiempo para superposición de comparación histórica. Ingrese un número y seleccione la unidad. |
| **Predicción** | Configuración de predicción de IA para esta serie. Configúrelo como "Ninguno" para no predecir, o configure un modelo de predicción. |
| **Orden** | Orden de clasificación de los resultados de la consulta |

Use los iconos de acción al final de cada fila para editar o eliminar métricas.

### Dimensiones

La sección de dimensiones define las dimensiones de agrupación para las consultas de agregación. Se utiliza cuando necesita agrupar datos por campos categóricos (similar a SQL GROUP BY). Cada fila de dimensión contiene:

| Columna | Descripción |
|---|---|
| **Nombre** | La etiqueta de visualización de esta dimensión |
| **Expresión** | Expresión de agrupación |
| **Condición de filtro** | Condición de filtro para esta dimensión |
| **Agrupación** | Si incluir esta dimensión en GROUP BY |
| **Orden** | Orden de clasificación |

### Modo SQL avanzado

El interruptor **Avanzado** en la parte inferior del área de configuración de datos cambia al editor SQL sin procesar. En el modo avanzado, puede añadir múltiples consultas SQL —cada consulta aparece como un bloque de consulta independiente— y todos los resultados se muestran juntos en el mismo panel.

Cada bloque de consulta tiene un selector de **Tipo de consulta**:

| Tipo de consulta | Descripción |
|---|---|
| **TDengine** | Se ejecuta usando la conexión de TDengine asociada con el elemento o plantilla de elemento actual |
| **Evento** | Consulta los eventos generados por el sistema |

Después de ingresar una instrucción SQL completa, haga clic en **Validar** para verificar que es válida y ejecutable. Cuando se realiza correctamente, aparece un icono verde junto al botón. Después de una validación exitosa, hay dos selectores adicionales disponibles:

- **Columna de tiempo:** Selecciona qué columna de resultado usar como eje de tiempo. Deseleccionar trata los resultados de la consulta como datos no temporales.
- **Dimensiones:** Selecciona una o más columnas de resultado como columnas de dimensión (agrupación) en lugar de valores de métricas.

### Variables de plantilla

El SQL avanzado soporta cuatro variables de plantilla integradas que se reemplazan en el momento de la consulta:

| Variable | Se reemplaza por |
|---|---|
| `${FROM_TIME}` | La hora de inicio del selector de tiempo del panel |
| `${TO_TIME}` | La hora de fin del selector de tiempo del panel |
| `${Element#fullVirtualTable}` | El nombre completo de la tabla virtual del elemento actual |
| `${Element#name}` | El nombre del elemento actual |

:::tip
Las cuatro variables admiten autocompletado en el editor SQL: escriba `FROM_TIME`, `TO_TIME` o `ELEMENT` y el editor completará automáticamente la sintaxis completa de la variable. `${FROM_TIME}` y `${TO_TIME}` añaden u omiten comillas automáticamente según el contexto — no es necesario añadirlas manualmente. `${Element#fullVirtualTable}` maneja automáticamente las comillas invertidas. `${Element#name}` se resuelve como una cadena de texto simple — añada comillas simples a su alrededor cuando se use en comparaciones de cadenas.
:::

Controles adicionales para cada bloque de consulta:

- **Formatear:** Haga clic en el icono de formatear para aplicar formato automático a la instrucción SQL.
- **Habilitar/Deshabilitar:** Activa o desactiva el bloque de consulta sin eliminarlo, útil para excluir temporalmente una consulta del panel.

### Área derecha: Configuración de visualización

El área derecha contiene toda la configuración de visualización del gráfico. En la parte superior está el **selector de tipo de panel** — un menú desplegable que lista todos los tipos de panel disponibles. Cambiar el tipo vuelve a renderizar la vista previa con la nueva visualización mientras conserva la configuración de datos.

Los ajustes de visualización están organizados en secciones plegables. Las siguientes tres secciones se muestran para cada tipo de panel:

### General

| Campo | Descripción |
|---|---|
| **Nombre** | El título del panel que se muestra en la parte superior del gráfico |
| **Descripción** | Descripción opcional que se muestra al pasar el cursor o al exportar |
| **Categoría** | Una o más etiquetas para organizar y filtrar paneles en la lista de paneles |

### Enlace de datos

Define los vínculos en los que se puede hacer clic adjuntos a los puntos de datos. Cada enlace especifica una etiqueta y una URL, que puede incluir variables de plantilla que hacen referencia al tiempo o valor del punto de datos. Hacer clic en un punto de datos del gráfico abre el enlace configurado.

### Reglas de notificación

Configura las reglas de envío de informes programados en este panel. Consulte [Informes programados](./06-scheduled-reports.md) para más detalles.

Otras secciones de ajustes — gráfico, ejes, valores de límite, leyenda, etc. — son específicas del tipo de panel y se describen en las secciones de cada tipo de panel.

## 4.1.5 Gestión de paneles

**Categoría** son etiquetas de texto libre asignadas a los paneles en la configuración general. Aparecen en el menú desplegable de filtro "Categoría" de la pestaña de paneles, lo que permite a los usuarios encontrar rápidamente paneles por función o área del sistema (por ejemplo, eléctrico, mecánico, calidad).

**Favorito** marca un panel para acceso rápido. Los paneles marcados como favoritos aparecen en el filtro "Favoritos" de la pestaña de paneles.

**Convertir a plantilla** guarda la configuración de un panel como una plantilla de panel reutilizable. Una vez guardada en la biblioteca de plantillas, la misma estructura de panel puede aplicarse a otros elementos del mismo tipo sin necesidad de reconfigurar. Para más detalles sobre la gestión de plantillas, consulte [Plantillas de paneles y dashboards](./07-panel-dashboard-templates.md).
