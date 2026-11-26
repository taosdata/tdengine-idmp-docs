---
title: Symbol
sidebar_label: Symbol
---

# 5.5 Symbol

Symbols are the basic units that make up the monitoring screen, just like Lego blocks. Each device icon and closed shape is a symbol. By combining different symbols, you can build a complete industrial monitoring system.

A symbol's configuration is organized into four tabs in the right-hand properties panel — Appearance, Events, Animations, and Symbol Properties — each introduced below; see [5.8 Function Points](./08-function-points/index.md) for detailed configuration methods.

## 5.5.1 Appearance

Configure a symbol's visual attributes in the **Appearance** tab of the right-hand properties panel. The main collapsible groups are:

### 5.5.1.1 Position and Size

X, Y, width, height, rotation angle, corner radius, padding, progress value, etc.

### 5.5.1.2 Style

Stroke and fill: color, line type, line width, line gradient, background (solid/linear/radial gradient), opacity, shadow, hover/selected colors, etc.

### 5.5.1.3 State

Define states for a symbol through "condition + appearance"; when a condition is met, a regular symbol changes its color or plays an animation, while a combined symbol switches to the corresponding child symbol. See [5.8.2 Setting Symbol States](./08-function-points/02-states.md).

### 5.5.1.4 Endpoint

Line symbols can configure start/end coordinates and line caps; see [5.7 Line](./07-lines.md).

### 5.5.1.5 Text

Set the font, size, color, style, weight, line height, alignment, position, etc. of the text displayed on the symbol.

### 5.5.1.6 Image

You can upload images as the appearance or background image of the symbol.

### 5.5.1.7 Icon Font

Set the symbol's icon font (iconfont), and adjust the icon, size, rotation, color, and alignment.

### 5.5.1.8 Disable

Set the symbol's colors in the disabled state, and turn off the symbol's input, rotation, resizing, and anchor interactions.

## 5.5.2 Events

Events are the core mechanism for data-driven canvas screens: by defining event types, actions, and trigger conditions, a symbol can automatically change its presentation when data changes or on mouse operations. Event types include mouse enter, mouse leave, single click, double click, and — most importantly — "symbol property value change"; actions include opening a link, setting symbol properties, executing an animation, and executing JavaScript. See [5.8.6 Setting Symbol Events](./08-function-points/06-events.md).

## 5.5.3 Animations

Symbols support built-in animations and frame-by-frame custom animations, making the screen vivid. Besides auto-play, animations can also be triggered by events — for example, configuring "execute animation" in a "symbol property value change" event. See [5.8.5 Setting Symbol Animations](./08-function-points/05-animation.md).

The Animations tab also provides **Mouse Tips**: display tip information when the mouse hovers over a symbol, either by writing Markdown syntax or by writing a Mark function that returns the content.

## 5.5.4 Symbol Properties

Besides appearance styles, a symbol also has data properties such as value, state, progress, and text. These properties can be set manually for static effects during editing, or bound to IDMP element attributes or expressions so that live collected data drives the display automatically.

- Attribute and expression binding, see [5.8.3 Setting Symbol Values](./08-function-points/03-property-values.md)
- Progress value, see [5.8.4 Setting Progress](./08-function-points/04-progress.md)
- State switching, see [5.8.2 Setting Symbol States](./08-function-points/02-states.md)
