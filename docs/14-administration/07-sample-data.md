---
title: 示例数据
sidebar_label: 示例数据
---

# 14.7 示例数据

示例数据功能可将预置的业务场景一键加载到 TDengine IDMP 中。无需连接真实数据源，即可完整体验系统各项能力。加载过程中，工具会根据 JSON 配置文件自动创建设备模型，并将模拟的时序数据写入 TDengine 时序数据库。系统安装包内置了若干典型行业场景的示例数据包，用户也可根据实际业务需求构建自己的 JSON 配置文件。

该功能尤其适用于系统集成商和售前工程师。在充分了解客户业务场景后，可快速搭建贴近客户实际情况的演示环境，帮助客户直观验证 IDMP 的功能与价值，显著缩短从需求确认到功能验证的周期。你需要做的是根据场景，创建 JSON 配置文件，也可以借助 AI 工具，用自然语言自动生成配置文件。

可通过 **管理控制台 → 示例数据** 访问该功能。

## 14.7.1 使用说明
下面的说明中，假设你的 JSON 配置文件名为 init.json

### 14.7.1.1 命令行方式

#### 运行环境要求

| 组件          | 要求             |
| ------------- | ---------------- |
| Java          | JDK 8 及以上     |
| TDengine      | 已部署并可访问   |
| IDMP          | 已部署并可访问   |
| JSON 配置文件 | 示例数据描述文件 |

#### 工具位置说明

在 TDasset Docker 容器中：

```bash
/app/tda-generator-command.jar
```

#### 基本运行命令

##### 根据 JSON 生成示例数据

```bash
java -jar tda-generator-command.jar -f init.json
```

##### 清理示例数据

```bash
java -jar tda-generator-command.jar -f init.json -c
```

:::warning
仅限测试环境使用。
:::

### 14.7.1.2 图形界面方式

在 IDMP 管理界面中，进入**示例数据**模块，选择或上传 JSON 配置文件，点击 **保存** 或 **取消** 按钮完成操作。

## 14.7.2 配置说明（JSON 文件）

### 14.7.2.1 JSON 整体结构

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
整个 JSON 配置文件包含五大块，Info 用于描述模拟的场景，TDasset 用于描述 IDMP 的链接信息，datasource 用于描述时序数据库 TSDB 的链接信息，databases 用于描述数据库的配置，templates 列出元素模版的定义，trees 描述整个模拟场景的元素树状结构。

### 14.7.2.2 info - 示例数据场景信息说明

仅用于在 IDMP 示例场景列表中展示。

```json
{
  "id": "smart_meters",
  "name": "智能电表",
  "description": "智能电表示例场景",
  "file": "init.json",
  "image": "smart_meters.jpg"
}
```

- name: 场景名称，保持在示例数据列表中唯一；
- description: 场景描述；
- file: 保持与文件名称一致；
- image: 展示示例场景列表时，显示的图片

### 14.7.2.3 TDasset - IDMP 连接配置

仅在 **命令行模式** 下生效。

```json
{
  "url": "http://localhost:8010/api/v1",
  "user": "admin",
  "password": "123456"
}
```

- url: IDMP 访问地址；
- user: IDMP 用户名；
- password: IDMP 登录密码；

### 14.7.2.4 datasource - TDengine 连接配置

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

- db: TDengine 连接信息，如果使用页面方式操作，则无需配置此项
- max_active: 连接池最大连接数；
- min_idle: 连接池最小空闲连接数；
- 其他参数请参考 TDengine JDBC 连接池配置说明；

### 14.7.2.5 databases - 数据库定义

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

- name: 数据库名称，如果配置缺省，将自动生成数据库名称
- drop: 是否删除已存在数据库，建议仅测试环境使用；
- vgroups: 数据库中初始 vgroup 的数目；
- precision: 时间精度，默认 ms；
- replica: 副本数量，默认 1；
- duration: 数据文件存储数据的时间跨度，默认 10d；
- keep: 数据存储天数，默认 3650 天；
- 其他参数请参考 TDengine 数据库创建说明；

### 14.7.2.6 templates - 元素模板配置
元素模版的配置包含两部分，1：通用信息( 名字、命名规则、位置等）；2：属性列表，由 super_tables 来描述，先描述如何生成模拟数据，然后描述 metric 与 tag. 对于 metric, 还可以指定生成模拟数据的函数。

```json
{
  "name": "智能电表",
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
          "title": "电流",
          "description": "电流信息",
          "type": "Float",
          "tdType": "metric",
          "uomClass": "电流",
          "uom": "A",
          "displayDigits": 2,
          "fun": "4*sin(x)+random(2)+4"
        }
      ],
      "tags": [
        {
          "name": "location",
          "title": "地址",
          "description": "地址信息",
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

- name: 模板名称，保持唯一；
- leaf: 是否为叶子节点模板，false 表示路径模板；
- namingPattern: 命名规则；
- keywordsDesc: 命名关键字说明；
- location: 元素位置属性范围配置；通过 altitude、latitude、longitude 三个字段配置；
- super_tables: 超级表列表配置；
  - name: 超级表名称；
  - start_timestamp: 数据写入起始时间戳，null 表示从 4 天前开始写入；
  - time_step: 数据时间步进，单位毫秒；
  - non_stop_mode: false 表示按固定行数生成数据；true 表示持续生成数据，用于实时模拟；
  - insert_rows: 需要写入的数据总行数；
  - batch_insert_num: 每批次写入数据行数；
  - insert_interval: 每批次写入间隔时间，单位毫秒，0 表示无间隔；
  - metrics: 元素指标列表配置；
    - name: 指标名称；
    - title: 指标标题；
    - description: 指标描述；
    - type: 指标数据类型，支持 Float、Double、Int、BigInt、Varchar 等 TDengine 支持的数据类型；
    - tdType: 数据类型，metric 表示指标，tag 表示标签；
    - uomClass: 单位类别；
    - uom: 单位名称；
    - displayDigits: 显示小数位数；
    - fun: 数据生成函数，支持基本数学函数与 random() 函数，x 表示时间变量；
  - tags: 元素标签列表配置，同指标类似；

### 14.7.2.7 trees - 元素树

这里描述整个树状结构，每个节点可以指定元素模版template, 子节点用 children 来描述。如果用元素模版，需要使用 values 来指定命名规则中的 KEYWORD1。

```json
{
  "value": "公共事业",
  "visible": "true",
  "children": [
    {
      "template": "location-1-smart_meters",
      "values": "北京",
      "children": [
        {
          "template": "location-2-smart_meters",
          "values": "海淀",
          "children": [
            {
              "template": "智能电表",
              "values": "em[1,5]"
            }
          ]
        }
      ]
    }
  ]
}
```

- visible: 根节点是否可见；
- template: 使用的模板名称；与 templates 中定义的模板名称保持一致；
- values: 为模板中的命名关键字 KEYWORD1 赋值；支持范围生成，如 em[1,5] 表示 em1 至 em5, 系统就会用模版自动生成5个元素。
- children: 子节点列表；

该配置用于创建元素，并构建整个元素的树状结构。

### 14.7.2.8 完整示例

<details>
<summary>展开查看完整 JSON 示例</summary>

```json
{
  "info": {
    "id": "smart_meters",
    "name": "公共事业",
    "description": "智能表计监控系统通过实时采集电表、水表数据，实现能源消耗的精细化管理和异常预警。系统支持区域用量分析、异常检测和用量预测，帮助优化资源配置，降低运营成本，提升公共服务质量。",
    "file": "smart_meters.json",
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
      "name": "智能电表",
      "description": "这是智能电表信息",
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
              "title": "电流",
              "description": "电流信息",
              "type": "Float",
              "tdType": "metric",
              "uomClass": "电流",
              "uom": "A",
              "displayDigits": 2,
              "fun": "4*sin(x)+random(2)+4"
            },
            {
              "name": "voltage",
              "title": "电压",
              "description": "电压信息",
              "type": "Int",
              "tdType": "metric",
              "uomClass": "电压",
              "uom": "V",
              "fun": "10*sin(x)+10*random(4)+200"
            },
            {
              "name": "power",
              "title": "功率",
              "description": "功率信息",
              "type": "Float",
              "tdType": "metric",
              "uomClass": "功率",
              "uom": "W",
              "defaultValue": 100
            },
            {
              "name": "phase",
              "title": "相位",
              "description": "相位信息",
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
              "title": "地址",
              "description": "地址信息",
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
              "title": "单元",
              "description": "单元信息",
              "type": "tinyint",
              "tdType": "tag"
            },
            {
              "name": "floor",
              "title": "楼层",
              "description": "楼层信息",
              "type": "tinyint",
              "tdType": "tag"
            },
            {
              "name": "device_id",
              "title": "设备ID",
              "description": "设备ID信息",
              "type": "Nchar",
              "length": 20,
              "tdType": "tag"
            }
          ]
        }
      ]
    },
    {
      "name": "智能水表",
      "description": "这是智能水表信息",
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
              "title": "流量",
              "description": "流量信息",
              "type": "Float",
              "tdType": "metric",
              "uomClass": "体积流量",
              "uom": "l/s",
              "displayDigits": 2,
              "fun": "4*sin(x)+random(2)+4"
            },
            {
              "name": "pressure",
              "title": "水压",
              "description": "水压信息",
              "type": "Int",
              "tdType": "metric",
              "uomClass": "压力",
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
              "title": "地址",
              "description": "地址信息",
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
      "description": "这是树的路径模板信息",
      "namingPattern": "${KEYWORD1}",
      "keywordsDesc": {
        "KEYWORD1": "name"
      }
    },
    {
      "name": "location-2-smart_meters",
      "description": "这是树的路径模板信息",
      "namingPattern": "${KEYWORD1}",
      "keywordsDesc": {
        "KEYWORD1": "name"
      }
    },
    {
      "name": "location-3-smart_meters",
      "description": "这是树的路径模板信息",
      "namingPattern": "${KEYWORD1}",
      "keywordsDesc": {
        "KEYWORD1": "name"
      }
    },
    {
      "name": "location-4-smart_meters",
      "description": "这是树的路径模板信息",
      "namingPattern": "${KEYWORD1}",
      "keywordsDesc": {
        "KEYWORD1": "name"
      }
    }
  ],
  "trees": {
    "value": "公共事业",
    "visible": true,
    "children": [
      {
        "template": "location-1-smart_meters",
        "values": "北京",
        "children": [
          {
            "template": "location-2-smart_meters",
            "values": "海淀",
            "children": [
              {
                "template": "location-3-smart_meters",
                "values": "西三旗街道",
                "children": [
                  {
                    "template": "智能电表",
                    "child_table_names": "em-[1,2]",
                    "values": "em-[1,2]",
                    "unit": [
                      1,
                      2
                    ],
                    "floor": [
                      2,
                      2
                    ],
                    "device_id": "em20250220001000[1,2]"
                  }
                ]
              },
              {
                "template": "location-3-smart_meters",
                "values": "上地街道",
                "children": [
                  {
                    "template": "智能电表",
                    "child_table_names": "em-3",
                    "values": "em-3",
                    "unit": [
                      1
                    ],
                    "floor": [
                      2
                    ],
                    "device_id": "em202502200010003"
                  }
                ]
              },
              {
                "template": "location-3-smart_meters",
                "values": "五道口街道",
                "children": [
                  {
                    "template": "智能电表",
                    "child_table_names": "em-4",
                    "values": "em-4",
                    "unit": [
                      1
                    ],
                    "floor": [
                      2
                    ],
                    "device_id": "em202502200010004"
                  }
                ]
              }
            ]
          },
          {
            "template": "location-2-smart_meters",
            "values": "朝阳",
            "children": [
              {
                "template": "location-3-smart_meters",
                "values": "望京街道",
                "children": [
                  {
                    "template": "智能电表",
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
                "values": "三元桥街道",
                "children": [
                  {
                    "template": "智能电表",
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
                    "template": "智能水表",
                    "child_table_names": "wm-1",
                    "values": "wm-1",
                    "device_id": "wm20250220001001"
                  }
                ]
              },
              {
                "template": "location-3-smart_meters",
                "values": "国贸街道",
                "children": [
                  {
                    "template": "智能电表",
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
            "values": "东城",
            "children": [
              {
                "template": "智能电表",
                "child_table_names": "em-[16,17]",
                "values": "em-[16,17]",
                "unit": [
                  1,
                  1
                ],
                "floor": [
                  2,
                  2
                ],
                "device_id": "em2025022000100[16,17]"
              }
            ]
          },
          {
            "template": "location-2-smart_meters",
            "values": "西城",
            "children": [
              {
                "template": "智能水表",
                "child_table_names": "wm-2",
                "values": "wm-2",
                "device_id": "wm20250220001002"
              }
            ]
          }
        ]
      },
      {
        "template": "location-1-smart_meters",
        "values": "河南",
        "children": [
          {
            "template": "location-2-smart_meters",
            "values": "郑州",
            "children": [
              {
                "template": "智能电表",
                "child_table_names": "em-[18,19]",
                "values": "em-[18,19]",
                "unit": [
                  1,
                  1
                ],
                "floor": [
                  2,
                  2
                ],
                "device_id": "em2025022000100[18,19]"
              }
            ]
          },
          {
            "template": "location-2-smart_meters",
            "values": "开封",
            "children": [
              {
                "template": "智能电表",
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
            "values": "洛阳",
            "children": [
              {
                "template": "智能电表",
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
          }
        ]
      },
      {
        "template": "location-1-smart_meters",
        "values": "河北",
        "children": [
          {
            "template": "location-2-smart_meters",
            "values": "石家庄",
            "children": [
              {
                "template": "智能电表",
                "child_table_names": "em-22",
                "values": "em-22",
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
            "values": "保定[1,2]",
            "children": [
              {
                "template": "location-3-smart_meters",
                "values": "清苑区",
                "children": [
                  {
                    "template": "智能电表",
                    "child_table_names": "em-[23,24]",
                    "values": "em-[23,24]",
                    "unit": [
                      1,
                      1
                    ],
                    "floor": [
                      2,
                      2
                    ],
                    "device_id": [
                      "em202502200010023",
                      "em202502200010024"
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

## 14.7.3 使用建议

- 一个 JSON 对应一个示例场景
- 模板名称建议使用统一前缀
- 持续写入请控制子表数量
- 清理操作务必确认环境
