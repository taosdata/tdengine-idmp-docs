---
title: API Reference
sidebar_label: API Reference
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IdmpSdkVersion from "/src/components/IdmpSdkVersion";

# 15.1.5 API Reference

:::caution Not a complete API reference
The APIs listed in this section are commonly used methods summarized from the SDK examples, and are **not a complete API reference**. Each module lists only a subset of representative methods, and only a few methods include full parameter descriptions.

For the **complete** API documentation, download the SDK source package from the official website, which includes the full OpenAPI spec file (<code>idmp-v<IdmpSdkVersion />.json</code>).

- Chinese download center: [https://www.taosdata.com/download-center](https://www.taosdata.com/download-center)
- English download center: [https://tdengine.com/downloads](https://tdengine.com/downloads)
:::

Java and Python SDK method names follow their respective generated-code conventions. Use the name in the column for your language.

## Elements API (`ElementResourceApi`)

`ElementResourceApi` provides query, create, update, and delete operations on elements.

### Method List

| Java Method | Python Method | HTTP | Description |
|---|---|---|---|
| `apiV1ElementsGet` | `api_v1_elements_get` | GET /api/v1/elements | Paginated query of the element list |
| `apiV1ElementsElementIdGet` | `api_v1_elements_element_id_get` | GET /api/v1/elements/\{elementId\} | Get a single element by ID |
| `apiV1ElementsPost` | `api_v1_elements_post` | POST /api/v1/elements | Create an element |
| `apiV1ElementsElementIdPut` | `api_v1_elements_element_id_put` | PUT /api/v1/elements/\{elementId\} | Update an element |
| `apiV1ElementsElementIdDelete` | `api_v1_elements_element_id_delete` | DELETE /api/v1/elements/\{elementId\} | Delete an element |

### Query Element List (`apiV1ElementsGet`)

Returns a paginated list of elements accessible to the current user, with optional filtering by name or parent element.

| Name | Type | Required | Default | Description |
|---|---|---|---|---|
| current | integer | No | 1 | Page number, 1-based |
| size | integer | No | 20 | Records per page |
| parentId | integer | No | — | Filter by parent element ID |
| keyword | string | No | — | Filter by keyword |

**Returns:** `PageOfBasicElementDTO`

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

### Get Single Element (`apiV1ElementsElementIdGet`)

| Name | Type | Required | Description |
|---|---|---|---|
| elementId | integer | Yes | Element ID |

**Returns:** `ElementDTO`

**Throws:** `ApiException(404)` — element not found

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
For the full parameter reference for create, update, and delete methods, see the OpenAPI spec file in the SDK source package.
:::

## Metrics API (`MetricsResourceApi`)

`MetricsResourceApi` queries real-time observability metrics for the IDMP service.

### Method List

| Java Method | Python Method | HTTP | Description |
|---|---|---|---|
| `apiV1ObservabilityMetricsGet` | `api_v1_observability_metrics_get` | GET /api/v1/observability/metrics | Query real-time observability metrics |

### Query Real-Time Observability Metrics (`apiV1ObservabilityMetricsGet`)

Returns real-time observability metrics for the IDMP service.

| Name | Type | Required | Description |
|---|---|---|---|
| metricCodes | string | No | Filter by metric code; omit to query all available metrics |

**Returns:** `MetricsDTO`

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
The `2.0.0.10` SDK has no `MetricResourceApi` or methods for metric history, latest values, or writing metric data. Do not use the `api_v1_metrics_*` methods from earlier documentation.
:::

## Events API (`EventResourceApi`)

`EventResourceApi` provides query and management operations on events.

### Method List

| Java Method | Python Method | HTTP | Description |
|---|---|---|---|
| `apiV1EventsGet` | `api_v1_events_get` | GET /api/v1/events | Paginated query of the event list |
| `apiV1EventsEventIdGet` | `api_v1_events_event_id_get` | GET /api/v1/events/\{eventId\} | Get a single event by ID |
| `apiV1EventsEventIdConfirmPatch` | `api_v1_events_event_id_confirm_patch` | PATCH /api/v1/events/\{eventId\}/confirm | Confirm an event |
| `apiV1EventsEventIdDelete` | `api_v1_events_event_id_delete` | DELETE /api/v1/events/\{eventId\} | Delete an event |

### Query Event List (`apiV1EventsGet`)

Returns a paginated list of events with optional filtering by time range, status, severity, and element.

| Name | Type | Required | Description |
|---|---|---|---|
| fromTime | long | No | Start time, Unix millisecond timestamp |
| toTime | long | No | End time, Unix millisecond timestamp |
| status | EventStatus | No | Filter by event status |
| elementId | integer | No | Filter by element ID |
| current | integer | No | Page number, 1-based |
| size | integer | No | Records per page |

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
For the complete method signatures and parameters, refer to the OpenAPI spec file (<code>idmp-v<IdmpSdkVersion />.json</code>) included in the SDK source package.
:::
