---
title: User Management
sidebar_label: User Management
---

# 14.4 User Management

User management is accessed from **Admin Console → User Management**. It covers users, roles, and single sign-on (SSO) configuration.

## Users

TDengine IDMP uses email addresses as user IDs. The first user to activate or register the system automatically becomes the Super Admin.

### Inviting Users

To add a new user, go to **Admin Console → User Management → Users** and click **+** in the top-right corner. Fill in the following fields:

| Field | Description |
|---|---|
| **Email** | The new user's email address (used as their login ID) |
| **Roles** | One or more roles to assign, each with a configurable set of accessible elements |

The invited user receives an email with a link to set their personal information and password.

The users list shows:

| Column | Description |
|---|---|
| **First Name** | User's first name |
| **Last Name** | User's last name |
| **Phone Number** | Optional phone number |
| **Email** | Email address (used as the user ID) |
| **Status** | Account status (e.g., Active, Invited) |
| **Roles** | Assigned roles |
| **Description** | Optional description |

### Controlling Element Access per Role Assignment

When assigning a role to a user, you can also restrict which elements that user can access under that role. This is done through the **Resource Configuration** dialog, opened by clicking the **Elements Allowed to Access** column for a role row.

The dialog shows two panels:

- **Left panel:** The full element tree. Check the top-level element nodes you want to grant access to. Checking a node gives the user access to that node and all elements below it in the hierarchy.
- **Right panel:** A live preview of the selected elements.

**Example:** If you assign a user the *Data Analysts* role and check only **Utilities** in the Resource Configuration dialog, that user will be able to see and work with the entire Utilities element subtree but will have no visibility into other top-level elements such as Oil Field. The unselected elements are completely hidden from the user's asset tree — they will not appear at all in the Explorer or any related dashboards, analyses, or events.

A user can hold multiple roles, each with its own element access configuration. The user's effective element access is the union of all granted top-level nodes across all their roles.

Built-in roles available for assignment:

| Role | Typical Use |
|---|---|
| **Plant Managers and Supervisors** | Operational oversight across production assets |
| **IT/OT System Administrators** | Infrastructure and system configuration |
| **Maintenance Personnel** | Equipment maintenance and work orders |
| **Data Analysts** | Data exploration, dashboards, and reporting |
| **Operations Personnel** | Day-to-day plant operations |
| **Process Engineers** | Process optimization and analysis |
| **Super Admin** | Full system administration |

### Password Reset

Any user can reset their own password from the login page by clicking **Forgot Password**. A reset link is sent by email. For security, the Super Admin cannot reset another user's password.

:::note
Ensure `tda.server-url` in `config/application.yml` is set to an externally accessible URL or IP address. If it is not configured correctly, invited users will not be able to follow the email link to access IDMP.
:::

## Roles

IDMP uses role-based access control (RBAC). Each role grants view, add, delete, and edit permissions on one or more resource types. A user can hold multiple roles; their effective permissions are the union of all assigned roles.

The system includes several built-in roles. You can also create custom roles by clicking **+** on the roles list page.

**Resources covered by role permissions include:** Element Templates, AI features, Event Templates, Enumeration Sets, Analyses, External Tables, Email Configuration, Notification Rule Templates, Dashboard Templates, Data Backup, Dashboards, Elements, OAuth, Users, Roles, UOM, Panel Templates, Data In, and more.

### Element-Level Access Control

Because elements are organized in a tree hierarchy, element access is controlled separately from other permissions. Even if a role grants access to elements in general, each user's element visibility is further narrowed down to specific top-level nodes configured during invitation or user editing.

Elements that a user cannot access are completely invisible in the asset tree — they do not appear even as collapsed nodes. Attributes, analyses, events, panels, and dashboards linked to inaccessible elements are equally hidden, ensuring strong data isolation between teams, sites, or business units.

## Single Sign-On (OAuth 2.0)

IDMP supports OAuth 2.0 SSO. OAuth configurations are managed under **Admin Console → User Management → OAuth**.

### Creating an OAuth Configuration

Click **+** to add a new OAuth provider. Fill in the following fields:

| Field | Required | Description |
|---|:---:|---|
| **Icon** | Yes | Provider logo image (PNG, JPG, or SVG). Shown on the login page. |
| **Name** | Yes | Display name for the OAuth option (e.g., `GitHub`, `TAOS`). |
| **Client ID** | Yes | Application identifier registered with the OAuth provider. |
| **Client Secret** | Yes | Secret key obtained from the OAuth provider's developer console. |
| **Authorize URL** | Yes | The OAuth 2.0 authorization endpoint URL (`http://` or `https://`). |
| **Token URL** | Yes | The token exchange endpoint URL (`http://` or `https://`). |
| **User Info URL** | Yes | The endpoint for retrieving user profile information. |
| **Redirect URL** | Yes | The callback URL registered with the provider (e.g., `http://localhost:6042/login/back`). Must exactly match the registered value. |
| **Scope** | No | Permission scopes requested (e.g., `openid email profile`). |
| **User Info Mapping Type** | Yes | How to extract user fields from the provider's response: `GITHUB`, `LARK`, or `CUSTOM`. |
| **Custom Mapping Rules** | When CUSTOM | JSON object defining JSONPath expressions to extract `name`, `email`, and optional fields. |
| **Roles** | Yes | Roles assigned to users who log in through this OAuth provider. |

### Custom Mapping Rules

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

### Setup Steps

1. Register your application in the OAuth provider's developer console and obtain the Client ID, Client Secret, and configure the Redirect URL.
2. In IDMP, go to **Admin Console → User Management → OAuth** and click **+**.
3. Fill in all required fields and click **Save**.
4. Sign out and verify the new login option appears on the login page.
