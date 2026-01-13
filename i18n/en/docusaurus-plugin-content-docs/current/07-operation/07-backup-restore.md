---
title: Backing Up and Restoring Data
---

# Data Backup and Recovery

TDengine IDMP's backup and restore feature allows users to periodically back up data and configurations to prevent data loss or damage. Users can restore to a specific backup point as needed.

## Data Backup

Click the "Admin Console" option in the dropdown menu under the avatar icon in the top-right corner of the page to enter the "Admin Console" page. Then click the "Data Backup" button to access the "Data Backup" main page.

### Configure

- Users can select two backup strategies: one is to perform backups at hourly intervals, and the other is to run backups at a specific time of day.
- Configure the number of backup files to retain; users can set this value reasonably based on the available disk capacity to prevent excessive backup files from occupying storage space.
- Configure the storage directory path for backup files to specify the save location of backup data.

### Backup Information

- After configuration is completed, the system will initiate backup tasks in accordance with the configured settings.
- The data backup viewing page will display backup configuration information, current backup status (e.g., "Backing Up", "Stopped"), as well as details of the generated backup files.
- The data backup page is equipped with Start and Stop buttons on the right side, enabling users to start or stop backup tasks at any time.

## Data Restoration

1. Stop the IDMP service process to avoid data read-write conflicts during the restoration process.
1. Refer to the config\application.yml configuration file in the installation directory to locate the path of the data storage directory, and back up this directory (to prevent loss of original data caused by exceptions during the restoration operation).
1. Enter the data backup storage directory, search for and verify the target backup file to be restored (check the file creation time, integrity checksum and other information to ensure the backup file is valid and meets the restoration requirements).
1. Extract the verified target backup file to the data directory located in Step 2 (confirm the read and write permissions of the directory before extraction to ensure the operation can be executed).
1. Restart the IDMP service process to make the restored data take effect.
1. Verify the restoration result: Log in to the IDMP system, check whether the core business data, configuration information, etc. are consistent with the state at the time of backup, and confirm that the data is restored accurately and available.