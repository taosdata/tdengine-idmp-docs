---
title: Glosario
sidebar_label: Glosario
---

## Atributo (Attribute)

La propiedad de un elemento, que representa una única dimensión de datos de un activo, como temperatura, estado operativo, potencia de salida o capacidad nominal. Un atributo puede ser un valor de configuración estático almacenado en IDMP, un valor dinámico vinculado a datos de series temporales en tiempo real en TSDB, o un valor derivado calculado por análisis en tiempo real. Cada atributo dinámico lleva metadatos: unidad de ingeniería, unidad de visualización, precisión decimal y valores de límite superior e inferior.

## Inteligencia de Negocio (BI)

Business Intelligence, inteligencia de negocio. Una categoría de software y prácticas utilizadas para recopilar, integrar, analizar y presentar datos empresariales con el fin de apoyar la toma de decisiones. Las herramientas de BI (como Tableau, Power BI y Grafana) se conectan a fuentes de datos y presentan paneles, informes y consultas ad hoc para usuarios empresariales y operativos. TDengine IDMP puede actuar como fuente de datos para herramientas de BI a través de su API REST e interfaces JDBC/ODBC, permitiendo que los datos industriales de series temporales y el contexto de activos fluyan hacia entornos de BI empresariales existentes.

## AI Q&A (Chat BI)

La interfaz conversacional de TDengine IDMP que permite a los usuarios consultar datos industriales y generar visualizaciones mediante lenguaje natural, sin necesidad de escribir consultas ni configurar paneles manualmente. Impulsado por un modelo de lenguaje grande que comprende el modelo de elementos y el contexto de los atributos, AI Q&A puede convertir en tiempo real preguntas como "mostrar la temperatura promedio del caldero 3 durante los últimos 7 días" en gráficos y resultados de análisis, permitiendo que el personal operativo sin conocimientos de TI acceda a los datos empresariales.

## Datos Contextuales (Contextual Data)

Metadatos que otorgan significado a los valores numéricos brutos de series temporales. Los datos contextuales responden: ¿qué se mide? ¿dónde se mide? ¿bajo qué condiciones se mide? En IDMP, los datos contextuales se adjuntan a los elementos y sus atributos, e incluyen información descriptiva, dimensiones físicas (unidades, precisión, límites) y etiquetas de clasificación. Los datos contextuales son la base para habilitar las funciones de IA: el sistema los utiliza para comprender los escenarios operativos y generar análisis e información relevantes.

## Panel de Control (Dashboard)

Una colección que organiza múltiples paneles en una sola vista. Un panel de control proporciona una visión operativa completa de un elemento o conjunto de elementos. Cada elemento puede tener múltiples paneles de control para diferentes propósitos y audiencias: monitoreo en tiempo real para operadores, análisis de causa raíz para ingenieros, revisión de KPI para gerentes. Los paneles de control pueden crearse manualmente o generarse automáticamente por el motor de IA, y pueden compartirse, enviarse por correo electrónico programado o incrustarse en aplicaciones externas.

## Tejido de Datos (Data Fabric)

Un enfoque arquitectónico que proporciona una capa de integración unificada para acceder, gestionar y gobernar datos a través de fuentes y entornos heterogéneos (local, nube y borde), sin necesidad de mover físicamente los datos a un almacenamiento central. El tejido de datos aprovecha los metadatos, los catálogos de datos y los servicios de integración inteligente para que los datos sean detectables y accesibles desde cualquier ubicación. TDengine IDMP respalda estrategias de tejido de datos al actuar como fuente autorizada de datos industriales de series temporales y contexto de activos, exponiendo los datos a través de API abiertas y suscripciones de datos.

## Historiador de Datos Industriales (Data Historian)

Un sistema de software especializado en la recopilación, almacenamiento y recuperación de datos de series temporales de procesos industriales. El historiador de datos se sitúa entre los sistemas de campo (PLC, SCADA, DCS) y las herramientas de análisis o informes de nivel superior, proporcionando un registro histórico de los datos operativos. El historiador de datos más ampliamente implementado es AVEVA PI System. TDengine Historian, que combina las capacidades de almacenamiento de TDengine TSDB con el modelado de activos y las capacidades analíticas de TDengine IDMP, es una alternativa moderna a los historiadores de datos tradicionales, con capacidades nativas de IA, interfaces abiertas y una escalabilidad significativamente mayor a un menor costo.

## Lago de Datos (Data Lake)

Una arquitectura de almacenamiento que conserva grandes volúmenes de datos en su formato original (estructurado, semiestructurado y no estructurado) hasta que se necesiten para el análisis. A diferencia de los almacenes de datos, los lagos de datos no imponen un esquema en el momento de la escritura. En entornos industriales, los lagos de datos se utilizan normalmente para archivar datos históricos de sensores, registros de eventos y registros de equipos para análisis a largo plazo, entrenamiento de aprendizaje automático y cumplimiento normativo. TDengine IDMP puede enviar datos a un lago de datos a través de suscripciones de datos e interfaces API, permitiendo que las cargas de trabajo de IA y análisis posteriores procesen datos industriales enriquecidos y contextualizados.

## Suscripción de Datos (Data Subscription)

Una capacidad de TDengine TSDB que permite a las aplicaciones externas suscribirse en tiempo real a flujos de datos de series temporales recién escritos, sin necesidad de sondeo. Los suscriptores reciben cada nuevo punto de datos en el momento en que llega, lo que permite que los sistemas posteriores (pipelines de IA, herramientas de BI, lagos de datos u otras bases de datos) consuman continuamente datos industriales en tiempo real. La suscripción de datos es uno de los principales mecanismos de TDengine para apoyar el flujo de datos bidireccional abierto en lugar de silos de almacenamiento cerrados.

## Almacén de Datos (Data Warehouse)

Un repositorio centralizado que almacena datos estructurados y optimizados para consultas de informes y análisis. A diferencia de los lagos de datos, los almacenes de datos imponen un esquema y generalmente se llenan con datos limpiados y agregados de sistemas operativos a través de pipelines ETL (extraer, transformar, cargar). Los almacenes de datos industriales típicamente resumen KPI de producción, resúmenes de turnos e indicadores de calidad para informes empresariales. TDengine IDMP complementa los almacenes de datos: el almacén guarda el historial agregado para informes empresariales, mientras que IDMP guarda el contexto completo de series temporales para análisis operativo.

## Sistema de Control Distribuido (DCS)

Distributed Control System, sistema de control distribuido. Una arquitectura de control de procesos en la que las funciones de control se distribuyen en múltiples controladores a lo largo de una planta, en lugar de centralizarse en un único dispositivo. Los sistemas DCS son comunes en industrias de procesos continuos, como refinerías, química y generación de energía. Gestionan el control de bucle cerrado, manteniendo temperatura, presión y flujo dentro de rangos establecidos, y generan grandes volúmenes de datos de series temporales para monitoreo y análisis en plataformas como historiadores de datos industriales y TDengine IDMP.

## Elemento (Element)

La unidad básica del modelo de activos de IDMP. Un elemento representa cualquier entidad física o lógica sobre la que desea organizar y rastrear datos: un sensor, un motor, una línea de producción, una fábrica o una unidad de negocio. Los elementos se organizan en una jerarquía de árbol que refleja la estructura operativa del mundo real. Cada elemento tiene sus propios atributos, análisis, paneles y paneles de control, y es el ancla organizativa de todo en el sistema. También denominado activo.

## Planificación de Recursos Empresariales (ERP)

Enterprise Resource Planning, planificación de recursos empresariales. Una categoría de software de gestión empresarial que integra los procesos empresariales básicos (adquisiciones, planificación de producción, inventario, finanzas, recursos humanos y ventas) en un único sistema. En entornos industriales, los sistemas ERP operan en la capa empresarial por encima de la capa de planta. La integración de TDengine IDMP con ERP es común: los datos de producción, KPI de equipos e indicadores de calidad recopilados en IDMP pueden alimentar los sistemas ERP para apoyar los informes de producción, la contabilidad de costos y las decisiones de la cadena de suministro.

## Evento (Event)

Un evento operativo discreto con una hora de inicio, hora de fin, duración, nivel de gravedad y datos relacionados capturados en el momento de su ocurrencia. Los eventos son desencadenados por análisis en tiempo real cuando se detecta una condición: superación de un umbral, desviación de proceso, inicio o fin de un lote de producción. Los eventos pueden requerir reconocimiento y desencadenar notificaciones. Transforman el flujo continuo de datos de sensores en segmentos operativos con nombre y estructura sobre los que tanto los ingenieros como los sistemas de IA pueden razonar. Equivalente al Event Frame en AVEVA PI System.

## IDMP (Plataforma de Gestión de Datos Industriales)

Industrial Data Management Platform, plataforma de gestión de datos industriales. TDengine IDMP es la capa semántica de datos e inteligencia de la plataforma TDengine, construida sobre TDengine TSDB, que proporciona modelado de activos industriales, contextualización de datos, visualización, gestión de eventos, análisis en tiempo real e información impulsada por IA. IDMP en sí no almacena datos de series temporales; lee los datos de TSDB y solo almacena información de estructura y contexto: árbol de elementos, definiciones de atributos, metadatos, plantillas, registros de eventos y configuraciones de análisis.

## Información (Insight)

El resultado analítico generado por la IA basado en los datos y el contexto de un elemento. El motor de información de IDMP puede detectar automáticamente los escenarios operativos de un elemento, generar paneles y análisis relevantes, responder preguntas en lenguaje natural, detectar anomalías, generar predicciones, completar valores faltantes y realizar análisis de causa raíz, sin necesidad de configuración manual.

## Modelo de Lenguaje Grande (LLM)

Large Language Model, modelo de lenguaje grande. Un modelo de IA entrenado en grandes volúmenes de texto que puede comprender y generar lenguaje natural. En el contexto de TDengine IDMP, los modelos de lenguaje grandes impulsan las capacidades de IA conversacional y generativa: consultas en lenguaje natural sobre datos industriales, paneles y análisis generados por IA, explicaciones de causa raíz y generación de narrativas de anomalías. El rendimiento de los modelos de lenguaje grandes sobre datos industriales depende del grado de contextualización de los datos, que es precisamente lo que proporciona el modelo de activos y la capa de metadatos de IDMP.

## Aprendizaje Automático (Machine Learning)

Una rama de la inteligencia artificial en la que los modelos aprenden patrones a partir de datos en lugar de ser programados explícitamente. En las operaciones industriales, el aprendizaje automático se aplica a la detección de anomalías, el mantenimiento predictivo, la optimización de procesos, la predicción, la agrupación en clústeres y el análisis de regresión. TDengine IDMP incorpora capacidades de aprendizaje automático a través de sus funciones de información impulsada por IA y análisis por lotes, reduciendo la dependencia de plataformas de aprendizaje automático externas para casos de uso operativos comunes.

## Sistema de Ejecución de Manufactura (MES)

Manufacturing Execution System, sistema de ejecución de manufactura. Un sistema de software que gestiona y monitorea en tiempo real las operaciones de producción en planta, rastreando órdenes de trabajo, consumo de materiales, acciones de operadores, estado de máquinas y producción de salida. El MES se sitúa entre la capa de control (PLC, SCADA, DCS) y la capa empresarial (ERP). TDengine IDMP es un complemento natural del MES: IDMP proporciona la base de datos de series temporales y el análisis contextual que suele faltar en el MES, y ambas capas pueden integrarse para correlacionar eventos de producción con el comportamiento de los equipos y los datos de proceso.

## MQTT

Message Queuing Telemetry Transport, protocolo de transporte de telemetría por cola de mensajes. Un protocolo de mensajería de publicación-suscripción ligero diseñado para dispositivos con recursos limitados y redes de bajo ancho de banda, ampliamente utilizado en el Internet Industrial de las Cosas para transmitir datos de sensores desde dispositivos de campo a plataformas de datos. TDengine IDMP admite de forma nativa MQTT como fuente de ingesta de datos.

## OPC-DA

OLE for Process Control — Data Access, OLE para control de procesos — acceso a datos. Un estándar más antiguo basado en Windows para el intercambio de datos en tiempo real entre sistemas SCADA, PLC y otros componentes de automatización industrial. OPC-DA depende de la tecnología COM/DCOM de Microsoft, lo que lo limita a entornos Windows. Ha sido reemplazado en gran medida por OPC-UA en implementaciones nuevas. TDengine admite OPC-DA como fuente de ingesta de datos.

## OPC-UA

OPC Unified Architecture, arquitectura unificada OPC. Un estándar de comunicación industrial moderno e independiente de plataforma que define tanto un modelo de datos como un protocolo de transporte seguro. OPC-UA es el sucesor de OPC-DA y es el estándar predominante para el intercambio de datos entre dispositivos industriales, sistemas SCADA, historiadores de datos y plataformas de datos. TDengine admite de forma nativa OPC-UA como fuente de ingesta de datos.

## Diagrama de Tuberías e Instrumentación (P&ID)

Piping and Instrumentation Diagram, diagrama de tuberías e instrumentación. Un diagrama detallado utilizado en la industria de procesos (petróleo y gas, química, energía eléctrica) que muestra las tuberías, equipos, instrumentos y sistemas de control de una planta o instalación. Los P&ID son la referencia autorizada para comprender el diseño físico y los puntos de medición de los procesos industriales, y se utilizan habitualmente como punto de partida para diseñar modelos de elementos en IDMP.

## Panel (Panel)

Un único componente de visualización que presenta datos de uno o más atributos de un elemento: un gráfico, medidor, tabla o pantalla de estado. IDMP admite múltiples tipos de paneles, incluyendo gráficos de tendencias, gráficos de barras, gráficos circulares, medidores, gráficos de dispersión, paneles de valores estadísticos, gráficos de historial de estado, tablas, listas de eventos y gráficos de mapas. Los paneles son los bloques de construcción fundamentales de todas las visualizaciones en IDMP, y pueden crearse manualmente o generarse automáticamente por el motor de IA.

## Modelo Basado en Física (Physics-based Model)

Un modelo matemático construido a partir de leyes físicas (conservación de masa, conservación de energía, termodinámica, dinámica de fluidos o cinética de reacciones) en lugar de derivarse únicamente de datos observados. También llamado modelo de primeros principios o modelo de caja blanca. Los modelos basados en física codifican el conocimiento de dominio sobre cómo funciona un proceso, pueden extrapolar a condiciones no vistas en los datos históricos y proporcionan resultados interpretables. En la IA industrial moderna, los modelos basados en física se combinan frecuentemente con modelos basados en datos para formar enfoques de modelado híbrido (caja gris), donde la parte física maneja la estructura de proceso conocida y la parte basada en datos corrige la incertidumbre y el sesgo del modelo. TDengine IDMP respalda este enfoque de modelado al almacenar las salidas del modelo basado en física como atributos calculados y analizarlos junto con los datos de sensores en tiempo real.

## Controlador Lógico Programable (PLC)

Programmable Logic Controller, controlador lógico programable. Una computadora industrial robustificada utilizada para automatizar procesos de control discretos, controlando maquinaria, líneas de ensamblaje o cualquier aplicación que requiera lógica de control en tiempo real confiable. Los PLC leen entradas de sensores e interruptores, ejecutan el programa de control y accionan salidas para actuadores y motores. Cada PLC típicamente expone muchos puntos de medición individuales (tags), generalmente usando un modelo de datos de columna única donde cada punto de medición se almacena como una serie separada. En TDengine IDMP, múltiples puntos de medición de PLC del mismo equipo deben ensamblarse bajo un único elemento a través del flujo de trabajo de mapeo de supertabla a elemento.

## Sistema de Gestión de Calidad (QMS)

Quality Management System, sistema de gestión de calidad. Un sistema formal que documenta procesos, procedimientos y responsabilidades para alcanzar políticas y objetivos de calidad. En la manufactura, el QMS captura resultados de inspecciones, registros de defectos, informes de no conformidad y parámetros de proceso relacionados con la calidad del producto. TDengine IDMP respalda los casos de uso del QMS al correlacionar datos de proceso de series temporales (temperatura, presión, velocidad de rotación) con eventos de producción y registros de lotes, proporcionando la base de datos para el control estadístico de procesos, el análisis de causa raíz de desviaciones de calidad y los informes de cumplimiento.

## Sistema de Control de Supervisión y Adquisición de Datos (SCADA)

Supervisory Control and Data Acquisition, sistema de control de supervisión y adquisición de datos. Una arquitectura de sistema utilizada en todas las industrias (servicios públicos, petróleo y gas, manufactura, tratamiento de agua) para monitorear y controlar equipos y procesos geográficamente dispersos. Los sistemas SCADA recopilan datos en tiempo real de dispositivos de campo (PLC, RTU, sensores), los presentan a los operadores y admiten operaciones de control remoto. Los sistemas SCADA son las principales fuentes de datos industriales de series temporales, y sus datos típicamente se alimentan a historiadores de datos y plataformas como TDengine IDMP para almacenamiento a largo plazo, análisis e información impulsada por IA.

## Kit de Desarrollo de Software (SDK)

Software Development Kit, kit de desarrollo de software. Un conjunto empaquetado de bibliotecas, herramientas y documentación que permite a los desarrolladores interactuar con una plataforma de forma programática. TDengine IDMP proporciona SDK oficiales para Java y Python, generados automáticamente a partir de la especificación OpenAPI. Los SDK cubren la gestión de elementos, el acceso a datos de series temporales (histórico, valor más reciente, escritura) y las consultas de eventos. Los desarrolladores que utilicen otros lenguajes pueden utilizar OpenAPI Generator para generar clientes a partir de la especificación OpenAPI.

## Sparkplug B

Una especificación abierta construida sobre MQTT que define un formato de carga útil estandarizado y un espacio de nombres de temas para las comunicaciones de dispositivos industriales. Sparkplug B aborda una limitación clave del MQTT estándar (la falta de un modelo de datos definido) al especificar cómo codificar y estructurar metadatos de dispositivos, valores de medición y cambios de estado. Es ampliamente adoptado en implementaciones industriales de IoT como método práctico para implementar un espacio de nombres unificado (UNS). TDengine IDMP admite Sparkplug B como fuente de ingesta de datos, permitiendo que los dispositivos que publican mensajes Sparkplug B mapeen automáticamente sus datos al modelo de elementos.

## Control Estadístico de Procesos (SPC)

Statistical Process Control, control estadístico de procesos. Un método de control de calidad que utiliza técnicas estadísticas (principalmente gráficos de control) para monitorear y controlar los procesos de manufactura o negocios. El SPC detecta si un proceso se está desviando de los límites de control antes de que ocurran defectos, permitiendo a los operadores intervenir de manera proactiva. TDengine IDMP proporciona la base de datos de series temporales para los flujos de trabajo de SPC: los datos continuos de sensores pueden calcular límites de control, detectar señales fuera de control y correlacionar la variación de proceso con causas ascendentes a través de análisis en tiempo real y análisis por lotes.

## Procesamiento de Flujos (Stream Processing)

La realización de cálculos continuos sobre datos a medida que llegan, en lugar de sobre datos almacenados en reposo. TDengine TSDB incorpora un motor de procesamiento de flujos que puede evaluar expresiones, calcular agregaciones, detectar condiciones y escribir los resultados de vuelta como nuevas series temporales en tiempo real a medida que se escriben nuevas mediciones. Esto elimina la necesidad de plataformas de procesamiento de flujos independientes (como Kafka Streams o Apache Flink) para muchos casos de uso industriales comunes. Los análisis en tiempo real de IDMP están impulsados por este motor de procesamiento de flujos.

## Supertabla (Supertable)

Un concepto central de TDengine TSDB. Una supertabla es una plantilla de tabla que define el esquema compartido por un conjunto de tablas de series temporales relacionadas: nombres de columnas, tipos de datos y columnas de etiquetas. Cada serie temporal individual (subtabla) hereda el esquema de su supertabla y añade sus propios valores de etiqueta para identificarse (por ejemplo, ID de dispositivo, ubicación o tipo de equipo). Las supertablas permiten consultar eficientemente múltiples dispositivos del mismo tipo sin operaciones de unión. En IDMP, la supertabla es el puente entre el modelo de datos bruto de TSDB y el modelo de elemento/atributo.

## Tag (Etiqueta de Punto de Medición)

En entornos de tecnología operacional (OT): PI System, SCADA, DCS e historiadores de datos industriales, un tag es el término estándar para un punto de medición con nombre individual que produce continuamente una secuencia de valores con marca de tiempo. Un tag es conceptualmente idéntico a una serie temporal. TDengine utiliza "datos de series temporales" para alinearse con la terminología de datos moderna, pero cada tag en los sistemas industriales existentes corresponde directamente a una serie temporal en TDengine TSDB. Los dos términos pueden usarse indistintamente.

## Plantilla (Template)

Una estructura estándar reutilizable para una clase de activo o patrón operativo. Las plantillas existen en cada nivel de la plataforma IDMP: las plantillas de elementos definen el conjunto estándar de atributos para una clase de activo (bombas, medidores, calderas); las plantillas de atributos definen definiciones de medición reutilizables; las plantillas de análisis, paneles, paneles de control, eventos y notificaciones estandarizan la lógica y la presentación. La actualización de una plantilla propaga los cambios a todos los elementos derivados de esa plantilla, facilitando la gestión de implementaciones a gran escala.

## Series Temporales (Time Series)

Un flujo de mediciones con marca de tiempo producidas por un sensor, medidor o sistema de control. Los datos de series temporales se almacenan en TDengine TSDB. En IDMP, se accede a los datos de series temporales a través de los atributos de un elemento en lugar de directamente, manteniendo una separación clara entre la capa semántica y la capa de almacenamiento. Véase también: **Tag (Etiqueta de Punto de Medición)**.

## Base de Datos de Series Temporales (TSDB)

Time-Series Database, base de datos de series temporales. Una base de datos optimizada para almacenar y consultar datos con marca de tiempo. TDengine TSDB es la base de datos de series temporales distribuida de alto rendimiento de TDengine, diseñada para escribir y almacenar miles de millones de puntos de datos de millones de secuencias de medición con rendimiento de consulta en milisegundos. TSDB también incorpora un motor de procesamiento de flujos para cálculos en tiempo real sobre los datos entrantes. TDengine IDMP está construido sobre TSDB para proporcionar la capa de modelo de activos, contextualización y análisis.

## Modelo de Fundamento de Series Temporales (TSFM)

Time Series Foundation Model, modelo de fundamento de series temporales. Un gran modelo de IA preentrenado en grandes volúmenes de datos de series temporales de múltiples dominios, de manera similar a como los modelos de lenguaje grandes se preentrenan en texto. Los modelos de fundamento de series temporales pueden realizar tareas de series temporales (predicción, detección de anomalías, completado, clasificación) con poca o ninguna ajuste fino para tareas específicas, aprovechando los patrones aprendidos durante el preentrenamiento. TDengine IDMP integra capacidades de modelo de fundamento de series temporales en su capa de información impulsada por IA, permitiendo a los operadores industriales aplicar IA de series temporales de última generación a los datos de su planta sin necesidad de construir y entrenar modelos personalizados.

## Espacio de Nombres Unificado (UNS)

Unified Namespace, espacio de nombres unificado. Un patrón arquitectónico de integración de datos industriales en el que todos los datos (de PLC, SCADA, MES, ERP y otras fuentes) se publican en un único espacio de nombres de acceso central, típicamente a través de MQTT. En la arquitectura de espacio de nombres unificado, cada productor de datos publica en una jerarquía de temas compartida y cada consumidor se suscribe desde ella, eliminando las integraciones punto a punto. TDengine IDMP puede actuar como consumidor y capa analítica del espacio de nombres unificado, ingiriendo datos de un broker MQTT y organizándolos en el modelo de elementos.

## Tabla Virtual (Virtual Table)

Un concepto central de TDengine TSDB. Una tabla virtual es una tabla calculada cuyas columnas se derivan de expresiones sobre una o más tablas físicas, en lugar de mediciones almacenadas directamente. Las tablas virtuales permiten a los ingenieros definir métricas calculadas (como ratios de eficiencia, variables de proceso derivadas o lecturas agregadas) que se comportan como series temporales regulares al consultar, sin necesidad de precalcular y almacenar los resultados por separado.

## Inteligencia sin Consulta (Zero Query Intelligence)

Una capacidad de TDengine IDMP que genera automáticamente paneles de control, paneles y análisis en tiempo real para un elemento sin ninguna consulta o configuración activa por parte del usuario. Cuando se activa, el motor de IA examina los datos y el contexto del elemento, identifica el escenario operativo (como turbina eólica, bomba, caldera) y genera un conjunto completo de visualizaciones y análisis relevantes. La Inteligencia sin Consulta es el primer paso en el flujo de trabajo de IA de IDMP, proporcionando información operativa instantánea después de completar el modelado del elemento y antes de cualquier configuración manual.
