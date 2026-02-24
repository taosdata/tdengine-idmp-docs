# OAuth Single Sign-On

## Overview

This document provides detailed instructions on configuring OAuth 2.0 Single Sign-On (SSO) parameters in the system.

## Configuration Parameters

### 1. Icon

- **Required**: Yes
- **Type**: Image file, supports common image formats (PNG, JPG, SVG, etc.)
- **Purpose**: Logo of the OAuth provider, displayed on the login page

### 2. Name

- **Required**: Yes
- **Type**: String, custom defined by administrator, like `GitHub`, `Lark`, `SSO`
- **Purpose**: Display name for the OAuth configuration, used to identify the OAuth provider in admin interface and login page

### 3. Client ID

- **Required**: Yes
- **Type**: String
- **Purpose**: OAuth 2.0 standard parameter used to identify your application

### 4. Client Secret

- **Required**: Yes
- **Type**: String (password), obtained together with Client ID from the OAuth provider's developer console
- **Purpose**: OAuth 2.0 standard parameter, secret key used to authenticate the application identity

### 5. Authorize URL

- **Required**: Yes
- **Type**: URL string, must start with `http://` or `https://`
- **Purpose**: First step of OAuth 2.0 authorization code flow, users will be redirected to this URL for login authorization

### 6. Token URL

- **Required**: Yes
- **Type**: URL string, must start with `http://` or `https://`
- **Purpose**: Second step of OAuth 2.0 authorization code flow, exchange authorization code for access token

### 7. User Info URL

- **Required**: Yes
- **Type**: URL string, must start with `http://` or `https://`
- **Purpose**: API endpoint to retrieve user basic information using the access token

### 8. Redirect URL

- **Required**: Yes
- **Type**: URL string, must start with `http://` or `https://`, for example: `http://localhost:6042/login/back`.
- **Purpose**: After OAuth authorization is complete, the provider will redirect users back to your application at this URL

### 9. Scope

- **Required**: No
- **Type**: String
- **Purpose**: Specifies the scope of user data permissions the application requests to access

### 10. User Info Mapping Type

- **Required**: Yes
- **Type**: Enum value
- **Available Values**:
  - `GITHUB`: GitHub platform
  - `LARK`: Lark (Feishu) platform
  - `CUSTOM`: Custom mapping rules
- **Purpose**: Specifies how to extract required fields from user information returned by the OAuth provider

### 11. Custom Mapping Rules

- **Required**: Required when `type` is `CUSTOM`
- **Type**: JSON string, format detailed in [Custom Mapping Rules Details](#custom-mapping-rules-details)
- **Purpose**: Defines how to extract username and email from the user information returned by the OAuth provider

### 12. Role Configuration

- **Required**: Yes
- **Type**: Array
- **Purpose**: Specifies system roles and permissions that will be assigned to users logging in through this OAuth configuration

## Custom Mapping Rules Details

### Use Cases

Custom mapping rules are needed when your OAuth provider is not GitHub or Lark, or when the provider's user information format does not conform to the standard.

### Mapping Rule Format

Mapping rules must be a valid JSON object containing the following required fields:

```json
{
  "name": "Path to extract username",
  "email": "Path to extract email",
  "nickname": "Path to extract nickname (optional)",
  "phone": "Path to extract phone number (optional)",
  "description": "Path to extract description (optional)"
}
```

### JSONPath Expression Syntax

The system uses the **JSONPath** standard (based on Jayway JSONPath implementation) to extract fields from user information responses.

#### Basic Syntax

JSONPath uses `$` to represent the root object, and uses dot notation `.` or bracket notation `[]` to access object properties and array elements:

| Expression         | Description                           | Example             |
| ------------------ | ------------------------------------- | ------------------- |
| `$.field`          | Extract field from root object        | `$.name`            |
| `$.object.field`   | Extract field from nested object      | `$.user.email`      |
| `$.array[0].field` | Extract field from array element      | `$.emails[0].value` |
| `$['field']`       | Access field using bracket notation   | `$['user-name']`    |
| `$.array[*].field` | Extract field from all array elements | `$.users[*].name`   |

#### Special Character Handling

When field names contain special characters (such as spaces, dots, hyphens, etc.), it's recommended to use bracket notation:

**Examples**:

- For field name `user-name`, use `$['user-name']`
- For field name `user.name`, use `$['user.name']`
- For field name `first name`, use `$['first name']`
- For nested field `email` in `data.user-info`, use `$.data['user-info'].email`

### Configuration Examples

#### Example 1: Simple Field Extraction

**User information returned by OAuth provider**:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "id": 12345
}
```

**Mapping Rule Configuration**:

```json
{
  "name": "$.username",
  "email": "$.email"
}
```

**Explanation**: Use `$.` prefix to directly extract `username` and `email` fields from root object

#### Example 2: Nested Object Extraction

**User information returned by OAuth provider**:

```json
{
  "user_info": {
    "display_name": "John Doe",
    "contact": {
      "email": "john@example.com"
    }
  }
}
```

**Mapping Rule Configuration**:

```json
{
  "name": "$.user_info.display_name",
  "email": "$.user_info.contact.email"
}
```

**Explanation**: Use dot notation `.` to separate each object layer, accessing nested fields level by level

#### Debugging Recommendations

1. **Review Provider Documentation**: Carefully read the OAuth provider's user info API documentation
2. **Actual Testing**: Use Postman or curl to call the user info API and examine the actual returned data structure

   ```bash
   curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
        https://api.provider.com/user
   ```

3. **Build Incrementally**: Configure simple fields first, then handle complex nesting after successful testing
4. **Use Online Tools**: JSON Pointer online testing tools can be used to validate expressions
5. **Note Array Indexing**: Array indices start from 0, use `/array/0` to access the first element
6. **Check Field Name Case**: JSON Pointer paths are case-sensitive
7. **Verify Escaping**: If field names contain `~` or `/`, ensure proper escaping

---

## Configuration Process

### Step 1: Register Application with OAuth Provider

1. Visit the OAuth provider's developer console
2. Create a new OAuth application
3. Record the Client ID and Client Secret
4. Configure the Redirect URL

### Step 2: Create OAuth Configuration in System

1. Go to Admin Console → User Management → OAuth
2. Click "Add OAuth Config" button
3. Upload the OAuth provider's icon
4. Fill in the configuration name
5. Enter the Client ID and Client Secret obtained from Step 1
6. Fill in URL configurations according to provider documentation:
   - Authorize URL
   - Token URL
   - User Info URL
   - Redirect URL
7. Configure permission scope (Scope)
8. Select user info mapping type:
   - If GitHub or Lark, select the corresponding option directly
   - For other providers, select "Custom" and configure mapping rules
9. Assign role permissions
10. Save configuration

### Step 3: Test Login

1. Log out of current account
2. Find the newly configured OAuth option on the login page
3. Click login and verify the flow works correctly
4. Check if user information is correctly extracted after login
