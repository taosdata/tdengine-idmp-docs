---
title: GPG 密钥管理
sidebar_label: GPG 密钥管理
---

# 14.11.5 GPG 密钥管理

在 **E-Signature** 模式下，所有提交需要使用 GPG 密钥进行电子签名。
管理员在「管理控制台 → 版本控制 → 电子签名密钥」页面中管理 GPG 密钥。

## 什么是 GPG 电子签名？

GPG（GNU Privacy Guard）是一种基于非对称加密的电子签名技术。在版本控制中：

- 每次 Check-In 时，系统使用用户的 GPG 私钥对 commit 进行签名
- Git 服务器使用对应的公钥验证签名
- 签名后的 commit 在 Git 历史中带有"Verified"标记
- 满足 FDA 21 CFR Part 11 等法规对电子签名的要求

## 生成 GPG 密钥

### 1. 进入密钥管理页面

点击左侧菜单 **管理控制台 → 版本控制 → 电子签名密钥**。

![GPG 密钥管理页面](../images/enable-version-control.png)

### 2. 点击生成按钮

点击右上角的 **+** 按钮，弹出生成密钥对话框。

![生成 GPG 密钥对话框](../images/enable-version-control.png)

### 3. 选择用户和邮箱

- 在 **选择用户** 下拉框中搜索并选择目标用户
- **邮箱地址** 会自动填充为该用户的邮箱
- 如果该用户已有密钥，会显示警告提示

### 4. 设置过期时间

选择密钥的过期时间：永不过期、1 年、2 年或 3 年。

### 5. 生成

点击 **生成** 按钮，系统会在后台生成 RSA 4096 位密钥对。

![生成成功通知](../images/enable-version-control.png)

## 查看和复制公钥

生成密钥后，用户需要在 GitLab/GitHub 中配置对应的公钥。

1. 在密钥列表中，点击密钥行的 **查看公钥**
2. 在弹出的对话框中点击 **复制**
3. 将公钥粘贴到 GitLab/GitHub 的 GPG Keys 设置中：
   - **GitLab**：用户设置 → GPG Keys
   - **GitHub**：Settings → SSH and GPG keys

![查看公钥对话框](../images/enable-version-control.png)

> 用户也可以在「个人设置 → Git」标签页中查看和复制自己的 GPG 公钥。

## 验证 GPG 配置

用户配置好 GitLab/GitHub 上的 GPG 公钥后，可以在个人设置中点击 **验证配置** 按钮，
检查远程 Git 服务上的 GPG 配置是否正确。

## 删除密钥

:::danger 注意
删除密钥后，使用该密钥签名的历史提交将无法验证。请谨慎操作。
:::

1. 在密钥列表中，点击密钥行的 **删除**
2. 确认删除操作

## 密钥列表

密钥列表显示以下信息：

| 列 | 说明 |
|----|------|
| 密钥 ID | GPG 密钥指纹的后 16 位 |
| 用户名 | 密钥所属用户 |
| 邮箱 | 密钥关联的邮箱地址 |
| 类型 | 密钥算法类型（RSA） |
| 长度 | 密钥长度（4096 bit） |
| 创建时间 | 密钥生成时间 |
| 过期时间 | 密钥过期时间（空表示永不过期） |

## E-Signature 模式下的提交流程

配置好 GPG 密钥后，在 E-Signature 模式下：

1. 用户在变更列表页点击 Check-In
2. 填写变更原因
3. 系统自动使用 GPG 密钥对 commit 进行签名
4. 签入对话框中显示"此提交将使用 GPG 电子签名自动签署"
5. 提交后，在 GitLab/GitHub 中可以看到 commit 带有"Verified"标记

![E-Signature 签入提示](../images/enable-version-control.png)
