---
title: Real-Time Analysis
---

TDengine IDMP allows you to create real-time analyses for elements. This functionality is built on the stream processing component of TDengine TSDB-Enterprise but is configured through the TDengine IDMP user interface.

Real-time analysis runs in the background on TDengine TSDB-Enterprise. It can generate new data and write it back to TDengine TSDB-Enterprise, or it can trigger events in TDengine IDMP. You can stop and restart analyses as needed.

At its core, an analysis is simply a SQL query that runs based on a specific business need, and the query result is the analysis output. For real-time analysis, these queries are executed automatically based on defined trigger conditions. TDengine decouples the trigger mechanism from the analysis logic, providing a high degree of flexibility.

## Basic Configuration

When creating an analysis, you can specify its name, categories, and description. You can also choose whether to start the analysis immediately and whether to recalculate in case of out-of-order data.

## Trigger Types

TDengine IDMP provides multiple types of triggers for real-time analytics. All triggers except for periodic time window depend on the attributes of the element, and the attributes must have a TDengine metric data reference. Attributes referencing a TDengine tag or without a data reference cannot be used to trigger analysis, except via periodic scheduling.

The triggers supported by TDengine IDMP are described as follows:

1. **Sliding Window:** Analysis is triggered at fixed intervals based on the event time of collected data. You can configure the slide duration.

2. **Anomaly Detection**: By setting the sliding duration, you can specify how often anomaly detection is triggered. It is necessary to configure the target attribute or target attribute template to indicate which column the anomaly detection should be performed on. Additionally, you need to specify the algorithm used for anomaly detection, with support for configuring algorithm parameters. The parameter format is like `a=1,b=2,c=3`.

3. **Periodic Time Window:** Analysis runs periodically at a fixed interval based on TDengine's system time. You can also configure a time offset, which delays the analysis by a specified amount after the end of each period. For example, if you want generate a daily report at 2:00 AM, you can specify a 1-day period and a 2-hour offset. This trigger is functionally equivalent to a scheduled task in other systems.

4. **Data Input:** Analysis is triggered whenever new data is written to a specified attribute.

5. **State Window:** Analysis is triggered when the value of a specified attribute changes. This trigger can be applied only to attributes of data type integer.

6. **Event Window:** Analysis is triggered on an event for which you define a start condition and an end condition. Each condition is a computed expression based on an attribute. If the result of the expression is greater than 0, the condition is considered met; if less than 0, it is not met.

   For the start condition, you can optionally set a duration requirement to prevent false triggers caused by data jitter. If the condition is met but does not persist for the configured duration, the event will not be triggered.

7. **Session Window:** Analysis is triggered when no new data has been written to any attribute of the element for a specified period of time.

8. **Count Window:** Analysis is triggered when the number of new records for a specified attribute or set of attributes reaches a specified threshold. If you do not specify any attributes, the count includes new records across all attributes for the element.

## Event Generation

You can choose whether to generate an event when an analysis is triggered and executed. You can also specify the severity level of the event and whether it requires acknowledgment. For more information, see [Event Management](./07-event-management.md).

## Calculation Logic

When the trigger condition is met, TDengine initiates the analysis calculation. In TDengine IDMP, you can specify the target of the analysis, whether to apply time window aggregation, the timestamp for the output result, the expression used for calculation, and the location where the result will be stored.

### Calculation On

Analysis can be performed either on the attributes of the element itself or on aggregated data from its child elements. When performing aggregation on child elements, you must select a child element template and can also define filter conditions for the child elements. This is especially useful for statistical analysis of data collected from child elements.

### Rollup on Window

Analysis can perform aggregation over a time window. You specify the start and end time of the window. The aggregation logic is defined in the expression for result output.

For periodic time, event, state, session, and count windows, the window is already implicitly defined by the trigger type, and its start and end are provided by the system. You can specify a time offset to customize the window if desired.

For sliding windows, you can specify an interval. If the analysis is triggered at time <var>T</var>, the window is defined as the period from <math display="inline"><semantics><mrow><mo fence="true" form="prefix" stretchy="false">(</mo><mrow><mi>T</mi><mo stretchy="false">−</mo><mtext>interval</mtext></mrow><mo fence="true" form="postfix" stretchy="false">)</mo></mrow></semantics></math> to <var>T</var>.

### Output Timestamp

Each analysis result must have a timestamp. You can configure how this timestamp is generated.

For data input and sliding window triggers, the trigger time is used by default as the timestamp of the result. You can also apply a time offset.

For other trigger types that are window-based, you can choose to use either the start or end time of the window as the timestamp, and optionally apply an offset.

### Output Attributes

The result of the analysis must be saved to one or more attributes of the element. If an event is generated, the result can also be saved to the attributes of the event.

In an analysis, click the + button under **Output Attributes** to define an expression. You can define multiple computations under the same trigger. Click the **Expression** field to specify the computation logic. Then select an attribute from the **Element Attributes** drop-down menu to choose where to store the result. Select **New Attribute** to create an attribute to store the result.

If the analysis generates an event, you can click select an attribute from the Event Attributes drop-down menu to save the result there.

## Notes

If the computation is performed on child elements, the system aggregates data from all child elements that meet the specified conditions. 

1. If time window aggregation has not been selected, the aggregation is performed on a snapshot of the qualifying child elements at the trigger time. For example, you might calculate the maximum or average power output of all wind turbines at a specific moment.
2. If time window aggregation has been selected, the aggregation is applied to data from the qualifying child elements over a defined time window. For example, you might calculate the average power output over the past 10 minutes for all wind turbines.

The analysis itself is executed within the TDengine TSDB-Enterprise stream processing engine, so it does not consume compute resources in TDengine IDMP.
