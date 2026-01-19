---
title: Ansible Deployment
---

import GatewayBasePathConfig from './common/_gateway-base-path.md'

Ansible is an open-source automation tool used for configuration management, application deployment, and cloud orchestration. This guide explains how to use Ansible to automate the deployment of TDengine IDMP. With this toolset, you can easily install and configure TDengine IDMP across multiple servers.

## Prerequisites

1. Install Ansible 2.10 or later.
1. Install Python 3.6 or later.
1. Ensure that all servers can be accessed with SSH.

## Install Ansible

Install Ansible as described in the [official documentation](https://docs.ansible.com/ansible/latest/installation_guide/index.html).

## Install TDengine IDMP

:::info

- Security Tip: This deployment approach uses ansible-vault to manage sensitive information, ensuring that credentials and other confidential data are securely stored in version control.
- <GatewayBasePathConfig />

:::

1. Clone the repository:

   ```bash
   git clone https://github.com/taosdata/tdengine-idmp-deployment.git
   ```

   This repository includes the playbook to deploy TDengine IDMP.

2. Edit the hosts file

   Edit the inventory/hosts file to configure the target server information. Modify the server addresses and connection details according to your actual environment. For example:

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

   - `tdengine_idmp_servers]` and `[tdengine_servers]`: Define host groups for TDengine IDMP services and TDengine TSDB-Enterprise services, respectively.

     `idmp_server1`, `idmp_server2`, `tsdb_server1`, and `tsdb_server2` are host aliases, while ansible_host specifies the actual IP address.
   - `[tdengine_idmp_servers:vars]` and `[tdengine_servers:vars]`: Define variables for each host group.

     `ansible_user` and `ansible_ssh_pass` can be referenced via encrypted variables (e.g., in `group_vars/public.yml`) to enhance security.
   - Modify server addresses and connection parameters based on your actual environment.

3. Configure server password

   Edit the encrypted configuration file using the following command:

   ```bash
   ansible-vault edit inventory/group_vars/public.yml
   ```

   When prompted for the Vault password, enter: taosdata

   In this file, configure the username and password used by Ansible to access the servers.

   :::warning

   - All servers must use the same password
   - Please keep the password information secure

   :::

4. Install TDengine TSDB-Enterprise and TDengine IDMP

   Run the following command to install TDengine IDMP only:

   ```bash
   ansible-playbook playbooks/tdengine-idmp.yml --ask-vault-pass
   ```

   Run the following command to install TDengine TSDB-Enterprise and IDMP:

   ```bash
   ansible-playbook playbooks/tdengine-idmp.yml --ask-vault-pass -e deploy_tdengine=true
   ```

   When prompted for the Vault password, enter: taosdata

5. Access the service

   By default, the TDengine IDMP service listens on port 6042 of the host. You can access the management interface at `http://ip:6042`.
