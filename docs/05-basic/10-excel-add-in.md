# Excel Add-in

TDengine Excel Add-in 是一个 Microsoft Excel 插件，它使您能够从 TDengine 服务器直接检索信息到工作表中。结合 Microsoft Excel 的计算、图形化和格式化功能，TDengine Excel Add-in 为收集、监视、分析和报告 TDengine 数据提供了强大的工具。

## 详细功能

### 1. 单值查询 (Single Value)

#### 1.1 当前值 (Current Value)

**功能描述**：获取测点的最新实时值

| 项目 | 描述 | 操作 |
|------|------|------|
| 数据项 | 元素的属性，可选择一个或多个 | 1. 在输入框输入关键词搜索，选择需要的数据项<br/>2. 点击搜索图标，弹出高级搜索条件，填写后确认 |
| 输出单元格 | 数据输出到 Excel cell 的起始单元格 | 1. 点击 Excel 中的单元格自动绑定<br/>2. 手动输入符合 Excel cell 的位置字符，如 `Sheet1!A1` |
| 时间位置 | 输出数据时间列的配置 | 1. 不显示时间<br/>2. 时间在左侧<br/>3. 时间在顶部（点击切换） |

##### 当前值示例

要查看 Current 测点的当前值，为当前值功能设置以下输入：

| Input | Value |
|------|------|
| 数据项 | Current |
| 时间在左侧 | 选择 |

当前功能输出结果：
<img
src="/docs-img/excel-add-in/current-value.png"
alt="excel-add-in-current-value" data-zoom style={{width: "680px", display: "block"}} />

#### 1.2 历史值 (Archive Value)

**功能描述**：获取指定时间点的历史数据

| 项目 | 描述 | 操作 |
|------|------|------|
| 数据项 | 元素的属性，可选择一个或多个 | 1. 在输入框输入关键词搜索，选择需要的数据项<br/>2. 点击搜索图标，弹出高级搜索条件，填写后确认 |
| 填充类型 | 查询插值，TDengine fill 子句填充类型（默认前一个非空值） | 支持以下类型（下拉框选择）：<br/>1. 前一个非空值<br/>2. 填充设置值<br/>3. 填充 null<br/>4. 线性填充<br/>5. 下一个非空值 |
| 填充设置值 | 插值的具体值 | 仅当填充类型选择"填充设置值"时展示 |
| 时间戳 | 查询数据的具体时间 | 时间选择框：<br/>1. 昨日零点值<br/>2. 今日零点值<br/>3. 当前时间<br/>或选择具体时间点 |
| 输出单元格 | 数据输出到 Excel cell 的起始单元格 | 1. 点击 Excel 中的单元格自动绑定<br/>2. 手动输入符合 Excel cell 的位置字符，如 `Sheet1!A1` |
| 时间位置 | 输出数据时间列的配置 | 1. 不显示时间<br/>2. 时间在左侧<br/>3. 时间在顶部（点击切换） |

##### 历史值示例

要查看 Current 测点的历史值，为历史值功能设置以下输入：

| Input | Value |
|------|------|
| 数据项 | Current |
| 填充类型 | 前一个非空值 |
| 时间戳 | 2025-12-14 00:00:00 |
| 时间在左侧 | 选择 |

当前功能输出结果：
<img
src="/docs-img/excel-add-in/archive-value.png"
alt="excel-add-in-archive-value" data-zoom style={{width: "680px", display: "block"}} />

### 2. 多值查询 (Multiple Value)

#### 2.1 原始数据 (Row Data)

**功能描述**：获取原始的时序数据

| 项目 | 描述 | 操作 |
|------|------|------|
| 数据项 | 元素的属性，可选择一个或多个 | 1. 在输入框输入关键词搜索，选择需要的数据项<br/>2. 点击搜索图标，弹出高级搜索条件，填写后确认 |
| 时间范围 | 查询数据的具体时间 | 时间选择框：<br/>1. 昨日数据<br/>2. 今日数据<br/>3. 过去一天的数据<br/>或选择具体时间范围 |
| 输出单元格 | 数据输出到 Excel cell 的起始单元格 | 1. 点击 Excel 中的单元格自动绑定<br/>2. 手动输入符合 Excel cell 的位置字符，如 `Sheet1!A1` |
| 时间位置 | 输出数据时间列的配置 | 1. 不显示时间<br/>2. 时间在左侧<br/>3. 时间在顶部（点击切换） |

##### 原始数据示例

要查看 Current 测点的原始数据值，为原始数据值功能设置以下输入：

| Input | Value |
|------|------|
| 数据项 | Current |
| 时间范围 | 昨天 |
| 时间在左侧 | 选择 |

当前功能输出结果：
<img
src="/docs-img/excel-add-in/raw-data.png"
alt="excel-add-in-raw-data" data-zoom style={{width: "680px", display: "block"}} />

#### 2.2 采样数据 (Sampled Data)

**功能描述**：按固定间隔采样的时序数据

| 项目 | 描述 | 操作 |
|------|------|------|
| 数据项 | 元素的属性，可选择一个或多个 | 1. 在输入框输入关键词搜索，选择需要的数据项<br/>2. 点击搜索图标，弹出高级搜索条件，填写后确认 |
| 时间间隔 | 拉取数据的时间间隔 | 默认值为小时 |
| 过滤表达式 | 数据的过滤条件 | 输入框（属性名称需增加反引号，如 `` `current` > 5 ``） |
| 时间范围 | 查询数据的具体时间 | 时间选择框：<br/>1. 昨日逐时数据<br/>2. 今日逐时数据<br/>3. 最近 24 小时数据<br/>4. 最近一周数据<br/>5. 本月逐时数据<br/>或选择具体时间范围 |
| 输出单元格 | 数据输出到 Excel cell 的起始单元格 | 1. 点击 Excel 中的单元格自动绑定<br/>2. 手动输入符合 Excel cell 的位置字符，如 `Sheet1!A1` |
| 时间位置 | 输出数据时间列的配置 | 1. 不显示时间<br/>2. 时间在左侧<br/>3. 时间在顶部（点击切换） |

##### 采样数据示例

要查看 Current 测点的采样数据值，为采样数据值功能设置以下输入：

| Input | Value |
|------|------|
| 数据项 | Current |
| 时间范围 | 昨天 |
| 时间间隔 | 1h |
| 时间在左侧 | 选择 |

当前功能输出结果：
<img
src="/docs-img/excel-add-in/sampled-data.png"
alt="excel-add-in-sampled-data" data-zoom style={{width: "680px", display: "block"}} />

#### 2.3 时间点数据 (Timed Data)

**功能描述**：获取多个指定时间点的时序数据

| 项目 | 描述 | 操作 |
|------|------|------|
| 数据项 | 元素的属性，可选择一个或多个 | 1. 在输入框输入关键词搜索，选择需要的数据项<br/>2. 点击搜索图标，弹出高级搜索条件，填写后确认 |
| 填充类型 | 查询插值，TDengine fill 子句填充类型（默认前一个非空值） | 支持以下类型（下拉框选择）：<br/>1. 前一个非空值<br/>2. 填充设置值<br/>3. 填充 null<br/>4. 线性填充<br/>5. 下一个非空值 |
| 填充设置值 | 插值的具体值 | 仅当填充类型选择"填充设置值"时展示 |
| 时间戳 | 查询数据的具体时间 | 输入框：可输入多个时间点 |
| 输出单元格 | 数据输出到 Excel cell 的起始单元格 | 1. 点击 Excel 中的单元格自动绑定<br/>2. 手动输入符合 Excel cell 的位置字符，如 `Sheet1!A1` |
| 时间位置 | 输出数据时间列的配置 | 1. 不显示时间<br/>2. 时间在左侧<br/>3. 时间在顶部（点击切换） |

##### 时间点数据示例

要查看 Current 测点的时间点数据值，为时间点数据值功能设置以下输入：

| Input | Value |
|------|------|
| 数据项 | Current |
| 填充类型 | 前一个非空值 |
| 时间戳 | 2025-12-15 09:00:00，2025-12-15 08:00:00 |
| 时间在左侧 | 选择 |

当前功能输出结果：
<img
src="/docs-img/excel-add-in/timed-data.png"
alt="excel-add-in-timed-data" data-zoom style={{width: "680px", display: "block"}} />

### 3. 计算功能 (Calculation)

#### 3.1 计算数据 (Calculated Data)

**功能描述**：获取用 TDengine 聚合函数处理后的时序数据

| 项目 | 描述 | 操作 |
|------|------|------|
| 数据项 | 元素的属性，可选择一个或多个 | 1. 在输入框输入关键词搜索，选择需要的数据项<br/>2. 点击搜索图标，弹出高级搜索条件，填写后确认 |
| 时间间隔 | 拉取数据的时间间隔 | 默认值为小时 |
| 过滤表达式 | 数据的过滤条件 | 输入框（属性名称需增加反引号，如 `` `current` > 5 ``） |
| 时间范围 | 查询数据的具体时间 | 时间选择框：<br/>1. 昨日逐时数据<br/>2. 今日逐时数据<br/>3. 最近 24 小时数据<br/>4. 最近一周数据<br/>5. 本月逐时数据<br/>或选择具体时间范围 |
| 聚合函数 | 数据进行聚合处理 | 下拉选择具体的 TDengine 聚合函数名称 |
| 输出单元格 | 数据输出到 Excel cell 的起始单元格 | 1. 点击 Excel 中的单元格自动绑定<br/>2. 手动输入符合 Excel cell 的位置字符，如 `Sheet1!A1` |
| 时间选项 | 输出数据时间选项的配置 | 多选框：<br/>1. 显示开始时间<br/>2. 显示结束时间<br/>3. 显示最大/最小时间 |

##### 计算数据示例

要查看 Current 测点的计算数据值，为计算数据值功能设置以下输入：

| Input | Value |
|------|------|
| 数据项 | Current |
| 时间间隔 | 1h |
| 时间戳 | 2025-12-28 00:00:00-2025-12-31 00:00:00 |
| 聚合函数 | AVG |
| 显示开始时间、显示结束时间、显示最大/最小时间 | 选择 |

当前功能输出结果：
<img
src="/docs-img/excel-add-in/calculated-data.png"
alt="excel-add-in-calculated-data" data-zoom style={{width: "680px", display: "block"}} />

#### 3.2 时间过滤 (Time Filtered)

**功能描述**：返回指定时间范围内，满足条件（expression 指定）的时间总长

| 项目 | 描述 | 操作 |
|------|------|------|
| 数据项 | 元素的属性，可选择一个或多个 | 1. 在输入框输入关键词搜索，选择需要的数据项<br/>2. 点击搜索图标，弹出高级搜索条件，填写后确认 |
| 时间间隔 | 拉取数据的时间间隔 | 默认值为小时 |
| 表达式 | 开始条件 START WITH，结束条件 END WITH | 输入框（属性名称需增加反引号，如 `` `current` > 5 ``） |
| 时间范围 | 查询数据的具体时间 | 时间选择框：<br/>1. 昨日逐时数据<br/>2. 今日逐时数据<br/>3. 最近 24 小时数据<br/>4. 最近一周数据<br/>5. 本月逐时数据<br/>或选择具体时间范围 |
| 时间单位 | 输出的时间单位转换 | 默认为秒，下拉框选择 |
| 输出单元格 | 数据输出到 Excel cell 的起始单元格 | 1. 点击 Excel 中的单元格自动绑定<br/>2. 手动输入符合 Excel cell 的位置字符，如 `Sheet1!A1` |
| 时间位置 | 输出数据时间列的配置 | 1. 不显示时间<br/>2. 时间在左侧<br/>3. 时间在顶部（点击切换） |

##### 时间过滤示例

要查看 Current 测点的时间过滤值，为时间过滤值功能设置以下输入：

| Input | Value |
|------|------|
| 数据项 | Current |
| START WITH | \`Current\` > 0 |
| END WITH | \`Current\` < 5 |
| 时间间隔 | 1h |
| 时间范围 | 2025-12-28 00:00:00-2025-12-31 00:00:00 |
| 时间单位 | 秒 |
| 显示开始时间、显示结束时间 | 选择 |

当前功能输出结果：
<img
src="/docs-img/excel-add-in/time-filter.png"
alt="excel-add-in-time-filter" data-zoom style={{width: "680px", display: "block"}} />

### 4. 事件分析 (Events)

#### 4.1 事件浏览器 (Explore Events)

**功能描述**：返回指定搜索条件的事件

##### 事件浏览器示例

要查看事件，为事件浏览器值功能设置以下输入：

| Input | Value |
|------|------|
| 名称 | 电压超高预警 |
| 显示的列 | 全选 |

当前功能输出结果：
<img
src="/docs-img/excel-add-in/event-explorer.png"
alt="excel-add-in-event-explorer" data-zoom style={{width: "680px", display: "block"}} />

### 5. 过滤 (Search)

#### 5.1 属性过滤 (Attribute Filter)

**功能描述**：返回指定搜索条件的属性

##### 属性过滤示例

要查看属性过滤，为属性过滤功能设置以下输入：

| Input | Value |
|------|------|
| 名称 | Current |
| 最大结果数 | 5 |
| 显示的列 | 全选 |

当前功能输出结果：
<img
src="/docs-img/excel-add-in/attribute-filter.png"
alt="excel-add-in-attribute-filter" data-zoom style={{width: "680px", display: "block"}} />

#### 5.2 资产过滤 (Asset Filter)

**功能描述**：返回指定搜索条件的元素

##### 资产过滤示例

要查看资产，为资产过滤功能设置以下输入：

| Input | Value |
|------|------|
| 根路径 | /Elements/Utilities/California/Los Angeles County/Los Angeles |
| 最大结果数 | 5 |
| 显示的列 | 全选 |

当前功能输出结果：
<img
src="/docs-img/excel-add-in/asset-filter.png"
alt="excel-add-in-asset-filter" data-zoom style={{width: "680px", display: "block"}} />

### 6. 属性 (Properties)

**功能描述**：查询某个属性的属性

##### 属性示例

要查看属性的属性，为属性功能设置以下输入：

| Input | Value |
|------|------|
| 数据项 | Current |
| 属性 | 描述 |

当前功能输出结果：
<img
src="/docs-img/excel-add-in/properties.png"
alt="excel-add-in-properties" data-zoom style={{width: "200px", display: "block"}} />

### 7. 数据更新 (Update)

**功能描述**：触发工作表中数据更新

**操作按钮**：

- **确定**：执行数据查询，一次性更新当前加载项数据
- **应用**：根据选择的刷新频率进行当前加载项数据的更新
- **更新**：更新整个 Excel 工作区数据

### 8. 系统设置 (Settings)

**功能描述**：设置写入 Excel 数据

| 项目 | 描述 |
|------|------|
| 时间格式 | 输出到 Excel 的时间列格式。缺省 `YYYY-MM-DD HH:mm:ss` |
| 数字格式 | 输出到 Excel 数字列的格式。格式字符串可以是 Excel 格式窗口中的任何有效数字格式代码 |
| 最大事件浏览器搜索数 | 事件浏览器返回最大结果数 |
| 最大属性/资产过滤数 | 属性过滤/资产过滤返回最大结果数 |
| 自动更新 - 间隔 | 启用"应用"功能时数据刷新频率 |


