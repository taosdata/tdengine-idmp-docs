---
title: Importación y exportación del modelo de datos
sidebar_label: Importación y exportación del modelo de datos
---

# 11.4 Importación y exportación del modelo de datos

La función de importación/exportación de IDMP en la Consola de administración le permite transferir su modelo de datos — elementos, plantillas de elementos, plantillas de eventos, categorías de UdM y bibliotecas — entre instancias de IDMP. Esto resulta útil para replicar una configuración de un entorno de desarrollo a producción, o para compartir un modelo de activos estándar entre múltiples implementaciones.

## Acceso a la importación/exportación

Navegue a **Management Console → Import/Export**.

La página principal muestra una tabla con el historial de todas las operaciones de importación y exportación anteriores, con columnas para **Created at**, **Status**, **Name** y **Reason**. Use los botones de filtro **Categories** e **Import** para alternar entre ver el historial de exportación e importación.

## Exportación del modelo de datos

Haga clic en el icono de **Export** (flecha de descarga) en la esquina superior derecha para abrir el formulario de configuración de exportación.

### Selección de recursos

El formulario de exportación tiene dos selectores:

| Selector | Qué selecciona |
|---|---|
| **Select Elements** | Uno o más elementos raíz del árbol de activos. IDMP incluye los elementos seleccionados y todos los recursos de los que dependen. |
| **Select Libraries** | Una o más entradas de biblioteca (plantillas de elementos, categorías de UdM, etc.) para incluir independientemente de cualquier elemento. |

A medida que realiza selecciones, la vista previa en árbol de **Selected Resources** se actualiza para mostrar exactamente qué se incluirá en la exportación — elementos, sus plantillas, plantillas de eventos, categorías de UdM y unidades de medida individuales.

### Resumen de exportación

En la parte inferior del formulario, una tabla de resumen confirma los recuentos de cada tipo de recurso que se va a exportar:

| Recurso | Descripción |
|---|---|
| **Elements Count** | Número de elementos seleccionados |
| **Element Templates Count** | Número de plantillas de elementos incluidas |
| **Event Templates Count** | Número de plantillas de eventos incluidas |
| **Categories Count** | Número de categorías de UdM incluidas |
| **UOMs Count** | Número de unidades de medida incluidas |
| **Total Resources Count** | Número total de recursos en la exportación |

Haga clic en **Confirm** para generar y descargar el archivo de exportación. Haga clic en **Discard** para cancelar.

## Importación de un modelo de datos

Haga clic en el icono de **Import** (flecha de carga) en la esquina superior derecha para abrir el formulario de importación.

### Campos de importación

| Campo | Descripción |
|---|---|
| **Metadata File** (obligatorio) | El archivo de modelo de datos producido por una exportación anterior de IDMP. Haga clic en **Select Metadata File** para cargarlo. |
| **TSGen Configuration File** (opcional) | Un archivo de configuración de generación de esquemas de TDengine opcional para asociar con la importación. |
| **Select Connections** (obligatorio) | La conexión de TDengine a la que se vincularán los elementos importados para el almacenamiento de datos de series temporales. |
| **Contact Point** (obligatorio) | El punto de contacto de notificación que se asociará con las plantillas de eventos importadas. |

Haga clic en **Confirm** para iniciar la importación. La operación se ejecuta en segundo plano y su progreso y resultado aparecen en la tabla de historial de la página principal de Import/Export.

## Flujo de trabajo típico

Un flujo de trabajo típico de implementación entre instancias es el siguiente:

1. En la instancia de **origen**, configure sus elementos, plantillas y bibliotecas.
2. Vaya a **Management Console → Import/Export** y exporte los elementos y bibliotecas relevantes.
3. Descargue el archivo de metadatos.
4. En la instancia de **destino**, vaya a **Management Console → Import/Export** e importe el archivo de metadatos.
5. Seleccione la conexión y el punto de contacto apropiados en la instancia de destino.
6. Confirme la importación y verifique que los recursos aparezcan en el Explorador y las Bibliotecas.
