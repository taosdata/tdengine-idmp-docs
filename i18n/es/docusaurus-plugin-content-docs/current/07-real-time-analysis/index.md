---
title: Análisis en Tiempo Real
sidebar_label: Análisis en Tiempo Real
---

# 7. Análisis en Tiempo Real

El análisis en tiempo real es una de las capacidades más importantes de TDengine IDMP. Es el motor que convierte los datos de series temporales en bruto en inteligencia operacional — ejecutando continuamente cálculos sobre flujos de sensores en tiempo real, detectando anomalías, calculando KPIs y generando eventos cuando se cumplen las condiciones. Con la asistencia de IA integrada, los análisis pueden crearse a partir de una descripción en lenguaje natural, y las anomalías pueden detectarse sin escribir ninguna regla de detección.

El concepto es directamente equivalente al de **Análisis** en OSIsoft PI System: una regla que se ejecuta automáticamente contra los datos de un elemento, produce salidas calculadas y opcionalmente genera eventos. Si ha utilizado PI Analysis Service, el modelo mental se aplica directamente.

## Qué Hace el Análisis en Tiempo Real

Un análisis en un elemento observa los datos del elemento y, cuando se activa una condición de disparador configurada, ejecuta un cálculo. El resultado puede:

- **Escribirse en los atributos del elemento** — los valores calculados, como promedios por hora, ratios de eficiencia o totales acumulados, se almacenan como nuevos datos de series temporales junto a las mediciones en bruto.
- **Escribirse en los atributos de evento** — cuando se genera un evento, los valores calculados (temperatura máxima, duración del lote, código de fallo) se capturan en el momento en que ocurre el evento.
- **Ambos** — la misma ejecución de cálculo puede producir múltiples atributos de salida y también generar un evento.

## Bajo el Capó

El análisis en tiempo real en IDMP se ejecuta completamente dentro del motor de computación de streaming de TDengine TSDB-Enterprise. IDMP proporciona la interfaz de configuración gráfica; el cálculo real se ejecuta como un stream persistente en la base de datos. Esto significa que los análisis no consumen recursos del servidor IDMP — se descargan a TDengine y continúan ejecutándose incluso si el servidor de la aplicación IDMP se reinicia.

Cada análisis corresponde a un **stream** en TDengine. El nombre del stream es visible en la lista de análisis e identifica de forma única el cálculo en la base de datos subyacente.

## Más Allá del Historiador de Datos Tradicional

Los historiadores de datos tradicionales requieren que los ingenieros configuren manualmente cada análisis: definir condiciones de disparador, escribir expresiones, mapear atributos de salida. Esto consume mucho tiempo y exige un profundo conocimiento del sistema. IDMP reduce significativamente esta barrera.

**Creación de análisis asistida por IA.** Un asistente de IA integrado puede crear un análisis completamente configurado a partir de una descripción en lenguaje natural — "calcular el factor de potencia promedio en ventanas de 15 minutos" — y rellenar previamente todo el formulario de creación. Aún mejor, el sistema sugiere proactivamente análisis basándose en la plantilla, los atributos y los datos recopilados del elemento. No necesita describir nada: explore las sugerencias, haga clic en una y el formulario estará listo para guardar.

**Detección de anomalías sin reglas de detección.** En un historiador de datos tradicional, detectar anomalías significa escribir condiciones de umbral explícitas — solo puede detectar lo que sabe que debe buscar. IDMP incluye un tipo de disparador de **Detección de Anomalías** impulsado por **TDgpt**, el motor de análisis de IA integrado de TDengine. Usted selecciona el atributo objetivo y el algoritmo; TDgpt determina cuándo comienzan y terminan las anomalías sin necesidad de reglas de umbral. Admite múltiples algoritmos respaldados por statsmodels, PyTorch, scikit-learn y el propio modelo de base de series temporales TDtsfm de TDengine. Al igual que cualquier otro tipo de disparador, encaja naturalmente en el mismo formulario de análisis junto a ventanas deslizantes, ventanas de evento y el resto.

## Análisis y la Jerarquía de Elementos

Cada análisis pertenece exactamente a un elemento y se configura en la pestaña **Análisis** de ese elemento. Un análisis puede calcular sobre:

- **Los atributos propios del elemento** — el caso típico, donde se calcula algo sobre este dispositivo o ubicación específicos.
- **Sus elementos secundarios (agregación)** — donde se agrega una métrica a través de todos los elementos secundarios (o los filtrados) que comparten una plantilla común. Por ejemplo, calcular la potencia de salida promedio de todas las turbinas bajo un elemento de granja eólica.

## Contenido de este Capítulo

- **[Explorar y Gestionar Análisis](./01-browsing-analyses.md)** — La lista de análisis, controles de la barra de herramientas y acciones de fila
- **[Crear un Análisis](./02-creating-analysis.md)** — El formulario de creación de cuatro secciones: Información General, Disparador, Cálculo y Evento
- **[Tipos de Disparador](./03-trigger-types.md)** — Los ocho tipos de disparador y sus parámetros específicos
- **[Cálculo](./04-calculation.md)** — Aplicar cálculo en, agregar en ventana, marca de tiempo de salida y atributos de salida
- **[Generar Eventos](./05-generating-events.md)** — Configurar un análisis para producir eventos
- **[Análisis Asistido por IA](./06-ai-analysis.md)** — Usar la IA integrada para crear análisis a partir de lenguaje natural

import DocCardList from '@theme/DocCardList';

<DocCardList />
