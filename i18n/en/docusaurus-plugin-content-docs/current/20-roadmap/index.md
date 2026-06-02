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

- **Analytics & Visualization**: Continuously expand chart types, analytical algorithms, and interactivity to help users extract deeper insights from industrial time-series data.
- **Enterprise Ready**: Strengthen security, compliance, availability, and maintainability so that IDMP meets the requirements of large-scale production deployments.
- **Platform Foundations**: Enhance the core capabilities—data modeling, expressions, events, limits, data management—to make the platform more complete and easier to use.
- **AI-Native Experience**: Deeply embed AI into every scenario so that it becomes an intelligent assistant for every IDMP user.

---

## Now

> Capabilities being delivered in upcoming releases.

### Analytics & Visualization

- **More chart types**: Add Candlestick, Heatmap, and Histogram panels. Candlestick is ideal for showing the fluctuation range of a metric, Heatmap intuitively presents the operational status distribution across large fleets of devices, and Histogram helps users understand the statistical distribution of data.
- **Canvas panel enhancements**: Support canvas templating, panel references, and display of the last-updated timestamp. Templating allows standard monitoring views to be quickly replicated across similar devices, significantly reducing repetitive configuration work.
- **Panel and dashboard interaction improvements**: Support drill-up, drill-down, and cross-panel linking, enabling users to progressively dive into analysis along business hierarchies.
- **Excel Add-in enhancements**: Make it easier for users accustomed to Excel-based analysis to access data in IDMP.
- **Profile Search**: Search historical data for time ranges whose curve shape resembles a target pattern, aiding root-cause analysis of abnormal conditions and the consolidation of best-practice process parameters from high-quality batches.
- **Association Analysis**: Discover which events frequently co-occur in historical records and quantify the strength of their correlation, providing a foundation for predictive maintenance.
- **Quality Analysis application**: A unified entry point for quality analysis that integrates SPC monitoring, process capability analysis (Cp/Cpk), batch comparison, and quality factor exploration, so that quality teams can complete the full flow from monitoring and alerting to analysis in a single interface.
- **Model development and management**: Full lifecycle management of industrial analytics models inside the platform—covering development, training, publishing, deployment, monitoring, and retraining. The first release supports five scenarios: time-series forecasting, anomaly detection, clustering, classification, and regression. Process engineers and business analysts can build model applications without writing code.

### Enterprise Ready

- **User and permission management upgrade**: User-group-based permissions, API Key / Token management, password and account policies, and bulk user import to meet the user-management needs of large-scale deployments.
- **Directory integration and single sign-on (SSO)**: Support for LDAP / AD, allowing employees to sign in to IDMP with their existing corporate accounts and eliminating the need to manage separate credentials.
- **Multi-factor authentication (MFA / 2FA)**: Additional identity verification for sign-in and sensitive operations.
- **Audit logs**: Record all key operations, with filtering, querying, and export capabilities to meet compliance and security-traceability requirements.
- **Version control and approval workflow**: Git-based change management for key objects such as element configurations, templates, events, and models, with review and rollback capabilities—meeting the traceability and controllability requirements of regulated industries such as pharmaceuticals, food, and energy.
- **High-availability cluster deployment**: Multi-instance load balancing and automatic failover, ensuring business continuity when a single node fails and improving overall system reliability.
- **System backup and recovery**: Scheduled backups, hot backup, and encrypted storage, enabling rapid restoration of the system to a specified point in time.

### Platform Foundations

- **Limits management**: Centrally manage safety limits and quality specification limits (USL/LSL) for element properties—define once, reference everywhere. When a limit is updated, all related alarm rules, visualization panels, and computed expressions stay consistent automatically, eliminating the inconsistency caused by limits scattered across multiple systems.
- **Cross-element attribute references**: The expression engine can now reference attributes from upstream or downstream elements, enabling more sophisticated cross-device analysis.
- **Complex event processing (sub-events)**: A parent-child hierarchical event model that supports composite events spanning multiple conditions, stages, and devices. Opening any event reveals its complete sub-event composition and timeline, making complex failures easy to understand at a glance.
- **Internal tables**: Manage relational business data directly inside the platform alongside time-series data, avoiding cross-system queries and making analytics and reports more complete.
- **Data import enhancements**: More flexible manual input and CSV upload, simplifying the ingestion of historical and business data.
- **Data collector status monitoring**: Real-time visibility into the health of gateways and devices, enabling prompt detection of data interruptions or collection anomalies and safeguarding data completeness and timeliness.
- **Usage statistics**: Key indicators such as number of users, elements, API calls, and storage consumption to support capacity planning and ROI assessment.

### AI-Native Experience

- **Agent Loop architecture upgrade**: Upgrade the AI architecture to an Agent Loop, significantly improving intent recognition and execution of complex tasks.
- **IDMP CLI**: A command-line interface for scripting and integration with existing operations and data pipelines.
- **IDMP Skills management**: Allow users to manage and extend AI capabilities, tailoring the assistant to their own business scenarios.
- **AI configuration management UI**: Centrally manage AI models, Skills, and prompts, simplifying the operation of AI features.

---

## Next

> Directions planned after the Now items.

### Analytics & Visualization

- **Themes and style customization**: Theme selection and finer-grained style customization for panels and dashboards.
- **Third-party chart plugins**: An open plugin mechanism for integrating third-party visualization components.
- **Expanded panel configuration**: Richer configuration options for legends, series, axes, and more.

### Enterprise Ready

- **System observability**: Expose system-level observability metrics for integration into enterprise monitoring stacks.

### Platform Foundations

- **Data quality monitoring**: Comprehensive data quality monitoring that quantifies completeness, timeliness, and validity.
- **Relational database support**: Extend the internal-table capability to broader management of relational databases.
- **Third-party time-series database integration**: Support additional time-series databases as data sources for IDMP.

### Globalization

- **Additional languages**: Expand language coverage to serve a broader global audience.

---

## Later

> Longer-term strategic directions still being explored.

- **Mobile access**: A mobile client for viewing monitoring, events, and analysis anywhere, anytime.
- **More industrial AI capabilities**: Continue to expand domain-specific AI for process parameter optimization, predictive maintenance, quality root-cause analysis, and more.
- **Broader ecosystem integration**: Deeper interoperability with mainstream industrial software, data platforms, and cloud services.
