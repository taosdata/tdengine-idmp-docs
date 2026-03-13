# 指标 API

`MetricResourceApi` 提供时序数据的读取与写入操作，是 SDK 中使用频率最高的模块之一。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 方法列表

| 方法 | HTTP | 说明 |
|---|---|---|
| {METHOD_NAME} | GET /api/v1/metrics | {DESCRIPTION} |
| {METHOD_NAME} | GET /api/v1/metrics/{id}/history | 查询指标历史数据 |
| {METHOD_NAME} | GET /api/v1/metrics/{id}/latest | 查询指标最新值 |
| {METHOD_NAME} | POST /api/v1/metrics/{id}/data | 写入指标数据 |

---

## 查询历史数据

查询指定时间范围内的指标数据，支持聚合计算。

### 参数

| 名称 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | string | 是 | 指标 ID |
| from | long | 是 | 开始时间，Unix 毫秒时间戳 |
| to | long | 是 | 结束时间，Unix 毫秒时间戳 |
| interval | string | 否 | 聚合时间窗口，如 `1m`、`1h`，不填则返回原始数据 |
| aggregate | string | 否 | 聚合函数，如 `avg`、`max`、`min`、`sum` |

**返回值** `MetricDataDTO`

### 示例

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
// TODO: 补充实际方法名和参数类名
// 查询最近 1 小时、每分钟平均值
long now = System.currentTimeMillis();
long oneHourAgo = now - 3600_000L;

// {METHOD_CALL}
```

</TabItem>
<TabItem value="python" label="Python">

```python
import time

metric_api = idmp_sdk.MetricResourceApi(api_client)

now_ms = int(time.time() * 1000)
one_hour_ago_ms = now_ms - 3600 * 1000

# TODO: 补充实际方法名和参数
# result = metric_api.{METHOD_NAME}(
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

返回指标的最新一条数据，适用于实时监控场景。

### 示例

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
// TODO: 补充实际方法名
// LatestValueDTO latest = metricApi.{METHOD_NAME}("metric-id-123");
// System.out.println("最新值: " + latest.getValue() + " @ " + latest.getTimestamp());
```

</TabItem>
<TabItem value="python" label="Python">

```python
# TODO: 补充实际方法名
# latest = metric_api.{METHOD_NAME}("metric-id-123")
# print(f"最新值: {latest.value} @ {latest.timestamp}")
```

</TabItem>
</Tabs>

:::note
本页部分方法名称和参数需根据实际 OpenAPI 规范填充（用 `{placeholder}` 标记）。请参阅 SDK 压缩包中的 `idmp-v{SDK_VERSION}.json` 获取完整规范。
:::
