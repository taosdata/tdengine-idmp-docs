---
title: Indicador de barra
sidebar_label: Indicador de barra
---

# 4.2.5 Indicador de barra

## Descripción general

El indicador de barra muestra los valores como barras rellenas, similar a un termómetro o una barra de progreso, mostrando hasta dónde ha llegado el valor dentro de un rango de escala configurable. Los umbrales de color en la barra dividen visualmente la escala en diferentes zonas, lo que facilita ver de un vistazo hasta dónde ha avanzado el valor en el rango.

Se pueden mostrar múltiples métricas en el panel como múltiples barras apiladas, lo que hace que el indicador de barra sea ideal para comparar en paralelo múltiples mediciones similares.

## Cuándo usarlo

Use el indicador de barra cuando:

- Prefiera la metáfora de relleno lineal en lugar de una esfera circular
- Muestre utilización de capacidad, nivel de llenado o porcentaje de completado
- Necesite comparar múltiples mediciones similares en un diseño compacto (como el nivel de múltiples tanques)
- La visualización de barra de progreso sea más intuitiva para su audiencia que un indicador con puntero

Para un único valor grande sin referencia de escala, use el panel de valor estadístico. Para un indicador estilo esfera, use el indicador.

## Configuración

### Barra de herramientas del modo de edición

Además de los [controles generales del modo de edición](../01-panels.md#414-modo-de-edición-de-paneles), el indicador de barra añade los siguientes controles:

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
| **Orientación del diseño** | Horizontal (la barra se rellena de izquierda a derecha) o vertical (la barra se rellena de abajo hacia arriba) |
| **Modo de visualización** | Estilo visual: **Degradado** (transición de color suave), **Básico** (relleno de color sólido), **LCD retro** (visualización segmentada) |
| **Visualización del valor** | Posición de visualización del valor: **Color del valor** (superpuesto en la barra, el color cambia con el umbral), **Color del texto** (superpuesto, color de texto normal), **Oculto** |
| **Visualización del nombre** | Posición del nombre de la métrica: **Automático** (junto a la barra) u **Oculto** |
| **Tamaño de barra** | **Automático** (la barra llena el espacio disponible) o **Manual** (tamaño fijo en píxeles) |
| **Valor mínimo** | El valor mínimo de la escala (predeterminado: 0) |
| **Valor máximo** | El valor máximo de la escala (predeterminado: 1) |
| **Decimales** | El número de decimales mostrados |

#### Umbrales

Los umbrales definen las bandas de color en la barra. Cada umbral especifica un valor y un color; cuando el valor cruza cada límite, la barra cambia de color:

| Ajuste | Descripción |
|---|---|
| **Umbrales** | Haga clic en **+ Añadir umbral** para definir un valor límite y su color |
| **Modo de umbral** | **Valor absoluto** (el umbral es el valor de datos sin procesar) o **Porcentaje** (el umbral es un porcentaje del rango mínimo-máximo) |

## Ejemplos de uso

**Nivel de tanques.** Cinco tanques tienen cada uno una métrica de nivel. Se añaden los cinco a un único panel de indicador de barra con diseño horizontal. Se establecen umbrales en 20% (rojo), 50% (amarillo) y 80% (verde), lo que permite al operador ver de inmediato qué tanques requieren atención.

**Comparación de utilización de capacidad.** Tres líneas de producción contribuyen con su producción por hora como métricas. El indicador de barra muestra la utilización de cada línea con un máximo del 100%, y el modo de visualización con degradado produce una transición de color suave de verde a rojo a medida que aumenta la utilización.

**Estado de carga de batería.** El estado de carga de un sistema de almacenamiento de energía se muestra como un indicador de barra vertical, con un valor mínimo de 0%, un valor máximo de 100% y umbrales porcentuales establecidos en 20% (rojo) y 50% (amarillo). El efecto visual comunica de forma intuitiva la reserva disponible.
