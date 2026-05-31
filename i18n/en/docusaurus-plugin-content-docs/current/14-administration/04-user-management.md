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

| Field | Description |
|---|---|
| **Email** | The new user's email address (used as their login ID) |
| **Roles** | One or more roles to assign, each with a configurable set of accessible elements |

The invited user receives an email with a link to set their personal information and password. IDMP first creates the account in the **Invited** state. The account becomes **Active** only after the user completes activation.

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

### 14.4.1.2 Controlling Element Access per Role Assignment

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

### 14.4.1.3 Password Reset

Any user can reset their own password from the login page by clicking **Forgot Password**. A reset link is sent by email. Only **Active** users can receive password-reset emails. For security reasons, the Super Admin cannot directly reset another user's password.

:::note
Ensure `tda.server-url` in your deployment configuration is set to an externally accessible URL or IP address. If it is not configured correctly, invited users will not be able to follow the email link to access IDMP.
:::

## 14.4.2 User Groups

User groups are used to manage users as a group and assign roles in bulk. In addition to flat grouping, user groups support tree hierarchies (for example: Group → Division → Plant → Workshop) so you can map real organizational structures and inherit permissions by level.

### 14.4.2.1 Creating and Editing User Groups

In **Admin Console → User Management → User Groups**, click **+** to create a user group, or edit an existing group from the list. Common fields are:

| Field | Description |
|---|---|
| **Name** | User group name. Must be unique under the same parent group; identical names are allowed in different branches. |
| **Description** | Optional notes to distinguish business purpose. |
| **Parent Group** | Optional. Used to build the group hierarchy. If left empty, the group is created as a root group. |

When creating or editing a group, you can also maintain members and roles in the same operation. Changes take effect after save. After a child group is created, its members can inherit roles granted to the parent group and upstream groups.

### 14.4.2.2 Managing User Group Members

In the members area of the group detail or edit page, you can:

- Add members: add one or more users to the current group.
- Remove members: remove users from the current group.

When membership changes, permissions obtained through that group are updated accordingly.

### 14.4.2.3 Managing User Group Roles

In the roles area of the group detail or edit page, you can assign or remove roles for the group:

- After a role is assigned, group members inherit that role.
- After a role is removed, members lose that role if it was inherited from this group.

Users can belong to multiple groups, and their effective permissions are the union of all permission sources.

When the same user gets roles through multiple group paths, the system merges all available permissions.

### 14.4.2.4 Hierarchy and Deletion Rules

User groups support parent-child hierarchies, which are suitable for structures such as enterprise, plant, and workshop. Keep the following in mind:

- Child groups can inherit roles granted by parent groups.
- You can move a user group under a new parent group to match organizational changes.
- You cannot move a user group under itself or any of its descendants.
- Before deleting a group, handle its child groups first; a parent group with children cannot be deleted directly.
- It is recommended to clean up and adjust in this order: children first, then parent.

### 14.4.2.5 User-Centric Group Membership View

On the user details page, you can see the user's group memberships, including direct membership and inherited membership. When editing a user, you can add the user to or remove the user from specific groups, so organizational membership and permission sources can be managed from the user perspective.

## 14.4.3 Roles

IDMP uses role-based access control (RBAC). Each role grants view, add, delete, and edit permissions on one or more resource types. A user can hold multiple roles; their effective permissions are the union of all assigned roles.

The system includes several built-in roles. You can also create custom roles by clicking **+** on the roles list page.

**Resources covered by role permissions include:** Element Templates, AI features, Event Templates, Enumeration Sets, Analyses, External Tables, Email Configuration, Notification Rule Templates, Dashboard Templates, Data Backup, Dashboards, Elements, OAuth, Users, Roles, UOM, Panel Templates, Data In, and more.

### 14.4.3.1 Element-Level Access Control

Because elements are organized in a tree hierarchy, element access is controlled separately from other permissions. Even if a role grants access to elements in general, each user's element visibility is further narrowed down to specific top-level nodes configured during invitation or user editing.

Elements that a user cannot access are completely invisible in the asset tree — they do not appear even as collapsed nodes. Attributes, analyses, events, panels, and dashboards linked to inaccessible elements are equally hidden, ensuring strong data isolation between teams, sites, or business units.

## 14.4.4 Single Sign-On (OAuth 2.0)

IDMP supports OAuth 2.0 SSO. OAuth configurations are managed under **Admin Console → User Management → OAuth**. On the login page, IDMP reads the configured provider list from the backend and starts authorization with each provider's authorization URL, client ID, redirect URL, and scope.

### 14.4.4.1 Creating an OAuth Configuration

Click **+** to add a new OAuth provider. Fill in the following fields:

| Field | Required | Description |
|---|:---:|---|
| **Icon** | Yes | Provider logo image shown on the login page. Supported formats are `png/jpg/jpeg/gif/webp`, and the file must be smaller than 1 MB. |
| **Name** | Yes | Display name for the OAuth option (for example, `GitHub`, `Lark`, or `ADFS`). |
| **Type (User Info Mapping Type)** | Yes | Choose `GitHub`, `Lark`, `ADFS`, or `Custom`. This field controls how IDMP retrieves and parses user information. |
| **Client ID** | Yes | Application identifier registered with the OAuth provider. |
| **Client Secret** | Yes | Secret key obtained from the OAuth provider's developer console. |
| **Authorize URL** | Yes | The OAuth 2.0 authorization endpoint URL (`http://` or `https://`). |
| **Token URL** | Yes | The token exchange endpoint URL (`http://` or `https://`). |
| **User Info URL** | Required for non-ADFS | Endpoint used to retrieve the user profile. Leave it empty for `ADFS`. |
| **Redirect URL** | Yes | Callback URL registered with the provider. In most deployments this should be the IDMP front-end callback page, for example `https://<idmp-host>/login/back`. |
| **Scope** | No | Requested permission scopes. For `ADFS`, the scope must include `openid`; `openid profile email` is the recommended value. |
| **Custom Mapping Rules** | Required when `Custom` is selected | JSON object defining JSONPath expressions to extract `name`, `email`, and optional fields. |
| **Roles** | Yes | Roles assigned to users who log in through this OAuth provider. |

### 14.4.4.2 How Each Provider Type Works

| Type | Source of user information | Special requirements |
|---|---|---|
| **GitHub** | Calls `User Info URL` and parses the response with the built-in GitHub logic. | `User Info URL` is required. |
| **Lark** | Calls `User Info URL` and parses the response with the built-in Lark logic. | `User Info URL` is required. |
| **ADFS** | Reads claims from the token response `id_token` and validates it through OIDC discovery and JWKS. | Leave `User Info URL` empty; `Scope` must include `openid`. |
| **Custom** | Calls `User Info URL` and extracts fields using custom JSONPath rules. | `User Info URL` and `Custom Mapping Rules` are required, and `Custom Mapping Rules` must include `name` and `email`. |

### 14.4.4.3 Custom Mapping Rules

When **User Info Mapping Type** is `Custom`, provide a JSON object mapping field names to JSONPath expressions:

```json
{
  "name": "$.username",
  "email": "$.email",
  "nickname": "$.display_name",
  "description": "$.bio",
  "phone": "$.contact.mobile"
}
```

Supported fields are `name`, `email`, `nickname`, `description`, and `phone`. The `name` and `email` fields are required. All others are optional.

### 14.4.4.4 ADFS Configuration Notes

For `ADFS`, use the standard ADFS OAuth/OIDC endpoints under the same base path, for example:

```text
Authorize URL: https://adfs.example.com/adfs/oauth2/authorize
Token URL:     https://adfs.example.com/adfs/oauth2/token
Redirect URL:  https://<idmp-host>/login/back
Scope:         openid profile email
```

The current implementation automatically derives `/.well-known/openid-configuration` from the configured `Authorize URL` or `Token URL`, reads `issuer` and `jwks_uri`, downloads JWKS, and validates the following aspects of the `id_token`:

- Signature
- `iss`
- `aud` (must match `Client ID`)
- `exp`
- Optional `nbf`

ADFS claim mapping is fixed in the current implementation:

- Email: `upn`, with fallback to `email`
- Display name: `given_name + family_name`, with fallback to `unique_name` when `given_name` is missing
- Nickname: `unique_name`

### 14.4.4.5 OAuth Login and Automatic User Provisioning

OAuth login works as follows in the current implementation:

- The login page builds the authorization request from `authorize_url`, `client_id`, `redirect_url`, and `scope`.
- After the provider redirects back to `redirect_url`, the IDMP front end extracts `code` and `state`, then calls the IDMP backend to complete sign-in.
- The OAuth provider must return a valid `email` and `name`; login fails if either is missing or if the email format is invalid.
- If an active account with the same email already exists, IDMP reuses that account instead of creating a second user.
- If no such user exists, IDMP automatically creates an **Active** OAuth user and grants the roles configured on this OAuth provider.
- Deleted or disabled users cannot log in through OAuth.

### 14.4.4.6 Optional Deployment Settings

The following settings affect the final login-page and OAuth behavior:

| Setting | Effect |
|---|---|
| `tda.sso-login-first` | Automatically redirects the login page to the first available OAuth provider. |
| `tda.sso-login-silent` | Adds `prompt=none` during automatic redirection, which is useful for silent SSO attempts. |
| `tda.oauth.tls-configuration-name` | Points to a named `quarkus.tls.<name>` configuration used for OAuth/ADFS HTTPS certificate validation. If unset, IDMP uses the JVM default trust store and hostname verification. |

If the OAuth or ADFS endpoint uses a private CA or self-signed certificate, you can explicitly configure TLS, for example:

```yaml
tda:
  oauth:
    tls-configuration-name: oauth-client

quarkus:
  tls:
    oauth-client:
      trust-all: true
```

:::note
`trust-all: true` is only recommended for test environments. In production, configure a proper trust store instead of disabling certificate validation.
:::

### 14.4.4.7 Setup Steps

1. Register your application in the OAuth provider's developer console and obtain the Client ID, Client Secret, and configure the Redirect URL.
2. Set the Redirect URL to the IDMP front-end callback page, for example `https://<idmp-host>/login/back`, and make sure it exactly matches the value registered with the provider.
3. In IDMP, go to **Admin Console → User Management → OAuth** and click **+**.
4. Choose the correct type and fill in the configuration:
   - `ADFS`: leave `User Info URL` empty and make sure `Scope` contains `openid`
   - `Custom`: fill in both `User Info URL` and `Custom Mapping Rules`
5. Upload an icon, assign roles, and save the configuration.
6. Sign out and verify that the new login option appears on the login page, and that the first OAuth login either reuses an existing email-matched account or auto-creates a new one.

## 14.4.4 LDAP

IDMP supports integrating with enterprise directory services (such as Active Directory or OpenLDAP) through the LDAP protocol for user synchronization and unified authentication. LDAP configuration is managed under **Admin Console → User Management → LDAP**.

### 14.4.4.1 Configuring the LDAP Connection

On the LDAP page, click the edit button and fill in the following fields:

| Field | Required | Description |
|---|:---:|---|
| **Enabled** | — | Turns LDAP authentication on or off. When disabled, both LDAP user sync and LDAP login are unavailable. |
| **URL** | Yes | LDAP server address, for example `ldap://localhost:389` or `ldaps://localhost:636`. |
| **Bind DN** | No | LDAP bind account DN used to search for users, for example `cn=admin,dc=taosdata,dc=com`. Leave empty if the LDAP server allows anonymous search. |
| **Password** | No | Password for the Bind DN account. The password is stored encrypted in the database and displayed as a masked value when editing. |
| **Search Base DN** | Yes | The starting node for user search, for example `dc=taosdata,dc=com`. |
| **Login Attribute** | Yes | The LDAP attribute used for login. Defaults to `uid`. If set to `mail`, users can log in directly with their email address. |
| **Search Filter** | Yes | Additional LDAP search criteria, for example `(objectClass=inetOrgPerson)`. |
| **Roles** | Yes | Default roles automatically assigned to synchronized users. Each role can have its own configurable set of accessible elements. |

Click save after completing the configuration. If the password field displays a masked value (`********`), the existing password is retained. Clear the field to remove the password.

### 14.4.4.2 Synchronizing Users

Click **Sync All Users** to have IDMP connect to the LDAP server using the configured Bind DN, search for all user entries under the Search Base DN and Search Filter, and synchronize them into IDMP.

**LDAP attribute to IDMP user field mapping:**

| LDAP Attribute | IDMP Field | Notes |
|---|---|---|
| Login attribute (e.g. `uid`) | Login Name | Determined by the "Login Attribute" configuration |
| `mail`, or `EmailAddress` | Email | Required; the user is skipped if this attribute is missing |
| `givenName`, `cn`, or login attribute | First Name | Tried in order; falls back to the login name |
| `sn` | Last Name | Optional |
| `mobile`, `Telephone`, or `telephoneNumber` | Phone | Tried in order |
| Distinguished Name (DN) | Description | The user's full DN in the LDAP directory |

**Sync logic:**

- If a user with the same login name already exists in IDMP with login type LDAP, the user's information is updated.
- If a user with the same login name exists but with login type Local, the LDAP user is skipped (local accounts are never overwritten).
- If no matching user exists in IDMP, a new LDAP user is created and assigned the configured default roles.
- If no matching login name is found but a user with the same email and login type LDAP exists, the match is made and the user is updated.
- Users removed from LDAP are not automatically deleted from IDMP during sync.

### 14.4.4.3 LDAP User Login

LDAP users enter their login name (or email) and password on the login page. IDMP handles the login as follows:

1. Looks up the IDMP user by login name.
2. If not found and the input contains `@`, looks up an LDAP-type user by email.
3. Once the user is found and the login type is LDAP, IDMP binds to the LDAP server using the supplied credentials.
4. If LDAP authentication succeeds, IDMP issues a JWT token to complete the login.

LDAP user passwords are stored on the LDAP server; IDMP does not store LDAP user passwords.
