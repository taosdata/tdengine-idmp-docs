---
title: 指标 API
sidebar_label: 指标 API
---

`MetricResourceApi` 提供时序数据的读写操作，是 SDK 中最常用的模块之一。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.5.2 指标 API

## 方法列表

| 方法 | HTTP | 说明 |
|---|---|---|
| `apiV1MetricsGet` | GET /api/v1/metrics | 查询指标列表 |
| `apiV1MetricsIdHistoryGet` | GET /api/v1/metrics/\{id\}/history | 查询指标历史数据 |
| `apiV1MetricsIdLatestGet` | GET /api/v1/metrics/\{id\}/latest | 查询指标最新值 |
| `apiV1MetricsIdDataPost` | POST /api/v1/metrics/\{id\}/data | 向指标写入数据 |

---

## 查询历史数据

返回指定时间范围内的指标数据，支持可选聚合。

### 参数

| 名称 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | string | 是 | 指标 ID |
| from | long | 是 | 开始时间，Unix 毫秒时间戳 |
| to | long | 是 | 结束时间，Unix 毫秒时间戳 |
| interval | string | 否 | 聚合时间窗口，如 `1m`、`1h`。省略则返回原始数据。 |
| aggregate | string | 否 | 聚合函数：`avg`、`max`、`min`、`sum` |

**返回：** `MetricDataDTO`

### 示例

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

## 查询最新值

返回指标最近一个数据点，适用于实时监控场景。

### 示例

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
完整的方法签名和参数请参考 SDK 包中的 OpenAPI 规范文件（`idmp-v1.0.14.2.json`），或在您的 IDMP 服务器上访问 `/swagger-ui.html` 浏览 Swagger UI。
:::
