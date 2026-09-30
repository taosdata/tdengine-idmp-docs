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

### 3.2.2.1 Metric

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

**External metrics:** Select **Metric** as the data reference type. In **Data Reference Setting**, select an existing MySQL, PostgreSQL, or InfluxDB connection, then choose the database, table, and value column. For PostgreSQL, also select a Schema. Click **Check** before saving. TDengine virtual tables read the external metrics without first copying the metric data into TDengine.

The external connection's parent TDengine connection must be the same connection that hosts the attribute's virtual table. MySQL and PostgreSQL source tables must have exactly one timestamp column in their primary key; InfluxDB uses the `time` column. External metric references currently do not support filters.

### 3.2.2.2 Tag

References a tag value in a TDengine TSDB table. Tags are static metadata fields attached to a table (such as device ID, location, or installation floor). Use this type for attributes whose values come from TSDB tags rather than time-series columns.

The format is the same as Metric:

```text
ConnectionName/DatabaseName/TableName/TagName
```

Example: `TDengine/idmp_sample_utility/em-17/location`

**External tags:** Select **Tag** as the data reference type. In **Data Reference Setting**, select a MySQL, PostgreSQL, or InfluxDB connection, then choose the database, table, and value column. For PostgreSQL, also select a Schema. External tags can read ordinary columns, making them suitable for metadata such as device names and regions.

- **Row selection**: **Unique row** requires exactly one result row. **Latest row by timestamp** also requires a **Timestamp column**; validation fails if multiple rows share the latest timestamp.
- **Filters**: Click **Add condition** and enter the column name, value type, and value. Up to 16 equality conditions are supported, joined with AND or OR. AND takes precedence over OR.
- **Automatic synchronization**: Enabled by default. IDMP periodically reads the external value and updates the local tag in TDengine. Turning it off stops periodic updates. If a read fails, returns no rows, or returns NULL, the last successful value is retained.

Click **Check** to validate the value before saving. For connection setup, see [External Data Source Connections](../12-data-ingestion/01-connections.md#1212-external-data-source-connections).

:::note
Existing SQL tag configurations remain supported, including common read-only expressions such as `IN`, `BETWEEN`, `CASE`, and `EXISTS`. The result must be one row and one column with a non-NULL value. The current UI does not provide a SQL editor; selecting a table and column in Data Reference Setting and confirming replaces the SQL configuration with the form-based configuration described above.
:::

### 3.2.2.3 Formula

A calculated attribute whose value is derived from an expression referencing other attributes of the same element. The expression is converted to a TDengine SQL expression and executed against TDengine TSDB. The output must be numeric.

Example expression:

```text
log(current) * voltage + 10
```

The special replacement parameter `TIME` is available — it is substituted with the current local time in milliseconds. You can click **Evaluate** in the expression editor to test and validate the formula before saving. See [Section 3.2.10](#3210-expression-editor) for the full Expression Editor reference.

:::note
Formula attributes can only reference attributes of the same element. To use a value from another element, add a new attribute to the current element that maps to the same data source.
:::

:::warning Use FILL_FORWARD when referenced attributes are not timestamp-aligned
If the attributes referenced by a formula are not aligned on timestamps (their data points are not written at the same moments), each timestamp carries values for only some of the attributes and NULL for the rest — and any operation involving NULL turns the entire formula result into NULL. In this case, you must wrap the referenced attributes with the `FILL_FORWARD()` function, which fills each NULL with the previous non-NULL value of that column, for example: `fill_forward(current) * fill_forward(voltage) + 10`.

For the full reference of `FILL_FORWARD`, see the [TDengine documentation](https://docs.tdengine.com/tdengine-sql/data-query/function/#fill_forward).
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

| Property | Description |
|---|---|
| **Name** | A unique name for the attribute within its element |
| **Description** | A human-readable explanation of what the attribute measures or represents |
| **Categories** | One or more tags for grouping and filtering attributes within the Attributes tab |
| **Value Type** | The data type of the value, organized into three groups. **Basic Types**: `Float`, `Double`, `Int`, `IntUnsigned`, `BigInt`, `BigIntUnsigned`, `TinyInt`, `TinyIntUnsigned`, `SmallInt`, `SmallIntUnsigned`, `Bool`, `Nchar`, `Varchar`, `Timestamp`, `Decimal` (requires TDengine TSDB version 3.4.1.1 or above; Data Reference Type must be Metric). **Enumeration Types**: select from enumeration types defined in the system; the attribute value is restricted to the predefined options of that enumeration. **Object Types**: `File`, `Video`, `Attribute` (attribute reference), `Element` (element reference). |
| **Default Value** | The value returned when no data is available from the data source |
| **UOM Class** | The physical quantity category (e.g., Electric Current, Temperature, Pressure). Selecting a UOM Class filters the available unit options for Default UOM and Display UOM. |
| **Default UOM** | The unit in which the attribute value is stored (e.g., ampere, °C, bar) |
| **Display UOM** | The unit used when displaying the value in panels and dashboards. Can differ from Default UOM — IDMP applies the conversion automatically. |
| **Display Digits** | Positive values indicate the number of digits after the decimal point; negative values indicate the number of significant digits. |
| **Data Reference Type** | Where the attribute value comes from: Metric, Tag, Formula, String Builder, or None (see [3.2.2](#322-data-reference-types)) |
| **Data Reference Setting** | Select the source connection, database, table, and column. Native TDengine references use `ConnectionName/DatabaseName/TableName/ColumnName`, optionally followed by `:QualityColumnName`. External connections also offer Schema, tag row selection, and filter settings (see [3.2.2](#322-data-reference-types)). |
| **Path** | The full path of the attribute within the asset model (read-only, auto-generated) |

:::note Naming rules
Attribute names must satisfy the following rules (the same rules apply to attribute templates):

- The name cannot be empty and cannot exceed 255 characters.
- The name cannot contain the special characters `$`, `{`, or `}` (these conflict with the `${...}` substitution parameter syntax).
- The name must be unique within its element (or element template); child attribute and trait names must also be unique under the same parent attribute.

Saving is rejected with an error message if any rule is violated. In addition, the description cannot exceed 2048 characters.
:::

### 3.2.3.2 Limits Configuration

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

### 3.2.3.3 Forecast Configuration

Configure AI-based forecasting for this attribute:

| Option | Description |
|---|---|
| **TDgpt** | Use TDengine's built-in time-series forecasting engine (TDgpt) to predict future values |
| **External** | Connect to an external forecasting service via a configured endpoint |
| **None** | No forecasting (default) |

### 3.2.3.4 Additional Properties

Free-form key-value pairs for storing any custom metadata specific to the attribute (e.g., instrument tag, calibration date, sensor model). Click **+** to add a new entry.

### 3.2.3.5 Configuration flags

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

| Action | Description |
|---|---|
| **View** | Open the attribute detail view |
| **Copy** | Copy the attribute configuration. The copied attribute can be pasted as a new attribute on the same element or on any other element. |
| **Move Up / Move Down** | Reorder the attribute within the list |
| **Add Data Entry** | An operation exclusive to Metric attributes. Manually enter a data point; the entered data will be inserted into the TSDB table referenced by the attribute. |
| **Add to trend** | Quickly add this attribute to a new Trend Chart panel |
| **History Value** | View the historical time-series values for this attribute |

## 3.2.9 Child Attributes

An attribute can carry **child attributes** — subordinate attributes attached to a parent attribute, used to group a set of related information under one parent. Child attributes come in two kinds:

| Kind | Description |
|---|---|
| **General child attribute** | A child attribute without a data reference. The system automatically materializes it as a tag column on the element's virtual table (created automatically, no manual data reference required), so a general child attribute can be referenced in expressions and panels just like a regular attribute. |
| **Data-reference child attribute** | A child attribute with a configured data reference, such as a Formula reference. Available only on custom attributes of template-free elements and on attribute templates. |

The child attributes of a KPI attribute are generated and maintained automatically by the system according to the KPI definition (see [3.2.12 KPI Attributes](#3212-kpi-attributes)); they do not need to be added manually.

### 3.2.9.1 Managing Child Attributes

Child attributes are managed in the **Child Attributes** collapsible panel of the attribute create/edit form:

1. Open the attribute create or edit form.
2. Expand the **Child Attributes** panel. The table lists each existing child attribute's name, description, data reference type, data reference setting, value type, and display value.
3. Click **+** at the bottom of the panel to open the child attribute form, fill in the fields, and save — the child attribute is added to the list.
4. Click the ⋮ menu on a child attribute row to edit or delete it.
5. Click **Save** on the attribute form; child attributes are saved together with the parent attribute.

### 3.2.9.2 Child Attribute Constraints

| Constraint | Description |
|---|---|
| No nesting | A child attribute cannot have child attributes of its own. |
| No traits | Child attributes cannot configure limits, forecast, or other traits. |
| Value type restriction | The KPI value type is not available for child attributes. |
| Unique naming | Child attribute names must be unique under the same parent attribute (naming rules in [3.2.3.1](#3231-basic-fields)). |
| Template-derived attributes are read-only | The child attributes of an attribute delivered by an attribute template are managed by the template and cannot be added or removed on the element; only custom attributes (created directly on the element) allow adding, editing, and deleting child attributes. |
| No data references on template elements | On an element created from an element template, custom attributes and their child attributes cannot configure TDengine data references; to reference TSDB data, add the corresponding attribute on the element template instead. |

## 3.2.10 Expression Editor

The Expression Editor is a shared UI component used wherever expressions are configured in IDMP — including Formula and String Builder attribute definitions, analysis output attributes, and analysis trigger conditions (pre-filter and event window expressions). It opens as a dialog when you click on an expression input field.

### 3.2.10.1 Where Expressions Are Used

| Location | Purpose |
|---|---|
| **Formula attribute** — Data Reference Setting | Defines a calculated attribute value derived from other attributes of the same element |
| **String Builder attribute** — Data Reference Setting | Builds a string value by combining attribute values with string functions |
| **Panels** — metric/dimension expressions, filter conditions | Combine attribute values and child attributes (including KPI sub-attributes) into displayed series and filter conditions |
| **Analysis** — Output Attributes, Expression column | Computes a result to write to an element or event attribute each time the analysis fires |
| **Analysis** — Trigger, Pre-filter | Filters data rows before the trigger evaluates |
| **Analysis** — Event Window trigger, Start/Stop conditions | Defines when the event window opens and closes |

### 3.2.10.2 Expression Editor Layout

The dialog has three panels:

### 3.2.10.3 Attribute panel (left)

The left panel is titled **Attributes**. By default, it lists the attributes of the current element, or the attribute templates of the current element template. Attributes are shown directly in a flat list under the following categories, with **Substitution Parameters** provided as an expandable node:

| Group | Contents |
|---|---|
| **Metric** | Attributes that reference metric columns. If an attribute has configured limits, it can be expanded to list and insert those limits. |
| **Tag** | Attributes that reference tag values, including tags synchronized from external data sources. |
| **Formula** | Formula-type attributes. |
| **String Builder** | String Builder attributes. |
| **Regular Attributes** | Any remaining attributes outside the categories above. |
| **Substitution Parameters** | System-level substitution values shown as an expandable node, such as `TIME` (current local time in milliseconds), current element name, attribute name, and template name |

A **Filter** field at the top lets you search by name. Click an attribute or parameter to insert it at the cursor position in the expression.

**Window pseudo column nodes** — In the Expression Editor for **Analysis — Output Attributes**, the tree additionally shows a **Window Pseudo Columns** category above **Substitution Parameters** (`_twstart`, `_twend`, `_twduration`), inserted the same way as attributes. See [Section 7.4.5](../07-real-time-analysis/04-calculation.md#745-trigger-window-pseudo-columns).

**Child attribute and KPI nodes** — Attributes that carry child attributes can be expanded in the tree: regular child attributes (both general and data-reference child attributes) appear as leaves under their parent attribute node, while a KPI attribute acts purely as a group node that expands to show its sub-attributes. Clicking a child attribute node inserts a reference of the form `${attributes['ParentName']|childAttributes['ChildName']}`. Two restrictions apply:

- **KPI attributes cannot be referenced directly** — a KPI attribute holds no value itself; you must expand it and select one of its sub-attributes.
- **Not-ready KPI sub-attributes cannot be inserted** — sub-attributes of a KPI that has not finished building, and derived monthly/quarterly sub-attributes, are shown grayed out in the tree with a tooltip explaining why.

### 3.2.10.4 Expression editor (center)

A code editor where you write the expression. An operator shortcut bar at the top provides one-click insertion of common operators:

```text
+  -  *  /  =  <  >  >=  <=  !=  <>  &  |
```

### 3.2.10.5 Function panel (right)

Browse and insert functions by category. In addition to the built-in function categories, the panel also includes a **UDF** category. A **Filter** field lets you search by function name. Click a function name to insert it at the cursor position.

### 3.2.10.6 Function Categories

| Category | Example functions |
|---|---|
| **Mathematical Functions** | ABS, CEIL, FLOOR, ROUND, SQRT, LOG, POW, SIN, COS, ... |
| **String Functions** | CONCAT, LENGTH, LOWER, UPPER, SUBSTR, TRIM, LTRIM, RTRIM, ... |
| **Conversion Functions** | CAST, TO\_ISO8601, TO\_TIMESTAMP, ... |
| **Time and Date Functions** | NOW, TODAY, TIMEZONE, TIMETRUNCATE, ... |
| **Aggregate Functions** | AVG, COUNT, SUM, STDDEV, STDDEV\_POP, PERCENTILE, SPREAD, ELAPSED, HISTOGRAM, ... |
| **Selection Functions** | MAX, MIN, FIRST, LAST, LAST\_ROW, TOP, BOTTOM, UNIQUE, MODE, SAMPLE, ... |
| **Time-Series Specific Functions** | MAVG, DERIVATIVE, DIFF, IRATE, CSUM, INTERP, TWA, STATECOUNT, STATEDURATION, ... |
| **UDF** | User-defined functions registered in TDengine TSDB. |

### 3.2.10.7 Evaluating an Expression

Where supported (Formula and String Builder attribute definitions), the editor includes an **Evaluate** button and an **Evaluate Result** display at the bottom of the center panel. Click **Evaluate** to run the expression against the element's current data and verify the result before saving.

Click **Save** in the dialog to apply the expression, or **Cancel** to discard changes.

## 3.2.11 Attribute Templates {#attribute-templates}

An **attribute template** defines a standard attribute — including its name, data type, unit of measure, and data reference binding — as part of an [element template](./01-elements.md#316-element-templates). When an element is created from the template, all of its attribute templates are instantiated automatically, with substitution strings resolved to the actual values for that element.

### 3.2.11.1 Creating an Attribute Template

1. In **Libraries**, open the element template you want to add attributes to.
2. Click the **Attribute Template** tab at the top of the template detail page.
3. Click **+** to open the attribute template creation form.
4. Fill in the attribute fields and configure the data reference binding (see below).

### 3.2.11.2 Attribute Template Fields

| Field | Description |
|---|---|
| **Name** | Attribute name; the same naming rules as attributes apply (see the naming rules in [3.2.3.1](#3231-basic-fields)) |
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

### 3.2.11.3 Data Reference Binding

The **Data Reference Type** determines how the attribute is connected to time-series data in TDengine TSDB:

| Data Reference Type | Use |
|---|---|
| **None** | No TSDB binding — the attribute holds a static or calculated value only. |
| **Metric** | Binds the attribute to a time-series metric column in TDengine or an external data source. |
| **Tag** | References a TDengine tag value or a metadata value from an external data source. |

When you select **Metric** or **Tag**, configure the binding by specifying the source connection, database, table name (using substitution strings such as `${KEYWORD1}` so each element binds to its own table), and column name. For a TDengine connection, the Data Reference Setting takes the form:

```text
TDengine/<database>/${KEYWORD1}/<column>
```

Click **Check** to verify the binding resolves correctly for a test input.

Attribute templates also support MySQL, PostgreSQL, and InfluxDB connections, using the same value selection options as regular attributes. Table and column names can contain substitution strings, which resolve to the specific element's reference when the template is instantiated.

### 3.2.11.4 Child Attribute Templates

Attribute templates support **child attribute templates** as well, managed in the **Child Attributes** collapsible panel of the attribute template create/edit form. The operations are the same as for element attributes (see [3.2.9.1](#3291-managing-child-attributes)). Two kinds are supported:

- **General child attribute templates** — no data reference. When an element is instantiated, general child attributes are automatically materialized as tag columns on the element's virtual table.
- **Data-reference child attribute templates** — data references such as Formula can be configured, and the binding path may use substitution strings such as `${KEYWORD1}`.

Adding, editing, or removing child attributes on a template is synchronized to all elements using that template: newly added child attributes are automatically delivered and materialized on each element's virtual table, and removed ones are deleted from each element. On the element side, template-delivered child attributes are managed by the template (read-only); users can only add child attributes on custom attributes of the element.

## 3.2.12 KPI Attributes

A **KPI attribute** is a special aggregating attribute that continuously computes a source attribute (such as a Metric or Formula attribute) into a Key Performance Indicator (KPI) by an aggregation function and a statistical period. Unlike a regular attribute that holds a single measurement, one KPI attribute can contain multiple **sub-attributes**, each corresponding to one "aggregation function × statistical period" combination (e.g. "average / hourly", "sum / daily"). The system automatically creates the stream computation and the corresponding output table for the KPI attribute and maintains each sub-attribute's value in real time.

### 3.2.12.1 Scope

When creating a KPI attribute, first choose the source scope to aggregate from:

| Scope | Description |
| --- | --- |
| **Child Elements** | Aggregate from the source attributes of all child elements of this element (unavailable when the element has no children) |
| **This Element Only** | Compute only from this element's own source attributes |

### 3.2.12.2 Source Attribute

- When the scope is **Child Elements**, first select the child element's **attribute template**, then select the **source attribute** from that template.
- When the scope is **This Element Only**, select the **source attribute** directly from this element's attributes.

The source attribute's data reference type must be **Metric** or **Formula**; value types such as file, video, element reference, and KPI cannot be used as a KPI source.

### 3.2.12.3 KPI Definition

In the KPI Definition table, add one or more sub-attribute definitions, each containing:

| Field | Description |
| --- | --- |
| **Name** | The logical name of the sub-attribute (e.g. `avg_power`) |
| **Aggregation Function** | Aggregation method: AVG, MAX, MIN, SUM, COUNT, LAST, FIRST, HYPERLOGLOG, SPREAD, STDDEV, STDDEV_POP, VAR_POP, etc. |
| **Period** | Statistical period, multi-select: hourly, daily, weekly, monthly, quarterly. Each selected period produces one sub-attribute (e.g. an hourly and a daily sub-attribute for `avg_power`) |

### 3.2.12.4 Calculation Level

How the aggregation unfolds across the asset hierarchy:

| Level | Description |
| --- | --- |
| **From This Level** | Aggregate downward from the current element's level |
| **From Top Level** | Aggregate downward from the top of the asset tree |
| **This Level Only** | This level only, without recursing into children |

### 3.2.12.5 Other Options

| Option | Description |
| --- | --- |
| **Prefill From** | Optional. When a start time is set, the system backfills historical data from that time to now; leave empty to skip backfill |
| **Display Value** | Optional. Which sub-attribute's value to show by default in panels and elsewhere |

### 3.2.12.6 Build State

After saving, the system creates the stream computation and output table, and the KPI attribute enters the build flow with the following states:

| State | Description |
| --- | --- |
| **Building** | Creating the stream and output table |
| **Active** | Build complete, computing normally |
| **Failed** | Build error; the rebuild can be retried |

> KPI attributes are the data source for the [KPI Report](../04-visualization/02-chart-types/19-kpi-report.md) panel. Select KPI sub-attributes as columns in a KPI Report to display and compare (MoM / YoY) each asset's KPI values by statistical period.
>
> A KPI attribute itself cannot be referenced directly in expressions, but its sub-attributes can be referenced in Formula attributes, String Builder attributes, panels, and [real-time analysis](../07-real-time-analysis/04-calculation.md#744-output-attributes) expressions, using the syntax `${attributes['ParentName']|childAttributes['ChildName']}` (click the sub-attribute node in the expression editor's attribute tree to insert it). Formula and panel scenarios require the KPI to have finished building; when combining a KPI sub-attribute reference with real-time attributes in a calculation, watch out for timestamp misalignment (see the FILL_FORWARD notes in [3.2.2.3](#3223-formula)).
