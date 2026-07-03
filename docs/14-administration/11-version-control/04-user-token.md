---
title: 配置个人 Git Token
sidebar_label: 配置个人 Git Token
---

# 14.11.4 配置个人 Git Token

在 Review Required 或 E-Signature 模式下，每个用户需要配置自己的 Git Personal Access Token，
用于推送个人分支和创建 Merge Request。

## 为什么需要个人 Token？

- 管理员配置的**系统服务令牌**用于后台自动化操作
- 用户发起的推送和 MR 创建需要使用**个人令牌**，以便在 Git 历史中正确记录提交者身份
- 个人令牌确保每个用户的提交可追溯、不可否认

## 配置步骤

### 1. 生成 Personal Access Token

在 GitLab 或 GitHub 中创建个人访问令牌（权限要求与管理员配置相同）。

### 2. 打开个人设置

点击右上角用户头像，在下拉菜单中选择带有邮箱的菜单项，打开个人设置弹窗。

![打开个人设置]()

### 3. 切换到 Git 标签页

在个人设置弹窗中，点击 **Git** 标签页。

![Git Token 配置页面]()

### 4. 填写 Token

在输入框中粘贴您的 Personal Access Token。

### 5. 测试 Token

点击 **测试** 按钮验证 Token 有效性。测试通过后会显示"连接成功"。

### 6. 保存

点击 **保存** 按钮完成配置。

## GPG 公钥

在 Git 标签页下方，可以看到您的 GPG 公钥信息（如果管理员已为您生成）。

- 点击 **复制公钥** 可复制 GPG 公钥
- 将公钥添加到 GitLab/GitHub 的 GPG Keys 设置中，即可对您的提交进行自动签名验证
- 点击 **验证配置** 可检查远程 Git 服务上的 GPG 配置是否正确

> GPG 密钥由管理员在「管理控制台 → 版本控制 → 电子签名密钥」页面中生成。详见 [GPG 密钥管理](./05-gpg-keys)。

![GPG 公钥区域]()

## 常见问题

**Q: 不配置个人 Token 可以吗？**

在 Version Track 模式下不需要。在 Review Required / E-Signature 模式下，未配置个人 Token 会导致 Check-In 失败。

**Q: Token 过期了怎么办？**

重新生成 Token 后，在个人设置中更新即可。

**Q: 测试连接失败？**

检查 Token 权限是否足够，以及 Token 是否已过期。
