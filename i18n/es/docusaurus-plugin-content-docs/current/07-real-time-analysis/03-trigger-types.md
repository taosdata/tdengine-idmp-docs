---
title: Tipos de Disparador
sidebar_label: Tipos de Disparador
---

# 7.3 Tipos de Disparador

El disparador define cuándo se activa un análisis. TDengine IDMP admite ocho tipos de disparador, seleccionados en el menú desplegable **Tipo de Disparador** en la sección Disparador del formulario de análisis.

Los disparadores distintos a la Ventana Periódica de Tiempo dependen de que los atributos de un elemento tengan datos en tiempo real fluyendo a través de TDengine — específicamente, los atributos deben ser del tipo de referencia de datos **TDengine Metric**. Si un elemento no tiene tales atributos, solo están disponibles la Ventana Deslizante y la Ventana de Sesión.

## Ventana Deslizante

Se activa en un intervalo de tiempo deslizante fijo basado en el tiempo del evento — las marcas de tiempo de los datos entrantes.

### Cuándo Usar

- Necesita una métrica que siempre esté actualizada y se actualice continuamente a medida que llegan nuevos datos
- Quiere agregaciones continuas como promedios móviles, totales acumulados o KPIs de ventana deslizante
- Los operadores necesitan un valor en el panel de control que siempre refleje los últimos N minutos de actividad
- Quiere detectar tendencias o tasas de cambio comparando resultados de ventanas sucesivas

### Parámetros

| Parámetro | Descripción |
|---|---|
| **Deslizamiento** | El intervalo entre activaciones del disparador (por ejemplo, cada 1 minuto, cada 10 segundos) |

### Ejemplos

**Consumo de energía continuo.** Un panel de control en la planta muestra el consumo medio de energía de cada motor durante los últimos 10 minutos, recalculado cada minuto. Los operadores pueden detectar un motor que funciona más caliente de lo habitual antes de que salte un disyuntor.

**Seguimiento de la tasa de producción.** Una línea de empaquetado cuenta las unidades producidas en los últimos 5 minutos, actualizado cada 30 segundos. El supervisor de línea puede ver en tiempo real si la tasa está en línea con el objetivo del turno.

**Seguimiento de vibraciones.** Un monitor de equipos rotativos calcula el valor RMS de vibración sobre una ventana deslizante de 1 minuto cada 15 segundos. Una tendencia gradualmente ascendente en la salida indica un desgaste incipiente del rodamiento días antes de que ocurra el fallo.

---

## Detección de Anomalías

Ejecuta un algoritmo de detección de anomalías sobre un atributo objetivo según un programa deslizante. El sistema identifica automáticamente lecturas que se desvían del comportamiento esperado sin requerir umbrales definidos manualmente.

### Cuándo Usar

- Quiere detectar comportamientos anómalos sin saber de antemano cómo se ve lo "anómalo"
- El comportamiento del equipo es suficientemente complejo como para que los umbrales fijos produzcan demasiadas falsas alarmas
- Quiere que el sistema aprenda el patrón de operación normal y marque las desviaciones automáticamente
- Necesita advertencia temprana de fallos en desarrollo que aún no superarían un límite fijo

### Parámetros

| Parámetro | Descripción |
|---|---|
| **Deslizamiento** | Con qué frecuencia ejecutar la verificación de anomalías |
| **Objetivo** (obligatorio) | El atributo a analizar en busca de anomalías |
| **Algoritmo** (obligatorio) | El algoritmo de detección de anomalías a aplicar |
| **Verificación de Datos de Ruido Blanco** | Cuando está habilitado, omite la verificación de anomalías si los datos parecen ser ruido blanco (sin señal significativa) |
| **Parámetros del Algoritmo** | Parámetros opcionales específicos del algoritmo en formato `a=1,b=2,c=3` |

### Ejemplos

**Degradación del rendimiento del enfriador.** Un análisis de detección de anomalías se ejecuta cada 5 minutos sobre el coeficiente de rendimiento de un enfriador. No se configura ningún umbral — el algoritmo aprende el patrón estacional normal. Cuando el rendimiento comienza a desviarse de ese patrón, se genera un evento semanas antes de que el enfriador falle en una verificación manual de eficiencia.

**Anomalía de flujo en bomba.** La tasa de flujo de una bomba de agua parece normal a simple vista, pero un análisis de detección de anomalías señala una fluctuación periódica sutil que indica el inicio de cavitación en el impulsor. El equipo de mantenimiento programa una inspección durante la próxima parada planificada.

---

## Ventana Periódica de Tiempo

Se activa según el reloj del sistema en un intervalo de calendario fijo, independientemente de cuándo lleguen los datos.

### Cuándo Usar

- Necesita informes o resúmenes programados que lleguen en momentos predecibles — por hora, por día, por turno
- Los sistemas posteriores (ERP, MES, paneles de control) esperan datos en un horario fijo
- Quiere agregar un turno, día o semana completos en un único registro KPI
- El cálculo solo tiene sentido sobre un período de tiempo completo, no sobre una ventana continua

### Parámetros

| Parámetro | Descripción |
|---|---|
| **Período** | El intervalo de calendario (por ejemplo, cada 1 hora, cada 1 día) |
| **Desplazamiento** | Un retraso después del límite del período antes de activarse. Por ejemplo, un período de 1 día con un desplazamiento de 2 horas se activa a las 02:00 cada día — útil para generar informes diarios después de que los datos que llegan tarde hayan tenido tiempo de asentarse. |

### Ejemplos

**Resumen diario de producción.** Un informe se activa todos los días a las 06:00 (período: 1 día, desplazamiento: 6 horas), agregando la producción total, el rendimiento promedio y el tiempo de parada del día anterior. El gerente de planta encuentra el resumen esperándolo en su panel de control cada mañana.

**Instantánea de OEE por hora.** Un análisis de OEE se activa en punto cada hora, calculando disponibilidad, rendimiento y calidad para la hora anterior. Los resultados alimentan un gráfico de tendencias que muestra cómo evoluciona el OEE a lo largo del turno.

**Informe de cambio de turno.** Un período de 12 horas con un desplazamiento apropiado se alinea exactamente con los límites del turno. Cada turno saliente entrega un registro completo — unidades totales, fallos y temperatura de proceso promedio — sin cálculo manual.

---

## Entrada de Datos

Se activa cada vez que se escriben nuevos datos en un atributo específico — o cualquier atributo — del elemento.

### Cuándo Usar

- Quiere que el análisis reaccione a cada nueva medición con el mínimo retraso posible
- El valor del resultado depende de la lectura más reciente, no de una ventana de tiempo agregada
- Está calculando atributos derivados (conversiones de unidades, etiquetas calculadas) que siempre deben reflejar los datos actuales
- Quiere evaluar una condición en cada punto entrante individual

### Parámetros

| Parámetro | Descripción |
|---|---|
| **Objetivo** | El atributo cuyas nuevas escrituras de datos activan el análisis. Deje vacío para activar con cualquier nuevo dato de cualquier atributo. |

### Ejemplos

**Conversión de unidades en tiempo real.** Un sensor de presión reporta en PSI. Un análisis de Entrada de Datos convierte cada lectura a bar y la escribe de vuelta como atributo derivado. Cada panel de control y análisis posterior ve el valor convertido sin demora.

**Verificación instantánea de límite.** Un atributo de temperatura activa un análisis en cada nueva lectura. Si el valor supera el límite de operación, se genera un evento de inmediato — no en el siguiente intervalo programado.

---

## Ventana de Estado

Se activa cuando el valor de un atributo de tipo entero cambia de un estado a otro.

### Cuándo Usar

- El equipo opera en modos distintos — en funcionamiento, inactivo, con fallo, calentando — y quiere analizar cada modo por separado
- Necesita saber cuánto tiempo pasó una máquina en cada estado para calcular la utilización o el OEE
- Quiere capturar un resumen de lo que sucedió durante cada modo de operación, no solo las transiciones
- La agrupación basada en estados se alinea más naturalmente con su proceso que la agrupación basada en tiempo
- Cada lote en su proceso lleva un atributo de número de lote único, y quiere resúmenes automáticos por lote sin marcar manualmente los tiempos de inicio y fin

### Parámetros

| Parámetro | Descripción |
|---|---|
| **Estado** (obligatorio) | El atributo entero cuyos cambios de estado activan el análisis |

### Ejemplos

**Seguimiento de utilización del equipo.** Una máquina de producción tiene un atributo de estado: 0 = inactivo, 1 = en funcionamiento, 2 = con fallo. Un análisis de Ventana de Estado captura la duración y la salida promedio de cada período en funcionamiento. El equipo de mantenimiento puede ver exactamente cuánto tiempo productivo se perdió por cada fallo.

**Cálculo de disponibilidad de OEE.** Cada vez que una máquina sale de su estado "en funcionamiento", el análisis registra la duración de la ejecución. Sumar estas duraciones a lo largo de un turno proporciona el componente de disponibilidad del OEE sin ninguna extracción manual de datos.

**Análisis de energía por modo.** Un compresor opera en tres modos: espera, carga y carga completa. La Ventana de Estado captura el consumo de energía promedio de cada modo por separado, facilitando la comparación del consumo real contra las especificaciones de la placa de características por modo de operación.

**Resumen de proceso por lotes.** Un reactor lleva un atributo de número de lote que se incrementa con cada nuevo lote. Cada vez que cambia el número de lote — una transición de estado — el análisis se activa, calculando la temperatura promedio, el tiempo de reacción total y el rendimiento del lote completado. Cada lote obtiene su propio resumen automáticamente, independientemente de cuánto tiempo tardó, sin intervención del operador.

---

## Ventana de Evento

Se activa basándose en una condición de inicio y una condición de parada definidas por el usuario, expresadas como expresiones evaluadas contra los atributos del elemento.

### Cuándo Usar

- Necesita detectar y caracterizar una condición sostenida — no un pico momentáneo, sino algo que se desarrolla y se resuelve con el tiempo
- Quiere capturar todo lo que sucedió durante un episodio anómalo: duración, valores máximos, promedios
- El límite de la ventana de análisis está definido por el comportamiento del proceso, no por el reloj
- Necesita filtrar el ruido requiriendo que una condición persista durante una duración mínima antes de que cuente

### Parámetros

| Parámetro | Descripción |
|---|---|
| **Disparador de Inicio — Expresión** (obligatorio) | Una expresión de condición que, cuando evalúa a un valor positivo, abre la ventana de evento |
| **Disparador de Inicio — Verdadero durante** | Una duración mínima que la condición de inicio debe permanecer verdadera antes de que se abra la ventana. Evita disparadores falsos por ruido momentáneo. |
| **Disparador de Parada — Expresión** (obligatorio) | Una expresión de condición que, cuando evalúa a un valor positivo, cierra la ventana de evento y activa el análisis |

Ambas expresiones pueden probarse con el botón **Evaluar** antes de guardar.

### Ejemplos

**Caracterización de excedencia de temperatura.** La condición de inicio es `temperature > 85`. La condición de parada es `temperature < 80`. Cada vez que el proceso se calienta demasiado, el análisis captura cuánto tiempo duró, la temperatura máxima alcanzada y la temperatura promedio durante la excedencia — convirtiendo una alarma en bruto en un evento estructurado con contexto completo.

**Detección de surge en compresor.** La condición de inicio es `discharge_pressure > surge_limit AND flow < min_flow`. El ajuste "Verdadero durante" es de 5 segundos, filtrando el ruido transitorio. Cuando se confirma una condición de surge genuina, la ventana se abre. La condición de parada la cierra cuando la presión vuelve a la normalidad. Cada evento de surge se registra con su duración y perfil de presión.

**Ventana de producción de baja eficiencia.** La condición de inicio es `oee < 0.75`. La condición de parada es `oee > 0.85`. Cada vez que el OEE cae por debajo del objetivo y se recupera, el análisis resume el episodio — cuándo comenzó, cuánto tiempo duró y qué componente (disponibilidad, rendimiento o calidad) impulsó la pérdida.

---

## Ventana de Sesión

Se activa cuando no ha habido nuevos datos en el elemento durante un período de inactividad especificado. El análisis se ejecuta una vez que se detecta el intervalo de silencio, cubriendo los datos del período activo precedente.

### Cuándo Usar

- El equipo transmite datos en ráfagas naturales — un vehículo que reporta solo mientras está en marcha, una máquina de lotes activa solo durante un trabajo
- Quiere tratar cada ráfaga de actividad como una unidad de análisis completa e independiente
- No hay un horario fijo para anclar el análisis; los propios datos definen cuándo comienza y termina una sesión
- Necesita resúmenes por viaje, por lote o por ciclo sin marcar manualmente los tiempos de inicio y fin

### Parámetros

| Parámetro | Descripción |
|---|---|
| **Intervalo Sin Actividad** | Cuánto tiempo deben estar ausentes los datos antes de que la sesión se considere cerrada y el disparador se active |

### Ejemplos

**Análisis de viajes de flota.** Un vehículo de reparto transmite datos de GPS, velocidad y combustible solo mientras el encendido está activado. Con un intervalo de 10 minutos sin actividad, cada viaje se convierte en una sesión. Cuando el conductor aparca y el flujo de datos se detiene, el análisis se activa — calculando la distancia total, la velocidad promedio, el combustible consumido y el tiempo en ralentí para ese viaje.

**Resumen de ciclo por lotes.** Un reactor envía datos de proceso durante cada ejecución de lote y queda en silencio entre ejecuciones. La Ventana de Sesión se activa al final de cada lote, calculando la temperatura promedio, el tiempo de reacción total y el rendimiento — sin que ningún operador necesite marcar los límites del lote manualmente.

**Reporte de trabajos CNC.** Un centro de mecanizado transmite datos de carga del husillo y velocidad de avance solo durante los trabajos activos. Cada trabajo se convierte en una sesión, y el análisis al final de cada sesión registra el tiempo de corte real, la carga máxima y cualquier evento de vibración anómala detectado durante el trabajo.

---

## Ventana de Conteo

Se activa cuando se ha escrito un número especificado de nuevos registros en los atributos del elemento.

### Cuándo Usar

- Su proceso está definido por ciclos o muestras en lugar de tiempo transcurrido — cada 100 piezas inspeccionadas, cada 50 lecturas de sensor
- Los datos llegan a intervalos irregulares pero quiere tamaños de lote consistentes para el análisis
- Trabaja con instrumentos que reportan bajo demanda o por evento en lugar de en un horario fijo
- El análisis de calidad basado en muestras requiere un número fijo de mediciones por cálculo

### Parámetros

| Parámetro | Descripción |
|---|---|
| **Objetivo** | El atributo específico para contar los nuevos registros. Deje vacío para contar en todos los atributos. |
| **Conteo** | El número de nuevos registros que deben acumularse antes de que el disparador se active |

### Ejemplos

**Control estadístico de procesos.** Un sensor de calidad en una línea de producción toma una medición cada vez que pasa una pieza. Un análisis de Ventana de Conteo se activa cada 25 lecturas, calculando la media y la desviación estándar de ese grupo de muestras. Los límites del gráfico de control se evalúan contra cada resultado del grupo, independientemente de cuánto tardaron en producirse las 25 piezas.

**Lote de instrumentos de laboratorio.** Un cromatógrafo de gases reporta un resultado por ejecución de muestra. Una Ventana de Conteo se activa cada 10 resultados, calculando la concentración promedio y marcando cualquier lectura atípica en el lote — coincidiendo con la unidad de trabajo natural del equipo de laboratorio.
