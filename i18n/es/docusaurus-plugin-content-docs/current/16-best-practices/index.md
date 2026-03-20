---
title: Mejores prácticas
sidebar_label: Mejores prácticas
---

import DocCardList from '@theme/DocCardList';

# 16. Mejores prácticas

IDMP proporciona potentes capacidades de modelado de datos que estandarizan y contextualizan los datos industriales, haciéndolos aptos para IA y permitiendo una extracción más profunda de valor empresarial. Sin embargo, construir un buen modelo de datos es algo que requiere un juicio humano cuidadoso — es difícil de automatizar solo con IA.

Para minimizar el costo y el esfuerzo del modelado, TDengine recomienda comenzar con una gobernanza de datos sólida en la fuente. Algunas directrices clave:

1. **Use nombres coherentes y estandarizados para cada punto de medición** — las convenciones de nomenclatura deben ser globalmente uniformes en todas las fuentes de datos.
2. **Prefiera modelos de múltiples columnas para magnitudes físicas muestreadas simultáneamente** — dado que comparten una marca de tiempo, agruparlas en una sola fila reduce el overhead de almacenamiento y simplifica las consultas.
3. **Configure una estructura jerárquica para cada punto de recopilación de datos** — ya sea de una o varias columnas, adjunte la jerarquía como metadatos al escribir en TDengine TSDB-Enterprise. Por ejemplo: `Planta-1.Línea-A.Dispositivo-X`.

El módulo taosX dentro de TDengine TSDB-Enterprise puede leer estos metadatos y crear automáticamente supertablas y subtablas, realizar transformaciones de datos y adjuntar etiquetas adicionales para preservar la jerarquía de dispositivos. IDMP puede entonces usar esos metadatos para construir automáticamente el árbol de elementos y generar plantillas e instancias de elementos.

Para los datos recopilados por PLC que usan un modelo de una sola columna, donde un único dispositivo tiene múltiples puntos de medición, es necesario ensamblar esos puntos bajo un elemento dentro de IDMP. Consulte la sección [Construir modelos de datos desde TSDB](../12-data-ingestion/03-building-data-models-from-tsdb.md) para obtener orientación.

Una vez que el modelo jerárquico de elementos esté establecido en IDMP, puede enriquecerlo aún más con plantillas de elementos y atributos — agregando descripciones, unidades y semántica empresarial — para proporcionar un contexto de datos más rico y hacer que toda la plataforma esté preparada para IA.

<DocCardList />
