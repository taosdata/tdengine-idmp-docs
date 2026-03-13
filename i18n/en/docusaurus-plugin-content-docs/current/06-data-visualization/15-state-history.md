# State History

A state history chart displays the historical state distribution of metrics in a dense grid format. It divides the time axis into equal-length time cells, each colored to represent the state within that time period. It is ideal for **identifying periodic patterns, detecting anomalous time periods, and comparing historical state patterns across multiple metrics**.

<!-- ![State History Demo](./images/state-history-demo.png) -->

## Configuration

### Graph Configuration

#### Title

You can set a main title and subtitle for the panel, displayed at the top, to describe the chart's subject matter.

<!-- ![State History Title](./images/state-history-title.png) -->

### Value Mapping

Value mapping maps numeric ranges or specific values to semantically meaningful state labels and colors, making the chart easier to interpret. Click the **Edit Value Mapping** button to add, edit, or delete mapping rules.

Each mapping rule consists of:

1. **Condition**: Match by numeric range (e.g., `0~100`), exact value (e.g., `1`), or special values (e.g., null, NaN).
2. **Display Text**: The label shown inside the cell when the condition is matched (e.g., `Normal`, `Fault`, `Warning`).
3. **Color**: The fill color of the cell when matched. Semantic colors are recommended (e.g., green for normal, red for fault).

<!-- ![State History Value Mapping](./images/state-history-mapping.png) -->

:::tip
Proper value mapping significantly improves the readability of state history charts. For example, for an equipment operating status metric, map `1` to green "Running", `0` to red "Stopped", and `-1` to yellow "Under Maintenance".
:::

### Notification Rules

Notification rules can be configured for the panel. When a metric value triggers a preset condition, the system will automatically send an alert notification. Refer to the Notification Rules documentation for details.

## Roadmap

To continuously enhance your user experience, we will keep adding practical configurations in subsequent product updates, allowing you to enjoy richer and more user-friendly analysis features.

| Configuration   | Description                                                                                       |
|-----------------|---------------------------------------------------------------------------------------------------|
| Cell Size        | Support customizing cell width and height to suit different time granularities and display densities |
| Border Width     | Support adjusting the border width between cells to enhance visual differentiation                 |
| Legend Config    | Support configuring legend position and style for quick identification of state meanings            |
| Color Scheme     | Currently, each indicator's color is fixed; future updates will provide color schemes, letting you choose display colors for each state |
