---
title: 数据模型导入与导出
sidebar_label: 数据模型导入与导出
---

# 11.4 数据模型导入与导出

IDMP 管理控制台中的导入/导出功能允许您在不同 IDMP 实例之间传输数据模型——包括元素、元素模板、事件模板、计量单位分类和基础库。这对于将开发环境的配置复制到生产环境，或在多个部署实例之间共享标准资产模型非常有用。

## 11.4.1 访问导入/导出

导航至**管理控制台 → 导入/导出**。

主页面显示所有过去导入和导出操作的历史记录表，包含**创建时间**、**状态**、**名称**和**原因**列。使用**分类**和**导入**筛选按钮可切换查看导出和导入历史记录。

## 11.4.2 导出数据模型

点击右上角的**导出**图标（下载箭头）打开导出配置表单。

### 11.4.2.1 选择资源

导出表单有两个选择器：

| 选择器 | 选择内容 |
|---|---|
| **选择元素** | 从资产树中选择一个或多个根元素。IDMP 将包含所选元素及其依赖的所有资源。 |
| **选择基础库** | 独立选择一个或多个基础库条目（元素模板、计量单位分类等），不依赖于任何元素。 |

随着您做出选择，**已选资源**树形预览将更新，显示导出中将包含的确切内容——元素、其模板、事件模板、计量单位分类和各个计量单位。

### 11.4.2.2 导出摘要

表单底部的摘要表确认了每种资源类型的导出数量：

| 资源 | 说明 |
|---|---|
| **元素数量** | 已选元素的数量 |
| **元素模板数量** | 引入的元素模板数量 |
| **事件模板数量** | 引入的事件模板数量 |
| **分类数量** | 引入的计量单位分类数量 |
| **计量单位数量** | 引入的计量单位数量 |
| **资源总数** | 导出中的资源总数 |

点击**确认**生成并下载导出文件。点击**取消**放弃操作。

## 11.4.3 导入数据模型

点击右上角的**导入**图标（上传箭头）打开导入表单。

### 11.4.3.1 导入字段

| 字段 | 说明 |
|---|---|
| **元数据文件**（必填） | 由之前 IDMP 导出生成的数据模型文件。点击**选择元数据文件**上传。 |
| **TSGen 配置文件**（可选） | 可选的 TDengine 架构生成配置文件，用于与导入关联。 |
| **历史数据 CSV 文件**（可选） | 可选的历史数据文件，用于[历史数据回放](#1144-历史数据回放)。上传后对应超级表会循环回放该数据；不上传则按 TSGen 配置原样生成数据。 |
| **选择连接**（必填） | 导入的元素将绑定到的 TDengine 连接，用于时序数据存储。 |
| **联系点**（必填） | 与导入的事件模板关联的通知联系点。 |

点击**确认**开始导入。该操作在后台运行，其进度和结果显示在导入/导出主页面的历史记录表中。

## 11.4.4 历史数据回放

导入数据模型时，除了让 taosgen 按规则生成模拟数据外，还可以**回放真实的历史数据**：把一份历史数据 CSV 持续不断地写入对应的表，使其表现得像实时采集的数据流，常用于演示、压测以及让仪表盘/分析有"看起来是实时"的数据。

### 11.4.4.1 启用方式

在导入表单的**历史数据 CSV 文件**字段上传一个或多个 CSV 文件即可启用回放：

- **上传了 CSV**：与之同名的超级表会循环回放该数据；
- **未上传 CSV**：完全按 taosgen 配置原样运行（合成生成或配置中已写好的回放），行为与之前一致。

将历史数据放在独立的 CSV 文件中（而不是内嵌进 taosgen 配置）可以避免配置文件因数据量大而变得臃肿。

### 11.4.4.2 CSV 文件要求

| 要求 | 说明 |
|---|---|
| **文件名** | 需与配置的表名一致。 |
| **表头** | 仅包含测点列，且顺序与超级表的数据列一致；**不包含** `ts`（时间戳）和 `tbname`（子表名）列。 |

例如，超级表 `electricity_meters` 的数据列为 `current,phase,power,voltage`，则 CSV 内容形如：

```csv
current,phase,power,voltage
8.1,0.12,100,220
7.9,0.15,100,219
8.3,0.11,100,221
```

### 11.4.4.3 回放行为

- **时间戳**：由 `ts` 列按 `start + step` 持续生成、不断前进。若 `ts` 列**未指定** `start`，导入时会自动将其设为"当前时间约 4 天前"，使回放数据从约 4 天前开始、随 `ts` 递增不断向后延伸，看起来是新近写入且保留少量历史；若**已指定** `start`，则按指定时间开始。
- **写入速率**：由 `ts` 列的 `step` 决定。例如 `step: "100ms"` 约为每秒 10 行；调小/调大 `step` 即可加快/放慢。
- **循环不停**：配合 `repeat_read: true` 与 `rows_per_table: -1`，历史测点值会被反复循环写入，直到任务被**手动停止**。
- **后台任务**：回放作为后台持续生成任务运行，可在导入/导出历史记录页对其执行**停止 / 恢复**。

### 11.4.4.4 taosgen 配置字段说明

回放由 taosgen 配置中的 `tdengine/insert` 步骤驱动，关键字段含义如下：

| 配置项 | 含义 |
|---|---|
| `schema.name` | 目标超级表名。 |
| `columns` | 列定义；其中 `ts` 为时间戳列，`start` 为起始时间（epoch 毫秒）——未指定时导入会自动设为当前时间约 4 天前，已指定则按指定时间开始；`step` 为相邻行间隔并决定写入速率，`precision` 为时间精度。 |
| `generation.rows_per_table` | `-1` 表示持续不断地生成；`interlace` 为交错写入的行数。 |
| `from_csv.tags` | 子表标签文件（`subtable_*.csv`），决定向哪些子表写入；`tbname_index` 指定表名所在列。 |
| `from_csv.columns` | 历史数据文件；`loading_mode: preload` 预加载到内存，`repeat_read: true` 循环回放，**不设** `tbname_index` 时所有子表共用此数据。 |
| `time_interval` | `enabled: true` 开启按时间戳的节流（持续生成时必须开启，否则会一直攒批不落库）；`interval_strategy: literal` 按 `ts` 节流。 |

### 11.4.4.5 完整示例

下面是一个完整的历史数据回放 `tdengine/insert` 任务示例，以超级表 `electricity_meters`（数据列为 `current,phase,power,voltage`）为例：

```yaml
insert-electricity_meters:
  name: "Insert data into electricity_meters"
  needs:
    - "create-child-table"
  steps:
    - name: "Replay electricity_meters"
      uses: "tdengine/insert"
      with:
        schema:
          name: "electricity_meters"
          columns:
            - name: "ts"
              type: "timestamp"
              start: 1781509407300        # 起始时间(epoch 毫秒)；已指定则按此开始，留空则导入时自动设为"当前时间约 4 天前"
              step: "100ms"               # 相邻行间隔，同时决定写入速率(约 1000/step 行每秒)
              precision: "ms"
            - name: "`current`"
              type: "FLOAT"
            - name: "`phase`"
              type: "FLOAT"
            - name: "`power`"
              type: "FLOAT"
            - name: "`voltage`"
              type: "INT"
          generation:
            interlace: 1
            rows_per_table: -1            # -1 表示持续不断地生成
            num_cached_batches: 0
          from_csv:
            tags:
              # 子表清单：决定向哪些子表写入数据
              file_path: "./subtable_idmp_sample_utility_electricity_meters.csv"
              tbname_index: 0
            columns:
              # 历史数据文件，对应上传的 CSV；表头为测点列 current,phase,power,voltage(不含 tbname/ts)
              file_path: "./data_idmp_sample_utility_electricity_meters.csv"
              loading_mode: "preload"
              has_header: true
              repeat_read: true           # 循环回放，所有子表共用这份历史数据
        time_interval:
          enabled: true                   # 持续生成必须开启，否则会一直攒批不落库
          interval_strategy: "literal"
```

其中：

- `data_idmp_sample_utility_electricity_meters.csv` 即上传的历史数据文件，内容形如 [11.4.4.2](#11442-csv-文件要求) 中的示例（表头 `current,phase,power,voltage`）；
- `subtable_idmp_sample_utility_electricity_meters.csv` 为子表标签文件，由元数据导出时一并生成。

## 11.4.5 taosgen 配置校验

导入时，IDMP 会在执行 taosgen **之前**对配置进行校验，并将发现的所有问题一次性反馈到导入记录中，让您在导入环节即可确认配置是否可用，而不必等到运行期才报错。校验包括：

- **连接**：缺少 `tdengine.dsn`。
- **任务结构**：没有 `jobs`；任务缺少 `steps`；步骤缺少 `uses`；`tdengine/insert` 步骤缺少 `schema.name`。
- **回放专项**（`tdengine/insert` 含 `from_csv.columns` 时）：缺少 `from_csv.tags` 子表清单（会导致写入默认表 `d0`、`d1`… 而非目标子表）、缺少 `from_csv.columns.file_path`、缺少 `timestamp` 类型的时间戳列。
- **引用文件存在性**：`from_csv` 引用的文件（子表标签文件、历史数据文件）必须由上传的 CSV 或配置中的 `subTableCsv` 提供，否则会提示文件不存在。

若校验未通过，导入会失败并在历史记录中给出具体原因；修正配置或补充缺失的 CSV 后重新导入即可。

## 11.4.6 典型工作流程

典型的跨实例部署工作流程如下：

1. 在**源**实例上，配置您的元素、模板和基础库。
2. 前往**管理控制台 → 导入/导出**，导出相关元素和基础库。
3. 下载元数据文件。
4. 在**目标**实例上，前往**管理控制台 → 导入/导出**并导入元数据文件。
5. 在目标实例上选择适当的连接和联系点。
6.（可选）若需回放真实历史数据，上传对应的**历史数据 CSV 文件**（文件名与超级表名一致）。
7. 确认导入，并验证资源是否出现在元素浏览器和基础库中；若启用了回放，可在历史记录页查看并停止/恢复回放任务。
