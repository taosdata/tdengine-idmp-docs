---
title: Búsqueda de elementos y datos
sidebar_label: Búsqueda de elementos y datos
---

# 3.5 Búsqueda de elementos y datos

A medida que su modelo de activos crece, localizar rápidamente el elemento o atributo correcto se vuelve esencial. TDengine IDMP proporciona varias formas complementarias de navegar y buscar en su catálogo de activos: explorar el árbol de activos, buscar por palabra clave o criterios de filtro, guardar búsquedas como Filtros de elemento reutilizables y marcar como favoritos los elementos a los que accede con frecuencia.

## 3.5.1 Navegación por el árbol de activos

El **árbol de activos** en la barra lateral izquierda de la página del Explorador proporciona una vista jerárquica de todos los elementos en su modelo. Es la forma principal de explorar su catálogo de activos cuando sabe aproximadamente dónde se encuentra un activo en la jerarquía.

- Haga clic en la flecha **▶** junto a cualquier elemento para expandirlo y revelar sus elementos secundarios.
- Haga clic en la flecha **▼** para contraer una rama.
- Haga clic en el nombre de un elemento para seleccionarlo y abrir su vista de detalle en el panel principal.
- Pase el cursor sobre cualquier elemento del árbol para mostrar el menú **⋮**, que proporciona acciones rápidas: Nuevo elemento secundario, Eliminar y otras.

El árbol de activos admite jerarquías de cualquier profundidad. Expanda solo las ramas relevantes para su tarea actual y contraiga el resto para mantener la barra lateral manejable.

Debajo del árbol de activos, la barra lateral también contiene dos secciones adicionales: **Elementos favoritos** y **Filtros de elemento**, descritas en [3.5.4](#354-favorite-elements) y [3.5.5](#355-element-filters) respectivamente.

## 3.5.2 Exploración de un elemento

Cuando selecciona un elemento en el árbol de activos, el panel de detalles muestra las siguientes pestañas:

| Pestaña | Contenido |
|---|---|
| **General** | Nombre, ruta, plantilla, categorías, descripción, ubicación, atributos adicionales, documentos relacionados, anotaciones, elementos padre e historial de versiones |
| **Atributos** | Todos los atributos definidos en este elemento, con valores actuales, tipos, unidades y horas de última actualización |
| **Paneles** | Paneles asociados con este elemento, incluyendo paneles sugeridos por IA y creados manualmente |
| **Análisis** | Reglas de análisis en tiempo real definidas para este elemento |
| **Eventos** | Eventos generados por o asociados con este elemento |
| **Dashboards** | Dashboards que incluyen paneles de este elemento |
| **Elementos secundarios** | Una lista de todos los elementos secundarios directos |

## 3.5.3 Búsqueda

TDengine IDMP proporciona un cuadro de diálogo de **Búsqueda** unificado para encontrar elementos, atributos, dashboards, paneles y eventos en todo su catálogo de activos.

Para abrir el cuadro de diálogo de Búsqueda, haga clic en el **icono de búsqueda** (lupa) en la parte superior derecha del encabezado del panel Elementos en la barra lateral.

### Elección de qué buscar

Use los botones de opción en la parte superior del cuadro de diálogo para seleccionar el tipo de objeto a buscar:

| Opción | Busca |
|---|---|
| **Elemento** | Elementos por nombre, descripción, plantilla, categoría o contenido de atributos |
| **Atributo** | Atributos por nombre, descripción, categoría o tipo de valor |
| **Dashboard** | Dashboards por nombre |
| **Panel** | Paneles por nombre |
| **Evento** | Eventos por nombre |

### Ejecución de una búsqueda básica

Escriba una palabra clave en el cuadro de búsqueda y pulse **Intro** o haga clic en **Buscar**. Los resultados se muestran en una vista temporal de **Resultados de filtro** que muestra los elementos coincidentes con su Nombre, Ruta, Descripción, Plantilla y Categorías.

Haga clic en cualquier fila de resultado para navegar directamente a ese elemento. Para guardar la búsqueda para uso posterior, haga clic en el botón **Guardar como** en la barra de herramientas de Resultados de filtro — consulte [3.5.5](#355-element-filters).

### Filtros avanzados

Haga clic en **Avanzado** para expandir campos de filtro adicionales. Para búsquedas de **Elemento**:

| Filtro | Descripción |
|---|---|
| **Ruta raíz** | Restringir la búsqueda a elementos dentro de un subárbol específico |
| **Nombre** | Hacer coincidir elementos por nombre |
| **Descripción** | Hacer coincidir elementos por texto de descripción |
| **Nombre de atributo** | Hacer coincidir elementos que tengan un atributo con este nombre |
| **Descripción de atributo** | Hacer coincidir elementos que tengan un atributo con esta descripción |
| **Categorías** | Filtrar por una o más etiquetas de categoría |
| **Plantilla** | Filtrar por plantilla de elemento |
| **Creado en** | Filtrar por rango de fechas de creación |
| **Actualizado en** | Filtrar por rango de fechas de última actualización |
| **Resultados máximos** | Limitar el número de resultados devueltos |

Para búsquedas de **Atributo**, el panel Avanzado ofrece Nombre de atributo, Descripción de atributo, Categorías de atributo, Tipo de valor de atributo, Resultados máximos, Ordenar por, y una subsección de **Criterios de elemento** (Ruta raíz, Nombre, Descripción, Categorías) para restringir de qué elementos se extraen los atributos.

## 3.5.4 Elementos favoritos

Puede marcar cualquier elemento como **favorito** para acceder rápidamente sin navegar por el árbol de activos completo.

Para añadir un elemento a favoritos:

1. Seleccione el elemento en el árbol de activos.
2. En la barra de herramientas de la pestaña General, haga clic en el **icono de estrella** (☆).
3. La estrella se rellena y el elemento se añade a **Elementos favoritos**.

Para acceder a sus favoritos, haga clic en **Elementos favoritos** en la barra lateral izquierda (debajo del árbol de activos). Esto abre una lista plana de todos los elementos marcados como favoritos. Haga clic en cualquier entrada para navegar directamente a ese elemento.

Para eliminar un elemento de favoritos, selecciónelo y haga clic de nuevo en el icono de estrella para desactivarlo.

## 3.5.5 Filtros de elemento

Los **Filtros de elemento** son búsquedas guardadas — consultas reutilizables que puede ejecutar en cualquier momento para mostrar un subconjunto filtrado de elementos. Se listan en la sección **Filtros de elemento** en la parte inferior de la barra lateral izquierda.

### Guardar una búsqueda como Filtro de elemento

Después de ejecutar una búsqueda (consulte [3.5.3](#353-searching)), haga clic en el botón **Guardar como** en el lado izquierdo de la barra de herramientas de Resultados de filtro. Introduzca un nombre y confirme. El filtro se añade a la lista de **Filtros de elemento** en la barra lateral y puede volver a ejecutarse en cualquier momento.

### Trabajo con los resultados de filtro

La vista de **Resultados de filtro** muestra los elementos coincidentes en una tabla (Nombre, Ruta, Descripción, Plantilla, Categorías). La barra de herramientas proporciona las siguientes acciones:

| Acción | Ubicación | Descripción |
|---|---|---|
| **Guardar como** | Lado izquierdo | Guardar el resultado actual como un Filtro de elemento con nombre en la barra lateral |
| **Redefinir** | Lado derecho | Volver a abrir el cuadro de diálogo de Búsqueda para modificar los criterios de filtro |
| **Guardar como panel** | Lado derecho | Guardar el resultado como un panel de tabla de lista de activos en un elemento |
| **Añadir a plantilla** | Lado derecho | Añadir este filtro a una plantilla de elemento |
| **Actualizar** | Lado derecho | Volver a ejecutar el filtro para obtener resultados actualizados |
| **Exportar lista actual como CSV** | Lado derecho | Exportar la lista de resultados como un archivo CSV |
| **Seleccionar columnas** | Lado derecho | Activar o desactivar qué columnas se muestran en la tabla de resultados |

### Volver a ejecutar un filtro guardado

Haga clic en cualquier nombre de filtro en la lista de **Filtros de elemento** en la barra lateral para volver a ejecutarlo y ver los elementos coincidentes actuales.

## 3.5.6 Localización de datos desde eventos

Cuando investiga un evento, puede navegar directamente desde el evento al elemento fuente y sus datos.

1. Haga clic en **Eventos** en la barra de navegación superior, o haga clic en la pestaña **Eventos** de un elemento.
2. Haga clic en un evento en la lista de eventos para abrir su vista de detalle.
3. En el detalle del evento, haga clic en el nombre o la ruta del **elemento fuente** para navegar directamente a ese elemento en el Explorador.
4. Desde el elemento, cambie a la pestaña **Atributos** para ver los valores actuales e históricos, o abra la pestaña **Paneles** para visualizar los datos alrededor del momento en que ocurrió el evento.

Este flujo de trabajo facilita la investigación rápida de la causa raíz — llevándole desde un evento observado directamente al activo subyacente y sus datos.
