---
title: Certificate Configuration for the Excel Add-In
sidebar_label: Certificate Configuration
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 10.2 Certificate Configuration for the Excel Add-In

The Excel Add-In connects to IDMP over HTTPS, which requires a valid SSL certificate. IDMP ships with a built-in test certificate valid for 3 months, suitable for quick evaluation. For long-term use without frequent certificate renewal, you can generate a self-signed certificate with an extended validity period (e.g., 10 years).

## 10.2.1 Background

IDMP deployments typically fall into two categories:

- **Internal network deployment:** IDMP is used within a corporate intranet and is not exposed to the public internet.
- **Public deployment:** IDMP is published on the internet, and users obtain their own publicly trusted SSL certificates.

For internal deployments, publicly trusted certificates cannot be obtained through standard methods (they require a domain resolvable from the internet). In this case, a self-signed certificate can fulfill the HTTPS requirement for the Excel Add-In.

## 10.2.2 Certificate Files

After IDMP installation, the `config` directory contains two certificate files:

| File               | Description                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `privkey.pem`    | Server private key, used to decrypt communications and prove the server's identity to clients. Must be kept confidential.              |
| `certbundle.pem` | Certificate bundle containing the server's public key and identity information. Clients use this file to verify the server's identity. |

## 10.2.3 Generating a Self-Signed Certificate

The following steps demonstrate how to generate a self-signed certificate valid for 10 years.

### Step 1: Generate a CA Root Certificate

On a management machine, run the following commands to generate the CA private key and root certificate:

```bash
# Generate the CA private key
openssl genrsa -out ca.key 2048

# Generate the CA root certificate (valid for 10 years)
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt \
  -subj "/C=CN/ST=Beijing/L=Beijing/O=TDengine/CN=TDengine Internal CA"
```

### Step 2: Generate the Server Certificate

Log in to the IDMP server and run the following commands:

```bash
# 1. Generate the server private key
openssl genrsa -out privkey.pem 2048

# 2. Generate a Certificate Signing Request (CSR)
openssl req -new -key privkey.pem -out idmp.csr \
  -subj "/C=CN/ST=Beijing/L=Beijing/O=TDengine/CN=idmp.tdengine.net"

# 3. Create the extensions configuration file
cat > idmp.ext <<EOF
subjectAltName = DNS:idmp.tdengine.net
EOF

# 4. Sign the server certificate with the CA (valid for 10 years)
openssl x509 -req -in idmp.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
  -out idmp.crt -days 3650 -sha256 -extfile idmp.ext

# 5. Create the certificate bundle
cat idmp.crt ca.crt > certbundle.pem

# 6. Verify the certificate content (confirm the domain is correct)
openssl x509 -in certbundle.pem -text -noout | grep -A1 "Subject Alternative Name"
```

After execution, you will have two key files: `privkey.pem` (private key) and `certbundle.pem` (certificate bundle).

:::tip
If your IDMP instance uses a domain other than `idmp.tdengine.net`, replace `idmp.tdengine.net` in the commands above with your actual domain.
:::

### Step 3: Install the CA Root Certificate on Clients

Distribute the `ca.crt` file to all client machines that need to access IDMP, and install it into the trusted root certificate store.

<Tabs>
<TabItem value="windows" label="Windows">

1. Copy the `ca.crt` file to the client machine.
2. Double-click the `ca.crt` file and click **Install Certificate**.
3. Select **Local Machine** and click **Next**.
4. Select **Place all certificates in the following store** and click **Browse**.
5. Select **Trusted Root Certification Authorities** and click **OK**.
6. Click **Next**, then click **Finish**.

:::warning
The certificate must be installed into **Trusted Root Certification Authorities**. Installing it in a different store will cause the Excel Add-In to fail certificate validation.
:::

</TabItem>
<TabItem value="macos" label="macOS">

1. Copy the `ca.crt` file to the client machine.
2. Double-click the `ca.crt` file. This opens **Keychain Access**.
3. In the dialog that appears, choose to add the certificate to the **System** keychain.
4. Find the newly added certificate in Keychain Access and double-click it.
5. Expand the **Trust** section and set **When using this certificate** to **Always Trust**.
6. Close the window and enter your password to confirm the change.

</TabItem>
</Tabs>

## 10.2.4 Configuring the IDMP Certificate

After generating the certificate, replace the default certificate files in IDMP with the newly generated ones.

### Prerequisites

Ensure that the IDMP HTTPS port (default: **6034**) is in a listening state.

### Replacing the Certificate

1. Back up the existing certificates:

   ```bash
   cd /usr/local/taos/idmp/config
   mkdir -p bak
   mv privkey.pem certbundle.pem bak/
   ```
   
2. Copy the newly generated `privkey.pem` and `certbundle.pem` to the `/usr/local/taos/idmp/config` directory:

   - **Package installation:** Copy and replace the files directly.
   - **Docker deployment:** Use `docker cp` to copy files into the container, or replace through a mapped `config` volume.
3. Restart the IDMP service for the new certificate to take effect.

## 10.2.5 DNS Resolution Configuration

If you are using a domain bound to the self-signed certificate (e.g., `idmp.tdengine.net`), add a DNS entry to the hosts file on each client machine:

```text
192.168.1.100  idmp.tdengine.net
```

Replace `192.168.1.100` with the actual IP address of your IDMP server.

Hosts file locations:

- **Linux / macOS:** `/etc/hosts`
- **Windows:** `C:\Windows\System32\drivers\etc\hosts`

## 10.2.6 Verifying the Certificate Configuration

After replacing the certificate and configuring DNS resolution, open a browser on the client machine and navigate to `https://idmp.tdengine.net:6034/`. Check the certificate information to confirm that the new certificate is in effect.

If the browser still shows the old or expired certificate, verify the following:

- The certificate files have been correctly replaced.
- The IDMP service has been restarted.
- The CA root certificate has been installed into the trusted root certificate store on the client.

## 10.2.7 Important Notes

- If you are running an older version of IDMP, upgrade to the latest version before configuring certificates. Older versions may not support this feature.
- Some older IDMP versions (e.g., 1.0.10.0) use HTTPS port **6037** instead of **6034**. Upgrading to the latest version is recommended. If you choose not to upgrade, adjust the port mapping in `application.yml`.
- When installing the CA root certificate, always install it into **Trusted Root Certification Authorities**. Otherwise, the Excel Add-In will fail certificate validation.
