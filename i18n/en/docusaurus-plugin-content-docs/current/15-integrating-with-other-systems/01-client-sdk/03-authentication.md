---
title: Authentication
sidebar_label: Authentication
---

The IDMP SDK uses **Bearer Token (JWT)** for authentication. How you obtain a token depends on your deployment type.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Enterprise (Self-Hosted) Authentication

For self-hosted deployments, obtain a token by calling the login endpoint with a username and password.

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
import org.openapitools.client.ApiClient;
import org.openapitools.client.api.UserResourceApi;
import org.openapitools.client.model.LoginReqDTO;
import org.openapitools.client.model.LoginRspDTO;

ApiClient apiClient = new ApiClient("Authorization");
apiClient.setBasePath(System.getenv("IDMP_HOST"));

UserResourceApi userApi = apiClient.buildClient(UserResourceApi.class);
LoginReqDTO req = new LoginReqDTO();
req.setLoginName(System.getenv("IDMP_USERNAME"));
req.setPassword(System.getenv("IDMP_PASSWORD"));

LoginRspDTO rsp = userApi.apiV1UsersLoginPost(req);
apiClient.setBearerToken(rsp.getToken());  // subsequent requests include this token automatically
```

</TabItem>
<TabItem value="python" label="Python">

```python
import os, idmp_sdk

configuration = idmp_sdk.Configuration(host=os.environ["IDMP_HOST"])

with idmp_sdk.ApiClient(configuration) as api_client:
    user_api = idmp_sdk.UserResourceApi(api_client)
    rsp = user_api.api_v1_users_login_post(
        idmp_sdk.LoginReqDTO(
            login_name=os.environ["IDMP_USERNAME"],
            password=os.environ["IDMP_PASSWORD"]
        )
    )
    # Store the token in an environment variable for subsequent use
    os.environ["BEARER_TOKEN"] = rsp.token
```

</TabItem>
</Tabs>

## Cloud Service Authentication

The cloud service requires two tokens on each request: `Authorization` (Bearer Token) and `Access-token`.

**Steps to obtain the tokens:**

1. Log in to the cloud service in your browser (`https://<instance-id>.idmp.taosdata.com`).
2. Open the browser Developer Tools → Network tab.
3. Refresh the page and locate any backend API request (e.g., `/api/v1/permissions/menus`).
4. Copy the following three values:

| Item | Description |
|---|---|
| Request URL host | Format: `https://<instance-id>.idmp.taosdata.com` |
| `Access-token` request header | Cloud service-specific authentication token |
| `Authorization` request header | Bearer Token — use the value without the `Bearer ` prefix |

5. Set the values as environment variables:

```bash
export CLOUD_HOST=https://<instance-id>.idmp.taosdata.com
export CLOUD_TOKEN=<Access-token value>
export BEARER_TOKEN=<Authorization token value (without the "Bearer " prefix)>
```

6. Initialize the client in code:

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
ApiClient apiClient = new ApiClient("Authorization");
apiClient.setBasePath(System.getenv("CLOUD_HOST"));
apiClient.setBearerToken(System.getenv("BEARER_TOKEN"));
// Add the cloud-specific Access-token header
apiClient.addDefaultHeader("Access-token", System.getenv("CLOUD_TOKEN"));
```

</TabItem>
<TabItem value="python" label="Python">

```python
import os, idmp_sdk

configuration = idmp_sdk.Configuration(
    host=os.environ["CLOUD_HOST"],
    access_token=os.environ["BEARER_TOKEN"]
)

with idmp_sdk.ApiClient(configuration) as api_client:
    # Add the cloud-specific Access-token header
    api_client.set_default_header("Access-token", os.environ["CLOUD_TOKEN"])
    # Proceed with normal API calls
```

</TabItem>
</Tabs>

## Token Lifetime and Refresh

| Deployment | Token Lifetime | How to Refresh |
|---|---|---|
| Enterprise (self-hosted) | Configured on the server (see `application.yml`) | Call the login endpoint again to get a new token |
| Cloud service | Controlled by the browser session | Log in through the browser again and copy new tokens from DevTools |

:::tip
Wrap token acquisition and refresh in a utility function. Trigger a refresh automatically when you receive a `401 Unauthorized` response.
:::

## Security Best Practices

- **Never** hardcode tokens, usernames, or passwords in source code.
- Store credentials in environment variables or a secrets manager (Vault, AWS Secrets Manager, etc.).
- Always use HTTPS when connecting to an IDMP server in production.
