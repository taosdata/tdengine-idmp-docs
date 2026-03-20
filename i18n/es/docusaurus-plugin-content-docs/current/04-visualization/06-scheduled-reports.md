---
title: Informes Programados
sidebar_label: Informes Programados
---

# 4.6 Informes Programados

Los informes programados permiten enviar una imagen renderizada de un panel o dashboard a uno o más destinatarios según un calendario recurrente. En el momento configurado, IDMP captura el panel o dashboard en su estado actual, genera una imagen PNG y la envía a través del punto de contacto de notificación configurado, sin necesidad de iniciar sesión ni de exportar manualmente.

Los casos de uso típicos incluyen dashboards semanales de resumen energético enviados a la dirección, gráficos de tendencias de líneas de producción entregados diariamente a los ingenieros de turno, y exportaciones puntuales de paneles activadas bajo demanda.

## 4.6.1 Configurar Informes Programados para un Panel

La entrega de informes programados se configura en la sección **Regla de notificación** del editor de paneles.

1. Abra el editor de paneles (**Editar** en cualquier tarjeta de panel o en el modo de visualización).
2. En el panel de configuración derecho, desplácese hasta **Regla de notificación** y haga clic en **+** para añadir una nueva regla.
3. Configure los campos de la regla:

| Campo | Descripción |
|---|---|
| **Frecuencia** | Con qué periodicidad se envía el informe: **Una vez** (solo una vez), **Diario**, **Semanal** o **Mensual** |
| **Hora de inicio de la tarea** | Fecha y hora de la primera (o única) entrega. Obligatorio. |
| **Fecha de finalización** | Fecha en que se detiene el calendario recurrente. Opcional; si se deja en blanco, el calendario se ejecuta indefinidamente. |
| **Punto de contacto de notificación** | El canal o canales de notificación que recibirán el informe. Seleccione uno o más puntos de contacto preconfigurados en la lista desplegable. Obligatorio. |

4. Haga clic en **+** de nuevo para añadir reglas adicionales con diferente frecuencia o destinatarios.
5. Haga clic en **Guardar** para guardar el panel y activar el calendario.

Cada regla guardada aparece como una fila en la sección Regla de notificación. Use el icono de eliminar de la fila para eliminar una regla. Expanda una fila de regla contraída para editar su configuración.

## 4.6.2 Configurar Informes Programados para un Dashboard

Los informes a nivel de dashboard envían una imagen del dashboard completo en lugar de un panel individual. La configuración es idéntica a las reglas a nivel de panel.

1. Abra el editor de dashboards.
2. En el panel de configuración derecho, localice el campo **Regla de notificación**.
3. Haga clic en **+** para añadir una regla y complete los mismos campos: Frecuencia, Hora de inicio de la tarea, Fecha de finalización y Punto de contacto de notificación.
4. Haga clic en **Guardar** para activar el calendario.

Cuando se activa, IDMP renderiza el lienzo completo del dashboard —todos los paneles en el rango de tiempo predeterminado del dashboard— y lo envía como imagen.

## 4.6.3 Funcionamiento de la Entrega

Cuando se activa un informe programado:

- IDMP renderiza el panel o dashboard tal como aparecería en ese momento, utilizando la configuración de rango de tiempo guardada del panel o dashboard.
- El informe se genera como imagen PNG.
- La imagen se envía a todos los puntos de contacto configurados para esa regla.
- Si el panel pertenece a una plantilla, el informe se genera y envía por separado para cada elemento que utilice dicha plantilla.

Las reglas de frecuencia única se activan una sola vez en la hora de inicio de la tarea y quedan inactivas a partir de entonces. Las reglas recurrentes (Diario, Semanal, Mensual) se activan según el mismo calendario relativo a la hora de inicio de la tarea; por ejemplo, una regla Semanal con hora de inicio un lunes a las 09:00 se activa todos los lunes a las 09:00.

## 4.6.4 Puntos de Contacto de Notificación

Un **Punto de contacto de notificación** es un canal de entrega —una lista de direcciones de correo electrónico, un webhook, una integración con una plataforma de mensajería u otro canal compatible— configurado en los ajustes de notificación del sistema.

Los puntos de contacto se seleccionan por nombre en la lista desplegable al configurar una regla. Si no aparece ningún punto de contacto en la lista desplegable, deberá crearlo en la sección de configuración de notificaciones para poder activar las reglas de informes programados.

Consulte [Configuración del sistema](../14-administration/04-system-configuration.md) para obtener instrucciones sobre cómo crear y gestionar puntos de contacto de notificación.
