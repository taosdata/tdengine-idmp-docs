# 快速开始

:::note 前提条件
请先完成 [安装](./02-installation.md)。本页从认证开始，5 分钟内完成第一次 API 调用。
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 目标

完成本页后，您将能够：

1. 使用用户名和密码登录，获取访问令牌
2. 使用令牌查询元素列表

## 第一步：配置连接

将服务器地址和账号信息设置到环境变量中，避免在代码中硬编码凭证：

```bash
export IDMP_HOST=http://localhost:6042   # 替换为您的 IDMP 服务器地址
export IDMP_USERNAME=your_username
export IDMP_PASSWORD=your_password
```

## 第二步：登录并获取令牌

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
import org.openapitools.client.ApiClient;
import org.openapitools.client.api.UserResourceApi;
import org.openapitools.client.model.LoginReqDTO;
import org.openapitools.client.model.LoginRspDTO;

// 1. 创建客户端，指定认证方式为 Bearer Token
ApiClient apiClient = new ApiClient("Authorization");
apiClient.setBasePath(System.getenv("IDMP_HOST"));

// 2. 登录，获取令牌
UserResourceApi userApi = apiClient.buildClient(UserResourceApi.class);
LoginReqDTO loginReq = new LoginReqDTO();
loginReq.setLoginName(System.getenv("IDMP_USERNAME"));
loginReq.setPassword(System.getenv("IDMP_PASSWORD"));

LoginRspDTO loginRsp = userApi.apiV1UsersLoginPost(loginReq);
String token = loginRsp.getToken();
System.out.println("登录成功，Token: " + token);

// 3. 将令牌设置到客户端，后续请求自动携带
apiClient.setBearerToken(token);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import os
import idmp_sdk
from idmp_sdk.rest import ApiException

# 1. 创建配置，指定服务器地址
configuration = idmp_sdk.Configuration(
    host=os.environ["IDMP_HOST"]
)

# 2. 登录，获取令牌
with idmp_sdk.ApiClient(configuration) as api_client:
    user_api = idmp_sdk.UserResourceApi(api_client)
    login_req = idmp_sdk.LoginReqDTO(
        login_name=os.environ["IDMP_USERNAME"],
        password=os.environ["IDMP_PASSWORD"]
    )
    login_rsp = user_api.api_v1_users_login_post(login_req)
    token = login_rsp.token
    print(f"登录成功，Token: {token}")
```

</TabItem>
</Tabs>

## 第三步：查询元素列表

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
import org.openapitools.client.api.ElementResourceApi;
import org.openapitools.client.api.ElementResourceApi.ApiV1ElementsGetQueryParams;
import org.openapitools.client.model.PageOfBasicElementDTO;

// 接上一步，apiClient 已设置好 Token
ElementResourceApi elementApi = apiClient.buildClient(ElementResourceApi.class);
ApiV1ElementsGetQueryParams queryParams = new ApiV1ElementsGetQueryParams();
PageOfBasicElementDTO elements = elementApi.apiV1ElementsGet(queryParams);

System.out.println("元素列表：" + elements);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import os
import idmp_sdk

# 使用已获取的 Token 初始化配置
configuration = idmp_sdk.Configuration(
    host=os.environ["IDMP_HOST"],
    access_token=os.environ["BEARER_TOKEN"]   # 将上一步获取的 Token 存入环境变量
)

with idmp_sdk.ApiClient(configuration) as api_client:
    element_api = idmp_sdk.ElementResourceApi(api_client)
    elements = element_api.api_v1_elements_get()
    print(f"共找到 {len(elements.data)} 个元素")
    for elem in elements.data:
        print(f"  - {elem.name} ({elem.id})")
```

</TabItem>
</Tabs>

## 下一步

- 了解所有认证方式（包括云服务认证）→ [认证](./04-authentication.md)
- 了解 SDK 中的核心对象 → [核心概念](./05-core-concepts.md)
- 查看 API 完整参考 → [API 参考](./06-api-reference/index.md)
