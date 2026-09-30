---
title: RT Analysis Templates
sidebar_label: RT Analysis Templates
---

# 7.7 RT Analysis Templates

An **RT analysis template** defines a reusable RT analysis rule — event generation, trigger, and calculations — as part of an [element template](../03-data-modeling/01-elements.md#316-element-templates). When an element is created from the template, all of its RT analysis templates are automatically instantiated, giving the new element a fully configured set of monitoring rules without any manual setup.

## 7.7.1 The RT Analysis Template Tab

The **RT Analysis Template** tab on an element template works similarly to the regular Analyses view on an element. It shows a list of defined RT analysis templates with columns: **Name**, **Trigger Type**, **Stream Name**, **Categories**, **Status**, and **Update Time**.

You can create RT analysis templates in two ways:

- **AI-assisted:** Describe the RT analysis in the text box (e.g., "calculate hourly max voltage") and press Enter. IDMP also shows **Suggested Questions** for reference.
- **Manual:** Click **+ Create New Analysis Manually** in the list to configure event generation, trigger, and calculations yourself.

The toolbar includes an **On/Off** toggle to enable or disable all RT analysis templates on the element template at once.

## 7.7.2 Substitution Strings

Because an RT analysis template is shared across many elements, references to element names, attributes, or data sources must use **substitution strings** rather than hardcoded values. IDMP provides a **+** picker at every relevant input field to list the applicable strings. If a custom KEYWORD is defined on the element template, it can also be used in RT analysis templates to dynamically reference the correct data source for each element.

## 7.7.3 Creating an RT Analysis Template

The workflow for creating an RT analysis template is essentially the same as creating a regular RT analysis, with the key difference that substitution strings must be used instead of hardcoded element references to ensure the template's portability across different elements. The steps are as follows:

1. In **Libraries**, open the element template.
2. Click the **RT Analysis Template** tab.
3. Click **+ Create New Analysis Manually** or use the AI text box to describe the RT analysis.
4. Configure the RT analysis — event generation, trigger, calculations — using substitution strings wherever element-specific values are needed.
5. Click **Save**.

See [Creating an RT Analysis](./02-creating-analysis.md) for full details on each configuration step.

## 7.7.4 Instantiation Behavior

The core value of RT analysis templates lies in automatic instantiation — when a new element is created from an element template, the system automatically converts the RT analysis rules defined in the template into concrete, runnable RT analyses on that element, without any manual configuration required.

When an element is created from an element template:

- Each RT analysis template is instantiated as a concrete RT analysis on the new element.
- All substitution strings are resolved to the element's actual name, attributes, and data references.
- The RT analyses start running according to their configured triggers.

If **Allow Extension** is enabled on the element template, users can add additional custom RT analyses to individual elements on top of the template-defined ones.
