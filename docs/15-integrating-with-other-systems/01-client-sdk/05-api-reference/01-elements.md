---
title: 元素 API
sidebar_label: 元素 API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.5.1 元素 API

`ElementResourceApi` 提供对元素的查询、创建、更新和删除操作。

## 方法列表

| 方法 | HTTP | 说明 |
|---|---|---|
| `apiV1ElementsGet` | GET /api/v1/elements | 分页查询元素列表 |
| `apiV1ElementsIdGet` | GET /api/v1/elements/\{id\} | 根据 ID 获取单个元素 |
| `apiV1ElementsPost` | POST /api/v1/elements | 创建元素 |
| `apiV1ElementsIdPut` | PUT /api/v1/elements/\{id\} | 更新元素 |
| `apiV1ElementsIdDelete` | DELETE /api/v1/elements/\{id\} | 删除元素 |

---

## apiV1ElementsGet——查询元素列表

返回当前用户可访问的元素分页列表，支持按名称或父元素可选过滤。

### 参数

| 名称 | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| pageNum | integer | 否 | 1 | 页码，从 1 开始 |
| pageSize | integer | 否 | 20 | 每页记录数 |
| parentId | string | 否 | — | 按父元素 ID 过滤 |
| name | string | 否 | — | 按元素名称模糊搜索 |

**返回：** `PageOfBasicElementDTO`

### 示例

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

## apiV1ElementsIdGet——获取单个元素

### 参数

| 名称 | 类型 | 必填 | 说明 |
|---|---|---|---|
| id | string | 是 | 元素 ID |

**返回：** `ElementDTO`

**抛出：** `ApiException(404)`——元素未找到

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
创建、更新和删除方法的完整参数参考请查看 OpenAPI 规范文件，或在您的 IDMP 服务器上访问 `/swagger-ui.html` 浏览 Swagger UI。
:::
