---
title: 示例数据
sidebar_label: 示例数据
---

# 14.9 示例数据

示例数据功能可将预置的业务场景一键加载到 TDengine IDMP 中。无需连接真实数据源，即可完整体验系统各项能力。加载过程中，工具会根据 JSON 配置文件自动创建设备模型，并将模拟的时序数据写入 TDengine 时序数据库。系统安装包内置了若干典型行业场景的示例数据包，也可根据实际业务需求编写相应的 JSON 配置文件。

该功能尤其适用于系统集成商和售前工程师。在充分了解客户业务场景后，可快速搭建贴近客户实际情况的演示环境，帮助客户直观验证 IDMP 的功能与价值，显著缩短从需求确认到功能验证的周期。使用时，需要根据场景编写 JSON 配置文件，也可以借助 AI 工具通过自然语言生成配置文件。

可通过 **管理控制台 → 示例数据** 访问该功能。

## 14.9.1 使用说明

以下说明假设 JSON 配置文件名为 init.json。

### 14.9.1.1 命令行方式

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

### 14.9.1.2 图形界面方式

在 IDMP 管理界面中，进入**示例数据**模块，选择或上传 JSON 配置文件，点击 **保存** 或 **取消** 按钮完成操作。

## 14.9.2 配置说明（JSON 文件）

### 14.9.2.1 JSON 整体结构

```json
{
  "info": {},
  "TDasset": {},
  "datasource": {},
  "databases": [],
  "enumerations": [],
  "templates": [],
  "trees": {}
}
```

整个 JSON 配置文件包含 7 个部分：`info` 用于描述模拟场景，`TDasset` 用于描述 IDMP 的连接信息，`datasource` 用于描述时序数据库 TSDB 的连接信息，`databases` 用于描述数据库配置，`enumerations` 用于定义枚举类型，`templates` 用于定义元素模板，`trees` 用于描述整个模拟场景的元素树结构。

### 14.9.2.2 info - 示例数据场景信息说明

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
- image: 展示示例场景列表时显示的图片；

### 14.9.2.3 TDasset - IDMP 连接配置

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

### 14.9.2.4 datasource - TDengine 连接配置

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

### 14.9.2.5 databases - 数据库定义

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

### 14.9.2.6 enumerations - 枚举类型定义

枚举类型用于属性值为有限集合的场景。在 `enumerations` 中声明的枚举类型会在元素模板和元素属性创建之前自动导入系统。如果系统已存在同名枚举类型但缺少部分值，加载时会自动补充缺失的值。

```json
[
  {
    "name": "设备状态",
    "code": "device_status",
    "description": "设备运行状态枚举",
    "valueType": "Varchar",
    "valueLength": 64,
    "values": [
      {
        "name": "运行",
        "value": "1",
        "description": "设备正在运行"
      },
      {
        "name": "停止",
        "value": "2",
        "description": "设备已停止"
      },
      {
        "name": "故障",
        "value": "3",
        "description": "设备故障",
        "subValues": [
          {
            "name": "硬件故障",
            "value": "3.1",
            "description": "硬件类故障"
          },
          {
            "name": "软件故障",
            "value": "3.2",
            "description": "软件类故障"
          }
        ]
      }
    ]
  }
]
```

- name: 枚举类型名称，保持唯一；
- code: 枚举类型编码，缺省为 `enum`；
- description: 枚举类型描述；
- valueType: 枚举值的数据类型，如 `Varchar`、`Int` 等，缺省为 `Varchar`；
- valueLength: 枚举值的长度，缺省为 64；
- values: 枚举值列表；
  - name: 枚举值名称；
  - value: 枚举值实际值；
  - description: 枚举值描述；
  - subValues: 子枚举值列表，支持多级嵌套，用于表示层级关系；

#### 在属性中引用枚举类型

当元素模板的属性或元素属性需要使用枚举类型时，将 `type` 设置为 `Enumeration`，并通过 `defaultValue` 以名称路径格式引用枚举值：

```json
{
  "name": "状态",
  "type": "Enumeration",
  "defaultValue": "设备状态.运行"
}
```

- `defaultValue` 格式为 `枚举类型名称.枚举值名称路径`；
- 对于层级枚举值，名称路径以点号连接，如 `设备状态.故障.硬件故障`；
- 加载时系统会自动将名称路径解析为系统内部 ID，无需手动指定 ID；
- 如果系统已存在同名枚举类型但缺少引用的值，加载时会自动补充；

### 14.9.2.7 templates - 元素模板配置

元素模板配置包含两部分：1. 通用信息，如名称、命名规则和位置信息；2. 属性列表，由 `super_tables` 描述，包括模拟数据生成方式、CSV 数据源配置以及 `metric` 和 `tag` 的定义。其中，`metric` 还可以指定模拟数据生成函数。

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
      "start_timestamp": "2026-07-11 08:00:00+08:00",
      "time_step": 600000,
      "non_stop_mode": false,
      "insert_rows": 1440,
      "batch_insert_num": 500,
      "insert_interval": 0,
      "history_window": {
        "start_timestamp": "2026-07-05 08:00:00+08:00",
        "duration": "2d"
      },
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
  - start_timestamp: 数据写入起始时间戳（字符串），null 表示从 4 天前开始写入；支持带时区偏移量的格式（如 `2025-06-10 20:00:00.000+08:00`、`2025-06-10T20:00:00.000Z`），不含时区则按系统默认时区解析；
  - time_step: 数据时间步进，单位毫秒；
  - non_stop_mode: false 表示按固定行数生成数据；true 表示持续生成数据，用于实时模拟；与 `csv` 配置同时使用时表示启用 CSV 历史数据回放，见 [14.9.2.8 CSV 数据源配置](#14928-csv---csv-数据源配置)；
  - insert_rows: 需要写入的数据总行数；
  - batch_insert_num: 每批次写入数据行数；
  - insert_interval: 每批次写入间隔时间，单位毫秒，0 表示无间隔；
  - history_window: 可选；在主数据写入之前追加一段历史回填，详见 [14.9.2.8.1 history_window - 历史数据窗口](#149281-history_window---历史数据窗口)；
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

### 14.9.2.8 csv - CSV 数据源配置

当 `super_tables` 中的数据来自已有 CSV 文件而非按公式生成时，可在超级表节点下增加 `csv` 配置。CSV 模式仅切换数据来源，`metrics`、`tags` 和 `trees` 的定义方式保持不变。

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
      "title": "速度",
      "description": "速度信息",
      "type": "SmallInt",
      "tdType": "metric"
    }
  ]
}
```

- file: CSV 文件路径；支持绝对路径和相对路径；缺省时默认读取 `<超级表名称>.csv`；
- timestamp_column: 时间列名称；缺省值为 `ts`；该列值将直接作为写入时间戳；历史数据回放模式下无需配置，该列会被忽略；
- sub_table_column: 子表名称列；必填；列值用于决定写入目标子表，CSV 表头中必须存在该列；
- CSV 表头至少应包含 `timestamp_column`（回放模式下可省略）、`sub_table_column` 以及所有 `metrics.name` 对应的列名；
- 一次性导入模式下（`non_stop_mode` 缺省或为 `false`），`start_timestamp`、`time_step`、`insert_rows`、`batch_insert_num` 和 `insert_interval` 无需再配置，实际写入时间和数据量以 CSV 内容为准；
- 将 `non_stop_mode` 设置为 `true` 可启用 CSV 历史数据回放模式，基于 CSV 数据持续模拟实时数据，详见下文；

#### CSV 历史数据回放

CSV 数据源默认为一次性导入：每行数据按 `timestamp_column` 列的原始时间写入一次，导入完成后不再产生新数据。若希望基于 CSV 中的历史数据持续模拟实时数据，可将超级表的 `non_stop_mode` 设置为 `true`，启用历史数据回放模式：

```json
{
  "name": "meters",
  "time_step": 60000,
  "non_stop_mode": true,
  "csv": {
    "file": "csv/meters.csv",
    "sub_table_column": "sub_table_name"
  },
  "metrics": [
    {
      "name": "current",
      "title": "电流",
      "description": "电流信息",
      "type": "Float",
      "tdType": "metric"
    }
  ]
}
```

回放模式与一次性导入的行为差异：

- 指标值循环读取：系统逐行读取 CSV 中的指标数据，读到文件末尾后回到开头继续读取，永不结束；
- 时间戳由系统生成：写入时间戳不读取 CSV 的时间列，而是从 `start_timestamp`（缺省为 4 天前）开始，按 `time_step`（单位毫秒，缺省 1000）逐行递增，因此 CSV 文件可以不包含时间列；
- 历史回填 + 实时续写：时间戳落后于当前时间的部分会快速回填；追上当前时间后，按 `time_step` 的节奏持续写入，模拟实时产生的数据；

配置约束与运行说明：

- 所有启用回放的 CSV 超级表必须位于同一个数据库中；
- 同一配置中可与一次性导入的 CSV 超级表混合使用，系统会先完成全部一次性导入，再启动回放；
- 回放运行期间示例保持「数据生成中」状态，可在示例数据页面暂停和恢复；恢复后系统会读取数据库中最后一条回放数据的时间戳，从断点继续回放，不会产生重复或缺失；
- 卸载示例场景或执行命令行清理（`-c`）时，回放进程会被自动终止；命令行方式加载时，工具在导入完成后即退出，回放进程在后台持续运行；
- 若还需要在主回放开始前快速回填一段近期历史数据，可为该超级表配置 `history_window`，详见下一节；

### 14.9.2.8.1 history_window - 历史数据窗口

`history_window` 是 `super_tables` 下的可选配置，用于在主数据写入（Phase 1）之前，先回填一段历史时序数据（Phase 0）。历史阶段写入的行数**不计入** `insert_rows`。

```json
{
  "name": "public_point",
  "start_timestamp": "2026-07-11 08:00:00+08:00",
  "time_step": 60000,
  "non_stop_mode": true,
  "history_window": {
    "start_timestamp": "2026-07-05 08:00:00+08:00",
    "duration": "2d"
  },
  "csv": {
    "file": "csv/public_point.csv",
    "sub_table_column": "sub_table_name"
  },
  "metrics": []
}
```

#### 字段说明

- `start_timestamp`：历史回填区间的起始时间，格式与超级表级 `start_timestamp` 相同（支持时区偏移；省略或 `null` 时默认为当前时间减去 4 天）；
- `duration`：**必填**；历史窗口时长，支持紧凑写法：`30m`、`24h`、`6d`、`2w` 等；

历史窗口为左闭右开区间 `[start_timestamp, start_timestamp + duration)`。例如上例中历史区间为 2026-07-05 08:00:00 起、持续 6 天，结束时刻为 2026-07-11 08:00:00（该时刻本身不属于历史窗口）。

#### 执行顺序与行数

1. **Phase 0（历史）**：若配置有效且未触发重叠短路（见下文），先完成历史回填；
2. **Phase 1（主流程）**：再按表级 `start_timestamp`、`insert_rows`、`non_stop_mode` 等原有逻辑写入；

历史行数由 `duration ÷ time_step` 计算（向下取整），与 `insert_rows` 无关。

#### 重叠时的处理

设 `history_end = history_window.start_timestamp + duration`。若 `history_end >` 表级 `start_timestamp`，视为与主窗口重叠：

- **不再**单独执行历史阶段，也**不会**生成独立的 history taosgen 配置；
- 主写入 / CSV 回放的起始时间取 `min(history_window.start_timestamp, start_timestamp)`，从更早的那个起点继续按原主流程写入。

边界相等（`history_end == start_timestamp`）时不视为重叠，历史阶段仍会单独执行。

#### 按数据来源区分的行为

| 数据来源 | `non_stop_mode` | 历史阶段行为 |
| -------- | --------------- | ------------ |
| 公式生成（无 `csv`） | 任意 | 从 `history_window.start_timestamp` 起，按 `time_step` 生成指标值并写入 |
| CSV 一次性导入 | `false` | 从 CSV 中筛选 `timestamp_column` 落在历史窗口内的行，**按 CSV 原始时间戳**写入 |
| CSV 回放 | `true` | 指标值按 CSV **循环回放**，时间戳从 `history_window.start_timestamp` 起按 `time_step` 递增生成（与主回放一致，不使用 CSV 时间列） |

:::tip
对启用 CSV 回放的超级表（`non_stop_mode: true`），`history_window.start_timestamp` 决定历史回填的起始时间，而不是源 CSV 文件中的时间列。适用于源 CSV 时间较旧、但希望演示数据落在近期时间轴的场景。
:::

#### 恢复（Resume）说明

示例从检查点恢复或暂停后继续时，**不会重新执行** `history_window` 历史阶段，与当前线上行为一致，仅续做主流程（含 CSV 回放）。

#### 运行顺序（含 CSV）

同一配置中若同时存在历史窗口与 CSV 回放：系统先执行全部历史导入（含各表的 `history_window`），再执行一次性 CSV 导入，最后启动 CSV 回放进程。

### 14.9.2.9 trees - 元素树

此处描述整个树状结构。每个节点均可指定元素模板 `template`，子节点通过 `children` 描述。使用元素模板时，需要通过 `values` 为命名规则中的 `KEYWORD1` 赋值。

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
- values: 为模板中的命名关键字 `KEYWORD1` 赋值；支持范围生成，如 `em[1,5]` 表示从 `em1` 到 `em5`，系统会依据模板自动生成 5 个元素。
- children: 子节点列表；

该配置用于创建元素，并构建整个元素的树状结构。

### 14.9.2.10 panels / analyses - 面板与分析的元素名称引用

除数据模型外，示例数据还支持在 `templates` 模板项或 `trees` 树节点下，通过 `panels`、`dashboards`、`analyses` 字段预置面板、仪表盘和分析。

编写配置文件时元素尚未创建，因此这些配置对元素和模板的引用一律使用**名称**，加载时自动解析为实际 ID：

- 引用字段填名称：如 `rootElementId`、`elementTemplate.rootElement` 填元素名称，`elementTemplate.id`、`otherElementTemplateId` 填模板名称；
- 表达式引用：`attributeExpression`、`expression`、`filter` 等字段用 `元素名称|attributes['属性名']` 语法引用其他元素的属性；
- `#ELEMENT_NAME` 占位符：`name`、`fileName` 中的 `#ELEMENT_NAME` 会被替换为所属元素名称。

```json
"analyses": [
  {
    "name": "物流公司车辆统计",
    "elementTemplate": {
      "id": "车辆",
      "rootElement": "车辆场景"
    },
    "rootElementId": "车辆场景"
  }
]
```

注意：被面板或分析引用的元素名称必须在场景内唯一，重名或不存在都会导致加载失败。

### 14.9.2.11 完整示例

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
  "enumerations": [
    {
      "name": "电表状态",
      "code": "meter_status",
      "description": "电表运行状态",
      "valueType": "Varchar",
      "valueLength": 64,
      "values": [
        {
          "name": "正常",
          "value": "0",
          "description": "正常运行"
        },
        {
          "name": "异常",
          "value": "1",
          "description": "运行异常"
        }
      ]
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
            },
            {
              "name": "status",
              "title": "状态",
              "description": "电表运行状态",
              "type": "Enumeration",
              "tdType": "metric",
              "defaultValue": "电表状态.正常"
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
          "start_timestamp": "2025-06-10 20:00:00.000+08:00",
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
                    "unit": [1, 2],
                    "floor": [2, 2],
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
                    "unit": [1],
                    "floor": [2],
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
                    "unit": [1],
                    "floor": [2],
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
                    "unit": [11, 11, 11, 11, 1],
                    "floor": [11, 12, 13, 14, 15],
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
                    "unit": [1],
                    "floor": [2],
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
                    "unit": [1, 1, 1, 1],
                    "floor": [2, 2, 2, 2],
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
                "unit": [1, 1],
                "floor": [2, 2],
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
                "unit": [1, 1],
                "floor": [2, 2],
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
                "unit": [1],
                "floor": [2],
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
                "unit": [1],
                "floor": [2],
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
                "unit": [1],
                "floor": [2],
                "device_id": "em202502200010022"
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
                    "unit": [1, 1],
                    "floor": [2, 2],
                    "device_id": ["em202502200010023", "em202502200010024"]
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

## 14.9.3 使用建议

- 一个 JSON 对应一个示例场景
- 模板名称建议使用统一前缀
- 面板与分析通过元素名称关联，被引用的元素名称必须保持唯一
- 持续写入请控制子表数量
- 需要近期时间轴上的历史曲线时，可为超级表配置 `history_window`；若与表级 `start_timestamp` 重叠，系统会改用更早的起点继续主写入，而不再单独回填 history
- 清理操作务必确认环境
