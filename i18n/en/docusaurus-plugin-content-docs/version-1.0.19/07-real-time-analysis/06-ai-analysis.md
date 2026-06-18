---
title: AI-Assisted Analysis
sidebar_label: AI-Assisted Analysis
---

# 7.6 AI-Assisted Analysis

TDengine IDMP includes a built-in AI assistant that supports creating analyses without manually filling in the trigger type, calculation expressions, and output attributes. There are two ways to use it.

## 7.6.1 Opening the AI Panel

The AI panel is shown by default in the Analyses tab. You can toggle it using the **AI** button in the toolbar filter area above the analysis list.

## 7.6.2 Way 1: Use a System-Suggested Analysis

The AI panel displays a **Suggested Analyses** list — powered by **Zero Query Intelligence**, analyses that the system has already generated based on the current element's attributes, template, and collected data. These suggestions are context-aware: for an electricity meter element, the system might suggest computing hourly max voltage, detecting anomalies on current, or calculating power factor over a sliding window.

Click any suggestion to use it. The AI will generate a fully configured analysis form pre-filled with the appropriate settings.

Click the **refresh icon** next to "Suggested Analyses" to load a new set of suggestions.

## 7.6.3 Way 2: Describe Your Requirements

Type a free-form description in the text input field at the right of the AI panel. For example:

> "Calculate the maximum Current of this element over a 1-hour period, sliding every 10 minutes"

The field also has a **microphone button** for voice input. Press Enter or submit to send the description. The AI will generate a fully configured analysis form pre-filled with the appropriate settings.

## 7.6.4 After AI Generation

Regardless of which way you used, the result is the same:

1. The AI opens the creation form pre-filled with a name, trigger type, sliding interval, rollup window, output expression, and a new output attribute.
2. The user reviews the pre-filled form and can adjust any field before saving.
3. Click **Save** to create the analysis.

## 7.6.5 What the AI Configures

The AI assistant can automatically parse user intent and map it to a complete analysis form configuration. The AI can populate all four sections of the analysis form:

- **General Information** — a descriptive name and optional description
- **Trigger** — the appropriate trigger type (typically Sliding Window) and its parameters
- **Calculation** — the rollup interval, output timestamp, and a computed expression mapped to a new element attribute
- **Event** — event generation settings, if the described condition implies alerting

## 7.6.6 Limitations

The AI assistant generates analysis configurations based on natural language intent. For scenarios involving complex custom conditions or advanced event window logic, reviewing and adjusting the AI-generated configuration before saving is recommended.
