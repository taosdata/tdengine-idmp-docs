---
title: 指标 API
sidebar_label: 指标 API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IdmpSdkVersion from "/src/components/IdmpSdkVersion";

# 15.1.5.2 指标 API

`MetricResourceApi` 提供时序数据的读写操作，是 SDK 中最常用的模块之一。

## 方法列表

<table>
<colgroup><col style="width:16em"/><col/><col/></colgroup>
<thead><tr><th>方法</th><th>HTTP</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>apiV1MetricsGet</code></td><td>GET /api/v1/metrics</td><td>查询指标列表</td></tr>
<tr><td><code>apiV1MetricsIdHistoryGet</code></td><td>GET /api/v1/metrics/\{id\}/history</td><td>查询指标历史数据</td></tr>
<tr><td><code>apiV1MetricsIdLatestGet</code></td><td>GET /api/v1/metrics/\{id\}/latest</td><td>查询指标最新值</td></tr>
<tr><td><code>apiV1MetricsIdDataPost</code></td><td>POST /api/v1/metrics/\{id\}/data</td><td>向指标写入数据</td></tr>
</tbody>
</table>

---

## 查询历史数据

返回指定时间范围内的指标数据，支持可选聚合。

### 参数

<table>
<colgroup><col style="width:7em"/><col/><col/><col/></colgroup>
<thead><tr><th>名称</th><th>类型</th><th>必填</th><th>说明</th></tr></thead>
<tbody>
<tr><td>id</td><td>string</td><td>是</td><td>指标 ID</td></tr>
<tr><td>from</td><td>long</td><td>是</td><td>开始时间，Unix 毫秒时间戳</td></tr>
<tr><td>to</td><td>long</td><td>是</td><td>结束时间，Unix 毫秒时间戳</td></tr>
<tr><td>interval</td><td>string</td><td>否</td><td>聚合时间窗口，如 <code>1m</code>、<code>1h</code>。省略则返回原始数据。</td></tr>
<tr><td>aggregate</td><td>string</td><td>否</td><td>聚合函数：<code>avg</code>、<code>max</code>、<code>min</code>、<code>sum</code></td></tr>
</tbody>
</table>

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
完整的方法签名和参数请参考 SDK 包中的 OpenAPI 规范文件（<code>idmp-v<IdmpSdkVersion />.json</code>），或在您的 IDMP 服务器上访问 `/swagger-ui.html` 浏览 Swagger UI。
:::
