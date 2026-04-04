---
title: 邮件问题排查
sidebar_label: 邮件问题排查
---

# 18.1 邮件问题排查

本文用于排查 IDMP 的邮件发送故障，覆盖验证码邮件、密码重置邮件和 SMTP 连通性异常等场景。

## 18.1.1 适用范围

当出现以下现象时，可参考本文执行邮件问题排查：

- 注册验证码发送失败。
- 登录验证码发送失败。
- 忘记密码邮件发送失败。
- 应用侧显示发送成功，但收件人未实际收到邮件。
- SMTP 认证失败、连接失败、发送超时或明显延迟。

## 18.1.2 排查前的判断

在开始排查前，需要先区分邮件发送链路中的三个“成功”层级，避免仅凭接口返回结果误判问题已经解决。

<table>
<colgroup><col style="width:11em"/><col/><col/></colgroup>
<thead><tr><th>成功层级</th><th>含义</th><th>典型证据</th></tr></thead>
<tbody>
<tr><td>接口调用成功</td><td>HTTP 请求被后端接受</td><td>接口返回 <code>200</code> 或业务成功响应</td></tr>
<tr><td>应用发送链路成功</td><td>应用已将消息送入邮件发送流程</td><td>日志中出现发信成功相关记录</td></tr>
<tr><td>最终送达成功</td><td>邮件系统已接收并投递到收件方</td><td>收件箱实际可见，或 SMTP 服务商后台显示投递成功</td></tr>
</tbody>
</table>

仅满足前两层，并不表示邮件一定已经进入收件箱。

## 18.1.3 快速排查步骤

建议按接口、日志、配置和外部投递结果逐步排查。

### 18.1.3.1 触发一次真实邮件发送

排查时应优先使用真实接口触发完整链路，而不是仅查看配置页面。

常用接口如下：

<table>
<colgroup><col style="width:9em"/><col/><col/></colgroup>
<thead><tr><th>场景</th><th>方法</th><th>路径</th></tr></thead>
<tbody>
<tr><td>忘记密码邮件</td><td><code>POST</code></td><td><code>/api/v1/users/password-reset-email</code></td></tr>
<tr><td>注册验证码</td><td><code>POST</code></td><td><code>/api/v1/users/send/register-code</code></td></tr>
<tr><td>登录验证码</td><td><code>POST</code></td><td><code>/api/v1/users/send/verifycode</code></td></tr>
</tbody>
</table>

忘记密码邮件测试示例如下：

```bash
curl -X POST 'http://idmp.example.com:6042/api/v1/users/password-reset-email' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "user@example.com"
  }'
```

注册验证码测试示例如下：

```bash
curl -X POST 'http://idmp.example.com:6042/api/v1/users/send/register-code' \
  -H 'Content-Type: application/json' \
  -H 'Accept-Language: en-US' \
  -d '{
    "email": "user@example.com"
  }'
```

登录验证码测试示例如下：

```bash
curl -X POST 'http://idmp.example.com:6042/api/v1/users/send/verifycode' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "user@example.com"
  }'
```

预期现象如下：

- HTTP 状态码为 `200`。
- 响应体为成功结果，例如 `{"code":200,"message":"success"}`。

如果接口直接失败，应优先检查以下内容：

- 请求路径是否正确。
- 服务是否正常运行。
- 反向代理、网关或权限配置是否拦截请求。

### 18.1.3.2 确认请求是否到达后端

请求日志通常记录在主日志文件中。若接口未真正到达后端，后续发送链路排查将没有意义。

主日志文件如下：

- `/var/log/taos/idmp/logs/tda.log`

可先检查接口触发日志：

```bash
grep -nE 'Request: POST.*/api/v1/users/' tda.log
```

针对具体接口过滤：

```bash
grep -nE 'Request: POST.*/users/send/register-code|Request: POST.*/users/send/verifycode|Request: POST.*/users/password-reset-email' tda.log
```

预期现象如下：

- 能看到 `Request: POST ...` 日志。
- 同一请求后还能看到对应的 `Response: POST ... 200 duration ...ms` 日志。

如果完全没有请求日志，通常说明请求尚未进入后端。此时应重点排查网关、Ingress、反向代理、前端调用路径和环境地址配置。如果请求发生在日志切分前，还需补查历史归档日志 `tda.log.yyyy-MM-dd.gz`。

### 18.1.3.3 检查消息发送链路日志

邮件发送通常通过异步任务处理。触发接口后，建议等待 `2` 到 `5` 秒，再检索发送链路相关日志。

常见成功日志如下：

- `Generated register verify code for debug...`
- `start process send task...`
- `send email to ..., title: ...`
- `send message success in MsgSendService`
- `send msg success detailId: ...`

常见失败日志如下：

- `send message failed in MsgSendService`
- `send msg failed cause by SendMsgException`
- `Failed to send email to ...`
- `Authentication failed for user ...`
- `Mail server connection failed`

推荐命令如下：

```bash
grep -nE 'send email to|send message success|send msg success detailId' tda.log
```

```bash
grep -nEi 'failed|exception|error' tda-error.log | grep -i mail
```

```bash
grep -nE 'Authentication failed|Invalid credentials' tda.log
```

```bash
grep -nE 'connection failed|timeout|refused' tda.log
```

建议按以下原则判断：

- 看到 `send email to`，说明已进入具体发信实现。
- 看到 `send msg success detailId`，说明应用侧认为发送流程完成。
- 出现 `Authentication failed`，应优先排查 SMTP 用户名、授权码或密码。
- 出现 `Mail server connection failed`，应优先排查网络、端口、防火墙和 DNS。

### 18.1.3.4 确认实际生效的邮件配置

邮件配置可能来自系统配置或配置文件，排查时应先确认当前请求实际使用的是哪一套配置。

配置优先级如下：

1. 如果系统配置中已配置邮件服务，则优先使用系统配置。
2. 如果没有邮件配置，则回退到 `application.yml` 中的默认邮件配置。

系统配置建议重点核对以下字段：

- `host`
- `port`
- `username`
- `password`
- `from`
- `tls`
- `auth`

### 18.1.3.5 验证 SMTP 连通性

当需要区分“应用问题”与“SMTP 环境问题”时，应直接验证 SMTP 连通性和域名解析情况。

应用内可用的检测接口如下：

- `POST /api/v1/system/email/default-connectivity`：检测当前默认邮件配置是否可连通。
- `POST /api/v1/system/email/connectivity`：检测指定 SMTP 配置是否可连通。

如果只做网络层排查，可直接在部署机执行以下命令：

```bash
telnet smtp.example.com 465
```

```bash
nc -vz smtp.example.com 465
```

```bash
nslookup smtp.example.com
```

重点确认以下内容：

- SMTP 主机名是否可解析。
- 端口是否可建立 TCP 连接。
- 使用的端口是否与 TLS 或 SSL 策略匹配。
- 服务器所在网络是否限制了对外 SMTP 访问。

### 18.1.3.6 确认最终送达

应用日志中的成功仅能证明应用侧完成了发送动作，不代表邮件一定已经进入收件箱。

至少应通过以下任一方式确认真实送达：

- 登录 SMTP 服务商后台，查看投递日志状态是否为 `accepted`、`rejected` 或 `deferred`。
- 让收件人检查收件箱和垃圾邮件箱。
- 核对收件人地址是否真实有效。

## 18.1.4 建议的追查顺序

邮件问题建议按固定顺序逐项确认，以降低误判概率。

1. 确认接口触发是否成功。
2. 确认后端是否收到请求。
3. 确认异步发送任务是否开始处理。
4. 确认邮件发送实现是否报认证或连接错误。
5. 必要时确认数据库是否留下对应发送记录。
6. 确认 SMTP 服务商是否接受邮件。
7. 确认收件箱中是否真实可见。

## 18.1.5 常见故障与处理建议

下列场景覆盖了邮件问题排查中最常见的几类异常。

### 18.1.5.1 认证失败

当日志中出现 `Authentication failed` 或 `Invalid credentials` 时，通常表示 SMTP 账号认证阶段失败。

可能原因如下：

- SMTP 用户名或密码错误。
- 邮箱服务商要求使用授权码，而非登录密码。
- 账号被锁定、风控或授权已过期。
- 已开启双因素认证，但未使用应用专用密码。

建议执行以下检查：

- 核对数据库或配置文件中的用户名、密码和授权码。
- 登录邮箱服务商后台确认账号状态是否正常。
- 使用其他邮件客户端验证同一账号能否连通 SMTP。
- 检查是否需要重新生成应用专用密码。

### 18.1.5.2 连接失败

当日志中出现 `Mail server connection failed`、`timeout` 或 `refused` 时，通常表示网络或端口连通性存在问题。

可能原因如下：

- 网络不通。
- 防火墙限制 SMTP 端口。
- SMTP 主机或端口配置错误。
- DNS 解析异常。
- 端口与 TLS 配置不匹配。

建议执行以下检查：

- 使用 `telnet` 或 `nc` 测试端口可达性。
- 检查防火墙和安全组是否放行 `25`、`465`、`587`。
- 确认 SMTP 地址拼写和端口配置正确。
- 使用 `nslookup` 验证 DNS 解析。
- 确认启用 TLS 时所用端口与服务商要求一致。

### 18.1.5.3 应用记录成功但用户未收到邮件

当应用日志显示成功，而收件方未看到邮件时，问题通常发生在应用外部的投递或收件阶段。

可能原因如下：

- SMTP 服务商已接收邮件，但被对方邮件系统拒收。
- 邮件进入垃圾邮件箱。
- 收件人地址错误。

建议执行以下检查：

- 查看 SMTP 服务商的投递日志。
- 让收件人检查垃圾邮件箱和过滤规则。
- 再次确认收件地址拼写。
- 核对发件域名的邮件认证配置是否完整。

### 18.1.5.4 发送延迟或超时

当接口成功但发信明显延后，或发送链路出现超时日志时，应同时排查应用侧排队和 SMTP 响应性能。

可能原因如下：

- SMTP 服务器响应慢。
- 网络波动导致连接或发送超时。
- 异步队列积压。
- 邮件内容过大或包含复杂内联资源。

建议执行以下检查：

- 观察同一时间段是否存在大量邮件并发发送。
- 测试 SMTP 服务端响应时间。
- 检查邮件正文、附件或内联图片是否异常膨胀。

## 18.1.6 关键检查点

为避免遗漏关键信息，建议从配置和日志两个维度同步核对邮件发送状态。

- 配置维度：确认是否启用了数据库邮件配置，若未启用数据库配置，当前语言会命中哪套默认文件配置，并核对 `host`、`port`、`username`、`from`、`tls`、`auth` 是否完整一致。
- 日志维度：确认是否存在接口请求日志、异步发送任务日志、具体发信日志，以及认证失败、连接失败和重试失败等异常信息。

## 18.1.7 最佳实践

为提高后续排查效率，建议保留以下排查习惯和观测信息。

1. 先通过真实接口复现问题，再分析日志和配置。
2. 记录复现时间、收件地址、语言和接口路径，便于日志检索。
3. 同时检查接口日志、发送日志、必要的数据库记录和外部投递日志，避免单点判断。
4. 定期统计发送成功率、认证失败率、连接失败率和重试次数，尽早发现环境问题。
