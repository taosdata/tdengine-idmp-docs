---
title: Process Analytics
sidebar_label: Process Analytics
---

# 9. Process Analytics

Real-time monitoring tells you whether equipment is running normally right now. Alerts notify you when something goes wrong. Process analytics answers the questions that come after: why did this batch underperform? How strong is the relationship between injection temperature and defect rate? Two machines of the same model, running under the same conditions — why do their performance curves diverge?

This kind of investigation does not require a data engineer, and does not require switching to an external tool. TDengine IDMP embeds process analytics directly within the panels and pages where data already lives — so engineers can dig into a problem right where they found it. The underlying capabilities are provided by TDengine TSDB: statistical functions such as `CORR`, `TLCC`, and `DTW` support correlation analysis and regression; the stream computing engine supports batch event modeling; and the TDgpt time-series AI engine exposes forecasting, anomaly detection, and missing data imputation through SQL functions such as `FORECAST()` and `ANOMALY_WINDOW()`.

Process analytics, real-time analytics, and AI-powered insights share the same data foundation. KPI attributes produced by real-time stream computations feed directly into scatter plot regression. Anomaly events detected by AI can be pulled into batch comparison for root cause investigation. Findings validated through process analytics can be pinned as dashboard panels for long-term tracking, or converted into real-time monitoring rules that run continuously.

## What's Covered in This Chapter

- **[Time-Series Forecasting](./01-forecasting.md)** — Predict future trends from historical time-series data
- **[Anomaly Detection](./02-anomaly-detection.md)** — Identify anomalous patterns and outliers in time-series data
- **[Missing Data Imputation](./03-missing-data-imputation.md)** — Intelligently fill gaps in time-series data
- **[Clustering](./04-clustering.md)** — Unsupervised grouping of devices, time periods, or behavioral patterns
- **[Regression](./05-regression.md)** — Build quantitative relationship models between attributes
- **[Correlation Analysis](./06-correlation-analysis.md)** — Measure correlations across multiple attributes or devices
- **[Event and Batch Analysis](./07-batch-event-analysis.md)** — Compare and analyze production batch data through IDMP's event analysis capabilities
- **[Association Rules](./08-association-rules.md)** — Discover co-occurrence patterns between events and attributes
- **[Machine Learning](./09-machine-learning.md)** — Train and apply custom machine learning models on industrial data
- **[Model Management](./10-model-management.md)** — Centrally manage, deploy, and monitor analytical models

import DocCardList from '@theme/DocCardList';

<DocCardList />
