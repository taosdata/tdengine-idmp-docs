# TDengine IDMP SDK Usage Guide

## Introduction

TDengine IDMP SDK allows you to programmatically access the entire data assets without barriers. You can download SDK package from [TDengine Download Center](https://tdengine.com/downloads/). The downloaded package includes SDKs for Java and Python by default, and you can generate SDKs for other languages as needed using [OpenAPI Generator](https://openapi-generator.tech/).

## Directory and File Description

- idmp-v1.x.x.x.json: The OpenAPI specification file for IDMP SDK, which you can use to generate SDKs for other languages.
- idmp-java-sdk: Contains the source code and compiled JAR package for the Java language TDengine IDMP SDK.
- idmp-python-sdk: Contains the source code for the Python language TDengine IDMP SDK.

## Java SDK Usage Guide

### 前提条件

1. 安装最新 Java 稳定版。（至少 Java 11）
2. 安装 Maven 命令行工具。

### Install the SDK

Install idmp-sdk into the local Maven repository first for reference in the project.

```bash
cd idmp-java-sdk
mvn install -DskipTests
```

Add the following dependency to your project's `pom.xml` file:

```xml
<dependency>
  <groupId>com.taosdata</groupId>
  <artifactId>idmp-sdk</artifactId>
  <version>{version}</version>
</dependency>
```

Replace `{version}` with the actual version number, such as `1.0.11.0`.

### Sample Program

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

## Python SDK Usage Guide

### 前提条件

安装 Python 开发环境。（python >= 3.10）

### Installing the SDK

You can install the Python SDK using pip. First, enter the `idmp-python-sdk` directory, then run the following command:

```bash
pip install .
```

### Example 1

Example of logging in and obtaining a Token.

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

### Example 2

Assuming the authentication token is already set in the environment variable, example of getting the UOM Class list.

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

## 云服务使用 SDK

如果您使用的是 [IDMP 的云服务版](https://idmp.taosdata.com/), 则不能使用上述登录方式。因为云服务的登录认证流程和企业版有所不同，云服务的前端代码封装了比较复杂的登录逻辑。建议您先通过浏览器登录云服务， 然后从浏览器的开发者工具的网络标签页找到任意一个对后端 API 的请求，例如：/api/v1/permissions/menus 这个请求（如果过滤不出这个请求可以刷新页面再过滤），复制以下三项数据：

1. 请求 URL 的 host 部分，对于不同的 IDMP 实例这个 URL 的 host 部分是不同的。它的格式是 [https://<实例ID>.idmp.taosdata.com]。
2. 请求标头 "Access-token" 的值， 这个是云服务认证用的 token。
3. 请求标头 “Authorization” 的值，这个的 idmp 认证用的 token。注意需要去掉前缀 "Bearer "。

然后将这 3 个值分别设置到环境变量中。假如：

Then set these 3 values into environment variables respectively. For example:

```sh
export CLOUD_HOST=https://your-instance-id.idmp.tdengine.com
export CLOUD_TOKEN='your-access-token-value'
export BEARER_TOKEN='your-authorization-token-value'
```

Finally, if you are using the Python client, you can create an API Client according to the following example:

```python
import idmp_sdk
from idmp_sdk.rest import ApiException
from pprint import pprint
import os


configuration = idmp_sdk.Configuration(
  host=os.environ['CLOUD_HOST'],
  access_token= os.environ['BEARER_TOKEN']
)

with idmp_sdk.ApiClient(configuration) as api_client:
  api_client.set_default_header("Access-token", os.environ['CLOUD_TOKEN'])
  api_instance = idmp_sdk.CategoryResourceApi(api_client)
  try:
    api_response = api_instance.api_v1_categories_get(idmp_sdk.CategoryType.ANALYSIS, system_only=False)
    pprint(api_response)
  except ApiException as e:
    print("Exception when calling CategoryResourceApi->api_v1_categories_get: %s\n" % e)
```

The usage for clients in other languages is similar.

## How to Generate SDK

Download the OpenAPI Generator CLI tool:

```bash
 wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.6.0/openapi-generator-cli-7.6.0.jar -O openapi-generator-cli.jar
```

Use the following command to generate Java SDK:

```bash
java -jar openapi-generator-cli.jar generate -i idmp-v1.x.x.x.json -g java -o idmp-java-sdk --library feign --additional-properties=groupId=com.taosdata,artifactId=idmp-sdk,version=1.0.0 --skip-validate-spec
```

Use the following command to generate Python SDK:

```bash
java -jar openapi-generator-cli.jar generate -i idmp-v1.x.x.x.json -g python -o idmp-python-sdk --library urllib3 --additional-properties=packageName=idmp_sdk --skip-validate-spec
```

For other languages, simply replace the `-g` parameter with the corresponding language name, and the --library parameter with the corresponding library name. Additionally, different languages have different additional parameters, which can be specified via --additional-properties. For details, please refer to the [OpenAPI Generator Documentation](https://openapi-generator.tech/docs/generators) and click on the corresponding language name for more information.
