---
title: Análisis generados por IA
sidebar_label: Análisis generados por IA
---

# 8.4 Análisis generados por IA

IDMP puede sugerir y configurar automáticamente análisis en tiempo real para un elemento basándose en su plantilla, atributos y datos recopilados. Esto reduce la barrera para la creación de análisis: en lugar de configurar manualmente condiciones de activación, expresiones y atributos de salida, puede comenzar desde una configuración generada por IA y guardarla con un solo clic.

## Dónde encontrar los análisis sugeridos por IA

Las sugerencias de análisis de IA aparecen en la pestaña **Análisis** de cualquier elemento en el Explorador. La pestaña incluye un panel de IA (visible por defecto, activado con el botón **IA** en la barra de herramientas) que muestra una lista de **Análisis sugeridos** — impulsados por la **inteligencia sin consulta**, análisis que el sistema ya ha generado basándose en el contexto del elemento.

Para un elemento de medidor de electricidad, el sistema podría sugerir:

- Calcular el voltaje máximo por hora
- Detectar anomalías en la corriente usando TDgpt
- Calcular el factor de potencia promedio en una ventana deslizante de 15 minutos

## Dos formas de usar el análisis de IA

**Usar una sugerencia del sistema.** Haga clic en cualquier elemento de la lista de Análisis sugeridos. La IA genera un formulario de análisis completamente configurado con un nombre, tipo de activación, expresión de cálculo y atributo de salida ya prellenados. Revíselo y haga clic en **Guardar**.

**Describir lo que desea.** Si las sugerencias no cubren lo que necesita, escriba una descripción en lenguaje natural en el campo de texto en la parte superior del panel de IA — por ejemplo, "calcular la corriente promedio en ventanas de 1 hora" o "alertarme cuando el voltaje exceda el rango normal durante más de 5 minutos". Presione Intro. La IA interpreta su intención, selecciona el tipo de activación apropiado, escribe la expresión de cálculo y mapea la salida a un nuevo atributo — todo prellenado en el formulario de creación. No necesita saber cómo configurar activadores o escribir expresiones; mientras sepa lo que quiere que haga el análisis, la IA se encarga del resto.

También hay disponible un botón de micrófono para entrada de voz.

## Después de la generación por IA

Independientemente del método que haya utilizado, el resultado es el mismo: el formulario de creación de análisis se abre prellenado. Puede revisar cada campo y ajustar cualquier valor antes de guardar. Haga clic en **Guardar** para crear el análisis. Si **Habilitar análisis al crear** está marcado, el análisis comienza a ejecutarse de inmediato.

Para una referencia completa sobre el formulario de análisis, tipos de activación y opciones de cálculo, consulte el [Capítulo 7: Análisis en tiempo real](../07-real-time-analysis/index.md).
