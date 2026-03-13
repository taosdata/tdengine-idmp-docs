# Events API

`EventResourceApi` provides querying and management of IDMP events.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Method Summary

| Method | HTTP | Description |
|---|---|---|
| apiV1EventsGet | GET /api/v1/events | List events (paginated) |
| apiV1EventsIdGet | GET /api/v1/events/\{id\} | Get a single event |
| apiV1EventsIdAcknowledgePut | PUT /api/v1/events/\{id\}/acknowledge | Acknowledge an event |
| apiV1EventsIdResolvePut | PUT /api/v1/events/\{id\}/resolve | Resolve an event |

---

## List Events

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| from | long | No | Start time, Unix milliseconds |
| to | long | No | End time, Unix milliseconds |
| status | string | No | `active`, `acknowledged`, `resolved` |
| severity | string | No | `critical`, `warning`, `info` |
| elementId | string | No | Filter by element ID |
| pageNum | integer | No | Page number |
| pageSize | integer | No | Items per page |

### Example

<Tabs groupId="language">
<TabItem value="python" label="Python">

```python
import time

event_api = idmp_sdk.EventResourceApi(api_client)

# TODO: fill in actual method name
# events = event_api.apiV1EventsGet(
#     from_ts=int(time.time() * 1000) - 86400 * 1000,  # last 24h
#     status="active",
#     severity="critical"
# )
# print(f"Found {events.total} critical active events")
```

</TabItem>
<TabItem value="java" label="Java">

```java
// TODO: fill in actual method name and params class
```

</TabItem>
</Tabs>

:::note
Method names marked `{METHOD_NAME}` need to be filled in from the OpenAPI spec file.
:::
