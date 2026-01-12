# Sample Data Usage Documentation

This document describes the **purpose, usage, and configuration** of the Sample Data feature. It helps users quickly understand and correctly use the tool to generate, run, and clean up sample data.

## 1. Overview and Purpose

### 1.1 Tool Positioning

The Sample Data feature is a **JSON-based data generation tool** designed to automatically create data models and generate time-series data in **TDengine** and **IDMP**.

The core concept is:

> **Use a single JSON file to fully describe the data structure and data behavior of a business scenario.**

### 1.2 Main Features

#### 1.2.1 Automatic Modeling

- Create TDengine databases
- Create super tables and sub-tables
- Create IDMP element templates
- Create attribute templates
- Build hierarchical element trees

#### 1.2.2 Automatic Sample Data Generation

- Generate historical data with a fixed number of rows
- Continuously generate real-time simulated data
- Support batch insertion and time-step–based generation

#### 1.2.3 Data Cleanup

- One-click deletion of sample-related items:
  - Elements
  - Element templates
  - Attribute templates
  - TDengine databases

### 1.3 Typical Use Cases

- Product demonstrations
- Proof of Concept (PoC)
- Scenario validation
- Automated testing
- Performance testing
- Training and delivery environment initialization

## 2. Usage Instructions

### 2.1 Command-Line Mode

#### 2.1.1 Environment Requirements

| Component | Requirement               |
| --------- | ------------------------- |
| Java      | JDK 8 or later            |
| TDengine  | Installed and accessible  |
| IDMP      | Installed and accessible  |
| JSON File | Sample data configuration |

#### 2.1.2 Tool Location

Inside the TDasset Docker container:

```bash
/app/tda-generator-command.jar
```

#### 2.1.3 Basic Commands

##### 2.1.3.1 Generate sample data

```bash
java -jar tda-generator-command.jar -f init.json
```

##### 2.1.3.2 Clean up sample data

```bash
java -jar tda-generator-command.jar -f init.json -c

```

⚠️ **For testing environments only**

#### 2.2 GUI Mode

In the IDMP management console, navigate to the Sample Data module.
Upload or select a JSON configuration file, then click Load or Unload.

## 3. Configuration Guide (JSON)

The JSON file is the single source of truth for sample data generation.

### 3.1 Overall Structure

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

### 3.2 info — Sample Data Information

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

### 3.3 datasource — TDengine Connection

Effective only in command-line mode.

```json
{
  "db": {
    "host": "127.0.0.1",
    "port": 6041,
    "user": "root",
    "password": "taosdata"
  }
}
```

- url: IDMP access URL
- user: IDMP username
- password: IDMP login password

### 3.4 databases — Database Definition

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

### 3.5 databases - Database Definition

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

### 3.6 templates - Element Template Configuration (Model Data)

#### 3.6.1 Super Table Template (Leaf Nodes)

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
    - name: Metric name.
    - title: Metric title.
    - description: Metric description.
    - type: Metric data type, supports Float, Double, Int, BigInt, Varchar, and other TDengine supported data types.
    - tdType: Data type, metric indicates metric, tag indicates tag.
    - uomClass: Unit category.
    - uom: Unit name.
    - displayDigits: Number of decimal places displayed.
    - fun: Data generation function, supports basic math functions and random() function, x represents the time variable.
  - tags: List of tag attributes (similar to metrics)

#### 3.6.2 Path Template (Non-Leaf Nodes)

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

- name: #LEVEL controlled by level; #ID references info.id
- level: Number of path template levels
- namingPattern: Naming rule

#### 3.7 tree_root - Element Tree Root Node

```json
{
  "tag_name": "location",
  "value": "Public Utility",
  "visible": "true"
}
```

- visible: Whether root node is visible

#### 3.8 trees - Element Tree and Child Table Generation (Core)

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
- values: Assign values to naming keywords; supports ranges like em[1,5] → em1 to em5
- children: Child node list

4. Usage Recommendations

- One JSON file per sample scenario
- Use consistent prefixes for template names
- Control child table count for continuous data generation
- Always confirm environment before cleanup operations
