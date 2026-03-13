# Elements API

`ElementResourceApi` provides CRUD operations on elements in the asset tree.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Method Summary

| Method | HTTP | Description |
|---|---|---|
| `apiV1ElementsGet` | GET /api/v1/elements | List elements (paginated) |
| `apiV1ElementsIdGet` | GET /api/v1/elements/\{id\} | Get a single element by ID |
| `apiV1ElementsPost` | POST /api/v1/elements | Create an element |
| `apiV1ElementsIdPut` | PUT /api/v1/elements/\{id\} | Update an element |
| `apiV1ElementsIdDelete` | DELETE /api/v1/elements/\{id\} | Delete an element |

---

## apiV1ElementsGet — List Elements

Returns a paginated list of elements accessible to the current user, with optional filters.

### Parameters

| Name | Type | Required | Default | Description |
|---|---|---|---|---|
| pageNum | integer | No | 1 | Page number, starting at 1 |
| pageSize | integer | No | 20 | Items per page, max \{MAX_PAGE_SIZE\} |
| parentId | string | No | — | Filter by parent element ID |
| name | string | No | — | Fuzzy search by element name |

**Returns** `PageOfBasicElementDTO`

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

## apiV1ElementsIdGet — Get Element

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| id | string | Yes | Element ID |

**Returns** `ElementDTO`

**Raises** `ApiException(404)` if the element does not exist.

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
For create, update, and delete methods, refer to the OpenAPI spec file or the live Swagger UI.
:::
