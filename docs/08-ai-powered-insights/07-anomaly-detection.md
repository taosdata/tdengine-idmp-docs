---
title: 异常检测
sidebar_label: 异常检测
---

# 8.7 异常检测

:::note
异常检测需要与 IDMP 一同安装 **TDgpt 模块**，无需大语言模型连接。
:::

IDMP 中的异常检测由 **TDgpt**（TDengine 内置的时序 AI 引擎）驱动。它作为创建实时分析时八种触发类型之一提供。与需要定义明确边界条件的阈值触发器不同，异常检测触发器能自动识别异常行为——您只需选择目标属性和算法，TDgpt 会自动判断异常的开始和结束时间。

## 8.7.1 工作原理

当分析配置了**异常检测**触发器时，TDgpt 会持续监控所选属性的时序数据。它应用所选算法对信号的预期行为建模，并标记观测值与该模型存在显著偏差的时段。当检测到异常窗口时，分析触发，生成的事件会记录异常的开始和结束时间。

由于检测基于模型而非规则，TDgpt 能够识别固定阈值会遗漏或误触发的复杂模式——渐进漂移、突然尖峰、季节性偏差。

## 8.7.2 配置异常检测分析

创建异常检测分析的步骤：

1. 导航到元素的**分析**标签页，点击 **+** 创建新分析。
2. 在**触发**部分，选择**异常检测**作为触发类型。
3. 配置异常检测触发器字段：

<table>
<colgroup><col style="width:5em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>属性</strong></td><td>要监控异常的元素属性</td></tr>
<tr><td><strong>算法</strong></td><td>要应用的异常检测算法（见下文）</td></tr>
<tr><td><strong>窗口</strong></td><td>算法评估每个数据段的时间窗口</td></tr>
</tbody>
</table>

4. 按照其他分析类型的方式完成**计算**和**事件**部分。
5. 点击**保存**。

## 8.7.3 支持的算法

TDgpt 包含多种基于不同机器学习框架的异常检测算法：

<table>
<colgroup><col style="width:11em"/><col/><col/></colgroup>
<thead><tr><th>算法</th><th>框架</th><th>特点</th></tr></thead>
<tbody>
<tr><td><strong>IQR</strong></td><td>统计学</td><td>四分位距——简单、快速，适用于有明显异常值的单变量信号</td></tr>
<tr><td><strong>LOF</strong></td><td>scikit-learn</td><td>局部离群因子——基于密度，有效检测点异常</td></tr>
<tr><td><strong>Isolation Forest</strong></td><td>scikit-learn</td><td>基于树，对高维数据和不同异常密度具有鲁棒性</td></tr>
<tr><td><strong>LSTM-AD</strong></td><td>PyTorch</td><td>基于 LSTM 的序列模型——捕获时序依赖性，适合季节性或周期性信号</td></tr>
<tr><td><strong>TDtsfm</strong></td><td>TDengine</td><td>TDengine 自研时序基础模型，在工业时序数据上预训练</td></tr>
</tbody>
</table>

合适的算法取决于信号的性质和您期望检测的异常类型。对于大多数工业传感器流，IQR 或 Isolation Forest 是一个良好的起点。

## 8.7.4 输出

当 TDgpt 检测到异常窗口时，分析触发，并（如果启用了事件生成）创建一个记录异常时段的事件。异常窗口的开始和结束时间戳作为事件属性存储。

如需触发器配置完整参考，请参阅[触发类型](../07-real-time-analysis/03-trigger-types.md)。
