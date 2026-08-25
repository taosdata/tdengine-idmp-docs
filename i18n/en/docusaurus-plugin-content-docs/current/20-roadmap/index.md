---
title: Roadmap
sidebar_label: Roadmap
---
# Roadmap

This roadmap outlines the future direction of TDengine IDMP, helping users plan long-term adoption and integration.

Features on the roadmap are grouped by delivery cadence into three categories:

- **Now**: Capabilities currently under development and being delivered in upcoming releases.
- **Next**: Planned directions that will be started after the Now items.
- **Later**: Longer-term strategic directions still being researched and refined.

> This roadmap reflects our current plans and direction. It may evolve based on customer feedback and market changes. Actual release timing and scope are confirmed in the official release notes.

---

## Product Themes

- **AI Capabilities**: Deeply embed AI into every scenario so that it becomes an intelligent assistant for every IDMP user.
- **Advanced Analytics**: Continuously expand analytical capabilities, event analysis, and model capabilities to help users extract deeper business insights from industrial data.
- **Capability Enhancement**: Strengthen data modeling, external data referencing, industrial ontology, data quality, and document knowledge management to make the platform more complete and powerful.
- **User Experience & Enterprise Readiness**: Continuously improve the user experience and strengthen security, compliance, availability, and maintainability to meet the production deployment requirements of medium and large enterprises.

---

## Now

> Capabilities being delivered in upcoming releases, expected to ship in batches from Q3 to Q4 2026.

### AI Capabilities

- **Multi-model registration and intelligent routing**: Register multiple LLMs and route requests by scenario, selecting the model with the best balance of cost and effectiveness.
- **AI Function expansion**: Standardize and extend the AI Function interface so that AI can invoke more system capabilities and iterate on complex in-system tasks through dialog.
- **Copilot expansion**: Extend Copilot assistance to more pages, bringing AI into more front-end workflows.
- **Multi-agent and AI workflows**: Introduce Multi-Agent orchestration and AI workflow composition so that AI can collaborate on complex tasks, with agent scheduling and reasoning recorded.
- **AI-powered personalized pages**: Generate personalized pages for every user quickly through AI.
- **Page-type AI analysis**: List pages provide overview and descriptive analysis, while specific pages provide deep-dive insights.
- **IM channel expansion**: Expand IM channels such as Slack, WhatsApp, and Line, with rich-media interactions.
- **AI observability**: Establish user-level AI observability metrics covering task success rate, latency, per-user cost and token consumption, skill/tool invocation counts, and fallback and rollback rates.
- **AI performance and quality benchmarks**: Establish a benchmark framework to continuously compare latency, cost, and quality across models.
- **AI security controls**: Strengthen filtering and blocking of sensitive words, sensitive documents, and critical data; enforce fine-grained task permissions for agents so that every task runs within its authorization boundary.
- **AI performance and testing**: Optimize AI performance and complete end-to-end functional, stress, and reliability testing.

### Advanced Analytics

- **Event association analysis**: Discover which events frequently co-occur in historical records and quantify the strength of their correlation, providing a foundation for predictive maintenance.
- **Document management and knowledge graph**: Improve classification, permissions, and status management for uploaded documents; integrate a knowledge-graph framework that automatically extracts entities and relationships from documents to build a knowledge graph, supporting more complex and flexible knowledge queries embedded in AI Chat and AI Functions for more accurate AI analysis.
- **Analysis workbench enhancements**: Enrich analysis configuration options, including custom lane ordering and property configuration, draggable and scrollable workbench pages, and copy, save-as, and export capabilities.
- **Cross-panel filtering linkage**: Link filtering across multiple visualization panels so that a selection in one panel drives filtering in others, enabling coordinated drill-down and comparison.
- **KPI in visualization panels**: Bring KPI module metrics into visualization panels to enrich KPI presentation.
- **Downsampling decoupling and performance optimization**: Decouple downsampling from other analysis functions and optimize performance for smooth rendering of large datasets.
- **Batch analysis workbench**: Build a dedicated workbench for batch analysis that incorporates process recipes, batch recipes, and Gantt charts.
- **Model development and management enhancements**: Add more machine-learning algorithms and model import/export to TDmodel; extend clustering from X/Y dimensions to higher dimensions with element-level clustering; and expand anomaly detection from point-level outliers to multivariate, attribute-curve, and element-level anomalies.

### Platform Capabilities

- **Asset modeling rework**: Switch data-modeling upload templates from CSV to Markdown for easier authoring; make element templates optional so that elements can be created without templates; support parallel upload of multiple data files so that complex modeling tasks can be split across teams; streamline UOM management configuration; and significantly improve back-end modeling performance.
- **External data reference management**: Support external databases such as MySQL, PostgreSQL, and InfluxDB; use federated queries to reference time-stamped external data as TSDB virtual-table metrics; convert external relational data into IDMP tag attributes with dynamic updates; enable tag-based querying, filtering, and linked analysis; and allow element limits to dynamically reference continuously changing external data.
- **Event recipes and batch events**: Drawing on ISA-88 and PI Event Recipe concepts, let users define multi-stage, multi-step batch event hierarchies and support bulk import, automatic generation, and flexible analysis of complex batch events.
- **Event tag linkage**: Based on external data referencing, bring external relational data into events as tag information, supporting flexible filtering and linked analysis.
- **Sub-event management enhancements**: Strengthen sub-event management in real-time analysis with nested multi-level sub-events and advanced SQL support.
- **Industrial ontology enhancements**: Strengthen network-relationship management in the industrial ontology by visualizing element relationships as graphs with front-end editing; embed relationship graphs in dashboards as visualization panels and expose richer query interfaces for more targeted AI analysis.
- **Data quality management**: Establish a data-quality monitoring and assessment framework that defines data standards and governance rules, continuously monitoring the data-processing pipeline across six dimensions: completeness, uniqueness, timeliness, validity, accuracy, and consistency; provide real-time visibility into data-collection status, automatically detect and alert on quality issues, and continuously improve data quality through reporting and closed-loop governance.

### User Experience & Enterprise Readiness

- **User experience and usability**: Add quick filtering to all list pages and persist per-user UI configuration in the browser; streamline UOM management, support PDF export for shares, and add WPS support to the Excel Add-in; introduce more panel types and UI components and embed the analysis workbench in the canvas environment.
- **Mail relay server**: Add an IDMP mail relay server for notification and alert delivery in intranet environments.
- **High-availability cluster performance**: Build on existing multi-instance load balancing and failover to further improve HA cluster performance and stability.
- **License management enhancements**: Improve the usability of the TDengine license management module and the security and availability of license services to keep license data safe and reliable.

---

## Next

> Directions planned after the Now items.

### AI Capabilities

- **Deeper autonomous agents**: Explore end-to-end autonomous orchestration and execution of complex business workflows by agents.
- **Industry knowledge accumulation**: Explore turning industry knowledge and best practices into reusable AI capabilities.

### Advanced Analytics

- **Themes and style customization**: Theme selection and finer-grained style customization for panels and dashboards.
- **Third-party chart plugins**: An open plugin mechanism for integrating third-party visualization components.
- **Expanded panel configuration**: Richer configuration options for legends, series, axes, and more.

### Capability Enhancement

- **Deeper data governance**: Building on data quality management, explore capabilities such as data lineage and data catalogs.
- **Broader data ecosystem access**: Continue to expand the forms of external data sources and third-party system integration.

### Enterprise Readiness

- **System observability**: Expose system-level observability metrics for integration into enterprise monitoring stacks.
- **Globalization and additional languages**: Expand language coverage to serve a broader global audience.

---

## Later

> Longer-term strategic directions still being explored.

- **Mobile access**: A mobile client for viewing monitoring, events, and analysis anywhere, anytime.
- **More industrial AI capabilities**: Continue to expand domain-specific AI for process parameter optimization, predictive maintenance, quality root-cause analysis, and more.
- **Broader ecosystem integration**: Deeper interoperability with mainstream industrial software, data platforms, and cloud services.
