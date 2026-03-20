---
title: Dashboards
sidebar_label: Dashboards
---

# 4.4 Dashboards

Los dashboards en TDengine IDMP son lienzos de disposición libre que combinan múltiples paneles en una única vista. Mientras que un panel muestra un gráfico de un solo elemento, un dashboard agrupa paneles de toda la jerarquía de un elemento —múltiples gráficos, indicadores de medidor, tablas y paneles de valores estadísticos dispuestos en una cuadrícula— para ofrecer a operadores e ingenieros una visión completa y de un vistazo de un activo o proceso.

## 4.4.1 La Pestaña Dashboards

Navegue a cualquier elemento en el árbol de activos y haga clic en la pestaña **Dashboards** para acceder a sus dashboards.

La barra de herramientas situada sobre la lista de dashboards ofrece los siguientes controles en el lado izquierdo:

- **Categorías:** Filtra los dashboards por etiqueta de categoría. El valor predeterminado es "Todos".
- **Selectores de vista:** Dos botones de icono para alternar entre mostrar solo los dashboards guardados, o incluir también los dashboards visibles desde elementos padre o hijo.

En el lado derecho:

- **+ (Añadir Nuevo Dashboard):** Abre el editor de dashboards para crear un nuevo dashboard.
- **Copiar:** Duplica un dashboard existente.
- **Actualizar:** Recarga la lista de dashboards.
- **Configuración:** Configura las preferencias de la lista de dashboards.

La lista muestra todos los dashboards guardados del elemento con las siguientes columnas:

| Columna | Descripción |
|---|---|
| **Nombre** | Nombre del dashboard |
| **Ruta** | Ruta del elemento al que pertenece el dashboard |
| **Descripción** | Descripción opcional |
| **Plantilla** | Indica si el dashboard fue creado desde una plantilla |
| **Categorías** | Etiquetas de categoría asignadas al dashboard |

Pase el cursor sobre una fila para mostrar los botones de acción para ver, editar o eliminar ese dashboard.

## 4.4.2 Creación de un Dashboard

Para crear un nuevo dashboard:

1. Haga clic en el botón **+** de la barra de herramientas de la pestaña Dashboards.
2. El editor de dashboards se abre con un lienzo de cuadrícula vacío.
3. Añada paneles al lienzo arrastrándolos desde la biblioteca de paneles de la izquierda o creando nuevos paneles.
4. Configure el nombre y los ajustes del dashboard en el panel derecho.
5. Haga clic en **Guardar** para guardar el dashboard.

Los dashboards también pueden crearse desde el modo de visualización de un panel: use **Guardar en Dashboard** en la barra de herramientas del panel para añadir ese panel a un dashboard nuevo o existente.

## 4.4.3 Editor de Dashboards

El editor de dashboards tiene tres áreas: una biblioteca de paneles a la izquierda, un lienzo central y un panel de configuración a la derecha.

### Barra de Herramientas del Editor

| Control | Descripción |
|---|---|
| **Volver** | Regresa a la pestaña Dashboards |
| **Guardar** | Guarda todos los cambios del dashboard |
| **Descartar** | Descarta los cambios |
| **+ (Crear Nuevo Panel e Insertar)** | Abre el editor de paneles para crear un nuevo panel y añadirlo al dashboard |
| **Selector de tiempo** | Establece el rango de tiempo para todos los paneles del dashboard |
| **Alejar** | Amplía el rango de tiempo al nivel siguiente |
| **Actualizar** | Recarga los datos de todos los paneles |
| **Actualización automática** | Establece un intervalo de actualización automática (Desactivada, 5 s, 10 s, 30 s, 1 min, etc.) |
| **Pantalla completa** | Expande el dashboard para ocupar toda la ventana del navegador |

### Panel Izquierdo: Biblioteca de Paneles

El panel izquierdo muestra los paneles disponibles para este elemento, organizados en árbol:

- **Paneles:** Enumera todos los paneles guardados pertenecientes al elemento actual. Expanda la sección para ver los nombres de los paneles.
- **Elementos hijo:** Enumera los elementos hijo cuyos paneles también pueden incluirse en este dashboard.

Para añadir un panel al lienzo, arrástrelo desde la biblioteca a la cuadrícula.

### Centro: Lienzo de Cuadrícula

El lienzo es una cuadrícula de 12 columnas. Los paneles se colocan arrastrándolos desde la biblioteca o usando el botón **+** de la barra de herramientas. Una vez colocados en el lienzo, los paneles pueden:

- **Redimensionarse** arrastrando el controlador de redimensionado en la esquina inferior derecha del panel.
- **Moverse** arrastrando el encabezado del panel a una nueva posición en la cuadrícula.
- **Eliminarse** haciendo clic en el icono de cerrar del panel.

Los paneles renderizan sus datos en tiempo real en el lienzo según la configuración de rango de tiempo actual del dashboard.

### Panel Derecho: Configuración del Dashboard

| Campo | Descripción |
|---|---|
| **Nombre** | Título del dashboard (obligatorio) |
| **Descripción** | Descripción opcional del dashboard |
| **Categorías** | Una o más etiquetas para filtrar y organizar los dashboards |
| **Regla de notificación** | Configura una regla de alertas a nivel de dashboard |

## 4.4.4 Añadir Paneles a un Dashboard

Hay tres formas de añadir contenido a un dashboard:

**Arrastrar desde la biblioteca de paneles.** El panel izquierdo muestra todos los paneles existentes guardados en el elemento actual. Arrastre cualquier panel al lienzo. El panel se renderiza con su configuración de datos y ajustes de visualización guardados.

**Crear un nuevo panel.** Haga clic en el botón **+ (Crear Nuevo Panel e Insertar)** de la barra de herramientas. Se abre el editor de paneles estándar en una nueva pestaña. Tras guardar el nuevo panel, se añade al lienzo del dashboard.

**Añadir desde el modo de visualización del panel.** Al visualizar cualquier panel en modo de vista completa, abra el menú **⋮** de la tarjeta del panel y seleccione una acción de dashboard, o navegue a la pestaña Dashboards y use la biblioteca de paneles para arrastrarlo al lienzo.

## 4.4.5 La Vista Global de Dashboards

El elemento **Dashboards** de la barra de navegación principal abre la lista global de dashboards, que muestra todos los dashboards de cada elemento del sistema.

La barra lateral izquierda de la vista global organiza la navegación en seis secciones:

- **Dashboards:** La lista principal de todos los dashboards del sistema.
- **Paneles:** Una lista global de todos los paneles guardados en todos los elementos.
- **Dashboards Favoritos:** Dashboards que ha marcado como favoritos.
- **Paneles Favoritos:** Paneles que ha marcado como favoritos.
- **Filtros de Dashboards:** Configuraciones de filtros guardadas para la lista de dashboards.
- **Filtros de Paneles:** Configuraciones de filtros guardadas para la lista de paneles.

La lista de dashboards muestra las siguientes columnas:

| Columna | Descripción |
|---|---|
| **Nombre** | Nombre del dashboard |
| **Descripción** | Descripción opcional |
| **Plantilla** | Indica si el dashboard fue creado desde una plantilla |
| **Categorías** | Etiquetas de categoría asignadas al dashboard |

La barra de herramientas ofrece un campo de búsqueda, un botón de descarga CSV para exportar la lista y un engranaje de preferencias de lista.

Desde la vista global puede:

- **Buscar y filtrar** por categorías para encontrar dashboards en toda la jerarquía.
- **Abrir** cualquier dashboard directamente.
- **Editar** o **eliminar** dashboards sin necesidad de navegar primero al elemento.

Esta vista es especialmente útil para la monitorización a nivel de flota: encontrar los dashboards de todos los medidores de una región, o revisar todos los dashboards de líneas de producción de un sitio, sin recorrer el árbol de activos.
