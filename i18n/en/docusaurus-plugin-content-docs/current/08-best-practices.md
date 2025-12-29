---
title: Best Practices
---

IDMP offers powerful data modeling capabilities to standardize and contextualize data, enabling more effective use of AI technologies to extract business value. However, data modeling itself is inherently complex and challenging for AI to fully automate.

To minimize modeling costs, TDengine recommends performing foundational data governance at the data source. Here are a few best practices:

1. Use consistent and standardized naming conventions for all data points across the system.
2. For physical quantities collected simultaneously (sharing timestamps), adopt a multi-column model whenever possible.
3. For every data collection point—whether single- or multi-column—define a clear hierarchical structure and send it as metadata to TDengine TSDB-Enterprise. For example: `Factory-1.Line-A.Equipment-X`.

The taosX module in TDengine TSDB-Enterprise can automatically create supertables and subtables when reading collected data, perform data transformation, and add additional tags to preserve hierarchical equipment structure information. Based on this metadata in TSDB, IDMP can automatically build tree-structured hierarchies and create corresponding element templates and elements.

For data collected from PLCs, which typically follow a single-column model, and where a single device may have multiple data points, assembling these data points under one device must be done within IDMP. You can refer to [TDengine TSDB-Enterprise Asset Model](/operation/data-import-export#tdengine-tsdb-enterprise-asset-model) for details on how to configure this.

Once the tree-structured hierarchy is built in IDMP, you can further enrich it with additional descriptions and business semantics via element templates and attributes. This enhances data contextualization, making the entire data platform AI-Ready, and unlocking the full potential of AI.
