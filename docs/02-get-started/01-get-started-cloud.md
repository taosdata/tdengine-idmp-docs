---
title: 云服务快速上手
sidebar_label: TDengine 云服务
---

# 2.1 云服务快速上手

TDengine Cloud 是面向工业大数据的全托管云服务，基于 Amazon Web Services（AWS）以云原生方式提供 TDengine IDMP 的全部功能。注册即可免费获得 250 美元的试用额度。

## 2.1.1 创建 TDengine Cloud 账户

1. 在浏览器中访问 [cloud.taosdata.com](https://cloud.taosdata.com)。
2. 在**注册**区域，填写邮箱地址和组织名称。
3. 点击**获取验证码**，然后输入发送至邮箱的验证码。

   :::tip
   如果验证码邮件未收到，请检查垃圾邮件文件夹，或重新获取验证码。
   :::

4. 阅读服务条款和隐私政策，点击**注册 TDengine Cloud**。

## 2.1.2 填写账户信息

1. 在显示的页面中，填写姓名和密码。

   :::note
   - 密码长度为 8 到 20 位。
   - 密码必须包含字母、数字和特殊字符。
   - 支持的特殊字符：`. ~ ! @ # $ ^ & *`
   :::

2. （可选）填写手机号和职位。
3. （可选）选择头像图片，支持 1 MB 以内的 JPG 和 PNG 格式。
4. 点击**继续**。

## 2.1.3 创建 IDMP 实例

1. 在弹出的对话框中，选择 **IDMP** 以创建 TDengine IDMP 实例。此过程将同时创建一个 TDengine TSDB-Enterprise 实例。
2. 输入 TDengine IDMP 实例的名称，并选择计费方案。
3. 输入 TDengine TSDB-Enterprise 实例的名称，并选择计费方案。
4. 根据需要选择是否启用高可用的 TDengine TSDB-Enterprise 实例。
5. 点击**创建**。实例将开始创建并启动，此过程可能需要片刻时间。

## 2.1.4 激活与初始化系统

在 TDengine Cloud 上，激活在账户创建过程中自动完成。实例运行后，请继续阅读[第 2.4 节](./04-experiencing-idmp.md)，探索 IDMP 功能。
