---
title: 设置进度
sidebar_label: 设置进度
---

import LoopVideo from '@site/src/components/LoopVideo';
import progressUrl from '../images/canvas-progress.mp4';

# 5.8.4 设置进度

任意封闭图形都可以作为进度条使用：矩形、圆、SVG、封闭连线或其他任意封闭图形，进度值的范围是 0~1。

<LoopVideo src={progressUrl} label="图元进度属性" />

## 5.8.4.1 设置方式

进度值与进度颜色的设置方式与图元其他属性一致，支持三种方式：

1. **手动设置**：在外观设置中直接输入进度值，用于确定静态效果。
2. **事件驱动**：通过"设置图元属性"事件行为修改进度值、进度颜色。
3. **属性绑定**：将进度值、进度颜色与 IDMP 元素的属性绑定，让实时数据驱动进度变化，绑定方法参见 [5.8.3 设置图元属性值](./03-property-values.md)。
