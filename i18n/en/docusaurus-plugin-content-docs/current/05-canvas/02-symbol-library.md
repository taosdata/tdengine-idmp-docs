---
title: Symbol Library
sidebar_label: Symbol Library
---

# 5.2 Symbol Library

The symbol library is located on the left of the canvas editor and provides the symbol assets for building monitoring screens. It is organized into three categories: system symbols, private symbols, and panel symbols. Drag an asset from the symbol library onto the canvas to start editing.

## 5.2.1 System Symbols

System symbols are the built-in symbol assets of IDMP and meet the basic needs of most industries. The left side of the symbol library organizes system symbols into six tabs — Common, Icons, Parts, Scenes, Industry, and Electric — to help locate assets quickly. Symbols come in three formats: native code (JS), icon font (iconfont), and images (svg, gif); the video symbol supports MP4, WebM, and Ogg formats.

Besides recently used symbols and basic shapes, the Common tab also provides a set of interactive controls for building tables, buttons, switches, progress bars, and rulers on the screen. The basic shapes group additionally provides embed-type symbols such as video and web page (iframe); their configuration is detailed in [5.8.7 Embedding Components](./08-function-points/07-embed-components.md).

### 5.2.1.1 Common Controls

The Controls group provides the following interactive controls; drag one onto the screen to configure its appearance, options, and value range:

| Control | Description |
| --- | --- |
| Table | Displays real-time data of multiple attributes in a table, commonly used for alarm lists and equipment status overviews |
| Button | A button with configurable mouse events for triggering interactive actions |
| Switch | A two-state toggle that can be bound to a symbol property to switch on/off with data |
| Checkbox | Multi-select options with configurable checked and disabled states |
| Radio | Single-select options that can be arranged horizontally or vertically |
| Progress bar | A slider showing numeric progress, with a configurable value range and unit |
| Ruler | A scale ruler that presents the scale indication of a value at a glance |
| Input | A text input box |
| Select | A selection box with dropdown options |
| Time | Displays the current time in real time, with a configurable time format |

### 5.2.1.2 Using Controls

Controls are used the same way as regular symbols:

1. Open the symbol library, switch to the Common tab, and pick the desired control from the Controls group.
2. Drag the control onto the canvas and adjust its position and size.
3. Select the control and configure its appearance, options, and value range in the configuration panel on the right.
4. To make the control change with real-time data, bind it to an element property or configure an event, as described in [5.8.3 Setting Symbol Values](./08-function-points/03-property-values.md) and [5.8.6 Setting Symbol Events](./08-function-points/06-events.md).

## 5.2.2 Private Symbols

The IDMP symbol library is an extensible and open graphic library that can customize component effects and scenes according to different needs. You can create private symbol libraries and upload your own symbols (JS, SVG, images, etc.); contact the IDMP team for design support if you need more assets.

## 5.2.3 Panel Symbols

Panel symbols embed existing dashboard panels directly into a canvas screen: drag a panel from the panel symbol list onto the canvas, and the panel's data is displayed live in the form of a symbol, with a value tip shown on hover. This is useful for reusing existing trend charts and gauges in a process screen without reconfiguring them.

In preview mode, right-click a panel symbol and choose **View Details** to open the panel's preview page in a new tab and see the full panel.
