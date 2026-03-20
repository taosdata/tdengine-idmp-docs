---
title: 升级 TDengine IDMP
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

TDengine IDMP 推荐使用安装脚本进行升级。安装脚本会自动检测现有安装环境，并根据实际情况选择升级模式，确保用户数据和配置文件安全。具体说明如下：

- **升级模式自动检测**：安装脚本会自动判断是否为升级安装。
- **数据与配置保护**：在升级模式下，安装脚本不会覆盖或修改以下目录及其内容：

<Tabs>
<TabItem label="Linux/macOS" value="unix">

- `data/idmp`：用户数据目录
- `idmp/venv`：Python 虚拟环境
- `idmp/config`：配置文件目录
- `logs`：日志目录

</TabItem>
<TabItem label="Windows" value="windows">

- `data\idmp`：用户数据目录
- `idmp\venv`：Python 虚拟环境
- `idmp\config`：配置文件目录
- `logs`：日志目录

</TabItem>
</Tabs>

- **仅更新程序文件**：升级时仅更新核心程序文件和依赖，确保新版本功能可用，用户数据和配置保持不变。
- **首次安装**：如果是首次安装，则会完整初始化所有目录和文件。

:::info
建议始终通过官方安装脚本进行升级操作。如需手动备份数据和配置，可在升级前备份上述目录。升级完成后，建议检查服务状态和日志，确保升级成功。
:::
