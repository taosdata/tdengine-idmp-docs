# Asset List

The asset list uses a table to display the enterprise's asset information along with their latest status and collected values.

## Configuration Options

### Configuration Entry

1. Convert "Element Query Results" to Asset List
2. Convert Child Element List to Asset List

![Asset List Entry](../images/table-asset-sr.png)

![Asset List Entry](../images/table-asset-childel.png)

### Asset List Configuration

As shown in the figure, you can configure the query conditions for the asset list, the fields to display, and their order. The fields include the IDMP asset's own management attributes, as well as referenced attributes (TDengine Tags and TDengine Metrics). In the query conditions, you must specify the asset type (template) to select the corresponding attribute fields.

![Asset List Configuration](../images/table-asset-config.png)

If you convert the asset list through the `Child Element List`, it will be directly saved as a panel under the current element, and can be queried in the current element panel. If you convert the asset list through the `Element Query Results`, you need to specify the save location. After specifying, it will be saved as a panel under the specified element.

![Asset List Configuration](../images/table-asset-save.png)

### Asset List Panel

After successfully saving the asset list, you can see the asset list in the panel list, as shown in the figure:

![Asset List Configuration](../images/table-asset-panel.png)

The asset list panel supports modification, deletion, and can also be added to the dashboard.
