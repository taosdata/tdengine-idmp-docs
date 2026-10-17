---
title: WorkBuddy 集成
sidebar_label: WorkBuddy 集成
---

# 15.6 WorkBuddy 集成

**WorkBuddy** 是面向智能体的工作台。IDMP 为 WorkBuddy 提供了配套的 **TDengine 连接器**与一组开箱即用的**专家插件**。连接器通过 MCP 把 IDMP 的数据与能力接入 AI 工作流——装好并填好连接参数后，即可用自然语言完成工业数据查询、分析构建、事件监控、面板创建与根因分析等任务，无需自行对接 REST API；专家插件则在此之上提供各领域的专业视角。

## 15.6.1 集成组成

| 组件 | 说明 |
|---|---|
| **TDengine 连接器** | 通过 MCP 访问 IDMP 的连接器，负责鉴权与能力暴露；三位数据类专家插件依赖它 |
| **TDengine 数据分析师** | 只读工业数据分析专家，分析设备指标、趋势、异常、同类对比与面板数据 |
| **TDengine 故障诊断顾问** | 只读设备故障诊断专家，结合告警上下文与前后历史证据定位故障原因 |
| **TDengine 实时监测顾问** | 只读实时监测专家，关注最新指标、当前状态、阈值越限与活跃告警 |
| **TDengine 产品顾问** | 产品与技术咨询专家，依据官方资料讲解 TDengine 与 IDMP 的能力、架构、部署与最佳实践；不依赖连接器 |

**只有三位数据类专家（数据分析师、故障诊断顾问、实时监测顾问）依赖已连接的 TDengine 连接器**，并且它们都是**只读**的：只读取与分析资源，不会创建、修改、确认或删除 IDMP 中的任何资源，也不会操作设备。**产品顾问不依赖连接器**，不连接您的 TDengine 环境，仅使用公开资料作答——咨询产品与技术问题无需先配置 IDMP 与 API Key。

## 15.6.2 准备 API Key

连接器使用您的个人 API Key 访问 IDMP，获取方式与 [15.2.2 获取 API Key](02-mcp-interface.md) 一致：

1. 登录 IDMP Web UI。
2. 打开右上角头像菜单，点击顶部账户项，打开个人设置对话框。
3. 切换到 **API Key** 页签。
4. 点击 **新增 API Key**，填写唯一标题，并选择**永不过期**或未来的**到期日期**。
5. 复制完整 API Key。

API Key 的创建、轮换与限制，请参见[第 14.8 节](../14-administration/08-profile-settings.md)。

> 建议为 WorkBuddy 单独生成一把 API Key，便于随时吊销而不影响其他客户端。

## 15.6.3 安装并配置 TDengine 连接器

连接器在 WorkBuddy 的**连接器**页面安装与管理：

1. 在**左侧导航栏**点击**连接器**，进入连接器管理页面，页面展示所有可用的连接器卡片。
2. 找到 **TDengine** 卡片，点击卡片右侧的 **+** 按钮发起连接。若列表中暂无该卡片，可点击页面右上角的**自定义连接器**按钮，按引导配置自定义 MCP 连接器。
3. 在连接配置中填写以下四项：

| 配置项 | 说明 | 默认值 |
|---|---|---|
| **协议** | TDengine 平台访问协议（`http` / `https`） | `http` |
| **TDengine 平台地址** | IDMP 服务主机地址 | `localhost` |
| **端口** | IDMP 服务端口（HTTP 默认 `6042`，HTTPS 默认 `6034`） | `6042` |
| **TDengine API Key** | 在[个人设置](../14-administration/08-profile-settings.md)的 **API Key** 页签中生成 | — |

4. 保存后，TDengine 卡片名称旁出现**绿色圆点**并提示连接已就绪，卡片右侧显示**启用/禁用开关**。

配置项会拼接为实际的 MCP 接入地址：

```json
{
  "url": "https://<IDMP_HOST>:6034/api/v1/mcp/stream",
  "type": "streamableHttp",
  "headers": {
    "Authorization": "Bearer <IDMP_API_KEY>"
  }
}
```

其中 `<IDMP_HOST>` 由「TDengine 平台地址」与「端口」共同决定，生产环境建议使用 HTTPS（`6034`）；HTTP 地址（`6042`）适合内网排障。完整的鉴权与传输说明见 [15.2.3 Streamable HTTP 接入](02-mcp-interface.md)。

> **安全说明**：API Key 仅存储在本机 `~/.workbuddy` 目录下。

连接器自带以下能力定义（Skill），专家插件按需引用：

- `tdengine-create-analysis`：创建分析与告警
- `tdengine-create-panel`：创建可视化面板
- `tdengine-rca`：事件根因分析
- `tdengine-data-insights`：工业数据洞察

**断开连接**：在已连接的 TDengine 卡片上点击**启用/禁用开关**，在「确定要断开连接器 TDengine 吗？」的弹窗中点击**断开**，卡片恢复为未连接状态。

**注意事项**：连接器需要相应服务的访问权限，请确保连接信息正确；可随时通过开关禁用或断开连接器；建议定期检查连接器状态。

## 15.6.4 召唤并使用专家

WorkBuddy 中的**专家**同样是「独立的人设、方法论和工具链」的组合——召唤谁，就像请到了那个岗位的资深从业者。TDengine 的四位专家都可独立安装选用；其中三位数据类专家依赖已连接的 **TDengine 连接器**，产品顾问不依赖连接器。

1. 在 WorkBuddy **左侧边栏**点击**专家**，进入专家中心，找到需要的 TDengine 专家。
2. 专家卡片展示能力介绍、擅长领域与任务示例，各专家的定位见 15.6.1 节。
3. 点击**召唤**，进入对话界面。
4. 将任务告诉 WorkBuddy，它会按该专家的专业视角与方法完成任务。

专家插件自带一组**快速提示词**，点击即可发起对话，例如「请选择一台近期有数据更新的设备，分析它最近 24 小时的监测数据。」

## 15.6.5 使用示例

以下提示词覆盖了从扫描环境到创建分析的典型场景，均可在 WorkBuddy 中使用；其中最后一条属于写入操作，执行前提见下方说明：

- 「请对设备做一次总体扫描：当前 TDengine 环境共定义和管理了多少个设备，多少个监测指标」
- 「请选择一台近期有数据更新的设备，读取它最近 24 小时的监测数据并展示。」
- 「请选择一个可视化面板，读取它的图表配置和监测指标，并解读这个面板」
- 「请扫描最近的告警事件，挑选一条严重级别偏高的设备事件，结合该设备前后的历史数据做一次事件根因分析，可能的事件原因是什么，并提供处置建议。」
- 「请选择一台设备，为它构建一个实时分析，监控其关键指标的变化，当该指标超出合理范围时产生告警事件。请先简要说明你的方案，待用户确认后创建这个分析，最后告诉我创建结果。」

:::warning
最后一条提示词会**创建**实时分析，属于写入操作，**不能在只读的专家会话中执行**。请在**启用了 TDengine 连接器的普通会话**中使用它。

能力边界：

- **TDengine 连接器**：提供读写能力，可查询数据，也可创建分析与面板、监控事件、执行根因分析等
- **三位数据类专家**：只读，只做分析与解读，不改动 IDMP 中的任何资源
- **TDengine 产品顾问**：不连接 TDengine 环境，仅依据公开资料作答

:::

## 15.6.6 使用 TDengine 连接器创建自定义专家

自定义专家将业务角色、分析方法与 TDengine 连接器组合起来，用于设备巡检、能耗分析或生产日报等特定场景。本节以“设备巡检专家”为例，说明从创建专家到配置依赖、验证和发布的完整过程。专家包格式参考 WorkBuddy 开放平台的[专家开发指南](https://open.workbuddy.cn/docs/expert)。

### 15.6.6.1 准备连接器与业务场景

1. 按 15.6.2 和 15.6.3 节准备 API Key，安装并连接 **TDengine** 连接器。
2. 在 WorkBuddy 对话中输入“请列出当前 TDengine 环境中的设备及监测指标”，确认能够读取实际设备和属性。目标环境应已有可用于验证的设备、历史数据或事件。
3. 确定专家的目标、数据范围和输出格式。例如：只读巡检指定设备最近 24 小时的指标与告警，输出异常摘要、数据证据和人工核查建议。

TDengine 连接器的标识为 `tdengine`，后续依赖配置必须使用该标识。专家通过连接器使用当前用户的 IDMP 权限；提示词中的“只读”约束用于指导专家行为，实际访问权限仍由 IDMP 控制。

### 15.6.6.2 创建专家与目录

1. 在 WorkBuddy 左侧菜单进入**专家·技能·连接器 → 专家**。
2. 在专家市场右上角点击**我的专家 → 创建专家**，进入创建对话。
3. 补全创建提示词，说明专家角色、连接器、工作流程和输出要求。例如：

```text
请创建一个名为“设备巡检专家”的 WorkBuddy 专家，标识为 equipment-inspector。
依赖已上架的 TDengine 连接器，连接器 ID 为 tdengine。
职责：只读巡检指定设备最近 24 小时的监测指标与告警，识别数据缺失、
过期数据和阈值越限，输出巡检结论、带时间与单位的数据证据、局限及核查建议。
使用实际设备与属性，不编造数据；未指定设备或时间范围时先澄清。
禁止创建、修改、确认或删除 IDMP 资源，禁止操作设备。
请生成符合开放平台规范的完整专家包，包括 plugin.json、Agent 定义、
头像和 README，并在 plugin.json 中声明 dependencies.connectors 为 ["tdengine"]。
```

4. 检查生成的文件。也可直接按下列结构手动创建专家目录，或从[官方专家模板](https://open.workbuddy.cn/docs/expert)开始修改：

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

`README.md` 应说明专家用途、TDengine 连接器配置前提、调用示例与限制。头像需使用 PNG 或 JPG，尺寸为 512×512 像素，大小不超过 500 KB；文件路径必须与配置一致。

### 15.6.6.3 配置专家与连接器依赖

将以下内容保存为 `.codebuddy-plugin/plugin.json`，并将作者信息替换为实际信息：

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

配置时应满足以下约束：

- `name` 与 `plugin` 一致；`agentName` 与 Agent 文件名及其 frontmatter 中的 `name` 一致。
- `dependencies.connectors` 填写 `["tdengine"]`，用于复用已有连接器。无需在专家包中重复配置 MCP 地址、连接表单或 API Key。
- `tags` 和 `quickPrompts` 各提供 3 项，中英文展示字段填写完整；`defaultInitPrompt` 与 `quickPrompts` 第一项一致。
- `displayDescription.zh` 按官方规范控制在 40～50 字；`categoryId` 使用官方分类标识，本例选择数据智能 `04-DataAI`。

召唤专家时，WorkBuddy 会根据依赖声明检查 TDengine 连接器，并引导完成尚未连接的依赖。仅在提示词中提及 TDengine，不能替代 `dependencies.connectors` 声明。

### 15.6.6.4 编写专家工作流程

将以下内容保存为 `agents/equipment-inspector.md`。文件头部声明专家身份，正文定义数据读取方法、业务边界与输出要求：

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

# 设备巡检专家

根据用户使用的语言作答，通过 TDengine 连接器读取真实数据。
进行指标趋势与异常分析时，遵循连接器提供的 tdengine-data-insights 技能。
调用工具前读取当前工具说明，以实际部署的参数契约为准。

## 工作流程

1. 确认设备、巡检时间范围和关注指标；未指定时先澄清。
2. 使用 search_elements 定位设备，使用 list_element_attributes 获取属性。
   遇到同名设备时展示路径并确认目标，不编造 ID；按需处理分页。
3. 使用 get_attribute_history 或 get_batch_attribute_data 读取指定范围的数据，
   保留属性名称、单位、时间戳与设备路径，检查数据缺失和新鲜度。
4. 使用 list_events 或 search_events 获取相关事件，按设备与时间范围筛选，
   必要时使用 get_event 读取详情。
5. 依据实际样本与已配置的阈值识别异常；缺少阈值时明确说明，
   不将自行假设的阈值作为业务告警依据。
6. 输出巡检结论、数据范围与质量、异常证据、局限和人工核查建议。
   区分观测事实与推测，不将相关性直接表述为因果关系。

## 业务边界

- 只允许读取设备、属性、历史数据和事件。
- 禁止调用创建、修改、确认或删除资源的工具，禁止操作设备。
- 工具失败或没有数据时说明原因，不以演示数据替代真实数据。
- 输出证据应包含设备路径、指标、数值、单位和时间，不输出 API Key。
```

工具名称与参数说明见 [15.2 MCP 接口](02-mcp-interface.md)，实际可用工具以连接后的 MCP 工具列表为准。按官方规范，Agent frontmatter 不自行添加 `tools` 字段，工具权限由 WorkBuddy 分配。

### 15.6.6.5 打包、验证与发布

文件准备完成后，按以下步骤检查并发布专家：

1. 检查 JSON 语法、Agent frontmatter、路径引用、头像和双语展示字段。确认包内不包含真实 API Key，连接器依赖为 `tdengine`。
2. 将完整目录压缩为 ZIP，保留隐藏目录 `.codebuddy-plugin`。在 `equipment-inspector` 的上一级目录执行以下命令；Windows 可使用压缩工具打包同一目录：

   ```bash
   zip -r equipment-inspector.zip equipment-inspector
   unzip -l equipment-inspector.zip
   ```

3. 在压缩包清单中确认存在 `equipment-inspector/.codebuddy-plugin/plugin.json`、`agents/equipment-inspector.md` 和 `avatars/expert.png` 对应的文件。不要只压缩 `agents` 或将全部文件平铺。
4. 登录 [WorkBuddy 开放平台](https://open.workbuddy.cn/docs/what-is-open-platform)，按[入驻指南](https://open.workbuddy.cn/docs/onboarding)完成个人或企业开发者认证。在专家业务中创建专家，上传 ZIP 并核对平台解析出的展示信息；解析失败时按官方专家开发指南检查目录结构和配置字段。
5. 按平台提供的测试流程，在 WorkBuddy 中召唤该专家。检查依赖引导能否连接 TDengine，依次验证“未指定设备时澄清”“指定设备最近 24 小时巡检”“数据缺失或连接失败时说明原因”。将返回的设备路径、指标、时间范围与事件和 IDMP 中的数据对照。
6. 确认专家调用了 TDengine 只读工具，输出包含真实证据，并且没有创建、修改、确认或删除 IDMP 资源。验证完成后，在开放平台提交审核；审核通过并发布后，可在专家市场找到并召唤该专家。其他用户首次使用时，仍需配置自己的 TDengine 连接信息与 API Key。
7. 后续修改工作流程或展示信息时递增 `version`，重新打包、验证并提交审核。

:::note

专家的市场展示、创建入口与开放平台流程可能随 WorkBuddy 版本调整，以[官方专家开发指南](https://open.workbuddy.cn/docs/expert)和当前客户端、平台页面为准。

:::

### 15.6.6.6 常见问题

以下检查项用于排查专家包与 TDengine 依赖的常见问题：

| 现象 | 检查与处理 |
|---|---|
| 上传 ZIP 后解析失败 | 检查 `.codebuddy-plugin/plugin.json` 是否包含在压缩包内，JSON 是否有效，必填字段和文件路径是否完整 |
| 召唤时未引导连接 TDengine | 检查 `dependencies.connectors` 是否为 `["tdengine"]`，确认客户端中存在 TDengine 连接器 |
| 专家无法读取数据 | 按 15.6.3 节检查连接状态、服务地址和 API Key，并确认当前用户对目标设备具备访问权限 |
| 专家没有遵循巡检流程 | 检查 `agentName`、`agents` 路径和 Agent 的 `name` 是否一致，确认已加载更新后的专家版本 |
| 专家声称设备正常但未返回数据 | 要求说明数据覆盖率、最新时间戳和缺失情况，将“无数据”作为巡检限制处理 |
