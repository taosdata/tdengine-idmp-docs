---
title: Confirmación
sidebar_label: Confirmación
---

# 6.5 Confirmación

La confirmación es el acto mediante el cual un operador humano confirma que ha revisado un evento. Sirve como registro explícito de que el evento fue visto y atendido, y detiene el ciclo automático de re-notificaciones para ese evento.

## 6.5.1 Cómo Funciona la Confirmación

Si un evento específico requiere confirmación está determinado por el ajuste **Permitir Confirmación** en la plantilla de evento. Si este ajuste está habilitado, los eventos creados con esa plantilla tendrán un estado **Sin Confirmar** cuando se generen por primera vez.

Un evento sin confirmar:

- Muestra un indicador de confirmación en la lista de eventos (la columna **A**)
- Continúa activando re-notificaciones según el calendario definido por la regla de notificación del elemento
- Aparece cuando el filtro alternante **Sin Confirmar** está habilitado en la vista de eventos

Una vez confirmado:

- El estado del evento cambia a **Confirmado**
- El indicador de confirmación se actualiza en la lista de eventos
- Las re-notificaciones se detienen de inmediato — no se envían más alertas para este evento independientemente de si permanece activo

## 6.5.2 Cómo Confirmar un Evento

Hay dos maneras de confirmar un evento:

**Desde la lista de eventos:**

Haga clic en el icono de acción **Confirmar** en la fila del evento. El estado se actualiza de inmediato.

**Desde la página de detalle del evento:**

Abra el evento haciendo clic en su nombre, luego haga clic en el icono **Confirmar** en la barra de herramientas de la pestaña General.

## 6.5.3 Encontrar Eventos Sin Confirmar

El elemento **Eventos** en la barra de navegación principal muestra un indicador con el número total de eventos sin confirmar en el sistema. Esto da a cada usuario conectado un recuento de un vistazo de los eventos pendientes que aún requieren atención, visible desde cualquier página en IDMP.

La vista global de eventos y la pestaña de eventos a nivel de elemento proporcionan un alternador **Sin Confirmar** en la barra de herramientas. Active este alternador para filtrar la lista y mostrar solo los eventos que aún requieren atención. Esta es la forma más rápida para que un operador identifique sus elementos de acción abiertos al inicio de un turno.

Los eventos sin confirmar también pueden encontrarse a través de filtros de eventos guardados — cree y guarde un filtro con el alternador Sin Confirmar activado, luego fíjelo como favorito para acceso con un solo clic.

## 6.5.4 Interacción entre Confirmación y Notificación

La confirmación y las notificaciones están estrechamente vinculadas. Los comportamientos clave que hay que entender:

- Si **Permitir Confirmación** está deshabilitado en la plantilla de evento, el evento no tiene requisito de confirmación y las re-notificaciones no ocurren — el sistema envía como máximo una notificación inicial por evento.
- Si **Permitir Confirmación** está habilitado, las re-notificaciones continúan hasta que el evento sea confirmado o cerrado, o se alcance el número máximo de reenvíos.
- Confirmar un evento no lo cierra. Un evento confirmado puede seguir activo (sin hora de fin). Cerrar un evento es una acción separada realizada por el análisis cuando se cumple su condición de finalización.
- Si un evento se cierra antes de ser confirmado, las re-notificaciones también se detienen — el sistema no envía notificaciones para eventos cerrados.
