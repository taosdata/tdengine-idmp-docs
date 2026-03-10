# 系统配置

系统配置里，您可以配置如下内容：

1. 基本配置：包括隐私数据收集配置等
2. 通知途径：可以创建多个通知途径，通知类型可以是邮件，飞书，Webhook。由于支持 webhook, 原则上各种通知方式都能通过配置 webhook 来支持。第一个用户激活或注册后，他的邮件地址自动配置为一个通知途径。
3. 通知模板：系统需要发送通知，包括邀请用户、重置密码等，这里可以配置各种模板。
4. 邮件服务器配置：IDMP 很多情况下需要发送邮件，包括但不限于：
   - **首次激活**：IDMP 用邮件地址作为用户 ID，首次激活必须通过邮件获取验证码。
   - **邀请用户**：超级管理员通过输入邮件地址邀请其他人成为 IDMP 的用户。
   - **事件通知**：事件触发时，向指定邮箱发送告警信息。

   因此，需要配置 SMTP 服务器。系统安装后，默认使用 TDengine 提供的邮箱服务作为 SMTP 服务器。

## 内网搭建本地邮件服务

如果 IDMP 所在的服务器网络不能访问互联网（内网环境），可使用 [MailHog](https://github.com/mailhog/MailHog) 在内网快速搭建一个轻量级 SMTP 服务。

### 什么是 MailHog？

MailHog 是一款轻量级的邮件测试工具，主要用于模拟 SMTP 服务器。它可以捕获应用程序发送的所有邮件，而不实际发送到真实收件人，非常适合在内网环境中使用邮件相关功能。

### Docker 方式运行 MailHog

#### 1. 拉取 MailHog Docker 镜像

```bash
docker pull mailhog/mailhog:v1.0.1
```

#### 2. 运行 MailHog 容器

```bash
docker run -itd -p 1025:1025 -p 8025:8025 --name mailhog mailhog/mailhog:v1.0.1
```

**参数说明：**
- `-p 1025:1025`：SMTP 端口映射
- `-p 8025:8025`：Web 管理界面端口映射
- `--name mailhog`：容器名称

#### 3. 验证运行状态

```bash
# 查看容器运行状态
docker ps | grep mailhog

# 查看容器日志
docker logs mailhog
```

运行后，可通过浏览器访问 `http://<服务器IP>:8025` 打开 MailHog 的 Web 管理界面查收邮件。

### Docker Compose 方式（可选）

如果需要更复杂的配置或与其他服务一起部署，可以使用 Docker Compose：

```yaml
version: '3'
services:
  mailhog:
    image: mailhog/mailhog:v1.0.1
    container_name: mailhog
    ports:
      - "1025:1025"  # SMTP 端口
      - "8025:8025"  # Web UI 端口
    restart: unless-stopped
```

运行命令：
```bash
docker-compose up -d
```


### 在 IDMP 中配置 MailHog

首次激活 IDMP 时，如果服务器无法访问互联网，系统将弹出邮件服务器配置页面。填写以下参数：

| 参数 | 说明 |
|------|------|
| 主机 | 若 MailHog 独立通过 Docker 部署，填写宿主机 IP；若 MailHog 与 IDMP 同属一个 Docker Compose 网络，填写 Docker 桥接网络 IP（可通过 `docker inspect mailhog` 查看，通常为 `172.17.0.x`） |
| 端口 | `1025` |
| 用户名 / 密码 | 随意填写（MailHog 默认禁用认证） |
| 启用 TLS / 启用认证 | 取消勾选 |
| 发件人 | 填写合法的邮箱格式，如 `support@taosdata.com` |

填写完成后，点击【检查】，提示 `检查通过！` 后点击【保存】。

### 激活流程

1. 浏览器访问 `http://<IDMP服务器IP>:6042`，进入激活页面
2. 填写"邮箱"和"组织"后，点击【获取验证码】，提示 `发送成功`
   > 如果提示 `验证码已经发送，请稍后重试。`，请等待 10 分钟后再试
3. 打开 MailHog Web 界面（`http://<服务器IP>:8025`）查收邮件并获取激活码
4. 在激活界面输入激活码后点击【激活】，激活成功后 MailHog 将再次收到一封欢迎邮件

### 邮件服务器配置更新

激活成功后，可在 IDMP 中验证邮件服务器配置是否已正确保存：

1. 点击右上角头像，选择【管理后台】
2. 进入【系统配置】->【邮件服务器配置】
3. 确认配置已更新为内网邮件服务参数（主机、端口等与 MailHog 配置一致）

### 常见问题

**IDMP 无法连接到 MailHog**
- 确认容器正在运行：`docker ps | grep mailhog`
- 检查端口映射：`docker port mailhog`
- 从 IDMP 容器内部测试能否访问 MailHog 的 1025 端口

**点击获取验证码后，MailHog 未收到邮件**
- 检查 MailHog Web 界面是否可正常访问
- 查看容器日志：`docker logs mailhog`
- 确认 IDMP 中邮件服务器配置已正确保存

**容器重启后邮件记录丢失**

MailHog 默认不持久化存储邮件，如需保留历史记录，可挂载卷：

```bash
docker run -itd -p 1025:1025 -p 8025:8025 \
  -v mailhog-data:/maildir \
  --name mailhog mailhog/mailhog:v1.0.1
```
