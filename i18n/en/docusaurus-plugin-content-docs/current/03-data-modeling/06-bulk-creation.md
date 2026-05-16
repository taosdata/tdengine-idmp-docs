---
title: Bulk Creation of Elements and Attributes
sidebar_label: Bulk Creation of Elements and Attributes
---

# 3.6 Bulk Creation of Elements and Attributes

Bulk creation of elements and attributes is a practical concern for many users. Real-world scenarios involve thousands or even tens of thousands of elements and attributes — it is simply not feasible to create them one by one by hand.

TDengine IDMP has multiple **bulk modeling** capabilities built in. It can **automatically** generate element templates, element instances, and attributes from a TDengine TSDB schema, a CSV file, or an OPC structure — so that a trial environment has a working model "the moment it is installed", and a production deployment is compressed from "weeks of manual configuration" to "minutes of automatic construction".

## 3.6.1 Scenarios Suitable for Bulk Modeling

If you are in any of the following situations, you can start with bulk modeling to build the skeleton of the data model, then refine and adjust it locally:

- You are already storing time-series data in **TDengine TSDB** — you can reverse-generate the model directly from the existing supertables, child tables, and tag structure;
- You have a **tag system** organized under some naming convention (paths like `Plant.Line1.Machine3`) that can be mapped directly into an asset tree;
- The number of assets and supertables is large, and you want to centrally manage the mapping rules in a **CSV / spreadsheet**;
- The data comes from an **OPC server** and has been ingested into TDengine TSDB via OPC-UA / OPC-DA, and you want to preserve the original OPC node structure when modeling.

## 3.6.2 Bulk Modeling Methods in IDMP

On the TDengine connection details page under **Admin → Connections → \[connection name\]**, IDMP provides the following four independent bulk-modeling methods that can be used as needed:

| Method                              | Suitable Scenario                                                                                                                                                                |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Simple Import**                   | The asset hierarchy is already encoded in a supertable tag (e.g. `location = Plant.Line1.Machine3`), and you want a one-click generation of the full element template + element + attribute set |
| **Map Supertables to Elements**     | Tags don't carry a hierarchy, or the model is "one supertable per measurement", and multiple supertables need to be combined under the same element template                    |
| **Import from CSV**                 | Centrally configure a large number of supertable / attribute mappings through a spreadsheet — well suited for bulk go-live and team collaboration                                |
| **Import from OPC**                 | Reverse-build the asset model from OPC-structured data already stored in TDengine TSDB, preserving the original OPC node path structure                                          |

All four methods share these common characteristics:

- **Auto-creates templates + elements + attributes**: a single configuration generates element templates, element instances, and attributes, and binds the attributes to the correct TDengine metric columns or tags;
- **Automatic synchronization**: after the import task runs, IDMP keeps watching TSDB metadata changes, and **new child tables** added to a configured supertable are automatically synced as new elements, with no manual intervention;
- **Repeatable configuration**: supports Rebuild and remapping, making it easy to keep tuning the model during iteration.

## 3.6.3 Refining the Data Model

After bulk modeling, users can continue to refine and locally adjust the data model:

1. Fill in **units, high / low limits, target values, categories, descriptions**, and other contextual information for elements and attributes (see [3.3 Data Contextualization](./03-data-contextualization.md));
2. Establish the necessary **element references** (see [3.5 Relationships and Industrial Ontology](./05-relationships-and-ontology.md)) — for example, weakly referencing a shared measurement point under multiple process stages;
3. Define **analyses, panels, dashboards, and notification rules** uniformly at the element-template level, so that every asset of the same kind gets standardized visualization and monitoring in one shot.

For the complete bulk-modeling reference — including the field descriptions, expression syntax, typical examples, and advanced usage of each method — see **[12.3 Building Data Models from TDengine TSDB](../12-data-ingestion/03-building-data-models-from-tsdb.md)**.
