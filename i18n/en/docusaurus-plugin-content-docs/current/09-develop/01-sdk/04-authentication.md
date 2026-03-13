# Authentication

IDMP SDK uses **Bearer Token (JWT)** for authentication. How you obtain the token depends on your deployment type.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Enterprise (Self-Hosted) Authentication

Obtain a token by calling the login API with your username and password.

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
ApiClient apiClient = new ApiClient("Authorization");
apiClient.setBasePath(System.getenv("IDMP_HOST"));

UserResourceApi userApi = apiClient.buildClient(UserResourceApi.class);
LoginReqDTO req = new LoginReqDTO();
req.setLoginName(System.getenv("IDMP_USERNAME"));
req.setPassword(System.getenv("IDMP_PASSWORD"));

LoginRspDTO rsp = userApi.apiV1UsersLoginPost(req);
apiClient.setBearerToken(rsp.getToken());  // All subsequent requests carry this token
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
    os.environ["BEARER_TOKEN"] = rsp.token  # Store for reuse
```

</TabItem>
</Tabs>

## Cloud Service Authentication

The cloud service requires two tokens simultaneously: `Authorization` (Bearer Token) and `Access-token`.

**How to obtain the tokens:**

1. Log in to the cloud service via browser (`https://<instance-id>.idmp.taosdata.com`)
2. Open browser DevTools → Network tab
3. Refresh the page and locate any backend API request (e.g. `/api/v1/permissions/menus`)
4. Copy the following three values:

| Item | Description |
|---|---|
| Request URL host | Format: `https://<instance-id>.idmp.taosdata.com` |
| `Access-token` request header | Cloud-specific authentication token |
| `Authorization` request header | Bearer Token — remove the `Bearer ` prefix |

5. Set them as environment variables:

```bash
export CLOUD_HOST=https://<instance-id>.idmp.taosdata.com
export CLOUD_TOKEN=<Access-token value>
export BEARER_TOKEN=<Authorization token value (without "Bearer " prefix)>
```

6. Initialize the client:

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
ApiClient apiClient = new ApiClient("Authorization");
apiClient.setBasePath(System.getenv("CLOUD_HOST"));
apiClient.setBearerToken(System.getenv("BEARER_TOKEN"));
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
    api_client.set_default_header("Access-token", os.environ["CLOUD_TOKEN"])
    # Proceed to use APIs normally
```

</TabItem>
</Tabs>

## Token Lifetime and Refresh

| Deployment | Token Lifetime | How to Refresh |
|---|---|---|
| Enterprise | {TOKEN_TTL} (see server config) | Call the login API again |
| Cloud Service | Controlled by browser session | Log in via browser again and copy the new token |

:::tip
Wrap your token acquisition and refresh logic in a helper function, and auto-trigger refresh when you receive a `401 Unauthorized` response.
:::

## Security Best Practices

- **Never** hard-code tokens, usernames, or passwords in source code
- Use environment variables or a secrets manager (Vault, AWS Secrets Manager, etc.)
- Always use HTTPS in production environments
