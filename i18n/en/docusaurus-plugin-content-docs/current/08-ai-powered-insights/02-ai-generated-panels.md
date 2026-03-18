---
title: AI-Generated Panels
sidebar_label: AI-Generated Panels
---

# 8.2 AI-Generated Panels

Powered by **Zero Query Intelligence**, IDMP can automatically generate visualization panels for an element based on its attributes, template, and collected time-series data. These panels are ready to use with no manual configuration required.

## Where to Find AI-Generated Panels

AI-generated panels appear in the **Panels** tab of any element in the Explorer. When you open this tab, the AI has already produced a set of suggested panels based on the element's data context.

The toolbar above the panel list includes an **AI** filter button. Click it to view only AI-generated panels and hide manually created ones.

## Using AI-Generated Panels

Each AI-generated panel card displays a preview of the visualization, a descriptive name, and thumbs up / thumbs down feedback buttons.

- Click the panel card to open the full visualization.
- Click **thumbs up** to mark the panel as useful — this feedback improves future suggestions.
- Click **thumbs down** to dismiss the panel from your suggestions.

## Requesting More Suggestions

At the end of the AI panel list, a **+ More Recommendations** card is shown. Click it to request an additional batch of AI-generated panel suggestions. The system uses your element's template, attribute definitions, and current data to produce a new set of visualizations.

## Describing a Panel in Natural Language

If the system suggestions do not include what you need, you can describe the panel you want in plain language. Type your request in the AI input field — for example, "show me hourly average voltage as a line chart for the past 7 days" or "create a gauge showing the current power factor". The AI interprets your description, selects the appropriate chart type and attributes, and generates the panel for you. You do not need to know which chart type to use or how to configure it — as long as you know what you want to see, the AI handles the rest.

## Saving Panels

AI-generated panels are suggestions — they are not permanently saved until you explicitly save them. To add an AI-generated panel to the element's permanent panel list, open the panel and click **Save**. Once saved, the panel behaves identically to a manually created panel and can be edited, moved, or deleted from the Panels tab.

For a full reference on panel types and configuration, see [Chapter 4: Visualization](../04-visualization/index.md).
