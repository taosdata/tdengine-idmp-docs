---
title: Real-Time Analysis
sidebar_label: Real-Time Analysis
---

# 7 Real-Time Analysis


Real-time analysis is one of the most important capabilities in TDengine IDMP. It is the engine that turns raw time-series data into operational intelligence — continuously running calculations on live sensor streams, detecting anomalies, computing KPIs, and generating events when conditions are met. With built-in AI assistance, analyses can be created from a natural language description, and anomalies can be detected without writing any detection rules.

The concept is directly equivalent to **Analysis** in OSIsoft PI System: a rule that runs automatically against an element's data, produces calculated outputs, and optionally generates events. If you have used PI Analysis Service, the mental model maps directly.

## What Real-Time Analysis Does

An analysis on an element watches the element's data and, when a configured trigger condition fires, executes a calculation. The result can be:

- **Written to element attributes** — computed values such as hourly averages, efficiency ratios, or running totals are stored as new time-series data alongside the raw measurements.
- **Written to event attributes** — when an event is generated, calculated values (peak temperature, batch duration, fault code) are captured at the moment the event occurs.
- **Both** — the same calculation run can produce multiple output attributes and also generate an event.

## Under the Hood

Real-time analysis in IDMP runs entirely inside the TDengine TSDB-Enterprise streaming computation engine. IDMP provides the graphical configuration interface; the actual computation runs as a persistent stream in the database. This means analyses consume no IDMP server resources — they are offloaded to TDengine and continue running even if the IDMP application server is restarted.

Each analysis corresponds to a **stream** in TDengine. The stream name is visible in the analysis list and uniquely identifies the computation in the underlying database.

## Beyond the Traditional Data Historian

Traditional data historians require engineers to manually configure every analysis: define trigger conditions, write expressions, map output attributes. This is time-consuming and demands deep familiarity with the system. IDMP lowers this barrier significantly.

**AI-assisted analysis creation.** A built-in AI assistant can create a fully configured analysis from a natural language description — "calculate the average power factor over 15-minute windows" — and pre-fill the entire creation form for you. Even better, the system proactively suggests analyses based on the element's template, attributes, and collected data. You do not need to describe anything: browse the suggestions, click one, and the form is ready to save.

**Anomaly detection without detection rules.** In a traditional data historian, detecting anomalies means writing explicit threshold conditions — you can only catch what you know to look for. IDMP includes an **Anomaly Detection** trigger type powered by **TDgpt**, TDengine's built-in AI analytics engine. You select the target attribute and the algorithm; TDgpt determines when anomalies begin and end with no threshold rules required. It supports multiple algorithms backed by statsmodels, PyTorch, scikit-learn, and TDengine's own TDtsfm time-series foundation model. Like any other trigger type, it fits naturally into the same analysis form alongside sliding windows, event windows, and the rest.

## Analysis and the Element Hierarchy

Every analysis belongs to exactly one element and is configured on that element's **Analyses** tab. An analysis can compute over:

- **The element's own attributes** — the typical case, where you calculate something about this specific device or location.
- **Its child elements (aggregation)** — where you aggregate a metric across all (or filtered) child elements that share a common template. For example, compute the average power output across all turbines under a wind farm element.

## What's Covered in This Chapter

- **[Browsing and Managing Analyses](./01-browsing-analyses.md)** — The analysis list, toolbar controls, and row actions
- **[Creating an Analysis](./02-creating-analysis.md)** — The four-section creation form: General Information, Trigger, Calculation, and Event
- **[Trigger Types](./03-trigger-types.md)** — All eight trigger types and their specific parameters
- **[Calculation](./04-calculation.md)** — Apply calculation on, rollup on window, output timestamp, and output attributes
- **[Generating Events](./05-generating-events.md)** — Configuring an analysis to produce events
- **[AI-Assisted Analysis](./06-ai-analysis.md)** — Using the built-in AI to create analyses from natural language

import DocCardList from '@theme/DocCardList';

<DocCardList />
