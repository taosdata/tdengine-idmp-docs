---
title: Plantillas de Paneles y Dashboards
sidebar_label: Plantillas de Paneles y Dashboards
---

# 4.7 Plantillas de Paneles y Dashboards

Las plantillas de paneles y dashboards son sub-plantillas dentro de una [plantilla de elemento](../03-data-modeling/01-elements.md#316-element-templates). Definen las visualizaciones estándar que se crean automáticamente para cada elemento de una clase de activo determinada, de modo que cuando un elemento se instancia a partir de la plantilla, sus paneles y dashboards estén listos para usar sin ninguna configuración manual.

## Plantillas de Paneles

La pestaña **Plantilla de panel** en una plantilla de elemento funciona de forma idéntica a la vista de paneles habitual de un elemento. Admite tanto la creación de paneles asistida por IA como la creación manual:

- Use el cuadro de texto **Preguntar a la IA** ("Dígame qué panel quiere y lo construiré para usted") para describir un panel en lenguaje natural y hacer que la IA lo genere.
- Haga clic en **+ Nueva plantilla de panel** para crear un panel manualmente, seleccionando el tipo de panel y configurando sus fuentes de datos.

Dado que una plantilla de panel se comparte entre muchos elementos, cualquier referencia a datos específicos del elemento debe utilizar cadenas de sustitución como `${Element#name}` o `${Attribute#name}`. IDMP proporciona un selector **+** en cada campo de entrada relevante para ayudarle a seleccionar la cadena de sustitución correcta.

Cuando se crea un elemento a partir de la plantilla, todas las plantillas de paneles se instancian automáticamente con las cadenas de sustitución resueltas al nombre real del elemento y sus atributos.

## Plantillas de Dashboards

La pestaña **Plantilla de dashboard** muestra una lista de plantillas de dashboards (columnas: **Nombre**, **Categorías**). Haga clic en **+ Nueva plantilla de dashboard** para crear un diseño de dashboard que se asociará automáticamente a cada elemento creado a partir de esta plantilla.

## Relación con Paneles y Dashboards Independientes

Las plantillas de paneles y dashboards definidas dentro de una plantilla de elemento son distintas de los paneles y dashboards autónomos creados directamente en un elemento específico. Las visualizaciones basadas en plantillas se instancian automáticamente en todos los elementos de la clase de activo y se mantienen consistentes a nivel de plantilla.

Si la opción **Permitir extensión** está habilitada en la plantilla de elemento, los elementos individuales pueden tener paneles y dashboards adicionales añadidos por encima de los definidos en la plantilla.
