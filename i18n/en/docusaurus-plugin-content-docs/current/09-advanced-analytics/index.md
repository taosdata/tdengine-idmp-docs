---
title: Advanced Analytics
sidebar_label: Advanced Analytics
---

# 9. Advanced Analytics

Analytics is a capability that runs throughout TDengine IDMP. Beyond basic visualization, IDMP provides a comprehensive suite of advanced analytical capabilities for industrial time-series data, including time-series forecasting, anomaly detection, missing data imputation, clustering, regression, correlation analysis, batch event analysis, statistical testing, association rules, machine learning, and model management.

These advanced capabilities help industrial users develop a deeper understanding of equipment behavior, uncover hidden patterns in their data, and make more accurate data-driven decisions. IDMP is continuously expanding its advanced analytics offering and plans to release ready-to-use analysis templates and applications tailored to specific industrial scenarios.

The advanced analytics capabilities in IDMP are powered by its built-in time-series AI engine, TDgpt. TDgpt integrates directly into TDengine's query execution pipeline, running compute-intensive analysis tasks against time-series data in place — and exposing the results through SQL functions such as `FORECAST()` and `ANOMALY_WINDOW()`.

Rather than packaging these capabilities as standalone applications, IDMP embeds each one directly within the relevant analysis panel or page — so users can apply advanced analytics right where they need it, without switching context.

This chapter brings together the various advanced analytics capabilities distributed across the IDMP platform and documents them in one place.

## What's Covered in This Chapter

- **[Time-Series Forecasting](./01-forecasting.md)** — Predict future trends from historical time-series data
- **[Anomaly Detection](./02-anomaly-detection.md)** — Identify anomalous patterns and outliers in time-series data
- **[Missing Data Imputation](./03-missing-data-imputation.md)** — Intelligently fill gaps in time-series data
- **[Clustering](./04-clustering.md)** — Unsupervised grouping of devices, time periods, or behavioral patterns
- **[Regression](./05-regression.md)** — Build quantitative relationship models between attributes
- **[Correlation Analysis](./06-correlation-analysis.md)** — Measure correlations across multiple attributes or devices
- **[Batch Event Analysis](./07-batch-event-analysis.md)** — Compare and analyze production batch data through IDMP's event analysis capabilities
- **[Statistical Testing](./08-statistical-testing.md)** — Hypothesis testing and significance analysis on time-series data
- **[Association Rules](./09-association-rules.md)** — Discover co-occurrence patterns between events and attributes
- **[Machine Learning](./10-machine-learning.md)** — Train and apply custom machine learning models on industrial data
- **[Model Management](./11-model-management.md)** — Centrally manage, deploy, and monitor analytical models

import DocCardList from '@theme/DocCardList';

<DocCardList />
