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

`EventResourceApi` 提供以下方法，支持事件的查询、确认和解决操作。

<table>
<colgroup><col style="width:17em"/><col/><col/></colgroup>
<thead><tr><th>方法</th><th>HTTP</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>apiV1EventsGet</code></td><td>GET /api/v1/events</td><td>分页查询事件列表</td></tr>
<tr><td><code>apiV1EventsIdGet</code></td><td>GET /api/v1/events/\{id\}</td><td>根据 ID 获取单个事件</td></tr>
<tr><td><code>apiV1EventsIdAcknowledgePut</code></td><td>PUT /api/v1/events/\{id\}/acknowledge</td><td>确认事件</td></tr>
<tr><td><code>apiV1EventsIdResolvePut</code></td><td>PUT /api/v1/events/\{id\}/resolve</td><td>解决事件</td></tr>
</tbody>
</table>

---

## 查询事件列表

返回事件的分页列表，支持按时间范围、状态、严重级别和元素可选过滤。

### 参数

<table>
<colgroup><col style="width:7em"/><col/><col/><col/></colgroup>
<thead><tr><th>名称</th><th>类型</th><th>必填</th><th>说明</th></tr></thead>
<tbody>
<tr><td>from</td><td>long</td><td>否</td><td>开始时间，Unix 毫秒时间戳</td></tr>
<tr><td>to</td><td>long</td><td>否</td><td>结束时间，Unix 毫秒时间戳</td></tr>
<tr><td>status</td><td>string</td><td>否</td><td>事件状态：<code>active</code>、<code>acknowledged</code>、<code>resolved</code></td></tr>
<tr><td>severity</td><td>string</td><td>否</td><td>严重级别：<code>critical</code>、<code>warning</code>、<code>info</code></td></tr>
<tr><td>elementId</td><td>string</td><td>否</td><td>按元素 ID 过滤</td></tr>
<tr><td>pageNum</td><td>integer</td><td>否</td><td>页码</td></tr>
<tr><td>pageSize</td><td>integer</td><td>否</td><td>每页记录数</td></tr>
</tbody>
</table>

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
完整的方法签名和参数请参考 SDK 包中的 OpenAPI 规范文件（<code>idmp-v<IdmpSdkVersion />.json</code>），或在您的 IDMP 服务器上访问 `/swagger-ui.html` 浏览 Swagger UI。
:::
