---
title: Authentication
sidebar_label: Authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.3 Authentication

The IDMP SDK uses **Bearer Token (JWT)** for authentication. How you obtain a token depends on your deployment type.

## 15.1.3.1 Enterprise (Self-Hosted) Authentication

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

## 15.1.3.2 Cloud Service Authentication

The cloud service requires two tokens on each request: `Authorization` (Bearer Token) and `Access-token`.

**Steps to obtain the tokens:**

1. Log in to the cloud service in your browser (`https://<instance-id>.idmp.taosdata.com`).
2. Open the browser Developer Tools → Network tab.
3. Refresh the page and locate any backend API request (e.g., `/api/v1/permissions/menus`).
4. Copy the following three values:

<table>
<colgroup><col style="width:18em"/><col/></colgroup>
<thead><tr><th>Item</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Request URL host</td><td>Format: <code>https://<instance-id>.idmp.taosdata.com</code></td></tr>
<tr><td><code>Access-token</code> request header</td><td>Cloud service-specific authentication token</td></tr>
<tr><td><code>Authorization</code> request header</td><td>Bearer Token — use the value without the <code>Bearer</code> prefix</td></tr>
</tbody>
</table>

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

## 15.1.3.3 Token Lifetime and Refresh

Token lifetime differs between deployment types; the table below summarizes the default behavior and the recommended refresh strategy for each.

<table>
<colgroup><col style="width:16em"/><col/><col/></colgroup>
<thead><tr><th>Deployment</th><th>Token Lifetime</th><th>How to Refresh</th></tr></thead>
<tbody>
<tr><td>Enterprise (self-hosted)</td><td>Configured on the server (see <code>application.yml</code>)</td><td>Call the login endpoint again to get a new token</td></tr>
<tr><td>Cloud service</td><td>Controlled by the browser session</td><td>Log in through the browser again and copy new tokens from DevTools</td></tr>
</tbody>
</table>

:::tip
Wrap token acquisition and refresh in a utility function. Trigger a refresh automatically when you receive a `401 Unauthorized` response.
:::

## 15.1.3.4 Security Best Practices

The following practices should be applied in all production integrations to protect credentials and reduce exposure to unauthorized access.

- **Never** hardcode tokens, usernames, or passwords in source code.
- Store credentials in environment variables or a secrets manager (Vault, AWS Secrets Manager, etc.).
- Always use HTTPS when connecting to an IDMP server in production.
