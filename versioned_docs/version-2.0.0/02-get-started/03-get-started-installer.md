---
title: 安装包快速上手
sidebar_label: 安装包
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PkgListV37 from "/src/components/PkgListZh";

# 2.3 安装包快速上手

TDengine IDMP 支持在 Linux、macOS 或 Windows 机器上进行本地安装。

TDengine 官网下载中心提供了 All-in-one 安装方式，可以一行命令完成 TDengine 所有模块包含 IDMP 的安装部署，支持 Docker、Linux 和 Windows 等部署环境，详细过程请阅读[第 14.13 节](../14-administration/40-all-in-one-deploy/index.md)

## 2.3.1 系统要求

安装前，请确保以下前置条件已满足：

- TDengine TSDB-Enterprise 3.4.1.7 或更高版本——必须已安装并运行。参见 [使用安装包部署](https://docs.taosdata.com/get-started/package/)。
- Java 21 或更高版本 (安装命令将自动安装)
- glibc 2.28 或更高版本（仅针对 Linux）
- Microsoft Visual C++ Redistributable 14.44 或更高版本 (安装命令将自动安装, 仅针对 Windows)
- 稳定连接互联网
- 已正确配置的系统时区。请参考操作系统的用户手册进行设置。

如需了解完整的硬件和操作系统要求，请参见[部署规划](../14-administration/02-planning.md)。

## 2.3.2 安装 TDengine IDMP

请参照官网下载中心 TDengine IDMP-Enterprise 提供的一键部署命令行，复制粘贴至终端，进行安装。

:::tip
在 Linux 系统中，需以 `root` 身份执行命令行；在 Windows 系统中，需以管理员身份打开 Powershell 窗口，执行命令行。
:::

## 2.3.3 配置与 TDengine TSDB 的连接

用文本编辑器打开配置文件：

- Linux / macOS：`/usr/local/taos/idmp/config/application.yml`
- Windows：`C:\TDengine\idmp\config\application.yml`

在 `tda.default-connection` 下，配置连接信息：

```yaml
tda:
  default-connection:
    enable: true
    auth-type: UserPassword
    url: http://localhost:6041
    username: root
    password: taosdata
    explorer-url: http://localhost:6060
```

| 参数             | 说明                                                                                                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`          | TDengine REST 接口地址，默认端口 6041                                                                                                                                                     |
| `username`     | TDengine 用户名                                                                                                                                                                           |
| `password`     | TDengine 密码                                                                                                                                                                             |
| `explorer-url` | taosExplorer 的访问地址，默认端口 6060。**如需远程访问 IDMP，必须将此地址配置为服务器的实际 IP 或域名**（例如 `http://192.168.1.100:6060`），否则浏览器将无法连接到 Explorer 服务 |

（可选）执行以下命令测试与 TDengine TSDB-Enterprise 的连接：

```bash
curl --request POST \
  --user root:taosdata \
  --url http://localhost:6041/rest/sql \
  --data 'show databases;'
```

连接成功时，将返回 TDengine TSDB-Enterprise 的数据库列表。

## 2.3.4 启动 IDMP 服务

<Tabs>
<TabItem label="Linux/macOS" value="linux">

```bash
sudo svc-tdengine-idmp start
```

</TabItem>
<TabItem label="Windows 安装" value="windows">

```batch
C:\TDengine\idmp\bin\start-tdengine-idmp.bat
```

或通过 Windows 服务管理器启动 `tdengine-idmp-ui` 、 `tdengine-idmp-backend` 、 `tdengine-idmp-h2` 、 `tdengine-idmp-chat` 和 `tdengine-idmp-cls` 五个服务。

</TabItem>
</Tabs>

默认情况下，TDengine IDMP 服务监听主机的以下端口：

- HTTP 访问：`http://localhost:6042` 或 `http://ip:6042`
- HTTPS 访问：`https://localhost:6034` 或 `https://ip:6034`

## 2.3.5 激活

1. 首次访问时，您需要激活服务。在填写"邮箱"和"组织"后，点击**获取激活码**，系统会向您填写的邮箱发送一封激活邮件，输入邮件中的激活码后，点击**激活**，即可完成账户激活。

   :::note
   为方便 AI 相关功能的体验，IDMP 安装后预置了 DeepSeek 的 API key，有效期 7 天。到期后，请在 TDengine IDMP 的**管理后台 → 连接**更新您的 API key。
   :::

2. 激活码验证通过后，会弹出**隐私配置**对话框，您可以根据需求选择信息采集项，采集的信息将帮助我们改进产品，您的业务及生产数据绝不会被采集，配置完成后，请点击**同意**。

## 2.3.6 配置用户信息

1. 激活产品后，将进入用户信息配置页面。
2. 请根据系统提示，填写您的姓名和手机号。
3. 请设置系统的登录密码。
4. 密码验证通过后，就完成了用户信息的配置，点击**继续**，

## 2.3.7 配置许可信息

1. 完成用户信息配置后，将进入软件许可选择页面
2. 用户可以选择免费版许可和商业版许可两种模式
3. 如果选择免费许可，当用户点击同意免费版软件使用条款后，系统将自动生成免费版软件许可
4. 如果选择商业版许可，此时用户需要输入从涛思公司获得的商业版软件许可码
5. 完成许可配置后，系统将自动跳转到加载示例场景页面。

请继续阅读[第 2.4 节](./04-experiencing-idmp.md)，探索 IDMP 功能。
