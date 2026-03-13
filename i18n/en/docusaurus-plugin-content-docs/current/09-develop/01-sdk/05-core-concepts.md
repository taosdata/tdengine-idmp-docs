# Core Concepts

SDK objects map one-to-one with IDMP product concepts. Understanding this mapping helps you locate the right API quickly.

## Object Mapping

| SDK Class / Module | IDMP Concept | Description |
|---|---|---|
| `ApiClient` | — | SDK entry point; manages connection, auth, and request dispatch |
| `ElementResourceApi` | Element (元素) | A node in the asset tree — device, system, zone, etc. |
| `AttributeResourceApi` | Attribute (属性) | A named property of an element; can hold time-series or static values |
| `MetricResourceApi` | Metric (指标) | A time-series data stream derived from an attribute |
| `EventResourceApi` | Event (事件) | An alert or state-change record triggered by a rule |
| `PanelResourceApi` | Panel (面板) | A visualization chart attached to an element |
| `UserResourceApi` | User (用户) | User management and authentication |
| `UomResourceApi` | UOM (计量单位) | Unit of measure classes and conversions |

## Data Access Pattern

IDMP data follows this hierarchy:

```bash
Element
  └─ Attribute
       └─ Time-series data (Metric)
```

**Typical read flow:**

1. Use `ElementResourceApi` to find the target element (by name, path, or ID)
2. Use the element ID to query its attributes (`AttributeResourceApi`)
3. Use the attribute ID to query time-series data (`MetricResourceApi`)

## Pagination

All list-returning APIs are paginated. The response shape is:

```json
{
  "data": [...],
  "total": 100,
  "pageNum": 1,
  "pageSize": 20
}
```

Control pagination with `pageNum` and `pageSize` query parameters:

```python
result = element_api.api_v1_elements_get(page_num=1, page_size=50)
```

## Response Envelope

All API responses follow a consistent envelope:

```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```

When `code` is non-zero, the SDK raises `ApiException`. See [Error Handling](./08-error-handling.md).

## Timestamps

All timestamp parameters and return values use **Unix milliseconds (UTC)**:

```python
import time
now_ms = int(time.time() * 1000)
one_hour_ago_ms = now_ms - 3600 * 1000
```
