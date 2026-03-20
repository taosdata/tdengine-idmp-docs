---
title: API de eventos
sidebar_label: API de eventos
---

`EventResourceApi` proporciona operaciones de consulta y gestión de eventos.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.5.3 API de eventos

## Lista de métodos

| Método | HTTP | Descripción |
|---|---|---|
| `apiV1EventsGet` | GET /api/v1/events | Consulta paginada de la lista de eventos |
| `apiV1EventsIdGet` | GET /api/v1/events/\{id\} | Obtener un solo evento por ID |
| `apiV1EventsIdAcknowledgePut` | PUT /api/v1/events/\{id\}/acknowledge | Reconocer un evento |
| `apiV1EventsIdResolvePut` | PUT /api/v1/events/\{id\}/resolve | Resolver un evento |

---

## Consultar lista de eventos

Devuelve una lista paginada de eventos con filtrado opcional por rango de tiempo, estado, severidad y elemento.

### Parámetros

| Nombre | Tipo | Requerido | Descripción |
|---|---|---|---|
| from | long | No | Tiempo de inicio, marca de tiempo Unix en milisegundos |
| to | long | No | Tiempo de fin, marca de tiempo Unix en milisegundos |
| status | string | No | Estado del evento: `active`, `acknowledged`, `resolved` |
| severity | string | No | Nivel de severidad: `critical`, `warning`, `info` |
| elementId | string | No | Filtrar por ID de elemento |
| pageNum | integer | No | Número de página |
| pageSize | integer | No | Registros por página |

### Ejemplo

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
// Query unacknowledged critical events in the last 24 hours
// EventResourceApi eventApi = apiClient.buildClient(EventResourceApi.class);
// {QUERY_PARAMS_CLASS} params = new {QUERY_PARAMS_CLASS}()
//     .from(System.currentTimeMillis() - 86400_000L)
//     .status("active")
//     .severity("critical");
// PageOfEventDTO events = eventApi.apiV1EventsGet(params);
// System.out.println("Critical events: " + events.getTotal());
```

</TabItem>
<TabItem value="python" label="Python">

```python
import time

event_api = idmp_sdk.EventResourceApi(api_client)

# Query unacknowledged critical events in the last 24 hours
# events = event_api.api_v1_events_get(
#     from_ts=int(time.time() * 1000) - 86400 * 1000,
#     status="active",
#     severity="critical"
# )
# print(f"Critical events: {events.total}")
```

</TabItem>
</Tabs>

:::note
Para las firmas de métodos y parámetros completos, consulte el archivo de especificación OpenAPI (`idmp-v1.0.14.2.json`) incluido en el paquete del SDK, o explore el Swagger UI en `/swagger-ui.html` en su servidor IDMP.
:::
