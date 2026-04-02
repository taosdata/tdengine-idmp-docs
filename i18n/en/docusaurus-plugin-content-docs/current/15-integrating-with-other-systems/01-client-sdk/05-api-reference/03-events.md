---
title: Events API
sidebar_label: Events API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.5.3 Events API

`EventResourceApi` provides query and management operations on events.

## Method List

| Method | HTTP | Description |
|---|---|---|
| `apiV1EventsGet` | GET /api/v1/events | Paginated query of the event list |
| `apiV1EventsIdGet` | GET /api/v1/events/\{id\} | Get a single event by ID |
| `apiV1EventsIdAcknowledgePut` | PUT /api/v1/events/\{id\}/acknowledge | Acknowledge an event |
| `apiV1EventsIdResolvePut` | PUT /api/v1/events/\{id\}/resolve | Resolve an event |

---

## Query Event List

Returns a paginated list of events with optional filtering by time range, status, severity, and element.

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| from | long | No | Start time, Unix millisecond timestamp |
| to | long | No | End time, Unix millisecond timestamp |
| status | string | No | Event status: `active`, `acknowledged`, `resolved` |
| severity | string | No | Severity level: `critical`, `warning`, `info` |
| elementId | string | No | Filter by element ID |
| pageNum | integer | No | Page number |
| pageSize | integer | No | Records per page |

### Example

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
For the complete method signatures and parameters, refer to the OpenAPI spec file (`idmp-v1.0.15.2.json`) included in the SDK package, or browse the Swagger UI at `/swagger-ui.html` on your IDMP server.
:::
