# Metrics API

`MetricResourceApi` provides read and write access to time-series data — one of the most frequently used modules.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Method Summary

| Method | HTTP | Description |
|---|---|---|
| {METHOD_NAME} | GET /api/v1/metrics | List metrics |
| {METHOD_NAME} | GET /api/v1/metrics/{id}/history | Query historical data |
| {METHOD_NAME} | GET /api/v1/metrics/{id}/latest | Get latest value |
| {METHOD_NAME} | POST /api/v1/metrics/{id}/data | Write data points |

---

## Query Historical Data

Query data points within a time range, with optional aggregation.

**Parameters**

| Name | Type | Required | Description |
|---|---|---|---|
| id | string | Yes | Metric ID |
| from | long | Yes | Start time, Unix milliseconds |
| to | long | Yes | End time, Unix milliseconds |
| interval | string | No | Aggregation window, e.g. `1m`, `1h`. Omit for raw data. |
| aggregate | string | No | Aggregation function: `avg`, `max`, `min`, `sum` |

**Returns** `MetricDataDTO`

**Example**

<Tabs groupId="language">
<TabItem value="python" label="Python">

```python
import time

metric_api = idmp_sdk.MetricResourceApi(api_client)

now_ms = int(time.time() * 1000)
one_hour_ago_ms = now_ms - 3600 * 1000

# TODO: fill in actual method name from OpenAPI spec
# result = metric_api.{METHOD_NAME}(
#     id="metric-id-123",
#     from_ts=one_hour_ago_ms,
#     to_ts=now_ms,
#     interval="1m",
#     aggregate="avg"
# )
```

</TabItem>
<TabItem value="java" label="Java">

```java
// TODO: fill in actual method name from OpenAPI spec
```

</TabItem>
</Tabs>

:::note
Method names marked `{METHOD_NAME}` need to be filled in from the OpenAPI spec (`idmp-v{SDK_VERSION}.json`).
:::
