---
title: Toolbar
sidebar_label: Toolbar
---

import LoopVideo from '@site/src/components/LoopVideo';
import zoomoutUrl from './images/canvas-zoomout.mp4';
import mapUrl from './images/canvas-map.mp4';

# 5.4 Toolbar

The toolbar is located at the top of the canvas editor. It provides drawing tools such as pen, pencil, and magnifier, style tools such as format painter, line start arrow, line end arrow, line type, and line width, view controls such as view scale, default configuration, and operations such as import/export and save.

## 5.4.1 Pen

1. Start: Left click
2. Pause: Right click or enter
3. End: esc
4. Close/Unclose: enter

## 5.4.2 Pencil

1. Start: Continuous left drag
2. Pause: Release left button
3. End: esc
4. Close/Unclose: enter

## 5.4.3 Magnifier

Used to observe details in the image.

<LoopVideo src={zoomoutUrl} label="Magnifier" />

## 5.4.4 Overview Map (Thumbnail)

The global view of the canvas. Clicking on the overview map allows you to quickly switch the center position on the canvas.

<LoopVideo src={mapUrl} label="Overview Map" />

## 5.4.5 Format Painter

The format painter quickly copies the style of one symbol or line to other symbols, unifying the appearance of the screen in batch.

Steps:

1. Select exactly one symbol, line, or text on the canvas (the button is disabled when multiple items are selected, box-selected, or nothing is selected).
2. Click the **Format Painter** button in the toolbar to enter paint mode: the button is highlighted and the canvas cursor changes to copy style.
3. Click the target symbol to apply the style. Paint mode exits automatically, and the target stays selected — click the format painter again to keep propagating styles with the target as the new format source.
4. Press `Esc` or click the button again to exit paint mode at any time; clicking blank canvas does not exit.

The copyable styles fall into 5 groups, automatically trimmed by the types of source and target:

| Style group | Contents | Effective condition |
| --- | --- | --- |
| Stroke | Color, line type, line width, line gradient, line caps and joins, hover/selected colors, opacity, shadow, filter, etc. | Effective in both directions between shapes and lines |
| Fill and border | Background type (solid/linear/radial gradient), background color, border, corner radius, etc. | Only when painting shape to shape |
| Arrows | Start/end arrow style, size, and color | Only when painting line to line |
| Text | Font, font size, text color, alignment, underline, strikethrough, etc. | Only when the target contains text |
| Animation | Symbol animations, line animations, and playback parameters | Only between the same type (shape to shape, line to line) |

The overwrite is a full overwrite: styles not explicitly set on the source clear the same settings on the target, reverting them to the default appearance; the paint operation can be undone with `Ctrl/Cmd + Z`.

## 5.4.6 Line Start Arrow

Sets the arrow style for the start point of lines. Click the icon to open a dropdown with multiple arrow styles: none, triangle, diamond, circle, line down, line up, solid triangle, solid diamond, solid circle, and short line.

- The selection becomes the canvas default and is applied to newly drawn lines.
- If one or more lines are selected, their start arrow is updated at the same time.

## 5.4.7 Line End Arrow

Sets the arrow style for the end point of lines. The available styles are the same as the start arrow. The selection becomes the canvas default and is also applied to the currently selected lines.

## 5.4.8 Line Type

Sets the default line type for the canvas. Hover the icon to expand the dropdown:

- **Curve**: A smooth Bézier curve.
- **Segment**: A polyline that auto-bends.
- **Line**: A straight line between two points.
- **Mind Map Curve**: A mind-map style curve.

The selected type applies to subsequent lines drawn with the pen or pencil tools.

## 5.4.9 Line Width

Sets the default line width for the canvas. Hover the icon to open a number input and enter an integer greater than or equal to 1. New lines use this width by default; if any lines are selected, their width is updated as well.

## 5.4.10 View Scale

Displays and adjusts the zoom level of the canvas. Click the icon to open the control panel:

- **Zoom out**: Decrease by 10% per click.
- **Zoom in**: Increase by 10% per click.
- **Window Size**: Fit the canvas content to the current window (fitView).
- **Reset**: Restore to 100% and re-center the view.

## 5.4.11 Auto Anchor

When enabled, lines automatically snap to the nearest anchor on a target symbol when connecting. When disabled, you must connect to a specific anchor manually. Press `Alt` to toggle this state temporarily.

## 5.4.12 Disable Anchor

When enabled, all anchors on the canvas are hidden and lines cannot be drawn — useful for viewing or preventing accidental edits. Click again to show anchors.

## 5.4.13 Back to List

Returns to the canvas list. The button is disabled while there are unsaved changes; save or discard them first.

## 5.4.14 Save

Saves all changes to the current canvas. A thumbnail is generated during save and the canvas data is persisted to the server. The button is enabled only when there are unsaved changes.

## 5.4.15 Discard Changes

Discards all unsaved changes and reverts to the last saved state. The button is enabled only when there are unsaved changes.

## 5.4.16 Import

Imports canvas data from a local file. The format is automatically detected from the file extension. Supported formats are `.json`, `.svg`, `.zip`, `.vsdx`, and `.dxf`.

### SVG Import

Any SVG vector graphics file can be imported as temporary symbols on the canvas. Due to current parser limitations, the following scenarios are not supported:

1. Complex gradients, CSS3 animations, and embedded JavaScript in SVG are not supported. Currently only single-line-diagram-style SVGs are well supported.
2. SVG CSS specificity is simplified to a basic merge operation, which may differ from native browser rendering.
3. Deeply nested `<tspan>` elements are not supported. It is recommended to convert `<text>` elements into `<path>` data with AI tools or similar before importing.
4. The `<use>` reuse element is not supported.
5. Position calculation for `<path>` elements may be inaccurate, which can make individual shapes converted from `<path>` hard to select.

### JSON Import

JSON files that conform to the meta2d.js core data structure can be imported. In particular, the `pens` array must follow the correct schema for the canvas to render properly.

### ZIP Import

Used to import canvas data together with referenced image assets in one step:

1. The archive is only scanned for JSON files. If multiple are present, only the first JSON file is used as the canvas data.
2. All image files in the archive are automatically uploaded to the current user's private symbol folder, and the image references in the JSON are rewritten to point to the uploaded URLs.

### VSDX Import

Microsoft Visio drawing files are supported. For more complex files (for example, Visio files that contain unparsable binary content or nested files), the parser and some drawing instructions have limited compatibility, so a small number of shapes may be rendered inconsistently. Theme color support is also limited and colors may not match exactly — you can manually adjust the colors after import.

### DXF Import

AutoCAD Drawing Exchange Format (DXF) files are supported. While the parser library covers most CAD entities, some types (such as dimension entities and certain fill types) are not yet supported, and parsing of deeply nested BLOCK definitions still has issues.

## 5.4.17 Export

Exports the current canvas to a local file in one of the following formats:

- **JSON**: Exports the full canvas data in the meta2d.js data structure, which can be imported into another canvas to recreate the screen directly.
- **PNG**: Exports a bitmap screenshot of the canvas. The file name is the current canvas name.
- **SVG**: Exports a vector image of the canvas. The file name is a random string.

## 5.4.18 Refresh

Forces a refresh of the live data on the canvas — fetches the latest data from the backend and re-renders all symbols.

## 5.4.19 Lock

Toggles the canvas lock state, cycling through three states:

1. **Edit**: The default state. All symbols can be freely edited.
2. **Preview**: Symbols cannot be edited, but interactions such as click events and animations remain active. Useful for previewing the runtime behavior.
3. **Lock**: Symbols cannot be edited or moved; the canvas is read-only.

## 5.4.20 Default Config

Default Config consolidates drawing conventions — default styles for the canvas, symbols, text, and lines, plus editor behavior — into one place: after a single setup, new screens, new symbols, and new lines automatically carry the conventions, while existing screens are not affected. For example, a team convention of "blue strokes, 14px text, 2px solid lines with end arrows" only needs to be configured once.

Click the **Default Config** button in the toolbar and switch between the 5 tabs in the dialog:

- **Canvas**: Default values for new screens, such as colors, grid and ruler, and paper size.
- **Pen**: Default styles for new symbols, such as stroke and fill.
- **Text**: Default text styles, such as font.
- **Line**: Default values for new lines, such as style and arrows.
- **Editor**: Personal editing preferences such as zoom range and interactions. This group takes effect immediately in the current editing session after saving and is not written into the screen data.

Default configuration consists of two layers: system factory defaults and personal overrides. Personal changes are saved in this browser and override the factory defaults; when personal overrides exist, a badge dot appears on the button. Click **Restore Defaults** to clear the personal configuration and return to the factory defaults.

## 5.4.21 Properties Panel

Click the arrow icon on the right to show or hide the symbol configuration panel, expanding the visible canvas area on smaller screens.
