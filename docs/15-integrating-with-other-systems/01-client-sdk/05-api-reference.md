---
title: API 参考
sidebar_label: API 参考
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IdmpSdkVersion from "/src/components/IdmpSdkVersion";

# 15.1.5 API 参考

:::caution 非完整 API 参考
本节列举的 API 是从 SDK 示例中总结出来的常用方法，**并非完整的 API 参考**。每个模块仅列出了部分代表性方法，且仅对少数方法给出了完整的参数说明。

如需获取**完整**的 API 文档，请从官网下载 SDK 源码包，其中包含完整的 OpenAPI 规范文件（<code>idmp-v<IdmpSdkVersion />.json</code>）。

- 中文下载中心：[https://www.taosdata.com/download-center](https://www.taosdata.com/download-center)
- 英文下载中心：[https://tdengine.com/downloads](https://tdengine.com/downloads)
:::

Java 与 Python SDK 的方法名遵循各自语言的生成规则。调用时请使用对应语言列中的名称。

## 元素 API（`ElementResourceApi`）

`ElementResourceApi` 提供对元素的查询、创建、更新和删除操作。

### 方法列表

| Java 方法 | Python 方法 | HTTP | 说明 |
|---|---|---|---|
| `apiV1ElementsGet` | `api_v1_elements_get` | GET /api/v1/elements | 分页查询元素列表 |
| `apiV1ElementsElementIdGet` | `api_v1_elements_element_id_get` | GET /api/v1/elements/\{elementId\} | 根据 ID 获取单个元素 |
| `apiV1ElementsPost` | `api_v1_elements_post` | POST /api/v1/elements | 创建元素 |
| `apiV1ElementsElementIdPut` | `api_v1_elements_element_id_put` | PUT /api/v1/elements/\{elementId\} | 更新元素 |
| `apiV1ElementsElementIdDelete` | `api_v1_elements_element_id_delete` | DELETE /api/v1/elements/\{elementId\} | 删除元素 |

### 查询元素列表（`apiV1ElementsGet`）

返回当前用户可访问的元素分页列表，支持按名称或父元素可选过滤。

| 名称 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| current | integer | 否 | 1 | 页码，从 1 开始 |
| size | integer | 否 | 20 | 每页记录数 |
| parentId | integer | 否 | — | 按父元素 ID 过滤 |
| keyword | string | 否 | — | 按关键字过滤 |

**返回：** `PageOfBasicElementDTO`

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
ElementResourceApi elementApi = apiClient.buildClient(ElementResourceApi.class);
ApiV1ElementsGetQueryParams params = new ApiV1ElementsGetQueryParams()
    .current(1)
    .size(50);
PageOfBasicElementDTO result = elementApi.apiV1ElementsGet(params);
System.out.println("Total elements: " + result.getTotal());
```

</TabItem>
<TabItem value="python" label="Python">

```python
element_api = idmp_sdk.ElementResourceApi(api_client)
result = element_api.api_v1_elements_get(current=1, size=50)
print(f"Total elements: {result.total}")
for elem in result.rows or []:
    print(f"  {elem.id}: {elem.name}")
```

</TabItem>
</Tabs>

### 获取单个元素（`apiV1ElementsElementIdGet`）

| 名称 | 类型 | 必填 | 说明 |
|---|---|---|---|
| elementId | integer | 是 | 元素 ID |

**返回：** `ElementDTO`

**抛出：** `ApiException(404)`——元素未找到

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
ElementDTO element = elementApi.apiV1ElementsElementIdGet(123L);
System.out.println(element.getName());
```

</TabItem>
<TabItem value="python" label="Python">

```python
element = element_api.api_v1_elements_element_id_get(123)
print(element.name)
```

</TabItem>
</Tabs>

:::note
创建、更新和删除方法的完整参数参考请查看 SDK 源码包中的 OpenAPI 规范文件。
:::

## 指标 API（`MetricsResourceApi`）

`MetricsResourceApi` 提供 IDMP 服务实时可观测性指标查询。

### 方法列表

| Java 方法 | Python 方法 | HTTP | 说明 |
|---|---|---|---|
| `apiV1ObservabilityMetricsGet` | `api_v1_observability_metrics_get` | GET /api/v1/observability/metrics | 查询实时可观测性指标 |

### 查询实时可观测性指标（`apiV1ObservabilityMetricsGet`）

返回 IDMP 服务的实时可观测性指标。

| 名称 | 类型 | 必填 | 说明 |
|---|---|---|---|
| metricCodes | string | 否 | 按指标代码过滤；省略时查询全部可用指标 |

**返回：** `MetricsDTO`

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
MetricsResourceApi metricsApi = apiClient.buildClient(MetricsResourceApi.class);
MetricsDTO result = metricsApi.apiV1ObservabilityMetricsGet(null);
System.out.println(result);
```

</TabItem>
<TabItem value="python" label="Python">

```python
metrics_api = idmp_sdk.MetricsResourceApi(api_client)
result = metrics_api.api_v1_observability_metrics_get()
print(result)
```

</TabItem>
</Tabs>

:::note
`2.0.0.10` SDK 中没有 `MetricResourceApi`，也没有指标历史、最新值或写入数据的方法。请勿使用旧版文档中的 `api_v1_metrics_*` 方法。
:::

## 事件 API（`EventResourceApi`）

`EventResourceApi` 提供事件的查询和管理操作。

### 方法列表

| Java 方法 | Python 方法 | HTTP | 说明 |
|---|---|---|---|
| `apiV1EventsGet` | `api_v1_events_get` | GET /api/v1/events | 分页查询事件列表 |
| `apiV1EventsEventIdGet` | `api_v1_events_event_id_get` | GET /api/v1/events/\{eventId\} | 根据 ID 获取单个事件 |
| `apiV1EventsEventIdConfirmPatch` | `api_v1_events_event_id_confirm_patch` | PATCH /api/v1/events/\{eventId\}/confirm | 确认事件 |
| `apiV1EventsEventIdDelete` | `api_v1_events_event_id_delete` | DELETE /api/v1/events/\{eventId\} | 删除事件 |

### 查询事件列表（`apiV1EventsGet`）

返回事件的分页列表，支持按时间范围、状态、严重级别和元素可选过滤。

| 名称 | 类型 | 必填 | 说明 |
|---|---|---|---|
| fromTime | long | 否 | 开始时间，Unix 毫秒时间戳 |
| toTime | long | 否 | 结束时间，Unix 毫秒时间戳 |
| status | EventStatus | 否 | 按事件状态过滤 |
| elementId | integer | 否 | 按元素 ID 过滤 |
| current | integer | 否 | 页码，从 1 开始 |
| size | integer | 否 | 每页记录数 |

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
完整的方法签名和参数请参考 SDK 源码包中的 OpenAPI 规范文件（<code>idmp-v<IdmpSdkVersion />.json</code>）。
:::
