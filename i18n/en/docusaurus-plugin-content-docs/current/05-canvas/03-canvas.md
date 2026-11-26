---
title: Canvas
sidebar_label: Canvas
---

import LoopVideo from '@site/src/components/LoopVideo';
import combineUrl from './images/canvas-combine.mp4';

# 5.3 Canvas

## 5.3.1 Setting Canvas Properties

1. **Default Color**: Pre-set the default color, so that elements dragged onto the canvas (basic shapes, text, icons) automatically unify to the default color.
2. **Background**: Background image, background color
3. **Grid**: Background grid, grid color, grid size, grid angle
4. **Ruler**: Enable ruler, ruler color
5. **Auto Fit PC**: Controls how the screen is scaled when it opens and when the window size changes. The switch is saved with the screen.
   - On: The screen scales with the window so that it fits the visible area as much as possible.
   - Off: The screen is displayed at 100% of its original size. Along each dimension where the screen does not exceed the window it is centered; where it does, it starts from the top-left corner and the rest can be viewed by dragging the canvas. When the window is resized with the switch off, a screen opened for viewing is re-aligned, while the editor keeps the current zoom and position.

:::tip
Auto Fit PC is off by default, and screens created before the upgrade are also displayed at 100%. To make a screen scale with the window, turn on the switch in the canvas properties on the right side of the editor and save. To have new screens start with it on, set it on the **Canvas** tab of [Default Config](./04-toolbar.md#5420-default-config).
:::

## 5.3.2 Setting Canvas Layout

When multiple elements are selected, you can set the canvas layout and perform alignment operations: align left, align right, align top, align bottom, vertical center, horizontal center, distribute evenly left-right, distribute evenly top-bottom, same size, and format painter. See [5.4.5 Format Painter](./04-toolbar.md#545-format-painter) for details.

<LoopVideo src={combineUrl} label="Layout" />

## 5.3.3 Viewing Element List

The element list shows all elements on the canvas, grouped by layer with the layer tagged at the end of each row: DOM elements, template layer elements, bottom layer elements, middle layer elements, and top layer elements. Clicking an element selects it and centers it on the canvas.

Each element row provides two switches:

- **Visibility**: click the eye icon to hide or show the element.
- **Lock state**: click the lock icon to cycle through the following four states:
  1. **Editable**: The default state. The element's properties and events can be edited freely.
  2. **Read-only**: Not editable, but interactions and events still work.
  3. **Disable move**: The element's position is fixed and cannot be dragged.
  4. **Disable all events**: Cannot be selected and triggers no events; can be used as a background image.
