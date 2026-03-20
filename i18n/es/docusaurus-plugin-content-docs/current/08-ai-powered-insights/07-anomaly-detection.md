---
title: Detección de anomalías
sidebar_label: Detección de anomalías
---

# 8.7 Detección de anomalías

:::note
La detección de anomalías requiere que el **módulo TDgpt** esté instalado junto con IDMP. No requiere una conexión al LLM.
:::

La detección de anomalías en IDMP está impulsada por **TDgpt**, el motor de IA de series temporales integrado de TDengine. Está disponible como uno de los ocho tipos de activación al crear un análisis en tiempo real. A diferencia de los activadores basados en umbrales donde debe definir condiciones de límite explícitas, el activador de detección de anomalías identifica comportamientos inusuales automáticamente — usted selecciona el atributo objetivo y el algoritmo; TDgpt determina cuándo comienzan y terminan las anomalías.

## Cómo funciona

Cuando un análisis se configura con el activador de **Detección de anomalías**, TDgpt monitorea continuamente los datos de series temporales del atributo seleccionado. Aplica el algoritmo elegido para modelar el comportamiento esperado de la señal y marca los períodos en que los valores observados se desvían significativamente de ese modelo. El análisis se activa cuando se detecta una ventana de anomalía, y el evento que genera captura los tiempos de inicio y fin de la anomalía.

Dado que la detección está basada en modelos en lugar de reglas, TDgpt puede identificar patrones complejos — deriva gradual, picos repentinos, desviaciones estacionales — que los umbrales fijos perderían o activarían falsamente.

## Configurar un análisis de detección de anomalías

Para crear un análisis de detección de anomalías:

1. Navegue a la pestaña **Análisis** del elemento y haga clic en **+** para crear un nuevo análisis.
2. En la sección **Activador**, seleccione **Detección de anomalías** como tipo de activación.
3. Configure los campos del activador de detección de anomalías:

| Campo | Descripción |
|---|---|
| **Atributo** | El atributo del elemento a monitorear en busca de anomalías |
| **Algoritmo** | El algoritmo de detección de anomalías a aplicar (ver a continuación) |
| **Ventana** | La ventana de tiempo sobre la que el algoritmo evalúa cada segmento de datos |

4. Complete las secciones **Cálculo** y **Evento** como con cualquier otro tipo de análisis.
5. Haga clic en **Guardar**.

## Algoritmos compatibles

TDgpt incluye múltiples algoritmos de detección de anomalías respaldados por diferentes marcos de ML:

| Algoritmo | Marco | Características |
|---|---|---|
| **IQR** | Estadístico | Rango intercuartílico — simple, rápido, funciona bien para señales univariadas con valores atípicos claros |
| **LOF** | scikit-learn | Factor de valor atípico local — basado en densidad, eficaz para detectar anomalías de punto |
| **Isolation Forest** | scikit-learn | Basado en árboles, robusto para datos de alta dimensionalidad y densidad de anomalías variable |
| **LSTM-AD** | PyTorch | Modelo de secuencia basado en LSTM — captura dependencias temporales, adecuado para señales estacionales o periódicas |
| **TDtsfm** | TDengine | El propio modelo fundacional de series temporales de TDengine, preentrenado con datos industriales de series temporales |

El algoritmo apropiado depende de la naturaleza de la señal y el tipo de anomalía que espera. Para la mayoría de los flujos de sensores industriales, IQR o Isolation Forest proporcionan un buen punto de partida.

## Salida

Cuando TDgpt detecta una ventana de anomalía, el análisis se activa y (si la generación de eventos está habilitada) crea un evento que captura el período de la anomalía. Las marcas de tiempo de inicio y fin de la ventana de anomalía se almacenan como atributos del evento.

Para la referencia completa de configuración de activadores, consulte [Tipos de activación](../07-real-time-analysis/03-trigger-types.md).
