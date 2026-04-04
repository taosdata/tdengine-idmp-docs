---
title: 认证
sidebar_label: 认证
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.3 认证

IDMP SDK 使用 **Bearer Token（JWT）** 进行认证。获取 Token 的方式取决于您的部署类型。

## 15.1.3.1 企业版（自托管）认证

对于自托管部署，通过调用登录端点并提供用户名和密码来获取 Token。

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

## 15.1.3.2 云服务认证

云服务每次请求需要两个 Token：`Authorization`（Bearer Token）和 `Access-token`。

**获取 Token 的步骤：**

1. 在浏览器中登录云服务（`https://<instance-id>.idmp.taosdata.com`）。
2. 打开浏览器开发者工具 → 网络选项卡。
3. 刷新页面，找到任意后端 API 请求（如 `/api/v1/permissions/menus`）。
4. 复制以下三个值：

<table>
<colgroup><col style="width:13em"/><col/></colgroup>
<thead><tr><th>项目</th><th>说明</th></tr></thead>
<tbody>
<tr><td>请求 URL 主机</td><td>格式：<code>https://<instance-id>.idmp.taosdata.com</code></td></tr>
<tr><td><code>Access-token</code> 请求头</td><td>云服务专用认证 Token</td></tr>
<tr><td><code>Authorization</code> 请求头</td><td>Bearer Token——使用不含 <code>Bearer</code> 前缀的值</td></tr>
</tbody>
</table>

5. 将这些值设置为环境变量：

```bash
export CLOUD_HOST=https://<instance-id>.idmp.taosdata.com
export CLOUD_TOKEN=<Access-token 的值>
export BEARER_TOKEN=<Authorization Token 的值（不含 "Bearer " 前缀）>
```

6. 在代码中初始化客户端：

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

## 15.1.3.3 Token 有效期与刷新

不同部署方式下，Token 的有效期配置和刷新方法有所差异，下表列出各场景的对应说明。

<table>
<colgroup><col style="width:11em"/><col/><col/></colgroup>
<thead><tr><th>部署方式</th><th>Token 有效期</th><th>刷新方法</th></tr></thead>
<tbody>
<tr><td>企业版（自托管）</td><td>在服务器端配置（参见 <code>application.yml</code>）</td><td>再次调用登录端点获取新 Token</td></tr>
<tr><td>云服务</td><td>由浏览器会话控制</td><td>通过浏览器重新登录，并从开发者工具中复制新 Token</td></tr>
</tbody>
</table>

:::tip
将 Token 获取和刷新封装在工具函数中。收到 `401 Unauthorized` 响应时自动触发刷新。
:::

## 15.1.3.4 安全最佳实践

在生产环境中使用 SDK 时，请遵循以下安全规范以保护认证凭据和通信安全。

- **切勿**在源代码中硬编码 Token、用户名或密码。
- 将凭据存储在环境变量或密钥管理工具中（Vault、AWS Secrets Manager 等）。
- 在生产环境中连接 IDMP 服务器时，始终使用 HTTPS。
