---
title: Información impulsada por IA
sidebar_label: Información impulsada por IA
---

# 8. Información impulsada por IA

TDengine IDMP integra inteligencia de IA en toda la plataforma, transformándola de un repositorio de datos pasivo en un asesor operativo activo. Este capítulo cubre todas las funciones impulsadas por IA — desde la generación proactiva de visualizaciones hasta la detección de anomalías, el pronóstico, el análisis de causa raíz y las consultas en lenguaje natural.

## Dos modos de inteligencia de IA

IDMP ofrece información de IA en dos modos complementarios:

**Modo push (inteligencia sin consulta).** El sistema analiza proactivamente sus datos y le envía los hallazgos sin esperar a que pregunte. Cuando abre la pestaña Paneles de un elemento, las visualizaciones generadas por IA ya están esperando. Cuando navega a la pestaña Análisis de un elemento, la IA ya ha sugerido análisis relevantes. Esta es la inteligencia sin consulta: el sistema trabaja continuamente en segundo plano, aplicando razonamiento LLM sobre su jerarquía de activos y datos de series temporales para mostrar información antes de que piense en buscarla.

**Modo pull.** Usted pregunta, el sistema responde. Puede describir un panel o un análisis en lenguaje sencillo — "muéstrame el voltaje promedio diario como un gráfico de barras" o "calcula la corriente máxima por hora y alerta cuando supere lo normal" — y la IA lo construye para usted. La interfaz de chat con IA también acepta preguntas de formato libre sobre sus datos — "¿cuál fue la corriente promedio de em-1 la semana pasada?" — y devuelve respuestas basadas en sus datos reales de TDengine. El análisis de causa raíz se ejecuta bajo demanda desde una página de detalle de evento y produce un informe de investigación estructurado.

Juntas, estas funciones de IA reducen drásticamente la barrera para la inteligencia operativa. Los ingenieros que no son científicos de datos pueden crear dashboards, configurar análisis, detectar anomalías e investigar incidentes sin escribir SQL ni dominar herramientas complejas. Esto hace que los análisis industriales avanzados sean accesibles para las pequeñas y medianas empresas que no pueden permitirse analistas de datos dedicados o ingenieros de procesos a tiempo completo.

## Componentes de IA

Las capacidades de IA de IDMP están construidas sobre dos motores subyacentes:

**Modelo de lenguaje grande (LLM).** Un LLM externo (configurado a través de una conexión compatible con OpenAI) gestiona la comprensión del lenguaje natural, la generación de visualizaciones y análisis, la narración de información y el razonamiento de causa raíz. IDMP incluye una conexión de prueba integrada de 15 días para que pueda explorar las funciones de IA de inmediato sin ninguna configuración.

**TDgpt.** El motor de IA de series temporales integrado de TDengine gestiona tareas analíticas computacionalmente intensivas que operan directamente sobre datos de series temporales: detección de anomalías, pronóstico e imputación de datos faltantes. TDgpt es un módulo separado que debe instalarse junto con IDMP — una vez instalado, funciona independientemente de la conexión al LLM y no requiere configuración de IA externa.

## Contenido de este capítulo

- **[Conexión al LLM](./01-connecting-to-llm.md)** — Configurar la conexión de IA (endpoint del LLM, modelos, autenticación)
- **[Paneles generados por IA](./02-ai-generated-panels.md)** — Paneles generados y sugeridos automáticamente por IA en la pestaña Paneles del elemento
- **[Información de paneles con IA](./03-ai-panel-insights.md)** — Resúmenes e interpretaciones en lenguaje natural generados para paneles individuales
- **[Análisis generados por IA](./04-ai-generated-analyses.md)** — Análisis sugeridos y creados automáticamente por IA en la pestaña Análisis del elemento
- **[Métricas compuestas con IA](./05-ai-composite-metrics.md)** — Definiciones de fórmulas y atributos compuestos sugeridas por IA
- **[Consultas en lenguaje natural](./06-natural-language-queries.md)** — La interfaz de chat con IA para consultar sus datos en lenguaje sencillo
- **[Detección de anomalías](./07-anomaly-detection.md)** — Detección de anomalías impulsada por TDgpt como tipo de activación de análisis
- **[Pronóstico](./08-forecasting.md)** — Pronóstico de series temporales impulsado por TDgpt para atributos de elementos
- **[Imputación de datos faltantes](./09-missing-data-imputation.md)** — Relleno de brechas en series temporales impulsado por TDgpt
- **[Análisis de causa raíz](./10-root-cause-analysis.md)** — Informes de investigación de causa raíz de eventos generados por IA

import DocCardList from '@theme/DocCardList';

<DocCardList />
