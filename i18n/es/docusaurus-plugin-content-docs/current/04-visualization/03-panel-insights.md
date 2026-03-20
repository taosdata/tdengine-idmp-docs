---
title: Información Inteligente del Panel
sidebar_label: Información Inteligente del Panel
---

# 4.3 Información Inteligente del Panel

La información inteligente del panel es una función de análisis con IA integrada directamente en cada panel. Con un solo clic, el motor de IA lee los datos del gráfico actualmente visualizado, los analiza en el contexto del modelo de activos y los metadatos de propiedades del elemento, y genera un informe escrito con la interpretación de lo que muestran los datos.

## 4.3.1 Acceso a la Información Inteligente del Panel

La información inteligente del panel está disponible tanto en el modo de visualización como en el modo de edición:

- **Modo de visualización:** Haga clic en el botón **Información Inteligente del Panel** situado en el extremo derecho de la barra de herramientas. El botón aparece etiquetado como "Información Inteligente del Panel" y se muestra como el último control de la fila de la barra.
- **Modo de edición:** Haga clic en el botón **Información Inteligente del Panel** de la barra de herramientas en modo de edición para analizar los datos de la vista previa actual antes de guardar.

El informe de información inteligente se abre en un panel deslizante a la derecha del gráfico.

## 4.3.2 Qué Analiza la Información Inteligente del Panel

El motor de IA tiene acceso a:

- Los datos actualmente representados en el gráfico, incluidas todas las series y el rango de tiempo seleccionado
- La posición del elemento en la jerarquía de activos (sitio, línea de producción, máquina)
- Los metadatos de la propiedad: unidad de ingeniería, límites configurados (MínMin, Mín, Objetivo, Máx, MáxMáx, Máximo) y descripción
- Cualquier ventana deslizante activa o configuración de agregación

El informe de información inteligente se genera en el contexto de este panorama completo del activo, no solo de los números brutos. Un valor que supera el límite Máx se marca como violación de umbral; una tendencia ascendente gradual se identifica como tendencia y se distingue del ruido; un pico anómalo se señala y se registra su momento de ocurrencia.

## 4.3.3 Contenido del Informe de Información Inteligente

Un informe de información inteligente típico cubre:

**Análisis de tendencias.** La IA describe la dirección general de los datos en el rango de tiempo seleccionado —ascendente, descendente, estable o cíclica— y caracteriza la magnitud y la velocidad del cambio.

**Violaciones de umbral.** Si algún valor cruzó los límites configurados (Mín, Máx, MínMin, MáxMáx), el informe indica cuándo ocurrió, cuánto tiempo duró y en qué medida el valor se desvió del límite.

**Anomalías y puntos destacables.** La IA identifica valores que parecen anómalos con respecto a los datos circundantes: picos repentinos, caídas inesperadas o puntos que se desvían significativamente de la tendencia.

**Identificación de patrones.** Para rangos de tiempo de varios días o semanas, la IA identifica patrones recurrentes: ciclos diarios, diferencias entre fines de semana y días laborables, o comportamientos correlacionados con lotes.

**Resumen y recomendación.** El informe concluye con un resumen en lenguaje claro de la situación general de los datos y, cuando procede, sugiere una acción o una investigación adicional.

## 4.3.4 Uso Efectivo de la Función de Información Inteligente

La información inteligente del panel es más útil cuando:

- **El rango de tiempo es significativo.** Los hallazgos generados a partir de un rango de 7 días serán más ricos que los de 1 hora, porque la IA puede identificar patrones y tendencias que abarcan múltiples ciclos de operación.
- **Los límites de las propiedades están configurados.** Sin límites definidos, la IA no puede distinguir lo normal de lo anormal: solo puede describir los datos estadísticamente. Con los límites establecidos, la información inteligente adquiere relevancia operacional.
- **La propiedad tiene un contexto de ingeniería claro.** Una propiedad llamada `Temperatura_Rodamiento_A` con unidad °C y límite Máx de 85 genera mejores hallazgos que un sensor bruto sin nombre y sin metadatos.

Los hallazgos se generan bajo demanda y no se almacenan. Cada clic en el botón de información inteligente del panel regenera el análisis con los datos y el rango de tiempo actuales. Si cambia el rango de tiempo o añade una métrica, vuelva a hacer clic en Información Inteligente del Panel para actualizar el informe.
