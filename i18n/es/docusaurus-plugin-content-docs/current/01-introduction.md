---
title: Introducción
sidebar_label: Introducción
---

# 1. Introducción

## 1.1 ¿Qué es TDengine IDMP?

TDengine IDMP (Industrial Data Management Platform, Plataforma de Gestión de Datos Industriales) es una plataforma nativa de IA diseñada para gestionar, analizar y generar información a partir de datos operacionales industriales.

Funciona en conjunto con TDengine TSDB, una base de datos de series temporales distribuida de alto rendimiento que almacena y procesa grandes volúmenes de datos de series temporales generados por sensores, dispositivos y sistemas de control.

TDengine IDMP se construye sobre esta base de series temporales y proporciona capacidades de nivel superior para la gestión de datos industriales, entre ellas:

- modelado de datos industriales basado en elementos y atributos
- contextualización de datos brutos de sensores
- estandarización de datos industriales entre sistemas
- visualización y dashboards
- análisis operacional basado en eventos
- análisis en tiempo real
- generación de información impulsada por IA

Gracias a estas capacidades, IDMP permite a las organizaciones transformar señales operacionales brutas en información estructurada que puede utilizarse para monitoreo, análisis, optimización y toma de decisiones.

A diferencia de las herramientas de monitoreo tradicionales que se centran principalmente en los dashboards, TDengine IDMP está diseñado para ayudar a ingenieros y operadores a comprender el comportamiento operacional e identificar hallazgos directamente a partir de datos industriales.

IDMP es una plataforma de gestión de datos y análisis, no una plataforma completa de IoT industrial. No proporciona gestión de conectividad de dispositivos, despacho de comandos de control ni actualizaciones de firmware, aunque se integra perfectamente con las plataformas que sí los ofrecen. Tampoco es un sistema de ejecución de manufactura; no gestiona personal, órdenes de mantenimiento, inventario ni programación de producción.

El alcance de TDengine IDMP es deliberado: ser la plataforma más capaz para gestionar, contextualizar, estandarizar, visualizar, analizar y derivar inteligencia de datos de series temporales industriales.

---

## 1.2 Por qué importan los fundamentos de datos industriales en la era de la IA

Los sistemas industriales generan volúmenes enormes de datos: temperaturas, presiones, caudales, señales de vibración, consumo energético, estados de equipos, muestreados a alta frecuencia desde miles o millones de puntos de medición. A primera vista, esto parece una riqueza de información. En la práctica, la mayor parte no se aprovecha. Las señales brutas existen de forma aislada, producidas por sistemas heterogéneos con diferentes convenciones de nomenclatura, diferentes unidades y sin una comprensión compartida de lo que significan los datos.

La IA tiene el potencial de transformar profundamente las operaciones industriales. Pero la IA no puede razonar sobre señales brutas sin contexto. Una lectura de vibración de 4,7 mm/s no significa nada para un sistema de IA a menos que sepa que esta lectura pertenece a un motor específico, en una línea de producción específica, operando bajo una condición de carga específica, en el contexto de un lote que comenzó hace tres horas. Cuanto más fundamental sea la pregunta —"¿Por qué bajó la producción ayer?" o "¿Qué compresor tiene más probabilidades de fallar la próxima semana?"—, más depende la IA de datos estructurados, contextualizados y semánticamente ricos para producir una respuesta útil.

Esto es lo que hace que las plataformas de gestión de datos industriales sean esenciales en la era de la IA. La IA reemplazará muchas herramientas de software: generadores de informes, asistentes de programación, flujos de trabajo de formularios. Pero no puede reemplazar la infraestructura que recopila, organiza y mantiene el contexto en torno a los datos industriales. Quien controle esa base de datos determinará lo que la IA puede hacer en el mundo industrial.

El cambio ya está en marcha. El software industrial tradicional ponía la visualización en el centro: el objetivo era mostrar el estado actual de las operaciones en una pantalla. En la era de la IA, el objetivo es diferente: transformar los datos operacionales en comprensión. Eso requiere no solo almacenar datos, sino organizarlos en una forma que tanto los seres humanos como los sistemas de IA puedan navegar y razonar. Las plataformas de datos industriales son la capa que hace posible esto.

---

## 1.3 Descripción general de la arquitectura de TDengine

TDengine se construye sobre dos componentes complementarios que juntos forman una base de datos industriales completa.

**TDengine TSDB** (Base de Datos de Series Temporales) es la capa de infraestructura de datos. Gestiona la ingesta en tiempo real desde pasarelas industriales, PLCs, sistemas SCADA, dispositivos IoT y otras fuentes. Almacena datos de series temporales a escala (soporta miles de millones de puntos de datos en millones de series de medición) y ofrece consultas de alto rendimiento con tiempos de respuesta a nivel de milisegundos. TDengine TSDB también incluye un motor de procesamiento de flujos integrado que permite el cómputo en tiempo real sobre los flujos de datos entrantes, sin necesidad de una plataforma de streaming independiente.

**TDengine IDMP** es la capa de semántica de datos e inteligencia. Se sitúa sobre TSDB y proporciona la estructura organizativa, el contexto de negocio y la inteligencia analítica que el almacenamiento bruto de series temporales no puede ofrecer. IDMP no almacena datos de series temporales por sí mismo: lee de TSDB (u otra base de datos de series temporales conectada). Lo que sí almacena y gestiona es el modelo de activos: los elementos, atributos, relaciones, plantillas y metadatos que dan significado a los datos de series temporales.

![Arquitectura de TDengine](images/tdengine-architecture-en.png)

Juntos, los dos componentes cubren las tres capas que cualquier base de datos industriales completa debe proporcionar:

| Capa | Capacidad | Componente |
|---|---|---|
| Infraestructura de datos | Ingesta en tiempo real, escrituras de alto rendimiento, almacenamiento escalable, consultas de alto rendimiento | TDengine TSDB |
| Semántica de datos | Modelado de activos, contextualización de datos, estandarización, gestión de eventos | TDengine IDMP |
| Inteligencia | Análisis en tiempo real, información generada por IA, consultas en lenguaje natural, detección de anomalías, pronósticos | TDengine IDMP + AI |

La plataforma está diseñada para ser abierta. Expone una interfaz MCP (Model Context Protocol) para que los agentes de IA puedan acceder directamente a los datos industriales. Soporta REST API, JDBC, ODBC y SDKs de cliente en Java y Python. Los datos pueden fluir hacia fuera a través de Kafka, MQTT e interfaces de suscripción de datos, de modo que los sistemas de IA downstream, las herramientas de BI y las aplicaciones de terceros puedan consumirlos en tiempo real. Esta apertura garantiza que TDengine pueda servir como núcleo en un ecosistema industrial de IA más amplio, en lugar de convertirse en un silo cerrado.

---

## 1.4 Relación entre IDMP y TDengine TSDB

TDengine TSDB es una potente base de datos de series temporales, pero una base de datos por sí sola no es suficiente para las operaciones industriales. Incluso con miles de millones de puntos de datos almacenados y un rendimiento de consultas rápido, una base de datos bruta no puede decirle qué medición pertenece a qué equipo, cuál es su unidad de ingeniería, cuál es su rango de operación normal, o qué significa cuando el valor supera un umbral. No puede organizar los equipos en una jerarquía, estandarizar la nomenclatura entre sitios, ni detectar automáticamente una anomalía y notificar al ingeniero responsable.

TDengine IDMP completa el cuadro. Proporciona la gestión de metadatos, el contexto de negocio y las capacidades analíticas que TSDB deja deliberadamente fuera de su alcance. Cuando IDMP se conecta a TSDB, puede sincronizar automáticamente la topología de activos: si se añade un nuevo dispositivo o cambia una configuración en TSDB, IDMP actualiza la jerarquía de activos para reflejarlo. Esto mantiene el catálogo de datos preciso sin necesidad de reconciliación manual.

Vale la pena ser claro sobre el límite entre los dos sistemas. IDMP no almacena datos de series temporales. Cada consulta de un valor de medición, cada gráfico de tendencia, cada resultado de análisis en tiempo real: todos estos datos se recuperan de TSDB en el momento de la consulta. IDMP almacena únicamente la información estructural y contextual: el árbol de elementos, las definiciones de atributos, los metadatos, las plantillas, los registros de eventos y las configuraciones de análisis. Esta separación significa que agregar IDMP a un despliegue existente de TDengine TSDB no es destructivo y no duplica datos.

IDMP está diseñado principalmente para su uso con TDengine TSDB, donde la integración es más profunda y eficiente. También se admiten conexiones a otras bases de datos de series temporales.

---

## 1.5 Comparación con los historiadores de datos tradicionales

Los historiadores de datos industriales han sido el estándar para la gestión de datos operacionales durante décadas. El más ampliamente desplegado es el **AVEVA PI System**, que consta de varios componentes: la interfaz/conector PI para la ingesta de datos, el PI Data Archive para el almacenamiento de series temporales, el PI Asset Framework (AF) para el modelado de activos, y PI Vision para la visualización.

Funcionalmente, **TDengine TSDB + IDMP se corresponde directamente con esta pila tecnológica**: TDengine TSDB corresponde a la interfaz/conector PI + PI Data Archive, y TDengine IDMP corresponde a PI Asset Framework + PI Vision. Los usuarios familiarizados con PI System reconocerán los conceptos fundamentales —jerarquías de activos, atributos, tramas de eventos, plantillas— y encontrarán que IDMP los implementa sobre una arquitectura moderna y preparada para IA.

Las diferencias clave reflejan cómo ha cambiado el panorama tecnológico desde que se diseñaron los historiadores tradicionales:

| Capacidad | Historiadores tradicionales (p. ej., PI System) | TDengine TSDB + IDMP |
|---|---|---|
| Integración de IA | Limitada; requiere herramientas de terceros | Nativa; Inteligencia sin consulta, Chat BI |
| Reglas de eventos | Configuración manual por ingenieros OT | Manual o asistida por IA; LLM puede generar reglas basadas en datos recopilados |
| Visualización | Orientada a la exhibición | Orientada a la información; la IA genera y recomienda paneles |
| Análisis avanzado | Limitado; requiere herramientas de terceros | Análisis por lotes, pronósticos, detección de anomalías, imputación, agrupamiento, regresión y más, integrados de fábrica |
| Escala | Típicamente hasta un millón de etiquetas | Diseñado para miles de millones de puntos de datos |
| Flujo de datos | Principalmente entrante (recopilación y almacenamiento) | Bidireccional; la suscripción de datos permite el flujo saliente en tiempo real hacia sistemas downstream |
| Apertura | Interfaces propietarias; exportación limitada | REST API, JDBC, ODBC, Kafka, MQTT, MCP, SDKs abiertos |
| Despliegue | Principalmente Windows | Linux, contenedores, máquinas virtuales, nube privada, nativo en la nube |

La limitación actual de TDengine en comparación con los historiadores maduros es la conectividad con fuentes de datos. PI System soporta una gama muy amplia de interfaces y protocolos industriales acumulados durante décadas. TDengine actualmente soporta OPC-UA, OPC-DA y MQTT de forma nativa, con fuentes adicionales soportadas a través del marco de ingesta de datos de TDengine TSDB. Esta brecha se está reduciendo con cada versión.

Para las organizaciones que evalúan una migración desde PI System u otro historiador, el mapeo funcional es lo suficientemente cercano como para que los modelos de activos existentes y la lógica de análisis puedan, en general, re-expresarse en TDengine IDMP sin un rediseño fundamental.

---

## 1.6 Conceptos fundamentales

La comprensión de TDengine IDMP comienza con un pequeño conjunto de conceptos fundamentales que aparecen en toda la plataforma. Estos conceptos forman el vocabulario del sistema, y cada funcionalidad —desde el modelado hasta la visualización y los hallazgos de IA— se construye sobre ellos.

### 1.6.1 Elementos (Activos)

Un **elemento** es la unidad fundamental del modelo de activos. Cada nodo en el árbol de activos es un elemento. Los elementos representan entidades físicas o lógicas: un sensor, un motor, una línea de producción, una planta, una ciudad, una unidad de negocio —cualquier cosa que sea significativa para la operación y cuyos datos se desee organizar y rastrear.

Los elementos se organizan en una jerarquía en forma de árbol. Cada elemento puede tener cero o más elementos hijos, y todo elemento excepto el raíz tiene un padre. Esta jerarquía refleja la estructura del mundo real de la operación: un parque eólico contiene turbinas, cada turbina contiene subsistemas, cada subsistema contiene sensores individuales. Navegar por el árbol es la forma en que los usuarios exploran la operación y localizan los datos que necesitan.

Cada elemento tiene su propio conjunto de atributos, análisis, paneles y dashboards. Es el ancla organizativa para todo lo demás en el sistema.

### 1.6.2 Atributos

Un **atributo** es una propiedad de un elemento. Los atributos representan las dimensiones de datos individuales asociadas a un activo: su temperatura, su estado de funcionamiento, su potencia de salida, su ubicación geográfica, su capacidad nominal, etc.

Los atributos pueden ser de distintos tipos. Algunos son valores de configuración estáticos almacenados directamente en IDMP (como la potencia nominal de un motor o la fecha de instalación de un activo). Otros son dinámicos, vinculados a datos de series temporales en vivo en TSDB a través de una referencia de datos. Otros más son derivados: calculados por un análisis en tiempo real y escritos de vuelta como resultado. Cada atributo dinámico tiene metadatos configurables: unidad de ingeniería, unidad de visualización, precisión decimal, límites superior e inferior, y valor objetivo.

### 1.6.3 Series temporales

Las **series temporales** son los flujos de valores de medición con marca de tiempo almacenados en TDengine TSDB. Son los datos brutos producidos por sensores, instrumentos y sistemas de control: miles o millones de puntos de datos individuales que llegan cada segundo.

Si proviene de un entorno OT, puede estar más familiarizado con el término **etiqueta** (tag). Una etiqueta —como se usa en PI System, sistemas SCADA, plataformas DCS y la mayoría de los historiadores industriales— es exactamente el mismo concepto: un único punto de medición con nombre que produce un flujo continuo de valores con marca de tiempo. Los términos son intercambiables. TDengine usa "serie temporal" para alinearse con la terminología moderna de datos, pero cada etiqueta en su sistema existente corresponde directamente a una serie temporal en TDengine TSDB.

En IDMP, las series temporales no se gestionan directamente. En su lugar, se accede a ellas a través de los atributos de los elementos. Cuando un atributo está vinculado a una referencia de datos de serie temporal, IDMP recupera los valores de TSDB bajo demanda: para gráficos de tendencia, análisis, consultas de IA y cualquier otra operación que necesite los datos subyacentes. Esta indirección es intencional: mantiene la capa semántica (IDMP) claramente separada de la capa de almacenamiento (TSDB).

### 1.6.4 Datos contextuales

Los **datos contextuales** son los metadatos que dan significado a los valores de series temporales. Una lectura bruta de sensor —"42,7 a las 14:23:07"— no es útil sin contexto. Los datos contextuales responden a las preguntas: ¿Qué se está midiendo? ¿Dónde? ¿Bajo qué condiciones? ¿Con qué estándar?

En IDMP, los datos contextuales se adjuntan a los elementos y sus atributos. Incluyen información descriptiva (qué es este elemento, qué representa este atributo), dimensiones físicas (unidad de ingeniería, precisión de visualización, límites superior e inferior, valor objetivo) y etiquetas de clasificación (categoría, ubicación, unidad organizativa, condición operacional). Los datos contextuales también son lo que habilita las funcionalidades de IA de IDMP: el sistema utiliza este contexto de negocio estructurado para comprender el escenario operacional y generar análisis e información relevantes.

### 1.6.5 Eventos

Un **evento** es una ocurrencia operacional discreta que tiene un tiempo de inicio definido, un tiempo de fin, una duración, un nivel de gravedad y datos asociados capturados en el momento en que ocurrió. Los eventos son el puente entre los datos de series temporales continuas y el conocimiento operacional discreto.

Los eventos en IDMP son generados por análisis en tiempo real. Cuando un análisis detecta una condición —una superación de umbral, una desviación del proceso, el inicio o fin de un lote de producción—, crea un registro de evento que captura no solo la ocurrencia sino también los valores de atributo relevantes y los resultados calculados en ese momento. Los eventos pueden requerir confirmación, pueden desencadenar notificaciones al personal responsable y pueden examinarse, compararse y analizarse posteriormente.

Este concepto, conocido como Event Frames en PI System, es una de las ideas más poderosas en la gestión de datos industriales. Convierte los flujos continuos de sensores en episodios operacionales estructurados y con nombre sobre los que tanto los ingenieros como los sistemas de IA pueden razonar: "¿Cuántos eventos de bombeo en surge del compresor ocurrieron el último trimestre?" "¿Qué lotes se desviaron más del perfil de temperatura objetivo?" "¿Qué ocurrió en los 10 minutos previos a la falla del motor?"

### 1.6.6 Paneles

Un **panel** es un componente de visualización individual —un gráfico, un medidor, una tabla, una visualización de estado— que presenta datos de uno o más atributos de elementos. Los paneles son los bloques de construcción de toda la visualización en IDMP.

IDMP soporta una amplia gama de tipos de paneles: gráficos de tendencia, gráficos de barras, gráficos de pastel, gráficos de medidor, medidores de barra, gráficos de dispersión, visualizaciones de estadísticas, gráficos de línea de tiempo de estado, gráficos de historial de estado, tablas, tablas de lista de activos, tablas de lista de eventos, gráficos de tendencia de eventos, mapas y paneles de texto enriquecido. Cada tipo de panel es adecuado para distintos tipos de datos y distintas preguntas analíticas.

Los paneles pueden crearse manualmente o generarse automáticamente por el motor de IA basándose en los datos y el contexto de un elemento.

### 1.6.7 Dashboards

Un **dashboard** es una colección de paneles organizados en una sola vista. Los dashboards proporcionan una visión general coherente y estructurada de un elemento o un grupo de elementos, combinando gráficos de tendencia, medidores, tablas y otros tipos de paneles en una imagen operacional unificada.

Cada elemento en IDMP puede tener múltiples dashboards, cada uno organizado para un propósito o audiencia diferente: uno para los operadores que monitorean el estado en tiempo real, otro para los ingenieros que realizan análisis de causa raíz, otro para los gerentes que revisan los KPIs diarios. Los dashboards pueden compartirse, exportarse como informes programados e incrustarse en aplicaciones web externas.

Al igual que los paneles, los dashboards pueden crearse manualmente o generarse automáticamente por el motor de IA.

### 1.6.8 Información (Insights)

La **información** son las salidas analíticas generadas por IA que IDMP produce a partir de los datos y el contexto de un elemento. La información va más allá de mostrar datos: los interpreta.

El motor de información de IDMP puede detectar automáticamente el escenario de aplicación de un elemento (una turbina eólica, un tanque de tratamiento de aguas residuales, una flota logística) basándose en la estructura y el contenido de sus datos. A partir de esa comprensión, genera los paneles, los análisis en tiempo real y los informes de resumen más relevantes para ese escenario, sin que el usuario necesite configurar nada. También puede responder preguntas en lenguaje natural sobre los datos, detectar anomalías, generar pronósticos, imputar valores faltantes y realizar análisis de causa raíz.

La información es la capa donde la base de datos industriales se conecta con la inteligencia que justifica su construcción.

### 1.6.9 Plantillas

Una **plantilla** define una estructura estándar reutilizable para una clase de activo o patrón operacional. En lugar de configurar cada elemento, atributo, análisis, panel o dashboard desde cero, se define la estructura una vez en una plantilla y se aplica de manera consistente a todos los activos del mismo tipo.

Las plantillas existen en todos los niveles de la plataforma: las plantillas de elementos definen el conjunto estándar de atributos para una clase de activo (p. ej., Bomba, Medidor, Caldera); las plantillas de atributos definen definiciones de medición individuales reutilizables; las plantillas de análisis capturan la lógica de detección estándar; las plantillas de paneles y dashboards estandarizan las visualizaciones; las plantillas de eventos y notificaciones estandarizan cómo se nombran e informan las ocurrencias operacionales.

Las plantillas son lo que hace manejables los despliegues industriales a gran escala. Cuando se actualiza una plantilla, el cambio se propaga a todos los elementos derivados de ella, garantizando la consistencia en cientos o miles de activos sin retrabajo manual.
