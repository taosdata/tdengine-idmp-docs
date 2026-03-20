---
title: Conjuntos de enumeración
sidebar_label: Conjuntos de enumeración
---

# 13.1 Conjuntos de enumeración

Un **conjunto de enumeración** mapea valores enteros (u otros valores numéricos) a etiquetas legibles para las personas. Cuando el tipo de dato de un atributo es un entero que representa un estado discreto — como `0 = Detenido`, `1 = En marcha`, `2 = Fallo` — puede asignar un conjunto de enumeración al atributo para que IDMP muestre la etiqueta en lugar del número sin procesar.

Los conjuntos de enumeración se gestionan en **Libraries → Enumeration Sets**.

## La lista de conjuntos de enumeración

La lista muestra todos los conjuntos de enumeración definidos con las siguientes columnas:

| Columna | Descripción |
|---|---|
| **Name** | Nombre del conjunto de enumeración |
| **Value Type** | El tipo de dato numérico de los valores sin procesar |
| **Description** | Descripción opcional |

Haga clic en el nombre de un conjunto de enumeración para verlo o editarlo. Use el menú **⋮** de una fila para editarlo o eliminarlo.

## Creación de un conjunto de enumeración

Haga clic en **+** para crear un nuevo conjunto de enumeración. Rellene los siguientes campos:

| Campo | Descripción |
|---|---|
| **Name** (obligatorio) | Un nombre único. Acepta letras, números, guiones bajos, guiones y espacios. |
| **Value Type** | El tipo de dato de los valores sin procesar. Opciones: `TinyInt` (predeterminado), `SmallInt`, `Int`, `BigInt`, `TinyInt Unsigned`, `SmallInt Unsigned`, `Int Unsigned`, `BigInt Unsigned`, `Float`, `Double`, `Boolean`, `Varchar`, `Nchar`, `Timestamp`. |
| **Description** | Descripción opcional del conjunto de enumeración. |

A continuación, añada uno o más valores de enumeración en la tabla **Value** haciendo clic en **+** en la tabla:

| Campo | Descripción |
|---|---|
| **Name** (obligatorio) | La etiqueta de visualización. Acepta letras, números, guiones bajos y guiones. |
| **Value** (obligatorio) | El valor numérico sin procesar al que se mapea esta etiqueta. |
| **Description** | Descripción opcional de este valor de enumeración. |
| **Parent** | Valor de enumeración padre opcional. Úselo para agrupar valores relacionados bajo un padre común y facilitar el filtrado y la navegación. |

Haga clic en **Confirm** para añadir el valor y luego en **Save** para guardar el conjunto de enumeración.

## Subvalores (agrupación)

IDMP admite subvalores de enumeración: un valor de enumeración puede servir como padre de otros. Este es un mecanismo de agrupación — los valores padre no representan datos en sí mismos, sino que permiten organizar y filtrar los valores secundarios.

**Ejemplo:** Para una enumeración de estado de motor, podría definir un valor padre `Anómalo` y agrupar `Fallo`, `Sobrecarga` y `Parada de emergencia` bajo él. Los usuarios pueden entonces filtrar por `Anómalo` para ver todos los estados anómalos a la vez.

## Edición y eliminación

Para editar un conjunto de enumeración, haga clic en su nombre en la lista. Para eliminarlo, use el menú **⋮** de su fila. Un conjunto de enumeración no puede eliminarse si está asignado actualmente a uno o más atributos.

## Uso de conjuntos de enumeración

Después de crear un conjunto de enumeración, asígnelo a un atributo seleccionándolo en el campo **Enumeration Set** del atributo (disponible cuando el tipo de dato del atributo es de tipo numérico). IDMP mostrará entonces la etiqueta mapeada en todos los lugares donde aparezca el valor del atributo — en gráficos de tendencias, tablas, líneas de tiempo de estados y eventos.
