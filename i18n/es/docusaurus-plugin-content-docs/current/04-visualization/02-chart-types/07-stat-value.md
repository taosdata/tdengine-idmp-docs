---
title: Valor estadístico
sidebar_label: Valor estadístico
---

# 4.2.7 Valor estadístico

## Descripción general

El panel de valor estadístico muestra un único valor numérico con una fuente grande, con una etiqueta y una marca de tiempo opcionales. Es adecuado para dashboards y paneles de estado donde las métricas clave deben presentarse con claridad en pantallas grandes o vistas de resumen.

![Ejemplo de valor estadístico](../images/stat-demo.png)

El valor mostrado es el punto de datos más reciente en el rango de tiempo seleccionado. El tamaño de fuente, el color, el fondo y el diseño son configurables para que coincidan con el diseño visual del dashboard al que pertenece.

## Cuándo usarlo

Use el panel de valor estadístico cuando:

- Necesite mostrar métricas clave en un dashboard — producción total del día, temperatura actual, número de alarmas activas
- Quiera mostrar valores con fuente grande y fáciles de leer desde lejos en pantallas de operadores
- Esté construyendo un panel de resumen de KPI que muestre múltiples métricas clave en paralelo

Si necesita ver el valor en relación con una escala o rango, use el gráfico de indicador o el indicador de barra. Para ver tendencias históricas, use el gráfico de tendencia.

## Configuración

### Barra de herramientas del modo de edición

Además de los [controles generales del modo de edición](../01-panels.md#414-modo-de-edición-de-paneles), el valor estadístico añade los siguientes controles:

| Control | Descripción |
|---|---|
| **Guardar como imagen** | Descarga la vista previa actual como imagen PNG |
| **Pantalla completa** | Expande la vista previa del editor para llenar la ventana del navegador |
| **Interpretar panel** | Ejecuta el análisis de IA sobre los datos de la vista previa actual |

### Configuración del gráfico

| Ajuste | Descripción |
|---|---|
| **Diseño** | **Horizontal** (la etiqueta y el valor en paralelo) o **Vertical** (la etiqueta encima del valor) |
| **Mostrar hora** | **Activado:** muestra la marca de tiempo del punto de datos debajo del valor. **Desactivado:** muestra solo el valor. |
| **Tamaño de fuente del nombre** | Tamaño de fuente de la etiqueta del nombre de la métrica (predeterminado: 16) |
| **Color de fuente del nombre** | Color del texto de la etiqueta |
| **Tamaño de fuente del valor** | Tamaño de fuente del valor (predeterminado: 48) |
| **Color de fuente del valor** | Color del texto del valor |
| **Color de fondo** | Color de fondo del panel |
| **Ancho** | Ancho fijo en píxeles del panel (déjelo vacío para ajuste automático de tamaño) |

## Ejemplos de uso

**Métricas clave del dashboard.** El dashboard de un gerente de fábrica dispone en horizontal tres paneles de valor estadístico: consumo total de energía del día, producción por hora actual y número de alarmas activas. Cada panel usa fuente grande (64), fondo oscuro con valores en blanco, legibles con claridad desde lejos en la sala de control.

**KPI de resumen de turno.** En el cambio de turno, el panel de valor estadístico muestra la producción total de las últimas 8 horas. Con la función "Mostrar hora" activada, los operadores pueden confirmar cuándo se actualizó por última vez el valor.

**Punto de monitoreo de temperatura.** La temperatura de un horno crítico se muestra como valor estadístico, con el color de fuente del valor establecido en rojo cuando se supera el límite superior del atributo, proporcionando una alerta visual inmediata dentro del dashboard.
