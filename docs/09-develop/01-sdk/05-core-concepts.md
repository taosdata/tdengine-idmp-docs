# 核心概念

SDK 中的对象与 IDMP 产品中的概念一一对应。理解这些对应关系有助于您快速找到所需的 API。

## 对象映射表

| SDK 类/模块 | IDMP 概念 | 说明 |
|---|---|---|
| `ApiClient` | — | SDK 入口，管理连接、认证和请求发送 |
| `ElementResourceApi` | 元素（Element） | 资产树中的节点，如设备、系统、区域 |
| `AttributeResourceApi` | 属性（Attribute） | 元素的命名属性，可绑定时序数据或静态值 |
| `MetricResourceApi` | 指标（Metric） | 时序数据流，来源于属性的历史与实时数据 |
| `EventResourceApi` | 事件（Event） | 由规则触发的告警或状态变化记录 |
| `PanelResourceApi` | 面板（Panel） | 可视化图表，附属于元素 |
| `UserResourceApi` | 用户（User） | 用户管理与认证 |
| `UomResourceApi` | 计量单位（UOM） | 单位分类与换算 |

## 数据访问模式

IDMP SDK 的数据访问遵循以下层级：

```bash
元素 (Element)
  └─ 属性 (Attribute)
       └─ 时序数据 (Metric / Time-series)
```

**典型数据读取流程：**

1. 通过 `ElementResourceApi` 找到目标元素（按名称、路径或 ID）
2. 通过元素 ID 查询其属性列表（`AttributeResourceApi`）
3. 通过属性 ID 查询时序数据（`MetricResourceApi`）

## 分页

所有返回列表的接口均支持分页。响应体格式为：

```json
{
  "data": [...],        // 当前页数据
  "total": 100,         // 总记录数
  "pageNum": 1,         // 当前页码（从 1 开始）
  "pageSize": 20        // 每页条数
}
```

查询时通过 `pageNum` 和 `pageSize` 参数控制分页：

```python
# Python 示例
params = {"page_num": 1, "page_size": 50}
result = element_api.api_v1_elements_get(**params)
```

## 请求与响应结构

所有 API 响应遵循统一格式：

```json
{
  "code": 0,            // 0 表示成功，非 0 表示错误
  "message": "success", // 状态描述
  "data": { ... }       // 实际返回数据
}
```

当 `code` 非 0 时，SDK 会抛出 `ApiException`，详见 [错误处理](./08-error-handling.md)。

## 时间格式

所有时间参数和返回值均使用 **Unix 时间戳（毫秒）**，时区为 UTC。

```python
import time

# 查询最近 1 小时的数据
now_ms = int(time.time() * 1000)
one_hour_ago_ms = now_ms - 3600 * 1000
```
