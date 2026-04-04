---
title: 事件详情
sidebar_label: 事件详情
---

# 6.3 事件详情

在全局事件视图或元素的事件标签页中点击事件名称，即可打开事件详情页。详情页包含两个标签页：**通用**和**属性**。两个标签页的操作工具栏有所不同。

## 6.3.1 通用标签页

通用标签页展示事件的所有标准字段信息，并提供确认、收藏、根因分析和趋势图分析等操作入口。

### 6.3.1.1 工具栏

通用标签页的工具栏提供以下操作控件。

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>控件</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>返回列表</strong></td><td>返回事件列表</td></tr>
<tr><td><strong>确认</strong></td><td>确认事件</td></tr>
<tr><td><strong>收藏</strong></td><td>将此事件标记为收藏，可从左侧边栏快速访问</td></tr>
<tr><td><strong>根因分析</strong></td><td>打开此事件的根因分析视图</td></tr>
<tr><td><strong>趋势图分析</strong></td><td>打开关联元素在事件时间范围内的趋势图</td></tr>
<tr><td><strong>重新发送</strong></td><td>手动为此事件向已配置的联系途径重新发送通知</td></tr>
</tbody>
</table>

### 6.3.1.2 字段

通用标签页展示以下标准事件字段，涵盖事件的时间、关联对象和状态信息。

<table>
<colgroup><col style="width:7em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>名称</strong></td><td>事件名称，由事件模板的命名规则生成</td></tr>
<tr><td><strong>模板</strong></td><td>创建此事件所使用的事件模板</td></tr>
<tr><td><strong>严重程度</strong></td><td>严重等级</td></tr>
<tr><td><strong>原因代码</strong></td><td>原因代码（如已设置）</td></tr>
<tr><td><strong>类别</strong></td><td>类别标签</td></tr>
<tr><td><strong>描述</strong></td><td>自由文本描述</td></tr>
<tr><td><strong>开始时间</strong></td><td>事件开始的时间</td></tr>
<tr><td><strong>结束时间</strong></td><td>事件结束的时间（仍处于活动中则为空）</td></tr>
<tr><td><strong>持续时长</strong></td><td>从开始到结束的时间间隔</td></tr>
<tr><td><strong>关联元素</strong></td><td>运行触发分析的元素——点击可导航至该元素</td></tr>
<tr><td><strong>关联分析</strong></td><td>生成此事件的分析规则——点击可导航至该分析</td></tr>
<tr><td><strong>状态</strong></td><td>确认状态（未确认 / 已确认）</td></tr>
</tbody>
</table>

### 6.3.1.3 可展开区域

标准字段下方提供三个可折叠区域，用于查看事件的附加属性、操作备注和通知发送历史。

### 6.3.1.4 属性

展示事件记录的附加系统级属性。

### 6.3.1.5 备注

备注区域供操作人员添加与事件相关的文本注释——例如调查发现或已采取的纠正措施。详情参见[备注](../11-collaboration/02-annotations.md)。

### 6.3.1.6 通知记录

通知记录展示此事件所有通知发送的完整日志。每条记录显示联系途径名称、发送时间戳以及投递状态。

## 6.3.2 属性标签页

属性标签页展示事件的自定义属性——即分析创建事件时所记录的命名值，用于查看事件发生时捕获的业务数据。

### 6.3.2.1 工具栏

属性标签页的工具栏提供以下操作控件。

<table>
<colgroup><col style="width:7em"/><col/></colgroup>
<thead><tr><th>控件</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>返回列表</strong></td><td>返回事件列表</td></tr>
<tr><td><strong>类别</strong></td><td>按类别过滤属性列表</td></tr>
<tr><td><strong>刷新</strong></td><td>重新加载属性值</td></tr>
<tr><td><strong>选择列</strong></td><td>显示或隐藏属性表格中的列</td></tr>
</tbody>
</table>

### 6.3.2.2 属性表格

属性表格列出事件的所有自定义属性及其值。每条属性行显示以下内容：

<table>
<colgroup><col style="width:6em"/><col/></colgroup>
<thead><tr><th>列</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>名称</strong></td><td>属性名称，如事件模板中所定义</td></tr>
<tr><td><strong>值</strong></td><td>事件创建时记录的值</td></tr>
<tr><td><strong>值类型</strong></td><td>值的数据类型</td></tr>
</tbody>
</table>

这些属性由事件模板定义，并由触发事件的分析填充。属性值为只读——在事件创建时设定，之后不可修改。
