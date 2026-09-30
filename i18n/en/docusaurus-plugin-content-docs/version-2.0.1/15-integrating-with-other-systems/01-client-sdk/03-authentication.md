---
title: Authentication
sidebar_label: Authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.3 Authentication

The IDMP SDK sends bearer credentials through the `Authorization` header. In self-hosted environments, you can use either of the following:

- A JWT obtained from the login endpoint
- A user API key created in Personal Settings

In both cases, the final header format is `Authorization: Bearer <credential>`. The cloud service still requires an additional `Access-token` header.

## 15.1.3.1 Enterprise (Self-Hosted) JWT Authentication

For self-hosted deployments, obtain a JWT by calling the login endpoint with a username and password.

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

## 15.1.3.2 User API Key Authentication

User API keys are recommended for scripts, CLIs, MCP clients, and other integrations that need a stable credential. For the full UI workflow and lifecycle actions, see [Section 14.8](../../14-administration/08-profile-settings.md).

**To obtain an API key:**

1. Sign in to the IDMP Web UI.
2. Open the avatar menu in the upper-right corner and select the top account item to open the personal settings dialog.
3. Switch to the **API Key** tab, click **Add New API Key**, enter a unique title, and choose **Never** or a future **Expiration Date**.
4. Copy the generated API key. The copied value starts with `api_` and does not include the `Bearer` prefix.

| Item | Description |
|---|---|
| **Credential format** | `api_<key_id>.<secret>` |
| **Header format** | `Authorization: Bearer <IDMP_API_KEY>` |
| **Best for** | CLIs, scripts, MCP clients, and other long-lived integrations |
| **Rotation** | Delete and recreate the key from **Personal Settings → API Key** |

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
import org.openapitools.client.ApiClient;

ApiClient apiClient = new ApiClient("Authorization");
apiClient.setBasePath(System.getenv("IDMP_HOST"));
apiClient.setBearerToken(System.getenv("IDMP_API_KEY"));
```

</TabItem>
<TabItem value="python" label="Python">

```python
import os, idmp_sdk

configuration = idmp_sdk.Configuration(
    host=os.environ["IDMP_HOST"],
    access_token=os.environ["IDMP_API_KEY"]
)
```

</TabItem>
</Tabs>

:::note
An API key inherits the role permissions and element access scope of its owner. It becomes invalid immediately when it expires, is deleted, or its owner is deactivated or deleted. Requests authenticated by API key cannot manage API keys.
:::

## 15.1.3.3 Cloud Service Authentication

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
| `Authorization` request header | Bearer Token — use the value without the `Bearer` prefix |

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

## 15.1.3.4 Credential Lifetime and Rotation

| Credential Type | Lifetime | How to Rotate |
|---|---|---|
| Enterprise JWT | Configured on the server (see `application.yml`) | Call the login endpoint again to get a new JWT |
| User API Key | Controlled by the expiration chosen at creation time, or set to never expire | Delete and recreate the key from **Personal Settings → API Key** |
| Cloud service | Controlled by the browser session | Log in through the browser again and copy new tokens from DevTools |

:::tip
Wrap credential acquisition and rotation in a utility function. When you receive a `401 Unauthorized` response, re-login or switch to a fresh API key based on the credential type you use.
:::

## 15.1.3.5 Security Best Practices

- **Never** hardcode tokens, API keys, usernames, or passwords in source code.
- Store credentials in environment variables or a secrets manager (Vault, AWS Secrets Manager, etc.).
- Use least-privilege users or roles for automation, and rotate API keys regularly.
- Always use HTTPS when connecting to an IDMP server in production.
