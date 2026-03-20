---
title: Estandarización de datos
sidebar_label: Estandarización de datos
---

# 3.4 Estandarización de datos

Los entornos industriales suelen recopilar datos de múltiples fuentes con nomenclatura inconsistente, unidades variables y estructuras de datos diferentes. Sin estandarización, el análisis entre activos, los conocimientos generados por IA y la agregación de datos se vuelven poco fiables o imposibles. TDengine IDMP proporciona varios mecanismos para estandarizar los datos en todo su modelo de activos.

## 3.4.1 Nomenclatura unificada mediante referencias de datos

Diferentes fuentes de datos suelen usar nombres distintos para la misma medición física. Un sistema puede almacenar la temperatura como `temperature`, otro como `WD`, y un tercero como `tmp_sensor_1`. Sin estandarización, no se pueden comparar ni agregar estos valores.

IDMP resuelve esto mediante el mecanismo de **referencia de datos**: independientemente de cómo se llame la columna subyacente en TDengine TSDB, usted define un nombre de atributo estándar único en el elemento — por ejemplo, `TemperaturaInterior` — y lo mapea a la columna de la tabla que contiene los datos reales. Todos los usuarios, dashboards y análisis se refieren entonces a `TemperaturaInterior` independientemente de la nomenclatura del sistema fuente.

Esto significa que puede:

- Renombrar campos fuente con nombres poco descriptivos o abreviados por nombres de ingeniería claros
- Aplicar una convención de nomenclatura coherente en todos los activos del mismo tipo
- Cambiar la fuente de datos subyacente sin afectar a ningún dashboard o análisis que referencie el atributo

## 3.4.2 Transformación de datos con Fórmula y Constructor de cadenas

Cuando los datos de diferentes fuentes usan representaciones distintas de la misma medición, IDMP le permite transformarlos mediante referencias de datos de tipo **Fórmula** y **Constructor de cadenas**.

Los **atributos de Fórmula** permiten calcular un valor derivado a partir de otros atributos. Por ejemplo:

- Una fuente de datos registra la potencia activa directamente; otra registra corriente y tensión por separado. Cree un atributo Fórmula `PotenciaActiva = corriente × tensión` para producir un valor de potencia consistente independientemente de la fuente.
- Convertir entre escalas: `TemperaturaCelsius = (TemperaturaFahrenheit - 32) × 5 / 9`

Los **atributos Constructor de cadenas** permiten construir valores de cadena estandarizados a partir de múltiples campos fuente. Por ejemplo, construir una descripción de ubicación estándar a partir de campos de ciudad y edificio separados:

```text
CONCAT(${attributes['City']}, '-', ${attributes['Building']}, '-Floor', CAST(${attributes['Floor']} AS varchar))
```

A través de estos mecanismos, IDMP absorbe datos sin procesar heterogéneos y los expone a través de un modelo de atributos consistente y estandarizado.

## 3.4.3 Estandarización de unidades de medida

IDMP desacopla la **unidad de almacenamiento** de la **unidad de visualización**, habilitando la conversión automática:

- **UdM predeterminada** — la unidad en la que la fuente almacena los datos (p. ej., metros, vatios, kelvin)
- **UdM de visualización** — la unidad mostrada a los usuarios en paneles y dashboards (p. ej., kilómetros, kilovatios, °C)

Cuando las dos difieren, IDMP convierte el valor automáticamente. Por ejemplo, si la unidad predeterminada es metros y la unidad de visualización es kilómetros, un valor almacenado de 1000 se muestra como 1 km.

Ambas unidades deben pertenecer a la misma **Clase de UdM** (p. ej., Longitud, Potencia, Temperatura). El desplegable de Clase de UdM agrupa las unidades compatibles y evita emparejamientos inválidos.

Este mecanismo estandariza la presentación de datos de cara al usuario incluso cuando sistemas fuente diferentes registran valores en unidades distintas, y garantiza la coherencia dimensional en las expresiones de fórmulas.

## 3.4.4 Plantillas para la estandarización estructural

Las plantillas son la herramienta más potente para garantizar una estructura coherente entre activos similares. IDMP proporciona plantillas en múltiples niveles:

### Plantillas de elemento

Definen una estructura de activo estándar para cada clase de activo (p. ej., Bomba, Medidor, Caldera). Una plantilla de elemento preconfigurada incluye el conjunto completo de atributos estándar — con sus nombres, tipos de datos, unidades, límites y descripciones — que todo activo de esa clase debería tener. Cuando se crea un nuevo elemento a partir de una plantilla, todos los atributos estándar se añaden automáticamente.

### Plantillas de atributo

Las definiciones de atributos individuales pueden guardarse en la biblioteca de plantillas y reutilizarse en múltiples elementos o plantillas de elemento. Esto garantiza que los atributos comunes (p. ej., `PotenciaActiva`, `EstadoOperativo`) se definan de forma consistente en todos los lugares donde aparecen.

### Otros tipos de plantilla

IDMP también proporciona plantillas para análisis, paneles, dashboards, eventos y notificaciones — garantizando que la lógica operativa y las visualizaciones estén estandarizadas en la misma clase de activo, no solo en el modelo de datos.

Consulte el [Capítulo 13 — Bibliotecas](../13-libraries/index.md) para más detalles sobre la creación y gestión de plantillas.

## 3.4.5 Categorías para la organización de atributos

Asigne **Categorías** a los atributos para agruparlos por función, sistema o cualquier esquema organizativo relevante para sus operaciones (p. ej., Eléctrico, Mecánico, Seguridad, Calidad). Las categorías sirven para dos propósitos:

- **Filtrado**: en la pestaña Atributos, use el desplegable de Categorías para mostrar solo los atributos pertenecientes a un grupo específico
- **Consistencia**: cuando se aplican las mismas etiquetas de categoría a todos los elementos del mismo tipo, los usuarios siempre saben dónde encontrar los atributos relacionados

Las categorías son etiquetas de texto libre y pueden combinarse con plantillas para aplicar un esquema de categorización estándar en todo el modelo de activos.

## 3.4.6 Configuración de límites para la estandarización de alarmas

Definir umbrales de alarma estándar — Mínimo, LoLo, Lo, Objetivo, Hi, HiHi, Máximo — en los atributos estandariza cómo se expresan los límites operativos entre activos del mismo tipo. Cuando se definen en una plantilla de elemento, todos los elementos creados a partir de esa plantilla heredan automáticamente los mismos límites, garantizando un comportamiento de alarma consistente en toda la flota.

Los límites pueden establecerse como valores fijos o vincularse a otros atributos (límites dinámicos), proporcionando flexibilidad al tiempo que se mantiene una estructura estándar.

## 3.4.7 Copiar y pegar entre elementos

Cuando necesite aplicar la misma configuración de atributo a múltiples elementos que no están cubiertos por una plantilla, use la operación **Copiar**:

1. En la lista de Atributos, haga clic en el menú **⋮** en la fila de un atributo y seleccione **Copiar**.
2. Navegue al elemento de destino.
3. En la pestaña Atributos del elemento de destino, pegue el atributo.

El atributo copiado lleva su configuración completa — tipo de datos, unidad, límites, descripción y tipo de referencia de datos — al nuevo elemento, donde solo necesita actualizar la Configuración de referencia de datos para apuntar a la columna fuente correcta para ese elemento.

Esto proporciona una alternativa rápida y ligera a las plantillas formales cuando se estandarizan ad hoc un pequeño número de elementos.
