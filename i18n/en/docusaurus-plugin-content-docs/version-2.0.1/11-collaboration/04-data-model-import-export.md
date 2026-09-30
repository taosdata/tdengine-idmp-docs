---
title: Data Model Import and Export
sidebar_label: Data Model Import and Export
---

# 11.4 Data Model Import and Export

IDMP's Import/Export feature in the Management Console lets you transfer your data model — elements, element templates, event templates, UOM categories, and libraries — between IDMP instances. This is useful for replicating a configuration from a development environment to production, or for sharing a standard asset model across multiple deployments.

## 11.4.1 Accessing Import/Export

Navigate to **Management Console → Import/Export**.

The main page shows a history table of all past import and export operations, with columns for **Created at**, **Status**, **Name**, and **Reason**. Use the **Categories** and **Import** filter buttons to switch between viewing export and import history.

## 11.4.2 Exporting the Data Model

Click the **Export** icon (download arrow) in the top-right corner to open the export configuration form.

### 11.4.2.1 Selecting Resources

The export form has two selectors:

| Selector | What it selects |
|---|---|
| **Select Elements** | One or more root elements from the asset tree. IDMP includes the selected elements and all resources they depend on. |
| **Select Libraries** | One or more library entries (element templates, UOM categories, etc.) to include independently of any elements. |

As you make selections, the **Selected Resources** tree preview updates to show exactly what will be included in the export — elements, their templates, event templates, UOM categories, and individual units of measure.

### 11.4.2.2 Export Summary

At the bottom of the form, a summary table confirms the counts of each resource type to be exported:

| Resource | Description |
|---|---|
| **Elements Count** | Number of elements selected |
| **Element Templates Count** | Number of element templates pulled in |
| **Event Templates Count** | Number of event templates pulled in |
| **Categories Count** | Number of UOM categories pulled in |
| **UOMs Count** | Number of units of measure pulled in |
| **Total Resources Count** | Total number of resources in the export |

Click **Confirm** to generate and download the export file. Click **Discard** to cancel.

## 11.4.3 Importing a Data Model

Click the **Import** icon (upload arrow) in the top-right corner to open the import form.

### 11.4.3.1 Import Fields

| Field | Description |
|---|---|
| **Metadata File** (required) | The data model file produced by a previous IDMP export. Click **Select Metadata File** to upload it. |
| **TSGen Configuration File** (optional) | An optional TDengine schema-generation configuration file to associate with the import. It is automatically validated on import (see [11.4.5](#1145-taosgen-configuration-validation)). |
| **Historical Data CSV File** (optional) | An optional historical-data file used for [historical data replay](#1144-historical-data-replay). When uploaded, the matching super table replays this data in a loop; without it, data is generated as defined in the TSGen configuration. |
| **Select Connections** (required) | The TDengine connection that imported elements will be bound to for time-series data storage. |
| **Contact Point** (required) | The notification contact point to associate with imported event templates. |

Click **Confirm** to start the import. The operation runs in the background and its progress and result appear in the history table on the main Import/Export page.

## 11.4.4 Historical Data Replay

When importing a data model, in addition to having taosgen generate simulated data per rules, you can also **replay real historical data**: a historical-data CSV is continuously written into the corresponding table so it behaves like a live data stream. This is commonly used for demos, load testing, and giving dashboards/analytics data that "looks real-time".

### 11.4.4.1 How to Enable

Upload one or more CSV files in the **Historical Data CSV File** field of the import form to enable replay:

- **CSV uploaded**: the super table with the matching name replays this data in a loop;
- **No CSV uploaded**: runs exactly as defined in the taosgen configuration (synthetic generation, or replay already written into the config), with no change in behavior.

Keeping the historical data in a separate CSV file (instead of embedding it in the taosgen configuration) avoids bloating the configuration file with large data.

### 11.4.4.2 CSV File Requirements

| Requirement | Description |
|---|---|
| **File name** | Must match the table name in the configuration. |
| **Header** | Contains only the measurement columns, in the same order as the super table's data columns; it **excludes** the `ts` (timestamp) and `tbname` (subtable name) columns. |

For example, if the super table `electricity_meters` has data columns `current,phase,power,voltage`, the CSV looks like:

```csv
current,phase,power,voltage
8.1,0.12,100,220
7.9,0.15,100,219
8.3,0.11,100,221
```

### 11.4.4.3 Replay Behavior

- **Timestamps**: generated continuously by the `ts` column as `start + step`, always advancing. If the `ts` column has **no** `start`, on import it is automatically set to roughly four days before now, so replayed data begins about four days ago and keeps advancing as `ts` increments, making it look freshly ingested while keeping a little history; if a `start` **is** specified, replay begins at that time.
- **Write rate**: determined by the `ts` column's `step`. For example, `step: "100ms"` is about 10 rows per second; decrease/increase `step` to speed up/slow down.
- **Looping**: with `repeat_read: true` and `rows_per_table: -1`, the historical measurement values are written in a repeating loop until the task is **manually stopped**.
- **Background task**: replay runs as a background continuous-generation task and can be **stopped / resumed** from the Import/Export history page.

### 11.4.4.4 taosgen Configuration Fields

Replay is driven by the `tdengine/insert` step in the taosgen configuration. The key fields are:

| Field | Meaning |
|---|---|
| `schema.name` | The target super table name. |
| `columns` | Column definitions; `ts` is the timestamp column, where `start` is the start time (epoch ms) — when unspecified it is auto-set to ~4 days before now on import, and when specified replay begins at that time; `step` is the row interval and also the write rate, and `precision` is the time precision. |
| `generation.rows_per_table` | `-1` means generate continuously; `interlace` is the number of interleaved rows. |
| `from_csv.tags` | The subtable tag file (`subtable_*.csv`), which determines the subtables to write into; `tbname_index` specifies the column holding the table name. |
| `from_csv.columns` | The historical data file; `loading_mode: preload` loads it into memory, `repeat_read: true` replays in a loop, and when `tbname_index` is **not** set all subtables share this data. |
| `time_interval` | `enabled: true` turns on timestamp-paced throttling (required for continuous generation, otherwise rows never flush); `interval_strategy: literal` paces by `ts`. |

### 11.4.4.5 Complete Example

The following is a complete historical-data replay `tdengine/insert` job, using the super table `electricity_meters` (data columns `current,phase,power,voltage`) as an example:

```yaml
insert-electricity_meters:
  name: "Insert data into electricity_meters"
  needs:
    - "create-child-table"
  steps:
    - name: "Replay electricity_meters"
      uses: "tdengine/insert"
      with:
        schema:
          name: "electricity_meters"
          columns:
            - name: "ts"
              type: "timestamp"
              start: 1781509407300        # start time (epoch ms); used as-is if set, else auto-set to ~4 days before now on import
              step: "100ms"               # row interval; also sets the write rate (~1000/step rows per second)
              precision: "ms"
            - name: "`current`"
              type: "FLOAT"
            - name: "`phase`"
              type: "FLOAT"
            - name: "`power`"
              type: "FLOAT"
            - name: "`voltage`"
              type: "INT"
          generation:
            interlace: 1
            rows_per_table: -1            # -1 means generate continuously
            num_cached_batches: 0
          from_csv:
            tags:
              # subtable list: which subtables to write into
              file_path: "./subtable_idmp_sample_utility_electricity_meters.csv"
              tbname_index: 0
            columns:
              # historical data file (the uploaded CSV); header current,phase,power,voltage (no tbname/ts)
              file_path: "./data_idmp_sample_utility_electricity_meters.csv"
              loading_mode: "preload"
              has_header: true
              repeat_read: true           # loop; all subtables share this historical data
        time_interval:
          enabled: true                   # required for continuous generation; otherwise rows never flush
          interval_strategy: "literal"
```

Where:

- `data_idmp_sample_utility_electricity_meters.csv` is the uploaded historical-data file, with content like the example in [11.4.4.2](#11442-csv-file-requirements) (header `current,phase,power,voltage`);
- `subtable_idmp_sample_utility_electricity_meters.csv` is the subtable tag file, generated together with the metadata export.

## 11.4.5 taosgen Configuration Validation

On import, IDMP validates the configuration **before** running taosgen and reports all detected problems at once on the import record, so you can confirm whether the configuration is usable at import time instead of hitting errors at run time. Validation includes:

- **Connection**: missing `tdengine.dsn`.
- **Job structure**: no `jobs`; a job missing `steps`; a step missing `uses`; a `tdengine/insert` step missing `schema.name`.
- **Replay-specific** (when a `tdengine/insert` step has `from_csv.columns`): missing `from_csv.tags` subtable list (which would cause writes to default tables `d0`, `d1`… instead of the target subtables), missing `from_csv.columns.file_path`, or missing a `timestamp`-type timestamp column.
- **Referenced file existence**: the files referenced by `from_csv` (subtable tag file, historical data file) must be provided by an uploaded CSV or by `subTableCsv` in the configuration; otherwise a "file not found" problem is reported.

If validation fails, the import fails and the specific reason is shown in the history record; fix the configuration or supply the missing CSV and import again.

## 11.4.6 Typical Workflow

A typical cross-instance deployment workflow looks like this:

1. On the **source** instance, configure your elements, templates, and libraries.
2. Go to **Management Console → Import/Export** and export the relevant elements and libraries.
3. Download the metadata file.
4. On the **target** instance, go to **Management Console → Import/Export** and import the metadata file.
5. Select the appropriate connection and contact point on the target instance.
6. (Optional) To replay real historical data, upload the corresponding **Historical Data CSV File** (file name matching the super table name).
7. Confirm the import and verify the resources appear in the Explorer and Libraries; if replay is enabled, you can view and stop/resume the replay task on the history page.
