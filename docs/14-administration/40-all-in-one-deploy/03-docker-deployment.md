---
title: TDengine All-in-One Docker 部署
sidebar_label: All-in-One on Docker
---

# 14.13.3 TDengine All-in-One Docker 部署

本文介绍如何使用 Docker 部署 TDengine All-in-One。

Docker 部署支持以下平台：

- Linux
- Windows
- macOS

其中 macOS 仅支持 Docker 部署，不支持主机部署。

## 14.13.3.1 环境要求

部署前，请确认系统满足以下要求：

- Docker Engine `20.10` 或更高版本，以及 docker compose plugin
- 在 Windows 或 macOS 上部署前，Docker Desktop 已启动
- Windows 需要管理员权限，Linux 需要 `root` 权限
- 可稳定访问互联网

## 14.13.3.2 准备 Docker

确认 Docker 已安装并正常运行。

检查 Docker 版本：

```bash
docker version
```

检查 Docker 服务：

```bash
docker info
```

## 14.13.3.3 执行 Docker 部署

### 14.13.3.3.1 Linux

以 `root` 身份执行以下命令：

```bash
curl -fsSL https://downloads.taosdata.com/apex/install.sh | bash -s -- -m docker
```

### 14.13.3.3.2 macOS

打开终端并执行：

```bash
curl -fsSL https://downloads.taosdata.com/apex/install.sh | bash -s -- -m docker
```

开始部署前，必须先启动 Docker Desktop。

### 14.13.3.3.3 Windows

以管理员身份打开 PowerShell 并执行：

```powershell
iwr https://downloads.taosdata.com/apex/install.ps1 -UseBasicParsing -OutFile $env:TEMP\apex-install.ps1; & $env:TEMP\apex-install.ps1 -Mode docker
```

当部署提示出现时，按 Enter 继续安装。

## 14.13.3.4 标准部署文件

默认部署清单文件为：

- `deployment-single-node-no-tdmodel.yaml`

使用该清单可部署完整的 TDengine All-in-One 平台。

## 14.13.3.5 Docker 镜像下载加速

在安装过程中，你可以选择自动配置 registry ，让部署脚本完成 Docker 配置。

如果你希望手动配置 `registry-mirrors`，请参考以下说明。

在中国大陆，从 Docker Hub 拉取 TDengine Docker 镜像可能较慢。为改善体验，北京涛思数据在阿里云容器镜像服务上托管了 TDengine Docker 镜像。

### 14.13.3.5.1 Linux

编辑 `/etc/docker/daemon.json` 并添加：

```json
{
  "registry-mirrors": [
    "https://tdengine-registry.cn-beijing.cr.aliyuncs.com"
  ]
}
```

然后重新加载配置并重启 Docker：

```bash
systemctl daemon-reload && systemctl restart docker
```

### 14.13.3.5.2 Windows

编辑 `C:\ProgramData\Docker\config\daemon.json`，或者打开 Docker Desktop，在 **Docker Engine** 选项卡中更新 JSON：

```json
{
  "registry-mirrors": [
    "https://tdengine-registry.cn-beijing.cr.aliyuncs.com"
  ]
}
```

然后重启 Docker：

- Docker Desktop：点击 **Apply & Restart**
- Windows Server：`Restart-Service docker`
- Windows 10/11：`sc restart docker`

### 14.13.3.5.3 macOS

在 Docker Desktop 中打开 **Docker Engine** 选项卡，并应用相同的 JSON 配置：

```json
{
  "registry-mirrors": [
    "https://tdengine-registry.cn-beijing.cr.aliyuncs.com"
  ]
}
```

然后点击 **Apply & Restart**。

## 14.13.3.6 管理 Docker 容器

查看日志：

```bash
docker logs <container-name>
```

停止所有容器 - Linux & macOS：

```bash
cd ~/.apex/docker
./tdengine.sh stop
```

停止所有容器 - Windows：

```bash
cd C:\Users\Administrator\.apex\docker
./tdengine.ps1 stop
```

启动所有容器 - Linux & macOS：

```bash
cd ~/.apex/docker
./tdengine.sh start
```

启动所有容器 - Windows：

```bash
cd C:\Users\Administrator\.apex\docker
./tdengine.ps1 start
```

不要删除生成的部署目录。该目录中可能包含 Docker Compose 文件、环境文件、卷映射、网络配置、组件配置以及升级或维护相关的元数据。

## 14.13.3.7 故障排查

### 14.13.3.7.1 Docker 未运行

检查 Docker：

```bash
docker info
```

在 Linux 上，如有需要可启动并设置 Docker 开机自启：

```bash
systemctl start docker
systemctl enable docker
```

在 Windows 或 macOS 上，打开 Docker Desktop 并等待 Docker 引擎启动。

### 14.13.3.7.2 运行 Docker 时权限不足

在 Linux 上，请以 `root` 身份执行部署。

验证当前用户：

```bash
whoami
```

预期输出：

```text
root
```

### 14.13.3.7.3 Docker 镜像拉取失败

可能原因包括：

- 互联网访问受限
- 镜像代理配置错误
- DNS 解析失败

可以直接测试镜像拉取：

```bash
docker pull <image-name>
```

在国内需要配置镜像代理以拉取镜像，详情参见 14.13.3.5 章节。

### 14.13.3.7.4 Docker 镜像下载缓慢

验证配置：

```bash
docker info
```

检查输出中的 `Registry Mirrors` 部分。

### 14.13.3.7.5 容器启动后退出

查看容器状态：

```bash
docker ps -a
```

查看日志：

```bash
docker logs <container-name>
```

常见原因包括：

- 配置无效
- 端口冲突
- 内存不足
- 磁盘空间不足
- 缺少依赖
- 权限不正确
- 无法连接到其他 All-in-One 组件

### 14.13.3.7.6 容器反复重启

检查重启状态：

```bash
docker ps -a
```

查看日志：

```bash
docker logs --tail 200 <container-name>
```

在重启 IDMP、TDgpt 或 TDmodel 之前，请确认 TSDB 等依赖服务已经可用。

### 14.13.3.7.7 端口冲突

在 Linux 上查看端口是否占用：

```bash
ss -lntp
ss -lntp | grep <port>
```

在 Windows PowerShell 上查看端口是否占用：

```powershell
Get-NetTCPConnection -State Listen
```

在重启容器之前，请先解决端口冲突或更新部署配置。

### 14.13.3.7.8 磁盘空间不足

检查主机存储：

```bash
df -h
docker system df
```

除非你已经确认 Docker 卷中不包含所需的 TDengine All-in-One 数据，否则不要删除这些卷。

### 14.13.3.7.9 内存不足

检查容器资源使用情况：

```bash
docker stats
```

如果使用 Docker Desktop，请增加 Docker 的内存分配。在 Windows 或 macOS 上，可以在 **Docker Desktop > Settings > Resources** 中调整。

## 14.13.3.8 体验 IDMP

部署成功后，打开浏览器输入以下地址，进入 IDMP：

```text
http://localhost:6042
```

如果你从另一台机器访问，请将 `localhost` 替换为安装 TDengine 的服务器主机名或 IP 地址。

## 14.13.3.9 清除所有已下载的 All-in-One 镜像

- Linux & macOS：

```bash
cd ~/.apex/docker
./tdengine.sh clean
```

- Windows：

```bash
cd C:\Users\Administrator\.apex\docker
./tdengine.ps1 clean
```
