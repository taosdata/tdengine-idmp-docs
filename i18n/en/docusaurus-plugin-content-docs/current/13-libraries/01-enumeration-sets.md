---
title: Enumeration Sets
sidebar_label: Enumeration Sets
---

# 13.1 Enumeration Sets


An **enumeration set** maps integer (or other numeric) values to human-readable labels. When an attribute's data type is an integer that represents a discrete state — such as `0 = Stopped`, `1 = Running`, `2 = Fault` — you can assign an enumeration set to the attribute so that IDMP displays the label instead of the raw number.

Enumeration sets are managed under **Libraries → Enumeration Sets**.

## The Enumeration Set List

The list shows all defined enumeration sets with the following columns:

| Column | Description |
|---|---|
| **Name** | Enumeration set name |
| **Value Type** | The numeric data type of the raw values |
| **Description** | Optional description |

Click an enumeration set name to view or edit it. Use the **⋮** menu on a row to edit or delete it.

## Creating an Enumeration Set

Click **+** to create a new enumeration set. Fill in the following fields:

| Field | Description |
|---|---|
| **Name** (required) | A unique name. Accepts letters, numbers, underscores, hyphens, and spaces. |
| **Value Type** | The data type of the raw values. Options: `TinyInt` (default), `SmallInt`, `Int`, `BigInt`, `TinyInt Unsigned`, `SmallInt Unsigned`, `Int Unsigned`, `BigInt Unsigned`, `Float`, `Double`, `Boolean`, `Varchar`, `Nchar`, `Timestamp`. |
| **Description** | Optional description of the enumeration set. |

Then add one or more enumeration values in the **Value** table by clicking **+** in the table:

| Field | Description |
|---|---|
| **Name** (required) | The display label. Accepts letters, numbers, underscores, and hyphens. |
| **Value** (required) | The raw numeric value this label maps to. |
| **Description** | Optional description of this enumeration value. |
| **Parent** | Optional parent enumeration value. Use this to group related values under a common parent for easier filtering and browsing. |

Click **Confirm** to add the value, then **Save** to save the enumeration set.

## Sub-Values (Grouping)

IDMP supports sub-enumeration values: one enumeration value can serve as the parent of others. This is a grouping mechanism — parent values do not represent data themselves, but allow you to organize and filter child values.

**Example:** For a motor state enumeration, you might define a parent value `Abnormal` and group `Fault`, `Overload`, and `Emergency Stop` under it. Users can then filter by `Abnormal` to see all abnormal states at once.

## Editing and Deleting

To edit an enumeration set, click its name in the list. To delete it, use the **⋮** menu on its row. An enumeration set cannot be deleted if it is currently assigned to one or more attributes.

## Using Enumeration Sets

After creating an enumeration set, assign it to an attribute by selecting the enumeration set in the attribute's **Enumeration Set** field (available when the attribute's data type is a numeric type). IDMP will then display the mapped label wherever the attribute value appears — in trend charts, tables, state timelines, and events.
