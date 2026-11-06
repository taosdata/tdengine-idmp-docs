---
title: AI-Assisted Analysis
sidebar_label: AI-Assisted Analysis
---

# 7.6 AI-Assisted Analysis

TDengine IDMP includes a built-in AI assistant that supports creating RT analyses without manually filling in the trigger type, calculation expressions, and output attributes. There are two ways to use it.

## 7.6.1 Opening the AI Panel

The AI panel is shown by default in the RT analysis tab. You can toggle it using the **AI** button in the toolbar filter area above the RT analysis list.

## 7.6.2 Way 1: Use a System-Suggested Analysis

The AI panel displays a **Suggested Analyses** list — powered by **Zero Query Intelligence**, analyses that the system has already generated based on the current element's attributes, template, and collected data. These suggestions are context-aware: for an electricity meter element, the system might suggest computing hourly max voltage, detecting anomalies on current, or calculating power factor over a sliding window.

Click any suggestion to use it. The AI will generate a fully configured analysis form pre-filled with the appropriate settings.

Click the **refresh icon** next to "Suggested Analyses" to load a new set of suggestions.

## 7.6.3 Way 2: Describe Your Requirements

Type a free-form description in the AI Assistant on the right side of the Explorer. For example:

> "Calculate the maximum Current of this element over a 1-hour period, sliding every 10 minutes"

The AI Assistant input also supports voice input. The AI creates the analysis with tools; when **Confirm before execution** is enabled, it shows a confirmation card first (see [8.6.10 Confirming Tool Operations](../08-ai-powered-insights/06-natural-language-queries.md#8610-confirming-tool-operations)). After creation, open the analysis from the link in the reply.

## 7.6.4 After AI Generation

With a system suggestion, the result is as follows:

1. The AI opens the creation form pre-filled with a name, trigger type, sliding interval, rollup window, output expression, and a new output attribute.
2. The user reviews the pre-filled form and can adjust any field before saving.
3. Click **Save** to create the RT analysis.

When you create the analysis through the AI Assistant, it is created directly; open it from the link in the reply.

## 7.6.5 What the AI Configures

The AI assistant can automatically parse user intent and map it to a complete analysis form configuration. The AI can populate all four sections of the analysis form:

- **General Information** — a descriptive name and optional description
- **Trigger** — the appropriate trigger type (typically Sliding Window) and its parameters
- **Event** — event generation settings, if the described condition implies alerting
- **Calculation** — the rollup interval, output timestamp, and a computed expression mapped to a new element attribute

## 7.6.6 Limitations

The AI assistant generates RT analysis configurations based on natural language intent. For scenarios involving complex custom conditions or advanced event window logic, reviewing and adjusting the AI-generated configuration before saving is recommended.
