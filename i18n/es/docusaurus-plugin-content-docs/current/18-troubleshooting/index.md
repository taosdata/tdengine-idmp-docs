---
title: Solución de problemas
sidebar_label: Solución de problemas
---

# 18. Solución de problemas

## 18.1 Confirmar el problema

Si encuentra algún problema al usar TDengine IDMP, primero desactive la caché del navegador, luego actualice la página y vuelva a intentarlo. Los pasos específicos son los siguientes:

1. Abra las herramientas de desarrollo del navegador.
2. Cambie a la pestaña **Red**.
3. Marque la opción **Deshabilitar caché**.
4. Actualice la página y compruebe si el problema persiste.

Si el problema persiste, siga los pasos a continuación para recopilar información de errores del frontend y del backend, de modo que podamos investigar.

## 18.2 Recopilar información del frontend

### 18.2.1 Recopilar mensajes de error de la consola

1. Abra las herramientas de desarrollo del navegador.
2. Cambie a la pestaña **Consola**.
3. Si hay errores en la consola, haga clic derecho sobre el error y seleccione **Guardar como** para guardar los errores en un archivo.

### 18.2.2 Recopilar información de solicitudes de red

1. Abra las herramientas de desarrollo del navegador.
2. Cambie a la pestaña **Red**.
3. Si hay solicitudes fallidas, haga clic derecho sobre la solicitud fallida (mostrada en rojo) y seleccione **Copiar**. Guarde el siguiente contenido en un archivo:
   - Encabezados de solicitud
   - Encabezados de respuesta
   - Cuerpo de la respuesta
   - Seguimiento de la pila (si está disponible)

## 18.3 Recopilar registros del backend

### Instalación local

Si ha implementado TDengine IDMP mediante instalación local, los archivos de registro se encuentran en las siguientes ubicaciones:

| Componente | Ruta del archivo de registro |
| --- | --- |
| Registro de TDengine IDMP | `/var/log/taos/tda.log` |
| Registro de errores de TDengine IDMP | `/var/log/taos/tda-error.log` |
| Registro de IA de TDengine IDMP | `/var/log/taos/idmp-ai.log` |
| Registro de errores de IA de TDengine IDMP | `/var/log/taos/idmp-ai-error.log` |
| Registro de TDengine TSDB-Enterprise | `/var/log/taos/taosdlog.*` |

### Implementación en contenedores

Si ha implementado TDengine IDMP mediante contenedores, puede copiar los archivos de registro desde el contenedor al entorno local con los siguientes comandos:

```bash
docker cp tdengine-tsdb:/var/log/taos/taosdlog.* ./
docker cp tdengine-idmp:/var/log/taos/tda.log ./
docker cp tdengine-idmp:/var/log/taos/tda-error.log ./
docker cp tdengine-idmp:/var/log/taos/idmp-ai.log ./
docker cp tdengine-idmp:/var/log/taos/idmp-ai-error.log ./
```

## 18.4 Enviar un problema

Utilizamos [GitHub Issues](https://github.com/taosdata/tdengine-idmp-docs/issues/new/choose) para rastrear y gestionar problemas. Por favor, siga la plantilla de GitHub Issues para enviar la información recopilada anteriormente; nuestro equipo de soporte le responderá lo antes posible y le ayudará a resolver el problema.
