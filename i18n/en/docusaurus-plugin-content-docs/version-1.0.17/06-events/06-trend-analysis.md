---
title: Analysis Chart
sidebar_label: Analysis Chart
---

# 6.6 Analysis Chart

When an event occurs, understanding the data behavior around that event is essential for investigation. TDengine IDMP provides a shortcut from any event directly to an analysis chart pre-configured with the event's time range, enabling rapid analysis of data changes during the event period.

## 6.6.1 Opening an Analysis Chart from an Event

The system provides two ways to quickly open an analysis chart from an event, suitable for both list browsing and detail viewing scenarios.

**From the event list:**

Hover over an event row to reveal the **⋮** menu, then click **Add to Analysis Chart**. IDMP opens the analysis chart for the associated event in a new window, automatically zoomed to the event's start time and end time.

**From the event detail page:**

On the General tab, click the **Add to Analysis Chart** icon in the toolbar to open the same analysis chart view.

## 6.6.2 Working with the Analysis Chart

The analysis chart is the primary entry point to IDMP's advanced analytics capabilities.

The analysis chart supports multi-event overlay comparison, cross-element attribute addition, time window adjustment, and other analysis operations. The analysis chart opened from an event shows the element's time-series attributes over the event's time window, with the event's start and end times marked on the chart.

Multiple events can be added to the same analysis chart, allowing you to overlay and compare different events side by side — for example, comparing sensor behavior during two separate fault occurrences.

From the analysis chart view, additional attributes can be added from this element or from other elements in the asset tree, and the time window can be adjusted by zooming or panning.

:::note
The analysis chart is a powerful feature with many capabilities. A dedicated section in the **Process Analytics** chapter covers it in full detail.
:::
