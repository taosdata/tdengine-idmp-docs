# TDengine IDMP SDK Usage Guide

## Introduction

TDengine IDMP SDK allows you to programmatically access the entire data assets without barriers. You can download SDK package from [TDengine Download Center](https://tdengine.com/downloads/). The downloaded package includes SDKs for Java and Python by default, and you can generate SDKs for other languages as needed using [OpenAPI Generator](https://openapi-generator.tech/).

## Directory and File Description

- idmp-v1.x.x.x.json: The OpenAPI specification file for IDMP SDK, which you can use to generate SDKs for other languages.
- idmp-java-sdk: Contains the source code and compiled JAR package for the Java language TDengine IDMP SDK.
- idmp-python-sdk: Contains the source code for the Python language TDengine IDMP SDK.

## Java SDK Usage Guide

### Introducing the SDK

If your development environment already has Maven, it is recommended to install idmp-sdk into the local Maven repository first for reference in the project.
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
Replace `{version}` with the actual version number, such as `1.0.13.0`.

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
  host = "http://localhost:6042",
  access_token = os.environ["BEARER_TOKEN"]
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

## How to Generate SDK

Download the OpenAPI Generator CLI tool:
```bash
 wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.6.0/openapi-generator-cli-7.6.0.jar -O openapi-generator-cli.jar
```
Use the following command to generate Java SDK:
```bash
java -jar openapi-generator-cli.jar generate  -i idmp-v1.x.x.x.json -g java -o idmp-java-sdk --library feign --additional-properties=groupId=com.taosdata,artifactId=idmp-sdk,version=1.0.0  --skip-validate-spec
```

Use the following command to generate Python SDK:
```bash
java -jar openapi-generator-cli.jar generate -i idmp-v1.x.x.x.json -g python -o idmp-python-sdk --library urllib3 --additional-properties=packageName=idmp_sdk --skip-validate-spec
```

For other languages, simply replace the `-g` parameter with the corresponding language name, and the --library parameter with the corresponding library name. Additionally, different languages have different additional parameters, which can be specified via --additional-properties. For details, please refer to the [OpenAPI Generator Documentation](https://openapi-generator.tech/docs/generators) and click on the corresponding language name for more information.
