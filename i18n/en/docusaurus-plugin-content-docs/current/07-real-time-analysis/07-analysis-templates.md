---
title: Analysis Templates
sidebar_label: Analysis Templates
---

# 7.7 Analysis Templates


An **analysis template** defines a reusable analysis rule — trigger, calculations, and event generation — as part of an [element template](../03-data-modeling/01-elements.md#316-element-templates). When an element is created from the template, all of its analysis templates are automatically instantiated, giving the new element a fully configured set of monitoring rules without any manual setup.

## The Analysis Template Tab

The **Analysis Template** tab on an element template works similarly to the regular Analyses view on an element. It shows a list of defined analysis templates with columns: **Name**, **Trigger Type**, **Stream Name**, **Categories**, **Status**, and **Update Time**.

You can create analysis templates in two ways:

- **AI-assisted:** Describe the analysis in the text box ("Tell me the analysis you want and I'll create it for you") and click **Ask AI**. IDMP also shows **Suggested Questions** to help you get started.
- **Manual:** Click **+ Create New Analysis Manually** in the list to configure the trigger, calculations, and event generation yourself.

The toolbar includes an **On/Off** toggle to enable or disable all analysis templates on the element template at once.

## Substitution Strings

Because an analysis template is shared across many elements, references to element names, attributes, or data sources must use **substitution strings** rather than hardcoded values. IDMP provides a **+** picker at every relevant input field to list the applicable strings. If a custom KEYWORD is defined on the element template, it can also be used in analysis templates to dynamically reference the correct data source for each element.

## Creating an Analysis Template

1. In **Libraries**, open the element template.
2. Click the **Analysis Template** tab.
3. Click **+ Create New Analysis Manually** or use the AI text box to describe the analysis.
4. Configure the analysis — trigger, calculations, event generation — using substitution strings wherever element-specific values are needed.
5. Click **Save**.

See [Creating an Analysis](./02-creating-analysis.md) for full details on each configuration step.

## Instantiation Behavior

When an element is created from an element template:

- Each analysis template is instantiated as a concrete analysis on the new element.
- All substitution strings are resolved to the element's actual name, attributes, and data references.
- The analyses start running according to their configured triggers.

If **Allow Extension** is enabled on the element template, additional custom analyses can be added to individual elements on top of the template-defined ones.
