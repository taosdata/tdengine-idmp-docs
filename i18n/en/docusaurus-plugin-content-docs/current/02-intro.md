---
title: Introduction to TDengine IDMP
---

## What Is TDengine IDMP?

TDengine IDMP is an AI-native IoT and industrial data management system. It organizes sensor and device-collected data using a classic tree hierarchy, builds a data catalog, and provides data contextualization and standardization. In addition, it offers real-time analytics, visualization, event management, and alerting capabilities, all aimed at helping enterprises quickly and efficiently extract business value from operational data.

TDengine IDMP leverages AI technology to intelligently perceive application scenarios based on collected data. Without prompting, it automatically generates the real-time analyses and visualizations needed for those scenarios. This dramatically lowers the barrier to use, reduces dependence on data analysts and IT engineers, and enables business users to gain insights more efficiently. This capability makes TDengine IDMP a truly AI-native system for IoT and industrial data management.

## Main Features

### TDengine IDMP Features

1. **Data Modeling:** IDMP manages data using a classic tree-structured hierarchy. Each node in the tree represents a sensor, device, production line, factory, or logical entity. These nodes are referred to as elements in IDMP. Each element has its own attributes, real-time analytics, visualization dashboards, events, and more.
2. **Contextualization:** IDMP allows configuration of descriptive information, categories, locations, physical units, and threshold values for each node and its associated attributes, analytics, dashboards, and alerts. This enriches the data with context and business semantics, enabling meaningful data interpretation.
3. **Standardization:** Through templates for elements, attributes, analytics, dashboards, and events—along with data mapping, calculation expressions, and automatic unit conversions—IDMP provides powerful data standardization. This allows heterogeneous data from multiple sources to be unified and used consistently.
4. **Data Visualization:** IDMP comes with a built-in Grafana-style visualization module that offers dashboards and panels for data display. Supported visualization types include trend charts, bar charts, pie charts, gauges, statistical values, rich text, and tables. Additional types such as scatter plots, maps, SCADA-style displays, and heatmaps will be supported in the future.
5. **Real-Time Analytics:** Powered by TDengine’s stream processing capabilities, IDMP supports real-time analytics. Trigger types include sliding windows, scheduled windows, event windows, state windows, and count windows. Calculations can be simple expressions or aggregations over time windows or across devices.
6. **Event Management:** Real-time analytics can trigger events, and based on severity and configuration, IDMP immediately notifies the relevant personnel. Events can be acknowledged or escalated. Users can easily view the trend of relevant attributes at the time of the event to help analyze root causes.
7. **Insight Pushed by AI:** Leveraging AI large models, TDengine IDMP intelligently perceives business scenarios based on collected data and proactively recommends the necessary dashboards and real-time analytics without prompting. This allows users to gain business insights without deep domain knowledge or IT skills.
8. **Chat BI:** For users with strong business knowledge, IDMP allows them to actively request the system to automatically generate the required visual dashboards and real-time analytics. Users can also ask any question related to the system’s data. No IT skills are needed, enabling business personnel to gain insights at any time.
9. **Enterprise-Grade Services:** IDMP supports role-based access control, single sign-on (SSO), data import/export, backup, and other essential features for enterprise operations.

### Notes

1. TDengine IDMP does not store any time-series data internally. It fully relies on external sources such as TDengine TSDB-Enterprise or other databases. However, to support data dictionaries and some metadata queries, IDMP maintains its own two-dimensional tables and can also dynamically retrieve them from external relational databases.
2. TDengine IDMP is a data management platform, designed to help users gain insights into system operations. It is not a full-fledged IoT or Industrial Internet platform—therefore, it does not offer features such as command dispatching, device connection management, or firmware updates. However, it can integrate seamlessly with industrial internet platforms.
3. TDengine IDMP does not include personnel management, shift scheduling, or maintenance work order features typically needed for enterprise management. However, it supports seamless integration with such systems through SDKs or by directly accessing their databases for metadata.

## Application Scenarios

TDengine IDMP can be widely applied across IoT, industrial, and other domains, including:

1. **Industrial Process Monitoring and Optimization**

   - Manufacturing: Real-time monitoring of production line equipment status (e.g., temperature, pressure, vibration), optimizing production efficiency and reducing downtime.

   - Chemical / Petrochemical: Tracking real-time data from reactors, pipelines, and storage tanks to ensure process safety and energy efficiency.

   - Power and Energy: Managing the real-time performance of generator units, grid loads, and renewable energy sources such as wind and solar power.

2. **Equipment Health and Predictive Maintenance**

   - Predict equipment failures by analyzing sensor data (e.g., vibration, current, temperature), preventing unexpected downtime.

   - Lifecycle management of critical assets in industries such as aviation, power generation, and rail transportation.

3. **Energy Management and Sustainability**

   - Monitor consumption of resources such as water, electricity, and gas in real time to identify energy-saving opportunities (e.g., building energy efficiency, factory carbon footprint).

   - Support carbon emission tracking to help enterprises achieve their ESG goals.

4. **Infrastructure and Smart Cities**

   - Utilities: Real-time monitoring of water, gas, and electricity networks; pipeline leak detection.

   - Smart Buildings: Real-time data integration for building automation systems (HVAC, lighting, etc.).

   - Transportation Infrastructure: Real-time monitoring and maintenance of tunnels, bridges, high-speed rail, subways, airports, and other critical facilities.

5. **Life Sciences and Pharmaceuticals**

   - Monitoring of biopharmaceutical production processes, such as fermentation, cell culture, purification, and downstream workflows.

   - Batch production monitoring under strict regulatory environments (e.g., GMP) to ensure manufacturing parameters meet compliance standards.

6. **Data Centers and IT Operations**

   - Real-time performance monitoring of servers and network devices (CPU, memory, bandwidth), enabling optimized resource allocation.

   - Environmental and energy monitoring within data centers.

   - Real-time performance monitoring of various internet services.

TDengine IDMP serves a wide range of industries including smart manufacturing, power generation, electric grids, oil and petrochemicals, automotive, mining, renewable energy, pharmaceuticals, and IT infrastructure.

## Relationship with TDengine TSDB-Enterprise

TDengine TSDB-Enterprise is a high-performance, horizontally scalable time-series database. While it supports up to 128 tags, it does not fully handle the diverse types of metadata required in enterprise operations, such as units of measurement, upper and lower limits, or target values of specific time-series columns.

TDengine IDMP serves as a complement to TDengine TSDB-Enterprise. It enhances metadata management and provides data standardization and contextualization capabilities, transforming the data platform into an AI-ready system with Chat BI and insights pushed by AI. It also brings TDengine’s powerful stream processing capabilities to life through an intuitive user interface, acting as an application layer built on top of the TSDB.

## Comparison with Similar Products

In terms of functionality, TDengine IDMP is comparable to the combination of PI Asset Framework and PI Vision in the PI System. The combination of TDengine TSDB-Enterprise + TDengine IDMP is equivalent to the full PI System, including PI Interface, PI Data Archive, PI Asset Framework, and PI Vision. We refer to the combination of TDengine TSDB-Enterprise and TDengine IDMP simply as TDengine.

Many real-time data platforms on the market are positioned as alternatives to the PI System. Compared with the PI System and other real-time databases, TDengine offers the following advantages:

1. Real-time analyses, dashboards, and panels generated by AI.
2. Exceptional horizontal scalability, supporting over 1 billion data points.
3. Openness and interoperability, with support for JDBC, ODBC, REST API, and seamless integration with a wide range of third-party software.
4. Data subscription enabling data to not only stream in but also flow out in real time, preventing vendor lock-in.
5. Flexible deployment options, including containers, virtual machines, physical servers, and private cloud environments.

Compared with general-purpose data management platforms, TDengine offers the following advantages:

1. It is an AI-ready data platform with Chat BI and insights pushed by AI.
2. By fully leveraging the characteristics of time-series data, it delivers write and query performance over 10 times higher than general-purpose platforms.
3. Its unique "one table per device" design achieves data compression rates 10 times better than traditional solutions.
4. It provides an end-to-end solution from data collection, cleaning, and governance to storage, analysis, real-time processing, visualization, and event management.
5. It Supports no-code configuration-based data ingestion directly from industrial gateways.
