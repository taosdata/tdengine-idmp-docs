---
title: 用户管理
sidebar_label: 用户管理
---

# 14.4 用户管理

用户管理通过**管理控制台 → 用户管理**访问，涵盖用户、角色和单点登录（SSO）配置。

## 14.4.1 用户

TDengine IDMP 使用电子邮件地址作为用户 ID。首位激活或注册系统的用户自动成为超级管理员。

### 14.4.1.1 邀请用户

添加新用户时，请前往**管理控制台 → 用户管理 → 用户**，点击右上角的 **+** 按钮，填写以下字段：

<table>
<colgroup><col style="width:5em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>邮箱</strong></td><td>新用户的电子邮件地址（用作登录 ID）</td></tr>
<tr><td><strong>角色</strong></td><td>分配的一个或多个角色，每个角色可配置可访问的元素范围</td></tr>
</tbody>
</table>

被邀请的用户将收到一封电子邮件，其中包含设置个人信息和密码的链接。

用户列表显示以下信息：

<table>
<colgroup><col style="width:7em"/><col/></colgroup>
<thead><tr><th>列</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>名</strong></td><td>用户名字</td></tr>
<tr><td><strong>姓</strong></td><td>用户姓氏</td></tr>
<tr><td><strong>电话号码</strong></td><td>可选电话号码</td></tr>
<tr><td><strong>邮箱</strong></td><td>电子邮件地址（用作用户 ID）</td></tr>
<tr><td><strong>状态</strong></td><td>账户状态（如：已激活、已邀请）</td></tr>
<tr><td><strong>角色</strong></td><td>已分配的角色</td></tr>
<tr><td><strong>描述</strong></td><td>可选描述</td></tr>
</tbody>
</table>

### 14.4.1.2 按角色分配控制元素访问权限

为用户分配角色时，可限制该用户在该角色下可访问的元素范围。操作方式为：点击角色行的**可访问元素**列，打开**资源配置**对话框。

对话框包含两个面板：

- **左侧面板：** 完整的元素树。勾选要授权访问的顶层元素节点。勾选某节点后，用户即可访问该节点及其层级下的所有元素。
- **右侧面板：** 已选元素的实时预览。

**示例：** 若为用户分配*数据分析师*角色，并在资源配置对话框中仅勾选**公用事业**，则该用户只能查看和操作公用事业元素子树，对其他顶层元素（如油田）无可见性。未选中的元素在资产树中完全隐藏——不会出现在资源浏览器或任何相关仪表盘、分析或事件中。

用户可持有多个角色，每个角色有独立的元素访问配置。用户的有效元素访问权限是所有角色授权顶层节点的并集。

可供分配的内置角色：

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>角色</th><th>典型用途</th></tr></thead>
<tbody>
<tr><td><strong>工厂经理与主管</strong></td><td>生产资产的运营监管</td></tr>
<tr><td><strong>IT/OT 系统管理员</strong></td><td>基础设施与系统配置</td></tr>
<tr><td><strong>维护人员</strong></td><td>设备维护与工单管理</td></tr>
<tr><td><strong>数据分析师</strong></td><td>数据探索、仪表盘与报表</td></tr>
<tr><td><strong>运营人员</strong></td><td>日常工厂操作</td></tr>
<tr><td><strong>工艺工程师</strong></td><td>工艺优化与分析</td></tr>
<tr><td><strong>超级管理员</strong></td><td>完整的系统管理权限</td></tr>
</tbody>
</table>

### 14.4.1.3 密码重置

任何用户均可在登录页面点击**忘记密码**来重置自己的密码，系统将通过电子邮件发送重置链接。出于安全考虑，超级管理员无法重置其他用户的密码。

:::note
请确保 `config/application.yml` 中的 `tda.server-url` 配置为可从外部访问的 URL 或 IP 地址。若配置不正确，被邀请的用户将无法通过邮件链接访问 IDMP。
:::

## 14.4.2 角色

IDMP 使用基于角色的访问控制（RBAC）。每个角色对一种或多种资源类型授予查看、新增、删除和编辑权限。用户可持有多个角色，其有效权限为所有已分配角色的并集。

系统内置多个角色，也可在角色列表页点击 **+** 创建自定义角色。

**角色权限涵盖的资源包括：** 元素模板、AI 功能、事件模板、枚举集、分析、外部表、邮件配置、通知规则模板、仪表盘模板、数据备份、仪表盘、元素、OAuth、用户、角色、计量单位（UOM）、面板模板、数据导入等。

### 14.4.2.1 元素级访问控制

由于元素以树形层级组织，元素访问权限与其他权限分开控制。即使角色授予了对元素的总体访问权，每个用户的元素可见范围还会进一步限定在邀请或编辑用户时配置的特定顶层节点。

用户无法访问的元素在资产树中完全不可见——不会以折叠节点的形式出现。与不可访问元素关联的属性、分析、事件、面板和仪表盘同样被隐藏，从而实现跨团队、站点或业务单元的强数据隔离。

## 14.4.3 单点登录（OAuth 2.0）

IDMP 支持 OAuth 2.0 单点登录。OAuth 配置通过**管理控制台 → 用户管理 → OAuth** 进行管理。

### 14.4.3.1 创建 OAuth 配置

点击 **+** 添加新的 OAuth 提供商，填写以下字段：

<table>
<colgroup><col style="width:11em"/><col/><col/></colgroup>
<thead><tr><th>字段</th><th>必填</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>图标</strong></td><td>是</td><td>提供商 Logo 图片（PNG、JPG 或 SVG），显示在登录页面。</td></tr>
<tr><td><strong>名称</strong></td><td>是</td><td>OAuth 选项的显示名称（如 <code>GitHub</code>、<code>TAOS</code>）。</td></tr>
<tr><td><strong>客户端 ID</strong></td><td>是</td><td>在 OAuth 提供商处注册的应用程序标识符。</td></tr>
<tr><td><strong>客户端密钥</strong></td><td>是</td><td>从 OAuth 提供商开发者控制台获取的密钥。</td></tr>
<tr><td><strong>授权 URL</strong></td><td>是</td><td>OAuth 2.0 授权端点 URL（<code>http://</code> 或 <code>https://</code>）。</td></tr>
<tr><td><strong>Token URL</strong></td><td>是</td><td>Token 交换端点 URL（<code>http://</code> 或 <code>https://</code>）。</td></tr>
<tr><td><strong>用户信息 URL</strong></td><td>是</td><td>获取用户档案信息的端点。</td></tr>
<tr><td><strong>回调 URL</strong></td><td>是</td><td>在提供商处注册的回调 URL（如 <code>http://localhost:6042/login/back</code>），必须与注册值完全匹配。</td></tr>
<tr><td><strong>范围（Scope）</strong></td><td>否</td><td>请求的权限范围（如 <code>openid email profile</code>）。</td></tr>
<tr><td><strong>用户信息映射类型</strong></td><td>是</td><td>从提供商响应中提取用户字段的方式：<code>GITHUB</code>、<code>LARK</code> 或 <code>CUSTOM</code>。</td></tr>
<tr><td><strong>自定义映射规则</strong></td><td>CUSTOM 时必填</td><td>定义 JSONPath 表达式以提取 <code>name</code>、<code>email</code> 及可选字段的 JSON 对象。</td></tr>
<tr><td><strong>角色</strong></td><td>是</td><td>通过该 OAuth 提供商登录的用户所分配的角色。</td></tr>
</tbody>
</table>

### 14.4.3.2 自定义映射规则

当**用户信息映射类型**为 `CUSTOM` 时，提供一个将字段名映射到 JSONPath 表达式的 JSON 对象：

```json
{
  "name": "$.username",
  "email": "$.email",
  "nickname": "$.display_name",
  "phone": "$.contact.mobile",
  "description": "$.bio"
}
```

`name` 和 `email` 字段为必填项，其余字段为可选项。

### 14.4.3.3 配置步骤

1. 在 OAuth 提供商的开发者控制台中注册应用程序，获取客户端 ID、客户端密钥，并配置回调 URL。
2. 在 IDMP 中，前往**管理控制台 → 用户管理 → OAuth**，点击 **+**。
3. 填写所有必填字段，点击**保存**。
4. 退出登录，验证新的登录选项是否出现在登录页面。
