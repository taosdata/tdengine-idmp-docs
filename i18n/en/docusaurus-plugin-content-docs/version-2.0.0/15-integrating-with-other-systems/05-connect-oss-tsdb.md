---
title: Connecting to TDengine Community Edition
sidebar_label: Connecting to Community TSDB
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.5 Connecting to TDengine Community Edition

TDengine IDMP can connect to an existing local TDengine TSDB instance — whether Enterprise or Community Edition — by simply modifying the IDMP configuration file.

:::note
This section describes how to connect IDMP to an **existing** TSDB instance. For a fresh deployment, the All-in-one installation method deploys IDMP and TSDB together in a single step. See [Section 14.13](../14-administration/40-all-in-one-deploy/index.md) for details.
:::

## 15.5.1 Configuration File Location

The connection between IDMP and TSDB is configured in a single YAML file:

| Operating System | Configuration File Path |
| ---------------- | ----------------------- |
| Linux / macOS    | `/usr/local/taos/idmp/config/application.yml` |
| Windows          | `C:\TDengine\idmp\config\application.yml` |

In Docker deployments, this file is managed through container volume mounts or environment variables. The configuration parameters are identical to the direct-install scenario.

## 15.5.2 Connection Configuration

Open `application.yml` in a text editor and locate or add the `tda.default-connection` section:

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

Key parameters:

| Parameter       | Description |
| --------------- | ----------- |
| `url`           | TDengine TSDB REST API address, default port `6041`. If TSDB is deployed on a different machine, replace `localhost` with the actual IP address or hostname |
| `username`      | TDengine TSDB username |
| `password`      | TDengine TSDB password |
| `explorer-url`  | taosExplorer access URL, default port `6060`. **For remote IDMP access, this must be set to the server's actual IP address or domain name**, otherwise the browser cannot connect to the Explorer service |

(Optional) Test the connection using the following command:

```bash
curl --request POST \
  --user root:taosdata \
  --url http://<TSDB_IP>:6041/rest/sql \
  --data 'show databases;'
```

If the connection is successful, the list of databases in TDengine TSDB will be displayed.

After modifying the configuration, restart IDMP for the changes to take effect:

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

Or restart the `tdengine-idmp`, `tdengine-idmp-h2`, and `tdengine-idmp-chat` services through Windows Service Manager.

</TabItem>
</Tabs>

## 15.5.3 Limitations When Using Community Edition TSDB

When connecting IDMP to the Community Edition of TDengine TSDB, most core features work as expected — including element modeling, panel visualization, real-time analysis, and event alarms. Based on hands-on testing, the following two limitations apply:

### Data In

**The IDMP Data In feature requires TDengine TSDB Enterprise Edition** and is not available when connected to Community Edition TSDB. If you need Data In to ingest external data sources (such as MQTT, OPC UA, Kafka, etc.) into TSDB, use the Enterprise Edition of TSDB.

### taosExplorer

**The Community Edition of TDengine TSDB does not include taosExplorer**. Explorer is the web-based management interface for TSDB, and IDMP embeds Explorer pages within its UI. If you want these embedded Explorer pages to work while connected to Community Edition TSDB, you can resolve this by **installing taosExplorer separately**:

1. Download the taosExplorer package from the [TDengine Download Center](https://www.taosdata.com/download-center)
2. Install and deploy taosExplorer following its installation guide
3. Point `explorer-url` in the IDMP configuration file to the taosExplorer instance

Once taosExplorer is installed, the embedded Explorer pages in IDMP will function normally.

:::tip Compatibility Note
These limitations stem from version differences in TDengine TSDB, not from IDMP. Feature support may change with future TSDB releases. Always consult the official documentation for your TSDB version before deployment.
:::
