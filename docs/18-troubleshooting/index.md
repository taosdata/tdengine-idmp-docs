---
title: 问题排查
sidebar_label: 问题排查
---

## 确认问题

在使用 TDengine IDMP 的过程中，如果遇到问题，请先关闭浏览器的缓存，再刷新页面后重试。具体操作如下所示：

1. 打开浏览器的开发者工具。
2. 切换到**网络**标签页。
3. 勾选**停用缓存**选项。
4. 刷新页面，检查问题是否仍然存在。

如果问题仍然存在，请按照以下步骤，收集前后端的错误信息，以便于我们进行排查。

## 收集前端信息

### 收集控制台的错误信息

1. 打开浏览器的开发者工具。
2. 切换到**控制台**标签页。
3. 如果控制台中存在错误，请右键单击控制台中的错误，选择**另存为**将错误保存到文件中。

### 收集网络请求的信息

1. 打开浏览器的开发者工具。
2. 切换到**网络**标签页。
3. 如果存在失败的请求，请右键单击失败的请求（显示为红色），选择**复制**。将以下内容保存到文件中：
   - 请求头
   - 响应头
   - 响应体
   - 堆栈跟踪（如果可用）

## 收集后端日志

### 本地安装方式

如果您是通过本地安装方式部署的 TDengine IDMP，日志文件可以在以下位置找到：

| 组件 | 日志文件路径 |
| --- | --- |
| TDengine IDMP 日志 | `/var/log/taos/tda.log` |
| TDengine IDMP 错误日志 | `/var/log/taos/tda-error.log` |
| TDengine IDMP AI 日志 | `/var/log/taos/idmp-ai.log` |
| TDengine IDMP AI 错误日志 | `/var/log/taos/idmp-ai-error.log` |
| TDengine TSDB-Enterprise 日志 | `/var/log/taos/taosdlog.*` |

### 容器化部署方式

如果您是通过容器化方式部署的 TDengine IDMP，可以通过以下命令将日志文件从容器内复制到本地：

```bash
docker cp tdengine-tsdb:/var/log/taos/taosdlog.* ./
docker cp tdengine-idmp:/var/log/taos/tda.log ./
docker cp tdengine-idmp:/var/log/taos/tda-error.log ./
docker cp tdengine-idmp:/var/log/taos/idmp-ai.log ./
docker cp tdengine-idmp:/var/log/taos/idmp-ai-error.log ./
```

## 提交问题

我们使用 [GitHub Issues](https://github.com/taosdata/tdengine-idmp-docs/issues/new/choose) 来跟踪和管理问题。请按照 GitHub Issues 的模板，提交以上收集到的信息，我们的支持团队会尽快回复并帮助您解决问题。
