---
title: API de elementos
sidebar_label: API de elementos
---

`ElementResourceApi` proporciona operaciones de consulta, creación, actualización y eliminación de elementos.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.5.1 API de elementos

## Lista de métodos

| Método | HTTP | Descripción |
|---|---|---|
| `apiV1ElementsGet` | GET /api/v1/elements | Consulta paginada de la lista de elementos |
| `apiV1ElementsIdGet` | GET /api/v1/elements/\{id\} | Obtener un solo elemento por ID |
| `apiV1ElementsPost` | POST /api/v1/elements | Crear un elemento |
| `apiV1ElementsIdPut` | PUT /api/v1/elements/\{id\} | Actualizar un elemento |
| `apiV1ElementsIdDelete` | DELETE /api/v1/elements/\{id\} | Eliminar un elemento |

---

## apiV1ElementsGet — Consultar lista de elementos

Devuelve una lista paginada de elementos accesibles al usuario actual, con filtrado opcional por nombre o elemento padre.

### Parámetros

| Nombre | Tipo | Requerido | Predeterminado | Descripción |
|---|---|---|---|---|
| pageNum | integer | No | 1 | Número de página, basado en 1 |
| pageSize | integer | No | 20 | Registros por página |
| parentId | string | No | — | Filtrar por ID del elemento padre |
| name | string | No | — | Búsqueda difusa por nombre de elemento |

**Devuelve:** `PageOfBasicElementDTO`

### Ejemplo

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

## apiV1ElementsIdGet — Obtener elemento único

### Parámetros

| Nombre | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | string | Sí | ID del elemento |

**Devuelve:** `ElementDTO`

**Lanza:** `ApiException(404)` — elemento no encontrado

### Ejemplo

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
Para la referencia completa de parámetros de los métodos de creación, actualización y eliminación, consulte el archivo de especificación OpenAPI o el Swagger UI en `/swagger-ui.html` en su servidor IDMP.
:::
