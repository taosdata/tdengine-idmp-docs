---
title: Unidades de medida
sidebar_label: Unidades de medida
---

# 13.3 Unidades de medida

En entornos industriales y de IoT, las mediciones recopiladas de diferentes dispositivos o sistemas a menudo usan unidades distintas. Incluso después de que los datos se almacenan en TDengine TSDB, pueden persistir inconsistencias de unidades entre activos o a lo largo del tiempo. IDMP gestiona esto a través de una biblioteca de **Unidades de medida (UdM)** que permite la conversión automática de unidades en fórmulas de atributos, cálculos y visualización.

Las UdM se gestionan en **Libraries → UOM**.

## Clases de UdM

IDMP organiza las unidades en **clases de UdM** — grupos de unidades que miden la misma magnitud física. Cada clase tiene una **unidad canónica** (la unidad base utilizada internamente para las conversiones) y opcionalmente una o más **clases de UdM base** (para magnitudes derivadas como Presión = Masa / (Longitud × Tiempo²)).

IDMP incluye las siguientes clases de UdM integradas:

| Clase | Unidad canónica | Clases de UdM base |
|---|---|---|
| Area | square meter | Length |
| Computer Storage | byte | — |
| Density | kilogram per cubic meter | Length, Mass |
| Electric Current | ampere | — |
| Electric Potential | volt | — |
| Electric Power | VoltAmp | — |
| Energy | joule | — |
| Length | meter | — |
| Mass | kilogram | — |
| Molecular Weight | gram per mole | — |
| Moles | mole | — |
| Plane Angle | radian | — |
| Power | watt | — |
| Pressure | pascal | Length, Mass, Time |
| Ratio | % | — |
| Specific Energy | joule per kilogram | Length, Time |
| Specific Volume | cubic meter per kilogram | Length, Mass |
| Temperature | kelvin | — |
| Time | second | — |
| Velocity | meter per second | — |
| Volume | cubic meter | Length |

Puede ampliar esta lista añadiendo clases de UdM personalizadas.

## Visualización de unidades en una clase

Haga clic en cualquier nombre de clase de UdM para ver sus unidades individuales. La lista de unidades muestra:

| Columna | Descripción |
|---|---|
| **Name** | Nombre de la unidad (p. ej., litro, galón estadounidense) |
| **Abbreviation** | Símbolo abreviado (p. ej., L, US gal) |
| **Origin** | `System Defined` para unidades integradas, o el nombre de usuario para unidades personalizadas |
| **Description** | Descripción opcional |
| **Canonical** | Fórmula de conversión relativa a la unidad canónica |
| **Quantity Converted** | Cuántas de estas unidades equivalen a una unidad canónica |

Un campo **Quantity** en la parte superior le permite introducir una cantidad de referencia para previsualizar las conversiones entre todas las unidades de la clase.

## Creación de una clase de UdM personalizada

Haga clic en **+** en la página de lista de UdM para crear una nueva clase. Rellene:

| Campo | Descripción |
|---|---|
| **Name** (obligatorio) | Nombre de la clase. Acepta letras, números, guiones bajos, guiones y espacios. |
| **Canonical UOM** (obligatorio) | El nombre de la unidad canónica (base) para esta clase. |
| **UOM Abbreviation** (obligatorio) | La abreviatura de la unidad canónica. |
| **Description** | Descripción opcional. |
| **Base UOM Class** | Opcional. Añada una o más clases existentes de las que deriva esta clase (p. ej., la Presión deriva de Masa, Longitud y Tiempo). Haga clic en **+** para añadir cada clase base. |

Haga clic en **Save** para crear la clase.

## Adición de una unidad personalizada a una clase

Abra una clase de UdM y haga clic en **+** para añadir una nueva unidad. Rellene:

| Campo | Descripción |
|---|---|
| **Name** (obligatorio) | Nombre de la unidad. Acepta letras, números, guiones bajos, guiones y espacios. |
| **Abbreviation** (obligatorio) | Símbolo abreviado de la unidad. |
| **Description** | Descripción opcional. |
| **Ref UOM** | La unidad de referencia desde la que convertir (por defecto, la unidad canónica de la clase). |
| **Ref Factor** | Factor multiplicativo: `nueva_unidad = Ref_Factor × Ref_UOM`. Predeterminado: 1.0. |
| **Ref Offset** | Desplazamiento aditivo aplicado después del factor: `nueva_unidad = Ref_Factor × Ref_UOM + Ref_Offset`. Úselo para conversiones no proporcionales como Celsius ↔ Fahrenheit. Predeterminado: 0.0. |

Haga clic en **Save** para añadir la unidad.

## Asignación de UdM a atributos

Cada atributo puede configurarse con:

- **UOM Class** — el tipo de magnitud física (p. ej., Temperature)
- **Default UOM** — la unidad en la que los datos se almacenan en TSDB (p. ej., kelvin)
- **Display UOM** — la unidad mostrada a los usuarios (p. ej., Celsius)

Cuando la UdM predeterminada y la UdM de visualización son diferentes, IDMP convierte automáticamente el valor almacenado a la unidad de visualización.

## Conversión automática de unidades en fórmulas

Cuando los atributos con asignaciones de UdM participan en expresiones de fórmulas, IDMP aplica las reglas de conversión de unidades automáticamente. Esto garantiza que los resultados calculados sean físicamente coherentes.

### Suma y resta

Para `A + B` o `A - B`:

- Si A y B pertenecen a diferentes clases de UdM, se notifica un error.
- Si A y B pertenecen a la misma clase de UdM pero tienen unidades diferentes, IDMP convierte la unidad de B a la unidad de A antes de calcular.
- Si un operando tiene UdM y el otro no, el operando sin unidades se trata como si tuviera la misma unidad que el otro.

### Multiplicación y división

Para `A * B` o `A / B`:

- Ambos operandos se convierten primero a sus respectivas unidades canónicas.
- La clase de UdM del resultado se determina combinando las clases de UdM base de los operandos (p. ej., Masa / (Longitud × Tiempo²) = Presión).
- La unidad del resultado es la unidad canónica de la clase resuelta.
- Si la combinación resultante no coincide con ninguna clase de UdM definida, se notifica un error.

**Ejemplo:** El atributo A tiene unidad `cm` (Longitud), el atributo B tiene unidad `m²` (Área). La fórmula `A * B` convierte A a metros, multiplica por B y produce un resultado en `m³` (Volumen).

### Operadores de comparación y bit a bit

Para los operadores `=`, `<>`, `>`, `<`, `>=`, `<=`, `|`, `&`:

- Si ambos operandos tienen UdM y pertenecen a clases diferentes, se notifica un error.
- Si un operando tiene UdM y el otro no, se ignora la UdM.
- Si ambos operandos tienen UdM y pertenecen a la misma clase con unidades diferentes, el operando derecho se convierte a la unidad del operando izquierdo antes de la operación.

### Funciones

El resultado de una función aplicada a un atributo lleva la misma UdM que el primer argumento de la función. Por ejemplo, `SIN(A)` tiene la misma UdM que A.

:::tip
Al editar una expresión de fórmula en un atributo, haga clic en el botón **Evaluate** del editor de expresiones para previsualizar el valor calculado y detectar automáticamente errores de unidades. Si el atributo aún no tiene UdM asignada, IDMP sugerirá la UdM inferida del último resultado de evaluación.
:::
