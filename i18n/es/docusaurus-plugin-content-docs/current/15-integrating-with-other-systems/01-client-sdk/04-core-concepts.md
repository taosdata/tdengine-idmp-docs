---
title: Conceptos fundamentales
sidebar_label: Conceptos fundamentales
---

# 15.1.4 Conceptos fundamentales

Los objetos del SDK se corresponden uno a uno con los conceptos del producto IDMP. Comprender estas correspondencias le ayuda a localizar rápidamente la API que necesita.

## Mapeo de objetos

| Clase / Módulo del SDK | Concepto de IDMP | Descripción |
|---|---|---|
| `ApiClient` | — | Punto de entrada del SDK; gestiona la conexión, la autenticación y el despacho de solicitudes |
| `ElementResourceApi` | Elemento | Nodos en el árbol de activos: equipos, sistemas, áreas |
| `AttributeResourceApi` | Atributo | Propiedades con nombre de un elemento; pueden vincularse a datos de series temporales o valores estáticos |
| `MetricResourceApi` | Métrica | Flujo de datos de series temporales de los datos históricos y en tiempo real de un atributo |
| `EventResourceApi` | Evento | Registros de alarma o cambio de estado activados por reglas de análisis |
| `PanelResourceApi` | Panel | Gráfico de visualización asociado a un elemento |
| `UserResourceApi` | Usuario | Gestión de usuarios y autenticación |
| `UomResourceApi` | UOM | Clases y conversiones de unidades de medida |

## Jerarquía de acceso a datos

El acceso a datos del SDK de IDMP sigue esta jerarquía:

```text
Element
  └─ Attribute
       └─ Time-Series Data (Metric)
```

**Flujo típico de lectura de datos:**

1. Use `ElementResourceApi` para encontrar el elemento objetivo (por nombre, ruta o ID).
2. Use el ID del elemento para consultar su lista de atributos (`AttributeResourceApi`).
3. Use el ID del atributo para consultar datos de series temporales (`MetricResourceApi`).

## Paginación

Todos los endpoints de lista soportan paginación. El formato de respuesta es:

```json
{
  "data": [...],        // records on the current page
  "total": 100,         // total record count
  "pageNum": 1,         // current page number (1-based)
  "pageSize": 20        // records per page
}
```

Controle la paginación con los parámetros de consulta `pageNum` y `pageSize`:

```python
# Python example
result = element_api.api_v1_elements_get(page_num=1, page_size=50)
```

## Estructura de solicitud y respuesta

Todas las respuestas de la API siguen un formato consistente:

```json
{
  "code": 0,            // 0 = success; non-zero = error
  "message": "success", // status description
  "data": { ... }       // actual response payload
}
```

Cuando `code` es distinto de cero, el SDK lanza una `ApiException`. Consulte [Manejo de errores](./07-error-handling.md) para más detalles.

## Formato de tiempo

Todos los parámetros de tiempo y valores de retorno usan **marcas de tiempo Unix en milisegundos** (UTC).

```python
import time

# Query the last 1 hour of data
now_ms = int(time.time() * 1000)
one_hour_ago_ms = now_ms - 3600 * 1000
```
