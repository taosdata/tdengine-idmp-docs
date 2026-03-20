---
title: Plantillas de Análisis
sidebar_label: Plantillas de Análisis
---

# 7.7 Plantillas de Análisis

Una **plantilla de análisis** define una regla de análisis reutilizable — disparador, cálculos y generación de eventos — como parte de una [plantilla de elemento](../03-data-modeling/01-elements.md#316-element-templates). Cuando se crea un elemento a partir de la plantilla, todas sus plantillas de análisis se instancian automáticamente, dando al nuevo elemento un conjunto completamente configurado de reglas de monitoreo sin ninguna configuración manual.

## La Pestaña de Plantillas de Análisis

La pestaña **Plantillas de Análisis** en una plantilla de elemento funciona de manera similar a la vista de Análisis regular en un elemento. Muestra una lista de plantillas de análisis definidas con columnas: **Nombre**, **Tipo de Disparador**, **Nombre del Stream**, **Categorías**, **Estado** y **Hora de Actualización**.

Puede crear plantillas de análisis de dos formas:

- **Asistida por IA:** Describa el análisis en el cuadro de texto ("Dígame el análisis que desea y lo crearé para usted") y haga clic en **Consultar IA**. IDMP también muestra **Preguntas Sugeridas** para ayudarle a comenzar.
- **Manual:** Haga clic en **+ Crear Nuevo Análisis Manualmente** en la lista para configurar el disparador, los cálculos y la generación de eventos usted mismo.

La barra de herramientas incluye un alternador **Activar/Desactivar** para habilitar o deshabilitar todas las plantillas de análisis en la plantilla de elemento de una vez.

## Cadenas de Sustitución

Dado que una plantilla de análisis se comparte entre muchos elementos, las referencias a nombres de elementos, atributos o fuentes de datos deben usar **cadenas de sustitución** en lugar de valores codificados de forma fija. IDMP proporciona un selector **+** en cada campo de entrada relevante para listar las cadenas aplicables. Si se define una PALABRA CLAVE personalizada en la plantilla de elemento, también puede usarse en las plantillas de análisis para hacer referencia dinámicamente a la fuente de datos correcta para cada elemento.

## Crear una Plantilla de Análisis

1. En **Biblioteca Base**, abra la plantilla de elemento.
2. Haga clic en la pestaña **Plantillas de Análisis**.
3. Haga clic en **+ Crear Nuevo Análisis Manualmente** o use el cuadro de texto de IA para describir el análisis.
4. Configure el análisis — disparador, cálculos, generación de eventos — usando cadenas de sustitución donde se necesiten valores específicos del elemento.
5. Haga clic en **Guardar**.

Consulte [Crear un Análisis](./02-creating-analysis.md) para obtener detalles completos sobre cada paso de configuración.

## Comportamiento de Instanciación

Cuando se crea un elemento a partir de una plantilla de elemento:

- Cada plantilla de análisis se instancia como un análisis concreto en el nuevo elemento.
- Todas las cadenas de sustitución se resuelven con el nombre real del elemento, sus atributos y referencias de datos.
- Los análisis comienzan a ejecutarse según sus disparadores configurados.

Si **Permitir Extensión** está habilitado en la plantilla de elemento, se pueden añadir análisis personalizados adicionales a elementos individuales además de los definidos por la plantilla.
