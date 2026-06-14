---
title: Multi-Factor Authentication (MFA)
sidebar_label: Multi-Factor Authentication (MFA)
---

# 14.10 Multi-Factor Authentication (MFA)

To prevent accidental operations and account takeover, TDengine IDMP enforces multi-factor authentication (MFA / step-up verification) for certain **sensitive operations**. When you perform a protected operation, the system asks you to confirm your identity again via a **passkey** or an **email verification code** before the operation proceeds. The operation continues only after verification succeeds.

## 14.10.1 Protected Operations and Verification Flow

When you perform an operation that requires MFA, the system opens a **step-up verification dialog** and selects the verification method according to the following rules:

- If the current user **has a registered passkey**, **passkey** verification is used by default (invoking the device's fingerprint, face recognition, or device PIN).
- If no passkey is registered, a **6-digit verification code** is sent to the account's email address; enter it to complete verification.

You can switch between the two methods in the dialog:

- In the passkey view, click **Use email code instead** to receive an email verification code even if you have a registered passkey.
- In the email view, click **Use passkey instead** (shown only when a passkey is registered) to switch back to passkey verification.

After verification succeeds, the operation continues. The verification credential is **single-use** and has an expiration time. If verification fails, is canceled, or times out, the operation is not executed.

:::note
The names and descriptions of protected operations are displayed in the **language configured in System Configuration** (`system_config.language`), regardless of the browser language.
:::

## 14.10.2 Passkey Management

A passkey is a WebAuthn-based passwordless credential. The private key is stored on your device (such as Apple iCloud Keychain, Google Password Manager, Windows Hello, or a security key) and **never leaves the device**; the IDMP server stores only the public key. During verification, the device confirms your identity via fingerprint, face recognition, or device PIN before signing.

Manage passkeys in **Avatar menu → Profile Settings → Passkey**. The list shows the following information:

| Column or Action | Description |
|---|---|
| **Passkey** | Display identifier of the credential |
| **Added on** | When the passkey was registered |
| **Last used** | When the passkey was last used; `-` if it has never been used |
| **Action** | Delete the passkey |

### 14.10.2.1 Registering a Passkey

1. Open **Profile Settings → Passkey** and click **Add Passkey**.
2. Follow the browser/operating system prompts and complete verification with your fingerprint, face recognition, or device PIN.
3. After successful registration, the passkey appears in the list and can be used for subsequent step-up verification.

### 14.10.2.2 Deleting a Passkey

Click the delete icon in the target passkey's row and confirm. Deletion removes only the **credential record stored on the IDMP server**; the passkey stored in your device's or operating system's keychain is not removed remotely. To remove it completely, delete it from your device's passkey/keychain settings.

:::note

- Passkeys are available only in **HTTPS or localhost** secure contexts; if the browser does not support them, a corresponding message is shown.
- For security reasons, requests authenticated with an **API key** cannot manage passkeys (registration, listing, deletion). These operations must be performed in the signed-in Web UI.

:::

## 14.10.3 MFA Management (Exemption Configuration)

Administrators can configure **temporary or permanent exemptions** from step-up verification for protected operations in **Admin Console → System Management → MFA**. This page requires the corresponding view/edit permissions (`view:mfa` / `edit:mfa`) and is visible only to super administrators by default.

The list is displayed in read-only mode:

| Column | Description |
|---|---|
| **Operation Name** | Localized name of the protected operation |
| **MFA Suspension End Time** | Expiration time of the current exemption; "Permanently exempt" for permanent exemptions, `-` if not exempt |
| **Description** | Description of the operation |

Click **Edit** in the upper-left corner to enter edit mode, where each row can independently be set to one of the following modes:

| Mode | Meaning |
|---|---|
| **Enforce MFA** | Step-up verification is required when performing the operation (default) |
| **Temporary exemption** | Step-up verification is skipped for the specified **duration (minutes)**; enforcement resumes automatically when it expires |
| **Permanent exemption** | Step-up verification is skipped permanently until manually changed back to another mode |

Click **Save** when done:

- Changing to **temporary/permanent exemption** → creates or updates the exemption for that operation;
- Changing from an exemption back to **Enforce MFA** → removes the exemption for that operation and resumes enforcement;
- **Unmodified rows are not affected** — existing exemptions (including their original windows/permanent settings) are not overwritten.

To modify the window or mode of an existing exemption, simply change the mode/duration in that row and save.

:::note
A temporary exemption automatically resumes enforcement when it expires; a **permanent exemption never resumes automatically**. Use permanent exemptions only when truly necessary, and manually change them back to **Enforce MFA** when no longer needed.
:::

## 14.10.4 Optional Deployment Configuration

The following configuration options adjust step-up verification behavior (all are optional; the defaults work out of the box):

| Option | Default | Purpose |
|---|---|---|
| `tda.mfa.enabled` | `false` | Master switch for step-up verification; when disabled, protected operations no longer require verification. |
| `tda.mfa.step-up-token-ttl` | `300` | Validity period (seconds) of the internal token obtained after successful verification. |
| `tda.mfa.email-code-ttl` | `600` | Validity period (seconds) of the email verification code. |
| `tda.webauthn.rp-name` | `IDMP` | Name displayed for the passkey in authenticator/system prompts. |
| `tda.webauthn.rp-id` | Request hostname | Domain (RP ID) the passkey is bound to. Explicit configuration is recommended for multi-domain/reverse-proxy deployments. |
| `tda.webauthn.origins` | Request origin | Allowlist of origins (full origin) accepted during verification. Multi-origin deployments must list all origins. |
| `tda.webauthn.challenge-ttl` | `300` | Validity period (seconds) of the WebAuthn challenge. |

When the system is accessed from multiple origins or through a reverse proxy, explicitly configure `rp-id` and `origins`; otherwise a passkey registered on one origin may fail to verify on another:

```yaml
tda:
  webauthn:
    rp-id: idmp.example.com
    origins:
      - https://idmp.example.com
```

:::note
`tda.webauthn.rp-id` must be a registrable domain suffix of each origin's hostname (for example, `example.com` works for both `https://app.example.com` and `https://example.com`). An incorrect configuration causes passkey verification to fail.
:::
