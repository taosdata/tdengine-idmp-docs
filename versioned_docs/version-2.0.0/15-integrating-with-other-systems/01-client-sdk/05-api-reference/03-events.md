---
title: 事件 API
sidebar_label: 事件 API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IdmpSdkVersion from "/src/components/IdmpSdkVersion";

# 15.1.5.3 事件 API

`EventResourceApi` 提供事件的查询和管理操作。

## 方法列表

Java 与 Python SDK 的方法名遵循各自语言的生成规则。调用时请使用对应语言列中的名称。

| Java 方法 | Python 方法 | HTTP | 说明 |
|---|---|---|---|
| `apiV1EventsGet` | `api_v1_events_get` | GET /api/v1/events | 分页查询事件列表 |
| `apiV1EventsEventIdGet` | `api_v1_events_event_id_get` | GET /api/v1/events/\{eventId\} | 根据 ID 获取单个事件 |
| `apiV1EventsEventIdConfirmPatch` | `api_v1_events_event_id_confirm_patch` | PATCH /api/v1/events/\{eventId\}/confirm | 确认事件 |
| `apiV1EventsEventIdDelete` | `api_v1_events_event_id_delete` | DELETE /api/v1/events/\{eventId\} | 删除事件 |

---

## 查询事件列表

返回事件的分页列表，支持按时间范围、状态、严重级别和元素可选过滤。

### 参数

| 名称 | 类型 | 必填 | 说明 |
|---|---|---|---|
| fromTime | long | 否 | 开始时间，Unix 毫秒时间戳 |
| toTime | long | 否 | 结束时间，Unix 毫秒时间戳 |
| status | EventStatus | 否 | 按事件状态过滤 |
| elementId | integer | 否 | 按元素 ID 过滤 |
| current | integer | 否 | 页码，从 1 开始 |
| size | integer | 否 | 每页记录数 |

### 示例

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
EventResourceApi eventApi = apiClient.buildClient(EventResourceApi.class);
ApiV1EventsGetQueryParams params = new ApiV1EventsGetQueryParams()
    .current(1)
    .size(50)
    .fromTime(System.currentTimeMillis() - 86400_000L);
PageOfEventDetailDTO events = eventApi.apiV1EventsGet(params);
System.out.println("Events: " + events.getTotal());
```

</TabItem>
<TabItem value="python" label="Python">

```python
import time

event_api = idmp_sdk.EventResourceApi(api_client)

# Query events from the last 24 hours
events = event_api.api_v1_events_get(
    current=1,
    size=50,
    from_time=int(time.time() * 1000) - 86400 * 1000
)
print(f"Events: {events.total}")
```

</TabItem>
</Tabs>

:::note
完整的方法签名和参数请参考 SDK 包中的 OpenAPI 规范文件（<code>idmp-v<IdmpSdkVersion />.json</code>），或在您的 IDMP 服务器上访问 `/swagger-ui.html` 浏览 Swagger UI。
:::
