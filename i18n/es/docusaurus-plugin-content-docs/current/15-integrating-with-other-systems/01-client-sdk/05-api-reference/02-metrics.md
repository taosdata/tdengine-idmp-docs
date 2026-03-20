---
title: API de métricas
sidebar_label: API de métricas
---

`MetricResourceApi` proporciona operaciones de lectura y escritura sobre datos de series temporales. Es uno de los módulos más utilizados del SDK.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.5.2 API de métricas

## Lista de métodos

| Método | HTTP | Descripción |
|---|---|---|
| `apiV1MetricsGet` | GET /api/v1/metrics | Consultar la lista de métricas |
| `apiV1MetricsIdHistoryGet` | GET /api/v1/metrics/\{id\}/history | Consultar datos históricos de una métrica |
| `apiV1MetricsIdLatestGet` | GET /api/v1/metrics/\{id\}/latest | Consultar el valor más reciente de una métrica |
| `apiV1MetricsIdDataPost` | POST /api/v1/metrics/\{id\}/data | Escribir datos en una métrica |

---

## Consultar datos históricos

Devuelve los datos de la métrica dentro de un rango de tiempo especificado, con agregación opcional.

### Parámetros

| Nombre | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | string | Sí | ID de la métrica |
| from | long | Sí | Tiempo de inicio, marca de tiempo Unix en milisegundos |
| to | long | Sí | Tiempo de fin, marca de tiempo Unix en milisegundos |
| interval | string | No | Ventana de tiempo de agregación, p. ej. `1m`, `1h`. Omita para devolver datos sin procesar. |
| aggregate | string | No | Función de agregación: `avg`, `max`, `min`, `sum` |

**Devuelve:** `MetricDataDTO`

### Ejemplo

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

## Consultar valor más reciente

Devuelve el punto de datos más reciente de una métrica. Adecuado para escenarios de monitoreo en tiempo real.

### Ejemplo

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
Para las firmas de métodos y parámetros completos, consulte el archivo de especificación OpenAPI (`idmp-v1.0.14.2.json`) incluido en el paquete del SDK, o explore el Swagger UI en `/swagger-ui.html` en su servidor IDMP.
:::
