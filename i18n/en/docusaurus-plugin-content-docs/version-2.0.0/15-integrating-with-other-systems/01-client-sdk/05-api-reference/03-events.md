---
title: Events API
sidebar_label: Events API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IdmpSdkVersion from "/src/components/IdmpSdkVersion";

# 15.1.5.3 Events API

`EventResourceApi` provides query and management operations on events.

## Method List

Java and Python SDK method names follow their respective generated-code conventions. Use the name in the column for your language.

| Java Method | Python Method | HTTP | Description |
|---|---|---|---|
| `apiV1EventsGet` | `api_v1_events_get` | GET /api/v1/events | Paginated query of the event list |
| `apiV1EventsEventIdGet` | `api_v1_events_event_id_get` | GET /api/v1/events/\{eventId\} | Get a single event by ID |
| `apiV1EventsEventIdConfirmPatch` | `api_v1_events_event_id_confirm_patch` | PATCH /api/v1/events/\{eventId\}/confirm | Confirm an event |
| `apiV1EventsEventIdDelete` | `api_v1_events_event_id_delete` | DELETE /api/v1/events/\{eventId\} | Delete an event |

---

## Query Event List

Returns a paginated list of events with optional filtering by time range, status, severity, and element.

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| fromTime | long | No | Start time, Unix millisecond timestamp |
| toTime | long | No | End time, Unix millisecond timestamp |
| status | EventStatus | No | Filter by event status |
| elementId | integer | No | Filter by element ID |
| current | integer | No | Page number, 1-based |
| size | integer | No | Records per page |

### Example

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
For the complete method signatures and parameters, refer to the OpenAPI spec file (<code>idmp-v<IdmpSdkVersion />.json</code>) included in the SDK package, or browse the Swagger UI at `/swagger-ui.html` on your IDMP server.
:::
