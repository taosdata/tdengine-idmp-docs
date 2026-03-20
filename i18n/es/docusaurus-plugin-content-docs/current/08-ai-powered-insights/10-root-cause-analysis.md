---
title: Análisis de causa raíz
sidebar_label: Análisis de causa raíz
---

# 8.10 Análisis de causa raíz

El análisis de causa raíz (RCA) es una función investigativa impulsada por IA que, dado un evento, recupera automáticamente datos históricos relevantes, formula hipótesis sobre la causa, prueba esas hipótesis y produce un informe de análisis estructurado — todo sin intervención manual.

Esta función utiliza el **Modelo de pensamiento profundo** configurado en Gestión de conexiones para realizar razonamiento de múltiples pasos sobre sus datos de series temporales, conocimiento operativo y referencias técnicas disponibles públicamente.

## Cómo acceder

Se accede al análisis de causa raíz desde la **página de detalle del evento**:

1. Navegue a la sección **Eventos** desde la navegación superior.
2. Haga clic en cualquier evento para abrir su vista de detalle.
3. En la barra de herramientas del lado derecho del panel de detalles, haga clic en el icono de **Análisis de causa raíz** (el icono de lupa con traza de señal).

El panel de análisis de causa raíz se abre en el lado derecho de la página de detalle del evento.

## Qué sucede cuando inicia el análisis de causa raíz

El análisis se ejecuta como un flujo de trabajo automatizado de múltiples pasos:

1. **Reconocimiento de intención** — El sistema determina el objetivo del análisis a partir del contexto del evento.
2. **Confirmación del elemento** — El elemento asociado, ID del dispositivo, tiempo de ocurrencia y síntoma se extraen del evento.
3. **Recuperación de datos** — Se genera SQL de TDengine para obtener datos de series temporales del elemento desde la ventana de tiempo circundante (típicamente los últimos 10 días).
4. **Exploración de datos** — Se genera y ejecuta código de análisis Python para explorar estadísticamente los datos recuperados, identificando valores atípicos, tendencias y correlaciones.
5. **Recuperación de conocimiento** — Una búsqueda web recupera documentación técnica relevante o modos de fallo conocidos para este tipo de equipo.
6. **Descomposición de hipótesis** — La IA descompone el problema en una o más sub-hipótesis sobre posibles causas raíz.
7. **Verificación de hipótesis** — Cada hipótesis se prueba contra los datos reales.
8. **Generación de informe** — Se genera un informe estructurado en Markdown que resume todos los hallazgos.

El panel transmite el progreso del flujo de trabajo en tiempo real para que pueda seguir cada paso mientras se ejecuta.

## El informe de análisis de causa raíz

El informe final es un documento estructurado que incluye:

- **Descripción general** — Nombre del evento, alcance del sistema afectado, tiempo de ocurrencia, nivel de gravedad
- **Cronología** — Una tabla cronológica de eventos y acciones clave alrededor del incidente
- **Análisis de datos** — Hallazgos estadísticos de la fase de exploración de datos, incluyendo valores atípicos o anomalías identificadas
- **Hipótesis de causa raíz** — Las hipótesis clasificadas de la IA sobre qué causó el evento, con evidencia de respaldo de los datos
- **Recomendaciones** — Acciones correctivas o preventivas sugeridas

## Controles del panel

| Control | Descripción |
|---|---|
| **Icono de actualización** | Volver a ejecutar el análisis de causa raíz para este evento |
| **Cerrar (X)** | Cerrar el panel de análisis de causa raíz y volver a la vista estándar de detalle del evento |

:::note
El análisis de causa raíz es una nueva función introducida en TDengine IDMP 1.0.14. Se planean puntos de acceso adicionales para el análisis de causa raíz (como desde dashboards e interfaz de chat con IA) para versiones futuras.
:::
