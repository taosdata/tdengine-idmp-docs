---
title: Imputación de datos faltantes
sidebar_label: Imputación de datos faltantes
---

# 8.9 Imputación de datos faltantes

Los datos de series temporales en entornos industriales frecuentemente tienen brechas — los sensores se desconectan, las interrupciones de red retrasan la entrega de datos, o los fallos de hardware causan pérdidas temporales de medición. La imputación de datos faltantes rellena estas brechas con valores estimados, asegurando que los análisis posteriores, los promedios y los cálculos de KPIs no se sesguen por lecturas faltantes.

:::note
La imputación de datos faltantes mediante TDgpt requiere que el **módulo TDgpt** esté instalado junto con IDMP. No requiere una conexión al LLM.
:::

IDMP proporciona imputación basada en IA a través de **TDgpt**, que utiliza patrones aprendidos del comportamiento histórico de la señal para estimar cuáles deberían haber sido los valores durante una brecha.

## Cómo funciona la imputación

La capacidad de imputación de TDgpt opera sobre una ventana de tiempo de datos históricos alrededor de una brecha. Aplica un modelo entrenado para predecir los valores más probables para las marcas de tiempo faltantes y escribe esas estimaciones de vuelta en los datos. Los valores imputados se marcan como estimados, distinguiéndolos de las mediciones reales del sensor.

La imputación es complementaria a las funciones de interpolación nativas de TDengine (`INTERP`, `FILL`). La interpolación nativa usa estrategias simples (lineal, valor anterior, valor siguiente) y es adecuada para brechas cortas y predecibles. La imputación de TDgpt usa patrones aprendidos y es más adecuada para brechas más largas, señales irregulares, o casos donde la interpolación simple produciría valores poco realistas.

## Configurar la imputación

La imputación se configura directamente desde un panel de gráfico de tendencias. Abra un gráfico de tendencias que muestre el atributo con datos faltantes, luego use el **icono de control de imputación** en el lado derecho del gráfico para habilitar la imputación y seleccionar el método.

## Algoritmos TDgpt compatibles

| Algoritmo | Características |
|---|---|
| **MEAN** | Rellena las brechas con la media local de los valores circundantes — rápido y robusto para señales estables |
| **IEM** | Maximización de expectativa iterativa — adecuado para señales multivariadas correlacionadas |
| **LSTM** | Modelo LSTM de PyTorch — captura dependencias temporales para señales complejas no estacionarias |
| **TDtsfm** | El modelo fundacional de series temporales de TDengine |

## Ver y alternar la imputación en un gráfico de tendencias

Los valores imputados aparecen en los paneles de gráficos de tendencias y las vistas de historial de atributos junto con los datos medidos, visualmente distinguibles de las mediciones reales del sensor.

En el panel de gráfico de tendencias, un **icono de control de imputación** en el lado derecho del gráfico le permite activar o desactivar la imputación directamente desde la vista del gráfico, sin cambiar la configuración del atributo. Use esto para comparar los datos sin procesar (con brechas) con la vista imputada.
