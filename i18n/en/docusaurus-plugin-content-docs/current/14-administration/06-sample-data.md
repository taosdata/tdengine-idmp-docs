---
title: Sample Data
sidebar_label: Sample Data
---

# 14.6 Sample Data

The Sample Data feature lets users load a pre-built business scenario into TDengine IDMP with a single click — no real data source required. During loading, the tool automatically creates the data model from a JSON configuration file and inserts simulated time-series data directly into the TDengine time-series database. The system ships with several industry scenario packages out of the box, and users can build their own custom packages to match any business situation.

This feature is especially valuable for system integrators and pre-sales engineers. After learning about a customer's operational environment, they can rapidly assemble a working demo that mirrors the customer's actual scenario, letting the customer see and validate exactly the capabilities they care about — without waiting for a full integration.

Sample Data is accessed from **Admin Console → Sample Data**.

## Usage Instructions

### Command-Line Mode

#### Environment Requirements

| Component | Requirement               |
| --------- | ------------------------- |
| Java      | JDK 8 or later            |
| TDengine  | Installed and accessible  |
| IDMP      | Installed and accessible  |
| JSON File | Sample data configuration |

#### Tool Location

Inside the TDasset Docker container:

```bash
/app/tda-generator-command.jar
```

#### Basic Commands

##### Generate sample data

```bash
java -jar tda-generator-command.jar -f init.json
```

##### Clean up sample data

```bash
java -jar tda-generator-command.jar -f init.json -c
```

⚠️ **For testing environments only**

### GUI Mode

In the IDMP management console, navigate to the **Sample Data** module. Upload or select a JSON configuration file, then click **Load** or **Unload**.

## Configuration Guide (JSON)

The JSON file is the single source of truth for sample data generation.

### Overall Structure

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

### info — Sample Data Information

Used only for display in the IDMP UI.

```json
{
  "id": "smart_meters",
  "name": "Smart Meters",
  "description": "Smart meter sample scenario",
  "file": "init.json",
  "image": "smart_meters.jpg"
}
```

- name: Scenario name (must be unique in the sample data list)
- description: Scenario description
- file: Must match the filename

### TDasset — IDMP Connection

Effective only in command-line mode.

```json
{
  "url": "http://localhost:8010/api/v1",
  "user": "admin",
  "password": "123456"
}
```

- url: IDMP access URL
- user: IDMP username
- password: IDMP login password

### datasource — TDengine Connection

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

- db: TDengine connection details
- max_active: Maximum active connections in pool
- min_idle: Minimum idle connections in pool
- Other parameters refer to TDengine JDBC connection pool documentation

### databases — Database Definition

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

- name: Database name
- drop: Whether to drop existing database (recommended for testing only)
- vgroups: Initial number of vgroups
- precision: Timestamp precision (default: ms)
- replica: Replication factor (default: 1)
- duration: Data file storage duration (default: 10d)
- keep: Data retention days (default: 3650)
- Other parameters refer to TDengine database creation documentation

### templates — Element Template Configuration

#### Super Table Template (Leaf Nodes)

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

- name: Template name (must be unique)
- leaf: Whether this is a leaf node template (true for leaf, false for path)
- namingPattern: Naming rule
- keywordsDesc: Keyword description for naming
- location: Location attribute range (altitude, latitude, longitude)
- super_tables: Super table configuration list
  - db: Database name
  - name: Super table name
  - start_timestamp: Data start timestamp (null = 4 days ago)
  - time_step: Time step in milliseconds
  - non_stop_mode: false = fixed rows; true = continuous real-time simulation
  - insert_rows: Total rows to insert
  - batch_insert_num: Rows per batch
  - insert_interval: Interval between batches (ms; 0 = no delay)
  - metrics: List of metric attributes
    - name: Metric name
    - title: Metric title
    - description: Metric description
    - type: Data type (Float, Double, Int, BigInt, Varchar, and other TDengine supported types)
    - tdType: Field role — metric for measurements, tag for tags
    - uomClass: Unit category
    - uom: Unit name
    - displayDigits: Decimal places displayed
    - fun: Data generation function; supports basic math and random(); x represents the time variable
  - tags: List of tag attributes (same structure as metrics)

#### Path Template (Non-Leaf Nodes)

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

- name: #LEVEL is controlled by level; #ID references info.id
- level: Number of path template levels
- namingPattern: Naming rule

### tree_root — Element Tree Root Node

```json
{
  "tag_name": "location",
  "value": "Public Utility",
  "visible": "true"
}
```

- visible: Whether the root node is visible

### trees — Element Tree and Child Table Generation

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

- template: Template name (must match one defined in templates)
- values: Assigns values to naming keywords; supports ranges like em[1,5] → em1 to em5
- children: Child node list

This section:
- Builds the element tree
- Automatically creates sub-tables
- Automatically binds TAG values

## Usage Recommendations

- One JSON file per sample scenario
- Use consistent prefixes for template names
- Control child table count when using continuous data generation
- Always confirm the environment before running cleanup operations
