---
title: Detalle del Evento
sidebar_label: Detalle del Evento
---

# 6.3 Detalle del Evento

Al hacer clic en el nombre de un evento — ya sea en la vista global de eventos o en la pestaña Eventos de un elemento — se abre la página de detalle del evento. La página de detalle tiene dos pestañas: **General** y **Atributos**. La barra de herramientas de acciones difiere entre pestañas.

## 6.3.1 Pestaña General

La pestaña General muestra todos los campos estándar del evento y proporciona los siguientes controles en la barra de herramientas:

### Barra de Herramientas

| Control | Descripción |
|---|---|
| **Volver a la Lista** | Regresar a la lista de eventos |
| **Confirmar** | Confirmar el evento |
| **Favorito** | Marcar este evento como favorito para acceso rápido desde la barra lateral izquierda |
| **Análisis de Causa Raíz** | Abrir la vista de análisis de causa raíz para este evento |
| **Análisis de Tendencias** | Abrir un gráfico de tendencias para el intervalo de tiempo del evento en su elemento asociado |
| **Reenviar** | Reenviar manualmente una notificación para este evento hacia sus puntos de contacto configurados |

### Campos

| Campo | Descripción |
|---|---|
| **Nombre** | Nombre del evento, generado a partir del patrón de nomenclatura de la plantilla de evento |
| **Plantilla** | La plantilla de evento utilizada para crear este evento |
| **Nivel de Gravedad** | La categoría de gravedad |
| **Código de Causa** | El código de causa, si está configurado |
| **Categorías** | Etiquetas de categoría |
| **Descripción** | Descripción en texto libre |
| **Hora de Inicio** | Cuándo comenzó el evento |
| **Hora de Fin** | Cuándo finalizó el evento (en blanco si sigue activo) |
| **Duración** | Tiempo transcurrido desde el inicio hasta el fin |
| **Elemento Asociado** | El elemento en el que se ejecuta el análisis disparador — haga clic para navegar hasta él |
| **Análisis Asociado** | La regla de análisis que generó este evento — haga clic para navegar hasta ella |
| **Estado** | Estado de confirmación (Sin Confirmar / Confirmado) |

### Secciones Expandibles

Debajo de los campos aparecen tres secciones plegables:

### Propiedades

Propiedades adicionales a nivel de sistema del registro del evento.

### Anotación

Área de notas en texto libre donde los operadores pueden añadir comentarios al evento — por ejemplo, hallazgos de la investigación o acciones correctivas tomadas. Consulte [Anotaciones](../11-collaboration/02-annotations.md) para más detalles.

### Registro de Notificaciones

Un registro de todas las notificaciones enviadas para este evento. Cada entrada muestra el nombre del punto de contacto, la marca de tiempo de entrega y si la entrega fue exitosa.

## 6.3.2 Pestaña Atributos

La pestaña Atributos muestra los atributos personalizados del evento — los valores con nombre registrados cuando el evento fue creado por el análisis.

### Barra de Herramientas

| Control | Descripción |
|---|---|
| **Volver a la Lista** | Regresar a la lista de eventos |
| **Categorías** | Filtrar la lista de atributos por categoría |
| **Actualizar** | Recargar los valores de los atributos |
| **Seleccionar Columnas** | Mostrar u ocultar columnas en la tabla de atributos |

### Tabla de Atributos

Cada fila de atributo muestra:

| Columna | Descripción |
|---|---|
| **Nombre** | Nombre del atributo, tal como se define en la plantilla de evento |
| **Valor** | El valor registrado en el momento de la creación del evento |
| **Tipo de Valor** | El tipo de dato del valor |

Estos atributos son definidos por la plantilla de evento y completados por el análisis que activó el evento. Los valores de los atributos son de solo lectura — se establecen cuando se crea el evento y no pueden modificarse.
