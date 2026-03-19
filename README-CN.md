# TDengine IDMP 文档

[English](README.md) | 简体中文

## 目录

- [TDengine IDMP 文档](#tdengine-idmp-文档)
  - [目录](#目录)
  - [1. 简介](#1-简介)
  - [2. 准备工作](#2-准备工作)
    - [2.1 克隆仓库](#21-克隆仓库)
    - [2.2 安装 mise](#22-安装-mise)
    - [2.3 安装开发工具](#23-安装开发工具)
    - [2.4 安装项目依赖](#24-安装项目依赖)
  - [3. 本地调试及生产部署](#3-本地调试及生产部署)
    - [3.1 启动预览](#31-启动预览)
    - [3.2 生产构建](#32-生产构建)
    - [3.3 生产部署](#33-生产部署)
  - [4. 目录结构](#4-目录结构)
  - [5. 贡献](#5-贡献)
  - [6. 社区支持](#6-社区支持)

---

## 1. 简介

TDengine IDMP (Industrial Data Management Platform) 是一款 AI 原生的物联网、工业数据管理平台。它通过经典的树状层次结构组织传感器、设备采集的数据，建立数据目录，对数据提供语境化、标准化的处理、并提供实时分析、可视化、事件管理与报警等功能。

本文档网站基于 [Docusaurus](https://docusaurus.io/) 构建，提供了 TDengine IDMP 的使用指南、开发文档和相关资源。

## 2. 准备工作

### 2.1 克隆仓库

```bash
git clone git@github.com:taosdata/tdengine-idmp-docs.git
```

### 2.2 安装 mise

本项目使用 [mise](https://github.com/jdx/mise) 作为开发工具版本管理器，使用 [just](https://github.com/casey/just/) 作为命令运行器。`mise` 是一个多语言开发工具版本管理器，它会读取 [mise.toml](./mise.toml) 并自动安装本项目所需的正确版本的 [Node.js](https://nodejs.org/) 和 [pnpm](https://pnpm.io/)。

在 Linux/macOS 上安装 mise（其他操作系统请参考 mise 的[快速开始](https://mise.jdx.dev/getting-started.html)文档）：

```bash
curl https://mise.jdx.dev/install.sh | sh
```

在 shell 中激活 mise（添加到 `~/.bashrc`、`~/.zshrc` 或等效配置文件中）：

```bash
eval "$(~/.local/bin/mise activate bash)"   # for bash
eval "$(~/.local/bin/mise activate zsh)"    # for zsh
```

修改配置文件后请重启 shell 会话。重启后，运行 `mise version` 验证安装是否成功。

### 2.3 安装开发工具

信任当前目录并使用 `mise` 安装开发工具：

```bash
cd tdengine-idmp-docs
mise trust
mise install
```

`mise` 会自动安装 `mise.toml` 中指定的正确版本的 Node.js 和 pnpm。可以通过以下命令验证：

```bash
node -v
pnpm -v
just -V
```

### 2.4 安装项目依赖

执行如下命令安装项目所需的所有依赖项：

```bash
just install
```

## 3. 本地调试及生产部署

修改完文档，可以启动本地开发服务器调试，查看文档网页效果。

### 3.1 启动预览

如下命令会自动打开浏览器窗口，实时预览和调试项目，适合开发阶段使用。

- 启动中文预览

```bash
just start
```

- 启动英文预览

```bash
just start-en
```

### 3.2 生产构建

我们会通过如下命令，构建出生产环境静态文件到 `build` 目录中，生成的内容可以通过任何静态内容托管服务进行部署。我们使用 [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/) 进行 IDMP 文档服务的部署。

- 构建文档

```bash
just build
```

- 本地预览

```bash
just serve
```

### 3.3 生产部署

代码合并至主分支后，GitHub Actions 会自动触发构建和部署流程，将生成的静态文件部署到 Azure Static Web Apps。

## 4. 目录结构

- **`docs/`**: 文档的 Markdown 源文件。
- **`src/`**: 网站的源代码，包括页面、组件和样式。
- **`static/`**: 静态资源文件（如图片、文档等）。
- **`build/`**: 构建后的静态文件目录。
- **`docusaurus.config.js`**: 网站的配置文件。
- **`sidebars.js`**: 文档的侧边栏配置。
- **`i18n/`**: 国际化配置文件，支持多语言文档。
- **`package.json`**: 项目的依赖和脚本配置。
- **`mise.toml`**: [mise](https://mise.jdx.dev/) 开发工具版本配置文件。
- **`justfile`**: [just](https://just.systems/) 任务运行器配置文件。
- **`.github/workflows/`**: GitHub Actions 工作流配置文件。
- **`.docsearch/`**: Algolia 搜索服务配置目录。
- **`pnpm-lock.yaml`**: 项目的依赖锁定文件。
- **`README-CN.md`**: 中文版本的项目自述文件。
- **`README.md`**: 项目的自述文件。

## 5. 贡献

欢迎为 TDengine IDMP 文档贡献内容！贡献时请遵循 [TDengine IDMP 文档写作指南](./docs-guide.md)，并提交 Pull Request。

## 6. 社区支持

如果您在使用 TDengine IDMP 或阅读文档时遇到问题，请通过以下方式联系我们：

- [GitHub Issues](https://github.com/taosdata/tdengine-idmp-docs/issues)
- [官方支持邮箱](mailto:it@taosdata.com)
