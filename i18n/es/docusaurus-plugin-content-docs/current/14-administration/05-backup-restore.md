---
title: Copia de seguridad y restaurar
sidebar_label: Copia de seguridad y restaurar
---

# 14.5 Copia de seguridad y restaurar

TDengine IDMP soporta copias de seguridad automáticas programadas. Las copias de seguridad pueden usarse para restaurar el sistema a un estado anterior después de pérdida o corrupción de datos.

La copia de seguridad y restauración se accede desde **Consola de administración → Copia de seguridad de datos** y **Consola de administración → Recuperación de datos**.

## Copia de seguridad de datos

### Configurar la copia de seguridad

Haga clic en el icono de edición (lápiz) en la página de Copia de seguridad de datos para configurar los ajustes de copia de seguridad:

| Campo | Descripción |
|---|---|
| **Modo de copia de seguridad** | Programación de la copia de seguridad: ejecutar a un intervalo de horas fijo, o a una hora específica cada día |
| **Número de archivos a retener** | Cuántos archivos de copia de seguridad conservar. Los archivos más antiguos se eliminan cuando se supera el límite. Establezca este valor según el espacio en disco disponible. |
| **Directorio de copia de seguridad** | La ruta del directorio en el servidor donde se almacenan los archivos de copia de seguridad |

Haga clic en **Guardar** para aplicar la configuración.

### Gestionar copias de seguridad

Después de configurar la copia de seguridad, use los botones de la barra de herramientas para controlar el proceso:

- **Iniciar (▶):** Comenzar la programación de copia de seguridad.
- **Detener (⏹):** Pausar la programación de copia de seguridad.

La página muestra el **Estado de copia de seguridad** actual (p. ej., En ejecución, Detenido) y una tabla de **Registros de copia de seguridad** que lista todos los archivos de copia de seguridad generados:

| Columna | Descripción |
|---|---|
| **Hora de copia de seguridad** | Cuándo se creó la copia de seguridad |
| **Resultado** | Resultado de la copia de seguridad (éxito o fallo) |
| **Archivo de copia de seguridad** | Nombre del archivo del archivo comprimido de copia de seguridad |
| **Detalle de copia de seguridad** | Detalles adicionales o información de error |

## Recuperación de datos

La recuperación de datos es un procedimiento manual realizado a nivel del servidor. Los pasos de recuperación se muestran en la página **Consola de administración → Recuperación de datos**.

:::warning
La recuperación debe realizarse mientras el servicio IDMP está detenido. Realizar la recuperación mientras el servicio está en ejecución puede causar inconsistencias en los datos.
:::

**Pasos:**

1. **Detenga el proceso del servicio IDMP.** Asegúrese de que todos los procesos del servicio estén completamente terminados antes de continuar para evitar conflictos de lectura/escritura de datos durante la recuperación.

2. **Haga una copia de seguridad del directorio de datos original.** Localice el directorio de almacenamiento de datos consultando el archivo `config/application.yml` en el directorio de instalación. Haga una copia de seguridad de este directorio para evitar pérdida de datos en caso de que la operación de recuperación encuentre un error.

3. **Identifique el archivo de copia de seguridad objetivo.** Navegue al directorio de almacenamiento de archivos de copia de seguridad en el servidor. Localice el archivo de copia de seguridad que corresponde al punto de recuperación objetivo y verifique su hora de creación y suma de comprobación de integridad.

4. **Ejecute la recuperación de datos.** Extraiga el archivo de copia de seguridad verificado al directorio de almacenamiento de datos identificado en el paso 2. Antes de extraer, confirme que el directorio tiene permisos de lectura/escritura.

5. **Reinicie el proceso del servicio IDMP.** Una vez completada la extracción, reinicie IDMP para activar los datos recuperados.

6. **Verifique los resultados de la recuperación.** Inicie sesión en IDMP y compruebe que los datos de negocio principales, la configuración y otros contenidos sean consistentes con el estado en el momento de la copia de seguridad.
