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

## 14.4.2 Roles

IDMP uses role-based access control (RBAC). Each role grants view, add, delete, and edit permissions on one or more resource types. A user can hold multiple roles; their effective permissions are the union of all assigned roles.

The system includes several built-in roles. You can also create custom roles by clicking **+** on the roles list page.

**Resources covered by role permissions include:** Element Templates, AI features, Event Templates, Enumeration Sets, Analyses, External Tables, Email Configuration, Notification Rule Templates, Dashboard Templates, Data Backup, Dashboards, Elements, OAuth, Users, Roles, UOM, Panel Templates, Data In, and more.

### 14.4.2.1 Element-Level Access Control

Because elements are organized in a tree hierarchy, element access is controlled separately from other permissions. Even if a role grants access to elements in general, each user's element visibility is further narrowed down to specific top-level nodes configured during invitation or user editing.

Elements that a user cannot access are completely invisible in the asset tree — they do not appear even as collapsed nodes. Attributes, analyses, events, panels, and dashboards linked to inaccessible elements are equally hidden, ensuring strong data isolation between teams, sites, or business units.

## 14.4.3 User Groups

User groups let you organize multiple users into a single unit and grant permissions to all of them at once by assigning roles to the group. User groups support a **tree-structured hierarchy** that can mirror your real organization (for example, *Group → Business Unit → Plant → Workshop*). Child groups **automatically inherit** the roles assigned to all of their ancestors, so the same permissions do not need to be reconfigured at every level.

User groups are managed from **Admin Console → User Management → User Groups**. The relationship between users, roles, and user groups is as follows:

| Concept | Purpose | How permissions are granted |
|---|---|---|
| **User** | The smallest login unit in the system | Can be assigned roles directly, or acquire roles indirectly by joining a user group |
| **Role** | A bundle of functional permissions and accessible elements | Can be assigned directly to a user or to a user group |
| **User Group** | An organized collection of users that can form a tree hierarchy | Roles assigned to the group are inherited by every member of the group and of all its descendant groups |

A user's effective permissions are the combination of two sources: the **roles assigned directly to the user**, and the **roles held by every user group the user belongs to, including all of those groups' ancestor groups**. When the user belongs to multiple groups, the permissions inherited along each path are **unioned together**. If different sources conflict on the same permission (one grants it while another denies it), **deny takes precedence**.

### 14.4.3.1 Creating a User Group

Go to **Admin Console → User Management → User Groups** and click **+** in the top-right corner. Fill in the following fields:

| Field | Description |
|---|---|
| **Name** | The user group name. Required, up to 255 characters. **Must be unique among siblings under the same parent group**; the same name is allowed on different branches. Letters, digits, Chinese characters, and the special characters `@ ( ) [ ] & . , _ -` and space are all supported. |
| **Description** | Optional, up to 255 characters. |
| **Parent Group** | Optional. Leave it empty to create a root (top-level) group; selecting a parent creates the new group as its child. The parent picker supports searching by name. |

Optionally, you can also specify **initial members** and **initial roles** at creation time:

- **Initial members** — users selected here become direct members of the new group.
- **Initial roles** — roles selected here are assigned to the new group; every member of the group (and of every descendant group) immediately gains the permissions granted by those roles.

:::note

- User group hierarchies have a maximum depth (default **10 levels**). Once a node reaches this depth, no further child groups can be created under it.
- Managing user groups themselves (create, view, edit, delete) is also governed by role-based permissions, namely `add / view / edit / delete : user-group`.

:::

### 14.4.3.2 User Group List and Hierarchy Views

The user group list page supports two display modes:

- **Tree mode** — displays the full hierarchy as an organization tree; you can expand or collapse each level, see the current node's path through **breadcrumbs**, and **drag and drop** a node onto a different parent to move it.
- **Flat mode** — lists all user groups in a table, with searching, sorting, pagination, and column-based export by name, member count, role count, and other columns.

List columns:

| Column | Description |
|---|---|
| **Name** | The user group name (click to open its details page) |
| **Description** | The user group description |
| **Hierarchy Path** | The position of the current group in the organization tree (breadcrumbs) |
| **Members (Direct)** | Users joined directly to this group |
| **Members (Including Descendants)** | Combined members of this group and all of its descendant groups |
| **Roles** | Number of roles directly assigned to this group |

In the left navigation, the *User Groups* menu only expands **root nodes**; clicking a root node opens the sub-tree list view for that root, which makes it easy to focus on one organizational tree at a time.

### 14.4.3.3 Managing User Group Members

From the **Members** tab on the user group details page:

- Click **Add Members** to open the user picker, then check the users you want to add to the group. Users who are already members are skipped silently — no error is raised.
- Click **Remove** next to a member to remove them from the group. The user immediately loses any permissions inherited through this group (they keep permissions inherited through other groups or assigned directly).

### 14.4.3.4 Assigning Roles to a User Group

From the **Roles** tab on the user group details page:

- Click **Assign Roles** and select the roles you want to grant to this group.
- Click **Revoke** next to a role to remove the group's assignment of that role.

Role changes are **submitted together when you save the page** — you can add or remove several roles in a row and then save once. After saving, the permissions of every member of this group (and of every descendant group) are recalculated automatically and take effect immediately.

:::tip
**Typical scenario:** A manufacturing company is organized as *Group → Business Unit → Plant → Workshop*. Assigning a *Basic View* role to the **Group** node automatically grants it to every member of every business unit, plant, and workshop below. Adding a *Maintenance* role to the **Plant A** group grants it only to members of Plant A and the workshops under it. Workshop members never have to be wired up level by level by hand.
:::

### 14.4.3.5 Moving a User Group

To restructure your organization, edit the user group and change its **Parent Group** field, or drag and drop the node onto a new parent in the tree view.

Move operations are subject to the following constraints:

- **Cycles are not allowed** — the new parent cannot be the group itself or any of its descendants.
- **The maximum hierarchy depth must not be exceeded.**
- A move affects the **permission inheritance chain**: every member inside the moved subtree will see a different set of inherited ancestor roles. Before applying the move, IDMP shows a **permission change preview** listing roles that will be gained or lost; the move is executed only after the admin confirms.

### 14.4.3.6 Deleting a User Group

Click **Delete** from the user group list or the details page:

- Deletion is a **soft delete** — audit records are retained, but the group itself and all of its member and role associations are released immediately.
- **Groups that still have child groups cannot be deleted.** You must move or delete the children first before deleting the parent, to avoid uncontrolled cascading deletes.
- After deletion, former members only lose permissions inherited through this group; roles assigned to them directly and roles inherited through other groups are unaffected.

### 14.4.3.7 Managing Group Membership from the User View

In addition to managing members from the User Groups screens, you can manage a single user's group membership from the *Users* screens:

- **User Details → Group Membership** — lists every user group the user belongs to and clearly distinguishes between:
  - **Direct Member** — groups the user was added to directly.
  - **Inherited (Source: X)** — the user belongs to group X directly, and through X they are linked to one of X's ancestor groups.
  
  Each row shows the group name, hierarchy path (breadcrumbs), and join time, and supports filtering by group name. This view is read-only.

- **Edit User → User Groups** tab — add the user to user groups or remove them from groups. Changes are submitted together with the other user fields when the page is saved, and the user's effective permissions are recalculated automatically afterwards.

### 14.4.3.8 Viewing and Extending Roles While Editing a User

The *Roles* area on the user edit page shows two kinds of roles together:

- **Inherited Roles** — roles passed down from user groups (including their ancestor groups). They are marked with an *Inherited* tag and the originating group is shown.
- **Direct Roles** — roles assigned to the user directly. You can configure the accessible elements for each direct role individually (see 14.4.1.2) and remove them individually.

Inherited roles cannot be modified from the user edit page — to change them, go to the *Roles* tab of the corresponding user group.

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
