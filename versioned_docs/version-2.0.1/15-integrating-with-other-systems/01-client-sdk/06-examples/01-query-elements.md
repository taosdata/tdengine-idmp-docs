---
title: "示例：查询元素树"
sidebar_label: 查询元素树
---

# 15.1.6.1 示例：查询元素树

**场景：** 遍历父节点下的所有元素并打印其名称和 ID。适用于资产清查、构建元素选择器，或向外部系统同步数据。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
import org.openapitools.client.ApiClient;
import org.openapitools.client.api.ElementResourceApi;
import org.openapitools.client.api.ElementResourceApi.ApiV1ElementsGetQueryParams;
import org.openapitools.client.api.UserResourceApi;
import org.openapitools.client.model.*;

public class QueryElementsExample {

    public static void main(String[] args) {
        // 1. Authenticate
        ApiClient apiClient = new ApiClient("Authorization");
        apiClient.setBasePath(System.getenv("IDMP_HOST"));

        UserResourceApi userApi = apiClient.buildClient(UserResourceApi.class);
        LoginReqDTO req = new LoginReqDTO();
        req.setLoginName(System.getenv("IDMP_USERNAME"));
        req.setPassword(System.getenv("IDMP_PASSWORD"));
        LoginRspDTO rsp = userApi.apiV1UsersLoginPost(req);
        apiClient.setBearerToken(rsp.getToken());

        // 2. Paginate through all elements
        ElementResourceApi elementApi = apiClient.buildClient(ElementResourceApi.class);
        int current = 1;
        int pageSize = 100;

        while (true) {
            ApiV1ElementsGetQueryParams params = new ApiV1ElementsGetQueryParams()
                .current(current)
                .size(pageSize);
            PageOfBasicElementDTO result = elementApi.apiV1ElementsGet(params);

            for (BasicElementDTO elem : result.getRows()) {
                System.out.printf("ID: %-30s  Name: %s%n", elem.getId(), elem.getName());
            }

            if (result.getRows().size() < pageSize) break;  // last page
            current++;
        }
    }
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
import os
import idmp_sdk
from idmp_sdk.rest import ApiException

def get_api_client():
    """Log in and return an authenticated ApiClient."""
    configuration = idmp_sdk.Configuration(host=os.environ["IDMP_HOST"])
    with idmp_sdk.ApiClient(configuration) as api_client:
        user_api = idmp_sdk.UserResourceApi(api_client)
        rsp = user_api.api_v1_users_login_post(
            idmp_sdk.LoginReqDTO(
                login_name=os.environ["IDMP_USERNAME"],
                password=os.environ["IDMP_PASSWORD"]
            )
        )
    # Re-initialize with the token
    auth_config = idmp_sdk.Configuration(
        host=os.environ["IDMP_HOST"],
        access_token=rsp.token
    )
    return idmp_sdk.ApiClient(auth_config)

def list_all_elements(api_client, page_size=100):
    """Paginate through all elements and print their IDs and names."""
    element_api = idmp_sdk.ElementResourceApi(api_client)
    current = 1

    while True:
        result = element_api.api_v1_elements_get(
            current=current,
            size=page_size
        )
        rows = result.rows or []
        for elem in rows:
            print(f"ID: {elem.id:<30}  Name: {elem.name}")

        if len(rows) < page_size:
            break  # last page
        current += 1

if __name__ == "__main__":
    with get_api_client() as api_client:
        list_all_elements(api_client)
```

</TabItem>
</Tabs>
