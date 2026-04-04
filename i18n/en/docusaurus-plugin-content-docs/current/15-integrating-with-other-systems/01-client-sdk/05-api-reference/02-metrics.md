---
title: Metrics API
sidebar_label: Metrics API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IdmpSdkVersion from "/src/components/IdmpSdkVersion";

# 15.1.5.2 Metrics API

`MetricResourceApi` provides read and write operations on time-series data. It is one of the most frequently used modules in the SDK.

## Method List

The following methods are available on `MetricResourceApi`.

<table>
<colgroup><col style="width:16em"/><col/><col/></colgroup>
<thead><tr><th>Method</th><th>HTTP</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>apiV1MetricsGet</code></td><td>GET /api/v1/metrics</td><td>Query the metric list</td></tr>
<tr><td><code>apiV1MetricsIdHistoryGet</code></td><td>GET /api/v1/metrics/\{id\}/history</td><td>Query historical data for a metric</td></tr>
<tr><td><code>apiV1MetricsIdLatestGet</code></td><td>GET /api/v1/metrics/\{id\}/latest</td><td>Query the latest value of a metric</td></tr>
<tr><td><code>apiV1MetricsIdDataPost</code></td><td>POST /api/v1/metrics/\{id\}/data</td><td>Write data to a metric</td></tr>
</tbody>
</table>

---

## Query Historical Data

Returns metric data within a specified time range, with optional aggregation.

### Parameters

<table>
<colgroup><col style="width:7em"/><col/><col/><col/></colgroup>
<thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>id</td><td>string</td><td>Yes</td><td>Metric ID</td></tr>
<tr><td>from</td><td>long</td><td>Yes</td><td>Start time, Unix millisecond timestamp</td></tr>
<tr><td>to</td><td>long</td><td>Yes</td><td>End time, Unix millisecond timestamp</td></tr>
<tr><td>interval</td><td>string</td><td>No</td><td>Aggregation time window, e.g. <code>1m</code>, <code>1h</code>. Omit to return raw data.</td></tr>
<tr><td>aggregate</td><td>string</td><td>No</td><td>Aggregation function: <code>avg</code>, <code>max</code>, <code>min</code>, <code>sum</code></td></tr>
</tbody>
</table>

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
For the complete method signatures and parameters, refer to the OpenAPI spec file (<code>idmp-v<IdmpSdkVersion />.json</code>) included in the SDK package, or browse the Swagger UI at `/swagger-ui.html` on your IDMP server.
:::
