---
title: 指标 API
sidebar_label: 指标 API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IdmpSdkVersion from "/src/components/IdmpSdkVersion";

# 15.1.5.2 指标 API

`MetricsResourceApi` 提供 IDMP 服务实时可观测性指标查询。

## 方法列表

| Java 方法 | Python 方法 | HTTP | 说明 |
|---|---|---|---|
| `apiV1ObservabilityMetricsGet` | `api_v1_observability_metrics_get` | GET /api/v1/observability/metrics | 查询实时可观测性指标 |

---

## 查询实时可观测性指标

返回 IDMP 服务的实时可观测性指标。

### 参数

| 名称 | 类型 | 必填 | 说明 |
|---|---|---|---|
| metricCodes | string | 否 | 按指标代码过滤；省略时查询全部可用指标 |

**返回：** `MetricsDTO`

### 示例

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
MetricsResourceApi metricsApi = apiClient.buildClient(MetricsResourceApi.class);
MetricsDTO result = metricsApi.apiV1ObservabilityMetricsGet(null);
System.out.println(result);
```

</TabItem>
<TabItem value="python" label="Python">

```python
metrics_api = idmp_sdk.MetricsResourceApi(api_client)
result = metrics_api.api_v1_observability_metrics_get()
print(result)
```

</TabItem>
</Tabs>

---

:::note
`2.0.0.10` SDK 中没有 `MetricResourceApi`，也没有指标历史、最新值或写入数据的方法。请勿使用旧版文档中的 `api_v1_metrics_*` 方法。
:::

:::note
完整的方法签名和参数请参考 SDK 包中的 OpenAPI 规范文件（<code>idmp-v<IdmpSdkVersion />.json</code>），或在您的 IDMP 服务器上访问 `/swagger-ui.html` 浏览 Swagger UI。
:::
