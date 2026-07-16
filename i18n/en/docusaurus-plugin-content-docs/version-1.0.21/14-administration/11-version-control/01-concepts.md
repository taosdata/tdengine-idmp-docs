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
- **Publish Mode Restriction**: VT mode only supports **Auto-Push**; Manual publish is not available

### Review Required

Changes must pass Merge Request / Pull Request review before merging.

- **Use Case**: Approval workflow required, but no electronic signature needed
- **Workflow**: User edits metadata → Check-In → system automatically creates MR/PR → Reviewer reviews → takes effect after merge
- **Features**: Protects the running branch, supports diff review, comments, and rejection

### E-Signature

Adds GPG electronic signature on top of Review Required.

- **Use Case**: Highly regulated industries (e.g., pharmaceuticals) requiring compliance with FDA 21 CFR Part 11
- **Workflow**: Same as Review Required, with automatic GPG signing for each commit
- **Features**: Highest security level, non-repudiation of commits, meets electronic signature regulations

### Personal Workspace

In **Review Required** and **E-Signature** modes, each user has an independent **Personal Workspace**.
Personal Workspace = independent Git repository + index data copy + related database table copies,
ensuring that unreviewed changes do not affect the public view and are not visible to other users.

In **Version Track** mode, all users share the same Git repository without personal workspaces.

> See [Personal Workspace](./03-personal-workspace.md) for details.

## Publish Modes

Publish modes determine how merged new versions take effect.

### Auto-Push

After a successful merge, the system automatically updates the running system.

- Changes merged into the main branch are automatically pulled by IDMP
- All users immediately see the latest data
- Suitable for most scenarios

### Manual

The administrator decides when to publish which version.

- Multiple MRs/PRs can be accumulated and published in batch
- Administrator selects and publishes a version on the Version Management page
- Suitable for scenarios requiring strict control over publish time windows

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
