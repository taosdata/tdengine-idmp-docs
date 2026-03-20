---
title: Visualización
sidebar_label: Visualización
---

# 4. Visualización

La visualización en TDengine IDMP está diseñada en torno a un único principio organizador: los usuarios industriales piensan en términos de activos, no de señales. Un operador que monitoriza una línea de producción está pensando en la Caldera 3, el Circuito de Enfriamiento A o la Estación de Compresores 7, no en columnas de métricas desconectadas en una base de datos. TDengine IDMP construye la visualización en torno a esta realidad.

## Basada en lo Mejor de la Visualización Moderna

La capa de visualización de TDengine IDMP toma inspiración de herramientas genéricas modernas como Grafana. Los tipos de paneles, la experiencia de configuración y el diseño de dashboards son deliberadamente familiares: gráficos de tendencias, gráficos de barras, gráficos circulares, medidores, paneles de valores estadísticos, gráficos de dispersión, líneas de tiempo de estado, tablas, mapas y más, todo con la rica configuración visual que ingenieros y analistas esperan de una herramienta moderna.

Los paneles son completamente interactivos. Puede ampliar un rango de tiempo, activar o desactivar series individuales a través de la leyenda, alternar entre modos claro y oscuro, descargar paneles como imágenes y compartirlos como enlaces temporales. Los dashboards se ensamblan mediante arrastrar y soltar, con disposición libre de paneles y paneles redimensionables. Los ajustes de visualización de cada tipo de panel siguen de cerca las convenciones de Grafana, lo que hace que el sistema sea inmediatamente accesible para los equipos que ya han trabajado con Grafana.

Esta familiaridad es deliberada. No hay razón para rediseñar lo que las herramientas de visualización genéricas ya hacen bien. Lo que TDengine IDMP añade es la capa de contexto industrial sobre esa base.

## Visualización Centrada en el Activo

La limitación fundamental de herramientas genéricas como Grafana en entornos industriales es su diseño orientado a señales. En Grafana, cada dashboard comienza con un lienzo vacío: se selecciona manualmente una fuente de datos, se escribe una consulta, se elige un tipo de visualización y se configura el panel. Para un único dashboard, esto es manejable. Para cientos de máquinas distribuidas en decenas de sitios, cada una con decenas de sensores, resulta inviable. Los equipos acaban reconstruyendo los mismos dashboards una y otra vez, con inconsistencias que se acumulan entre sitios y equipos.

TDengine IDMP invierte este modelo. La visualización está centrada en el activo: cada elemento del árbol de activos tiene sus propios paneles y dashboards, y los datos disponibles para esos paneles ya están organizados en torno a los atributos del elemento. Cuando navega a un elemento, no está empezando desde cero, sino que está viendo una vista estructurada de ese activo específico, con su contexto ya establecido.

Esto tiene varias consecuencias prácticas:

**Las plantillas impulsan la consistencia a escala.** Las plantillas de paneles y dashboards pueden definirse para una clase de activo (p. ej., bomba, medidor, turbina eólica) y aplicarse a cada elemento de ese tipo. Cuando se añade un nuevo activo, sus paneles estándar ya están definidos. Cuando cambia un estándar de visualización, actualizar la plantilla propaga el cambio a toda la flota.

**La jerarquía permite vistas multinivel.** Dado que los elementos están organizados en árbol —Empresa → Sitio → Línea de producción → Máquina → Sensor—, la visualización sigue naturalmente la misma estructura. Un dashboard a nivel de planta agrega datos de todas las máquinas de una línea; un dashboard a nivel de máquina muestra las tendencias de los sensores individuales. Los usuarios navegan por la jerarquía para encontrar el nivel de detalle adecuado para su tarea actual, sin necesidad de mantener dashboards separados para cada nivel.

**El contexto siempre está presente.** Cada panel sabe a qué elemento pertenece, cuál es la unidad de ingeniería del atributo, cuáles son los límites definidos y cuál es la posición del activo en la jerarquía. Este contexto fluye automáticamente hacia la coloración de tendencias, los marcadores de límites, las conversiones de unidades y el análisis generado por IA, sin necesidad de ninguna configuración manual por panel.

## Análisis de Tendencias Potente

El gráfico de tendencias de TDengine IDMP va mucho más allá de la representación simple de series temporales. Es el punto de entrada principal para un conjunto completo de capacidades analíticas avanzadas, y lo mismo ocurre con el gráfico de dispersión, que admite análisis de correlación entre atributos.

**Desplazamiento temporal y superposición.** Cualquier línea de tendencia puede desplazarse por un offset de tiempo configurable —horas, días o duraciones personalizadas— y superponerse sobre los datos actuales. Comparar el comportamiento de hoy con el de la semana pasada, o con el período equivalente antes del último ciclo de mantenimiento, no requiere ninguna herramienta adicional.

**Comparación de lotes.** Cuando se definen eventos para un proceso (p. ej., inicio y fin de lote), el gráfico de tendencias puede superponer múltiples ocurrencias de lotes en un eje de tiempo normalizado. Esto revela inmediatamente cómo el lote actual se compara con los históricos: dónde se desvió, dónde coincidió y qué lotes definen el mejor perfil de operación conocido.

Más allá de esto, el gráfico de tendencias y el gráfico de dispersión sirven como punto de entrada para un amplio conjunto de análisis avanzados: previsión, detección de anomalías, imputación de datos faltantes, agrupamiento, regresión, análisis de correlación y más. Cada uno de estos se trata en profundidad en el Capítulo 8. El punto de diseño clave es que estas capacidades no son aplicaciones separadas: se lanzan directamente desde el gráfico, en contexto, sobre los datos que ya está viendo.

## Visualización Potenciada por IA

El motor de IA de TDengine IDMP está integrado directamente en la capa de visualización de tres formas.

**Paneles generados por IA.** Cuando navega a la pestaña Paneles de un elemento, el motor de IA analiza los atributos del elemento, sus tipos, unidades y límites, y sugiere los paneles más relevantes para ese activo. Un elemento de turbina eólica recibe sugerencias de gráficos de dispersión de curva de potencia y gráficos de tendencias de velocidad del rotor. Un medidor eléctrico recibe gráficos de tendencias de corriente y tensión y un panel de valores estadísticos de consumo energético. Puede aceptar una sugerencia con un clic, solicitar más sugerencias o describir un panel en lenguaje natural y hacer que la IA lo genere directamente.

**Información inteligente del panel.** Cualquier panel existente puede ser analizado por el motor de IA para producir una interpretación escrita de lo que muestran los datos. El informe de información inteligente identifica tendencias, anomalías, violaciones de umbral y patrones visibles en el rango de tiempo actual, traduciendo los datos del gráfico a un lenguaje sobre el que ingenieros y gestores pueden actuar. Esto desplaza la visualización de "mostrarle lo que ocurrió" a "ayudarle a decidir qué hacer a continuación".

**Chat de IA con salida visual.** Desde la interfaz de Chat de IA, los usuarios pueden formular preguntas sobre sus datos industriales en lenguaje natural. La IA puede responder con paneles generados, tablas o visualizaciones de tendencias incrustadas directamente en la respuesta del chat, aprovechando el contexto completo del activo del modelo de datos subyacente.

En conjunto, estas capacidades reflejan una filosofía de diseño central: el objetivo de la visualización industrial no es mostrar datos, sino generar comprensión. Los dashboards genéricos se acumulan; los paneles de TDengine IDMP están curados, contextualizados y continuamente enriquecidos por la capa de inteligencia que se sitúa sobre ellos.

import DocCardList from '@theme/DocCardList';

<DocCardList />
