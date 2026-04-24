---
title: 认证
sidebar_label: 认证
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.3 认证

IDMP SDK 通过 `Authorization` 头发送 Bearer 凭据。在自托管环境中，可以选择以下两种方式：

- 通过登录接口获取 JWT。
- 在个人设置中创建用户 API Key。

无论使用哪一种方式，最终请求头格式都为 `Authorization: Bearer <credential>`。云服务仍需要额外的 `Access-token` 请求头。

## 15.1.3.1 企业版（自托管）JWT 认证

对于自托管部署，可通过调用登录端点并提供用户名和密码来获取 JWT。

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

## 15.1.3.2 用户 API Key 认证

对于需要长期稳定凭据的脚本、CLI 或 MCP 客户端，推荐使用用户 API Key。关于 UI 操作与生命周期管理，请参见[第 14.8 节](../../14-administration/08-profile-settings.md)。

**获取 API Key 的步骤：**

1. 登录 IDMP Web UI。
2. 打开右上角头像菜单，点击顶部账户项，进入个人设置对话框。
3. 切换到**密钥**页签，点击 **新增 API Key**，填写唯一标题，并选择**永不过期**或未来的**到期日期**。
4. 复制生成的 API Key。该值本身以 `api_` 开头，不包含 `Bearer` 前缀。

| 项目 | 说明 |
|---|---|
| **凭据格式** | `api_<key_id>.<secret>` |
| **请求头写法** | `Authorization: Bearer <IDMP_API_KEY>` |
| **适用场景** | CLI、脚本、MCP 客户端和其他长期集成 |
| **轮换方式** | 在**个人设置 → 密钥**中修改到期时间，或删除后重新创建 |

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
API Key 继承创建者当前用户的角色与元素访问范围。API Key 到期、被删除，或所属用户被停用或删除后，将立即失效。使用 API Key 鉴权的请求不能再执行 API Key 管理操作。
:::

## 15.1.3.3 云服务认证

云服务每次请求需要两个 Token：`Authorization`（Bearer Token）和 `Access-token`。

**获取 Token 的步骤：**

1. 在浏览器中登录云服务（`https://<instance-id>.idmp.taosdata.com`）。
2. 打开浏览器开发者工具 → 网络选项卡。
3. 刷新页面，找到任意后端 API 请求（如 `/api/v1/permissions/menus`）。
4. 复制以下三个值：

| 项目 | 说明 |
|---|---|
| 请求 URL 主机 | 格式：`https://<instance-id>.idmp.taosdata.com` |
| `Access-token` 请求头 | 云服务专用认证 Token |
| `Authorization` 请求头 | Bearer Token——使用不含 `Bearer` 前缀的值 |

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

## 15.1.3.4 凭据有效期与轮换

| 凭据类型 | 有效期 | 轮换方式 |
|---|---|---|
| 企业版 JWT | 在服务器端配置（参见 `application.yml`） | 再次调用登录端点获取新 JWT |
| 用户 API Key | 由创建时设置的到期时间控制，或配置为永不过期 | 在**个人设置 → 密钥**中修改到期时间，或删除后重新创建 |
| 云服务 | 由浏览器会话控制 | 通过浏览器重新登录，并从开发者工具中复制新的 Token |

:::tip
建议将凭据获取与轮换逻辑封装在工具函数中。收到 `401 Unauthorized` 响应时，可按凭据类型自动重新登录或切换到新的 API Key。
:::

## 15.1.3.5 安全最佳实践

- **切勿**在源代码中硬编码 Token、API Key、用户名或密码。
- 将凭据存储在环境变量或密钥管理工具中（Vault、AWS Secrets Manager 等）。
- 为自动化任务分配最小权限用户或角色，并定期轮换 API Key。
- 在生产环境中连接 IDMP 服务器时，始终使用 HTTPS。
