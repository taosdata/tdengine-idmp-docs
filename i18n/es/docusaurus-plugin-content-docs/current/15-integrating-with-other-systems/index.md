---
title: Integración con otros sistemas
sidebar_label: Integración con otros sistemas
---

import DocCardList from '@theme/DocCardList';

# 15. Integración con otros sistemas

TDengine IDMP está diseñado como una **plataforma de datos industriales abierta**. Todas las capacidades disponibles a través de la interfaz Web UI también son accesibles programáticamente a través de una REST API bien documentada, y el SDK envuelve esa API en bibliotecas nativas de Java y Python.

## Por qué la apertura importa en la era de la IA

Las aplicaciones de IA industrial — detección de anomalías, mantenimiento predictivo, análisis de causa raíz, integración de modelos de lenguaje grande (LLM) — requieren acceso programático confiable a datos industriales contextualizados. Un historiador cerrado que atrapa datos detrás de protocolos propietarios se convierte en un cuello de botella.

TDengine IDMP rompe esa barrera:

- **Especificación OpenAPI:** La API completa se describe en una especificación OpenAPI legible por máquinas, lo que permite la generación automática de SDK para cualquier lenguaje y una integración sin problemas con las cadenas de herramientas de IA.
- **SDK de cliente (Java y Python):** SDK de primera clase para los dos lenguajes más populares en ciencia de datos y automatización industrial, de modo que los pipelines de IA pueden leer elementos, métricas de series temporales y eventos con unas pocas líneas de código.
- **Interfaz MCP:** Una interfaz de Model Context Protocol que expone los datos y el contexto de IDMP directamente a los agentes LLM, lo que permite la interacción en lenguaje natural con los datos industriales sin trabajo de integración personalizado.
- **Paneles y paneles de control incrustables:** Las visualizaciones pueden incrustarse en cualquier aplicación web a través de iframe, llevando las perspectivas de IDMP a las interfaces de operador, portales o paneles de IA existentes.
- **Notificaciones Webhook:** Las alertas de eventos pueden activar cualquier sistema externo a través de callbacks HTTP estándar, habilitando flujos de trabajo impulsados por IA que responden a eventos de planta en tiempo real.

En conjunto, estos puntos de integración significan que los datos de IDMP pueden fluir libremente hacia modelos de IA, herramientas de BI externas, aplicaciones personalizadas y pipelines de automatización, haciendo de IDMP un ciudadano de primera clase en las arquitecturas de IA industrial modernas.

## Contenido de este capítulo

| Sección | Descripción |
|---|---|
| **SDK de cliente** | SDK de Java y Python para acceso programático a elementos, métricas y eventos |
| **Interfaz MCP** | Integración de agentes LLM a través del Model Context Protocol *(próximamente)* |
| **Incrustación de paneles y paneles de control** | Incrustar visualizaciones de IDMP en aplicaciones web externas |

<DocCardList />
