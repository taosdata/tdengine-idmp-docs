---
title: AI-Generated Analyses
sidebar_label: AI-Generated Analyses
---

# 8.4 AI-Generated Analyses

IDMP can automatically suggest and configure real-time analyses for an element based on its template, attributes, and collected data. This lowers the barrier to analysis creation: instead of manually configuring trigger conditions, expressions, and output attributes, you can start from an AI-generated configuration and save it with a single click.

## 8.4.1 Where to Find AI-Suggested Analyses

AI analysis suggestions appear in the **Analyses** tab of any element in the Explorer. The tab includes an AI panel (visible by default, toggled with the **AI** button in the toolbar) that displays a **Suggested Analyses** list — powered by **Zero Query Intelligence**, analyses that the system has already generated based on the element's context.

For an electricity meter element, the system might suggest:

- Computing the hourly maximum voltage
- Detecting anomalies on current using TDgpt
- Calculating the average power factor over a 15-minute sliding window

## 8.4.2 Two Ways to Use AI Analysis

**Use a system suggestion.** Click any item in the Suggested Analyses list. The AI generates a fully configured analysis form pre-filled with a name, trigger type, calculation expression, and output attribute. Review and click **Save**.

**Describe what you want.** If the suggestions do not cover what you need, type a natural language description in the text input at the top of the AI panel — for example, "calculate the average current over 1-hour windows" or "alert me when voltage exceeds the normal range for more than 5 minutes". Press Enter. The AI interprets your intent, selects the appropriate trigger type, writes the calculation expression, and maps the output to a new attribute — all pre-filled in the creation form. You do not need to know how to configure triggers or write expressions; as long as you know what you want the analysis to do, the AI handles the rest.

A microphone button is also available for voice input.

## 8.4.3 After AI Generation

Regardless of which method you used, the result is the same: the analysis creation form opens pre-filled. You can review every field and adjust any value before saving. Click **Save** to create the analysis. If **Enable analysis upon creation** is checked, the analysis starts running immediately.

For a full reference on the analysis form, trigger types, and calculation options, see [Chapter 7: Real-Time Analysis](../07-real-time-analysis/index.md).
