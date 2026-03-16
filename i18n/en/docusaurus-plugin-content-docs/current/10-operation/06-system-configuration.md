---
title: Configuring TDengine IDMP
---

In the System Configuration section, you can configure the following:

1. Basic Configuration: Includes settings such as data collection.
2. Notification Contact Point: You can create multiple notification channels, including email and webhooks. With webhook support, virtually any notification method can be integrated via webhook configuration. After the first user activates or registers, their email address is automatically set up as a notification channel.
3. Notification Template: The system sends notifications such as user invitations and password resets. You can configure various templates here.
4. Email Configuration: IDMP needs to send emails in a number of cases, including but not limited to:
   - **First-time Activation**: IDMP uses email addresses as user IDs. Initial activation requires a verification code delivered by email.
   - **User Invitation**: The super administrator invites new users by entering their email addresses.
   - **Event Notification**: When an event is triggered, an alert is sent to the specified email address.

Therefore, a working SMTP server must be configured. By default, the SMTP server is set to TDengine's email server.

## Setting Up a Local Mail Service on an Intranet

If the IDMP server has no internet access (air-gapped / intranet environment), you can use [MailHog](https://github.com/mailhog/MailHog) to quickly set up a lightweight local SMTP service.

### What is MailHog?

MailHog is a lightweight email testing tool that simulates an SMTP server. It captures all emails sent by the application without delivering them to real recipients, making it ideal for intranet environments where email functionality is still required.

### Running MailHog with Docker

#### 1. Pull the MailHog Docker image

```bash
docker pull mailhog/mailhog:v1.0.1
```

#### 2. Start the MailHog container

```bash
docker run -d -p 1025:1025 -p 8025:8025 --name mailhog mailhog/mailhog:v1.0.1
```

**Parameter notes:**

- `-p 1025:1025`: Maps the SMTP port
  
- `-p 8025:8025`: Maps the web UI port
  
- `--name mailhog`: Container name

#### 3. Verify the container is running

```bash
# Check container status
docker ps | grep mailhog

# View container logs
docker logs mailhog
```

Once running, open `http://<server-IP>:8025` in a browser to access the MailHog web UI.

### Docker Compose (Optional)

For more complex setups or when deploying alongside other services, you can use Docker Compose:

```yaml
version: '3'
services:
  mailhog:
    image: mailhog/mailhog:v1.0.1
    container_name: mailhog
    ports:
      - "1025:1025"  # SMTP port
      - "8025:8025"  # Web UI port
    restart: unless-stopped
```

Then start it with:

```bash
docker compose up -d
```

### Configuring MailHog in IDMP

During first-time activation, if IDMP cannot reach the internet, a mail server configuration dialog will appear. Enter the following settings:

| Parameter | Value |
|-----------|-------|
| Host | If MailHog is running as a standalone Docker container, use the host machine IP. If MailHog and IDMP share the same Docker Compose network, use the MailHog service/container name (for example, `mailhog`) as the host value instead of a hard-coded IP address. |
| Port | `1025` |
| Username / Password | Any value (MailHog disables authentication by default) |
| Enable TLS / Enable Auth | Uncheck both |
| Sender | Any valid email format, e.g. `support@tdengine.com` |

Click **Check**. Once you see `Check passed!`, click **Save**.

### Activation Workflow

1. Open `http://<IDMP-server-IP>:6042` in a browser to reach the activation page.
2. Enter your email and organization, then click **Get Verification Code**. You should see a `Sent successfully` message.
   > If you see `Verification code already sent, please try again later`, wait 10 minutes before retrying.
3. Open the MailHog web UI (`http://<server-IP>:8025`) to retrieve the activation code from the inbox.
4. Enter the activation code on the IDMP activation page and click **Activate**. Once activated, MailHog will receive a welcome email as confirmation.

### Verifying the Mail Server Configuration

After activation, verify that the mail server settings were saved correctly:

1. Click your avatar in the top-right corner and select **Admin Console**.
2. Go to **System Configuration** → **Email Configuration**.
3. Confirm the settings reflect the intranet mail service parameters (host, port, etc.) matching your MailHog configuration.

### Troubleshooting

#### IDMP cannot connect to MailHog

- Confirm the container is running: `docker ps | grep mailhog`
- Check port mappings: `docker port mailhog`
- Test connectivity to port 1025 from inside the IDMP container

#### No email received in MailHog after requesting a verification code

- Verify the MailHog web UI is accessible
- Check container logs: `docker logs mailhog`
- Confirm the SMTP settings in IDMP are saved correctly

#### Email records lost after container restart

MailHog does not persist emails by default. To retain email history, mount a volume:

```bash
docker run -itd -p 1025:1025 -p 8025:8025 \
  -v mailhog-data:/maildir \
  -e MH_STORAGE=maildir -e MH_MAILDIR_PATH=/maildir \
  --name mailhog mailhog/mailhog:v1.0.1
```
