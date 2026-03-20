---
title: Compartir Paneles y Dashboards
sidebar_label: Compartir
---

# 4.5 Compartir Paneles y Dashboards

TDengine IDMP proporciona un mecanismo de compartición integrado que genera enlaces temporales hacia paneles y dashboards. Un enlace para compartir permite al destinatario ver el panel o dashboard en modo de solo lectura tal como estaba en el momento de compartirlo, sin necesidad de iniciar sesión.

## 4.5.1 Compartir un Panel

Para compartir un panel:

1. Abra el panel en modo de visualización (haga clic en **Ver** en cualquier tarjeta de panel, o navegue a un panel que ya tenga abierto).
2. Haga clic en el botón **Compartir** de la barra de herramientas del modo de visualización.
3. Se abre un cuadro de diálogo con un campo de **Duración disponible**. Introduzca un número y seleccione la unidad: **Minutos**, **Horas** o **Días**.
4. Haga clic en **Enviar**. El enlace se genera y se copia automáticamente al portapapeles. Si lo necesita, cópielo desde el campo mostrado.

El enlace para compartir captura el rango de tiempo actual y el estado del panel. Los destinatarios que abran el enlace verán el panel con los datos correspondientes al rango de tiempo vigente en el momento en que se creó el enlace.

Los enlaces para compartir tienen **vigencia temporal**: caducan después de la duración elegida. Una vez vencidos, el enlace devuelve una respuesta de acceso denegado. Por ello, los enlaces para compartir son adecuados para comunicaciones de corta duración (enviar un gráfico a un colega, adjuntarlo a un informe, pegarlo en un hilo de chat), pero no como referencias permanentes.

## 4.5.2 Compartir un Dashboard

Los dashboards admiten el mismo mecanismo de compartición que los paneles. Para compartir un dashboard:

1. Abra el dashboard en modo de visualización.
2. Haga clic en el botón **Compartir** de la barra de herramientas del dashboard.
3. Copie el enlace generado.

El enlace permite al destinatario ver el dashboard en modo de solo lectura con el mismo rango de tiempo y la misma disposición de paneles que había en el momento de generar el enlace.

## 4.5.3 Descargar un Panel como Imagen

Además de compartir por enlace, cualquier panel puede descargarse como imagen PNG:

1. Abra el panel en modo de visualización.
2. Haga clic en el botón **Guardar como imagen** de la barra de herramientas.
3. El navegador descarga el gráfico actual como archivo PNG.

La imagen descargada captura el gráfico tal como está renderizado en ese momento —el rango de tiempo visible, todas las series, la leyenda y las líneas de límite— y puede incrustarse en informes, presentaciones o documentos sin necesidad de acceder a IDMP.

## 4.5.4 Abrir un Panel en una Nueva Ventana

Para comparaciones en paralelo o configuraciones con múltiples monitores, cualquier panel guardado puede abrirse en una ventana de navegador independiente. Hay dos formas de hacerlo:

- **Desde la pestaña Paneles:** Pase el cursor sobre la tarjeta del panel y haga clic en **⋮** → **Abrir en nueva ventana**.
- **Desde el modo de visualización:** Haga clic en el botón **Abrir en nueva ventana** de la barra de herramientas del modo de visualización.

El panel se abre en modo de visualización en una nueva ventana del navegador, con su propia barra de herramientas y controles de rango de tiempo. Esta ventana funciona de forma independiente: puede establecer un rango de tiempo diferente en la nueva ventana al de la pestaña principal.
