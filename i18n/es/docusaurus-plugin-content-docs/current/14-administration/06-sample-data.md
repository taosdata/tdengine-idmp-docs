---
title: Datos de muestra
sidebar_label: Datos de muestra
---

# 14.6 Datos de muestra

La función de datos de muestra permite a los usuarios cargar un escenario de negocio preconfigurado en TDengine IDMP con un solo clic, sin necesidad de una fuente de datos real. Durante la carga, la herramienta crea automáticamente el modelo de datos a partir de un archivo de configuración JSON e inserta datos de series temporales simulados directamente en la base de datos de series temporales de TDengine. El sistema incluye varios paquetes de escenarios industriales de forma predeterminada, y los usuarios pueden crear sus propios paquetes personalizados para adaptarse a cualquier situación de negocio.

Esta función es especialmente valiosa para integradores de sistemas e ingenieros de preventa. Después de conocer el entorno operativo de un cliente, pueden ensamblar rápidamente una demostración funcional que refleje el escenario real del cliente, permitiéndole ver y validar exactamente las capacidades que le interesan, sin esperar una integración completa.

Los datos de muestra se acceden desde **Consola de administración → Datos de muestra**.

## Instrucciones de uso

### Modo de línea de comandos

#### Requisitos del entorno

| Componente | Requisito |
| --------- | ------------------------- |
| Java | JDK 8 o posterior |
| TDengine | Instalado y accesible |
| IDMP | Instalado y accesible |
| Archivo JSON | Configuración de datos de muestra |

#### Ubicación de la herramienta

Dentro del contenedor Docker de TDasset:

```bash
/app/tda-generator-command.jar
```

#### Comandos básicos

##### Generar datos de muestra

```bash
java -jar tda-generator-command.jar -f init.json
```

##### Limpiar datos de muestra

```bash
java -jar tda-generator-command.jar -f init.json -c
```

⚠️ **Solo para entornos de prueba**

### Modo de interfaz gráfica

En la consola de administración de IDMP, navegue al módulo **Datos de muestra**. Cargue o seleccione un archivo de configuración JSON, luego haga clic en **Load** o **Unload**.

## Guía de configuración (JSON)

El archivo JSON es la fuente única de verdad para la generación de datos de muestra.

### Estructura general

```json
{
  "info": {},
  "TDasset": {},
  "datasource": {},
  "databases": [],
  "templates": [],
  "tree_root": {},
  "trees": []
}
```

### info — Información de datos de muestra

Se utiliza solo para la visualización en la interfaz de usuario de IDMP.

```json
{
  "id": "smart_meters",
  "name": "Smart Meters",
  "description": "Smart meter sample scenario",
  "file": "init.json",
  "image": "smart_meters.jpg"
}
```

- name: Nombre del escenario (debe ser único en la lista de datos de muestra)
- description: Descripción del escenario
- file: Debe coincidir con el nombre del archivo

### TDasset — Conexión IDMP

Solo efectivo en modo de línea de comandos.

```json
{
  "url": "http://localhost:8010/api/v1",
  "user": "admin",
  "password": "123456"
}
```

- url: URL de acceso a IDMP
- user: Nombre de usuario de IDMP
- password: Contraseña de inicio de sesión de IDMP

### datasource — Conexión TDengine

```json
{
  "db": {
    "host": "127.0.0.1",
    "port": 6041,
    "user": "root",
    "password": "taosdata"
  },
  "max_active": 20,
  "min_idle": 3,
  "max_lifetime": 1800000,
  "idle_timeout": 600000,
  "keep_alive_time": 30000,
  "connection_timeout": 30000,
  "validation_timeout": 5000,
  "validation_query": "SELECT 1"
}
```

- db: Detalles de conexión a TDengine
- max_active: Máximo de conexiones activas en el pool
- min_idle: Mínimo de conexiones inactivas en el pool
- Otros parámetros: consulte la documentación de configuración del pool de conexiones JDBC de TDengine

### databases — Definición de base de datos

```json
{
  "name": "idmp_sample_utility",
  "drop": "yes",
  "vgroups": 1,
  "precision": "ms",
  "replica": 1,
  "duration": "10d",
  "keep": 3650
}
```

- name: Nombre de la base de datos
- drop: Si se debe eliminar la base de datos existente (recomendado solo para pruebas)
- vgroups: Número inicial de vgroups
- precision: Precisión de la marca de tiempo (predeterminado: ms)
- replica: Factor de replicación (predeterminado: 1)
- duration: Duración de almacenamiento del archivo de datos (predeterminado: 10d)
- keep: Días de retención de datos (predeterminado: 3650)
- Otros parámetros: consulte la documentación de creación de bases de datos de TDengine

### templates — Configuración de plantilla de elementos

#### Plantilla de supertabla (nodos hoja)

```json
{
  "name": "Smart Meter",
  "leaf": true,
  "namingPattern": "${KEYWORD1}",
  "keywordsDesc": {
    "KEYWORD1": "child table name"
  },
  "location": {
    "altitude": {
      "min": -10985,
      "max": 10000
    },
    "latitude": {
      "min": -90,
      "max": 90
    },
    "longitude": {
      "min": -180,
      "max": 180
    }
  },
  "super_tables": [
    {
      "db": "idmp_sample_utility",
      "name": "electricity_meters",
      "start_timestamp": null,
      "time_step": 600000,
      "non_stop_mode": false,
      "insert_rows": 1440,
      "batch_insert_num": 500,
      "insert_interval": 0,
      "metrics": [
        {
          "name": "current",
          "title": "Current",
          "description": "Current information",
          "type": "Float",
          "tdType": "metric",
          "uomClass": "Current",
          "uom": "A",
          "displayDigits": 2,
          "fun": "4*sin(x)+random(2)+4"
        }
      ]
    }
  ],
  "tags": [
    {
      "name": "location",
      "title": "Address",
      "description": "Address information",
      "namingPattern": "${KEYWORD1}",
      "type": "Varchar",
      "length": 50,
      "location": {
        "altitude": {
          "min": -10985,
          "max": 10000
        },
        "latitude": {
          "min": -90,
          "max": 90
        },
        "longitude": {
          "min": -180,
          "max": 180
        }
      },
      "tdType": "tag",
      "tree": true
    }
  ]
}
```

- name: Nombre de la plantilla (debe ser único)
- leaf: Si es una plantilla de nodo hoja (true para hoja, false para ruta)
- namingPattern: Regla de nomenclatura
- keywordsDesc: Descripción de palabras clave para nomenclatura
- location: Rango de atributos de ubicación (altitud, latitud, longitud)
- super_tables: Lista de configuración de supertablas
  - db: Nombre de la base de datos
  - name: Nombre de la supertabla
  - start_timestamp: Marca de tiempo de inicio de los datos (null = hace 4 días)
  - time_step: Paso de tiempo en milisegundos
  - non_stop_mode: false = filas fijas; true = simulación continua en tiempo real
  - insert_rows: Total de filas a insertar
  - batch_insert_num: Filas por lote
  - insert_interval: Intervalo entre lotes (ms; 0 = sin demora)
  - metrics: Lista de atributos de métricas
    - name: Nombre de la métrica
    - title: Título de la métrica
    - description: Descripción de la métrica
    - type: Tipo de dato (Float, Double, Int, BigInt, Varchar y otros tipos soportados por TDengine)
    - tdType: Función del campo — metric para mediciones, tag para etiquetas
    - uomClass: Categoría de unidad
    - uom: Nombre de la unidad
    - displayDigits: Decimales mostrados
    - fun: Función de generación de datos; soporta funciones matemáticas básicas y random(); x representa la variable de tiempo
  - tags: Lista de atributos de etiquetas (misma estructura que las métricas)

#### Plantilla de ruta (nodos no hoja)

```json
{
  "name": "location-#LEVEL-#ID",
  "level": 3,
  "description": "Path template information for tree",
  "namingPattern": "${KEYWORD1}",
  "keywordsDesc": {
    "KEYWORD1": "name"
  }
}
```

- name: #LEVEL está controlado por level; #ID hace referencia a info.id
- level: Número de niveles de la plantilla de ruta
- namingPattern: Regla de nomenclatura

### tree_root — Nodo raíz del árbol de elementos

```json
{
  "tag_name": "location",
  "value": "Public Utility",
  "visible": "true"
}
```

- visible: Si el nodo raíz es visible

### trees — Árbol de elementos y generación de tablas hijo

```json
{
  "template": "location-1-smart_meters",
  "values": "Beijing",
  "children": [
    {
      "template": "location-2-smart_meters",
      "values": "Haidian",
      "children": [
        {
          "template": "Smart Meter",
          "values": "em[1,5]"
        }
      ]
    }
  ]
}
```

- template: Nombre de la plantilla (debe coincidir con una definida en templates)
- values: Asigna valores a palabras clave de nomenclatura; soporta rangos como em[1,5] → em1 a em5
- children: Lista de nodos hijo

Esta sección:

- Construye el árbol de elementos
- Crea automáticamente subtablas
- Vincula automáticamente valores de TAG

## Recomendaciones de uso

- Un archivo JSON por escenario de muestra
- Use prefijos consistentes para los nombres de plantillas
- Controle el recuento de tablas hijo cuando use generación continua de datos
- Confirme siempre el entorno antes de ejecutar operaciones de limpieza
