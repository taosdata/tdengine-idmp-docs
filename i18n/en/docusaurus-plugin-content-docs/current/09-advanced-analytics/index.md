---
title: Process Analytics
sidebar_label: Process Analytics
---

# 9. Process Analytics

Real-time monitoring tells you whether equipment is running normally right now. Alerts notify you when something goes wrong. Process analytics answers the questions that come after: why did this batch underperform? How strong is the relationship between injection temperature and defect rate? Two machines of the same model, running under the same conditions — why do their performance curves diverge?

This kind of investigation does not require a data engineer or a switch to an external tool. TDengine IDMP embeds process analytics directly where the data already lives, so engineers can continue investigating at the point where they discovered the issue. The underlying capabilities are provided by TDengine TSDB: statistical functions such as `CORR`, `TLCC`, and `DTW` support correlation analysis and regression; the stream computing engine supports batch and event modeling; and TDgpt exposes forecasting, anomaly detection, and missing-data imputation through SQL functions such as `FORECAST()` and `ANOMALY_WINDOW()`.

**The Analysis Chart is the primary entry point for process analytics.** It is the only visualization workspace in IDMP that runs as an independent window, where users can invoke time-series forecasting, missing-data imputation, window analysis, event comparison, correlation analysis, and other analytical functions within a single workflow. In addition, Trend Charts and Scatter Charts also expose selected analytical capabilities in view mode — Trend Charts support forecasting and imputation, while Scatter Charts support clustering and regression.

Process analytics, real-time analytics, and AI-powered insights share the same data foundation. KPI attributes produced by real-time stream computations feed directly into scatter plot regression. Anomaly events detected by AI can be pulled into batch comparison for root cause investigation. Findings validated through process analytics can be pinned as dashboard panels for long-term tracking, or converted into real-time monitoring rules that run continuously.

## What's Covered in This Chapter

- **[Time-Series Forecasting](./01-forecasting.md)** — Predict future trends from historical time-series data
- **[Missing Data Imputation](./02-missing-data-imputation.md)** — Intelligently fill gaps in time-series data
- **[Clustering](./03-clustering.md)** — Unsupervised grouping of devices, time periods, or behavioral patterns
- **[Regression](./04-regression.md)** — Build quantitative relationship models between attributes
- **[Window Analysis](./05-window-analysis.md)** — Interactively search for meaningful time segments in historical data
- **[Event and Batch Analysis](./06-batch-event-analysis.md)** — Compare and analyze production batch data through IDMP's event analysis capabilities
- **[Correlation Analysis](./07-correlation-analysis.md)** — Measure correlations across multiple attributes or devices
- **[Association Rules](./08-association-rules.md)** — Discover co-occurrence patterns between events and attributes
- **[Pattern Search](./09-pattern-search.md)** — Search for time segments in historical data that match a target pattern

import DocCardList from '@theme/DocCardList';

<DocCardList />
