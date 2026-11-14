---
title: Process Parameter Optimization
sidebar_label: Process Parameter Optimization
---

# 8.15 Process Parameter Optimization

Process Parameter Optimization analyzes historical operating data to rank the adjustable process variables that most affect a target KPI (yield, quality, energy, and so on), identify a golden operating window, fit response curves, and recommend setpoint adjustments within safety bounds. The output is a candidate proposal for process-engineer review; it is not a causal proof, and it never writes back to a control loop or changes setpoints automatically.

The feature is triggered by a natural-language request in the AI assistant. The assistant confirms the analysis scope, builds an aligned dataset from TDengine, runs sensitivity analysis and response-surface fitting, and returns a structured report.

## 8.15.1 When to Use

Process Parameter Optimization is intended for questions such as:

- Which process variables most affect yield, quality, or energy?
- What is the golden operating window in the historical data?
- Within the safety bounds, what range can a setpoint be adjusted to?
- Where are the optimum point or knee of the response curve?

The following requests are out of scope:

- Fault diagnosis or root cause analysis; use Root Cause Analysis instead.
- Creating a scatter or response-curve panel, or a persistent report; use the panel or report workflow.
- Real-time closed-loop optimization or automatic control writes; this feature never writes process setpoints.

## 8.15.2 Prerequisites

The quality of the analysis depends on data quality and a well-defined scope:

- The target KPI and candidate variables are queryable in TDengine, and the time range covers a sufficiently long stable operating period.
- Each row represents one operating interval at the same time granularity, with the target and every candidate variable aligned on the same time bucket.
- If the KPI comes from a LIMS or an energy ledger, align it with the process data on the same time bucket; unmatched buckets must not be dropped silently.
- Safety bounds and a per-step adjustment limit from the process card or interlock. If they are not supplied, the system uses the observed historical range and marks it as observed.

:::note
When the history spans multiple recipes, grades, or campaigns, provide a grouping column. The system fits each group separately and pools with an explicit warning when a group has too few rows.
:::

## 8.15.3 Steps

1. Describe the analysis goal in the AI assistant, including:
   - the target KPI and the objective (maximize or minimize);
   - the candidate process variables;
   - the time range;
   - an optional grouping column (recipe, grade, or campaign);
   - safety bounds and the per-step adjustment limit.
2. The assistant confirms the target element, attributes, and variable IDs, and confirms the source of the safety bounds. If bounds are missing, it asks once for the process-card or interlock limits.
3. The assistant builds the aligned dataset and runs the analysis, including variable screening, golden operating cluster detection, sensitivity ranking, and response-curve fitting.
4. The assistant checks whether the evidence is sufficient. If data is missing, the sample is too small, or the model is unstable, it explains why and asks to correct the time window, granularity, or variable list; at most two corrections are allowed.
5. The assistant returns a structured report and, when useful, suggests a follow-up panel or report. Creating a panel or report is a separate creation workflow.

## 8.15.4 What the Report Contains

The report includes the following sections:

- **Scope**: target KPI, time range, row count, interval, units, and grouping.
- **Golden operating cluster**: the best-performing operating window and its target mean.
- **Sensitivity ranking**: the direction, coefficient, and importance ranking of each candidate variable.
- **Response curve**: the fitted equation, and the optimal point or knee with its bounds.
- **Setpoint recommendations**: current value, recommended value, delta, basis, expected KPI change, confidence, and whether the value was clamped by a safety bound.
- **Safety bounds**: the bound values and whether they are configured or observed.
- **Evidence gaps**: data-quality warnings, missing intervals, low fit quality, observed-only bounds, and other limitations.

## 8.15.5 Interpreting and Using the Results

Keep the following limits in mind when using the recommendations:

- The analysis is based on historical association and does not prove causality. The report uses wording such as "candidate" and "model-based", and the final decision requires process-engineer review.
- A recommendation must stay within the supplied safety bounds and per-step limit. Without a per-step limit, the report presents the delta and requires the plant limit before the change can be called executable.
- The report does not hide data gaps. Missing rows, mixed grades, low fit quality, or unstable coefficients are stated explicitly.
- The analysis is deterministic: the same data and configuration produce the same ranking and recommendations.
- The feature does not create panels, analyses, dashboards, or report artifacts, and it never writes process setpoints.

## 8.15.6 FAQ

**The analysis reports insufficient data. What should I do?** Widen the time range, adjust the aggregation interval, or check that the target and candidate variables overlap sufficiently in the same time buckets. Unaligned LIMS and process data are a common cause.

**The recommendations have low confidence.** This usually comes from a small sample, strongly correlated variables, or changing operating conditions. Increase the data range, reduce the candidate list, or group by grade and rerun the analysis.

**Can the recommended setpoints be applied automatically?** No. The feature produces a candidate proposal only; it does not write to a control loop. Review by a process engineer and the plant safety procedures are required before any change.

**Can the result be saved as a report or dashboard?** Yes, by issuing a separate panel or report request. This feature itself only returns the analysis report.
