---
title: Glossary
sidebar_label: Glossary
---


## Attribute

A property of an element. Attributes represent individual data dimensions of an asset — temperature, operating state, power output, rated capacity, and so on. An attribute can be a static configuration value stored in IDMP, a dynamic value linked to a live time series in TSDB, or a derived value computed by a real-time analysis. Every dynamic attribute carries metadata: engineering unit, display unit, decimal precision, and upper and lower limits.

## BI

Business Intelligence. A category of software and practices for collecting, integrating, analyzing, and presenting business data to support decision-making. BI tools — such as Tableau, Power BI, and Grafana — connect to data sources and render dashboards, reports, and ad-hoc queries for business and operational users. TDengine IDMP can serve as a data source for BI tools through its REST API and JDBC/ODBC interfaces, allowing industrial time-series data and asset context to flow into existing enterprise BI environments.

## Chat BI

A conversational interface within TDengine IDMP that allows users to query industrial data and generate visualizations using natural language, without writing queries or configuring panels manually. Powered by an LLM that understands the element model and attribute context, Chat BI translates questions like "Show me the average temperature of Boiler 3 over the last 7 days" into charts and analysis results in real time. It makes operational data accessible to users without technical data skills.

## Contextual Data

The metadata that gives raw time-series values meaning. Contextual data answers: What is being measured? Where? Under what conditions? In IDMP, contextual data is attached to elements and their attributes. It includes descriptive information, physical dimensions (unit, precision, limits), and classification tags. Contextual data is the foundation that enables AI features — the system uses it to understand the operational scenario and generate relevant analyses and insights.

## Dashboard

A collection of panels organized into a single view. Dashboards provide a coherent operational picture of an element or group of elements. Each element can have multiple dashboards for different purposes and audiences — real-time monitoring for operators, root-cause analysis for engineers, KPI review for managers. Dashboards can be created manually or generated automatically by the AI engine, and can be shared, scheduled as reports, or embedded in external applications.

## Data Fabric

An architectural approach that provides a unified, integrated layer for accessing, managing, and governing data across heterogeneous sources and environments — on-premises, cloud, and edge — without requiring data to be physically moved into a central store. A data fabric uses metadata, data cataloging, and intelligent integration services to make data discoverable and accessible wherever it resides. TDengine IDMP contributes to a data fabric strategy by serving as the authoritative source of industrial time-series data and asset context, exposing that data through open APIs and data subscription so it can be seamlessly consumed by other fabric components.

## Data Historian

A software system purpose-built for collecting, storing, and retrieving time-series data from industrial processes. Historians sit between field-level systems (PLCs, SCADA, DCS) and higher-level analytics or reporting tools, providing a long-term record of operational data. The most widely deployed historian is the AVEVA PI System. TDengine Historian — combining TDengine TSDB for storage and TDengine IDMP for asset modeling and analytics — is a modern replacement for traditional historians, adding AI-native capabilities, open interfaces, and significantly higher scale at lower cost.

## Data Lake

A storage architecture that retains large volumes of raw data in its native format — structured, semi-structured, and unstructured — until it is needed for analysis. Unlike a data warehouse, a data lake imposes no schema at write time. In industrial contexts, data lakes are often used to archive historical sensor data, event logs, and equipment records for long-term analytics, machine learning training, and compliance. TDengine IDMP can feed data into a data lake through its data subscription and API interfaces, enabling downstream AI and analytics workloads to operate on enriched, contextualized industrial data.

## Data Subscription

A TDengine TSDB capability that allows external applications to subscribe to a stream of newly written time-series data in real time, without polling. Subscribers receive each new data point as it arrives, enabling downstream systems — AI pipelines, BI tools, data lakes, or other databases — to consume live industrial data continuously. Data subscription is one of the primary mechanisms through which TDengine supports an open, bidirectional data flow rather than acting as a closed storage silo.

## Data Warehouse

A centralized repository that stores structured, processed data optimized for reporting and analytical queries. Unlike a data lake, a data warehouse enforces a schema and is typically populated by ETL (extract, transform, load) pipelines that clean and aggregate data from operational systems. Industrial data warehouses often aggregate production KPIs, shift summaries, and quality metrics for business reporting. TDengine IDMP complements a data warehouse by providing the real-time, high-resolution operational layer — the warehouse holds aggregated history for business reporting, while IDMP holds the full-resolution time-series context for operational analysis.

## DCS

Distributed Control System. A process control architecture in which control functions are distributed across multiple controllers located throughout a facility, rather than centralized in a single unit. DCS systems are common in continuous process industries such as oil refining, chemical plants, and power generation. They manage closed-loop control — maintaining temperatures, pressures, and flow rates within set ranges — and generate large volumes of time-series data that industrial historians and platforms like TDengine IDMP consume for monitoring and analysis.

## Element

The fundamental unit of the IDMP asset model. An element represents any physical or logical entity whose data you want to organize and track — a sensor, a motor, a production line, a plant, or a business unit. Elements are arranged in a tree hierarchy that mirrors the real-world structure of the operation. Each element carries its own attributes, analyses, panels, and dashboards, and serves as the organizational anchor for everything in the system. Also referred to as an asset.

## ERP

Enterprise Resource Planning. A class of business management software that integrates core business processes — procurement, production planning, inventory, finance, human resources, and sales — into a single system. In industrial environments, ERP systems operate at the business layer above the shop floor. They are a common integration target for TDengine IDMP: production data, equipment KPIs, and quality metrics captured in IDMP can feed into ERP systems to support production reporting, cost accounting, and supply chain decisions.

## Event

A discrete operational occurrence with a defined start time, end time, duration, severity level, and associated data captured at the time it occurred. Events are generated by real-time analyses when a condition is detected — a threshold breach, a process deviation, the start or end of a production batch. Events can require acknowledgment and trigger notifications. They convert continuous sensor streams into named, structured operational episodes that both engineers and AI systems can reason about. Equivalent to an Event Frame in the AVEVA PI System.

## IDMP

Industrial Data Management Platform. TDengine IDMP is the data semantics and intelligence layer of the TDengine platform. It sits on top of TDengine TSDB and provides industrial asset modeling, data contextualization, visualization, event management, real-time analytics, and AI-powered insights. IDMP does not store time-series data itself — it reads from TSDB and stores only the structural and contextual information: the element tree, attribute definitions, metadata, templates, event records, and analysis configurations.

## Insight

An AI-generated analytical output produced from the data and context of an element. The IDMP insight engine can automatically detect the operational scenario of an element, generate relevant panels and analyses, answer natural language questions, detect anomalies, produce forecasts, impute missing values, and perform root-cause analysis — without requiring manual configuration.

## LLM

Large Language Model. A type of AI model trained on large volumes of text that can understand and generate natural language. In the context of TDengine IDMP, LLMs power the conversational and generative AI features: natural language queries over industrial data, AI-generated dashboards and analyses, root-cause explanation, and anomaly narrative generation. LLMs work best on industrial data when that data is well-contextualized — which is precisely what IDMP's asset model and metadata layer provide.

## Machine Learning

A branch of artificial intelligence in which models learn patterns from data rather than being explicitly programmed. In industrial operations, machine learning is applied to anomaly detection, predictive maintenance, process optimization, forecasting, clustering, and regression analysis. TDengine IDMP includes built-in machine learning capabilities accessible through the AI-powered insights and batch analysis features, reducing the need to export data to external ML platforms for common operational use cases.

## MES

Manufacturing Execution System. A software system that manages and monitors production operations on the shop floor in real time — tracking work orders, material consumption, operator actions, machine states, and production output. MES sits between the control layer (PLCs, SCADA, DCS) and the business layer (ERP). TDengine IDMP is a natural complement to MES: IDMP provides the time-series data foundation and contextual analytics that MES systems often lack, and the two layers can be integrated to correlate production events with equipment behavior and process data.

## MQTT

Message Queuing Telemetry Transport. A lightweight publish-subscribe messaging protocol designed for constrained devices and low-bandwidth networks. Widely used in industrial IoT for transmitting sensor data from field devices to data platforms. TDengine IDMP supports MQTT as a native data ingestion source.

## OPC-DA

OLE for Process Control — Data Access. An older Windows-based standard for real-time data exchange between SCADA systems, PLCs, and other industrial automation components. OPC-DA relies on Microsoft's COM/DCOM technology, which limits it to Windows environments. It has largely been superseded by OPC-UA for new deployments. TDengine supports OPC-DA as a data ingestion source.

## OPC-UA

OPC Unified Architecture. A modern, platform-independent industrial communication standard that defines both a data model and a secure transport protocol. OPC-UA is the successor to OPC-DA and is the dominant standard for data exchange between industrial devices, SCADA systems, historians, and data platforms. TDengine supports OPC-UA as a native data ingestion source.

## P&ID

Piping and Instrumentation Diagram. A detailed schematic diagram used in the process industries (oil and gas, chemical, power) that shows the piping, equipment, instrumentation, and control systems of a plant or unit. P&IDs are the authoritative reference for understanding the physical layout and measurement points of an industrial process, and are commonly used as the starting point for designing an element model in IDMP.

## Panel

A single visualization component — a chart, gauge, table, or status display — that presents data from one or more element attributes. IDMP supports a wide range of panel types including trend charts, bar charts, pie charts, gauge charts, scatter charts, stat displays, state history charts, tables, event lists, and map charts. Panels are the building blocks of all visualization in IDMP and can be created manually or generated automatically by the AI engine.

## Physics-based Model

A mathematical model built from the fundamental physical laws governing a system — mass balances, energy balances, thermodynamic equations, fluid dynamics, reaction kinetics, or structural mechanics — rather than derived solely from observed data. Also called a mechanistic model, first-principles model, or white-box model. Because a physics-based model encodes domain knowledge about how a process actually works, it can extrapolate to operating conditions not seen in historical data and produces interpretable results that engineers can validate against known physics.

Physics-based models are widely used in process industries for design, simulation, real-time optimization, and fault diagnosis. In modern industrial AI workflows, they are often combined with data-driven models in a hybrid (grey-box) approach: the physics model captures the known structure of the process while the data-driven component corrects for uncertainties, unmeasured disturbances, and model mismatch. TDengine IDMP supports hybrid modeling workflows by providing the time-series infrastructure and asset context that data-driven components require — physics model outputs and data-driven corrections can both be stored as computed attributes and analyzed alongside live sensor data.

## PLC

Programmable Logic Controller. A ruggedized industrial computer used to automate discrete control processes — operating machinery, assembly lines, or any application requiring reliable, real-time control logic. PLCs read inputs from sensors and switches, execute a control program, and drive outputs to actuators and motors. Each PLC typically exposes many individual measurement points (tags), often using a single-column data model where each measurement is stored as a separate series. In TDengine IDMP, multiple PLC measurements for the same device need to be assembled under a single element — since the single-column model does not automatically group them — using the supertable-to-element mapping workflow.

## QMS

Quality Management System. A formalized system that documents processes, procedures, and responsibilities for achieving quality policies and objectives. In manufacturing, a QMS captures inspection results, defect records, non-conformance reports, and process parameters related to product quality. TDengine IDMP supports QMS use cases by linking time-series process data (temperatures, pressures, speeds) to production events and batch records, providing the data foundation for statistical process control, root-cause analysis of quality deviations, and compliance reporting.

## SCADA

Supervisory Control and Data Acquisition. A system architecture used across industries — utilities, oil and gas, manufacturing, water treatment — for monitoring and controlling geographically distributed equipment and processes. A SCADA system collects real-time data from field devices (PLCs, RTUs, sensors), displays it to operators, and enables remote control actions. SCADA systems are a primary source of industrial time-series data, and their data is commonly ingested into historians and platforms like TDengine IDMP for long-term storage, analysis, and AI-driven insights.

## SDK

Software Development Kit. A packaged set of libraries, tools, and documentation that allows developers to interact with a platform programmatically. TDengine IDMP provides official SDKs for Java and Python, auto-generated from the OpenAPI specification. The SDKs cover element management, time-series data access (history, latest, write), and event queries. Developers using other languages can generate a client from the OpenAPI spec using OpenAPI Generator.

## Sparkplug B

An open specification built on top of MQTT that defines a standardized payload format and topic namespace for industrial device communication. Sparkplug B addresses a key limitation of plain MQTT — the lack of a defined data model — by specifying how device metadata, measurement values, and state changes are encoded and structured. It is widely adopted in IIoT deployments as a practical way to implement a Unified Namespace (UNS). TDengine IDMP supports Sparkplug B as a data ingestion source, allowing devices that publish Sparkplug B messages to have their data automatically mapped into the element model.

## SPC

Statistical Process Control. A method of quality control that uses statistical techniques — primarily control charts — to monitor and control a manufacturing or business process. SPC detects when a process is drifting out of control limits before defects occur, enabling operators to intervene proactively. TDengine IDMP provides the time-series data foundation for SPC workflows: continuous sensor data can be analyzed using real-time analytics and batch analysis to compute control limits, detect out-of-control signals, and correlate process variation with upstream causes.

## Stream Processing

Continuous computation performed over data as it arrives, rather than on data stored at rest. TDengine TSDB includes a built-in stream processing engine that can evaluate expressions, compute aggregations, detect conditions, and write results back as new time-series columns — all in real time as new measurements are ingested. This eliminates the need for a separate streaming platform (such as Kafka Streams or Apache Flink) for many common industrial use cases. IDMP's real-time analyses are backed by this stream processing engine.

## Supertable

A TDengine TSDB concept. A supertable is a table template that defines the schema — column names, data types, and tag columns — shared by a group of related time-series tables. Each individual time-series (subtable) inherits the schema from its supertable and adds its own tag values that identify it (for example, device ID, location, or equipment type). Supertables make it efficient to query across many devices of the same type without union operations. In IDMP, supertables are the bridge between the raw TSDB data model and the element/attribute model.

## Tag

In OT (Operational Technology) environments — PI System, SCADA, DCS, and industrial historians — a tag is the standard term for a single named measurement point that produces a continuous stream of timestamped values. A tag is identical in concept to a time series. TDengine uses "time series" to align with modern data terminology, but every tag in an existing industrial system corresponds directly to one time series in TDengine TSDB. The terms are interchangeable.

## Template

A reusable standard structure for an asset class or operational pattern. Templates exist at every level of the IDMP platform: element templates define the standard attribute set for an asset class (Pump, Meter, Boiler); attribute templates define reusable measurement definitions; analysis, panel, dashboard, event, and notification templates standardize logic and presentation. Updating a template propagates the change to all elements derived from it, making large-scale deployments manageable.

## Time Series

A stream of timestamped measurement values produced by a sensor, instrument, or control system. Time series are stored in TDengine TSDB. In IDMP, time series are accessed through the attributes of elements rather than directly, keeping the semantic layer cleanly separated from the storage layer. See also: **Tag**.

## TSDB

Time-Series Database. A database optimized for storing and querying time-stamped data. TDengine TSDB is TDengine's high-performance distributed time-series database, designed to ingest and store billions of data points from millions of measurement series with millisecond-level query performance. TSDB also includes a built-in stream processing engine for real-time computation over incoming data. TDengine IDMP sits on top of TSDB and provides the asset model, contextualization, and analytics layers.

## TSFM

Time Series Foundation Model. A large AI model pre-trained on massive quantities of time-series data across many domains, analogous to how LLMs are pre-trained on text. TSFMs can perform time-series tasks — forecasting, anomaly detection, imputation, classification — with little or no task-specific fine-tuning, by leveraging patterns learned during pre-training. TDengine IDMP integrates TSFM capabilities into its AI-powered insights layer, allowing industrial operators to apply state-of-the-art time-series AI to their plant data without building and training custom models.

## UNS

Unified Namespace. An architectural pattern for industrial data integration in which all data — from PLCs, SCADA, MES, ERP, and other sources — is published to a single, centrally accessible namespace, typically implemented over MQTT. In a UNS architecture, every data producer publishes to a shared topic hierarchy and every consumer subscribes from it, eliminating point-to-point integrations. TDengine IDMP can serve as a consumer and analytical layer on top of a UNS, ingesting data from the MQTT broker and organizing it into the element model.

## Virtual Table

A TDengine TSDB concept. A virtual table is a computed table whose columns are derived from expressions over one or more physical tables, rather than from directly stored measurements. Virtual tables allow engineers to define calculated metrics — such as efficiency ratios, derived process variables, or aggregated readings — that behave like regular time-series columns for query purposes, without pre-computing and storing the results separately.

## Zero Query Intelligence

A TDengine IDMP capability that automatically generates dashboards, panels, and real-time analyses for an element without any user-initiated query or configuration. When enabled, the AI engine examines the element's data and context, identifies the operational scenario (e.g., wind turbine, pump, boiler), and produces a full set of relevant visualizations and analyses. Zero Query Intelligence is the first step in IDMP's AI-driven workflow — delivering immediate operational insight as soon as an element is modeled, before any manual configuration is done.
