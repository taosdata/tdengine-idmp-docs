---
title: Conexión al LLM
sidebar_label: Conexión al LLM
---

# 8.1 Conexión al LLM

La mayoría de las funciones de IA en IDMP — generación de paneles, sugerencias de análisis, chat con IA, análisis de causa raíz — requieren una conexión a un LLM externo. IDMP utiliza una interfaz compatible con OpenAI, por lo que puede usarse cualquier proveedor de servicios LLM o modelo alojado localmente que exponga una API compatible con OpenAI.

## Conexión de prueba integrada

IDMP incluye una conexión de IA de prueba integrada que está activa durante 15 días después de la instalación. Durante el período de prueba, todas las funciones de IA que dependen del LLM funcionan de inmediato sin ninguna configuración. Una vez que la prueba expire, deberá configurar su propia conexión de IA para continuar usando estas funciones.

Las funciones basadas en TDgpt (detección de anomalías, pronóstico, imputación de datos faltantes) son independientes de la conexión al LLM. Requieren que el módulo TDgpt esté instalado junto con IDMP.

## Configurar una conexión de IA

Las conexiones de IA se gestionan en la sección **Gestión de conexiones** de la configuración del sistema, junto con las conexiones de datos de TDengine.

Para agregar o editar una conexión de IA:

1. Navegue a **Configuración** → **Gestión de conexiones**.
2. Haga clic en **+ Agregar conexión** y seleccione el tipo de conexión **IA**.
3. Complete los campos de la conexión:

| Campo | Descripción |
|---|---|
| **Nombre de la conexión** | Un nombre único para identificar esta conexión de IA |
| **Endpoint de API** | La URL base de la API compatible con OpenAI (por ejemplo, `https://api.openai.com/v1`) |
| **Clave de API** | La clave de autenticación de la API. Déjela en blanco para implementaciones locales que no requieran autenticación. |
| **Modelo de Q&A** | El modelo utilizado para consultas en lenguaje natural estándar y para la generación de paneles/análisis (por ejemplo, `gpt-4o`) |
| **Modelo de pensamiento profundo** | El modelo utilizado para tareas analíticas complejas que requieren razonamiento extendido, como el análisis de causa raíz (por ejemplo, `o1` u `o3`) |

4. Haga clic en **Probar conexión** para verificar el endpoint y las credenciales.
5. Haga clic en **Guardar**.

## Configuración de doble modelo

IDMP utiliza dos modelos distintos de la misma conexión de IA:

- **Modelo de Q&A** — gestiona las interacciones cotidianas: responder consultas en lenguaje natural, generar sugerencias de paneles, crear configuraciones de análisis y narrar información de paneles. Este modelo debe ser rápido y rentable.
- **Modelo de pensamiento profundo** — gestiona tareas computacionalmente intensivas que se benefician de cadenas de razonamiento extendidas, siendo el análisis de causa raíz el caso más destacado. Este modelo puede ser más lento y costoso; solo se invoca cuando se solicita explícitamente un análisis profundo.

En la interfaz de chat con IA, los usuarios pueden activar el modo **Pensamiento profundo** para enrutar su consulta al modelo de pensamiento profundo en lugar del modelo de Q&A.

## Implementación local

Para organizaciones que ejecutan un LLM alojado localmente (como una instancia de Ollama o vLLM desplegada en local), configure el **Endpoint de API** con la URL del servicio local y deje la **Clave de API** en blanco si el servicio no requiere autenticación. Mientras el servicio exponga una API compatible con OpenAI, todas las funciones de IA de IDMP funcionarán sin ninguna modificación.

## Desactivar las funciones de IA

Para desactivar las funciones de IA en todo el sistema, haga clic en el icono de avatar en la esquina superior derecha del navegador, acceda a la **Consola de administración** (Admin Console) y suspenda o elimine la conexión de IA.

También puede desactivar las recomendaciones de IA directamente desde la página de lista de análisis o la página de lista de paneles.
