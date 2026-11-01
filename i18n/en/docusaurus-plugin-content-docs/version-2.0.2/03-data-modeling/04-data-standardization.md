---
title: Data Standardization
sidebar_label: Data Standardization
---

# 3.4 Data Standardization

Industrial environments often collect data from multiple sources with inconsistent naming, varying units, and different data structures. Without standardization, cross-asset analysis, AI-generated insights, and data aggregation become unreliable or impossible. TDengine IDMP provides several mechanisms to standardize data across your entire asset model.

## 3.4.1 Unified Naming Through Data References

Different data sources often use different names for the same physical measurement. One system may store temperature as `temperature`, another as `WD`, and a third as `tmp_sensor_1`. Without standardization, you cannot compare or aggregate these values.

IDMP solves this through the **data reference** mechanism: no matter what the underlying column is named in TDengine TSDB, you define a single standard attribute name on the element — for example, `IndoorTemperature` — and map it to whichever column in whichever table holds the actual data. All users, dashboards, and analyses then refer to `IndoorTemperature` regardless of the source system's naming.

This means you can:

- Rename poorly named or abbreviated source fields into clear engineering names
- Apply a consistent naming convention across all assets of the same type
- Change the underlying data source without affecting any dashboards or analyses that reference the attribute

## 3.4.2 Data Transformation with Formula and String Builder

When data from different sources uses different representations of the same measurement, IDMP allows you to transform it through **Formula** and **String Builder** data references.

**Formula attributes** let you compute a derived value from other attributes. For example:

- One data source records active power directly; another records current and voltage separately. Create a Formula attribute `ActivePower = current × voltage` to produce a consistent power value regardless of source.
- Convert between scales: `TemperatureCelsius = (TemperatureFahrenheit - 32) × 5 / 9`

**String Builder attributes** let you construct standardized string values from multiple source fields. For example, build a standard location description from separate city and building fields:

```text
CONCAT(${attributes['City']}, '-', ${attributes['Building']}, '-Floor', CAST(${attributes['Floor']} AS varchar))
```

Through these mechanisms, IDMP absorbs heterogeneous raw data and exposes it through a consistent, standardized attribute model.

## 3.4.3 Unit of Measurement Standardization

IDMP decouples the **storage unit** from the **display unit**, enabling automatic conversion:

- **Default UOM** — the unit in which the source data is stored (e.g., meters, watts, kelvin)
- **Display UOM** — the unit shown to users in panels and dashboards (e.g., kilometers, kilowatts, °C)

When the two differ, IDMP converts the value automatically. For example, if the default unit is meters and the display unit is kilometers, a stored value of 1000 is displayed as 1 km.

Both units must belong to the same **UOM Class** (e.g., Length, Power, Temperature). The UOM Class dropdown groups compatible units and prevents invalid pairings.

This mechanism standardizes the user-facing presentation of data even when different source systems record values in different units, and ensures dimensional consistency in formula expressions.

## 3.4.4 Templates for Structural Standardization

Templates are the most powerful tool for ensuring consistent structure across similar assets. IDMP provides templates at multiple levels:

### 3.4.4.1 Element templates

Define a standard asset structure for each asset class (e.g., Pump, Meter, Boiler). An element template pre-configures the full set of standard attributes — with their names, data types, units, limits, and descriptions — that every asset of that class should have. When a new element is created from a template, all standard attributes are added automatically.

### 3.4.4.2 Attribute templates

Individual attribute definitions can be saved to the template library and reused across multiple elements or element templates. This ensures that common attributes (e.g., `ActivePower`, `OperatingStatus`) are defined consistently everywhere they appear.

### 3.4.4.3 Other template types

IDMP also provides templates for analyses, panels, dashboards, events, and notifications — ensuring that operational logic and visualizations are standardized across the same asset class, not just the data model.

See [Chapter 13 — Libraries](../13-libraries/index.md) for details on creating and managing templates.

## 3.4.5 Categories for Attribute Organization

Assign **Categories** to attributes to group them by function, system, or any organizational scheme relevant to your operations (e.g., Electrical, Mechanical, Safety, Quality). Categories serve two purposes:

- **Filtering**: on the Attributes tab, use the Categories dropdown to display only the attributes belonging to a specific group
- **Consistency**: when the same category tags are applied across all elements of the same type, users always know where to find related attributes

Categories are free-form text tags and can be combined with templates to enforce a standard categorization scheme across the asset model.

## 3.4.6 Limits Configuration for Alarm Standardization

Defining standard alarm thresholds — Minimum, LoLo, Lo, Target, Hi, HiHi, Maximum — on attributes standardizes how operational boundaries are expressed across assets of the same type. When defined in an element template, all elements created from that template automatically inherit the same limits, ensuring consistent alarm behavior across the fleet.

Limits can be set as fixed values or linked to other attributes (dynamic limits), giving flexibility while maintaining a standard structure.

## 3.4.7 Copy and Paste Across Elements

When you need to apply the same attribute configuration to multiple elements that are not covered by a template, use the **Copy** operation:

1. In the Attributes list, click the **⋮** menu on an attribute row and select **Copy**.
2. Navigate to the target element.
3. On the target element's Attributes tab, paste the attribute.

The copied attribute brings its full configuration — data type, unit, limits, description, and data reference type — to the new element, where you only need to update the Data Reference Setting to point to the correct source column for that element.

This provides a quick, lightweight alternative to formal templates when standardizing a small number of elements ad hoc.
