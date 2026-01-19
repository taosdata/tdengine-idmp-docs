# TDengine IDMP SDK 使用说明

TDengine IDMP SDK 使您可以以编程的方式无障碍访问整个数据资产。
在[TDengine 下载中心](https://www.taosdata.com/download-center)可以下载 SDK 的压缩包。
这个压缩包默认包含了 Java 和 Python 两种语言的 SDK，您可以根据需要使用 [OpenAPI Generator](https://openapi-generator.tech/) 生成其它语言的 SDK。

## SDK 压缩包目录和文件说明

- idmp-v1.x.x.x.json：IDMP SDK 的 OpenAPI 规范文件，您可以使用它生成其它语言的 SDK。
- idmp-java-sdk: 包含 Java 语言的 TDengine IDMP SDK 源码和编译后的 JAR 包。
- idmp-python-sdk: 包含 Python 语言的 TDengine IDMP SDK 源码。

## Java SDK 使用说明

### 引入 SDK

如果您的开发环境已经有 maven，建议先将 idmp-sdk 安装到本地 maven 仓库，以便在项目中引用。

```bash
cd idmp-java-sdk
mvn install -DskipTests
```

在您的项目的 `pom.xml` 文件中添加以下依赖：

```xml
<dependency>
  <groupId>com.taosdata</groupId>
  <artifactId>idmp-sdk</artifactId>
  <version>{version}</version>
</dependency>
```

将 `{version}` 替换为实际的版本号，例如 `1.0.13.0`。

### 示例程序

```java
package org.openapitools.client.examples;

import org.junit.jupiter.api.Test;
import org.openapitools.client.ApiClient;
import org.openapitools.client.api.ElementResourceApi;
import org.openapitools.client.api.ElementResourceApi.ApiV1ElementsGetQueryParams;
import org.openapitools.client.api.UserResourceApi;
import org.openapitools.client.model.LoginReqDTO;
import org.openapitools.client.model.LoginRspDTO;
import org.openapitools.client.model.PageOfBasicElementDTO;

/**
 * A simple test class to demonstrate how to use the generated API client
 */
public class ElementApiTest {

  @Test
  void testGetElements() {
    // Specify authentication method "Authorization" when creating ApiClient
    // This will create an HttpBearerAuth interceptor
    ApiClient apiClient = new ApiClient("Authorization");
    apiClient.setBasePath("http://localhost:6042"); // Replace with your actual IDMP server URL

    // Log in
    UserResourceApi userResourceApi = apiClient.buildClient(UserResourceApi.class);
    LoginReqDTO loginReqDTO = new LoginReqDTO();
    loginReqDTO.setLoginName(System.getenv("IDMP_USERNAME")); // Replace with your actual login name
    loginReqDTO.setPassword(System.getenv("IDMP_PASSWORD")); // Replace with your actual password
    LoginRspDTO loginRsp = userResourceApi.apiV1UsersLoginPost(loginReqDTO);
    String token = loginRsp.getToken();
    System.out.println("Login successful, token: " + token);

    // Set the obtained token into the ApiClient
    // This will automatically add the token to the Authorization header of subsequent requests
    apiClient.setBearerToken(token);

    // Retrieve list of elements
    // This request will automatically include the Authorization: Bearer <token> header
    ElementResourceApi elementResourceApi = apiClient.buildClient(ElementResourceApi.class);
    ApiV1ElementsGetQueryParams queryParams = new ApiV1ElementsGetQueryParams();
    PageOfBasicElementDTO elements = elementResourceApi.apiV1ElementsGet(queryParams);
    // Print the retrieved elements
    System.out.println(elements);
  }
}
```

## Python SDK 使用说明

### 安装 SDK

您可以使用 pip 安装 Python SDK。首先，进入 `idmp-python-sdk` 目录，然后运行以下命令：

```bash
pip install .
```

### 示例一

登录并获取 Token 的示例。

```python
from pprint import pprint

import idmp_sdk
import os
from idmp_sdk.rest import ApiException

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = idmp_sdk.Configuration(
  # The base URL of the API server, please replace it with your own server address
  host="http://localhost:6042"
)

with idmp_sdk.ApiClient(configuration) as api_client:
  # Create an instance of the API class
  api_instance = idmp_sdk.UserResourceApi(api_client)
  # Create LoginReqDTO, please replace username and password with your own info
  req_dto = idmp_sdk.LoginReqDTO(
      login_name=os.environ["IDMP_USERNAME"],
      password=os.environ["IDMP_PASSWORD"]
  )
  try:
    # Create analysis from prompt
    api_response = api_instance.api_v1_users_login_post(req_dto)
    print(
      "The response of UserResourceApi->api_v1_users_login_post:\n")
    pprint(api_response)
  except ApiException as e:
    print(
      "Exception when calling UserResourceApi->api_v1_users_login_post: %s\n" % e)
```

### 示例二

假如认证 token 已经设置到了环境变量，获取 UOM Class 列表的示例。

```python
import idmp_sdk
from idmp_sdk.rest import ApiException
from pprint import pprint
import os

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.
# Configure Bearer authorization (JWT): Authorization
configuration = idmp_sdk.Configuration(
  # The base URL of the API server, please replace it with your own server address
  host="http://localhost:6042",
  access_token=os.environ["BEARER_TOKEN"]
)


# Enter a context with an instance of the API client
with idmp_sdk.ApiClient(configuration) as api_client:
  # Create an instance of the API class
  api_instance = idmp_sdk.UomResourceApi(api_client)
  try:
    # Create analysis from prompt
    api_response = api_instance.api_v1_uomclasses_get()
    print("The response of UomResourceApi->api_v1_uomclasses_get:\n")
    pprint(api_response)
  except ApiException as e:
    print("Exception when calling UomResourceApi->api_v1_uomclasses_get: %s\n" % e)
```

## 生成 SDK 的方法

下载 OpenAPI Generator CLI 工具：

```bash
 wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.6.0/openapi-generator-cli-7.6.0.jar -O openapi-generator-cli.jar
```

使用以下命令生成 Java SDK：

```bash
java -jar openapi-generator-cli.jar generate -i idmp-v1.x.x.x.json -g java -o idmp-java-sdk --library feign --additional-properties=groupId=com.taosdata,artifactId=idmp-sdk,version=1.0.0 --skip-validate-spec
```

使用以下命令生成 Python SDK：

```bash
java -jar openapi-generator-cli.jar generate -i idmp-v1.x.x.x.json -g python -o idmp-python-sdk --library urllib3 --additional-properties=packageName=idmp_sdk --skip-validate-spec
```

对于其它语言，��参数替换为对应语言的名称即可，将 --library 参数替换为对应语言的库名称。另外不同语言有不同的附加参数，可通过--additional-properties 指定，具体请参考-properties 指定 ，具体请参考 [OpenAPI Generator 文档](https://openapi-generator.tech/docs/generators) 点击对应语言名称查看详情。
