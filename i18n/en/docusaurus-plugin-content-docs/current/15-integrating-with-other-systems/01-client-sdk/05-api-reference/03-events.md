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

The following methods are available on `EventResourceApi`.

<table>
<colgroup><col style="width:17em"/><col/><col/></colgroup>
<thead><tr><th>Method</th><th>HTTP</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>apiV1EventsGet</code></td><td>GET /api/v1/events</td><td>Paginated query of the event list</td></tr>
<tr><td><code>apiV1EventsIdGet</code></td><td>GET /api/v1/events/\{id\}</td><td>Get a single event by ID</td></tr>
<tr><td><code>apiV1EventsIdAcknowledgePut</code></td><td>PUT /api/v1/events/\{id\}/acknowledge</td><td>Acknowledge an event</td></tr>
<tr><td><code>apiV1EventsIdResolvePut</code></td><td>PUT /api/v1/events/\{id\}/resolve</td><td>Resolve an event</td></tr>
</tbody>
</table>

---

## Query Event List

Returns a paginated list of events with optional filtering by time range, status, severity, and element.

### Parameters

<table>
<colgroup><col style="width:7em"/><col/><col/><col/></colgroup>
<thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>from</td><td>long</td><td>No</td><td>Start time, Unix millisecond timestamp</td></tr>
<tr><td>to</td><td>long</td><td>No</td><td>End time, Unix millisecond timestamp</td></tr>
<tr><td>status</td><td>string</td><td>No</td><td>Event status: <code>active</code>, <code>acknowledged</code>, <code>resolved</code></td></tr>
<tr><td>severity</td><td>string</td><td>No</td><td>Severity level: <code>critical</code>, <code>warning</code>, <code>info</code></td></tr>
<tr><td>elementId</td><td>string</td><td>No</td><td>Filter by element ID</td></tr>
<tr><td>pageNum</td><td>integer</td><td>No</td><td>Page number</td></tr>
<tr><td>pageSize</td><td>integer</td><td>No</td><td>Records per page</td></tr>
</tbody>
</table>

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
For the complete method signatures and parameters, refer to the OpenAPI spec file (<code>idmp-v<IdmpSdkVersion />.json</code>) included in the SDK package, or browse the Swagger UI at `/swagger-ui.html` on your IDMP server.
:::
