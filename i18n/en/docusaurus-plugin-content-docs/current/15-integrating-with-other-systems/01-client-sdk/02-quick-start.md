---
title: Quick Start
sidebar_label: Quick Start
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.2 Quick Start

:::note Prerequisites
Complete [Installation](./01-installation.md) first. This guide takes about 5 minutes and walks you through your first API call.
:::

## 15.1.2.1 Goal

By the end of this page you will be able to:

1. Log in with a username and password to obtain an access token
2. Use the token to query the element list

## 15.1.2.2 Step 1 — Configure the Connection

Store the server address and credentials in environment variables to avoid hardcoding secrets in source code:

```bash
export IDMP_HOST=http://localhost:6042   # replace with your IDMP server address
export IDMP_USERNAME=your_username
export IDMP_PASSWORD=your_password
```

## 15.1.2.3 Step 2 — Log In and Obtain a Token

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
import org.openapitools.client.ApiClient;
import org.openapitools.client.api.UserResourceApi;
import org.openapitools.client.model.LoginReqDTO;
import org.openapitools.client.model.LoginRspDTO;

// 1. Create a client configured for Bearer Token authentication
ApiClient apiClient = new ApiClient("Authorization");
apiClient.setBasePath(System.getenv("IDMP_HOST"));

// 2. Log in and retrieve the token
UserResourceApi userApi = apiClient.buildClient(UserResourceApi.class);
LoginReqDTO loginReq = new LoginReqDTO();
loginReq.setLoginName(System.getenv("IDMP_USERNAME"));
loginReq.setPassword(System.getenv("IDMP_PASSWORD"));

LoginRspDTO loginRsp = userApi.apiV1UsersLoginPost(loginReq);
String token = loginRsp.getToken();
System.out.println("Logged in. Token: " + token);

// 3. Set the token on the client — all subsequent requests include it automatically
apiClient.setBearerToken(token);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import os
import idmp_sdk
from idmp_sdk.rest import ApiException

# 1. Create configuration with the server address
configuration = idmp_sdk.Configuration(
    host=os.environ["IDMP_HOST"]
)

# 2. Log in and retrieve the token
with idmp_sdk.ApiClient(configuration) as api_client:
    user_api = idmp_sdk.UserResourceApi(api_client)
    login_req = idmp_sdk.LoginReqDTO(
        login_name=os.environ["IDMP_USERNAME"],
        password=os.environ["IDMP_PASSWORD"]
    )
    login_rsp = user_api.api_v1_users_login_post(login_req)
    token = login_rsp.token
    print(f"Logged in. Token: {token}")
```

</TabItem>
</Tabs>

## 15.1.2.4 Step 3 — Query the Element List

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
import org.openapitools.client.api.ElementResourceApi;
import org.openapitools.client.api.ElementResourceApi.ApiV1ElementsGetQueryParams;
import org.openapitools.client.model.PageOfBasicElementDTO;

// Continuing from Step 2 — apiClient already has the token set
ElementResourceApi elementApi = apiClient.buildClient(ElementResourceApi.class);
ApiV1ElementsGetQueryParams queryParams = new ApiV1ElementsGetQueryParams();
PageOfBasicElementDTO elements = elementApi.apiV1ElementsGet(queryParams);

System.out.println("Elements: " + elements);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import os
import idmp_sdk

# Initialize with the token obtained in Step 2
configuration = idmp_sdk.Configuration(
    host=os.environ["IDMP_HOST"],
    access_token=os.environ["BEARER_TOKEN"]   # store the token from Step 2 in an env var
)

with idmp_sdk.ApiClient(configuration) as api_client:
    element_api = idmp_sdk.ElementResourceApi(api_client)
    elements = element_api.api_v1_elements_get()
    print(f"Found {len(elements.data)} elements")
    for elem in elements.data:
        print(f"  - {elem.name} ({elem.id})")
```

</TabItem>
</Tabs>

## 15.1.2.5 Next Steps

The following resources cover the topics most commonly needed after completing this quick start.

- Understand all authentication options including cloud service auth → [Authentication](./03-authentication.md)
- Understand the core objects in the SDK → [Core Concepts](./04-core-concepts.md)
- Browse the full API reference → [API Reference](./05-api-reference/index.md)
