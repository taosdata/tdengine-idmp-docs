---
title: Sample Data
sidebar_label: Sample Data
---

# 14.7 Sample Data

The Sample Data feature loads a prebuilt business scenario into TDengine IDMP with a single click. No real data source is required to experience the full product workflow. During loading, the tool automatically creates the data model from a JSON configuration file and writes simulated time-series data into the TDengine time-series database. The system includes several typical industry scenario packages out of the box, and users can also build custom packages to match specific business requirements.

This feature is especially useful for system integrators and pre-sales engineers. After understanding a customer's operational environment, they can quickly assemble a demo that closely matches the customer's real scenario, helping the customer verify the relevant IDMP capabilities and value earlier in the evaluation cycle.

Sample Data is accessed from **Admin Console → Sample Data**.

## 14.7.1 Usage Instructions

### 14.7.1.1 Command-Line Mode

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

:::warning
For testing environments only.
:::

### 14.7.1.2 GUI Mode

In the IDMP management interface, open the **Sample Data** module, select or upload a JSON configuration file, then click **Save** or **Cancel** to complete the operation.

## 14.7.2 Configuration Guide (JSON)

### 14.7.2.1 Overall Structure

```json
{
  "info": {},
  "TDasset": {},
  "datasource": {},
  "databases": [],
  "templates": [],
  "trees": {}
}
```

### 14.7.2.2 info - Sample Data Scenario Information

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

### 14.7.2.3 TDasset — IDMP Connection

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

### 14.7.2.4 datasource — TDengine Connection

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

### 14.7.2.5 databases — Database Definition

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

### 14.7.2.6 templates - Element Template Configuration

Template configuration includes two parts: 1. general information such as the name, naming rule, and location; 2. the property list defined in `super_tables`, including generated data settings, CSV data source settings, and the definitions of `metric` and `tag`. Metrics can also define data generation functions.

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
  ]
}
```

- name: Template name (must be unique)
- leaf: Whether this is a leaf node template (true for leaf, false for path)
- namingPattern: Naming rule
- keywordsDesc: Keyword description for naming
- location: Location attribute range (altitude, latitude, longitude)
- super_tables: Super table configuration list
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

### 14.7.2.7 csv - CSV Data Source Configuration

When data for a super table should be loaded from an existing CSV file instead of generated by formulas, add a `csv` block under that `super_tables` entry. CSV mode only changes the data source; `metrics`, `tags`, and `trees` are still defined in the same way.

```json
{
  "name": "vehicles",
  "csv": {
    "file": "csv/vehicles.csv",
    "timestamp_column": "ts",
    "sub_table_column": "sub_table_name"
  },
  "metrics": [
    {
      "name": "speed",
      "title": "Speed",
      "description": "Speed information",
      "type": "SmallInt",
      "tdType": "metric"
    }
  ]
}
```

- file: CSV file path. Absolute and relative paths are supported. If omitted, the default path is `<super_table_name>.csv`.
- timestamp_column: Timestamp column name. The default value is `ts`. Values in this column are written directly as row timestamps.
- sub_table_column: Required. This column provides the target sub-table name, and it must exist in the CSV header.
- The CSV header must contain `timestamp_column`, `sub_table_column`, and one column for each `metrics.name`. Extra columns are allowed, but the current import pipeline does not use them.
- In CSV mode, `start_timestamp`, `time_step`, `non_stop_mode`, `insert_rows`, `batch_insert_num`, and `insert_interval` are no longer required. Imported timestamps and row counts come directly from the CSV content.

### 14.7.2.8 trees - Element Tree and Child Table Generation

```json
{
  "value": "Public Utility",
  "visible": "true",
  "children": [
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
  ]
}
```

- visible: Whether the root node is visible
- template: Template name (must match one defined in templates)
- values: Assigns values to naming keywords; supports ranges like em[1,5] → em1 to em5
- children: Child node list

This section:

- Builds the element tree
- Automatically creates sub-tables
- Automatically binds TAG values

### 14.7.2.9 Full Example

<details>
<summary>Expand to view the complete JSON example</summary>

```json
{
  "info": {
    "id": "smart_meters",
    "name": "Utilities",
    "description": "A smart metering monitoring system that collects real-time data from electricity and water meters to enable precise energy management and anomaly detection.",
    "file": "smart_meters-en.json",
    "image": "smart_meters.png"
  },
  "TDasset": {
    "url": "http://127.0.0.1:6042",
    "user": "",
    "password": ""
  },
  "datasource": {
    "db": {
      "host": "127.0.0.1",
      "port": 6041,
      "user": "root",
      "password": "taosdata",
      "version": "3.3.6.0",
      "useTokenForAuth": false,
      "enableSsl": false
    },
    "max_active": 10,
    "min_idle": 3,
    "max_lifetime": 1800000,
    "idle_timeout": 600000,
    "keep_alive_time": 30000,
    "connection_timeout": 30000,
    "validation_timeout": 5000,
    "validation_query": "SELECT 1"
  },
  "databases": [
    {
      "name": "idmp_sample_utility",
      "drop": "yes",
      "buffer": 10,
      "cachesize": "",
      "cachemodel": "'none'",
      "comp": null,
      "duration": "10d",
      "wal_fsync_period": 3000,
      "maxrows": 4096,
      "minrows": 100,
      "stt_trigger": 2,
      "keep": "3650d,3650d,3650d",
      "pages": 256,
      "pagesize": 4,
      "precision": "ms",
      "replica": 1,
      "wal_level": 1,
      "vgroups": 1,
      "single_stable": 0,
      "table_prefix": 0,
      "table_suffix": 0,
      "tsdb_pagesize": 4,
      "wal_retention_period": 3600,
      "wal_retention_size": 0,
      "keep_time_offset": 0,
      "compact_interval": "0d",
      "compact_time_range": "0d,0d",
      "compact_time_offset": "0h",
      "dnodes": ""
    }
  ],
  "templates": [
    {
      "name": "Electricity meter",
      "description": "This is electricity meter information",
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
      "leaf": true,
      "super_tables": [
        {
          "name": "electricity_meters",
          "start_timestamp": null,
          "time_step": 600000,
          "non_stop_mode": false,
          "slice_size": 10,
          "insert_rows": 1440,
          "batch_insert_num": 500,
          "insert_interval": 0,
          "metrics": [
            {
              "name": "current",
              "title": "Current",
              "description": "current info",
              "type": "Float",
              "tdType": "metric",
              "uomClass": "Electric Current",
              "uom": "A",
              "displayDigits": 2,
              "fun": "4*sin(x)+random(2)+4"
            },
            {
              "name": "voltage",
              "title": "Voltage",
              "description": "voltage info",
              "type": "Int",
              "tdType": "metric",
              "uomClass": "Electric Potential",
              "uom": "V",
              "fun": "10*sin(x)+10*random(4)+200"
            },
            {
              "name": "power",
              "title": "Power",
              "description": "power info",
              "type": "Float",
              "tdType": "metric",
              "uomClass": "Power",
              "uom": "W",
              "defaultValue": 100
            },
            {
              "name": "phase",
              "title": "Phase",
              "description": "phase info",
              "type": "Float",
              "tdType": "metric",
              "displayDigits": 2,
              "traits": [
                {
                  "traitType": "Limits",
                  "traitLimitsType": "Minimum",
                  "defaultValue": "0"
                },
                {
                  "traitType": "Limits",
                  "traitLimitsType": "Maximum",
                  "defaultValue": "1"
                }
              ]
            }
          ],
          "tags": [
            {
              "name": "location",
              "title": "Location",
              "description": "location info",
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
            },
            {
              "name": "unit",
              "title": "Unit",
              "description": "Unit information",
              "type": "tinyint",
              "tdType": "tag"
            },
            {
              "name": "floor",
              "title": "Floor",
              "description": "Floor information",
              "type": "tinyint",
              "tdType": "tag"
            },
            {
              "name": "device_id",
              "title": "Device ID",
              "description": "Device ID information",
              "type": "Nchar",
              "length": 20,
              "tdType": "tag"
            }
          ]
        }
      ]
    },
    {
      "name": "Water meter",
      "description": "This is water meter information",
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
      "leaf": true,
      "super_tables": [
        {
          "name": "water_meters_01",
          "start_timestamp": "2025-06-10 20:00:00.000",
          "time_step": 600000,
          "non_stop_mode": false,
          "slice_size": 10,
          "insert_rows": 1440,
          "batch_insert_num": 500,
          "insert_interval": 0,
          "metrics": [
            {
              "name": "rate",
              "title": "Flow rate",
              "description": "rate info",
              "type": "Float",
              "tdType": "metric",
              "uomClass": "Volume Flow Rate",
              "uom": "l/s",
              "displayDigits": 2,
              "fun": "4*sin(x)+random(2)+4"
            },
            {
              "name": "pressure",
              "title": "Water pressure",
              "description": "pressure info",
              "type": "Int",
              "tdType": "metric",
              "uomClass": "Pressure",
              "uom": "kPa",
              "traits": [
                {
                  "traitType": "Limits",
                  "traitLimitsType": "Minimum",
                  "defaultValue": "0"
                },
                {
                  "traitType": "Limits",
                  "traitLimitsType": "Maximum",
                  "defaultValue": "400"
                }
              ]
            }
          ],
          "tags": [
            {
              "name": "location",
              "title": "Location",
              "description": "location info",
              "namingPattern": "${KEYWORD1}",
              "column": "$(databases[0]).$(super_tables[1]).location",
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
              "type": "Varchar",
              "length": 50,
              "tdType": "tag",
              "tree": true
            }
          ]
        }
      ]
    },
    {
      "name": "location-1-smart_meters",
      "description": "Tree path template information",
      "namingPattern": "${KEYWORD1}",
      "keywordsDesc": {
        "KEYWORD1": "name"
      }
    },
    {
      "name": "location-2-smart_meters",
      "description": "Tree path template information",
      "namingPattern": "${KEYWORD1}",
      "keywordsDesc": {
        "KEYWORD1": "name"
      }
    },
    {
      "name": "location-3-smart_meters",
      "description": "Tree path template information",
      "namingPattern": "${KEYWORD1}",
      "keywordsDesc": {
        "KEYWORD1": "name"
      }
    },
    {
      "name": "location-4-smart_meters",
      "description": "Tree path template information",
      "namingPattern": "${KEYWORD1}",
      "keywordsDesc": {
        "KEYWORD1": "name"
      }
    }
  ],
  "trees": {
    "value": "Utilities",
    "visible": true,
    "children": [
      {
        "template": "location-1-smart_meters",
        "values": "California",
        "children": [
          {
            "template": "location-2-smart_meters",
            "values": "Los Angeles County",
            "children": [
              {
                "template": "location-3-smart_meters",
                "values": "Los Angeles",
                "children": [
                  {
                    "template": "Electricity meter",
                    "child_table_names": "em-[1,5]",
                    "values": "em-[1,5]",
                    "unit": [
                      1,
                      1,
                      1,
                      2,
                      2
                    ],
                    "floor": [
                      2,
                      2,
                      2,
                      2,
                      2
                    ],
                    "device_id": "em20250220001000[1,5]"
                  }
                ]
              },
              {
                "template": "location-3-smart_meters",
                "values": "Long Beach",
                "children": [
                  {
                    "template": "Electricity meter",
                    "child_table_names": "em-16",
                    "values": "em-16",
                    "unit": [
                      2
                    ],
                    "floor": [
                      2
                    ],
                    "device_id": "em202502200010016"
                  }
                ]
              },
              {
                "template": "location-3-smart_meters",
                "values": "Santa Clarita",
                "children": [
                  {
                    "template": "Electricity meter",
                    "child_table_names": "em-17",
                    "values": "em-17",
                    "unit": [
                      2
                    ],
                    "floor": [
                      2
                    ],
                    "device_id": "em202502200010017"
                  }
                ]
              }
            ]
          },
          {
            "template": "location-2-smart_meters",
            "values": "San Diego County",
            "children": [
              {
                "template": "location-3-smart_meters",
                "values": "San Diego",
                "children": [
                  {
                    "template": "Electricity meter",
                    "child_table_names": "em-[11,15]",
                    "values": "em-[11,15]",
                    "unit": [
                      11,
                      11,
                      11,
                      11,
                      1
                    ],
                    "floor": [
                      11,
                      12,
                      13,
                      14,
                      15
                    ],
                    "device_id": [
                      "em202502200010011",
                      "em202502200010012",
                      "em202502200010013",
                      "em202502200010014",
                      "em202502200010015"
                    ]
                  }
                ]
              },
              {
                "template": "location-3-smart_meters",
                "values": "Chula Vista",
                "children": [
                  {
                    "template": "Electricity meter",
                    "child_table_names": "em-10",
                    "values": "em-10",
                    "unit": [
                      1
                    ],
                    "floor": [
                      2
                    ],
                    "device_id": "em202502200010010"
                  },
                  {
                    "template": "Water meter",
                    "child_table_names": "wm-1",
                    "values": "wm-1",
                    "device_id": "wm20250220001001"
                  }
                ]
              },
              {
                "template": "location-3-smart_meters",
                "values": "Oceanside",
                "children": [
                  {
                    "template": "Electricity meter",
                    "child_table_names": "em-[6,9]",
                    "values": "em-[6,9]",
                    "unit": [
                      1,
                      1,
                      1,
                      1
                    ],
                    "floor": [
                      2,
                      2,
                      2,
                      2
                    ],
                    "device_id": "em20250220001000[6,9]"
                  }
                ]
              }
            ]
          },
          {
            "template": "location-2-smart_meters",
            "values": "Orange County",
            "children": [
              {
                "template": "Electricity meter",
                "child_table_names": "em-18",
                "values": "em-18",
                "unit": [
                  1
                ],
                "floor": [
                  2
                ],
                "device_id": "em202502200010018"
              }
            ]
          },
          {
            "template": "location-2-smart_meters",
            "values": "Riverside County",
            "children": [
              {
                "template": "Electricity meter",
                "child_table_names": "em-19",
                "values": "em-19",
                "unit": [
                  1
                ],
                "floor": [
                  2
                ],
                "device_id": "em202502200010019"
              }
            ]
          }
        ]
      },
      {
        "template": "location-1-smart_meters",
        "values": "New York",
        "children": [
          {
            "template": "location-2-smart_meters",
            "values": "Kings County",
            "children": [
              {
                "template": "Electricity meter",
                "child_table_names": "em-20",
                "values": "em-20",
                "unit": [
                  1
                ],
                "floor": [
                  2
                ],
                "device_id": "em202502200010020"
              }
            ]
          },
          {
            "template": "location-2-smart_meters",
            "values": "Queens County",
            "children": [
              {
                "template": "Electricity meter",
                "child_table_names": "em-21",
                "values": "em-21",
                "unit": [
                  1
                ],
                "floor": [
                  2
                ],
                "device_id": "em202502200010021"
              }
            ]
          },
          {
            "template": "location-2-smart_meters",
            "values": "New York County",
            "children": [
              {
                "template": "Electricity meter",
                "child_table_names": "em-22",
                "values": "em-22",
                "unit": [
                  1
                ],
                "floor": [
                  2
                ],
                "device_id": "em202502200010022"
              }
            ]
          }
        ]
      },
      {
        "template": "location-1-smart_meters",
        "values": "Georgia",
        "children": [
          {
            "template": "location-2-smart_meters",
            "values": "Fulton County",
            "children": [
              {
                "template": "Electricity meter",
                "child_table_names": "em-23",
                "values": "em-23",
                "unit": [
                  1
                ],
                "floor": [
                  2
                ],
                "device_id": "em202502200010023"
              }
            ]
          },
          {
            "template": "location-2-smart_meters",
            "values": "DeKalb County[1,2]",
            "children": [
              {
                "template": "location-3-smart_meters",
                "values": "Kensington",
                "children": [
                  {
                    "template": "Electricity meter",
                    "child_table_names": "em-[24,25]",
                    "values": "em-[24,25]",
                    "unit": [
                      1,
                      1
                    ],
                    "floor": [
                      2,
                      2
                    ],
                    "device_id": [
                      "em202502200010024",
                      "em202502200010025"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

```

</details>

## 14.7.3 Usage Recommendations

- One JSON file per sample scenario
- Use consistent prefixes for template names
- Control child table count when using continuous data generation
- Always confirm the environment before running cleanup operations
