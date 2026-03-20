---
title: Análisis Asistido por IA
sidebar_label: Análisis Asistido por IA
---

# 7.6 Análisis Asistido por IA

TDengine IDMP incluye un asistente de IA integrado que puede crear análisis sin necesidad de completar manualmente el tipo de disparador, las expresiones de cálculo y los atributos de salida. Hay dos formas de usarlo.

## Abrir el Panel de IA

El panel de IA se muestra de forma predeterminada en la pestaña Análisis. Puede alternarlo usando el botón **IA** en el área de filtros de la barra de herramientas sobre la lista de análisis.

## Forma 1: Usar un Análisis Sugerido por el Sistema

El panel de IA muestra una lista de **Análisis Sugeridos** — impulsados por **Zero Query Intelligence**, análisis que el sistema ya ha generado basándose en los atributos, la plantilla y los datos recopilados del elemento actual. Estas sugerencias son conscientes del contexto: para un elemento de medidor de electricidad, el sistema podría sugerir calcular el voltaje máximo por hora, detectar anomalías en la corriente o calcular el factor de potencia sobre una ventana deslizante.

Haga clic en cualquier sugerencia para usarla de inmediato. La IA genera entonces un formulario de análisis completamente configurado y rellenado previamente con la configuración apropiada.

Haga clic en el **icono de actualización** junto a "Análisis Sugeridos" para cargar un nuevo conjunto de sugerencias.

## Forma 2: Describir lo que Desea

Escriba una descripción en forma libre en el campo de texto a la derecha del panel de IA. Por ejemplo:

> "Calculate the maximum Current of this element over a 1-hour period, sliding every 10 minutes"

El campo también tiene un **botón de micrófono** para entrada de voz. Presione Intro o envíe para mandar la descripción. La IA genera un formulario de análisis completamente configurado y rellenado previamente con la configuración apropiada.

## Después de la Generación por IA

Independientemente de la forma que haya utilizado, el resultado es el mismo:

1. La IA abre el formulario de creación rellenado previamente con un nombre, tipo de disparador, intervalo deslizante, ventana de agregación, expresión de salida y un nuevo atributo de salida.
2. Revise el formulario pre-rellenado. Puede ajustar cualquier campo antes de guardar.
3. Haga clic en **Guardar** para crear el análisis.

## Qué Configura la IA

La IA puede completar las cuatro secciones del formulario de análisis:

- **Información General** — un nombre descriptivo y una descripción opcional
- **Disparador** — el tipo de disparador apropiado (típicamente Ventana Deslizante) y sus parámetros
- **Cálculo** — el intervalo de agregación, la marca de tiempo de salida y una expresión calculada mapeada a un nuevo atributo del elemento
- **Evento** — configuración de generación de eventos, si la condición descrita implica alertas

## Limitaciones

El asistente de IA crea análisis basándose en la intención expresada en lenguaje natural. Para condiciones personalizadas complejas o lógica avanzada de ventana de evento, se recomienda revisar y ajustar la configuración generada por IA antes de guardar.
