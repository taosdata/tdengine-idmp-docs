---
title: Categories
sidebar_label: Categories
---

# 13.2 Categories

**Categories** are classification tags that can be applied to objects in IDMP to make them easier to filter, search, and organize. Any element, attribute, event, dashboard, panel, or analysis can be tagged with one or more categories.

Categories are managed under **Libraries → Categories**.

## The Category List

The list shows all defined categories with the following columns:

| Column | Description |
|---|---|
| **Name** | Category name |
| **Description** | Optional description |

Each category also has a **Type** that determines which kind of object it can be applied to. The list is organized by object type. Click a category name to edit it. Use the **⋮** menu on a row to edit or delete it.

## Creating a Category

Click **+** to create a new category. Fill in the following fields:

| Field | Description |
|---|---|
| **Name** (required) | A unique name within its type. Accepts letters, numbers, underscores, hyphens, and spaces. |
| **Type** | The object type this category applies to: `Element`, `Attribute`, `Analysis`, `Dashboard`, `Panel`, or `Event`. |
| **Description** | Optional description. |

Click **Save** to create the category.

## Using Categories

When creating or editing an object (element, attribute, event, panel, dashboard, or analysis), you can assign one or more categories to it in the **Category** field. Categories must match the object type — for example, only categories of type **Element** appear when editing an element.

Once assigned, categories appear as filter options throughout IDMP:

- In the **Explorer**, use the category filter to narrow the asset tree to elements of a specific category.
- In **Dashboards** and **Events** lists, filter by category to find relevant panels or events quickly.
- In **Libraries**, categories help organize large sets of element templates and event templates.

## Editing and Deleting

To edit a category, click its name. To delete it, use the **⋮** menu. Deleting a category does not affect the objects it was assigned to — the category tag is simply removed from those objects.
