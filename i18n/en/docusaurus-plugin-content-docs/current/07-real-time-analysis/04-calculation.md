---
title: Calculation
sidebar_label: Calculation
---

# 7.4 Calculation

The Calculation section (section 4 of the analysis form) defines what the RT analysis computes and where it stores the results. It contains four parts: **Apply Calculation On**, **Rollup On Window**, **Output Timestamp**, and **Output Attributes**.

## 7.4.1 Apply Calculation On

**Apply Calculation On** determines the data scope for the calculation — whether the calculation runs on the current element's own attributes or aggregates data across its child elements.

| Option | Description |
|---|---|
| **Element Self** | The calculation runs on the element's own attributes. Suitable for calculations on individual devices or measurement points. |
| **Child Elements Aggregation** | The calculation aggregates data across the element's child elements that share a common template. Suitable for cross-element summary metrics such as "compute the average power output across all turbines under this wind farm". |

When **Child Elements Aggregation** is selected, two additional fields appear:

| Field | Description |
|---|---|
| **Child Element Template** | The template that the child elements must match. Only children with this template participate in the aggregation. Automatically pre-populated if all children share the same template. |
| **Subtable Filter** | An optional filter expression to narrow which child elements are included in the aggregation. For example, filter to only children in a specific operating state. |

:::note
**Child Elements Aggregation** is only available when the element contains child elements. On leaf elements, this option is disabled and only **Element Self** is available.
:::

## 7.4.2 Rollup On Window

The **Rollup On Window** checkbox (enabled by default) controls whether the calculation is aggregated over a time window.

When enabled, the **Interval** field specifies the length of the aggregation window (number + time unit). For example, an interval of 1 hour means each trigger firing computes the aggregate over the past 1 hour of data.

When disabled, the calculation runs over individual data points without windowed aggregation — suitable for row-level calculations or transformations.

## 7.4.3 Output Timestamp

The **Output Timestamp** dropdown specifies which timestamp is written to the output attribute for each result row:

| Option | Description |
|---|---|
| **Window Start** | The timestamp of the beginning of the window |
| **Window End** | The timestamp of the end of the window (default) |
| **Timestamp** | The raw timestamp (`_c0`), i.e. the data ingestion time. Suited to row-wise streaming output scenarios such as period triggers and anomaly detection, preserving the true ingestion time of each result row |
| **Expression** | The output timestamp is computed by an expression. When selected, an expression input appears on the right; click it to open the Formula Editor. The expression can reference source attributes, `${attributes[...]}` placeholders and [stream pseudo columns](#745-stream-pseudo-columns), and must evaluate to TIMESTAMP — e.g. `_twstart`, `_c0 + 1s` or `cast(_tlocaltime / 1000000 timestamp)`. The offset does not apply in expression mode. Anomaly detection and forecast provide no timestamp configuration |

When **Timestamp** (`_c0`) is selected, the system automatically decides the output form based on the trigger type: data-window aggregations (sliding window with interval, count window, session window, etc.) output the aggregated moment `last(_c0)`; row-wise streaming calculations (period triggers, anomaly detection, sliding without interval, etc.) output the raw `_c0` directly.

The **Offset** field adds a time offset (number + unit, default 0 seconds) to the selected window boundary; it does not apply in expression mode. This can be useful to shift the output timestamp for display alignment.

## 7.4.4 Output Attributes

The **Output Attributes** table maps calculation expressions to element attributes (and optionally event attributes when event generation is enabled).

Each row in the table has the following columns:

| Column | Description |
|---|---|
| **Expression** | A calculation expression. Click the cell to open the Expression Editor (see [Section 3.2.10](../03-data-modeling/02-attributes.md#3210-expression-editor)). |
| **Target Element** | The element where this row's result is saved. Defaults to the current element and can be switched to another element — the result is written to the target element's attribute, useful for persisting aggregation/statistics results onto summary elements. Analysis templates do not support cross-element saving (the column is hidden). |
| **Element Attribute** | The element attribute where the computed result is stored as a new time-series value (following the row's selected target element) |
| **Event Attribute** | *(Visible only when event generation is enabled in section 3)* An event attribute to capture the computed value at the moment the event fires |

Use the **+** button at the bottom of the table to add additional output rows. Each row corresponds to an independent expression, supporting the computation of multiple metrics in a single RT analysis with results written to different attributes (each row may target a different element).

:::note Referencing child attributes and KPI sub-attributes
Expressions throughout the analysis (output attribute expressions, trigger pre-filters, event window conditions, etc.) can reference attribute **child attributes** and the **sub-attributes of KPI attributes**. In the expression editor's attribute tree, expand the parent attribute (or the KPI attribute) and click a sub-attribute node to insert a reference of the form `${attributes['ParentName']|childAttributes['ChildName']}`. A KPI attribute holds no value itself and cannot be referenced directly — you must select one of its sub-attributes.

When a KPI sub-attribute that has finished building is referenced, the computation follows the KPI data in real time; when a building-state or derived monthly/quarterly KPI sub-attribute is referenced, the stream reads the tag snapshot value (not the precise derived aggregate) — for precise derived aggregation values, use a KPI panel or query the sub-attribute directly. When an expression references a KPI sub-attribute, the UI shows a data-access semantics hint next to the expression. When a **formula-type child attribute** is referenced, its formula is inlined into the generated SQL (same behavior as panels) — no materialized column is required.
:::

## 7.4.5 Stream Pseudo Columns

Stream pseudo columns are only effective during stream computation. They are not evaluated during expression evaluation and return empty values. Both the output attribute expressions and the output timestamp expression may reference them; at save time they are validated against the trigger type and trigger timing, and referencing an unavailable pseudo column returns a 400 error:

| Pseudo Column | Type | Applicable Triggers | Close-Only | Meaning |
|---|---|---|---|---|
| `_twstart` | TIMESTAMP | Window-aggregation triggers | No | Start time of the trigger window |
| `_twend` | TIMESTAMP | Window-aggregation triggers | Yes | End time of the trigger window |
| `_twduration` | BIGINT | Window-aggregation triggers | Yes | Duration of the trigger window (ms) |
| `_twrownum` | BIGINT | Window-aggregation triggers | Yes | Number of rows within the trigger window |
| `_tprev_ts` | TIMESTAMP | Row-by-row sliding | No | Timestamp of the previous row |
| `_tcurrent_ts` | TIMESTAMP | Row-by-row sliding | No | Timestamp of the current row |
| `_tnext_ts` | TIMESTAMP | Row-by-row sliding | No | Timestamp of the next row |
| `_tprev_localtime` | BIGINT | Period, Forecast | No | Local time of the previous period (ns) |
| `_tnext_localtime` | BIGINT | Period, Forecast | No | Local time of the next period (ns) |
| `_tgrpid` | BIGINT | All | No | Group ID; 0 when unpartitioned |
| `_tlocaltime` | BIGINT | All | No | Current local time (ns; cast recommended) |
| `tbname` | VARCHAR | All | No | Name of the source child table |

"Window-aggregation triggers" covers Count, State, Event, Session, DataInput, SPC and a sliding window trigger configured with a window interval; "row-by-row sliding" covers a sliding window trigger without an interval window and anomaly detection.

**Close-only restriction**: pseudo columns marked "Yes" only output final values at window close. An analysis with an explicit on-window-open-only trigger timing is rejected at save time. In addition, `_tlocaltime` and `_tprev_localtime`/`_tnext_localtime` are nanosecond values; for timestamp output use `cast(_tlocaltime / 1000000 timestamp)` to convert them.

In the Formula Editor for **Output Attributes**, the left tree provides a **Stream Pseudo Columns** category (above **Substitution Parameters**). The list is filtered automatically by trigger type and trigger timing and shows only the pseudo columns available for the current trigger; typing in the expression input also shows matching completion suggestions. System-reserved pseudo columns (e.g. `_event_condition_path`) and query-phase pseudo columns (`_qstart`/`_qend`/`_qduration`) do not appear in the editor list; hand-written references are rejected at save time.

## 7.4.6 Output Filter

The **Output Filter** is an optional condition expression that is evaluated after the RT analysis completes its calculation and before the result is written to the output attributes. The calculated result is written to the configured element attributes only when the filter evaluates to true.

Use this when you want to persist only results that satisfy a business condition, such as windows with valid samples, values outside an acceptable range, or outputs produced under a specific state. If the filter condition is not met, the trigger is still considered processed, but no value is written to the output attributes.
