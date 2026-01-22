import GatewayBasePathConfig from './common/_gateway-base-path.md'

# 使用 Ansible 部署

Ansible 是一个开源的自动化工具，用于配置管理、应用部署、云服务编排等。本指南介绍如何使用 Ansible 实现 TDengine IDMP 的自动化部署。通过这套工具，可以轻松地在多台服务器上完成 TDengine IDMP 的安装和配置。

## 前置条件

1. 本文适用 Ansible 2.10 以上版本
1. 本文适用 Python 3.6 以上版本
1. 所有目标服务器可以通过 SSH 访问

## 安装 Ansible

如未安装 Ansible，请参考 [Ansible 官方安装指南](https://docs.ansible.com/ansible/latest/installation_guide/index.html)。

## 部署 TDengine IDMP 服务

:::info

- **安全提示**：本部署方案使用 `ansible-vault` 管理敏感信息，以确保密码等敏感数据在版本控制中安全存储。
- <GatewayBasePathConfig />

:::

### 1. 克隆部署仓库

```bash
git clone https://github.com/taosdata/tdengine-idmp-deployment.git
```

该仓库包含了 TDengine IDMP 部署的 playbook。

### 2. 编辑 hosts 文件

编辑 `inventory/hosts` 文件，配置目标服务器信息。请根据实际环境修改服务器地址和连接信息。例如：

```ini
[tdengine_idmp_servers]
idmp_server1 ansible_host=192.168.1.*
idmp_server2 ansible_host=192.168.2.*

[tdengine_idmp_servers:vars]
ansible_user={{ ansible_ssh_user }}
ansible_ssh_pass={{ vault_ssh_password }}

[tdengine_servers]
tsdb_server1 ansible_host=192.168.1.*
tsdb_server2 ansible_host=192.168.2.*

[tdengine_servers:vars]
ansible_user={{ ansible_ssh_user }}
ansible_ssh_pass={{ vault_ssh_password }}
```

- `[tdengine_idmp_servers]` 和 `[tdengine_servers]`：分别定义 TDengine IDMP 服务和 TDengine TSDB-Enterprise 服务的主机组。
 `idmp_server1`、`idmp_server2`、`tsdb_server1`、`tsdb_server2` 为主机别名，`ansible_host` 指定实际 IP。

- `[tdengine_idmp_servers:vars]` 和 `[tdengine_servers:vars]`：为主机组定义变量。
  `ansible_user` 和 `ansible_ssh_pass` 可通过加密变量（如 `group_vars/public.yml` ）引用，提升安全性。
  
- 请根据实际环境修改服务器地址和连接参数。

### 3. 配置服务器密码

使用以下命令编辑加密的配置文件：

```bash
ansible-vault edit inventory/group_vars/public.yml
```

当系统提示输入 `Vault password` 时，请输入 Vault 密码：`taosdata`

在该文件中，配置 Ansible 访问服务器时所用的用户名和密码信息。

:::warning

- 所有服务器必须使用相同的密码
- 请妥善保管密码信息

:::

### 4. 部署 TDengine TSDB-Enterprise 与 IDMP 服务

运行以下命令，目标服务器上仅安装并部署 TDengine IDMP 服务：

```bash
ansible-playbook playbooks/tdengine-idmp.yml --ask-vault-pass
```

或运行以下命令，目标服务器上就会部署 TDengine TSDB-Enterprise 与 IDMP 服务：

```bash
ansible-playbook playbooks/tdengine-idmp.yml --ask-vault-pass -e deploy_tdengine=true
```

当系统提示输入 `Vault password` 时，请输入 Vault 密码：`taosdata`

### 5. 访问服务

默认情况下，TDengine IDMP 服务监听主机的 6042 端口。可通过以下地址访问管理界面：

- [http://ip:6042](http://ip:6042)
