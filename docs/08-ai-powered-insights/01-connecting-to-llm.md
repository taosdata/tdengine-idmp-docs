---
title: 连接大语言模型
sidebar_label: 连接大语言模型
---

# 8.1 连接大语言模型

IDMP 中的大多数 AI 功能——面板生成、分析建议、AI 问答、根因分析——都需要连接外部大语言模型（LLM）。IDMP 使用 OpenAI 兼容接口，因此任何提供 OpenAI 兼容 API 的大语言模型服务商或自托管模型均可使用。

## 8.1.1 内置试用连接

IDMP 内置了一个在安装后 15 天内有效的试用 AI 连接。在试用期内，所有依赖大语言模型的 AI 功能无需任何配置即可立即使用。试用到期后，您必须配置自己的 AI 连接才能继续使用这些功能。

基于 TDgpt 的功能（异常检测、预测、缺失数据填补）与大语言模型连接无关，它们需要与 IDMP 一同安装 TDgpt 模块。

## 8.1.2 配置 AI 连接

AI 连接在系统设置的**连接管理**部分进行管理，与 TDengine 数据连接并列。

添加或编辑 AI 连接的步骤：

1. 导航至**设置** → **连接管理**。
2. 点击 **+ 添加连接**，选择 **AI** 连接类型。
3. 填写连接字段：

| 字段 | 说明 |
|---|---|
| **连接名称** | 用于标识此 AI 连接的唯一名称 |
| **API 端点** | OpenAI 兼容 API 的基础 URL（例如 `https://api.openai.com/v1`） |
| **API 密钥** | API 的身份验证密钥。对于不需要身份验证的本地部署，留空即可。 |
| **问答模型** | 用于标准自然语言查询及面板/分析生成的模型（例如 `gpt-4o`） |
| **深度思考模型** | 用于需要扩展推理的复杂分析任务的模型，例如根因分析（例如 `o1` 或 `o3`） |

4. 点击**测试连接**以验证端点和凭证。
5. 点击**保存**。

## 8.1.3 双模型配置

IDMP 从同一 AI 连接中使用两个独立的模型：

- **问答模型** — 处理日常交互：回答自然语言查询、生成面板建议、创建分析配置以及叙述面板洞察。该模型应具备速度快、成本低的特点。
- **深度思考模型** — 处理受益于扩展推理链的计算密集型任务，最典型的是根因分析。该模型可以更慢、更昂贵；仅在明确请求深度分析时才会被调用。

在 AI 问答界面中，用户可以切换**深度思考**模式，将查询路由到深度思考模型而非问答模型。

## 8.1.4 本地部署

对于运行自托管大语言模型（如本地部署的 Ollama 或 vLLM 实例）的组织，将 **API 端点**设置为本地服务 URL，如果服务不需要身份验证则将 **API 密钥**留空。只要服务公开 OpenAI 兼容的 API，所有 IDMP AI 功能均可正常工作，无需任何修改。

## 8.1.5 TLS/SSL 配置

当 AI 服务器使用自签名证书或私有 CA 签发的证书时，IDMP 默认的 TLS 验证会失败（PKIX path building failed）。需要通过环境变量配置自定义 CA 证书或跳过验证。

### 环境变量

| 环境变量 | 说明 | 默认值 |
|---|---|---|
| `IDMP_TLS_CA_BUNDLE` | 自定义 CA 证书路径，支持冒号分隔的多路径、目录扫描和混合文件+目录模式 | 空（使用系统默认信任链） |
| `IDMP_TLS_SKIP_VERIFY` | 设为 `true` 跳过 TLS 证书验证（仅建议开发/测试环境使用） | 空（不跳过） |

两个变量均支持通过同名 Java 系统属性（System Property）回退。

### IDMP_TLS_CA_BUNDLE 使用方式

**单个 PEM 文件：**

```bash
export IDMP_TLS_CA_BUNDLE=/etc/idmp/certs/ca.pem
```

**多个文件（冒号分隔）：**

```bash
export IDMP_TLS_CA_BUNDLE=/etc/idmp/certs/ca1.pem:/etc/idmp/certs/ca2.crt
```

**目录扫描**（自动发现目录下所有 `.pem` 和 `.crt` 文件）：

```bash
export IDMP_TLS_CA_BUNDLE=/etc/idmp/certs/
```

**混合模式：**

```bash
export IDMP_TLS_CA_BUNDLE=/etc/idmp/certs/ca.pem:/etc/idmp/certs/extra/
```

### IDMP_TLS_SKIP_VERIFY 使用方式

```bash
export IDMP_TLS_SKIP_VERIFY=true
```

> **注意**：`IDMP_TLS_SKIP_VERIFY` 仅建议在开发或测试环境使用。生产环境应通过 `IDMP_TLS_CA_BUNDLE` 配置正确的 CA 证书。

### Docker Compose 配置示例

```yaml
services:
  idmp:
    image: tdengine/idmp:latest
    environment:
      - IDMP_TLS_CA_BUNDLE=/etc/idmp/certs/ca.pem
      # - IDMP_TLS_SKIP_VERIFY=true  # 仅开发环境
    volumes:
      - /path/to/certs:/etc/idmp/certs:ro
```

### 配置说明

IDMP 采用 **Composite TrustManager** 策略：优先使用系统信任链验证，失败后自动回退到自定义 CA 证书进行验证。这意味着即使配置了自签名证书，系统 CA 库中的公开证书仍然有效，不会影响对其他服务的 TLS 连接。

## 8.1.6 关闭 AI 功能

如需在全系统范围内关闭 AI 功能，点击浏览器右上角的头像图标，进入**管理后台**（Admin Console），将 AI 连接暂停或删除即可。

您也可以在分析列表或面板列表页直接关闭 AI 推荐。
