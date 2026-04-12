---
title: Excel 插件证书配置
sidebar_label: Excel 插件证书配置
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 10.2 Excel 插件证书配置

Excel 插件通过 HTTPS 连接 IDMP，因此需要有效的 SSL 证书。IDMP 内置了一个有效期为 3 个月的测试证书，适用于快速评估。如果您希望长期使用 Excel 插件而无需频繁更换证书，可以生成一个自签名证书并配置更长的有效期（如 10 年）。

## 10.2.1 背景

IDMP 用户的部署场景通常分为两类：

- **内部网络部署：** IDMP 仅在公司内网使用，不对外发布。
- **公网部署：** IDMP 发布到互联网上，用户自行申请公网 SSL 证书。

对于内部网络部署，无法通过常规方式申请公网信任的证书（公网证书要求域名从互联网可解析），此时可以使用自签名证书来满足 Excel 插件的 HTTPS 要求。

## 10.2.2 证书文件说明

IDMP 安装完成后，在 `/usr/local/taos/idmp/config` 目录下包含以下两个证书文件：

| 文件 | 说明 |
| --- | --- |
| `privkey.pem`    | 服务器私钥，用于解密信息并向客户端证明服务器身份，必须保密       |
| `certbundle.pem` | 证书包，包含服务器公钥和身份信息，客户端使用该文件验证服务器身份 |

## 10.2.3 生成自签名证书

以下步骤演示如何生成有效期为 10 年的自签名证书。

### 步骤 1：生成 CA 根证书

在一台管理机器上执行以下命令，生成 CA 私钥和根证书：

```bash
# 生成 CA 私钥
openssl genrsa -out ca.key 2048

# 生成 CA 根证书（有效期 10 年）
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt \
  -subj "/C=CN/ST=Beijing/L=Beijing/O=TDengine/CN=TDengine Internal CA"
```

### 步骤 2：生成服务器证书

登录到 IDMP 服务器，执行以下命令：

```bash
# 1. 生成服务器私钥
openssl genrsa -out privkey.pem 2048

# 2. 生成证书签名请求（CSR）
openssl req -new -key privkey.pem -out idmp.csr \
  -subj "/C=CN/ST=Beijing/L=Beijing/O=TDengine/CN=idmp.tdengine.net"

# 3. 创建扩展配置文件
cat > idmp.ext <<EOF
subjectAltName = DNS:idmp.tdengine.net
EOF

# 4. 使用 CA 证书签署服务器证书（有效期 10 年）
openssl x509 -req -in idmp.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
  -out idmp.crt -days 3650 -sha256 -extfile idmp.ext

# 5. 创建证书包
cat idmp.crt ca.crt > certbundle.pem

# 6. 验证证书内容（确认域名是否正确）
openssl x509 -in certbundle.pem -text -noout | grep -A1 "Subject Alternative Name"
```

执行完成后，您将得到两个关键文件：`privkey.pem`（私钥）和 `certbundle.pem`（证书包）。

:::tip
如果您的 IDMP 使用的域名不是 `idmp.tdengine.net`，请将上述命令中的 `idmp.tdengine.net` 替换为实际域名。
:::

### 步骤 3：在客户端安装 CA 根证书

将 `ca.crt` 文件分发到所有需要访问 IDMP 的客户端机器，并安装到受信任的根证书颁发机构。

<Tabs>
<TabItem value="windows" label="Windows">

1. 将 `ca.crt` 文件复制到客户端机器。
2. 双击 `ca.crt` 文件，点击**安装证书**。
3. 选择**本地计算机**，点击**下一步**。
4. 选择**将所有的证书都放入下列存储**，点击**浏览**。
5. 选择**受信任的根证书颁发机构**，点击**确定**。
6. 点击**下一步**，然后点击**完成**。

:::warning
证书必须安装到**受信任的根证书颁发机构**。如果安装到其他位置，Excel 插件将无法通过证书验证。
:::

</TabItem>
<TabItem value="macos" label="macOS">

1. 将 `ca.crt` 文件复制到客户端机器。
2. 双击 `ca.crt` 文件，系统将打开**钥匙串访问**。
3. 在弹出的对话框中，选择将证书添加到**系统**钥匙串。
4. 在钥匙串访问中找到刚添加的证书，双击打开。
5. 展开**信任**部分，将**使用此证书时**设置为**始终信任**。
6. 关闭窗口，输入密码确认更改。

</TabItem>
</Tabs>

## 10.2.4 配置 IDMP 证书

生成证书后，需要将 IDMP 默认的证书文件替换为新生成的证书。

### 前提条件

确保 IDMP 的 HTTPS 端口（默认 **6034**）已处于监听状态。

### 替换证书

1. 备份现有证书：

   ```bash
   cd /usr/local/taos/idmp/config
   mkdir -p bak
   mv privkey.pem certbundle.pem bak/
   ```
   
2. 将新生成的 `privkey.pem` 和 `certbundle.pem` 复制到 `/usr/local/taos/idmp/config` 目录：

   - **安装包部署：** 直接复制替换即可。
   - **Docker 部署：** 使用 `docker cp` 将文件复制到容器中，或通过映射 `config` 目录进行替换。
3. 重启 IDMP 服务使证书生效。

## 10.2.5 域名解析配置

如果使用自签名证书绑定的域名（如 `idmp.tdengine.net`），需要在客户端的 hosts 文件中添加域名解析：

```text
192.168.1.100  idmp.tdengine.net
```

请将 `192.168.1.100` 替换为实际的 IDMP 服务器 IP 地址。

hosts 文件位置：

- **Linux / macOS：** `/etc/hosts`
- **Windows：** `C:\Windows\System32\drivers\etc\hosts`

## 10.2.6 验证证书配置

完成证书替换和域名解析配置后，在客户端浏览器中访问 `https://idmp.tdengine.net:6034/`，查看证书信息，确认新证书已生效。

如果浏览器仍显示旧证书或过期证书，请检查：

- 证书文件是否已正确替换。
- IDMP 服务是否已重启。
- 客户端 CA 根证书是否已正确安装到受信任的根证书颁发机构。

## 10.2.7 注意事项

- 如果 IDMP 版本较低，建议先升级到最新版本再配置证书，旧版本可能不支持此功能。
- 部分旧版本 IDMP（如 1.0.10.0）的 HTTPS 端口为 **6037** 而非 **6034**。建议升级到新版本；如不升级，需在 `application.yml` 中调整端口映射。
- 安装 CA 根证书时，务必选择安装到**受信任的根证书颁发机构**，否则 Excel 插件将无法通过证书验证。
