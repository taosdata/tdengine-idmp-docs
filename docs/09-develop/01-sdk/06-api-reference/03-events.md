# 事件 API

`EventResourceApi` 提供事件的查询和管理操作。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 方法列表

| 方法 | HTTP | 说明 |
|---|---|---|
| apiV1EventsGet | GET /api/v1/events | 分页查询事件列表 |
| apiV1EventsIdGet | GET /api/v1/events/\{id\} | 查询单个事件 |
| apiV1EventsIdAcknowledgePut | PUT /api/v1/events/\{id\}/acknowledge | 确认事件 |
| apiV1EventsIdResolvePut | PUT /api/v1/events/\{id\}/resolve | 解决事件 |

---

## 查询事件列表

支持按时间范围、状态、严重程度等条件过滤。

### 参数

| 名称 | 类型 | 必填 | 说明 |
|---|---|---|---|
| from | long | 否 | 开始时间，Unix 毫秒时间戳 |
| to | long | 否 | 结束时间，Unix 毫秒时间戳 |
| status | string | 否 | 事件状态：`active`、`acknowledged`、`resolved` |
| severity | string | 否 | 严重程度：`critical`、`warning`、`info` |
| elementId | string | 否 | 按元素 ID 过滤 |
| pageNum | integer | 否 | 页码 |
| pageSize | integer | 否 | 每页条数 |

### 示例

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
// TODO: 补充实际方法名和参数类名
// 查询最近 24 小时内未确认的 critical 事件
// EventResourceApi eventApi = apiClient.buildClient(EventResourceApi.class);
// {QUERY_PARAMS_CLASS} params = new {QUERY_PARAMS_CLASS}()
//     .from(System.currentTimeMillis() - 86400_000L)
//     .status("active")
//     .severity("critical");
// PageOfEventDTO events = eventApi.apiV1EventsGet(params);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import time

event_api = idmp_sdk.EventResourceApi(api_client)

# TODO: 补充实际方法名
# events = event_api.apiV1EventsGet(
#     from_ts=int(time.time() * 1000) - 86400 * 1000,
#     status="active",
#     severity="critical"
# )
# print(f"发现 {events.total} 个 critical 事件")
```

</TabItem>
</Tabs>

:::note
本页方法名称和参数需根据实际 OpenAPI 规范填充。请参阅 SDK 压缩包中的 `idmp-v{SDK_VERSION}.json`。
:::
