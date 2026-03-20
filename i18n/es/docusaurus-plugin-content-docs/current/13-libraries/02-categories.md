---
title: Categorías
sidebar_label: Categorías
---

# 13.2 Categorías

Las **categorías** son etiquetas de clasificación que pueden aplicarse a objetos en IDMP para facilitar su filtrado, búsqueda y organización. Cualquier elemento, atributo, evento, panel de control, indicador o análisis puede etiquetarse con una o más categorías.

Las categorías se gestionan en **Libraries → Categories**.

## La lista de categorías

La lista muestra todas las categorías definidas con las siguientes columnas:

| Columna | Descripción |
|---|---|
| **Name** | Nombre de la categoría |
| **Description** | Descripción opcional |

Cada categoría también tiene un **Type** que determina a qué tipo de objeto puede aplicarse. La lista está organizada por tipo de objeto. Haga clic en el nombre de una categoría para editarla. Use el menú **⋮** de una fila para editarla o eliminarla.

## Creación de una categoría

Haga clic en **+** para crear una nueva categoría. Rellene los siguientes campos:

| Campo | Descripción |
|---|---|
| **Name** (obligatorio) | Un nombre único dentro de su tipo. Acepta letras, números, guiones bajos, guiones y espacios. |
| **Type** | El tipo de objeto al que se aplica esta categoría: `Element`, `Attribute`, `Analysis`, `Dashboard`, `Panel` o `Event`. |
| **Description** | Descripción opcional. |

Haga clic en **Save** para crear la categoría.

## Uso de categorías

Al crear o editar un objeto (elemento, atributo, evento, indicador, panel de control o análisis), puede asignarle una o más categorías en el campo **Category**. Las categorías deben coincidir con el tipo de objeto — por ejemplo, solo las categorías de tipo **Element** aparecen cuando se edita un elemento.

Una vez asignadas, las categorías aparecen como opciones de filtro en todo IDMP:

- En el **Explorador**, use el filtro de categoría para limitar el árbol de activos a elementos de una categoría específica.
- En las listas de **Dashboards** y **Events**, filtre por categoría para encontrar rápidamente indicadores o eventos relevantes.
- En **Libraries**, las categorías ayudan a organizar grandes conjuntos de plantillas de elementos y de eventos.

## Edición y eliminación

Para editar una categoría, haga clic en su nombre. Para eliminarla, use el menú **⋮**. Eliminar una categoría no afecta a los objetos a los que estaba asignada — la etiqueta de categoría simplemente se elimina de esos objetos.
