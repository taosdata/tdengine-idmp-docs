---
title: Attributes
sidebar_label: Attributes
---

# 3.2 Attributes

Attributes define the measurable properties and characteristics of an element. They are the bridge between the physical behavior of an asset and the data stored in TDengine TSDB — turning raw numbers into named, typed, and unit-aware engineering values.

## 3.2.1 What is an Attribute

An attribute is a named property of an element that holds or references a value. For a pump element, attributes might include flow rate, outlet pressure, motor temperature, and operating status. For a smart meter, they might include current, voltage, power, and device ID.

Attributes give context to raw data. Instead of querying a database column by its technical name, users and applications can reference data by a meaningful attribute name within a well-understood asset hierarchy.

## 3.2.2 Data Reference Types

The **Data Reference Type** determines where an attribute's value comes from. There are four types:

### 3.2.2.1 TDengine Metric

References a metric column (a time-series measurement column) in a TDengine TSDB table. The attribute value is read in real time as new data is ingested. Use this type for any value that changes over time — temperature, pressure, flow rate, current, voltage, and so on.

The Data Reference Setting format is:

```text
ConnectionName/DatabaseName/TableName/ColumnName
```

Example: `TDengine/idmp_sample_utility/em-12/current`

If the collected metric also carries a data quality value stored in the same table, the Data Reference Setting can include the name of the quality column. The format is:

```text
ConnectionName/DatabaseName/TableName/ColumnName:QualityColumnName
```

Example: `TDengine/idmp_sample_utility/em-12/current:quality`

:::note
The data type of the quality column must be INT.
:::

### 3.2.2.2 TDengine Tag

References a tag value in a TDengine TSDB table. Tags are static metadata fields attached to a table (such as device ID, location, or installation floor). Use this type for attributes whose values come from TSDB tags rather than time-series columns.

The format is the same as TDengine Metric:

```text
ConnectionName/DatabaseName/TableName/TagName
```

Example: `TDengine/idmp_sample_utility/em-17/location`

### 3.2.2.3 Formula

A calculated attribute whose value is derived from an expression referencing other attributes of the same element. The expression is converted to a TDengine SQL expression and executed against TDengine TSDB. The output must be numeric.

Example expression:

```text
log(current) * voltage + 10
```

The special replacement parameter `TIME` is available — it is substituted with the current local time in milliseconds. You can click **Evaluate** in the expression editor to test and validate the formula before saving. See [Section 3.2.9](#329-expression-editor) for the full Expression Editor reference.

:::note
Formula attributes can only reference attributes of the same element. To use a value from another element, add a new attribute to the current element that maps to the same data source.
:::

### 3.2.2.4 String Builder

Similar to Formula but the output is a string. The input can be any attribute of the current element (not limited to numeric types). Common functions include:

- `CONCAT(...)` — concatenate multiple strings
- `SUBSTR(str, start, length)` — extract a substring
- `CAST(value AS varchar)` — convert a non-string value to string

Replacement parameters beyond `TIME` are also available, such as the current element name, current attribute name, and the template name.

Example expression:

```text
CONCAT('voltage of device ', ${attributes['Device ID']}, ' is ', CAST(${attributes['Voltage']} AS varchar), 'V')
```

:::note
Use `CONCAT()` to join strings — the `+` operator cannot be used for string concatenation. Always use `CAST()` to convert numeric attributes to string before passing them to `CONCAT()`.
:::

## 3.2.3 Attribute Properties

Every attribute has the following configurable properties:

### 3.2.3.1 Basic fields

<table>
<colgroup><col style="width:15em"/><col/></colgroup>
<thead><tr><th>Property</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>A unique name for the attribute within its element</td></tr>
<tr><td><strong>Description</strong></td><td>A human-readable explanation of what the attribute measures or represents</td></tr>
<tr><td><strong>Categories</strong></td><td>One or more tags for grouping and filtering attributes within the Attributes tab</td></tr>
<tr><td><strong>Value Type</strong></td><td>The data type of the value: <code>Float</code>, <code>Double</code>, <code>Int</code>, <code>BigInt</code>, <code>TinyInt</code>, <code>SmallInt</code>, <code>Bool</code>, <code>Nchar</code>, <code>Varchar</code>, <code>Timestamp</code></td></tr>
<tr><td><strong>Default Value</strong></td><td>The value returned when no data is available from the data source</td></tr>
<tr><td><strong>UOM Class</strong></td><td>The physical quantity category (e.g., Electric Current, Temperature, Pressure). Selecting a UOM Class filters the available unit options for Default UOM and Display UOM.</td></tr>
<tr><td><strong>Default UOM</strong></td><td>The unit in which the attribute value is stored (e.g., ampere, °C, bar)</td></tr>
<tr><td><strong>Display UOM</strong></td><td>The unit used when displaying the value in panels and dashboards. Can differ from Default UOM — IDMP applies the conversion automatically.</td></tr>
<tr><td><strong>Display Digits</strong></td><td>Positive values indicate the number of digits after the decimal point; negative values indicate the number of significant digits.</td></tr>
<tr><td><strong>Data Reference Type</strong></td><td>Where the attribute value comes from: TDengine Metric, TDengine Tag, Formula, or String Builder (see <a href="#322-data-reference-types">3.2.2</a>)</td></tr>
<tr><td><strong>Data Reference Setting</strong></td><td>The path to the TDengine TSDB data source in the format <code>ConnectionName/DatabaseName/TableName/ColumnName</code>, optionally with a quality column suffix as <code>.../ColumnName:QualityColumnName</code></td></tr>
<tr><td><strong>Path</strong></td><td>The full path of the attribute within the asset model (read-only, auto-generated)</td></tr>
</tbody>
</table>

### 3.2.3.2 Limits Configuration

Define operational thresholds for the attribute. Each limit has a name and a numeric value:

<table>
<colgroup><col style="width:6em"/><col/></colgroup>
<thead><tr><th>Limit</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td><strong>Minimum</strong></td><td>The lowest physically possible or acceptable value</td></tr>
<tr><td><strong>LoLo</strong></td><td>Low-Low alarm threshold — critical low condition</td></tr>
<tr><td><strong>Lo</strong></td><td>Low alarm threshold — warning low condition</td></tr>
<tr><td><strong>Target</strong></td><td>The desired setpoint or normal operating value</td></tr>
<tr><td><strong>Hi</strong></td><td>High alarm threshold — warning high condition</td></tr>
<tr><td><strong>HiHi</strong></td><td>High-High alarm threshold — critical high condition</td></tr>
<tr><td><strong>Maximum</strong></td><td>The highest physically possible or acceptable value</td></tr>
</tbody>
</table>

Each limit entry also has an optional **Attribute** field — you can link a limit to another attribute rather than a fixed value, allowing dynamic limits that change based on real-time conditions.

### 3.2.3.3 Forecast Configuration

Configure AI-based forecasting for this attribute:

<table>
<colgroup><col style="width:7em"/><col/></colgroup>
<thead><tr><th>Option</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>TDgpt</strong></td><td>Use TDengine's built-in time-series forecasting engine (TDgpt) to predict future values</td></tr>
<tr><td><strong>External</strong></td><td>Connect to an external forecasting service via a configured endpoint</td></tr>
<tr><td><strong>None</strong></td><td>No forecasting (default)</td></tr>
</tbody>
</table>

### 3.2.3.4 Additional Properties

Free-form key-value pairs for storing any custom metadata specific to the attribute (e.g., instrument tag, calibration date, sensor model). Click **+** to add a new entry.

### 3.2.3.5 Configuration flags

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Flag</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Constant Item</strong></td><td>Marks this attribute as a constant — its value does not change over time</td></tr>
<tr><td><strong>Hidden</strong></td><td>Hides the attribute from the default Attributes list. Hidden attributes are only visible when the <strong>Show Hidden Attributes</strong> toggle is enabled.</td></tr>
<tr><td><strong>Excluded</strong></td><td>Excludes the attribute from analyses and AI-generated insights</td></tr>
</tbody>
</table>

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

### 3.2.6.1 Method 1: From the attribute detail view

1. Click the attribute name in the list to open its detail view.
2. Click the **Edit** icon (pencil) in the toolbar.
3. Modify the desired fields and click **Save**.

### 3.2.6.2 Method 2: From the attributes list ⋮ menu

1. In the Attributes list, click the **⋮** menu on the attribute row.
2. Select **Edit**.
3. Modify the desired fields and click **Save**.

## 3.2.7 Deleting Attributes

There are two ways to delete an attribute:

### 3.2.7.1 Method 1: From the attribute detail view

1. Open the attribute detail view by clicking the attribute name.
2. Click the **Delete** icon (trash) in the top-right toolbar.
3. Confirm the deletion.

### 3.2.7.2 Method 2: From the attributes list ⋮ menu

1. In the Attributes list, click the **⋮** menu on the attribute row.
2. Select **Delete** and confirm.

:::warning
Deleting an attribute removes its configuration and all associated metadata from TDengine IDMP. The underlying time-series data in TDengine TSDB is not affected. Dashboards, analyses, or event rules that reference the deleted attribute may stop working and will need to be updated.
:::

## 3.2.8 Other Attribute Operations

The **⋮** menu in the attributes list also provides the following operations:

<table>
<colgroup><col style="width:13em"/><col/></colgroup>
<thead><tr><th>Action</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>View</strong></td><td>Open the attribute detail view</td></tr>
<tr><td><strong>Copy</strong></td><td>Copy the attribute configuration. The copied attribute can be pasted as a new attribute on the same element or on any other element.</td></tr>
<tr><td><strong>Move Up / Move Down</strong></td><td>Reorder the attribute within the list</td></tr>
<tr><td><strong>Add Data Entry</strong></td><td>An operation exclusive to TDengine Metric attributes. Manually enter a data point; the entered data will be inserted into the TSDB table referenced by the attribute.</td></tr>
<tr><td><strong>Add to trend</strong></td><td>Quickly add this attribute to a new Trend Chart panel</td></tr>
<tr><td><strong>History Value</strong></td><td>View the historical time-series values for this attribute</td></tr>
</tbody>
</table>

## 3.2.9 Expression Editor

The Expression Editor is a shared UI component used wherever expressions are configured in IDMP — including Formula and String Builder attribute definitions, analysis output attributes, and analysis trigger conditions (pre-filter and event window expressions). It opens as a dialog when you click on an expression input field.

### 3.2.9.1 Where Expressions Are Used

<table>
<colgroup><col style="width:32em"/><col/></colgroup>
<thead><tr><th>Location</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><strong>Formula attribute</strong> — Data Reference Setting</td><td>Defines a calculated attribute value derived from other attributes of the same element</td></tr>
<tr><td><strong>String Builder attribute</strong> — Data Reference Setting</td><td>Builds a string value by combining attribute values with string functions</td></tr>
<tr><td><strong>Analysis</strong> — Output Attributes, Expression column</td><td>Computes a result to write to an element or event attribute each time the analysis fires</td></tr>
<tr><td><strong>Analysis</strong> — Trigger, Pre-filter</td><td>Filters data rows before the trigger evaluates</td></tr>
<tr><td><strong>Analysis</strong> — Event Window trigger, Start/Stop conditions</td><td>Defines when the event window opens and closes</td></tr>
</tbody>
</table>

### 3.2.9.2 Expression Editor Layout

The dialog has three panels:

### 3.2.9.3 Attribute panel (left)

Browse and insert the element's attributes into the expression. Attributes are organized into groups:

<table>
<colgroup><col style="width:15em"/><col/></colgroup>
<thead><tr><th>Group</th><th>Contents</th></tr></thead>
<tbody>
<tr><td><strong>Metrics</strong></td><td>Time-series metric attributes (e.g., Current, Voltage, Power)</td></tr>
<tr><td><strong>Tags</strong></td><td>Tag (dimension) attributes — static metadata fields</td></tr>
<tr><td><strong>Other Attributes</strong></td><td>Any remaining attributes defined on the element</td></tr>
<tr><td><strong>Substitution Parameters</strong></td><td>System-level substitution values such as <code>TIME</code> (current local time in milliseconds), current element name, attribute name, and template name</td></tr>
</tbody>
</table>

A **Filter** field at the top lets you search by name. Click an attribute or parameter to insert it at the cursor position in the expression.

### 3.2.9.4 Expression editor (center)

A code editor where you write the expression. An operator shortcut bar at the top provides one-click insertion of common operators:

```text
+  -  *  /  =  <  >  >=  <=  !=  <>  &  |
```

### 3.2.9.5 Function panel (right)

Browse and insert functions by category. A **Filter** field lets you search by function name. Click a function name to insert it at the cursor position.

### 3.2.9.6 Function Categories

<table>
<colgroup><col style="width:19em"/><col/></colgroup>
<thead><tr><th>Category</th><th>Example functions</th></tr></thead>
<tbody>
<tr><td><strong>Mathematical Functions</strong></td><td>ABS, CEIL, FLOOR, ROUND, SQRT, LOG, POW, SIN, COS, ...</td></tr>
<tr><td><strong>String Functions</strong></td><td>CONCAT, LENGTH, LOWER, UPPER, SUBSTR, TRIM, LTRIM, RTRIM, ...</td></tr>
<tr><td><strong>Conversion Functions</strong></td><td>CAST, TO\_ISO8601, TO\_TIMESTAMP, ...</td></tr>
<tr><td><strong>Time and Date Functions</strong></td><td>NOW, TODAY, TIMEZONE, TIMETRUNCATE, ...</td></tr>
<tr><td><strong>Aggregate Functions</strong></td><td>AVG, COUNT, SUM, STDDEV, STDDEV\_POP, PERCENTILE, SPREAD, ELAPSED, HISTOGRAM, ...</td></tr>
<tr><td><strong>Selection Functions</strong></td><td>MAX, MIN, FIRST, LAST, LAST\_ROW, TOP, BOTTOM, UNIQUE, MODE, SAMPLE, ...</td></tr>
<tr><td><strong>Time-Series Specific Functions</strong></td><td>MAVG, DERIVATIVE, DIFF, IRATE, CSUM, INTERP, TWA, STATECOUNT, STATEDURATION, ...</td></tr>
</tbody>
</table>

### 3.2.9.7 Evaluating an Expression

Where supported (Formula and String Builder attribute definitions), the editor includes an **Evaluate** button and an **Evaluate Result** display at the bottom of the center panel. Click **Evaluate** to run the expression against the element's current data and verify the result before saving.

Click **Save** in the dialog to apply the expression, or **Cancel** to discard changes.

## 3.2.8 Attribute Templates {#attribute-templates}

An **attribute template** defines a standard attribute — including its name, data type, unit of measure, and data reference binding — as part of an [element template](./01-elements.md#316-element-templates). When an element is created from the template, all of its attribute templates are instantiated automatically, with substitution strings resolved to the actual values for that element.

### 3.2.8.1 Creating an Attribute Template

1. In **Libraries**, open the element template you want to add attributes to.
2. Click the **Attribute Template** tab at the top of the template detail page.
3. Click **+** to open the attribute template creation form.
4. Fill in the attribute fields and configure the data reference binding (see below).

### 3.2.8.2 Attribute Template Fields

<table>
<colgroup><col style="width:15em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>Attribute name</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description</td></tr>
<tr><td><strong>Configuration</strong></td><td>Additional configuration flags (e.g., hidden, constant)</td></tr>
<tr><td><strong>Categories</strong></td><td>Category tags</td></tr>
<tr><td><strong>Value Type</strong></td><td>Data type: Float, Int, Varchar, Bool, etc.</td></tr>
<tr><td><strong>Default Value</strong></td><td>Optional default value</td></tr>
<tr><td><strong>Default UOM</strong></td><td>The unit of measure used for storage</td></tr>
<tr><td><strong>Display UOM</strong></td><td>The unit of measure shown in the UI (may differ from storage UOM)</td></tr>
<tr><td><strong>Display Digits</strong></td><td>Number of decimal places shown in the UI</td></tr>
<tr><td><strong>Data Reference Type</strong></td><td>How the attribute is bound to TDengine TSDB data (see below)</td></tr>
<tr><td><strong>Data Reference Setting</strong></td><td>The resolved binding path, e.g., <code>TDengine/idmp_sample_utility/${KEYWORD1}/current</code></td></tr>
<tr><td><strong>Limits Configuration</strong></td><td>Optional Hi/Lo alarm limit thresholds</td></tr>
<tr><td><strong>Forecast Configuration</strong></td><td>Optional TDgpt forecasting configuration for this attribute</td></tr>
</tbody>
</table>

### 3.2.8.3 Data Reference Binding

The **Data Reference Type** determines how the attribute is connected to time-series data in TDengine TSDB:

<table>
<colgroup><col style="width:13em"/><col/></colgroup>
<thead><tr><th>Data Reference Type</th><th>Use</th></tr></thead>
<tbody>
<tr><td><strong>None</strong></td><td>No TSDB binding — the attribute holds a static or calculated value only.</td></tr>
<tr><td><strong>TDengine Metric</strong></td><td>Binds the attribute to a time-series metric column in a TDengine supertable.</td></tr>
<tr><td><strong>TDengine Tag</strong></td><td>Binds the attribute to a tag column in a TDengine supertable.</td></tr>
</tbody>
</table>

When you select **TDengine Metric** or **TDengine Tag**, configure the binding by specifying the TDengine connection, database, child table name (using substitution strings such as `${KEYWORD1}` so each element binds to its own table), and column name. The resulting Data Reference Setting takes the form:

```text
TDengine/<database>/${KEYWORD1}/<column>
```

Click **Check** to verify the binding resolves correctly for a test input.
