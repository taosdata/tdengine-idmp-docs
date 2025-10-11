---
title: Importing and Exporting Data
---

TDengine IDMP can import metadata from TDengine TSDB-Enterprise to generate a data model.

## TDengine TSDB-Enterprise Easy Import

From the outset, TDengine TSDB-Enterprise was designed with a clear distinction between static tags and dynamic time-series data. It also supports hierarchical structures in static tags using “.” as a delimiter. Additionally, TDengine introduced the concept of supertables—templates for similar types of devices—where a single supertable can have multiple subtable instances. This design aligns perfectly with IDMP’s tree-based modeling and element templates, making data import extremely straightforward when good data modeling is already in place within TDengine.

Each super table in TSDB corresponds to an element template in IDMP. Each sub-table under a super table maps to an instance of that element template in IDMP, with the sub-table name used as the element name. Sub-table tag values are mapped to the element’s static properties (with data reference type set to TDengine Tag), and the time-series data is mapped to dynamic data (data reference type set to TDengine Metric). Hierarchical tags in sub-tables (such as the location tag Location) are used directly as the element’s tree path. With this mapping, importing metadata from TSDB into IDMP becomes highly efficient.

The specific import steps are as follows:

1. In the Admin Console, create a connection to the TDengine TSDB-Enterprise.
2. On the connection list page or from the sidebar, click the three-dot menu and select **Easy Import**.
3. At the top of the data import page, a drop-down menu displays all databases under the selected connection. After you choose a database, the drop-down menu on the right will show all supertables within the database.
4. Each supertable must be configured individually. If you do not wish to import a specific supertable, choose **Ignore** in the top right corner. If you do want to import it, proceed with the following steps:
    * The system will display the list of tags for the selected supertable. Choose one or more tags to serve as the tree structure path. If multiple tags are suitable, you can select more than one—this way, the same element will appear in multiple tree structures. For tags not used in the path, you may choose to map them as static attributes of the element. You can also leave a tag unmapped to discard it entirely.
    * The system will list all time-series columns in the super table. You can choose which ones to import. Imported columns will become dynamic attributes of the element.
    * By default, each attribute name matches the column name in the TSDB, but you may rename them as needed.
5. After configuring a supertable, click **Next Supertable**. Once all supertables are configured, click the **Finish** icon in the action bar or the Finish button at the bottom to officially create the data import task. You can also click Finish at any time to accept the system's default configuration and proceed with the import immediately.
6. A popup will appear showing the import progress. When complete, the system will display statistics such as the number of element templates and elements created.

**Auto Sync:** After the import task is completed, IDMP will monitor metadata changes in the TDengine TSDB-Enterprise. For configured supertables, if new subtables are added or existing ones are removed, IDMP will automatically synchronize those changes.

**Reconfigure:** If new supertables are added to the TSDB or previously ignored ones need to be included, you can click Rebuild to reconfigure. Existing settings will be loaded for editing.

**Data:** After importing, it’s recommended to enrich the data whenever possible. This includes adding physical units, categories, descriptions, and limit values to each element, as well as adding metadata to non-leaf nodes. By assigning business semantics to your data, you make your data platform AI-ready, allowing AI to better recommend dashboards and real-time analyses.

## TDengine TSDB-Enterprise Asset Model

If data has already been written into TSDB but lacks proper modeling—such as missing hierarchical tags, or using a single-column model despite each device having multiple data points— then the data cannot be directly imported into IDMP. In such cases, IDMP offers a flexible yet more complex configuration method that allows you to consolidate multiple super tables into a single element template. By using string builders and naming patterns, you can construct a hierarchical structure manually. This approach effectively resolves the limitations of single-column models and enables data from the OT domain (e.g., PLC-collected data) to be better structured and semantically enriched in the IT domain—making it easier to extract meaningful business insights.

In this scenario, you first need to create the element template and define its attributes. Each supertable in TSDB may only cover a portion of the attributes in the element template, and each subtable may only correspond to part of a single element’s attributes. To handle this, IDMP automatically creates virtual supertables and virtual subtables internally—merging multiple subtables into a virtual table and combining multiple supertables into a virtual supertable. This process is completely transparent to the user.
The overall data import workflow includes: selecting the database and supertables, choosing the corresponding element template, configuring the element name and path, and then mapping the tags and time-series data from the supertables to the attributes of the element template.

The specific steps are as follows:

1. In the Admin Console, create a connection to the TDengine TSDB-Enterprise.
2. On the connection list page, or from the left-side tree structure view, click the three-dot menu and select **Asset Model**.
3. At the top of the import page, a drop-down menu will display all databases under the selected connection. After choosing a database, the drop-down menu on the right will show all supertables within that database.
4. Select an element template.
5. Configure the element name. Click the + button to see available replacement strings, such as subtable tag values. You can assemble the name using these dynamic parts along with fixed strings, prefixes, or suffixes. Click **Preview** to see the resulting element names and confirm they are correct.
6. Configure the element path. Click the + button to see available replacement strings, such as subtable tag values. You can assemble the name using these dynamic parts along with fixed strings, prefixes, or suffixes. Click **Preview** to see the resulting element paths and confirm they are correct..
7. Map tag values: You can map the supertable’s tag values to the element’s properties, or choose **None** to skip mapping.
8. Map metric values: You can map the supertable’s time-series data to the element’s properties, or choose **None** to skip mapping.
9. Set subtable filtering conditions: Not all subtables under a supertable need to be mapped to the same element template. For example, in single-point models, users may group subtables by data type. Subtables in the same supertable might come from different device types. In such cases, you need to use tag values to filter them appropriately.
10. Click **Finish**. The system will then create a data import task.

The steps above only complete the mapping configuration for a single supertable or just a portion of its metrics. To complete a full data import, you must to create multiple asset models. In extreme cases, such as single-column models, if each device type has 100 attributes and there are 10 different device types, you may need to create 100 × 10 asset models.

**Automatic synchronization:** Once an asset model is created, if new subtables are added in TDengine TSDB-Enterprise, they will be automatically synced to IDMP without manual intervention.

**New supertables:** After asset models are created, if new supertables are added in TDengine TSDB-Enterprise, new asset models must be created. Otherwise, metadata from the new supertables cannot be imported into IDMP, and new data assets will not be visible.

## TDengine TSDB-Enterprise Data Import

After using the Asset Model import, you may quickly notice that when there are too many super tables under the single-column model, creating tasks becomes very cumbersome. Although element templates can now be created from CSV files, the mapping between attribute templates and super tables still requires multiple task creations. IDMP provides CSV-based data import, which can be considered as a batch operation of `Easy Import` and `Asset Model`. With CSV data import, you can prepare element templates in advance, or you may choose not to create element templates at all.

### Steps

1. In the management console, create a connection to TDengine TSDB-Enterprise.  
2. On the connection list page, or in the left-hand tree structure list, click the three-dot menu and select **Data Import**.  
3. Click the export button on the page. A popup window will appear allowing you to export to CSV. You can choose to export all databases and super tables. If you do not choose to export all, then you must specify the databases and super tables to export.  
4. You can also choose **Export SubTable Name**. If this option is selected, all subtables under each selected super table will be exported. This approach is used when subtables do not have element paths or when you need to specify certain element names or element paths.  
5. After obtaining the exported CSV file, you should modify it as needed — for example, by setting the element name expression and element path expression. If the attribute templates corresponding to the super table columns do not exist, you can configure various attributes of the attribute template (such as default unit of measurement) in the corresponding row.  
6. After configuring the CSV file, upload it by clicking the import button. Once uploaded, the import task will start immediately.  

### CSV Configuration File Description

1. Comment lines begin with `#` and will not be processed. CSV rows must use a comma `,` as the delimiter.  
2. The first line to be processed is the Header. The lines after the Header are treated as data.  
3. Although the format is CSV, the data will be processed in chunks. The first line of each chunk must contain the database name and super table name. Similarly, if the database and super table are set, it will be treated as a new chunk configuration.  
4. If no element template is set, elements (with the super table name as the element template name) and attribute templates will be created automatically based on the CSV row’s attribute template configuration.  
5. If a subtable name is specified, only that subtable will be processed. If a subtable filter rule is set, only the subtables that match the rule will be processed. If neither subtable name nor subtable filter rule is set, all subtables will be processed.  
6. **Note**: The element name expression cannot contain commas. The first line of each data chunk must not have an empty element name expression. You can use tag-based strings, e.g., `prefix_${tbname}_suffix`, `prefix_${device_name_tag}`.  
7. The element path expression cannot be empty. It can be any string or a combination of tags, e.g., `Location.${location_tag}`. If the tag value contains a period `.`, it will automatically form a hierarchy. For example, `Beijing.Chaoyang` will create *Beijing* as the parent element of *Chaoyang*.  
8. Super table column names cannot be empty.  
9. Attribute template names may be empty. If left empty, the super table column will automatically map to an attribute template of the same name. If it does not exist, it will be created automatically. If an attribute template name is provided but does not exist, it will also be created automatically.  
10. Reference type currently only supports `TDengineMetric` and `TDengineTag`. This field cannot be empty.  
11. The attribute template description and the following columns may all be left empty. If you specify a unit of measurement, it must already exist in IDMP.  
12. **Important**: Comment lines must not be removed. If comment lines are deleted, CSV parsing will fail.  

:::note

The CSV configuration file uses the `UTF-8` encoding format and does not currently support the `UTF-8 with BOM` encoding.

:::

**CSV Configuration File Examples**  
1. The element path is already defined in the super table. Here, TDengine TSDB’s commonly used smart meter is used as an example. In the structure of the smart meter super table (`meters`), the tag `location` is defined, which stores a `.`-separated path. This can be considered as the element path already existing in the super table. Each sub-table of `meters` corresponds to an element. Since there is no tag for the element name, the sub-table name is defined as the element name. In this case, the CSV configuration example is as follows:
   
| Database Name | Super Table Name | Element Template Name | Sub Table Name | Sub Table Filter | Element Name Expression | Element Path Expression   | Super Table Column Name | Attribute Template Name | Reference Type   | Attribute Template Description | Attribute Template Hidden | Attribute Template Excluded | Attribute Template Default UoM | Attribute Template Display UoM | Attribute Template Default Value | Attribute Template Display Digits |
|---------------|------------------|-----------------------|----------------|-----------------------|-------------------------|---------------------------|--------------------------|--------------------------|------------------|---------------------------------|--------|----------|--------------|-------------|---------------|----------------|
| test          | meters           | Smart Meter           |                |                       | `${tbname}`             | `Location.${location}`    | current                  | Current                  | TDengineMetric   |                                 |        |          |              |             |               |                |
|               |                  |                       |                |                       |                         |                           | voltage                  | Voltage                  | TDengineMetric   |                                 |        |          |              |             |               |                |
|               |                  |                       |                |                       |                         |                           | phase                    | Phase                    | TDengineMetric   |                                 |        |          |              |             |               |                |
|               |                  |                       |                |                       |                         |                           | groupid                  | Group ID                 | TDengineTag      |                                 |        |          |              |             |               |                |

1. The element path needs to be constructed from multiple tag values. This situation is different from Example 1, where the value of the `location` tag is already a `.`-separated string. The element path needs to be composed of multiple tags, forming a combination like `${tag1}.${tag2}.${tag3}`. For example, in the super table `vm_processes`, the tags `location`, `rack_num`, and `slot_num` exist. When defining the element path, these three need to be combined, while using `vm_host` as the element name. The element template is defined as `VM Disk IO`. This template does not currently exist in the base library and will be automatically created based on the CSV configuration. The CSV configuration example is as follows:

| Database Name | Super Table Name | Element Template Name | Sub Table Name | Sub Table Filter | Element Name Expression | Element Path Expression                          | Super Table Column Name | Attribute Template Name | Reference Type   | Attribute Template Description | Attribute Template Hidden | Attribute Template Excluded | Attribute Template Default UoM | Attribute Template Display UoM | Attribute Template Default Value | Attribute Template Display Digits |
|---------------|------------------|-----------------------|----------------|-----------------------|-------------------------|-------------------------------------------------|--------------------------|--------------------------|------------------|---------------------------------|--------|----------|--------------|-------------|---------------|----------------|
| idmp_telegraf | vm_diskio        | VM Disk IO            |                |                       | `${vm_host}`            | `${location}.${rack_num}.${slot_num}.vm`        | slot_num                 | Physical Machine Number | TDengineTag      |                                 |        |          |              |             |               |                |
|               |                  |                       |                |                       |                         |                                                 | write_bytes              |                          | TDengineMetric   |                                 |        |          |              |             |               |                |
|               |                  |                       |                |                       |                         |                                                 | reads                    |                          | TDengineMetric   |                                 |        |          |              |             |               |                |
|               |                  |                       |                |                       |                         |                                                 | location                 |                          | TDengineTag      |                                 |        |          |              |             |               |                |
|               |                  |                       |                |                       |                         |                                                 | vm_host                  |                          | TDengineTag      |                                 |        |          |              |             |               |                |
|               |                  |                       |                |                       |                         |                                                 | rack_num                 |                          | TDengineTag      |                                 |        |          |              |             |               |                |

3. When the sub-table does not contain any path-related information. In this case, there are two approaches: one is to modify the table structure by adding a new tag column to store the element path corresponding to the sub-table. After such modification, the element path can be specified using the above two methods. The other approach is to explicitly configure the element path in the CSV. Next, a single-column storage structure is used to demonstrate this configuration method. The super table name is `opc_stw`. The sub-tables under this super table correspond to four devices: `Inlet and Outlet Water Monitoring`, `Bioreactor North Group`, `Bioreactor South Group`, and `MBR Tank`. Among them, both `Bioreactor North Group` and `Bioreactor South Group` use the `Bioreactor` element template.

| Database Name | Super Table Name | Element Template Name | Sub Table Name | Sub Table Filter | Element Name Expression | Element Path Expression                                | Super Table Column Name | Attribute Template Name        | Reference Type   | Attribute Template Description | Attribute Template Hidden | Attribute Template Excluded | Attribute Template Default UoM | Attribute Template Display UoM | Attribute Template Default Value | Attribute Template Display Digits |
|---------------|------------------|-----------------------|----------------|-----------------------|-------------------------|-------------------------------------------------------|--------------------------|-------------------------------|------------------|---------------------------------|--------|----------|--------------|-------------|---------------|----------------|
| db_stw        | opc_stw          | Inlet and Outlet Water Monitoring | t_WastewaterDemo_WWTP_Public_InletOutlet_COD  |                       | Inlet and Outlet Water Monitoring | `WastewaterDemo.WWTP.Public`                      | val                      | Outlet COD                    | TDengineMetric   |                                 |        |          | milligram per liter         | milligram per liter        |               | 2              |
|               |                  |                       | t_WastewaterDemo_WWTP_Public_InletOutlet_TN   |                       | Inlet and Outlet Water Monitoring | `WastewaterDemo.WWTP.Public`                      | val                      | Outlet TN                     | TDengineMetric   |                                 |        |          | milligram per liter         | milligram per liter        |               | 2              |
|               |                  |                       | t_WastewaterDemo_WWTP_Public_InletOutlet_NH4  |                       | Inlet and Outlet Water Monitoring | `WastewaterDemo.WWTP.Public`                      | val                      | Outlet NH4                    | TDengineMetric   |                                 |        |          | milligram per liter         | milligram per liter        |               | 2              |
| db_stw        | opc_stw          | Bioreactor            | t_WastewaterDemo_WWTP_Bioreactor_A2O_Bioreactor_NorthGroup_Aerobic_MLSS | | Bioreactor North Group | `WastewaterDemo.WWTP.Bioreactor.A2O`                 | val                      | Aerobic Tank MLSS             | TDengineMetric   |                                 |        |          | milligram per liter         | milligram per liter        |               | 2              |
|               |                  |                       | t_WastewaterDemo_WWTP_Bioreactor_A2O_Bioreactor_NorthGroup_Aerobic_DO   | | Bioreactor North Group | `WastewaterDemo.WWTP.Bioreactor.A2O`                 | val                      | Aerobic Tank Outlet DO        | TDengineMetric   |                                 |        |          | milligram per liter         | milligram per liter        |               | 2              |
|               |                  |                       | t_WastewaterDemo_WWTP_Bioreactor_A2O_Bioreactor_NorthGroup_Aerobic_Flow | | Bioreactor North Group | `WastewaterDemo.WWTP.Bioreactor.A2O`                 | val                      | Aerobic Tank Open Channel Instant Flow | TDengineMetric   |                         |        |          | m³/h         | m³/h        |               | 2              |
| db_stw        | opc_stw          | Bioreactor            | t_WastewaterDemo_WWTP_Bioreactor_A2O_Bioreactor_SouthGroup_Aerobic_MLSS | | Bioreactor South Group | `WastewaterDemo.WWTP.Bioreactor.A2O`                 | val                      | Aerobic Tank MLSS             | TDengineMetric   |                                 |        |          | milligram per liter         | milligram per liter        |               | 2              |
|               |                  |                       | t_WastewaterDemo_WWTP_Bioreactor_A2O_Bioreactor_SouthGroup_Aerobic_DO   | | Bioreactor South Group | `WastewaterDemo.WWTP.Bioreactor.A2O`                 | val                      | Aerobic Tank Outlet DO        | TDengineMetric   |                                 |        |          | milligram per liter         | milligram per liter        |               | 2              |
|               |                  |                       | t_WastewaterDemo_WWTP_Bioreactor_A2O_Bioreactor_SouthGroup_Aerobic_Flow | | Bioreactor South Group | `WastewaterDemo.WWTP.Bioreactor.A2O`                 | val                      | Aerobic Tank Open Channel Instant Flow | TDengineMetric   |                         |        |          | milligram per liter         | milligram per liter        |               | 2              |
| db_stw        | opc_stw          | MBR Tank              | t_WastewaterDemo_WWTP_Bioreactor_MBRTank_MBRTank_Outlet_NH4             |                       | MBR Tank                  | `WastewaterDemo.WWTP.Bioreactor.MBRTank`             | val                      | MBR Tank Outlet NH4           | TDengineMetric   |                                 |        |          | milligram per liter         | milligram per liter        |               | 2              |
|               |                  |                       | t_WastewaterDemo_WWTP_Bioreactor_MBRTank_MBRTank_Outlet_NO3             |                       | MBR Tank                  | `WastewaterDemo.WWTP.Bioreactor.MBRTank`             | val                      | MBR Tank Outlet NO3           | TDengineMetric   |                                 |        |          | milligram per liter         | milligram per liter        |               | 2              |


### Automatic Synchronization
Once the CSV data import task is created, if new subtables are added in TSDB, they will be automatically synchronized to IDMP without manual intervention.  

### Monitoring Tasks
Once a CSV data import task is created, you can view the task and previously created import tasks along with their statuses (failure reasons will be displayed if any). For import tasks that do not specify subtable names, automatic synchronization tasks will be created. These synchronization tasks can be stopped or started using the menu button on the right side of the task.  

:::note

After the CSV data import task is created, if new super tables are added in TSDB, a new asset model must be added. Otherwise, metadata from the new super tables cannot be imported into IDMP, and the new data assets will not be visible in IDMP.  

:::


<style>
th {
  white-space: nowrap;
}
</style>