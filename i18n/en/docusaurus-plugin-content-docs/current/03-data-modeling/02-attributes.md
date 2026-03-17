---
title: Attributes
sidebar_label: Attributes
---

Attributes define the measurable properties and characteristics of an element. They are the bridge between the physical behavior of an asset and the data stored in TDengine TSDB — turning raw numbers into named, typed, and unit-aware engineering values.

## 3.2.1 What is an Attribute

An attribute is a named property of an element that holds or references a value. For a pump element, attributes might include flow rate, outlet pressure, motor temperature, and operating status. For a smart meter, they might include current, voltage, power, and device ID.

Attributes give context to raw data. Instead of querying a database column by its technical name, users and applications can reference data by a meaningful attribute name within a well-understood asset hierarchy.

## 3.2.2 Attribute Types

The **Data Reference Type** determines where an attribute's value comes from. There are four types:

**1. TDengine Metric**

References a metric column (a time-series measurement column) in a TDengine TSDB table. The attribute value is read in real time as new data is ingested. Use this type for any value that changes over time — temperature, pressure, flow rate, current, voltage, and so on.

The Data Reference Setting format is:
```text
ConnectionName/DatabaseName/TableName/ColumnName
```
Example: `TDengine/idmp_sample_utility/em-12/current`

**2. TDengine Tag**

References a tag value in a TDengine TSDB table. Tags are static metadata fields attached to a table (such as device ID, location, or installation floor). Use this type for attributes whose values come from TSDB tags rather than time-series columns.

The format is the same as TDengine Metric:
```text
ConnectionName/DatabaseName/TableName/TagName
```
Example: `TDengine/idmp_sample_utility/em-17/location`

**3. Formula**

A calculated attribute whose value is derived from an expression referencing other attributes of the same element. The expression is converted to a TDengine SQL expression and executed against TDengine TSDB. The output must be numeric.

Example expression:
```text
log(current) * voltage + 10
```

The special replacement parameter `TIME` is available — it is substituted with the current local time in milliseconds. You can click **Evaluate** in the expression editor to test and validate the formula before saving. See [Section 3.2.9](#329-expression-editor) for the full Expression Editor reference.

:::note
Formula attributes can only reference attributes of the same element. To use a value from another element, add a new attribute to the current element that maps to the same data source.
:::

**4. String Builder**

Similar to Formula but the output is a string. The input can be any attribute of the current element (not limited to numeric types). Common functions include:

- `CONCAT(...)` — concatenate multiple strings
- `SUBSTR(str, start, length)` — extract a substring
- `CAST(value AS varchar)` — convert a non-string value to string

Replacement parameters beyond `TIME` are also available, such as the current element name, current attribute name, and the template name.

Example expression:
```text
CONCAT(${Template#name}, 'Device', ${attributes['Device ID']}, ' voltage is ', CAST(${attributes['Voltage']} AS varchar), 'V')
```

:::note
Use `CONCAT()` to join strings — the `+` operator cannot be used for string concatenation. Always use `CAST()` to convert numeric attributes to string before passing them to `CONCAT()`.
:::

## 3.2.3 Attribute Properties

Every attribute has the following configurable properties:

**Basic fields**

| Property | Description |
|---|---|
| **Name** | A unique name for the attribute within its element |
| **Description** | A human-readable explanation of what the attribute measures or represents |
| **Categories** | One or more tags for grouping and filtering attributes within the Attributes tab |
| **Value Type** | The data type of the value: `Float`, `Double`, `Int`, `BigInt`, `TinyInt`, `SmallInt`, `Bool`, `Nchar`, `Varchar`, `Timestamp` |
| **Default Value** | The value returned when no data is available from the data source |
| **UOM Class** | The physical quantity category (e.g., Electric Current, Temperature, Pressure). Selecting a UOM Class filters the available unit options for Default UOM and Display UOM. |
| **Default UOM** | The unit in which the attribute value is stored (e.g., ampere, °C, bar) |
| **Display UOM** | The unit used when displaying the value in panels and dashboards. Can differ from Default UOM — IDMP applies the conversion automatically. |
| **Display Digits** | The number of decimal places shown when displaying the value |
| **Data Reference Type** | Where the attribute value comes from: TDengine Metric, TDengine Table, or None (see [3.2.2](#322-attribute-types)) |
| **Data Reference Setting** | The path to the TDengine TSDB data source in the format `database/table/column` |
| **Path** | The full path of the attribute within the asset model (read-only, auto-generated) |

**Limits Configuration**

Define operational thresholds for the attribute. Each limit has a name and a numeric value:

| Limit | Meaning |
|---|---|
| **Minimum** | The lowest physically possible or acceptable value |
| **LoLo** | Low-Low alarm threshold — critical low condition |
| **Lo** | Low alarm threshold — warning low condition |
| **Target** | The desired setpoint or normal operating value |
| **Hi** | High alarm threshold — warning high condition |
| **HiHi** | High-High alarm threshold — critical high condition |
| **Maximum** | The highest physically possible or acceptable value |

Each limit entry also has an optional **Attribute** field — you can link a limit to another attribute rather than a fixed value, allowing dynamic limits that change based on real-time conditions.

**Forecast Configuration**

Configure AI-based forecasting for this attribute:

| Option | Description |
|---|---|
| **TDgpt** | Use TDengine's built-in time-series forecasting engine (TDgpt) to predict future values |
| **External** | Connect to an external forecasting service via a configured endpoint |
| **None** | No forecasting (default) |

**Additional Properties**

Free-form key-value pairs for storing any custom metadata specific to the attribute (e.g., instrument tag, calibration date, sensor model). Click **+** to add a new entry.

**Configuration flags**

| Flag | Description |
|---|---|
| **Constant Item** | Marks this attribute as a constant — its value does not change over time |
| **Hidden** | Hides the attribute from the default Attributes list. Hidden attributes are only visible when the **Show Hidden Attributes** toggle is enabled. |
| **Excluded** | Excludes the attribute from analyses and AI-generated insights |

## 3.2.4 Browsing Attributes

To view the attributes of an element:

1. Select the element in the asset tree.
2. Click the **Attributes** tab in the element detail pane.

The attributes list shows: Name, Description, current Value, Value Type, Data Reference type, Last Update Time, and Data Reference Setting.

Use the **Categories** dropdown to filter by category. Toggle **Show Hidden Attributes** to include attributes marked as Hidden.

Click any attribute name to open its full detail view.

## 3.2.5 Creating Attributes

To add a new attribute to an element:

1. Select the element and click the **Attributes** tab.
2. Click the **+** icon in the toolbar (top right of the Attributes tab).
3. Fill in the attribute form:
   - Enter **Name** and **Description**.
   - Select **Value Type** and set a **Default Value** if needed.
   - Select **UOM Class**, then choose **Default UOM** and **Display UOM**.
   - Set **Display Digits**.
   - Select **Data Reference Type** and enter the **Data Reference Setting** path.
   - Optionally expand and configure **Limits Configuration**, **Forecast Configuration**, and **Additional Properties**.
   - Set **Configuration** flags (Hidden, Excluded) as needed.
4. Click **Save**.

## 3.2.6 Editing Attributes

There are two ways to edit an attribute:

**Method 1: From the attribute detail view**
1. Click the attribute name in the list to open its detail view.
2. Click the **Edit** icon (pencil) in the toolbar.
3. Modify the desired fields and click **Save**.

**Method 2: From the attributes list ⋮ menu**
1. In the Attributes list, click the **⋮** menu on the attribute row.
2. Select **Edit**.
3. Modify the desired fields and click **Save**.

## 3.2.7 Deleting Attributes

There are two ways to delete an attribute:

**Method 1: From the attribute detail view**
1. Open the attribute detail view by clicking the attribute name.
2. Click the **Delete** icon (trash) in the top-right toolbar.
3. Confirm the deletion.

**Method 2: From the attributes list ⋮ menu**
1. In the Attributes list, click the **⋮** menu on the attribute row.
2. Select **Delete** and confirm.

:::warning
Deleting an attribute removes its configuration and all associated metadata from TDengine IDMP. The underlying time-series data in TDengine TSDB is not affected. Dashboards, analyses, or event rules that reference the deleted attribute may stop working and will need to be updated.
:::

## 3.2.8 Other Attribute Operations

The **⋮** menu in the attributes list also provides the following operations:

| Action | Description |
|---|---|
| **View** | Open the attribute detail view |
| **Copy** | Copy the attribute configuration. The copied attribute can be pasted as a new attribute on the same element or on any other element. |
| **Move Up / Move Down** | Reorder the attribute within the list |
| **Add to trend** | Quickly add this attribute to a new Trend Chart panel |
| **History Value** | View the historical time-series values for this attribute |

## 3.2.9 Expression Editor

The Expression Editor is a shared UI component used wherever expressions are configured in IDMP — including Formula and String Builder attribute definitions, analysis output attributes, and analysis trigger conditions (pre-filter and event window expressions). It opens as a dialog when you click on an expression input field.

### Where Expressions Are Used

| Location | Purpose |
|---|---|
| **Formula attribute** — Data Reference Setting | Defines a calculated attribute value derived from other attributes of the same element |
| **String Builder attribute** — Data Reference Setting | Builds a string value by combining attribute values with string functions |
| **Analysis** — Output Attributes, Expression column | Computes a result to write to an element or event attribute each time the analysis fires |
| **Analysis** — Trigger, Pre-filter | Filters data rows before the trigger evaluates |
| **Analysis** — Event Window trigger, Start/Stop conditions | Defines when the event window opens and closes |

### Expression Editor Layout

The dialog has three panels:

**Attribute panel (left)** — Browse and insert the element's attributes into the expression. Attributes are organized into groups:

| Group | Contents |
|---|---|
| **Metrics** | Time-series metric attributes (e.g., Current, Voltage, Power) |
| **Tags** | Tag (dimension) attributes — static metadata fields |
| **Other Attributes** | Any remaining attributes defined on the element |
| **Substitution Parameters** | System-level substitution values such as `TIME` (current local time in milliseconds), current element name, attribute name, and template name |

A **Filter** field at the top lets you search by name. Click an attribute or parameter to insert it at the cursor position in the expression.

**Expression editor (center)** — A code editor where you write the expression. An operator shortcut bar at the top provides one-click insertion of common operators:

```text
+  -  *  /  =  <  >  >=  <=  !=  <>  &  |
```

**Function panel (right)** — Browse and insert functions by category. A **Filter** field lets you search by function name. Click a function name to insert it at the cursor position.

### Function Categories

| Category | Example functions |
|---|---|
| **Mathematical Functions** | ABS, CEIL, FLOOR, ROUND, SQRT, LOG, POW, SIN, COS, ... |
| **String Functions** | CONCAT, LENGTH, LOWER, UPPER, SUBSTR, TRIM, LTRIM, RTRIM, ... |
| **Conversion Functions** | CAST, TO\_ISO8601, TO\_TIMESTAMP, ... |
| **Time and Date Functions** | NOW, TODAY, TIMEZONE, TIMETRUNCATE, ... |
| **Aggregate Functions** | AVG, COUNT, SUM, STDDEV, STDDEV\_POP, PERCENTILE, SPREAD, ELAPSED, HISTOGRAM, ... |
| **Selection Functions** | MAX, MIN, FIRST, LAST, LAST\_ROW, TOP, BOTTOM, UNIQUE, MODE, SAMPLE, ... |
| **Time-Series Specific Functions** | MAVG, DERIVATIVE, DIFF, IRATE, CSUM, INTERP, TWA, STATECOUNT, STATEDURATION, ... |

### Evaluating an Expression

Where supported (Formula and String Builder attribute definitions), the editor includes an **Evaluate** button and an **Evaluate Result** display at the bottom of the center panel. Click **Evaluate** to run the expression against the element's current data and verify the result before saving.

Click **Save** in the dialog to apply the expression, or **Cancel** to discard changes.

## 3.2.8 Attribute Templates {#attribute-templates}

An **attribute template** defines a standard attribute — including its name, data type, unit of measure, and data reference binding — as part of an [element template](./01-elements.md#316-element-templates). When an element is created from the template, all of its attribute templates are instantiated automatically, with substitution strings resolved to the actual values for that element.

### Creating an Attribute Template

1. In **Libraries**, open the element template you want to add attributes to.
2. Click the **Attribute Template** tab at the top of the template detail page.
3. Click **+** to open the attribute template creation form.
4. Fill in the attribute fields and configure the data reference binding (see below).

### Attribute Template Fields

| Field | Description |
|---|---|
| **Name** | Attribute name |
| **Description** | Optional description |
| **Configuration** | Additional configuration flags (e.g., hidden, constant) |
| **Categories** | Category tags |
| **Value Type** | Data type: Float, Int, Varchar, Bool, etc. |
| **Default Value** | Optional default value |
| **Default UOM** | The unit of measure used for storage |
| **Display UOM** | The unit of measure shown in the UI (may differ from storage UOM) |
| **Display Digits** | Number of decimal places shown in the UI |
| **Data Reference Type** | How the attribute is bound to TDengine TSDB data (see below) |
| **Data Reference Setting** | The resolved binding path, e.g., `TDengine/idmp_sample_utility/${KEYWORD1}/current` |
| **Limits Configuration** | Optional Hi/Lo alarm limit thresholds |
| **Forecast Configuration** | Optional TDgpt forecasting configuration for this attribute |

### Data Reference Binding

The **Data Reference Type** determines how the attribute is connected to time-series data in TDengine TSDB:

| Data Reference Type | Use |
|---|---|
| **None** | No TSDB binding — the attribute holds a static or calculated value only. |
| **TDengine Metric** | Binds the attribute to a time-series metric column in a TDengine supertable. |
| **TDengine Tag** | Binds the attribute to a tag column in a TDengine supertable. |

When you select **TDengine Metric** or **TDengine Tag**, configure the binding by specifying the TDengine connection, database, child table name (using substitution strings such as `${KEYWORD1}` so each element binds to its own table), and column name. The resulting Data Reference Setting takes the form:

```text
TDengine/<database>/${KEYWORD1}/<column>
```

Click **Check** to verify the binding resolves correctly for a test input.
