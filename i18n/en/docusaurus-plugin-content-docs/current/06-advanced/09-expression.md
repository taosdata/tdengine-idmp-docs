---
title: Expressions
description: Introduction to expression types and usage in the system
---

Expressions are important features in the system for complex data processing and unit conversion. They support two main types: **Formula Reference Expressions** and **String Builder Expressions**, primarily used in element data reference attributes, panels, and analyses. This document provides detailed instructions on how to use these two types of expressions.

## Overview

Expressions are used for the following operations during data processing:

- Data calculation and transformation
- Conditional judgment and logical operations
- String processing
- Automatic unit of measure inference and conversion
- Time series data processing

The system provides two different expression types to meet different processing needs.

---

## Formula Reference Expressions

Formula reference expressions are used for numerical calculations, supporting arithmetic operations and non-aggregate functions, with **automatic unit of measure inference and conversion** capabilities.

### Basic Features

- **Numerical Calculation**: Supports arithmetic operations
- **Function Support**: Built-in mathematical, logical, conditional, time, string, type conversion, and other functions
- **Unit Inference**: Automatically infers the unit of measure for calculation results
- **Unit Conversion**: Automatically performs unit of measure conversion
- **Data Reference**: Can reference element attributes, substitution parameters, and other data

### Supported Operators

| Operator Type | Operators | Description |
|---------------|-----------|-------------|
| Arithmetic | `+` `-` `*` `/` `%` | Addition, subtraction, multiplication, division, modulo |
| Comparison | `=` `==` `<>` `!=` `>` `<` `>=` `<=` | Equal, not equal, greater than, less than, etc. |
| Bitwise | `\|` `&` | Bitwise OR, bitwise AND |
| Parentheses | `()` | Change operation priority |

### Supported Function Types

Formula reference expressions support the following built-in function types:

- **Mathematical Functions**: `ABS`, `SQRT`, `POW`, `CEIL`, `FLOOR`, `ROUND`, `SIN`, `COS`, `LOG`, etc.
- **String Functions**: `LENGTH`, `UPPER`, `LOWER`, `CONCAT`, `SUBSTR`, `TRIM`, etc.
- **Conversion Functions**: `CAST`, `TO_CHAR`, `TO_UNIXTIMESTAMP`, `TO_ISO8601`, etc.
- **Time and Date Functions**: `NOW`, `TODAY`, `TIMETRUNCATE`, `TIMEDIFF`, `YEAR`, `MONTH`, etc.
- **Aggregate Functions**: `AVG`, `COUNT`, `SUM`, `SPREAD`, etc.
- **Selection Functions**: `LAST`, `FIRST`, `MAX`, `MIN`, etc.
- **Time Series Specific Functions**: `CSUM`, `DIFF`, `IRATE`, `INTERP`, etc.

:::tip
For a complete list of functions and usage, please refer to [TDengine Function Documentation](https://docs.tdengine.com/tdengine-reference/sql-manual/functions/).
:::

### Automatic Unit of Measure Inference and Conversion

The core feature of formula reference expressions is **automatic unit of measure inference and conversion**. The system can automatically infer the unit of measure for results based on operations and perform unit conversion when necessary.

:::tip
For detailed unit of measure inference, please refer to [Unit of Measure](./05-unit-of-measure.md).
:::

## String Builder Expressions

String builder expressions are used for text processing and transformation, **without unit output**, suitable for scenarios that require generating text results.

### Basic Features

- **Text Processing**: Supports string operations
- **No Unit Output**: Results are plain text without unit inference
- **Flexible Data Concatenation**: Can combine multiple data sources to generate text
- **Conditional Judgment**: Supports conditional logic to generate different text

### Supported Operators and Functions

- **String Functions**: `CONCAT`, `CONCAT_WS`, `UPPER`, `LOWER`, `SUBSTR`, `REPLACE`, `TRIM`, etc.
- **Conditional Functions**: `IF`, `CASE WHEN`
- **Conversion Functions**: `TO_CHAR`, `CAST`, `FORMAT`, `TO_ISO8601`, etc.
- **Mathematical Functions**: `ABS`, `SQRT`, `POW`, `CEIL`, `FLOOR`, `ROUND`, `SIN`, `COS`, `LOG`, etc.

---

## Expression Dialog Operations

The system provides a visual expression editing dialog to help users write and validate expressions.

### Opening the Expression Dialog

The expression dialog can be opened in the following scenarios:

1. **Element Formula or String Builder Attribute Configuration**: In the element attribute editing page, select "Formula" or "String Builder" as the data reference type, then click the "Data Reference Settings" input box.
2. **Panel Configuration**: In the panel's metric and dimension expression configuration, click the expression editing box.
3. **Analysis Configuration**: In the analysis event start and end conditions, pre-filter, and output attribute configuration, click the expression editing box.

### Expression Dialog Description

The expression dialog contains the following main areas:

| Area | Description |
| ------ | ----------- |
| **Attributes** | Displays available attributes in the current context (such as metrics, tags, other attributes, and substitution parameters), which can be clicked to insert into the expression |
| <nobr>**Expression Editor**</nobr> | Used to input and edit expression content, supports attribute highlighting and quick hint insertion |
| **Functions** | Displays available function categories and function names, which can be clicked to insert into the expression |
| <nobr>**Evaluation Result Area**</nobr> | Displays the expression evaluation result or error message; for formula reference expressions, shows the inferred unit of measure |

### Operation Steps

1. **Input Expression**
   - Directly input the expression in the expression input area
   - Or click to select attributes to reference from the attribute list
   - Or click to select functions to use from the function list

2. **Insert Attributes**
   - Find the metric, tag, or substitution parameter to reference in the attribute list
   - Click the attribute name, and the system will automatically insert it at the cursor position in the expression
   - The attribute will be displayed in a highlighted style

3. **Insert Functions**
   - Select a function category in the function list (such as mathematical functions, time functions, etc.)
   - Click the desired function name, and the system will automatically insert the function at the cursor position in the expression

4. **Evaluate Expression**
   - Click the **"Evaluate"** button in the upper right corner of the dialog
   - The system will calculate the expression result and display it in the evaluation result area; for formula reference expressions, it will show the inferred unit of measure
   - If the expression has errors, specific error messages will be displayed

5. **Save Expression**
   - After confirming the expression is correct, click the **"Save"** button
   - The expression will be saved to the corresponding configuration

6. **Switch Expression Type**
   - Click the **Type** icon in the upper right corner of the dialog to switch expression types
   - If currently a formula reference expression, clicking will switch to string builder expression
   - If currently a string builder expression, clicking will switch to formula reference expression

:::tip Automatic Unit of Measure Setting
After clicking the "Evaluate" button, the system will remember the unit of measure of the expression result. If the current attribute has not yet set a UOM class and default unit of measure, when closing the expression editing dialog, the system will automatically set the unit of measure from the last evaluation result as the attribute's default unit of measure, eliminating the need for manual selection.
:::

---

## Common Errors and Solutions

| Error Type | Example | Error Message | Solution |
| ---------- | ------- | ------------- | -------- |
| UOM Conversion Not Supported | <nobr>Voltage + Current</nobr> | `Operator "+" cannot be applied to different UOM classes` | Please modify the expression itself. |
| UOM Class Not Found | <nobr>Voltage * Voltage</nobr> | `UOM class based on base unit combination: *** does not exist in the system. Please contact the administrator to add the corresponding UOM class.` | Please contact the administrator to add the corresponding UOM class. |

---

## Further Reading

- [Basic Data Model](../05-basic/02-data-model.md)
- [Unit of Measure](./05-unit-of-measure.md)
- [Metric Management](./06-composite-metric.md)
- [Data Visualization](../05-basic/05-data-visualization/index.md)
- [TDengine Function Documentation](https://docs.tdengine.com/tdengine-reference/sql-manual/functions/)
