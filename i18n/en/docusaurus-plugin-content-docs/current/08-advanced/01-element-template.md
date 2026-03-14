---
title: Element Templates
---

In IoT and industrial scenarios, there are often large numbers of devices or logical entities of the same type. To reduce modeling and maintenance workload and to ensure data standardization, TDengine IDMP provides element templates. When creating a new element, you can choose to base it on an existing template. This feature is available under the **Libraries** section in the main menu.

Element templates support inheritance, meaning you can create a new template based on an existing one. For example, you might create a general template for vehicles, then create a template for electric vehicles based on that, and further derive a template for a certain brand of vehicle from the electric vehicle template.

An element template includes templates for all items that an element can contain, namely:

- General element template

- Attribute templates

- Analysis templates

- Panel templates

- Dashboard templates

- Notification template

When you create a new element template, the general element template is created first.

## Placeholder Variables

When you create templates, it is important not to hardcode values like data references, element names, and event names. Instead, you can dynamically generate them based on the actual element being created. TDengine IDMP provides a set of placeholder variables to use in your templates, including but not limited to:

- Template name: `${Template#name}`
- Element name: `${Element#name}`
- Attribute name: `${Attribute#name}`
- Attribute value: `${attributes["AttrName"]#value}`, e.g., `${attributes["DeviceID"]#value}` represents the value of attribute DeviceID
- Start time: `${startTime}`
- End time: `${endTime}`

In any input field, TDengine IDMP will automatically display the valid placeholder variables that can be used in that context, along with readable descriptions.

The placeholders listed above are system-provided, but you can also define custom placeholder keywords within element templates. Each custom placeholder must have a descriptive help message. TDengine IDMP displays this message when the keyword is used so that other users can use the keyword correctly.

## Element Template

To create a element template, hover over **Element Templates** in the sidebar, click the three-dot menu, and select **New Element Template**. You can also click the New Element Template (+) button on the element template page.

The configuration options are described as follows:

1. **Base Template Only:** This template serves only as a base for other templates and cannot be used to create elements.

2. **Allow Extension:** This template allows customization when used, such as adding personalized attributes, analytics, or panels. If this option is not selected, any element created from this template must strictly follow the template definition with extensions allowed.

3. **Element Naming Pattern:** Defines how the name of an element created from this template is automatically generated. You can enter text and click the + button to display a list of system placeholder variables. Click a variable to insert it into the input box. When you later create an element from this template, its name will automatically include the template name.

    Clicking the + button will also show `KEYWORD`, which is a special user-defined placeholder. When you select it, `${KEYWORD1}` is inserted into the input box and you are prompted to enter a description. This description is a help message that appears whenever this placeholder is used.

    If a template includes a `KEYWORD` placeholder, then whenever you use that template to create an element, the system will prompt you to enter a value for that placeholder. These custom `KEYWORD` placeholders can be used throughout the attribute templates, analytics templates, and panel templates of the element, providing maximum flexibility for string construction.

4. You can also enter location information and additional properties for the template.

## Attribute Templates

Once you have created an element template, you can define attribute templates within it. Hover over your element template in the sidebar, click the three-dot menu, and select **Attribute Template**. Click the New Attribute Template (+) icon to create a template.

First, fill in the attribute name, category, data type, unit of measurement, default value, and description fields. Then set the data reference type. If you select **TDengine Tag** or **TDengine Metric**, this attribute maps to a specific column in a table within a TDengine TSDB-Enterprise database. Because templates are reusable, you cannot hardcode table or column names, as that would cause every element created from the template to point to the same location. Instead, you use placeholder variables.

When configuring the data reference, a dialog box is displayed where you choose the database connection and select the database. Then enter the table name pattern and click + to insert or define placeholders. Finally, enter the column name, which can also include placeholder variables. Click **Check** to verify your configuration and Confirm to save it.

## Panel, Analysis, Dashboard, and Notification Rule Templates

After creating the element template and its attribute templates, you can proceed to create panel, analysis, dashboard, and notification rule templates. Hover over your element template in the sidebar, click the three-dot menu, and select the desired template. Click the + icon to create a new template.

The process of creating these templates is identical to creating panels, analyses, dashboards, and notification rules.

## Example Element Template

Suppose we have a TDengine TSDB-Enterprise database `smdb` with a supertable called `smeter`, which contains two metrics, `current` and `voltage`, and a tag column `model`. This supertable has subtables named `smeter-1`, `smeter-2`, and so on. In TDengine IDMP, we want to create an element template called `Smart Meters`, with three attributes: `Current`, `Voltage`, and `Model`, and we want each subtable in the supertable `smeter` to correspond to one element in TDengine IDMP based on the `Smart Meter` template. Also, we want the element naming rule to follow the pattern `DEV-<subtable-name>`.

To achieve this, we use a custom placeholder keyword representing the subtable name. When creating the element template, we  proceed as follows:

1. Click **Create Element Template** and set the name to `Smart Meters`.
2. In the **Element Naming Pattern** field, enter `DEV-`, click the + button, and select `KEYWORD`.
3. In the Description dialog box, enter `Subtable name from smeter supertable in smdb database` and click Confirm. The **Element Naming Pattern** input box now contains `DEV-${KEYWORD1}`.
4. After creating the general element template “Smart Meter”, create its attribute templates. We’ll use `Current` as an example:
   1. Set the attribute name to `Current` and choose a data type consistent with the TSDB, in this case `float`.
   2. Set the data reference type to **TDengine Metric** and click the **Data Reference Expression** field.
   3. Select the connection to TDengine TSDB-Enterprise and choose the `smdb` database.
   4. In the **Table Name Pattern** field, click the + button and select `KEYWORD1`.
   5. In the **Column** field, enter `current`.
   6. Click **Check** and enter the name of an existing subtable. If everything is correct, the validation should pass.

5. Repeat step 2 to create the `Voltage` attribute template.
6. For the `Model` attribute template, set the data reference type to **TDengine Tag**. All other configurations are the same as in step 2.

The element template and its associated attribute templates have been successfully created. When you create a new element based on the `Smart Meters` template, the system displays a prompt asking for `KEYWORD1`, with the input field showing the hint `Subtable name from smeter supertable in smdb database`. If you enter a subtable that exists in TDengine TSDB-Enterprise, such as `smeter-1`, the element is automatically created with the name `DEV-smeter-1`. If you check its three attributes, their data reference configurations are as follows:

- Current: TDengine/smdb/smeter-1/current
- Voltage: TDengine/smdb/smeter-1/voltage
- Model: TDengine/smdb/smeter-1/model

For the **TDengine Metric** data reference type, if the data quality corresponding to the metric also exists in the TSDB database, you can configure the data quality column. For example, if the data quality column for `current` is `quality` in the same table, then after configuring `quality`, the data reference for Current becomes: TDengine/smdb/smeter-1/current:quality

The custom placeholder mechanism provided by TDengine IDMP is highly flexible and powerful, making it easy automatically and efficiently to map data from TDengine TSDB-Enterprise into TDengine IDMP in bulk.
