---
title: Tabla
sidebar_label: Tabla
---

# 4.2.6 Tabla

## Descripción general

El panel de tabla muestra los resultados de la consulta en una cuadrícula estructurada, con una fila por marca de tiempo y una columna por métrica. Es la forma más directa de leer los valores numéricos exactos devueltos por la consulta — sin agregación, sin codificación visual, solo números.

Todas las métricas configuradas se muestran como columnas. La columna de marca de tiempo siempre está incluida. Los controles de paginación en la parte inferior del panel permiten navegar por grandes conjuntos de resultados.

## Cuándo usarlo

Use el panel de tabla cuando:

- Necesite ver valores de datos precisos en lugar de tendencias visuales
- Esté validando la calidad de los datos o comprobando valores faltantes
- Quiera crear un informe de resumen con valores agregados para cada intervalo de tiempo
- Necesite exportar datos para su análisis posterior

Para el análisis visual de tendencias, use el gráfico de tendencia. Para un único valor de resumen, use el panel de valor estadístico.

## Configuración

### Barra de herramientas del modo de edición

Además de los [controles generales del modo de edición](../01-panels.md#414-modo-de-edición-de-paneles), la tabla añade los siguientes controles:

| Control | Descripción |
|---|---|
| **Guardar como imagen** | Descarga la vista previa actual como imagen PNG |
| **Pantalla completa** | Expande la vista previa del editor para llenar la ventana del navegador |
| **Interpretar panel** | Ejecuta el análisis de IA sobre los datos de la vista previa actual |

### Configuración del gráfico

| Ajuste | Descripción |
|---|---|
| **Formato de marca de tiempo** | El formato de visualización de la columna de marca de tiempo (predeterminado: `YYYY-MM-DD HH:mm:ss`) |

El panel de tabla no tiene secciones de ejes, valores de límite ni leyenda.

## Ejemplos de uso

**Verificación de calidad de datos.** Un ingeniero de datos añade todos los atributos de un elemento de contador de electricidad a un panel de tabla, establece un rango de tiempo de 1 hora y habilita la desactivación del muestreo. La salida fila por fila sin procesar le permite verificar que las lecturas llegan a los intervalos esperados y si hay valores faltantes o fuera de rango.

**Informe de resumen de turno.** Un gerente de operaciones configura una tabla con una ventana deslizante de 1 día y funciones de agregación (suma para el consumo de energía, promedio para la temperatura). La tabla resultante muestra una fila por día con el valor agregado de cada métrica — un informe tabular limpio adecuado para exportar.

**Revisión de eventos.** Un ingeniero de mantenimiento revisa una tabla de 7 días de conteos de alarmas agrupados por hora. Las columnas de marca de tiempo y conteo registran con precisión los períodos de mayor actividad de alarmas, complementando la visualización de tendencias.
