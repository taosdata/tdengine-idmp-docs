---
title: Data Contextualization
sidebar_label: Data Contextualization
---

A column named `current` in a database table is just a number. It becomes useful only when you know which meter produced it, where that meter is installed, what unit the value is in, and what range is considered normal. **Data contextualization** is the process of attaching this surrounding knowledge to your data — turning raw measurements into a rich, queryable, AI-ready industrial dataset.

TDengine IDMP builds context through three complementary mechanisms: elements, attributes, and events. Each contributes a different kind of information, and together they give every data point a complete industrial identity.

## 3.3.1 Why Contextualization Matters

As described in [Section 1.2](../01-introduction.md#12-why-industrial-data-foundations-matter-in-the-ai-era), AI cannot reason about raw, decontextualized signals. A vibration reading of `4.7` means nothing to an AI system unless it knows which motor produced it, what units the value is in, what the normal operating range is, and what else was happening on that production line at that moment. This is why TDengine IDMP sits between the time-series database and the intelligence layer — it is the semantics layer that transforms raw storage into something AI can reason about.

But the value of contextualization is not limited to AI. Before AI, the cost showed up differently: as institutional knowledge that existed only in the heads of experienced engineers, as analytics teams rebuilding the same data mappings for every new project, as operators spending hours tracing a signal back to a physical device when something went wrong. Contextualization solves all of these problems at once — it encodes the knowledge about your operation into the data model itself, where it is permanent, searchable, and available to every user and every system.

The work of this chapter is the work of building that knowledge layer. Every element described, every unit configured, every limit set, and every document attached makes the entire platform more capable — not just for today's questions, but for every analysis and AI query that will ever be run against this data.

## 3.3.2 Context from Elements

An element represents a physical or logical asset. The contextual information attached to an element describes what that asset *is*:

- **Name and hierarchy** — The element's name and its position in the asset tree tell users and systems which asset they are looking at and how it relates to other assets (plant → line → machine → sensor).
- **Template** — Signals the class of asset this element belongs to, so users immediately know what attributes and behaviors to expect.
- **Categories** — Business-level labels (e.g., asset type, system, status) that make elements filterable and groupable across large catalogs.
- **Description** — A human-readable statement of what this asset does or represents.
- **Location** — GPS coordinates (Longitude, Latitude, Altitude) that place the asset on a map and enable spatial analysis.
- **Additional Attributes** — Free-form key-value pairs for static asset metadata that does not change over time: manufacturer, model number, serial number, installation date, rated specifications, maintenance contact, and so on.
- **Related Documents** — Engineering manuals, P&ID drawings, calibration reports, and other reference files attached directly to the element. These documents are indexed by the AI engine and used to provide more accurate, asset-specific answers in AI Chat.
- **Annotations** — Free-text observations and notes written by engineers or operators, such as maintenance records, incident reports, or configuration change notes.

All of this information is searchable and available to every feature in TDengine IDMP — dashboards, analyses, event detection, and AI Chat — so that users never have to cross-reference external systems to understand what a piece of data means.

## 3.3.3 Context from Attributes

An attribute represents a specific measurement of an element. The contextual information attached to an attribute describes what that measurement *means*:

- **Description and Categories** — A plain-language explanation of the measurement and classification tags that group related attributes together.
- **Engineering units** — The UOM Class, Default UOM, and Display UOM tell the system and its users what physical quantity is being measured and in what unit it is expressed. TDengine IDMP uses this information to perform unit conversions automatically in visualizations and analyses.
- **Limits** — The Lo, LoLo, Hi, HiHi, Target, Minimum, and Maximum thresholds define the normal operating envelope of the measurement. These limits drive event detection, alarm coloring in dashboards, and the AI engine's assessment of whether current conditions are normal or abnormal.
- **Additional Properties** — Custom key-value pairs for measurement-specific metadata, such as the instrument tag (e.g., `TIT-101`), calibration date, sensor manufacturer, or measurement range.

Without this context, a value of `5.45` is meaningless. With it, TDengine IDMP knows it is `5.45 A` of current on meter `em-12`, within a normal range of 0–10 A, and that anything above 8 A should trigger a high alarm.

## 3.3.4 Context from Events

Events add a temporal dimension to context. When an event rule triggers — for example, when current exceeds the HiHi limit, or when a machine transitions from running to stopped — TDengine IDMP records what happened, when it happened, and on which asset.

This event history contextualizes your time-series data in a way that static metadata cannot: it annotates specific moments in the data stream with operational meaning. When a user or the AI engine reviews the history of an attribute, the associated event records make it possible to distinguish a normal operating fluctuation from an alarm condition, a planned shutdown from an unexpected failure.

Events are configured and managed in detail in Chapter 6. Their role in the data model is to serve as dynamic, condition-driven context that complements the static context provided by element and attribute metadata.
