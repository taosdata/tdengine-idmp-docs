# Quick Start

:::note Prerequisites
Complete [Installation](./02-installation.md) first. This page starts from authentication and gets you to your first successful API call in under 5 minutes.
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Goal

By the end of this page you will be able to:

1. Authenticate with a username and password to obtain an access token
2. Use the token to query a list of elements

## Step 1 — Set Environment Variables

Store credentials in environment variables — never hard-code them in source files:

```bash
export IDMP_HOST=http://localhost:6042   # Replace with your IDMP server address
export IDMP_USERNAME=your_username
export IDMP_PASSWORD=your_password
```

## Step 2 — Log In and Get a Token

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
import org.openapitools.client.ApiClient;
import org.openapitools.client.api.UserResourceApi;
import org.openapitools.client.model.LoginReqDTO;
import org.openapitools.client.model.LoginRspDTO;

// 1. Create client with Bearer Token auth
ApiClient apiClient = new ApiClient("Authorization");
apiClient.setBasePath(System.getenv("IDMP_HOST"));

// 2. Log in
UserResourceApi userApi = apiClient.buildClient(UserResourceApi.class);
LoginReqDTO loginReq = new LoginReqDTO();
loginReq.setLoginName(System.getenv("IDMP_USERNAME"));
loginReq.setPassword(System.getenv("IDMP_PASSWORD"));

LoginRspDTO loginRsp = userApi.apiV1UsersLoginPost(loginReq);
System.out.println("Login successful, token: " + loginRsp.getToken());

// 3. Set the token — all subsequent requests carry it automatically
apiClient.setBearerToken(loginRsp.getToken());
```

</TabItem>
<TabItem value="python" label="Python">

```python
import os
import idmp_sdk
from idmp_sdk.rest import ApiException

# 1. Create configuration
configuration = idmp_sdk.Configuration(host=os.environ["IDMP_HOST"])

# 2. Log in
with idmp_sdk.ApiClient(configuration) as api_client:
    user_api = idmp_sdk.UserResourceApi(api_client)
    login_rsp = user_api.api_v1_users_login_post(
        idmp_sdk.LoginReqDTO(
            login_name=os.environ["IDMP_USERNAME"],
            password=os.environ["IDMP_PASSWORD"]
        )
    )
    print(f"Login successful, token: {login_rsp.token}")
```

</TabItem>
</Tabs>

## Step 3 — Query Elements

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
import org.openapitools.client.api.ElementResourceApi;
import org.openapitools.client.api.ElementResourceApi.ApiV1ElementsGetQueryParams;
import org.openapitools.client.model.PageOfBasicElementDTO;

// Continuing from Step 2 — apiClient already has the token set
ElementResourceApi elementApi = apiClient.buildClient(ElementResourceApi.class);
ApiV1ElementsGetQueryParams params = new ApiV1ElementsGetQueryParams();
PageOfBasicElementDTO result = elementApi.apiV1ElementsGet(params);

System.out.println("Found " + result.getTotal() + " elements");
```

</TabItem>
<TabItem value="python" label="Python">

```python
import os
import idmp_sdk

# Use the token obtained in Step 2
configuration = idmp_sdk.Configuration(
    host=os.environ["IDMP_HOST"],
    access_token=os.environ["BEARER_TOKEN"]   # Store the token in an env var
)

with idmp_sdk.ApiClient(configuration) as api_client:
    element_api = idmp_sdk.ElementResourceApi(api_client)
    result = element_api.api_v1_elements_get()
    print(f"Found {result.total} elements")
    for elem in result.data:
        print(f"  - {elem.name} ({elem.id})")
```

</TabItem>
</Tabs>

## Next Steps

- All authentication methods including cloud service → [Authentication](./04-authentication.md)
- Key SDK objects and patterns → [Core Concepts](./05-core-concepts.md)
- Full API reference → [API Reference](./06-api-reference/index.md)
