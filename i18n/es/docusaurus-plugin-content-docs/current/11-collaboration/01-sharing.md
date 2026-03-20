---
title: Compartir paneles de control e indicadores
sidebar_label: Compartir paneles de control e indicadores
---

# 11.1 Compartir paneles de control e indicadores

IDMP facilita compartir visualizaciones con los colegas sin necesidad de que estos recreen la misma configuración. Tanto los paneles de control como los indicadores individuales pueden compartirse directamente desde la interfaz de visualización.

## Compartir un panel de control

Un panel de control puede compartirse para que otro usuario pueda abrir y ver la misma disposición de indicadores, rangos de tiempo y configuraciones. Para compartir un panel de control, ábralo y utilice la opción **Compartir** de la barra de herramientas del panel. IDMP genera un enlace que se puede compartir o permite copiar la configuración del panel de control.

Puede también integrar el panel de control en páginas de su sistema mediante una etiqueta iframe:

```html
<iframe
  src="enlace de integración"
  width="100%"
  height="600"
  frameborder="0"
  sandbox="allow-same-origin allow-scripts"
></iframe>
```

Por motivos de seguridad, se recomienda configurar encabezados de Content Security Policy (CSP) apropiados en la página de integración y limitar las capacidades del iframe mediante el atributo `sandbox`.

También puede abrir el panel de control en una nueva página mediante un enlace:

```html
<a href="enlace de integración" target="_blank">Abrir panel de control</a>
```

Consulte [Paneles de control](../04-visualization/04-dashboards.md) para ver el flujo de trabajo completo de compartición.

## Compartir un indicador

Los indicadores individuales pueden compartirse o exportarse independientemente del panel de control al que pertenecen. Abra el menú del indicador (el icono de tres puntos en el encabezado del indicador) y seleccione la opción de compartir.

Consulte [Indicadores](../04-visualization/01-panels.md) para ver las opciones de compartición a nivel de indicador.

## Control de acceso

El contenido compartido está sujeto al control de acceso basado en roles de IDMP. Los destinatarios deben tener al menos acceso de lectura a los elementos y atributos subyacentes para ver datos en tiempo real en un panel de control o indicador compartido.
