---
title: Explorar y Gestionar Análisis
sidebar_label: Explorar Análisis
---

# 7.1 Explorar y Gestionar Análisis

Los análisis se gestionan desde la pestaña **Análisis** de cualquier elemento en el Explorador. Navegue a un elemento en el árbol de activos y haga clic en la pestaña **Análisis** para ver todos los análisis configurados en ese elemento.

## 7.1.1 La Lista de Análisis

La lista de análisis muestra todos los análisis del elemento actual con las siguientes columnas:

| Columna | Descripción |
|---|---|
| **Nombre** | El nombre del análisis — haga clic para abrir la vista de detalle del análisis |
| **Tipo de Disparador** | El tipo de disparador (Ventana Deslizante, Ventana Periódica de Tiempo, etc.) |
| **Nombre del Stream** | El nombre del stream de TDengine subyacente para este análisis |
| **Plantilla** | La plantilla de análisis a partir de la cual se creó este análisis, si corresponde |
| **Categorías** | Etiquetas de categoría |
| **Estado** | Estado de ejecución actual: **Ejecutando** o **Pausado** |
| **Hora de Actualización** | Cuándo se modificó el análisis por última vez |

## 7.1.2 Barra de Herramientas

| Control | Descripción |
|---|---|
| **+** | Crear un nuevo análisis manualmente — abre el formulario de creación de análisis |
| **Pegar** | Pegar un análisis copiado previamente en este elemento |
| **Actualizar** | Recargar la lista de análisis |
| **Intervalo de actualización automática** | Menú desplegable para configurar la actualización automática: Desactivado, 1s, 5s, 10s, 15s, 30s, 1m, 5m |
| **Exportar Lista Actual como CSV** | Exportar la lista de análisis como archivo CSV |
| **Seleccionar Columnas** | Mostrar u ocultar columnas en la lista |

El área de filtros sobre la lista proporciona un menú desplegable **Categorías** para filtrar por etiqueta de categoría, y un botón **IA** para alternar el panel de creación asistida por IA.

## 7.1.3 Acciones de Fila

Pase el cursor sobre cualquier fila de análisis y haga clic en el menú **⋮** (más) a la derecha para acceder a estas acciones:

| Acción | Descripción |
|---|---|
| **Ver** | Abrir la vista de detalle de solo lectura para este análisis |
| **Editar** | Abrir el análisis en modo de edición para modificar su configuración |
| **Copiar** | Copiar este análisis para poder pegarlo en otro elemento |
| **Convertir a Plantilla** | Guardar este análisis como plantilla de análisis reutilizable en la Biblioteca Base |
| **Análisis de Tendencias** | Abrir un gráfico de tendencias para el elemento, útil para inspeccionar la salida del análisis |
| **Recalcular Histórico** | Volver a ejecutar el análisis sobre datos históricos para rellenar los atributos de salida |
| **Pausar** | Pausar el análisis — detiene la ejecución sin eliminarlo (muestra **Reanudar** cuando está pausado) |
| **Eliminar** | Eliminar el análisis y opcionalmente eliminar los datos de salida que produjo |

## 7.1.4 Estados del Análisis

| Estado | Significado |
|---|---|
| **Ejecutando** | El stream de análisis está activo y se ejecuta sobre los nuevos datos a medida que llegan |
| **Pausado** | El análisis ha sido pausado manualmente — no se ejecutan nuevos cálculos hasta que se reanude |

Al eliminar un análisis, un diálogo de confirmación pregunta si también se deben eliminar los datos de salida anteriores que el análisis escribió previamente.
