---
title: Elements API
sidebar_label: Elements API
---

# 15.1.5.1 Elements API


`ElementResourceApi` provides query, create, update, and delete operations on elements.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Method List

| Method | HTTP | Description |
|---|---|---|
| `apiV1ElementsGet` | GET /api/v1/elements | Paginated query of the element list |
| `apiV1ElementsIdGet` | GET /api/v1/elements/\{id\} | Get a single element by ID |
| `apiV1ElementsPost` | POST /api/v1/elements | Create an element |
| `apiV1ElementsIdPut` | PUT /api/v1/elements/\{id\} | Update an element |
| `apiV1ElementsIdDelete` | DELETE /api/v1/elements/\{id\} | Delete an element |

---

## apiV1ElementsGet — Query Element List

Returns a paginated list of elements accessible to the current user, with optional filtering by name or parent element.

### Parameters

| Name | Type | Required | Default | Description |
|---|---|---|---|---|
| pageNum | integer | No | 1 | Page number, 1-based |
| pageSize | integer | No | 20 | Records per page |
| parentId | string | No | — | Filter by parent element ID |
| name | string | No | — | Fuzzy search by element name |

**Returns:** `PageOfBasicElementDTO`

### Example

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
ElementResourceApi elementApi = apiClient.buildClient(ElementResourceApi.class);
ApiV1ElementsGetQueryParams params = new ApiV1ElementsGetQueryParams()
    .pageNum(1)
    .pageSize(50);
PageOfBasicElementDTO result = elementApi.apiV1ElementsGet(params);
System.out.println("Total elements: " + result.getTotal());
```

</TabItem>
<TabItem value="python" label="Python">

```python
element_api = idmp_sdk.ElementResourceApi(api_client)
result = element_api.api_v1_elements_get(page_num=1, page_size=50)
print(f"Total elements: {result.total}")
for elem in result.data:
    print(f"  {elem.id}: {elem.name}")
```

</TabItem>
</Tabs>

---

## apiV1ElementsIdGet — Get Single Element

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| id | string | Yes | Element ID |

**Returns:** `ElementDTO`

**Throws:** `ApiException(404)` — element not found

### Example

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
ElementDTO element = elementApi.apiV1ElementsIdGet("element-id-123");
System.out.println(element.getName());
```

</TabItem>
<TabItem value="python" label="Python">

```python
element = element_api.api_v1_elements_id_get("element-id-123")
print(element.name)
```

</TabItem>
</Tabs>

---

:::note
For the full parameter reference for create, update, and delete methods, see the OpenAPI spec file or the Swagger UI at `/swagger-ui.html` on your IDMP server.
:::
