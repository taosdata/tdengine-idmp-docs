---
title: Instalación del complemento de Excel
sidebar_label: Instalación del complemento de Excel
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 10.1 Instalación del complemento de Excel

El complemento de Excel para TDengine IDMP le permite recuperar datos de series temporales y atributos de elementos directamente en Microsoft Excel, sin necesidad de escribir código ni SQL.

## Requisitos previos

### Requisito de HTTPS

El complemento de Excel se conecta a IDMP únicamente a través de **HTTPS**. Antes de instalarlo, asegúrese de que el servicio HTTPS de IDMP esté habilitado y sea accesible (puerto predeterminado: **6034**).

Para habilitar HTTPS, añada lo siguiente al archivo de configuración de IDMP (`application.yml`):

```yaml
quarkus:
  http:
    port: 6042
    ssl-port: 6034
    insecure-requests: enabled
    ssl:
      enabled: true
      certificate:
        files: /usr/local/taos/idmp/config/certbundle.pem
        key-files: /usr/local/taos/idmp/config/privkey.pem
```

**Certificado de prueba integrado.** IDMP incluye un certificado de prueba con una validez de 3 meses, vinculado al dominio `idmp.tdengine.net`. Este certificado es adecuado para evaluaciones y pruebas. No se recomienda su uso en entornos de producción.

Si utiliza el certificado de prueba integrado, añada la siguiente entrada al archivo hosts de la máquina cliente (reemplace la IP por la dirección real de su servidor):

```text
192.168.1.100  idmp.tdengine.net
```

Ubicaciones del archivo hosts:

- **Linux / macOS:** `/etc/hosts`
- **Windows:** `C:\Windows\System32\drivers\etc\hosts`

### Requisitos del sistema

| Requisito | Detalles |
|---|---|
| **Versión de Excel** | Excel 2016 o posterior (Windows o macOS) |
| **Permisos** | Se requieren derechos de administrador en Windows |
| **Node.js** | Se requiere Node.js 22.3 o posterior en Windows si el registro está habilitado |

## Instalación

<Tabs>
<TabItem value="macos" label="macOS">

Abra una terminal y ejecute:

```bash
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s install --force-close --url https://idmp.tdengine.net:6034 --enable-logging
```

Reemplace `https://idmp.tdengine.net:6034` por la dirección HTTPS real de su instancia IDMP.

**Parámetros:**

| Parámetro | Descripción |
|---|---|
| `--force-close` | Fuerza el cierre de Excel durante la instalación. Guarde su trabajo antes de ejecutar el comando. |
| `--url` | La dirección del servicio HTTPS de IDMP |
| `--enable-logging` | Habilita el registro de instalación y tiempo de ejecución |

Ubicación del archivo de registro: `~/Library/Containers/com.microsoft.Excel/Data/tdengine_eai.log`

:::warning
Excel se cerrará forzosamente durante la instalación. Guarde todos los libros de trabajo abiertos antes de ejecutar el comando.
:::

</TabItem>
<TabItem value="windows" label="Windows">

Abra PowerShell **como administrador** y ejecute:

```powershell
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action Install -ForceCloseExcel -Url 'https://idmp.tdengine.net:6034' -EnableLogging"
```

Reemplace `https://idmp.tdengine.net:6034` por la dirección HTTPS real de su instancia IDMP.

**Parámetros:**

| Parámetro | Descripción |
|---|---|
| `-Action Install` | Ejecuta la instalación |
| `-ForceCloseExcel` | Fuerza el cierre de Excel durante la instalación. Guarde su trabajo antes de ejecutar el comando. |
| `-Url` | La dirección del servicio HTTPS de IDMP |
| `-EnableLogging` | Habilita el registro de instalación y tiempo de ejecución |

Ubicación del archivo de registro: `C:\Users\<su-nombre-de-usuario>\AppData\Roaming\Microsoft\AddIns\VueOfficeAddin\Logs\tdengine_eai.log`

:::warning
PowerShell debe ejecutarse como administrador. Excel se cerrará forzosamente durante la instalación. Guarde todos los libros de trabajo abiertos antes de ejecutar el comando.
:::

</TabItem>
</Tabs>

## Habilitación y deshabilitación del registro

Para activar o desactivar el registro de forma independiente (sin reinstalar):

<Tabs>
<TabItem value="macos" label="macOS">

```bash
# Enable logging
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s enable-logging-only --force-close

# Disable logging
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s disable-logging-only --force-close
```

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
# Enable logging
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action EnableLogging -ForceCloseExcel"

# Disable logging
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action DisableLogging -ForceCloseExcel"
```

</TabItem>
</Tabs>

## Desinstalación

<Tabs>
<TabItem value="macos" label="macOS">

```bash
curl -LsSf https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.sh | sh -s uninstall --force-close
```

</TabItem>
<TabItem value="windows" label="Windows">

```powershell
powershell -ExecutionPolicy ByPass -c "& ([scriptblock]::Create((irm https://taosinstallers.blob.core.windows.net/tdengine-excel-add-in/install.ps1))) -Action Uninstall -ForceCloseExcel"
```

</TabItem>
</Tabs>

:::info
La desinstalación también cerrará Excel forzosamente. Guarde todos los libros de trabajo abiertos antes de ejecutar el comando de desinstalación.
:::
