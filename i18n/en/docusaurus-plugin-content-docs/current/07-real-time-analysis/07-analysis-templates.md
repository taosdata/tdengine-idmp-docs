---
title: Analysis Templates
sidebar_label: Analysis Templates
---

# 7.7 Analysis Templates

An **analysis template** defines a reusable analysis rule — trigger, calculations, and event generation — as part of an [element template](../03-data-modeling/01-elements.md#316-element-templates). When an element is created from the template, all of its analysis templates are automatically instantiated, giving the new element a fully configured set of monitoring rules without any manual setup.

## 7.7.1 The Analysis Template Tab

The **Analysis Template** tab on an element template works similarly to the regular Analyses view on an element. It shows a list of defined analysis templates with columns: **Name**, **Trigger Type**, **Stream Name**, **Categories**, **Status**, and **Update Time**.

You can create analysis templates in two ways:

- **AI-assisted:** Describe the analysis in the text box (e.g., "calculate hourly max voltage") and press Enter. IDMP also shows **Suggested Questions** for reference.
- **Manual:** Click **+ Create New Analysis Manually** in the list to configure the trigger, calculations, and event generation yourself.

The toolbar includes an **On/Off** toggle to enable or disable all analysis templates on the element template at once.

## 7.7.2 Substitution Strings

Because an analysis template is shared across many elements, references to element names, attributes, or data sources must use **substitution strings** rather than hardcoded values. IDMP provides a **+** picker at every relevant input field to list the applicable strings. If a custom KEYWORD is defined on the element template, it can also be used in analysis templates to dynamically reference the correct data source for each element.

## 7.7.3 Creating an Analysis Template

The workflow for creating an analysis template is essentially the same as creating a regular analysis, with the key difference that substitution strings must be used instead of hardcoded element references to ensure the template's portability across different elements. The steps are as follows:

1. In **Libraries**, open the element template.
2. Click the **Analysis Template** tab.
3. Click **+ Create New Analysis Manually** or use the AI text box to describe the analysis.
4. Configure the analysis — trigger, calculations, event generation — using substitution strings wherever element-specific values are needed.
5. Click **Save**.

See [Creating an Analysis](./02-creating-analysis.md) for full details on each configuration step.

## 7.7.4 Instantiation Behavior

The core value of analysis templates lies in automatic instantiation — when a new element is created from an element template, the system automatically converts the analysis rules defined in the template into concrete, runnable analyses on that element, without any manual configuration required.

When an element is created from an element template:

- Each analysis template is instantiated as a concrete analysis on the new element.
- All substitution strings are resolved to the element's actual name, attributes, and data references.
- The analyses start running according to their configured triggers.

If **Allow Extension** is enabled on the element template, users can add additional custom analyses to individual elements on top of the template-defined ones.
