---
title: Exportación de datos
sidebar_label: Exportación de datos
---

# 11.3 Exportación de datos

En IDMP, cualquier vista de tabla o lista puede exportarse a un archivo CSV. Esto facilita la extracción de datos de IDMP para su uso en hojas de cálculo, informes u otras herramientas, sin necesidad de escribir consultas ni utilizar el complemento de Excel.

## Dónde está disponible la exportación CSV

La opción de exportación CSV está disponible en cada vista tabular de IDMP, incluidas:

| Vista | Qué se exporta |
|---|---|
| **Explorador — Lista de elementos secundarios** | La lista de elementos secundarios bajo un elemento seleccionado |
| **Explorador — Lista de atributos** | Valores de atributos y metadatos de un elemento seleccionado |
| **Lista de eventos** | Registros de eventos filtrados incluyendo marcas de tiempo, gravedad y estado |
| **Resultados del filtro de eventos** | Eventos que coinciden con los criterios de una búsqueda de eventos |
| **Resultados del filtro de atributos** | Metadatos de atributos que coinciden con sus criterios de búsqueda |
| **Resultados del filtro de activos** | Metadatos de elementos que coinciden con sus criterios de búsqueda |
| **Resultados de análisis** | Filas de salida de una consulta de análisis guardada |

## Cómo exportar

Busque el icono de **Exportar** o **Descargar** (normalmente una flecha hacia abajo o un icono CSV) en la barra de herramientas sobre la tabla. Haga clic en él para descargar los datos que se muestran actualmente — incluyendo cualquier filtro activo — como un archivo CSV.

La exportación refleja lo que está visible en la tabla en el momento de la descarga. Aplique filtros primero para acotar los datos antes de exportar.

## Complemento de Excel

Para una recuperación de datos más estructurada o recurrente en Excel, el [complemento de Excel](../10-excel-add-in/index.md) proporciona una integración diseñada específicamente para este fin, que le permite extraer datos de series temporales en tiempo real o históricos directamente en las celdas de la hoja de cálculo con control total sobre los rangos de tiempo, la agregación y el diseño de salida.
