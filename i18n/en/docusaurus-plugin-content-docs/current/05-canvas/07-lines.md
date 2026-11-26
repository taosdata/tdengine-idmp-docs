---
title: Line
sidebar_label: Line
---

import LoopVideo from '@site/src/components/LoopVideo';
import animationUrl from './images/canvas-animation.mp4';

# 5.7 Line

Lines are used to represent the flow of materials, signal transmission, or logical relationships between devices. For example:

1. Pipeline connections represent material transportation
2. Dashed lines represent signal transmission
3. Lines of different colors represent different media

Through line animations, you can visually display the real-time flow status of materials.

## 5.7.1 Drawing Lines

### 5.7.1.1 Pen Drawing Lines

Select a line type, then click the pen to activate drawing with that line type.

Start: Left-click;

Pause: Right-click or enter;

End: esc.

#### Curves, Line Segments, Straight Lines, Mind Map Curves

You can use the pen to draw curves, line segments, straight lines, and mind map curves. After selecting a drawn line, you can also change its line type to curve, line segment, or straight line in the properties panel on the right.

#### Horizontal Line

Press the shortcut key Shift, click the left mouse button to draw, right-click to end drawing (line type selected as straight line).

#### Vertical Line

Press the shortcut key Ctrl, click the left mouse button to draw, right-click to end drawing (line type selected as straight line).

#### Diagonal Line

Line type selected as straight line, select the pen, left-click to draw the starting point, hold down the shortcut keys Ctrl+Shift, move the mouse angle (in increments of 15°), left-click to draw the second point, right-click to end drawing.

### 5.7.1.2 Pencil Drawing Lines

You can use the pencil to draw any type of line. Click "Pencil" to activate the pencil tool, press the left mouse button on the canvas to start drawing, and the line will be drawn according to the mouse movement trajectory. Release the mouse button to end drawing.

### 5.7.1.3 Connecting Symbols with Lines

When the mouse hovers over a symbol, anchor points are activated. Press the mouse on an anchor point and drag it to the anchor point of another symbol. Release the mouse to draw a curve between the two symbol anchor points.

### 5.7.1.4 Convert Line to Symbol

Right-click on the line and select "Convert to Node".

## 5.7.2 Cutting/Merging Lines

Cutting lines: Select the line, move the mouse to the anchor point where you want to break the line, click, and press the S key.

Merging lines: When connecting lines, drag the connection end of the currently selected line to align with the connection end of another line, press the Alt key, release the mouse, and then release the Alt key.

## 5.7.3 Line Styles

After selecting a line, you can set the appearance style of the line in the property configuration area on the right. The options are as follows:

| Option | Description |
| --- | --- |
| Line style | Whether the line is solid or dashed |
| Line type | The line shape: curve, line segment, or straight line |
| Connection style | How the corners of a polyline join: bevel, round, or default |
| Line cap | The shape of the line ends: default, round, or square |
| Line gradient | Whether the line color uses a linear gradient |
| Line color | The main color of the line, plus hover and selected colors |
| Line width | The thickness of the line |
| Background | The background fill type: solid, linear gradient, or radial gradient |
| Background color | The background color, plus hover and selected background colors |
| Opacity | The line opacity, from 0 to 1 |
| Anchor | The anchor point color and radius (≥0) |
| Shadow | The shadow color, blur, and X/Y offset |
| Border | The border color and width (≥0) |

## 5.7.4 Line Animations

IDMP has built-in multiple animation effects for lines, making the visuals more dynamic. After selecting a line, configure the following animation parameters in the Animation tab:

| Option | Description |
| --- | --- |
| Animation effect | The line animation type: water flow, water droplet flow, or dots; line and line segment also support arrow and waterdrop |
| Animation line width | The width of the animation line (≥0) |
| Animation color | The color of the animation |
| Animation shadow | Toggle; when on, the animation has a shadow with configurable shadow color and blur |
| Animation speed | The animation playback speed, adjustable from 1 to 5 |
| Reverse flow | Toggle; when on, the animation flows in the reverse direction |
| Number of loops | How many times the animation loops, infinite by default |
| Next animation | Specifies the next animation to play via a tag after the current one finishes |
| Autoplay | Toggle; whether to play the animation automatically |
| Maintain animation state | Toggle; whether to keep the final state after the animation ends |
| Linear playback | Yes/no; whether the animation plays at a linear speed |

Selecting different animation effects reveals corresponding sub-options: water droplet flow lets you set the animation dash, dots let you set the dot size, and arrow lets you set the animation interval.

<LoopVideo src={animationUrl} label="Line Animations" />
