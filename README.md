# TDengine IDMP Documentation

English | [简体中文](README-CN.md)

## Table of Contents

- [TDengine IDMP Documentation](#tdengine-idmp-documentation)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction](#1-introduction)
  - [2. Prepare](#2-prepare)
    - [2.1 Clone the Repo](#21-clone-the-repo)
    - [2.2 Install mise](#22-install-mise)
    - [2.3 Install Development Tools](#23-install-development-tools)
    - [2.4 Install Project Dependencies](#24-install-project-dependencies)
  - [3. Local Development and Production Deployment](#3-local-development-and-production-deployment)
    - [3.1 Start Preview](#31-start-preview)
    - [3.2 Production Build](#32-production-build)
    - [3.3 Production Deployment](#33-production-deployment)
  - [4. Directory Structure](#4-directory-structure)
  - [5. Contribution](#5-contribution)
  - [6. Community Support](#6-community-support)

---

## 1. Introduction

TDengine IDMP (Industrial Data Management Platform) is an AI-native IoT and industrial data management platform. It organizes sensor and device data using a classic tree hierarchy, builds a data catalog, provides contextual and standardized data processing, and offers real-time analytics, visualization, event management, and alerting.

This documentation site is built with [Docusaurus](https://docusaurus.io/) and provides user guides, development documentation, and related resources for TDengine IDMP.

## 2. Prepare

### 2.1 Clone the Repo

```bash
git clone git@github.com:taosdata/tdengine-idmp-docs.git
```

### 2.2 Install mise

This project uses [mise](https://github.com/jdx/mise) as the dev tool version manager and [just](https://github.com/casey/just/) as the command runner. `mise` is a polyglot dev tool version manager, it reads [mise.toml](./mise.toml) and automatically installs the correct versions of  [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) used in this project.

Install mise on Linux/macOS (For other OS, please refer to mise's [Getting Started](https://mise.jdx.dev/getting-started.html) documentation):

```bash
curl https://mise.jdx.dev/install.sh | sh
```

Activate mise in your shell (add to `~/.bashrc`, `~/.zshrc`, or equivalent):

```bash
eval "$(~/.local/bin/mise activate bash)"   # for bash
eval "$(~/.local/bin/mise activate zsh)"    # for zsh
```

Restart your shell session after modifying your rc file. After restarting, run `mise version` to verify installation.

### 2.3 Install Development Tools

Trust current directory and install the dev tools with `mise`:

```bash
cd tdengine-idmp-docs
mise trust
mise install
```

`mise` will automatically install the correct Node.js, pnpm versions specified in `mise.toml`. You can verify with:

```bash
node -v
pnpm -v
just -V
```

### 2.4 Install Project Dependencies

Run the following command to install all required dependencies:

```bash
just install
```

## 3. Local Development and Production Deployment

After editing the documentation, you can start the local development server to preview the website.

### 3.1 Start Preview

The following commands will automatically open a browser window for real-time preview and debugging, suitable for development.

- Start Chinese preview

```bash
just start
```

- Start English preview

```bash
just start-en
```

### 3.2 Production Build

Use the following command to build static files for production into the `build` directory. The generated content can be deployed using any static content hosting service. We use [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/) to deploy the IDMP documentation service.

- Build documentation

```bash
just build
```

- Local preview

```bash
just serve
```

### 3.3 Production Deployment

After code is merged into the main branch, GitHub Actions will automatically trigger the build and deployment process, deploying the generated static files to Azure Static Web Apps.

## 4. Directory Structure

- **`docs/`**: Markdown source files for documentation.
- **`src/`**: Website source code, including pages, components, and styles.
- **`static/`**: Static resource files (such as images, documents, etc.).
- **`build/`**: Directory for built static files.
- **`docusaurus.config.js`**: Website configuration file.
- **`sidebars.js`**: Sidebar configuration for documentation.
- **`i18n/`**: Internationalization configuration files, supporting multi-language documentation.
- **`package.json`**: Project dependencies and script configuration.
- **`mise.toml`**: Dev tool version configuration for [mise](https://mise.jdx.dev/).
- **`justfile`**: Task runner recipes for [just](https://just.systems/).
- **`.github/workflows/`**: GitHub Actions workflow configuration files.
- **`.docsearch/`**: Algolia doc search service configuration directory.
- **`pnpm-lock.yaml`**: Dependency lock file for the project.
- **`README-CN.md`**: Chinese version of the project README.
- **`README.md`**: Project README file.

## 5. Contribution

Contributions to TDengine IDMP documentation are welcome! When contributing, please follow the [TDengine IDMP Documentation Writing Guide](./docs-guide.md), please submit a Pull Request.

## 6. Community Support

If you encounter any problems while using TDengine IDMP or reading the documentation, please contact us via:

- [GitHub Issues](https://github.com/taosdata/tdengine-idmp-docs/issues)
- [Official Support Email](mailto:it@taosdata.com)
