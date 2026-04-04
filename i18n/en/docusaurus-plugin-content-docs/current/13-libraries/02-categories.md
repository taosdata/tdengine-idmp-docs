---
title: Categories
sidebar_label: Categories
---

# 13.2 Categories

**Categories** are classification tags that can be applied to objects in IDMP to make them easier to filter, search, and organize. Any element, attribute, event, dashboard, panel, or analysis can be tagged with one or more categories.

Categories are managed under **Libraries → Categories**.

## 13.2.1 The Category List

The list shows all defined categories with the following columns:

<table>
<colgroup><col style="width:9em"/><col/></colgroup>
<thead><tr><th>Column</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>Category name</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description</td></tr>
</tbody>
</table>

Each category also has a **Type** that determines which kind of object it can be applied to. The list is organized by object type. Click a category name to edit it. Use the **⋮** menu on a row to edit or delete it.

## 13.2.2 Creating a Category

Click **+** to create a new category. Fill in the following fields:

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong> (required)</td><td>A unique name within its type. Accepts letters, numbers, underscores, hyphens, and spaces.</td></tr>
<tr><td><strong>Type</strong> (required)</td><td>The object type this category applies to: <code>Element</code>, <code>Attribute</code>, <code>Analysis</code>, <code>Dashboard</code>, <code>Panel</code>, or <code>Event</code>.</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description.</td></tr>
</tbody>
</table>

Click **Save** to create the category.

## 13.2.3 Using Categories

When creating or editing an object (element, attribute, event, panel, dashboard, or analysis), you can assign one or more categories to it in the **Category** field. Categories must match the object type — for example, only categories of type **Element** appear when editing an element.

Once assigned, categories appear as filter options throughout IDMP:

- In the **Explorer**, use the category filter to narrow the asset tree to elements of a specific category.
- In **Dashboards** and **Events** lists, filter by category to find relevant panels or events quickly.
- In **Libraries**, categories help organize large sets of element templates and event templates.

## 13.2.4 Editing and Deleting

To edit a category, click its name. To delete it, use the **⋮** menu. Deleting a category does not affect the objects it was assigned to — the category tag is simply removed from those objects.
