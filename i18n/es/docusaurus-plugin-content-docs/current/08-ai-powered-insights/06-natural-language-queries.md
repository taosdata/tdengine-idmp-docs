---
title: Consultas en lenguaje natural
sidebar_label: Consultas en lenguaje natural
---

# 8.6 Consultas en lenguaje natural

La función de **chat con IA** le permite consultar sus datos operativos usando lenguaje sencillo. En lugar de escribir SQL de TDengine o navegar por la jerarquía de activos para encontrar un valor, puede hacer preguntas como "¿cuál fue el voltaje máximo de em-1 ayer?" y recibir una respuesta basada en sus datos reales.

## Abrir el chat con IA

Haga clic en **Chat con IA** en la barra de navegación superior. Esto abre la página de chat con IA en `/ai`.

El asistente de IA se llama **Teddy**.

## Diseño de la interfaz

La página de chat con IA tiene dos áreas:

**Historial de conversaciones (panel izquierdo).** Una lista de sesiones de chat anteriores. Haga clic en cualquier sesión para revisar su conversación. Las nuevas sesiones comienzan con un historial vacío.

**Área de chat (centro/derecha).** El área de interacción principal que contiene:

- El mensaje de bienvenida: *"Hola, soy Teddy. ¿En qué puedo ayudarte?"*
- El campo de entrada de texto con el indicador: *"Pregúntame cualquier cosa sobre tus datos, presiona Intro para enviar, presiona Shift+Intro para saltar de línea"*
- Un botón de alternancia **Pensamiento profundo** en la parte inferior izquierda del campo de entrada
- Un **botón de micrófono** a la derecha del campo de entrada para entrada de voz
- Una sección de **Preguntas sugeridas** con un icono de actualización, debajo del campo de entrada

## Hacer una pregunta

Escriba su pregunta en el campo de entrada. Presione **Intro** para enviar, o **Shift+Intro** para agregar un salto de línea sin enviar.

También puede presionar el **botón de micrófono** para usar la entrada de voz. Pronuncie su pregunta y el sistema la transcribe al campo de entrada.

## Modo de pensamiento profundo

El interruptor de **Pensamiento profundo** redirige la consulta al modelo de pensamiento profundo (configurado en Gestión de conexiones). Use este modo para preguntas complejas de varios pasos que requieren razonamiento extendido — por ejemplo, correlacionar múltiples atributos en una ventana de tiempo, o solicitar una hipótesis de causa raíz. Las preguntas estándar sobre valores de datos no requieren el modo de pensamiento profundo.

## Preguntas sugeridas

Debajo del campo de entrada, la sección de **Preguntas sugeridas** muestra preguntas pregeneradas relevantes para el contexto de sus datos. Estas sugerencias son generadas por el sistema basándose en su jerarquía de activos y datos recopilados.

Haga clic en el **icono de actualización** junto a "Preguntas sugeridas" para cargar un nuevo conjunto de sugerencias.

Haga clic en cualquier sugerencia para usarla directamente — la pregunta se coloca en el campo de entrada y se envía automáticamente.

## Cómo responde Teddy

Cuando envía una pregunta, Teddy consulta sus datos de TDengine usando el SQL apropiado, recupera los resultados y devuelve una respuesta en lenguaje natural. Para preguntas sobre datos, la respuesta incluye los valores calculados. Para preguntas analíticas, puede incluir gráficos, tablas o una explicación narrativa.

Todas las respuestas están basadas en sus datos reales — Teddy no fabrica valores.
