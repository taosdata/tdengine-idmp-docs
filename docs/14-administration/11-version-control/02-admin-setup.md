---
title: 配置 Git 仓库
sidebar_label: 配置 Git 仓库
---

# 14.11.2 配置 Git 仓库

管理员在「管理控制台 → 版本控制 → 配置」页面中配置 Git 仓库连接。

## 前提条件

- 已拥有 GitLab 或 GitHub 账号
- 已创建用于 IDMP 的空 Git 仓库
- 已生成 Personal Access Token（权限要求见下方）

## 配置步骤

### 1. 启用版本控制

在「管理控制台 → 版本控制」页面中，打开**版本控制**开关。

![启用版本控制开关](../images/enable-version-control.png)

启用后，左侧菜单会出现版本控制的子菜单项，系统开始在后台初始化 Git 仓库。

### 2. 进入配置页面

点击左侧菜单 **管理控制台 → 版本控制 → 配置**。

![版本控制配置页面](../images/enable-version-control.png)

### 3. 选择 Git 服务器类型

在 **Git 服务器类型** 下拉框中选择 **GitLab** 或 **GitHub**。

### 4. 填写仓库地址

在 **Git 仓库 URL** 输入框中填写仓库的 HTTPS 地址，例如：

```
https://gitlab.example.com/your-org/idmp-data.git
```

### 5. 填写访问令牌

在 **系统服务令牌** 输入框中填写 Personal Access Token。

<details>
<summary>GitLab Token 所需权限</summary>

在 GitLab 中创建 Personal Access Token 时，需要勾选以下权限范围：

- **api** — 完整 API 访问（用于合并请求操作）
- **read_repository** — 读取仓库内容
- **write_repository** — 写入/推送代码到仓库

创建路径：**用户头像 → Preferences → Access Tokens**

</details>

<details>
<summary>GitHub Token 所需权限</summary>

在 GitHub 中创建 Personal Access Token 时：

- **Classic token**：勾选 **repo** 权限（完整仓库访问）
- **Fine-grained token**：授予 **Contents: Read & write** 和 **Pull requests: Read & write** 权限

创建路径：**用户头像 → Settings → Developer settings → Personal access tokens**

</details>

:::info 系统服务令牌 vs 个人令牌
系统服务令牌用于后台自动化操作（Webhook 自动合并、拉取远程、测试连接），建议使用专用 Bot 账号。用户发起的推送/MR 需要在「个人设置 → Git Token」中配置个人令牌。
:::

### 6. 测试连接

填写完成后，点击 **测试连接** 按钮。如果配置正确，会提示"连接成功"。

### 7. 保存配置

点击 **保存** 按钮，输入管理员密码确认。

## Webhook 配置

保存配置后，页面会显示 Webhook 回调 URL。将此 URL 配置到 GitLab/GitHub 仓库的 Webhook 设置中：

1. 复制页面上的 **Webhook 回调 URL**
2. 在 GitLab 项目 → Settings → Webhooks 中，粘贴 URL
3. 触发事件选择 **Merge request events**
4. Secret Token 使用您在个人设置中创建的 API Key

![Webhook 配置](../images/enable-version-control.png)

Webhook 在版本控制中有两个重要作用：

- **自动发布**（Auto-Push 模式）：MR/PR 被合入后，GitLab/GitHub 通过 Webhook 通知 IDMP，IDMP 自动拉取最新版本并更新运行系统，无需管理员手动操作
- **实时通知**：当 Reviewer 在 GitLab/GitHub 上手动合入 MR/PR 后，IDMP 通过 Webhook 收到事件，向提交者推送 SSE 通知，告知其 MR 已被合入

> 如果 Webhook 未配置，自动发布模式不会生效，用户也无法收到 MR 合入的实时通知。

## 修改模式与发布模式

配置页面下方可以设置修改模式和发布模式，详见 [修改模式与发布模式](./01-concepts)。

## 常见问题

**Q: 测试连接失败怎么办？**

- 检查仓库 URL 是否正确（需使用 HTTPS 地址）
- 检查 Token 是否过期
- 检查 Token 权限是否足够
- 检查网络是否可达 Git 服务器

**Q: 可以切换 Git 服务器类型吗？**

可以。切换后需要重新填写仓库地址和 Token，并重新测试连接。
