---
title: WorkBuddy Integration
sidebar_label: WorkBuddy Integration
---

# 15.6 WorkBuddy Integration

**WorkBuddy** is an agent-oriented workbench. IDMP ships a matching **TDengine Connector** and a set of ready-to-use **expert plugins** for WorkBuddy. The connector brings IDMP's data and capabilities into the AI workflow over MCP — once it is installed and its connection parameters are filled in, you can query industrial data, build analyses, monitor events, create panels and run root cause analysis in natural language, with no custom REST API integration. The expert plugins add a domain-specific perspective on top of that.

## 15.6.1 What is included

| Component | Description |
|---|---|
| **TDengine Connector** | Accesses IDMP over MCP and handles authentication and capability exposure; the three data expert plugins depend on it |
| **TDengine Industrial Time-Series Data Analyst** | Read-only analysis of device metrics, trends, anomalies, peer comparisons and panel data |
| **TDengine Industrial Equipment Diagnostics Advisor** | Read-only fault diagnosis combining alert context with historical evidence before and after an incident |
| **TDengine Industrial Real-Time Monitoring Advisor** | Read-only current-state monitoring of fresh metrics, device status, threshold excursions and active alerts |
| **TDengine Product and Technical Advisor** | Product and technical guidance on TDengine and IDMP capabilities, architecture, deployment and best practices, based on official sources; no connector required |

**Only the three data experts depend on a connected TDengine Connector**, and all three are **read-only**: they read and analyze resources but never create, update, acknowledge or delete anything in IDMP, and they do not operate equipment. **The product advisor does not depend on the connector** and does not connect to your TDengine environment at all — you can ask product and technical questions without configuring IDMP and an API key first.

## 15.6.2 Prepare an API key

The connector accesses IDMP with your personal API key. Get one the same way as in [15.2.2 Get an API Key](02-mcp-interface.md):

1. Sign in to the IDMP web UI.
2. Open the avatar menu at the top right and click the account entry to open the Profile Settings dialog.
3. Switch to the **API Key** tab.
4. Click **New API Key**, give it a unique title, and pick **Never expires** or a future **expiration date**.
5. Copy the full API key.

For key creation, rotation and limits, see [Section 14.8](../14-administration/08-profile-settings.md).

> Consider issuing a dedicated API key for WorkBuddy so you can revoke it at any time without affecting other clients.

## 15.6.3 Install and configure the TDengine Connector

Connectors are installed and managed on WorkBuddy's **Connector** page:

1. Click **Connector** in the **left navigation** to open the connector management page, which lists all available connectors as cards.
2. Find the **TDengine** card and click the **+** button on its right to start a connection. If the card is not listed yet, click **Custom Connector** at the top right and configure a custom MCP connector by the guided flow.
3. Fill in these four connection settings:

| Setting | Description | Default |
|---|---|---|
| **Schema** | Access schema for the TDengine platform (`http` / `https`) | `http` |
| **TDengine platform host** | IDMP service host | `localhost` |
| **Port** | IDMP service port (HTTP defaults to `6042`, HTTPS to `6034`) | `6042` |
| **TDengine API Key** | Generate one on the **API Key** tab in [Profile Settings](../14-administration/08-profile-settings.md) | — |

4. Once saved, a **green dot** appears beside the TDengine card name and the card shows an **enable/disable switch**, indicating the connection is ready.

These settings are assembled into the MCP endpoint that WorkBuddy connects to:

```json
{
  "url": "https://<IDMP_HOST>:6034/api/v1/mcp/stream",
  "type": "streamableHttp",
  "headers": {
    "Authorization": "Bearer <IDMP_API_KEY>"
  }
}
```

`<IDMP_HOST>` is derived from the platform host and port settings. Prefer HTTPS (`6034`) in production; the HTTP address (`6042`) is convenient for troubleshooting inside the network. See [15.2.3 Streamable HTTP Connection](02-mcp-interface.md) for the full authentication and transport details.

> **Security note** : the API key is stored only under `~/.workbuddy` on the local machine.

The connector bundles the following skill definitions, which the expert plugins use as needed:

- `tdengine-create-analysis`: create analyses and alerts
- `tdengine-create-panel`: create visualization panels
- `tdengine-rca`: root cause analysis for events
- `tdengine-data-insights`: industrial data insights

**Disconnecting** : on the connected TDengine card, click the **enable/disable switch**, then click **Disconnect** in the confirmation dialog. The card returns to the disconnected state.

**Notes** : a connector needs the corresponding service access permissions, so make sure the connection details are correct. You can disable or disconnect a connector at any time from the switch, and it is a good idea to check connector status periodically.

## 15.6.4 Summon and use experts

An **expert** in WorkBuddy is likewise a bundle of persona, methodology and toolchain — summoning one is like bringing in a senior practitioner for that role. All four TDengine experts can be installed and used independently; the three data experts depend on a connected **TDengine Connector**, while the product advisor does not.

1. Click **Experts** in the **left sidebar** to open the Expert Center and find the TDengine expert you need.
2. The expert card shows its capabilities, domain and task examples; what each one does is described in Section 15.6.1.
3. Click **Summon** to enter the conversation view.
4. Describe the task to WorkBuddy, and it will complete the work from that expert's professional perspective and method.

Expert plugins come with **quick prompts** you can click to start a conversation, such as "Select a recently updated device and analyze its monitoring data from the last 24 hours."

## 15.6.5 Usage examples

The following prompts cover typical scenarios from scanning the environment to creating an analysis. All of them can be used in WorkBuddy, but the last one is a write operation — see the note below for where to run it:

- "Perform an overall device scan: how many devices and monitoring metrics are defined and managed in the current TDengine environment?"
- "Select a device with recent data updates, read its monitoring data from the last 24 hours, and display the data."
- "Select a visualization panel, read its chart configuration and monitoring metrics, and interpret the panel."
- "Scan recent alert events, select a high-severity device event, and perform an event root cause analysis using the device's historical data before and after the event. Explain the possible causes and provide recommended actions."
- "Select a device and build a real-time analysis that monitors changes in a key metric and generates an alert event when the metric falls outside a reasonable range. Briefly explain the proposed approach first, wait for user confirmation before creating the analysis, and then report the creation result."

:::warning
The last prompt **creates** a real-time analysis, which is a write operation and **cannot be run in a read-only expert session**. Use it in a **regular session with the TDengine Connector enabled**.

Capability boundaries:

- **TDengine Connector** : provides both read and write access — query data, create analyses and panels, monitor events, run root cause analysis, and more
- **Three data experts** : read-only — they analyze and interpret, without changing any resource in IDMP
- **TDengine Product and Technical Advisor** : does not connect to your TDengine environment and answers from public sources only

:::

## 15.6.6 Create a custom expert with the TDengine Connector

A custom expert combines a business role and analysis workflow with the TDengine Connector for scenarios such as equipment inspection, energy analysis or production reports. This section builds an Equipment Inspector, covering creation, dependency configuration, validation and publication. The package format follows the WorkBuddy Open Platform [expert development guide](https://open.workbuddy.cn/docs/expert).

### 15.6.6.1 Prepare the connector and use case

1. Follow Sections 15.6.2 and 15.6.3 to obtain an API key and install and connect the **TDengine** connector.
2. In a WorkBuddy conversation, ask: "List the devices and monitoring metrics in the current TDengine environment." Confirm that it returns real devices and attributes. The target environment should contain devices, historical data or events for validation.
3. Define the expert's goal, data scope and output format. For example: inspect a specified device's metrics and alerts over the last 24 hours without modifying resources, then report anomalies, supporting evidence and recommended manual checks.

The TDengine Connector ID is `tdengine`; use this exact ID in the dependency configuration. The expert uses the current user's IDMP permissions through the connector. A read-only instruction guides the expert's behavior; IDMP still enforces actual access permissions.

### 15.6.6.2 Create the expert and directory

1. Open **Experts · Skills · Connectors → Experts** from the WorkBuddy sidebar.
2. At the top right of the expert marketplace, select **My Experts → Create Expert** to open the creation conversation.
3. Complete the creation prompt with the role, connector, workflow and output requirements. For example:

```text
Create a WorkBuddy expert named "Equipment Inspector" with ID equipment-inspector.
It depends on the published TDengine Connector, whose connector ID is tdengine.
Inspect a specified device's metrics and alerts over the last 24 hours using
read-only operations. Identify missing or stale data and threshold excursions.
Report inspection findings, evidence with timestamps and units, limitations
and recommended manual checks. Use real devices and attributes; never invent data.
Ask for clarification when the device or time range is unspecified.
Never create, modify, acknowledge or delete IDMP resources or operate equipment.
Generate a complete expert package with plugin.json, an Agent definition,
an avatar and a README. Set dependencies.connectors to ["tdengine"] in plugin.json.
```

4. Inspect the generated files. Alternatively, create this directory structure manually or start from the [official expert template](https://open.workbuddy.cn/docs/expert):

```text
equipment-inspector/
├── .codebuddy-plugin/
│   └── plugin.json
├── agents/
│   └── equipment-inspector.md
├── avatars/
│   └── expert.png
└── README.md
```

The `README.md` should describe the expert's purpose, TDengine connection prerequisites, example requests and limitations. Use a 512×512 PNG or JPG avatar no larger than 500 KB, and ensure its path matches the configuration.

### 15.6.6.3 Configure the expert and connector dependency

Save the following as `.codebuddy-plugin/plugin.json`, replacing the example author information with your own:

```json
{
  "name": "equipment-inspector",
  "version": "1.0.0",
  "description": "Read-only equipment inspection using the TDengine Connector.",
  "author": {
    "name": "Example Developer",
    "email": "developer@example.com"
  },
  "agents": ["./agents/equipment-inspector.md"],
  "expertType": "agent",
  "agentName": "equipment-inspector",
  "displayName": {
    "en": "Equipment Inspector",
    "zh": "设备巡检专家"
  },
  "profession": {
    "en": "Industrial Equipment Inspection Advisor",
    "zh": "工业设备巡检顾问"
  },
  "displayDescription": {
    "en": "Inspects device metrics and alerts through TDengine, identifies data gaps and threshold excursions, and provides traceable evidence and review recommendations.",
    "zh": "通过连接器读取设备指标与告警，识别缺失数据和阈值越限，输出可追溯的巡检结论与人工核查建议。"
  },
  "avatar": "avatars/expert.png",
  "categoryId": "04-DataAI",
  "defaultInitPrompt": {
    "en": "Inspect a specified device over the last 24 hours.",
    "zh": "请巡检指定设备最近 24 小时的运行情况。"
  },
  "plugin": "equipment-inspector",
  "dependencies": {
    "connectors": ["tdengine"]
  },
  "tags": [
    {"en": "Equipment Inspection", "zh": "设备巡检"},
    {"en": "Alert Review", "zh": "告警核查"},
    {"en": "Data Quality", "zh": "数据质量"}
  ],
  "quickPrompts": [
    {
      "en": "Inspect a specified device over the last 24 hours.",
      "zh": "请巡检指定设备最近 24 小时的运行情况。"
    },
    {
      "en": "Check the metrics of a specified device for missing or stale data.",
      "zh": "请检查指定设备的指标是否存在缺失或过期数据。"
    },
    {
      "en": "Review recent alerts for a specified device and suggest follow-up checks.",
      "zh": "请核查指定设备的近期告警并给出核查建议。"
    }
  ]
}
```

Keep these configuration fields consistent:

- `name` and `plugin` must match. `agentName` must match both the Agent filename and the `name` in its frontmatter.
- Set `dependencies.connectors` to `["tdengine"]` to reuse the existing connector. Do not duplicate its MCP endpoint, connection form or API key in the expert package.
- Provide exactly three bilingual `tags` and three bilingual `quickPrompts`. Set `defaultInitPrompt` to the first quick prompt.
- The official specification requires 40–50 characters for `displayDescription.zh`. Use an official `categoryId`; this example uses `04-DataAI` for data and AI.

When the expert is summoned, WorkBuddy checks the declared TDengine dependency and guides the user through any outstanding connection setup. Mentioning TDengine in the prompt does not replace the `dependencies.connectors` declaration.

### 15.6.6.4 Define the expert's workflow

Save the following as `agents/equipment-inspector.md`. The frontmatter defines the expert's identity, while the body specifies data collection, business boundaries and output requirements:

```markdown
---
name: equipment-inspector
description: Performs read-only inspection of equipment metrics and alerts through the TDengine Connector.
displayName:
  en: "Equipment Inspector"
  zh: "设备巡检专家"
profession:
  en: "Industrial Equipment Inspection Advisor"
  zh: "工业设备巡检顾问"
maxTurns: 100
---

# Equipment Inspector

Reply in the user's language. Read real data through the TDengine Connector.
Follow the connector's tdengine-data-insights skill for metric trends and anomalies.
Read the current tool descriptions before calling tools; the deployed schema
is authoritative.

## Workflow

1. Confirm the device, inspection period and metrics. Ask when unspecified.
2. Locate the device with search_elements and obtain its attributes with
   list_element_attributes. If names are ambiguous, show paths and confirm
   the target. Never invent IDs; handle pagination as needed.
3. Read the requested period with get_attribute_history or get_batch_attribute_data.
   Preserve attribute names, units, timestamps and device paths.
   Check data gaps and freshness.
4. Retrieve relevant events with list_events or search_events, filter by device
   and time range, and use get_event for details when needed.
5. Identify anomalies using actual samples and configured thresholds.
   State when thresholds are unavailable; never treat assumed thresholds
   as business alert criteria.
6. Report inspection findings, scope and data quality, anomaly evidence,
   limitations and recommended manual checks. Distinguish observations
   from hypotheses; correlation alone does not establish causation.

## Business boundaries

- Only read devices, attributes, historical data and events.
- Never call tools that create, modify, acknowledge or delete resources,
  and never operate equipment.
- Explain tool failures or missing data; never substitute demonstration data.
- Include device paths, metrics, values, units and timestamps in evidence.
  Never expose API keys.
```

See [15.2 MCP Interface](02-mcp-interface.md) for tool names and parameters; the connected MCP tool list determines what is available. The official specification does not allow a custom `tools` field in Agent frontmatter: WorkBuddy assigns tool permissions.

### 15.6.6.5 Package, validate and publish

Once the files are ready, check and publish the expert as follows:

1. Check JSON syntax, Agent frontmatter, file references, avatar and bilingual display fields. Confirm the package contains no real API key and declares the `tdengine` connector dependency.
2. Compress the complete directory into a ZIP, including the hidden `.codebuddy-plugin` directory. Run these commands from the parent of `equipment-inspector`; on Windows, an archive utility can package the same directory:

   ```bash
   zip -r equipment-inspector.zip equipment-inspector
   unzip -l equipment-inspector.zip
   ```

3. Verify that the archive contains `equipment-inspector/.codebuddy-plugin/plugin.json` and the corresponding `agents/equipment-inspector.md` and `avatars/expert.png` files. Do not archive only `agents` or flatten the file hierarchy.
4. Sign in to the [WorkBuddy Open Platform](https://open.workbuddy.cn/docs/what-is-open-platform) and complete individual or enterprise developer verification using the [onboarding guide](https://open.workbuddy.cn/docs/onboarding). Create an expert in the platform's expert business area, upload the ZIP and review the parsed display information. If parsing fails, check the structure and required fields against the official expert development guide.
5. Follow the platform's testing flow and summon the expert in WorkBuddy. Verify that dependency setup connects TDengine. Test clarification when no device is specified, inspection of a specified device over the last 24 hours, and explanations when data is missing or the connection fails. Compare the returned paths, metrics, time range and events with IDMP.
6. Confirm that the expert uses TDengine read tools, returns real evidence and does not create, modify, acknowledge or delete IDMP resources. After validation, submit it for review on the platform. Once approved and published, find and summon it from the expert marketplace. Other users must configure their own TDengine connection and API key on first use.
7. For subsequent workflow or display updates, increment `version`, repackage, validate and submit for review again.

:::note

Marketplace navigation, creation entry points and platform workflows can change between WorkBuddy versions. Follow the [official expert development guide](https://open.workbuddy.cn/docs/expert) and the current client and platform pages.

:::

### 15.6.6.6 Troubleshooting

Use these checks to resolve common expert package and TDengine dependency issues:

| Symptom | Check and resolution |
|---|---|
| ZIP parsing fails | Check that `.codebuddy-plugin/plugin.json` is included, JSON is valid, and required fields and referenced files are present |
| No TDengine connection guidance appears when summoning | Check that `dependencies.connectors` is `["tdengine"]` and that the TDengine connector is available in the client |
| The expert cannot read data | Follow Section 15.6.3 to check connection status, service address and API key, and confirm the current user can access the target device |
| The expert does not follow the inspection workflow | Check consistency between `agentName`, the `agents` path and the Agent's `name`, and confirm that the updated version is loaded |
| The expert reports normal operation without returning data | Request data coverage, latest timestamps and missing-data details, and treat unavailable data as an inspection limitation |
