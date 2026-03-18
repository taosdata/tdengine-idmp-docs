---
title: Connecting to LLM
sidebar_label: Connecting to LLM
---

# 8.1 Connecting to LLM


Most AI features in IDMP — panel generation, analysis suggestions, AI Chat, root cause analysis — require a connection to an external Large Language Model (LLM). IDMP uses an OpenAI-compatible interface, so any LLM provider or self-hosted model that exposes an OpenAI-compatible API can be used.

## Built-In Trial Connection

IDMP ships with a built-in trial AI connection that is active for 15 days after installation. During the trial period, all LLM-dependent AI features work immediately without any configuration. Once the trial expires, you must configure your own AI connection to continue using these features.

TDgpt-based features (anomaly detection, forecasting, missing data imputation) are independent of the LLM connection. They require the TDgpt module to be installed alongside IDMP.

## Configuring an AI Connection

AI connections are managed in the **Connection Management** section of the system settings, alongside TDengine data connections.

To add or edit an AI connection:

1. Navigate to **Settings** → **Connection Management**.
2. Click **+ Add Connection** and select the **AI** connection type.
3. Fill in the connection fields:

| Field | Description |
|---|---|
| **Connection Name** | A unique name to identify this AI connection |
| **API Endpoint** | The base URL of the OpenAI-compatible API (e.g., `https://api.openai.com/v1`) |
| **API Key** | The authentication key for the API. Leave blank for local deployments that do not require authentication. |
| **Q&A Model** | The model used for standard natural language queries and panel/analysis generation (e.g., `gpt-4o`) |
| **Deep Thinking Model** | The model used for complex analytical tasks that require extended reasoning, such as root cause analysis (e.g., `o1` or `o3`) |

4. Click **Test Connection** to verify the endpoint and credentials.
5. Click **Save**.

## Two Model Configuration

IDMP uses two separate models from the same AI connection:

- **Q&A Model** — handles everyday interactions: answering natural language queries, generating panel suggestions, creating analysis configurations, and narrating panel insights. This model should be fast and cost-effective.
- **Deep Thinking Model** — handles computationally intensive tasks that benefit from extended reasoning chains, most notably Root Cause Analysis. This model can be slower and more expensive; it is only invoked when deep analysis is explicitly requested.

In the AI Chat interface, users can toggle **Deep Thinking** mode to route their query to the Deep Thinking Model instead of the Q&A Model.

## Local Deployment

For organizations running a self-hosted LLM (such as a locally deployed Ollama or vLLM instance), set the **API Endpoint** to the local service URL and leave the **API Key** blank if the service does not require authentication. As long as the service exposes an OpenAI-compatible API, all IDMP AI features work without modification.
