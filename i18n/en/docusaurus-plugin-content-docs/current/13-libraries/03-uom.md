---
title: Units of Measurement
sidebar_label: Units of Measurement
---

# 13.3 Units of Measurement

In industrial and IoT environments, measurements collected from different devices or systems often use different units. Even after data is stored in TDengine TSDB, unit inconsistencies can remain across assets or over time. IDMP manages this through a **Units of Measurement (UOM)** library that enables automatic unit conversion in attribute formulas, calculations, and display.

UOM is managed under **Libraries → UOM**.

## 13.3.1 UOM Classes

IDMP organizes units into **UOM classes** — groups of units that measure the same physical quantity. Each class has a **canonical unit** (the base unit used internally for conversions) and optionally one or more **base UOM classes** (for derived quantities such as Pressure = Mass / (Length × Time²)).

IDMP ships with the following built-in UOM classes:

<table>
<colgroup><col style="width:12em"/><col/><col/></colgroup>
<thead><tr><th>Class</th><th>Canonical Unit</th><th>Base UOM Classes</th></tr></thead>
<tbody>
<tr><td>Area</td><td>square meter</td><td>Length</td></tr>
<tr><td>Computer Storage</td><td>byte</td><td>—</td></tr>
<tr><td>Density</td><td>kilogram per cubic meter</td><td>Length, Mass</td></tr>
<tr><td>Electric Current</td><td>ampere</td><td>—</td></tr>
<tr><td>Electric Potential</td><td>volt</td><td>—</td></tr>
<tr><td>Electric Power</td><td>VoltAmp</td><td>—</td></tr>
<tr><td>Energy</td><td>joule</td><td>—</td></tr>
<tr><td>Length</td><td>meter</td><td>—</td></tr>
<tr><td>Mass</td><td>kilogram</td><td>—</td></tr>
<tr><td>Molecular Weight</td><td>gram per mole</td><td>—</td></tr>
<tr><td>Moles</td><td>mole</td><td>—</td></tr>
<tr><td>Plane Angle</td><td>radian</td><td>—</td></tr>
<tr><td>Power</td><td>watt</td><td>—</td></tr>
<tr><td>Pressure</td><td>pascal</td><td>Length, Mass, Time</td></tr>
<tr><td>Ratio</td><td>%</td><td>—</td></tr>
<tr><td>Specific Energy</td><td>joule per kilogram</td><td>Length, Time</td></tr>
<tr><td>Specific Volume</td><td>cubic meter per kilogram</td><td>Length, Mass</td></tr>
<tr><td>Temperature</td><td>kelvin</td><td>—</td></tr>
<tr><td>Time</td><td>second</td><td>—</td></tr>
<tr><td>Velocity</td><td>meter per second</td><td>—</td></tr>
<tr><td>Volume</td><td>cubic meter</td><td>Length</td></tr>
</tbody>
</table>

You can extend this list by adding custom UOM classes.

## 13.3.2 Viewing Units in a Class

Click any UOM class name to see its individual units. The unit list shows:

<table>
<colgroup><col style="width:12em"/><col/></colgroup>
<thead><tr><th>Column</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>Unit name (e.g., liter, US gallon)</td></tr>
<tr><td><strong>Abbreviation</strong></td><td>Short symbol (e.g., L, US gal)</td></tr>
<tr><td><strong>Origin</strong></td><td><code>System Defined</code> for built-in units, or the user name for custom units</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description</td></tr>
<tr><td><strong>Canonical</strong></td><td>Conversion formula relative to the canonical unit</td></tr>
<tr><td><strong>Quantity Converted</strong></td><td>How many of this unit equal one canonical unit</td></tr>
</tbody>
</table>

A **Quantity** field at the top lets you enter a reference amount to preview conversions across all units in the class.

## 13.3.3 Creating a Custom UOM Class

Click **+** on the UOM list page to create a new class. Fill in:

<table>
<colgroup><col style="width:17em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong> (required)</td><td>Class name. Accepts letters, numbers, underscores, hyphens, and spaces.</td></tr>
<tr><td><strong>Canonical UOM</strong> (required)</td><td>The name of the canonical (base) unit for this class.</td></tr>
<tr><td><strong>UOM Abbreviation</strong> (required)</td><td>The abbreviation for the canonical unit.</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description.</td></tr>
<tr><td><strong>Base UOM Class</strong></td><td>Optional. Add one or more existing classes that this class is derived from (e.g., Pressure is derived from Mass, Length, and Time). Click <strong>+</strong> to add each base class.</td></tr>
</tbody>
</table>

Click **Save** to create the class.

## 13.3.4 Adding a Custom Unit to a Class

Open a UOM class and click **+** to add a new unit. Fill in:

<table>
<colgroup><col style="width:15em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong> (required)</td><td>Unit name. Accepts letters, numbers, underscores, hyphens, and spaces.</td></tr>
<tr><td><strong>Abbreviation</strong> (required)</td><td>Short symbol for the unit.</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description.</td></tr>
<tr><td><strong>Ref UOM</strong></td><td>The reference unit to convert from (defaults to the canonical unit of the class).</td></tr>
<tr><td><strong>Ref Factor</strong></td><td>Multiplicative factor: <code>new_unit = Ref_Factor × Ref_UOM</code>. Default: 1.0.</td></tr>
<tr><td><strong>Ref Offset</strong></td><td>Additive offset applied after the factor: <code>new_unit = Ref_Factor × Ref_UOM + Ref_Offset</code>. Use this for non-proportional conversions such as Celsius ↔ Fahrenheit. Default: 0.0.</td></tr>
</tbody>
</table>

Click **Save** to add the unit.

## 13.3.5 Assigning UOM to Attributes

Each attribute can be configured with:

- **UOM Class** — the physical quantity type (e.g., Temperature)
- **Default UOM** — the unit in which data is stored in TSDB (e.g., kelvin)
- **Display UOM** — the unit shown to users (e.g., Celsius)

When the default UOM and display UOM differ, IDMP automatically converts the stored value to the display unit.

## 13.3.6 Automatic Unit Conversion in Formulas

When attributes with UOM assignments participate in formula expressions, IDMP applies unit conversion rules automatically. This ensures that calculated results are physically meaningful.

### 13.3.6.1 Addition and Subtraction

For `A + B` or `A - B`:

- If A and B belong to different UOM classes, an error is reported.
- If A and B belong to the same UOM class but have different units, IDMP converts B's unit to A's unit before computing.
- If one operand has a UOM and the other does not, the unitless operand is treated as having the same unit as the other.

### 13.3.6.2 Multiplication and Division

For `A * B` or `A / B`:

- Both operands are first converted to their respective canonical units.
- The result's UOM class is determined by combining the base UOM classes of the operands (e.g., Mass / (Length × Time²) = Pressure).
- The result unit is the canonical unit of the resolved class.
- If the resulting combination does not match any defined UOM class, an error is reported.

**Example:** Attribute A has unit `cm` (Length), attribute B has unit `m²` (Area). The formula `A * B` converts A to meters, multiplies by B, and produces a result in `m³` (Volume).

### 13.3.6.3 Comparison and Bitwise Operators

For operators `=`, `<>`, `>`, `<`, `>=`, `<=`, `|`, `&`:

- If both operands have UOM and belong to different classes, an error is reported.
- If one operand has UOM and the other does not, UOM is ignored.
- If both operands have UOM and belong to the same class with different units, the right operand is converted to the left operand's unit before the operation.

### 13.3.6.4 Functions

The result of a function applied to an attribute carries the same UOM as the function's first argument. For example, `SIN(A)` has the same UOM as A.

:::tip
When editing a formula expression on an attribute, click the **Evaluate** button in the expression editor to preview the computed value and automatically detect unit errors. If the attribute has no UOM assigned yet, IDMP will suggest the UOM inferred from the last evaluation result.
:::
