---
title: Core Concepts
sidebar_label: Core Concepts
---

# 15.1.4 Core Concepts

SDK objects map one-to-one with IDMP product concepts. Understanding these mappings helps you quickly locate the API you need.

## 15.1.4.1 Object Mapping

Each SDK class corresponds directly to an IDMP product concept, as described in the table below.

<table>
<colgroup><col style="width:14em"/><col/><col/></colgroup>
<thead><tr><th>SDK Class / Module</th><th>IDMP Concept</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>ApiClient</code></td><td>—</td><td>SDK entry point; manages connection, authentication, and request dispatch</td></tr>
<tr><td><code>ElementResourceApi</code></td><td>Element</td><td>Nodes in the asset tree: equipment, systems, areas</td></tr>
<tr><td><code>AttributeResourceApi</code></td><td>Attribute</td><td>Named properties of an element; can be bound to time-series data or static values</td></tr>
<tr><td><code>MetricResourceApi</code></td><td>Metric</td><td>Time-series data stream from an attribute's historical and real-time data</td></tr>
<tr><td><code>EventResourceApi</code></td><td>Event</td><td>Alarm or state-change records triggered by analysis rules</td></tr>
<tr><td><code>PanelResourceApi</code></td><td>Panel</td><td>Visualization chart associated with an element</td></tr>
<tr><td><code>UserResourceApi</code></td><td>User</td><td>User management and authentication</td></tr>
<tr><td><code>UomResourceApi</code></td><td>UOM</td><td>Unit of measurement classes and conversions</td></tr>
</tbody>
</table>

## 15.1.4.2 Data Access Hierarchy

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

## 15.1.4.3 Pagination

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

## 15.1.4.4 Request and Response Structure

All API responses follow a consistent format:

```json
{
  "code": 0,            // 0 = success; non-zero = error
  "message": "success", // status description
  "data": { ... }       // actual response payload
}
```

When `code` is non-zero, the SDK raises an `ApiException`. See [Error Handling](./07-error-handling.md) for details.

## 15.1.4.5 Time Format

All time parameters and return values use **Unix timestamps in milliseconds** (UTC).

```python
import time

# Query the last 1 hour of data
now_ms = int(time.time() * 1000)
one_hour_ago_ms = now_ms - 3600 * 1000
```
