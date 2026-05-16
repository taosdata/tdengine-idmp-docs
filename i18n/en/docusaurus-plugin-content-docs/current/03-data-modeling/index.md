---
title: Industrial Data Modeling
sidebar_label: Industrial Data Modeling
---
import DocCardList from '@theme/DocCardList';

# 3 Industrial Data Modeling

The foundation of industrial intelligence is not algorithms — it is the data model. In any real factory, **enterprise → plant → production line → equipment → sensor** forms a layered organizational structure, with business meaning at every level. TDengine IDMP brings this structure into the digital world through **industrial data modeling** — building an ordered, searchable knowledge catalog over your assets and their data, so that what used to be isolated data silos becomes a coherent, living whole.

This chapter covers everything you need to model an industrial environment in TDengine IDMP: from defining individual assets and their attributes, to contextualizing and standardizing your data, to managing data relationships and constructing the industrial ontology, to bulk-creating elements and attributes, and finally to browsing and searching large-scale asset catalogs.

Model once, benefit everywhere. A well-built data model not only powers accurate visualization and reliable event detection — it is the very prerequisite for AI insights. Only contextualized data becomes a true AI-ready data asset, driving cross-team collaboration and continuous intelligent analytics.

## What is Industrial Data Modeling

Industrial data modeling sits between the **data storage layer** and the **data application layer**, providing a unified **industrial ontology layer**. This layer stores no raw data of its own; it sits on top of the raw data and builds a **semantic network** that AI, applications, and humans can all understand, access, and use. It consists of three parts: a unified data portal for AI / applications / humans, a data map and catalog, and a data relationship network.

### 1. A Data Portal for AI, Applications, and Humans

Industrial data modeling is, first of all, a **data portal**: one side connects to data sources, the other to three different kinds of data consumers — **AI**, **applications**, and **humans** — adapting interfaces to each, so every consumer can understand, access, and use data in the way most natural to it.

This idea aligns closely with the long-discussed **Data Fabric** vision: a metadata-driven, unified semantic layer that frees data from its physical location and organizes, governs, and serves it as "data assets and data services." In IDMP:

- **Data → Asset**: Raw time-series points are given a name, unit, limits, target value, category, location, and ownership, becoming engineering quantities the business can understand. IDMP defines these contextualization fields uniformly in element templates and attribute templates, deriving them to every instance — "define once, take effect everywhere" (see [3.3 Data Contextualization](./03-data-contextualization.md));
- **Dataset → Asset Library**: Scattered assets are gathered into a single governable, searchable, subscribable, authorizable asset catalog — an enterprise-grade data asset library. IDMP uses the **asset tree** as the unified entry point: drill down by path, filter by template / category / attribute, perform full-text search, and grant subtree-level permissions and sharing (see [3.7 Finding Elements and Data](./07-finding-elements.md));
- **Data Consumption → Service**: Humans browse via Explorer, view panels, and ask AI questions; systems consume via REST API / JDBC / ODBC / Kafka / MQTT; AI Agents call directly via MCP — all three consumer types share the same semantic model. IDMP exposes a single element / attribute / analysis / event model through native REST/JDBC/ODBC interfaces, streaming Kafka/MQTT subscriptions, and the MCP protocol for AI Agents, so applications and AI never need to adapt to each data source individually (see [15. Integrating with Other Systems](../15-integrating-with-other-systems/index.md)).

This is what fundamentally distinguishes IDMP from traditional time-series databases and SCADA-style platforms: it manages not tables and columns, but **data assets and their semantic relationships**.

### 2. A Data Map and Data Catalog

Industrial data sources are highly diverse: time-series databases (such as TDengine TSDB), relational databases (such as MySQL), various industrial production and management systems (MES, WMS, ERP, …), and file systems containing documents, images, videos, and more.

One of the goals of industrial data modeling is to act as a **data map** and **data catalog** that covers all this industrial data — mapping raw data scattered across TDengine TSDB, relational databases, industrial process systems, and file systems onto one or more asset trees composed of elements and attributes.

For applications above, this layer hides all the complexity below:

- They don't need to know which system, cluster, database, or table the data lives in;
- They don't need to know whether the data is a time-series point, a relational row, a file, an image, or a video;
- They don't need to worry about naming conventions, unit conversions, or differences in sampling rates.

IDMP connects to TDengine TSDB, relational databases, OPC, MQTT, Kafka, and other data sources through **unified connection management**, mapping them onto the asset tree as **elements + attributes** (see [12. Data Ingestion](../12-data-ingestion/index.md)). Upper-layer applications only need to use the IDMP data model — for example, `/Elements/Cigarette-Factory-1/Cut-Tobacco-Workshop/Line-A/Drying/SheetDryer-01/OutletMoisture` — and IDMP handles the necessary mapping, transformation, and unit conversion. Raw data is "translated" once and for all into engineering quantities carrying business semantics.

### 3. A Data Relationship Network for the Industrial Ontology

Industrial data modeling goes beyond data mapping — it also **establishes and manages the relationships among data**, turning isolated datasets into a coherent business whole.

Industrial sites are full of entities, and these entities are connected by rich, complex relationships:

- They have **hierarchical relationships** (group → factory → line → equipment → measurement point) as well as **upstream/downstream relationships** (raw material → vacuum reconditioning → drying → flavoring → storage);
- A single entity may have **multiple parents** and **multiple children** — a wind turbine may belong both to a geographic region and to an equipment-type library; a shared airflow measurement point may influence multiple production lines. IDMP expresses such connections of differing strength and semantics through **Strong**, **Weak**, and **Composition** references;
- Every entity carries **attributes**, which may come from different data sources; an attribute may be a measurement / tag dimension or a business KPI; its value type may be numeric, boolean, an enumeration, or even an object type (file, image, video, attribute reference, element reference);
- All these connections — between objects, between attributes, between objects and attributes — are collectively called **References**; each reference carries a **Reference Type** that describes its business semantics;
- Around these objects and attributes, IDMP also provides **panels, dashboards, analyses, events, annotations, documents**, and other descriptive and functional modules — mounted at the corresponding nodes of the industrial scene as consumption entry points from different perspectives.

Together this forms a **complex industrial ontology network** — what looks like a simple Tree is actually **Far Beyond Tree**, a **Networking** carrying business semantics. This network is the virtual mirror of the real industrial world inside the digital space, and the foundation on which IDMP realizes the industrial ontology.

For details on how IDMP manages data relationships, see [3.5 Relationships and Industrial Ontology](./05-relationships-and-ontology.md).

## Scope of Industrial Data Modeling

The data semantic layer that IDMP builds is intended **not just for time-series data**, but for all industrial data — relational business data, engineering documents, images and videos, even the state and events of peripheral systems.

At the current stage, IDMP's implemented capabilities mostly revolve around time-series data; over time, they will expand to more data types and more data sources, eventually achieving a complete coverage of the real industrial world. When that is done, IDMP will be more than "a window for viewing time-series data" — it will be a full-scope semantic system for everything inside an industrial scene.

This semantic system delivers independent and significant value to **AI**, **applications**, and **humans**:

- **For humans**: business users, engineers, operators, and managers can step away from system jargon and read, query, and discuss data in business language (element names, attribute names, process-stage names).
- **For applications**: upper-layer applications (BI, MES, APS, third-party analytics, etc.) consume through a single semantic interface — no per-source adapters; model upgrades propagate automatically.
- **For AI**: this is the stage on which the semantic system truly unlocks its value.

## Why This Matters for AI

AI has one unique requirement on data: it needs not only to "obtain" the data but also to "understand" it. **Data without semantics is just noise to an AI** — a reading of `4.7` is meaningless if the AI doesn't know which motor's vibration it represents, what its unit is, or what its normal range is. The only thing such an AI can do is hallucinate.

For AI to truly understand industrial data, at least four things must be in place — and all four are uniformly provided by the IDMP semantic system:

1. **Stable object identity** — an element is not a string; it is a "business entity" with a path, a template, an ownership, and upstream/downstream context. When AI reasons, it deals with `SheetDryer-01`, not `tag_7831`.
2. **Complete data context** — engineering units, limits, target value, category, operating conditions, related documents, and historical events together form the input that lets AI judge "is the current state normal" and "what does this deviation mean."
3. **A traversable relationship network** — during root-cause analysis and impact analysis, AI traverses the network of elements, attributes, events, and panels along References to locate upstream and downstream nodes, find similar past events, and retrieve related materials.
4. **A unified access interface** — through **MCP (Model Context Protocol)**, an AI Agent accesses any element, attribute, analysis, or event with one protocol, with no per-source adaptation.

Because this semantic system exists, the AI agents on IDMP can cross scattered data sources and heterogeneous systems within milliseconds and complete the full loop of **understanding → reasoning → answering → acting**. This is also the true meaning of TDengine's positioning as "**the industrial data foundation for the AI era**": industrial data modeling is the prerequisite that lets AI truly land in the industrial scene.

## In This Chapter

The following sections build up this semantic system layer by layer:

<DocCardList />
