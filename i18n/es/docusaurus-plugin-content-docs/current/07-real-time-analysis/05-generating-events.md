---
title: Generar Eventos
sidebar_label: Generar Eventos
---

# 7.5 Generar Eventos

La sección Evento (sección 4 del formulario de análisis) controla si el análisis crea un evento cada vez que se activa. La generación de eventos está deshabilitada de forma predeterminada.

## Habilitar la Generación de Eventos

Para habilitar la generación de eventos, marque la casilla **Generar** en el encabezado de la sección Evento. Cuando está habilitado, los campos de evento se activan y aparece una columna **Atributo de Evento** en la tabla de Atributos de Salida en la sección 3.

Cuando la generación de eventos está deshabilitada, la sección muestra "La generación de eventos no está habilitada" y no se producen eventos.

## Campos de Evento

| Campo | Descripción |
|---|---|
| **Plantilla** (obligatorio) | La plantilla de evento que define la estructura del evento, incluyendo su nombre, atributos y configuración de visualización. Seleccione una plantilla existente en el menú desplegable o haga clic en **+ Nueva Plantilla de Evento** para crear una de forma integrada. |
| **Permitir Confirmación** | Cuando está marcado (predeterminado), los operadores pueden confirmar los eventos generados por este análisis. |
| **Nivel de Gravedad** (obligatorio) | La gravedad del evento generado. Las opciones típicamente incluyen Advertencia, Crítico y otras definidas en el sistema. El valor predeterminado es Advertencia. |
| **Código de Causa** | Un valor de enumeración opcional que clasifica la razón del evento. Las opciones de código de causa se definen en **Biblioteca Base → Conjuntos de Enumeración**. |
| **Valor del Código de Causa** | Un sub-valor opcional dentro del Código de Causa seleccionado. Disponible después de seleccionar un Código de Causa. |
| **Intervalo Mínimo de Envío** | El tiempo mínimo entre eventos consecutivos generados por este análisis. Si el disparador se activa nuevamente antes de que haya transcurrido este intervalo, no se genera un nuevo evento. El valor predeterminado es 15 minutos. Evita la inundación de eventos cuando una condición persiste. |

## Capturar Valores Calculados en Eventos

Cuando la generación de eventos está habilitada, la columna **Atributo de Evento** queda disponible en la tabla de Atributos de Salida (sección 3). Esto le permite capturar el valor calculado de la expresión del análisis directamente en un atributo de evento en el momento en que se crea el evento.

Por ejemplo, si un análisis calcula el voltaje máximo durante una ventana, puede escribir ese valor tanto en un atributo del elemento (para el historial de series temporales) como en un atributo de evento (para registrarlo con el evento). Cada fila de salida puede escribir de forma independiente en un atributo del elemento, en un atributo de evento o en ambos.

## Relación con las Plantillas de Evento

La plantilla de evento seleccionada aquí determina:

- El nombre del evento y la etiqueta de visualización
- Qué atributos de evento están disponibles en la columna **Atributo de Evento**
- Cómo aparecen los eventos generados por este análisis en la pestaña Eventos

Los eventos generados por análisis aparecen en la pestaña Eventos del elemento junto con los eventos creados manualmente. Se etiquetan visualmente con el nombre del análisis como fuente.
