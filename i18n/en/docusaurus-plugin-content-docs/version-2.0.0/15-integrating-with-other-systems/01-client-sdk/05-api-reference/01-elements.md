---
title: Elements API
sidebar_label: Elements API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.5.1 Elements API

`ElementResourceApi` provides query, create, update, and delete operations on elements.

## Method List

Java and Python SDK method names follow their respective generated-code conventions. Use the name in the column for your language.

| Java Method | Python Method | HTTP | Description |
|---|---|---|---|
| `apiV1ElementsGet` | `api_v1_elements_get` | GET /api/v1/elements | Paginated query of the element list |
| `apiV1ElementsElementIdGet` | `api_v1_elements_element_id_get` | GET /api/v1/elements/\{elementId\} | Get a single element by ID |
| `apiV1ElementsPost` | `api_v1_elements_post` | POST /api/v1/elements | Create an element |
| `apiV1ElementsElementIdPut` | `api_v1_elements_element_id_put` | PUT /api/v1/elements/\{elementId\} | Update an element |
| `apiV1ElementsElementIdDelete` | `api_v1_elements_element_id_delete` | DELETE /api/v1/elements/\{elementId\} | Delete an element |

---

## apiV1ElementsGet — Query Element List

Returns a paginated list of elements accessible to the current user, with optional filtering by name or parent element.

### Parameters

| Name | Type | Required | Default | Description |
|---|---|---|---|---|
| current | integer | No | 1 | Page number, 1-based |
| size | integer | No | 20 | Records per page |
| parentId | integer | No | — | Filter by parent element ID |
| keyword | string | No | — | Filter by keyword |

**Returns:** `PageOfBasicElementDTO`

### Example

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
ElementResourceApi elementApi = apiClient.buildClient(ElementResourceApi.class);
ApiV1ElementsGetQueryParams params = new ApiV1ElementsGetQueryParams()
    .current(1)
    .size(50);
PageOfBasicElementDTO result = elementApi.apiV1ElementsGet(params);
System.out.println("Total elements: " + result.getTotal());
```

</TabItem>
<TabItem value="python" label="Python">

```python
element_api = idmp_sdk.ElementResourceApi(api_client)
result = element_api.api_v1_elements_get(current=1, size=50)
print(f"Total elements: {result.total}")
for elem in result.rows or []:
    print(f"  {elem.id}: {elem.name}")
```

</TabItem>
</Tabs>

---

## Get Single Element

### Parameters

| Name | Type | Required | Description |
|---|---|---|---|
| elementId | integer | Yes | Element ID |

**Returns:** `ElementDTO`

**Throws:** `ApiException(404)` — element not found

### Example

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
ElementDTO element = elementApi.apiV1ElementsElementIdGet(123L);
System.out.println(element.getName());
```

</TabItem>
<TabItem value="python" label="Python">

```python
element = element_api.api_v1_elements_element_id_get(123)
print(element.name)
```

</TabItem>
</Tabs>

---

:::note
For the full parameter reference for create, update, and delete methods, see the OpenAPI spec file or the Swagger UI at `/swagger-ui.html` on your IDMP server.
:::
