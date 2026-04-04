---
title: Elements API
sidebar_label: Elements API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.5.1 Elements API

`ElementResourceApi` provides query, create, update, and delete operations on elements.

## Method List

The following methods are available on `ElementResourceApi`.

<table>
<colgroup><col style="width:14em"/><col/><col/></colgroup>
<thead><tr><th>Method</th><th>HTTP</th><th>Description</th></tr></thead>
<tbody>
<tr><td><code>apiV1ElementsGet</code></td><td>GET /api/v1/elements</td><td>Paginated query of the element list</td></tr>
<tr><td><code>apiV1ElementsIdGet</code></td><td>GET /api/v1/elements/\{id\}</td><td>Get a single element by ID</td></tr>
<tr><td><code>apiV1ElementsPost</code></td><td>POST /api/v1/elements</td><td>Create an element</td></tr>
<tr><td><code>apiV1ElementsIdPut</code></td><td>PUT /api/v1/elements/\{id\}</td><td>Update an element</td></tr>
<tr><td><code>apiV1ElementsIdDelete</code></td><td>DELETE /api/v1/elements/\{id\}</td><td>Delete an element</td></tr>
</tbody>
</table>

---

## apiV1ElementsGet — Query Element List

Returns a paginated list of elements accessible to the current user, with optional filtering by name or parent element.

### Parameters

<table>
<colgroup><col style="width:7em"/><col/><col/><col/><col/></colgroup>
<thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
<tbody>
<tr><td>pageNum</td><td>integer</td><td>No</td><td>1</td><td>Page number, 1-based</td></tr>
<tr><td>pageSize</td><td>integer</td><td>No</td><td>20</td><td>Records per page</td></tr>
<tr><td>parentId</td><td>string</td><td>No</td><td>—</td><td>Filter by parent element ID</td></tr>
<tr><td>name</td><td>string</td><td>No</td><td>—</td><td>Fuzzy search by element name</td></tr>
</tbody>
</table>

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

<table>
<colgroup><col style="width:5em"/><col/><col/><col/></colgroup>
<thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td>id</td><td>string</td><td>Yes</td><td>Element ID</td></tr>
</tbody>
</table>

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
