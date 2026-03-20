---
title: AI-Assisted Analysis
sidebar_label: AI-Assisted Analysis
---

# 7.6 AI-Assisted Analysis

TDengine IDMP includes a built-in AI assistant that can create analyses without manually filling in the trigger type, calculation expressions, and output attributes. There are two ways to use it.

## Opening the AI Panel

The AI panel is shown by default in the Analyses tab. You can toggle it using the **AI** button in the toolbar filter area above the analysis list.

## Way 1: Use a System-Suggested Analysis

The AI panel displays a **Suggested Analyses** list — powered by **Zero Query Intelligence**, analyses that the system has already generated based on the current element's attributes, template, and collected data. These suggestions are context-aware: for an electricity meter element, the system might suggest computing hourly max voltage, detecting anomalies on current, or calculating power factor over a sliding window.

Click any suggestion to immediately use it. The AI then generates a fully configured analysis form pre-filled with the appropriate settings.

Click the **refresh icon** next to "Suggested Analyses" to load a new set of suggestions.

## Way 2: Describe What You Want

Type a free-form description in the text input field at the right of the AI panel. For example:

> "Calculate the maximum Current of this element over a 1-hour period, sliding every 10 minutes"

The field also has a **microphone button** for voice input. Press Enter or submit to send the description. The AI generates a fully configured analysis form pre-filled with the appropriate settings.

## After AI Generation

Regardless of which way you used, the result is the same:

1. The AI opens the creation form pre-filled with a name, trigger type, sliding interval, rollup window, output expression, and a new output attribute.
2. Review the pre-filled form. You can adjust any field before saving.
3. Click **Save** to create the analysis.

## What the AI Configures

The AI can populate all four sections of the analysis form:

- **General Information** — a descriptive name and optional description
- **Trigger** — the appropriate trigger type (typically Sliding Window) and its parameters
- **Calculation** — the rollup interval, output timestamp, and a computed expression mapped to a new element attribute
- **Event** — event generation settings, if the described condition implies alerting

## Limitations

The AI assistant creates analyses based on natural language intent. For complex custom conditions or advanced event window logic, reviewing and adjusting the AI-generated configuration is recommended before saving.
