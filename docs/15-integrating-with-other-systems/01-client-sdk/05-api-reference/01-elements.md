---
title: 元素 API
sidebar_label: 元素 API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.5.1 元素 API

`ElementResourceApi` 提供对元素的查询、创建、更新和删除操作。

## 方法列表

`ElementResourceApi` 提供以下方法，涵盖元素的查询、创建、更新和删除操作。

<table>
<colgroup><col style="width:14em"/><col/><col/></colgroup>
<thead><tr><th>方法</th><th>HTTP</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>apiV1ElementsGet</code></td><td>GET /api/v1/elements</td><td>分页查询元素列表</td></tr>
<tr><td><code>apiV1ElementsIdGet</code></td><td>GET /api/v1/elements/\{id\}</td><td>根据 ID 获取单个元素</td></tr>
<tr><td><code>apiV1ElementsPost</code></td><td>POST /api/v1/elements</td><td>创建元素</td></tr>
<tr><td><code>apiV1ElementsIdPut</code></td><td>PUT /api/v1/elements/\{id\}</td><td>更新元素</td></tr>
<tr><td><code>apiV1ElementsIdDelete</code></td><td>DELETE /api/v1/elements/\{id\}</td><td>删除元素</td></tr>
</tbody>
</table>

---

## apiV1ElementsGet——查询元素列表

返回当前用户可访问的元素分页列表，支持按名称或父元素可选过滤。

### 参数

<table>
<colgroup><col style="width:7em"/><col/><col/><col/><col/></colgroup>
<thead><tr><th>名称</th><th>类型</th><th>必填</th><th>默认值</th><th>说明</th></tr></thead>
<tbody>
<tr><td>pageNum</td><td>integer</td><td>否</td><td>1</td><td>页码，从 1 开始</td></tr>
<tr><td>pageSize</td><td>integer</td><td>否</td><td>20</td><td>每页记录数</td></tr>
<tr><td>parentId</td><td>string</td><td>否</td><td>—</td><td>按父元素 ID 过滤</td></tr>
<tr><td>name</td><td>string</td><td>否</td><td>—</td><td>按元素名称模糊搜索</td></tr>
</tbody>
</table>

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

<table>
<colgroup><col style="width:5em"/><col/><col/><col/></colgroup>
<thead><tr><th>名称</th><th>类型</th><th>必填</th><th>说明</th></tr></thead>
<tbody>
<tr><td>id</td><td>string</td><td>是</td><td>元素 ID</td></tr>
</tbody>
</table>

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
