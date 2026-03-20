---
title: 事件 API
sidebar_label: 事件 API
---

`EventResourceApi` 提供事件的查询和管理操作。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.5.3 事件 API

## 方法列表

| 方法 | HTTP | 说明 |
|---|---|---|
| `apiV1EventsGet` | GET /api/v1/events | 分页查询事件列表 |
| `apiV1EventsIdGet` | GET /api/v1/events/\{id\} | 根据 ID 获取单个事件 |
| `apiV1EventsIdAcknowledgePut` | PUT /api/v1/events/\{id\}/acknowledge | 确认事件 |
| `apiV1EventsIdResolvePut` | PUT /api/v1/events/\{id\}/resolve | 解决事件 |

---

## 查询事件列表

返回事件的分页列表，支持按时间范围、状态、严重级别和元素可选过滤。

### 参数

| 名称 | 类型 | 必填 | 说明 |
|---|---|---|---|
| from | long | 否 | 开始时间，Unix 毫秒时间戳 |
| to | long | 否 | 结束时间，Unix 毫秒时间戳 |
| status | string | 否 | 事件状态：`active`、`acknowledged`、`resolved` |
| severity | string | 否 | 严重级别：`critical`、`warning`、`info` |
| elementId | string | 否 | 按元素 ID 过滤 |
| pageNum | integer | 否 | 页码 |
| pageSize | integer | 否 | 每页记录数 |

### 示例

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
// Query unacknowledged critical events in the last 24 hours
// EventResourceApi eventApi = apiClient.buildClient(EventResourceApi.class);
// {QUERY_PARAMS_CLASS} params = new {QUERY_PARAMS_CLASS}()
//     .from(System.currentTimeMillis() - 86400_000L)
//     .status("active")
//     .severity("critical");
// PageOfEventDTO events = eventApi.apiV1EventsGet(params);
// System.out.println("Critical events: " + events.getTotal());
```

</TabItem>
<TabItem value="python" label="Python">

```python
import time

event_api = idmp_sdk.EventResourceApi(api_client)

# Query unacknowledged critical events in the last 24 hours
# events = event_api.api_v1_events_get(
#     from_ts=int(time.time() * 1000) - 86400 * 1000,
#     status="active",
#     severity="critical"
# )
# print(f"Critical events: {events.total}")
```

</TabItem>
</Tabs>

:::note
完整的方法签名和参数请参考 SDK 包中的 OpenAPI 规范文件（`idmp-v1.0.14.3.json`），或在您的 IDMP 服务器上访问 `/swagger-ui.html` 浏览 Swagger UI。
:::
