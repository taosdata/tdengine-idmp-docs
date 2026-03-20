---
title: Cálculo
sidebar_label: Cálculo
---

# 7.4 Cálculo

La sección Cálculo (sección 3 del formulario de análisis) define qué calcula el análisis y dónde almacena los resultados. Contiene cuatro partes: **Aplicar Cálculo En**, **Agregar en Ventana**, **Marca de Tiempo de Salida** y **Atributos de Salida**.

## Aplicar Cálculo En

Este botón de opción determina el alcance de los datos para el cálculo.

| Opción | Descripción |
|---|---|
| **El Propio Elemento** | El cálculo se ejecuta sobre los atributos propios del elemento. Este es el caso típico — úselo cuando calcule algo sobre este dispositivo o ubicación específicos. |
| **Agregación de Elementos Secundarios** | El cálculo agrega datos a través de los elementos secundarios del elemento que comparten una plantilla común. Use esto para calcular métricas como "potencia de salida promedio de todas las turbinas bajo esta granja eólica". |

Cuando se selecciona **Agregación de Elementos Secundarios**, aparecen dos campos adicionales:

| Campo | Descripción |
|---|---|
| **Plantilla de Elemento Secundario** | La plantilla que deben coincidir los elementos secundarios. Solo los elementos secundarios con esta plantilla se incluyen en la agregación. Se rellena automáticamente si todos los elementos secundarios comparten la misma plantilla. |
| **Filtro de Subtabla** | Una expresión de filtro opcional para reducir qué elementos secundarios se incluyen en la agregación. Por ejemplo, filtrar solo los elementos secundarios en un estado de operación específico. |

:::note
La **Agregación de Elementos Secundarios** solo está disponible cuando el elemento tiene elementos secundarios. En los elementos hoja, esta opción está deshabilitada y solo está disponible **El Propio Elemento**.
:::

## Agregar en Ventana

La casilla de verificación **Agregar en Ventana** (habilitada de forma predeterminada) controla si el cálculo se agrega sobre una ventana de tiempo.

Cuando está habilitado, el campo **Intervalo** especifica la longitud de la ventana de agregación (número + unidad de tiempo). Por ejemplo, un intervalo de 1 hora significa que cada activación del disparador calcula el agregado sobre la última hora de datos.

Cuando está deshabilitado, el cálculo se ejecuta sobre puntos de datos individuales sin agregación en ventana — adecuado para cálculos a nivel de fila o transformaciones.

## Marca de Tiempo de Salida

El menú desplegable **Marca de Tiempo de Salida** especifica qué marca de tiempo se escribe en el atributo de salida para cada fila de resultado:

| Opción | Descripción |
|---|---|
| **Inicio de Ventana** | La marca de tiempo del inicio de la ventana |
| **Fin de Ventana** | La marca de tiempo del fin de la ventana (predeterminado) |

El campo **Desplazamiento** añade un desplazamiento de tiempo (número + unidad, predeterminado 0 segundos) al límite de ventana seleccionado. Esto puede ser útil para desplazar la marca de tiempo de salida para la alineación de la visualización.

## Atributos de Salida

La tabla **Atributos de Salida** mapea expresiones de cálculo a atributos del elemento (y opcionalmente a atributos de evento cuando la generación de eventos está habilitada).

Cada fila de la tabla tiene las siguientes columnas:

| Columna | Descripción |
|---|---|
| **Expresión** | Una expresión de cálculo. Haga clic en la celda para abrir el Editor de Expresiones (véase la [Sección 3.2.9](../03-data-modeling/02-attributes.md#329-expression-editor)). |
| **Atributo de Elemento** | El atributo del elemento donde el resultado calculado se almacena como un nuevo valor de series temporales |
| **Atributo de Evento** | *(Visible solo cuando la generación de eventos está habilitada en la sección 4)* Un atributo de evento para capturar el valor calculado en el momento en que se activa el evento |

Use el botón **+** en la parte inferior de la tabla para añadir filas de salida adicionales. Cada fila es una expresión independiente — puede calcular múltiples métricas en un único análisis y escribirlas en diferentes atributos.
