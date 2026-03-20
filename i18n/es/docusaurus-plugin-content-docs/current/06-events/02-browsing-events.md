---
title: Explorar Eventos
sidebar_label: Explorar Eventos
---

# 6.2 Explorar Eventos

Los eventos pueden explorarse desde dos lugares: la **vista global de Eventos** en la navegación principal, que muestra todos los eventos de todo el sistema, y la **pestaña Eventos** en cada elemento individual, que muestra solo los eventos de ese elemento y, opcionalmente, sus descendientes. Ambas vistas comparten el mismo diseño, controles y opciones de filtrado.

## 6.2.1 La Vista Global de Eventos

Haga clic en **Eventos** en la barra de navegación superior para abrir la lista de eventos a nivel de sistema. Esta vista muestra todos los eventos de todos los elementos a los que el usuario actual tiene permiso de acceso.

### Barra de Herramientas

| Control | Descripción |
|---|---|
| **Buscar** | Buscar eventos por nombre u otro texto |
| **Selector de columnas** | Mostrar u ocultar columnas opcionales. La columna **Ruta** (ruta jerárquica del elemento) está oculta de forma predeterminada |
| **Actualizar** | Recargar la lista de eventos |
| **Exportar CSV** | Exportar la lista de eventos filtrada actual como archivo CSV |
| **Guardar como Panel** | Guardar la lista de eventos actual como panel para poder añadirla a un panel de control |

### Filtros

Los siguientes controles de filtro reducen la lista de eventos:

- **Mostrar solo sin confirmar:** Alternar para mostrar únicamente los eventos que no han sido confirmados
- **Categorías:** Filtrar por etiqueta de categoría de evento
- **Plantilla:** Filtrar por plantilla de evento

### Barra Lateral Izquierda

- **Eventos Favoritos:** Eventos individuales marcados como favoritos para acceso rápido. Cualquier evento puede añadirse a favoritos.
- **Filtros de Eventos:** Configuraciones de filtros guardadas (véase [Filtros de Eventos Guardados](#623-filtros-de-eventos-guardados) a continuación)

### Columnas de la Lista de Eventos

| Columna | Descripción |
|---|---|
| **S** | Icono indicador del nivel de gravedad |
| **A** | Icono de estado de confirmación |
| **Nombre** | Nombre del evento — haga clic para abrir la página de detalle del evento |
| **Duración** | Tiempo transcurrido desde el inicio hasta el fin |
| **Hora de Inicio** | Marca de tiempo de inicio del evento |
| **Hora de Fin** | Marca de tiempo de fin del evento (en blanco si el evento sigue activo) |
| **Categorías** | Etiquetas de categoría |
| **Plantilla** | Nombre de la plantilla de evento |
| **Nivel de Gravedad** | Etiqueta de gravedad |
| **Código de Causa** | Código de causa, si está configurado |
| **Descripción** | Texto de descripción |

### Acciones de Fila

Pase el cursor sobre cualquier fila de evento para mostrar el menú **⋮** (más) a la derecha. Haga clic para expandir las siguientes opciones:

| Acción | Descripción |
|---|---|
| **Ver** | Abrir la página de detalle del evento |
| **Enviar Notificación** | Activar manualmente una notificación para este evento hacia sus puntos de contacto configurados |
| **Confirmar** | Confirmar el evento |
| **Análisis de Tendencias** | Abrir un gráfico de tendencias para el intervalo de tiempo del evento en su elemento asociado |
| **Eliminar** | Eliminar el registro del evento |

## 6.2.2 Eventos a Nivel de Elemento

Cada elemento tiene su propia pestaña **Eventos** que muestra solo los eventos asociados a ese elemento. Navegue a cualquier elemento en el árbol de activos y haga clic en la pestaña **Eventos**.

Un control de alcance determina qué eventos se muestran:

- **Solo este elemento:** Muestra los eventos generados por análisis configurados en este elemento
- **Incluir elementos secundarios:** Amplía la lista para incluir eventos de todos los elementos descendientes en la jerarquía

La opción de incluir elementos secundarios facilita revisar todos los eventos operacionales de una línea de producción o sitio completo — simplemente navegue al nivel apropiado en el árbol de activos.

La pestaña de eventos a nivel de elemento tiene los mismos filtros, columnas y acciones de fila que la vista global de eventos. Su barra de herramientas incluye todos los mismos controles más dos adicionales específicos de este contexto:

| Control | Descripción |
|---|---|
| **Generar datos de evento de prueba** | Crear un evento de prueba en este elemento para propósitos de desarrollo y validación |
| **Regla de Notificación** | Abrir la configuración de la regla de notificación para este elemento — véase [Alertas y Notificaciones](./04-alerts-and-notifications.md) |

## 6.2.3 Filtros de Eventos Guardados

Los **Filtros de Eventos** se crean realizando una búsqueda de eventos y guardando el resultado bajo un nombre. Después de ejecutar una búsqueda — usando cualquier combinación de los controles de filtro disponibles — guarde el resultado actual como filtro con nombre. El filtro guardado aparecerá en la sección **Filtros de Eventos** de la barra lateral izquierda. Al hacer clic en él, se vuelve a ejecutar la misma búsqueda y se restaura ese resultado de inmediato.
