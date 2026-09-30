---
title: Best Practices
sidebar_label: Best Practices
---

# 16 Best Practices

import DocCardList from '@theme/DocCardList';

IDMP provides powerful data modeling capabilities that standardize and contextualize industrial data, making it AI-ready and enabling deeper extraction of business value. However, building a good data model is something that requires careful human judgment — it is difficult to automate with AI alone.

To minimize the cost and effort of modeling, TDengine recommends starting with solid data governance at the source. A few key guidelines:

1. **Use consistent, standardized names for every measurement point** — naming conventions should be globally uniform across all data sources.
2. **Prefer multi-column models for simultaneously sampled physical quantities** — since they share a timestamp, grouping them into a single row reduces storage overhead and simplifies queries.
3. **Configure a hierarchical structure for each data collection point** — whether single-column or multi-column, attach the hierarchy as metadata when writing to TDengine TSDB-Enterprise. For example: `Plant-1.Line-A.Device-X`.

The taosX module inside TDengine TSDB-Enterprise can read this metadata and automatically create supertables and subtables, perform data transformations, and attach additional tags to preserve the device hierarchy. IDMP can then use that metadata to automatically build the element tree and generate element templates and element instances.

For PLC-collected data using a single-column model, where a single device has multiple measurement points, you need to assemble those points under one element inside IDMP. Refer to the [Building Data Models from TSDB](../12-data-ingestion/03-building-data-models-from-tsdb.md) section for guidance.

Once the hierarchical element model is established in IDMP, you can enrich it further with element and attribute templates — adding descriptions, units, and business semantics — to provide richer data context and make the entire platform AI-ready.

<DocCardList />
