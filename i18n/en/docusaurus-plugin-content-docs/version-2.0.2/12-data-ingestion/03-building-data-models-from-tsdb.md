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
| **Import from File** | Bulk configuration via Markdown files, with multi-file upload and batch expansion — suited for large-scale modeling |
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

## 12.3.3 Import from File

Import from File is a bulk alternative to Map STable to Element. When you need to configure many supertables and elements, describing the model in a Markdown file — one element per block — is far more efficient than working through the UI. Team members can also each prepare their own files and upload multiple files at once for batch import.

**Workflow:**

1. Click **Generate Base MD** in the toolbar to generate a base configuration file from your TSDB schema. Select the databases and supertables to include. Optionally check **Include child tables** to generate a fixed-block skeleton per child table — useful when each child table needs a specific element name or path. The generated file is a skeleton to be edited: the `待补充` (to-be-filled) root path must be replaced with your real business path before uploading.
2. Edit the generated file to fill in element paths, descriptions, attribute mappings, and other settings. A blank reference template in your current UI language is available for download inside the import dialog.
3. Click **Import** in the toolbar, select one or more completed `.md` files, and submit them together. The import task starts immediately. A multi-file submission creates a single batch task that processes the files serially in upload order.

The task history table shows: **Created At**, **Status**, **File Name** (all files of a batch task, each downloadable individually), **Subscription Status**, and **Reason** (on failure, including a per-file failure summary for batch tasks). During import, the progress dialog shows per-file status (pending, running, finished, failed with reason); a single file failure does not affect the other files.

**Auto-sync:** After an import task containing batch-expansion blocks completes, IDMP monitors the TSDB for metadata changes. New child tables matching the subtable filter are automatically synced as new elements. The subscription can be started or stopped separately from the task list.

**MD file format rules:**

- A file consists of element blocks; each block starts with the `element:start` comment marker and ends with the `element:end` comment marker (language-neutral reserved words — never translate or modify them). Content outside blocks is ignored; use it for notes.
- `## Element: <path>` is the only source of the element path and name; segments are separated by an English period `.` and the last segment is the element name. Missing intermediate nodes are created automatically.
- The first two rows of each table (header and separator) are skipped by position. Data rows must have exactly two columns. Field keys must not repeat within one table. Escape a literal pipe as `\|` and a literal backslash as `\\` in values.
- An empty cell, whitespace-only cell, or the literals `（空）` / `(空)` are all treated as "not filled in".
- Field keys are matched against a union of Chinese, English, Korean, and Spanish keys; blank reference templates per language can be downloaded from the import dialog.
- The element template may be left blank (fixed block): no element template is created and the element is created as a template-less free element. For batch blocks, a blank template is auto-created as `<database name>_<supertable name>`.
- The file must be encoded in **UTF-8** (BOM tolerated; LF or CRLF line endings both accepted).

**Two block modes:**

- **Fixed block:** the element path contains no `${...}` expression and no subtable filter is set. Every attribute must specify a concrete child table; different attributes may reference different databases, supertables, and child tables.
- **Batch block:** the element path contains a `${...}` expression or a subtable filter is set. Child tables of the supertable are expanded into elements in bulk by the filter. Expressions support `${tbname}` (child table name) and `${tagName}` (tag value), and are allowed in the element path, description, and categories.

**Basic info and general info fields:**

| Field | Description |
|---|---|
| Element Template | The target element template. Blank in a fixed block means a template-less free element; blank in a batch block auto-creates one as `<database name>_<supertable name>`; a non-existent name is created automatically from the block's attributes; an existing template only gains missing attributes |
| Sub-table Filter | SQL WHERE-style filter expression (expansion condition of a batch block), e.g. `line_tag is not null` |
| Location · Altitude (m) | Numeric. Fixed blocks only (optional) |
| Location · Longitude | Numeric, -180 to 180. Fixed blocks only (optional) |
| Location · Latitude | Numeric, -90 to 90. Fixed blocks only (optional) |
| Description | Element description; `${...}` expressions supported in batch blocks (optional) |
| Categories | Comma-separated category names; expressions supported in batch blocks (optional) |

**Attribute fields:**

Each attribute starts with a `#### Attribute N` section heading (N is a readability-only ordinal). The table inside the section has the following fields:

| Field | Description |
|---|---|
| Attribute Name | The attribute name (i.e., the attribute template name) — the first row of each attribute table. A value starting with `Quality:` marks a quality column configuration section; see "Configuring quality columns" below. If blank, it defaults to the **Super Table Column** name |
| Database Name | The source TDengine database (required) |
| Super Table | The supertable holding the measurement data (required) |
| Super Table Column | The column holding the data; in a quality column section, the quality column name (required) |
| Reference Type | `TDengineMetric` (metric) or `TDengineTag` (tag); inferred from the supertable schema if blank (optional) |
| Sub-table | Required for fixed blocks with a concrete child table name; must be blank in batch blocks (refers to the currently expanded child table) |
| Attribute Description | Description of the attribute (optional) |
| Attribute Categories | Comma-separated (optional) |
| Default UOM | May only reference a unit of measure that already exists in the system (matched by name or abbreviation); referencing a missing unit fails the entire file before anything is created, listing all missing units at once (optional) |
| Display UOM | The unit of measure used for display; same rules as above (optional) |
| Display Digits | Number of decimal places used for display, a non-negative integer (optional) |

**Configuring quality columns:**

To configure a data quality column for a metric, add an extra attribute section in the same element block:

- Set **Attribute Name** to `Quality:<metric attribute name>`, for example `Quality:Rotation Speed` (the prefix is case-sensitive — `quality:` and `QUALITY:` do not work).
- Set **Super Table Column** to the name of the column in the source supertable that holds the quality values, for example `val_q`.

Notes:

- A quality column configuration section does not create an attribute template; it only records the quality column name on the metric's attribute template (updating it directly if the template already exists).
- After the import completes, the corresponding quality column is added to the virtual supertable automatically, making quality values available in panels and history queries.

:::note
If new supertables are added to the database after an import-from-file task, create a new import task for those supertables. Existing tasks do not pick up new supertables automatically.
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
