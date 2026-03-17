## 2.x.6 Load Built-in Sample Scenarios

To help you get started quickly, TDengine IDMP comes with built-in sample scenarios. Select at least one sample scenario to continue:

:::important
Load only one sample scenario at a time. Do not attempt to load a second scenario until the previous one has finished loading.
:::

| Scenario | Description |
|---|---|
| Utilities | A smart meter monitoring system collecting real-time data from electricity and water meters |
| Logistics | A fleet tracking system monitoring vehicle location, speed, routes, and overspeed alerts |
| Solar Power | A solar farm monitoring system collecting data from inverters and environmental sensors |
| Renewable Energy | A centralized control system for wind, solar, and energy storage across regional sites |
| Wastewater Treatment | A monitoring system for bioreactors, membrane tanks, and water quality sensors |
| Oil Field | An oilfield production monitoring system tracking well output, pressure, and water cut |

:::tip
The following sections use the data from the Utilities scenario to demonstrate the features of TDengine IDMP. To follow along, select the Utilities scenario and click **Confirm**.
:::

## 2.x.7 Explore the IDMP User Interface

### UI Tour Guide

The Tour Guide opens automatically on your first login. Click **Next** to step through an overview of the IDMP user interface. You can close it at any time by clicking **X**. To restart the tour later, click your profile in the top right and select **Tour Guide**.

### View Element Information

After the tour, the **Explorer** page is displayed.

1. In the sidebar, click **Elements**. The elements in the Utilities scenario appear in a tree hierarchy.
2. Select **Utilities** > **California** > **San Diego County** > **Chula Vista** > **em-10**. This element represents electricity meter number 10 in Chula Vista, California.
3. From the path bar, select **General** to view the description and basic information about this meter.
4. Select **Attributes** to view its attributes, such as current and voltage.

![View element attributes](../assets/get-started-01.png)

### Try AI-Generated Panels

1. Select the element **Utilities** > **California** > **San Diego County** > **Chula Vista** > **em-10**.
2. From the path bar, select **Panels**. Five AI-recommended panels are displayed. Click **+ More Suggestions** to generate additional options.
3. You can also request a panel in natural language using the input box below the recommendations. For example:

   *"Show a line chart of the voltage and current changes every minute for electricity meter em-10 over the past 24 hours."*

   Click **Ask AI** to generate the panel.

![AI-generated panels](../assets/get-started-02.png)

### Try AI-Powered Analysis

1. Select the element **Utilities** > **California** > **San Diego County** > **Chula Vista** > **em-10**.
2. From the path bar, select **Analyses**. Three AI-recommended questions are displayed.
3. Click a suggestion link to open the analysis creation page, where you can review and adjust the AI-generated configuration. Click **Save** to complete the setup.
4. You can also describe an analysis in natural language using the input box next to the recommendations. For example:

   *"If power fluctuation for electricity meter em-10 exceeds plus or minus 20% for 30 minutes, generate a 'warning' level alert and calculate the fluctuation range."*

   Press **Enter** to generate the analysis.

![AI-powered analysis](../assets/get-started-03.png)
