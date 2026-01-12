---
title: Concepts
---

## Elements

TDengine IDMP organizes data using a hierarchical tree structure, where each node in the tree is called an **element**. An element can represent a tangible physical device (such as a car), a subsystem of that device (such as a car's braking system), or even a single sensor on the car. An element can also represent a logical entity, such as a factory, a corporation, or a city.

An element may contain the following items:

- Child elements
- Parent elements
- Attributes
- Analyses
- Dashboards
- Panels
- Notification template

## Child and Parent Elements

Except for the root node, every element in TDengine IDMP has at least one parent element. In a wind power scenario, for example, a wind farm can consist of multiple turbines, with each turbine having subsystems such as the rotor system, drivetrain, and power generation system. In this case, the wind farm would be the root node, each turbine would be a child element of the wind farm, and each subsystem would be a child element of its turbine.

Note that element may have more than one parent. For more information, see [Element References](/06-advanced/07-element-reference.md).

## Attributes

You can assign **attributes** to elements. These attributes can be metrics or tags referenced from TDengine TSDB-Enterprise, results data generated from analyses, or custom values stored within TDengine IDMP.

For attributes referenced from TDengine metrics, you can also configure limits and forecasting.

## Analyses

You can create **analyses** for elements. These analyses are performed in real time by using the stream processing component of TDengine TSDB-Enterprise. Analyses can be triggered by any of the following:

- Sliding windows
- Event windows
- State windows
- Count windows
- Session windows
- Data input (newly written data points)

These triggers are based on one or more attributes of the element. Only attributes referenced from TDengine metrics can be used as triggers.

The analysis can involve expressions, aggregations over time windows, or aggregations across multiple elements. The results are written back to an attribute of the element for storage, and they can also trigger events.

## Events

The analytics in an element can generate **events**. An event includes a start time, end time, and potentially attribute values and analysis results. You can assign a severity level to events and specify whether they require acknowledgement. You can also configure a notification rule to send messages to appropriate contacts when an event of a specified severity level occurs.

## Panels and Dashboards

You can create **panels** to visualize elements and **dashboards** that consist of a collection of panels for an element. Panels can be created independently of dashboards. Each panel provides a visualization based on the attributes of an element or its child elements. The following panels are supported:

- Trend charts
- Bar charts
- Pie charts
- Gauge charts
- Tables
- Rich text
- Stat values

## Notification Rule

You can configure a **notification rule** for an element to define how users are notified when events occur. The content of the notification is fully customizable. Each element has only one notification template, but you can configure different severity levels to trigger notifications for different event types.

## Element Templates

If you have multiple elements of the same type, you can create **element templates** to define attribute, analysis, panel, dashboard, and notification rule templates for all elements of that type. You first create the element template and then use the template when creating elements. This approach promotes data standardization and greatly improves configuration efficiency.
