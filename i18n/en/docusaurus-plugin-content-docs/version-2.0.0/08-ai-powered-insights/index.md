---
title: AI-Powered Insights
sidebar_label: AI-Powered Insights
---

# 8. AI-Powered Insights

TDengine IDMP embeds AI intelligence throughout the platform, making data speak for itself — the system transforms from a passive data repository into an active operational advisor. This chapter covers all AI-powered features: from proactively pushed visualization generation to anomaly detection, forecasting, root cause analysis, and natural language queries.

## Two Modes of AI Intelligence

IDMP delivers AI insights in two complementary modes:

**Push Mode.** Such as Zero-Query Intelligence — this is the shift from Pull to Push. The system automatically senses the application context, proactively analyzes your data, and pushes findings to you without waiting for you to ask. When you open an element's Panels tab, AI-generated visualizations are already waiting. When you navigate to an element's Analyses tab, the AI has already suggested relevant analyses. This is the core idea of Zero-Query Intelligence: the system continuously works in the background, applying LLM reasoning over your asset hierarchy and time-series data to surface insights before you think to look for them.

**Pull Mode.** Such as AI Chat — you ask, the system answers. You can describe a panel or an analysis in plain language — "show me daily average voltage as a bar chart" or "calculate the hourly max current and alert when it exceeds normal" — and the AI builds it for you. The AI Chat interface also accepts free-form questions about your data — "what was the average current for em-1 last week?" — and returns answers grounded in your actual TDengine data. Root Cause Analysis runs on demand from an event detail page and produces a structured investigative report.

Together, these two AI intelligence modes dramatically lower the barrier to operational intelligence. Traditional BI tools require SQL skills, data structure familiarity, and visualization expertise — a steep learning curve. Zero-Query Intelligence fundamentally changes this: engineers who are not data scientists can build dashboards, configure analyses, detect anomalies, and investigate incidents without writing SQL or mastering complex tooling. We believe that advanced industrial analytics should not be limited to large enterprises with dedicated data analysts — small and medium-sized businesses should be able to use it too.

## AI Components

IDMP's AI capabilities are built on two underlying engines:

**Large Language Model (LLM).** An external LLM (configured via an OpenAI-compatible connection) handles natural language understanding, visualization and analysis generation, insight narration, and root cause reasoning. IDMP ships with a built-in 15-day trial connection so you can explore AI features immediately without any setup.

**TDgpt.** TDengine's built-in time-series AI engine handles computationally intensive analytical tasks that operate directly on time-series data: anomaly detection through `forecast()`, `anomaly_window()`, and other functions, as well as forecasting and missing data imputation. TDgpt is a separate module that must be installed alongside IDMP — once installed, it works independently of the LLM connection and requires no external AI configuration.

On top of these two foundational engines, IDMP builds the **Industrial Agent Runtime (IAR)**.

The **Industrial Agent Runtime** architecture, from the bottom up, consists of core modules including: LLM Integration, Agent Framework, Agent Capability Extensions, AI Applications, and Security & Governance.

At the base of IAR is open LLM configuration management. TDengine supports integration with all mainstream LLMs, supports both cloud-based and locally deployed private LLMs, supports configuring different LLMs for different tasks to achieve optimal model-to-task matching, and provides prompt management capabilities.

TDengine IAR is a fully-featured AI Agent runtime that includes an agent execution framework, a cognitive framework, and a capability extension framework:

- **Agent Execution Framework**: IAR includes a built-in AI agent execution and observation framework, with comprehensive caller permission management — an agent's permissions are identical to the initiating user's system permissions. It supports agent work scope control with clear limits on the tasks and content an agent can execute, along with comprehensive risk management strategies including circuit breaking, rate limiting, and retry mechanisms. TDengine IAR supports the standard ACP protocol, meaning users can not only use TDengine's built-in agents but also bring in external agents at any time, building an open agent ecosystem.

- **Agent Cognitive Framework**: Built on the execution and observation framework, IAR establishes a cognitive framework adapted to industrial scenarios, including Planning (intent recognition, task planning & orchestration, task routing), Reasoning (context awareness, inference, constraints), Memory (short-term memory, medium/long-term memory, summarization & retrieval), and Agent Loop (perceive, reason, act, feedback loop), enabling agents to execute complex tasks more intelligently with the support of LLMs.

- **Agent Extension Framework**: TDengine IAR includes built-in capability extension modules such as Skills, Knowledge Management, and Tools, significantly enhancing agents' complex task execution capabilities and making agents more attuned to industrial scenarios.

On top of the IAR, TDengine provides dozens of system-level Skills, builds 13 out-of-the-box AI assistants, and supports users in customizing personalized agent assistants based on the agent capability extension framework. At the application layer, TDengine has built typical AI application scenarios around the most common industrial data analytics use cases, including Zero-Query Intelligence, AI Q&A, Panel Insights, and Root Cause Analysis.

Across all these components, TDengine has constructed a complete enterprise-grade AI security and governance framework covering four dimensions — controllable, trustworthy, auditable, and robust — along with context governance. In industrial scenarios, AI security is not an optional feature — it directly affects whether production lines can run, whether accidents can be avoided, and whether compliance audits can be passed.

## What's Covered in This Chapter

- **[Connecting to LLM](./01-connecting-to-llm.md)** — Configuring the AI connection (LLM endpoint, models, authentication)
- **[AI-Generated Panels](./02-ai-generated-panels.md)** — Panels automatically generated and suggested by AI on the element Panels tab
- **[AI Panel Insights](./03-ai-panel-insights.md)** — Natural language summaries and interpretations generated for individual panels
- **[AI-Generated Analyses](./04-ai-generated-analyses.md)** — Analyses automatically suggested and created by AI on the element RT analysis tab
- **[AI Composite Metrics](./05-ai-composite-metrics.md)** — AI-suggested formula and composite attribute definitions
- **[Natural Language Queries](./06-natural-language-queries.md)** — The AI Chat interface for querying your data in plain language
- **[Anomaly Detection](./07-anomaly-detection.md)** — TDgpt-powered anomaly detection as an analysis trigger type
- **[Forecasting](./08-forecasting.md)** — TDgpt-powered time-series forecasting for element attributes
- **[Missing Data Imputation](./09-missing-data-imputation.md)** — TDgpt-powered gap filling for time-series data
- **[Root Cause Analysis](./10-root-cause-analysis.md)** — AI-generated root cause investigation reports for events
- **[AI Functions](./11-ai-functions.md)** — A unified AI entry point across pages that runs analysis using the current page context

import DocCardList from '@theme/DocCardList';

<DocCardList />
