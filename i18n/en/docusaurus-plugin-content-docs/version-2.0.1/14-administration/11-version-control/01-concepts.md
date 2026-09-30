---
title: Edit Modes & Publish Modes
sidebar_label: Edit Modes & Publish Modes
---

# Edit Modes & Publish Modes

The core of version control is the combination of **Edit Mode** and **Publish Mode**. Administrators configure
these modes on the **Management Console → Version Control → Configuration** page, determining
how users submit changes and how the system publishes new versions.

## Edit Modes

Edit modes determine the workflow for submitting changes. IDMP provides three modes:

### Version Track

The simplest workflow. All users share the `main` branch, and changes are committed directly to the repository.

- **Use Case**: Change history tracking only; no approval workflow needed
- **Workflow**: User edits metadata → Check-In → directly writes to main branch, generating a new version
- **Features**: No branches, no MR/PR, no waiting for review

:::note Publish Mode Restriction
Under Version Track mode, the publish mode **can only be set to Auto-Push**; the Manual option is disabled. This is because all users share the same running branch — changes take effect immediately after Check-In, leaving no "pending publish" state for the administrator to control.
:::

:::tip Personal Workspace
Version Track mode **does not require a personal workspace**. All users share the same Git repository and the same view.
:::

### Review Required

Changes must pass Merge Request / Pull Request review before merging.

- **Use Case**: Approval workflow required, but no electronic signature needed
- **Workflow**: User edits metadata → Check-In → system automatically creates MR/PR → Reviewer reviews → takes effect after merge
- **Features**: Protects the running branch, supports diff review, comments, and rejection

:::note Personal Workspace
Review Required mode **requires a personal workspace for each user**. A user's unreviewed changes exist only in their own personal branch and workspace, so they do not affect the public view and are not visible to other users. Changes become visible to everyone only after review and merge into the main branch.
:::

:::info Publish Mode Options
Under Review Required mode, the publish mode can be Auto-Push or Manual. With Auto-Push, changes are published immediately after the MR/PR merges; with Manual, the administrator decides when to publish.
:::

### E-Signature

Adds GPG electronic signature on top of Review Required.

- **Use Case**: Highly regulated industries (e.g., pharmaceuticals) requiring compliance with FDA 21 CFR Part 11
- **Workflow**: Same as Review Required, with automatic GPG signing for each commit
- **Features**: Highest security level, non-repudiation of commits, meets electronic signature regulations

:::note Personal Workspace
E-Signature mode **also requires a personal workspace for each user**. It is an enhancement of Review Required.
:::

:::warning GPG Key Requirement
Under E-Signature mode, every commit must be signed with the **user's own GPG key**. Users must configure their GPG key in Profile Settings first; otherwise they cannot complete Check-In. See [GPG Keys](./05-gpg-keys.md) for details.
:::

### Personal Workspace

In **Review Required** and **E-Signature** modes, each user has an independent **Personal Workspace**.
Personal Workspace = independent Git repository + index data copy + related database table copies,
ensuring that unreviewed changes do not affect the public view and are not visible to other users.

In **Version Track** mode, all users share the same Git repository without personal workspaces.

The following table compares the three modes:

| Mode | Personal Workspace | Review Workflow | GPG Signature |
|------|:------------------:|:---------------:|:-------------:|
| Version Track | ❌ Not required | ❌ None | ❌ None |
| Review Required | ✅ Required | ✅ MR/PR review | ❌ None |
| E-Signature | ✅ Required | ✅ MR/PR review | ✅ Every commit signed |

> See [Personal Workspace](./03-personal-workspace.md) for details.

## Publish Modes

Publish modes determine how merged new versions take effect.

### Auto-Push

After a successful merge, the system automatically updates the running system.

- Changes merged into the main branch are automatically pulled by IDMP
- All users immediately see the latest data
- Suitable for most scenarios

:::warning Webhook Configuration Required
After changes are merged into the remote repository main branch, they are immediately published to the IDMP server as a new data version. You must **configure the IDMP Webhook URL in your Git platform** so that IDMP receives PR/MR merge notifications and triggers auto-publish. Without a configured Webhook, IDMP cannot detect the merge, and the data version will not update automatically. See [Administrator Setup](./02-admin-setup.md) for details.
:::

### Manual

The administrator decides when to publish which version.

- Multiple MRs/PRs can be accumulated and published in batch
- Administrator selects and publishes a version on the Version Management page
- Suitable for scenarios requiring strict control over publish time windows

:::note Availability
Manual is only available when the edit mode is **Review Required** or **E-Signature**. Under Version Track mode, this option is disabled and only Auto-Push is available.
:::

## How to Switch Modes

1. Go to **Management Console → Version Control → Configuration**
2. Click the **Edit** button to enter edit mode
3. Select the target mode in the "Edit Mode" section
4. Select the target mode in the "Publish Mode" section
5. Click **Save** and enter the administrator password to confirm

:::warning
Switching the edit mode will immediately affect all users' check-in flow. Please proceed with caution.
:::

## Mode Combinations

| Edit Mode | Publish Mode | Typical Scenario |
|---------|---------|---------|
| Version Track | Auto-Push | Dev/test environments, rapid iteration |
| Review Required | Auto-Push | Production, approval required with auto-publish |
| Review Required | Manual | Production, approval required with controlled publish timing |
| E-Signature | Auto-Push | Regulated environment, e-signature + auto-publish |
| E-Signature | Manual | Regulated environment, highest control level |
