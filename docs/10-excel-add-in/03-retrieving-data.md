---
title: 使用插件
sidebar_label: 使用插件
---

# 10.3 使用插件

连接到 IDMP 后，**TDengine EAI** 功能区选项卡提供了用于检索数据、浏览事件、过滤资产和配置插件的所有工具。每个按钮都会在 Excel 右侧打开一个任务窗格，您可以在其中配置查询并选择输出单元格。

## 10.3.1 功能区概览

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>按钮</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>当前值</strong></td><td>检索一个或多个属性的最新值</td></tr>
<tr><td><strong>历史值</strong></td><td>检索特定时间点的属性值</td></tr>
<tr><td><strong>原始数据</strong></td><td>检索某一时间范围内的原始时序数据</td></tr>
<tr><td><strong>采样数据</strong></td><td>按固定间隔采样检索时序数据</td></tr>
<tr><td><strong>时间点数据</strong></td><td>检索特定时间戳处的属性值</td></tr>
<tr><td><strong>计算数据</strong></td><td>检索时间窗口内的聚合（计算）值</td></tr>
<tr><td><strong>时间过滤</strong></td><td>按状态或条件表达式过滤后检索数据</td></tr>
<tr><td><strong>事件浏览器</strong></td><td>查询并导出 IDMP 中的事件</td></tr>
<tr><td><strong>属性过滤</strong></td><td>搜索并导出属性元数据</td></tr>
<tr><td><strong>资产过滤</strong></td><td>搜索并导出元素（资产）元数据</td></tr>
<tr><td><strong>属性</strong></td><td>检索元素属性的特定元数据属性</td></tr>
<tr><td><strong>更新</strong></td><td>刷新工作簿中的所有数据</td></tr>
<tr><td><strong>设置</strong></td><td>配置插件全局设置</td></tr>
</tbody>
</table>

## 10.3.2 公共字段

大多数数据检索表单共用以下字段：

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>数据项</strong></td><td>要查询的 IDMP 元素属性。点击搜索图标可浏览资产层级并选择一个或多个属性。</td></tr>
<tr><td><strong>输出单元格</strong></td><td>写入结果的 Excel 单元格。默认为当前选中的单元格（如 <code>Sheet1!A1</code>）。</td></tr>
<tr><td><strong>时间位置</strong></td><td>时间戳与数据的排列方式：<strong>不显示时间戳</strong>（仅显示值）、<strong>时间在左侧</strong>（时间戳在左列）或<strong>时间在顶部</strong>（时间戳在上方行）。</td></tr>
</tbody>
</table>

点击**确定**可插入数据并关闭窗格；点击**应用**可插入数据并保持窗格打开以继续查询。

## 10.3.3 当前值

检索所选属性的最新值并写入输出单元格。

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>数据项</strong></td><td>要查询的属性（必填）</td></tr>
<tr><td><strong>输出单元格</strong></td><td>目标单元格</td></tr>
<tr><td><strong>时间位置</strong></td><td>不显示时间戳 / 时间在左侧 / 时间在顶部</td></tr>
</tbody>
</table>

## 10.3.4 历史值

检索特定历史时间戳处的属性值，支持空值填充。

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>数据项</strong></td><td>要查询的属性（必填）</td></tr>
<tr><td><strong>填充类型</strong></td><td>当时间戳处无精确值时的填充方式：<strong>前一个非空值</strong>（使用之前最近的已知值），或其他填充策略</td></tr>
<tr><td><strong>时间戳</strong></td><td>要查询的特定时间戳（必填）</td></tr>
<tr><td><strong>输出单元格</strong></td><td>目标单元格</td></tr>
<tr><td><strong>时间位置</strong></td><td>不显示时间戳 / 时间在左侧 / 时间在顶部</td></tr>
</tbody>
</table>

## 10.3.5 原始数据

检索某一时间范围内所有原始时序数据点，不做任何聚合。

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>数据项</strong></td><td>要查询的属性（必填）</td></tr>
<tr><td><strong>开始时间</strong></td><td>时间范围的起始时间（必填）</td></tr>
<tr><td><strong>结束时间</strong></td><td>时间范围的结束时间（必填）</td></tr>
<tr><td><strong>输出单元格</strong></td><td>输出范围的左上角单元格</td></tr>
<tr><td><strong>时间位置</strong></td><td>不显示时间戳 / 时间在左侧 / 时间在顶部</td></tr>
</tbody>
</table>

## 10.3.6 采样数据

按固定间隔对时间范围内的时序数据重新采样。无论原始数据频率如何，均可获得均匀间隔的序列。

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>数据项</strong></td><td>要查询的属性（必填）</td></tr>
<tr><td><strong>开始时间</strong></td><td>时间范围的起始时间（必填）</td></tr>
<tr><td><strong>结束时间</strong></td><td>时间范围的结束时间（必填）</td></tr>
<tr><td><strong>时间间隔</strong></td><td>重采样间隔（如 <code>1h</code>、<code>30m</code>、<code>1d</code>）</td></tr>
<tr><td><strong>过滤表达式</strong></td><td>可选的过滤条件，在采样前排除特定数据点</td></tr>
<tr><td><strong>输出单元格</strong></td><td>输出范围的左上角单元格</td></tr>
<tr><td><strong>时间位置</strong></td><td>不显示时间戳 / 时间在左侧 / 时间在顶部</td></tr>
</tbody>
</table>

## 10.3.7 时间点数据

检索您提供的一个或多个特定时间戳处的属性值，支持空值填充。

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>数据项</strong></td><td>要查询的属性（必填）</td></tr>
<tr><td><strong>填充类型</strong></td><td>当给定时间戳处无精确值时的填充方式（如<strong>前一个非空值</strong>）</td></tr>
<tr><td><strong>时间戳</strong></td><td>要查询的特定时间戳（可多个）</td></tr>
<tr><td><strong>输出单元格</strong></td><td>目标单元格</td></tr>
<tr><td><strong>时间位置</strong></td><td>不显示时间戳 / 时间在左侧 / 时间在顶部</td></tr>
</tbody>
</table>

## 10.3.8 计算数据

检索按固定时间窗口聚合后的数据——例如每小时平均值、每日最大值或每班次求和。

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>数据项</strong></td><td>要查询的属性（必填）</td></tr>
<tr><td><strong>开始时间</strong></td><td>时间范围的起始时间（必填）</td></tr>
<tr><td><strong>结束时间</strong></td><td>时间范围的结束时间（必填）</td></tr>
<tr><td><strong>时间间隔</strong></td><td>聚合窗口大小（如 <code>1h</code>）</td></tr>
<tr><td><strong>过滤表达式</strong></td><td>聚合前应用的可选过滤条件</td></tr>
<tr><td><strong>聚合函数</strong></td><td>要应用的聚合函数（必填）。支持所有每窗口返回一行数据的 TDengine 选择和聚合函数（如 AVG、MAX、MIN、SUM、COUNT、FIRST、LAST、TOP、BOTTOM）。</td></tr>
<tr><td><strong>输出单元格</strong></td><td>输出范围的左上角单元格</td></tr>
<tr><td><strong>时间选项</strong></td><td>可选择在聚合值旁显示<strong>开始时间</strong>、<strong>结束时间</strong>或<strong>最大/最小时间</strong>列</td></tr>
</tbody>
</table>

## 10.3.9 时间过滤

检索在由开始表达式和结束表达式定义的状态或条件期间内的数据——适用于仅提取特定运行条件下的数据（例如机器处于运行状态时）。

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>数据项</strong></td><td>要查询的属性（必填）</td></tr>
<tr><td><strong>表达式 — 开始条件</strong></td><td>标记有效时段开始的条件表达式（必填）</td></tr>
<tr><td><strong>表达式 — 结束条件</strong></td><td>标记有效时段结束的条件表达式（必填）</td></tr>
<tr><td><strong>开始时间</strong></td><td>搜索范围的起始时间（必填）</td></tr>
<tr><td><strong>结束时间</strong></td><td>搜索范围的结束时间（必填）</td></tr>
<tr><td><strong>时间间隔</strong></td><td>每个有效时段内数据点的间隔</td></tr>
<tr><td><strong>时间单位</strong></td><td>时间间隔的单位（如秒）</td></tr>
<tr><td><strong>输出单元格</strong></td><td>输出范围的左上角单元格</td></tr>
<tr><td><strong>时间选项</strong></td><td>可选择显示<strong>开始时间</strong>和/或<strong>结束时间</strong>列</td></tr>
</tbody>
</table>

## 10.3.10 事件浏览器

查询 IDMP 事件并将结果以表格形式导出到电子表格中，支持按多种条件过滤。

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>名称</strong></td><td>按事件名称过滤</td></tr>
<tr><td><strong>描述</strong></td><td>按事件描述过滤</td></tr>
<tr><td><strong>模板</strong></td><td>按事件模板过滤</td></tr>
<tr><td><strong>严重级别</strong></td><td>按严重程度过滤（全部、警告、严重等）</td></tr>
<tr><td><strong>是否已确认</strong></td><td>按确认状态过滤</td></tr>
<tr><td><strong>创建时间</strong></td><td>按事件创建时间范围过滤</td></tr>
<tr><td><strong>更新时间</strong></td><td>按最后更新时间范围过滤</td></tr>
<tr><td><strong>最大结果数</strong></td><td>返回的最大事件数（默认：1000）</td></tr>
<tr><td><strong>排序方式</strong></td><td>排序字段，支持升序或降序</td></tr>
<tr><td><strong>元素条件 — 根路径</strong></td><td>将结果限定为特定资产树路径下的元素关联事件</td></tr>
<tr><td><strong>输出单元格</strong></td><td>输出表格的左上角单元格</td></tr>
<tr><td><strong>显示列</strong></td><td>选择在输出表格中包含哪些事件字段作为列。多选选择器允许从所有可用事件字段中选择（如确认状态、状态等）。</td></tr>
</tbody>
</table>

## 10.3.11 属性过滤

搜索 IDMP 属性元数据并将结果导出为表格，适用于审计数据模型或构建动态引用。

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>属性名称</strong></td><td>按属性名称过滤</td></tr>
<tr><td><strong>属性描述</strong></td><td>按属性描述过滤</td></tr>
<tr><td><strong>属性分类</strong></td><td>按属性分类标签过滤</td></tr>
<tr><td><strong>属性值类型</strong></td><td>按数据类型过滤（Float、Int、Bool 等）</td></tr>
<tr><td><strong>最大结果数</strong></td><td>最大结果数（默认：1000）</td></tr>
<tr><td><strong>排序方式</strong></td><td>排序字段，支持升序或降序</td></tr>
<tr><td><strong>元素条件</strong></td><td>按拥有该属性的元素过滤：根路径、名称、描述、分类、模板</td></tr>
<tr><td><strong>输出单元格</strong></td><td>输出表格的左上角单元格</td></tr>
<tr><td><strong>显示列</strong></td><td>选择在输出表格中包含哪些属性字段作为列。多选选择器允许从所有可用属性字段中选择（如名称、描述等）。</td></tr>
</tbody>
</table>

## 10.3.12 资产过滤

搜索 IDMP 元素（资产）并将结果导出为表格。

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>根路径</strong></td><td>将结果限定为资产树中特定路径下的元素</td></tr>
<tr><td><strong>名称</strong></td><td>按元素名称过滤</td></tr>
<tr><td><strong>描述</strong></td><td>按元素描述过滤</td></tr>
<tr><td><strong>属性名称</strong></td><td>过滤具有匹配该名称属性的元素</td></tr>
<tr><td><strong>属性描述</strong></td><td>按元素上的属性描述过滤</td></tr>
<tr><td><strong>分类</strong></td><td>按元素分类过滤</td></tr>
<tr><td><strong>模板</strong></td><td>按元素模板过滤</td></tr>
<tr><td><strong>创建时间</strong></td><td>按元素创建时间范围过滤</td></tr>
<tr><td><strong>更新时间</strong></td><td>按最后更新时间范围过滤</td></tr>
<tr><td><strong>最大结果数</strong></td><td>最大结果数（默认：1000）</td></tr>
<tr><td><strong>排序方式</strong></td><td>排序字段，支持升序或降序</td></tr>
<tr><td><strong>输出单元格</strong></td><td>输出表格的左上角单元格</td></tr>
</tbody>
</table>

## 10.3.13 属性

检索元素属性的特定元数据属性（如计量单位、描述或配置的限值），并写入单元格。

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>数据项</strong></td><td>要查询的属性（必填）</td></tr>
<tr><td><strong>属性</strong></td><td>要检索的元数据属性（如计量单位、描述、高限值）</td></tr>
<tr><td><strong>输出单元格</strong></td><td>目标单元格</td></tr>
</tbody>
</table>

## 10.3.14 更新

点击功能区中的**更新**可刷新工作簿中的所有数据。由 TDengine EAI 插件填充的每个单元格都会使用原始参数重新查询并以最新结果更新。

无需逐个重新打开表单即可保持工作簿数据的实时性。如需定期自动刷新，请在设置中配置**间隔**。

## 10.3.15 设置

配置插件的全局默认值。

<table>
<colgroup><col style="width:13em"/><col/></colgroup>
<thead><tr><th>字段</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>时间格式</strong></td><td>将时间戳写入单元格时使用的格式（默认：<code>YYYY-MM-DD HH:mm:ss</code>）</td></tr>
<tr><td><strong>数字格式</strong></td><td>应用于数值输出单元格的 Excel 数字格式（默认：<code>General</code>）</td></tr>
<tr><td><strong>最大事件浏览器搜索数</strong></td><td>事件浏览器查询的默认最大结果数（默认：1000）</td></tr>
<tr><td><strong>最大属性/资产过滤数</strong></td><td>属性过滤和资产过滤查询的默认最大结果数（默认：1000）</td></tr>
<tr><td><strong>间隔（秒）</strong></td><td>自动刷新间隔（秒）。设为 <code>0</code> 可禁用自动刷新。</td></tr>
</tbody>
</table>

点击**确认**保存设置。
