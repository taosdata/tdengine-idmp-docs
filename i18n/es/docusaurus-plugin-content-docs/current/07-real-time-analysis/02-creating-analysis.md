---
title: Crear un Análisis
sidebar_label: Crear un Análisis
---

# 7.2 Crear un Análisis

Para crear un nuevo análisis manualmente, navegue a la pestaña **Análisis** de un elemento y haga clic en **+** en la barra de herramientas, o haga clic en el botón **+ Crear Nuevo Análisis Manualmente** en la lista vacía. Esto abre el formulario de creación de análisis.

El formulario está dividido en cuatro secciones numeradas que se completan en orden: **Información General**, **Disparador**, **Cálculo** y **Evento**.

## 7.2.1 Información General

| Campo | Descripción |
|---|---|
| **Nombre** (obligatorio) | Un nombre único para este análisis. Manténgalo conciso y descriptivo — por ejemplo, "Voltaje Máximo por Hora" o "Eficiencia del Compresor". |
| **Categorías** | Etiquetas de categoría opcionales para organizar y filtrar análisis. Puede crear nuevas etiquetas de forma integrada. |
| **Habilitar análisis al crearlo** | Cuando está marcado (predeterminado), el análisis comienza a ejecutarse inmediatamente después de guardarse. Desmarque para crear el análisis en estado pausado. |
| **Recalcular para datos fuera de orden** | Cuando está marcado, si los datos llegan tarde (con una marca de tiempo anterior a los datos ya procesados), el análisis se vuelve a ejecutar para la ventana afectada. Útil cuando los datos del sensor pueden llegar con retraso o fuera de secuencia. |
| **Descripción** | Descripción opcional en texto libre de qué calcula este análisis y por qué. |

## 7.2.2 Disparador

La sección Disparador define cuándo se ejecuta el análisis. Consulte [Tipos de Disparador](./03-trigger-types.md) para obtener detalles completos sobre los ocho tipos de disparador y sus parámetros.

Todos los tipos de disparador comparten dos campos opcionales comunes:

- **Pre-filtro** — Una expresión de filtro aplicada a los datos antes de que el disparador evalúe. Solo se consideran las filas de datos que satisfacen el filtro. Esto es útil para ignorar lecturas no válidas (por ejemplo, filtrar valores cero antes de calcular promedios).
- **Recalcular Histórico** — Cuando está habilitado, el análisis se ejecuta sobre datos históricos para rellenar las salidas calculadas. Al habilitar este campo se muestran dos opciones adicionales:
  - **Priorizar Recálculo Histórico** — Cuando está marcado, el análisis procesa todos los datos históricos antes de comenzar a procesar nuevos datos en tiempo real.
  - **Hora de Inicio** — La fecha y hora desde la cual comenzar el relleno histórico.

## 7.2.3 Cálculo

La sección Cálculo define qué calcula el análisis y dónde se almacenan los resultados. Consulte [Cálculo](./04-calculation.md) para obtener detalles completos.

## 7.2.4 Evento

La sección Evento controla si el análisis genera un evento cada vez que se activa. Esta sección está deshabilitada de forma predeterminada. Habilítela marcando la casilla **Generar**. Consulte [Generar Eventos](./05-generating-events.md) para obtener detalles completos.

## 7.2.5 Guardar y Descartar

Haga clic en **Guardar** para crear el análisis. Si **Habilitar análisis al crearlo** estaba marcado, el análisis comienza a ejecutarse inmediatamente y aparece en la lista con el estado **Ejecutando**.

Haga clic en **Descartar** para cancelar. Aparece un diálogo de confirmación si tiene cambios sin guardar.

:::tip
El formulario incluye un panel **Guía de Usuario** plegable en el lado derecho que explica cada campo a medida que lo completa.
:::
