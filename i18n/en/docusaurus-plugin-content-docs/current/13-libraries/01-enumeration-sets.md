---
title: Enumeration Sets
sidebar_label: Enumeration Sets
---

# 13.1 Enumeration Sets

An **enumeration set** maps integer (or other numeric) values to human-readable labels. When an attribute's data type is an integer that represents a discrete state — such as `0 = Stopped`, `1 = Running`, `2 = Fault` — you can assign an enumeration set to the attribute so that IDMP displays the label instead of the raw number.

Enumeration sets are managed under **Libraries → Enumeration Sets**.

## 13.1.1 The Enumeration Set List

The list shows all defined enumeration sets with the following columns:

<table>
<colgroup><col style="width:9em"/><col/></colgroup>
<thead><tr><th>Column</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>Enumeration set name</td></tr>
<tr><td><strong>Value Type</strong></td><td>The numeric data type of the raw values</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description</td></tr>
</tbody>
</table>

Click an enumeration set name to view or edit it. Use the **⋮** menu on a row to edit or delete it.

## 13.1.2 Creating an Enumeration Set

Click **+** to create a new enumeration set. Fill in the following fields:

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong> (required)</td><td>A unique name. Accepts letters, numbers, underscores, hyphens, and spaces.</td></tr>
<tr><td><strong>Value Type</strong></td><td>The data type of the raw values. Options: <code>TinyInt</code> (default), <code>SmallInt</code>, <code>Int</code>, <code>BigInt</code>, <code>TinyInt Unsigned</code>, <code>SmallInt Unsigned</code>, <code>Int Unsigned</code>, <code>BigInt Unsigned</code>, <code>Float</code>, <code>Double</code>, <code>Boolean</code>, <code>Varchar</code>, <code>Nchar</code>, <code>Timestamp</code>.</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description of the enumeration set.</td></tr>
</tbody>
</table>

Then add one or more enumeration values in the **Value** table by clicking **+** in the table:

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong> (required)</td><td>The display label. Accepts letters, numbers, underscores, and hyphens.</td></tr>
<tr><td><strong>Value</strong> (required)</td><td>The raw numeric value this label maps to.</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description of this enumeration value.</td></tr>
<tr><td><strong>Parent</strong></td><td>Optional parent enumeration value. Use this to group related values under a common parent for easier filtering and browsing.</td></tr>
</tbody>
</table>

Click **Confirm** to add the value, then **Save** to save the enumeration set.

## 13.1.3 Sub-Values (Grouping)

IDMP supports sub-enumeration values: one enumeration value can serve as the parent of others. This is a grouping mechanism — parent values do not represent data themselves, but allow you to organize and filter child values.

**Example:** For a motor state enumeration, you might define a parent value `Abnormal` and group `Fault`, `Overload`, and `Emergency Stop` under it. Users can then filter by `Abnormal` to see all abnormal states at once.

## 13.1.4 Editing and Deleting

To edit an enumeration set, click its name in the list. To delete it, use the **⋮** menu on its row. An enumeration set cannot be deleted if it is currently assigned to one or more attributes.

## 13.1.5 Using Enumeration Sets

After creating an enumeration set, assign it to an attribute by selecting the enumeration set in the attribute's **Enumeration Set** field (available when the attribute's data type is a numeric type). IDMP will then display the mapped label wherever the attribute value appears — in trend charts, tables, state timelines, and events.
