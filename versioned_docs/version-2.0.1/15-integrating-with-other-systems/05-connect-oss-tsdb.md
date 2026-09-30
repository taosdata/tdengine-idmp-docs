---
title: 连接开源版 TSDB
sidebar_label: 连接开源版 TSDB
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.5 连接开源版 TSDB

TDengine IDMP 支持连接用户本地已经部署的 TDengine TSDB 实例，不论是商业版（Enterprise）还是开源版（Community），只需修改 IDMP 的配置文件即可完成对接。

:::note
本文介绍的是将 IDMP 连接到**已有** TSDB 实例的方法。如果是全新部署，推荐使用 All-in-one 安装方式一步完成 IDMP 和 TSDB 的安装部署，详见[第 14.13 节](../14-administration/40-all-in-one-deploy/index.md)。
:::

## 15.5.1 配置文件位置

IDMP 与 TSDB 的连接配置集中在一个 YAML 文件中：

| 操作系统      | 配置文件路径                                    |
| ------------- | ----------------------------------------------- |
| Linux / macOS | `/usr/local/taos/idmp/config/application.yml` |
| Windows       | `C:\TDengine\idmp\config\application.yml`     |

Docker 部署场景下，该文件通过容器挂载或环境变量进行管理，配置项与直装场景一致。

## 15.5.2 连接配置

用文本编辑器打开 `application.yml`，找到或添加 `tda.default-connection` 段落：

```yaml
tda:
  default-connection:
    enable: true
    auth-type: UserPassword
    url: http://<TSDB_IP>:6041
    username: root
    password: taosdata
    explorer-url: http://<TSDB_IP>:6060
```

四个关键参数说明：

| 参数             | 说明                                                                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`          | TDengine TSDB 的 REST API 地址，默认端口`6041`。如果 TSDB 部署在另一台机器上，将 `localhost` 替换为实际的 IP 地址或主机名                        |
| `username`     | TDengine TSDB 用户名                                                                                                                                |
| `password`     | TDengine TSDB 密码                                                                                                                                  |
| `explorer-url` | taosExplorer 的访问地址，默认端口`6060`。**如需远程访问 IDMP，此地址必须配置为服务器的实际 IP 或域名**，否则浏览器将无法连接到 Explorer 服务 |

（可选）执行以下命令测试连接：

```bash
curl --request POST \
  --user root:taosdata \
  --url http://<TSDB_IP>:6041/rest/sql \
  --data 'show databases;'
```

连接成功时，将返回 TDengine TSDB 的数据库列表。

修改配置后，重启 IDMP 服务使配置生效：

<Tabs>
<TabItem label="Linux/macOS" value="linux">

```bash
sudo svc-tdengine-idmp restart
```

</TabItem>
<TabItem label="Windows" value="windows">

```batch
C:\TDengine\idmp\bin\stop-tdengine-idmp.bat
C:\TDengine\idmp\bin\start-tdengine-idmp.bat
```

或通过 Windows 服务管理器重启 `tdengine-idmp`、`tdengine-idmp-h2` 和 `tdengine-idmp-chat` 三个服务。

</TabItem>
</Tabs>

## 15.5.3 开源版 TSDB 的功能限制

IDMP 连接开源版（Community）TSDB 时，大部分核心功能可以正常运行，包括元素建模、面板可视化、实时分析、事件告警等。根据实测验证，存在以下两处功能限制：

### Data In（数据写入）

**IDMP Data In 功能依赖 TDengine TSDB 企业版**，连接开源版 TSDB 时无法使用。如果您需要使用 Data In 将外部数据源（如 MQTT、OPC UA、Kafka 等）写入 TSDB，请使用企业版 TSDB。

### taosExplorer

**开源版 TSDB 默认不包含 taosExplorer 组件**。Explorer 是 TSDB 的 Web 管理界面，IDMP 系统内嵌了 Explorer 页面。如果您希望在连接开源版 TSDB 的同时使用这些前端页面功能，可以通过**单独安装 taosExplorer** 来解决：

1. 从 [TDengine 下载中心](https://www.taosdata.com/download-center) 获取 taosExplorer 安装包
2. 按照安装说明部署 taosExplorer 服务
3. 在 IDMP 配置文件的 `explorer-url` 中指向 taosExplorer 的实际地址

安装 taosExplorer 后，IDMP 中的 Explorer 相关页面功能即可正常使用。

:::tip 兼容性说明
上述限制源自 TDengine TSDB 的版本差异，而非 IDMP 的功能限制。随着 TSDB 版本的更新，功能支持情况可能发生变化。建议在实际部署前，参考当前 TSDB 版本的官方文档确认具体功能支持情况。
:::
