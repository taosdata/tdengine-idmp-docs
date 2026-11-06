---
title: AI-Generated Analyses
sidebar_label: AI-Generated Analyses
---

# 8.4 AI-Generated Analyses

IDMP can automatically suggest and configure real-time analyses for an element based on its template, attributes, and collected data. This lowers the barrier to RT analysis creation: instead of manually configuring trigger conditions, expressions, and output attributes, you can start from an AI-generated configuration and save it with a single click.

## 8.4.1 Where to Find AI-Suggested Analyses

AI analysis suggestions appear in the **RT analysis** tab of any element in the Explorer. The tab includes an AI panel (visible by default, toggled with the **AI** button in the toolbar) that displays a **Suggested Analyses** list — powered by **Zero Query Intelligence**, analyses that the system has already generated based on the element's context.

For an electricity meter element, the system might suggest:

- Computing the hourly maximum voltage
- Detecting anomalies on current using TDgpt
- Calculating the average power factor over a 15-minute sliding window

## 8.4.2 Two Ways to Use AI Analysis

**Use a system suggestion.** Click any item in the Suggested Analyses list. The AI generates a fully configured analysis form pre-filled with a name, trigger type, calculation expression, and output attribute. Review and click **Save**.

**Describe what you want.** If the suggestions do not cover what you need, describe the request in natural language in the AI Assistant on the right side of the Explorer — for example, "calculate the average current over 1-hour windows" or "alert me when voltage exceeds the normal range for more than 5 minutes". The AI creates the analysis with tools; when **Confirm before execution** is enabled, it shows a confirmation card first (see [8.6.10 Confirming Tool Operations](./06-natural-language-queries.md#8610-confirming-tool-operations)). After creation, open the analysis from the link in the reply.

The AI Assistant input also supports voice input.

## 8.4.3 After AI Generation

With a system suggestion, the analysis creation form opens pre-filled. You can review every field and adjust any value before saving. Click **Save** to create the RT analysis. If **Enable analysis upon creation** is checked, the RT analysis starts running immediately. When you create the analysis through the AI Assistant, it is created directly; open it from the link in the reply.

For a full reference on the analysis form, trigger types, and calculation options, see [Chapter 7: Real-Time Intelligent Analysis and Response](../07-real-time-analysis/index.md).
