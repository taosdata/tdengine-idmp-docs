---
title: Información con IA
sidebar_label: Información con IA
---

# 8 AI-Powered Insights

TDengine IDMP embeds AI intelligence throughout the platform, turning it from a passive data repository into an active operational advisor. This chapter covers all AI-powered features — from proactive visualization generation to anomaly detection, forecasting, root cause analysis, and natural language queries.

## Two Modes of AI Intelligence

IDMP delivers AI insights in two complementary modes:

**Push-driven (Zero-Query Intelligence).** The system proactively analyzes your data and pushes findings to you without waiting for you to ask. When you open an element's Panels tab, AI-generated visualizations are already waiting. When you navigate to an element's Analyses tab, the AI has already suggested relevant analyses. This is Zero-Query Intelligence: the system continuously works in the background, applying LLM reasoning over your asset hierarchy and time-series data to surface insights before you think to look for them.

**Pull-driven.** You ask, the system answers. You can describe a panel or an analysis in plain language — "show me daily average voltage as a bar chart" or "calculate the hourly max current and alert when it exceeds normal" — and the AI builds it for you. The AI Chat interface also accepts free-form questions about your data — "what was the average current for em-1 last week?" — and returns answers grounded in your actual TDengine data. Root Cause Analysis runs on demand from an event detail page and produces a structured investigative report.

Together, these AI features dramatically lower the barrier to operational intelligence. Engineers who are not data scientists can build dashboards, configure analyses, detect anomalies, and investigate incidents without writing SQL or mastering complex tooling. This makes advanced industrial analytics accessible to small and medium-sized businesses that cannot afford dedicated data analysts or full-time process engineers.

## AI Components

IDMP's AI capabilities are built on two underlying engines:

**Large Language Model (LLM).** An external LLM (configured via an OpenAI-compatible connection) handles natural language understanding, visualization and analysis generation, insight narration, and root cause reasoning. IDMP ships with a built-in 15-day trial connection so you can explore AI features immediately without any setup.

**TDgpt.** TDengine's built-in time-series AI engine handles computationally intensive analytical tasks that operate directly on time-series data: anomaly detection, forecasting, and missing data imputation. TDgpt is a separate module that must be installed alongside IDMP — once installed, it works independently of the LLM connection and requires no external AI configuration.

## What's Covered in This Chapter

- **[Connecting to LLM](./01-connecting-to-llm.md)** — Configuring the AI connection (LLM endpoint, models, authentication)
- **[AI-Generated Panels](./02-ai-generated-panels.md)** — Panels automatically generated and suggested by AI on the element Panels tab
- **[AI Panel Insights](./03-ai-panel-insights.md)** — Natural language summaries and interpretations generated for individual panels
- **[AI-Generated Analyses](./04-ai-generated-analyses.md)** — Analyses automatically suggested and created by AI on the element Analyses tab
- **[AI Composite Metrics](./05-ai-composite-metrics.md)** — AI-suggested formula and composite attribute definitions
- **[Natural Language Queries](./06-natural-language-queries.md)** — The AI Chat interface for querying your data in plain language
- **[Anomaly Detection](./07-anomaly-detection.md)** — TDgpt-powered anomaly detection as an analysis trigger type
- **[Forecasting](./08-forecasting.md)** — TDgpt-powered time-series forecasting for element attributes
- **[Missing Data Imputation](./09-missing-data-imputation.md)** — TDgpt-powered gap filling for time-series data
- **[Root Cause Analysis](./10-root-cause-analysis.md)** — AI-generated root cause investigation reports for events

import DocCardList from '@theme/DocCardList';

<DocCardList />
