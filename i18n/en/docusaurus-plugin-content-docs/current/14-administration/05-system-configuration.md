---
title: System Configuration
sidebar_label: System Configuration
---

# 14.5 System Configuration

System Configuration is accessed from **Admin Console → System Configuration**. It has four sections: Basic Configuration, Notification Contact Point, Notification Template, and Email Configuration.

## 14.5.1 Basic Configuration

Basic Configuration contains system-wide settings:

<table>
<colgroup><col style="width:20em"/><col/></colgroup>
<thead><tr><th>Setting</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Language</strong></td><td>Default display language for the interface</td></tr>
<tr><td><strong>Enable User Behavior Collection</strong></td><td>Whether to collect anonymized usage data for product improvement</td></tr>
<tr><td><strong>Upload Crash Reports</strong></td><td>Whether to automatically upload crash reports</td></tr>
<tr><td><strong>Auto Refresh Elements Explorer</strong></td><td>Whether the asset explorer automatically refreshes when elements change</td></tr>
</tbody>
</table>

Click the edit (pencil) icon to modify these settings.

## 14.5.2 Notification Contact Point

A **Notification Contact Point** defines a destination that IDMP sends notifications to. Multiple contact points can be configured. The first user to activate the system has their email address automatically added as a contact point.

To create a contact point, click **+** and fill in:

<table>
<colgroup><col style="width:9em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Name</strong></td><td>A unique name for this contact point</td></tr>
<tr><td><strong>Notify Type</strong></td><td>The delivery channel: <code>Email</code>, <code>Feishu</code>, or <code>Webhook</code></td></tr>
<tr><td><strong>Address</strong></td><td>The target address — email address, Feishu webhook URL, or HTTP endpoint</td></tr>
<tr><td><strong>Description</strong></td><td>Optional description</td></tr>
</tbody>
</table>

Because Webhook is supported, virtually any notification destination can be configured — including Teams, DingTalk, PagerDuty, and other systems that accept HTTP callbacks.

## 14.5.3 Notification Template

Notification Templates define the content of system-generated messages for events such as user invitations, password resets, and alert notifications.

IDMP ships with built-in templates for common notification scenarios. Click a template name to view or edit its content. Templates support variable substitution to include dynamic values such as usernames, URLs, and event details.

![notification template](./images/notify_template.png)

## 14.5.4 Email Configuration

Email Configuration defines the SMTP server that IDMP uses to send outbound email. Click the edit (pencil) icon to update the settings.

<table>
<colgroup><col style="width:14em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Host</strong></td><td>SMTP server hostname or IP address</td></tr>
<tr><td><strong>Port</strong></td><td>SMTP server port (e.g., 465 for TLS, 587 for STARTTLS, 25 for unencrypted)</td></tr>
<tr><td><strong>Username</strong></td><td>SMTP authentication username</td></tr>
<tr><td><strong>Password</strong></td><td>SMTP authentication password</td></tr>
<tr><td><strong>Sender</strong></td><td>The "From" email address used in outgoing messages</td></tr>
<tr><td><strong>Enable TLS</strong></td><td>Whether to use TLS encryption for the SMTP connection</td></tr>
<tr><td><strong>Enable Authentication</strong></td><td>Whether SMTP authentication is required</td></tr>
</tbody>
</table>

IDMP sends email for several purposes: system activation (verification code), user invitations, password resets, and event alert notifications. By default, IDMP uses a TDengine-provided mail service.

### 14.5.4.1 Using MailHog for Air-Gapped Environments

If the IDMP server cannot reach the internet, you can deploy [MailHog](https://github.com/mailhog/MailHog) internally as a lightweight SMTP relay for development and testing:

```bash
docker run -d -p 1025:1025 -p 8025:8025 --name mailhog mailhog/mailhog:v1.0.1
```

After starting MailHog, configure Email Configuration with:

<table>
<colgroup><col style="width:21em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Value</th></tr></thead>
<tbody>
<tr><td>Host</td><td>Host machine IP (or service name if in the same Docker Compose network)</td></tr>
<tr><td>Port</td><td><code>1025</code></td></tr>
<tr><td>Username / Password</td><td>Any value (MailHog disables authentication by default)</td></tr>
<tr><td>Enable TLS / Enable Authentication</td><td>Unchecked</td></tr>
<tr><td>Sender</td><td>Any valid email format (e.g., <code>support@example.com</code>)</td></tr>
</tbody>
</table>

Access the MailHog web interface at `http://<server-ip>:8025` to view captured emails.
