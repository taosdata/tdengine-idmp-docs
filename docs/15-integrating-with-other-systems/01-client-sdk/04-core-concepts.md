---
title: 核心概念
sidebar_label: 核心概念
---

SDK 对象与 IDMP 产品概念一一对应。理解这些映射关系有助于快速找到所需的 API。

## 对象映射

| SDK 类 / 模块 | IDMP 概念 | 说明 |
|---|---|---|
| `ApiClient` | — | SDK 入口点；管理连接、认证和请求分发 |
| `ElementResourceApi` | 元素 | 资产树中的节点：设备、系统、区域 |
| `AttributeResourceApi` | 属性 | 元素的命名属性；可绑定时序数据或静态值 |
| `MetricResourceApi` | 指标 | 来自属性历史数据和实时数据的时序数据流 |
| `EventResourceApi` | 事件 | 由分析规则触发的告警或状态变化记录 |
| `PanelResourceApi` | 面板 | 与元素关联的可视化图表 |
| `UserResourceApi` | 用户 | 用户管理与认证 |
| `UomResourceApi` | 计量单位 | 计量单位分类与换算 |

## 数据访问层级

IDMP SDK 的数据访问遵循以下层级：

```text
元素（Element）
  └─ 属性（Attribute）
       └─ 时序数据（Metric）
```

**典型数据读取流程：**

1. 使用 `ElementResourceApi` 找到目标元素（通过名称、路径或 ID）。
2. 使用元素 ID 查询其属性列表（`AttributeResourceApi`）。
3. 使用属性 ID 查询时序数据（`MetricResourceApi`）。

## 分页

所有列表端点均支持分页，响应格式如下：

```json
{
  "data": [...],        // 当前页的记录
  "total": 100,         // 总记录数
  "pageNum": 1,         // 当前页码（从 1 开始）
  "pageSize": 20        // 每页记录数
}
```

使用 `pageNum` 和 `pageSize` 查询参数控制分页：

```python
# Python 示例
result = element_api.api_v1_elements_get(page_num=1, page_size=50)
```

## 请求与响应结构

所有 API 响应遵循统一格式：

```json
{
  "code": 0,            // 0 = 成功；非零 = 错误
  "message": "success", // 状态说明
  "data": { ... }       // 实际响应数据
}
```

当 `code` 为非零值时，SDK 会抛出 `ApiException`。详见 [错误处理](./07-error-handling.md)。

## 时间格式

所有时间参数和返回值均使用 **Unix 毫秒时间戳**（UTC）。

```python
import time

# 查询最近 1 小时的数据
now_ms = int(time.time() * 1000)
one_hour_ago_ms = now_ms - 3600 * 1000
```
