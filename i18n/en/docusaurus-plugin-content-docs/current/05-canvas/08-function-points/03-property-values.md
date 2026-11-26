---
title: Setting Symbol Values
sidebar_label: Setting Symbol Values
---

import LoopVideo from '@site/src/components/LoopVideo';
import databindUrl from '../images/canvas-databind.mp4';

# 5.8.3 Setting Symbol Values

There are two ways to set symbol attribute values: **manual setting** and **attribute binding**. Manual setting is suitable for defining static appearances and testing linkage effects during editing; once bound, collected live data automatically drives the symbol display.

## 5.8.3.1 Manual Setting

Symbols have many attributes, including color, text font, font color, progress, etc. These common attributes can be set directly and manually in the appearance settings. The four attributes of text, progress value, state, and value can also be used for logical judgment in event trigger conditions.

## 5.8.3.2 Setting via Events

In event configuration, you can automatically control symbol attributes by selecting the "set symbol attributes" event action. The attributes that can be controlled automatically include: background color, color, text color, text, X, Y, height, width, visibility, progress value, progress color, value, state, rotation, disabled, etc. See [5.8.6 Setting Symbol Events](./06-events.md) for details on event types and trigger conditions.

## 5.8.3.3 Attribute Binding

Besides events, another way is to bind the above attributes to IDMP element attributes. Binding variables enables quick real-time dynamic data display. As shown in the figure below, add an attribute binding to bind the "text" of the symbol to the voltage of the element "em-1". When the element voltage acquisition value changes, the text of the symbol also changes in real time when the data is refreshed.

Common bindable symbol attributes and their typical uses are as follows:

| Binding target | Effect | Typical use |
| --- | --- | --- |
| Text | Renders the value as a unit-formatted string, optionally with the update time | Live readings next to equipment |
| Progress | The value drives the progress percentage | Efficiency, load, level |
| Rotation | The value drives the symbol rotation angle | Fans and pointers rotating with speed |
| Position / size | The value drives the symbol coordinates and dimensions | Crane travel, level rise/fall |
| Child symbol display | The value determines which child symbol in a group is shown | Multi-state equipment switching |

Text targets render with a unit-formatted string and can optionally show the update time; numeric targets such as progress, rotation, and coordinates use the raw value. For progress binding, set the measurement range, and the system normalizes it to a percentage as (value − lower bound) / (upper bound − lower bound). Gauge-style assets are static images, so their pointers must be driven indirectly with a "Rotation" binding.

<LoopVideo src={databindUrl} label="Binding Element Attributes" />

:::tip
Before binding variables, it is recommended to manually enter attribute values first and test the desired effects, such as progress bar changes, state changes, and event triggers. After testing achieves the desired effect, bind the attributes to the attributes of an IDMP element. In production operation configurations, the attributes of symbols must be bound to the attributes of elements.
:::

## 5.8.3.4 Expression Binding

Besides binding a single element attribute directly, a symbol attribute can also be bound to an **expression** that references multiple element attributes and is evaluated server-side before driving the display. Expression binding suits derived indicators such as ratios, differences, and weighted scores, without creating extra points on the data source side.

Expression binding and attribute binding are mutually exclusive — for the same symbol attribute, only one of the two can be selected. Scenarios that require converting a point's unit into an angle, such as rotation, can also use an expression for the conversion; for example, multiplying a 0–100 opening value by 3.6 maps it to 0–360 degrees.
