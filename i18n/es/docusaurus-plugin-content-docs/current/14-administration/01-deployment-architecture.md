---
title: Arquitectura de despliegue
sidebar_label: Arquitectura de despliegue
---

# 14.1 Arquitectura de despliegue

TDengine IDMP soporta tres topologías de despliegue típicas: **instancia única**, **alta disponibilidad mínima (HA Minimal)** y **alta disponibilidad compleja (HA Complex)**. Cada topología se adapta a diferentes requisitos de escala y disponibilidad.

## Descripción general

El despliegue de TDengine IDMP generalmente se compone de las siguientes capas:

- **Capa de recopilación de datos:** Los agentes taosX se conectan a fuentes de datos como OPC-UA/DA, MQTT, Aveva PI y otras, recopilan los datos y los reenvían a TDengine TSDB.
- **Capa de servicios:** TDengine IDMP (instancia única o múltiples instancias) proporciona la lógica de negocio; TDengine TSDB se encarga del almacenamiento y el servicio de datos de series temporales.
- **Capa de acceso y gobernanza (opcional):** El API Gateway actúa como punto de entrada externo unificado, proporcionando enrutamiento, autenticación y gestión del tráfico.
- **Dependencias externas (según el escenario):** Redis, MySQL, sistema de archivos distribuido, y opcionalmente Elasticsearch, Kafka y Apollo.
- **Perímetro de red:** El cortafuegos aísla el lado de recopilación de datos del lado de servicios. La comunicación entre perímetros debe abrir únicamente los puertos mínimos necesarios.

## Instancia única

La topología de instancia única está orientada a escenarios de entrega rápida y baja complejidad operativa, siendo adecuada para validaciones PoC, demostraciones, despliegues de pequeña escala o entornos air-gapped.

![Despliegue de instancia única](./images/single_deploy.png)

TDengine IDMP se ejecuta como un proceso único, proporcionando tanto la interfaz Web UI como la REST API. El agente taosX recopila datos y los escribe en TDengine TSDB a través del cortafuegos; IDMP accede internamente a TSDB para la gestión y consulta de datos.

**Relaciones de conexión:**

- Navegador web → **TDengine IDMP (puerto 6042)**
- Agente taosX → (a través del cortafuegos) → **TDengine TSDB (puerto 6055)**
- **TDengine IDMP → TDengine TSDB (puerto 6041)**

**Características:**

- Mínimo de componentes y rutas más cortas; el menor costo de despliegue y operación.
- El navegador se conecta directamente a IDMP — la autenticación, la limitación de tasa y la auditoría deben gestionarse en la capa de servicios.
- Escalar a múltiples instancias generalmente requiere agregar un API Gateway o un balanceador de carga.
- Utiliza la base de datos H2 embebida, el sistema de archivos local y la caché interna, sin depender de MySQL externo, DFS ni Redis.

## Alta disponibilidad mínima (HA Minimal)

La topología de alta disponibilidad mínima está orientada a una línea de base lista para producción con una complejidad manejable. Introduce un API Gateway como punto de entrada externo unificado, donde solo el gateway está expuesto al exterior. IDMP puede escalar a múltiples instancias detrás del gateway.

![Despliegue de alta disponibilidad mínima](./images/simple_deploy.png)

**Relaciones de conexión:**

- Navegador web → **API Gateway** → **TDengine IDMP (puerto 6042)**
- Agente taosX → (a través del cortafuegos) → **TDengine TSDB (puerto 6055)**
- **TDengine IDMP ↔ TDengine TSDB (puerto 6041)**
- Dependencias de IDMP: **Redis / MySQL / Sistema de archivos distribuido**

**Características:**

- Proporciona un único punto de entrada externo a través del gateway; IDMP no está expuesto directamente.
- Incluye las tres dependencias de infraestructura más comunes, conformando la línea de base de producción.
- Adecuado para despliegues que buscan una gobernanza de gateway estandarizada antes de ampliar capacidades.
- Utiliza Lucene interno en lugar de Elasticsearch; utiliza cola de mensajes Redis en lugar de Kafka; utiliza configuración de servicio interna en lugar de Apollo.

## Alta disponibilidad compleja (HA Complex)

La topología de alta disponibilidad compleja está orientada a entornos de producción medianos y grandes con requisitos de integración empresarial. IDMP opera en un clúster de múltiples instancias de alta disponibilidad detrás del API Gateway. Se introducen dependencias externas completas para soportar desacoplamiento asíncrono, búsqueda centralizada, configuración dinámica y gobernanza de servicios.

![Despliegue de alta disponibilidad compleja](./images/complex_deploy.png)

**Relaciones de conexión:**

- Navegador web → **API Gateway** → **TDengine IDMP (múltiples instancias)**
- Agente taosX → (a través del cortafuegos) → **TDengine TSDB (puerto 6055)**
- **TDengine IDMP → TDengine TSDB (puerto 6041)**
- Dependencias de IDMP: **Redis, MySQL, sistema de archivos distribuido, Elasticsearch, Kafka, Apollo**

**Características:**

- Múltiples instancias de IDMP mejoran el rendimiento y la disponibilidad.
- La pila externa completa soporta búsqueda centralizada (Elasticsearch), mensajería asíncrona (Kafka) y configuración dinámica (Apollo).
- Mayor complejidad de despliegue y operación; adecuado para entornos con requisitos estrictos de fiabilidad, auditoría y escalabilidad.

## Componentes clave

### API Gateway

El API Gateway es el punto de entrada unificado entre los clientes externos y los servicios internos.

| Responsabilidad | Descripción |
|---|---|
| **Punto de entrada unificado** | Expone una única dirección/puerto al exterior; los servicios backend no están expuestos directamente |
| **Enrutamiento y balanceo de carga** | Distribuye las solicitudes entre las instancias de IDMP y TSDB |
| **Seguridad** | Terminación TLS, autenticación unificada (Token/SSO), control de acceso por IP |
| **Gobernanza del tráfico** | Limitación de tasa, disyuntor, reintentos, tiempos de espera, lanzamientos canary |
| **Observabilidad** | Registros de acceso centralizados, métricas y trazado distribuido |

### Dependencias externas

| Componente | Función | Alternativa para instancia única |
|---|---|---|
| **Redis** | Caché, estado de vida corta, bloqueos distribuidos | Caché y bloqueos internos |
| **MySQL** | Metadatos relacionales (usuarios, permisos, tareas, configuración) | Base de datos H2 embebida |
| **Sistema de archivos distribuido** | Persistencia de archivos/objetos (metadatos, gráficos, archivos de importación/exportación) | Sistema de archivos local |
| **Elasticsearch** | Gestión de índices centralizada y búsqueda de texto completo | Lucene interno |
| **Kafka** | Mensajería asíncrona y bus de eventos (desacoplamiento, orquestación de tareas, notificaciones) | Cola de mensajes interna (instancia única) o Redis MQ (HA mínima) |
| **Apollo** | Centro de configuración (configuración dinámica, gestión de versiones) | Configuración de servicio interna |

## Recomendaciones de despliegue

1. **Use instancia única para PoC; use alta disponibilidad para producción.** Comience con instancia única para una validación rápida; priorice HA Minimal para producción y evolucione hacia HA Complex según crezcan los requisitos.

2. **Minimice la exposición externa.** Exponga solo el gateway al exterior; mantenga los puertos internos (como el 6041) dentro de la red privada.

3. **Escale IDMP horizontalmente según sea necesario.** Utilice múltiples instancias de IDMP para mejorar la alta disponibilidad y el rendimiento; configure el manejo de sesiones y el balanceo de carga en el gateway.

4. **Planifique la alta disponibilidad para las dependencias externas.** Configure copias de seguridad y alta disponibilidad para Redis, MySQL y el sistema de archivos distribuido. Una vez habilitados, incorpore Kafka, Elasticsearch y Apollo en el monitoreo y la planificación de capacidad.

5. **Centralice la observabilidad.** Recopile registros y métricas del gateway, IDMP, TSDB y las dependencias clave; establezca alertas y trazado distribuido para simplificar la resolución de problemas.
