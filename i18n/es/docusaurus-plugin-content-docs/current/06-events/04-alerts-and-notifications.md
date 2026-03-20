---
title: Alertas y Notificaciones
sidebar_label: Alertas y Notificaciones
---

# 6.4 Alertas y Notificaciones

Cuando un análisis genera un evento, TDengine IDMP puede enviar automáticamente una notificación a los puntos de contacto configurados — direcciones de correo electrónico, webhooks, plataformas de mensajería u otros canales. Este capítulo describe cómo configurar puntos de contacto, configurar reglas de notificación en los elementos y comprender cómo se comporta el sistema de notificaciones.

## 6.4.1 Puntos de Contacto

Un **punto de contacto** es un canal de entrega para notificaciones. Los puntos de contacto se configuran a nivel de sistema y luego son referenciados por las reglas de notificación en los elementos individuales.

### Gestionar Puntos de Contacto

Los puntos de contacto se gestionan en **Consola de Administración → Configuración del Sistema → Punto de Contacto de Notificaciones**.

La lista de puntos de contacto muestra:

| Columna | Descripción |
|---|---|
| **Nombre** | Un nombre descriptivo para este punto de contacto (por ejemplo, `Jeff_default_contact_point`) |
| **Tipo** | El tipo de canal de entrega (por ejemplo, EMAIL, webhook, Feishu) |
| **Dirección** | La dirección del destinatario o URL del endpoint |
| **Descripción** | Descripción opcional |

Para crear un nuevo punto de contacto, haga clic en **+** y complete los campos de nombre, tipo, dirección y descripción. Los tipos disponibles dependen de las integraciones configuradas para su instancia de IDMP.

:::tip
Los puntos de contacto se comparten en todo el sistema. El mismo punto de contacto puede ser referenciado por reglas de notificación en muchos elementos diferentes. Cree un punto de contacto por destinatario o canal, y luego reutilícelo donde sea necesario.
:::

## 6.4.2 Reglas de Notificación

Una **regla de notificación** define cómo y a quién se envían notificaciones cuando ocurre un evento en un elemento específico. Cada elemento tiene exactamente una regla de notificación, compartida por todos los eventos generados en ese elemento.

### Configurar una Regla de Notificación

Para configurar la regla de notificación de un elemento, navegue al elemento en el árbol de activos, abra su pestaña **Eventos** y haga clic en el icono **Regla de Notificación** en la barra de herramientas (el icono que muestra un documento con una campana, segundo desde la derecha). Esto abre el diálogo de Regla de Notificación con la configuración actual.

Haga clic en **Editar** en el diálogo para modificar la configuración. Los parámetros configurables son:

| Parámetro | Descripción |
|---|---|
| **Punto de Contacto** (obligatorio) | El canal de entrega principal para las notificaciones de eventos. Seleccione de los puntos de contacto preconfigurados. |
| **Intervalo de Reenvío** (obligatorio) | Con qué frecuencia reenviar una notificación para un evento activo sin confirmar. Por ejemplo, configurar en 1 hora para alertar a los operadores cada hora hasta que el evento sea confirmado o cerrado. |
| **Punto de Contacto de Escalada** | Un punto de contacto adicional a notificar si el evento permanece sin confirmar durante más tiempo que el intervalo de escalada. Se usa para alertar a supervisores o personal de guardia cuando los operadores de primera línea no han respondido. |
| **Intervalo de Escalada** | Cuánto tiempo debe permanecer un evento sin confirmar antes de que se notifique al punto de contacto de escalada. |
| **Número Máximo de Reenvíos** | El número máximo de veces que un único evento puede activar una re-notificación. Evita el reenvío indefinido para eventos de larga duración. |
| **Mensaje** | El cuerpo del mensaje de notificación. Admite sustitución de variables — por ejemplo `{elementName}`, `{eventName}`, `{startTime}`, `{severityLevel}`, `{eventUrl}` — para incluir información específica del evento en cada notificación. |
| **Plantilla de Evento** | Umbral mínimo de gravedad por plantilla. Para cada plantilla de evento listada, especifique el nivel de gravedad más bajo que activará una notificación. Los eventos por debajo de la gravedad configurada quedarán suprimidos. |

El diálogo también tiene un botón **Vista Previa del Mensaje** para ver cómo se ve el mensaje renderizado, y un botón **Enviar Mensaje** para despachar una notificación manualmente de forma inmediata.

## 6.4.3 Comportamiento de las Notificaciones

Comprender el ciclo de vida de las notificaciones le ayuda a configurar los ajustes correctos de reenvío y escalada.

### Flujo de Notificaciones

Cuando un análisis genera un evento:

1. **Notificación Inicial** — El sistema envía inmediatamente una notificación al punto de contacto configurado, sujeto al ajuste de **Intervalo Mínimo de Notificación** en la plantilla de evento. Si se envió una notificación recientemente para un evento del mismo análisis (dentro del intervalo mínimo), la notificación inicial se suprime para evitar sobrecarga.

2. **Mecanismo de Reenvío** — Si el evento requiere confirmación (configurado en la plantilla de evento) y el evento no es confirmado dentro del **Intervalo de Reenvío**, el sistema envía otra notificación. Esto continúa hasta que:
   - El evento sea confirmado por un operador, o
   - El evento sea cerrado (se establece una hora de fin), o
   - Se alcance el **Número Máximo de Reenvíos**.

3. **Escalada** — Si se configuran un **Punto de Contacto de Escalada** y un **Intervalo de Escalada**, y el evento permanece sin confirmar más allá del intervalo de escalada, el sistema envía una notificación al punto de contacto de escalada además del punto de contacto principal.

4. **Notificaciones Se Detienen** — Una vez que el evento es confirmado o cerrado, no se envían más notificaciones para ese evento.

### Eventos Activos

Un evento que ha ocurrido pero que aún no ha sido cerrado se denomina **evento activo**. Los eventos activos continúan activando re-notificaciones según la regla de notificación. La lista de eventos marca los eventos activos para que sean fáciles de identificar. Una vez cerrado, el sistema detiene todas las notificaciones automáticas para ese evento.

### Ventana Emergente de Notificación en la Aplicación

Cuando se genera un evento, IDMP muestra una ventana emergente de **Nueva Notificación de Evento** en la esquina inferior derecha de la pantalla. Esta ventana emergente aparece para todos los usuarios conectados independientemente de qué página estén viendo. Muestra el nombre del evento, la hora de inicio, la hora de fin y el nivel de gravedad, junto con el recuento actual de **Eventos Sin Confirmar** en el sistema. Haga clic en el botón **×** para cerrarla.

### Historial de Entregas

Cada intento de notificación — exitoso o fallido — se registra en la sección **Registro de Notificaciones** de la página de detalle del evento. Este registro incluye el nombre del punto de contacto, la marca de tiempo y el estado de entrega, proporcionando un rastro de auditoría completo de quién fue notificado y cuándo.

## 6.4.4 Plantilla de Regla de Notificación

Cuando los elementos del mismo tipo requieren la misma configuración de notificaciones, puede definir una **plantilla de regla de notificación** en la [plantilla de elemento](../03-data-modeling/01-elements.md#316-element-templates) en lugar de configurar cada elemento individualmente.

La pestaña **Plantilla de Regla de Notificación** en una plantilla de elemento expone los mismos parámetros que una regla de notificación normal — punto de contacto, intervalo de reenvío, punto de contacto de escalada, intervalo de escalada, número máximo de reenvíos, mensaje y umbrales de gravedad por plantilla de evento. Configúrelo una vez, y cada elemento creado a partir de esa plantilla hereda automáticamente la regla de notificación.
