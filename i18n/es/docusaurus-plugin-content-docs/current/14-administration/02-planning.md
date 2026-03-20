---
title: Planificación
sidebar_label: Planificación
---

# 14.2 Planificación

## Requisitos de hardware

Los requisitos mínimos de hardware para ejecutar TDengine IDMP son:

- **CPU:** 4 núcleos
- **Memoria:** 10 GB
- **Disco:** 50 GB de espacio libre

Para despliegues en producción, dimensione los recursos en función del número de elementos (activos) gestionados:

### Recursos del servicio IDMP

| Escala de elementos | CPU | Memoria | Disco | Caso de uso típico |
|:---:|:---:|:---:|:---:|:---|
| < 10,000 | 4 núcleos | 10 GB | 50 GB | PoC / demostración / proyectos pequeños |
| 10,000 – 100,000 | 8 núcleos | 16 GB | 100 GB | Producción pequeña a mediana |
| 100,000 – 500,000 | 16 núcleos | 32 GB | 200 GB | Producción mediana |
| 500,000 – 1,000,000 | 32 núcleos | 64 GB | 500 GB | Producción grande |
| > 1,000,000 | 64+ núcleos | 128+ GB | 1 TB+ | Producción muy grande |

### Recursos de dependencias externas

Cuando la escala de elementos es grande, planifique recursos dedicados para los componentes de dependencias externas:

| Componente | 10K–100K elementos | 100K–500K elementos | 500K+ elementos |
|:---|:---:|:---:|:---:|
| Redis | 2 núcleos / 4 GB | 4 núcleos / 8 GB | 8 núcleos / 16 GB (clúster) |
| MySQL | 4 núcleos / 8 GB | 8 núcleos / 16 GB | 16 núcleos / 32 GB (primario-réplica) |
| DFS | 100 GB | 500 GB | 1 TB+ |

### Directrices de planificación

- **Tipo de disco:** Use SSD en producción para obtener un rendimiento significativamente mejor en consultas e importación/exportación.
- **Ancho de banda de red:** Para despliegues a gran escala, use redes internas de 10 Gbps para soportar la recopilación de datos y el rendimiento de consultas.
- **Margen de crecimiento:** Planifique recursos a 1,5 veces el recuento máximo esperado de elementos para acomodar el crecimiento del negocio.

:::note
Estas cifras son directrices de referencia. Las necesidades reales de recursos dependen de la complejidad del modelado y las características de la carga de trabajo. Para la planificación de capacidad de TDengine TSDB, consulte la documentación de TDengine TSDB.
:::

## Sistemas operativos compatibles

| SO | Versiones compatibles | x86_64 | arm64 |
|:---:|:---:|:---:|:---:|
| Ubuntu | 20.04, 22.04 | Sí | Sí |
| Debian | 10, 11, 12 | Sí | Sí |
| CentOS | 8 | Sí | Sí |
| macOS | 13, 14, 15 | Sí | Sí |
| Windows | 10, 11, Server 2019+ | Sí | Sí |

## Prerrequisitos de software

| Dependencia | Versión |
|---|---|
| Python | 3.12 |
| Java | 21 o posterior |
| glibc | 2.25 o posterior |
| TDengine TSDB Enterprise | 3.3.7.0 o posterior |
| Servicio de correo SMTP | Requerido para notificaciones por correo electrónico; despliegue internamente si el servidor no puede acceder a internet |

## Puertos de red

TDengine IDMP utiliza los siguientes puertos por defecto:

| Puerto | Protocolo | Descripción |
|---|---|---|
| 6042 | HTTP | Puerto externo — interfaz Web UI y REST API de IDMP (acceso desde navegador y API) |
| 6034 | HTTPS | Puerto externo — acceso seguro a la interfaz Web UI y REST API; recomendado para producción |
| 6038 | HTTP | Puerto interno — interfaz web de la base de datos H2 embebida |
| 6039 | TCP | Puerto interno — listener de la base de datos H2 embebida |
| 6040 | HTTP | Puerto interno — API del servicio de chat interno |

Asegúrese de que los puertos externos (6042 y 6034) estén abiertos en el cortafuegos. Mantenga los puertos internos accesibles únicamente dentro de la red privada.

## Directorio de instalación

TDengine IDMP se instala por defecto en `/usr/local/taos/idmp`. La estructura del directorio es:

| Directorio | Descripción |
|---|---|
| `app` | Enlace simbólico a `standalone/app` |
| `backend` | Binarios del servicio backend |
| `bin` | Scripts de inicio/detención |
| `chat` | Archivos del servicio de chat |
| `config` | Archivos de configuración del servicio (incluye `application.yml`) |
| `data` | Archivos de datos (enlace simbólico a `/var/lib/taos`) |
| `frontend` | Recursos estáticos del frontend |
| `lib` | Dependencias de bibliotecas del backend |
| `logs` | Archivos de registro (enlace simbólico a `/var/log/taos`) |
| `quarkus` | Archivos del framework del servicio backend |
| `service` | Configuración del servicio del sistema |
| `standalone` | Archivos del servicio integrado frontend/backend |
