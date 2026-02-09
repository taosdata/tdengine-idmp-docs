# 单点登录

## 概述

本文档详细说明系统中 OAuth 2.0 单点登录（SSO）的配置参数及其用途。

## 配置参数说明

### 1. 图标 (Icon)

- **必填**: 是
- **类型**: 图片文件，建议使用官方 logo，支持常见图片格式（PNG, JPG, SVG 等）；
- **用途**: OAuth 提供商的标识图标，将显示在登录页面上。

### 2. 名称 (Name)

- **必填**: 是
- **类型**: 字符串，建议使用易于识别的名称，如 "Github"、"TAOS"；
- **用途**: OAuth 配置的显示名称，用于区分不同的登录选项。

### 3. 客户端 ID (Client ID)

- **必填**: 是
- **类型**: 字符串；
- **用途**: OAuth 2.0 标准参数，用于在 OAuth 提供商中标识您的应用程序。

### 4. 客户端密钥 (Client Secret)

- **必填**: 是
- **类型**: 字符串（密码），与 Client ID 一同在 OAuth 提供商的开发者控制台获得；
- **用途**: OAuth 2.0 标准参数，用于验证应用程序身份的密钥。

### 5. 授权 URL (Authorize URL)

- **必填**: 是
- **类型**: URL 字符串，必须以 `http://` 或 `https://` 开头；
- **用途**: OAuth 2.0 授权码流程的第一步，用户将被重定向到此 URL 进行登录授权。

### 6. 令牌 URL (Token URL)

- **必填**: 是
- **类型**: URL 字符串，必须以 `http://` 或 `https://` 开头；
- **用途**: OAuth 2.0 授权码流程的第二步，用授权码交换访问令牌。

### 7. 用户信息 URL (User Info URL)

- **必填**: 是
- **类型**: URL 字符串，必须以 `http://` 或 `https://` 开头；
- **用途**: 使用访问令牌获取用户基本信息的 API 端点。

### 8. 重定向 URL (Redirect URL)

- **必填**: 是
- **类型**: URL 字符串，必须与在 OAuth 提供商处注册的回调 URL 完全一致，以 `http://` 或 `https://` 开头，例如：http://localhost:6042/login/back。
- **用途**: OAuth 授权完成后，提供商将用户重定向回您的应用的 URL。

### 9. 权限范围 (Scope)

- **必填**: 否
- **类型**: 字符串，如 `openid email profile`；
- **用途**: 指定应用程序请求访问的用户数据权限范围

### 10. 用户信息映射类型 (User Info Mapping Type)

- **必填**: 是
- **类型**: 枚举值，指定如何从 OAuth 提供商返回的用户信息中提取所需字段；
- **可选值**:
  - `GITHUB`: GitHub 平台
  - `LARK`: 飞书平台
  - `CUSTOM`: 自定义映射规则

### 11. 自定义映射规则 (Custom Mapping Rules)

- **必填**: 当 `type` 为 `自定义/CUSTOM` 时必填
- **类型**: JSON 字符串，具体格式参见 [自定义映射规则详解](#自定义映射规则详解)；
- **用途**: 定义如何从 OAuth 提供商返回的用户信息中提取用户名和邮箱字段

### 12. 角色配置 (Roles)

- **必填**: 是
- **类型**: 数组
- **用途**: 指定通过此 OAuth 登录的用户将被分配的系统角色和权限

## 自定义映射规则详解

### 使用场景

当您的 OAuth 提供商不是 GitHub 或飞书时，需要使用自定义映射规则。

### 映射规则格式

映射规则必须是有效的 JSON 对象，其中 name 和 email 是必填字段：

```json
{
  "name": "用户名的提取路径",
  "email": "邮箱的提取路径",
  "nickname": "昵称的提取路径（可选）",
  "phone": "手机号的提取路径（可选）",
  "description": "描述信息的提取路径（可选）"
}
```

### JSONPath 表达式语法

系统使用 **JSONPath** 标准（基于 Jayway JSONPath 实现）从用户信息响应中提取字段。

#### 基本语法

JSONPath 使用 `$` 表示根对象，使用点号 `.` 或方括号 `[]` 来访问对象属性和数组元素：

| 表达式             | 说明               | 示例                |
| ------------------ | ------------------ | ------------------- |
| `$.field`          | 提取根对象的字段   | `$.name`            |
| `$.object.field`   | 提取嵌套对象的字段 | `$.user.email`      |
| `$.array[0].field` | 提取数组元素的字段 | `$.emails[0].value` |
| `$['field']`       | 使用方括号访问字段 | `$['user-name']`    |
| `$.array[*].field` | 提取数组所有元素   | `$.users[*].name`   |

#### 特殊字符处理

当字段名包含特殊字符（如空格、点号、中划线等）时，建议使用方括号表示法：

**示例**：

- 字段名为 `user-name` 时，使用 `$['user-name']`
- 字段名为 `user.name` 时，使用 `$['user.name']`
- 字段名为 `first name` 时，使用 `$['first name']`
- 嵌套字段 `data.user-info` 中的 `email`，使用 `$.data['user-info'].email`

### 配置示例

#### 示例 1：简单字段提取

**OAuth 提供商返回的用户信息**:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "id": 12345
}
```

**映射规则配置**:

```json
{
  "name": "$.username",
  "email": "$.email"
}
```

**说明**: 使用 `$.` 开头直接从根对象提取 `username` 和 `email` 字段

#### 示例 2：嵌套对象提取

**OAuth 提供商返回的用户信息**:

```json
{
  "user_info": {
    "display_name": "John Doe",
    "contact": {
      "email": "john@example.com",
      "mobile": "123-456-7890"
    }
  }
}
```

**映射规则配置**:

```json
{
  "name": "$.user_info.display_name",
  "email": "$.user_info.contact.email",
  "phone": "$.user_info.contact.mobile"
}
```

**说明**: 使用点号 `.` 分隔每一层对象，逐层访问嵌套字段

#### 调试建议

1. **查看提供商文档**: 仔细阅读 OAuth 提供商的用户信息 API 文档
2. **实际测试**: 使用 Postman 或 curl 调用用户信息 API，查看实际返回的数据结构
3. **逐步构建**: 先配置简单字段，测试成功后再处理复杂嵌套
4. **使用在线工具**: 可以使用 JSON Path 在线测试工具验证表达式

## 配置流程

### 步骤 1：在 OAuth 提供商处注册应用

1. 访问 OAuth 提供商的开发者控制台
2. 创建新的 OAuth 应用
3. 记录 Client ID 和 Client Secret
4. 配置重定向 URL（Redirect URL）

### 步骤 2：在系统中创建 OAuth 配置

1. 进入管理后台 → 用户管理 → 单点登录
2. 点击"添加 OAuth 配置"按钮
3. 上传 OAuth 提供商的图标
4. 填写配置名称
5. 输入从步骤 1 获得的 Client ID 和 Client Secret
6. 根据提供商文档填写 URL 配置：
   - Authorize URL
   - Token URL
   - User Info URL
   - Redirect URL
7. 配置权限范围（Scope）
8. 选择用户信息映射类型：
   - 如果是 GitHub 或飞书，直接选择对应选项
   - 其他提供商选择 "自定义" 并配置映射规则
9. 分配角色权限
10. 保存配置

### 步骤 3：测试登录

1. 退出当前账号
2. 在登录页面找到新配置的 OAuth 选项
3. 点击登录，验证流程是否正常
4. 检查登录后用户信息是否正确提取
