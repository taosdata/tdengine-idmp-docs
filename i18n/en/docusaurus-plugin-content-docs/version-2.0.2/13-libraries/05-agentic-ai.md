---
title: Agentic AI
sidebar_label: Agentic AI
---

# 13.5 Agentic AI

**Agentic AI** is the central entry point for managing reusable AI Agent capabilities in IDMP, covering two categories of resources: **Skills** and **MCP Templates**. Administrators define and maintain organization-level AI capabilities here, while users configure their own MCP connections based on these templates in [Profile Settings](../14-administration/08-profile-settings.md).

Agentic AI is managed under **Libraries → Agentic AI** and includes the following sub-pages:

| Sub-page       | Description                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| **Skills**     | Manage and configure skill files available to AI Agents                     |
| **MCP Templates** | Manage MCP server templates; users configure their own MCP connections based on templates in Profile Settings |

## 13.5.1 Skills

The Skills page is used to upload and manage skill files available to AI Agents. A skill defines the behavior patterns, tool invocations, and knowledge context that an Agent uses when performing specific tasks. Uploaded skills are loaded by the AI server and made available for on-demand invocation by all connected AI Agents.

### 13.5.1.1 Skill List

The list displays all uploaded skill files with the following information:

| Column      | Description                                     |
| ----------- | ----------------------------------------------- |
| **Name**    | Skill file name                                 |
| **Description** | Functional description of the skill         |
| **Type**    | Classification type of the skill                |
| **Enabled** | Whether the skill is active; controlled by a toggle |

### 13.5.1.2 Uploading Skills

Click **+** to upload a new skill file. After uploading, the skill appears in the list, and you can control its availability to AI Agents via the enable toggle.

## 13.5.2 MCP Templates

MCP templates define connection specifications for MCP servers, including connection type, address, request headers, and user-configurable variables. After an administrator creates a template, users fill in variable values in the [Agent tab of Profile Settings](../14-administration/08-profile-settings.md#1485-agent) to complete their personal MCP connection configuration.

### 13.5.2.1 MCP Template List

The list displays all defined MCP templates with the following columns:

| Column             | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| **Template Name**  | Unique name of the MCP template                                |
| **Description**    | Purpose description of the template                            |
| **Type**           | Connection type: `HTTP`, `SSE`, or `Command (stdio)`           |
| **Variable Count** | Number of user-configurable variables defined in the template  |
| **Enabled**        | Whether the template is active; controlled by a toggle         |

Click the **⋮** menu at the end of a row to edit or delete the template.

### 13.5.2.2 Creating an MCP Template

Click **+** to create a new MCP template. Fill in the following fields:

| Field                       | Description                                                       |
| --------------------------- | ----------------------------------------------------------------- |
| **Template Name** (required) | Unique name of the template. Cannot be changed after creation.   |
| **Description**             | Optional description of the template.                             |
| **Type** (required)         | Connection type: `HTTP`, `SSE`, or `Command (stdio)`.             |

Configure the corresponding connection parameters based on the selected type:

**HTTP / SSE types:**

| Field                | Description                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| **URL** (required)   | Connection address of the MCP server. Supports `${varName}` placeholders to reference variables.         |
| **Headers** (optional) | HTTP request headers in JSON format, e.g., `{"Authorization": "Bearer xxx"}`. Supports `${varName}` placeholders. |

**Command (stdio) type:**

| Field                   | Description                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| **Command** (required)  | Startup command for the MCP server, e.g., `npx @scope/server-foo`. Supports `${varName}` placeholders.   |

### 13.5.2.3 Variable Definition

Templates can define variables whose specific values are filled in by users when configuring their personal MCP connections. Each variable includes:

| Field            | Description                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| **Variable Name** | Identifier of the variable, referenced in URLs and headers via `${varName}` |
| **Description**  | Purpose description of the variable, helping users understand what value to provide |

Templates with a variable count greater than zero display a corresponding count indicator in the list. When users configure MCP connections in Profile Settings, the system prompts them to fill in all variable values. Templates with zero variables are considered "auto-available" and require no additional user configuration.

### 13.5.2.4 Editing and Deleting

- **Edit:** Click **Edit** in the **⋮** menu at the end of a row to modify all fields except the name.
- **Delete:** Click **Delete** in the **⋮** menu at the end of a row and confirm to remove the template.

### 13.5.2.5 Using MCP Templates

MCP templates are maintained centrally by administrators. After signing in, users can see all enabled templates in the **Profile Settings → Agent** tab and fill in variable values as needed to complete their MCP connection configuration. For detailed steps, see [Section 14.8.5 Agent Tab](../14-administration/08-profile-settings.md#1485-agent).
