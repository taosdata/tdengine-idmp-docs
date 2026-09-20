---
title: Metrics API
sidebar_label: Metrics API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IdmpSdkVersion from "/src/components/IdmpSdkVersion";

# 15.1.5.2 Metrics API

`MetricsResourceApi` queries real-time observability metrics for the IDMP service.

## Method List

| Java Method | Python Method | HTTP | Description |
|---|---|---|---|
| `apiV1ObservabilityMetricsGet` | `api_v1_observability_metrics_get` | GET /api/v1/observability/metrics | Query real-time observability metrics |

---

## Query Real-Time Observability Metrics

Returns real-time observability metrics for the IDMP service.

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| metricCodes | string | No | Filter by metric code; omit to query all available metrics |

**Returns:** `MetricsDTO`

### Example

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
The `2.0.0.10` SDK has no `MetricResourceApi` or methods for metric history, latest values, or writing metric data. Do not use the `api_v1_metrics_*` methods from earlier documentation.
:::

:::note
For the complete method signatures and parameters, refer to the OpenAPI spec file (<code>idmp-v<IdmpSdkVersion />.json</code>) included in the SDK package, or browse the Swagger UI at `/swagger-ui.html` on your IDMP server.
:::
