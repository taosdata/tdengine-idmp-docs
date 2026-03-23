---
title: Correlation Analysis
sidebar_label: Correlation Analysis
---

# 9.6 Correlation Analysis

Correlation analysis is a core method for quantifying statistical dependencies between variables in industrial data. IDMP supports correlation analysis on time-series data, helping users uncover hidden linkages between equipment parameters, process variables, or metrics across different systems — providing a quantitative foundation for feature selection, root-cause investigation, and control optimization.

## How It Works

The fundamental question in correlation analysis is: when one variable changes, does another tend to change with it — and if so, in which direction and with what strength? It is important to note that correlation does not imply causation. However, it is a highly effective tool for narrowing the scope of an investigation, validating engineering assumptions, and building the quantitative groundwork for more detailed modeling.

In industrial practice, correlation analysis typically serves three purposes:

- **Factor identification:** Quickly surface the variables that have a meaningful statistical relationship with a target metric, narrowing a large candidate set down to the ones worth investigating further
- **Hypothesis validation:** Translate engineering intuition or process knowledge into a testable, quantifiable hypothesis and verify it against real data
- **Hidden relationship discovery:** Identify pairs of variables that appear unrelated on the surface but share a genuine statistical dependency — opening up opportunities for cross-system optimization

Reliable correlation results depend on data quality. The two columns being compared should cover the same time range and share a consistent sampling interval. A sufficient number of data points is needed — typically at least 30 valid observations. For signals with strong trends or seasonal patterns, detrending first is advisable to avoid spurious correlation driven by a shared underlying drift.

One further consideration: the Pearson correlation coefficient only captures linear relationships. When a time lag exists between variables — for example, when a change upstream takes time to propagate and appear in a downstream metric — the synchronous correlation coefficient will underestimate the true strength of the relationship. In these cases, use `TLCC` to analyze the lagged cross-correlation.

## Supported Methods

IDMP exposes three correlation analysis methods through built-in TDengine SQL functions:

| Method | Function | Characteristics |
|---|---|---|
| **Pearson Correlation** | `CORR` | Measures the direction and strength of the linear relationship between two variables; returns a value in [−1, 1] where +1 is perfect positive correlation, −1 is perfect negative correlation, and 0 indicates no linear relationship; computationally efficient and highly interpretable (no TDgpt required) |
| **Dynamic Time Warping** | `DTW` | Uses dynamic programming to align two time series non-linearly before computing their similarity; suited to signals with time stretching, phase shifts, or mismatched sampling rates; smaller return values indicate higher similarity (requires TDgpt) |
| **Time-Lagged Cross-Correlation** | `TLCC` | Computes the linear correlation coefficient between two signals across a range of time lags, returning a correlation profile; used to identify the direction, magnitude, and estimated delay of lagged influence between variables (requires TDgpt) |

### Choosing a Method

- For linear association analysis between two synchronously sampled signals, use `CORR` — results are immediate and directly interpretable
- For comparing signals with similar shapes but time offsets, or signals recorded at different sampling rates, use `DTW`
- For tracing delayed influence along a causal chain — such as how an upstream process parameter affects a downstream quality metric — use `TLCC`

## How to Use

In the current version, correlation analysis is invoked through TDengine SQL functions, executable from the IDMP data query and exploration interface.

### CORR

`CORR` computes the Pearson correlation coefficient between two time-series columns. It does not require TDgpt and can be used in any TDengine environment.

```sql
-- Correlation between two attributes over a specific time range
SELECT CORR(temperature, power_consumption)
FROM equipment_metrics
WHERE ts >= '2024-01-01' AND ts < '2024-04-01';

-- Per-device correlation, computed separately for each device
SELECT device_id, CORR(vibration, bearing_temp)
FROM motor_sensors
PARTITION BY device_id;

-- Rolling correlation computed over one-hour windows
SELECT _wstart, CORR(flow_rate, pressure)
FROM pipeline_data
INTERVAL(1h);
```

:::note
`CORR` requires at least 2 valid data points; otherwise it returns NULL. It can be combined with `PARTITION BY` and `INTERVAL` for grouped and windowed correlation calculations.
:::

### DTW

`DTW` aligns two time series non-linearly using dynamic programming, then measures their similarity as the sum of Manhattan distances along the optimal alignment path. Lower values indicate greater similarity.

```sql
-- Similarity between two time series using the default search radius
SELECT DTW(col1, col2) FROM foo;

-- Increase the search radius to 2 for higher precision (at greater computational cost)
SELECT DTW(col1, col2, 'radius=2') FROM foo;
```

`DTW` accepts up to 10,240 rows of input. The `radius` parameter controls the width of the search band around the diagonal of the distance matrix (default: 1); a larger radius improves accuracy but increases computation time.

### TLCC

`TLCC` computes the linear correlation coefficient between two signals at each step in a specified lag range, returning a series of correlation values — one per lag. The lag at which the absolute correlation is highest is the estimated physical propagation delay between the two variables.

```sql
-- Lagged correlation over the default range [−1, 1]
SELECT TLCC(col1, col2) FROM foo;

-- Analyze whether col1 leads col2, checking lags from −12 to 0
SELECT TLCC(col1, col2, 'lag_start=-12, lag_end=0') FROM foo;
```

### Upcoming Features

Future releases will introduce visual interfaces for correlation analysis within IDMP, including:

- Select multiple attributes and generate a **Correlation Heatmap** showing the full pairwise correlation matrix at a glance
- Trigger correlation analysis directly from a Trend Chart or Scatter Chart panel, with results overlaid on the current view
- Track correlation over time using a sliding window, monitoring how the relationship between variables evolves

## Application Scenarios

Correlation analysis delivers practical value across a broad range of industrial domains:

**Energy and Power**

- Compute correlations between electrical load and weather variables such as temperature and solar irradiance to select key features for load forecasting models
- Compare power output curves across turbines in a wind farm to identify units whose behavior diverges from the fleet baseline

**Equipment Condition Monitoring**

- Track correlations between vibration, temperature, and current signals on rotating equipment; a sudden drop in previously tight correlations often signals a developing fault
- Analyze lagged correlations between upstream process parameters and downstream quality metrics to quantify propagation delays and support closed-loop control tuning

**Manufacturing**

- Compute correlations between process parameters — injection temperature, hold pressure, cooling rate — and yield rate to quickly identify the variables most worth optimizing
- Compare cycle time signals across production lines to detect lines drifting from the standard rhythm

**Process Industry**

- Analyze the relationship between raw material composition and product quality metrics to guide formulation adjustments and incoming material screening
- Examine how utility consumption — steam, cooling water, compressed air — correlates with process load to support energy scheduling and capacity planning

**Environment and Utilities**

- Correlate water quality indicators from individual feed branches against the combined effluent to help trace pollution sources
- Quantify how outdoor climate variables drive building heating and cooling loads, providing a data-backed basis for dynamic energy benchmarking

### Example: Validating the Relationship Between Outdoor Temperature and HVAC Energy Consumption

**Background**

The energy management team of a commercial office building noticed that electricity consumption rises noticeably every summer, and their initial read was that higher outdoor temperatures were driving up the air conditioning load. What they needed was a quantitative confirmation — both to validate the assumption and to establish a defensible baseline for tracking HVAC efficiency over time.

**Steps**

In the IDMP data query interface, run the following query against a full year of hourly data:

```sql
SELECT CORR(outdoor_temp, hvac_power)
FROM building_energy
WHERE ts >= '2024-01-01' AND ts < '2025-01-01';
```

**Outcome**

The query returns `0.87`, confirming a strong positive correlation between outdoor temperature and HVAC energy consumption. The relationship holds consistently across all seasons, not just summer.

Armed with this result, the team built a temperature-segmented dynamic energy baseline: for each outdoor temperature band, they defined the expected normal operating range for HVAC power. When actual consumption deviates more than 15% from the applicable baseline, the system automatically raises an efficiency alert. In the first quarter after deployment, the alerts surfaced two separate instances of chiller performance degradation — both caught early enough to resolve before the issue worsened.
