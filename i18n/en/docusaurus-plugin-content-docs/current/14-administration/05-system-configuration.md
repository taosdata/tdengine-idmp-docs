---
title: System Configuration
sidebar_label: System Configuration
---
# 14.5 System Configuration

System Configuration is accessed from **Admin Console → System Configuration**. It has eight sections: Basic Configuration, Notification Channel, System Message Template, Email Server Configuration, License Management, User Security Configuration, Resource Security Configuration, and System Statistics. For License Management, please refer to [Chapter 14.12](./30-activate.md).

## 14.5.1 Basic Configuration

Basic Configuration contains system-level global settings:

| Setting  | Description        |
| --- | --- |
| **Language**   | Default display language for the interface    |
| **Enable User Behavior Collection** | Whether to collect anonymized usage data for product improvement   |
| **Upload Crash Reports**   | Whether to automatically upload crash reports                           |
| **Auto Refresh Elements Explorer**  | Whether the asset explorer automatically refreshes when elements change |
| **System Log**  | Whether to enable generation of tamper-proof system operation logs and support filtering, querying, and exporting |
| **Quality Analysis Menu** | Whether to enable a standalone Quality Analysis menu |
| **Public Access URL** | The public access URL for the current system |
| **Week Start** | Whether the first day of the week is Sunday or Monday |
| **System Color** | Configuration of the default system color |

Click the edit (pencil) icon to modify these settings.

## 14.5.2 Notification Channel

A **Notification Channel** defines a destination that IDMP sends notifications to. Multiple contact points can be configured. The first user to activate the system has their email address automatically added as a contact point.

To create a contact point, click **+** and fill in:

| Field                 | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| **Name**        | A unique name for this contact point                                      |
| **Notify Type** | The delivery channel:`Email`, `Feishu`, `WeCom`, `DingTalk`, `Slack`, `Microsoft Teams`, or `Webhook` |
| **Address**     | The target address — email address, Feishu webhook URL, or HTTP endpoint |
| **Description** | Optional description                                                      |

Because Webhook is supported, virtually any notification destination can be configured — including Teams, DingTalk, PagerDuty, and other systems that accept HTTP callbacks.

## 14.5.3 System Message Template

System Message Templates define the content of system-generated messages for events such as user invitations, password resets, and alert notifications.

IDMP ships with built-in templates for common notification scenarios. Click a template name to view or edit its content. Templates support variable substitution to include dynamic values such as usernames, URLs, and event details.

![System Message Template](./images/notify_template.png)

## 14.5.4 Email Server Configuration

Email Server Configuration defines the SMTP server that IDMP uses to send outbound email. Click the edit (pencil) icon to modify and update the settings.

| Field                           | Description                                                                |
| ------------------------------- | -------------------------------------------------------------------------- |
| **Host**                  | SMTP server hostname or IP address                                         |
| **Port**                  | SMTP server port (e.g., 465 for TLS, 587 for STARTTLS, 25 for unencrypted) |
| **Username**              | SMTP authentication username                                               |
| **Password**              | SMTP authentication password                                               |
| **Sender**                | The "From" email address used in outgoing messages                         |
| **Enable TLS**            | Whether to use TLS encryption for the SMTP connection                      |
| **Enable Authentication** | Whether SMTP authentication is required                                    |

IDMP sends email for several purposes: system activation (verification code), user invitations, password resets, and event alert notifications. By default, IDMP uses a TDengine-provided mail service, and users can also modify the configuration to use a custom email service.

### 14.5.4.1 Using MailHog for Air-Gapped Environments

If the IDMP server cannot reach the internet, you can deploy [MailHog](https://github.com/mailhog/MailHog) internally as a lightweight SMTP relay for development and testing:

```bash
docker run -d -p 1025:1025 -p 8025:8025 --name mailhog mailhog/mailhog:v1.0.1
```

After starting MailHog, configure Email Configuration with:

| Field                              | Value Description                                                       |
| ---------------------------------- | ----------------------------------------------------------------------- |
| Host                               | Host machine IP (or service name if in the same Docker Compose network) |
| Port                               | `1025`                                                                |
| Username / Password                | Any value (MailHog disables authentication by default)                  |
| Enable TLS / Enable Authentication | Unchecked                                                               |
| Sender                             | Any valid email format (e.g.,`support@example.com`)                   |

Access the MailHog web interface at `http://<server-ip>:8025` to view captured emails.

## 14.5.5 User Security Configuration

Click **System Configuration** → **User Security Configuration** to enter the user security configuration page. User security policies are disabled by default. Click **Enable Security Policies** to activate system-level user security policy management.

![Enable User Security Configuration](./images/user-security-01.png)

After enabling user security policy management, you can configure account protection, session security, and other settings. Changes take effect immediately upon saving.

| Security Setting | Description |
| --- | --- |
| **Login Failure Protection** | Set the maximum number of failed login attempts and the lockout duration after exceeding the limit |
| **Password Expiration** | Set the validity period (in days) for account passwords, and the number of days in advance to warn users before expiration. When enabled, users must change their passwords within the specified time range |
| **Password History Restriction** | Set the number of previous passwords that cannot be reused — the current password must differ from the specified number of previous passwords |
| **Session Security** | When enabled, a new login for the same account automatically invalidates all other online sessions, ensuring only one active session per account |

![User Security Configuration](./images/user-security-02.png)

## 14.5.6 Resource Security Configuration

Click **System Configuration** → **Resource Security Configuration** to enter the resource security configuration page. Resource security configuration covers all resource types in the current system, specifically:

| Resource Type | Configurable Security Actions |
| --- | --- |
| **Elements** | Add, Edit, Delete, and Document Modification |
| **Dashboards** | Edit, Add |
| **Real-Time Analysis** | Edit, Add |
| **Events** | Edit, Delete |
| **Element Templates** | Add, Edit, Delete |
| **Event Templates** | Add, Edit, Delete |
| **Dashboard Templates** | Add, Edit, Delete |
| **Panel Templates** | Add, Edit, Delete |
| **Notification Rule Templates** | Add, Edit, Delete |

You can then configure global security management policies for all key resources in the system.

![View Resource Security Configuration](./images/resource-security-01.png)

On the resource security configuration page, click the **Edit** button in the upper-right corner to enter editing mode. You can then set differentiated security policies for each resource type, including whether a change reason is required, and whether re-entering the password or performing multi-factor authentication (MFA) is required when executing change operations.

![Edit Resource Security Configuration](./images/resource-security-02.png)

## 14.5.7 System Statistics

Click **System Configuration** → **System Statistics** to enter the system statistics page. This page provides a one-stop overview of key system statistics, including:

| Category | Statistics |
| --- | --- |
| **Assets** | Number of Elements, Attributes, Measurement Points, Events, Real-Time Analyses, Instance Scenarios, Documents, Enumeration Sets, UOMs, and Composite Metrics |
| **Templates** | Number of Element Templates, Attribute Templates, Real-Time Analysis Templates, Panel Templates, Dashboard Templates, Notification Rule Templates, and Action Templates |
| **Visualization** | Number of Panels, Dashboards, and Configurations |
| **Models** | Number of Training Library Models, Management Library Models, and Deployed Models |

![System Statistics](./images/system-statistics.png)
