---
title: Autenticación
sidebar_label: Autenticación
---

# 15.1.3 Autenticación

El SDK de IDMP utiliza **Bearer Token (JWT)** para la autenticación. La forma de obtener un token depende de su tipo de despliegue.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Autenticación empresarial (autoalojada)

Para despliegues autoalojados, obtenga un token llamando al endpoint de inicio de sesión con un nombre de usuario y contraseña.

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

## Autenticación del servicio en la nube

El servicio en la nube requiere dos tokens en cada solicitud: `Authorization` (Bearer Token) y `Access-token`.

**Pasos para obtener los tokens:**

1. Inicie sesión en el servicio en la nube desde su navegador (`https://<instance-id>.idmp.taosdata.com`).
2. Abra las Herramientas para desarrolladores del navegador → pestaña Red.
3. Actualice la página y localice cualquier solicitud de API del backend (p. ej., `/api/v1/permissions/menus`).
4. Copie los siguientes tres valores:

| Elemento | Descripción |
|---|---|
| Host de la URL de solicitud | Formato: `https://<instance-id>.idmp.taosdata.com` |
| Cabecera de solicitud `Access-token` | Token de autenticación específico del servicio en la nube |
| Cabecera de solicitud `Authorization` | Bearer Token — use el valor sin el prefijo `Bearer` |

5. Establezca los valores como variables de entorno:

```bash
export CLOUD_HOST=https://<instance-id>.idmp.taosdata.com
export CLOUD_TOKEN=<Access-token value>
export BEARER_TOKEN=<Authorization token value (without the "Bearer " prefix)>
```

6. Inicialice el cliente en el código:

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

## Vida útil y actualización del token

| Despliegue | Vida útil del token | Cómo actualizar |
|---|---|---|
| Empresarial (autoalojado) | Configurado en el servidor (consulte `application.yml`) | Llame al endpoint de inicio de sesión nuevamente para obtener un nuevo token |
| Servicio en la nube | Controlado por la sesión del navegador | Inicie sesión de nuevo desde el navegador y copie los nuevos tokens desde las DevTools |

:::tip
Envuelva la adquisición y actualización de tokens en una función de utilidad. Active una actualización automáticamente cuando reciba una respuesta `401 Unauthorized`.
:::

## Mejores prácticas de seguridad

- **Nunca** codifique tokens, nombres de usuario o contraseñas directamente en el código fuente.
- Almacene las credenciales en variables de entorno o en un gestor de secretos (Vault, AWS Secrets Manager, etc.).
- Utilice siempre HTTPS al conectarse a un servidor IDMP en producción.
