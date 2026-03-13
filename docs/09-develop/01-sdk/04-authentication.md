# 认证

IDMP SDK 使用 **Bearer Token（JWT）** 进行认证。根据部署方式的不同，获取 Token 的方式有所区别。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 企业版认证

企业版（自部署）通过用户名和密码登录接口获取 Token。

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
apiClient.setBearerToken(rsp.getToken());  // 后续请求自动携带此 Token
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
    # 将 Token 存入环境变量供后续使用
    os.environ["BEARER_TOKEN"] = rsp.token
```

</TabItem>
</Tabs>

## 云服务版认证

云服务版的认证流程与企业版不同，需要同时携带两个令牌：`Authorization`（Bearer Token）和 `Access-token`。

**获取令牌的步骤：**

1. 通过浏览器登录云服务（`https://<实例ID>.idmp.taosdata.com`）
2. 打开浏览器开发者工具 → Network 标签页
3. 刷新页面，找到任意一个对后端 API 的请求（如 `/api/v1/permissions/menus`）
4. 复制以下三项值：

| 项目 | 说明 |
|---|---|
| 请求 URL 的 host | 格式为 `https://<实例ID>.idmp.taosdata.com` |
| 请求头 `Access-token` | 云服务专用认证令牌 |
| 请求头 `Authorization` | Bearer Token，去掉 `Bearer` 前缀后使用 |

5. 将三项值设置为环境变量：

```bash
export CLOUD_HOST=https://<实例ID>.idmp.taosdata.com
export CLOUD_TOKEN=<Access-token 的值>
export BEARER_TOKEN=<Authorization Token 的值（不含 Bearer 前缀）>
```

6. 在代码中初始化客户端：

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
ApiClient apiClient = new ApiClient("Authorization");
apiClient.setBasePath(System.getenv("CLOUD_HOST"));
apiClient.setBearerToken(System.getenv("BEARER_TOKEN"));
// 额外设置云服务专用 Access-token 请求头
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
    # 额外设置云服务专用 Access-token 请求头
    api_client.set_default_header("Access-token", os.environ["CLOUD_TOKEN"])
    # 后续正常使用各 API
```

</TabItem>
</Tabs>

## Token 有效期与刷新

| 部署方式 | Token 有效期 | 刷新方式 |
|---|---|---|
| 企业版 | \{TOKEN_TTL\}（请参阅服务端配置） | 重新调用登录接口获取新 Token |
| 云服务版 | 由浏览器会话控制 | 重新通过浏览器登录后从开发者工具获取 |

:::tip
建议将 Token 的获取和刷新封装为独立的工具函数，并在收到 `401 Unauthorized` 响应时自动触发刷新逻辑。
:::

## 安全建议

- **不要**将 Token、用户名或密码硬编码在源代码中
- 使用环境变量或密钥管理服务（如 Vault、AWS Secrets Manager）存储凭证
- 在生产环境中使用 HTTPS 连接 IDMP 服务器
