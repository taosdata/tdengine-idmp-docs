---
title: Units of Measurement
sidebar_label: Units of Measurement
---

# 13.3 Units of Measurement

In industrial and IoT environments, measurements collected from different devices or systems often use different units. Even after data is stored in TDengine TSDB, unit inconsistencies can remain across assets or over time. IDMP manages this through a **Units of Measurement (UOM)** library that enables automatic unit conversion in attribute formulas, calculations, and display.

UOM is managed under **Libraries → UOM**.

## UOM Classes

IDMP organizes units into **UOM classes** — groups of units that measure the same physical quantity. Each class has a **canonical unit** (the base unit used internally for conversions) and optionally one or more **base UOM classes** (for derived quantities such as Pressure = Mass / (Length × Time²)).

IDMP ships with the following built-in UOM classes:

| Class | Canonical Unit | Base UOM Classes |
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

You can extend this list by adding custom UOM classes.

## Viewing Units in a Class

Click any UOM class name to see its individual units. The unit list shows:

| Column | Description |
|---|---|
| **Name** | Unit name (e.g., liter, US gallon) |
| **Abbreviation** | Short symbol (e.g., L, US gal) |
| **Origin** | `System Defined` for built-in units, or the user name for custom units |
| **Description** | Optional description |
| **Canonical** | Conversion formula relative to the canonical unit |
| **Quantity Converted** | How many of this unit equal one canonical unit |

A **Quantity** field at the top lets you enter a reference amount to preview conversions across all units in the class.

## Creating a Custom UOM Class

Click **+** on the UOM list page to create a new class. Fill in:

| Field | Description |
|---|---|
| **Name** (required) | Class name. Accepts letters, numbers, underscores, hyphens, and spaces. |
| **Canonical UOM** (required) | The name of the canonical (base) unit for this class. |
| **UOM Abbreviation** (required) | The abbreviation for the canonical unit. |
| **Description** | Optional description. |
| **Base UOM Class** | Optional. Add one or more existing classes that this class is derived from (e.g., Pressure is derived from Mass, Length, and Time). Click **+** to add each base class. |

Click **Save** to create the class.

## Adding a Custom Unit to a Class

Open a UOM class and click **+** to add a new unit. Fill in:

| Field | Description |
|---|---|
| **Name** (required) | Unit name. Accepts letters, numbers, underscores, hyphens, and spaces. |
| **Abbreviation** (required) | Short symbol for the unit. |
| **Description** | Optional description. |
| **Ref UOM** | The reference unit to convert from (defaults to the canonical unit of the class). |
| **Ref Factor** | Multiplicative factor: `new_unit = Ref_Factor × Ref_UOM`. Default: 1.0. |
| **Ref Offset** | Additive offset applied after the factor: `new_unit = Ref_Factor × Ref_UOM + Ref_Offset`. Use this for non-proportional conversions such as Celsius ↔ Fahrenheit. Default: 0.0. |

Click **Save** to add the unit.

## Assigning UOM to Attributes

Each attribute can be configured with:

- **UOM Class** — the physical quantity type (e.g., Temperature)
- **Default UOM** — the unit in which data is stored in TSDB (e.g., kelvin)
- **Display UOM** — the unit shown to users (e.g., Celsius)

When the default UOM and display UOM differ, IDMP automatically converts the stored value to the display unit.

## Automatic Unit Conversion in Formulas

When attributes with UOM assignments participate in formula expressions, IDMP applies unit conversion rules automatically. This ensures that calculated results are physically meaningful.

### Addition and Subtraction

For `A + B` or `A - B`:

- If A and B belong to different UOM classes, an error is reported.
- If A and B belong to the same UOM class but have different units, IDMP converts B's unit to A's unit before computing.
- If one operand has a UOM and the other does not, the unitless operand is treated as having the same unit as the other.

### Multiplication and Division

For `A * B` or `A / B`:

- Both operands are first converted to their respective canonical units.
- The result's UOM class is determined by combining the base UOM classes of the operands (e.g., Mass / (Length × Time²) = Pressure).
- The result unit is the canonical unit of the resolved class.
- If the resulting combination does not match any defined UOM class, an error is reported.

**Example:** Attribute A has unit `cm` (Length), attribute B has unit `m²` (Area). The formula `A * B` converts A to meters, multiplies by B, and produces a result in `m³` (Volume).

### Comparison and Bitwise Operators

For operators `=`, `<>`, `>`, `<`, `>=`, `<=`, `|`, `&`:

- If both operands have UOM and belong to different classes, an error is reported.
- If one operand has UOM and the other does not, UOM is ignored.
- If both operands have UOM and belong to the same class with different units, the right operand is converted to the left operand's unit before the operation.

### Functions

The result of a function applied to an attribute carries the same UOM as the function's first argument. For example, `SIN(A)` has the same UOM as A.

:::tip
When editing a formula expression on an attribute, click the **Evaluate** button in the expression editor to preview the computed value and automatically detect unit errors. If the attribute has no UOM assigned yet, IDMP will suggest the UOM inferred from the last evaluation result.
:::
