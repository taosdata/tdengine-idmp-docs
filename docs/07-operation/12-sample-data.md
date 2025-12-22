# 示例数据使用文档

本文档用于说明示例数据功能的用途、使用方式以及配置说明，帮助用户快速理解并正确使用该工具完成示例数据的生成、运行与清理。

## 1. 功能说明与用途

### 1.1 工具定位

示例数据功能是一个 **基于 JSON 配置的数据生成工具**，用于在 TDengine 与 IDMP 中 **自动创建数据模型并生成时间序列数据**。

其核心思想是：

> **使用一份 JSON，完整描述一个业务场景的数据结构与数据行为。**

### 1.2 主要功能

#### 1.2.1 自动建模

- 创建 TDengine 数据库
- 创建超级表与子表
- 创建 IDMP 元素模板
- 创建属性模板
- 构建元素树结构

#### 1.2.2 自动生成示例数据

- 按指定数量生成历史数据
- 持续生成实时模拟数据
- 支持批量写入与时间步进

#### 1.2.3 数据清理

- 一键删除示例相关的：
  - 元素
  - 元素模板
  - 属性模板
  - TDengine 数据库

### 1.3 典型使用场景

- 产品 Demo 演示
- PoC / 场景验证
- 自动化测试
- 性能测试
- 培训与交付环境初始化

## 2. 使用方式说明

### 2.1 命令行方式运行

### 2.1.1 运行环境要求

| 组件          | 要求             |
| ------------- | ---------------- |
| Java          | JDK 8 及以上     |
| TDengine      | 已部署并可访问   |
| IDMP          | 已部署并可访问   |
| JSON 配置文件 | 示例数据描述文件 |

### 2.1.2 工具位置说明

在 TDasset Docker 容器中：

```bash
/app/tda-generator-command.jar
```

### 2.1.3 基本运行命令

#### 2.1.3.1 根据 JSON 生成示例数据

```bash
java -jar tda-generator-command.jar -f init.json
```

#### 2.1.3.2 清理示例数据

```bash
java -jar tda-generator-command.jar -f init.json -c
```

⚠️ **仅限测试环境使用**

### 2.2 图形界面方式运行

在 IDMP 管理界面中，进入 **示例数据** 模块，选择或上传 JSON 配置文件，点击 **load** 或 **unload** 按钮完成操作。

## 3. 配置说明（JSON 配置文件）

### 3.1 JSON 整体结构

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

### 3.2 info - 示例数据场景信息说明

仅在 IDMP 示例数据界面展示。

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

### 3.3 TDasset - IDMP 连接配置

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

### 3.4 datasource - TDengine 连接配置

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

- db: TDengine 连接信息；
- max_active: 连接池最大连接数；
- min_idle: 连接池最小空闲连接数；
- 其他参数请参考 TDengine JDBC 连接池配置说明。

### 3.5 databases - 数据库定义

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

- name: 数据库名称；
- drop: 是否删除已存在数据库，建议仅测试环境使用；
- vgroups: 数据库中初始 vgroup 的数目；
- precision: 时间精度，默认 ms；
- replica: 副本数量，默认 1；
- duration: 数据文件存储数据的时间跨度，默认 10d；
- keep: 数据存储天数，默认 3650 天；
- 其他参数请参考 TDengine 数据库创建说明；

### 3.6 templates - 元素模板配置（模型数据）

#### 3.6.1 超级表模板（叶子节点）

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
          "title": "电流",
          "description": "电流信息",
          "type": "Float",
          "tdType": "metric",
          "uomClass": "电流",
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
```

- name: 模板名称，保持唯一；
- leaf: 是否为叶子节点模板，false 表示路径模板；
- namingPattern: 命名规则；
- keywordsDesc: 命名关键字说明；
- location: 元素位置属性范围配置；通过 altitude、latitude、longitude 三个字段配置；
- super_tables: 超级表列表配置；
  - db: 所属数据库名称；
  - name: 超级表名称；
  - start_timestamp: 数据写入起始时间戳，null 表示以 4 天前时间开始；
  - time_step: 数据时间步进，单位毫秒；
  - non_stop_mode: no 固定数量数据生成，写满 insert_rows 后停止；yes 持续数据生成（实时模拟）；
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

#### 3.6.2 路径模板（非叶子节点）

```json
{
  "name": "location-#LEVEL-#ID",
  "level": 3,
  "description": "这是树的路径模板信息",
  "namingPattern": "${KEYWORD1}",
  "keywordsDesc": {
    "KEYWORD1": "name"
  }
}
```

- name: #LEVEL 由 level 控制创建路径模板数量，#ID 表示引用 info 配置中 id；
- level: 路径模板层级数；
- namingPattern: 命名规则；

### 3.7 tree_root - 元素树根节点

```json
{
  "tag_name": "location",
  "value": "公共事业",
  "visible": "true"
}
```

- visible: 根节点是否可见；

### 3.8 trees - 元素树与子表生成（核心）

```json
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
```

- template: 使用的模板名称；与 templates 中定义的模板名称保持一致；
- values: 为模板中的命名关键字赋值；支持范围生成，如 em[1,5] 表示 em1 至 em5；
- children: 子节点列表；

作用： - 构建元素树 - 自动创建子表 - 自动绑定 TAG 值

## 4. 使用建议

- 一个 JSON 对应一个示例场景
- 模板名称建议使用统一前缀
- 持续写入请控制子表数量
- 清理操作务必确认环境
