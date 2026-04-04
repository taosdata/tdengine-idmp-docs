---
title: Integrating with Other Systems
sidebar_label: Integrating with Other Systems
---

import DocCardList from '@theme/DocCardList';

# 15 Integrating with Other Systems

TDengine IDMP is designed as an **open industrial data platform**. Every capability available through the web UI is also accessible programmatically through a well-documented REST API, and the SDK wraps that API in native Java and Python libraries.

## Why Openness Matters in the AI Era

Industrial AI applications — anomaly detection, predictive maintenance, root cause analysis, large language model (LLM) integration — all require reliable, programmatic access to contextualized industrial data. A closed historian that traps data behind proprietary protocols becomes a bottleneck.

TDengine IDMP breaks down that barrier:

- **OpenAPI specification:** The full API is described in a machine-readable OpenAPI spec, enabling automatic SDK generation for any language and seamless integration with AI toolchains.
- **Client SDK (Java & Python):** First-class SDKs for the two most popular languages in data science and industrial automation, so AI pipelines can read elements, time-series metrics, and events with a few lines of code.
- **MCP Interface:** A Model Context Protocol interface that exposes IDMP data and context directly to LLM agents, enabling natural language interaction with industrial data without custom integration work.
- **Embeddable panels and dashboards:** Visualizations can be embedded in any web application via iframe, bringing IDMP insights into existing operator interfaces, portals, or AI dashboards.
- **Webhook notifications:** Event alerts can trigger any external system via standard HTTP callbacks, enabling AI-driven workflows that respond to plant events in real time.

Together these integration points mean that IDMP data can flow freely into AI models, external BI tools, custom applications, and automation pipelines — making IDMP a first-class citizen in modern industrial AI architectures.

## What This Chapter Covers

<table>
<colgroup><col style="width:20em"/><col/></colgroup>
<thead><tr><th>Section</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Client SDK</strong></td><td>Java and Python SDKs for programmatic access to elements, metrics, and events</td></tr>
<tr><td><strong>MCP Interface</strong></td><td>LLM agent integration via the Model Context Protocol <em>(coming soon)</em></td></tr>
<tr><td><strong>Embedding Panels and Dashboards</strong></td><td>Embed IDMP visualizations in external web applications</td></tr>
</tbody>
</table>

<DocCardList />
