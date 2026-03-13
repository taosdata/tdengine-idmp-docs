# Example: Query Element Tree

**Scenario**: Walk all elements under a root node and print their names and IDs. Useful for asset inventory, building element pickers, etc.

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
        apiClient.setBearerToken(userApi.apiV1UsersLoginPost(req).getToken());

        // 2. Page through all elements
        ElementResourceApi elementApi = apiClient.buildClient(ElementResourceApi.class);
        int pageNum = 1;
        final int PAGE_SIZE = 100;

        while (true) {
            ApiV1ElementsGetQueryParams params = new ApiV1ElementsGetQueryParams()
                .pageNum(pageNum)
                .pageSize(PAGE_SIZE);
            PageOfBasicElementDTO result = elementApi.apiV1ElementsGet(params);

            for (BasicElementDTO elem : result.getData()) {
                System.out.printf("ID: %-30s  Name: %s%n", elem.getId(), elem.getName());
            }

            if (result.getData().size() < PAGE_SIZE) break;
            pageNum++;
        }
    }
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
import os
import idmp_sdk

def get_authenticated_client():
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
    return idmp_sdk.ApiClient(
        idmp_sdk.Configuration(
            host=os.environ["IDMP_HOST"],
            access_token=rsp.token
        )
    )

def list_all_elements(api_client, page_size=100):
    """Fetch and print all elements using pagination."""
    element_api = idmp_sdk.ElementResourceApi(api_client)
    page_num = 1

    while True:
        result = element_api.api_v1_elements_get(
            page_num=page_num,
            page_size=page_size
        )
        for elem in result.data:
            print(f"ID: {elem.id:<30}  Name: {elem.name}")

        if len(result.data) < page_size:
            break
        page_num += 1

if __name__ == "__main__":
    with get_authenticated_client() as client:
        list_all_elements(client)
```

</TabItem>
</Tabs>
