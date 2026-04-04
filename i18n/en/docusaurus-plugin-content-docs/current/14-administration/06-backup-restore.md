---
title: Backup and Restore
sidebar_label: Backup and Restore
---

# 14.6 Backup and Restore

TDengine IDMP supports scheduled automated backups. Backups can be used to restore the system to a prior state after data loss or corruption.

Backup and restore is accessed from **Admin Console → Data Backup** and **Admin Console → Data Recovery**.

## 14.6.1 Data Backup

### 14.6.1.1 Configuring Backup

Click the edit (pencil) icon on the Data Backup page to configure backup settings:

<table>
<colgroup><col style="width:16em"/><col/></colgroup>
<thead><tr><th>Field</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Backup Mode</strong></td><td>Backup schedule: run at a fixed hourly interval, or at a specific time each day</td></tr>
<tr><td><strong>Retention Number of Files</strong></td><td>How many backup files to keep. Older files are deleted when the limit is exceeded. Set this based on available disk space.</td></tr>
<tr><td><strong>Backup Directory</strong></td><td>The directory path on the server where backup files are stored</td></tr>
</tbody>
</table>

Click **Save** to apply the configuration.

### 14.6.1.2 Managing Backups

After configuring backup, use the toolbar buttons to control the backup process:

- **Start (▶):** Begin the backup schedule.
- **Stop (⏹):** Pause the backup schedule.

The page shows the current **Backup Status** (e.g., Running, Stopped) and a **Backup Records** table listing all generated backup files:

<table>
<colgroup><col style="width:10em"/><col/></colgroup>
<thead><tr><th>Column</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Backup Time</strong></td><td>When the backup was created</td></tr>
<tr><td><strong>Result</strong></td><td>Backup outcome (success or failure)</td></tr>
<tr><td><strong>Backup File</strong></td><td>Filename of the backup archive</td></tr>
<tr><td><strong>Backup Detail</strong></td><td>Additional details or error information</td></tr>
</tbody>
</table>

## 14.6.2 Data Recovery

Data recovery is a manual procedure performed at the server level. The recovery steps are displayed on the **Admin Console → Data Recovery** page.

:::warning
Recovery must be performed while the IDMP service is stopped. Performing recovery while the service is running may cause data inconsistency.
:::

**Steps:**

1. **Stop the IDMP service process.** Ensure all service processes are completely terminated before proceeding to prevent data read/write conflicts during recovery.

2. **Back up the original data directory.** Locate the data storage directory by checking the `config/application.yml` file in the installation directory. Back up this directory to prevent data loss in case the recovery operation encounters an error.

3. **Identify the target backup file.** Navigate to the backup file storage directory on the server. Locate the backup file that matches the target recovery point, and verify its creation time and integrity checksum.

4. **Execute the data recovery.** Extract the verified backup file to the data storage directory identified in step 2. Before extracting, confirm that the directory has read/write permissions.

5. **Restart the IDMP service process.** After extraction is complete, restart IDMP to activate the recovered data.

6. **Verify the recovery results.** Log in to IDMP and check that core business data, configuration, and other content are consistent with the state at the backup point in time.
