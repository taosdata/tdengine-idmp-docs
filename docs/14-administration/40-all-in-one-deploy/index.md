---
title: TDengine All-in-One 一键部署
sidebar_label: TDengine All-in-One 一键部署
---

import DocCardList from '@theme/DocCardList';

# 14.13 TDengine All-in-One 安装部署

TDengine All-in-One 是面向多种业务场景的 AI 工业数据平台，将 IDMP、TSDB、TDgpt 和 TDmodel 组合为一个统一的部署包。

TDengine All-in-One 使用脚本作为安装入口。Linux、Windows 和 Docker 部署都采用相同的基于 Apex 的流程。

:::note
目前，TDmodel 仅支持通过 Docker 部署。Linux 和 Windows 的主机模式部署暂不支持 TDmodel。
:::

## 14.13.1 主要特性

- 支持 All-in-One 部署场景：TSDB + IDMP + TDgpt + TDmodel
- 支持通过部署 YAML 和组件 YAML 配置部署拓扑、组件版本、依赖关系、安装包和资源包
- 提供统一的安装入口，支持在线安装
- 支持 Linux、Windows 和 Docker 交付形态
- 支持单机部署和多节点主机部署
- 多节点主机部署基于 SSH 免密登录

## 14.13.2 通用要求

部署前，请确认以下事项：

- Linux 需要 `root` 权限，Windows 需要管理员权限
- 多节点主机部署时，所有目标节点都已安装 OpenSSH Server
- 如果计划使用 Docker 部署，已安装 Docker Engine 20.10 或更高版本
- TDgpt 默认启用 moirai 模型，要求 x64 CPU 必须支持 AVX2。对于 Docker 部署，宿主机还必须向容器暴露 AVX2

## 14.13.3 一键部署流程

访问 TDengine 下载中心，可以找到 All-in-One 的安装指南和一键部署命令。

1. 执行安装命令，从互联网下载并执行安装脚本
2. 对于 Docker 部署，根据提示选择是否跳过自动 registry 配置
3. 让部署脚本完成自动化安装：
   1. 下载安装包、依赖包和资源包
   2. 上传到目标节点
   3. 启动服务

默认情况下，一键部署会在本机安装全部 All-in-One 组件。

如果需要自定义部署，可以在 Apex 下载完成后退出流程，参考 `~/.apex/manifests/deployment-xxx.yaml` 创建自定义部署文件，然后执行：

```bash
apex deploy -f <custom-yaml>
```

默认部署使用的清单文件为：

- `deployment-single-node-no-tdmodel.yaml`

## 14.13.4 按平台查看安装指南

<DocCardList />

## 14.13.5 部署完成后访问 IDMP

部署成功后，在浏览器中打开 IDMP：

```text
http://localhost:6042
```

如果从另一台机器访问，请将 `localhost` 替换为部署节点的主机名或 IP 地址。
