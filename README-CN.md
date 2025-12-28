# TDengine IDMP 文档

[English](README.md) | 简体中文

## 目录

- [TDengine IDMP 文档](#tdengine-idmp-文档)
  - [目录](#目录)
  - [1. 简介](#1-简介)
  - [2. 安装](#2-安装)
    - [2.1 安装依赖工具](#21-安装依赖工具)
    - [2.2 安装项目依赖](#22-安装项目依赖)
  - [3. 本地调试及生产部署](#3-本地调试及生产部署)
    - [3.1 启动中英文预览](#31-启动中英文预览)
    - [3.2 生产构建](#32-生产构建)
    - [3.3 生产部署](#33-生产部署)
  - [4. 目录结构](#4-目录结构)
  - [5. 贡献](#5-贡献)
  - [6. 社区支持](#6-社区支持)
  - [7. 许可证](#7-许可证)

---

## 1. 简介

TDengine IDMP (Industrial Data Management Platform) 是一款 AI 原生的物联网、工业数据管理平台。它通过经典的树状层次结构组织传感器、设备采集的数据，建立数据目录，对数据提供语境化、标准化的处理、并提供实时分析、可视化、事件管理与报警等功能。

本文档网站基于 [Docusaurus](https://docusaurus.io/) 构建，提供了 TDengine IDMP 的使用指南、开发文档和相关资源。

## 2. 安装

### 2.1 安装依赖工具

本项目需要安装 [Node.js](https://nodejs.org/), 版本 18.0 或以上（可以通过运行 node -v 来检查）。您可以使用 nvm 来管理安装的单台计算机上的多个 Node 版本。再通过 npm 全局安装 pnpm：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install node
npm install -g pnpm
pnpm --version
```

### 2.2 安装项目依赖

进入项目仓库目录，执行如下命令，这将安装项目所需的所有依赖项。

```bash
pnpm install  
```

## 3. 本地调试及生产部署

修改完文档，可以启动本地开发服务器调试，查看文档网页效果。

### 3.1 启动中英文预览

如下命令会自动打开浏览器窗口，实时预览和调试项目，适合开发阶段使用。

- 启动中文预览

```bash
pnpm start  --host 0.0.0.0
```

- 启动英文预览

```bash
pnpm start --host 0.0.0.0 --locale en
```

### 3.2 生产构建

我们会将通过如下命令，构建出生产环境静态文件到 `build` 目录中，生成的内容可以通过任何静态内容托管服务进行部署。我们使用 [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/) 进行 IDMP 文档服务的部署。

- 构建文档

```bash
pnpm build
```

- 本地预览

```bash
pnpm  serve 
```

### 3.3 生产部署

代码合并至主分支后，GitHub Actions 会自动触发构建和部署流程，将生成的静态文件部署到 Azure Static Web Apps。

## 4. 目录结构

- **`docs/`**: 文档的 md 源文件。
- **`src/`**: 网站的源代码，包括页面、组件和样式。
- **`static/`**: 静态资源文件（如图片、文档等）。
- **`build/`**: 构建后的静态文件目录。
- **`docusaurus.config.js`**: 网站的配置文件。
- **`sidebars.js`**: 文档的侧边栏配置。
- **`i18n/`**: 国际化配置文件，支持多语言文档。
- **`package.json`**: 项目的依赖和脚本配置。
- **`.github/workflows/`**: GitHub Actions 工作流配置文件。
- **`.docsearch/`**: Algolia 搜索服务配置目录，包含搜索索引规则和站点地图配置，为文档网站提供智能搜索功能。
- **`pnpm-lock.yaml`**: 项目的依赖锁定文件。
- **`README-CN.md`**: 中文版本的项目自述文件。
- **`README.md`**: 项目的自述文件。

## 5. 贡献

欢迎为 TDengine IDMP 文档贡献内容！请提交 Pull Request 或报告问题。

## 6. 社区支持

如果您在使用 TDengine IDMP 或阅读文档时遇到问题，请通过以下方式联系我们：

- [GitHub Issues](https://github.com/taosdata/tdengine-idmp-docs/issues)
- [官方支持邮箱](mailto:it@taosdata.com)

## 7. 许可证
