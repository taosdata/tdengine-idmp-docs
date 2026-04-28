---
title: Profile Settings and API Keys
sidebar_label: Profile Settings and API Keys
---

# 14.8 Profile Settings and API Keys

Personal settings are available to every signed-in user. Use this dialog to maintain your profile, avatar, password, and user-level API keys. Open the avatar menu in the upper-right corner and select the top account item, which shows your avatar, email address, and name.

## 14.8.1 Dialog Layout

The personal settings dialog contains the following tabs:

| Tab | Purpose |
|---|---|
| **Profile** | View and edit your name, email, phone number, position, and description |
| **API Key** | Create, copy, update the expiration time of, and delete user API keys |
| **MFA** | Reserved entry for multi-factor authentication. The current release shows an "under development" placeholder. |

## 14.8.2 Profile

### 14.8.2.1 Editable Fields

The **Profile** tab opens in read-only mode. Click **Edit** at the bottom to switch to edit mode.

| Field | Description |
|---|---|
| **First Name / Last Name** | Your personal name |
| **Email** | Sign-in email address. It is read-only here and cannot be changed from this dialog. |
| **Phone** | Contact number, including country or region code |
| **Position** | Optional job title or position |
| **Description** | Optional personal description |

Click the avatar area in the upper-left part of the dialog to upload a new avatar image. Only `JPG`, `JPEG`, and `PNG` files smaller than `1 MB` are accepted.

### 14.8.2.2 Password Changes

Users who sign in with a username and password can also change their password while editing profile information. When you save, the system prompts you to re-enter your current password for confirmation. Users who sign in through OAuth 2.0 or another single sign-on method do not see the password fields.

## 14.8.3 API Keys

User API keys are intended for scripts, CLIs, MCP clients, and other integrations that need a stable credential. An API key uses the permission boundary of the user who created it and is sent in the `Authorization: Bearer <IDMP_API_KEY>` header. The copied key itself starts with `api_` and does not include the `Bearer` prefix.

### 14.8.3.1 List View

The **API Key** tab lists keys in reverse chronological order by creation time and provides the following information and actions:

| Column or Action | Description |
|---|---|
| **Title** | User-defined title. It must be unique per user. |
| **Key** | Masked API key value. Click the copy icon to retrieve the full value again. |
| **Added on** | Creation date of the API key |
| **Expired on** | Current expiration time. Click the value to open the **Edit Expiration** dialog. |
| **Delete** | Deletes the API key. Once confirmed, the key becomes invalid immediately. |

### 14.8.3.2 Creating an API Key

1. Switch to the **API Key** tab and click **Add New API Key**.
2. Enter a unique title.
3. Choose either **Never** or **Expiration Date**. If you specify a date, it must be later than the current time.
4. Click **Create**.
5. After creation, the system opens a dialog that shows the full API key. Copy it and store it safely.

The list view shows only a masked value. If you need the full key again later, use the row-level copy action.

### 14.8.3.3 Updating the Expiration Time

Click the current value in the **Expired on** column to open the **Edit Expiration** dialog. The title remains read-only in this dialog, but you can switch between **Never** and a new **Expiration Date**.

### 14.8.3.4 Deleting an API Key

Click the delete icon at the end of the row and confirm the action. The API key is invalidated immediately. Delete keys promptly when the associated automation or external tool is no longer needed.

### 14.8.3.5 Usage and Limits

- API keys are recommended for long-running integration scenarios such as CLIs, scripts, and MCP clients.
- The request header format is `Authorization: Bearer <IDMP_API_KEY>`. If a client asks only for the bearer token value, provide the raw `api_...` key.
- API keys inherit the role permissions and element access scope of the user who created them.
- An API key becomes invalid immediately when it expires, is deleted, or its owner is deactivated or deleted.
- Requests authenticated by API key cannot access API key management endpoints. This includes listing, creating, copying, updating, and deleting keys. Manage keys from the signed-in Web UI instead.

For SDK and MCP examples that use API keys, see [Section 15.1.3](../15-integrating-with-other-systems/01-client-sdk/03-authentication.md) and [Section 15.2](../15-integrating-with-other-systems/02-mcp-interface.md).

## 14.8.4 MFA

In the current release, the **MFA** tab only shows an "under development" placeholder and does not yet support configuration.
