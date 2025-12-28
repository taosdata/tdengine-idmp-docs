# TDengine IDMP Documentation

English | [简体中文](README-CN.md)

## Table of Contents

- [TDengine IDMP Documentation](#tdengine-idmp-documentation)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction](#1-introduction)
  - [2. Installation](#2-installation)
    - [2.1 Install Prerequisite Tools](#21-install-prerequisite-tools)
    - [2.2 Install Project Dependencies](#22-install-project-dependencies)
  - [3. Local Development and Production Deployment](#3-local-development-and-production-deployment)
    - [3.1 Start Preview](#31-start-preview)
    - [3.2 Production Build](#32-production-build)
    - [3.3 Production Deployment](#33-production-deployment)
  - [4. Directory Structure](#4-directory-structure)
  - [5. Contribution](#5-contribution)
  - [6. Community Support](#6-community-support)
  - [7. License](#7-license)

---

## 1. Introduction

TDengine IDMP (Industrial Data Management Platform) is an AI-native IoT and industrial data management platform. It organizes sensor and device data using a classic tree hierarchy, builds a data catalog, provides contextual and standardized data processing, and offers real-time analytics, visualization, event management, and alerting.

This documentation site is built with [Docusaurus](https://docusaurus.io/) and provides user guides, development documentation, and related resources for TDengine IDMP.

## 2. Installation

### 2.1 Install Prerequisite Tools

This project requires [Node.js](https://nodejs.org/) version 18.0 or above (you can check with `node -v`). You can use nvm to manage multiple Node versions on a single machine. Then, install pnpm globally via npm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install node
npm install -g pnpm
pnpm --version
```

### 2.2 Install Project Dependencies

Navigate to the project repository directory and run the following command to install all required dependencies:

```bash
pnpm install  
```

## 3. Local Development and Production Deployment

After editing the documentation, you can start the local development server to preview the website.

### 3.1 Start Preview

The following commands will automatically open a browser window for real-time preview and debugging, suitable for development.

- Start Chinese preview

```bash
pnpm start  --host 0.0.0.0
```

- Start English preview

```bash
pnpm start --host 0.0.0.0 --locale en
```

### 3.2 Production Build

Use the following command to build static files for production into the `build` directory. The generated content can be deployed using any static content hosting service. We use [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/) to deploy the IDMP documentation service.

- Build documentation

```bash
pnpm build
```

- Local preview

```bash
pnpm serve 
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
- **`.github/workflows/`**: GitHub Actions workflow configuration files.
- **`.docsearch/`**: Algolia doc search service configuration directory.
- **`pnpm-lock.yaml`**: Dependency lock file for the project.
- **`README-CN.md`**: Chinese version of the project README.
- **`README.md`**: Project README file.

## 5. Contribution

Contributions to TDengine IDMP documentation are welcome! Please submit a Pull Request or report issues.

## 6. Community Support

If you encounter any problems while using TDengine IDMP or reading the documentation, please contact us via:

- [GitHub Issues](https://github.com/taosdata/tdengine-idmp-docs/issues)
- [Official Support Email](mailto:it@taosdata.com)

## 7. License
