---
title: 快速开始
sidebar_label: 快速开始
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note 前置条件
请先完成 [安装](./01-installation.md)。本指南大约需要 5 分钟，带您完成第一次 API 调用。
:::

# 15.1.2 快速开始

## 15.1.2.1 目标

完成本页后，您将能够：

1. 使用用户名和密码登录以获取访问 Token
2. 使用 Token 查询元素列表

## 15.1.2.2 第一步——配置连接

将服务器地址和凭据存储在环境变量中，避免在源代码中硬编码敏感信息：

```bash
export IDMP_HOST=http://localhost:6042   # 替换为您的 IDMP 服务器地址
export IDMP_USERNAME=your_username
export IDMP_PASSWORD=your_password
```

## 15.1.2.3 第二步——登录并获取 Token

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

## 15.1.2.4 第三步——查询元素列表

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

## 15.1.2.5 后续步骤

完成快速入门后，可通过以下文档进一步了解 SDK 的认证机制、核心概念与完整 API。

- 了解所有认证选项，包括云服务认证 → [认证](./03-authentication.md)
- 了解 SDK 中的核心对象 → [核心概念](./04-core-concepts.md)
- 浏览完整 API 参考 → [API 参考](./05-api-reference/index.md)
