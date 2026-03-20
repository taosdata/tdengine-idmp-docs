---
title: Plantillas de Evento
sidebar_label: Plantillas de Evento
---

# 6.1 Plantillas de Evento

Una plantilla de evento define el esquema y el comportamiento de los eventos. Cada evento generado por un análisis debe estar basado en una plantilla de evento. Las plantillas se gestionan de forma centralizada en **Biblioteca Base → Plantillas de Evento**, lo que las hace reutilizables en cualquier análisis del sistema.

## 6.1.1 Crear una Plantilla de Evento

Para crear una nueva plantilla de evento:

1. Navegue a **Biblioteca Base → Plantillas de Evento** en la navegación izquierda.
2. Haga clic en el botón **+** (Nueva Plantilla de Evento).
3. Configure los campos de la plantilla (véase a continuación).
4. Haga clic en **Guardar**.

## 6.1.2 Configuración de la Plantilla

### Configuración General

| Campo | Descripción |
|---|---|
| **Nombre** | Identificador único de la plantilla |
| **Categoría** | Etiqueta para organizar las plantillas (por ejemplo, "Plantilla Base" o una categoría personalizada) |
| **Solo Plantilla Base** | Si está habilitado, esta plantilla no puede utilizarse directamente para crear eventos; solo puede servir como plantilla padre de otras plantillas |
| **Nivel de Gravedad** | Gravedad predeterminada para los eventos creados con esta plantilla: Crítico, Mayor, Menor, Advertencia o Normal |
| **Permitir Extensión** | Si está habilitado, otras plantillas pueden heredar de esta plantilla |
| **Permitir Confirmación** | Si está habilitado, los eventos creados con esta plantilla requieren confirmación manual. Los eventos activos sin confirmar seguirán activando re-notificaciones según la regla de notificación del elemento |
| **Código de Causa** | Conjunto de enumeraciones opcional para clasificar la causa del evento. Debe definirse previamente en **Biblioteca Base → Enumeraciones** |
| **Valor del Código de Causa** | Un valor específico dentro de la enumeración del código de causa, que proporciona una descripción más detallada de la causa |
| **Intervalo Mínimo de Notificación** | El tiempo mínimo entre notificaciones consecutivas para eventos del mismo análisis. Evita la sobrecarga de notificaciones cuando un análisis genera eventos con frecuencia — por ejemplo, si se establece en 20 minutos, solo se enviará una notificación por ventana de 20 minutos independientemente de cuántos eventos se activen |
| **Descripción** | Descripción en texto libre del propósito de la plantilla |

### Patrón de Nomenclatura de Eventos

Cada evento generado por una plantilla recibe un nombre construido a partir del **Patrón de Nomenclatura de Eventos**. Introduzca texto estático e inserte variables de marcador de posición haciendo clic en el icono **+** a la derecha del campo. Las variables disponibles incluyen nombre del elemento, nombre del análisis, hora de inicio, hora de finalización, entre otras.

Para obtener mejores resultados, incluya el nombre del elemento, el nombre del análisis y la hora de inicio en el patrón — esto hace que cada nombre de evento sea autodescriptivo: `{elementName} - {analysisName} - {startTime}`.

### Herencia de Plantillas

Las plantillas de evento admiten herencia. Al crear una plantilla, puede seleccionar una **Plantilla Base** de la cual la nueva plantilla hereda la configuración. Las sub-plantillas pueden ampliar el esquema de atributos de la plantilla base y anular configuraciones individuales.

Si una plantilla está marcada como **Solo Plantilla Base**, no puede referenciarse directamente al configurar un análisis — solo puede utilizarse como plantilla padre.

## 6.1.3 Plantillas de Atributos de Evento

Un evento puede llevar atributos personalizados que registran valores en el momento en que ocurre el evento — por ejemplo, la temperatura máxima durante una excedencia o el ID de lote al momento de un fallo. Estos atributos se definen en la sección **Plantilla de Atributos de Evento** del editor de plantillas de evento.

Para cada atributo, configure:

| Campo | Descripción |
|---|---|
| **Nombre** | Nombre del atributo |
| **Categoría** | Etiqueta opcional |
| **Tipo de Dato** | El tipo del valor (numérico, cadena de texto, etc.) |
| **Valor Predeterminado** | Valor utilizado si el análisis no escribe en este atributo |
| **Constante** | Si está habilitado, el valor no puede modificarse después de su creación |
| **Oculto** | Si está habilitado, el atributo no se muestra en las vistas de evento normales |

Al configurar un análisis, la salida de un cálculo puede escribirse en cualquier atributo definido en la plantilla de evento. Esto permite capturar valores calculados — como el valor promedio durante una ventana o la excedencia máxima — directamente en el registro del evento.

:::tip
Los datos de atributos de evento se almacenan en la base de datos relacional integrada de TDengine IDMP, no en el almacenamiento de series temporales. Los atributos de evento no admiten configuración de referencia de datos.
:::

## 6.1.4 Administrar Plantillas de Evento

La lista **Biblioteca Base → Plantillas de Evento** muestra todas las plantillas con su nombre, categoría, gravedad y descripción. Utilice los iconos de acción en cada fila para:

- **Editar** — Modificar la configuración de la plantilla
- **Eliminar** — Eliminar la plantilla (solo es posible si ningún análisis la referencia)
