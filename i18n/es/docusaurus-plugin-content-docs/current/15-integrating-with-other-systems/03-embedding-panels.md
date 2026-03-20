---
title: Incrustación de paneles y paneles de control
sidebar_label: Incrustación de paneles y paneles de control
---

# 15.3 Incrustación de paneles y paneles de control

Los paneles y paneles de control de IDMP pueden incrustarse directamente en aplicaciones web externas, llevando visualizaciones industriales en tiempo real a portales de operadores, interfaces de usuario personalizadas o paneles de IA.

## Obtener el enlace de incrustación

1. Inicie sesión en IDMP y navegue a la vista de **Paneles de control** o **Paneles**.
2. Abra el panel de control o panel que desea incrustar.
3. Haga clic en el botón **Compartir** en la esquina superior derecha.
4. Establezca la duración del compartido y haga clic en **Enviar**.
5. Copie el enlace de incrustación generado.

## Incrustar con un iframe

Use una etiqueta `<iframe>` para incrustar el panel o panel de control en su página web. Por seguridad, configure un encabezado de Política de Seguridad de Contenido (CSP) en su página anfitriona (p. ej., restrinja `frame-ancestors` y `script-src`) y use el atributo `sandbox` para limitar las capacidades del iframe:

```html
<iframe
  src="<embed-link>"
  width="100%"
  height="600"
  frameborder="0"
  sandbox="allow-same-origin allow-scripts"
></iframe>
```

Ajuste los permisos de `sandbox` cuidadosamente según sus requisitos (p. ej., si se permite el envío de formularios o ventanas emergentes), y configure encabezados CSP estrictos en el servidor para reducir los riesgos de XSS y clickjacking.

## Abrir en una nueva pestaña

Para abrir un panel o panel de control en una nueva pestaña del navegador en lugar de incrustarlo en línea, use un enlace:

```html
<a href="<embed-link>" target="_blank">Open Dashboard</a>
```
