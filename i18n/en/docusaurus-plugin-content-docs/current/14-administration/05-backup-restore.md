---
title: Backup and Restore
sidebar_label: Backup and Restore
---

# 14.5 Backup and Restore


TDengine IDMP supports scheduled automated backups. Backups can be used to restore the system to a prior state after data loss or corruption.

Backup and restore is accessed from **Admin Console → Data Backup** and **Admin Console → Data Recovery**.

## Data Backup

### Configuring Backup

Click the edit (pencil) icon on the Data Backup page to configure backup settings:

| Field | Description |
|---|---|
| **Backup Mode** | Backup schedule: run at a fixed hourly interval, or at a specific time each day |
| **Retention Number of Files** | How many backup files to keep. Older files are deleted when the limit is exceeded. Set this based on available disk space. |
| **Backup Directory** | The directory path on the server where backup files are stored |

Click **Save** to apply the configuration.

### Managing Backups

After configuring backup, use the toolbar buttons to control the backup process:

- **Start (▶):** Begin the backup schedule.
- **Stop (⏹):** Pause the backup schedule.

The page shows the current **Backup Status** (e.g., Running, Stopped) and a **Backup Records** table listing all generated backup files:

| Column | Description |
|---|---|
| **Backup Time** | When the backup was created |
| **Result** | Backup outcome (success or failure) |
| **Backup File** | Filename of the backup archive |
| **Backup Detail** | Additional details or error information |

## Data Recovery

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
