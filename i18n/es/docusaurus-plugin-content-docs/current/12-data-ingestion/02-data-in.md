---
title: Tareas de ingesta de datos
sidebar_label: Tareas de ingesta de datos
---

# 12.2 Tareas de ingesta de datos

**Data In** gestiona la ingesta de datos de series temporales de fuentes externas hacia TDengine TSDB. Se accede desde **Admin Console → Data In**.

La página Data In lista todas las conexiones de TDengine. Haga clic en una conexión para gestionar sus tareas de ingesta, agentes y configuraciones de agentes de recopilación de datos.

## 12.2.1 Tareas de ingesta de datos

La pestaña **Data In Task** lista todas las tareas de ingesta configuradas para una conexión, con columnas: **ID**, **Name**, **Type**, **Target**, **Create At**, **Agent**, **Metrics** y **Status**.

La barra de herramientas proporciona controles para iniciar, detener, eliminar, importar y exportar tareas, así como un botón de actualización y opciones de configuración.

### Creación de una tarea

Haga clic en **+** para crear una nueva tarea. Configure las siguientes secciones:

### Información general

| Campo | Descripción |
|---|---|
| **Name** (obligatorio) | Un nombre descriptivo para la tarea |
| **Type** | El protocolo de fuente de datos (consulte los tipos de tarea a continuación) |
| **Target** (obligatorio) | La base de datos TDengine de destino. Haga clic en **+ Create Database** para crear una nueva. |

### Configuración de la conexión

Los campos de configuración varían según el tipo de tarea. A continuación se muestran dos ejemplos comunes.

### Ejemplo: OPC-UA

OPC-UA (OPC Unified Architecture) es un protocolo industrial ampliamente utilizado para conectar PLC, sensores y sistemas SCADA.

#### Configuración de la conexión

| Campo | Descripción |
|---|---|
| **Server Endpoint** (obligatorio) | Dirección del servidor OPC-UA, p. ej., `127.0.0.1:6666/OPCUA/ServerPath` |
| **Failover Server Endpoints** | Endpoints de servidor de respaldo para alta disponibilidad |
| **Security Mode** | Modo de seguridad OPC-UA (None, Sign, SignAndEncrypt) |
| **Security Policy** | Política de cifrado a utilizar |
| **Secure Channel Certificate** | Archivo de certificado para el canal seguro |
| **Certificate's Private Key** | Archivo de clave privada para el certificado |
| **Connect Timeout** | Tiempo de espera de conexión en segundos (predeterminado: 10) |
| **Request Timeout** | Tiempo de espera de solicitud en segundos (predeterminado: 10) |

#### Autenticación

Elija **Anonymous**, **Username** (nombre de usuario y contraseña) o **Certificates** (archivos de certificado de cliente).

Haga clic en **Check Connection** para verificar antes de continuar.

#### Conjuntos de datos

| Campo | Descripción |
|---|---|
| **Root node ID** | Nodo de inicio para el descubrimiento de puntos de datos, p. ej., `ns=1;i=1001` |
| **Namespaces** | Espacios de nombres OPC-UA a incluir (se completan después de la verificación de la conexión) |
| **Node Class** | Tipo de nodos OPC-UA a recopilar (predeterminado: todos) |
| **Point ID Regex Pattern** | Filtrar puntos de datos por patrón de ID de nodo |
| **Point Name Regex Pattern** | Filtrar puntos de datos por patrón de nombre |
| **Super Table Name** (obligatorio) | Plantilla de nombre de supertabla de destino (predeterminado: `opc_{type}`) |
| **Value Column Name** | Nombre de columna para el valor (predeterminado: `val`) |
| **Timestamp** | Fuente de la marca de tiempo (predeterminado: `original_ts`) |

#### Recopilación

| Campo | Descripción |
|---|---|
| **Collect Mode** | `subscribe` (push) o `poll` (pull) |
| **Point Update Mode** | Cómo se gestionan las actualizaciones de metadatos de puntos |
| **Point Update Interval** | Intervalo en segundos para comprobar cambios en los puntos (predeterminado: 600) |

### Ejemplo: SparkplugB (MQTT)

SparkplugB es un protocolo basado en MQTT ampliamente utilizado en implementaciones IIoT.

#### Configuración de la conexión

| Campo | Descripción |
|---|---|
| **Brokers** (obligatorio) | Dirección(es) del broker MQTT, p. ej., `mqtt://host:1883` |
| **MQTT Protocol Version** | Versión de MQTT a utilizar |
| **Client ID** | Identificador de cliente MQTT |
| **Keep Alive** | Intervalo de keep-alive en segundos |
| **Username** | Nombre de usuario MQTT |
| **Password** | Contraseña MQTT |
| **TLS Verification** | Habilitar TLS para la conexión MQTT |
| **Group ID** | ID de grupo Sparkplug al que suscribirse |
| **Node Device List** | Lista de IDs de nodos/dispositivos Sparkplug a recopilar |
| **Message Type** | Tipos de mensajes Sparkplug a procesar |

Todos los tipos de tarea disponen de una sección de **Advanced Options** para un ajuste más fino.

Haga clic en **Submit** para crear la tarea.

:::note
La función Data In está impulsada por el motor de ingesta de datos de TDengine TSDB. Para obtener documentación completa sobre todos los tipos de tarea y sus campos de configuración, consulte la [documentación de TDengine TSDB](https://docs.tdengine.com).
:::

### Tipos de tarea compatibles

IDMP admite la ingesta de datos de los siguientes tipos de fuentes:

| Tipo | Descripción |
|---|---|
| **TDengine Data Subscription** | Suscribirse a temas TMQ de TDengine para ingesta de datos en tiempo real |
| **TDengine Query** | Extraer datos de TDengine mediante consultas SQL según un calendario |
| **PI** | OSIsoft PI System |
| **PI Backfill** | Relleno histórico desde OSIsoft PI |
| **OPC-UA** | OPC Unified Architecture |
| **OPC-DA** | OPC Data Access |
| **InfluxDB** | Base de datos de series temporales InfluxDB |
| **OpenTSDB** | Base de datos de series temporales OpenTSDB |
| **PostgreSQL** | Base de datos relacional PostgreSQL |
| **Oracle** | Base de datos Oracle |
| **Microsoft SQL Server** | Microsoft SQL Server |
| **MongoDB** | Base de datos de documentos MongoDB |
| **SparkplugB** | Protocolo MQTT Sparkplug B |
| **KingHistorian** | Historiador industrial KingHistorian |
| **Pulsar** | Mensajería Apache Pulsar |
| **Pulsar-Tuya** | Pulsar con integración de la plataforma IoT Tuya |

## 12.2.2 Agentes

La pestaña **Agent** lista los procesos de agente de IDMP registrados para esta conexión, con columnas: **ID**, **Name**, **Created At** y **Status**. Los agentes gestionan la ejecución de tareas para protocolos que requieren un proceso intermediario.

## 12.2.3 Agentes de recopilación de datos

La pestaña **Data Collection Agents** proporciona guías de configuración para agentes de terceros que pueden escribir datos directamente en TDengine utilizando protocolos estándar:

| Agente | Descripción |
|---|---|
| **Prometheus** | Configurar la escritura remota de Prometheus para enviar métricas a TDengine |
| **Telegraf** | Configurar el plugin de salida de Telegraf para escribir métricas en TDengine |
| **InfluxDB Line Protocol** | Escribir datos usando el formato de protocolo de línea de InfluxDB |
| **OpenTSDB JSON Protocol** | Escribir datos usando la API HTTP JSON de OpenTSDB |
| **OpenTSDB Telnet Protocol** | Escribir datos usando la interfaz telnet de OpenTSDB |

Haga clic en cualquier tarjeta para ver la guía de configuración de ese agente.
