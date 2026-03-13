# 元素 API

`ElementResourceApi` 提供元素的查询、创建、更新和删除操作。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 方法列表

| 方法 | HTTP | 说明 |
|---|---|---|
| `apiV1ElementsGet` | GET /api/v1/elements | 分页查询元素列表 |
| `apiV1ElementsIdGet` | GET /api/v1/elements/{id} | 按 ID 查询单个元素 |
| `apiV1ElementsPost` | POST /api/v1/elements | 创建元素 |
| `apiV1ElementsIdPut` | PUT /api/v1/elements/{id} | 更新元素 |
| `apiV1ElementsIdDelete` | DELETE /api/v1/elements/{id} | 删除元素 |

---

## apiV1ElementsGet — 查询元素列表

分页返回当前用户有权访问的元素列表，支持按名称、父元素等条件过滤。

### 参数

| 名称 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| pageNum | integer | 否 | 1 | 页码，从 1 开始 |
| pageSize | integer | 否 | 20 | 每页条数，最大 {MAX_PAGE_SIZE} |
| parentId | string | 否 | — | 按父元素 ID 过滤 |
| name | string | 否 | — | 按元素名称模糊搜索 |

**返回值**: `PageOfBasicElementDTO`

### 示例

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
ElementResourceApi elementApi = apiClient.buildClient(ElementResourceApi.class);
ApiV1ElementsGetQueryParams params = new ApiV1ElementsGetQueryParams()
    .pageNum(1)
    .pageSize(50);
PageOfBasicElementDTO result = elementApi.apiV1ElementsGet(params);
System.out.println("共 " + result.getTotal() + " 个元素");
```

</TabItem>
<TabItem value="python" label="Python">

```python
element_api = idmp_sdk.ElementResourceApi(api_client)
result = element_api.api_v1_elements_get(page_num=1, page_size=50)
print(f"共 {result.total} 个元素")
for elem in result.data:
    print(f"  {elem.id}: {elem.name}")
```

</TabItem>
</Tabs>

---

## apiV1ElementsIdGet — 查询单个元素

### 参数

| 名称 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | string | 是 | 元素 ID |

**返回值** `ElementDTO`

**异常** `ApiException(404)` — 元素不存在

### 示例

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
其余方法（创建、更新、删除）的完整参数说明请参阅 OpenAPI 规范文件或在线 Swagger UI。
:::
