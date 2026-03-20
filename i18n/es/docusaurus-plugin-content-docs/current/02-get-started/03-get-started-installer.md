---
title: Inicio rápido con instalación local
sidebar_label: Instalación local
---

# 2.3 Inicio rápido con instalación local

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PkgList from "/src/components/PkgListEn/";

Puede instalar TDengine IDMP localmente en una máquina Linux, macOS o Windows.

## 2.3.1 Requisitos del sistema

Asegúrese de que se cumplen los siguientes requisitos previos antes de instalar:

- TDengine TSDB-Enterprise 3.3.7.0 o posterior — debe estar instalado y en ejecución. Consulte [Deploy from Package](https://docs.tdengine.com/get-started/deploy-from-package/).
- Java 21 o posterior
- glibc 2.25 o posterior (solo Linux)
- Python 3.12
- En Debian/Ubuntu: el paquete `python3-venv`
- Servicio de correo electrónico SMTP (necesario para notificaciones de alertas; despliegue internamente si no hay acceso a Internet disponible)
- Una zona horaria del sistema correctamente configurada. Consulte el manual de usuario de su sistema operativo para obtener instrucciones.

Para conocer los requisitos completos de hardware y sistema operativo, consulte [Planificación del despliegue](../14-administration/02-planning.md).

## 2.3.2 Instalar TDengine IDMP

<Tabs>
<TabItem label="Linux-Generic" value="tar">

1. Descargue el paquete de instalación desde el siguiente enlace:

   <PkgList productName="TDengine IDMP-Enterprise" platform="Linux-Generic" />

1. Ejecute los siguientes comandos para instalar TDengine IDMP:

   ```bash
   tar -zxvf tdengine-idmp-enterprise-1.0.14.2-linux-generic.tar.gz && \
   cd tdengine-idmp-enterprise-1.0.14.2 && \
   sudo ./install.sh
   ```

   :::tip
   La máquina debe estar conectada a Internet al instalar TDengine IDMP. Las dependencias se descargan e instalan durante el proceso de instalación.
   :::

1. Configure la conexión con TDengine TSDB-Enterprise:

   Abra `/usr/local/taos/idmp/config/application.yml` en un editor de texto y establezca los detalles de conexión bajo `tda.default-connection`:

   ```yaml
   tda:
     default-connection:
       enable: true
       auth-type: UserPassword
       url: http://localhost:6041
       username: root
       password: taosdata
   ```

1. (Opcional) Pruebe la conexión con TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   Si la conexión es exitosa, se mostrará la lista de bases de datos en TDengine TSDB-Enterprise.

1. Inicie TDengine IDMP:

   ```bash
   sudo svc-tdengine-idmp start
   ```

</TabItem>
<TabItem label="Linux-Red Hat" value="rpm">

1. Descargue el paquete de instalación desde el siguiente enlace:

   <PkgList productName="TDengine IDMP-Enterprise" platform="Linux-Red Hat" />

1. Ejecute el siguiente comando para instalar TDengine IDMP:

   ```bash
   sudo rpm -ivh --nodeps tdengine-idmp-enterprise-1.0.14.2-linux-generic.rpm
   ```

   :::tip
   La máquina debe estar conectada a Internet al instalar TDengine IDMP. Las dependencias se descargan e instalan durante el proceso de instalación.
   :::

1. Configure la conexión con TDengine TSDB-Enterprise:

   Abra `/usr/local/taos/idmp/config/application.yml` en un editor de texto y establezca los detalles de conexión bajo `tda.default-connection`:

   ```yaml
   tda:
     default-connection:
       enable: true
       auth-type: UserPassword
       url: http://localhost:6041
       username: root
       password: taosdata
   ```

1. (Opcional) Pruebe la conexión con TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   Si la conexión es exitosa, se mostrará la lista de bases de datos en TDengine TSDB-Enterprise.

1. Inicie TDengine IDMP:

   ```bash
   sudo svc-tdengine-idmp start
   ```

</TabItem>
<TabItem label="Linux-Ubuntu" value="deb">

1. Descargue el paquete de instalación desde el siguiente enlace:

   <PkgList productName="TDengine IDMP-Enterprise" platform="Linux-Ubuntu" />

1. Ejecute el siguiente comando para instalar TDengine IDMP:

   ```bash
   sudo dpkg -i tdengine-idmp-enterprise-1.0.14.2-linux-generic.deb
   ```

   :::tip
   La máquina debe estar conectada a Internet al instalar TDengine IDMP. Las dependencias se descargan e instalan durante el proceso de instalación.
   :::

1. Configure la conexión con TDengine TSDB-Enterprise:

   Abra `/usr/local/taos/idmp/config/application.yml` en un editor de texto y establezca los detalles de conexión bajo `tda.default-connection`:

   ```yaml
   tda:
     default-connection:
       enable: true
       auth-type: UserPassword
       url: http://localhost:6041
       username: root
       password: taosdata
   ```

1. (Opcional) Pruebe la conexión con TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   Si la conexión es exitosa, se mostrará la lista de bases de datos en TDengine TSDB-Enterprise.

1. Inicie TDengine IDMP:

   ```bash
   sudo svc-tdengine-idmp start
   ```

</TabItem>
<TabItem label="macOS" value="mac">

1. Descargue el paquete de instalación desde el siguiente enlace:

   <PkgList productName="TDengine IDMP-Enterprise" platform="macOS" />

1. Ejecute el siguiente comando para instalar TDengine IDMP:

   ```bash
   sudo installer -pkg tdengine-idmp-enterprise-1.0.14.2-macos-generic.pkg -target /
   ```

   :::tip
   La máquina debe estar conectada a Internet al instalar TDengine IDMP. Las dependencias se descargan e instalan durante el proceso de instalación.
   :::

1. Configure la conexión con TDengine TSDB-Enterprise:

   Abra `/usr/local/taos/idmp/config/application.yml` en un editor de texto y establezca los detalles de conexión bajo `tda.default-connection`:

   ```yaml
   tda:
     default-connection:
       enable: true
       auth-type: UserPassword
       url: http://localhost:6041
       username: root
       password: taosdata
   ```

1. (Opcional) Pruebe la conexión con TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   Si la conexión es exitosa, se mostrará la lista de bases de datos en TDengine TSDB-Enterprise.

1. Inicie TDengine IDMP:

   ```bash
   sudo svc-tdengine-idmp start
   ```

</TabItem>
<TabItem label="Windows" value="windows">

1. Descargue el paquete de instalación desde el siguiente enlace:

   <PkgList productName="TDengine IDMP-Enterprise" platform="Windows" />

1. Haga doble clic en el paquete de instalación `.exe` descargado y siga el asistente de instalación para completar la instalación.

   :::note
   Se requieren privilegios de administrador. Si encuentra problemas de permisos, haga clic con el botón derecho en el instalador y seleccione **Ejecutar como administrador**.
   :::

   :::info Dependencias
   TDengine IDMP en Windows requiere:
   - Java 21 o superior, con el comando `java` disponible en la variable de entorno PATH del sistema
   - Python 3.12
   - Para verificar que Java está correctamente configurado, ejecute `java -version` en el símbolo del sistema
   :::

1. Tras la instalación, los servicios relacionados con TDengine IDMP se registrarán automáticamente como servicios de Windows.

   La ruta de instalación predeterminada es `C:\TDengine\idmp`.

1. Configure la conexión con TDengine TSDB-Enterprise:

   Abra `C:\TDengine\idmp\config\application.yml` en un editor de texto y establezca los detalles de conexión bajo `tda.default-connection`:

   ```yaml
   tda:
     default-connection:
       enable: true
       auth-type: UserPassword
       url: http://localhost:6041
       username: root
       password: taosdata
   ```

1. (Opcional) Pruebe la conexión con TDengine TSDB-Enterprise:

   ```bash
   curl --request POST \
     --user root:taosdata \
     --url http://localhost:6041/rest/sql \
     --data 'show databases;'
   ```

   Si la conexión es exitosa, se mostrará la lista de bases de datos en TDengine TSDB-Enterprise.

1. Inicie TDengine IDMP:

   ```batch
   C:\TDengine\idmp\bin\start-tdengine-idmp.bat
   ```

   O inicie los servicios `tdengine-idmp`, `tdengine-idmp-h2` y `tdengine-idmp-chat` a través del Administrador de Servicios de Windows.

</TabItem>
</Tabs>

## 2.3.3 Activar e inicializar el sistema

1. En un navegador web, acceda a TDengine IDMP en `http://ip:6042`.
2. En **Activar TDengine IDMP**, introduzca su dirección de correo electrónico y organización.
3. Haga clic en **Obtener código** e introduzca el código enviado a su dirección de correo electrónico.

   :::tip
   Si el correo electrónico no llega, compruebe su carpeta de spam o correo no deseado.
   :::

4. Lea el Acuerdo de Usuario y la Política de Privacidad y haga clic en **Activar**.
5. En el cuadro de diálogo **Configuración de privacidad**, seleccione qué información de diagnóstico desea compartir con TDengine y, a continuación, haga clic en **Aceptar**.

## 2.3.4 Introducir la información de la cuenta

1. Introduzca su nombre, número de teléfono, cargo y contraseña.

   :::note
   - La contraseña debe tener entre 8 y 20 caracteres.
   - La contraseña debe contener letras, dígitos y caracteres especiales.
   - Caracteres especiales admitidos: `. ~ ! @ # $ ^ & *`
   :::

2. (Opcional) Seleccione una foto de perfil. Se admiten archivos JPG y PNG de menos de 1 MB.
3. Haga clic en **Continuar**.

Su instancia de TDengine IDMP está lista para usar. Continúe en la [Sección 2.4](./04-experiencing-idmp.md) para cargar datos de muestra y explorar las funcionalidades de IDMP.
