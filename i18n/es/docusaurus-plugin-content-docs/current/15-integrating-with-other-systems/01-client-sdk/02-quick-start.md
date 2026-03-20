---
title: Inicio rápido
sidebar_label: Inicio rápido
---

# 15.1.2 Inicio rápido

:::note Prerrequisitos
Complete primero la [Instalación](./01-installation.md). Esta guía toma aproximadamente 5 minutos y le lleva a través de su primera llamada a la API.
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Objetivo

Al final de esta página podrá:

1. Iniciar sesión con un nombre de usuario y contraseña para obtener un token de acceso
2. Usar el token para consultar la lista de elementos

## Paso 1 — Configurar la conexión

Almacene la dirección del servidor y las credenciales en variables de entorno para evitar codificar secretos en el código fuente:

```bash
export IDMP_HOST=http://localhost:6042   # reemplace con la dirección de su servidor IDMP
export IDMP_USERNAME=your_username
export IDMP_PASSWORD=your_password
```

## Paso 2 — Iniciar sesión y obtener un token

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

## Paso 3 — Consultar la lista de elementos

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

## Próximos pasos

- Entender todas las opciones de autenticación, incluida la autenticación del servicio en la nube → [Autenticación](./03-authentication.md)
- Entender los objetos principales del SDK → [Conceptos fundamentales](./04-core-concepts.md)
- Explorar la referencia de API completa → [Referencia de API](./05-api-reference/index.md)
