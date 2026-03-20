---
title: Manejo de errores
sidebar_label: Manejo de errores
---

# 15.1.7 Manejo de errores

## Tipo de excepción

El SDK envuelve todos los errores de API en una única clase `ApiException`. Puede recuperar el código de estado HTTP y el mensaje de error del servidor desde ella.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
import org.openapitools.client.ApiException;

try {
    ElementDTO element = elementApi.apiV1ElementsIdGet("nonexistent-id");
} catch (ApiException e) {
    System.err.println("HTTP status: " + e.getCode());
    System.err.println("Error message: " + e.getMessage());
    System.err.println("Response body: " + e.getResponseBody());
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
from idmp_sdk.rest import ApiException

try:
    element = element_api.api_v1_elements_id_get("nonexistent-id")
except ApiException as e:
    print(f"HTTP status: {e.status}")
    print(f"Reason: {e.reason}")
    print(f"Response body: {e.body}")
```

</TabItem>
</Tabs>

## Códigos de error comunes

| Estado HTTP | Significado | Causa común | Acción recomendada |
|---|---|---|---|
| 400 | Solicitud incorrecta | Tipo de parámetro incorrecto o campo requerido faltante | Verifique los parámetros de la solicitud |
| 401 | No autenticado | Token faltante o expirado | Vuelva a autenticarse y obtenga un nuevo token |
| 403 | Prohibido | El usuario actual no tiene permiso para este recurso | Revise la configuración de rol del usuario y acceso a elementos |
| 404 | No encontrado | ID incorrecto o el recurso ha sido eliminado | Verifique el ID del recurso |
| 429 | Demasiadas solicitudes | Límite de tasa de la API excedido | Reduzca la frecuencia de solicitudes; agregue reintentos con retroceso |
| 500 | Error interno del servidor | Excepción en el lado del servidor | Reintente más tarde o contacte al administrador |

## Patrón de reintento recomendado

Para `429` (limitación de tasa) y `5xx` (errores del servidor), use **retroceso exponencial**:

<Tabs groupId="language">
<TabItem value="python" label="Python">

```python
import time
from idmp_sdk.rest import ApiException

def call_with_retry(fn, max_retries=3, base_delay=1.0):
    """
    Retry wrapper with exponential backoff.
    Retries on 429 and 5xx errors only; raises immediately on 4xx client errors.
    """
    for attempt in range(max_retries):
        try:
            return fn()
        except ApiException as e:
            if e.status == 429 or e.status >= 500:
                if attempt == max_retries - 1:
                    raise
                wait = base_delay * (2 ** attempt)   # 1s, 2s, 4s...
                print(f"Request failed ({e.status}), retrying in {wait}s...")
                time.sleep(wait)
            else:
                raise  # 4xx errors are not retried

# Usage
result = call_with_retry(
    lambda: element_api.api_v1_elements_get(page_num=1, page_size=50)
)
```

</TabItem>
<TabItem value="java" label="Java">

```java
import org.openapitools.client.ApiException;
import java.util.concurrent.TimeUnit;

public static <T> T callWithRetry(ApiCall<T> call, int maxRetries) throws ApiException, InterruptedException {
    for (int attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return call.execute();
        } catch (ApiException e) {
            if ((e.getCode() == 429 || e.getCode() >= 500) && attempt < maxRetries - 1) {
                long waitMs = (long) (1000 * Math.pow(2, attempt)); // 1s, 2s, 4s...
                System.err.println("Request failed (" + e.getCode() + "), retrying in " + waitMs + "ms...");
                TimeUnit.MILLISECONDS.sleep(waitMs);
            } else {
                throw e;
            }
        }
    }
    throw new RuntimeException("Should not reach here");
}

@FunctionalInterface
interface ApiCall<T> {
    T execute() throws ApiException;
}
```

</TabItem>
</Tabs>

## Consejos de depuración

- Con un `401`, verifique primero si el token ha expirado — no asuma que hay un error en el código.
- Con un `400`, imprima el `responseBody` completo. El servidor normalmente incluye una descripción específica de qué parámetro es inválido.
- Durante el desarrollo, habilite el registro de solicitudes HTTP en el SDK para rastrear la solicitud y respuesta sin procesar.
