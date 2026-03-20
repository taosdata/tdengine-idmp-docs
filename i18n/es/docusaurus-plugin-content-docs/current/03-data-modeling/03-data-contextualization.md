---
title: Contextualización de datos
sidebar_label: Contextualización de datos
---

# 3.3 Contextualización de datos

Una columna llamada `current` en una tabla de base de datos es solo un número. Se vuelve útil únicamente cuando sabe qué medidor la produjo, dónde está instalado ese medidor, en qué unidad está el valor y qué rango se considera normal. La **contextualización de datos** es el proceso de adjuntar este conocimiento circundante a sus datos — transformando mediciones sin procesar en un conjunto de datos industrial rico, consultable y preparado para la IA.

TDengine IDMP construye el contexto a través de tres mecanismos complementarios: elementos, atributos y eventos. Cada uno aporta un tipo diferente de información, y juntos dan a cada punto de datos una identidad industrial completa.

## 3.3.1 Por qué importa la contextualización

Como se describe en la [Sección 1.2](../01-introduction.md#12-why-industrial-data-foundations-matter-in-the-ai-era), la IA no puede razonar sobre señales sin procesar y descontextualizadas. Una lectura de vibración de `4.7` no significa nada para un sistema de IA a menos que sepa qué motor la produjo, en qué unidades está el valor, cuál es el rango de operación normal y qué más estaba ocurriendo en esa línea de producción en ese momento. Por eso TDengine IDMP se sitúa entre la base de datos de series temporales y la capa de inteligencia — es la capa semántica que transforma el almacenamiento sin procesar en algo sobre lo que la IA puede razonar.

Pero el valor de la contextualización no se limita a la IA. Antes de la IA, el coste se manifestaba de otra manera: como conocimiento institucional que existía solo en la mente de ingenieros experimentados, como equipos de análisis que reconstruían los mismos mapeos de datos para cada nuevo proyecto, como operadores que pasaban horas rastreando una señal hasta un dispositivo físico cuando algo iba mal. La contextualización resuelve todos estos problemas a la vez — codifica el conocimiento sobre su operación en el propio modelo de datos, donde es permanente, consultable y está disponible para cada usuario y cada sistema.

El trabajo de este capítulo es construir esa capa de conocimiento. Cada elemento descrito, cada unidad configurada, cada límite establecido y cada documento adjunto hace que toda la plataforma sea más capaz — no solo para las preguntas de hoy, sino para cada análisis y consulta de IA que se ejecute sobre estos datos en el futuro.

## 3.3.2 Contexto de los elementos

Un elemento representa un activo físico o lógico. La información contextual adjunta a un elemento describe lo que ese activo *es*:

- **Nombre y jerarquía** — El nombre del elemento y su posición en el árbol de activos informan a los usuarios y sistemas qué activo están viendo y cómo se relaciona con otros activos (planta → línea → máquina → sensor).
- **Plantilla** — Indica la clase de activo a la que pertenece este elemento, de modo que los usuarios sepan inmediatamente qué atributos y comportamientos esperar.
- **Categorías** — Etiquetas de nivel empresarial (p. ej., tipo de activo, sistema, estado) que hacen que los elementos sean filtrables y agrupables en catálogos grandes.
- **Descripción** — Una declaración legible de lo que hace o representa este activo.
- **Ubicación** — Coordenadas GPS (longitud, latitud, altitud) que sitúan el activo en un mapa y habilitan el análisis espacial.
- **Atributos adicionales** — Pares clave-valor de formato libre para metadatos de activo estáticos que no cambian con el tiempo: fabricante, número de modelo, número de serie, fecha de instalación, especificaciones nominales, contacto de mantenimiento, etc.
- **Documentos relacionados** — Manuales de ingeniería, planos P&ID, informes de calibración y otros archivos de referencia adjuntos directamente al elemento. Estos documentos son indexados por el motor de IA y se usan para proporcionar respuestas más precisas y específicas del activo en el Chat de IA.
- **Anotaciones** — Observaciones y notas de texto libre escritas por ingenieros u operadores, como registros de mantenimiento, informes de incidentes o notas de cambios de configuración.

Toda esta información es consultable y está disponible para cada función de TDengine IDMP — dashboards, análisis, detección de eventos y Chat de IA — de modo que los usuarios nunca tengan que hacer referencias cruzadas a sistemas externos para entender qué significa un dato.

## 3.3.3 Contexto de los atributos

Un atributo representa una medición específica de un elemento. La información contextual adjunta a un atributo describe lo que esa medición *significa*:

- **Descripción y categorías** — Una explicación en lenguaje simple de la medición y etiquetas de clasificación que agrupan atributos relacionados.
- **Unidades de ingeniería** — La Clase de UdM, la UdM predeterminada y la UdM de visualización informan al sistema y a sus usuarios qué cantidad física se está midiendo y en qué unidad se expresa. TDengine IDMP usa esta información para realizar conversiones de unidades automáticamente en visualizaciones y análisis.
- **Límites** — Los umbrales Lo, LoLo, Hi, HiHi, Objetivo, Mínimo y Máximo definen el rango de operación normal de la medición. Estos límites impulsan la detección de eventos, el coloreado de alarmas en los dashboards y la evaluación del motor de IA sobre si las condiciones actuales son normales o anómalas.
- **Propiedades adicionales** — Pares clave-valor personalizados para metadatos específicos de la medición, como la etiqueta del instrumento (p. ej., `TIT-101`), la fecha de calibración, el fabricante del sensor o el rango de medición.

Sin este contexto, un valor de `5.45` no tiene sentido. Con él, TDengine IDMP sabe que se trata de `5.45 A` de corriente en el medidor `em-12`, dentro de un rango normal de 0–10 A, y que cualquier valor por encima de 8 A debería activar una alarma alta.

## 3.3.4 Contexto de los eventos

Los eventos añaden una dimensión temporal al contexto. Cuando se activa una regla de evento — por ejemplo, cuando la corriente supera el límite HiHi, o cuando una máquina pasa del estado en marcha al detenido — TDengine IDMP registra qué ocurrió, cuándo ocurrió y en qué activo.

Este historial de eventos contextualiza los datos de series temporales de una manera que los metadatos estáticos no pueden: anota momentos específicos en el flujo de datos con significado operativo. Cuando un usuario o el motor de IA revisa el historial de un atributo, los registros de eventos asociados permiten distinguir una fluctuación normal de operación de una condición de alarma, o una parada planificada de un fallo inesperado.

Los eventos se configuran y gestionan en detalle en el Capítulo 6. Su papel en el modelo de datos es servir como contexto dinámico y basado en condiciones que complementa el contexto estático proporcionado por los metadatos de elementos y atributos.
