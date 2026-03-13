# Bar Gauge

A bar gauge displays the current value of a metric as a filled bar, showing where it sits within its defined range. It is ideal for **real-time monitoring of one or more metrics, and quickly determining whether a metric is approaching or exceeding a threshold**. Compared to circular gauges, bar gauges can display more metrics within the same panel space.

<!-- ![Bar Gauge Demo](./images/bar-gauge-demo.png) -->

## Configuration

### Graph Configuration

#### Title

You can set a main title and subtitle for the panel, displayed at the top, to describe the chart's subject matter.

#### Layout

The bar gauge supports two layout orientations:

- **Horizontal**: Bars extend in the horizontal direction, with labels on the left. Suitable for displaying multiple metrics.
- **Vertical**: Bars extend in the vertical direction, with labels at the bottom. Suitable for emphasizing the magnitude of a single metric.

<!-- ![Bar Gauge Layout](./images/bar-gauge-layout.png) -->

#### Value Display

Controls how the numeric value is displayed above the bar. Three modes are supported:

- **Value Color**: The value color follows the color of the current threshold zone, visually reflecting the current state.
- **Text Color**: The value is always displayed in a fixed text color, independent of threshold changes.
- **Hidden**: No value is displayed; only the fill state of the bar is shown.

#### Name Display

Controls how the metric name is shown:

- **Auto**: The system automatically determines whether to show the metric name based on available space.
- **Hidden**: The metric name is always hidden.

#### Bar Size

- **Auto**: The system automatically calculates the size of each bar based on the panel dimensions and the number of metrics.
- **Manual**: Manually specify the width (horizontal layout) or height (vertical layout) of each bar in pixels.

<!-- ![Bar Gauge Size](./images/bar-gauge-size.png) -->

#### Value Range

- **Min Value**: Sets the lower bound of the bar range. If not set, the minimum value from the data is used automatically.
- **Max Value**: Sets the upper bound of the bar range. If not set, the maximum value from the data is used automatically.
- **Decimal Places**: Controls the number of decimal places displayed in the value.

### Thresholds

Thresholds divide the value range into color-coded zones, helping users quickly determine which state zone the current value falls into (e.g., Normal, Warning, Critical). Click **+ Add Threshold** to add multiple thresholds.

Each threshold consists of:

1. **Value**: The boundary value for the threshold.
2. **Color**: The fill color of the bar when the value exceeds this threshold.

:::tip
It is recommended to configure at least two thresholds. For example: set below 80% as green (Normal), 80%–95% as yellow (Warning), and above 95% as red (Critical), so that the bar color intuitively reflects the equipment operating status.
:::

<!-- ![Bar Gauge Threshold](./images/bar-gauge-threshold.png) -->

### Notification Rules

Notification rules can be configured for the panel. When a metric value triggers a preset condition, the system will automatically send an alert notification. Refer to the Notification Rules documentation for details.

## Roadmap

To continuously enhance your user experience, we will keep adding practical configurations in subsequent product updates, allowing you to enjoy richer and more user-friendly analysis features.

| Configuration     | Description                                                                                           |
|-------------------|-------------------------------------------------------------------------------------------------------|
| Gradient Fill      | Support enabling gradient fill effects on the bar for smoother visual transitions                     |
| Background Fill    | Support filling the entire range area with a semi-transparent background to enhance the spatial feel  |
| Value Unit         | Support displaying the unit of measurement after the value for intuitive data reading                 |
| Color Scheme       | Currently, each metric's color is determined by thresholds; future updates will provide default color schemes for scenarios without thresholds |
