---
title: Core Concepts
sidebar_label: Core Concepts
---

# 15.1.4 Core Concepts


SDK objects map one-to-one with IDMP product concepts. Understanding these mappings helps you quickly locate the API you need.

## Object Mapping

| SDK Class / Module | IDMP Concept | Description |
|---|---|---|
| `ApiClient` | — | SDK entry point; manages connection, authentication, and request dispatch |
| `ElementResourceApi` | Element | Nodes in the asset tree: equipment, systems, areas |
| `AttributeResourceApi` | Attribute | Named properties of an element; can be bound to time-series data or static values |
| `MetricResourceApi` | Metric | Time-series data stream from an attribute's historical and real-time data |
| `EventResourceApi` | Event | Alarm or state-change records triggered by analysis rules |
| `PanelResourceApi` | Panel | Visualization chart associated with an element |
| `UserResourceApi` | User | User management and authentication |
| `UomResourceApi` | UOM | Unit of measurement classes and conversions |

## Data Access Hierarchy

IDMP SDK data access follows this hierarchy:

```text
Element
  └─ Attribute
       └─ Time-Series Data (Metric)
```

**Typical data read flow:**

1. Use `ElementResourceApi` to find the target element (by name, path, or ID).
2. Use the element ID to query its attribute list (`AttributeResourceApi`).
3. Use the attribute ID to query time-series data (`MetricResourceApi`).

## Pagination

All list endpoints support pagination. The response format is:

```json
{
  "data": [...],        // records on the current page
  "total": 100,         // total record count
  "pageNum": 1,         // current page number (1-based)
  "pageSize": 20        // records per page
}
```

Control pagination with the `pageNum` and `pageSize` query parameters:

```python
# Python example
result = element_api.api_v1_elements_get(page_num=1, page_size=50)
```

## Request and Response Structure

All API responses follow a consistent format:

```json
{
  "code": 0,            // 0 = success; non-zero = error
  "message": "success", // status description
  "data": { ... }       // actual response payload
}
```

When `code` is non-zero, the SDK raises an `ApiException`. See [Error Handling](./07-error-handling.md) for details.

## Time Format

All time parameters and return values use **Unix timestamps in milliseconds** (UTC).

```python
import time

# Query the last 1 hour of data
now_ms = int(time.time() * 1000)
one_hour_ago_ms = now_ms - 3600 * 1000
```
