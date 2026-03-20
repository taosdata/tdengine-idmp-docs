---
title: Upgrading TDengine IDMP
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

TDengine IDMP recommends using the official installation script for upgrades. The script will automatically detect the existing installation environment and select the appropriate upgrade mode to ensure the safety of your data and configuration files. Details are as follows:

- **Automatic Upgrade Detection**: The installation script will automatically determine whether it is an upgrade installation.
- **Data and Configuration Protection**: In upgrade mode, the installation script will not overwrite or modify the following directories and their contents:

<Tabs>
<TabItem label="Linux/macOS" value="unix">

- `data/idmp`: User data directory
- `idmp/venv`: Python virtual environment
- `idmp/config`: Configuration directory
- `logs`: Log directory

</TabItem>
<TabItem label="Windows" value="windows">

- `data\idmp`: User data directory
- `idmp\venv`: Python virtual environment
- `idmp\config`: Configuration directory
- `logs`: Log directory

</TabItem>
</Tabs>

- **Program Files Only Updated**: During an upgrade, only core program files and dependencies are updated, ensuring new features are available while user data and configuration remain unchanged.
- **First-Time Installation**: If this is a first-time installation, all directories and files will be fully initialized.

:::info
It is strongly recommended to use the official installation script for upgrades. If you wish to manually back up your data and configuration, you can do so before upgrading. After the upgrade, check the service status and logs to ensure the upgrade was successful.
:::
