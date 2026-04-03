---
title: 浏览和管理分析
sidebar_label: 浏览分析
---

# 7.1 浏览和管理分析

分析在元素浏览器中对应元素的**分析**标签页中进行管理。在资产树中定位到目标元素并切换至**分析**标签页，即可查看该元素上已配置的所有分析。

## 7.1.1 分析列表

分析列表是管理元素分析的核心视图，以表格形式集中展示当前元素上已配置的所有分析及其关键信息，便于快速了解各分析的触发方式、运行状态和最近更新情况。

分析列表包含以下列：

<table>
<colgroup><col style="width:7em"/><col/></colgroup>
<thead><tr><th>列</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>名称</strong></td><td>分析名称——点击可进入分析详情视图</td></tr>
<tr><td><strong>触发类型</strong></td><td>触发类型（滑动窗口、定时窗口等）</td></tr>
<tr><td><strong>流名称</strong></td><td>此分析对应的 TDengine 流名称</td></tr>
<tr><td><strong>模板</strong></td><td>创建此分析所使用的分析模板（如有）</td></tr>
<tr><td><strong>类别</strong></td><td>类别标签</td></tr>
<tr><td><strong>状态</strong></td><td>当前执行状态：<strong>运行中</strong>或<strong>已暂停</strong></td></tr>
<tr><td><strong>更新时间</strong></td><td>分析最后修改的时间</td></tr>
</tbody>
</table>

## 7.1.2 工具栏

工具栏位于分析列表上方，提供分析的创建、粘贴、刷新及导出等常用操作入口。

<table>
<colgroup><col style="width:12em"/><col/></colgroup>
<thead><tr><th>控件</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>+</strong></td><td>手动创建新分析——打开分析创建表单</td></tr>
<tr><td><strong>粘贴</strong></td><td>将之前复制的分析粘贴到此元素</td></tr>
<tr><td><strong>刷新</strong></td><td>重新加载分析列表</td></tr>
<tr><td><strong>自动刷新间隔</strong></td><td>设置自动刷新的下拉菜单：关闭、1秒、5秒、10秒、15秒、30秒、1分钟、5分钟</td></tr>
<tr><td><strong>导出当前列表为 CSV</strong></td><td>将分析列表导出为 CSV 文件</td></tr>
<tr><td><strong>选择列</strong></td><td>显示或隐藏列表中的列</td></tr>
</tbody>
</table>

列表上方的过滤区域提供**类别**下拉菜单用于按类别标签筛选，以及**AI** 按钮用于切换 AI 辅助创建面板。

## 7.1.3 行操作

将鼠标悬停在任意分析行上，点击右侧的 **⋮**（更多）菜单，可执行以下操作：

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>操作</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>查看</strong></td><td>以只读模式打开分析详情视图</td></tr>
<tr><td><strong>编辑</strong></td><td>以编辑模式打开分析，可修改其配置</td></tr>
<tr><td><strong>复制</strong></td><td>复制当前分析，可粘贴到其他元素</td></tr>
<tr><td><strong>转换为模板</strong></td><td>将当前分析保存为基础库中的可复用分析模板</td></tr>
<tr><td><strong>趋势图分析</strong></td><td>打开元素趋势图，用于查看分析输出结果</td></tr>
<tr><td><strong>重算历史</strong></td><td>基于历史数据重新执行分析，以回填输出属性</td></tr>
<tr><td><strong>暂停</strong></td><td>暂停分析执行，但保留配置不予删除（暂停状态下显示<strong>恢复</strong>）</td></tr>
<tr><td><strong>删除</strong></td><td>删除分析，并可选择同时删除其生成的输出数据</td></tr>
</tbody>
</table>

## 7.1.4 分析状态

每个分析具有明确的运行状态，用于指示其当前是否处于活动执行中。状态信息显示在分析列表的**状态**列中。

<table>
<colgroup><col style="width:6em"/><col/></colgroup>
<thead><tr><th>状态</th><th>含义</th></tr></thead>
<tbody>
<tr><td><strong>运行中</strong></td><td>分析对应的流计算处于活动状态，随新数据到达持续执行</td></tr>
<tr><td><strong>已暂停</strong></td><td>分析已被手动暂停，恢复前不会执行新的计算</td></tr>
</tbody>
</table>

删除分析时，系统将弹出确认对话框，询问是否同时删除该分析此前写入的输出数据。
