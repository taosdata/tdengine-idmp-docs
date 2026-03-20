---
title: Configuración del sistema
sidebar_label: Configuración del sistema
---

# 14.4 Configuración del sistema

La configuración del sistema se accede desde **Consola de administración → Configuración del sistema**. Tiene cuatro secciones: Configuración básica, Punto de contacto de notificaciones, Plantilla de notificaciones y Configuración de correo electrónico.

## Configuración básica

La configuración básica contiene ajustes a nivel de sistema:

| Ajuste | Descripción |
|---|---|
| **Idioma** | Idioma de visualización predeterminado de la interfaz |
| **Habilitar recopilación de comportamiento de usuario** | Si se deben recopilar datos de uso anonimizados para mejorar el producto |
| **Cargar informes de fallos** | Si se deben cargar automáticamente los informes de fallos |
| **Actualización automática del Explorador de elementos** | Si el explorador de activos se actualiza automáticamente cuando cambian los elementos |

Haga clic en el icono de edición (lápiz) para modificar estos ajustes.

## Punto de contacto de notificaciones

Un **Punto de contacto de notificaciones** define un destino al que IDMP envía notificaciones. Se pueden configurar múltiples puntos de contacto. El primer usuario en activar el sistema tiene su dirección de correo electrónico agregada automáticamente como punto de contacto.

Para crear un punto de contacto, haga clic en **+** y complete:

| Campo | Descripción |
|---|---|
| **Nombre** | Un nombre único para este punto de contacto |
| **Tipo de notificación** | El canal de entrega: `Correo electrónico`, `Feishu` o `Webhook` |
| **Dirección** | La dirección de destino — dirección de correo electrónico, URL de webhook de Feishu o endpoint HTTP |
| **Descripción** | Descripción opcional |

Como Webhook está soportado, prácticamente cualquier destino de notificación puede configurarse — incluyendo Teams, DingTalk, PagerDuty y otros sistemas que acepten callbacks HTTP.

## Plantilla de notificaciones

Las plantillas de notificaciones definen el contenido de los mensajes generados por el sistema para eventos como invitaciones de usuarios, restablecimiento de contraseñas y notificaciones de alertas.

IDMP incluye plantillas integradas para escenarios de notificación comunes. Haga clic en el nombre de una plantilla para ver o editar su contenido. Las plantillas soportan sustitución de variables para incluir valores dinámicos como nombres de usuario, URLs y detalles de eventos.

## Configuración de correo electrónico

La configuración de correo electrónico define el servidor SMTP que IDMP utiliza para enviar correos salientes. Haga clic en el icono de edición (lápiz) para actualizar los ajustes.

| Campo | Descripción |
|---|---|
| **Host** | Nombre de host o dirección IP del servidor SMTP |
| **Puerto** | Puerto del servidor SMTP (p. ej., 465 para TLS, 587 para STARTTLS, 25 para sin cifrado) |
| **Nombre de usuario** | Nombre de usuario de autenticación SMTP |
| **Contraseña** | Contraseña de autenticación SMTP |
| **Remitente** | La dirección de correo electrónico "De" utilizada en los mensajes salientes |
| **Habilitar TLS** | Si se debe usar cifrado TLS para la conexión SMTP |
| **Habilitar autenticación** | Si se requiere autenticación SMTP |

IDMP envía correos electrónicos para varios propósitos: activación del sistema (código de verificación), invitaciones de usuarios, restablecimiento de contraseñas y notificaciones de alertas de eventos. Por defecto, IDMP utiliza un servicio de correo proporcionado por TDengine.

### Usar MailHog para entornos air-gapped

Si el servidor IDMP no puede acceder a internet, puede desplegar [MailHog](https://github.com/mailhog/MailHog) internamente como un relé SMTP ligero para desarrollo y pruebas:

```bash
docker run -d -p 1025:1025 -p 8025:8025 --name mailhog mailhog/mailhog:v1.0.1
```

Después de iniciar MailHog, configure la Configuración de correo electrónico con:

| Campo | Valor |
|---|---|
| Host | IP de la máquina host (o nombre del servicio si está en la misma red Docker Compose) |
| Puerto | `1025` |
| Nombre de usuario / Contraseña | Cualquier valor (MailHog deshabilita la autenticación por defecto) |
| Habilitar TLS / Habilitar autenticación | Sin marcar |
| Remitente | Cualquier formato de correo electrónico válido (p. ej., `support@example.com`) |

Acceda a la interfaz web de MailHog en `http://<ip-del-servidor>:8025` para ver los correos electrónicos capturados.
