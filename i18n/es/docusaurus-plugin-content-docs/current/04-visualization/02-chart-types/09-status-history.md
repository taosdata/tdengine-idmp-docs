---
title: Historial de estado
sidebar_label: Historial de estado
---

# 4.2.9 Historial de estado

## Descripción general

El historial de estado muestra la distribución del historial de estados de las métricas en una cuadrícula densa, donde cada columna representa un intervalo de tiempo y cada fila representa una métrica. Proporciona una vista compacta de estilo calendario adecuada para mostrar patrones de estado en múltiples dimensiones simultáneamente — ideal para detectar patrones cíclicos, diferencias de turno o períodos de comportamiento anómalo en rangos de tiempo más largos.

## Cuándo usarlo

Use el historial de estado cuando:

- Necesite una descripción general de alto nivel de estilo calendario del estado en múltiples intervalos de tiempo (horas, días, turnos)
- Esté comparando patrones de estado de múltiples métricas o equipos en el mismo período de tiempo
- Necesite responder preguntas como "¿En qué horas de esta semana se produjeron excedencias?" o "¿Qué equipos estaban en estado de alarma el lunes?"

Para mostrar bandas continuas que muestren cada transición de estado con detalle, use la línea de tiempo de estado.

## Configuración

### Barra de herramientas del modo de edición

Además de los [controles generales del modo de edición](../01-panels.md#414-modo-de-edición-de-paneles), el historial de estado añade los siguientes controles:

| Control | Descripción |
|---|---|
| **Guardar como imagen** | Descarga la vista previa actual como imagen PNG |
| **Pantalla completa** | Expande la vista previa del editor para llenar la ventana del navegador |
| **Interpretar panel** | Ejecuta el análisis de IA sobre los datos de la vista previa actual |

### Configuración del gráfico

| Ajuste | Descripción |
|---|---|
| **Título** | El título del gráfico |
| **Subtítulo** | El título secundario |
| **Mapeo de valores** | Haga clic en **+ Editar mapeo de valores** para definir la correspondencia entre los valores de datos y los colores y etiquetas de visualización. Por ejemplo: 0 → "Detenido" (gris), 1 → "En marcha" (verde), 2 → "Fallo" (rojo). |
| **Grosor de línea** | El ancho del borde entre celdas (control deslizante) |
| **Altura de fila** | La altura relativa de cada fila (control deslizante) |
| **Ancho de columna** | El ancho de cada columna de intervalo de tiempo (control deslizante) |
| **Transparencia de relleno** | Transparencia del color de relleno de las celdas, de 0 a 1 |
| **Rotación de etiquetas** | Ángulo de rotación de las etiquetas de tiempo del eje X |

El tamaño del intervalo de tiempo está controlado por el ajuste **Ventana deslizante** en la configuración de datos. Por ejemplo, una ventana deslizante de 1 hora genera una columna por hora.

## Ejemplos de uso

**Mapa de calor de alarmas semanal.** Se añaden diez señales de alarma como filas, y una ventana deslizante de 1 hora genera 168 columnas (7 días, una por hora). El mapeo de valores establece 0 → gris, 1 → rojo. La cuadrícula resultante permite ver de un vistazo qué equipos estaban en estado de alarma en qué horas.

**Revisión de patrones operativos por turno.** Una ventana deslizante de 8 horas a lo largo de un mes genera una columna por turno. Cada fila representa el modo operativo de una línea de producción. El gerente de operaciones puede ver de inmediato qué turnos siguieron el patrón esperado y cuáles tuvieron paradas no planificadas.

**Calendario de excedencias.** Un ingeniero de calidad añade 12 variables de proceso como filas y establece una ventana deslizante de 1 día. El mapeo de valores colorea las celdas en verde (dentro del límite) o rojo (fuera del límite). La vista de calendario resultante destaca los días con problemas de calidad en el proceso.
