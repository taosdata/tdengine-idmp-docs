---
title: Building Data Models from TDengine TSDB
sidebar_label: Building Data Models from TDengine TSDB
---

# 12.3 Building Data Models from TDengine TSDB

For users who already have data in TDengine TSDB, IDMP can automatically build the asset data model — elements, element templates, and attributes — directly from the TSDB schema. This eliminates the need to create elements and attributes manually.

IDMP provides four approaches, all accessible from the TDengine connection detail page under **Admin Console → Connections → [connection name]**:

| Tab | Best for |
|---|---|
| **Easy Import** | Well-structured TSDB data with hierarchical location tags — fastest path to a complete model |
| **Map STable to Element** | Data without location tags, or when mapping multiple supertables to one element template |
| **Import from CSV** | Bulk configuration via a CSV file, especially for single-column data models with many supertables |
| **Import from OPC** | OPC-structured data already in TSDB |

## 12.3.1 Easy Import

Easy Import works best when your TSDB supertables already have a tag that encodes the asset hierarchy — for example, a `location` tag whose value is a dot-separated path like `Plant.Line1.Machine3`. IDMP maps each supertable to an element template and each child table to an element instance.

**How to use:**

1. Select the **Database** and **Supertable** at the top of the page. Check **Ignore** to skip a supertable entirely.
2. In the **Tags** section, configure each tag:
   - Check **Path** to use the tag value as the element's location in the asset tree. Set **Path Level** (0 = leaf) to control hierarchy depth. Optionally set a **Parent Element** to root the import under an existing element.
   - When **Path** is checked, an **Element Path Expression** editor appears, allowing you to customize the path structure in the asset tree. The expression uses dots to separate hierarchy levels and supports both fixed text and `${tagName}` substitution variables. The default value is `{rename}.${tagName}`. Examples:
     - `Location.${location}` — creates a fixed "Location" level with the `location` tag values expanded below it
     - `${province}.${city}.${district}` — builds a multi-level path using multiple tags; the system automatically queries actual tag value combinations (avoiding cartesian products)
     - If a tag value itself contains dots (e.g., `Beijing.Chaoyang`), it is automatically split into multiple hierarchy levels
   - Leave **Path** unchecked to import the tag as a static attribute (element property).
   - Use the **Rename** field to give the attribute a display name different from the TSDB column name. When the rename is changed, the default prefix in the path expression is automatically updated.
   - Optionally assign an **Attribute Category**.
3. In the **Metrics** section, check **Map STable to Element** for each metric column you want to import as a dynamic attribute. Use **Rename** and **Attribute Category** as needed.
4. Optionally set an **Element Category** and a **Subtable Filter** (a SQL WHERE-style expression to include only matching child tables).
5. Click **Next Supertable** to proceed to the next supertable, or click **Finish** to complete the configuration immediately using defaults for remaining supertables.

A summary at the bottom of the page shows how many tags and metrics are selected for the current supertable, and the total count of supertables selected versus ignored.

**Auto-sync:** After the import task runs, IDMP monitors the TSDB for metadata changes. New child tables added to a configured supertable are automatically synced as new elements — no manual intervention required.

**Rebuild:** If new supertables are added to the database, click **Rebuild** to re-open the configuration with existing settings pre-loaded. Add the new supertables and save.

**Data enrichment:** After import, enrich each element with units of measure, descriptions, categories, and limit thresholds to give the data business context and make it AI-ready.

## 12.3.2 Map STable to Element

Use this approach when your TSDB data lacks a hierarchical tag, uses a single-column model (one supertable per measurement), or when you need to map columns from multiple supertables to a single element template.

IDMP internally creates virtual supertables and virtual tables to merge data from multiple supertables into a unified element — this process is transparent to the user.

**The Map STable to Element tab** shows a list of configured asset models with columns: **Database**, **Supertable**, **Element Template Name**, **Status**, **Create Time**, and **Update Time**.

Click **+ Add New Asset Model** to configure a new mapping. The form includes:

| Field | Description |
|---|---|
| **Database** | The source TDengine database |
| **Supertable** | The source supertable |
| **Element Template** (required) | The element template to map to. Must be created in Libraries before starting. |
| **Element Name** (required) | Expression defining the element name. Click **+** to insert substitution strings (e.g., tag values). Click the preview icon to verify the result. |
| **Element Path** (required) | Expression defining the element's location in the asset tree. Use dots to separate hierarchy levels, e.g., `${location}.${rack}`. Click the preview icon to verify. |
| **Element Category** | Optional category tag for the created elements |
| **Tags** | Map each supertable tag to an attribute template on the element template, or select **None** to discard it |
| **Metrics** | Map each supertable metric column to an attribute template, or select **None** to discard it |
| **Subtable Filter** | Optional filter expression to include only matching child tables |

Click **Finish** to create the asset model. Each asset model covers one supertable-to-template mapping. For a complete single-column data model, create one asset model per supertable (or per subset of metrics).

**Auto-sync:** New child tables added to mapped supertables are automatically synced as new elements.

:::note
If new supertables are added to the database after setup, you must manually add a new asset model for each. New supertables are not picked up automatically.
:::

## 12.3.3 Import from CSV

CSV import is a bulk alternative to Map STable to Element. It is most useful when you have many supertables to configure — especially single-column models — and prefer to define all mappings in a spreadsheet rather than through the UI.

**Workflow:**

1. Click the **export** icon (download) in the toolbar to export a CSV configuration template based on your TSDB schema. Select the databases and supertables to include. Optionally check **Export child table names** to include individual child table names for cases where each child table needs a specific element name or path.
2. Edit the CSV file to fill in element name expressions, element path expressions, attribute template mappings, and other settings.
3. Click the **import** icon (upload) in the toolbar to upload the completed CSV file. The import task starts immediately.

The task history table shows: **Created At**, **Status**, **File Name**, and **Reason** (if failed).

**Auto-sync:** Tasks without a specific child table name filter automatically sync new child tables added to the database.

**CSV file format rules:**

- Comment lines start with `#` and are required — do not delete them.
- The first non-comment row is the header row.
- Data is divided into blocks; each block starts with a row that sets the **Database Name** and **Supertable Name**.
- If no element template is specified, one is created automatically using the supertable name.
- The **Element Name Expression** supports substitution strings like `${tbname}` (child table name) or tag values like `${tag_name}`.
- The **Element Path Expression** supports the same substitutions. A dot in the value automatically creates hierarchy levels.
- **Reference Type** must be `TDengineMetric` or `TDengineTag`.
- **Attribute Template Name** references an existing attribute template in Libraries by name. If left blank or the name does not exist, an attribute template is created automatically using the **Super Table Column Name** (and tagged with the "auto-imported" category).
- The header row is locale-specific (Chinese and English templates have different headers). The header of the file you import must match the template for your language; do not mix them.
- The file must be encoded in **UTF-8** (not UTF-8 with BOM). If editing in Excel on Windows, convert the encoding before uploading.

**CSV column reference:**

| Column | Description |
|---|---|
| Database Name | The source TDengine database. Required on the first row of each block. |
| Super Table Name | The source supertable. Required on the first row of each block. |
| Element Template Name | The target element template. If blank, one is created using the supertable name. |
| Element Template Categories | Category expression for the element template (optional) |
| Sub Table Name | Per-child-table configuration (generated when **Export child table names** is checked), allowing a specific element name and path for each child table. Tasks with child table names configured do not auto-sync new child tables. |
| Sub Table Filter | SQL WHERE-style expression to include only matching child tables |
| Element Name Expression | Element name. Supports substitution strings like `${tbname}` (child table name) or `${tag_name}`. |
| Element Description Expression | Element description. Supports the same substitution strings. |
| Element Path Expression | The element's location in the asset tree. Dots separate hierarchy levels. Supports the same substitution strings. |
| Super Table Column Name | The tag or metric column this row maps |
| Attribute Template Name | The attribute template to map. A value starting with `Quality:` marks a quality column configuration row — see "Configuring quality columns" below. |
| Reference Type | `TDengineMetric` (metric) or `TDengineTag` (tag) |
| Attribute Template Categories | Category expression for the attribute template (optional) |
| Attribute Template Description | Description of the attribute template (optional) |
| Attribute Template Hidden | `true` / `false` (optional) |
| Attribute Template Excluded | `true` / `false` (optional) |
| Attribute Template Default UoM | Unit of measure name or abbreviation (optional) |
| Attribute Template Display UoM | Unit of measure used for display (optional) |
| Attribute Template Default Value | Default value of the attribute (optional) |
| Attribute Template Display Digits | Number of decimal places used for display (optional) |

**Configuring quality columns:**

To configure a data quality column for a metric, add an extra row in the block that the metric belongs to:

- Set **Reference Type** to `TDengineMetric`.
- Set **Attribute Template Name** to `Quality:<metric attribute template name>`, for example `Quality:voltage` (the prefix is case-sensitive — `quality:` and `QUALITY:` do not work).
- Set **Super Table Column Name** to the name of the column in the source supertable that holds the quality values, for example `quality`.

Notes:

- A quality column configuration row does not create an attribute template; it only records the quality column name on the metric's attribute template (updating it directly if the template already exists).
- Place the quality column configuration row **after** the corresponding metric row, so that the attribute template has already been created and the configuration takes effect immediately.
- After the import completes, a `<metric column>_q` quality column is added to the virtual supertable automatically, making quality values available in panels and history queries.
- Exported CSV templates do not include quality column configuration rows; add them manually.

:::note
If new supertables are added to the database after a CSV import, create a new import task for those supertables. Existing tasks do not pick up new supertables automatically.
:::

## 12.3.4 Import from OPC

Use this approach when OPC-structured data is already stored in TDengine TSDB and you want to build the asset model from it.

The **Import from OPC** tab shows the following configuration per database:

| Field | Description |
|---|---|
| **Database** | The source TDengine database |
| **Parent Element** | An optional existing element to root the imported elements under |
| **Ignore** | Check to skip this database |

For each supertable in the database, configure:

| Column | Description |
|---|---|
| Checkbox | Include or exclude this supertable |
| **Super Table Name** | The supertable to import |
| **Path** | The tag column whose value represents the OPC node path |
| **Data Column** | The metric column containing the data values |
| **Quality Column** | Optional tag or column containing the data quality value |
| **Path Level** | The starting level in the path hierarchy. For example, given the path `Objects.A.B`, if the starting level is set to 1, the path is processed as `A.B`. |

Navigate between databases using **Previous Database** and **Next Database**, then click **Finish** to create the import task.
