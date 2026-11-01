---
title: Version Control
sidebar_label: Version Control
---

import DocCardList from '@theme/DocCardList';

# 14.11 Version Control

TDengine IDMP has a built-in Git-based version control system that persists all asset model metadata
(elements, templates, dashboards, panels, analyses, connections, libraries, etc.) as JSON files
in a Git repository, enabling users to **track**, **review**, and **roll back** every change.

## Why Version Control?

In industrial scenarios (such as pharmaceuticals and energy), changes to asset models require strict process control:

- **Change Traceability**: Who changed what attribute, when, and why?
- **Approval Workflow**: Critical changes must be reviewed before taking effect.
- **Rollback Capability**: Quickly restore to any historical version after misoperation.
- **Compliance Requirements**: Meet FDA 21 CFR Part 11, EU Annex 11, and other regulatory requirements.

IDMP chose Git as its version control engine because it natively provides complete history,
diff comparison, branch management, and merge capabilities — the industry's most mature version control solution.

## Feature Overview

| Feature | Description |
|------|------|
| **Change Tracking** | Badge in the top-right corner shows uncommitted change count in real time; one-click opens the change list |
| **Check-In** | Submit changes with a reason to create a Git commit |
| **Undo** | Revert uncommitted changes to the previous version |
| **Diff Comparison** | View differences between HEAD and working tree for any change |
| **Personal Workspace** | Automatically creates personal branches in review modes to isolate unreviewed changes |
| **Pull Request Review** | In Review Required mode, changes must pass MR/PR review |
| **Electronic Signature** | Supports GPG key signing for commits |
| **Version Publishing** | Manage published versions with auto-publish and manual publish options |

## Edit Modes

IDMP supports three edit modes to meet compliance requirements across industries:

- **Version Track**: All users share the `main` branch; changes are committed directly
- **Review Required**: Changes must pass MR/PR review before merging
- **E-Signature**: Adds GPG electronic signature on top of Review Required

## Publish Modes

- **Auto-Push**: Automatically updates the running system after merge
- **Manual**: Administrator decides when to publish which version

## Contents

<DocCardList />
