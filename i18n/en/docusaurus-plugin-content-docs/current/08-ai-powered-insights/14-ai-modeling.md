---
title: AI Asset Modeling
sidebar_label: AI Asset Modeling
---

# 8.14 AI Asset Modeling

AI Asset Modeling lets the AI assistant build an element tree (process area → equipment → sub-part → points) under a parent element from a DCS/SCADA screenshot or a supplied asset hierarchy draft. When a TDengine data connection is available, the assistant also binds the new attributes to real table columns so they show live values.

The feature fits sites whose process structure exists only on SCADA screens and whose historians expose a flat OPC point list: the screen supplies the equipment ownership and instrument placement that point names do not carry. The assistant extracts the hierarchy and points, matches each point to a TDengine column, and creates the tree in one confirmed write.

## 8.14.1 When to Use

AI Asset Modeling is intended for the following tasks:

- Building an asset hierarchy from a SCADA screen when only a flat OPC point list is available.
- Binding instrument points from a screen to TDengine supertable or child-table columns.
- Validating and creating a supplied asset hierarchy draft in bulk.

Do not use it for the following tasks:

- Editing, moving, renaming, or deleting existing elements or attributes.
- Converting an Excel/CSV point table into an importable MD file; that is a data-ingestion task.
- Creating dashboards, panels, analyses, or element templates.

## 8.14.2 Prerequisites

Confirm the following conditions before starting:

- A working [AI connection](./01-connecting-to-llm.md) is configured and the AI service is available.
- The parent element of the new tree is known: select it in the Element Browser or provide its exact name and ID in the request.
- For live values, at least one TDengine data connection exists, and the target database, tables, and columns are visible to the current user.

:::note
AI Asset Modeling creates free elements only. It does not create or apply element templates; template suggestions in the draft are advisory hints for later manual work.
:::

## 8.14.3 Steps

Create an asset tree as follows:

1. Select the parent element in the Element Browser, or note its name and ID.
2. Open the AI assistant, upload a DCS/SCADA screenshot (PNG or JPEG), or paste an asset hierarchy draft.
3. Describe the task, for example "build the asset tree from this screenshot under the 1152 Synthesis Reaction Area". Include the parent element name or ID in the request.
4. The assistant reads the screen or draft, validates the hierarchy with a read-only check, and presents a draft summary:
   - the number of process areas, equipment, and sub-parts;
   - the number of attributes (points) and the point coverage;
   - the number of bound and unbound points, with reasons;
   - resolved units and warnings for units that could not be resolved.
5. Review the summary. Request changes to the hierarchy, names, or bindings before confirming.
6. Approve the confirmation card.
7. When creation finishes, the assistant returns the root element ID, the element and attribute counts, and the binding results. The new elements can be viewed and edited in the element tree like any other element.

## 8.14.4 Point Extraction Rules

The assistant sweeps the screen by region and extracts every legible point, not a sample:

- Point tables are read row by row and column by column; each tag becomes an attribute.
- Analyzer boxes produce one attribute per gas or component row.
- Line-mounted instruments and controller outputs are extracted separately.
- Only tags and units visible on the screen are used; obscured or illegible content is not guessed.
- Each point is attached to the equipment or sub-part it is drawn next to.

The screen may use Chinese, English, or mixed text; tags and units are preserved as printed.

## 8.14.5 Data Binding

When a TDengine connection exists, the assistant binds attributes to table columns with the following rules:

1. **Resolve the connection**: list the TDengine connections visible to the user. Use the connection the user names; otherwise use the only TDengine connection, or match the table structure when several connections exist.
2. **Read the schema**: read databases, tables, and columns in three bounded levels, including column name, data type, and whether the column is a tag.
3. **Match tags**: normalize the screen tag and the column name before comparing, ignoring `-`, `_`, `.`, and spaces. For example, `1152-TI-0070`, `1152_TI_0070`, and `1152TI0070` are the same point.
4. **Bind only unique matches**: a binding is written only when exactly one column matches. Ambiguous or missing matches stay metadata-only and are reported as unbound.
5. **Bind to a child table**: a TDengine virtual table can reference a normal table, a child table, or another virtual table, so the binding targets a child table of the matched supertable, never the supertable itself.
6. **Align the type**: the attribute value type follows the column type; a `Float` column takes a `Float` attribute.
7. **Reference type**: measurement columns use `TDengineMetric`; tag columns use `TDengineTag`.
8. **Resolve units**: resolve the unit abbreviation or name from the unit library, for example `℃`, `MPa`, `m³/h`, or `Nm³/h`. A unit that is not in the library is reported, and the attribute keeps an empty unit.

A successfully bound attribute shows live values. A wrong binding reads the wrong time series, so the assistant binds only unique matches; unbound points need manual confirmation before binding.

## 8.14.6 Limits

AI Asset Modeling applies the following limits:

| Item | Limit or behavior |
|---|---|
| Elements per request | At most 200 elements |
| Attributes per request | At most 2000 attributes |
| Maximum depth | 6 levels |
| Confirmation | The write requires one approval on the confirmation card |
| Partial failure | The created element IDs are returned; the same draft is not retried automatically |
| Templates | Template suggestions are recorded only; no element templates are created or applied |
| Other resources | No dashboards, panels, analyses, or alerts are created |

:::warning
Small tags on a screenshot are easy to misread. Use a screenshot at its original resolution. When a default vision model is configured, the system splits the screenshot into overlapping high-resolution tiles before parsing to improve small-text recognition. Always verify the extracted tags in the draft summary.
:::

## 8.14.7 Example

The following example uses a screenshot of the 1152 synthesis reaction and heat recovery area:

1. Send the request and upload the screenshot under the `Thionyl Chloride Plant` element.
2. The assistant extracts the area, equipment, and points, then shows a summary such as 3 elements, 5 attributes, and all 5 points matched to columns.
3. After approval, the following hierarchy is created:

```text
SCADA modeling example
└── 1152-R0001_Synthesis Reactor
│   ├── TI-0070 (catalyst bed temperature, ℃)
│   ├── PI-0003 (outlet pressure, MPa)
│   └── FI-0001 (feed flow, Nm³/h)
└── 1152-E0001_Heat Exchanger
    ├── TI-0101 (outlet temperature, ℃)
    └── PI-0102 (shell pressure, MPa)
```

4. Open an attribute to see its binding. For example, `TI-0070` is bound to `idmp_sample_utility.1152r0001_0.ti_0070`.

## 8.14.8 FAQ

**An attribute was created but shows no live value.** The point is unbound, or its binding was not verified. Check the unbound list in the creation result, confirm the connection, table, and column, and bind it again.

**The unit is empty.** The unit library does not contain that unit. Add the unit in the Libraries page or use an equivalent unit already in the library.

**Some elements or attributes were not created.** The tree is written in one pass; on a partial failure the assistant returns the IDs that were created. Correct the draft and start one new creation; do not resubmit the same draft.

**Can the generated hierarchy be edited?** Yes. Created elements and attributes behave like manually created objects and can be edited in the element tree.

**Can a dashboard be created from the screenshot?** No. Screenshot-based modeling creates the asset tree only; dashboard creation is a separate workflow.
