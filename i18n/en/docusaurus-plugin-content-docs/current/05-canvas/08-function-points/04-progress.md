---
title: Setting Progress
sidebar_label: Setting Progress
---

import LoopVideo from '@site/src/components/LoopVideo';
import progressUrl from '../images/canvas-progress.mp4';

# 5.8.4 Setting Progress

Any closed shape can be used as a progress bar: rectangle, circle, SVG, closed polyline, or any other closed shape. The progress value ranges from 0 to 1.

<LoopVideo src={progressUrl} label="Symbol Progress Property" />

## 5.8.4.1 How to Set

The progress value and progress color are set in the same way as other symbol attributes, with three options:

1. **Manual setting**: Enter the progress value directly in the appearance settings to define a static effect.
2. **Event-driven**: Use the "set symbol attributes" event action to change the progress value and progress color.
3. **Attribute binding**: Bind the progress value and progress color to IDMP element attributes so that live data drives the progress. See [5.8.3 Setting Symbol Values](./03-property-values.md) for the binding method.
