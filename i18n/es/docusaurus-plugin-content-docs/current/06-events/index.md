---
title: Eventos
sidebar_label: Eventos
---

# 6. Eventos

Un evento en TDengine IDMP es una ocurrencia operacional discreta con una hora de inicio, hora de fin y duración definidas — el registro digital de que algo sucedió. Una bomba disparó, una temperatura superó su límite, una fase de lote se completó, comenzó una ventana de mantenimiento. Este concepto es equivalente a los **marcos de evento** (event frames) en OSIsoft PI System, una de las ideas más poderosas en la gestión de datos industriales.

Los flujos de sensores en bruto le dicen cuál era un valor en un momento dado; los eventos le dicen qué estaba sucediendo operacionalmente — y durante cuánto tiempo. En lugar de buscar entre millones de puntos de datos para encontrar cuándo un compresor operó en surge, consulta el registro de evento estructurado que ya lo capturó.

## Los Eventos en la Era de la IA

Los eventos importan aún más a medida que la IA se convierte en elemento central de las operaciones industriales. Los sistemas de IA y aprendizaje automático funcionan mejor cuando los datos están estructurados y contextualizados — y eso es exactamente lo que proporcionan los eventos. En lugar de alimentar a un modelo con millones de lecturas de sensores en bruto, le proporciona registros estructurados: "Surge de Compresor, Inicio: 10:23:15, Duración: 12 segundos, Gravedad: Alta." Ese contexto es lo que convierte los datos de señal en algo sobre lo que un modelo puede razonar.

Los eventos habilitan directamente los casos de uso de IA industrial que más importan: entrenar modelos de mantenimiento predictivo, impulsar la detección de anomalías, realizar análisis de causa raíz y dirigir agentes de IA que pueden razonar sobre lo que está sucediendo en una planta. Cada uno de estos requiere saber no solo qué valores se midieron, sino qué condiciones operacionales representaban esos valores — y durante cuánto tiempo. Los eventos son el puente entre los datos de series temporales continuas y la inteligencia operacional que los sistemas de IA necesitan para ser útiles.

## Ciclo de Vida del Evento

Los eventos en TDengine IDMP siempre son generados automáticamente por reglas de análisis asociadas a un elemento. El ciclo de vida completo es:

```text
Event Template (defined in Libraries)
        ↓
Analysis (configured on an element, references the template)
        ↓
Event (generated automatically when the analysis condition is met)
        ↓
Notification (optionally sent to configured contact points)
```

Cada evento debe estar basado en una **plantilla de evento**, que define el patrón de nomenclatura, el nivel de gravedad, las categorías, el esquema de atributos personalizados y los requisitos de confirmación. Las plantillas de evento se gestionan en **Biblioteca Base → Plantillas de Evento**.

## Campos Estándar del Evento

Cada evento lleva los siguientes campos estándar:

| Campo | Descripción |
|---|---|
| **Nombre** | Nombre para mostrar generado a partir del patrón de nomenclatura en la plantilla de evento |
| **Hora de Inicio** | Cuándo comenzó el evento |
| **Hora de Fin** | Cuándo finalizó el evento (en blanco si sigue activo) |
| **Duración** | Tiempo transcurrido entre inicio y fin |
| **Plantilla** | La plantilla de evento a partir de la cual se creó este evento |
| **Nivel de Gravedad** | Categoría de gravedad (Crítico, Mayor, Menor, Advertencia, Normal) |
| **Código de Causa** | Código opcional que identifica la causa |
| **Categorías** | Etiquetas para filtrado y agrupación |
| **Descripción** | Descripción en texto libre |
| **Elemento Asociado** | El elemento que generó este evento |
| **Análisis Asociado** | La regla de análisis que activó este evento |
| **Estado** | Si el evento ha sido confirmado |

Además de estos campos estándar, un evento puede llevar **atributos personalizados** — valores con nombre registrados en el momento del evento, como la temperatura máxima durante una excedencia o el ID de lote al momento de un fallo. Los atributos personalizados se definen en la plantilla de evento.

## Contenido de este Capítulo

- **[Plantillas de Evento](./01-event-templates.md)** — Crear y gestionar plantillas de evento en la Biblioteca Base
- **[Explorar Eventos](./02-browsing-events.md)** — La vista global de eventos, eventos a nivel de elemento y filtrado
- **[Detalle del Evento](./03-event-detail.md)** — Campos, atributos, anotaciones e historial de notificaciones
- **[Alertas y Notificaciones](./04-alerts-and-notifications.md)** — Puntos de contacto, reglas de notificación y comportamiento de notificaciones
- **[Confirmación](./05-acknowledgment.md)** — Confirmar eventos y el flujo de trabajo de confirmación
- **[Análisis de Tendencias](./06-trend-analysis.md)** — Analizar eventos con gráficos de tendencias

import DocCardList from '@theme/DocCardList';

<DocCardList />
