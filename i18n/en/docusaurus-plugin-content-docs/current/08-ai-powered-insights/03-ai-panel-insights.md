---
title: AI Panel Insights
sidebar_label: AI Panel Insights
---

# 8.3 AI Panel Insights


AI Panel Insights generates a natural language narrative for an individual panel — describing what the data shows, identifying notable patterns, and highlighting anomalies or trends that may warrant attention.

## How to Access

Open any panel (either AI-generated or manually created) from an element's **Panels** tab. In the panel toolbar, click the **AI Insights** button (the sparkle or AI icon). The system queries the LLM with the panel's current data and returns a text summary displayed alongside the visualization.

## What the Insight Contains

The insight describes the panel's data in plain language. For a trend chart showing voltage over the past 24 hours, the insight might note the overall range, identify a peak or dip, and flag whether the values remain within normal operating limits. For a statistics panel, it might compare the current reading against the historical average.

Insights are generated on demand — each time you click the AI Insights button, the system fetches fresh data and generates a new narrative based on the current query window.

If you want a fresh interpretation, click the **Refresh** button in the insight panel. The system re-queries the data and generates a new narrative.

For a full reference on panels and the visualization interface, see [Chapter 4: Visualization](../04-visualization/index.md).
