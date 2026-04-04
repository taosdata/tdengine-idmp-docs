---
title: Root Cause Analysis
sidebar_label: Root Cause Analysis
---

# 8.10 Root Cause Analysis

Root Cause Analysis (RCA) is an AI-powered investigative feature that, given an event, automatically retrieves relevant historical data, forms hypotheses about the cause, tests those hypotheses, and produces a structured analysis report — all without manual intervention.

This feature uses the **Deep Thinking Model** configured in Connection Management to perform multi-step reasoning over your time-series data, operational knowledge, and publicly available technical references.

## 8.10.1 How to Access

RCA is accessed from the **event detail page**:

1. Navigate to the **Events** section from the top navigation.
2. Click any event to open its detail view.
3. In the toolbar on the right side of the detail pane, click the **Root Cause Analysis** icon (the magnifying glass with a signal trace icon).

The Root Cause Analysis panel opens on the right side of the event detail page.

## 8.10.2 What Happens When You Start RCA

The analysis runs as an automated multi-step workflow:

1. **Intent recognition** — The system determines the analysis goal from the event context.
2. **Element confirmation** — The associated element, device ID, occurrence time, and symptom are extracted from the event.
3. **Data retrieval** — TDengine SQL is generated to fetch time-series data for the element from the surrounding time window (typically the last 10 days).
4. **Data exploration** — Python analysis code is generated and executed to statistically explore the retrieved data, identifying outliers, trends, and correlations.
5. **Knowledge retrieval** — A web search retrieves relevant technical documentation or known failure modes for this type of equipment.
6. **Hypothesis decomposition** — The AI decomposes the problem into one or more sub-hypotheses about potential root causes.
7. **Hypothesis verification** — Each hypothesis is tested against the actual data.
8. **Report generation** — A structured Markdown report is generated summarizing all findings.

The panel streams the workflow progress in real time so you can follow each step as it executes.

## 8.10.3 The RCA Report

The final report is a structured document that includes:

- **Overview** — Event name, affected system scope, occurrence time, severity level
- **Timeline** — A chronological table of key events and actions around the incident
- **Data Analysis** — Statistical findings from the data exploration phase, including identified outliers or anomalies
- **Root Cause Hypotheses** — The AI's ranked hypotheses about what caused the event, with supporting evidence from the data
- **Recommendations** — Suggested corrective or preventive actions

## 8.10.4 Panel Controls

The RCA panel provides the following controls for managing the analysis session.

<table>
<colgroup><col style="width:9em"/><col/></colgroup>
<thead><tr><th>Control</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Refresh icon</strong></td><td>Re-run the root cause analysis for this event</td></tr>
<tr><td><strong>Close (X)</strong></td><td>Close the RCA panel and return to the standard event detail view</td></tr>
</tbody>
</table>

:::note
Root Cause Analysis is a new feature introduced in TDengine IDMP 1.0.14. Additional entry points for RCA (such as from dashboards and the AI Chat interface) are planned for future releases.
:::
