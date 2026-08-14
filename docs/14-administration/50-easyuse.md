---
title: 通过自然语言一键式搭建 TDengine Demo
sidebar_label: 通过自然语言一键式搭建 TDengine Demo
---
# 14\.14 通过自然语言一键式搭建 TDengine Demo

TDengine EasyUse 是一个面向 TDengine 的"一键式"自动化编排技能。用户只需用自然语言描述业务场景（例如：污水处理厂智能监控），即可自动完成**数据建模 → 资产目录构建 → 实时分析规则设置 → 可视化面板配置**的完整链路。

本章介绍该技能的核心价值、环境准备、部署步骤与实战案例。完成本章操作后，读者可在本机独立复现一个完整的行业 Demo。

|章节|说明|
|---|---|
|**14\.14\.1 核心价值**|EasyUse 解决的痛点与目标用户|
|**14\.14\.2 环境与前置条件**|硬件、软件要求|
|**14\.14\.3 部署 TDengine**|通过 All\-in\-One 一键部署基础环境|
|**14\.14\.4 创建 API Key**|为 MCP 调用准备鉴权凭据|
|**14\.14\.5 编写 login\.txt**|提供 EasyUse 运行所需的登录信息|
|**14\.14\.6 安装智能体**|安装智能体并选择适当的模型|
|**14\.14\.7 部署 EasyUse 技能包**|拉取仓库并放入智能体对应的 Skills 目录|
|**14\.14\.8 配置 MCP 服务器**|配置智能体链接 MCP 服务器 |
|**14\.14\.9 一键生成 Demo**|使用自然语言一键生成完整 Demo|
|**14\.14\.10 实战案例：污水处理厂**|Demo 生成结果详解|

> **备注** 本章操作示例默认在单机环境执行，服务地址统一使用 [http://localhost:6042](http://localhost:6042)。如从其他机器访问，请将 [localhost](http://localhost) 替换为部署节点的主机名或 IP。

---

## 14\.14\.1 核心价值

以往搭建工业互联网平台的演示系统至少经历四个手工步骤：

1. **业务需求侧的前置定义：** 业务团队需首先完成应用场景的系统化梳理、关键监控对象的识别，以及核心指标体系的定义，明确建设范围与目标；

2. **技术语言的转化与映射：** 技术团队需将业务侧的诉求转化为平台可执行的数据模型，完成从业务语义到技术结构的精准映射；

3. **平台层面的多环节实施：** 系统建设涉及资产结构配置、数据采集接入、告警规则设置以及监控面板搭建等多个关键环节，工作量较为集中；

4. **跨团队的反复沟通确认：** 业务方与技术方之间通常需要进行多轮需求确认与迭代调整，方可形成可交付的系统形态。

整套流程走下来，有经验的团队也需要花费数天甚至数周的时间。

TDengine EasyUse 将上述工作压缩为**一句自然语言**：客户或售前工程师只需描述业务场景（例如"污水处理厂智能监控"），技能会自动完成建模、资产树、可视化面板、**实时分析**的全部创建工作，将 Demo 的交付时间从"数天"缩短到"几十分钟"，对内部汇报、方案评审、项目立项，它完全够用。

**目标用户**

|角色|使用场景|
|---|---|
|**客户 / 试用者**|希望快速看到"这个系统能为我做什么"，绕过繁琐配置直达业务效果|
|**售前工程师**|面对客户零散的 Excel/CSV 与口头需求，快速交付一个可演示的完整系统|
|**实施顾问**|在真实项目落地前，先用自然语言生成一版 Demo 结构，再基于该结构做微调|

---

## 14\.14\.2 环境与前置条件

在开始部署前，请准备好如下环境：

|类别|要求|
|---|---|
|**操作系统**|Linux（推荐）、macOS，或 Windows \+ WSL|
|**权限**|Linux 需 root；Windows 需管理员权限（用于 All\-in\-One 部署）|
|**CPU**|x64，arm 且支持 AVX2（TDgpt 依赖）|
|**端口**|6042、6030、6038、6055、6060|

---

## 14\.14\.3 部署 TDengine

EasyUse 的所有能力都通过 MCP 调用 TDengine IDMP 后端接口来实现，因此**必须先有一套可访问的 TDengine 环境**。

推荐使用 TDengine All\-in\-One 一键部署，参考[第 14\.13 节](https://idmpdocs.taosdata.com/administration/all-in-one-deploy/)。

**14\.14\.3\.1 部署步骤**

1. 访问 TDengine 下载中心，获取 All\-in\-One 安装脚本；

2. 执行一键部署命令，脚本会自动下载依赖包并在本机安装 TDengine 的全部组件；

3. 部署完成后，在浏览器中打开：

```Plain Text
http://localhost:6042
```

4. 使用初始账号登录，按照页面提示激活产品许可（详见[第 14\.12 节 许可管理](https://idmpdocs.taosdata.com/administration/activate/)）。

> **备注** 如不需要 TDmodel，可继续使用默认的 deployment\-single\-node\-no\-tdmodel\.yaml 清单。EasyUse 本身不依赖 TDmodel。

---

## 14\.14\.4 创建 API Key

EasyUse 通过 MCP 协议调用 TDengine IDMP，鉴权方式为在请求头中携带用户级 API Key。创建方式参考[第 14\.8\.3 节](https://idmpdocs.taosdata.com/administration/profile-settings/)。

**14\.14\.4\.1 操作步骤**

1. 登录 TDengine IDMP，点击右上角**头像 → 顶部账户项**；

2. 切换到 **API Key** 页签，点击 **新增 API Key**；

3. 输入唯一标题（例如 idmp\-easyuse），选择**永不过期**或指定到期日期；

4. 点击 **创建**，系统弹出对话框显示完整 API Key（形如 api\_xxxxxx）；

5. **立即复制并妥善保存**——列表页后续仅显示掩码。

> **备注** API Key 继承创建者的角色权限与元素访问范围。若后续被删除或所属用户被停用，API Key 立即失效。请求头格式固定为 Authorization: Bearer \<api\_\.\.\.\>，其中 **不需要**手动加 Bearer 前缀到 Key 本身。

---

## 14\.14\.5 修改登录信息文件

EasyUse 在执行过程中需要读取一份纯文本的登录信息文件，用于在需要写库/建模型时携带真实凭据。

默认在 idmp\-easyuse 目录下打开 logint\_info\.txt，并根据真实用户信息修改：

```Plain Text
TDengine IDMP:
host:     localhost
port:     6042
user:     <用户名>
password: <密码>
api_key:  <API Key>
```

字段与 TDengine IDMP 登录页一一对应，api\_key 使用 14\.14\.4 中创建的完整值。

---

## 14\.14\.6 安装智能体

TDengine Easyuse 可通过各种支持 Skill 的智能体运行，例如：Claude Code, Codex, OpenCode, WorkBuddy等。智能体负责解析自然语言、调度技能完成任务。

本文档使用 OpenCode 为例：

**14\.14\.6\.1 Linux / macOS 安装**

在终端执行：

```Plain Text
curl -fsSL https://opencode.ai/install | bash
source ~/.bashrc         # 或 ~/.zshrc，取决于所用 Shell
```

**14\.14\.6\.2 Windows 安装**

Windows 环境下 OpenCode 官方推荐在 **WSL** 中安装使用，避免在 PowerShell 原生环境中遇到路径与 Shell 兼容性问题，在 WSL 环境内按上述 Linux 流程安装。如需原生桌面版，从 OpenCode GitHub Release 页面下载 opencode\-desktop\-windows\-x64\.exe。

**14\.14\.6\.3 首次启动与模型选择**

1. 在终端运行：

```Plain Text
opencode
```

![OpenCode初始界面](./images/easyuse-open-opencode.png)

2. 在 OpenCode 交互界面输入初始化命令（可选，首次使用建议执行）：

```Plain Text
/init
```

![初始化OpenCode](./images/easyuse-init-opencode.png)

3. 使用 /models 打开模型列表，选择一个大语言模型，例如：

```Plain Text
DeepSeek V4 Flash
```

![选择模型](./images/easyuse-select-model.png)

> **备注** 若模型列表为空，请先在 OpenCode 中配置模型 Provider 的 API Key（详见 OpenCode 官方文档）。EasyUse 对模型无强绑定，任何支持工具调用（Tool Use）的模型均可。

---

## 14\.14\.7 部署 EasyUse 技能包

EasyUse 由三个协同工作的技能组成，需要从内部 GitLab 拉取后放入 OpenCode 的技能目录 \.opencode/。

**14\.14\.7\.1 拉取仓库**

```Plain Text
git clone https://github.com/taosdata/agent-skills.git
cd agent-skills
```

**14\.14\.7\.2 复制技能到 OpenCode**

在你**运行 OpenCode 的工作目录**下执行（该目录会包含一个 \.opencode/ 子目录）：

```Plain Text
cp -r skills/idmp-easyuse                  .opencode/
cp -r skills/idmp-sample-data-generator    .opencode/
cp -r skills/idmp-structure-exporter       .opencode/
```

三个技能的分工如下：

|技能|作用|
|---|---|
|idmp\-easyuse|总编排调度器：需求解析 → 数据/资产建模 → 实时分析配置 → 可视化面板配置|
|idmp\-sample\-data\-generator|生成符合业务语义的资产目录和模拟时序数据|
|idmp\-structure\-exporter|导出/复用已建成的资产目录结构，便于迁移或复制|

**14\.14\.7\.3 验证技能加载**

回到 OpenCode 会话中执行：

```Plain Text
/skills
```

列表应包含 idmp\-easyuse、idmp\-sample\-data\-generator、idmp\-structure\-exporter 三项。

![确认skill](./images/easyuse-confirm-skill.png)

---

## 14\.14\.8 配置 IDMP MCP 服务器

EasyUse 需要通过 MCP 与 IDMP 通讯。修改 OpenCode 配置文件 \~/\.config/opencode/opencode\.json，在 mcp 段增加一条名为 idmp\-mcp 的服务器：

```Plain Text
{
  "mcp": {
    "idmp-mcp": {
      "type": "http",
      "url": "http://localhost:6042/api/v1/mcp/stream",
      "headers": {
        "Authorization": "Bearer api_your_api_key_here"
      }
    }
  }
}
```

**14\.14\.8\.1 字段说明**

|字段|值|
|---|---|
|**名称**|idmp\-mcp（EasyUse 技能内约定名称，请勿修改）|
|**URL**|http://\<idmp\-host\>:6042/api/v1/mcp/stream|
|**鉴权**|Authorization: Bearer \<14\.14\.4 中创建的 API Key\>|

> **备注** 若 IDMP 部署在其他机器，需将 [localhost](http://localhost) 替换为对应主机名或 IP，并确保 6042 端口对 OpenCode 所在机器可达。修改配置后重新启动 OpenCode 会话使其生效。

---

## 14\.14\.9 一键生成 Demo

在 OpenCode 会话中，用自然语言调用 EasyUse 技能。命令基础格式为：

```Plain Text
/idmp-easyuse <业务场景描述>。
```

请务必确保**不要**指定任何已存在的数据库！在执行过程中有删除指定数据库的风险。

**14\.14\.9\.1 完整示例**

```Plain Text
/idmp-easyuse 创建污水处理demo。
```

执行后，EasyUse 会依次进行：

1. 解析业务需求 → 生成"需求基准"（Requirement Baseline）；

2. 构建资产模型与资产树；

3. 生成模拟时序数据并写入；

4. 创建实时分析；

5. 创建可视化面板；

6. 输出一份 Demo 生成报告，包含所有创建对象的路径。

生成完成后，可直接在 [http://localhost:6042](http://localhost:6042) 中查看资产树、面板与告警。

---

## 14\.14\.10 实战案例：污水处理厂智能监控 Demo

以命令 /idmp\-easyuse 创建污水处理demo… 为例，EasyUse 一次性创建了如下对象：

请务必确保**不要**指定任何已存在的数据库！在执行过程中有删除指定数据库的风险。

![执行skill](./images/easyuse-run-skill.png)

**14\.14\.10\.1 数据建模（wastewater\_treatment 库）**

自动创建数据库 wastewater\_treatment，并设计 **7 个超级表**：

|超级表|采集内容|
|---|---|
|水质|pH、COD、氨氮、总磷、悬浮物等|
|流量|进出水口瞬时流量、累计流量|
|水泵|运行状态、电流、扬程|
|阀门|开度、开关状态|
|鼓风机|转速、风量、振动|
|加药|药剂类型、瞬时/累计投加量|
|能耗|有功功率、电度数|

**14\.14\.10\.2 资产树（5 大功能区，24 个节点）**

|功能区|典型节点|
|---|---|
|预处理区|格栅、沉砂池、初沉池|
|生化处理区|厌氧池、缺氧池、好氧池、二沉池|
|深度处理区|高效沉淀池、砂滤、消毒池|
|污泥处理区|污泥浓缩、脱水机、污泥泵|
|辅助系统|鼓风机房、加药间、配电、能耗|

**14\.14\.10\.3 可视化面板（6 个）**

例如：

- 好氧池溶解氧与 pH 监测

- 鼓风机运行状态监控

- 进出水水质对比

- 加药系统投加量趋势

- 污泥处理能耗分析

- 全厂关键指标总览

**14\.14\.10\.4 告警规则（8 项，分三级）**

|级别|示例规则|
|---|---|
|**Critical**|出水 COD 超标（连续 5 分钟 \> 阈值）、污泥泵压力过高|
|**Major**|好氧池溶解氧过低、鼓风机振动异常|
|**Warning**|进水流量突增、加药量偏离设定值|

所有告警自动带有表达式、阈值与持续时间参数，可在 IDMP 告警页面二次编辑。

---

TDengine Easyuse 将构建工业数据平台的过程，从“数天准备、多人协同、反复修改”，到 “30分钟量级、一句话启动、直接进入优化”，它所带来的变化已经不只是效率提升，而是项目启动逻辑本身的重构，它让行业专家的经验第一次能够更快地变成系统、变成结果、变成可验证的起点。
