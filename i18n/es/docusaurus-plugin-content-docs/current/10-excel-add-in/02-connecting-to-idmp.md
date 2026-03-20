---
title: Conexión de Excel a IDMP
sidebar_label: Conexión de Excel a IDMP
---

# 10.2 Conexión de Excel a IDMP

Tras instalar el complemento de Excel, debe abrirlo en Excel e iniciar sesión en su instancia de IDMP para poder recuperar datos.

## Apertura del complemento

El complemento de TDengine IDMP es un complemento web de Office. Una vez instalado, no aparece automáticamente como una pestaña de la cinta de opciones; debe activarlo desde **Mis complementos** la primera vez.

1. Abra Microsoft Excel.
2. Haga clic en la pestaña **Insertar** de la cinta de opciones.
3. En el grupo **Complementos**, haga clic en **Mis complementos**.

   :::tip
   Si no ve el botón **Mis complementos**, busque un pequeño icono de **Complementos** en la pestaña Insertar, o haga clic en la flecha desplegable del botón Complementos. En versiones anteriores de Excel (2016/2019), el botón puede estar etiquetado como **Complementos de Office**.
   :::

4. En el cuadro de diálogo **Complementos de Office**, seleccione la pestaña **Mis complementos**.
5. Busque **TDengine IDMP** en la lista y haga doble clic en él, o selecciónelo y haga clic en **Agregar**.

El panel de tareas de TDengine IDMP se abrirá en el lado derecho de la ventana de Excel.

:::note
Tras la primera activación, Excel puede recordar el complemento y mostrar un botón **TDengine IDMP** directamente en la pestaña **Inicio** o en una pestaña dedicada de la cinta de opciones en sesiones posteriores. Si el complemento desaparece tras reiniciar Excel, repita los pasos anteriores para reabrirlo desde **Mis complementos**.
:::

## El complemento no aparece en Mis complementos

Si **TDengine IDMP** no aparece en la lista **Mis complementos** tras la instalación:

- **Cierre y vuelva a abrir Excel** — el registro del complemento solo surte efecto tras un reinicio completo.
- **Compruebe si hay un bloqueo de seguridad (Windows)** — es posible que Windows bloquee los archivos descargados de Internet. Si el script de instalación descargó algún archivo, haga clic derecho en cada uno, seleccione **Propiedades** y marque **Desbloquear** en la parte inferior de la pestaña General.
- **Verifique que la instalación se completó** — vuelva a ejecutar el comando de instalación de [Instalación del complemento de Excel](./01-installation.md) y compruebe si hay errores en la salida.

## Inicio de sesión

Una vez que el panel de tareas esté abierto:

1. Introduzca la dirección de su servidor IDMP en el formato `https://<host>:<puerto>` (por ejemplo, `https://idmp.tdengine.net:6034`).
2. Introduzca su nombre de usuario y contraseña de IDMP.
3. Haga clic en **Iniciar sesión**.

Una vez conectado, el panel de tareas muestra la jerarquía de activos de IDMP y le permite explorar los elementos y sus atributos.

## Requisitos de conexión

- El servidor IDMP debe ser accesible desde la máquina que ejecuta Excel.
- HTTPS debe estar configurado en el servidor IDMP (consulte [Instalación del complemento de Excel](./01-installation.md) para la configuración de HTTPS).
- Su cuenta de IDMP debe tener al menos acceso de lectura a los elementos y atributos que desea recuperar.
