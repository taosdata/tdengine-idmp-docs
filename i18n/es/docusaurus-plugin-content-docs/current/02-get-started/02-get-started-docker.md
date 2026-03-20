---
title: Inicio rápido con Docker
sidebar_label: Docker
---

# 2.2 Inicio rápido con Docker

TDengine IDMP se ofrece como una configuración de Docker Compose para facilitar el despliegue. Esto instala TDengine TSDB-Enterprise junto con TDengine IDMP y establece automáticamente una conexión entre ellos.

## 2.2.1 Requisitos del entorno

- Docker Engine 20.10 o posterior. Consulte [Install Docker Engine](https://docs.docker.com/engine/install/).
- Docker Compose 1.29.2 o posterior. Consulte [Install Docker Compose](https://docs.docker.com/compose/install/).
- Git instalado en su máquina local. Consulte [git-scm.com](https://git-scm.com/).

## 2.2.2 Preparar el entorno Docker

Clone el repositorio de despliegue de TDengine IDMP:

```bash
git clone https://github.com/taosdata/tdengine-idmp-deployment.git
```

## 2.2.3 Iniciar TDengine IDMP con Docker

```bash
cd tdengine-idmp-deployment/docker
export TZ="UTC"
chmod +x idmp.sh
./idmp.sh start
```

Este comando le pedirá que seleccione un modo de despliegue:

- **Estándar** — TDengine TSDB Enterprise + IDMP
- **Completo** — TDengine TSDB Enterprise + IDMP + TDgpt (añade algoritmos de IA/ML para pronóstico de series temporales y detección de anomalías)

Las imágenes necesarias se descargarán automáticamente si no están presentes en local.

:::note
Establezca la variable de entorno `TZ` para que coincida con su entorno. `UTC` es una buena opción predeterminada para entornos de servidor. Todos los contenedores en la pila de Compose heredan esta configuración: una zona horaria incorrecta provocará que los disparadores de análisis y las marcas de tiempo de los eventos queden desalineados.
:::

## 2.2.4 Activar e inicializar el sistema

1. En un navegador web, acceda a TDengine IDMP en `http://ip:6042`.
2. En **Activar TDengine IDMP**, introduzca su dirección de correo electrónico y organización.
3. Haga clic en **Obtener código** e introduzca el código enviado a su dirección de correo electrónico.

   :::tip
   Si el correo electrónico no llega, compruebe su carpeta de spam o correo no deseado.
   :::

4. Lea el Acuerdo de Usuario y la Política de Privacidad y haga clic en **Activar**.
5. En el cuadro de diálogo **Configuración de privacidad**, seleccione qué información de diagnóstico desea compartir con TDengine y, a continuación, haga clic en **Aceptar**.

## 2.2.5 Introducir la información de la cuenta

1. Introduzca su nombre, número de teléfono, cargo y contraseña.

   :::note
   - La contraseña debe tener entre 8 y 20 caracteres.
   - La contraseña debe contener letras, dígitos y caracteres especiales.
   - Caracteres especiales admitidos: `. ~ ! @ # $ ^ & *`
   :::

2. (Opcional) Seleccione una foto de perfil. Se admiten archivos JPG y PNG de menos de 1 MB.
3. Haga clic en **Continuar**.

Su instancia de TDengine IDMP está lista para usar. Continúe en la [Sección 2.4](./04-experiencing-idmp.md) para cargar datos de muestra y explorar las funcionalidades de IDMP.
