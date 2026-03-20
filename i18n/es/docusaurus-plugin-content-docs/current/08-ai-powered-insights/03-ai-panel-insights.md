---
title: Información de paneles con IA
sidebar_label: Información de paneles con IA
---

# 8.3 Información de paneles con IA

La información de paneles con IA genera una narrativa en lenguaje natural para un panel individual — describiendo lo que muestran los datos, identificando patrones notables y destacando anomalías o tendencias que puedan requerir atención.

## Cómo acceder

Abra cualquier panel (ya sea generado por IA o creado manualmente) desde la pestaña **Paneles** de un elemento. En la barra de herramientas del panel, haga clic en el botón **Información de IA** (el icono de destello o IA). El sistema consulta al LLM con los datos actuales del panel y devuelve un resumen de texto que se muestra junto a la visualización.

## Qué contiene la información

La información describe los datos del panel en lenguaje sencillo. Para un gráfico de tendencias que muestra el voltaje durante las últimas 24 horas, la información podría señalar el rango general, identificar un pico o caída, e indicar si los valores se mantienen dentro de los límites operativos normales. Para un panel de estadísticas, podría comparar la lectura actual con el promedio histórico.

La información se genera bajo demanda — cada vez que hace clic en el botón de información de IA, el sistema obtiene datos actualizados y genera una nueva narrativa basada en la ventana de consulta actual.

Si desea una interpretación nueva, haga clic en el botón **Actualizar** en el panel de información. El sistema vuelve a consultar los datos y genera una nueva narrativa.

Para una referencia completa sobre paneles e interfaz de visualización, consulte el [Capítulo 4: Visualización](../04-visualization/index.md).
