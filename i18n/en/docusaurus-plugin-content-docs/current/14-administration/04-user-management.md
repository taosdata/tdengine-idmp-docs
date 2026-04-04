---
title: User Management
sidebar_label: User Management
---

# 14.4 User Management

User management is accessed from **Admin Console → User Management**. It covers users, roles, and single sign-on (SSO) configuration.

## 14.4.1 Users

TDengine IDMP uses email addresses as user IDs. The first user to activate or register the system automatically becomes the Super Admin.

### 14.4.1.1 Inviting Users

To add a new user, go to **Admin Console → User Management → Users** and click **+** in the top-right corner. Fill in the following fields:

<table>
<colgroup><col style="width:5em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Email</strong></td><td>The new user's email address (used as their login ID)</td></tr>
<tr><td><strong>Roles</strong></td><td>One or more roles to assign, each with a configurable set of accessible elements</td></tr>
</tbody>
</table>

The invited user receives an email with a link to set their personal information and password.

The users list shows:

<table>
<colgroup><col style="width:9em"/><col/></colgroup>
<thead><tr><th>Column</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>First Name</strong></td><td>User's first name</td></tr>
<tr><td><strong>Last Name</strong></td><td>User's last name</td></tr>
<tr><td><strong>Phone Number</strong></td><td>Optional phone number</td></tr>
<tr><td><strong>Email</strong></td><td>Email address (used as the user ID)</td></tr>
<tr><td><strong>Status</strong></td><td>Account status (e.g., Active, Invited)</td></tr>
<tr><td><strong>Roles</strong></td><td>Assigned roles</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description</td></tr>
</tbody>
</table>

### 14.4.1.2 Controlling Element Access per Role Assignment

When assigning a role to a user, you can also restrict which elements that user can access under that role. This is done through the **Resource Configuration** dialog, opened by clicking the **Elements Allowed to Access** column for a role row.

The dialog shows two panels:

- **Left panel:** The full element tree. Check the top-level element nodes you want to grant access to. Checking a node gives the user access to that node and all elements below it in the hierarchy.
- **Right panel:** A live preview of the selected elements.

**Example:** If you assign a user the *Data Analysts* role and check only **Utilities** in the Resource Configuration dialog, that user will be able to see and work with the entire Utilities element subtree but will have no visibility into other top-level elements such as Oil Field. The unselected elements are completely hidden from the user's asset tree — they will not appear at all in the Explorer or any related dashboards, analyses, or events.

A user can hold multiple roles, each with its own element access configuration. The user's effective element access is the union of all granted top-level nodes across all their roles.

Built-in roles available for assignment:

<table>
<colgroup><col style="width:19em"/><col/></colgroup>
<thead><tr><th>Role</th><th>Typical Use</th></tr></thead>
<tbody>
<tr><td><strong>Plant Managers and Supervisors</strong></td><td>Operational oversight across production assets</td></tr>
<tr><td><strong>IT/OT System Administrators</strong></td><td>Infrastructure and system configuration</td></tr>
<tr><td><strong>Maintenance Personnel</strong></td><td>Equipment maintenance and work orders</td></tr>
<tr><td><strong>Data Analysts</strong></td><td>Data exploration, dashboards, and reporting</td></tr>
<tr><td><strong>Operations Personnel</strong></td><td>Day-to-day plant operations</td></tr>
<tr><td><strong>Process Engineers</strong></td><td>Process optimization and analysis</td></tr>
<tr><td><strong>Super Admin</strong></td><td>Full system administration</td></tr>
</tbody>
</table>

### 14.4.1.3 Password Reset

Any user can reset their own password from the login page by clicking **Forgot Password**. A reset link is sent by email. For security, the Super Admin cannot reset another user's password.

:::note
Ensure `tda.server-url` in `config/application.yml` is set to an externally accessible URL or IP address. If it is not configured correctly, invited users will not be able to follow the email link to access IDMP.
:::

## 14.4.2 Roles

IDMP uses role-based access control (RBAC). Each role grants view, add, delete, and edit permissions on one or more resource types. A user can hold multiple roles; their effective permissions are the union of all assigned roles.

The system includes several built-in roles. You can also create custom roles by clicking **+** on the roles list page.

**Resources covered by role permissions include:** Element Templates, AI features, Event Templates, Enumeration Sets, Analyses, External Tables, Email Configuration, Notification Rule Templates, Dashboard Templates, Data Backup, Dashboards, Elements, OAuth, Users, Roles, UOM, Panel Templates, Data In, and more.

### 14.4.2.1 Element-Level Access Control

Because elements are organized in a tree hierarchy, element access is controlled separately from other permissions. Even if a role grants access to elements in general, each user's element visibility is further narrowed down to specific top-level nodes configured during invitation or user editing.

Elements that a user cannot access are completely invisible in the asset tree — they do not appear even as collapsed nodes. Attributes, analyses, events, panels, and dashboards linked to inaccessible elements are equally hidden, ensuring strong data isolation between teams, sites, or business units.

## 14.4.3 Single Sign-On (OAuth 2.0)

IDMP supports OAuth 2.0 SSO. OAuth configurations are managed under **Admin Console → User Management → OAuth**.

### 14.4.3.1 Creating an OAuth Configuration

Click **+** to add a new OAuth provider. Fill in the following fields:

<table>
<colgroup><col style="width:15em"/><col/><col/></colgroup>
<thead><tr><th>Field</th><th>Required</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Icon</strong></td><td>Yes</td><td>Provider logo image (PNG, JPG, or SVG). Shown on the login page.</td></tr>
<tr><td><strong>Name</strong></td><td>Yes</td><td>Display name for the OAuth option (e.g., <code>GitHub</code>, <code>TAOS</code>).</td></tr>
<tr><td><strong>Client ID</strong></td><td>Yes</td><td>Application identifier registered with the OAuth provider.</td></tr>
<tr><td><strong>Client Secret</strong></td><td>Yes</td><td>Secret key obtained from the OAuth provider's developer console.</td></tr>
<tr><td><strong>Authorize URL</strong></td><td>Yes</td><td>The OAuth 2.0 authorization endpoint URL (<code>http://</code> or <code>https://</code>).</td></tr>
<tr><td><strong>Token URL</strong></td><td>Yes</td><td>The token exchange endpoint URL (<code>http://</code> or <code>https://</code>).</td></tr>
<tr><td><strong>User Info URL</strong></td><td>Yes</td><td>The endpoint for retrieving user profile information.</td></tr>
<tr><td><strong>Redirect URL</strong></td><td>Yes</td><td>The callback URL registered with the provider (e.g., <code>http://localhost:6042/login/back</code>). Must exactly match the registered value.</td></tr>
<tr><td><strong>Scope</strong></td><td>No</td><td>Permission scopes requested (e.g., <code>openid email profile</code>).</td></tr>
<tr><td><strong>User Info Mapping Type</strong></td><td>Yes</td><td>How to extract user fields from the provider's response: <code>GITHUB</code>, <code>LARK</code>, or <code>CUSTOM</code>.</td></tr>
<tr><td><strong>Custom Mapping Rules</strong></td><td>When CUSTOM</td><td>JSON object defining JSONPath expressions to extract <code>name</code>, <code>email</code>, and optional fields.</td></tr>
<tr><td><strong>Roles</strong></td><td>Yes</td><td>Roles assigned to users who log in through this OAuth provider.</td></tr>
</tbody>
</table>

### 14.4.3.2 Custom Mapping Rules

When **User Info Mapping Type** is `CUSTOM`, provide a JSON object mapping field names to JSONPath expressions:

```json
{
  "name": "$.username",
  "email": "$.email",
  "nickname": "$.display_name",
  "phone": "$.contact.mobile",
  "description": "$.bio"
}
```

The `name` and `email` fields are required. All others are optional.

### 14.4.3.3 Setup Steps

1. Register your application in the OAuth provider's developer console and obtain the Client ID, Client Secret, and configure the Redirect URL.
2. In IDMP, go to **Admin Console → User Management → OAuth** and click **+**.
3. Fill in all required fields and click **Save**.
4. Sign out and verify the new login option appears on the login page.
