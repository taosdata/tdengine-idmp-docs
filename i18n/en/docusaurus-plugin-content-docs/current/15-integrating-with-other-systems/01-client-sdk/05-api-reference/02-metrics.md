---
title: Metrics API
sidebar_label: Metrics API
---

# 15.1.5.2 Metrics API

`MetricResourceApi` provides read and write operations on time-series data. It is one of the most frequently used modules in the SDK.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Method List

| Method | HTTP | Description |
|---|---|---|
| `apiV1MetricsGet` | GET /api/v1/metrics | Query the metric list |
| `apiV1MetricsIdHistoryGet` | GET /api/v1/metrics/\{id\}/history | Query historical data for a metric |
| `apiV1MetricsIdLatestGet` | GET /api/v1/metrics/\{id\}/latest | Query the latest value of a metric |
| `apiV1MetricsIdDataPost` | POST /api/v1/metrics/\{id\}/data | Write data to a metric |

---

## Query Historical Data

Returns metric data within a specified time range, with optional aggregation.

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| id | string | Yes | Metric ID |
| from | long | Yes | Start time, Unix millisecond timestamp |
| to | long | Yes | End time, Unix millisecond timestamp |
| interval | string | No | Aggregation time window, e.g. `1m`, `1h`. Omit to return raw data. |
| aggregate | string | No | Aggregation function: `avg`, `max`, `min`, `sum` |

**Returns:** `MetricDataDTO`

### Example

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
// Query the last 1 hour, 1-minute average
long now = System.currentTimeMillis();
long oneHourAgo = now - 3600_000L;

// See the OpenAPI spec or Swagger UI for the full method signature
// MetricResourceApi metricApi = apiClient.buildClient(MetricResourceApi.class);
// MetricDataDTO data = metricApi.apiV1MetricsIdHistoryGet(
//     "metric-id-123", oneHourAgo, now, "1m", "avg");
```

</TabItem>
<TabItem value="python" label="Python">

```python
import time

metric_api = idmp_sdk.MetricResourceApi(api_client)

now_ms = int(time.time() * 1000)
one_hour_ago_ms = now_ms - 3600 * 1000

# See the OpenAPI spec or Swagger UI for the full method signature
# result = metric_api.api_v1_metrics_id_history_get(
#     id="metric-id-123",
#     from_ts=one_hour_ago_ms,
#     to_ts=now_ms,
#     interval="1m",
#     aggregate="avg"
# )
```

</TabItem>
</Tabs>

---

## Query Latest Value

Returns the most recent data point for a metric. Suitable for real-time monitoring scenarios.

### Example

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
// See the OpenAPI spec or Swagger UI for the full method signature
// LatestValueDTO latest = metricApi.apiV1MetricsIdLatestGet("metric-id-123");
// System.out.println("Latest value: " + latest.getValue() + " @ " + latest.getTimestamp());
```

</TabItem>
<TabItem value="python" label="Python">

```python
# See the OpenAPI spec or Swagger UI for the full method signature
# latest = metric_api.api_v1_metrics_id_latest_get("metric-id-123")
# print(f"Latest value: {latest.value} @ {latest.timestamp}")
```

</TabItem>
</Tabs>

:::note
For the complete method signatures and parameters, refer to the OpenAPI spec file (`idmp-v1.0.14.1.json`) included in the SDK package, or browse the Swagger UI at `/swagger-ui.html` on your IDMP server.
:::
