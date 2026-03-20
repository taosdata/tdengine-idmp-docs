---
title: Real-Time Analysis
sidebar_label: Real-Time Analysis
---

# 7 Real-Time Analysis

Real-time analysis is one of the most important capabilities in TDengine IDMP. It is the engine that turns raw time-series data into operational intelligence — continuously running calculations on live sensor streams, detecting anomalies, computing KPIs, and generating events when conditions are met. With built-in AI assistance, analyses can be created from a natural language description, and anomalies can be detected without writing any detection rules.

The concept is directly equivalent to **Analysis** in AVEVA PI System: a rule that runs automatically against an element's data, produces calculated outputs, and optionally generates events. If you have used PI Analysis Service, the mental model maps directly.

## What Real-Time Analysis Does

An analysis is bound to an element and continuously monitors its data. When the configured trigger condition is met, the analysis executes a predefined calculation. The result can be:

- **Written to element attributes** — computed values such as hourly averages, efficiency ratios, or running totals are stored as new time-series data alongside the raw measurements.
- **Written to event attributes** — when an event is generated, calculated values (peak temperature, batch duration, fault code) are captured and recorded in the corresponding event.
- **Both** — a single calculation run can write to both element attributes and event attributes.

## Under the Hood

IDMP provides the graphical configuration interface; the actual computation is executed by the TDengine TSDB-Enterprise streaming computation engine. Because computations run inside the database, they consume no IDMP server resources — even if the IDMP application server is restarted, the stream computations that have been created continue running.

Each analysis corresponds to a **stream computation** (Stream) in TDengine. The stream name is visible in the analysis list and uniquely identifies the computation in the underlying database.

## Beyond the Traditional Data Historian

Traditional data historians require engineers to manually configure every analysis: define trigger conditions, write expressions, and map output attributes. This process is not only time-consuming but also demands significant domain knowledge and system expertise. IDMP substantially reduces the implementation complexity of real-time analysis through graphical configuration and AI assistance.

**AI-assisted analysis creation.** The built-in AI assistant supports creating fully configured analyses from natural language descriptions. For example, entering "calculate the average power factor over 15-minute windows" automatically pre-fills the entire creation form. Additionally, the system proactively recommends applicable analysis plans based on the element's template, attributes, and collected data. Users simply browse the recommendation list, select the desired item, and save — no manual configuration required.

**Anomaly detection without detection rules.** In a traditional data historian, anomaly detection relies on engineers manually writing threshold rules, which can only cover known anomaly patterns. IDMP provides an **Anomaly Detection** trigger type powered by **TDgpt**, TDengine's built-in AI analytics engine. Users simply select the target attribute and algorithm; TDgpt automatically identifies when anomalies begin and end without predefined thresholds. TDgpt supports multiple algorithm frameworks, including statsmodels, PyTorch, scikit-learn, and TDengine's proprietary TDtsfm time-series foundation model. As a standard trigger type, Anomaly Detection is integrated into the analysis configuration form alongside sliding windows, event windows, and others.

## Analysis and the Element Hierarchy

Every analysis belongs to exactly one element and is configured on that element's **Analyses** tab. An analysis supports two computation scopes:

- **The element's own attributes** — performs calculations on the current element's attribute data, suitable for individual devices or measurement points.
- **Child element aggregation** — aggregates metrics across all (or filtered) child elements that share a common template. For example, computing the average power output across all turbines under a wind farm element.

## What's Covered in This Chapter

- **[Browsing and Managing Analyses](./01-browsing-analyses.md)** — The analysis list, toolbar controls, and row actions
- **[Creating an Analysis](./02-creating-analysis.md)** — The four-section creation form: General Information, Trigger, Calculation, and Event
- **[Trigger Types](./03-trigger-types.md)** — All eight trigger types and their specific parameters
- **[Calculation](./04-calculation.md)** — Calculation target, window aggregation, output timestamp, and output attributes
- **[Generating Events](./05-generating-events.md)** — Configuring an analysis to produce events
- **[AI-Assisted Analysis](./06-ai-analysis.md)** — Using the built-in AI to create analyses from natural language
- **[Analysis Templates](./07-analysis-templates.md)** — Defining reusable analysis rules in element templates

import DocCardList from '@theme/DocCardList';

<DocCardList />
