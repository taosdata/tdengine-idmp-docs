---
title: Expert Mode
sidebar_label: Expert Mode
---

# 8.13 Expert Mode

**Expert mode** turns the AI chat from a single general assistant into a team of specialized experts. You pick the expert best suited to each task, and that expert answers with a fixed persona, methodology and capability set — for example, have the **Root Cause Analysis** expert investigate a device fault, or the **Report Generation** expert assemble an analysis report.

The platform ships with 13 built-in experts covering common industrial data-analysis scenarios such as data querying, panel building, anomaly detection, root cause analysis and forecasting. You can also create your own experts in the Expert Center, bind specific skills, and build a dedicated assistant for your team.

## 8.13.1 What is an expert

An **expert** is a declarative bundle of persona, methodology and toolchain:

- **Persona**: the identity and voice the expert adopts — role, responsibility, domain perspective and answer style.
- **Methodology**: the workflow and domain knowledge the expert follows, expressed as the set of skills it binds.
- **Toolchain**: the tools the expert can use.

Once you bind an expert to an AI chat conversation, every turn in that conversation is answered from that expert's perspective and with its capabilities.

## 8.13.2 Expert Center

The **Expert Center** is the page for managing and configuring experts, at **Libraries → Agentic AI → Expert Center**. Here you can browse built-in experts, view their details, and create and manage your own.

### 8.13.2.1 Browsing and filtering

- The search box at the top filters by name, description or domain.
- The **Source** filter separates **Built-in** (platform-provided, cannot be modified or deleted), **Customized**, and **User** (created by you and your team).

### 8.13.2.2 Viewing expert details

Click **View** on a card to open the detail page, where you can **Edit**, **Clone**, **Delete**, or **Summon** the expert. The detail page shows the expert's **Bound skills** and **Toolchain**, plus metadata such as model and default mode.

### 8.13.2.3 Creating a custom expert

Click **New** in the Expert Center toolbar and fill in:

- **Name**: the expert's English identifier, immutable after creation (must match `^[a-z0-9]([a-z0-9-]*[a-z0-9])?$`).
- **Display name**: the name shown on cards, in the tag row and in the conversation history.
- **Domain**: the expertise tag.
- **Description**: a one-line capability summary.
- **Bound skills**: pick the methodology set from the platform skill catalog.
- **Toolchain**: pick the tools available to the expert.
- **Persona**: write the expert's identity, responsibility and answer style in natural language.

Once saved, the expert appears in the **User** source list and can be summoned in AI chat. Update and delete are also done in the Expert Center; deleting a user expert does not affect the history of existing conversations.

## 8.13.3 Using experts in AI chat

On the **AI chat** page (8.6), a row of **expert tags** appears above the input box — one tag per expert. Click a tag to bind that expert to the current conversation; click another tag to switch.

- Below the input there is also a compact **Expert** button. Clicking it opens a picker (with search) where you can choose an expert, and at the bottom of the picker you can **Exit expert** to return to the general assistant.
- Once an expert is bound, its tag is highlighted and the **Expert** button shows the expert's name.
- **Switching experts starts a new conversation** — the previous conversation already carries the old expert's identity, so the switch starts a fresh thread that answers as the new expert from its first turn; the previous conversation stays in the left-hand history.
- Refreshing the page keeps both the conversation and its expert binding.

**Recommended questions, regeneration and edit-and-resend** all inherit the expert bound to the current conversation.

:::tip
If the selected expert becomes unavailable (for example, it was deleted), the turn continues with the general assistant and a notice is shown.
:::

## 8.13.4 Built-in experts

| Expert | Domain | Typical use |
|--------|--------|-------------|
| Data Query | Data query | Turn natural-language questions into precise queries over device attributes and time-series data |
| Panel Creation | Visualization | Describe a panel in natural language and have AI build it |
| Real-time Analysis | Real-time analysis | Query and analyze real-time data |
| Alert Configuration | Alert | Configure and maintain alert rules |
| Anomaly Detection | Anomaly detection | Detect anomalous patterns in time-series data |
| Trend Forecasting | Forecasting | Forecast time series from historical data |
| Root Cause Analysis | Device diagnosis | Evidence-limited causal tracing and structured explanation of events and alerts |
| Event Query | Event | Retrieve and interpret historical events |
| Comparative Analysis | Comparative analysis | Compare across objects and time windows |
| Health Assessment | Device health | Assess device health and produce a scorecard |
| Metric Calculation | Metric | Calculate and aggregate custom metrics |
| Report Generation | Report | Assemble data and analysis conclusions into a structured report |
| Panel Interpretation | Panel insight | Interpret panel content and produce actionable conclusions |

> Your **User** experts appear in the tag row together with the built-in ones.

## 8.13.5 Recommendations

- Choose the expert by task: use **Data Query** for data questions, **Root Cause Analysis** to investigate device faults, and **Report Generation** to produce reports.
- The bound skills define the expert's methodology, and the persona defines its voice — create team-specific experts when you need a shared approach.
- The more specific the **Persona** you write (responsibility, boundaries, output format), the closer the answers match your expectations.
