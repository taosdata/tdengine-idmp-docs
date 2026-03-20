---
title: Métricas compuestas con IA
sidebar_label: Métricas compuestas con IA
---

# 8.5 Métricas compuestas con IA

Las métricas compuestas son una biblioteca de KPIs de negocio generada por IA para su jerarquía de activos. Basándose en sus plantillas de elementos, datos recopilados y contexto industrial, la IA produce un conjunto seleccionado de métricas relevantes para el dominio de cada grupo de activos — con fórmulas de cálculo, SQL de TDengine, significado empresarial y alias de la industria. Esto proporciona a los ingenieros una referencia lista para usar sobre qué medir y cómo calcularlo, sin necesidad de conocimientos en ciencia de datos.

## Dónde encontrar las métricas compuestas

Las métricas compuestas se encuentran en **Bibliotecas** → **Métricas compuestas** en la barra lateral izquierda.

La lista de nivel superior muestra una entrada por grupo del árbol de activos (por ejemplo, "Campo petrolero" o "Servicios públicos"), junto con el número de métricas generadas y la hora de la última actualización. Haga clic en cualquier grupo para abrir su lista de métricas.

## Lista de métricas

Cada métrica en la lista tiene las siguientes columnas:

| Columna | Descripción |
|---|---|
| **Nombre de métrica** | Un nombre estructurado para la métrica (por ejemplo, `ElectricityMeter_Equipment_Current_LoadFactor`) |
| **Definición de métrica** | Una descripción en lenguaje sencillo de lo que mide la métrica |
| **Alias de la industria** | Nombres alternativos para esta métrica según se usan en la industria |
| **Soporte de sintaxis** | Si la métrica puede calcularse directamente usando TDengine SQL (`true`/`false`) |

Haga clic en cualquier métrica para abrir su vista de detalle completa.

## Detalle de métrica

Cada vista de detalle de métrica muestra:

| Campo | Descripción |
|---|---|
| **Nombre** | El identificador de la métrica |
| **Descripción** | Descripción completa de lo que mide la métrica |
| **Abreviatura en inglés** | Código corto para la métrica (por ejemplo, `CLF`) |
| **Alias de la industria** | Nombres alternativos de la industria para esta métrica |
| **Fórmula de cálculo** | La fórmula abstracta (por ejemplo, `AVG(Current) / MAX(Current)`) |
| **SQL de cálculo** | La consulta SQL concreta de TDengine que calcula la métrica |
| **Campos involucrados** | Los atributos del elemento utilizados en el cálculo |
| **Plantilla de datos** | La plantilla de elemento a la que se aplica esta métrica |
| **Campos faltantes** | Atributos requeridos por la fórmula que aún no están configurados en el elemento |
| **Significado empresarial** | Explicación en lenguaje sencillo de lo que indica el valor de la métrica operacionalmente |
| **Soporte de sintaxis** | Si TDengine SQL puede calcular directamente esta métrica |
| **Nivel jerárquico** | El nivel de la jerarquía de activos en el que se aplica esta métrica (por ejemplo, `EQUIPMENT`, `SITE`) |
| **Resultado de prueba** | Si el SQL se ejecutó correctamente contra datos reales |
| **Función de agregado** | Si la métrica utiliza una función de agregado |
| **Subconsulta anidada** | Si el SQL requiere una subconsulta anidada |

## Acciones

La barra de herramientas de la lista de métricas proporciona las siguientes acciones:

| Acción | Descripción |
|---|---|
| **Descargar** | Exportar la lista completa de métricas como archivo para revisión o modificación sin conexión |
| **Cargar** | Importar una lista de métricas modificada de vuelta a IDMP. Úselo después de editar las métricas descargadas para corregir fórmulas o descripciones. |
| **Regenerar** | Solicitar a la IA que regenere las métricas compuestas para este grupo. Úselo después de agregar más datos de elementos, descripciones o atributos para mejorar la calidad de las sugerencias. La regeneración suele tardar de 5 a 10 minutos. |
| **Seleccionar columnas** | Elegir qué columnas son visibles en la lista de métricas. Úselo para centrarse en los campos más relevantes para su revisión actual. |

## Cómo la IA genera las métricas

La IA analiza cada grupo del árbol de activos — examinando las plantillas de elementos, nombres de atributos, unidades y datos de series temporales recopilados — y produce métricas que son relevantes para ese tipo de activo en su contexto industrial. Para un grupo de medidores de electricidad, produce métricas como factor de carga, índice de estabilidad de voltaje y puntuación de desequilibrio de fase. Para un grupo de pozos de petróleo, produce métricas como eficiencia de producción, relación de corte de agua y tasa de caída de presión.

Dado que la IA no puede garantizar una precisión del 100%, el flujo de trabajo de descarga/carga le permite revisar, corregir y enriquecer las métricas generadas antes de tratarlas como referencias autorizadas para su operación.
