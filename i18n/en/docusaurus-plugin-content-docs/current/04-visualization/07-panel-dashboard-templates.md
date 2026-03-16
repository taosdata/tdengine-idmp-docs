---
title: Panel and Dashboard Templates
sidebar_label: Panel and Dashboard Templates
---

Panel templates and dashboard templates are sub-templates within an [element template](../03-data-modeling/01-elements.md#element-templates). They define the standard visualizations that are automatically created for every element of a given asset class — so that when an element is instantiated from the template, its panels and dashboards are ready to use without any manual configuration.

## Panel Templates

The **Panel Template** tab on an element template works identically to the regular Panels view on an element. It supports both AI-assisted and manual panel creation:

- Use the **Ask AI** text box ("Tell me what panel you want and I'll build it for you") to describe a panel in natural language and have AI generate it.
- Click **+ New Panel Template** to create a panel manually, selecting the panel type and configuring its data sources.

Because a panel template is shared across many elements, any reference to element-specific data must use substitution strings such as `${Element#name}` or `${Attribute#name}`. IDMP provides a **+** picker at every relevant input field to help you select the correct substitution string.

When an element is created from the template, all panel templates are automatically instantiated with substitution strings resolved to the element's actual name and attributes.

## Dashboard Templates

The **Dashboard Template** tab shows a list of dashboard templates (columns: **Name**, **Categories**). Click **+ New Dashboard Template** to create a dashboard layout that will be automatically associated with each element created from this template.

## Relationship to Standalone Panels and Dashboards

Panel templates and dashboard templates defined inside an element template are distinct from standalone panels and dashboards created directly on a specific element. Template-based visualizations are instantiated automatically across all elements of the asset class and kept consistent at the template level.

If **Allow Extension** is enabled on the element template, individual elements can have additional panels and dashboards added on top of those defined in the template.
