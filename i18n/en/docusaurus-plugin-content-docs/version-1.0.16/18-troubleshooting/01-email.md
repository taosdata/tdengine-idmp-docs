---
title: Email Troubleshooting
sidebar_label: Email Troubleshooting
---

# 18.1 Email Troubleshooting

This page describes how to investigate email delivery issues in IDMP, including verification emails, password reset emails, and SMTP connectivity failures.

## 18.1.1 Scope

Use this page when any of the following symptoms are observed:

- Registration verification emails fail to send.
- Login verification emails fail to send.
- Password reset emails fail to send.
- The application reports success, but the recipient does not receive the email.
- SMTP authentication fails, SMTP connections fail, or email sending times out or is significantly delayed.

## 18.1.2 Interpreting Success States

Before troubleshooting, separate the email flow into three different success states so that an HTTP success response is not mistaken for final delivery.

| Success state | Meaning | Typical evidence |
| --- | --- | --- |
| API call succeeded | The backend accepted the HTTP request | HTTP `200` or a successful business response |
| Application send flow succeeded | The application entered the email sending flow | Success logs appear in the application logs |
| Final delivery succeeded | The downstream mail system accepted and delivered the message | The mailbox shows the message, or the SMTP provider shows successful delivery |

The first two states do not guarantee that the message reached the inbox.

## 18.1.3 Quick Troubleshooting Steps

Follow the checks in order across the API layer, logs, configuration, and external delivery evidence.

### 18.1.3.1 Trigger a Real Email Request

Start with a real API request so that the full delivery chain is exercised, instead of relying only on the configuration page.

Common endpoints are listed below:

| Scenario | Method | Path |
| --- | --- | --- |
| Password reset email | `POST` | `/api/v1/users/password-reset-email` |
| Registration verification code | `POST` | `/api/v1/users/send/register-code` |
| Login verification code | `POST` | `/api/v1/users/send/verifycode` |

Password reset example:

```bash
curl -X POST 'http://idmp.example.com:6042/api/v1/users/password-reset-email' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "user@example.com"
  }'
```

Registration verification example:

```bash
curl -X POST 'http://idmp.example.com:6042/api/v1/users/send/register-code' \
  -H 'Content-Type: application/json' \
  -H 'Accept-Language: en-US' \
  -d '{
    "email": "user@example.com"
  }'
```

Login verification example:

```bash
curl -X POST 'http://idmp.example.com:6042/api/v1/users/send/verifycode' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "user@example.com"
  }'
```

Expected results:

- The HTTP status code is `200`.
- The response body indicates success, such as `{"code":200,"message":"success"}`.

If the request fails immediately, verify the API path, request payload, service status, and any reverse proxy or gateway configuration first.

### 18.1.3.2 Confirm That the Request Reached the Backend

Check the main request log before inspecting the email sending implementation.

Main log file:

- `/var/log/taos/idmp/logs/tda.log`

Search for the request:

```bash
grep -nE 'Request: POST.*/api/v1/users/' tda.log
```

Filter for the relevant email endpoints:

```bash
grep -nE 'Request: POST.*/users/send/register-code|Request: POST.*/users/send/verifycode|Request: POST.*/users/password-reset-email' tda.log
```

Expected results:

- A `Request: POST ...` entry is present.
- A matching `Response: POST ... 200 duration ...ms` entry follows.

If no request log exists, the request likely never entered the backend. Focus on the gateway, ingress, reverse proxy, frontend endpoint configuration, and archived logs such as `tda.log.yyyy-MM-dd.gz`.

### 18.1.3.3 Inspect the Send Flow Logs

Email sending is typically handled asynchronously. Wait `2` to `5` seconds after triggering the request before searching the logs.

Common success logs:

- `Generated register verify code for debug...`
- `start process send task...`
- `send email to ..., title: ...`
- `send message success in MsgSendService`
- `send msg success detailId: ...`

Common failure logs:

- `send message failed in MsgSendService`
- `send msg failed cause by SendMsgException`
- `Failed to send email to ...`
- `Authentication failed for user ...`
- `Mail server connection failed`

Recommended commands:

```bash
grep -nE 'send email to|send message success|send msg success detailId' tda.log
```

```bash
grep -nEi 'failed|exception|error' tda-error.log | grep -i mail
```

```bash
grep -nE 'Authentication failed|Invalid credentials' tda.log
```

```bash
grep -nE 'connection failed|timeout|refused' tda.log
```

Interpret the results as follows:

- `send email to` means the application entered the concrete email sender implementation.
- `send msg success detailId` means the application considers the send flow complete.
- `Authentication failed` points first to SMTP credentials or an authorization code problem.
- `Mail server connection failed` points first to network reachability, ports, firewalls, or DNS.

### 18.1.3.4 Check Which Email Configuration Is Active

The effective email configuration may come from system settings or the application configuration file, so confirm the active source before changing any settings.

Configuration priority:

1. If email service settings are configured in system settings, those settings take precedence.
2. If no email configuration exists there, the application falls back to the default email settings in `application.yml`.

In system settings, focus on the following fields:

- `host`
- `port`
- `username`
- `password`
- `from`
- `tls`
- `auth`

### 18.1.3.5 Validate SMTP Connectivity

When you need to separate an application issue from an SMTP environment issue, validate SMTP connectivity directly.

Available application endpoints:

- `POST /api/v1/system/email/default-connectivity`: tests the current default email configuration.
- `POST /api/v1/system/email/connectivity`: tests a specified SMTP configuration.

For network-level checks on the host:

```bash
telnet smtp.example.com 465
```

```bash
nc -vz smtp.example.com 465
```

```bash
nslookup smtp.example.com
```

Confirm the following:

- The SMTP hostname resolves correctly.
- The port accepts a TCP connection.
- The selected port matches the TLS or SSL policy.
- The deployment network allows outbound SMTP traffic.

### 18.1.3.6 Confirm Final Delivery

An application-side success log does not prove that the email was delivered to the recipient mailbox.

Confirm final delivery through at least one of the following sources:

- The SMTP provider delivery log shows `accepted`, `rejected`, or `deferred`.
- The recipient checks both the inbox and spam folder.
- The recipient email address is verified as valid.

## 18.1.4 Recommended Investigation Order

Use the following order to reduce false conclusions.

1. Confirm that the API request succeeded.
2. Confirm that the backend received the request.
3. Confirm that the asynchronous send task started processing.
4. Confirm whether the sender implementation logged authentication or connection errors.
5. Check database send records if needed.
6. Confirm that the SMTP provider accepted the message.
7. Confirm that the message is visible in the recipient mailbox.

## 18.1.5 Common Failures and Recommended Actions

The following scenarios cover the most frequent classes of email delivery issues.

### 18.1.5.1 Authentication Failure

If the logs contain `Authentication failed` or `Invalid credentials`, the SMTP authentication step is failing.

Possible causes:

- The SMTP username or password is incorrect.
- The mail provider requires an authorization code instead of the account password.
- The account is locked, rate limited, or the authorization has expired.
- Two-factor authentication is enabled, but an app-specific password is not being used.

Recommended checks:

- Verify the username, password, and authorization code in the database or configuration file.
- Check the account status in the mail provider console.
- Test the same account with another mail client.
- Generate a new app-specific password if required.

### 18.1.5.2 Connection Failure

If the logs contain `Mail server connection failed`, `timeout`, or `refused`, the issue is usually related to network reachability or port configuration.

Possible causes:

- The network path is unavailable.
- A firewall blocks SMTP ports.
- The SMTP host or port is incorrect.
- DNS resolution fails.
- The selected port does not match the TLS configuration.

Recommended checks:

- Use `telnet` or `nc` to test port reachability.
- Confirm that the firewall and security group allow `25`, `465`, and `587` as required.
- Verify the SMTP hostname spelling and port number.
- Use `nslookup` to confirm DNS resolution.
- Confirm that the TLS setting matches the provider requirements.

### 18.1.5.3 Application Success but No Email Received

If the application logs show success but the recipient cannot find the email, the problem is usually outside the application.

Possible causes:

- The SMTP provider accepted the message, but the recipient mail system rejected it.
- The message went to spam.
- The recipient address is incorrect.

Recommended checks:

- Review the SMTP provider delivery log.
- Ask the recipient to check spam folders and mail filters.
- Reconfirm the recipient address spelling.
- Verify the sender domain mail authentication configuration.

### 18.1.5.4 Delay or Timeout

If sending is delayed or timeouts appear in the logs, inspect both application-side queueing and SMTP response time.

Possible causes:

- The SMTP server responds slowly.
- Network jitter causes connection or send timeouts.
- The asynchronous queue is backed up.
- The email body is too large or contains heavy inline resources.

Recommended checks:

- Check whether a large number of emails were sent concurrently.
- Measure the SMTP server response time.
- Inspect the message body, attachments, and inline images for abnormal size.

## 18.1.6 Key Checks

To avoid missing critical evidence, inspect the email sending status from both configuration and logs.

- Configuration: confirm whether the database email configuration is enabled. If it is not, determine which default file configuration is used, and verify `host`, `port`, `username`, `from`, `tls`, and `auth`.
- Logs: confirm that request logs, asynchronous send-task logs, sender logs, and authentication, connection, or retry failures are all covered.

## 18.1.7 Best Practices

The following practices improve repeatability and reduce investigation time.

1. Reproduce the issue with a real API request before analyzing logs or changing configuration.
2. Record the reproduction time, recipient address, language, and API path for precise log searches.
3. Review request logs, send-flow logs, necessary database records, and external delivery logs together.
4. Track send success rate, authentication failure rate, connection failure rate, and retry counts proactively.
