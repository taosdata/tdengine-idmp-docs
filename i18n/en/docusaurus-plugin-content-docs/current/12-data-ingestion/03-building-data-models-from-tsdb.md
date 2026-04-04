---
title: Building Data Models from TDengine TSDB
sidebar_label: Building Data Models from TDengine TSDB
---

# 12.3 Building Data Models from TDengine TSDB

For users who already have data in TDengine TSDB, IDMP can automatically build the asset data model — elements, element templates, and attributes — directly from the TSDB schema. This eliminates the need to create elements and attributes manually.

IDMP provides four approaches, all accessible from the TDengine connection detail page under **Admin Console → Connections → [connection name]**:

<table>
<colgroup><col style="width:14em"/><col/></colgroup>
<thead><tr><th>Tab</th><th>Best for</th></tr></thead>
<tbody>
<tr><td><strong>Easy Import</strong></td><td>Well-structured TSDB data with hierarchical location tags — fastest path to a complete model</td></tr>
<tr><td><strong>Map STable to Element</strong></td><td>Data without location tags, or when mapping multiple supertables to one element template</td></tr>
<tr><td><strong>Import from CSV</strong></td><td>Bulk configuration via a CSV file, especially for single-column data models with many supertables</td></tr>
<tr><td><strong>Import from OPC</strong></td><td>OPC-structured data already in TSDB</td></tr>
</tbody>
</table>

## 12.3.1 Easy Import

Easy Import works best when your TSDB supertables already have a tag that encodes the asset hierarchy — for example, a `location` tag whose value is a dot-separated path like `Plant.Line1.Machine3`. IDMP maps each supertable to an element template and each child table to an element instance.

**How to use:**

1. Select the **Database** and **Supertable** at the top of the page. Check **Ignore** to skip a supertable entirely.
2. In the **Tags** section, configure each tag:
   - Check **Path** to use the tag value as the element's location in the asset tree. Set **Path Level** (0 = leaf) to control hierarchy depth. Optionally set a **Parent Element** to root the import under an existing element.
   - Leave **Path** unchecked to import the tag as a static attribute (element property).
   - Use the **Rename** field to give the attribute a display name different from the TSDB column name.
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

<table>
<colgroup><col style="width:17em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Database</strong></td><td>The source TDengine database</td></tr>
<tr><td><strong>Supertable</strong></td><td>The source supertable</td></tr>
<tr><td><strong>Element Template</strong> (required)</td><td>The element template to map to. Must be created in Libraries before starting.</td></tr>
<tr><td><strong>Element Name</strong> (required)</td><td>Expression defining the element name. Click <strong>+</strong> to insert substitution strings (e.g., tag values). Click the preview icon to verify the result.</td></tr>
<tr><td><strong>Element Path</strong> (required)</td><td>Expression defining the element's location in the asset tree. Use dots to separate hierarchy levels, e.g., <code>${location}.${rack}</code>. Click the preview icon to verify.</td></tr>
<tr><td><strong>Element Category</strong></td><td>Optional category tag for the created elements</td></tr>
<tr><td><strong>Tags</strong></td><td>Map each supertable tag to an attribute template on the element template, or select <strong>None</strong> to discard it</td></tr>
<tr><td><strong>Metrics</strong></td><td>Map each supertable metric column to an attribute template, or select <strong>None</strong> to discard it</td></tr>
<tr><td><strong>Subtable Filter</strong></td><td>Optional filter expression to include only matching child tables</td></tr>
</tbody>
</table>

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
- The file must be encoded in **UTF-8** (not UTF-8 with BOM). If editing in Excel on Windows, convert the encoding before uploading.

:::note
If new supertables are added to the database after a CSV import, create a new import task for those supertables. Existing tasks do not pick up new supertables automatically.
:::

## 12.3.4 Import from OPC

Use this approach when OPC-structured data is already stored in TDengine TSDB and you want to build the asset model from it.

The **Import from OPC** tab shows the following configuration per database:

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Database</strong></td><td>The source TDengine database</td></tr>
<tr><td><strong>Parent Element</strong></td><td>An optional existing element to root the imported elements under</td></tr>
<tr><td><strong>Ignore</strong></td><td>Check to skip this database</td></tr>
</tbody>
</table>

For each supertable in the database, configure:

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>Column</th><th>Description</th></tr></thead>
<tbody>
<tr><td>Checkbox</td><td>Include or exclude this supertable</td></tr>
<tr><td><strong>Super Table Name</strong></td><td>The supertable to import</td></tr>
<tr><td><strong>Path</strong></td><td>The tag column whose value represents the OPC node path</td></tr>
<tr><td><strong>Data Column</strong></td><td>The metric column containing the data values</td></tr>
<tr><td><strong>Quality Column</strong></td><td>Optional tag or column containing the data quality value</td></tr>
<tr><td><strong>Path Level</strong></td><td>The depth offset within the path hierarchy</td></tr>
</tbody>
</table>

Navigate between databases using **Previous Database** and **Next Database**, then click **Finish** to create the import task.
