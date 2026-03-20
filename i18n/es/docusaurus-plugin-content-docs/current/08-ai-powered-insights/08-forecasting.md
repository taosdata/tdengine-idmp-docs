---
title: Pronóstico
sidebar_label: Pronóstico
---

# 8.8 Pronóstico

:::note
El pronóstico requiere que el **módulo TDgpt** esté instalado junto con IDMP. No requiere una conexión al LLM.
:::

IDMP soporta el pronóstico de series temporales basado en IA impulsado por **TDgpt**. El pronóstico predice valores futuros de un atributo de elemento basándose en su comportamiento histórico, permitiendo operaciones proactivas — identificar posibles superaciones de umbrales, planificar ventanas de mantenimiento o estimar el consumo futuro.

## Configurar el pronóstico en un atributo

El pronóstico se configura por atributo en la sección **Configuración de pronóstico** de las propiedades del atributo.

Para habilitar el pronóstico en un atributo:

1. Abra el atributo (desde la pestaña **Atributos** del elemento, haga clic en el nombre del atributo).
2. Haga clic en **Editar**.
3. Expanda la sección **Configuración de pronóstico**.
4. Seleccione el proveedor de pronóstico:

| Opción | Descripción |
|---|---|
| **TDgpt** | Usar el motor de pronóstico de series temporales integrado de TDengine. Seleccione el algoritmo de pronóstico y configure el horizonte de pronóstico (cuánto tiempo adelante predecir). |
| **Externo** | Conectar a un servicio de pronóstico externo a través de un endpoint configurado. |
| **Ninguno** | Sin pronóstico (predeterminado). |

5. Cuando se selecciona **TDgpt**, configure:

| Campo | Descripción |
|---|---|
| **Algoritmo** | El algoritmo de pronóstico (ver a continuación) |
| **Filas de pronóstico** | El número de puntos de datos futuros a predecir |

6. Haga clic en **Guardar**.

## Algoritmos compatibles

TDgpt proporciona varios algoritmos de pronóstico:

| Algoritmo | Características |
|---|---|
| **ARIMA** | Modelo estadístico clásico para series temporales estacionarias con componentes de tendencia y estacionalidad |
| **HoltWinters** | Suavizado exponencial con descomposición de tendencia y estacionalidad — adecuado para patrones periódicos regulares |
| **LSTM** | Red neuronal LSTM basada en PyTorch — captura dependencias temporales no lineales complejas |
| **TDtsfm** | El modelo fundacional de series temporales de TDengine, preentrenado con datos industriales de series temporales diversas para pronóstico sin entrenamiento previo y ajustado |

## Ver y alternar pronósticos en un gráfico de tendencias

Una vez que el pronóstico está habilitado en un atributo, los valores de pronóstico aparecen junto con los datos históricos en los paneles de gráficos de tendencias. Los valores predichos se muestran como una continuación de la línea de series temporales, visualmente distinguibles de los datos medidos.

En el panel de gráfico de tendencias, un **icono de control de pronóstico** en el lado derecho del gráfico le permite activar o desactivar la superposición de pronóstico sin cambiar la configuración del atributo. Use esto para mostrar u ocultar rápidamente los valores predichos mientras navega por los datos.

Los resultados del pronóstico son accesibles de forma programática mediante TDengine SQL usando la función `FORECAST`, que devuelve los valores predichos para un número configurado de filas futuras.

## Casos de uso

- **Gestión de energía:** Pronosticar el consumo de electricidad para las próximas 24 horas para optimizar la programación de carga.
- **Mantenimiento predictivo:** Pronosticar tendencias de temperatura o vibración para anticipar cuándo un valor superará un umbral.
- **Planificación de capacidad:** Pronosticar los niveles de tanques de almacenamiento o el rendimiento de producción durante la próxima semana.
