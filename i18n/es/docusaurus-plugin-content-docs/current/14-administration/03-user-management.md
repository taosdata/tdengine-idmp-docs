---
title: Gestión de usuarios
sidebar_label: Gestión de usuarios
---

# 14.3 Gestión de usuarios

La gestión de usuarios se accede desde **Consola de administración → Gestión de usuarios**. Abarca la configuración de usuarios, roles y inicio de sesión único (SSO).

## Usuarios

TDengine IDMP utiliza direcciones de correo electrónico como identificadores de usuario. El primer usuario en activar o registrar el sistema se convierte automáticamente en Superadministrador.

### Invitar usuarios

Para agregar un nuevo usuario, vaya a **Consola de administración → Gestión de usuarios → Usuarios** y haga clic en **+** en la esquina superior derecha. Complete los siguientes campos:

| Campo | Descripción |
|---|---|
| **Correo electrónico** | La dirección de correo electrónico del nuevo usuario (utilizada como ID de inicio de sesión) |
| **Roles** | Uno o más roles a asignar, cada uno con un conjunto configurable de elementos accesibles |

El usuario invitado recibe un correo electrónico con un enlace para establecer su información personal y contraseña.

La lista de usuarios muestra:

| Columna | Descripción |
|---|---|
| **Nombre** | Nombre del usuario |
| **Apellido** | Apellido del usuario |
| **Número de teléfono** | Número de teléfono opcional |
| **Correo electrónico** | Dirección de correo electrónico (utilizada como ID de usuario) |
| **Estado** | Estado de la cuenta (p. ej., Activo, Invitado) |
| **Roles** | Roles asignados |
| **Descripción** | Descripción opcional |

### Control de acceso a elementos por asignación de rol

Al asignar un rol a un usuario, también puede restringir qué elementos puede acceder ese usuario bajo ese rol. Esto se realiza a través del diálogo **Configuración de recursos**, que se abre haciendo clic en la columna **Elementos permitidos para acceder** de la fila del rol.

El diálogo muestra dos paneles:

- **Panel izquierdo:** El árbol de elementos completo. Marque los nodos de elementos de nivel superior a los que desea otorgar acceso. Al marcar un nodo, el usuario obtiene acceso a ese nodo y a todos los elementos debajo de él en la jerarquía.
- **Panel derecho:** Una vista previa en tiempo real de los elementos seleccionados.

**Ejemplo:** Si asigna a un usuario el rol *Analistas de datos* y marca únicamente **Servicios públicos** en el diálogo de Configuración de recursos, ese usuario podrá ver y trabajar con todo el subárbol de elementos de Servicios públicos, pero no tendrá visibilidad de otros elementos de nivel superior como Campo petrolero. Los elementos no seleccionados quedan completamente ocultos en el árbol de activos del usuario — no aparecerán en el Explorador ni en ningún panel, análisis o evento relacionado.

Un usuario puede tener múltiples roles, cada uno con su propia configuración de acceso a elementos. El acceso efectivo a elementos de un usuario es la unión de todos los nodos de nivel superior otorgados en todos sus roles.

Roles integrados disponibles para asignación:

| Rol | Uso típico |
|---|---|
| **Gerentes de planta y supervisores** | Supervisión operativa de activos de producción |
| **Administradores de sistemas IT/OT** | Infraestructura y configuración del sistema |
| **Personal de mantenimiento** | Mantenimiento de equipos y órdenes de trabajo |
| **Analistas de datos** | Exploración de datos, paneles e informes |
| **Personal de operaciones** | Operaciones diarias de planta |
| **Ingenieros de procesos** | Optimización y análisis de procesos |
| **Superadministrador** | Administración completa del sistema |

### Restablecimiento de contraseña

Cualquier usuario puede restablecer su propia contraseña desde la página de inicio de sesión haciendo clic en **Olvidé mi contraseña**. Se envía un enlace de restablecimiento por correo electrónico. Por motivos de seguridad, el Superadministrador no puede restablecer la contraseña de otro usuario.

:::note
Asegúrese de que `tda.server-url` en `config/application.yml` esté configurado con una URL o dirección IP accesible externamente. Si no está configurado correctamente, los usuarios invitados no podrán seguir el enlace del correo electrónico para acceder a IDMP.
:::

## Roles

IDMP utiliza control de acceso basado en roles (RBAC). Cada rol otorga permisos de ver, agregar, eliminar y editar en uno o más tipos de recursos. Un usuario puede tener múltiples roles; sus permisos efectivos son la unión de todos los roles asignados.

El sistema incluye varios roles integrados. También puede crear roles personalizados haciendo clic en **+** en la página de lista de roles.

**Los recursos cubiertos por los permisos de rol incluyen:** Plantillas de elementos, funciones de IA, plantillas de eventos, conjuntos de enumeración, análisis, tablas externas, configuración de correo, plantillas de reglas de notificación, plantillas de paneles, copia de seguridad de datos, paneles, elementos, OAuth, usuarios, roles, unidades de medida (UOM), plantillas de panel, importación de datos y más.

### Control de acceso a nivel de elemento

Dado que los elementos están organizados en una jerarquía de árbol, el acceso a los elementos se controla por separado de otros permisos. Incluso si un rol otorga acceso a los elementos en general, la visibilidad de elementos de cada usuario se reduce adicionalmente a nodos de nivel superior específicos configurados durante la invitación o edición del usuario.

Los elementos a los que un usuario no puede acceder son completamente invisibles en el árbol de activos — no aparecen ni siquiera como nodos contraídos. Los atributos, análisis, eventos, paneles y paneles de control vinculados a elementos inaccesibles están igualmente ocultos, garantizando un fuerte aislamiento de datos entre equipos, sitios o unidades de negocio.

## Inicio de sesión único (OAuth 2.0)

IDMP soporta SSO con OAuth 2.0. Las configuraciones de OAuth se gestionan en **Consola de administración → Gestión de usuarios → OAuth**.

### Crear una configuración OAuth

Haga clic en **+** para agregar un nuevo proveedor OAuth. Complete los siguientes campos:

| Campo | Requerido | Descripción |
|---|:---:|---|
| **Icono** | Sí | Imagen del logotipo del proveedor (PNG, JPG o SVG). Se muestra en la página de inicio de sesión. |
| **Nombre** | Sí | Nombre para mostrar de la opción OAuth (p. ej., `GitHub`, `TAOS`). |
| **ID de cliente** | Sí | Identificador de la aplicación registrada con el proveedor OAuth. |
| **Secreto de cliente** | Sí | Clave secreta obtenida de la consola de desarrollador del proveedor OAuth. |
| **URL de autorización** | Sí | URL del endpoint de autorización OAuth 2.0 (`http://` o `https://`). |
| **URL de Token** | Sí | URL del endpoint de intercambio de tokens (`http://` o `https://`). |
| **URL de información de usuario** | Sí | El endpoint para recuperar información del perfil de usuario. |
| **URL de redirección** | Sí | La URL de callback registrada con el proveedor (p. ej., `http://localhost:6042/login/back`). Debe coincidir exactamente con el valor registrado. |
| **Alcance (Scope)** | No | Alcances de permisos solicitados (p. ej., `openid email profile`). |
| **Tipo de mapeo de información de usuario** | Sí | Cómo extraer campos de usuario de la respuesta del proveedor: `GITHUB`, `LARK` o `CUSTOM`. |
| **Reglas de mapeo personalizadas** | Cuando es CUSTOM | Objeto JSON que define expresiones JSONPath para extraer `name`, `email` y campos opcionales. |
| **Roles** | Sí | Roles asignados a los usuarios que inician sesión a través de este proveedor OAuth. |

### Reglas de mapeo personalizadas

Cuando el **Tipo de mapeo de información de usuario** es `CUSTOM`, proporcione un objeto JSON que mapee nombres de campo a expresiones JSONPath:

```json
{
  "name": "$.username",
  "email": "$.email",
  "nickname": "$.display_name",
  "phone": "$.contact.mobile",
  "description": "$.bio"
}
```

Los campos `name` y `email` son obligatorios. El resto son opcionales.

### Pasos de configuración

1. Registre su aplicación en la consola de desarrollador del proveedor OAuth y obtenga el ID de cliente, el secreto de cliente, y configure la URL de redirección.
2. En IDMP, vaya a **Consola de administración → Gestión de usuarios → OAuth** y haga clic en **+**.
3. Complete todos los campos obligatorios y haga clic en **Guardar**.
4. Cierre sesión y verifique que la nueva opción de inicio de sesión aparezca en la página de inicio de sesión.
